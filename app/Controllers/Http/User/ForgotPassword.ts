import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserKey from 'App/Models/UserKey'
import StoreValidator from 'App/Validators/User/ForgotPassword/StoreValidator'
import UpdateValidator from 'App/Validators/User/ForgotPassword/UpdateValidator '

export default class UserForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const key = faker.datatype.uuid()
    await (await User.findByOrFail("email", email)).related("keys").create({
      key: key
    })
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    console.log(key)

    Mail.send((message) => {
      message.from("advancedadonis@gmail.com")
      .to(email)
      .subject("Recuperação de conta")
      .htmlView("emails/user-forgot-password", { link: link })
    })
  }
  public async update({ request }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)
    const userKey = await UserKey.query().where("key", key).firstOrFail()
    const user = await userKey.related("user").query().firstOrFail()
    await user.merge({
      password: password
    }).save()
    await userKey.delete()
  }
}
