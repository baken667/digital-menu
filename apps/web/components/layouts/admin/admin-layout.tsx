"use client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3>Admin Layout</h3>
      {children}
    </div>
  );
}
