import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Vinyl } from '../vinyl/vinyl.model';
import { User } from '../user/user.model';

@Table
export class Review extends Model<Review> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  score: number;

  @ForeignKey(() => Vinyl)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vinylId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
