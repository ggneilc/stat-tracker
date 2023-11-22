//Hadles all functions for Goal CRUD operations
package controller

import (
  "log"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)

/**
how should goals operate? 
I can't just use the update() feature and replace the entire object, 
because the old data wouldn't be persistently entered in the new request object.

Therefore it needs individual update methods for each record

//update single record
where user.id = 111
db.Model(&user).Update("name", "hello")

*/


type Goalinfo struct  {
  NumberGoal uint 
  StringGoal string
}

func getUserGoals(c *fiber.Ctx) error {
  //get user by id
  id := c.Params("id")
  var user database.User
  
  database.DB.Preload("Goals").Find(&user, id)

  return c.JSON(user)
}

func createGoal(user *database.User) {
  var newGoal = new(database.Goal)
  newGoal.UserID = user.ID;

  database.DB.Create(&newGoal)
}




func updateGeneral(c *fiber.Ctx) error {
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

  log.Println(newGoal.StringGoal)

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("GeneralGoal", newGoal.StringGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}


func updateBodyWeight(c *fiber.Ctx) error{ 
  return c.SendString("Success")
}

func updateCalorie(c *fiber.Ctx) error{ 
  return c.SendString("Success")
}

func updateProtein(c *fiber.Ctx) error{ 
  return c.SendString("Success")
}

func updateSleep(c *fiber.Ctx) error{ 
  return c.SendString("Success")
}

func updateWater(c *fiber.Ctx) error{ 
  return c.SendString("Success")
}
