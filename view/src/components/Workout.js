import React, { useEffect, useState } from 'react'

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({

    toolbar: theme.mixins.toolbar,
    root: {
      width: 300
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
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

    const muscleGroups = [
      shoulders,
      chest,
      biceps,
      triceps,
      back,
      legs
    ]

    let [selectedExercises, setSelectedExercises] = useState([])

    const handleExerciseChange = (event) => {
      setSelectedExercises(event.target.value);
    }

    const handleExerciseChangeMultiple = (event) => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setSelectedExercises(value);
    }
  
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

        <FormControl className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          multiple
          displayEmpty
          value={selectedExercises}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select muscle group(s)</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select muscle group(s)</em>
          </MenuItem>
          {muscleGroups.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      </div>
    </>
    )
}

export default withStyles(styles)(Workout)