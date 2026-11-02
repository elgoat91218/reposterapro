"use client";
import type { LucideIcon } from "lucide-react";
import {Brand} from "./brand";
import { Home, ClipboardList, Plus, Users, Menu, CakeSlice, Package, Boxes, ChartNoAxesCombined, X, HelpCircle } from "lucide-react";

type NavItem={id:string;label:string;icon:LucideIcon};

export const navItems:NavItem[]=[
  {id:"home",label:"Inicio",icon:Home},
  {id:"orders",label:"Pedidos",icon:ClipboardList},
  {id:"customers",label:"Clientes",icon:Users},
];

const moreItems:NavItem[]=[
  {id:"products",label:"Productos",icon:CakeSlice},
  {id:"ingredients",label:"Insumos",icon:Package},
  {id:"inventory",label:"Inventario",icon:Boxes},
    {id:"statistics",label:"Estadísticas",icon:ChartNoAxesCombined},
    {id:"help",label:"Ayuda",icon:HelpCircle},
];

export function BottomNav({active,onNavigate,onCreate,onMore}:{active:string;onNavigate:(id:string)=>void;onCreate:()=>void;onMore:()=>void}){
 return <nav aria-label="Navegación principal" className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--surface)]/96 shadow-[0_-6px_22px_rgba(82,55,45,.04)] backdrop-blur-xl md:hidden">
   <div className="mx-auto grid max-w-xl grid-cols-5 items-end px-2 py-2">
     <NavButton item={navItems[0]} active={active} onClick={()=>onNavigate("home")}/>
     <NavButton item={navItems[1]} active={active} onClick={()=>onNavigate("orders")}/>
     <button aria-label="Crear" onClick={onCreate} className="mx-auto -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_8px_22px_rgba(233,154,148,.34)] ring-4 ring-[var(--surface)] border-2 border-[var(--accent)] transition-transform active:scale-95"><Plus size={25}/></button>
     <NavButton item={navItems[2]} active={active} onClick={()=>onNavigate("customers")}/>
     <button data-tour="more" aria-label="Más opciones" onClick={onMore} className={`flex flex-col items-center gap-1 py-1 ${moreItems.some(x=>x.id===active)?"text-[var(--primary)]":"text-[var(--muted)]"}`}><Menu size={20}/><span className="text-[10px]">Más</span></button>
   </div>
 </nav>
}

function NavButton({item,active,onClick}:{item:NavItem;active:string;onClick:()=>void}){const Icon=item.icon;return <button data-tour={item.id} onClick={onClick} className={`flex min-h-11 flex-col items-center justify-center gap-1 py-1 ${active===item.id?"font-semibold text-[var(--primary)]":"text-[var(--muted)]"}`}><Icon size={20}/><span className="text-[10px]">{item.label}</span></button>}

export function CreateMenu({onClose,onCreate}:{onClose:()=>void;onCreate:(type:"order"|"customer"|"ingredient")=>void}){
 const items=[
  {id:"order" as const,label:"Nuevo pedido",description:"Registrar una venta y entrega",icon:ClipboardList},
  {id:"customer" as const,label:"Nuevo cliente",description:"Guardar un contacto",icon:Users},
  {id:"ingredient" as const,label:"Nuevo insumo",description:"Agregar stock y costo",icon:Package},
 ];
 return <div className="mobile-sheet-overlay fixed inset-0 z-50 bg-black/25 md:hidden" onClick={onClose}>
   <div className="mobile-bottom-sheet fixed bottom-0 left-0 right-0 rounded-t-[28px] border border-[var(--border)] bg-[var(--surface)] bakery-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl max-h-[85dvh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
    <div className="mb-4 flex items-center justify-between"><div><h2 className="serif text-xl font-semibold">Crear</h2><p className="text-xs text-[var(--muted)]">Elegí qué querés agregar</p></div><button aria-label="Cerrar crear" onClick={onClose} className="rounded-full p-2 hover:bg-[var(--bg)]"><X size={20}/></button></div>
    <div className="space-y-2">{items.map(({id,label,description,icon:Icon})=><button key={id} onClick={()=>onCreate(id)} className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-[var(--border)] p-3 text-left transition hover:border-[var(--primary)] hover:bg-[var(--bg)]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg)] text-[var(--primary)]"><Icon size={20}/></span><span><span className="block text-sm font-semibold">{label}</span><span className="block text-xs text-[var(--muted)]">{description}</span></span></button>)}</div>
   </div>
 </div>
}

export function MoreMenu({onClose,onNavigate}:{onClose:()=>void;onNavigate:(id:string)=>void}){return <div className="mobile-sheet-overlay fixed inset-0 z-50 bg-black/25 md:hidden" onClick={onClose}><div className="mobile-bottom-sheet fixed bottom-0 left-0 right-0 rounded-t-[28px] border border-[var(--border)] bg-[var(--surface)] bakery-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl max-h-[85dvh] overflow-y-auto" onClick={e=>e.stopPropagation()}><div className="mb-4 flex items-center justify-between"><div><h2 className="serif text-xl font-semibold">Más</h2><p className="text-xs text-[var(--muted)]">Secciones del negocio</p></div><button aria-label="Cerrar más" onClick={onClose} className="rounded-full p-2 hover:bg-[var(--bg)]"><X size={20}/></button></div><div className="grid grid-cols-2 gap-2">{moreItems.map(({id,label,icon:Icon})=><button key={id} onClick={()=>{onNavigate(id);onClose()}} data-tour={id} className="flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--border)] p-3 text-left transition hover:border-[var(--primary)] hover:bg-[var(--bg)]"><Icon size={19} className="shrink-0 text-[var(--primary)]"/><span className="text-sm font-medium">{label}</span></button>)}</div></div></div>}

const sidebarGroups:{title:string;items:NavItem[]}[]=[
 {title:"Principal",items:[{id:"home",label:"Inicio",icon:Home},{id:"orders",label:"Pedidos",icon:ClipboardList},{id:"customers",label:"Clientes",icon:Users}]},
 {title:"Mi negocio",items:[{id:"products",label:"Productos",icon:CakeSlice},{id:"inventory",label:"Inventario",icon:Boxes}]},
];
export function Sidebar({active,onNavigate}:{active:string;onNavigate:(id:string)=>void}){return <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--border)] bg-[var(--surface)] p-4 md:block"><div className="mb-7 px-3"><Brand/><div className="mt-2 text-[10px] text-[var(--muted)]">Gestión artesanal</div></div><nav aria-label="Navegación principal" className="space-y-6">{sidebarGroups.map(group=><div key={group.title}><div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">{group.title}</div><div className="space-y-1">{group.items.map(({id,label,icon:Icon})=><button key={id} data-tour={id} onClick={()=>onNavigate(id)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active===id?"bg-[var(--bg)] font-semibold text-[var(--primary-dark)] dark:text-[var(--primary)]":"text-[var(--muted)] hover:bg-[var(--bg)]"}`}><Icon size={18}/>{label}</button>)}</div></div>)}<div className="border-t border-[var(--border)] pt-4"><div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Más</div><div className="space-y-1">{[{id:"statistics",label:"Estadísticas",icon:ChartNoAxesCombined},{id:"ingredients",label:"Insumos",icon:Package},{id:"help",label:"Ayuda",icon:HelpCircle}].map(({id,label,icon:Icon})=><button key={id} data-tour={id} onClick={()=>onNavigate(id)} className={`flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active===id?"bg-[var(--bg)] font-semibold text-[var(--primary-dark)] dark:text-[var(--primary)]":"text-[var(--muted)] hover:bg-[var(--bg)]"}`}><Icon size={17}/>{label}</button>)}</div></div></nav></aside>}
