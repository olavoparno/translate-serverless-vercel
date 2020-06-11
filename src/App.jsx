import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const healthDict = {
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

function App() {
  const [healthStatus, setHealthStatus] = useState(0)
  useEffect(() => {
    async function getHealthStatus() {
      const res = await axios.post('/api/translate', {
        message: 'Translate me now!',
        from: 'en',
        to: 'pt',
      })
      setHealthStatus(+res.status)
    }
    getHealthStatus()
  }, [])
  return (
    <main>
      <h2>The project is currently{healthDict[healthStatus] ? healthDict[healthStatus].text : healthDict[0].text}</h2>
      {healthStatus === 500 ? (
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
