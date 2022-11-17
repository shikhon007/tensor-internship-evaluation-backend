import express, { Router, Request, Response } from 'express';
import { wrap } from '@global/middlewares/wraps.middle';
import Container from 'typedi';
// import { validates } from '@global/middlewares/express-validation.middle';
// import {
//   CreateUserValidations,
//   DeleteUserValidations,
//   UpdateUserValidations,
//   UserLoginValidations,
// } from '@user/validators/user.validator';
import RegistrationService from '@registration/services/registration.service';
import Registration from '@database/entity/registration/registration.entity';
import BadRequestError from '@global/errors/bad-request.error';
import { getLongLivedToken } from '@global/utils/jwt.utils';
import Admin from '@database/entity/admin/admin.entity';
// import { RequestValidationError } from '@global/errors/request-validation.error';
// import { auth } from '@global/middlewares/auth.middle';

// router instance
const router: Router = express.Router();

/**
 * Get user
 */
router.get(
  '/',
  wrap(async (req: Request, res: Response) => {
    // eslint-disable-next-line no-console
    const registrationService: RegistrationService = Container.get(RegistrationService);
    const users: Registration[] = await registrationService.get();
    return res.status(200).json({
      message: 'Request Successful',
      data: users,
    });
  }),
);

/**
 * Create user
 */
router.post(
  '/',
  wrap(async (req: Request, res: Response) => {
    const registrationService: RegistrationService = Container.get(RegistrationService);
    const user: Registration = await registrationService.create({
      ...req.body,
    });

    return res.status(200).json({
      message: 'Request Successful',
      data: user,
    });
  }),
);

// /**
//  * User Login
//  */
router.post(
  '/login',
  wrap(async (req: Request, res: Response) => {
    const registrationService: RegistrationService = Container.get(RegistrationService);
    const user: Admin | null = await registrationService.getByUserName(req.body.username);
    if (!user) throw new BadRequestError('User not found');
    if (req.body.password !== user.password) {
      throw new BadRequestError('Invalid Credentials');
    }

    const token = await getLongLivedToken({ id: user.id }, '12h');

    return res.status(200).json({
      message: 'Request Successful',
      data: {
        accessToken: token,
      },
    });
  }),
);

router.post(
  '/duplicate',
  wrap(async (req: Request, res: Response) => {
    const registrationService: RegistrationService = Container.get(RegistrationService);
    const registraion: Registration | null = await registrationService.duplicationCheck(req.body);
    return res.status(200).json({
      message: 'Request Successfull',
      data: registraion,
    });
  }),
);

router.put(
  '/:id',
  wrap(async (req: Request<{ id: number }>, res: Response) => {
    console.log('hello');
    const registrationService: RegistrationService = Container.get(RegistrationService);
    const registration: Registration | null = await registrationService.update(req.params.id, req.body);
    return res.status(201).json({
      message: 'Successfully Updated',
      data: registration,
    });
  }),
);

// router.get(
//   '/:id',
//   wrap(async (req: Request<{ id: number }>, res: Response) => {
//     const userService: UserService = Container.get(UserService);
//     const singleUser: User | null = await userService.getSingleUser(req.params.id);
//     if (!singleUser) throw new BadRequestError('user not found');

//     return res.status(200).send({
//       message: 'Request Succesfull',
//       data: singleUser,
//     });
//   }),
// );

export default router;
