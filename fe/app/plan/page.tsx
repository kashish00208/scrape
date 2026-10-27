
"use client";

import { useState } from "react";

const suggestions = [
  "I keep procrastinating",
  "I lack consistency",
  "I feel stuck",
  "I can&rsquo; get started",
];

const durations = [
  { days: 21, description: "Build a foundation" },
  { days: 30, description: "Create a routine" },
  { days: 90, description: "Build lasting habits" },
  { days: 180, description: "Long-term growth" },
];

export default function Page() {
  const [goal, setGoal] = useState("");
  const [selectedDays, setSelectedDays] = useState(30);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!goal.trim()) return;

    setSubmitted(true);
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
                Let&rsquo;s work through this, one step at a time.
              </h1>

              <div className="rounded-lg border border-white/10 bg-white/3 p-5">
                <p className="mb-2 text-xs text-[#92948b]">
                  YOUR GOAL
                </p>
                <p className="text-sm leading-7">{goal}</p>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="mb-2 text-xs text-[#92948b]">
                    YOUR CONSISTENCY JOURNEY
                  </p>
                  <p className="text-2xl text-[#d4f47a]">
                    {selectedDays} days
                  </p>
                  <p className="mt-2 text-xs text-[#a4a69d]">
                    {
                      durations.find(
                        (duration) => duration.days === selectedDays
                      )?.description
                    }
                  </p>
                </div>
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
                LET&rsquo;s START SOMEWHERE.
              </p>

              <h1 className="max-w-xl text-3xl leading-tight tracking-tight sm:text-5xl">
                What&rsquo;s something you want to change, but keep{" "}
                <span className="text-[#d4f47a]">
                  struggling with?
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#9a9c93]">
                It doesn&rsquo;s have to be perfectly worded.
                Just start with what&rsquo;s on your mind.
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="rounded-lg border border-white/15 bg-white/[0.03] transition-colors focus-within:border-[#d4f47a]/60">
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="I want to..."
                    rows={4}
                    maxLength={1000}
                    autoFocus
                    required
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

                {/* Consistency duration selector */}
                <div className="mt-10">
                  <p className="text-xs tracking-widest text-[#92948b]">
                    CHOOSE YOUR TIMELINE
                  </p>

                  <h2 className="mt-3 text-xl sm:text-2xl">
                    How long do you want to commit?
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-[#9a9c93]">
                    Your AI plan will adapt to the time you choose.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {durations.map((duration) => {
                      const isSelected =
                        selectedDays === duration.days;

                      return (
                        <button
                          key={duration.days}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedDays(duration.days)}
                          className={`rounded-lg border p-4 text-left transition-all ${
                            isSelected
                              ? "border-[#d4f47a]/70 bg-[#d4f47a]/10"
                              : "border-white/10 bg-white/[0.02] hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-2xl ${
                                isSelected
                                  ? "text-[#d4f47a]"
                                  : "text-white"
                              }`}
                            >
                              {duration.days}
                            </span>

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
                                isSelected
                                  ? "border-[#d4f47a] bg-[#d4f47a] text-[#1c1d1c]"
                                  : "border-white/30"
                              }`}
                            >
                              {isSelected ? "✓" : ""}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-[#92948b]">
                            days
                          </p>

                          <p
                            className={`mt-4 text-xs leading-5 ${
                              isSelected
                                ? "text-[#d4f47a]"
                                : "text-[#a4a69d]"
                            }`}
                          >
                            {duration.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!goal.trim()}
                  className="mt-8 flex w-full items-center justify-between rounded-md bg-[#d4f47a] px-5 py-4 text-sm font-medium text-[#1c1d1c] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span>Build my {selectedDays}-day plan</span>
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
