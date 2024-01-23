import './homePageStyles.css';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NewOrEditPostModal from '../../components/NewOrEditPostModal';
import { strGet } from '../../axios-config';
import PostsTable from '../../components/PostsTable';
import CircularProgress from '@mui/material/CircularProgress';
import DataChart from '../../components/DataChart';

const HomePage = () => {
    const username = useLocation().state.username;

    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [listening, setListening ] = useState(false);
    const [sourceFrequency, setSourceFrequency] = useState([]);

    useEffect(() => {
        if (!listening) {
            const events = new EventSource('http://localhost:3000/getAllPostsAndSourceFrequency', { withCredentials: true });
            
            events.onmessage = (event) => {
              const parsedData = JSON.parse(event.data);
              setAllPosts(parsedData.allCurrentPosts);
              setSourceFrequency(parsedData.sourceFrequency)
            };
      
            setListening(true);
        }
    }, [listening, allPosts]);

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

            {allPosts &&  <DataChart sourceFrequency={sourceFrequency} />}

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