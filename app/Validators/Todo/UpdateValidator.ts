import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MainValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    scheduling: schema.date(),
    complete: schema.boolean(),
    todoId: schema.string({ trim: true }, [rules.exists({ table: "todos", column: "id" })]),
  })

  public messages: CustomMessages = {}
}
