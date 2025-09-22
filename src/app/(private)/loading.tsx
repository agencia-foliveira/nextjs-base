export default function Loading() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col gap-4 p-6 border-r animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-6" />
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-full" />
        </div>
        <div className="mt-auto h-4 bg-gray-200 rounded w-1/2" />
      </aside>
      <main className="flex-1 p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>
      </main>
    </div>
  );
}
