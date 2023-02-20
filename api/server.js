// SUNUCUYU BU DOSYAYA KURUN
const users = require("./users/model");

const express = require("express");
const server = express();
server.use(express.json());

// START YOUR SERVER HERE

server.get("/", (req, res) => {
  res.send("hello ");
});

server.get("/users", async (req, res) => {
  const getUsers = await users.find();
  res.status(200).json(getUsers);
  // res.status(200).json(find());
});

server.get("/users/:id", async (req, res) => {
  const user = await users.findById(req.params.id);
  user
    ? res.status(200).json(user)
    : res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
});

server.post("/users", async (req, res) => {
  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
  };
  if (newUser.name && newUser.bio) {
    await users.insert(newUser);
    res.status(201).json("created");
  } else {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  }
});

server.put("/users/:id", async (req, res) => {
  await users.update(req.params.id, { name: req.body.name, bio: req.body.bio });
  res.status(200).json("updated");
});

server.delete("/users/:id", async (req, res) => {
  const user = await users.findById(req.params.id);

  if (user) {
    await users.remove(req.params.id);
    res.status(200).json("deleted");
  } else {
    res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
  }
});
module.exports = server;
// SERVERINIZI EXPORT EDİN {}
