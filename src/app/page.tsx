"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Eye, EyeOff } from "lucide-react"

export default function Home() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className={styles.main}>
            <div className={styles.form}>
                <h1 className={styles.loginTitle}>Login</h1>
                <form action="#" className={styles.formInputs}>
                    <div className={styles.field}>
                        <input type="email" placeholder="Email" id="email" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            className={styles.password}
                        />
                        <span
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    <div className={styles.field}>
                        <button className={styles.loginButton}>Login</button>
                    </div>
                </form>
            </div>
        </main>
    )
}