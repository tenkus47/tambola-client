
const initialState={
    random:null,
    list:[]
}

export default function counter(state=initialState, action) {

  switch (action.type) {
    case 'update':
          const random=action.item
        return {
            random, 
            list:action.list
        }

    default:
      return state
  }
}
