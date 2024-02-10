import winston from 'winston';

const {combine, timestamp, printf, colorize, align} = winston.format;

const logger = winston.createLogger({
  format: combine(
    colorize({all: true}),
    timestamp({
      format: 'DD-MM-YYYY hh:mm:ss.SSS',
    }),
    align(),
    printf((log) => `[${log.timestamp}] ${log.level}: ${log.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/${new Date()}.log`,
    }),
  ],
});

export default logger;
