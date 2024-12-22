import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPinPlus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { LocationDetails } from "@/store/model";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useEffect, useState } from "react";
import usePinBoardStore from "@/store/pinboard-store";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { getUniqueId } from "@/lib/helpers";

function SaveLocation({ editLocation }: { editLocation?: LocationDetails }) {

    const action: 'Edit' | 'Add' = editLocation ? 'Edit' : 'Add';

    const LocationFormSchema = z.object({
        name: z.string()
            .nonempty("Location name is required")
            .min(3, {
                message: "Location name must be at least 3 characters.",
            })
            .max(50, "Location name should be shorter than 50 chars.")
            .superRefine((val: any, ctx: any) => {
                const nameAlreadyExists: boolean = (action == "Add" && savedLocations.some(location => location.name === val.trim()))
                    || (action == "Edit" && savedLocations.some(location => location.name === val.trim() && location.id !== editLocation?.id));
                if (nameAlreadyExists) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Location name must be unique"
                    });
                }
            }),
        list: z.string(),
        note: z.string(),
    })
        .superRefine((_, ctx: any) => {
            const locationExists = action == "Add" && savedLocations
                .find(location =>
                    location.position?.lat === activePosition?.lat && location.position?.lng === activePosition?.lng
                );
            if (locationExists) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Co-ordinate already added as '${locationExists.name}'`,
                    path: ['name']
                });
            }
        });

    // form = { register, handleSubmit, watch, formState: { errors }, control }
    const form = useForm<z.infer<typeof LocationFormSchema>>({
        resolver: zodResolver(LocationFormSchema),
        defaultValues: {
            name: editLocation?.name ?? "",
            note: editLocation?.note ?? "",
            list: (editLocation?.listId ?? 1).toString()
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    useEffect(() => {
        form.reset({
            name: editLocation?.name ?? "",
            note: editLocation?.note ?? "",
            list: (editLocation?.listId ?? 1).toString()
        });
    }, [editLocation]);

    const onSubmit: SubmitHandler<z.infer<typeof LocationFormSchema>> = data => {
        console.log(data);
        const newName: string = data.name.trim();
        if (action === 'Edit') {
            const newLocation: LocationDetails = {
                id: editLocation!.id,
                name: newName,
                note: data.note,
                listId: data.list ?? '1',
                createdAt: editLocation!.createdAt,
                updatedAt: Date.now(),
                position: editLocation!.position
            };
            updateSavedLocation(editLocation!.id, newLocation);
            toast({
                description: "Location updated successfully",
            });
        } else {
            const nextId: string = getUniqueId();
            const newLocation: LocationDetails = {
                id: nextId,
                name: newName,
                note: data.note,
                listId: data.list,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                position: activePosition
            };
            addSavedLocation(newLocation);
            toast({
                description: "Location added successfully",
            });
        }
        form.reset();
        setOpen(false);
    };
    const onInvalid: SubmitErrorHandler<z.infer<typeof LocationFormSchema>> = data => {
        console.error(data);
    };

    const [open, setOpen] = useState(false);
    const { savedLocations, activePosition, savedLists, addSavedLocation, updateSavedLocation } = usePinBoardStore();
    const { toast } = useToast();

    return (

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                 <Button id={`${action.toLowerCase()}-location-button`}>
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
                            name="list"
                            render={({ field }) => (
                                <FormItem className="my-4">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder="Location Name" {...field} className="col-span-3" /> */}
                                        <Select defaultValue={field.value?.toString()} onValueChange={(value)=>field.onChange(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a list" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Lists</SelectLabel>
                                                    {savedLists.map((list) => (
                                                        <SelectItem key={list.id} value={list.id.toString()}>
                                                            {list.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                            <Button id="save-button" type="submit">Save</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

    );
}

export default SaveLocation;