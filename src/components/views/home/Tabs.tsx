import React from 'react';
import styled from 'styled-components';
import { TABS, Tab as TabName } from './tabNames';

interface TabsProps {
	setActiveTab: (tab: TabName) => void;
	activeTab: TabName;
}

const Tabs: React.FC<TabsProps> = ({ setActiveTab, activeTab }) => {
	const handleTabClick = (tab: TabName) => {
		setActiveTab(tab);
	};

	return (
		<Nav>
			{Object.values(TABS).map(tab => (
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

// Sticky rather than fixed: with nine tabs the bar wraps on narrower screens,
// and a sticky bar keeps its own height in the flow instead of covering the
// page.
const Nav = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 8px;
	background-color: #1e1e3f;
	padding: 10px 16px;
	position: sticky;
	top: 0;
	z-index: 1000;
`;

const Tab = styled.button<TabProps>`
	background: ${props => (props.active ? '#5636d3' : 'transparent')};
	border: 1px solid #5636d3;
	color: #fff;
	padding: 8px 16px;
	cursor: pointer;
	font-size: 15px;
	border-radius: 30px;
	transition: background 0.3s;

	&:hover {
		background: #3e3e7f;
	}
`;

export default Tabs;
