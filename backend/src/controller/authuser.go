package controller 

import (
  "fmt"
  "log"
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

  return c.JSON(fiber.Map{
    "Message": "success",
  })
}


// Get session information 
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



