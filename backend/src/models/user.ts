import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  HasManyRemoveAssociationMixin
} from 'sequelize';
import sequelize from '../db/sequelize';
import Todo from './todo';

type UserAttributes = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTodos!: HasManyGetAssociationsMixin<Todo>;
  public addTodo!: HasManyAddAssociationMixin<Todo, number>;
  public hasTodo!: HasManyHasAssociationMixin<Todo, number>;
  public countTodos!: HasManyCountAssociationsMixin;
  public createTodo!: HasManyCreateAssociationMixin<Todo>;
  public removeTodo!: HasManyRemoveAssociationMixin<Todo, number>;

  public readonly todos: Todo[];

  public static associations: {
    todos: Association<User, Todo>;
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(25),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(16),
    allowNull: false
  }
}, {
  tableName: 'users',
  sequelize
});

User.hasMany(Todo, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'todos'
});

export default User;