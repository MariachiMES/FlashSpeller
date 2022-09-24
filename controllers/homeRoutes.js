const router = require("express").Router();
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Word } = require("../models");
const { createRoutesFromChildren } = require("react-router");

//GET HOMEPAGE

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/addwords/:id");
    return;
  }
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

//GET USER'S WORDBANK

router.get("wordbank/:id", async (req, rest) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
    const logged_in_user = await User.findOne(
      {
        where: {
          email: req.session.email,
        },
      },
      {
        include: [{ all: true, nested: true }],
      }
    );
  } catch {}
});

//GET USER PAGE

module.exports = router;
