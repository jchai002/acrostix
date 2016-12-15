const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var words = {};
for (var i in Alphabet) {
  words[Alphabet[i]] = [];
}
export default {
  letters:[],
  words:words
}
