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
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import Account from '../components/Account'
import Exercise from '../components/Exercise'

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

    let [render, setRender]                 = useState(false)
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
                setFirstName(response.data.userCredentials.firstName),
                setLastName(response.data.userCredentials.lastName),
                setEmail(response.data.userCredentials.email),
                setPhoneNumber(response.data.userCredentials.phoneNumber),
                setCountry(response.data.userCredentials.country),
                setUserName(response.data.userCredentials.username),
                setUiLoading(false),
                setProfilePicture(response.data.userCredentials.imageUrl)
			})
			.catch((error) => {
				if(error.response.status === 403) {
					props.history.push('/login')
				}
				setErrors({ errorMsg: 'Error in retrieving the data' });
			});
    }, [])

    const loadAccountPage = (event) => {
        setRender(true)
	}

	const loadTodoPage = (event) => {
        setRender(false)
	}

	const logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		props.history.push('/login');
	};

    return(
        <div>
            Home
        </div>
    )
}

export default withStyles(styles)(Home)