import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const MODEL = "openai/gpt-4.1-mini";

// The server has already finished the answer. Reveal its text in small pieces.
function revealReply(text, onChange) {
  const characters = Array.from(text);
  const charactersPerStep = Math.max(1, Math.ceil(characters.length / 240));

  return new Promise((resolve) => {
    if (characters.length === 0) {
      resolve();
      return;
    }

    let shown = 0;
    const timer = setInterval(() => {
      shown = Math.min(shown + charactersPerStep, characters.length);
      onChange(characters.slice(0, shown).join(""));

      if (shown === characters.length) {
        clearInterval(timer);
        resolve();
      }
    }, 25);
  });
}

export default function ChatRoom({ chatId, onChatsChanged, onBusyChange, onUsageChange }) {
  const navigate = useNavigate();
  const conversationRef = useRef(null);
  const setUser = useAuthStore((state) => state.setUser);
  const messages = useChatStore((state) => state.messagesByChatId[chatId]);
  const setChatMessages = useChatStore((state) => state.setChatMessages);

  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const [visibleReply, setVisibleReply] = useState(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      const conversation = conversationRef.current;
      if (conversation) conversation.scrollTop = conversation.scrollHeight;
    });
  }

  // Load only the opened chat. Zustand keeps it while this app stays open.
  useEffect(() => {
    if (!chatId || messages !== undefined) return;
    let active = true;

    async function loadMessages() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/msg/${chatId}`);
        if (active) {
          setChatMessages(chatId, response.data.msg);
          scrollToBottom();
        }
      } catch (error) {
        if (!active) return;
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          setError("Could not load this chat. Please refresh.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMessages();
    return () => {
      active = false;
    };
  }, [chatId, messages, setChatMessages, setUser]);

  async function handleSend(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || sending || deletingId || (chatId && messages === undefined)) return;

    setSending(true);
    onBusyChange(true);
    setError("");
    setPendingQuestion(content);
    setVisibleReply(null);
    setDraft("");
    scrollToBottom();

    try {
      const url = chatId ? `/msg/${chatId}` : "/msg";
      const body = chatId ? { content } : { content, model: MODEL };
      const response = await api.post(url, body);
      const savedChatId = response.data.chatId;

      onUsageChange({
        tokenUsed: response.data.tokenUsed,
        tokenLimit: response.data.tokenLimit,
      });
      setVisibleReply("");
      await revealReply(response.data.assistantMessage.content, (text) => {
        setVisibleReply(text);
        scrollToBottom();
      });

      setChatMessages(savedChatId, [
        ...(messages || []),
        response.data.userMessage,
        response.data.assistantMessage,
      ]);
      setPendingQuestion(null);
      setVisibleReply(null);
      onChatsChanged();

      if (!chatId) navigate(`/chat/${savedChatId}`);
    } catch (error) {
      setPendingQuestion(null);
      setVisibleReply(null);
      setDraft(content);
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        setError(error.response?.data?.message || "Message could not be sent. Try again.");
      }
    } finally {
      setSending(false);
      onBusyChange(false);
    }
  }

  async function handleDeleteMessage(messageId) {
    if (!chatId || !messages || sending || !window.confirm("Delete this message?")) return;

    setDeletingId(messageId);
    onBusyChange(true);
    setError("");

    try {
      await api.delete(`/msg/${chatId}/${messageId}`);
      setChatMessages(chatId, messages.filter((message) => message._id !== messageId));
      onChatsChanged();
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        setError(error.response?.data?.message || "Could not delete message.");
      }
    } finally {
      setDeletingId(null);
      onBusyChange(false);
    }
  }

  return (
    <>
      <section ref={conversationRef} className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-5 overflow-y-auto px-4 py-8 sm:px-6" aria-label="Conversation">
        {!chatId && !pendingQuestion && (
          <div className="flex flex-1 items-center justify-center">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-[#f4f4f4]">
              What can I help with?
            </h2>
          </div>
        )}
        {loading && <p className="text-sm text-[#a8a8a8]">Loading messages...</p>}

        {chatId && messages?.map((message) => (
          <div
            key={message._id}
            className={`group whitespace-pre-wrap ${
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-3xl bg-[#303030] px-4 py-3"
                : "w-full py-2"
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-4">
              <p className="text-xs font-medium text-[#b4b4b4]">
                {message.role === "user" ? "You" : "Assistant"}
              </p>
              <button
                type="button"
                onClick={() => handleDeleteMessage(message._id)}
                disabled={sending || Boolean(deletingId)}
                aria-label={`Delete ${message.role} message`}
                title="Delete message"
                className="rounded p-1.5 text-[#a8a8a8] hover:bg-[#383838] hover:text-[#f87171] disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />
                </svg>
              </button>
            </div>
            <p className="leading-7 text-[#ececec]">{message.content}</p>
            {message.role === "assistant" && message.usage?.totalTokens > 0 && (
              <p className="mt-2 text-xs text-[#8e8e8e]">
                {message.usage.totalTokens} tokens used
              </p>
            )}
          </div>
        ))}

        {pendingQuestion && (
          <div className="ml-auto max-w-[85%] rounded-3xl bg-[#303030] px-4 py-3 whitespace-pre-wrap">
            <p className="mb-1 text-xs font-medium text-[#b4b4b4]">You</p>
            <p className="leading-7 text-[#ececec]">{pendingQuestion}</p>
          </div>
        )}

        {pendingQuestion && visibleReply === null && (
          <p role="status" className="text-sm text-[#a8a8a8]">Thinking...</p>
        )}

        {visibleReply !== null && (
          <div className="w-full py-2 whitespace-pre-wrap">
            <p className="mb-1 text-xs font-medium text-[#b4b4b4]">Assistant</p>
            <p className="leading-7 text-[#ececec]">
              {visibleReply}<span className="animate-pulse text-[#a8a8a8]">▍</span>
            </p>
          </div>
        )}

        {error && <p role="alert" className="text-sm text-[#f87171]">{error}</p>}
      </section>

      <form onSubmit={handleSend} className="mx-auto mb-4 flex w-[calc(100%-2rem)] max-w-3xl items-end gap-2 rounded-[28px] border border-[#454545] bg-[#303030] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
        <label htmlFor="message" className="sr-only">Your message</label>
        <textarea
          id="message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message the assistant..."
          rows={2}
          disabled={sending || Boolean(deletingId) || (chatId && messages === undefined)}
          className="max-h-48 min-h-12 flex-1 resize-none bg-transparent px-3 py-2.5 text-[#ececec] placeholder:text-[#a8a8a8] focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!draft.trim() || sending || Boolean(deletingId) || (chatId && messages === undefined)}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#212121] disabled:bg-[#686868] disabled:text-[#303030]"
        >
          ↑
        </button>
      </form>
    </>
  );
}
