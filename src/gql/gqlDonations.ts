export const fetchTotalDonationsUSD = `
  query (
    $fromDate: String
    $toDate: String
    $network: String
    $onlyVerified: Boolean
  ) {
    donationsTotalUsdPerDate (
      fromDate: $fromDate
      toDate: $toDate
      network: $network
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
    $network: String
    $onlyVerified: Boolean
  ) {
    totalDonationsPerCategory (
      fromDate: $fromDate
      toDate: $toDate
      network: $network
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
    $network: String
    $onlyVerified: Boolean
  ) {
    totalDonationsNumberPerDate (
      fromDate: $fromDate
      toDate: $toDate
      network: $network
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
