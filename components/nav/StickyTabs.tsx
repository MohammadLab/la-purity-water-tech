"use client";

import { useEffect, useRef, useState } from "react";
import TabsRow from "./TabsRow";

/**
 * StickyTabs
 * - Uses IntersectionObserver on the hero (#hero) to toggle visibility
 * - Shows ONLY the rounded pill (TabsRow) — no full-width rectangle background
 */
export default function StickyTabs() {
  const [visible, setVisible] = useState(false);
  const lastState = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting; // hero off-screen => show sticky
        if (shouldShow !== lastState.current) {
          lastState.current = shouldShow;
          setVisible(shouldShow);
        }
      },
      {
        root: null,
        rootMargin: "-64px 0px 0px 0px", // reveal a touch after scroll past hero
        threshold: 0.01,
      }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  if (!visible) return null;

  // Use fixed so it never pushes content; fade/slide in nicely.
  return (
    <div
      className="fixed top-2 left-0 right-0 z-40 transition-all duration-200 opacity-100 translate-y-0"
      role="region" aria-label="Sticky navigation"
    >
      <div className="mx-auto max-w-[1400px] px-4 flex justify-center">
        <TabsRow />
      </div>
    </div>
  );
}
