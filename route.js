const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved",
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    var id = req.params["id"];
    console.log(req.body);
    console.log(id);
    let userdb = await User.findOne({
      _id: id,
    });
    if (userdb) {
      const updateUser = {
        email: req.body.email,
        firstName: req.body.firstName,
      };
      const user = await User.findByIdAndUpdate(id, updateUser, { new: true });
      console.log(user);

      res.status(201).json({
        message: "User updated",
        success: true,
      });
    } else {
      res.status(200).json({
        message: "User does not exists",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    var user = req.body;
    console.log(user);
    if (user) {
      const userdb = await User.create({
        email: user.email,
        firstName: user.firstName,
      });
      if (userdb) {
        res.status(201).json({
          message: "User added",
          success: true,
        });
      }
    } else {
      res.status(400).json({
        message: "please provide valid user",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    var id = req.params["id"];
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json({
        success: true,
        user: user,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "user does not exists with this id",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    var id = req.params["id"];
    const user = await User.findByIdAndDelete({ _id: id });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User deleted",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "user does not exists with this id",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

router.get("*", (req, res) => {
  res.status(404).json({
    message: "Page is not available",
    success: false,
  });
});

module.exports = router;
