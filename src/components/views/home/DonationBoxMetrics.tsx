import styled from 'styled-components';
import { useState } from 'react';
import {
	H2,
	H4,
	H6,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import { Col, Row } from '../../styled-components/grid';
import Spinner from '../../Spinner';
import useDonationBoxMetrics from '../../../hooks/useDonationBoxMetrics';
import { IconWithTooltip } from '../../IconWithTooltip';
import { FlexCenter } from '../../styled-components/flex';
import DatePicker from '../../DatePicker';

const DonationBoxMetrics = () => {
	const [fromDate, setFromDate] = useState(new Date('2023-01-01'));
	const [toDate, setToDate] = useState(new Date('2023-01-02'));

	const { donationMetrics, loading } = useDonationBoxMetrics(
		fromDate,
		toDate,
	);

	const {
		totalDonationsToGiveth,
		totalUsdValueToGiveth,
		averagePercentageToGiveth,
	} = donationMetrics || {};

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>Donation Metrics</H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							Overview of donation metrics including total
							donations and average percentage during the selected
							timeframe.
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
			</Col>
			<Col md={1} />
			<Col md={2}>
				<H6>Total Donations to Giveth:</H6>
				{loading ? <Spinner /> : <H2>{totalDonationsToGiveth}</H2>}
				<H6>Total USD Value to Giveth:</H6>
				{loading ? <Spinner /> : <H2>{totalUsdValueToGiveth}</H2>}
				<H6>Average Percentage to Giveth:</H6>
				{loading ? <Spinner /> : <H2>{averagePercentageToGiveth}%</H2>}
			</Col>
		</RowStyled>
	);
};

const TooltipBody = styled(Subline)`
	color: ${neutralColors.gray[100]};
	width: 270px;
`;

const RowStyled = styled(Row)`
	margin-top: 40px;
	align-items: center;
	margin-bottom: 40px;
`;

export default DonationBoxMetrics;
