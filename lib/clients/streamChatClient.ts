import { Message } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/chat/stream";

export const streamChat = async ({
  inputContent,
  setIsLoading,
  append,
}: {
  inputContent: string;
  setIsLoading: (isLoading: boolean) => void; // Add setIsLoading as a parameter
  append: (message: Message) => void;
}) => {
  try {
    setIsLoading(true);
    // handle streaming response
    await fetchEventSource(`${apiUrl}`, {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json", // ✅ Add this line
      },
      body: JSON.stringify({ query: inputContent }),
      //@ts-ignore
      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log("Client side error ", res);
        }
      },
      onmessage(event) {
        console.log(`${event.data}`);
        const text = JSON.parse(event.data);
        const content: Message = {
          id: generateUUID(),
          content: text["content"],
          role: "assistant",
          parts: [{ type: "text", text: text["content"] }],
        };

        append(content);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
  } catch (err) {
    console.log(`Error when streaming services. Details: ${err}`);
  } finally {
    setIsLoading(false);
  }
};
