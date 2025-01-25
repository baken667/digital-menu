export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      {children}
    </div>
  );
}
