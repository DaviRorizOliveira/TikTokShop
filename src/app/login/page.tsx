"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            // redirecionar ou mostrar mensagem de sucesso
            console.log("Login bem-sucedido!");
            router.push('/');
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.form}>
                <h1 className={styles.loginTitle}>Login</h1>
                <form onSubmit={handleLogin} className={styles.formInputs}>
                    <div className={styles.field}>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.password}
                            required
                        />
                        <span
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.field}>
                        <button type="submit" className={styles.loginButton} disabled={loading}>
                            {loading ? "Entrando..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}