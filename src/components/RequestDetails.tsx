import React from 'react'
import type { LogLine } from '@/app/lib/definitions'
import './RequestDetails.scss'

interface Props {
  requests: LogLine[]
}

const getStatusColor = (code: number) => {
  const statusColors = {
    '1xx': '#3399FF', // blue
    '2xx': '#33CC33', // green
    '3xx': '#FFCC33', // yellow
    '4xx': '#FF9933', // orange
    '5xx': '#FF0000', // orange
  }
  if (typeof code !== "number") {
    throw new TypeError("Input must be a number")
  }

  if (code < 100 || code > 599) {
    throw new RangeError("Invalid status code. Range: 100-599")
  }

  const bucket = `${Math.floor(code / 100)}xx`
  
  return statusColors[bucket as keyof typeof statusColors] || '#000'
}

const RequestsList = ({ requests }: Props) => {
  return (
    <div className="request-detail">
      {requests.map((request, i) => (
        <div 
          key={i}
          className="request-detail-child"
        >
          <span 
            className="status-badge" 
            style={{ backgroundColor: getStatusColor(request.status) }}
          >
            { request.status }
          </span>
          <span>{ request.path }</span>
        </div>
      ))}
    </div>
  )
}

export default RequestsList