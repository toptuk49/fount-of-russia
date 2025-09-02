import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Props = { slug?: string };

export default function LikeDislike({ slug }: Props) {
  const { token, refreshAccessToken } = useAuth();

  const pageSlug =
    (slug || window.location.pathname.replaceAll("/", "-") || "home").replace(
      /^-+|-+$/g,
      "",
    ) || "home";

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myVote, setMyVote] = useState<"like" | "dislike" | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const updateLikesData = (data: any) => {
    if (typeof data.likes === "number") setLikes(data.likes);
    if (typeof data.dislikes === "number") setDislikes(data.dislikes);
    if (data.my_vote === "like" || data.my_vote === "dislike")
      setMyVote(data.my_vote);
    else setMyVote(null);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const currentToken = token;
        const headers: HeadersInit = {};

        if (currentToken) {
          headers.Authorization = `Bearer ${currentToken}`;
        }

        const response = await fetch(`/api/likes/${pageSlug}/`, { headers });

        if (response.status === 401 && token) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            const retryResponse = await fetch(`/api/likes/${pageSlug}/`, {
              headers: { Authorization: `Bearer ${newToken}` },
            });
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              updateLikesData(data);
            }
          }
        } else if (response.ok) {
          const data = await response.json();
          updateLikesData(data);
        }
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, [pageSlug, token, refreshAccessToken]);

  useEffect(() => {
    if (!token) return;

    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${proto}://${window.location.host}/ws/likes/${pageSlug}/?token=${token}`;

    console.log("Connecting WS to", wsUrl);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => console.log("WS connected");
    ws.onerror = (err) => console.error("WS error", err);
    ws.onclose = (e) => {
      console.warn("WS closed", e);
      wsRef.current = null;
    };
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "init" || msg.type === "update") {
          if (typeof msg.likes === "number") setLikes(msg.likes);
          if (typeof msg.dislikes === "number") setDislikes(msg.dislikes);
        }
      } catch (error) {
        console.error("Failed to parse WS message:", error);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [pageSlug, token]);

  const send = async (action: "like" | "dislike") => {
    if (!token) {
      alert("Войдите, чтобы голосовать");
      return;
    }

    const ws = wsRef.current;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action }));
    } else {
      try {
        const currentToken = token;
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        };

        const response = await fetch(`/api/likes/${pageSlug}/`, {
          method: "POST",
          headers,
          body: JSON.stringify({ action }),
        });

        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            const retryResponse = await fetch(`/api/likes/${pageSlug}/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
              body: JSON.stringify({ action }),
            });
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              updateLikesData(data);
            }
          }
        } else if (response.ok) {
          const data = await response.json();
          updateLikesData(data);
        }
      } catch (error) {
        console.error("Failed to send vote:", error);
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => send("like")}
        className={`flex items-center gap-2 rounded px-4 py-2 transition ${myVote === "like" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"
          }`}
      >
        👍 <span>{likes}</span>
      </button>
      <button
        onClick={() => send("dislike")}
        className={`flex items-center gap-2 rounded px-4 py-2 transition ${myVote === "dislike" ? "bg-red-300" : "bg-red-100 hover:bg-red-200"
          }`}
      >
        👎 <span>{dislikes}</span>
      </button>
      {!token && (
        <span className="text-sm text-gray-500">Войдите, чтобы голосовать</span>
      )}
    </div>
  );
}
