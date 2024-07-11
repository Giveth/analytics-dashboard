// When includesOptimism is true, projects that don't
// have an Optimism receiving address are omitted from
// the query.
export const fetchProjectsCount = `
  query (
    $fromDate: String
    $toDate: String
    $includesOptimism: Boolean
    $onlyVerified: Boolean
    $onlyListed: Boolean
  ) {
    projectsPerDate(
      fromDate: $fromDate
      toDate: $toDate
      includesOptimism: $includesOptimism
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
