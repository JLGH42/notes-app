const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js.js');
const log = console.log;

//add
yargs.command({
    'command': 'add',
    'description': 'Adds a Note',
    'builder': {
        title: {
            describe: 'Title of Note',
            demand: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Note',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        log(chalk.bgGreen.black('Adding Note...'))
        notes.addNote(argv.title, argv.body);
    }
})

//remove
yargs.command({
    'command': 'remove',
    'description': 'removes a Note',
    'builder': {
        title: {
            demand: true,
            description: 'title of note to remove',
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//list
yargs.command({
    'command': 'list',
    'description': 'list your Note',
    handler(argv) {
        notes.listNotes()
    }
})

//read
yargs.command({
    'command': 'read',
    'description': 'Reading your Note',
    'builder': {
        title: {
            demand: true,
            describe: 'Title of Note to read',
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();