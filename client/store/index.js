import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allCards from './allCards'
import announcerMsg from './announcerMsg'
import centerCards from './centerCards'
import err from './err'
import gameState from './gameState'
import msgDisplay from './msgDisplay'
import players from './players'
import playersVideoElem from './playersVideoElem'
import role from './role'
import roleActionData from './roleActionData'
import thisPlayer from './thisPlayer'
import thisVideoElem from './thisVideoElem'
import tokData from './tokdata'

const reducer = combineReducers({
  allCards,
  announcerMsg,
  centerCards,
  err,
  gameState,
  msgDisplay,
  players,
  playersVideoElem,
  role,
  roleActionData,
  thisPlayer,
  thisVideoElem,
  tokData,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
