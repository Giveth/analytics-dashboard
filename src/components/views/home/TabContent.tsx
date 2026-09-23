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
import VerificationDashboard from './VerificationDashboard';
import { TABS, Tab } from './tabNames';
import type { BackendVersion } from '../../../lib/requests';

interface TabContentProps {
	activeTab: Tab;
}

const DonationsTab = ({ version }: { version: BackendVersion }) => (
	<>
		<DonorsCount version={version} />
		<hr />
		<DonationsCount version={version} />
		<hr />
		<TotalDonations version={version} />
		<hr />
		<NewDonorsCount version={version} />
		<hr />
		<NewDonorsDonationTotalUsd version={version} />
		<hr />
		<DonationTokenStats version={version} />
	</>
);

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
	return (
		<>
			{activeTab === TABS.V5_DONATIONS && <DonationsTab version='v5' />}
			{activeTab === TABS.V6_DONATIONS && <DonationsTab version='v6' />}
			{activeTab === TABS.RECURRING_DONATIONS && (
				<>
					<RecurringDonationsCount />
					<hr />
					<RecurringDonationsTotalUsd />
				</>
			)}
			{activeTab === TABS.V5_PROJECTS && <ProjectsCount version='v5' />}
			{activeTab === TABS.V6_PROJECTS && <ProjectsCount version='v6' />}
			{activeTab === TABS.MULTISIG && <MultisigSessionsCount />}
			{activeTab === TABS.V5_DONATION_BOX && (
				<DonationBoxMetrics version='v5' />
			)}
			{activeTab === TABS.V6_DONATION_BOX && (
				<DonationBoxMetrics version='v6' />
			)}
			{activeTab === TABS.VERIFICATION && <VerificationDashboard />}
		</>
	);
};

export default TabContent;
