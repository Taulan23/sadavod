import { useState } from "react";
import data from "../pages/api/data.json";

const Admin = () => {
  console.log(data.items);

  const styles = {
    container: {
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "start",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    wrapper: {
      maxWidth: "800px",
      width: "100%",
      margin: "0 auto",
    },
    heading: {
      textAlign: "center",
      fontSize: "2rem",
      marginBottom: "2rem",
      color: "#333",
    },
    subHeading: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
      color: "#444",
    },
    section: {
      marginBottom: "3rem",
      backgroundColor: "#fff",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "1rem",
      width: "100%",
    },
    addButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "0.75rem",
      cursor: "pointer",
      fontWeight: "bold",
      borderRadius: "6px",
      fontSize: "1rem",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "0.5rem",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "0.9rem",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "1.5rem",
    },
    productCard: {
      border: "1px solid #eee",
      borderRadius: "8px",
      padding: "1rem",
      textAlign: "center",
      transition: "box-shadow 0.3s ease",
      backgroundColor: "#fff",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
    },
    productImage: {
      width: "100%",
      maxHeight: "200px",
      objectFit: "contain",
      borderRadius: "6px",
      marginBottom: "0.5rem",
      boxSizing: "border-box",
    },
    productName: {
      fontSize: "1.1rem",
      color: "#333",
      margin: "0.5rem 0",
    },
    productBrand: {
      fontSize: "0.9rem",
      color: "#666",
      margin: "0.3rem 0",
    },
    productCategory: {
      fontSize: "0.9rem",
      color: "#777",
      margin: "0.3rem 0",
    },
    productPrice: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "0.75rem",
    },
  };

  const [newProduct, setNewProduct] = useState({
    id: "",
    imageURL: "",
    brand: "",
    category: "",
    name: "",
    amount: "",
  });

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>Админ-панель</h1>

        {/* Форма добавления товара */}
        <section style={styles.section}>
          <h2 style={styles.subHeading}>Добавить товар</h2>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="ID"
              value={newProduct.id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, id: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Ссылка на изображение (imageURL)"
              value={newProduct.imageURL}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageURL: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Бренд (brand)"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Категория (category)"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Название товара (name)"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Цена (amount)"
              value={newProduct.amount}
              onChange={(e) =>
                setNewProduct({ ...newProduct, amount: e.target.value })
              }
              style={styles.input}
            />
            <button style={styles.addButton}>Добавить товар</button>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>Текущие товары</h2>
          <div style={styles.productsGrid}>
            {data.items.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productBrand}>Бренд: {product.brand}</p>
                <p style={styles.productCategory}>
                  Категория: {product.category}
                </p>
                <p style={styles.productPrice}>{product.amount} ₽</p>
                <button style={styles.deleteButton}>Удалить</button>
              </div>
            ))}
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.subHeading}>Добавить администратора</h2>
          <div style={styles.formGroup}>
            <input type="text" placeholder="Имя" style={styles.input} />
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Пароль" style={styles.input} />
            <button style={{ ...styles.addButton, backgroundColor: "#007bff" }}>
              Зарегистрировать администратора
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
