import { useState } from 'react';
import { H2, H3 } from '@giveth/ui-design-system';
import styled from 'styled-components';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import Spinner from '../../Spinner';
import useFetchDonorsCount from '../../../hooks/useFetchDonorsCount';
import { nowMinusOneMonth } from '../../../lib/helpers';

const DonorsCount = () => {
	const [fromDate, setFromDate] = useState(nowMinusOneMonth());
	const [toDate, setToDate] = useState(new Date());
	const [donorsCount, loading] = useFetchDonorsCount(fromDate, toDate);

	return (
		<RowStyled>
			<Col md={4}>
				<H3>Donors Count</H3>
			</Col>
			<Col md={4}>
				<div>
					From:
					<StyledDatePicker
						selected={fromDate}
						dateFormat='yyyy-MM-dd'
						onChange={(e: Date) => setFromDate(e)}
						showPopperArrow={false}
						placeholderText='Select a date'
					/>
				</div>
				<br />
				<div>
					To:
					<StyledDatePicker
						selected={toDate}
						dateFormat='yyyy-MM-dd'
						onChange={(e: Date) => setToDate(e)}
						showPopperArrow={false}
						placeholderText='Select a date'
					/>
				</div>
			</Col>
			<Col md={1} />
			<Col md={2}>{loading ? <Spinner /> : <H2>{donorsCount}</H2>}</Col>
		</RowStyled>
	);
};

const RowStyled = styled(Row)`
	margin-top: 40px;
	align-items: center;
	margin-bottom: 40px;
`;

export default DonorsCount;
