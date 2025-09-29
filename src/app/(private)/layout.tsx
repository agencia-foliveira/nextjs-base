export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Privado</h1>
      {children}
    </div>
  );
}
