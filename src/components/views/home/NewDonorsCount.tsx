import { useState } from 'react';
import {
	H2,
	H4,
	H6,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import Spinner from '../../Spinner';
import {
	firstOfNextMonth,
	thousandsSeparator,
	firstOfThisMonth,
} from '../../../lib/helpers';
import { IconWithTooltip } from '../../IconWithTooltip';
import { FlexCenter } from '../../styled-components/flex';
import useNewDonorsCount from '../../../hooks/useNewDonorsCount';

const DonorsCount = () => {
	const [fromDate, setFromDate] = useState(firstOfThisMonth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const { newDonorsCount, loading } = useNewDonorsCount(fromDate, toDate);

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>New Donors Count </H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							The number of new donors that have arrived to the
							platform between two dates (users who have made
							their first donations)
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
				<H6>Total:</H6>
				{loading ? (
					<Spinner />
				) : (
					<H2>{thousandsSeparator(newDonorsCount)}</H2>
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

export default DonorsCount;
