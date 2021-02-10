import React, { useState } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

const styles = ((theme) => ({
    toolbar: theme.mixins.toolbar
    })
)

const Exercise = (props) => {

    const { classes } = props

    return(
        <>
            <div className={classes.toolbar} />

            <div>
                <h1>Exercise component</h1><br />
                <h1>Exercise component</h1><br />
                <h1>Exercise component</h1><br />
                <h1>Exercise component</h1><br />
            </div>
        </>
    )
}

export default withStyles(styles)(Exercise)