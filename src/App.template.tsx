import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Card,
  Fade,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  makeStyles,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { useSwr } from './hooks/useSwr'
import { LoadingComponent } from './common/loading/Loading.Loading.component'
import { TranslateResponse } from './interfaces'

const useStyles = makeStyles({
  root: {
    margin: '2rem 0',
    maxWidth: '100%',
  },
  container: {
    padding: 0,
  },
  media: {
    height: '100%',
  },
})

const healthDict = {
  200: {
    text: 'running',
  },
  500: {
    text: 'broken',
  },
  default: {
    text: 'broken',
  },
}

export function AppTemplate(): JSX.Element {
  const { data, error, isLoading } = useSwr<{ information: string; translation: TranslateResponse }>('/api/translate', {
    message: 'Translate me now!',
    from: 'en',
    to: 'pt',
  })
  const classes = useStyles()

  if (isLoading || !data) {
    return (
      <Container className={classes.container}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <LoadingComponent />
        </Grid>
      </Container>
    )
  }

  const { information } = data

  const healthStatus = information === 'From cache.' ? 200 : 500

  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Fade in={data !== null} timeout={500}>
          <Card className={classes.root}>
            <CardMedia
              component="img"
              className={classes.media}
              image={`https://http.cat/${healthStatus}`}
              title="Current API Status"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Translate Serverless Vercel
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                Serverless Translation API using Vercel's API
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                The project is currently:{' '}
                {healthDict[healthStatus] ? healthDict[healthStatus].text : healthDict.default.text}
              </Typography>
              {healthDict[healthStatus] && (
                <Typography variant="body2" component="p" color="textSecondary">
                  Status Text: {healthStatus}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Tooltip title="Project" placement="top-end">
                <IconButton href="https://github.com/olavoparno/translate-serverless-vercel" aria-label="readme">
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Fade>
      </Grid>
    </Container>
  )
}
