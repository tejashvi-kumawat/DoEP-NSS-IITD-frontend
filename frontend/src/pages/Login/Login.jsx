import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = ({
  onLogin,
  onRegister,
  onForgotPassword,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!showForgotPassword) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!isLogin) {
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (showForgotPassword) {
        await onForgotPassword?.(formData.email);
      } else if (isLogin) {
        await onLogin?.(formData.email, formData.password);
      } else {
        await onRegister?.(formData.name, formData.email, formData.password);
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setShowForgotPassword(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    resetForm();
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Header */}
        <div className={styles.authHeader}>
          <div className={styles.logo}>
            <h1>NSS IITD</h1>
            <p>Digitizing educational projects</p>
          </div>

          {!showForgotPassword && (
            <div className={styles.authTabs}>
              <button
                className={`${styles.authTab} ${isLogin ? styles.active : ""}`}
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                type="button"
              >
                Login
              </button>
              <button
                className={`${styles.authTab} ${!isLogin ? styles.active : ""}`}
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                type="button"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formTitle}>
            <h2>
              {showForgotPassword
                ? "Reset Password"
                : isLogin
                  ? "Welcome Back"
                  : "Create Account"}
            </h2>
            <p>
              {showForgotPassword
                ? "Enter your email to receive reset instructions"
                : isLogin
                  ? "Sign in to your account"
                  : "Join NSS IITD to manage educational projects"}
            </p>
          </div>

          {/* Name fild for register */}
          {!isLogin && !showForgotPassword && (
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.formInput} ${errors.name ? styles.error : ""
                  }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>
          )}

          {/* Email field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.formInput} ${errors.email ? styles.error : ""
                }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Password fields */}
          {!showForgotPassword && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.password ? styles.error : ""
                    }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className={styles.errorMessage}>{errors.password}</span>
                )}
              </div>

              {/* Confirm password for register */}
              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword" className={styles.formLabel}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ""
                      }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <span className={styles.errorMessage}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}
            </>
          )}

          {/* Forgot password link for login */}
          {isLogin && !showForgotPassword && (
            <div className={styles.forgotPassword}>
              <button
                type="button"
                className={styles.forgotLink}
                onClick={toggleForgotPassword}
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loading}>
                <span className={styles.spinner}></span>
                Processing...
              </span>
            ) : showForgotPassword ? (
              "Send Reset Link"
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {/* Back to login from forgot password */}
          {showForgotPassword && (
            <button
              type="button"
              className={styles.backButton}
              onClick={toggleForgotPassword}
            >
              ← Back to Login
            </button>
          )}
        </form>

        {/* Footer */}
        {!showForgotPassword && (
          <div className={styles.authFooter}>
            <p>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleMode}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
