import { Meteor } from 'meteor/meteor';
import { Puzzles } from '../collections/puzzles';

Meteor.startup(() => {
  Meteor.publish('ownPuzzles', function() {
    return Puzzles.find({ ownerId: this.userId });
  });
  Meteor.publish('publicPuzzles', function() {
    return Puzzles.find({ public: true });
  });
});
