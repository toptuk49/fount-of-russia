import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

type Props = { slug?: string };

export default function LikeDislike({ slug }: Props) {
  const { token } = useAuth();

  const pageSlug =
    (slug || window.location.pathname.replaceAll("/", "-") || "home").replace(
      /^-+|-+$/g,
      "",
    ) || "home";

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myVote, setMyVote] = useState<"like" | "dislike" | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/likes/${pageSlug}/`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    )
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.likes === "number") setLikes(data.likes);
        if (typeof data.dislikes === "number") setDislikes(data.dislikes);
        if (data.my_vote === "like" || data.my_vote === "dislike")
          setMyVote(data.my_vote);
        else setMyVote(null);
      })
      .catch(() => {});
  }, [pageSlug, token]);

  useEffect(() => {
    if (!token) return;
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${proto}://localhost:8000/ws/likes/${pageSlug}/?token=${token}`;
    console.log("Connecting WS to", wsUrl);
    const ws = new WebSocket(wsUrl);

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
    };
    ws.onerror = (err) => {
      console.error("WS error", err);
    };
    ws.onclose = (e) => {
      console.warn("WS closed", e);
      wsRef.current = null;
    };

    ws.onmessage = (e) => {
      console.log("WS message", e.data);
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "init" || msg.type === "update") {
          if (typeof msg.likes === "number") setLikes(msg.likes);
          if (typeof msg.dislikes === "number") setDislikes(msg.dislikes);
        }
      } catch {}
    };

    return () => ws.close();
  }, [pageSlug, token]);

  useEffect(() => {
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${proto}://localhost:8000/ws/test/`;
    console.log("Connecting to WS:", wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WS connected");
      ws.send(JSON.stringify({ action: "ping" }));
    };

    ws.onmessage = (e) => {
      console.log("WS message:", e.data);
    };

    ws.onerror = (err) => {
      console.error("WS error", err);
    };

    ws.onclose = () => {
      console.warn("WS closed");
    };

    return () => ws.close();
  }, []);

  const send = (action: "like" | "dislike") => {
    if (!token) {
      alert("Войдите, чтобы голосовать");
      return;
    }

    const ws = wsRef.current;

    if (ws && ws.readyState === WebSocket.OPEN)
      ws.send(JSON.stringify({ action }));
    else {
      fetch(`http://localhost:8000/api/likes/${pageSlug}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (typeof data.likes === "number") setLikes(data.likes);
          if (typeof data.dislikes === "number") setDislikes(data.dislikes);
          if (data.my_vote === "like" || data.my_vote === "dislike")
            setMyVote(data.my_vote);
          else setMyVote(null);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => send("like")}
        className={`flex items-center gap-2 rounded px-4 py-2 transition ${myVote === "like" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"}`}
      >
        👍 <span>{likes}</span>
      </button>
      <button
        onClick={() => send("dislike")}
        className={`flex items-center gap-2 rounded px-4 py-2 transition ${myVote === "dislike" ? "bg-red-300" : "bg-red-100 hover:bg-red-200"}`}
      >
        👎 <span>{dislikes}</span>
      </button>
      {!token && (
        <span className="text-sm text-gray-500">Войдите, чтобы голосовать</span>
      )}
    </div>
  );
}
