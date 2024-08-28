import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Article Maker",
  description: "I hope you enjoy my application!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <Navbar />
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
