import { Bookmark, Share, LocateFixed, List, ArrowRight } from "lucide-react";
import Map from "./Map";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";
import { LatLng, LocationDetails } from "@/store/model";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

function Home() {

    const [searchParams] = useSearchParams();
    const { savedLocations, activePosition, updateActivePosition } = usePinBoardStore();
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState<LocationDetails | undefined>(undefined);
    const navigate = useNavigate();

    const searchFormSchema = z.object({
        q: z.string().nonempty()
    });

    const form = useForm<z.infer<typeof searchFormSchema>>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            q: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<z.infer<typeof searchFormSchema>> = (data) => {
        console.log(data);
        navigate(`/search?q=${data.q}`);
    };
    const onInvalid: SubmitErrorHandler<z.infer<typeof searchFormSchema>> = (data) => {
        console.error(data);
    };

    useEffect(() => {
        const idQuery = searchParams.get('id');
        const defaultPosition: LatLng = {
            lat: 51.505,
            lng: -0.09
        };

        const id: string | undefined = idQuery ? idQuery : undefined;
        const _currentLocation: LocationDetails | undefined = id ? savedLocations.filter(location => location.id == id)?.at(0) : undefined;
        setCurrentLocation(_currentLocation);

        if (_currentLocation) {
            const currentPosition = _currentLocation.position ?? defaultPosition;
            console.log(currentPosition);
            updateActivePosition(currentPosition);
        }
    }, [location]);

    function getGeoIntent(position: any, label: string): string {
        return position ?
            `geo:${position.lat},${position.lng}?q=${position.lat},${position.lng}(${label})` :
            '';
    }

    function goToCurrentLocation() {
        updateActivePosition(null);
    }

    return (
        <div className="relative h-screen w-screen md:max-w-screen-md md:mx-auto">
            <Map />

            <div className="absolute bottom-32 right-2 flex flex-col md:bottom-36 md:right-4">
                <div className="my-2 flex flex-row justify-end">
                    <Button id="current-location-button" onClick={goToCurrentLocation}>
                        <LocateFixed size={24} />
                    </Button>
                </div>
                <SaveLocation />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="w-full absolute bottom-20 flex flex-row md:justify-end md:max-w-screen-md md:mx-auto md:bottom-24 md:right-2">
                    <FormField
                        control={form.control}
                        name="q"
                        render={({ field }) => (
                            <FormItem className="mx-2 w-full md:w-1/3">
                                {/* <FormMessage /> */}
                                {/* <FormLabel>Name</FormLabel> */}
                                <FormControl>
                                    <Input placeholder="Search" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                        Enter a unique name
                                    </FormDescription> */}

                            </FormItem>
                        )}
                    />
                    <Button type="submit" id="search-button" className="mx-2">
                        <ArrowRight />
                    </Button>
                </form>
            </Form>
            {/* <Input className="mx-2 md:w-1/3" placeholder="Search" />
                <Button id="search-button" className="mx-2" onClick={goToCurrentLocation}>
                    <ArrowRight />
                </Button> */}

            {/* <div className="fixed w-full bottom-0 py-4 flex place-content-evenly bg-opacity-50 backdrop-blur-lg">
                <Button id="saved-locations-button" asChild>
                    <Link id="saved-link" to="/saved">
                        <Bookmark />
                        Saved
                    </Link>
                </Button>
                <Button id="lists-button" asChild>
                    <Link id="lists-link" to="/lists">
                        <List />
                        Lists
                    </Link>
                </Button>
                <SaveLocation/>
                <Button id="share-location-button" disabled={!activePosition} asChild>
                    <Link id="share-link"to={getGeoIntent(activePosition, currentLocation?.name ?? 'Pin Board')} target="_blank">
                        <Share />
                        Share
                    </Link>
                </Button>
            </div> */}
        </div>
    );
}

export default Home;