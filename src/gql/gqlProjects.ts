export const fetchProjectsCount = `
  query (
    $fromDate: String
    $toDate: String
    $network: String
    $onlyVerified: Boolean
    $onlyListed: Boolean
  ) {
    projectsPerDate(
      fromDate: $fromDate
      toDate: $toDate
      network: $network
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
