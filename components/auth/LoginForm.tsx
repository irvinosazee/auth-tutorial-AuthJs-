import CardWrapper from "@/components/auth/CardWrapper"
export default function LoginForm(){
    return (
        <CardWrapper 
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial>
            Login Form!
        </CardWrapper>
    )
}