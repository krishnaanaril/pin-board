import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPinPlus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { LocationFormSchema } from "@/store/model";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";

function SaveLocation() {
    // form = { register, handleSubmit, watch, formState: { errors }, control }
    const form = useForm<z.infer<typeof LocationFormSchema>>({
        resolver: zodResolver(LocationFormSchema),
        defaultValues: {
            name: "",
            note: ""
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })
    const onSubmit: SubmitHandler<z.infer<typeof LocationFormSchema>> = data => {
        console.log(data);
        form.reset();
        setOpen(false);
    };
    const onInvalid: SubmitErrorHandler<z.infer<typeof LocationFormSchema>> = data => {
        console.error(data);
    };

    const [open, setOpen] = useState(false);

    return (

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <MapPinPlus />
                    Add
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Save Location</SheetTitle>
                    <SheetDescription>
                        Save the selected location by adding a name and note.
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