const router = require("express").Router();
const { User } = require("../../models");

//CREATE NEW USER

router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    if (userData) {
      res.status(401).json({ message: "This user has already signed up" });
      return;
    }

    const newUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log();
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = newUserData.user_id;
      req, (session.username = newUserData.username);
      req.session.email = newUserData.email;

      res.status(200).json(newUserData);
    });
  } catch (err) {
    console.log("Error", err);
    res.status(400).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(401)
        .json({ message: "Incorrect Email or Password, please try again" });
      res.render("/unauthorized");
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.logged_in = true;
      res.json({
        user: userData,
        message: "you are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//LOGOUT

router.post("/", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      req.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
