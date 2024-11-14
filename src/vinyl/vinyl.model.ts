import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Review } from '../review/review.model';
import { User } from '../user/user.model';

@Table({ tableName: 'vinyls', timestamps: true })
export class Vinyl extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Review)
  reviews: Review[];
}
