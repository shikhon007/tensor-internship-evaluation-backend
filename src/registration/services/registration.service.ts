import Admin from '@database/entity/admin/admin.entity';
import Registration from '@database/entity/registration/registration.entity';
import AppDataSource from '@database/index';
import { ICheckDuplicate, ICreateUser, IUpdateUser } from '@registration/types/registration.interface';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';

@Service()
export default class RegistrationService {
  constructor() {}
  // create a new user
  async create(data: ICreateUser, tem?: EntityManager): Promise<Registration> {
    const manager: EntityManager = tem || AppDataSource.manager;
    let newUser: Registration = await manager.getRepository(Registration).create({ ...data });
    newUser = await manager.getRepository(Registration).save(newUser);
    return newUser;
  }

  async getByUserName(username: string, tem?: EntityManager): Promise<Admin | null> {
    const manager: EntityManager = tem || AppDataSource.manager;
    return await manager.getRepository(Admin).findOne({
      where: {
        username: username,
      },
    });
  }

  async get(tem?: EntityManager): Promise<Registration[]> {
    const manager: EntityManager = tem || AppDataSource.manager;
    return await manager.getRepository(Registration).find();
  }

  async duplicationCheck(data: ICheckDuplicate, tem?: EntityManager): Promise<Registration | null> {
    const key = Object.getOwnPropertyNames(data)[0] as FilterKeys;
    console.log('key', key);
    const value = data[key];
    console.log('value', value);
    const manager: EntityManager = tem || AppDataSource.manager;
    return await manager.getRepository(Registration).findOne({
      where: {
        [key]: value,
      },
      select: ['id'],
    });
  }

  async update(id: number, data: IUpdateUser, tem?: EntityManager): Promise<Registration | null> {
    const manager: EntityManager = tem || AppDataSource.manager;
    return await manager
      .getRepository(Registration)
      .createQueryBuilder()
      .update(Registration)
      .set({ ...data })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });
  }
}

export type FilterKeys = 'mobile' | 'companyName' | 'email';
