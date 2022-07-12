import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();

const userRouter = (db: any): any => {
  router.post("/login", (req: any, res: any) => {
    console.log("Received login request!", req.body);

    db.user
      .findOne({ where: { email: req.body.email } })
      .then((response: any) => {
        console.log("ORM search completed: ", req.body);
        if (!response) {
          return res.send("Invalid email or password.");
        }

        if (
          !bcrypt.compareSync(req.body.password, response.dataValues.password)
        ) {
          return res.send("Invalid email or password.");
        }
        req.session.userID = response.dataValues.id;
        res.status(200).json({ userID: req.session.userID });
      })
      .catch((err: any) => console.error(err));
  });

  router.post("/logout", (req: any, res: any) => {
    console.log("Received logout request!");
    req.session.userID = null;
    console.log("Confirm user session is empty: ", req.session.userID);
    res.status(200).send("You have already logged out! See you!");
  });

  router.post("/register", (req: any, res: any) => {
    console.log("Received registration request!", req.body);
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    db.user
      .findOne({ where: { email: req.body.email } })
      .then((response: any) => {
        console.log("Search completed, response is: ");
        console.log(response);
        if (response) {
          return res.send("User already exists.");
        }
        return db.user.create({
          username: req.body.username,
          password,
          email: req.body.email,
          createAt: new Date(),
          updatedAt: new Date(),
        });
      })
      .then((response: any) => {
        console.log("Created user: " + response.id);
        req.session.userID = response.id;
        res.json(response);
      })
      .catch((err: any) => console.error(err));
  });

  return router;
};

export default userRouter;
