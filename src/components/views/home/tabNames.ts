// Tabs with a v6 future come in v5/v6 pairs: the v5 tab reads impact-graph,
// its v6 twin reads giveth-v6-core. The "(legacy)" tabs have no v6 twin.
export const TABS = {
	V5_DONATIONS: 'v5 Donations',
	V6_DONATIONS: 'v6 Donations',
	RECURRING_DONATIONS: 'Recurring Donations (legacy)',
	V5_PROJECTS: 'v5 Projects',
	V6_PROJECTS: 'v6 Projects',
	MULTISIG: 'Multisig (legacy)',
	V5_DONATION_BOX: 'v5 Donation Box',
	V6_DONATION_BOX: 'v6 Donation Box',
	VERIFICATION: 'Verification (legacy)',
} as const;

export type Tab = typeof TABS[keyof typeof TABS];
