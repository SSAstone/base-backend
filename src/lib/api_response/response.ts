export class ApiResponse {
    public static response(status: number, message: string, data?: any, success: boolean = true) {
        return {
            status,
            message,
            data,
            success
        }
    }
    public static errorResponse(status: number, message: string, error?: any, success: boolean = false) {
        return {
            status,
            message,
            error,
            success
        }
    }
    public static paginateResponse(status: number, message: string, data: any, success: boolean = true) {
        return {
            status,
            message,
            data: {
                totalDocs: data.length,
                data,
                limit: 'perPage',
                page: 'currentPage',
                nextPage: 'next',
                prevPage: 'prev',
                totalPages: 'pageCount',
                hasPrevPage: 'hasPrev',
                hasNextPage: 'hasNext',
                pagingCounter: 'pageCounter',
                meta: 'paginator'
            },
            success
        }
    }
}