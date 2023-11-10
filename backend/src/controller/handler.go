package controller

import (
  "fmt"
  "strconv"
  "log"
  "gorm.io/gorm"
  "github.com/gofiber/fiber/v2"
  "github.com/gofiber/fiber/v2/middleware/session"
  "github.com/ggneilc/stat-tracker/src/database"
)

//storage for all app's sessions
var store = session.New()

//struct to validate user
type AuthUser struct {
  Username string `json:"Username"`
  Pass  string `json:"Password"`
}

func Ping(c *fiber.Ctx) error {
  fmt.Println("ping!")
  return c.SendString("ping!")
}

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

type Msg struct {
  Message string
}

//---------- User Auth ----------//
func LoginUser(c *fiber.Ctx) error {
  Authuser := new(AuthUser)
  user := new(database.User)

	if err := c.BodyParser(Authuser); err != nil {
		log.Println(err)
		return c.SendString("Error parsing body")
	}


  result := database.DB.First(&user, 
  "Username = ? AND Password = ?",
  Authuser.Username, Authuser.Pass )

  if result.RowsAffected == 0 {
    return c.JSON(fiber.Map{
      "Message": "failure",
    })
  }

  ses, err := store.Get(c)
  if err != nil {
    return err
  }

  //key - value
  ses.Set("user_id", user.ID)

  if err := ses.Save(); err != nil {
    return err
  }

  data := Msg{
    Message: "success",
  }

  return c.JSON(data)
}

func getUserSession(c *fiber.Ctx) error {
  //retrieve the session
  ses, err := store.Get(c)
  if err != nil{
    return err
  }

  //ses.get returns type interface{} (generic)
  userID := ses.Get("user_id")
  if userID == nil {
    return c.SendString("no user found")
  }

  user := new(database.User)
  //user := userInter.(*database.User) //assert type User
  fmt.Println(userID)

  //testing
  //database.DB.Preload("CurrentDay").Find(&user, user.ID)
  database.DB.Preload("CurrentDay").First(&user, userID)

  return c.JSON(user)
}







/* ---------------- CRUD Functionality for Stat Entry ------------------ */

//---------- User's Day ----------//
func getUsersToday(c *fiber.Ctx) error {
  //get user by id
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  var user database.User
  
  //Find the user, load all their information
  //database.DB.Preload("CurrentDay").Preload(clause.Associations).Find(&user, id)
  database.DB.Preload("CurrentDay").
  Preload("CurrentDay.Meals").
  Preload("CurrentDay.Weights").
  Preload("CurrentDay.Water").
  Preload("CurrentDay.Sleep").
  Find(&user, id)

  return c.JSON(user)
}

func createNewDayForUser(user *database.User) {
  var newDay = new(database.Day)
  newDay.UserID = user.ID;

  database.DB.Create(&newDay)
}






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


/* -------------------------- Services ---------------------------- */

/* ----------------  ------------------ */

