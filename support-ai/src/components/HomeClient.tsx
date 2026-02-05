"use client"
import React from 'react'
import { motion } from "motion/react"

const HomeClient = () => {
    const handleLogin=()=>{
        window.location.href = "/api/auth/login"
    }
    return (
        <div className='min-h-screen bg-linear-to-br from-white to bg-zinc-50 text-zinc-900 overflow-x-hidden '>
            <motion.div

                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold tracking-tight'>Support <span className='text-zinc-400'>AI</span></div>

                    <button
                        className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium
                hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2'
                onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>

            </motion.div>

        </div>
    )
}

export default HomeClient