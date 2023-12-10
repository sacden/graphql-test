export const renderCell = (column, product) => {
  switch (column.id) {
    case 1:
      return ["name", product.name, false];
    case 2:
      return ["itemsCount", product.itemsCount, true];
    case 3:
      return product.archived ? ["archived", "true", false] : ["archived", "false", false];
    case 4:
      return ["icon", product.icon, true];
    case 5:
      return ["createdAt", product.createdAt, true];
    case 6:
      return ["lastImport", product.lastImport, true];
    default:
      return null;
  }
};
