import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const healthDict: Record<number, any> = {
  200: {
    text: 'running',
  },
  500: {
    text: 'broken',
  },
  0: {
    text: 'loading...',
  },
}

function App(): JSX.Element {
  const [healthResponse, setHealthResponse] = useState<any>(null)
  useEffect(() => {
    async function getHealthStatus() {
      const res = await axios.post('/api/translate', { message: 'Translate me now!', from: 'en', to: 'pt' })
      setHealthResponse(res)
    }
    getHealthStatus()
  }, [])
  return (
    <main>
      <h2>
        The project is currently{' '}
        {healthDict[healthResponse?.status] ? healthDict[healthResponse.status].text : healthDict[0].text}
      </h2>
      {healthResponse?.status === 500 ? (
        <>
          <h1>Please watch the cat carefully</h1>
          <img src="https://http.cat/418" alt="Cat in a Teapot!" />
          <p>
            Please refer to the documentation
            <a href="https://github.com/olavoparno/translate-serverless-now/blob/master/README.md">README</a>
          </p>
        </>
      ) : null}
    </main>
  )
}

export default App
