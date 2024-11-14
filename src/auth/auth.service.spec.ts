import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('testToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should throw an error if user already exists', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
      };

      jest
        .spyOn(userService, 'getUserByEmail')
        .mockResolvedValueOnce({} as any);

      await expect(authService.register(createUserDto)).rejects.toThrow(
        new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should hash the password and create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
      };

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce({} as any);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');

      const result = await authService.register(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(userService.createUser).toHaveBeenCalledWith({
        email: createUserDto.email,
        password: 'hashedPassword',
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });
      expect(result).toBeDefined();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = {
        id: '123',
        email: 'test@example.com',
      } as any;

      const result = await authService.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        sub: user.id,
      });
      expect(result.access_token).toBe('testToken');
    });
  });

  describe('googleLogin', () => {
    it('should return access token', async () => {
      const user = {
        id: '123',
        email: 'test@example.com',
      } as any;

      const result = await authService.googleLogin(user);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        sub: user.id,
      });
      expect(result.access_token).toBe('testToken');
    });
  });

  describe('findOrCreateGoogleUser', () => {
    it('should return existing user if found', async () => {
      const email = 'test@example.com';
      const firstName = 'Test';
      const lastName = 'User';

      const existingUser = { id: '123', email } as any;
      jest
        .spyOn(userService, 'getUserByEmail')
        .mockResolvedValueOnce(existingUser);

      const result = await authService.findOrCreateGoogleUser(
        email,
        firstName,
        lastName,
      );

      expect(userService.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(existingUser);
    });

    it('should create a new user if not found', async () => {
      const email = 'test@example.com';
      const firstName = 'Test';
      const lastName = 'User';

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce({} as any);

      const result = await authService.findOrCreateGoogleUser(
        email,
        firstName,
        lastName,
      );

      expect(userService.createUser).toHaveBeenCalledWith({
        email,
        firstName,
        lastName,
      });
      expect(result).toBeDefined();
    });
  });
});
