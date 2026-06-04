import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "../globals.css";

const fontDisplay = DM_Serif_Display({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "MAA Saraswati Veterinary Hospital — Free Veterinary Care, Hyderabad",
    template: "%s | MAA Saraswati Veterinary Hospital",
  },
  description:
    "MAA Saraswati Veterinary Hospital provides completely free, world-class veterinary care for all animals in Hyderabad. 24/7 ambulance, surgery, diagnostics, and more — at zero cost to owners.",
  keywords: [
    "free veterinary hospital hyderabad",
    "animal hospital hyderabad",
    "veterinary care hyderabad",
    "free animal treatment",
    "MAA Saraswati",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MAA Saraswati Veterinary Hospital",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-charcoal bg-cream">
        <NextIntlClientProvider messages={messages}>
          {/* Saffron 4px top stripe — always visible above navbar */}
          <div className="h-1 w-full bg-saffron fixed top-0 left-0 z-50" aria-hidden="true" />

          <Navbar />

          {/* Main content — push down to clear fixed navbar (h-1 stripe + h-20 nav = ~84px) */}
          <main className="flex-1 pt-[85px]" id="main-content" role="main">
            {children}
          </main>

          <Footer />

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '14px',
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: { primary: '#2C5F2D', secondary: '#fff' },
                style: { border: '1px solid #EBF4EB' },
              },
              error: {
                iconTheme: { primary: '#DC2626', secondary: '#fff' },
                style: { border: '1px solid #FEE2E2' },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
