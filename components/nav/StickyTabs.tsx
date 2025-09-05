// components/nav/StickyTabs.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import TabsRow from "./TabsRow";

export default function StickyTabs() {
  const [visible, setVisible] = useState(false);
  const lastState = useRef(false);

  useEffect(() => {
    // Watch the hero section (id="hero")
    const hero = document.getElementById("hero");
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // When hero is on screen => hide sticky; off screen => show sticky
        const shouldShow = !entry.isIntersecting;
        if (shouldShow !== lastState.current) {
          lastState.current = shouldShow;
          setVisible(shouldShow);
        }
      },
      {
        // Trigger a bit before the hero fully leaves to prevent overlap flicker
        root: null,
        rootMargin: "-64px 0px 0px 0px", // adjust if needed
        threshold: 0.01,
      }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-40
        transition-all duration-200
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
      aria-hidden={!visible}
    >
      <div className="bg-[#0D1B2A]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0D1B2A]/75">
        <div className="mx-auto max-w-[1400px] px-4 py-2 text-center">
          {/* Same exact tabs styling */}
          <TabsRow />
        </div>
      </div>
    </div>
  );
}
