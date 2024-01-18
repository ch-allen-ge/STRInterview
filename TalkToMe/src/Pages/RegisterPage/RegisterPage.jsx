import './registerPageStyles.css';

import TextField from "@mui/material/TextField";
import { strPost } from '../../axios-config';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);

    const registerUser = async () => {
        const response = await strPost('/register', {
            username,
            password
        })
        .catch(() => setShowError(true));

        if (response && response.status === 200) {
            navigate('/home', {state: {username}});
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
            <div className='registerContainer'>
                <h1>Registration</h1>
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
                    type='password'
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
                    Register
                </Button>

                {showError && <h1>Error Registering</h1>}
            </div>
        </>
    );
};

export default RegisterPage;