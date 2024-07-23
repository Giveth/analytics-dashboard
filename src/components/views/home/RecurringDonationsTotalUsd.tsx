import styled from 'styled-components';
import React, { useState } from 'react';
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
import useRecurringDonationsTotalUsd from '../../../hooks/useRecurringDonationsTotalUsd';
import {
	firstOfNextMonth,
	firstOfGiveth,
	thousandsSeparator,
} from '../../../lib/helpers';
import { IconWithTooltip } from '../../IconWithTooltip';
import { FlexCenter } from '../../styled-components/flex';
import RecurringDonationsTotalChart from './charts/RecurringDonationsTotalChart';
import CheckBox from '../../CheckBox';
import DatePicker from '../../DatePicker';
import RecurringDonationsTotalTokenChart from './charts/RecurringDonationsTotalTokenChart';

const RecurringDonationsTotalUsd = () => {
	const [fromDate, setFromDate] = useState(firstOfGiveth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const [onlyVerified, setOnlyVerified] = useState(false);
	const { recurringDonationsTotaStreanedlUsd, loading } =
		useRecurringDonationsTotalUsd(
			fromDate,
			toDate,
			undefined,
			onlyVerified,
		);

	const { total, totalPerMonthAndYear, totalPerToken } =
		recurringDonationsTotaStreanedlUsd || {};

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='14px'>
					<H4>Total Recurring Donations ($)</H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							Total sum of all recurring donations value in USD
							during the selected timeframe.
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
				<CheckBox
					checked={onlyVerified}
					onChange={setOnlyVerified}
					label='To verified projects only'
				/>
			</Col>
			<Col md={1} />
			<Col md={2}>
				<H6>Total (USD):</H6>
				{loading ? (
					<Spinner />
				) : (
					<H2>{thousandsSeparator(total?.toFixed(2))}</H2>
				)}
			</Col>
			{loading ? (
				<Spinner />
			) : (
				<RecurringDonationsTotalChart
					totalPerMonthAndYear={totalPerMonthAndYear!}
				/>
			)}
			{loading ? (
				<Spinner />
			) : (
				<RecurringDonationsTotalTokenChart
					rDonationsPerToken={totalPerToken}
				/>
			)}
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

export default RecurringDonationsTotalUsd;