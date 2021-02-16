import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import HistoryIcon from '@material-ui/icons/History';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import Account from '../components/Account'
import Exercise from '../components/Exercise'
import Workout from '../components/Workout'
import PreviousWorkout from '../components/PreviousWorkout';

import { authMiddleWare } from '../util/Auth'

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
})

const Home = (props) => {

    let [render, setRender]                 = useState('exercise')
    let [firstName, setFirstName]           = useState('')
    let [lastName, setLastName]             = useState('')
    let [email, setEmail]                   = useState('')
    let [phoneNumber, setPhoneNumber]       = useState('')
    let [country, setCountry]               = useState('')
    let [userName, setUserName]             = useState('')
    let [uiLoading, setUiLoading]           = useState(false)
    let [profilePicture, setProfilePicture] = useState('')
    let [errors, setErrors]                 = useState({})

    useEffect(() => {
        authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
                setFirstName(response.data.userCredentials.firstName)
                setLastName(response.data.userCredentials.lastName)
                setEmail(response.data.userCredentials.email)
                setPhoneNumber(response.data.userCredentials.phoneNumber)
                setCountry(response.data.userCredentials.country)
                setUserName(response.data.userCredentials.username)
                setUiLoading(false)
                setProfilePicture(response.data.userCredentials.imageUrl)
			})
			.catch((error) => {
				if(error.response.status === 403) {
					props.history.push('/login')
				}
				setErrors({ errorMsg: 'Error in retrieving the data' });
			});
	}, [])
	
	const logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		props.history.push('/login');
	};

	const { classes } = props;	

	if (uiLoading === true) {
		return (
			<div className={classes.root}>
				{uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
			</div>
		);
	} else {
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" noWrap>
							Random Workout Generator
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.toolbar} />
					<Divider />
					<center>
						<Avatar src={profilePicture} className={classes.avatar} />
						<p>
							{' '}
							{firstName} {lastName}
						</p>
					</center>
					<Divider />
					<List>

						<ListItem button key="Workout" onClick={() => setRender("workout")}>
							<ListItemIcon>
								{' '}
								<FiberNewIcon />{' '}
							</ListItemIcon>
							<ListItemText primary="Generate Workout" />
						</ListItem>

						<ListItem button key="Previous Workouts" onClick={() => setRender("previous")}>
							<ListItemIcon>
								{' '}
								<HistoryIcon />{' '}
							</ListItemIcon>
							<ListItemText primary="Previous Workouts" />
						</ListItem>
						
						<ListItem button key="Exercise" onClick={() => setRender("exercise")}>
							<ListItemIcon>
								{' '}
								<NotesIcon />{' '}
							</ListItemIcon>
							<ListItemText primary="List Exercises" />
						</ListItem>

						<ListItem button key="Account" onClick={() => setRender("account")}>
							<ListItemIcon>
								{' '}
								<AccountBoxIcon />{' '}
							</ListItemIcon>
							<ListItemText primary="Account" />
						</ListItem>

						<ListItem button key="Logout" onClick={logoutHandler}>
							<ListItemIcon>
								{' '}
								<ExitToAppIcon />{' '}
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItem>
					</List>
				</Drawer>

				<div>
					{
						{
							'exercise': <Exercise />,
							'workout': <Workout />,
							'account': <Account />,
							'previous': <PreviousWorkout />
						}[render] || <Workout />
					}
				</div>
				

			</div>
		);
	}
}

export default withStyles(styles)(Home)