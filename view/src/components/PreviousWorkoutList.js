import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { authMiddleWare } from '../util/Auth'

import moment from 'moment'
import axios from 'axios'

const styles = ((theme) => ({
  toolbar: theme.mixins.toolbar,

  root: {
    flexGrow: 1,
    padding: 20,
    width: 500
  },

  uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  errorIcon: {
		position: 'fixed',
		zIndex: '1000',
		left: '50%',
		top: '35%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    position: 'relative',
  }
  
  })
)

const PreviousWorkoutList = (props) => {

    let { classes } = props

    let [previousWorkouts, setPreviousWorkouts] = useState([])
    let [uiLoading, setUiLoading]               = useState(true)

    useEffect(() => {

      authMiddleWare(props.history);
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };

      const fetchData = async () => {
        const respPreviousWorkouts = await axios(
          `/previousWorkouts`
        );
        setPreviousWorkouts(respPreviousWorkouts.data)
        setUiLoading(false)
      };
  
      fetchData();
    }, []);

    const handleDelete = (data) => {
      if (window.confirm("Are you sure you want to delete this workout?")) {
        authMiddleWare(props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        let previousWorkoutId = data.workoutId;
        axios
          .delete(`/previousWorkouts/${previousWorkoutId}`)
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (uiLoading === true) {
      return(
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
        </main>
      )
    } else if (previousWorkouts.length === 0) {
      return(
        <main className={classes.content}>
          <div className={classes.toolbar} />       
            <ErrorIcon className={classes.errorIcon} />
            <Typography variant="h6" noWrap>
                Looks like you don't have any saved workouts...
            </Typography>
        </main>
      )
    } else {
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
              {previousWorkouts.map((workout) => (
                <Grid item xs={12}>
                  <Paper elevation={3} className={classes.paper}>
                    <div key={workout.workoutId}>
                      <IconButton className={classes.delete}>
                        <DeleteIcon onClick={() => handleDelete(workout)} />
                      </IconButton>
                      <Typography variant="h4" noWrap>
                        {moment(workout.createdAt).format('LL')}
                      </Typography>
                      <Typography variant="h6" noWrap>
                        {workout.muscleGroups.map((group) => (
                          <span>
                            {`${group} `}
                          </span>
                        ))}
                      </Typography>
                      {workout.exercises.map((exercise) =>(
                        <div>
                          {exercise.name}<br />
                          Reps: {exercise.sets}<br />
                          Sets: {exercise.reps}<br />
                          <p></p>
                        </div>
                      ))}    
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )
    }
}
export default withStyles(styles)(PreviousWorkoutList)