import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b-[1px] dark:border-slate-500 h-[60px] px-4 py-2">
        <Logo />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <main className="w-full flex flex-grow">{children}</main>
    </div>
  );
}
