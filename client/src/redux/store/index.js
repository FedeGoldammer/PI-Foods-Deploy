import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/index.js';
import thunk from "redux-thunk";

const store = createStore(rootReducer,
    compose(
        //Permite trabajar con funciones asincronas dentro de Redux
       applyMiddleware(thunk)
        //Redux Thunk is a middleware that lets you call action creators that return a function
        //instead of an action object. That function receives the store’s dispatch method, which is
        //then used to dispatch regular synchronous actions inside the function’s body once the
        //asynchronous operations have been completed.
    )
);


export default store;