import { Feature } from "../../interfaces/place";
import { PlacesState } from "./PlacesProvider";

type PlacesAction = 
| { type: 'setUserLocation', payload: [number, number ] }
| {type: 'setPlaces', payload: Feature[]}  
| {type: 'setLoadingPlaces'}

export const placesReducer = (state: PlacesState, action: PlacesAction):PlacesState => {
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                useLocation: action.payload
            }
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: []
            }
        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
        default:
            return state;
    }
}