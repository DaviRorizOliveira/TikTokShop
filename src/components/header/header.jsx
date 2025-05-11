"use client";

import { useState } from "react";
import { User } from "lucide-react";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.userInfo}>
                <span className={styles.userName}>Fulano</span>
                <User className={styles.icon} />
            </div>
        </header>
    );
};

export default Header;