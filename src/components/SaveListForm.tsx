import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ListDetails } from "@/store/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { getUniqueId } from "@/lib/helpers";
import usePinBoardStore from "@/store/pinboard-store";
import { useToast } from "@/hooks/use-toast";

export function SaveListForm({ editList, setOpen }: { editList?: ListDetails, setOpen: (open: boolean) => void }) {

    const action: 'Edit' | 'Add' = editList ? 'Edit' : 'Add';
    const { savedLists, addListItem, updateListItem } = usePinBoardStore();
    const { toast } = useToast();

    const ListFormSchema = z.object({
        name: z.string()
            .nonempty("List name is required")
            .min(3, {
                message: "List name must be at least 3 characters.",
            })
            .max(50, "List name should be shorter than 50 chars.")
            .superRefine((val: any, ctx: any) => {
                const nameAlreadyExists: boolean = (action == "Add" && savedLists.some(list => list.name === val.trim()))
                    || (action == "Edit" && savedLists.some(list => list.name === val.trim() && list.id !== editList?.id));
                if (nameAlreadyExists) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "List name must be unique"
                    });
                }
            }),
        description: z.string().max(100, "Description should be shorter than 100 chars.")
    });

    useEffect(() => {
        form.reset({
            name: editList?.name ?? "",
            description: editList?.description ?? ""
        });
    }, [editList]);

    const form = useForm<z.infer<typeof ListFormSchema>>({
        resolver: zodResolver(ListFormSchema),
        defaultValues: {
            name: editList?.name ?? "",
            description: editList?.description ?? ""
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    useEffect(() => {
        form.reset({
            name: editList?.name ?? "",
            description: editList?.description ?? ""
        });
    }, [editList]);

    const onSubmit: SubmitHandler<z.infer<typeof ListFormSchema>> = data => {
        if (action === 'Add') {
            const nextId: string = getUniqueId();
            addListItem({
                id: nextId,
                name: data.name.trim(),
                description: data.description.trim(),
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            toast({
                description: "List added successfully",
            });
        } else {
            updateListItem(editList!.id, {
                id: editList!.id,
                createdAt: editList!.createdAt,
                name: data.name.trim(),
                description: data.description.trim(),
                updatedAt: Date.now()
            });
            toast({
                description: "List updated successfully",
            });
        }
        form.reset();
        setOpen(false);
    };

    const onInvalid: SubmitErrorHandler<z.infer<typeof ListFormSchema>> = data => {
        console.error(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="my-4 mt-auto flex flex-col gap-2 px-4">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="List Name" {...field} className="col-span-3" autoComplete="on" />
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
                    name="description"
                    render={({ field }) => (
                        <FormItem className="my-4 mt-auto flex flex-col gap-2 px-4">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="List Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                Add your custom description.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-auto flex flex-col gap-2 px-4">
                    <Button id="save-button" type="submit">Save</Button>
                </div>
            </form>
        </Form>
    );
}