'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, RotateCcw } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */
type From = 'bot' | 'user';
interface Message {
  id: number;
  from: From;
  text: string;
}

type Step = 1 | 2 | 3 | 4;

/* ─── Typing Indicator ───────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      {/* Bot avatar */}
      <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-accent">
        VL
      </div>
      <div className="flex items-center gap-1 bg-card border border-border px-4 py-3 rounded-[18px] rounded-tl-[4px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
            style={{
              animation: `chatDotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Message Bubble ─────────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
  const isBot = msg.from === 'bot';
  return (
    <div
      className={`flex items-end gap-2 mb-3 ${isBot ? '' : 'flex-row-reverse'}`}
      style={{ animation: 'chatMsgIn 150ms ease-out both' }}
    >
      {/* Avatar */}
      {isBot ? (
        <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-accent">
          VL
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-accent-foreground">
          You
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[75%] ${isBot ? '' : 'items-end flex flex-col'}`}>
        <p
          className={`text-[10px] font-semibold mb-1 ${
            isBot ? 'text-muted-foreground ml-1' : 'text-accent/80 mr-1'
          }`}
        >
          {isBot ? 'Portfolio Bot' : 'You'}
        </p>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isBot
              ? 'bg-card border border-border text-foreground rounded-[18px] rounded-tl-[4px]'
              : 'bg-accent text-accent-foreground rounded-[18px] rounded-tr-[4px]'
          }`}
        >
          {msg.text}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ChatContactForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>(1);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const msgIdRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const hasInitialized = useRef(false);

  const nextId = () => ++msgIdRef.current;

  /* Auto-scroll to bottom */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, []);

  useEffect(() => {
    // Only auto-scroll inside the chat card after a user has interacted.
    // Skipping on first render prevents the page from jumping to Contact on load.
    const hasUserMsg = messages.some((m) => m.from === 'user');
    if (!hasInitialized.current || !hasUserMsg) return;
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* Focus input when step changes or typing ends */
  useEffect(() => {
    if (!isTyping && !isDone) {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
    }
  }, [isTyping, step, isDone]);

  /* ── Push a bot message with typing delay ── */
  const pushBot = useCallback(
    (text: string, delay: number): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, { id: nextId(), from: 'bot', text }]);
            resolve();
          }, 600);
        }, delay);
      });
    },
    []
  );

  /* ── Push a user message immediately ── */
  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), from: 'user', text }]);
  }, []);

  /* ── Send email via /api/contact ── */
  const sendEmail = useCallback(
    async (name: string, email: string, message: string) => {
      setIsSending(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Something went wrong');

        setIsSending(false);
        setIsSuccess(true);
        await pushBot(
          "Perfect! I'll pass this along.\nExpect a reply within 24\u201348 hours. \uD83D\uDE80",
          200
        );
        await pushBot(`Thanks for reaching out, ${name}. Have a great day!`, 400);
        setIsDone(true);
        setStep(4);
      } catch (err: unknown) {
        setIsSending(false);
        const msg = err instanceof Error ? err.message : 'Something went wrong';
        setError(msg);
        await pushBot(
          // UPDATE THIS — replace email with your actual address
          `Hmm, something went wrong \u2014 ${msg}.\nWant to try again or email me directly at vasanthloganthan5657@gmail.com?`,
          200
        );
      }
    },
    [pushBot]
  );

  /* ── Try Again: clear error and re-show step 3 input ── */
  const handleTryAgain = useCallback(() => {
    setError(null);
    setInputValue('');
  }, []);

  /* ── Initial greeting ── */
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const init = async () => {
      await pushBot("Hey there! 👋 I'm glad you made it this far.", 300);
      await pushBot("Let's get connected. First — what's your name?", 800);
    };
    init();
  }, [pushBot]);

  /* ── Validate email ── */
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  /* ── Submit handler ── */
  const handleSend = useCallback(async () => {
    const val = inputValue.trim();
    if (!val || isTyping) return;

    setInputValue('');

    if (step === 1) {
      pushUser(val);
      setFormData((prev) => ({ ...prev, name: val }));
      await pushBot(`Nice to meet you, ${val}! 😊`, 200);
      await pushBot(
        "What's your email address? I'll make sure it reaches the right inbox.",
        400
      );
      setStep(2);
    } else if (step === 2) {
      if (!isValidEmail(val)) {
        pushUser(val);
        await pushBot(
          "Hmm, that doesn't look like a valid email. Mind double-checking? 🤔",
          200
        );
        return;
      }
      pushUser(val);
      setFormData((prev) => ({ ...prev, email: val }));
      await pushBot('Got it! Last one — what\'s on your mind?\nFeel free to share as much or as little as you\'d like.', 200);
      setStep(3);
    } else if (step === 3) {
      pushUser(val);
      const currentMsg = val;
      setFormData((prev) => ({ ...prev, message: val }));
      const name = formData.name;
      const email = formData.email;
      // sendEmail manages its own async state — no await needed here
      sendEmail(name, email, currentMsg);
    }
  }, [inputValue, isTyping, step, formData, pushBot, pushUser, sendEmail]);

  /* ── Reset ── */
  const handleReset = useCallback(() => {
    msgIdRef.current = 0;
    setMessages([]);
    setStep(1);
    setInputValue('');
    setIsTyping(false);
    setIsDone(false);
    setIsSuccess(false);
    setError(null);
    setIsSending(false);
    setFormData({ name: '', email: '', message: '' });
    hasInitialized.current = false;

    // Re-trigger init after state flush
    setTimeout(async () => {
      hasInitialized.current = true;
      const pushBotLocal = (text: string, delay: number): Promise<void> =>
        new Promise((resolve) => {
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [
                ...prev,
                { id: ++msgIdRef.current, from: 'bot', text },
              ]);
              resolve();
            }, 600);
          }, delay);
        });
      await pushBotLocal("Hey there! 👋 I'm glad you made it this far.", 300);
      await pushBotLocal("Let's get connected. First — what's your name?", 800);
    }, 50);
  }, []);

  /* ── Key handler ── */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (step === 3) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    } else {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const placeholders: Record<Step, string> = {
    1: 'Type your name...',
    2: 'Type your email...',
    3: 'Type your message...',
    4: '',
  };

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes chatMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatDotBounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
        @keyframes chatPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col" style={{ height: '420px' }}>

        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
            VL
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none mb-1">Portfolio Bot</p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                style={{ animation: 'chatPulse 2s ease-in-out infinite' }}
              />
              <span className="text-[11px] text-green-400 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-0"
          aria-live="polite"
          aria-label="Chat conversation"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {(isTyping || isSending) && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Area ── */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-border bg-card/60 backdrop-blur-sm">
          {isDone ? (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
          ) : error ? (
            /* Error state — two action buttons */
            <div className="flex gap-2">
              <button
                onClick={handleTryAgain}
                className="flex-1 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors text-sm font-medium"
              >
                Try Again
              </button>
              {/* UPDATE THIS — replace email with your actual address */}
              <a
                href="mailto:vasanthloganthan5657@gmail.com"
                className="flex-1 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors text-sm font-medium text-center"
              >
                Email Directly
              </a>
            </div>
          ) : (
            <div className="flex items-end gap-2">
              {step === 3 ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  rows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholders[step]}
                  disabled={isTyping || isSending}
                  className="flex-1 resize-none px-3 py-2.5 text-sm rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors disabled:opacity-40"
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={step === 2 ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholders[step]}
                  disabled={isTyping || isSending}
                  className="flex-1 px-3 py-2.5 text-sm rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors disabled:opacity-40"
                />
              )}
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || isSending}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground flex-shrink-0 hover:bg-accent/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
