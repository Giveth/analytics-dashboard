export const fetchDonorsCount = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimism: Boolean
  ) {
    totalDonorsCountPerDate(
      fromDate: $fromDate
      toDate: $toDate
      fromOptimism: $fromOptimism
    ) {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;
