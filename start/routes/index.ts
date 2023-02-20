import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './register'

Route.get('/', async () => {
  return { hello: 'test application in insomnia' }
})
