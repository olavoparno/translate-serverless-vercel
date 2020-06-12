import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Link, CardMedia, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import './App.css'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 'calc(80vh - 24px)',
    padding: '1rem 0',
  },
  cardGrid: {
    padding: '2rem 0',
  },
  media: {
    padding: '0 1rem',
    backgroundSize: 'contain',
    height: '100%',
    width: '80%',
  },
})

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
  }, [setHealthResponse])
  const classes = useStyles()
  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container justify="center" alignItems="center" direction="column">
        <Typography component="h1" variant="h3">
          The project is currently:{' '}
          {healthDict[healthResponse?.status] ? healthDict[healthResponse.status].text : healthDict[0].text}
        </Typography>
        {healthResponse?.status === 500 ? (
          <>
            <Typography component="h2">Please watch the cat carefully</Typography>
            <Card elevation={0} className={classes.root}>
              <CardMedia className={classes.media} image="https://http.cat/418" title="Cat in a Teapot!" />
            </Card>
            <Typography component="p">
              Please refer to the documentation
              <Link href="https://github.com/olavoparno/translate-serverless-now/blob/master/README.md">README</Link>
            </Typography>
          </>
        ) : (
          <Card elevation={0} className={classes.root}>
            <CardMedia className={classes.media} image="https://http.cat/200" title="Everything is fine!" />
          </Card>
        )}
      </Grid>
    </Container>
  )
}

export default App
