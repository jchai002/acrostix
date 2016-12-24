import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'puzzles.insert': function() {
    return Puzzles.insert({
      createdAt: new Date(),
      currentStep:1,
      grid:[],
      words:{},
      ownerId: ''
      // will add user id here
    });
  },

  'puzzles.remove': function(puzzle) {
     return Puzzles.remove(puzzle);
  },

  'puzzles.initializeGrid': function(puzzle, grid) {
    return Puzzles.update(puzzle._id, { $set: { grid } });
  },

  'puzzles.updateCurrentStep': function(puzzle, step) {
    return Puzzles.update(puzzle._id, { $set: { currentStep: step } });
  },

  'puzzles.updateGrid': function(puzzle, payload) {
    console.log('update puzzle grid')
  },

  'puzzles.updateWord': function(puzzle, payload) {
    console.log('update puzzle word')
  }
});

export const Puzzles = new Mongo.Collection('puzzle');
