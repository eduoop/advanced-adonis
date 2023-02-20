import Route from '@ioc:Adonis/Core/Route'

Route.post("/register", "User/Register.store")