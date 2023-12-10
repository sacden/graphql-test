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

export const UPDATE_DATA_SOURCE = gql`
  mutation UpdateDataSource($updateDataSourceId: BigInt!, $name: String, $archived: Boolean, $createdAt: ISO8601DateTime, $itemsCount: BigInt, $lastImport: ISO8601DateTime) {
    updateDataSource(id: $updateDataSourceId, name: $name, archived: $archived, createdAt: $createdAt, itemsCount: $itemsCount, lastImport: $lastImport) {
      dataSource {
        name
        archived
        createdAt
        itemsCount
        lastImport
      }
    }
  }
`;
