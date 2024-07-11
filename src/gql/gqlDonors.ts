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

export const fetchNewDonorsCount = `
  query (
    $fromDate: String!
    $toDate: String!
  ) {
    newDonorsCountPerDate(
      fromDate: $fromDate
      toDate: $toDate
    ) {
      total
    }
  }
`;

export const fetchNewDonorsDonationTotalUsd = `
  query (
    $fromDate: String!
    $toDate: String!
  ) {
    newDonorsDonationTotalUsdPerDate(
      fromDate: $fromDate
      toDate: $toDate
    ) {
      total
    }
  }
`;
