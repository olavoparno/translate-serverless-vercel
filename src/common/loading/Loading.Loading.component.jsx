import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useStyles } from './Loading.styles'

export function LoadingComponent() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  )
}
