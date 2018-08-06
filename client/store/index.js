import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import tokData from './tokdata'
import gameState from './gameState'
import err from './err'
import msgDisplay from './msgDisplay'
import players from './players'
import role from './role'
import thisPlayer from './thisPlayer'
import thisVideoElem from './thisVideoElem'
import playersVideoElem from './playersVideoElem'
import allCards from './allCards'

const reducer = combineReducers({
  allCards,
  err,
  gameState,
  msgDisplay,
  players,
  playersVideoElem,
  role,
  thisPlayer,
  thisVideoElem,
  tokData,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
