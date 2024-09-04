export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
    $networkId: Float
    $onlyVerified: Boolean
    $onlyEndaoment: Boolean
  ) {
    donationsTotalUsdPerDate (
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
      onlyVerified: $onlyVerified
      onlyEndaoment: $onlyEndaoment
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
    $onlyEndaoment: Boolean
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
      onlyVerified: $onlyVerified
      onlyEndaoment: $onlyEndaoment
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
    $onlyEndaoment: Boolean
  ) {
    totalDonationsNumberPerDate (
      fromDate: $fromDate
      toDate: $toDate
      networkId: $networkId
      onlyVerified: $onlyVerified
      onlyEndaoment: $onlyEndaoment
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
