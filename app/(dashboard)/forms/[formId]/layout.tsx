export default function FormDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-grow flex-col mx-auto">{children}</main>
  );
}
