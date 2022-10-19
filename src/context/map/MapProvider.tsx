import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { directionApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
import { PlacesContext } from '../places/PlacesContext';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

export interface MapState {
    isMapReady: boolean,
    map?: Map,
    markers: Marker[]
}

const initialState: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface MapProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({children}: MapProviderProps) => {
    const { places } = useContext(PlacesContext);
    const [state, dispatch] = useReducer(mapReducer, initialState);

    useEffect(() => {
        state.markers.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup().setHTML(`
                <h6>${place.text}</h6>
                <p>${place.place_name}</p>
            `);
            const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!);
            newMarkers.push(newMarker);
        }

        dispatch({type: 'setMarkers', payload: newMarkers});
    }, [places])
    

    const setMap = (map: Map) => {
        new Marker().setLngLat(map.getCenter()).addTo(map);
        dispatch({type: 'setMap', payload: map});
    }

    const getRouteBetweenPoints = async(start: [number, number], end: [number, number]) => {
        const res = await directionApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const { geometry } = res.data.routes[0];
        const { coordinates } = geometry;

        const bounds = new LngLatBounds( start, start );

        for (const coord of coordinates) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds , {
            padding: 200
        });

        // Polynine
        const sourceData: AnySourceData = {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates,
                        },
                    },
                ],
            },
        };

        if( state.map?.getLayer('Route')) {
            state.map.removeLayer('Route');
            state.map.removeSource('Route');
        }

        state.map?.addSource('Route', sourceData);
        state.map?.addLayer({
            id:'Route',
            type: 'line',
            source: 'Route',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint:{
                "line-color":'black',
                'line-width': 3
            }
        });
    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>
            {children}
        </MapContext.Provider>
    )
}
