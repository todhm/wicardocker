import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware,compose,combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AuthReducer from './authapp/reducer'
import AdminReducer from './adminapp/reducer'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2 ,

}


const reducer = combineReducers({
  AuthReducer,
  AdminReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)
const configureStore= () => {
  let store = createStore(
      persistedReducer,
       compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
export default configureStore
