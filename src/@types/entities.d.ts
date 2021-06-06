export type User = {
    sub?: string
    role?: string,
    userName?:string,
    authorities?: string[],
    id?:string
}

export type ConnectedCredentials = {
    username: string,
    password: string
}

export type Sort = {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
}

export type Pageable = {
    sort: Sort
    pageNumber: number,
    pageSize: number,
    offset: number,
    unpaged: boolean,
    paged: boolean
}

export type PaginationObject = {
    pageable: Pageable
    last: boolean,
    totalPages: number,
    totalElements: number,
    sort: Sort
    numberOfElements: number,
    first: boolean,
    size: number,
    number: number,
    empty: boolean
}