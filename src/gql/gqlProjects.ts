export const fetchProjectsCount = `
  query (
    $fromDate: String
    $toDate: String
    $networkId: Int
    $onlyVerified: Boolean
    $onlyListed: Boolean
  ) {
    projectsPerDate(
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
      onlyVerified: $onlyVerified
      onlyListed: $onlyListed
    ) {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;
