import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import  Navbar  from "@/components/Nav/Navbar";
import { AuthProvider } from "@/lib/context/AuthContext";
//import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create professional resumes with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          {/* <Toaster /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
