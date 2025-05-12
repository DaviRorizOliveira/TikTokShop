"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase/supabaseClient";
import Image from "next/image";
import styles from "./page.module.css";

import ProtectedRoute from '../components/protectedRoute/protectedRoute';

const categories = ["Todos", "Eletrônicos", "Beleza", "Moda", "Livros", "Casa", "Esportes"];

const products = [
    {
        imageUrl: "/images/produtos/smartphone.jpg",
        name: "Smartphone X12",
        category: "Eletrônicos",
        price: 1899.99,
    },
    {
        imageUrl: "/images/produtos/tenis.jpg",
        name: "Tênis Esportivo",
        category: "Moda",
        price: 349.9,
    },
    {
        imageUrl: "/images/produtos/livro.jpg",
        name: "Livro C",
        category: "Livros",
        price: 79.99,
    },
    {
        imageUrl: "/images/produtos/fone.jpg",
        name: "Fone de Ouvido",
        category: "Eletrônicos",
        price: 249.5,
    },
    {
        imageUrl: "/images/produtos/paleta.jpeg",
        name: "Paleta de Sombras",
        category: "Beleza",
        price: 29.99,
    },
    {
        imageUrl: "/images/produtos/cafeteira.jpeg",
        name: "Cafeteira Elétrica",
        category: "Casa",
        price: 199.99,
    },
    {
        imageUrl: "/images/produtos/bola.jpg",
        name: "Bola de Futebol",
        category: "Esportes",
        price: 89.9,
    },
    {
        imageUrl: "/images/produtos/relogio.jpg",
        name: "Relógio de Pulso",
        category: "Moda",
        price: 299.99,
    },
    {
        imageUrl: "/images/produtos/creme.jpeg",
        name: "Creme Facial",
        category: "Beleza",
        price: 49.5,
    },
    {
        imageUrl: "/images/produtos/tablet.jpg",
        name: "Tablet Z10",
        category: "Eletrônicos",
        price: 1499.0,
    },
];

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const toggleCategory = (category: string) => {
        if (category === "Todos") {
            setSelectedCategories([]);
        } else {
            setSelectedCategories((prev) =>
                prev.includes(category)
                    ? prev.filter((c) => c !== category)
                    : [...prev, category]
            );
        }
    };

    const filteredProducts = products.filter((product) => {
        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        const priceMatch = product.price >= min && product.price <= max;

        return categoryMatch && priceMatch;
    });

    return (
        <ProtectedRoute>
        <main className={styles.main}>
            <div className={styles.sidebar}>
                <div className={styles.filterSection}>
                    <h3 className={styles.subTitle}>Categorias</h3>
                    {categories.map((category) => (
                        <label key={category} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
                <div className={styles.filterSection}>
                    <h3 className={styles.subTitle}>Preço</h3>
                    <input
                        type="number"
                        placeholder="Mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className={styles.priceInput}
                    />
                    <input
                        type="number"
                        placeholder="Máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className={styles.priceInput}
                    />
                </div>
            </div>

            <div className={styles.productsGrid}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div className={styles.card} key={index}>
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={300}
                                height={300}
                                className={styles.image}
                            />
                            <div className={styles.content}>
                                <h2 className={styles.name}>{product.name}</h2>
                                <p className={styles.category}>{product.category}</p>
                                <p className={styles.price}>
                                    R$ {product.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyMessage}>Nenhum produto foi encontrado.</p>
                )}
            </div>
        </main>
        </ProtectedRoute>
    );
}