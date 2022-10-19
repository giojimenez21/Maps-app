import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/place";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    useLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const initialState: PlacesState = {
    isLoading: true,
    useLocation: undefined,
    isLoadingPlaces: false,
    places: [],
};

interface PropsProvider {
    children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: PropsProvider) => {
    const [state, dispatch] = useReducer(placesReducer, initialState);

    useEffect(() => {
        getUserLocation().then((lngLat) =>
            dispatch({ type: "setUserLocation", payload: lngLat })
        );
    }, []);

    const searchPlaces = async (query: string): Promise<Feature[]> => {
        if (query.length === 0) {
            dispatch({type: 'setPlaces', payload: []});
            return [];
        };

        if (!state.useLocation) throw new Error("No hay ubicacion.");
        
        dispatch({ type: "setLoadingPlaces" });
        const res = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.useLocation.join(","),
            },
        });
        dispatch({ type: "setPlaces", payload: res.data.features });
        return res.data.features;
    };

    return (
        <PlacesContext.Provider value={{ ...state, searchPlaces }}>
            {children}
        </PlacesContext.Provider>
    );
};
