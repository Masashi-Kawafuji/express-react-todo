import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Optional,
  Association,
} from 'sequelize';
import sequelize from '../db/sequelize';
import User from './user';

type TodoAttributes = {
  id: number;
  userId: number;
  body: string;
  isDone: boolean;
};

type TodoCreationAttributes = Optional<TodoAttributes, 'id' | 'isDone'>;

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public userId!: number;
  public body!: string;
  public isDone!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'todos',
  sequelize
});

export default Todo;