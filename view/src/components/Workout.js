import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

const styles = ((theme) => ({
    toolbar: theme.mixins.toolbar
    })
)

const Workout = (props) => {

    const { classes } = props

    return(
        <div>
            Workout component
        </div>
    )
}

export default withStyles(styles)(Workout)