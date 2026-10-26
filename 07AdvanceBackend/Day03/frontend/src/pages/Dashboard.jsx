import { useState } from 'react';
import { ImagePlus, Video, LogOut, ArrowUpRight, ShieldCheck, CloudUpload } from 'lucide-react';
import Brand from '../components/Brand.jsx';
import { useAuthStore } from '../store/useAuthStore.js';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [error, setError] = useState('');
  const handleLogout = async () => { try { await logout(); } catch { setError('Could not log out. Please try again.'); } };
  return <div className="min-h-screen bg-[#f7f8fc]">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8"><Brand/><button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"><LogOut size={16}/> Log out</button></div></header>
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="mb-8"><div className="mb-3 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"><ShieldCheck size={14}/> Authenticated session</div><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Hi, {user.name.split(' ')[0]} <span aria-hidden="true">👋</span></h1><p className="mt-3 text-slate-500">Your workspace is ready. We’ll implement Cloudinary uploads together in class.</p></div>
      <div className="grid gap-5 md:grid-cols-2"><Placeholder icon={ImagePlus} title="Upload images" description="We’ll add image selection, signed uploads, and previews here."/><Placeholder icon={Video} title="Upload videos" description="We’ll add video selection, upload progress, and playback here."/></div>
      <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><CloudUpload size={28}/></div><h2 className="text-lg font-bold">Your media library</h2><p className="mt-2 text-sm text-slate-500">Uploaded files will appear here after we build the Cloudinary integration.</p><p className="mt-5 text-xs font-medium uppercase tracking-widest text-indigo-500">Coming in the next lesson</p></section>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </main>
  </div>;
}
function Placeholder({icon:Icon,title,description}) { return <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-7 grid size-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={24}/></div><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900">{title}</h2><ArrowUpRight className="text-slate-300" size={20}/></div><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p><span className="mt-6 inline-block rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">Not implemented yet</span></article>; }
