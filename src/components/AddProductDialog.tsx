import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import useAxiosAdminPrivate from "@/lib/hooks/useAxiosAdminPrivate";

interface AddProductDialogProp {
    setProducts: (value: (((prevState: APIv1.Product[]) => APIv1.Product[]) | APIv1.Product[])) => void
}

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    image: z.object({
        url: z.string().min(1),
        aspectRatio: z.preprocess(
            (a) => parseFloat(a as string),
            z.number().min(0)
        ),
    }),
    price: z.preprocess(
        (a) => parseInt(a as string, 10),
        z.number().min(0)
    ),
    quantity: z.preprocess(
        (a) => parseInt(a as string, 10),
        z.number().min(0)
    ),
    disabled: z.boolean().optional()
})

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
    name: "",
    description: "",
    image: {
        url: "",
        aspectRatio: 0
    },
    price: 0,
    quantity: 0,
    disabled: false
}

const AddProductDialog: React.FC<AddProductDialogProp> = (props) => {
    const {setProducts} = props;
    const axiosAdminPrivate = useAxiosAdminPrivate();

    const [open, setOpen] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const onSubmit = (values: FormData) => {
        axiosAdminPrivate.post("/api/v1/products", values, {withCredentials: true}).then((res) => {
            console.log(res);
            setProducts(currentProducts => [...currentProducts, res.data])
            setOpen(false);
        }).catch((err) => {
            alert(`Error: ${err}`);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-20">
                    ADD
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add new product
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="flex flex-row flex-wrap gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Product name</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Name" {...field}/>
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Product description</FormLabel>

                                    <FormControl>
                                        <Textarea placeholder="Description" {...field}/>
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image.url"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Image URL</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Image URL" {...field}/>
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image.aspectRatio"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Image aspect ratio</FormLabel>

                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Selling price</FormLabel>

                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({field}) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Quantity</FormLabel>

                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="disabled"
                            render={({field}) => (
                                <FormItem className="w-full flex items-center space-x-2">
                                    <FormLabel className="mt-2">Disabled</FormLabel>

                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="w-full">
                            <Button
                                type="button"
                                onClick={() => {
                                    form.reset(defaultValues);
                                    form.clearErrors();
                                }}
                            >
                                Reset
                            </Button>

                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialog;
