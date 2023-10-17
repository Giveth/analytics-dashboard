export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimism: Boolean
  ) {
    donationsTotalUsdPerDate (
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

export const fetchTotalDonationsPerCategory = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimism: Boolean
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
      fromOptimism: $fromOptimism
    ) {
      id
      title
      slug
      totalUsd
    }
  }
`;

export const fetchDonationsCount = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimism: Boolean
  ) {
    totalDonationsNumberPerDate (
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
