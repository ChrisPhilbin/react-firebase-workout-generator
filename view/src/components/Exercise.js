import React, { useEffect, useState } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios'

import { authMiddleWare } from '../util/Auth'

const styles = ((theme) => ({
    toolbar: theme.mixins.toolbar
    })
)

const Exercise = (props) => {

    let [exercises, setExercises]     = useState('')
    let [name, setName]               = useState('')
    let [muscleGroup, setMuscleGroup] = useState('')
    let [exerciseId, setExerciseId]   = useState('')
    let [errors, setErrors]           = useState([])
    let [open, setOpen]               = useState('')
    let [uiLoading, setUiLoading]     = useState(true)
    let [buttonType, setButtonType]   = useState('')
    let [viewOpen, setViewOpen]       = useState(false)

    useEffect(() => {
        authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/exercises')
			.then((response) => {
                setExercises(response.data)
                setUiLoading(false)
			})
			.catch((err) => {
				console.log(err);
			});
    }, [])

    const { classes } = props

    return(
        <>
            <div className={classes.toolbar} />

            <div>
                <h1>Exercise component</h1><br />
                <h1>Exercise component</h1><br />
                <h1>Exercise component</h1><br />
                <h1>Exercise component</h1><br />
            </div>
        </>
    )
}

export default withStyles(styles)(Exercise)