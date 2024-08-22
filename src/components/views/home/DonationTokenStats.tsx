import React, { ChangeEvent, useState } from 'react';
import {
	H4,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import styled from 'styled-components';
import { firstOfNextMonth, firstOfThisMonth } from '../../../lib/helpers';
import { Col, Row } from '../../styled-components/grid';
import { FlexCenter } from '../../styled-components/flex';
import { IconWithTooltip } from '../../IconWithTooltip';
import Spinner from '../../Spinner';
import DatePicker from '../../DatePicker';
import NetworkSelect from '../../NetworkSelect';
import useDonationTokenStats from '../../../hooks/useDonationTokenStats';
import DonationTokenStatsChart from './charts/DonationTokenStatsChart';

const DonationTokenStats = () => {
	const [fromDate, setFromDate] = useState(firstOfThisMonth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const [selectedNetworkId, setSelectedNetworkId] = useState<number>();
	const { tokenStats, loading } = useDonationTokenStats(
		fromDate,
		toDate,
		selectedNetworkId,
	);

	const handleNetworkChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value =
			event.target.value === '' ? undefined : Number(event.target.value);
		setSelectedNetworkId(value);
	};

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>Distribution of Tokens by Unique Donors</H4>
					<IconWithTooltip
						icon={<IconHelpFilled16 />}
						direction={'top'}
					>
						<TooltipBody>
							This graph illustrates the distribution of unique
							donors using different tokens on each blockchain.
							The percentages represent the proportion of unique
							donors for each token, providing insights into which
							tokens are most preferred by donors on various
							chains. For example, if 50 unique donors used ETH,
							30 used GIV, and 20 used UNI, the graph would show
							50% ETH, 30% GIV, and 20% UNI.
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
				<NetworkSelect
					selectedNetwork={selectedNetworkId}
					onNetworkChange={handleNetworkChange}
				/>
				<br />
			</Col>
			<Col md={1} />
			{loading ? (
				<Spinner />
			) : (
				<DonationTokenStatsChart tokenStats={tokenStats!} />
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

export default DonationTokenStats;
