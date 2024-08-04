/**
 * Parses a generic plain text server log and return; each line as
 * @param url
 * @returns Promise containing an array of log lines
 */
export const fetchRawLogs = async(url: string): Promise<string[]> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch log data: ${response.statusText}`)
  }

  const data = await response.text()
  const logLines = data.split('\n')

  return logLines
}