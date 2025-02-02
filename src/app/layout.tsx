import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "~/components/providers";

export const metadata: Metadata = {
  title: "Drive Tutorial",
  description: "A Google Drive Clone",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <html lang="en" className={`dark ${GeistSans.variable}`}>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
