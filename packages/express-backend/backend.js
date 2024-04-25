// backend.js
import express from "express";
import cors from "cors";
import Users from "./csc-307-db-main/models/user-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  Users.getUsers(name, job)
    .then((users) => {
      res.json({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  Users.findUserById(id)
    .then((result) => {
      if (result) res.send(result);
      else res.status(404).send(`Not Found: ${id}`);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  Users.deleteUser(id)
    .then((deleted) => {
      if (deleted) res.status(204).send();
      else res.status(404).send("User not found.");
    })
    .catch((error) => {
      console.log("what is happening" + error);
      res.status(500).send(error.name);
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) => res.status(201).send(result));
});
