package controller

import (
  "fmt"
  "strconv"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/database"
)


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

func getUsersPastDays(c *fiber.Ctx) error {
  //get user by id
  id, err := strconv.Atoi(c.Params("id"))
  if err != nil {
    return c.SendString("error parsing ID")
  }
  var user database.User
  
  //Find the user, load all their information
  //database.DB.Preload("CurrentDay").Preload(clause.Associations).Find(&user, id)
  database.DB.Preload("PastDays").Find(&user, id)

  return c.JSON(user)
}

func createNewDayForUser(user *database.User) {
  var newDay = new(database.Day)
  newDay.UserID = user.ID;

  database.DB.Create(&newDay)
}

/**
* Need to: 
* 1. get list of all users
* 2. move current day to past day
* 3. create new day for current day


* ##KNOWN BUG: current day always shows up in past day list. 
*/
func createNewDayForAllUser(c *fiber.Ctx) error {
  var users []database.User

  //query all users
  if err := database.DB.Find(&users).Error; err != nil {
    fmt.Println("Error querying users:", err)
    return c.SendString("error querying")
  }

  for _, user := range users {
    //move current day to past day
    if user.CurrentDay.ID != 0 {
      user.PastDays = append(user.PastDays, user.CurrentDay)
      user.CurrentDay = database.Day{} // Reset the current day
    }

    //create new day for user
    newDay := database.Day{UserID: user.ID}
    //set to users current day
    
    if err := database.DB.Create(&newDay).Error; err != nil {
      fmt.Printf("Error creating a new day for user %d: %s\n", user.ID, err)
    } else {
        // Update user's current day
        user.CurrentDay = newDay
        if err := database.DB.Save(&user).Error; err != nil {
            fmt.Printf("Error updating user's current day: %s\n", err)
            // Handle the error as needed
        } else {
            fmt.Printf("Created a new day for user: %d\n", user.ID)
        }
    }  
  }

  return c.SendString("Created all days")

}







