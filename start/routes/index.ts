import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './register'

Route.get('/', async ({ view }) => {
  return view.render("emails/user-register")
})

Route.get("/user-register", ({view}) => {
  return view.render("emails/user-register")
})
