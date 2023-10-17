package controller

import (
  "github.com/gofiber/fiber/v2"
) 

func SetupRoutes (app *fiber.App)  {

  //----- Dealing with the User -----------//
  app.Get(    "/users",     getAllUsers)
  app.Get(    "/users/:id", getSingleUser)
  app.Post(   "/users",     CreateUser)
  app.Put(    "/users/:id", UpdateUser)
  app.Delete( "/users/:id", DeleteUser)

  app.Get("/users/:id/today", getUsersToday)

  //---------- Weights/Sleep -------------//

  //---------- Meals/Water -------------//
  app.Post("/users/:id/meals", createMeal)
  app.Get("/users/:id/meals", getTodayMeals)

}
