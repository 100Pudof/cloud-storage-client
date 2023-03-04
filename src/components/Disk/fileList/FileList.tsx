import React from "react";
import File from "./file/File";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const FileList = () => {
    const {files} = useSelector((state: RootState) => state.fileReducer);

    return (
        <div className="file_list">
            <div className="th">
                <div className="col">Название</div>
                <div className="col">Дата</div>
                <div className="col">Размер(Кб)</div>
            </div>
            <TransitionGroup>
                {files.map((elem) =>
                    <CSSTransition
                        key={elem._id}
                        timeout={300}
                        classNames={"file"}
                        exit={false}
                    >
                        <File file={elem}/>
                    </CSSTransition>
                )
                }
            </TransitionGroup>
        </div>
    );
};

export default FileList;