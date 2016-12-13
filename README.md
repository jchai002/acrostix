# acrostix

##
TODO
implement redux pattern. Currently the state management is too confusing.

each letter in quote should be an object that knows it's position in grid, and which word it belongs too

When user type letter, need to dispatch letter input action, payload is letter and wordId.

the info gets to the letter store, matched letter is updated then the index and word ID of that letter is passed down to subscribed Components (grid and word)

When user delete letter, need to dispatch letter delete action

When grid gets new letter, need to report the update with letterNumber, perhaps dispatch an action.
