import Route from '@ioc:Adonis/Core/Route'


Route.get("/todo/page/:page", "Todo/Main.index").middleware("auth")
Route.get("/todo/:id", "Todo/Main.show").middleware("auth")
Route.post("/todo", "Todo/Main.store").middleware("auth")
Route.put("/todo", "Todo/Main.update").middleware("auth")
Route.delete("/todo/:id", "Todo/Main.destroy").middleware("auth")