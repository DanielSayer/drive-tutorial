export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">{props.children}</div>
    </div>
  );
}
