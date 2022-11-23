import {
	H2,
	H4,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import { useState } from 'react';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import useProjectsCount from '../../../hooks/useProjectsCount';
import Spinner from '../../Spinner';
import {
	firstOfNextMonth,
	firstOfThisYear,
	thousandsSeparator,
} from '../../../lib/helpers';
import { IconWithTooltip } from '../../IconWithTooltip';
import { FlexCenter } from '../../styled-components/flex';
import ProjectsChart from './charts/ProjectsChart';

const ProjectsCount = () => {
	const [fromDate, setFromDate] = useState(firstOfThisYear());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const { projectsCount, loading } = useProjectsCount(fromDate, toDate);

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
					From:
					<StyledDatePicker
						selected={fromDate}
						dateFormat='yyyy-MM'
						onChange={(e: Date) => setFromDate(e)}
						showPopperArrow={false}
						showMonthYearPicker
						placeholderText='Select a date'
					/>
				</div>
				<br />
				<div>
					To:
					<StyledDatePicker
						selected={toDate}
						dateFormat='yyyy-MM'
						onChange={(e: Date) => setToDate(e)}
						showPopperArrow={false}
						showMonthYearPicker
						placeholderText='Select a date'
					/>
				</div>
			</Col>
			<Col md={1} />
			<Col md={2}>
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
