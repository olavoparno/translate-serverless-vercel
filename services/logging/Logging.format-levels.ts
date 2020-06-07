import { format } from 'winston'
import { Format } from 'logform'

const { splat, printf, combine, colorize, timestamp } = format

const colors = () =>
  colorize({
    all: true,
    colors: Object.freeze({
      trace: 'green',
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      fatal: 'red',
    }),
  })

const upperCaseLevel = format((info) => {
  info.level = info.level.toUpperCase()
  return info
})

const customFormat = () =>
  printf(({ level, message, timestamp, projectLabel }) => `[${timestamp}] ${level} - [${projectLabel}]: ${message}`)

const config = Object.freeze({
  colors,
  customFormat,
})

const combineLogFormats = (...formats: Format[]): Format => combine(upperCaseLevel(), timestamp(), splat(), ...formats)

export { config, combineLogFormats }
