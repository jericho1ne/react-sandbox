import React from 'react'
import approxNum from 'approximate-number'
import type { LogLine, LogLineEnhanced } from '@/app/lib/definitions'
import './RequestRow.scss'

interface Props {
  logLine: LogLineEnhanced
}

function RequestRow({ logLine }: Props) {
  const calcAvgLatency = (requests: LogLine[]) => {
    return requests.reduce((sum, val) => sum + val.latency, 0) / requests.length
  }

  return (
    <div className="path-row">
      <span className="path-row-count">{`${logLine.count} x requests`}</span>
      <span className="path-row-bytes">{`${approxNum(logLine.bytesTotal / 1000, { capital: true })}kb total`}</span>
      <span className="path-row-latency">
        {`Avg Latency: ${approxNum(calcAvgLatency(logLine.requests), { capital: true })}ms`}
      </span>
    </div>
  )
}

export default RequestRow