import React from "react";

const Login = () => {
  return (
    <div style={styles.screen}>
      <div style={styles.card}>
        <form style={styles.form}>
          <input
            required
            type="email"
            placeholder="Enter your email"
            style={styles.input}
          />
          <input
            required
            type="password"
            placeholder="Enter password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  screen: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111111",
    margin: 0,
    boxSizing: "border-box",
  },
  card: {
    border: "2px solid #059669",
    borderRadius: "28px",
    padding: "60px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
  },
  input: {
    width: "300px",
    padding: "12px 24px",
    backgroundColor: "transparent",
    border: "2px solid #059669",
    borderRadius: "9999px",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "10px",
    padding: "10px 32px",
    backgroundColor: "#059669",
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;