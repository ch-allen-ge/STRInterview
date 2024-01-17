import './navbarStyles.css';

import { strGet, strPost } from '../../axios-config';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
      const getUsername = async () => {
        const response = await strGet('/getUsername');
        const user = response.data;
        setUsername(user);
      }
      
      getUsername();
    }, []);
    
    const logOut = async () => {
        const response = await strPost('/logout');
  
        if (response && response.status === 200) {
          navigate('/');
        }
    }

    return (
        <div className='titleSection'>
          <div
            className='titleText'
            onClick={() => {
              navigate('/home', {state: {username}});
            }}
          >
            Talk To Me
          </div>

          <div className="navbarButtons">
            <ButtonGroup variant="text">
              <Button
                  variant="text"
                  className="navButton"
                  style={{color: '#fefae0', borderColor: '#fefae0'}}
                  onClick={() => {
                    navigate('/profile');
                  }}
              >
                  Profile
              </Button>
  
              <Button
                  variant="text"
                  className="navButton"
                  style={{color: '#fefae0', borderColor: '#fefae0'}}
                  onClick={logOut}
              >
                  Log Out
              </Button>
            </ButtonGroup>
          </div>
        </div>
    );
}

export default Navbar;