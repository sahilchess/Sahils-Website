from tkinter import *
from PIL import ImageTk,Image,ImageOps,ImageEnhance
from tkinter import filedialog

window= Tk()
window.geometry("700x400")
window.title("Image Editor")
window.configure(bg="#fc7f03")



img=Image.open("Sahiti.jpg")
img=img.resize((400,350))
original_img=img

def display_image(img):
    disp_img=ImageTk.PhotoImage(img)
    panel.configure(image=disp_img)
    panel.image=disp_img

def rotate():
    global img
    img=img.rotate(90)
    display_image(img)

def flip():
    global img
    img=img.transpose(Image.FLIP_LEFT_RIGHT)
    display_image(img)
    
def gs():
    global img
    img=img.convert("L")
    display_image(img)

def invert():
    global img
    img=ImageOps.invert(img)
    display_image(img)

def contrast():
    global img
    enhancer=ImageEnhance.Contrast(img)
    img=enhancer.enhance(2)
    display_image(img)

def brightness():
    global img
    enhancer=ImageEnhance.Brightness(img)
    img=enhancer.enhance(2)
    display_image(img)

def sharpness():
    global img
    enhancer=ImageEnhance.Sharpness(img)
    img=enhancer.enhance(2)
    display_image(img)

def original():
    global img, original_img
    img=original_img
    display_image(img)

def save():
    x=filedialog.asksaveasfile(title="SAVE", defaultextension=".jpg")
    if x:
        img.save(x)

def open():
    global img, original_img
    x=filedialog.askopenfilename(title="OPEN")
    if x:
        img=Image.open(x)
        img=img.resize((400,350))
        original_img=(img)
        display_image(img)
        


panel=Label(window,bg="black")
panel.grid(row=0, column=0,rowspan=10,columnspan=2,padx=5,pady=5)
display_image(img)

btn_rotate=Button(window, text="Rotate", width=30, command=rotate)
btn_rotate.grid(row=2, column=2, padx=10, pady=5)

btn_flip=Button(window, text="Flip", width=30, command=flip)
btn_flip.grid(row=3, column=2, padx=5, pady=5)

btn_gs=Button(window, text="GrayScale", width=30, command=gs)
btn_gs.grid(row=4, column=2, padx=5, pady=5)

btn_invert=Button(window, text="Invert", width=30, command=invert)
btn_invert.grid(row=5, column=2, padx=5, pady=5)

btn_contrast=Button(window, text="Contrast", width=30, command=contrast)
btn_contrast.grid(row=6, column=2, padx=5, pady=5)

btn_brightness=Button(window, text="Brightness", width=30, command=brightness)
btn_brightness.grid(row=7, column=2, padx=5, pady=5)

btn_sharpness=Button(window, text="Sharpness", width=30, command=sharpness)
btn_sharpness.grid(row=8, column=2, padx=5, pady=5)

btn_original=Button(window, text="Original", width=30, command=original)
btn_original.grid(row=9, column=2, padx=5, pady=5)

btn_save=Button(window, text="Save", width=30, command=save)
btn_save.grid(row=12, column=1, padx=5, pady=5)

btn_open=Button(window, text="Open", width=30, command=open)
btn_open.grid(row=12, column=0, padx=5, pady=5)

window.mainloop()
