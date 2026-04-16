'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { privateRoutesEnum, publicRoutesEnum } from 'types/routes';
import { useAuthHook } from "hooks/useAuthHook"

export default function LoginPage() {
  const {
    formData,
    handleChange,
    submitAuth,
    error,
    loading,
    showSuccess,
  } = useAuthHook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAuth('/api/public/auth/login', () => {
      window.location.href = privateRoutesEnum.CHATS_ROUTE;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4 py-12 dark:from-zinc-900/50 dark:via-slate-900/50 dark:to-zinc-900/50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl float" />
      </motion.div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div 
            className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl glow-focus mb-6 float"
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle className="w-12 h-12 text-white drop-shadow-lg wave" />
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl font-black bg-gradient-to-r from-zinc-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent dark:from-zinc-100 dark:via-blue-300 dark:to-purple-300 mb-4 drop-shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Добро пожаловать
          </motion.h1>
          <motion.p 
            className="text-xl text-zinc-600 dark:text-zinc-400 font-medium"
            variants={itemVariants}
          >
            Войдите в свой аккаунт
          </motion.p>
        </motion.div>

        <motion.div 
          className="glass-card p-10 rounded-3xl shadow-2xl"
          variants={itemVariants}
          whileHover="hover"
        >
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/30 backdrop-blur-sm text-red-800 dark:text-red-200 rounded-2xl text-sm mb-6 overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label className="block text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
                📱 Номер телефона
              </label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-500 w-6 h-6 glow-focus" />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-16 pr-6 py-5 bg-white/60 dark:bg-zinc-800/70 backdrop-blur-lg border-2 border-zinc-200/50 dark:border-zinc-700/50 rounded-3xl text-xl font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-500 hover:border-indigo-400 shadow-lg hover:shadow-xl"
                  placeholder="+7 (999) 999-99-99"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
                🔒 Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-500 w-6 h-6 glow-focus" />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-16 pr-6 py-5 bg-white/60 dark:bg-zinc-800/70 backdrop-blur-lg border-2 border-zinc-200/50 dark:border-zinc-700/50 rounded-3xl text-xl font-medium focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-500 hover:border-purple-400 shadow-lg hover:shadow-xl"
                  placeholder="Введите ваш пароль"
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading || showSuccess}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="group relative w-full flex items-center justify-center gap-3 py-6 px-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl glow-focus overflow-hidden transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    ✅ Вход выполнен!
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                ) : loading ? (
                  <motion.div
                    key="loading"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="flex items-center gap-2"
                  >
                    Вход...
                    <ArrowRight className="w-6 h-6 shimmer" />
                  </motion.div>
                ) : (
                  <motion.div key="normal" className="flex items-center gap-2">
                    Войти в аккаунт
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <motion.p 
            className="text-center mt-10 text-lg text-zinc-600 dark:text-zinc-400 font-medium"
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Нет аккаунта?{' '}
            <Link 
              href={publicRoutesEnum.REGISTER_ROUTE} 
              className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:underline"
            >
              Создать аккаунт →
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
}
