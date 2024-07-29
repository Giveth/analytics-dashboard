import React from 'react';
import styled from 'styled-components';

interface TabsProps {
	setActiveTab: (tab: string) => void;
	activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ setActiveTab, activeTab }) => {
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<Nav>
			{[
				'Donations',
				'Recurring Donations',
				'Projects',
				'Multisig',
				'Optional Donation Box',
			].map(tab => (
				<Tab
					key={tab}
					active={activeTab === tab}
					onClick={() => handleTabClick(tab)}
				>
					{tab}
				</Tab>
			))}
		</Nav>
	);
};

interface TabProps {
	active: boolean;
}

const Nav = styled.div`
	display: flex;
	justify-content: space-around;
	background-color: #1e1e3f;
	padding: 10px 0;
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	z-index: 1000;
`;

const Tab = styled.button<TabProps>`
	background: ${props => (props.active ? '#5636d3' : 'transparent')};
	border: 1px solid #5636d3;
	color: #fff;
	padding: 10px 20px;
	cursor: pointer;
	font-size: 16px;
	border-radius: 30px;
	transition: background 0.3s;

	&:hover {
		background: #3e3e7f;
	}
`;

export default Tabs;
