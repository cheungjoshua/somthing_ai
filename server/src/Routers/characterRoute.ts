import express, { IRouter, Request, Response } from "express";
import { QueryTypes, Op } from "sequelize";

const router = express.Router();

const characterRouter = (db: any): IRouter => {
  router.post("/purchase", (req: Request, res: Response) => {
    console.log("received unlock request, searching for character now");

    if (!req.session!.userID) res.status(500).send("Please log in to purchase");

    db.character
      .findOne({
        where: {
          [Op.and]: [
            { name: req.body.character.toLowerCase().trim() },
            { price_cents: req.body.price },
          ],
        },
      })
      .then((response: any) => {
        console.log("search character result: ", response);
        if (!response)
          res.send("Oops, something went wrong! Please try again!");

        db.sequelize
          .query(
            "SELECT id, user_id, character_id, unlocked FROM users_characters WHERE user_id = ? AND character_id = ?",
            {
              replacements: [req.session!.userID, response.id],
              type: QueryTypes.SELECT,
              raw: true,
            }
          )
          .then((response: any) => {
            console.log("user_character table search done: ", response);
            console.log("Unlocking character for user");

            db.sequelize
              .query(
                `UPDATE users_characters
            SET unlocked = ?
            WHERE id = ?
            returning *`,
                {
                  replacements: [true, response[0].id],
                  type: QueryTypes.UPDATE,
                  raw: true,
                }
              )
              .then((response: any) => {
                console.log("upsert done, result is: ", response);
                console.log("sending characters array back to front-end");

                let nameExists = false;

                req.session!.userCharacters.forEach((character: any) => {
                  if (
                    character.name === req.body.character.toLowerCase().trim()
                  ) {
                    nameExists = true;
                  }
                });

                if (!nameExists) {
                  req.session!.userCharacters.push({
                    name: req.body.character.toLowerCase().trim(),
                    price: req.body.price,
                  });
                }
                console.log(
                  "Now the character array is: ",
                  req.session!.userCharacters
                );

                return res.status(200).json({
                  userID: req.session!.userID,
                  username: req.session!.username,
                  characters: req.session!.userCharacters,
                });
              });
          });
      })
      .catch((error: any) => {
        console.error(error);
      });
  });
  return router;
};

export default characterRouter;
