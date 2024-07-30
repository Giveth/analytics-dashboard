import React from 'react';
import ProjectsCount from './ProjectsCount';
import DonorsCount from './DonorsCount';
import TotalDonations from './TotalDonations';
import DonationsCount from './DonationsCount';
import NewDonorsCount from './NewDonorsCount';
import NewDonorsDonationTotalUsd from './NewDonorsDonationTotalUsd';
import DonationBoxMetrics from './DonationBoxMetrics';
import MultisigSessionsCount from './MultisigSessionsCount';
import RecurringDonationsCount from './RecurringDonationsCount';
import RecurringDonationsTotalUsd from './RecurringDonationsTotalUsd';
import DonationTokenStats from './DonationTokenStats';

interface TabContentProps {
	activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
	return (
		<>
			{activeTab === 'Donations' && (
				<>
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
					<DonationTokenStats />
				</>
			)}
			{activeTab === 'Recurring Donations' && (
				<>
					<RecurringDonationsCount />
					<hr />
					<RecurringDonationsTotalUsd />
				</>
			)}
			{activeTab === 'Projects' && (
				<>
					<ProjectsCount />
				</>
			)}
			{activeTab === 'Multisig' && (
				<>
					<MultisigSessionsCount />
				</>
			)}
			{activeTab === 'Optional Donation Box' && (
				<>
					<DonationBoxMetrics />
				</>
			)}
		</>
	);
};

export default TabContent;
