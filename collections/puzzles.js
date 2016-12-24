import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'puzzles.insert': function(name,publishStatus,callback) {
    return Puzzles.insert({
      createdAt: new Date(),
      currentStep:1,
      grid:[],
      words:{},
      ownerId: this.userId,
      name,
      public: publishStatus
    }, callback);
  },

  'puzzles.remove': function(puzzle) {
    return Puzzles.remove(puzzle);
  },

  'puzzles.updateCurrentStep': function(puzzle, step) {
    return Puzzles.update(puzzle._id, { $set: { currentStep: step } });
  },

  'puzzles.updateGrid': function(puzzle, grid) {
    return Puzzles.update(puzzle._id, { $set: { grid } });
  },

  'puzzles.updateWords': function(puzzle, words) {
    return Puzzles.update(puzzle._id, { $set: { words } });
  }
});

export const Puzzles = new Mongo.Collection('puzzle');
