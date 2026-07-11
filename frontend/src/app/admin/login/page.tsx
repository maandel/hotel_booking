import { login } from "@/app/actions/auth";
import Link from "next/link";
import { MotionDiv } from "@/components/MotionWrapper";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left side: Beautiful Imagery */}
      <div className="hidden lg:block w-1/2 relative">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop')" }}
        ></div>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-12 left-12 z-10">
          <h2 className="font-serif text-4xl text-white mb-2">Lumina</h2>
          <p className="font-sans text-white/90 text-sm tracking-wide">A Sanctuary of Modern Serenity.</p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-background">
        <MotionDiv className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4 tracking-tight">Staff Portal</h1>
            <p className="font-sans text-secondary text-base">
              Enter your credentials to access the management dashboard.
            </p>
          </div>

          <form action={login} className="space-y-8">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  required
                  className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.1em] rounded hover:opacity-90 transition-opacity mt-4"
            >
              Sign In &rarr;
            </button>
          </form>

          <div className="mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary border-b border-primary pb-1 hover:opacity-80 transition-opacity">
              &larr; Back to Public Site
            </Link>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
