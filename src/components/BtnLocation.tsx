import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnLocation = () => {
    const {useLocation} = useContext(PlacesContext);
    const {map, isMapReady} = useContext(MapContext);

    const searchMyLocation = () => {
        if (!isMapReady) throw new Error('No listo');
        if (!useLocation) throw new Error('No listo');

        map?.flyTo({
            center: useLocation
        });
    }

    return (
        <button
            className="btn btn-primary"
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 10,
            }}
            onClick={searchMyLocation}
        >
            Mi ubicación
        </button>
    );
};
