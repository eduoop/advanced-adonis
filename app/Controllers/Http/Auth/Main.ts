import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/Auth/Main'

export default class AuthController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator)

    try {
      const token = await auth.attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
