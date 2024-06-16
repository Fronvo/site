import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fronvo | Private social media",
  description: "Private social media, reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="title" content="Fronvo" key="title" />
        <meta name="description" content="Private social media, reimagined." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fronvo.com/" />
        <meta property="og:title" content="Fronvo" />
        <meta
          property="og:description"
          content="Private social media, reimagined."
        />
        <meta property="og:image" content="https://fronvo.com/embed.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fronvo.com/" />
        <meta property="twitter:title" content="Fronvo" />
        <meta
          property="twitter:description"
          content="Lite-weight cloud-based file storage."
        />
        <meta property="twitter:image" content="https://fronvo.com/embed.png" />
      </head>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster duration={1500} position={"bottom-center"} />
        </ThemeProvider>
      </body>
    </html>
  );
}
