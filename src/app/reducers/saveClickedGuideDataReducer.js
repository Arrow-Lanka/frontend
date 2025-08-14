import { SAVE_CLICKED_GUIDEDATA } from '../../types';

const initalState={
    clickedGuideData: {}
};

export const clickedAppointmentReducer = (state=initalState, action) => {
    switch(action.type){
        case SAVE_CLICKED_GUIDEDATA:
            return {
                clickedGuideData: action.payload
            }
        default:
            return state;
    }
};