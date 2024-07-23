export const fetchRecurringDonationsCount = `
  query (
    $fromDate: String
    $toDate: String
    $networkId: Float
    $onlyVerified: Boolean
  ) {
    recurringDonationsCountPerDate (
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
      totalPerToken {
        token
        total
      }
    }
  }
`;

export const fetchRecurringDonationsTotalUSD = `
  query (
    $fromDate: String
    $toDate: String
    $networkId: Float
    $onlyVerified: Boolean
  ) {
    recurringDonationsTotalStreamedUsdPerDate (
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
      totalPerToken {
        token
        total
      }
    }
  }
`;