import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          "FastReply",
          "media",
          {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
          },
          { transaction }
        ),
        queryInterface.addColumn(
          "FastReply",
          "voice",
          {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
          },
          { transaction }
        )
      ]);
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn("FastReply", "media", { transaction }),
        queryInterface.removeColumn("FastReply", "voice", { transaction })
      ]);
    });
  }
};
