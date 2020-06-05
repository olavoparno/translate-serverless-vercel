import { transports, createLogger } from 'winston'
import { config, combineLogFormats } from './format-levels'

const { colors, customFormat } = config

export const Logger = createLogger({
  level: 'info',
  defaultMeta: {
    projectLabel: 'Translate Serverless Now',
  },
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combineLogFormats(colors(), customFormat()),
    }),
  ],
})
