import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";

const ACCEPT_ATTR =
  "image/jpeg,image/png,image/webp,video/mp4,video/x-matroska,.mkv";

function MessageInput() {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const sendMessage = useChatStore((s) => s.sendMessage);
  const isSendingMessage = useChatStore((s) => s.isSendingMessage);
  const selectedUser = useChatStore((s) => s.selectedUser);

  const clearAttachment = useCallback(() => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const submit = async () => {
    if (!selectedUser || isSendingMessage) return;
    const trimmed = text.trim();
    if (!trimmed && !imageFile) return;

    await sendMessage({ text: trimmed, imageFile: imageFile ?? undefined });
    setText("");
    clearAttachment();
    textareaRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend =
    selectedUser && (text.trim().length > 0 || imageFile) && !isSendingMessage;

  return (
    <div className="border-t border-base-200/60 w-full bg-base-100/80 px-4 py-3 pr-2 backdrop-blur-sm sm:pr-3">
      <div className="flex w-full flex-col gap-3">
        {previewUrl && (
          <div className="relative inline-flex self-start rounded-lg border border-base-300/60 overflow-hidden bg-base-200/30">
            {imageFile?.type?.startsWith("video/") ? (
              <video
                src={previewUrl}
                className="max-h-40 max-w-xs object-contain"
                muted
                playsInline
              />
            ) : (
              <img
                src={previewUrl}
                alt="Attachment preview"
                className="max-h-40 max-w-xs object-cover"
              />
            )}
            <button
              type="button"
              onClick={clearAttachment}
              className="absolute top-1 right-1 p-1 rounded-md bg-base-100/90 text-base-content shadow-sm hover:bg-base-200 transition"
              aria-label="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="hidden"
            onChange={onFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!selectedUser || isSendingMessage}
            className="shrink-0 p-2.5 rounded-lg border border-base-300/60 text-base-content/70 hover:text-base-content hover:bg-base-200/40 transition disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Attach image or video"
          >
            <ImagePlus className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              selectedUser
                ? `Message ${selectedUser.fullName}…`
                : "Select a chat"
            }
            disabled={!selectedUser || isSendingMessage}
            className="flex-1 min-h-[44px] max-h-32 px-3 py-2.5 text-sm bg-transparent border border-base-300/60 rounded-lg text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-base-content/30 resize-y transition disabled:opacity-50"
          />

          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            className="shrink-0 p-2.5 rounded-lg bg-base-content text-base-100 hover:opacity-90 transition disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Send message"
          >
            {isSendingMessage ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        <p className="text-[11px] text-base-content/45 px-0.5">
          Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}

export default MessageInput;
