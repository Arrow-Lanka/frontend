import { combineReducers } from "redux";

import {clickedAppointmentReducer} from "../reducers/saveClickedGuideDataReducer";     






const rootReducer = combineReducers({
    
    clickedAppointmentReducer: clickedAppointmentReducer,
   

    
});

export default rootReducer;