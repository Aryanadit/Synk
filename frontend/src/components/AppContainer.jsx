export default function AppContainer({ children }) {
  return (
    <div className="flex h-screen w-full min-w-0 flex-col overflow-hidden bg-base-100">
      {children}
    </div>
  );
}