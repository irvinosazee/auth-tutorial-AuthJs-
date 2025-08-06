import CardWrapper from "@/components/auth/CardWrapper"
import { BsExclamationTriangle } from "react-icons/bs"

export default function ErrorCard(){
    return (
        <CardWrapper
        headerLabel="Oops! something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        >
            <div className="w-full flex items-center justify-center">
                <BsExclamationTriangle className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}