import './homePageStyles.css';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import NewOrEditPostModal from '../../components/NewOrEditPostModal';

const HomePage = () => {
    const username = useLocation().state.username;

    const [showNewPostModal, setShowNewPostModal] = useState(false);

    return (
        <div className='homepage'>
            <Navbar />
            
            <div className='homepageContainer'>
                <div className='makePostContainer'>
                    <img className='profilePic' src='/profilePic.svg' />

                    <div className='makePostButton' onClick={() => {setShowNewPostModal(true)}}>
                        What's on your mind {username}?
                    </div>
                </div>
            </div>

            <NewOrEditPostModal
                modalOpen={showNewPostModal}
                handleClose={() => {setShowNewPostModal(false)}}
            />
        </div>
    );
};

export default HomePage;