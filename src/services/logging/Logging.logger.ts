import { transports, createLogger } from 'winston'
import { config, combineLogFormats } from './Logging.format-levels'

const { colors, customFormat } = config

export const Logger = createLogger({
  defaultMeta: {
    projectLabel: 'Translate Serverless Vercel',
  },
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combineLogFormats(colors(), customFormat()),
    }),
  ],
})
