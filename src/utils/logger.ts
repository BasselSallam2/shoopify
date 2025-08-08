import morgan from "morgan";
import winston from "winston";

const log = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'src/LOGS/errors.log' }),
    new winston.transports.Console()
  ],
});


const logger = morgan((tokens, req, res) => {
  if (res.statusCode < 400) return null; 
  const ip = tokens['remote-addr']?.(req, res) ?? 'Unknown IP';
  const method = tokens.method?.(req, res) ?? "Unknown Method";
  const url = tokens.url?.(req, res) ?? "Unknown URL";
  const status = tokens.status?.(req, res) ?? "Unknown Status";
  const date = tokens.date?.(req, res, 'clf') ?? "Unknown Date";
  const userAgent = tokens['user-agent']?.(req, res) ?? "Unknown User Agent";

  return JSON.stringify({
    ip,
    method,
    url,
    status,
    date,
    userAgent
  });
}, {
  stream: {
    write: (message) => {
      try {
        const log = JSON.parse(message);
        log.error(`IP: ${log.ip}, Method: ${log.method}, URL: ${log.url}, Status: ${log.status}, Date: ${log.date}, UserAgent: ${log.userAgent}`);
      } catch {
        log.error(message);
      }
    }
  }
});

export default logger;
