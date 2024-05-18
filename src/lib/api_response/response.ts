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
    // public static paginateResponse(
    //     status: number,
    //     message: string,
    //     data: any,
    //     total: number,
    //     currentPage: number,
    //     totalPages: number,
    //     limit: number,
    //     hasNextPage: boolean,
    //     hasPrevPage: boolean,
    //     success: boolean = true
    // ) {
    //     return {
    //         status,
    //         message,
    //         data: {
    //             totalDocs: total,
    //             docs: data,
    //             limit,
    //             page: currentPage,
    //             nextPage: hasNextPage,
    //             prevPage: hasPrevPage,
    //             totalPages,
    //             hasPrevPage,
    //             hasNextPage,
    //             pagingCounter: null,
    //             meta: 'paginator',
    //         },
    //         success,
    //     };
    // }
    public static paginateResponse(
        status: number,
        message: string,
        data: any,
        total: number,
        currentPage: any,
        limit: number,
        success: boolean = true
    ) {
        let pages = Math.ceil(total / limit);
        let current = parseInt(currentPage as string);
        return {
            status,
            message,
            totalDocs: total,
            docs: data,
            limit,
            page: current,
            nextPage: current < pages,
            prevPage: current > 1,
            totalPages: pages,
            pagingCounter: null,
            meta: 'paginator',
            success,
        };
    }
}