
"use client"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { login } from "@/actions/login"
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormError from "@/components/FormError"
import FormSuccess from "@/components/FormSuccess"
import CardWrapper from "@/components/auth/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"; 

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                if (data?.error) {
                    form.reset()
                    setError(data?.error)
                }
                if (data?.success) {
                    form.reset()
                    setSuccess(data?.success)
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true)
                }
            }).catch((error) => {
                setError("Something went wrong!")
                console.log(error)
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
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="123456" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
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
                                            <Button
                                                size="sm"
                                                variant="link"
                                                asChild
                                                className="px-0 font-normal w-fit">
                                                <Link href="/auth/reset">
                                                    Forgot Password?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success}/>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}