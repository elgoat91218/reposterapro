"use client";
import {useEffect,useMemo,useState} from "react";
import {Bell,Search,UserRound} from "lucide-react";
import {createEmptyData} from "@/data/empty";
import {Tour,Help} from "@/components/onboarding";
import {getData,saveData} from "@/lib/storage";
import type {AppData,Settings} from "@/types";
import {calculateRealCost} from "@/lib/calculations";
import {Sidebar,BottomNav,MoreMenu,CreateMenu} from "@/components/navigation";
import {Button,Toast} from "@/components/ui";
import {Dashboard,Orders,Customers,Products,Ingredients,Inventory,Statistics,Profile,Notifications} from "@/components/screens";
import {Brand} from "@/components/brand";
import {AuthScreen} from "@/components/auth-screen";
import {getSupabaseBrowserClient} from "@/lib/supabase";
import {setStorageUser} from "@/lib/storage";
import type {Session} from "@supabase/supabase-js";
import {LogOut} from "lucide-react";

export default function App(){
 const [session,setSession]=useState<Session|null>(null); const [authReady,setAuthReady]=useState(false);
 const [data,setData]=useState<AppData|null>(null); const [active,setActive]=useState("home"); const [more,setMore]=useState(false); const [create,setCreate]=useState(false); const [createIntent,setCreateIntent]=useState<"order"|"customer"|"ingredient"|"product"|"expense"|null>(null); const [profile,setProfile]=useState(false); const [notifications,setNotifications]=useState(false); const [toast,setToast]=useState(""); const [search,setSearch]=useState(""); const [tourMode,setTourMode]=useState<"manual"|null>(null);
 useEffect(()=>{const supabase=getSupabaseBrowserClient();if(!supabase){setAuthReady(true);return;}
   supabase.auth.getSession().then(({data})=>{setSession(data.session);setAuthReady(true);});
   const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,nextSession)=>{setSession(nextSession);setAuthReady(true);});
   return ()=>subscription.unsubscribe();
 },[]);
 useEffect(()=>{if(!authReady||!session?.user.id){setData(null);return;}setStorageUser(session.user.id);const existing=getData();if(existing&&!existing.settings.demoData){const migrated={...existing,orders:existing.orders.map(o=>({...o,items:o.items.map(i=>{if(i.costUnitSnapshot!==undefined&&i.costTotalSnapshot!==undefined)return i;const product=existing.products.find(p=>p.id===i.productId);const cost=product?calculateRealCost(product,existing.ingredients):0;return {...i,costUnitSnapshot:cost,costTotalSnapshot:cost*i.quantity}})}))};saveData(migrated);setData(migrated)}else{const empty=createEmptyData();saveData(empty);setData(empty)}},[authReady,session?.user.id]);
 useEffect(()=>{if(!data)return;saveData(data)},[data]);
 useEffect(()=>{if(!data)return;const root=document.documentElement;const theme=data.settings.theme;const dark=theme==="dark"||(theme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);root.classList.toggle("dark",dark)},[data?.settings.theme]);
 const unread=useMemo(()=>data?.notifications.filter(n=>!n.read).length||0,[data]);
 const update=(mutator:(d:AppData)=>AppData)=>setData(d=>d?mutator(d):d);
 const nav=(id:string)=>{setActive(id);setProfile(false);setMore(false);setCreate(false);setCreateIntent(null)};
 const createAction=(type:"order"|"customer"|"ingredient"|"product"|"expense")=>{setCreate(false);setCreateIntent(type);setActive(type==="order"?"orders":type==="customer"?"customers":type==="ingredient"?"ingredients":type==="product"?"products":"statistics");window.setTimeout(()=>setCreateIntent(null),0)};
 const showToast=(m:string)=>{setToast(m);window.setTimeout(()=>setToast(""),2800)};
 if(!authReady)return <div className="min-h-screen flex items-center justify-center text-sm text-[var(--muted)]">Cargando...</div>;
 if(!session)return <AuthScreen/>;
 if(!data)return <div className="min-h-screen bg-[var(--bg)] p-5 sm:p-8"><div className="mx-auto max-w-7xl space-y-6"><div className="space-y-3"><div className="h-4 w-28 animate-pulse rounded-full bg-[var(--surface)]"/><div className="h-10 w-64 animate-pulse rounded-xl bg-[var(--surface)]"/><div className="h-4 w-40 animate-pulse rounded-full bg-[var(--surface)]"/></div><div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="space-y-3"><div className="h-5 w-28 animate-pulse rounded bg-[var(--bg)]"/><div className="h-14 w-full animate-pulse rounded-xl bg-[var(--bg)]"/><div className="h-14 w-full animate-pulse rounded-xl bg-[var(--bg)]"/></div></div></div></div>;
 const result=search.trim()?searchResults(data,search):[];
 return <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
   <Sidebar active={active} onNavigate={nav}/>
   <div className="md:pl-64">
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/92 backdrop-blur-xl"><div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8"><div className="md:hidden"><Brand compact/></div><div className="relative ml-auto hidden w-full max-w-md sm:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={17}/><input aria-label="Buscar" value={search} onChange={e=>setSearch(e.target.value)} placeholder="¿Qué estás buscando?" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-9 pr-3 text-sm outline-none focus:border-[var(--primary)]"/>{search&&<div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">{result.length?result.map((r:any)=><button key={r.id} onClick={()=>{nav(r.section);setSearch("")}} className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-[var(--bg)]"><div><div className="text-[10px] uppercase text-[var(--muted)]">{r.type}</div><div className="text-sm font-semibold">{r.name}</div></div><span className="text-xs text-[var(--muted)]">Ir</span></button>):<div className="p-3 text-sm text-[var(--muted)]">No encontramos resultados.</div>}</div>}</div><div className="ml-auto flex items-center gap-1"><button aria-label="Notificaciones" onClick={()=>setNotifications(true)} className="relative rounded-[12px] p-2.5 transition hover:bg-[var(--surface)]"><Bell size={20}/>{unread>0&&<span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[9px] font-bold text-white">{unread}</span>}</button><button aria-label="Cerrar sesión" title="Cerrar sesión" onClick={async()=>{await getSupabaseBrowserClient()?.auth.signOut();setStorageUser(null);setData(null)}} className="rounded-[12px] p-2.5 text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--danger)]"><LogOut size={18}/></button><button data-tour="settings" aria-label="Mi perfil" onClick={()=>setProfile(true)} className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[13px] border border-[var(--border)] bg-[var(--accent)] text-sm font-bold text-white">{data.userProfile.avatar?<img src={data.userProfile.avatar} alt="" className="h-full w-full object-cover"/>:(data.userProfile.name||data.businessProfile.businessName||"R")[0].toUpperCase()}</button></div></div></header>
    <main className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 lg:px-8 md:pb-8">{active==="home"&&<Dashboard data={data} onNavigate={nav} onAttention={()=>setNotifications(true)} onQuickAction={createAction}/>} {active==="orders"&&<Orders data={data} update={update} onToast={showToast} createIntent={createIntent}/>} {active==="customers"&&<Customers data={data} update={update} onToast={showToast} createIntent={createIntent}/>} {active==="products"&&<Products data={data} update={update} onToast={showToast} createIntent={createIntent}/>} {active==="ingredients"&&<Ingredients data={data} update={update} onToast={showToast} createIntent={createIntent}/>} {active==="inventory"&&<Inventory data={data} update={update} onToast={showToast}/>} {active==="statistics"&&<Statistics data={data} update={update} onToast={showToast} onBack={()=>nav("home")} createIntent={createIntent}/>} {active==="help"&&<Help onStartTour={()=>setTourMode("manual")}/>} </main>
   </div>
   <BottomNav active={active} onNavigate={nav} onCreate={()=>setCreate(true)} onMore={()=>setMore(true)}/>
   {create&&<CreateMenu onClose={()=>setCreate(false)} onCreate={createAction}/>} {more&&<MoreMenu onClose={()=>setMore(false)} onNavigate={nav}/>} {profile&&<div className="fixed inset-0 z-50 overflow-auto bg-[var(--bg)]"><div className="mx-auto min-h-screen max-w-3xl p-4 sm:p-8"><div className="mb-5 flex justify-end"><Button variant="ghost" onClick={()=>setProfile(false)}>Cerrar</Button></div><Profile data={data} update={update} onToast={showToast} onTheme={(theme:Settings["theme"])=>update(d=>({...d,settings:{...d.settings,theme}}))}/></div></div>} {notifications&&<Notifications data={data} update={update} onClose={()=>setNotifications(false)}/>} {toast&&<Toast message={toast} onClose={()=>setToast("")}/>} {tourMode&&<Tour mode={tourMode} onComplete={()=>setTourMode(null)}/> }
 </div>
}
function searchResults(data:AppData,q:string){const l=q.toLowerCase();return [...data.customers.map(x=>({id:x.id,name:x.name,type:"Clientes",section:"customers"})),...data.orders.map(x=>({id:x.id,name:x.items[0]?.productName||"Pedido",type:"Pedidos",section:"orders"})),...data.products.map(x=>({id:x.id,name:x.name,type:"Productos",section:"products"})),...data.ingredients.map(x=>({id:x.id,name:x.name,type:"Insumos",section:"ingredients"}))].filter(x=>x.name.toLowerCase().includes(l)).slice(0,8)}
