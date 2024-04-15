// backend.js
import express from "express";
import cors from "cors";

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

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
  };

const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
};

const deleteUserById = (id) => {
  if (!findUserById(id)) {
    return 404
  }
  users["users_list"] = users["users_list"].filter((user) => user.id != id)
  return 200
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined & (job != undefined)) {
    let result = findUserByName(name) && findUserByJob(job)
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    const deleted = deleteUserById(id)
    if (deleted) {
      res.status(204).send("User successfully deleted.");
    } else {
      res.status(404).send("User not found.");
    }
  });

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const generateId = () => Math.random().toFixed(8)

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId()
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});
