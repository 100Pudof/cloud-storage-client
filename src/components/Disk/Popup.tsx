import React, { FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    create: (value: string) => void;
}
const Popup: FC<Props> = (props) => {
    const [nameDir, setNameDir] = useState<string>("");
    const styleButtons: React.CSSProperties = {textTransform: 'none', paddingBottom: 2};

    let handleCreate = () => {
        if (!nameDir)
            return
        props.create(nameDir);
        props.setOpen(false);
    }
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Создать новую папку</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    id="name"
                    label="Название папки"
                    value={nameDir}
                    onChange={(e) => setNameDir(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.setOpen(false)}
                    style={styleButtons}
                >
                    Отмена
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleCreate()}
                    style={styleButtons}
                >
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;