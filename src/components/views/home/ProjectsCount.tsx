import {
	H2,
	H4,
	H6,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import { useState } from 'react';
import { Col, Row } from '../../styled-components/grid';
import useProjectsCount from '../../../hooks/useProjectsCount';
import Spinner from '../../Spinner';
import {
	firstOfNextMonth,
	firstOfGiveth,
	thousandsSeparator,
} from '../../../lib/helpers';
import { IconWithTooltip } from '../../IconWithTooltip';
import { Flex, FlexCenter } from '../../styled-components/flex';
import ProjectsChart from './charts/ProjectsChart';
import CheckBox from '../../CheckBox';
import DatePicker from '../../DatePicker';

const ProjectsCount = () => {
	const [fromDate, setFromDate] = useState(firstOfGiveth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const [includesOptimism, setIncludesOptimism] = useState(false);
	const [onlyVerified, setOnlyVerified] = useState(false);
	const [onlyListed, setOnlyListed] = useState(false);

	const { projectsCount, loading } = useProjectsCount(
		fromDate,
		toDate,
		includesOptimism,
		onlyVerified,
		onlyListed,
	);

	const { total, totalPerMonthAndYear } = projectsCount || {};

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>Projects Count </H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							Total number of new projects onboarded during the
							selected timeframe.
						</TooltipBody>
					</IconWithTooltip>
				</FlexCenter>
			</Col>
			<Col md={4}>
				<div>
					From: <DatePicker date={fromDate} setDate={setFromDate} />
				</div>
				<br />
				<div>
					To: <DatePicker date={toDate} setDate={setToDate} />
				</div>
				<br />
				<Flex alignItems='center' gap='10px'>
					<CheckBox
						checked={includesOptimism}
						onChange={setIncludesOptimism}
						label='Includes Optimism receiving address'
					/>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							When this option is selected, projects that don't
							have an Optimism receiving address are omitted from
							the query.
						</TooltipBody>
					</IconWithTooltip>
				</Flex>
				<br />
				<CheckBox
					checked={onlyVerified}
					onChange={setOnlyVerified}
					label='Show only verified projects'
				/>
				<br />
				<CheckBox
					checked={onlyListed}
					onChange={setOnlyListed}
					label='Show only listed projects'
				/>
			</Col>
			<Col md={1} />
			<Col md={2}>
				<H6>Total:</H6>
				{loading ? <Spinner /> : <H2>{thousandsSeparator(total)}</H2>}
			</Col>
			{loading ? (
				<Spinner />
			) : (
				<ProjectsChart totalPerMonthAndYear={totalPerMonthAndYear!} />
			)}
		</RowStyled>
	);
};

const TooltipBody = styled(Subline)`
	color: ${neutralColors.gray[100]};
	width: 260px;
`;

const RowStyled = styled(Row)`
	margin-top: 40px;
	align-items: center;
	margin-bottom: 40px;
`;

export default ProjectsCount;
