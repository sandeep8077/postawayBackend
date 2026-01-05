export default class CustomErrorHandler extends Error {
    constructor(Message,statusCode ){
        super(Message);
        this.statusCode = statusCode;
    }
}