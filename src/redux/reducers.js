import { combineReducers } from 'redux';

import cons from '../ducks/cons';
import pros from '../ducks/pros';

export default combineReducers({
    cons,
    pros,
});