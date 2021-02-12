import React, { useEffect, useState } from 'react'

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({

    toolbar: theme.mixins.toolbar,
    root: {
        width: 300
    }

})

const Workout = (props) => {

    const [exerciseRange, setExerciseRange] = useState([8, 15])
    const [repRange, setRepRange]           = useState([8, 12])

    const { classes } = props

    const exercisetext = (value) => {
        return `Between ${exerciseRange[0]} and ${exerciseRange[1]} number of exercises`
      }      

    const handleExerciseChange = (event, newValue) => {
      setExerciseRange(newValue);
    };

    const reptext = (value) => {
      return `Between ${repRange[0]} and ${repRange[1]} number of reps`
    }      

    const handleRepChange = (event, newValue) => {
      setRepRange(newValue);
    };

  
    return (
    <>
    {console.log(exerciseRange)}
      <div className={classes.toolbar} />

      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Select range of exercises
        </Typography>
        <Slider
          value={exerciseRange}
          min={1}
          max={25}
          onChange={handleExerciseChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={exercisetext}
        />

        <Typography id="range-slider" gutterBottom>
          Select range of reps
        </Typography>
        <Slider
          value={repRange}
          min={5}
          max={50}
          onChange={handleRepChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={reptext}
        />
      </div>
    </>
    )
}

export default withStyles(styles)(Workout)