import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

const outfit = Outfit({ subsets: ["latin"] })

export const metadata = {
  title: "Course Generator",
  description: "Generated by create next app",
};

const currentYear = new Date().getFullYear();

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      dynamic
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#000",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-indigo-800 hover:bg-indigo-900 text-white",
          card: "gradient-background2",
          headerTitle: "text-indigo-800",
          headerSubtitle: "text-purple-700",
        },
      }}
    >

      <html lang="en">
        {/* <GoogleOneTap /> */}
        <body className={`${outfit.className} flex flex-col min-h-screen`}>
          <div className="animated-bg" />
          <main className="flex-1">{children}</main> {/* Pushes footer down */}
          <footer className="bg-indigo-300 py-10 bg-opacity-10 gradient-background2 p-10">
            <div className="mx-auto px-4 text-center text-gray-200">
              <p>© {new Date().getFullYear()} CodeNow101. All Rights Reserved</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
