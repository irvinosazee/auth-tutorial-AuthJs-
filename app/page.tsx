import { LoginButton } from "@/components/auth/login-button";
import { poppins } from "@/components/font";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className={`${poppins.className} text-6xl font-semibold text-white drop-shadow-md`}>
          🔐 Auth
        </h1>
        <p className="${poppins.className} text-white text-lg">
          A simple authentication service
        </p>
        <div>
          <LoginButton >
            <Button variant="secondary" size="lg" className="cursor-pointer"> Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
