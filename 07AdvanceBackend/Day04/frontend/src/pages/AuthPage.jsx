import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { ArrowRight, Image, LockKeyhole, Mail, UserRound, Video } from "lucide-react";
import Brand from "../components/Brand.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

export default function AuthPage({ mode }) {
    const signup = mode === "signup";
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const login = useAuthStore((state) => state.login);
    const createAccount = useAuthStore((state) => state.signup);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    if (loading) return <div className="grid min-h-screen place-items-center bg-[#080808] text-neutral-500">Checking session…</div>;
    if (user) return <Navigate to="/" replace />;

    function change(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function submit(event) {
        event.preventDefault();
        setError("");
        setBusy(true);
        try {
            if (signup) await createAccount(form);
            else await login({ email: form.email, password: form.password });
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Unable to connect. Check if the backend is running.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#080808] text-white lg:grid lg:grid-cols-2">
            <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-16">
                <Brand />
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">A space for everything you create</p>
                    <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{signup ? "Create your space." : "Welcome back."}</h1>
                    <p className="mt-4 text-sm leading-6 text-neutral-400">{signup ? "One place to upload, organize, and revisit your media." : "Sign in to pick up where your creativity left off."}</p>

                    <form onSubmit={submit} className="mt-10 space-y-5">
                        {signup && <Field icon={UserRound} label="Full name"><input name="name" value={form.name} onChange={change} required minLength={2} maxLength={80} placeholder="Your name" className="w-full bg-transparent text-white outline-none placeholder:text-neutral-600" /></Field>}
                        <Field icon={Mail} label="Email address"><input name="email" value={form.email} onChange={change} required type="email" autoComplete="email" placeholder="you@example.com" className="w-full bg-transparent text-white outline-none placeholder:text-neutral-600" /></Field>
                        <Field icon={LockKeyhole} label="Password"><input name="password" value={form.password} onChange={change} required minLength={signup ? 8 : 1} type="password" autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "At least 8 characters" : "Enter your password"} className="w-full bg-transparent text-white outline-none placeholder:text-neutral-600" /></Field>
                        {error && <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
                        <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-50">{busy ? "Please wait…" : signup ? "Create account" : "Sign in"}<ArrowRight size={18} /></button>
                    </form>

                    <p className="mt-7 text-center text-sm text-neutral-500">{signup ? "Already have an account?" : "New to the studio?"} <Link className="font-medium text-white hover:underline" to={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create account"}</Link></p>
                </div>
                <p className="text-xs text-neutral-600">Cloudinary Studio © 2026</p>
            </section>

            <aside className="relative hidden overflow-hidden border-l border-white/10 bg-[#111111] p-12 lg:flex lg:flex-col lg:justify-center">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#555 0.6px, transparent 0.6px)", backgroundSize: "18px 18px" }} />
                <div className="relative mx-auto w-full max-w-lg">
                    <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs text-neutral-400"><span className="size-1.5 rounded-full bg-white" /> YOUR PERSONAL MEDIA LIBRARY</div>
                    <div className="relative h-80">
                        <div className="absolute left-8 top-3 flex h-64 w-60 rotate-[-9deg] flex-col justify-end rounded-3xl border border-white/15 bg-[#262626] p-6 shadow-2xl"><Image size={30} className="mb-auto text-neutral-500" /><span className="text-lg font-semibold">Your images.</span><span className="text-xs text-neutral-500">All in one place</span></div>
                        <div className="absolute left-36 top-8 flex h-64 w-60 rotate-[7deg] flex-col justify-end rounded-3xl border border-white/20 bg-[#393939] p-6 shadow-2xl"><Video size={30} className="mb-auto text-neutral-400" /><span className="text-lg font-semibold">Your videos.</span><span className="text-xs text-neutral-400">Ready to watch</span></div>
                    </div>
                    <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.05em]">Make it. Name it.<br /><span className="text-neutral-500">Keep it close.</span></h2>
                    <p className="mt-5 max-w-md text-sm leading-7 text-neutral-400">A clean home for the images and videos that matter to you.</p>
                </div>
            </aside>
        </main>
    );
}

function Field({ icon: Icon, label, children }) {
    return <label className="block"><span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">{label}</span><span className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#171717] px-4 py-3.5 text-neutral-500 focus-within:border-white/50"><Icon size={18} />{children}</span></label>;
}
