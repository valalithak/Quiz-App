package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _"github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type User struct {
    ID uint `json:"id"`
    Username string `json:"username"`
    EmailID string `json:"email"`
    Password string `json:"password"`
}

// Struct for single option correct questions
type Question1 struct {
   ID uint `json:"id"`
   Ques string `json:"ques"`
   Opt1 string `json:"opt1"`
   Opt2 string `json:"opt2"`
   Opt3 string `json:"opt3"`
   Opt4 string `json:"opt4"`
   OptCorrect string `json:"optcorrect"`
   Genre string `json:"genre"`
   Response string `json:"response"`
 }
 type MultiQuestion struct {
    ID uint `json:"id"`
    Ques string `json:"ques"`
    Opt1 string `json:"opt1"`
    Opt2 string `json:"opt2"`
    Opt3 string `json:"opt3"`
    Opt4 string `json:"opt4"`
    Isopt1 bool `json:"isopt1"`
    Isopt2 bool `json:"isopt2"`
    Isopt3 bool `json:"isopt3"`
    Isopt4 bool `json:"isopt4"`
    Genre string `json:"genre"`
    Response string `json:"response"`
  }

type Genre struct {
    ID uint `json:"id"`
    Quiz1 string `json:"quiz1"`
    Quiz2 string `json:"quiz2"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&User{})
   db.AutoMigrate(&Question1{})
   db.AutoMigrate(&Genre{})
   db.AutoMigrate(&MultiQuestion{})

   r := gin.Default()

   r.GET("/questions/", GetQuestions)
   r.GET("/multiquestions/", GetMultiQuestions)
   r.GET("/users/", GetUsers)

   r.GET("/questions/:id", GetQuestion)


   r.POST("/questions", CreateQuestion)
   r.POST("/multiquestions", CreateMultiQuestion)


   r.PUT("/questions/:id", AnswerQuestion)

   r.DELETE("/questions/:id", DeleteQuestion)
   r.DELETE("/multiquestions/:id", DeleteMultiQuestion)
   r.DELETE("/users/:id", DeleteUser)

   r.GET("/Sports/", SportsQuizzes)
   r.GET("/Sports1/", SQ1)
   r.GET("/Sports2/", MQ1)
   r.GET("/SciTech/", SportsQuizzes)
   r.GET("/SciTech1/", SQ1)
   r.GET("/SciTech2/", MQ1)

   r.POST("/SignUp", SignUp)
   r.POST("/SignIn", SignIn)
   r.POST("/Sports2/:id", CorrectAnswer)
   r.POST("/SciTech2/:id", CorrectAnswer)

   r.Use((cors.Default()))
   r.Run(":8080")                                         // Run on port 8080
}

func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question1
   d := db.Where("id = ?", id).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func AnswerQuestion(c *gin.Context) {
   var question Question1
   id := c.Params.ByName("id")

   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&question)
   db.Save(&question)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, question)
 }
func CreateQuestion(c *gin.Context) {
   var question Question1
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, question)
}

func GetQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question1
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, question)
   }
}

func GetQuestions(c *gin.Context) {
   var questions []Question1
   if err := db.Find(&questions).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, questions)
   }
}
func GetUsers(c *gin.Context) {
   var users []User
   if err := db.Find(&users).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, users)
   }
}

func SportsQuizzes(c *gin.Context) {
    selectedgenre := c.Params.ByName("genre")
    var genre []Genre
    if err := db.Where("selectedgenre = ?", selectedgenre).First(&genre).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, genre)
    }
  }

 func SQ1(c *gin.Context) {
     var questions []Question1
     if err := db.Find(&questions).Error; err != nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
     } else {
        //c.BindJSON(&questions)
        //db.Save(&questions)
        c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
        c.JSON(200, questions)
     }

  }

  func MQ1(c *gin.Context) {
      var questions []MultiQuestion
      if err := db.Find(&questions).Error; err != nil {
         c.AbortWithStatus(404)
         fmt.Println(err)
      } else {
         //c.BindJSON(&questions)
         //db.Save(&questions)
         c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
         c.JSON(200, questions)
      }

   }


  func DeleteUser(c *gin.Context) {
     id := c.Params.ByName("id")
     var user User
     d := db.Where("id = ?", id).Delete(&user)
     fmt.Println(d)
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, gin.H{"id #" + id: "deleted"})
  }

 func SignUp(c *gin.Context) {
     var user User
     c.BindJSON(&user)
     db.Create(&user)
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, user)
  }

  func SignIn(c *gin.Context) {
 	var user User
 	var existinguser User
 	c.BindJSON(&user)
 	if err := db.Where("username = ?", user.Username).First(&existinguser).Error; err != nil {
 		c.Header("access-control-allow-origin", "*")
 		c.JSON(401, gin.H{user.Username: "does not exist"})
 	} else {
 	if err := db.Where("password = ?", user.Password).First(&existinguser).Error; err != nil {
 			c.Header("access-control-allow-origin", "*")
 			c.JSON(403, gin.H{user.Password: "incorrect password"})
 		} else {
    if user.Username == "admin" {
 			c.Header("access-control-allow-origin", "*")
 			c.JSON(200, existinguser)
 		} else {
            c.Header("access-control-allow-origin", "*")
            c.JSON(201, existinguser)
        }
 	}
 }
}


 func CreateMultiQuestion(c *gin.Context) {
    var mquestion MultiQuestion
    c.BindJSON(&mquestion)
    db.Create(&mquestion)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, mquestion)
 }

 func GetMultiQuestions(c *gin.Context) {
    var mquestions []MultiQuestion
    if err := db.Find(&mquestions).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    } else {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, mquestions)
    }
 }

 func DeleteMultiQuestion(c *gin.Context) {
    id := c.Params.ByName("id")
    var mquestion MultiQuestion
    d := db.Where("id = ?", id).Delete(&mquestion)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id #" + id: "deleted"})
 }

 func CorrectAnswer(c *gin.Context) {
   id := c.Params.ByName("id")
   var response MultiQuestion
   var answer MultiQuestion
   var flag int = 0;
   c.BindJSON(&response)
   db.Where("id=?",id).First(&answer)

   if response.Isopt1 != answer.Isopt1{
       flag = 1;
       c.Header("access-control-allow-origin", "*")
       c.JSON(301, response.Isopt1)
   }
   if response.Isopt2 != answer.Isopt2{
       flag = 1;
       c.Header("access-control-allow-origin", "*")
       c.JSON(302, response.Isopt2)
   }
   if response.Isopt3 != answer.Isopt3{
       flag = 1;
       c.Header("access-control-allow-origin", "*")
       c.JSON(303, response.Isopt3)
   }
   if response.Isopt4 != answer.Isopt4{
       flag = 1;
       c.Header("access-control-allow-origin", "*")
       c.JSON(304, response.Isopt4)
   }
   if flag == 0 {
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, response)
   }
 }
