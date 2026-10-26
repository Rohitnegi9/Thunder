import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import { ArrowRight, LockKeyhole, Mail, UserRound, ImagePlus, Video } from 'lucide-react';
import Brand from '../components/Brand.jsx';
import { useAuthStore } from '../store/useAuthStore.js';

export default function AuthPage({ mode }) {
  const signup = mode === 'signup';
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const loginAction = useAuthStore((s) => s.login);
  const signupAction = useAuthStore((s) => s.signup);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Checking session…</div>;
  if (user) return <Navigate to="/" replace />;
  const change = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      if (signup) await signupAction(form);
      else await loginAction({ email: form.email, password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect. Check if the backend is running.');
    } finally { setBusy(false); }
  };

  return <main className="min-h-screen lg:grid lg:grid-cols-2">
    <section className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-20">
      <Brand />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
        <div className="mb-3 inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">STUDENT STARTER PROJECT</div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">{signup ? 'Create your account' : 'Welcome back'}</h1>
        <p className="mt-3 text-slate-500">{signup ? 'Sign up to start building your media upload application.' : 'Sign in to continue to your workspace.'}</p>
        <form onSubmit={submit} className="mt-9 space-y-5">
          {signup && <Field icon={UserRound} label="Full name"><input name="name" value={form.name} onChange={change} required minLength={2} maxLength={80} placeholder="Your name" className="w-full bg-transparent outline-none"/></Field>}
          <Field icon={Mail} label="Email address"><input name="email" value={form.email} onChange={change} required type="email" autoComplete="email" placeholder="you@example.com" className="w-full bg-transparent outline-none"/></Field>
          <Field icon={LockKeyhole} label="Password"><input name="password" value={form.password} onChange={change} required minLength={signup ? 8 : 1} type="password" autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'At least 8 characters' : 'Enter your password'} className="w-full bg-transparent outline-none"/></Field>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-60">{busy ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}<ArrowRight size={18}/></button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">{signup ? 'Already have an account?' : 'New to the project?'} <Link className="font-semibold text-indigo-600 hover:underline" to={signup ? '/login' : '/signup'}>{signup ? 'Sign in' : 'Create account'}</Link></p>
      </div>
      <p className="text-xs text-slate-400">Built for learning • React + Express + MongoDB</p>
    </section>
    <aside className="relative hidden overflow-hidden bg-[#17224b] p-14 text-white lg:flex lg:flex-col lg:justify-center">
      <div className="absolute -right-32 -top-24 size-[450px] rounded-full bg-indigo-500/25 blur-3xl"/><div className="absolute -bottom-44 -left-32 size-[450px] rounded-full bg-cyan-500/15 blur-3xl"/>
      <div className="relative mx-auto w-full max-w-lg"><div className="mb-10 flex items-center gap-3 text-sm font-medium text-indigo-200"><span className="h-px w-12 bg-indigo-400"/>YOUR NEXT PROJECT</div><h2 className="text-5xl font-bold leading-tight tracking-tight">Build something <span className="text-indigo-300">real.</span></h2><p className="mt-6 max-w-md text-lg leading-8 text-slate-300">Your authentication is ready. Next, you’ll learn to upload, manage and stream images and videos with Cloudinary.</p><div className="mt-12 grid grid-cols-2 gap-4"><Feature icon={ImagePlus} title="Image upload" desc="Coming in class"/><Feature icon={Video} title="Video upload" desc="Coming in class"/></div></div>
    </aside>
  </main>;
}
function Field({ icon: Icon, label, children }) { return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">{label}</span><span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-400 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"><Icon size={18}/>{children}</span></label>; }
function Feature({icon: Icon,title,desc}) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"><Icon className="mb-7 text-indigo-200" size={29}/><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-slate-300">{desc}</p></div>; }
