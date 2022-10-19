import { MapProvider, PlacesProvider } from "./context";
import { Home } from "./screens";

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <Home />
            </MapProvider>
        </PlacesProvider>
    );
};
