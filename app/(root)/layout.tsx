import StreamVideoProvider from "@/providers/StreamClientProvider";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}
