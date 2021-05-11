import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, Box, List } from "@material-ui/core";
import Todos from "./Todos";
import db from "./../firebase/firebase";
import firebase from "firebase";

const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState();

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div>
      <h1>Tareas</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <TextField
            label="Tarea nueva"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Box m={2}>
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={addTodo}>
            Agregar Tarea
          </Button>
        </Box>
      </form>
      <div>
        <List>
          {todos.map((todo) => (
            <Todos todo={todo} />
          ))}
        </List>
      </div>
    </div>
  );
};

export default TodoForm;
