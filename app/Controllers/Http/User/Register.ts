import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { faker } from '@faker-js/faker';
import StoreValidator from 'App/Validators/User/Register/StoreValidator';
import User from 'App/Models/User';
import Database from '@ioc:Adonis/Lucid/Database';
import Mail from '@ioc:Adonis/Addons/Mail';
import UserKey from 'App/Models/UserKey';
import UpdateValidator from 'App/Validators/User/Register/UpdateValidator ';

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)
      const user = new User

      user.useTransaction(trx)
      user.email = email
      await user.save()

      const key = faker.datatype.uuid() + user.id;
      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await user.related("keys").create({
        key: key,
      })

      await Mail.send((message) => {
        message.to(email)
          .from("advancedadonis@gmail.com")
          .subject("Advaced AdonisJS")
          .htmlView("emails/user-register", { link: link })

      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const user = await (await UserKey.findByOrFail("key", params.key)).related("user").query().firstOrFail()
    return user
  }

  public async update({ request }: HttpContextContract) {
    const { cpf, key, name, password, phone } = await request.validate(UpdateValidator)

    const user = await (await UserKey.findByOrFail("key", key)).related("user").query().firstOrFail()
    await user.merge({
      cpf: cpf,
      name: name,
      phone: phone,
      password: password
    }).save()

    const userKey = await UserKey.findByOrFail("key", key)
    await userKey.delete()

    return user
  }
}
