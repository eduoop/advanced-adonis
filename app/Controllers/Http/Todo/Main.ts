import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo';
import StoreValidator from 'App/Validators/Todo/StoreValidator'
import UpdateValidator from 'App/Validators/Todo/UpdateValidator'
import { DateTime } from 'luxon';

export default class TodoController {
  public async index({ auth, request }: HttpContextContract) {
    const user = auth.user!
    const { search } = request.qs()
    const todos = await user.related("todos").query().if(search, (query) => {
      query.where("name", "like", `%${search}%`).orWhere("description", "like", `%${search}%`)
    })

    return todos
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user!
    const date = DateTime.now();
    const { description, name, scheduling } = await request.validate(StoreValidator)

    const verifyComplete = () => {
      if (date < scheduling) {
        return false
      } else if (date > scheduling) {
        return true
      } else {
        return false
      }
    }

    const todo = await user.related("todos").create({
      name: name,
      userId: user.id,
      description: description,
      complete: verifyComplete(),
      scheduling: scheduling
    })

    return todo
  }

  public async show({ params }: HttpContextContract) {
    const todo = await Todo.findByOrFail("id", params.id)

    return todo
  }

  public async update({ request, auth, response }: HttpContextContract) {
    const { todoId, description, name, scheduling, complete } = await request.validate(UpdateValidator)
    const todo = await Todo.findByOrFail("id", todoId)
    const user = auth.user!

    if (todo.userId !== user.id) {
      return response.unauthorized({ message: "this task is not yours" })
    }

    await todo.merge({
      name: name,
      userId: user.id,
      description: description,
      complete: complete,
      scheduling: scheduling
    }).save()

    return todo
  }

  public async destroy({ params }: HttpContextContract) {
    const todo = await Todo.findByOrFail("id", params.id)
    await todo.delete()
  }
}
