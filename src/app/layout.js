import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/Context/AppContext"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "DeepSeek - WebAPP",
  description: "Full Stack App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
