export interface PaginatedResult<T> {
  data: T[];
  header?: any;
  last_page: number;
  meta: {
    totalItems: number;
    itemCount: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export type PaginateOptions = {
  page?: number | string;
  size?: number | string;
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
  header?: any,
) => Promise<PaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (
    model,
    args: any = { where: undefined },
    options,
    header: any,
  ) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const perPage = Number(options?.size || defaultOptions?.size) || 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({
        ...(args.where ? { where: args.where } : {}),
      }),
      model.findMany({
        ...args,
        where: {
          ...(args.where ? { where: args.where } : {}),
          deleted_at: null,
        },
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);
    //
    return {
      data: data,
      header: header || null,
      last_page: lastPage,
      meta: {
        totalItems: total,
        itemCount: data.length,
        totalPages: lastPage,
        currentPage: page,
        itemsPerPage: perPage,
      },
    };
  };
};
