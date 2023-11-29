//Hadles all functions for Goal CRUD operations
package controller

import (
  "log"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)

type Goalinfo struct  {
  NumberGoal uint 
  StringGoal string
}

func getUserGoals(c *fiber.Ctx) error {
  id := c.Params("id")
  var user database.User

  database.DB.Preload("Goals").Find(&user, id)

  return c.JSON(user.Goals)
}

func createGoal(user *database.User) {
  var newGoal = new(database.Goal)
  newGoal.UserID = user.ID;
  database.DB.Create(&newGoal)
}



//type stringgoal
func updateGeneral(c *fiber.Ctx) error {
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("GeneralGoal", newGoal.StringGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}




//type numbergoal
func updateBodyWeight(c *fiber.Ctx) error{ 
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("BodyweightGoal", newGoal.NumberGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}

func updateCalorie(c *fiber.Ctx) error{ 
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("CalorieGoal", newGoal.NumberGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}

func updateProtein(c *fiber.Ctx) error{ 
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("ProteinGoal", newGoal.NumberGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}

func updateSleep(c *fiber.Ctx) error{ 
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("SleepGoal", newGoal.NumberGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}

func updateWater(c *fiber.Ctx) error{ 
	id := c.Params("id")
	var goal = new(database.Goal)
	var newGoal = new(Goalinfo)

	if err := c.BodyParser(newGoal); err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Update user & id
	if err := database.DB.Model(&goal).Where("user_id = ?", id).Update("WaterGoal", newGoal.NumberGoal).Error; err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update goal"})
	}

	return c.JSON(fiber.Map{"message": "Goal updated successfully"})
}
