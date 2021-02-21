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

    useEffect(() => {

        authMiddleWare(props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        const fetchData = async () => {
          const respPreviousWorkouts = await axios(
            `/previousWorkouts`
          );
          setPreviousWorkouts(respPreviousWorkouts.data)
        };
    
        fetchData();
      }, []);

    return(
      <>
        <div className={classes.toolbar} />

        <div>
            {console.log(previousWorkous, "Previous workouts")}
            Previous Workout List Component
        </div>
      </>
    )
}

export default withStyles(styles)(PreviousWorkoutList)