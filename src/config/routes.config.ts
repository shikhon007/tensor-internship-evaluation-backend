import { GlobalModuleConfig } from '@global/index';
import { LogModule } from '@log/index';
import { UserModule } from '@user/index';
import { Application } from 'express';
import { RegistrationModule } from '@registration/index';

export default function configureRoutes(app: Application): GlobalModuleConfig[] {
  const modules: GlobalModuleConfig[] = [];

  modules.push(new UserModule(app));
  modules.push(new LogModule(app));
  modules.push(new RegistrationModule(app));

  return modules;
}
