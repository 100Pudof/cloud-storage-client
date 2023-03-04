import React, {useState} from 'react';
import {useSelector} from "react-redux";
import { Box, IconButton, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from "../../redux/store";

const Uploader = () => {
    const [progress, setProgress] = useState(10);
    const {files} = useSelector((state: RootState) => state.uploadReducer);

    let LinearProgressWithLabel = (props: LinearProgressProps & { value: number } & {name: string}) => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <div className="file_name">{props.name}</div>
                <Box sx={{width: '100%', mr: 1}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
    return (
        <div className="uploader">
            {/*  <IconButton
                className="close_upload"
                aria-label="close"
                onClick={() => {
                }}
            >
                <CloseIcon/>
            </IconButton>*/}
            {files.length > 0 &&
                files.map((file, indx) =>
                    <LinearProgressWithLabel
                        value={file.progress}
                        name={file.name}
                        key={indx}
                    />
                )
            }
        </div>
    );
};

export default Uploader;