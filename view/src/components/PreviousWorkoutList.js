import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

import { authMiddleWare } from '../util/Auth'

import moment from 'moment'
import axios from 'axios'

const styles = ((theme) => ({
  toolbar: theme.mixins.toolbar,

  root: {
    width: '500'
  },

  uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
  })
)

const PreviousWorkoutList = (props) => {

    let { classes } = props

    let [previousWorkous, setPreviousWorkouts] = useState([])
    let [uiLoading, setUiLoading]              = useState(true)

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
              props.history.push('/previousWorkouts')
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
    } else {
      return(
        <>
          <div className={classes.toolbar} />

          <div className={classes.root}>
              {previousWorkous.map((workout) => (
                <Paper elevation={3}>
                  <div key={workout.workoutId}>
                    {console.log(workout, "Single workout object from array")}
                    {moment(workout.createdAt).format('LL')}
                    
                    <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(workout)}
                    >
                      Delete
                    </Button>
                    {workout.exercises.map((exercise) =>(
                      <div>
                        {exercise.name}<br />
                        {exercise.sets}<br />
                        {exercise.reps}
                      </div>
                    ))}    
                  </div>
                </Paper>
              ))}
          </div>
        </>
      )
    }
}
export default withStyles(styles)(PreviousWorkoutList)