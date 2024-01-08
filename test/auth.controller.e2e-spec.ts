import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO, LoginUserDto } from 'src/dtos/user.dto';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = moduleFixture.get<AuthService>(AuthService);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('POST signup auth controller', () => {
    it('return a 201 status code for valid user data', async () => {
      const user: CreateUserDTO = {
        name: 'John Doe',
        email: 'john@doe.com',
        address: '123 Main St',
        dob: '1990-01-01',
        phone: '12345678',
        password: 'qwerty',
      };
      const response = await request(app.getHttpServer()).post('/auth/signup').send(user);
      expect(response.statusCode).toBe(201);
    });

    it('return a 400 status code for invalid user data', async () => {
      const invalidUser: CreateUserDTO = {
        name: 'John Doe',
        email: '',
        address: '123 Main St',
        dob: '1990-01-01',
        phone: '12345678',
        password: '',
      };
      const response = await request(app.getHttpServer()).post('/auth/signup').send(invalidUser);
      expect(response.statusCode).toBe(400);
    });

    it('return user data after creation', async () => {
      const user: CreateUserDTO = {
        name: 'John Doe',
        email: 'john@doe.com',
        address: '123 Main St',
        dob: '1990-01-01',
        phone: '12345678',
        password: 'qwerty',
      };
      const response = await request(app.getHttpServer()).post('/auth/signup').send(user);
      expect(response.body._id).toBeDefined();
      expect(response.body.__v).toEqual(0);
    });
  });

  describe('POST login auth controller', () => {
    it('return a 200 status code for valid credentials', async () => {
      const user: LoginUserDto = {
        email: 'john@doe.com',
        password: 'qwerty',
      };
      const response = await request(app.getHttpServer()).post('/auth/login').send(user);
      expect(response.statusCode).toBe(200);
    });

    it('returns a 401 status code for invalid credentials', async () => {
      const invalidUser: LoginUserDto = {
        email: 'invalidUsername',
        password: 'invalidPassword',
      };
      const response = await request(app.getHttpServer()).post('/auth/login').send(invalidUser);
      expect(response.statusCode).toBe(401);
    });
  });

  it('returns a token for valid credentials', async () => {
    const user: LoginUserDto = {
      email: 'john@doe.com',
      password: 'qwerty',
    };
    const response = await request(app.getHttpServer()).post('/auth/login').send(user);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
