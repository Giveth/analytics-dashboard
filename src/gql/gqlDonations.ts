export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimismOnly: Boolean
  ) {
    donationsTotalUsdPerDate (
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

export const fetchTotalDonationsPerCategory = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimismOnly: Boolean
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
      fromOptimismOnly: $fromOptimismOnly
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
    $fromOptimismOnly: Boolean
  ) {
    totalDonationsNumberPerDate (
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
