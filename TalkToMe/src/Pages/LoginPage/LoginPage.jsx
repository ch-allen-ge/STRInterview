import './loginPageStyles.css';

import TextField from "@mui/material/TextField";
import { strPost } from '../../axios-config';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);

    const registerUser = async () => {
        const response = await strPost('/login', {
            username,
            password
        })
        .catch(() => setShowError(true));

        if (response && response.status === 200) {
            navigate('/home');
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        if (username !== '' && password !== '') {
            registerUser();
        }
    };

    return (
        <>
            <div className='loginContainer'>
                <h1>Log In</h1>
                <TextField
                    className=""
                    label='username'
                    variant="outlined"
                    autoComplete='off'
                    onChange={(e) => {
                        const text = e.target.value;
                        setUsername(text);
                    }}
                    error={submitted && username === ''}
                />
                <br />
                <TextField
                    className=""
                    label='password'
                    variant="outlined"
                    autoComplete='off'
                    onChange={(e) => {
                        const text = e.target.value;
                        setPassword(text);
                    }}
                    error={submitted && password === ''}
                />
                <br />
                <Button
                    variant="contained"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Login
                </Button>

                {showError && <h1>Error Registering</h1>}
            </div>
        </>
    );
};

export default LoginPage;