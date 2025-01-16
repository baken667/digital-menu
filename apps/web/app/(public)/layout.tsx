import PublicLayout from "@/components/layouts/public/public-layout";

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
