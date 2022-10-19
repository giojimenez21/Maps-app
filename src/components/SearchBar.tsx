import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
    const debounceRef = useRef<any>();
    const { searchPlaces } = useContext(PlacesContext);

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            searchPlaces(event.target.value);
        }, 500);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar un lugar"
                onChange={onQueryChange}
            />
            <SearchResults />
        </div>
    );
};
