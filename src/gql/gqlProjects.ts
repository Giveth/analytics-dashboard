// When includesOptimism is true, backend only returns projects that are verified
// and has OP as receiving address, and when includesOptimism is false, backend returns
// all projects with receiving addresses in any chain also including not verified projects
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
