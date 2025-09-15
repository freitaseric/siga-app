import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "SIGA App",
  description: "Sistema Integrado de Gestão Agropecuária",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
