import React, { FC } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { File as FileType } from "../../../../types/typesFiles";


import { deleteFile, downloadFile, pushToStack, setCurrentDir } from "../../../../redux/actions/fileActions";
import folder from "../../../../images/folder.svg";
import file_img from "../../../../images/file.svg";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Download } from "@mui/icons-material";
import { custonFuntions } from "../../../../helpers/helpFunc";

type Props = {
    file: FileType
}
const File: FC<Props> = ({file}) => {
    const dispatch = useDispatch();
    const {currentDir} = useSelector((state: RootState) => state.fileReducer);

    let handleCurrentDir = (dirId: string, fileType: string) => {
        if (fileType === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(dirId))
        }
    }

    let downloadHandler = (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => {
        event.stopPropagation();
        dispatch(downloadFile(file));
    }
    let deleteHandler = (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => {
        event.stopPropagation();
        dispatch(deleteFile(file));
    }
    return (
        <div className="tr" onClick={() => handleCurrentDir(file._id || "", file.type)}>
            <div className="col"><img src={file.type === "dir" ? folder : file_img}/></div>
            <div className="col">{file.name}</div>
            <div className="col">{moment(file.date).format("DD.MM.YY")}</div>
            <div className="col">{file.size ? custonFuntions.sizeFormat(file.size) :  ""}</div>
            <IconButton
                aria-label="download"
                onClick={(event) => downloadHandler(event, file)}
            >
                <Download/>
            </IconButton>

            <IconButton
                aria-label="delete"
                onClick={(event) => deleteHandler(event, file)}
            >
                <DeleteIcon/>
            </IconButton>

        </div>
    );
};

export default File;