"use client";

import { useEffect, useState } from "react";
import { UserIcon } from "lucide-react";
import { supabase } from "../../supabase/supabaseClient"; // ajuste o caminho
import styles from "./Header.module.css";

const Header = () => {
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchEmail = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user && !error) {
            setEmail(user.email);
        }
        };

        fetchEmail();
    }, []);

    return (
        <header className={styles.header}>
        <div className={styles.userInfo}>
            <span className={styles.userName}>{email || "Carregando..."}</span>
            <UserIcon className={styles.icon} />
        </div>
        </header>
    );
};

export default Header;