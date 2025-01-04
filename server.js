import express from "express";

const app = express();
const port = process.env.PORT || 5001;

const todos = [];

app.use(express.json());

app.get("/get-all-todos", (request, response) => {
  const message = !todos.length ? "todos empty" : "ye sab  todos";

  response.send({ data: todos, message: message });
});


app.post("/add-todo", (request, response) => {
  const obj = {
    todoContent: request.body.todo,
    id: String(new Date().getTime()),
  };

  todos.push(obj);

  response.send({ message: "todo add hogya h", data: obj });
});

app.patch("/edit-todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {

      todos[i].todoContent = request.body.todoContent;
      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(201).send({
      data: { todoContent: request.body.todoContent, id: id },
      message: "todo updated done",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

app.delete("/delete-todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {

      todos.splice(i, 1);

      isFound = true;
      break;
    }
  }

  if (isFound) {
    response.status(201).send({
      message: "todo deleted done",
    });
  } else {
    response.status(200).send({ data: null, message: "todo not found" });
  }
});

//

app.use((request, response) => {
  response.status(404).send("no  found!");
});

app.listen(port, () => {
  console.log(`Example app list on port ${port}`);
});

