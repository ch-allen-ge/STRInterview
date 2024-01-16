import { useState } from 'react';
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
import { strPost } from '../../axios-config';
import './newOrEditPostModal.css';

const NewOrEditPostModal = ({modalOpen, handleClose}) => {
    const [source, setSource] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        strPost('/addPost', {
            source,
            topic,
            content
        });
        handleClose();
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='modalContainer'>
                <h1>Make New Post</h1>

                <div className='postButtonContainer'>
                    <FormGroup>
                        <FormControl>
                            <InputLabel id="source-label">Source</InputLabel>
                            <Select
                                id='source'
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
                        <TextField label="Topic" variant="outlined" onChange={(e) => {setTopic(e.target.value)}}/>
                        <br />
                        <TextField label="Content" variant="outlined" multiline maxRows={4} onChange={(e) => {setContent(e.target.value)}}/>
                    </FormGroup>
                </div>
                <br />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Post
                </Button>
            </div>
        </Modal>
    )
}

export default NewOrEditPostModal;