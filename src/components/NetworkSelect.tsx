import React from 'react';
import styled from 'styled-components';
import { NETWORK_IDS } from '../lib/constants';

export const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

interface NetworkSelectProps {
	selectedNetwork?: number;
	onNetworkChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function getCorrectNetworkIdBasedOnEnv(networkId: number) {
	switch (networkId) {
		case NETWORK_IDS.ARBITRUM_MAINNET:
			return isDevelopment
				? NETWORK_IDS.ARBITRUM_SEPOLIA
				: NETWORK_IDS.ARBITRUM_MAINNET;
		case NETWORK_IDS.OPTIMISTIC:
			return isDevelopment
				? NETWORK_IDS.OPTIMISM_SEPOLIA
				: NETWORK_IDS.OPTIMISTIC;
		case NETWORK_IDS.BASE_MAINNET:
			return isDevelopment
				? NETWORK_IDS.BASE_SEPOLIA
				: NETWORK_IDS.BASE_MAINNET;
		case NETWORK_IDS.ZKEVM_MAINNET:
			return isDevelopment
				? NETWORK_IDS.ZKEVM_CARDONA
				: NETWORK_IDS.ZKEVM_MAINNET;
		case NETWORK_IDS.CELO:
			return isDevelopment
				? NETWORK_IDS.CELO_ALFAJORES
				: NETWORK_IDS.CELO;
		case NETWORK_IDS.SOLANA_MAINNET:
			return isDevelopment
				? NETWORK_IDS.SOLANA_TESTNET
				: NETWORK_IDS.SOLANA_MAINNET;
		case NETWORK_IDS.ETC:
			return isDevelopment
				? NETWORK_IDS.MORDOR_ETC_TESTNET
				: NETWORK_IDS.ETC;
		default:
			return networkId;
	}
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({
	selectedNetwork,
	onNetworkChange,
}) => {
	const correctNetworkId = selectedNetwork
		? getCorrectNetworkIdBasedOnEnv(selectedNetwork)
		: '';

	return (
		<>
			<label>Select Network: </label>
			<SelectStyled
				id='network-select'
				value={correctNetworkId}
				onChange={onNetworkChange}
			>
				<option value=''>All Networks</option>
				<option value={NETWORK_IDS.MAIN_NET}>Mainnet</option>
				<option value={NETWORK_IDS.XDAI}>Gnosis Chain</option>
				<option value={NETWORK_IDS.OPTIMISTIC}>Optimism</option>
				<option value={NETWORK_IDS.POLYGON}>Polygon</option>
				<option value={NETWORK_IDS.ZKEVM_MAINNET}>Polygon zkEVM</option>
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
