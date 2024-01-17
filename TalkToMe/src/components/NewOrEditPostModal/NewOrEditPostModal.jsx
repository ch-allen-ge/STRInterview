import { useEffect, useState } from 'react';
import { 
    Modal,
    FormGroup,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TextField
} from '@mui/material';
import { strPatch, strPost } from '../../axios-config';
import './newOrEditPostModal.css';
import { memo } from 'react';

const NewOrEditPostModal = ({modalOpen, handleClose, makeNewPost, postDetails}) => {
    const [source, setSource] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setSource(postDetails.source ?? '');
        setTopic(postDetails.topic ?? '');
        setContent(postDetails.content ?? '');
    }, [postDetails]);

    const handleSubmit = () => {
        try {
            if (makeNewPost) {
                strPost('/addPost', {
                    source,
                    topic,
                    content
                });
            } else {
                strPatch('/editPost', {
                    source,
                    topic,
                    content,
                    post_id: postDetails.post_id
                });
            }
            setSource('');
            setTopic('');
            setContent('');
            handleClose();
        } catch (e) {
            throw e;
        }
    };


    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='modalContainer'>
                <h1>{makeNewPost ? 'Create Post' : 'Edit Post'}</h1>

                <div className='postButtonContainer'>
                    <FormGroup>
                        <FormControl>
                            <InputLabel id="source-label">Source</InputLabel>
                            <Select
                                id='source'
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            >
                                <MenuItem value={'Zeus'}>Zeus</MenuItem>
                                <MenuItem value={'Poseidon'}>Poseidon</MenuItem>
                                <MenuItem value={'Hades'}>Hades</MenuItem>
                                <MenuItem value={'Hercules'}>Hercules</MenuItem>
                                <MenuItem value={'Kratos'}>Kratos</MenuItem>
                                <MenuItem value={'Boy'}>Boy</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <TextField
                            label="Topic"
                            variant="outlined"
                            value={topic}
                            onChange={(e) => {
                                setTopic(e.target.value)
                            }}
                        />
                        <br />
                        <TextField
                            label="Content"
                            variant="outlined"
                            value={content}
                            multiline maxRows={4}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                        />
                    </FormGroup>
                </div>
                <br />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {makeNewPost ? 'Post' : 'Save'}
                </Button>
            </div>
        </Modal>
    )
}

const customComparator = (prevProps, nextProps) => {
    return (JSON.stringify(nextProps.postDetails) === JSON.stringify(prevProps.postDetails)) && (nextProps.modalOpen === prevProps.modalOpen);
};

export default memo(NewOrEditPostModal, customComparator);