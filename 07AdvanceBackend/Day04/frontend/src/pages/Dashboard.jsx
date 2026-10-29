import { useEffect, useState } from "react";
import { ArrowUpRight, Image, LogOut, RefreshCw, Video } from "lucide-react";
import Brand from "../components/Brand.jsx";
import UploadMedia from "../components/UploadMedia.jsx";
import api from "../lib/api.js";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [media, setMedia] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadMedia() {
        try {
            const response = await api.get("/uploads/media");
            setMedia(response.data.media);
            setError("");
        } catch {
            setError("Could not load your library. Try refreshing it.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMedia();
        const timer = setInterval(loadMedia, 10000);
        return () => clearInterval(timer);
    }, []);

    function handleUploaded() {
        // Cloudinary sends the webhook after the upload response.
        // The next refresh will show the completed file.
        setTimeout(loadMedia, 3000);
    }

    async function handleLogout() {
        try {
            await logout();
        } catch {
            setError("Could not log out. Please try again.");
        }
    }

    const videos = media.filter((item) => item.resourceType === "video").length;
    const images = media.length - videos;
    const visibleMedia = filter === "all" ? media : media.filter((item) => item.resourceType === filter);

    return (
        <div className="min-h-screen bg-[#080808] text-white">
            <header className="border-b border-white/10">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
                    <Brand />
                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm text-neutral-500 sm:inline">{user?.name}</span>
                        <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-neutral-300 transition hover:border-white/40 hover:text-white"><LogOut size={15} /> Log out</button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
                <div className="mb-12 flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Your creative workspace / 2026</p>
                        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Everything you create, <span className="text-neutral-500">in one place.</span></h1>
                        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">Upload your images and videos, give them a name, and come back to watch or view them whenever you like.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <Stat number={media.length} label="Total files" />
                        <Stat number={videos} label="Videos" />
                        <Stat number={images} label="Images" />
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
                    <UploadMedia onUploaded={handleUploaded} />

                    <section aria-labelledby="library-heading" className="min-w-0">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">02 / Your collection</p>
                                <h2 id="library-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Media library</h2>
                            </div>
                            <button onClick={loadMedia} className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/40 hover:text-white"><RefreshCw size={14} /> Refresh</button>
                        </div>

                        <div className="mb-5 flex gap-2 border-b border-white/10 pb-4">
                            <FilterButton value="all" label="All files" filter={filter} setFilter={setFilter} />
                            <FilterButton value="video" label="Videos" filter={filter} setFilter={setFilter} />
                            <FilterButton value="image" label="Images" filter={filter} setFilter={setFilter} />
                        </div>

                        {error && <p role="alert" className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">{error}</p>}
                        {loading ? <p className="py-14 text-center text-sm text-neutral-500">Loading your media…</p> : visibleMedia.length === 0 ? (
                            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#111111] px-6 text-center">
                                <div className="mb-4 grid size-12 place-items-center rounded-full border border-white/15 text-neutral-400"><Image size={20} /></div>
                                <h3 className="font-medium">{filter === "all" ? "Your library starts here" : `No ${filter === "video" ? "videos" : "images"} yet`}</h3>
                                <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">Upload a file to see it here. New uploads may take a few seconds to appear.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {visibleMedia.map((item) => <MediaCard key={item._id} item={item} />)}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

function Stat({ number, label }) {
    return <div className="min-w-24 rounded-2xl border border-white/10 bg-[#111111] p-4 sm:min-w-28"><div className="text-2xl font-semibold tracking-tight">{number}</div><div className="mt-1 text-xs text-neutral-500">{label}</div></div>;
}

function FilterButton({ value, label, filter, setFilter }) {
    return <button onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-xs font-medium transition ${filter === value ? "bg-white text-black" : "bg-[#1a1a1a] text-neutral-400 hover:text-white"}`}>{label}</button>;
}

function MediaCard({ item }) {
    const isVideo = item.resourceType === "video";
    const date = new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

    return (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
            <div className="aspect-video overflow-hidden bg-[#222222]">
                {isVideo ? (
                    <video src={item.secureUrl} controls preload="metadata" playsInline className="h-full w-full object-contain" aria-label={item.title || "Uploaded video"} />
                ) : (
                    <a href={item.secureUrl} target="_blank" rel="noreferrer" aria-label={`View ${item.title || "uploaded image"}`}><img src={item.secureUrl} alt={item.title || "Uploaded image"} loading="lazy" className="h-full w-full object-cover transition duration-300 hover:scale-105" /></a>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-white" title={item.title || "Untitled media"}>{item.title || "Untitled media"}</h3>
                    {!isVideo && <a href={item.secureUrl} target="_blank" rel="noreferrer" aria-label="Open image" className="text-neutral-500 hover:text-white"><ArrowUpRight size={16} /></a>}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">{isVideo ? <Video size={13} /> : <Image size={13} />}{isVideo ? "Video" : "Image"}</span>
                    <span>{item.folder}</span>
                    <span>{date}</span>
                </div>
            </div>
        </article>
    );
}
