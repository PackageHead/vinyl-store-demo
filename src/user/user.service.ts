import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async createUser(createUserDto: Partial<User>): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    return user.save();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getProfile(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      include: ['reviews', 'purchasedVinyls'],
    });
  }

  async updateProfile(updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: updateData.id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.update(updateData);
  }
}
