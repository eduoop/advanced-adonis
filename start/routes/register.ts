import Route from '@ioc:Adonis/Core/Route'

Route.post("/register", "User/Register.store")
Route.get("/register/:key", "User/Register.show")
Route.put("/register", "User/Register.update")