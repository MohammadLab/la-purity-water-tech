import "./../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LaPurity Water Tech",
  description: "Admin-only setup with Sanity Studio"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
