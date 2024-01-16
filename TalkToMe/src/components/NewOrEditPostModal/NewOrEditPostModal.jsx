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
import './newOrEditPostModal.css';

const NewOrEditPostModal = ({modalOpen, handleClose}) => {
    const [source, setSource] = useState('');

    const handleSubmit = () => {
        //update db
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
                                value={source}
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
                        <TextField label="Topic" variant="outlined"/>
                        <br />
                        <TextField label="Content" variant="outlined" multiline maxRows={4}/>
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