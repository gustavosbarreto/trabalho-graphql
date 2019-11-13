
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TimeEntry extends Model { }

  TimeEntry.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { sequelize });

  TimeEntry.findById = async id => {
    return await TimeEntry.findOne({ where: { id: id } });
  }

  return TimeEntry;
}
