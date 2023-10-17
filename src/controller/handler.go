package controller

import (
  "strconv"
  "log"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)

/* ---------------- CRUD Functionality for User ------------------ */
//Create User out of JSON/text/html
func CreateUser(c *fiber.Ctx) error {
  user := new(database.User)
  //  Parse body into product struct
	if err := c.BodyParser(user); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  //Insert into database
  database.DB.Create(&user)
  createNewDayForUser(user)
  //returns the newly created user as json
  return c.JSON(user)
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
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  var user database.User
  database.DB.First(&user, id)
  return c.JSON(user)
}
//Delete User
func DeleteUser(c *fiber.Ctx) error {
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  database.DB.Delete(&database.User{}, id)
  return c.SendString("Successfuly deleted user")
}


/* ---------------- CRUD Functionality for Stat Entry ------------------ */

func getUsersToday(c *fiber.Ctx) error {
  //get user by id
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  var user database.User
  //database.DB.First(&user, id)
  database.DB.Preload("CurrentDay").Find(&user, id)
  database.DB.Preload("CurrentDay.Meals").Find(&user, id)

  return c.JSON(user.CurrentDay)
}

func createNewDayForUser(user *database.User) {
  var newDay = new(database.Day)
  newDay.UserID = user.ID;

  database.DB.Create(&newDay)
}

//Have a user Create/Update/Delete/List Meals
func createMeal(c *fiber.Ctx) error {
  //get user by ID
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  var user database.User
  database.DB.First(&user, id)

  database.DB.Preload("CurrentDay.Meals").Find(&user, id)

  //create meal
  meal := new(database.Meal)
  //  Parse body into product struct
	if err := c.BodyParser(meal); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}
  meal.DayID = user.CurrentDay.ID;

  //Insert into database
  database.DB.Create(&meal)

  //add meal to current day info
  user.CurrentDay.Meals = append(user.CurrentDay.Meals, *meal)
  database.DB.Save(&user)

  //returns the newly created meal as json
  return c.JSON(user)
}

//Get User Meals
func getTodayMeals(c *fiber.Ctx) error {
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  var user database.User
  database.DB.Preload("CurrentDay.Meals").First(&user, id)
  

  return c.JSON(user.CurrentDay.Meals)
}
//Have a user Create/Update/Delete/List Weights
//Have a user Create/Update/Delete/List Water
//Have a user Create/Update/Delete/List Sleep


/* ----------------- --------------- Services ----------------- ----------------- */

/* ----------------  ------------------ */




