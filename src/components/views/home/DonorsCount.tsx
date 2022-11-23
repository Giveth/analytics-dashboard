import { useState } from 'react';
import {
	H2,
	H4,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import Spinner from '../../Spinner';
import useDonorsCount from '../../../hooks/useDonorsCount';
import {
	firstOfNextMonth,
	firstOfThisYear,
	thousandsSeparator,
} from '../../../lib/helpers';
import { IconWithTooltip } from '../../IconWithTooltip';
import { FlexCenter } from '../../styled-components/flex';
import DonorsChart from './charts/DonorsChart';

const DonorsCount = () => {
	const [fromDate, setFromDate] = useState(firstOfThisYear());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const { donorsCount, loading } = useDonorsCount(fromDate, toDate);

	const { total, totalPerMonthAndYear } = donorsCount || {};

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>Donors Count </H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							Total number of unique donors during the selected
							timeframe, including anonymous donations.
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
				<DonorsChart totalPerMonthAndYear={totalPerMonthAndYear!} />
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

export default DonorsCount;
