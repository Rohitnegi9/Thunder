import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

export default function ChatSidebar({ chatId, refreshChats, onChatsChanged, busy, onBusyChange }) {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const removeChat = useChatStore((state) => state.removeChat);

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Get chat titles only. Messages are fetched by ChatRoom when opened.
  useEffect(() => {
    let active = true;

    async function loadChats() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/chat/getRecentChat");
        if (active) setChats(response.data.chats);
      } catch (error) {
        if (!active) return;
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          setError("Could not load recent chats.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadChats();
    return () => {
      active = false;
    };
  }, [refreshChats, setUser]);

  async function handleDeleteChat(id) {
    if (busy || !window.confirm("Delete this chat and all its messages?")) return;

    setDeletingId(id);
    onBusyChange(true);
    setError("");

    try {
      await api.delete(`/chat/${id}`);
      removeChat(id);
      setChats((current) => current.filter((chat) => chat._id !== id));
      onChatsChanged(); // Refill the list if another chat is now in the latest 20.
      if (chatId === id) navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        setError(error.response?.data?.message || "Could not delete chat.");
      }
    } finally {
      setDeletingId(null);
      onBusyChange(false);
    }
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#2f2f2f] bg-[#171717] p-3 text-[#ececec] md:h-full md:w-64 md:border-r md:border-b-0">
      <Link
        to="/"
        onClick={(event) => { if (busy) event.preventDefault(); }}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-[#2a2a2a]"
      >
        <span aria-hidden="true" className="text-xl leading-none">＋</span>
        New chat
      </Link>

      <h2 className="mt-7 mb-2 px-3 text-xs font-medium text-[#a8a8a8]">Recent chats</h2>
      {loading && <p className="px-3 text-sm text-[#a8a8a8]">Loading chats...</p>}
      {error && <p role="alert" className="px-3 text-sm text-[#f87171]">{error}</p>}
      {!loading && !error && chats.length === 0 && (
        <p className="px-3 text-sm text-[#a8a8a8]">No chats yet.</p>
      )}

      <nav aria-label="Recent chats" className="max-h-44 space-y-1 overflow-y-auto md:max-h-none md:flex-1">
        {chats.map((chat) => (
          <div key={chat._id} className="group flex items-center gap-1">
            <Link
              to={`/chat/${chat._id}`}
              onClick={(event) => { if (busy) event.preventDefault(); }}
              aria-current={chatId === chat._id ? "page" : undefined}
              className={`min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-sm ${
                chatId === chat._id ? "bg-[#2a2a2a]" : "hover:bg-[#252525]"
              }`}
            >
              {chat.topic}
            </Link>
            <button
              type="button"
              onClick={() => handleDeleteChat(chat._id)}
              disabled={Boolean(deletingId) || busy}
              aria-label={`Delete chat ${chat.topic}`}
              title="Delete chat"
              className="rounded-lg p-2 text-[#a8a8a8] hover:bg-[#2a2a2a] hover:text-[#f87171] disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />
              </svg>
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
}
