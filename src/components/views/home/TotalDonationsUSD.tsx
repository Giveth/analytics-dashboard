import styled from 'styled-components';
import { useState } from 'react';
import { H2, H3 } from '@giveth/ui-design-system';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import Spinner from '../../Spinner';
import useTotalDonations from '../../../hooks/useTotalDonations';
import useFetchCategoryDonations from '../../../hooks/useFetchCategoryDonations';
import CategoryDonations from './CategoryDonations';
import { nowMinusOneMonth } from '../../../lib/helpers';

const TotalDonationsUSD = () => {
	const [fromDate, setFromDate] = useState(nowMinusOneMonth());
	const [toDate, setToDate] = useState(new Date());
	const { totalDonations = '0', loading: loadingTotal } = useTotalDonations(
		fromDate,
		toDate,
	);
	const { categoryDonations, loading: loadingCategories } =
		useFetchCategoryDonations(fromDate, toDate);

	const totalCategoryDonations = categoryDonations?.reduce(
		(i, j) => i + j.totalUsd,
		0,
	);

	const norCategoryDonations = categoryDonations?.map(i => {
		return {
			...i,
			totalUsd:
				(i.totalUsd * Number(totalDonations)) /
				(totalCategoryDonations || 1),
		};
	});

	return (
		<RowStyled>
			<Col md={4}>
				<H3>Total Donations USD</H3>
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
			<Col md={2}>
				{loadingTotal ? <Spinner /> : <H2>{totalDonations}</H2>}
			</Col>
			{loadingCategories ? (
				<Spinner />
			) : (
				<CategoryDonations categoryDonations={norCategoryDonations} />
			)}
		</RowStyled>
	);
};

const RowStyled = styled(Row)`
	margin-top: 40px;
	align-items: center;
	margin-bottom: 40px;
`;

export default TotalDonationsUSD;
