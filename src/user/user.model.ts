import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  avatar: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
