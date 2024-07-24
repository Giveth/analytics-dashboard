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
import { firstOfNextMonth, firstOfThisMonth } from '../../../lib/helpers';

const formatNumber = (number: number | undefined) =>
	number ? number.toFixed(2) : '0.00';

const DonationBoxMetrics = () => {
	const [fromDate, setFromDate] = useState(firstOfThisMonth());
	const [toDate, setToDate] = useState(firstOfNextMonth());

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
					<H4>Donation Box Metrics</H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							Overview of donation box metrics including total
							donations and average percentage during the selected
							timeframe. Note that the recurring donation is not
							considered.
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
				<H6>Total Donations to Giveth Using Donation Box:</H6>
				{loading ? <Spinner /> : <H2>{totalDonationsToGiveth || 0}</H2>}
				<br />
				<H6>Total USD Value to Giveth Using Donation Box:</H6>
				{loading ? (
					<Spinner />
				) : (
					<H2>{formatNumber(totalUsdValueToGiveth)}</H2>
				)}
				<br />
				<H6>
					Average Percentage of Donation to Giveth Using Donation Box:
				</H6>
				{loading ? (
					<Spinner />
				) : (
					<H2>{formatNumber(averagePercentageToGiveth)}%</H2>
				)}
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
