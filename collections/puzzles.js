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
    console.log('init grid',grid)

    return Puzzles.update(puzzle._id, { $set: { grid } });
  },

  'puzzles.initializeWords': function(puzzle, words) {
    console.log('init words',words)
    return Puzzles.update(puzzle._id, { $set: { words } });
  },

  'puzzles.updateCurrentStep': function(puzzle, step) {
    return Puzzles.update(puzzle._id, { $set: { currentStep: step } });
  },

  'puzzles.useGridLetter': function(puzzle, letter) {
    console.log(letter,puzzle)
  },

  'puzzles.restoreGridLetter': function(puzzle, letter) {
    // console.log('running puzzles.restoreGridLetter')
  },

  'puzzles.addLetterToWord': function(puzzle, letter) {
    // console.log('running puzzles.addLetterToWord')
  },

  'puzzles.removeLetterFromWord': function(puzzle, letter) {
    // console.log('running puzzles.removeLetterFromWord')
  }
});

export const Puzzles = new Mongo.Collection('puzzle');
