/* eslint-disable new-cap */
/* eslint-disable no-undefined */
import Sequelize from 'sequelize';

// map to get the sequelize type definition
const map = {
  INTEGER: (size, precision, scale) =>
    precision ? Sequelize.INTEGER(precision, scale) : Sequelize.INTEGER,

  DECIMAL: (size, precision, scale) =>
    precision ? Sequelize.DECIMAL(precision, scale) : Sequelize.DECIMAL,

  DOUBLE: (size, precision, scale) =>
    precision ? Sequelize.DOUBLE(precision, scale) : Sequelize.DOUBLE,

  FLOAT: (size, precision, scale) =>
    precision ? Sequelize.FLOAT(precision, scale) : Sequelize.FLOAT,

  UUID: () => Sequelize.UUID,

  STRING: size => size ? Sequelize.STRING(size) : Sequelize.STRING,

  PASSWORD: size => size ? Sequelize.STRING(size) : Sequelize.STRING,

  DATE: () => Sequelize.DATE,

  BOOLEAN: () => Sequelize.BOOLEAN,

  TEXT: size =>
    size ? Sequelize.TEXT(size) : Sequelize.TEXT,
};

const resolveType = (defType, size, precision, scale) => {
  const resolve = map[defType];
  return resolve ? resolve(size, precision, scale) : undefined;
};

export const mapComplexType = definition => {
  // break apart so we can set defaults
  const {
    type, size = null, precision = null, scale = null, primaryKey = false,
    allowNull = true, unique = false, defaultValue, autoIncrement = false,
  } = definition;

  // map the type to the proper sequelize definition
  const resolvedType = resolveType(type, size, precision, scale);
  if (!resolvedType) {
    return undefined;
  }

  // return the sequelize definition
  return {type: resolvedType, allowNull, unique, defaultValue, autoIncrement, primaryKey};
};
