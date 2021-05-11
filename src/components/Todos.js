import React, { useState } from "react";
import db from "./../firebase/firebase";

import { Button, Modal, FormControl, TextField } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todos = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Editar tarea</h2>
      <FormControl>
        <TextField
          label={props.todo.todo}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>
      <Button onClick={updateTodo}>Editar</Button>
    </div>
  );

  return (
    <div>
      <li>{props.todo.todo}</li>
      <Button
        onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}>
        <DeleteForeverIcon />
      </Button>
      <div>
        <Button type="button" onClick={handleOpen}>
          Editar
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {body}
        </Modal>
      </div>
    </div>
  );
};

export default Todos;
