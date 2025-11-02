import { useEffect, useMemo, useRef, useState } from "react";
import "./Chat.css";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("");
    const [text, setText] = useState("");
    const wsRef = useRef(null);
    const endRef = useRef(null);

    const wsUrl = useMemo(() => {
        const base = window.location.origin.replace(/^http/, "ws");
        // ws://localhost....
        return `${base}/ws`;
    }, []);

    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                setMessages((prev) => [...prev, data]);
            } catch { }
        };

        return () => ws.close();
    }, [wsUrl]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function sendMessage(e) {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        wsRef.current.send(
            JSON.stringify({
                type: "chat",
                user: user || "Anonymous",
                text: trimmed,
            })
        );
        setText("");
    }

    const isMine = (m) => m.type === "chat" && user && m.user === user;

    return (
        <div className="chat">
            <div className="card">
                <header className="header">
                    <span className="logo" aria-hidden>💬</span>
                    <h1 className="title">Simple Chat</h1>
                </header>

                <div className="name-row">
                    <input
                        className="input name-input"
                        placeholder="Your name"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>

                <div className="messages" role="log" aria-live="polite">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={
                                m.type === "system"
                                    ? "system"
                                    : `msg ${isMine(m) ? "mine" : "theirs"}`
                            }
                        >
                            {m.type === "system" ? (
                                <div className="system-text">
                                    {m.text}{" "}
                                    {m.ts && <span className="meta">({new Date(m.ts).toLocaleTimeString()})</span>}
                                </div>
                            ) : (
                                <>
                                    {!isMine(m) && <div className="avatar">{m.user?.[0]?.toUpperCase() || "A"}</div>}
                                    <div className="bubble">
                                        <div className="bubble-head">
                                            <b className="user">{m.user}</b>
                                        </div>
                                        <div className="bubble-body">{m.text}</div>
                                        <div className="meta">{new Date(m.ts).toLocaleTimeString()}</div>
                                    </div>
                                    {isMine(m) && <div className="avatar mine-avatar">{m.user?.[0]?.toUpperCase() || "A"}</div>}
                                </>
                            )}
                        </div>
                    ))}
                    <div ref={endRef} />
                </div>

                <form className="composer" onSubmit={sendMessage}>
                    <input
                        className="input msg-input"
                        placeholder="Type a message…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="btn" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}
