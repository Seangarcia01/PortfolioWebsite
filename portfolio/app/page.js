// app/page.jsx — FINAL VERSION
// All sections on the left, sticky Timeline on the right.

import { About }          from "@/components/sections/About";
import { TechStack }      from "@/components/sections/TechStack";
import { Skills }         from "@/components/sections/Skills";
import { Projects }       from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { SocialLinks }    from "@/components/sections/SocialLinks";
import { Gallery }        from "@/components/sections/Gallery";
import { Timeline }       from "@/components/sections/Timeline";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-12 items-start">

        {/* LEFT: main content */}
        <div className="min-w-0">
          <About />
          <TechStack />
          <Skills />
          <Projects />
          <Certifications />
          <SocialLinks />
          <Gallery />
        </div>

        {/* RIGHT: sticky experience sidebar */}
        {/*
          sticky top-[88px] = 88px from top of viewport (clears the 72px header + 16px gap)
          h-fit              = only as tall as its content, never taller
          hidden lg:block    = hidden on mobile, shown on desktop
        */}
        <aside className="hidden lg:block sticky top-[88px] h-fit">
          <div className="
            rounded-2xl border border-neutral-200 dark:border-neutral-800
            bg-white dark:bg-neutral-900
            p-5 shadow-sm
            max-h-[calc(100vh-110px)]
            overflow-y-auto
            scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700
          ">
            <Timeline />
          </div>
        </aside>

      </div>
    </div>
  );
}