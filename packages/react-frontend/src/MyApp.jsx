// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          setCharacters(characters.filter((user) => user._id != id));
        } else console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => (res.status == 201 ? res.json() : undefined))
      .then((json) => {
        if (json) setCharacters([...characters, json]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}
export default MyApp;
