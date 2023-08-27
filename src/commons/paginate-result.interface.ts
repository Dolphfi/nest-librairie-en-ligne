export class PaginateResult {
    data: any[];
    meta: {
      total: number;
      CurrentPage: number;
      nextPage: number;
      previousPage: number;
      firstPaginate: number;
      lastPaginate: number;
    };
  }