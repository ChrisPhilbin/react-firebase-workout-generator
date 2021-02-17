import React, { useEffect, useState } from 'react'

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import axios from 'axios'

import ExerciseList from './ExerciseList'
import { authMiddleWare } from '../util/Auth'

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

    let [exerciseRange, setExerciseRange] = useState([8, 15])
    let [repRange, setRepRange]           = useState([8, 12])
    let [setRange, setSetRange]           = useState([3, 6])
    let [exercises, setExercises]         = useState([])
    let [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
    let [muscleGroups, setMuscleGroups]   = useState([])
    let [randomExercises, setRandomExercises] = useState(null)

    const { classes } = props

    useEffect(() => {

      authMiddleWare(props.history);
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };

      const fetchData = async () => {
        const respExercises = await axios(
          `/exercises`
        );
        const respMuscleGroups = await axios(
          `/muscleGroups`
        );

        setExercises(respExercises.data)
        setMuscleGroups(respMuscleGroups.data)
      };

      fetchData();
    }, []);

    const exercisetext = (value) => {
        return `Between ${exerciseRange[0]} and ${exerciseRange[1]} number of exercises`
      }      

    const handleExerciseChange = (event, newValue) => {
      setExerciseRange(newValue);
    };

    const reptext = (value) => {
      return `Between ${repRange[0]} and ${repRange[1]} number of reps`
    }      

    const setText = () => {
      return `Between ${setRange[0]} and ${setRange[1]} number of sets`
    }

    const handleRepChange = (event, newValue) => {
      setRepRange(newValue);
    };

    const handleSetChange = (event, newValue) => {
      setSetRange(newValue)
    }

    const handleMuscleGroupChange = (event) => {
      setSelectedMuscleGroups(event.target.value);
    }

    const generateWorkout = () => {
      let matchingExercises = exercises.filter((exercise) => selectedMuscleGroups.includes(exercise.muscleGroup))
      if (matchingExercises.length < exerciseRange[0]) {
        return alert("It looks like you don't have enough exercises created to put together a workout!")
      } else {
        const shuffled = matchingExercises.sort(() => 0.5 - Math.random())
        setRandomExercises(shuffled.slice(0, Math.floor(Math.random() * exerciseRange[1]) + exerciseRange[0]))
        console.log(randomExercises, "random exercises")
      }

      console.log(matchingExercises, "matching exercises")
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    }
  
    if (!randomExercises) {
      return (
      <>
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
            Select range of sets
          </Typography>

          <Slider
            value={setRange}
            min={1}
            max={15}
            onChange={handleSetChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={setText}
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
            value={selectedMuscleGroups}
            onChange={handleMuscleGroupChange}
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
              <MenuItem key={name.muscleGroupId} value={name.name}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={generateWorkout} variant="contained" color="primary">
          Generate Workout
        </Button>
        </div>
      </>
      )
    } else {
      return(
        <ExerciseList
          exercises={randomExercises}
          reps={repRange}
          sets={setRange}
        />
      )
    }
}

export default withStyles(styles)(Workout)