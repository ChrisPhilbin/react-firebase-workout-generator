import React, { useEffect, useState } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/Auth';

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3)
	},
	root: {
		minWidth: 470
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
    })
);

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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

    const deleteExerciseHandler = (data) => {
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let exerciseId = data.Exercise.exerciseId;
		axios
			.delete(`exercises/${exerciseId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
    }
    
    const handleEditClickOpen = (data) => {
        setName(data.exercise.name)
        setMuscleGroup(data.exercise.muscleGroup)
        setExerciseId(data.exercise.exerciseId)
        setButtonType('Edit')
        setOpen(true)
	}

    const handleViewOpen = (data) => {
        setName(data.exercise.name)
        setMuscleGroup(data.exercise.muscleGroup)
        setViewOpen(true)
    }
    
    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        viewRoot: {
            padding: theme.spacing(2)
        }
    }))(MuiDialogContent);

    dayjs.extend(relativeTime);
    // const { classes } = props;
    // const { open, errors, viewOpen } = this.state;

    const handleClickOpen = () => {
        setExerciseId('')
        setName('')
        setMuscleGroup('')
        setButtonType('')
        setOpen(true)
    };

    const handleSubmit = (event) => {
        authMiddleWare(props.history);
        event.preventDefault();
        const userExercise = {
            name: name,
            muscleGroup: muscleGroup
        };
        let options = {};
        if (buttonType === 'Edit') {
            options = {
                url: `/exercises/${exerciseId}`,
                method: 'put',
                data: userExercise
            };
        } else {
            options = {
                url: '/exercises',
                method: 'post',
                data: userExercise
            }
        }
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios(options)
            .then(() => {
                setOpen(false)
                window.location.reload();
            })
            .catch((error) => {
                setOpen(true)
                setErrors(error.response.data)
                console.log(error);
            })
    }

    const handleViewClose = () => {
        setViewOpen(false)
    }

    const handleClose = (event) => {
        setOpen(false)
    }

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