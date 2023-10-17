//This file represents all the Tables and the relationships between them, formatted as Go Structs.
package database

import (
  "gorm.io/gorm"
)

type User struct {
  ID uint `gorm:"primaryKey"`

  Username string
  Email    string
  Password string

  Age     uint
  Weight  uint
  Height  uint
  Goal    string
  HealthScore uint
  CurrentDay  Day
  PastDays    []Day  `gorm:"foreignkey:UserID;association_autoupdate:false;association_autocreate:false"`
}

type Day struct {
  gorm.Model

  UserID  uint

  Meals   []Meal    `gorm:"foreignkey:DayID;association_autoupdate:false;association_autocreate:false"`
  Water   []Water   `gorm:"foreignkey:DayID;association_autoupdate:false;association_autocreate:false"`
  Weights []Weight  `gorm:"foreignkey:DayID;association_autoupdate:false;association_autocreate:false"`
  Sleep   []Sleep   `gorm:"foreignkey:DayID;association_autoupdate:false;association_autocreate:false"`
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

