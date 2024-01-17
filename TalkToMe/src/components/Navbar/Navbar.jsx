import './navbarStyles.css';

import { strPost } from '../../axios-config';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    const logOut = async () => {
        const response = await strPost('/logout');
  
        if (response && response.status === 200) {
          navigate('/');
        }
    }

    return (
        <div className='titleSection'>
          <div className='titleText'>
            Talk To Me
          </div>

          <div className="navbarButtons">
            <ButtonGroup variant="text">
              <Button
                  variant="text"
                  className="navButton"
                  onClick={() => {
                    navigate('/profile');
                  }}
              >
                  Profile
              </Button>
  
              <Button
                  variant="text"
                  className="navButton"
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