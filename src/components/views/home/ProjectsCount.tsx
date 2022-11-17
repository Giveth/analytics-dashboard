import { H2, H3 } from '@giveth/ui-design-system';
import styled from 'styled-components';
import { useState } from 'react';
import { Col, Row } from '../../styled-components/grid';
import { StyledDatePicker } from '../../styled-components/datePicker';
import useFetchProjectsCount from '../../../hooks/useFetchProjectsCount';
import Spinner from '../../Spinner';
import { nowMinusOneMonth } from '../../../lib/helpers';

const ProjectsCount = () => {
	const [fromDate, setFromDate] = useState(nowMinusOneMonth());
	const [toDate, setToDate] = useState(new Date());
	const [projectsCount, loading] = useFetchProjectsCount(fromDate, toDate);

	return (
		<RowStyled>
			<Col md={4}>
				<H3>Projects Count</H3>
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
			<Col md={2}>{loading ? <Spinner /> : <H2>{projectsCount}</H2>}</Col>
		</RowStyled>
	);
};

const RowStyled = styled(Row)`
	margin-top: 40px;
	align-items: center;
	margin-bottom: 40px;
`;

export default ProjectsCount;
