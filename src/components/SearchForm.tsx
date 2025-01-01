import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

export function SearchForm() {
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
        navigate(`/search?q=${data.q}`);
    };
    const onInvalid: SubmitErrorHandler<z.infer<typeof searchFormSchema>> = (data) => {
        console.error(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-row md:justify-end md:max-w-screen-md md:mx-auto md:bottom-24 md:right-2">
                <FormField
                    control={form.control}
                    name="q"
                    render={({ field }) => (
                        <FormItem className="mx-2 w-full md:w-1/3">
                            {/* <FormMessage /> */}
                            {/* <FormLabel>Name</FormLabel> */}
                            <FormControl>
                                <Input placeholder="Search" {...field} autoComplete="on" />
                            </FormControl>
                            {/* <FormDescription>
                                        Enter a unique name
                                    </FormDescription> */}

                        </FormItem>
                    )}
                />
                <Button type="submit" id="search-button" className="ml-2">
                    <ArrowRight />
                </Button>
            </form>
        </Form>
    );
}