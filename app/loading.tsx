export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex w-[min(88vw,340px)] flex-col items-center rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
          <video
            src="/splash.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="h-32 w-32 object-cover"
          />
        </div>

        <h2 className="mt-5 text-xl font-bold">Mondo</h2>
        <p className="mt-1 text-sm text-slate-500">
          Sedang menyiapkan materi, minasan...
        </p>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full w-2/3 animate-[splashLoading_1.4s_ease-in-out_infinite] rounded-full bg-slate-950 dark:bg-white" />
        </div>
      </div>
    </div>
  )
}
