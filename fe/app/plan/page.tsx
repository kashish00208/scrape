
"use client";

import { useState } from "react";

const suggestions = [
  "I keep procrastinating",
  "I lack consistency",
  "I feel stuck",
  "I can't get started",
];

export default function Page() {
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!goal.trim()) return;

    setSubmitted(true);
    // TODO: Send the goal to your AI or backend.
  }

  return (
    <main className="min-h-screen bg-[#1c1d1c] px-5 text-[#f0f0e9] font-mono sm:px-8">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <div className="flex items-center gap-2 text-sm tracking-wider">
            <span className="h-2 w-2 rounded-full bg-[#d4f47a]" />
            UNTANGLE
          </div>
          <span className="text-xs text-[#777971]">
            01 / YOUR GOAL
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-16">
          {submitted ? (
            <div className="space-y-6">
              <p className="text-xs tracking-widest text-[#d4f47a]">
                A PLACE TO START
              </p>
              <h1 className="text-3xl leading-tight sm:text-4xl">
                Let`&lsquo;`s work through this, one step at a time.
              </h1>
              <div className="rounded-lg border border-white/10 bg-white/3 p-5">
                <p className="mb-2 text-xs text-[#92948b]">
                  YOUR GOAL
                </p>
                <p className="text-sm leading-7">{goal}</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-[#d4f47a] underline underline-offset-4"
              >
                Edit your goal
              </button>
            </div>
          ) : (
            <>
              <p className="mb-5 text-xs tracking-[0.2em] text-[#92948b]">
                LET`&apos;`S START SOMEWHERE.
              </p>

              <h1 className="max-w-xl text-3xl leading-tight tracking-tight sm:text-5xl">
                What’s something you want to change, but keep{" "}
                <span className="text-[#d4f47a]">struggling with?</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#9a9c93]">
                It doesn`&apos;`t have to be perfectly worded.
                Just start with what`&apos;`s on your mind.
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="rounded-lg border border-white/15 bg-white/3 transition-colors focus-within:border-[#d4f47a]/60">
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="I want to..."
                    rows={4}
                    maxLength={1000}
                    autoFocus
                    className="w-full resize-none bg-transparent p-5 text-sm leading-7 outline-none placeholder:text-[#65675f]"
                  />

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                    <span className="text-[10px] tracking-wider text-[#777971]">
                      BE HONEST. BE SPECIFIC.
                    </span>
                    <span className="text-xs text-[#777971]">
                      {goal.length}/1000
                    </span>
                  </div>
                </div>

                <p className="mb-3 mt-8 text-[10px] tracking-widest text-[#92948b]">
                  NEED A STARTING POINT?
                </p>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setGoal(suggestion)}
                      className={`rounded-md border px-3 py-2 text-xs transition-colors ${
                        goal === suggestion
                          ? "border-[#d4f47a]/60 text-[#d4f47a]"
                          : "border-white/10 text-[#a4a69d] hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!goal.trim()}
                  className="mt-8 flex w-full items-center justify-between rounded-md bg-[#d4f47a] px-5 py-4 text-sm font-medium text-[#1c1d1c] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span>Let`&apos;`s figure it out</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            </>
          )}
        </section>

        <footer className="border-t border-white/10 py-5 text-center text-[10px] tracking-widest text-[#777971]">
          ONE GOAL. ONE STEP AT A TIME.
        </footer>
      </div>
    </main>
  );
}
