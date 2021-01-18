# Vim Editor Basics

This is a document baics instructions of using the Vim Editor



## Intro, Opening on Vim Editor

When you open any document using the Vim Editor, you by default enter in **Normal** mode. 

In order to enter into Text Editing mode, you need to enter `I` on your keyboard



## Basic Normal Mode operations

The following keystrokes are commands without the colon `:`

### Without Colon :

```bash
u # Undo changes
ctrl + r # redo undone changes
n # Move down / next occurance
Shift + n # Move up / previous occurance
yy # In normal mode to copy a line
p # In normal mode to paste the line
dd # In normal mode to delete a line
```

To enter **Command** mode, you can enter the following commands with the colon `:`



## Command Mode Operations

### How to check if you are in a command mode or not ?

- Enter `:` and then enter key - `q` - _Quits from the Vim Editor_

```bash
:q
```

### How to enable Line numbers in Vim Editor ?

In order for Vim to show line numbers

```bash
:set number #Turns on line numbering
```

### Quit, Save & Quit

- In order to quit

```bash
:wq # Save and Quit
:q! # Force quit (without saving)
:q # Quite (might prompt if unsaved changes)
```

### Delete a line

In order to delete an entire line

```bash
:d # deletes the line
```

### Copy & Paste

In order to copy an entire line and paste it

```bash
:y #Copies an entire line
p # to paste
```



## Searching Text in Vim

In order to search for a particular text, Get into command mode and press `:`

```bash
/yourtext + ENTER # Search for the phrase
:%s/yourtext/replacetext/g # Search & replace - greedily/recurring
:%s/yourtext/replacetext/gc # Search & replace - greedily/recurring but ask for confirmation
```