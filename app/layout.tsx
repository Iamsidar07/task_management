import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Taskii-Your ultimate task management app.",
  description: "Taskii is Your ultimate task management app with kanban board.",
  openGraph: {
    type: "website",
    title: "Taskii-Your ultimate task management app.",
    description:
      "Taskii is Your ultimate task management app with kanban board.",
    locale: "en-US",
    siteName: "Taskii-Your ultimate task management app.",
    url: "https://task-management-green-tau.vercel.app",
    countryName: "India",
    images: [
      {
        url: "https://task-management-green-tau.vercel.app/og.png",
        width: 1024,
        height: 682,
        alt: "Taskii Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@iamsidar07",
    title: "Taskii-Your ultimate task management app.",
    description:
      "Taskii is Your ultimate task management app with kanban board.",
    creatorId: "iamsidar07",
    site: "https://task-management-green-tau.vercel.app",
    images: [
      {
        url: "https://task-management-green-tau.vercel.app/og.png",
        width: 1024,
        height: 682,
        alt: "Taskii Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Navbar />
            <div className="w-full min-h-screen px-6">{children}</div>
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
