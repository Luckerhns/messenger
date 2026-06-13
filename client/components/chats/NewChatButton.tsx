import React from "react";
import { Edit3 } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

interface NewChatButtonProps {
  visible?: boolean;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ visible = true }) => {
  const openModal = useUIStore((state) => state.openModal);
  const handleClick = () => openModal("createChat");

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 float glow-pulse border-2 border-white/20 z-20"
      title="New Chat"
    >
      <Edit3 className="w-5 h-5" />
    </button>
  );
};

export default NewChatButton;
