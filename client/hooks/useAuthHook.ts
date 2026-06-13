"use client";

import { useState } from "react";
import { phoneMask } from "@/utils/auth";
import { authLogin, authRegister } from "@/http/userHttp";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { privateRoutesEnum } from "@/types/routes";

export const useAuthHook = () => {
  const router = useRouter();
  // Zustand store provides current user for redirects (read-only from this hook)
  const user = useAuthStore((s) => s.user);

  
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const maskedValue = phoneMask(value);
      setFormData({ ...formData, [name]: maskedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitAuth = async (event: React.FormEvent, isRegister: boolean = false) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await useAuthStore.getState().register(formData);
      } else {
        await useAuthStore.getState().login(formData);
      }

      setShowSuccess(true);

      // Если роутим на основе Zustand, возможна рассинхронизация обновления.
      // Поэтому после успешной авторизации/регистрации просто делаем небольшую задержку и проверяем user ещё раз.
      setTimeout(() => {
        const userId = useAuthStore.getState().user?.id;
        if (userId) router.push(`/api/${userId}/chats`);
      }, 250);

      // showSuccess оставляем, чтобы UI успел отрисовать анимацию
      setShowSuccess(true);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Ошибка авторизации");
      console.log("Authorization error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    submitAuth,
    error,
    setError,
    loading,
    showSuccess,
    setShowSuccess,
    user,
  };
};

