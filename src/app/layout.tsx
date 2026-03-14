import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css"; // CSS for KaTeX equations
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Phản ứng Cháy và Nổ - Chuyên đề Hóa học",
  description: "Web app presentation trình bày chuyên đề về Phản ứng Cháy và Nổ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
