import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    key: schema.string({ trim: true }, [rules.exists({ table: "keys", column: "key" })]),
    name: schema.string({ trim: true }, [rules.email()]),
    phone: schema.string({ trim: true }),
    cpf: schema.string({ trim: true }),
    password: schema.string({ trim: true }, [rules.confirmed("passwordConfirmation")]),
  })

  public messages: CustomMessages = {}
}
