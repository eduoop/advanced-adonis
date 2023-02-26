import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './register'
import './forgot-password'
import './todo'

Route.get('/', async ({ view }) => {
  return view.render("emails/user-register")
})

Route.get("/user-register", ({view}) => {
  return view.render("emails/user-register")
})

Route.get("/user-forgot-password", ({ view }) => {
  return view.render("emails/user-forgot-password")
})
