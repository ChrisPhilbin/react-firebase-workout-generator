import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'

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
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    progess: {
        position: 'absolute'
    }
});


const SignUp = (props) => {

    let [firstName, setFirstName]             = useState('')
    let [lastName, setLastName]               = useState('')
    let [phoneNumber, setPhoneNumber]         = useState('')
    let [country, setCountry]                 = useState('')
    let [userName, setUsername]               = useState('')
    let [email, setEmail]                     = useState('')
    let [password, setPassword]               = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [errors, setErrors]                   = useState('')
    let [loading, setLoading]                 = useState('')

    const { classes } = props

    return(
        <div>
            Hello
        </div>
    )
}

export default withStyles(styles)(SignUp)