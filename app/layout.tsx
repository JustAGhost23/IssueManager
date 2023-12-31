import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "../components/NavBar";
import AuthProvider from "./api/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Manager",
  description: "An application to track and manage issues.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Providers>
              <Theme>
                <NavBar />
                <main className="p-4">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </Providers>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
