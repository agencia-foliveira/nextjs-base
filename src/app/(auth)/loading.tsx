export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="w-full max-w-sm p-8 bg-white rounded-xl shadow-md flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-full" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="flex gap-2 mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </section>
    </main>
  );
}
