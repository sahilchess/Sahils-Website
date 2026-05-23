from tkinter import *
from tkinter.ttk import *
from tkinter.filedialog import *



window= Tk()
window.geometry("600x600")
window.title("Memerizor")

def open_file():
    x=askopenfile(title="OPEN FILE")
    if x is not None:
        lstbx.delete(0,END)
        items=x.readlines()
        for each_item in items:
            lstbx.insert(END, each_item.strip())
def save_file():
    x=asksaveasfile(defaultextension=".txt")
    if x is not None:
        for each_item in lstbx.get(0, END):
            print(each_item.strip(), file=x)
        lstbx.delete(0,END)        
def add_file():
    lstbx.insert(END,neter.get())
    neter.delete(0, END)
def del_file():
    index_position=lstbx.curselection()
    if index_position:
        lstbx.delete(index_position)
            
btn_open = Button (window, text = "OPEN", width = 15,command=open_file)
btn_open.grid (row = 0, column = 0, padx = 20, pady = 5)

btn_delete = Button (window, text = "DELETE", width = 15, command= del_file)
btn_delete.grid (row = 0, column = 1, padx = 20, pady = 5)

btn_save = Button (window, text = "SAVE", width = 15, command=save_file)
btn_save.grid (row = 0, column = 2, padx = 20, pady = 5)

btn_add = Button (window, text = "ADD", width = 15, command= add_file)
btn_add.grid (row = 1, column = 2, padx = 20, pady = 5)

neter=Entry(window,width=40)
neter.grid(row=1, column=0, columnspan=2, padx=10, pady=10)

lstbx=Listbox(window, width= 60)
lstbx.grid(row=2, column=0, columnspan=3, padx=10, pady=10)
