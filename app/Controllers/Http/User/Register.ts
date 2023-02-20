import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { faker } from '@faker-js/faker';
import StoreValidator from 'App/Validators/User/Register/StoreValidator';
import User from 'App/Models/User';

export default class UserRegisterController {
  public async store({ request, response }: HttpContextContract) {

    const key = faker.datatype.uuid();
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.create({ email: email })

    await user.related("keys").create({
      key: key,
      userId: user.id
    })

    console.log(redirectUrl)

  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
