import './homePageStyles.css';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NewOrEditPostModal from '../../components/NewOrEditPostModal';
import { strGet } from '../../axios-config';
import PostsTable from '../../components/PostsTable';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {
    const username = useLocation().state.username;

    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    useEffect(() => {
        const startShortPolling = setInterval(async () => {
            const response = await strGet('/getAllPosts');
            const allThePosts = response.data;
            setAllPosts(allThePosts);
        }, 1000);

        return () => {
            clearInterval(startShortPolling);
        };
    });

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

            {allPosts ? 
                <div className='postsTableContainer'>
                    <PostsTable allPosts={allPosts} username={username}/>
                </div>
            :
                <div className='spinner'>
                    <CircularProgress style={{'color': 'white'}}/>
                </div>
            }

            <NewOrEditPostModal
                modalOpen={showNewPostModal}
                handleClose={() => {setShowNewPostModal(false)}}
                makeNewPost={true}
                postDetails={{}}
            />
        </div>
    );
};

export default HomePage;