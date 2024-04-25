import { ModalProvider } from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ModalProvider />
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
