import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useStyles } from './Loading.styles'

export function LoadingComponent(): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
