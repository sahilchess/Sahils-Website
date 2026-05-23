import turtle as t
def circle(color,length,ypos,xpos,head):
    t.bgcolor("black")
    t.speed(0)
    t.width(20)
    t.setheading(head)
    t.penup()
    t.goto(xpos,ypos)
    t.pendown()
    t.color(color)
    t.circle(length,180)
while True:
    circle("red",270,0,-10,90)
    circle("orange",250,0,-30,90)
    circle("yellow",230,0,-50,90)
    circle("green",210,0,-70,90)
    circle("blue",190,0,-90,90)
    circle("purple",170,0,-110,90)
    circle("pink",150,0,-130,90)