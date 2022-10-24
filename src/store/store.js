import { compose, createStore, applyMiddleware} from 'redux';
/* import logger from 'redux-logger'; */
import { rootReducer } from './root-reducer';

//action hits middleware before reducers

const loggerMiddleWare = store => next =>  action => {
    if(!action.type){
        return next(action);
    }

    console.log('TYPE', action.type);
    console.log('PAYLOAD', action.payload);
    console.log('CURRENT_STATE', store.getState());
    
    next(action);

    console.log('UPDATED_STATE', store.getState());
}
const middleWares = [loggerMiddleWare];
const composedEnhancers = compose(applyMiddleware(...middleWares));
//Root reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);
