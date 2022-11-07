import styled from 'styled-components';
import { useState } from 'react';
import { H3 } from '@giveth/ui-design-system';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import Spinner from '../../Spinner';
import useTotalDonationsPerCategory from '../../../hooks/useTotalDonationsPerCategory';

const now = new Date();
const nowMinusOneMonth = new Date(
	now.getFullYear(),
	now.getMonth() - 1,
	now.getDate(),
);

const TotalDonationsPerCategory = () => {
	const [fromDate, setFromDate] = useState(nowMinusOneMonth);
	const [toDate, setToDate] = useState(now);
	const [totalDonationsPerCategory, loading] = useTotalDonationsPerCategory(
		fromDate,
		toDate,
	);

	return (
		<RowStyled>
			<Col md={6}>
				<H3>Total Donations USD Per Category</H3>
			</Col>
			<Col md={1} />
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
			<div>
				{loading ? (
					<Spinner />
				) : (
					<Categories>
						{totalDonationsPerCategory?.map(i => (
							<Category md={4} key={i.title}>
								<div>{i.title}</div>
								<div>{i.totalUsd.toFixed()}</div>
							</Category>
						))}
					</Categories>
				)}
			</div>
		</RowStyled>
	);
};

const Category = styled(Col)`
	margin-top: 30px;
`;

const Categories = styled(Row)`
	margin-top: 40px;
	font-size: 20px;
`;

const RowStyled = styled(Row)`
	margin-top: 40px;
	align-items: center;
	margin-bottom: 40px;
`;

export default TotalDonationsPerCategory;
