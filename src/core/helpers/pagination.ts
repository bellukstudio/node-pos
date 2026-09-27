export interface PaginationOptions {
    page: number;
    take: number;
    skip: number;
}

export function getPaginationOptions(
    pageValue: unknown,
    perPageValue: unknown,
): PaginationOptions {
    const parsedPage = Number.parseInt(String(pageValue ?? ''), 10);
    const parsedPerPage = Number.parseInt(String(perPageValue ?? ''), 10);
    const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const take = Number.isFinite(parsedPerPage) && parsedPerPage > 0
        ? Math.min(parsedPerPage, 100)
        : 10;

    return { page, take, skip: (page - 1) * take };
}
