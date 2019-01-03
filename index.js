// Library Code
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

// App Code
function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}

const store = createStore(todos)
store.subscribe(()=> {
  console.log('The new stae is ', store.getState())
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
})


/* Example code to call above functions
const store = createStore()
store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})
store.subscribe(() => {
  console.log('the store changed.')
})
const unsubscribe = store.subscribe(() => {
  console.log('the store changed.')
})

unsubscribe()

//const store = createStore(todos) pass reducer function to store

*/
