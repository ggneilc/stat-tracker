//Handles all functions related to Meals & Water
package controller

import (
  "log"
  "gorm.io/gorm"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)


//Have a user Create/Update/Delete/List Meals
func createMeal(c *fiber.Ctx) error {

  id := c.Params("id")
  var user database.User
  database.DB.First(&user, id)

  database.DB.Preload("CurrentDay.Meals").Find(&user, id)

  meal := new(database.Meal)
	if err := c.BodyParser(meal); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  meal.DayID = user.CurrentDay.ID;

  database.DB.Create(&meal)

  //add meal to current day info
  database.DB.Model(&user).Association("CurrentDay.Meals").Append(&meal)
  database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&user)

  //returns the newly created meal as json
  return c.JSON(meal)
}

//Get User Meals
func getTodayMeals(c *fiber.Ctx) error {
  id := c.Params("id")
  var user database.User
  database.DB.Preload("CurrentDay.Meals").First(&user, id)

  return c.JSON(user.CurrentDay.Meals)
}


//Have a user Create/Update/Delete/List Water
func createWater(c *fiber.Ctx) error {
  id := c.Params("id")
  db := database.DB

  var user database.User
  db.First(&user, id)

  db.Preload("CurrentDay.Water").Find(&user, id)

  water := new(database.Water)
	if err := c.BodyParser(water); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  water.DayID = user.CurrentDay.ID;

  database.DB.Create(&water)

  //add meal to current day info
  database.DB.Model(&user).Association("CurrentDay.Water").Append(&water)
  database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&user)

  //returns the newly created meal as json
  return c.JSON(water)
}

func getTodayWater(c *fiber.Ctx) error {
  id := c.Params("id")
  var user database.User
  database.DB.Preload("CurrentDay.Water").First(&user, id)

  return c.JSON(user.CurrentDay.Water)
}
