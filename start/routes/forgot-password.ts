import Route from '@ioc:Adonis/Core/Route'

Route.post("/forgot-password", "User/ForgotPassword.store")
Route.put("/forgot-password", "User/ForgotPassword.update")