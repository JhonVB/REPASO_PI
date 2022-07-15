const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return (
    sequelize.define("character", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
      },
      origin: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }),
    {
      timestamps: false,
    }
  );
};
