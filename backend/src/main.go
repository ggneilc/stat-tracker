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


  app.Static("/","./frontend")

  controller.SetupRoutes(app)

  app.Listen(":3000")
  
}
