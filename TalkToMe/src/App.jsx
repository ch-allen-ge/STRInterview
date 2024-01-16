import { useState } from 'react'
import { Button, Stack } from '@mui/material'
import './App.css'

function App() {
  return (
    <div className='frontPageContainer'>
      <div>
        <img className='hermesLogo' src='/hermes.png' />
      </div>
      <h1>Talk To Me</h1>
      <div className="card">
        <Stack spacing={2} direction="row">
          <Button variant='contained'>
            Login
          </Button>
          <Button variant='contained'>
            Register
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default App
