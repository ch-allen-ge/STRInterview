import './profilePageStyles.css';
import { useEffect } from 'react';
const ProfilePage = () => {
    return (
        <div className='profilePageContainer'>
            <h1>Your Profile</h1>

            <div className='followersContainer'>
                <div className='followersCount'>

                </div>

                <div className='buttonsGroup'>

                </div>
            </div>

            <div className='following'>
                <div className='followingCount'>

                </div>

                <div className='buttonsGroup'>

                </div>
            </div>
        </div>
    )
};

export default ProfilePage;