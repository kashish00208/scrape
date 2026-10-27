"use client"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleGetStarted = () =>{
    router.push("/plan")
  }
  return (
    <div className="min-h-screen font-mono bg-[#1c1d1c] px-12 border-x-2">
      <div className="min-h-screen w-full bg-[#030303] border-l border-r border-white/30">
        <header className="w-full flex justify-between items-center p-5 border-b border-white/30">
          <div className="font-mono text-white text-lg">
            UNTANGLE
          </div>

          <button onClick={handleGetStarted} className="bg-white rounded-3xl px-4 py-2 text-black text-sm hover:bg-neutral-200 transition-colors">
            Get started
          </button>
        </header>

        <main className="min-h-[85vh] flex flex-col items-center justify-center text-white text-center px-6 py-20">
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Your progress, your pace.
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[1.1]">
              Consistency is not about never stopping.
              <span className="text-white/40">
                {" "}Its about making it easier to start again.
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base leading-7 text-white/60">
              Build habits, track your progress, and find your rhythm
              again whenever life gets in the way. No guilt. No starting
              from zero. Just your next step.
            </p>

            <button className="mt-3 bg-white text-black rounded-full px-7 py-3 text-sm hover:bg-neutral-200 transition-colors">
              Start your journey <span aria-hidden="true">→</span>
            </button>

            <p className="text-xs text-white/30 mt-2">
              Small steps. Real progress.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
