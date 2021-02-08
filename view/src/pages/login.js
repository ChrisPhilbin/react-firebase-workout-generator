import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	}
});


const login = () => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [errors, setErrors] = useState([])
    let [loading, setLoading] = useState(false)

    handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
		const userData = {
			email: email,
			password: password
		};
		axios
			.post('/login', userData)
			.then((response) => {
				localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
				setLoading(false)		
				this.props.history.push('/');
			})
			.catch((error) => {		
                setErrors(error.response.data)		
                setLoading(false)
			});
    };
    
    return(
        <div>
            Hello from login component
        </div>
    )
}

export default withStyles(styles)(login)