"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle, Users, Hash } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { useChatsStore } from "@/store/chatsStore";
import { useRouter } from "next/navigation";
import { createChat } from "@/http/chatsHttp"; // to be added
import { cn } from "@/utils/cn";
import type { IChat } from "@/types/chat";
import { useNewChat } from "@/hooks/useNewChat";
import { useChats } from "@/hooks/useChats";
import { useAuthStore } from "@/store/authStore";

const CreateChatModal: React.FC = () => {
  const { isModalOpen, modalType, closeModal } = useUIStore();

  const { addNewChat } = useNewChat();

  const { refetch } = useChats();

  const [formData, setFormData] = useState({
    name: "",
    type: "private" as IChat["type"],
    uniqueLink: "",
  });

  const userId = useAuthStore((state) => state.user?.id);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen && modalType === "createChat") {
      setFormData({ name: "", type: "private" });
    }
  }, [isModalOpen, modalType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.uniqueLink.trim()) return;

    setLoading(true);
    try {
      console.log('Refetch with user', userId)
      console.log(formData)
      await addNewChat(formData);
      closeModal();
      refetch(userId);
      router.refresh(); // Next.js refetch
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isModalOpen || modalType !== "createChat") return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
      <div className="glass-card w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Новый чат
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Создать новый разговор
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Название чата
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all"
              placeholder="Введите название чата"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Тип чата
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as IChat["type"],
                })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all"
            >
              <option value="private">Приватный чат</option>
              <option value="public">Публичный чат</option>
              <option value="channel">Канал</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Уникальная ссылка
            </label>
            <input
              type="text"
              value={formData.uniqueLink}
              onChange={(e) =>
                setFormData({ ...formData, uniqueLink: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all"
              placeholder="Введите ссылку"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              disabled={loading}
            >
              Отмена
            </button>

            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium disabled:opacity-50"
              disabled={loading || !formData.name.trim()}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Создание...
                </div>
              ) : (
                "Создать чат"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChatModal;
