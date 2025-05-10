import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

export default function Home() {
    return (
        <main className={styles.main}></main>
    );
}