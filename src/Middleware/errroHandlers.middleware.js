import CustomErrorHandler from "../../ErrorHandlers/CustomError.handler.js";
import logger from "../Utils/logger.js";

const errorHandlerMiddleware = (err, req, res, next) => {
    const errorData = {
        message: err.message,
        stack: err.stack,
    };
    logger.error(JSON.stringify(errorData));

    if (err instanceof CustomErrorHandler) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    
    console.log(err.message)
    res.status(500).json({ message: "internal server error" });
};

export default errorHandlerMiddleware;