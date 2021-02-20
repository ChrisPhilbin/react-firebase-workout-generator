import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { authMiddleWare } from '../util/Auth'
import axios from 'axios'

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
    const sets      = props.sets
    const reps      = props.reps
    const classes   = useStyles();

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
            exercises: exerciseSetsReps
        };

        console.log(savedExercises, "SAVED EXERCISES")

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
                    {console.log(exerciseSetsReps, "Array of exercises, sets, and reps")}
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
                <Button onClick={saveWorkout}>Finish & Save</Button>
            </div>
        </>
    )
}

export default ExerciseList