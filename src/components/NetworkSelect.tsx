import React from 'react';
import styled from 'styled-components';

interface NetworkSelectProps {
	selectedNetwork: string;
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
				value={selectedNetwork}
				onChange={onNetworkChange}
			>
				<option value='mainnet'>Mainnet</option>
				<option value='gnosis'>Gnosis Chain</option>
				<option value='optimism'>Optimism</option>
				<option value='polygon'>Polygon</option>
				<option value='eth-classic'>Ethereum Classic</option>
				<option value='solana'>Solana</option>
				<option value='arbitrum'>Arbitrum</option>
				<option value='base'>Base</option>
				<option value='celo'>Celo</option>
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
