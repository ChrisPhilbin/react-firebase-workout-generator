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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
    let [initialExercises, setInitialExercises]           = useState('')
    let [name, setName]                                   = useState('')
    let [muscleGroup, setMuscleGroup]                     = useState('')
    let [exerciseId, setExerciseId]                       = useState('')
    let [errors, setErrors]                               = useState([])
    let [open, setOpen]                                   = useState('')
    let [uiLoading, setUiLoading]                         = useState(true)
    let [buttonType, setButtonType]                       = useState('')
    let [viewOpen, setViewOpen]                           = useState(false)
    let [availableMuscleGroups, setAvailableMuscleGroups] = useState([])
    let [filteredBy, setFilteredBy]                       = useState('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          setInitialExercises(respExercises.data)
          setAvailableMuscleGroups(respMuscleGroups.data)
          setUiLoading(false)
        };
    
        fetchData();
      }, []);

    const deleteExerciseHandler = (data) => {
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let exerciseId = data.exercise.exerciseId;
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

    const filterExercises = (s) => {
        setFilteredBy(s)
        if (s != "") {
            setExercises(
                initialExercises.filter( (e) => {
                    return e.muscleGroup === s
                })
            )
        } else {
            setExercises(initialExercises)
        } 
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


                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{"Create a new exercise"}</DialogTitle>
                        
                        <DialogContent>
                            <DialogContentText>
                                Get creative by adding unique exercises based on your available equipment and setup.

                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoFocus
                                                variant="outlined"
                                                required
                                                id="ExerciseName"
                                                label="Exercise Name"
                                                name="name"
                                                side="medium"
                                                autoComplete="exerciseName"
                                                helperText={errors.name}
                                                value={name}
                                                error={errors.name ? true : false}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>

                                            <Select
                                                displayEmpty
                                                value={muscleGroup}
                                                onChange={(e) => setMuscleGroup(e.target.value)}
                                                input={<Input />}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                    return <em>Select muscle group</em>;
                                                    }

                                                    return selected;
                                                }}
                                                MenuProps={MenuProps}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                <MenuItem disabled value="">
                                                    <em>Select muscle group</em>
                                                </MenuItem>
                                                {availableMuscleGroups.map((item) => (
                                                    <MenuItem key={item.muscleGroupId} value={item.name}>
                                                    {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                        </Grid>
                                    </Grid>
                                </form>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button autoFocus onClick={handleSubmit} color="primary">
                                {buttonType === 'Edit' ? 'Save' : 'Submit'}
                            </Button>

                            <Button autoFocus onClick={handleClose} color="primary">
                                Cancel
                            </Button>

                        </DialogActions>
                    </Dialog>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select
                                displayEmpty
                                value={filteredBy}
                                onChange={(e) => filterExercises(e.target.value)}
                                input={<Input />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                    return <em>Filter by muscle group</em>;
                                    }

                                    return selected;
                                }}
                                MenuProps={MenuProps}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Filter by muscle group</em>
                                </MenuItem>
                                {availableMuscleGroups.map((item) => (
                                    <MenuItem key={item.muscleGroupId} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
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