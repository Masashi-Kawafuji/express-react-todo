import {
  Model,
  DataTypes,
  Optional,
} from "sequelize";
import sequelize from '../db/sequelize';

type TodoAttributes = {
  id: number;
  body: string;
  isDone: boolean;
};

type TodoCreationAttributes = Optional<TodoAttributes, 'id' | 'isDone'>;

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
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
  sequelize: sequelize
});

Todo.sync();

export default Todo;