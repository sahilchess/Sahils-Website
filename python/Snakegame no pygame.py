import turtle as t
import random
import time

# initialization
score = 0
high_score = 0
delay = 0.1

screen = t.Screen ()
screen.title (".........SNAKE GAME.........")
screen.bgcolor ("#a6f7f7")
screen.setup (width = 600, height = 600)

# food
food = t.Turtle ()
colors = random.choice (["red", "blue", "green", "purple"])
shapes = random.choice (["square", "circle", "triangle"])
food.speed (0)
food.shape (shapes)
food.color (colors)
food.penup ()
food.goto (0,100)

# display of the score
pen = t.Turtle ()
pen.speed (0)
pen.shape ("square")
pen.color ("black")
pen.penup ()
pen.hideturtle ()
pen.goto (0,260)
pen.write ("Score = 0 \t High Score = 0",align = "center", font = ("Courier", 20, "bold"))
pen.write("-----------------------------------------------------------------")

# head of snake
head = t.Turtle ()
head.shape ("square")
head.color ("#003bfc")
head.penup ()
head.goto (0,0)
head.direction = "Stop"

# directions
def go_down () :
    if head.direction != "up" :
        head.direction = "down"

def go_up () :
    if head.direction != "down" :
        head.direction = "up"

def go_left () :
    if head.direction != "right" :
        head.direction = "left"

def go_right () :
    if head.direction != "left" :
        head.direction = "right"

def move () :
    if head.direction == "up" :
        y = head.ycor ()
        head.sety (y + 20)
    if head.direction == "down" :
        y = head.ycor ()
        head.sety (y - 20)
    if head.direction == "left" :
        x = head.xcor ()
        head.setx (x - 20)
    if head.direction == "right" :
        x = head.xcor ()
        head.setx (x + 20)
    
screen.listen ()
screen.onkeypress (go_up, "Up")
screen.onkeypress (go_down, "Down")
screen.onkeypress (go_left, "Left")
screen.onkeypress (go_right, "Right")

body_segments = []

# main game
while True :
    screen.update ()
    if head.xcor () > 290 or head.xcor () < -290 or head.ycor () > 290 or head.ycor () < -290 :
        time.sleep (1)
        head.goto (0,0)
        head.direction = "Stop"
        colors = random.choice (["red", "blue", "green", "purple"])
        shapes = random.choice (["square", "circle", "triangle"])
        for segment in body_segments :
            segment.goto (1000, 1000)
        body_segments.clear ()
        score = 0
        delay = 0.1
        pen.clear ()
        pen.write ("Score = {} \t High Score = {}".format (score, high_score),align = "center", font = ("Courier", 20, "bold"))
    if head.distance (food) < 20 :
        x = random.randint (-260,260)
        y = random.randint (-260,260)
        food.goto (x,y)
        # add new segment
        new_segment = t.Turtle ()
        new_segment.speed (0)
        new_segment.shape ("square")
        new_segment.color ("#a7db3d")
        new_segment.penup()
        body_segments.append (new_segment)
        delay -= 0.001
        score = score + 1
        if score > high_score :
            high_score = score
        pen.clear ()
        pen.write ("Score = {} \t High Score = {}".format (score, high_score),align = "center", font = ("Courier", 20, "bold"))

    # checking for collision (head and body segment)
    for index in range (len (body_segments)-1, 0, -1) :
        x = body_segments[index-1].xcor ()
        y = body_segments[index-1].ycor ()
        body_segments[index]. goto (x,y)
    if len (body_segments) > 0 :
        x = head.xcor ()
        y = head.ycor ()
        body_segments[0].goto (x,y)
    move ()
    for segment in body_segments :
        if segment.distance(head) < 20 :
            time.sleep (1)
            head.goto (0,0)
            head.direction = "Stop"
            colors = random.choice (["red", "blue", "green", "purple"])
            shapes = random.choice (["square", "circle", "triangle"])
            for segment in body_segments :
                segment.goto (1000, 1000)
            body_segments.clear ()
            score = 0
            delay = 0.1
            pen.clear ()
            pen.write ("Score = {} \t High Score = {}".format (score, high_score),align = "center", font = ("Courier", 20, "bold"))
    time.sleep (delay)

screen.mainloop ()
