import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import TimerIcon from '@material-ui/icons/Timer'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { authMiddleWare } from '../util/Auth'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: 500,
      padding: 20,
    },
    floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolbar: theme.mixins.toolbar,
  }));

const ExerciseList = (props) => {

    const exercises    = props.exercises
    const sets         = props.sets
    const reps         = props.reps
    const muscleGroups = props.muscleGroups
    const classes      = useStyles();

    let exerciseSetsReps = []

    exercises.map((exericse) => {
        let exerciseObject = {}
        exerciseObject.name = exericse.name
        exerciseObject.sets = Math.floor(Math.random() * (sets[1] - sets[0] + 1) + sets[0])
        exerciseObject.reps = Math.floor(Math.random() * (reps[1] - reps[0] + 1) + reps[0])
        exerciseSetsReps.push(exerciseObject)
    })

    const saveWorkout = (event) => {
        event.preventDefault()
        authMiddleWare(props.history);
        let savedExercises = {
            exercises:    exerciseSetsReps,
            muscleGroups: muscleGroups
        };

        let options = {
            url: '/previousWorkouts',
            method: 'post',
            data: savedExercises
        }

        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios(options)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const openStopWatch = () => {
        alert("Begin!")
    }

    return(
        <>
            <div className={classes.toolbar} />

            <IconButton
                className={classes.floatingButton}
                color="primary"
                aria-label="Start the stop watch"
                onClick={openStopWatch}
            >
                <TimerIcon style={{ fontSize: 60 }} />
            </IconButton>

            <div className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing="3"
                >
                    {exerciseSetsReps.map((exercise) => (
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {exercise.name}<br />
                                Sets: {exercise.sets}<br />
                                Reps: {exercise.reps}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Button onClick={saveWorkout} variant="contained" color="primary">Finish & Save</Button>
            </div>
        </>
    )
}

export default ExerciseList