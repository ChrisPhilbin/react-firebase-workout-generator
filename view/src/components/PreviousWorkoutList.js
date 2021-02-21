import React, { useEffect, useState } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { authMiddleWare } from '../util/Auth'

import moment from 'moment'
import axios from 'axios'

const styles = ((theme) => ({
  toolbar: theme.mixins.toolbar,

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

          <div>
              {previousWorkous.map((workout) => (
                <div key={workout.workoutId}>
                  {moment(workout.createdAt).format('LL')}
                  {workout.exercises.map((exercise) =>(
                    <div>
                      {exercise.name}<br />
                      {exercise.sets}<br />
                      {exercise.reps}
                    </div>
                  ))}    
                </div>
              ))}
          </div>
        </>
      )
    }
}
export default withStyles(styles)(PreviousWorkoutList)