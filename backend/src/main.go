//Starts the HTTP Server 
package main

import (
  "log"
  "fmt"
  "github.com/gofiber/fiber/v2"
  "github.com/ggneilc/stat-tracker/src/controller"
  "github.com/ggneilc/stat-tracker/src/database"
  "github.com/robfig/cron/v3"
)

func main() {

  if err := database.Connect(); err != nil {
    log.Fatal(err)
  }

  app := fiber.New()

// Start cron job
	go startCronJob()

  app.Static("/","./frontend")

  controller.SetupRoutes(app)

  app.Listen(":3000")
  
}


func startCronJob() { 
  c := cron.New()

	// Schedule the cron job to run every 24 hours
	_, err := c.AddFunc("@daily", func() {
		log.Println("Running cron job...")
    
    var users []database.User

    //query all users
    if err := database.DB.Find(&users).Error; err != nil {
      fmt.Println("Error querying users:", err)
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
	})
	if err != nil {
		log.Fatal(err)
	}

	// Start the cron scheduler
	c.Start()
  fmt.Println("Started cron scheduler!")
 // c.Run()

  select {}
}
