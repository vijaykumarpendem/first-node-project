console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

var options = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
            .command('add', 'Add a new note', {
              title: options.title,
              body: options.body
            })
            .command('list', 'List all notes')
            .command('read', 'Read a note', {
              title: options.title
            })
            .command('remove', 'Remove a note', {
              title: options.title
            })
            .help()
            .argv;
var command = argv._[0];
console.log('Command: ' + command);

switch(command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);
    if(note) console.log('Note created');
    else console.log('Note title taken');
    break;
  case 'list':
    var allNotes = notes.getAll();
    console.log('Total notes ', allNotes.length);
    break;
  case 'remove':
    var noteRemoved = notes.removeNote(argv.title);
    noteRemoved ? console.log('Removing note: ' + argv.title) : console.log('No note with title: ' + argv.title);
    break;
  case 'read':
    var note = notes.getNote(argv.title);
    note? console.log('Note read: ', note.title) : console.log('Note not found');
    break;
  default:
    console.log('Command not found');
}
