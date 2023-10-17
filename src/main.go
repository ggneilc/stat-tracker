//Starts the HTTP Server 
package main

import (
  "log"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/controller"
  "github.com/ggneilc/stat-tracker/src/database"
)

func main() {

  if err := database.Connect(); err != nil {
    log.Fatal(err)
  }

  app := fiber.New()

  var users []database.User
  database.DB.Find(&users)

  //if users.current day = null, create new day and set it 
  /*
  for _, user := range users {
    //create new day
    var newDay = new(database.Day)
    //assign it to user
    newDay.UserID = user.ID
    database.DB.Create(&newDay)
    user.CurrentDay = *newDay
    database.DB.Save(&user)
  }
  */
  

  

  app.Static("/","./frontend")

  controller.SetupRoutes(app)

  app.Listen(":3000")
  
}
