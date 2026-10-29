import { Aperture } from "lucide-react";

export default function Brand() {
    return (
        <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-white text-black"><Aperture size={21} strokeWidth={2.1} /></div>
            <div>
                <div className="text-sm font-semibold tracking-tight text-white">Cloudinary Studio</div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.19em] text-neutral-500">Your media space</div>
            </div>
        </div>
    );
}
