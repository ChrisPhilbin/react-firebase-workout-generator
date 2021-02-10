import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Account from '../components/Account'
import Exercise from '../components/Exercise'

const Home = (props) => {

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName]   = useState('')
    let [email, setEmail]         = useState('')
    let [phoneNumber, setPhoneNumber] = useState('')
    let [country, setCountry]         = useState('')
    let [userName, setUserName]       = useState('')
    let [uiLoading, setUiLoading]     = useState(false)
    let [profilePicture, setProfilePicture] = useState('')
    let [errors, setErrors] = useState({})

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

    return(
        <div>
            Welcome home!
        </div>
    )
}

export default Home