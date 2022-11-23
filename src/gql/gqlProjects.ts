export const fetchProjectsCount = `
  query (
    $fromDate: String
    $toDate: String
  ) {
    projectsPerDate(
      fromDate: $fromDate
      toDate: $toDate
    )  {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;
