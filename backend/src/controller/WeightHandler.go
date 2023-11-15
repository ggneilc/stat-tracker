package controller

import (
  "log"
  "gorm.io/gorm"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)


//Have a user Create/Update/Delete/List Weights
func createWorkout(c *fiber.Ctx) error {
  //get user by ID
  id := c.Params("id")
  db := database.DB

  var user database.User
  db.First(&user, id)

  db.Preload("CurrentDay.Weights").Find(&user, id)

  workout := new(database.Weight)
	if err := c.BodyParser(workout); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  workout.DayID = user.CurrentDay.ID;

  database.DB.Create(&workout)

  //add meal to current day info
  database.DB.Model(&user).Association("CurrentDay.Weights").Append(&workout)
  database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&user)

  //returns the newly created meal as json
  return c.JSON(workout)
}


func getTodayWorkouts(c *fiber.Ctx) error {
  id := c.Params("id")

  var user database.User
  database.DB.Preload("CurrentDay.Weights").First(&user, id)
  
  return c.JSON(user.CurrentDay.Weights)
}

//Have a user Create/Update/Delete/List Sleep
func createSleep(c *fiber.Ctx) error {
  id := c.Params("id")
  db := database.DB

  var user database.User
  db.First(&user, id)

  db.Preload("CurrentDay.Sleep").Find(&user, id)

  sleep := new(database.Sleep)
	if err := c.BodyParser(sleep); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  sleep.DayID = user.CurrentDay.ID;

  database.DB.Create(&sleep)

  //add meal to current day info
  database.DB.Model(&user).Association("CurrentDay.Water").Append(&sleep)
  database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&user)

  //returns the newly created meal as json
  return c.JSON(sleep)
}

func getTodaySleep(c *fiber.Ctx) error {
  id := c.Params("id")
  var user database.User
  database.DB.Preload("CurrentDay.Sleep").First(&user, id)

  return c.JSON(user.CurrentDay.Sleep)
}


