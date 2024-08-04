declare module 'approximate-number'

export type LogLine = {
  method: string
  path: string
  bytes: number
  status: number
  latency: number
}

export type LogLineEnhanced = {
  count: number
  method: string
  path: string // Anonymized / wildcard path
  bytesTotal: number
  requests: LogLine[]
}

export type LogRequestResponse = {
  success: boolean,
  error: string | null,
  data: LogLineEnhanced[] | null,
}