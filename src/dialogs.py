from tkinter import messagebox
import sys

def getArgument(arg):
  for arg_ in sys.argv:
    if arg_.__contains__('-' + arg) or arg_.__contains__('--' + arg):
      if arg_.__contains__('='):
        return arg_.split('=')[1]
      return ''

  return None

def hasArgument(arg):
  return getArgument(arg) != None

def createMessageBox(title, body, type = None, icon = None):
  match (icon):
    case 'error':
      icon = messagebox.ERROR
    case 'question' | 'ask':
      icon = messagebox.QUESTION
    case 'warning' | 'warn':
      icon = messagebox.WARNING
    case 'information' | 'info':
      icon = messagebox.INFO
      
  return messagebox._show(title, body, icon, type)

if __name__ == '__main__':
  print(createMessageBox(getArgument('title'), getArgument('body'), getArgument('type'), getArgument('icon')))