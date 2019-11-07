
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TimeRegistry extends Model { }

  TimeRegistry.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { sequelize });

  TimeRegistry.findById = async id => {
    return await TimeRegistry.findOne({ where: { id: id } });
  }

  return TimeRegistry;
}
