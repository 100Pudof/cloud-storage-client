import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, searchFiles, setCurrentDir, uploadFile } from "../../redux/actions/fileActions";
import { RootState } from "../../redux/store";

import FileLists from "./fileList/FileList";
import { Button, MenuItem, TextField } from "@mui/material";
import Popup from "./Popup";
import Uploader from "./Uploader";
import prev from "../../images/prev.svg";
import { File } from "../../types/typesUpload";
import { changeProgressUpload } from "../../redux/actions/uploadActions";

const Disk = () => {
    const dispatch = useDispatch();
    const {currentDir, dirStack} = useSelector((state: RootState) => state.fileReducer);
    const styleButtons: React.CSSProperties = {textTransform: 'none', paddingBottom: 2, marginLeft: 15};

    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const [dragEnter, setDragEnter] = useState<boolean>(false);
    const [sort, setSort] = useState<string>("type");
    const [search, setSearch] = useState<string>("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
    const sortNames = [
        {value: "name", label: "Имя"},
        {value: "type", label: "Тип"},
        {value: "date", label: "Дата"},
    ];

    let progressFunc = (file: File) => {
        /*let percentCompleted = Math.round((value.loaded * 100) / value.total)*/
        dispatch(changeProgressUpload(file))
    }
    let handleAddFile = (name: string) => {
        dispatch(createDir(currentDir, name));
    }
    let handlerBackClick = () => {
        let backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId || ""));
    }
    let handlerSearch = (search: string) => {
        setSearch(search);
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        if (search) {
            setSearchTimeout(setTimeout((param) => {
                dispatch(searchFiles(param));
            }, 500, search))
        } else
            dispatch(getFiles(currentDir, sort));
    }
    let handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const files = [...event.target.files];
            files.forEach((file) => dispatch(uploadFile(file, currentDir, progressFunc)))
        }
    }
    let dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }
    let dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }
    let dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir, progressFunc)))
        setDragEnter(false);
    }

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
        setSearch("");
    }, [currentDir, sort]);
    return (
        <div className="container">
            {dragEnter
                ? <div
                    className="drop_area"
                    onDragEnter={dragEnterHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragEnterHandler}
                    onDrop={dropHandler}
                >
                    drag
                </div>
                : <div
                    className="disk"
                    onDragEnter={dragEnterHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragEnterHandler}
                >
                    <div className="nav_buttons">
                        <img src={prev} onClick={() => handlerBackClick()}/>
                        <Button
                            onClick={() => setOpenPopup(true)}
                            style={styleButtons}
                            variant="contained"
                        >
                            Создать новую папку
                        </Button>
                        <Button
                            component="label"
                            style={styleButtons}
                            variant="contained"
                        >
                            Загрузить новый файл
                            <input
                                hidden
                                accept="*"
                                multiple
                                type="file"
                                onChange={(e) => handleUploadFiles(e)}
                            />
                        </Button>
                        <TextField
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            sx={{width: 120}}
                            size="small"
                            select
                        >
                            {sortNames.map((name) => (
                                <MenuItem
                                    value={name.value}
                                    key={name.value}
                                >
                                    {name.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            value={search}
                            onChange={(e) => handlerSearch(e.target.value)}
                            variant="standard"
                            placeholder={"Поиск файла"}
                        />
                    </div>

                    <FileLists/>
                    <Popup
                        open={openPopup}
                        setOpen={setOpenPopup}
                        create={handleAddFile}
                    />
                </div>
            }
            <Uploader/>
        </div>
    );
};

export default Disk;