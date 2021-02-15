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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input';

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

    let [exercises, setExercises]                         = useState('')
    let [name, setName]                                   = useState('')
    let [muscleGroup, setMuscleGroup]                     = useState('')
    let [exerciseId, setExerciseId]                       = useState('')
    let [errors, setErrors]                               = useState([])
    let [open, setOpen]                                   = useState('')
    let [uiLoading, setUiLoading]                         = useState(true)
    let [buttonType, setButtonType]                       = useState('')
    let [viewOpen, setViewOpen]                           = useState(false)
    let [availableMuscleGroups, setAvailableMuscleGroups] = useState([])

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

    useEffect(() => {
        authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/muscleGroups')
			.then((response) => {
                setAvailableMuscleGroups(response.data)
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

    if (uiLoading === true) {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
            </main>
        );
    } else {
        return (
            <>
                <div className={classes.toolbar} />

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <IconButton
                        className={classes.floatingButton}
                        color="primary"
                        aria-label="Add Exercise"
                        onClick={handleClickOpen}
                    >
                        <AddCircleIcon style={{ fontSize: 60 }} />
                    </IconButton>
                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    {buttonType === 'Edit' ? 'Edit Exercise' : 'Create a new Exercise'}
                                </Typography>
                                <Button
                                    autoFocus
                                    color="inherit"
                                    onClick={handleSubmit}
                                    className={classes.submitButton}
                                >
                                    {buttonType === 'Edit' ? 'Save' : 'Submit'}
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="ExerciseName"
                                        label="Exercise Name"
                                        name="name"
                                        autoComplete="exerciseName"
                                        helperText={errors.name}
                                        value={name}
                                        error={errors.name ? true : false}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                <Select
                                    multiple
                                    displayEmpty
                                    value={muscleGroup}
                                    onChange={(e) => setMuscleGroup(e.target.value)}
                                    input={<Input />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                        return <em>Select muscle group</em>;
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                    <MenuItem disabled value="">
                                        <em>Select muscle group</em>
                                    </MenuItem>
                                    {availableMuscleGroups.map((item) => (
                                        <MenuItem key={item.muscleGroupId} value={item.name}>
                                        {name}
                                        </MenuItem>
                                    ))}
                                </Select>



                                    {/* <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="exercisMuslceGroup"
                                        label="Exercise Muscle Group"
                                        name="muscleGroup"
                                        autoComplete="exerciseMuscleGroup"
                                        helperText={errors.muscleGroup}
                                        error={errors.muscleGroup ? true : false}
                                        onChange={(e) => setMuscleGroup(e.target.value)}
                                        value={muscleGroup}
                                    /> */}
                                </Grid>
                            </Grid>
                        </form>
                    </Dialog>

                    <Grid container spacing={2}>
                        {exercises.map((exercise) => (
                            <Grid item xs={12} sm={6} key={exercise.exerciseId}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {exercise.name}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {dayjs(exercise.createdAt).fromNow()}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {exercise.muscleGroup}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => handleViewOpen({ exercise })}>
                                            {' '}
                                            View{' '}
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => handleEditClickOpen({ exercise })}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => deleteExerciseHandler({ exercise })}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Dialog
                        onClose={handleViewClose}
                        aria-labelledby="customized-dialog-title"
                        open={viewOpen}
                        fullWidth
                        classes={{ paperFullWidth: classes.dialogeStyle }}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
                            {name}
                        </DialogTitle>
                        <DialogContent dividers>
                            <TextField
                                fullWidth
                                id="exerciseMuscleGroup"
                                name="muscleGroup"
                                multiline
                                readonly
                                rows={1}
                                rowsMax={25}
                                value={muscleGroup}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </main>
            </>
        );
    }
}

export default withStyles(styles)(Exercise)