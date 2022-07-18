"use strict";
import { Model } from "sequelize";

interface UserAttributes {
  username: string;
  password: string;
  email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    username!: string;
    last_name!: string;
    password!: string;
    email!: string;

    static associate(models: any) {
      // define association here
      user.hasMany(models.conversation, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      user.belongsToMany(models.character, {
        through: models.users_character,
        as: "characters",
        foreignKey: "user_id",
      });

      user.belongsToMany(models.character, {
        through: models.transaction,
        as: "characters_transactions",
        foreignKey: "user_id",
      });

      user.hasMany(models.prompt, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  user.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
