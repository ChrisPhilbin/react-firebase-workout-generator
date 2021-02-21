import React, { useEffect, useState } from 'react'
import { authMiddleWare } from '../util/Auth'
import axios from 'axios'

const PreviousWorkoutList = (props) => {

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
        <div>
            {console.log(previousWorkous, "Previous workouts")}
            Previous Workout List Component
        </div>
    )
}

export default PreviousWorkoutList