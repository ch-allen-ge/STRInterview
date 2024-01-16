import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <div className='frontPageContainer'>
      <div>
        <img className='hermesLogo' src='/hermes.png' />
      </div>
      <h1>Talk To Me</h1>
      <div className="card">
        <Stack spacing={2} direction="row">
          <Button
            variant='contained'
            onClick={() => {navigate('/login')}}
          >
            Login
          </Button>
          <Button
            variant='contained'
            onClick={() => {navigate('/register')}}
          >
            Register
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default App
