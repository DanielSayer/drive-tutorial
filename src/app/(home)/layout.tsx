export default function HomePage(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center bg-gradient-to-br from-background via-slate-900 to-blue-950 p-4 text-white">
      <main className="text-center">{props.children}</main>
    </div>
  );
}
