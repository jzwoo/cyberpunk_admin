"use client"

import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {className} from "postcss-selector-parser";

const formSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(2)
})

const Login: React.FC = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="flex justify-center items-center h-full">
            <Card className={cn("w-[380px] h-[fit-content]", className)}>
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-5 h-full flex flex-col justify-center">
                            <FormField
                                control={form.control}
                                name="username"
                                htmlFor="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>

                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>

                                        <FormControl>
                                            <Input placeholder="password" {...field} />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>

                <CardFooter>
                    <Button className="mt-5 w-full" type="submit">LOGIN</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login;
