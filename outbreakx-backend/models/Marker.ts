// models/Marker.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Marker extends Model {
  public id!: number;
  public location!: { type: 'Point', coordinates: number[] };
  public description!: string;
}

Marker.init({
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Marker'
});

export default Marker;
