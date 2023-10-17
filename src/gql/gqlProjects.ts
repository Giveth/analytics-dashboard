export const fetchProjectsCount = `
  query (
    $fromDate: String
    $toDate: String
    $includesOptimism: Boolean
  ) {
    projectsPerDate(
      fromDate: $fromDate
      toDate: $toDate
      includesOptimism: $includesOptimism
    ) {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;
