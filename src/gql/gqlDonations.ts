export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
    $fromOptimismOnly: Boolean
    $onlyVerified: Boolean
  ) {
    donationsTotalUsdPerDate (
      fromDate: $fromDate
      toDate: $toDate
      fromOptimismOnly: $fromOptimismOnly
      onlyVerified: $onlyVerified
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
    $onlyVerified: Boolean
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
      fromOptimismOnly: $fromOptimismOnly
      onlyVerified: $onlyVerified
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
    $onlyVerified: Boolean
  ) {
    totalDonationsNumberPerDate (
      fromDate: $fromDate
      toDate: $toDate
      fromOptimismOnly: $fromOptimismOnly
      onlyVerified: $onlyVerified
    ) {
      total
      totalPerMonthAndYear {
        total
        date
      }
    }
  }
`;

export const fetchDonationBoxMetrics = `
  query (
    $fromDate: String
    $toDate: String
  ) {
    donationMetrics (
      fromDate: $fromDate
      toDate: $toDate
    ) {
      totalDonationsToGiveth
      totalUsdValueToGiveth
      averagePercentageToGiveth
    }
  }
`;
