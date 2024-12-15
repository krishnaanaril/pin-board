import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPinPlus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { LocationDetails, LocationFormSchema } from "@/store/model";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";
import usePinBoardStore from "@/store/pinboard-store";
import { useToast } from "@/hooks/use-toast";

function SaveLocation({ location } : { location?: LocationDetails }) {

    const action : string = location ? 'Edit' : 'Add';

    // form = { register, handleSubmit, watch, formState: { errors }, control }
    const form = useForm<z.infer<typeof LocationFormSchema>>({
        resolver: zodResolver(LocationFormSchema),
        defaultValues: {
            name: location?.name ?? "",
            note: location?.note ?? ""
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })
    const onSubmit: SubmitHandler<z.infer<typeof LocationFormSchema>> = data => {
        console.log(data);        
        const newName: string = data.name.trim();
        const alreadyExists: boolean = savedLocations.some(location => location.name === newName);
        if (!alreadyExists) {
            const nextId: number = (savedLocations?.at(-1)?.id ?? 0) + 1;
            const newLocation: LocationDetails = {
                id: nextId,
                name: newName,
                note: data.note,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                position: activePosition
            };
            addSavedLocation(newLocation);
            toast({
                description: "Location added successfully",
            });
        } else if (action === 'Edit') {
            const newLocation: LocationDetails = {
                id: location!.id,
                name: newName,
                note: data.note,
                createdAt: location!.createdAt,
                updatedAt: Date.now(),
                position: location!.position
            };
            updateSavedLocation(location!.id, newLocation);
            toast({
                description: "Location updated successfully",
            });
        }
        form.reset();
        setOpen(false);
    };
    const onInvalid: SubmitErrorHandler<z.infer<typeof LocationFormSchema>> = data => {
        console.error(data);
    };

    const [open, setOpen] = useState(false);
    const { savedLocations, activePosition, addSavedLocation, updateSavedLocation } = usePinBoardStore();
    const { toast } = useToast()

    return (

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <MapPinPlus />
                    {action}
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>{action} Location</SheetTitle>
                    <SheetDescription>
                        {action} the selected location by entering a name and note.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-4">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Location Name" {...field} className="col-span-3" />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a unique name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem className="my-4">
                                    <FormLabel>Note</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Location Note" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Add your custom note.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="submit">Save</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

    );
}

export default SaveLocation;