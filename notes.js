const fs = require('fs');
const chalk = require('chalk')
const log = console.log;

const addNote = (title, body) => {
    const notes = loadNotes();
    //create array of items that match condition on filter cb on notes array
    // let duplicatedNotes = notes.filter((note) => note.title === title)

    //loop until match returns false
    let duplicatedNote = notes.find((note) => note.title === title)
    debugger
    //if no duplicates are found, add the note from the user into the array
    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        log(chalk.bgBlack.green('Note Added!'))
        log(chalk.red(`Title: ${chalk.green(title)} \nBody: ${chalk.green(body)}`))
    } else log(chalk.bgYellow.black('Note already exists'));
}

const removeNote = (title) => {
    const notes = loadNotes();
    let notesToKeep = notes.filter((note) => note.title !== title);
    /*
    return true => no match == adds to the NEW subset array
    return false => match == removes from the NEW subset array
    If they match, they're removed from the set and thats the result we want.
    */

    if (notes.length > notesToKeep.length) {
        log(chalk.bgGreen.black('Note Removed!'))
        saveNotes(notesToKeep);
    } else {
        log(chalk.bgRed.black('No note found'))
    }

    /* Option 2: check the boolean returned
        less viable option because it doesn't take into account
        the number of note objects present which is what we want
        to test. */
}

const readNote = (title) => {
    let notes = loadNotes()
        //store matched value
    let selectedNote = notes.find((note) => note.title === title);

    if (selectedNote) {
        log(chalk.green(`Title: ${selectedNote.title}`))
        log(`Body: ${selectedNote.body}`)
    } else {
        log(chalk.red('Cannot Read Note: no note found'))
    }
}

const listNotes = () => {
    let notes = loadNotes();
    log(chalk.bgMagenta.black('Your Notes:'))
    notes.forEach((note) => {
        log((note.title))
    })
}

const loadNotes = () => {
    try {
        let dataBuffer = fs.readFileSync('notes.json')
        let dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    let data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}