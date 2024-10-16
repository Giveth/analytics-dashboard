export const FETCH_VOUCHES_COUNT_BY_DATE = `query MyQuery($fromDate: String = "", $organisationId: String = "", $toDate: String = "") {
	getOrganisationVouchCountByDate(fromDate: $fromDate, organisationId: $organisationId, toDate: $toDate) {
	  total
	  totalPerMonth {
		countWithComments
		countWithoutComments
		totalCount
		date
	  }
	}
  }`;
