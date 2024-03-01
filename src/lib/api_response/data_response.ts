class DataResponse {
    status: number
    message: string
    data: any
    constructor(status=200, message="", data={}) {
        this.status = status
        this.message = message
        this.data = data
    }
}

export default DataResponse