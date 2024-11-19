export const FETCH_VOUCHES_COUNT_BY_DATE = `query MyQuery($fromDate: String = "", $organisationId: String = "", $source: String = "", $toDate: String = "") {
  getOrganisationVouchCountByDate(fromDate: $fromDate, organisationId: $organisationId, source: $source, toDate: $toDate) {
    total
    totalPerMonth {
      countWithComments
      countWithoutComments
      date
      totalCount
    }
    totalWithComments
  }
}
`;

export const FETCH_USER_VOUCHES_COUNT_TO_SOURCE_BY_DATE = `query MyQuery($fromDate: String = "", $organisationId: String = "", $source: String = "", $toDate: String = "") {
  getOrganisationUserVouchCountBySource(fromDate: $fromDate, organisationId: $organisationId, source: $source, toDate: $toDate) {
    vouchCountByUser {
      totalCount
	  countWithComments
      attestorId
    }
    totalVouches
	totalWithComments
  }
}`;
