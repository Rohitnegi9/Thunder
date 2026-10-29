import { useState } from "react";
import { ArrowUpRight, Check, CloudUpload, FileImage, Film } from "lucide-react";
import { uploadImage, uploadVideo } from "../lib/cloudinaryUpload";

export default function UploadMedia({ onUploaded }) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [folder, setFolder] = useState("Arrays");
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function chooseFile(selectedFile) {
        setFile(selectedFile || null);
        setTitle(selectedFile ? selectedFile.name.replace(/\.[^.]+$/, "").slice(0, 80) : "");
        setProgress(0);
        setSuccess(false);
        setError("");
    }

    async function handleUpload(event) {
        event.preventDefault();
        if (!file || !title.trim()) return;

        setUploading(true);
        setSuccess(false);
        setError("");
        setProgress(0);

        try {
            if (file.type.startsWith("video/")) {
                await uploadVideo(file, folder, title.trim(), setProgress);
            } else if (file.type.startsWith("image/")) {
                await uploadImage(file, folder, title.trim(), setProgress);
            } else {
                throw new Error("Choose an image or video file.");
            }

            setSuccess(true);
            setProgress(100);
            onUploaded?.();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error?.message || err.message || "Upload failed.");
        } finally {
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleUpload} className="rounded-3xl border border-white/10 bg-[#111111] p-5 sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">01 / Add to your studio</p>
                    <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Upload something new</h2>
                    <p className="mt-2 text-sm text-neutral-500">Your files are saved to Cloudinary and added to your library.</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-white"><CloudUpload size={19} /></span>
            </div>

            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-[#171717] px-5 text-center transition hover:border-white/50 hover:bg-[#1d1d1d]">
                <span className="mb-4 grid size-12 place-items-center rounded-full bg-white text-black">
                    {file?.type.startsWith("video/") ? <Film size={20} /> : file ? <FileImage size={20} /> : <CloudUpload size={20} />}
                </span>
                <span className="max-w-full truncate text-sm font-medium text-white">{file ? file.name : "Choose an image or video"}</span>
                <span className="mt-1 text-xs text-neutral-500">Click to browse your files</span>
                <input type="file" accept="image/*,video/*" disabled={uploading} className="sr-only" onChange={(event) => chooseFile(event.target.files[0])} />
            </label>

            <div className="mt-5 grid gap-4">
                <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">Name</span>
                    <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} required placeholder="Give this file a name" className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white/50" />
                </label>
                <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">Collection</span>
                    <select value={folder} onChange={(event) => setFolder(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-sm text-white outline-none focus:border-white/50">
                        <option value="Arrays">Arrays</option>
                        <option value="LinkedList">LinkedList</option>
                        <option value="Tree">Tree</option>
                    </select>
                </label>
            </div>

            {uploading && <div className="mt-5" aria-live="polite"><div className="mb-2 flex justify-between text-xs text-neutral-400"><span>Uploading your file</span><span>{progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} /></div></div>}
            {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
            {success && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-emerald-300"><Check size={16} /> Uploaded. It will appear in your library shortly.</p>}

            <button type="submit" disabled={!file || !title.trim() || uploading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40">
                {uploading ? "Uploading…" : "Upload media"}<ArrowUpRight size={17} />
            </button>
        </form>
    );
}
