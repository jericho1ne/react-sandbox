import type { NextApiRequest, NextApiResponse } from 'next'
import type { 
  LogLine, 
  LogLineEnhanced, 
  LogRequestResponse
} from '@/app/lib/definitions'
import { fetchRawLogs } from '@/app/utils/fetcherMethods'

let herokuLog: LogLineEnhanced[] = []

const parseHerokuLogLine = (line: string): LogLine | null => {
  const parts = line.split(' ')

  // Find the parts containing method and path
  const methodIndex = parts.findIndex((part) => part.startsWith('method='))
  const pathIndex = parts.findIndex((part) => part.startsWith('path='))
  const bytesIndex = parts.findIndex((part) => part.startsWith('bytes='))
  const statusIndex = parts.findIndex((part) => part.startsWith('status='))
  const connectIndex = parts.findIndex((part) => part.startsWith('connect='))

  if (methodIndex === -1 || pathIndex === -1 || bytesIndex === -1 || statusIndex === -1 || connectIndex === -1) {
    return null
  }

  const method = parts[methodIndex].split('=')[1]
  const path = parts[pathIndex].split('=')[1]
  const bytes = parts[bytesIndex].split('=')[1]
  const status = parts[statusIndex].split('=')[1]
  const connect = parts[connectIndex].split('=')[1].replace('ms', '')

  return {
    method,
    path,
    bytes: Number(bytes),
    status: Number(status),
    latency: Number(connect),
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LogRequestResponse>) {
  const logUrl = 'https://gist.githubusercontent.com/bss/6dbc7d4d6d2860c7ecded3d21098076a/raw/244045d24337e342e35b85ec1924bca8425fce2e/sample.small.log'

  try {
    const response = await fetchRawLogs(logUrl)

    let LogStats: Map<string, LogLineEnhanced> = new Map()

    for (const line of response) {
      const logLine = parseHerokuLogLine(line)
      const path = logLine?.path || 'no_route'

      // Strip out user id
      const anonymizedPath = path.replace(/\/users\/(\d+)/, '/users/{id}')

      if (logLine) {
        const existingLogLine: LogLineEnhanced | undefined = LogStats.get(anonymizedPath)

        // If path already exists in our Map, increment the count
        // Else, it's the first time we've encountered this path
        if (existingLogLine) {
          const currCount = existingLogLine.count
          const currBytes = existingLogLine.bytesTotal || 0

          // Modify the Map object in place
          existingLogLine.count = currCount + 1
          existingLogLine.bytesTotal = currBytes + logLine.bytes
          existingLogLine.requests?.push(logLine)
        } else {
          LogStats.set(anonymizedPath, {
            path: anonymizedPath,
            method: logLine.method,   // Only needs to be set the first time around
            count: 1,
            requests: [logLine],
            bytesTotal: logLine.bytes,
          })
        }
      }
    }

    herokuLog = [...LogStats].map(([key, value]) => ({
      key,
      ...value,
    }))
  } catch (error) {
    console.error('Failed to fetch log data:', error)
  }
  
  if (herokuLog.length > 0) {
    res.status(200).json({ 
      success: true,
      data: herokuLog,
      error: null,
    })
  }
    
  res.status(500).json({
    success: false,
    data: [],
    error: 'Failed to fetch log data',
  })
}