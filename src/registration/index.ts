import { GlobalModuleConfig } from '@global/index';
import { Application } from 'express';
import registrationRouter from '@registration/routes/registration.route';

export class RegistrationModule extends GlobalModuleConfig {
  constructor(app: Application) {
    super(app, 'register');
  }

  init() {
    this.app.use(this.pathVx('/'), registrationRouter);
  }
}
