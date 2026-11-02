"use client";

export function Brand({compact=false}:{compact?:boolean}){
 return <div className={`flex items-center ${compact?"gap-2":"gap-2.5"}`} aria-label="Repostera Pro">
   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#315CF4] text-white shadow-[0_4px_12px_rgba(49,92,244,.20)]" aria-hidden="true">
     <svg viewBox="0 0 36 36" width="25" height="25" fill="none">
       <path d="M8 25.5h20M10 20.5h16M12 15.5h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
       <path d="M18 7.5v3.2M14.5 10.7h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
       <path d="M8 28.5h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".65"/>
     </svg>
   </span>
   <span className="leading-none">
     <span className="block text-[16px] font-semibold tracking-[-0.04em] text-[#172033]">Repostera</span>
     <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#78849B]">Pro</span>
   </span>
 </div>
}
