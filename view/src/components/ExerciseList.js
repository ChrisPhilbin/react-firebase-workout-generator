import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolbar: theme.mixins.toolbar,
  }));

const ExerciseList = (props) => {

    const exercises = props.exercises
    const classes = useStyles();

    return(
        <>
            <div className={classes.toolbar} />

            <div className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing="3"
                >
                    {exercises.map((exercise) => (
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>{exercise.name}</Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    )
}

export default ExerciseList