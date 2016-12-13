export default function letterReduder(state =[],action) {
  switch (action.type) {
    case 'ADD':
      return [...state,
        Object.assign({}, action.letter)
      ]
    default:
      return state
  }
}
