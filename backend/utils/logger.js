import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message, ...meta }) =>
        `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    // Uncomment for file logging:
    // new winston.transports.File({ filename: 'backend.log' }),
  ],
});

export default logger;
