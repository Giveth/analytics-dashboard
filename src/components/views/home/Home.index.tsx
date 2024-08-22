import { Container, H1 } from '@giveth/ui-design-system';
import styled from 'styled-components';
import { useState } from 'react';
import Tabs from './Tabs';
import TabContent from './TabContent';

const HomeIndex = () => {
	const [activeTab, setActiveTab] = useState<string>('Donations');

	return (
		<ContainerStyled>
			<Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
			<H1 weight={700}>Giveth Analytics Dashboard</H1>
			<Content>
				<TabContent activeTab={activeTab} />
			</Content>
		</ContainerStyled>
	);
};

const ContainerStyled = styled(Container)`
	margin-top: 80px;
	margin-bottom: 120px;
	> h1:nth-child(2) {
		text-align: center;
	}
`;

const Content = styled.div`
	margin-top: 20px;
`;

export default HomeIndex;
