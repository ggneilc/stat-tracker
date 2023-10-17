package database

import (
  "fmt"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

//Global Variable to access outside of document
var DB *gorm.DB

func Connect() error {
  var err error
  
  dsn :="host=db.bjvxzmradufiwzcylczl.supabase.co user=postgres password=Piss4Brains! dbname=postgres port=5432 sslmode=disable"
  db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
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
