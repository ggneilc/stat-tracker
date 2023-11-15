//Handles all functions for user CRUD operations
package controller

import (
  "strconv"
  "log"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)


/* ---------------- CRUD Functionality for User ------------------ */
//Create User out of JSON/text/html -> signup
func CreateUser(c *fiber.Ctx) error {
  user := new(database.User)

	if err := c.BodyParser(user); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  database.DB.Create(&user)
  createNewDayForUser(user)

  return c.JSON(fiber.Map{
    "Message": "success",
  })
}
//Update User setting Information
func UpdateUser(c *fiber.Ctx) error {
  tempId := c.Params("id")
  user := new(database.User)
  //  Parse body into product struct
	if err := c.BodyParser(user); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  id, err := strconv.Atoi(tempId)
  if err != nil {
    return c.SendString("error getting Id")
  }
  user.ID = uint(id)
  database.DB.Save(&user)
  return c.SendString("Successfully updated User")
}
//Get All Users
func getAllUsers(c *fiber.Ctx) error {
  var users []database.User
  result := database.DB.Find(&users)
  if result.Error != nil {
    return c.SendString("Cound not get users")
  }
  return c.JSON(users)
}
//Get Single User
func getSingleUser(c *fiber.Ctx) error {
  id := c.Params("id")
  var user database.User
  database.DB.First(&user, id)
  return c.JSON(user)
}
//Delete User
func DeleteUser(c *fiber.Ctx) error {
  id := c.Params("id")
  database.DB.Delete(&database.User{}, id)
  return c.SendString("Successfuly deleted user")
}



