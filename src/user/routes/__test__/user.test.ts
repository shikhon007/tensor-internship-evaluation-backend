import AppDataSource from '@database/index';
import app from '../../../app';
import request from 'supertest';
import User from '@database/entity/user/user.entity';
import { getLongLivedToken } from '@global/utils/jwt.utils';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

// generate token

// Create New user
describe('/api/v1/user POST', () => {
  it('should return new user with status code 201', async () => {
    const res = await request(app).post('/api/v1/user').send({
      name: 'mithun',
      mobile: '01676050300',
      password: 'Aa123456',
      email: 'mrshikhon@gmail.com',
      gender: 'M',
    });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeTruthy();
    expect(res.body.data).toHaveProperty('name', 'mithun');
  });

  it('should return 400 if name is less then 3 char', async () => {
    const res = await request(app).post('/api/v1/user').send({
      name: 'mi',
      mobile: '',
      password: 'Aa1456',
      email: 'agalghagl',
      gender: '',
    });

    let err: any = res.body.errors.map((error: any) => error.field);

    //console.log('err', err);
    expect(res.status).toBe(400);
    expect(err).toEqual(expect.arrayContaining(['name', 'email', 'mobile', 'password', 'gender']));
  });
});

// Get ALl the user
describe('/api/v1/user GET', () => {
  // it('should return 400 if user is not logged in', async () => {
  //   const res = await request(app).get('/api/v1/user');
  //   expect(res.status).toBe(400);
  // });

  it('should return all the user with status code 200', async () => {
    const user: User | null = await AppDataSource.getRepository(User).findOne({
      where: {
        mobile: '01676050300',
      },
    });
    const token = await getLongLivedToken({ id: user?.id }, '12h');
    const res = await request(app)
      .get('/api/v1/user')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
  });
});

// Get Single User
describe('/api/v1/user/:id GET', () => {
  it('Should return user if valid id is pass', async () => {
    const user: User | null = await AppDataSource.getRepository(User).findOne({
      where: {
        mobile: '01676050300',
      },
    });

    const res = await request(app).get('/api/v1/user/' + user?.id);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBeTruthy();
  });

  it('should return null if the id is not found', async () => {
    const res = await request(app).get('/api/v1/user/2');
    expect(res.status).toBe(400);
  });
});
