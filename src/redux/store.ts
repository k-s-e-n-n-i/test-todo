import { createStore } from 'redux';
import reducer from './reducers/Reducer';

const service = createStore(reducer);

export default service;
