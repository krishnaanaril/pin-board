import { LocationSearchResult } from "@/store/model";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import PageHeader from "./PageHeader";
import { SearchCard } from "./SearchCard";
import { EmptyMessage } from "./EmptyMessage";

function Search() {
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const [results, setResults] = useState<LocationSearchResult[]>([]);
    const [searchCompleted, setSearchCompleted] = useState(false);

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            fetch(`https://nominatim.openstreetmap.org/search?q=${query}&limit=5&format=jsonv2`)
                .then(response => response.json())
                .then(data => setResults(data))
                .catch(error => console.error('Error fetching data:', error))
                .finally(() => setSearchCompleted(true));
        }
    }, [location, searchParams]);

    useEffect(() => {
        document.title = "Search Results | Pin Board: Save your locations"
    }, []);

    return (
        <>
            <PageHeader headerText="Search Results" />

            {results.length > 0 && (results.map(result => <SearchCard key={result.place_id} list={result} />))}
            {
                searchCompleted &&
                results.length === 0 &&
                <EmptyMessage message="No results found" />

            }
            {results.length === 0 && !searchCompleted && <div>Searching...</div>}

        </>
    );
}

export default Search;