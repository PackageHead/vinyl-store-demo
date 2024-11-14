import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userModelMock: any;

  beforeEach(async () => {
    userModelMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: userModelMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@test.com',
      password: 'password',
      firstName: 'Name',
      lastName: 'SurName',
    };
    userModelMock.save.mockResolvedValue(createUserDto as any);

    const user = await userService.createUser(createUserDto);
    expect(user).toEqual(createUserDto);
  });

  it('should get user by email', async () => {
    const email = 'test@test.com';
    userModelMock.findOne.mockResolvedValue({ email });

    const user = await userService.getUserByEmail(email);
    expect(user.email).toBe(email);
  });

  it('should update user profile', async () => {
    const updateData: Partial<User> = { id: 1, email: 'updated@test.com' };
    userModelMock.findOne.mockResolvedValue({
      update: jest.fn().mockResolvedValue(updateData),
    });

    const user = await userService.updateProfile(updateData);
    expect(user.email).toBe('updated@test.com');
  });
});
