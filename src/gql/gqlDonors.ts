export const fetchDonorsCount = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimismOnly: Boolean
  ) {
    totalDonorsCountPerDate(
      fromDate: $fromDate
      toDate: $toDate
      fromOptimismOnly: $fromOptimismOnly
    ) {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;
