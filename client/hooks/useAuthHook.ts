"use client";

import { useState } from "react";
import { phoneMask } from "@/utils/auth";
import { authLogin, authRegister } from "@/http/userHttp";
import { useRouter } from "next/navigation";
import { privateRoutesEnum } from "@/types/routes";

export const useAuthHook = () => {
  const router = useRouter();
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

  const submitAuth = async (event: React.FormEvent, isRegister: boolean) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await authLogin(formData);
      setShowSuccess(true);
      setLoading(true)
      setTimeout(() => {
        // or window.location.href = '/private/chats';
        setLoading(false)
        router.push(privateRoutesEnum.CHATS_ROUTE);
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Auth failed");
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
  };
};
