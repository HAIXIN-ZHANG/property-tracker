import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "property-tracker",
  description: "Area-first property research and opportunity tracking for Australian buyers."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
