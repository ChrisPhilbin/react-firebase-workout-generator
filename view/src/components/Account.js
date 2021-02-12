import React, { useEffect, useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';

import axios from 'axios';
import { authMiddleWare } from '../util/Auth';

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0
	},
	locationText: {
		paddingLeft: '15px'
	},
	buttonProperty: {
		position: 'absolute',
		top: '50%'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	progess: {
		position: 'absolute'
	},
	uploadButton: {
		marginLeft: '8px',
		margin: theme.spacing(1)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	submitButton: {
		marginTop: '10px'
	}
});

const Account = (props) => {

    let [firstName, setFirstName]           = useState('')
    let [lastName, setLastName]             = useState('')
    let [email, setEmail]                   = useState('')
    let [phoneNumber, setPhoneNumber]       = useState('')
    let [userName, setUserName]             = useState('')
    let [country, setCountry]               = useState('')
    let [profilePicture, setProfilePicture] = useState('')
    let [uiLoading, setUiLoading]           = useState(true)
    let [buttonLoading, setButtonLoading]   = useState(false)
    let [imageError, setImageError]         = useState('')
	let [image, setImage]                   = useState('')
	let [content, setContent]               = useState('')
	let [errorMsg, setErrorMsg]             = useState('')

    useEffect(() =>{ 
        authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				console.log(response.data);
				setFirstName(response.data.userCredentials.firstName)
				setLastName(response.data.userCredentials.lastName)
				setEmail(response.data.userCredentials.email)
				setPhoneNumber(response.data.userCredentials.phoneNumber)
				setCountry(response.data.userCredentials.country)
				setUserName(response.data.userCredentials.username)
				setUiLoading(false)
			})
			.catch((error) => {
				if (error.response.status === 403) {
					props.history.push('/login');
				}
				console.log(error);
				setErrorMsg('Error in retreiving the data')
			})
    }, [])

	const handleImageChange = (event) => {
        setImage(event.target.files[0])
	};

	const profilePictureHandler = (event) => {
		event.preventDefault();
		setUiLoading(true)
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		let form_data = new FormData();
		form_data.append('image', image);
		form_data.append('content', setContent(content));
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/user/image', form_data, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 403) {
					props.history.push('/login');
				}
				console.log(error);
				setUiLoading(false)
				setImageError("Error in posting the data")
			})
	}

	const updateFormValues = (event) => {
		event.preventDefault();
		setButtonLoading(true)
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
			firstName: firstName,
			lastName:  lastName,
			country:   country
		}
		axios
			.post('/user', formRequest)
			.then(() => {
				setButtonLoading(false)
			})
			.catch((error) => {
				if (error.response.status === 403) {
					props.history.push('/login');
				}
				console.log(error);
				setButtonLoading(false)
			})
	}

	
		const { classes, ...rest } = props;

		if (uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<CardContent>
							<div className={classes.details}>
								<div>
									<Typography className={classes.locationText} gutterBottom variant="h4">
										{firstName} {lastName}
									</Typography>
									<Button
										variant="outlined"
										color="primary"
										type="submit"
										size="small"
										startIcon={<CloudUploadIcon />}
										className={classes.uploadButton}
										onClick={profilePictureHandler}
									>
										Upload Photo
									</Button>
									<input type="file" onChange={handleImageChange} />

									{imageError ? (
										<div className={classes.customError}>
											{' '}
											Wrong Image Format || Supported Format are PNG and JPG
										</div>
									) : (
										false
									)}
								</div>
							</div>
							<div className={classes.progress} />
						</CardContent>
						<Divider />
					</Card>

					<br />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<form autoComplete="off" noValidate>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="First name"
											margin="dense"
											name="firstName"
											variant="outlined"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Last name"
											margin="dense"
											name="lastName"
											variant="outlined"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Email"
											margin="dense"
											name="email"
											variant="outlined"
											disabled={true}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Phone Number"
											margin="dense"
											name="phone"
											type="number"
											variant="outlined"
											disabled={true}
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="User Name"
											margin="dense"
											name="userHandle"
											disabled={true}
											variant="outlined"
											value={userName}
											onChange={(e) => setUserName(e.target.value)}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Country"
											margin="dense"
											name="country"
											variant="outlined"
											value={country}
											onChange={(e) => setCountry(e.target.value)}
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions />
						</form>
					</Card>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						className={classes.submitButton}
						onClick={updateFormValues}
						disabled={
							buttonLoading ||
							!firstName ||
							!lastName ||
							!country
						}
					>
						Save details
						{buttonLoading && <CircularProgress size={30} className={classes.progess} />}
					</Button>
				</main>
			);
		}

}

export default withStyles(styles)(Account);