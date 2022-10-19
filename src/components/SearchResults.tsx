import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/place";
import { LoadingPlaces } from "./LoadingPlaces";

export const SearchResults = () => {
    const [activePlace, setActivePlace] = useState('');
    const { map, getRouteBetweenPoints } = useContext(MapContext);
    const { places, isLoadingPlaces, useLocation } = useContext(PlacesContext);

    const placeClicked = (place: Feature) => {
        const [lng, lat] = place.center;
        setActivePlace(place.id);
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) => {
        if(!useLocation) return;
        const [lng, lat] = place.center;
        getRouteBetweenPoints(useLocation, [lng, lat]);
    }

    if (isLoadingPlaces) {
        return <LoadingPlaces />;
    }

    if (places.length === 0) {
        return <></>;
    }

    return (
        <ul className="list-group mt-3 pointer">
            {places.map((place) => (
                <li
                    className={`list-group-item list-group-item-action ${(activePlace === place.id) && 'active'} `}
                    key={place.id}
                    onClick={() => placeClicked(place)}
                >
                    <h6>{place.text}</h6>
                    <p style={{ fontSize: "12px" }}>
                        {place.place_name}
                    </p>
                    <button 
                        className={`btn btn-sm ${activePlace === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`} 
                        onClick={ () => getRoute(place) }
                    >
                        Direcciones
                    </button>
                </li>
            ))}
        </ul>
    );
};
