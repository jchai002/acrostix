import { Meteor } from 'meteor/meteor';
import { Puzzles } from '../collections/puzzles';

Meteor.startup(() => {
  Meteor.publish('puzzles', function() {
    return Puzzles.find({ ownerId: this.userId });
  });
});
