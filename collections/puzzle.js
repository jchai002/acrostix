import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'puzzle.insert': function() {
    console.log('creating new puzzle')
  },

  'puzzle.remove': function(puzzle) {
    console.log('remove puzzle')
  },

  'puzzle.updateGrid': function(puzzle, payload) {
    console.log('update puzzle grid')
  },

  'puzzle.updateWord': function(puzzle, payload) {
    console.log('update puzzle word')
  }
});

export const Puzzles = new Mongo.Collection('puzzle');
