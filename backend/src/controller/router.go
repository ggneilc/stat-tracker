package controller

import (
  "github.com/gofiber/fiber/v2"
) 

func SetupRoutes (app *fiber.App)  {
  user := app.Group("/users")

  //--Purely Testing--//
  app.Get(    "/users",     getAllUsers)

  //----- Dealing with the User Auth -----------//
  app.Post(   "/signup",    CreateUser)
  app.Post(   "/login",     LoginUser)
  app.Get(    "/home",      getUserSession)

  //User Settings
  user.Put(    "/:id", UpdateUser)
  user.Delete( "/:id", DeleteUser)
  user.Get(    "/:id", getSingleUser)


  user.Get("/:id/today", getUsersToday)

  //---------- Weights/Sleep -------------//
  user.Post(  "/:id/weight", createWorkout)
  user.Get(   "/:id/weight", getTodayWorkouts)

  user.Post(  "/:id/sleep", createSleep)
  user.Get(   "/:id/sleep", getTodaySleep)
  //---------- Meals/Water -------------//
  user.Post(  "/:id/meals", createMeal)
  user.Get(   "/:id/meals", getTodayMeals)

  user.Post(  "/:id/water", createWater)
  user.Get(   "/:id/water", getTodayWater)
}
