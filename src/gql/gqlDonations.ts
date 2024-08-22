export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
    $networkId: Float
    $onlyVerified: Boolean
  ) {
    donationsTotalUsdPerDate (
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
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
    $networkId: Float
    $onlyVerified: Boolean
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
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
    $networkId: Float
    $onlyVerified: Boolean
  ) {
    totalDonationsNumberPerDate (
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
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
    $fromDate: String!
    $toDate: String!
  ) {
    donationMetrics (
      startDate: $fromDate
      endDate: $toDate
    ) {
      totalDonationsToGiveth
      totalUsdValueToGiveth
      averagePercentageToGiveth
    }
  }
`;

export const fetchDonationTokenStats = `
  query (
    $fromDate: String
    $toDate: String
    $networkId: Float
  ) {
    getDonationStats(
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
    ) {
        currency
        uniqueDonorCount
        currencyPercentage
    }
  }
`;
