//This file represents all the Tables and the relationships between them, formatted as Go Structs.
package database

import (
  "gorm.io/gorm"
)

type User struct {
  ID uint `gorm:"primaryKey"`

  Email    string
  Username string
  Password string

  Age     uint
  Weight  uint
  Height  uint
  Gender  uint

  Goals   Goal
  HealthScore uint

  CurrentDay  Day    `gorm:"foreignkey:UserID"`
  PastDays    []Day  `gorm:"foreignkey:UserID"`
}

type Goal struct { 
  ID uint `gorm:"primaryKey"`
  UserID  uint 
  
  GeneralGoal  string

  BodyweightGoal   uint
  CalorieGoal  uint
  ProteinGoal  uint

  SleepGoal    uint
  WaterGoal    uint
}


type Day struct {
  gorm.Model

  UserID  uint //this user id will show this day in both current & past days

  Meals   []Meal    `gorm:"foreignkey:DayID;auto_association:true"`
  Water   []Water   `gorm:"foreignkey:DayID"`
  Weights []Weight  `gorm:"foreignkey:DayID"`
  Sleep   []Sleep   `gorm:"foreignkey:DayID"`
}

type Meal struct {
  ID uint `gorm:"primaryKey"`

  FoodName string
  Calories uint
  Protein  uint

  DayID uint
}

type Water struct {
  ID uint `gorm:"primaryKey"`
  Drank uint
  DayID uint
}

type Weight struct {
  ID uint `gorm:"primaryKey"`

  WorkoutName string
  Sets  uint
  Reps  uint
  Notes string

  DayID uint
}

type Sleep struct {
  ID uint `gorm:"primaryKey"`
  Hours uint
  DayID uint
}

