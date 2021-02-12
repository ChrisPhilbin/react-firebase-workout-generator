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

    const { classes } = props

    const valuetext = (value) => {
        return `Between ${value[0]} and ${value[1]} number of exercises`
      }      

    const [value, setValue] = useState([8, 15])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
    <>
        {console.log(value)}
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Select range of exercises
        </Typography>
        <Slider
          value={value}
          min={0}
          max={25}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    </>
    )
}

export default withStyles(styles)(Workout)