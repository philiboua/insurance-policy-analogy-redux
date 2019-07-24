import * as Redux from 'redux'
import {createStore, combineReducers} from 'redux'

// clear the console
console.clear()

//People are droping off a form (Action creator)

const createdPolicy = (name, amount) => {
  return {
    type: "CREATED_POLICY",
    payload: {
      name,
      amount
    }
  }
}

const deletedPolicy = (name) => {
  return{
    type: "DELETED_POLICY",
    payload: {
      name
    }
  }
}

const createdClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATED_CLAIM",
    payload: {
      name,
      amountOfMoneyToCollect
    }
  }
}

//view action creator log
console.log(createdPolicy("Philippe", 30))

//reducers (departments)
const claimsHistory = (oldHistoryClaims = [], action) => {
  if (action.type === "CREATED_CLAIM"){
    //we care about this action so we need to update the store
    return [...oldHistoryClaims, action.payload]
  }

  return oldHistoryClaims

}

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATED_CLAIM"){
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  }
  else if (action.type === "CREATED_POLICY"){
    return bagOfMoney + action.payload.amount
  }

  return bagOfMoney
}

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATED_POLICY"){
    return [...listOfPolicies, action.payload.name]
  }
  else if (action.type === "DELETED_POLICY"){
    return listOfPolicies.filter(function(name){
      name !== action.payload.name
    })
  }

  return listOfPolicies

}

const allDepartments = combineReducers({
  accounting,
  claimsHistory,
  policies
})

const store = createStore(allDepartments)


const newPolicy = createdPolicy("Philippe", 300)
const newClaim = createdClaim("Philippe", 200)
const deletePolicy = deletedPolicy("Philippe")

store.dispatch(newPolicy)
store.dispatch(newClaim)
store.dispatch(deletePolicy)



console.log(store.getState())

