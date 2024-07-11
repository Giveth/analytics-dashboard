import { Container, H1 } from '@giveth/ui-design-system';
import styled from 'styled-components';
import ProjectsCount from './ProjectsCount';
import DonorsCount from './DonorsCount';
import TotalDonations from './TotalDonations';
import DonationsCount from './DonationsCount';
import NewDonorsCount from './NewDonorsCount';
import NewDonorsDonationTotalUsd from './NewDonorsDonationTotalUsd';
import DonationBoxMetrics from './DonationBoxMetrics';
import MultisigSessionsCount from './MultisigSessionsCount';

const HomeIndex = () => {
	return (
		<ContainerStyled>
			<H1 weight={700}>Giveth Analytics Dashboard</H1>
			<ProjectsCount />
			<hr />
			<DonorsCount />
			<hr />
			<DonationsCount />
			<hr />
			<TotalDonations />
			<hr />
			<NewDonorsCount />
			<hr />
			<NewDonorsDonationTotalUsd />
			<hr />
			<DonationBoxMetrics />
      <hr />
			<MultisigSessionsCount />
		</ContainerStyled>
	);
};

const ContainerStyled = styled(Container)`
	margin-top: 120px;
	margin-bottom: 120px;
	> h1:first-child {
		text-align: center;
	}
`;

export default HomeIndex;
