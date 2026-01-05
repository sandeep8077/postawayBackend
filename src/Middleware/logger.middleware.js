import logger from '../Utils/logger.js';

const loggerMiddleware = (req, res, next) => {
  const logData = {
    method: req.method,
    url: req.url,
    body: req.body,
    statusCode: res.statusCode,
  };
  logger.info(JSON.stringify(logData));
  next();
};

export default loggerMiddleware;
