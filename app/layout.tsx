import "./globals.css";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Take Home",
  description: "Take Home Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${font.className} bg-[#171717] text-white antialiased`}
        >
          <Toaster richColors />

          <Nav />

          <main className="py-6 overflow-x-hidden">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
