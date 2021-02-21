import React, { useEffect, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { authMiddleWare } from '../util/Auth'
import moment from 'moment'
import axios from 'axios'

const styles = ((theme) => ({
  toolbar: theme.mixins.toolbar,
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
        <div>
          Loading... Please wait
        </div>
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