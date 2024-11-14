import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getProfile: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'John Doe' }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should return user profile', async () => {
    const result = await userController.getProfile({ user: { id: 1 } });
    expect(result).toEqual({ id: 1, name: 'John Doe' });
  });
});
