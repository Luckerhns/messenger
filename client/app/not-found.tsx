'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, MessagesSquare, LogIn } from 'lucide-react';
import { publicRoutesEnum } from '@/utils/routes';

export default function NotFound() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const buttonHref = isAuthenticated ? '/chats' : publicRoutesEnum.LOGIN_ROUTE;
  const ButtonIcon = isAuthenticated ? MessagesSquare : LogIn;
  const buttonText = isAuthenticated ? 'В чаты' : 'Войти';
  const buttonAria = isAuthenticated ? 'Перейти в чаты' : 'Перейти на страницу входа';

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 px-4 py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 text-center max-w-md mx-auto"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative"
        >
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl relative overflow-hidden glow-focus">
            <AlertCircle className="w-20 h-20 text-white drop-shadow-lg" />
            <div className="absolute -inset-1 bg-gradient-radial from-white/20 to-transparent rounded-3xl blur-xl animate-pulse" />
          </div>
        </motion.div>

        {/* 404 Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-8xl font-black bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent drop-shadow-lg md:text-9xl">
              404
            </h1>
          </div>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            Хм... эта страница не существует.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
            Возьми паузу, чтобы исследовать наш мессенджер или перейди по нужной ссылке. Мы будем ждать.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href={buttonHref}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden glass-card backdrop-blur-sm border border-white/20"
            aria-label={buttonAria}
          >
            <ButtonIcon className="w-5 h-5 group-hover:animate-pulse" />
            <span>{buttonText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -skew-x-12 -translate-x-40 group-hover:translate-x-40 transition-transform duration-1000" />
          </Link>
        </motion.div>

        {/* Subtle footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm text-zinc-500 dark:text-zinc-500 absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          Заблудился? Чаты ждут тебя →
        </motion.p>
      </motion.div>
    </div>
  );
}

