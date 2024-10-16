import {
	H2,
	H4,
	H6,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Col, Row } from '../../styled-components/grid';
import {
	firstOfNextMonth,
	firstOfThisMonth,
	formatAmount,
} from '../../../lib/helpers';
import { IconWithTooltip } from '../../IconWithTooltip';
import { Flex, FlexCenter } from '../../styled-components/flex';
import DatePicker from '../../DatePicker';
import CheckBox from '../../CheckBox';
import { useVouchesCount } from '../../../hooks/useVouchesCount';
import { GIVETH_VERIFIERS_ORG_ID } from '../../../lib/constants';
import Spinner from '../../Spinner';
import VerificationChart from './charts/VerificationChart';

const VerificationDashboard = () => {
	const [fromDate, setFromDate] = useState(firstOfThisMonth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const [showComment, setShowComment] = useState(true);

	const { vouchCountInfo, loading } = useVouchesCount(
		fromDate,
		toDate,
		GIVETH_VERIFIERS_ORG_ID,
	);

	return (
		<>
			<RowStyled>
				<Col>
					<FlexCenter gap='10px'>
						<H4>Vouches made by Giveth Verifiers</H4>
						<IconWithTooltip
							icon={<IconHelpFilled16 />}
							direction={'top'}
						>
							<TooltipBody>
								Total number of vouches made by Giveth Verifiers
								on ALL projects on Giveth
							</TooltipBody>
						</IconWithTooltip>
					</FlexCenter>
				</Col>
			</RowStyled>
			<RowStyled>
				<Col md={6}>
					From: <DatePicker date={fromDate} setDate={setFromDate} />
				</Col>
				<Col md={6}>
					To: <DatePicker date={toDate} setDate={setToDate} />
				</Col>
			</RowStyled>
			<RowStyled>
				<Col>
					<FilterRows gap='10px' wrap={1}>
						<H6>Filters:</H6>
						<CheckBox
							checked={showComment}
							onChange={setShowComment}
							label='Show vouches with comments info'
							size={16}
						/>
					</FilterRows>
				</Col>
			</RowStyled>
			<RowStyled>
				<Col>
					<FlexCenter gap='10px' direction='column'>
						<H6>Total:</H6>
						{loading ? (
							<Spinner />
						) : (
							<H2>
								{formatAmount(
									showComment
										? vouchCountInfo?.totalWithComments || 0
										: vouchCountInfo?.total || 0,
								)}
							</H2>
						)}
					</FlexCenter>
				</Col>
			</RowStyled>
			<Col md={2}></Col>
			{loading ? (
				<Spinner />
			) : (
				<VerificationChart
					vouchCountsPerMonth={vouchCountInfo?.totalPerMonth!}
					showWithComments={showComment}
				/>
			)}
		</>
	);
};

const TooltipBody = styled(Subline)`
	color: ${neutralColors.gray[100]};
	width: 260px;
`;

const RowStyled = styled(Row)`
	margin-top: 40px;
	margin-bottom: 40px;
`;

const FilterRows = styled(Flex)`
	margin-top: -16px;
	padding: 16px 24px;
	border-radius: 8px;
	background-color: ${neutralColors.gray[200]};
`;

export default VerificationDashboard;
