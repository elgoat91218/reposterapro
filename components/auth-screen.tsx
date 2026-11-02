"use client";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { Brand } from "@/components/brand";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowLeft, LoaderCircle, CakeSlice } from "lucide-react";

type Mode = "login" | "register" | "forgot";
export function AuthScreen() {
  const [mode,setMode]=useState<Mode>("login");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const supabase=getSupabaseBrowserClient();
  const title=mode==="login"?"¡Qué bueno verte!":mode==="register"?"Creá tu cuenta":"Recuperá tu contraseña";
  const subtitle=mode==="login"?"Ingresá a tu espacio de trabajo.":mode==="register"?"Empezá a organizar tu negocio de repostería.":"Te enviaremos un enlace para restablecerla.";
  async function submit(e:React.FormEvent){
    e.preventDefault();setError("");setMessage("");
    if(!supabase){setError("Falta configurar Supabase. Completá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.");return;}
    setBusy(true);
    try{
      if(mode==="login"){
        const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
        if(error)throw error;
      }else if(mode==="register"){
        const {data,error}=await supabase.auth.signUp({email:email.trim(),password, options:{emailRedirectTo:typeof window!=="undefined"?`${window.location.origin}/`:undefined}});
        if(error)throw error;
        if(data.session)setMessage("¡Cuenta creada! Ya podés empezar a usar Repostera Pro.");
        else setMessage("¡Cuenta creada! Revisá tu correo y confirmá tu dirección para poder ingresar.");
      }else{
        const {error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo:typeof window!=="undefined"?`${window.location.origin}/`:undefined});
        if(error)throw error;
        setMessage("Si existe una cuenta con ese correo, recibirás un enlace para restablecer la contraseña.");
      }
    }catch(err){setError(err instanceof Error?err.message:"No pudimos completar la operación. Intentá nuevamente.");}
    finally{setBusy(false);}
  }
  return <main className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-10">
    <div className="w-full max-w-md">
      <div className="mb-7 flex justify-center"><Brand/></div>
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]"><CakeSlice size={27}/></div>
        <div className="mb-7 text-center"><h1 className="text-2xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p></div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block"><span className="mb-1.5 block text-sm font-semibold">Correo electrónico</span><span className="relative block"><Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"/><input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com" className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-10 pr-3 text-sm outline-none focus:border-[var(--primary)]"/></span></label>
          {mode!=="forgot"&&<label className="block"><span className="mb-1.5 block text-sm font-semibold">Contraseña</span><span className="relative block"><LockKeyhole size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"/><input type={showPassword?"text":"password"} required minLength={6} autoComplete={mode==="register"?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-10 pr-11 text-sm outline-none focus:border-[var(--primary)]"/><button type="button" aria-label={showPassword?"Ocultar contraseña":"Mostrar contraseña"} onClick={()=>setShowPassword(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></span></label>}
          {mode==="login"&&<div className="text-right"><button type="button" onClick={()=>{setMode("forgot");setError("");setMessage("")}} className="text-xs font-semibold text-[var(--primary)]">¿Olvidaste tu contraseña?</button></div>}
          {error&&<div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          {message&&<div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div>}
          <button disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{busy?<LoaderCircle className="animate-spin" size={18}/>:null}{mode==="login"?"Ingresar":mode==="register"?"Crear cuenta":"Enviar enlace"}</button>
        </form>
        <div className="mt-6 border-t border-[var(--border)] pt-5 text-center text-sm text-[var(--muted)]">
          {mode==="login"?<>¿Todavía no tenés cuenta? <button onClick={()=>{setMode("register");setError("");setMessage("")}} className="font-bold text-[var(--primary)]">Crear cuenta</button></>:mode==="register"?<>¿Ya tenés cuenta? <button onClick={()=>{setMode("login");setError("");setMessage("")}} className="font-bold text-[var(--primary)]">Iniciar sesión</button></>:<button onClick={()=>{setMode("login");setError("");setMessage("")}} className="inline-flex items-center gap-1 font-bold text-[var(--primary)]"><ArrowLeft size={15}/> Volver al inicio de sesión</button>}
        </div>
      </section>
      <p className="mt-5 text-center text-xs text-[var(--muted)]">Tus datos de acceso están protegidos por Supabase.</p>
    </div>
  </main>;
}
