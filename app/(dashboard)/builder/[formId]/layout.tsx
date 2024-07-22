
export default function BuilderFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-full bg-background max-h-screen">
      <main className="w-full flex flex-grow">{children}</main>
    </div>
  );
}
