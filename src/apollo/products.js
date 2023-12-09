import { gql } from "@apollo/client";

export const ALL_PRODUCTS = gql`
  query DataSources {
    collection(page: 0, limit: 100, identifier: "organization", organizationId: 19952) {
      dataSources {
        id
        name
        archived
        createdAt
        archived
        icon
        itemsCount
        lastImport
      }
    }
  }
`;
