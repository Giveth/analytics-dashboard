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
import DatePicker from '../../DatePicker';
import useMultisigSessionsCount from '../../../hooks/useMultisigSessionsCount';

const MultisigSessionsCount = () => {
	const [fromDate, setFromDate] = useState(firstOfGiveth());
	const [toDate, setToDate] = useState(firstOfNextMonth());
	const { multisigSessionsCount, loading, error } = useMultisigSessionsCount(fromDate, toDate);

	return (
		<RowStyled>
			<Col md={4}>
				<FlexCenter gap='10px'>
					<H4>Multisig Sessions Count</H4>
					<IconWithTooltip icon={<IconHelpFilled16 />} direction={'top'}>
						<TooltipBody>
							Total number of multisig sessions during the selected timeframe.
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
				{loading ? <Spinner /> : <button onClick={() => null}>Fetch Count</button>}
			</Col>
			<Col md={1} />
			<Col md={2}>
				<H6>Total:</H6>
				{loading ? (
					<Spinner />
				) : (
					<H2>{multisigSessionsCount !== null ? thousandsSeparator(multisigSessionsCount) : 'N/A'}</H2>
				)}
				{error && <p style={{ color: 'red' }}>{error}</p>}
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

export default MultisigSessionsCount;
