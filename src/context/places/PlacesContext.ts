import { createContext } from "react";
import { Feature } from "../../interfaces/place";

export interface PlacesContextProps {
    isLoading: boolean;
    useLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
    searchPlaces: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext({} as PlacesContextProps);