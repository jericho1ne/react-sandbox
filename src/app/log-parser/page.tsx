'use client'

import { useState, useEffect } from 'react'
import type { LogLine, LogLineEnhanced } from '@/app/lib/definitions'
import RequestRow from '@/components/RequestRow'
import RequestDetails from '@/components/RequestDetails'
import './log-parser.scss'

export default function LogParser() {
  const [logData, setLogData] = useState<LogLineEnhanced[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
    
  useEffect(() => {
    fetch('/api/heroku-logs')
      .then((res) => res.json())
      .then((res) => {
        setLogData(res.data as LogLineEnhanced[])
        setLoading(false)
    })
  }, [])


  return (
    <main className="page-log-parser">
      <h1>Heroku Log Parser</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
        {logData && logData.map((logLine: LogLineEnhanced, idx: number) => (
          <div 
            key={String(logLine.path)}
            className="path-group"
          >
            {/* Todo: Build a collapsible parent component */}
            <div className="path-group-title">
              {`${logLine.method}  ${logLine.path}`}
            </div>
            <RequestRow 
              key={`row-${idx as number}`}
              logLine={logLine as LogLineEnhanced}
            />
            
            <RequestDetails 
              key={`detail-${idx as number}`}
              requests={logLine.requests} 
            />
          </div>
        ))}
        </div>
      )}
    </main>
  )
}
