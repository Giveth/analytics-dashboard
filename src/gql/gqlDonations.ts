export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
  ) {
    donationsTotalUsdPerDate(
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

export const fetchTotalDonationsPerCategory = `
  query (
    $fromDate: String
    $toDate: String
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
    ) {
      id
      title
      slug
      totalUsd
    }
  }
`;
