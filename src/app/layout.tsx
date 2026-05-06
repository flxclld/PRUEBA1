import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GranFormato | Arte en gran formato para transformar espacios",
  description:
    "Arte en gran formato, visualizacion AI, asesoria curatorial e instalacion profesional para hogares, hoteles, restaurantes y espacios arquitectonicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
