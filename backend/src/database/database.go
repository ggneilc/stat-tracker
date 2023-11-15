package database

import (
  "fmt"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

//Global Variable to access outside of document
var DB *gorm.DB

func Connect() error {
  var err error
  
  //DESKTOP
  dsn :="neil:password1@tcp(127.0.0.1:3306)/yougg?charset=utf8mb4&parseTime=True&loc=Local"

  //LAPTOP
  //dsn :="root:password1@tcp(127.0.0.1:3306)/yougg?charset=utf8mb4&parseTime=True&loc=Local"

  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
    DryRun: false,
  })
  if err != nil {
    fmt.Printf("Failed to connect to database")
  }

  DB = db

  //Turn User struct into table
  DB.AutoMigrate(&User{})
  DB.AutoMigrate(&Day{})
  DB.AutoMigrate(&Meal{})
  DB.AutoMigrate(&Water{})
  DB.AutoMigrate(&Weight{})
  DB.AutoMigrate(&Sleep{})

  fmt.Printf("connected to database !!")
  
  return nil

}
