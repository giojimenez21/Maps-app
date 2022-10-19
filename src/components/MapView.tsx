import mapboxgl from "mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context"
import { Loading } from "./Loading";

export const MapView = () => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const { setMap } = useContext(MapContext);
    const {isLoading, useLocation} = useContext(PlacesContext);
    
    useLayoutEffect(() => {
        if(!isLoading) {
            const map = new mapboxgl.Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/light-v10', // style URL
                center: useLocation, // starting position [lng, lat]
                zoom: 12, // starting zoom    
            });
            setMap(map);
        }
    }, [isLoading]);

    if( isLoading ){
        return <Loading />
    }

    return (
        <div ref={mapDiv} style={{
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0
        }}>
        </div>
    )
}
