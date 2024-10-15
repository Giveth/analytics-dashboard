import {
	H2,
	H4,
	H6,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import React, { useState } from 'react';
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
import DatePicker from '../../DatePicker';
import CheckBox from '../../CheckBox';

const VerificationDashboard = () => {
	const [fromDate, setFromDate] = useState(firstOfGiveth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const [selectedNetworkId, setSelectedNetworkId] = useState<number>();
	const [onlyVerified, setOnlyVerified] = useState(false);
	const [onlyListed, setOnlyListed] = useState(false);

	const { projectsCount, loading } = useProjectsCount(
		fromDate,
		toDate,
		selectedNetworkId,
		onlyVerified,
		onlyListed,
	);

	const { total, totalPerMonthAndYear } = projectsCount || {};

	return (
		<>
			<RowStyled>
				<Col>
					<FlexCenter gap='10px'>
						<H4>Vouches made by Giveth Verifiers</H4>
						<IconWithTooltip
							icon={<IconHelpFilled16 />}
							direction={'top'}
						>
							<TooltipBody>
								Total number of vouches made by Giveth Verifiers
								on ALL projects on Giveth
							</TooltipBody>
						</IconWithTooltip>
					</FlexCenter>
				</Col>
			</RowStyled>
			<RowStyled>
				<Col md={6}>
					From: <DatePicker date={fromDate} setDate={setFromDate} />
				</Col>
				<Col md={6}>
					To: <DatePicker date={toDate} setDate={setToDate} />
				</Col>
			</RowStyled>
			<RowStyled>
				<Flex gap='10px' wrap={1}>
					<H6>Filters:</H6>
					<CheckBox
						checked={onlyVerified}
						onChange={setOnlyVerified}
						label='Show only verified projects'
						size={16}
					/>
				</Flex>
			</RowStyled>
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
		</>
	);
};

const TooltipBody = styled(Subline)`
	color: ${neutralColors.gray[100]};
	width: 260px;
`;

const RowStyled = styled(Row)`
	margin-top: 40px;
	margin-bottom: 40px;
`;

export default VerificationDashboard;
