"use client"
import { ClipLoader } from "react-spinners"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { newVerification } from "@/actions/new-verification"
import CardWrapper from "@/components/auth/CardWrapper"
import FormError from "@/components/FormError"
import FormSuccess from "@/components/FormSuccess"
export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (error || success) return;
        if (!token) {
            setError("Missing token")
            return null
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token, error, success])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <ClipLoader color="oklch(74.6% 0.16 232.661)" />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}