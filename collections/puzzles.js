import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'puzzles.insert': function(grid) {
    return Puzzles.insert({
      createdAt: new Date(),
      grid,
      words:{},
      ownerId: ''
      // will add user id here
    });
  },

  'puzzles.remove': function(puzzle) {
     return Puzzles.remove(puzzle);
  },

  'puzzles.initializeGrid': function(puzzle, payload) {
    console.log('update puzzle grid')
  },

  'puzzles.updateGrid': function(puzzle, payload) {
    console.log('update puzzle grid')
  },

  'puzzles.updateWord': function(puzzle, payload) {
    console.log('update puzzle word')
  }
});

export const Puzzles = new Mongo.Collection('puzzle');
