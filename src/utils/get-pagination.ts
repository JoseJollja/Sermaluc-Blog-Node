export const getPagination = (page: number, pageSize: number) => {
  return {
    skip: page === 1 ? 0 : pageSize * (page - 1),
    take: pageSize
  }
}
