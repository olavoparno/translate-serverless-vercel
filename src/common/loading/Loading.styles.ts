import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: '50%',
    right: ' 50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
