import express from "express";
import User from "../models/user";
import mongoose from 'mongoose'
import { getToken, isAdm, isAuth } from "../../utils";

const router = express.Router();

// router.get("/createUserAdm", async (req, res) => {
//   try {
//     const user = new User({
//       name: "Davis",
//       email: "davispenha@gmail.com",
//       password: "123",
//       isADM: true,
//     });

//     const newUser = await user.save();

//     return res.status(200).send(newUser);
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// });

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(signinUser);
  if (signinUser) {
    return res.status(200).send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      password: signinUser.password,
      isADM: signinUser.isADM,
      token: getToken(signinUser),
    });
  } else {
    return res.status(401).send({ mensage: "Email ou Senha incorretos" });
  }
});
router.put("/updateUser/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    // console.log(user)
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email),
      (user.password = req.body.password || user.password);

    const updatedUser = await user.save();
    return res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isADM: updatedUser.isADM,
      token: getToken(updatedUser),
    });
  } else {
    return res.status(500).send({ message: "Falha ao atualizar o usuário" });
  }
});
router.post("/register", async (req, res) => {
  console.log(
    "ROUTE REGISTER ",
    req.body.name,
    req.body.email,
    req.body.password
  );
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  
  console.log("ROUTE REGISTER USER ", user);
  
  const newUser = await user.save();
  if (newUser) {
    return res.status(200).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      // password: newUser.password,
      isADM: newUser.isADM,
      token: getToken(newUser),
    });
  } else {
    return res.status(401).send({ mensage: "Email ou Senha incorretos" });
  }
});

export default router;
