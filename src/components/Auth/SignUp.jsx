import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { motion } from "framer-motion";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [splitEmail, setSplitEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSplitEmail(e.target.value.split("@")[0] || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to create an account: " + err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    try {
      setError("");
      setGoogleLoading(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google sign up failed: " + err.message);
    }
    setGoogleLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(135deg, #1a3c5e 0%, #2e75b6 50%, #1a3c5e 100%)",
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      {/* LEFT SIDE */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px", color: "white"
      }} className="d-none d-md-flex">
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🍽️</div>
        <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "10px" }}>
          Join Us Today!
        </h1>
        <p style={{ opacity: 0.7, fontSize: "15px", textAlign: "center", maxWidth: "300px" }}>
          Create your account and start ordering delicious food from the university canteen!
        </p>
        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "12px", width: "280px" }}>
          {[
            { icon: "✅", text: "Free to register" },
            { icon: "🔒", text: "Secure & private" },
            { icon: "📄", text: "PDF receipt on every order" },
            { icon: "📊", text: "Track your order history" },
          ].map((f) => (
            <div key={f.text} style={{
              background: "rgba(255,255,255,0.1)", borderRadius: "10px",
              padding: "10px 15px", fontSize: "13px", display: "flex", alignItems: "center", gap: "10px"
            }}>
              <span>{f.icon}</span><span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div style={{
        width: "100%", maxWidth: "480px",
        background: "white", display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "40px", boxShadow: "-10px 0 40px rgba(0,0,0,0.2)"
      }}>
        <motion.div style={{ width: "100%" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* LOGO */}
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <div style={{
              width: "65px", height: "65px", background: "linear-gradient(135deg, #1a3c5e, #2e75b6)",
              borderRadius: "16px", margin: "0 auto 12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "30px", boxShadow: "0 8px 20px rgba(46,117,182,0.3)"
            }}>🍽️</div>
            <h2 style={{ color: "#1a3c5e", fontWeight: "800", fontSize: "26px", margin: "0" }}>
              Create Account
            </h2>
            <p style={{ color: "#888", fontSize: "13px", marginTop: "5px" }}>
              Register to start ordering food
            </p>
          </div>

          {/* AVATAR */}
          {email && (
            <motion.div style={{ textAlign: "center", marginBottom: "15px" }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <img
                src={`https://ui-avatars.com/api/?name=${splitEmail}&background=1a3c5e&color=fff&size=80`}
                alt="profile" style={{ borderRadius: "50%", width: "65px", height: "65px",
                  border: "3px solid #2e75b6", boxShadow: "0 4px 15px rgba(46,117,182,0.3)" }}
              />
            </motion.div>
          )}

          {/* ERROR */}
          {error && (
            <div style={{
              background: "#fff5f5", border: "1px solid #feb2b2", borderRadius: "10px",
              padding: "12px 15px", color: "#c53030", fontSize: "13px", marginBottom: "15px"
            }}>⚠️ {error}</div>
          )}

          {/* EMAIL */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#1a3c5e", fontWeight: "600", fontSize: "13px", marginBottom: "6px", display: "block" }}>
              Email Address
            </label>
            <input
              type="email" value={email} onChange={handleEmailChange} required
              placeholder="Enter your email"
              style={{
                width: "100%", padding: "12px 15px", border: "2px solid #e2e8f0",
                borderRadius: "10px", fontSize: "14px", outline: "none",
                transition: "border 0.3s", boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#2e75b6"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#1a3c5e", fontWeight: "600", fontSize: "13px", marginBottom: "6px", display: "block" }}>
              Password
            </label>
            <input
              type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              placeholder="Min 6 characters"
              style={{
                width: "100%", padding: "12px 15px", border: "2px solid #e2e8f0",
                borderRadius: "10px", fontSize: "14px", outline: "none",
                transition: "border 0.3s", boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#2e75b6"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ color: "#1a3c5e", fontWeight: "600", fontSize: "13px", marginBottom: "6px", display: "block" }}>
              Confirm Password
            </label>
            <input
              type="password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required
              placeholder="Re-enter your password"
              style={{
                width: "100%", padding: "12px 15px", border: "2px solid #e2e8f0",
                borderRadius: "10px", fontSize: "14px", outline: "none",
                transition: "border 0.3s", boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#2e75b6"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            onClick={handleSubmit} disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: loading ? "#94a3b8" : "linear-gradient(135deg, #1a3c5e, #2e75b6)",
              color: "white", border: "none", borderRadius: "10px",
              fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(46,117,182,0.4)", transition: "all 0.3s"
            }}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          {/* DIVIDER */}
          <div style={{ display:"flex", alignItems:"center", margin:"18px 0", color:"#aaa", fontSize:"13px" }}>
            <div style={{ flex:1, height:"1px", background:"#e2e8f0" }} />
            <span style={{ padding:"0 12px" }}>or</span>
            <div style={{ flex:1, height:"1px", background:"#e2e8f0" }} />
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleSignUp} disabled={googleLoading}
            style={{
              width: "100%", padding: "12px", background: "white", color: "#333",
              border: "2px solid #e2e8f0", borderRadius: "10px", fontSize: "14px",
              fontWeight: "600", cursor: googleLoading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}
            onMouseEnter={e => { e.currentTarget.style.background="#f8fafc"; e.currentTarget.style.borderColor="#2e75b6"; }}
            onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.borderColor="#e2e8f0"; }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
            {googleLoading ? "Signing up with Google..." : "Continue with Google"}
          </button>

          <div style={{ textAlign: "center", marginTop: "20px", color: "#888", fontSize: "13px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#2e75b6", fontWeight: "700", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "15px",
            borderTop: "1px solid #f0f0f0", color: "#aaa", fontSize: "11px" }}>
            University of Thal, Bhakkar — Canteen Management System
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
