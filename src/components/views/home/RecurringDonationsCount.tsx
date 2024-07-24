import React, { useState } from 'react';
import {
	H2,
	H4,
	H6,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import {
	firstOfNextMonth,
	firstOfGiveth,
	thousandsSeparator,
} from '../../../lib/helpers';
import { Col, Row } from '../../styled-components/grid';
import { FlexCenter } from '../../styled-components/flex';
import { IconWithTooltip } from '../../IconWithTooltip';
import Spinner from '../../Spinner';
import useRecurringDonationsCount from '../../../hooks/useRecurringDonationsCount';
import RecurringDonationsCountChat from './charts/RecurringDonationsCountChat';
import CheckBox from '../../CheckBox';
import DatePicker from '../../DatePicker';
import RecurringDonationsCountTokenChart from './charts/RecurringDonationsCountTokenChart';

const RecurringDonationsCount = () => {
	const [fromDate, setFromDate] = useState(firstOfGiveth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const [onlyVerified, setOnlyVerified] = useState(false);
	const { recurringDonationsCount, loading } = useRecurringDonationsCount(
		fromDate,
		toDate,
		undefined,
		onlyVerified,
	);

	const { total, totalPerMonthAndYear, totalPerToken } =
		recurringDonationsCount || {};

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>Recurring Donations Count </H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							Total number of recurring donations during the
							selected timeframe, including anonymous recurring
							donations.
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
				<H6>Total:</H6>
				{loading ? <Spinner /> : <H2>{thousandsSeparator(total)}</H2>}
			</Col>
			{loading ? (
				<Spinner />
			) : (
				<RecurringDonationsCountChat
					totalPerMonthAndYear={totalPerMonthAndYear!}
				/>
			)}
			{loading ? (
				<Spinner />
			) : (
				<RecurringDonationsCountTokenChart
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

export default RecurringDonationsCount;
