import './profilePageStyles.css';
import { useEffect, useState } from 'react';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { IconButton } from '@mui/material';
import { strGet, strPatch } from '../../axios-config';
import Navbar from '../../components/Navbar';

const ProfilePage = () => {
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    useEffect(() => {
        const getFollowers = async () => {
            const response = await strGet('/getFollowers');
            const numFollowers = response.data[0].followers;
            setFollowers(numFollowers);
        }

        const getFollowing = async () => {
            const response = await strGet('/getFollowing');
            const numFollowing = response.data[0].following;
            setFollowing(numFollowing);
        }

        getFollowers();
        getFollowing();
    }, []);

    const setFollowersDb = async (followers) => {
        const response = await strPatch('/setFollowers', {
            followers
        });
        setFollowers(response.data[0].followers)
    };

    const setFollowingDb = async (following) => {
        const response = await strPatch('/setFollowing', {
            following: following
        });
        setFollowing(response.data[0].following)
    };

    return (
        <>
            <Navbar />
            <div className='profilePageContainer'>
                <h1>Your Profile</h1>

                <div className='flexRow'>
                    <div className='flexColumn'>
                        <h3>Followers</h3>
                        <div className='count'>
                            {followers}
                        </div>
                    </div>
                    
                    <div className='verticalLine' />

                    <div className='flexColumn'>
                        <IconButton onClick={() => {setFollowersDb(followers + 1)}}>
                            <NorthIcon />
                        </IconButton>
                        <IconButton onClick={() => {setFollowersDb(followers - 1)}}>
                            <SouthIcon />
                        </IconButton>
                    </div>
                </div>

                <br /><br />

                <div className='flexRow'>
                    <div className='flexColumn'>
                        <h3>Following</h3>
                        <div className='count'>
                            {following}
                        </div>
                    </div>
                    
                    <div className='verticalLine' />

                    <div className='flexColumn'>
                        <IconButton onClick={() => {setFollowingDb(following + 1)}}>
                            <NorthIcon />
                        </IconButton>
                        <IconButton onClick={() => {setFollowingDb(following - 1)}}>
                            <SouthIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfilePage;