import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleResetPassword = async () => {
        // Reset previous messages
        setErrorMessage("");
        setSuccessMessage("");

        // Validate email
        if (!email) {
            setErrorMessage("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }

        // Set loading state
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            // Improved response handling
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                // If not JSON, try to parse text as JSON or use as error message
                const text = await response.text();
                try {
                    data = JSON.parse(text);
                } catch {
                    // If parsing fails, treat the text as an error message
                    throw new Error(text || "Unexpected server response");
                }
            }

            // Check if response was successful
            if (!response.ok) {
                throw new Error(data.message || "Failed to send reset email");
            }

            // Success scenario
            setSuccessMessage(data.message || "Password reset email sent successfully!");
            setEmail("");
        } catch (error) {
            // Catch and display any errors
            setErrorMessage(error.message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.lockIcon}>
                    <i className="fas fa-lock" style={styles.lockIconInner}></i>
                </div>
                <h2 style={styles.heading}>Forgot Password?</h2>
                <p style={styles.text}>Enter your email address to reset your password</p>
                <div style={styles.inputGroup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        style={styles.input}
                    />
                    {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                    {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
                </div>
                <button
                    onClick={handleResetPassword}
                    style={styles.button}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
    },
    card: {
        background: "white",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
    },
    lockIcon: {
        background: "#e3f2fd",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1rem",
    },
    lockIconInner: {
        fontSize: "1.5rem",
        color: "#1976d2",
    },
    heading: {
        color: "#1d1d1d",
        marginBottom: "0.5rem",
    },
    text: {
        color: "#666",
        marginBottom: "1.5rem",
    },
    inputGroup: {
        marginBottom: "1rem",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        outline: "none",
        transition: "border-color 0.2s",
        fontSize: "1rem",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.2s",
        fontSize: "1rem",
    },
    errorMessage: {
        color: "#d32f2f",
        marginTop: "0.5rem",
        fontSize: "0.875rem",
    },
    successMessage: {
        color: "#2e7d32",
        marginTop: "0.5rem",
        fontSize: "0.875rem",
    },
};

export default ForgotPassword;