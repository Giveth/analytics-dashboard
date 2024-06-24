import React from 'react';
import styled from 'styled-components';
import { NETWORK_IDS } from '../lib/constants';

interface NetworkSelectProps {
	selectedNetwork?: number;
	onNetworkChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({
	selectedNetwork,
	onNetworkChange,
}) => {
	return (
		<>
			<label>Select Network: </label>
			<SelectStyled
				id='network-select'
				value={selectedNetwork !== null ? selectedNetwork : ''}
				onChange={onNetworkChange}
			>
				<option value=''>All Networks</option>
				<option value={NETWORK_IDS.MAIN_NET}>Mainnet</option>
				<option value={NETWORK_IDS.XDAI}>Gnosis Chain</option>
				<option value={NETWORK_IDS.OPTIMISTIC}>Optimism</option>
				<option value={NETWORK_IDS.POLYGON}>Polygon</option>
				<option value={NETWORK_IDS.ETC}>Ethereum Classic</option>
				<option value={NETWORK_IDS.SOLANA_MAINNET}>Solana</option>
				<option value={NETWORK_IDS.ARBITRUM_MAINNET}>Arbitrum</option>
				<option value={NETWORK_IDS.BASE_MAINNET}>Base</option>
				<option value={NETWORK_IDS.CELO}>Celo</option>
			</SelectStyled>
		</>
	);
};

const SelectStyled = styled.select`
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #fff;
	color: #333;
	margin-right: 10px;

	&:focus {
		border-color: #007bff;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
		outline: none;
	}
`;

export default NetworkSelect;
