export const fetchDonorsCount = `
  query (
    $fromDate: String
    $toDate: String
  ) {
    totalDonorsCountPerDate(
      fromDate: $fromDate
      toDate: $toDate
    ) {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;
