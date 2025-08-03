"use client"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { login } from "@/actions/login"
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormError from "@/components/FormError"
import FormSuccess from "@/components/FormSuccess"
import CardWrapper from "@/components/auth/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function LoginForm(){
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        startTransition(() => {
            login(values)
            .then((data) =>{
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper 
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="johndoe@example.com"
                                            type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}