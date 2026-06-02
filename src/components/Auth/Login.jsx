import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!validateEmail(email)) { setError("Invalid email format"); return; }
    try {
      setError(""); setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) { setError("Failed to sign in: " + err.message); }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setGoogleLoading(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google sign in failed: " + err.message);
    }
    setGoogleLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:"linear-gradient(135deg,#1a3c5e,#2e75b6,#1a3c5e)", fontFamily:"'Segoe UI',Arial,sans-serif" }}>
      
      {/* LEFT */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px", color:"white" }} className="d-none d-md-flex">
        <div style={{ fontSize:"80px", marginBottom:"20px" }}>🍽️</div>
        <h1 style={{ fontSize:"32px", fontWeight:"800", marginBottom:"10px" }}>Canteen Management</h1>
        <p style={{ opacity:0.7, fontSize:"15px", textAlign:"center", maxWidth:"300px" }}>
          Order your favorite food from the university canteen — fast, easy, and digital!
        </p>
        <div style={{ marginTop:"40px", display:"flex", flexDirection:"column", gap:"12px", width:"280px" }}>
          {["🛒  Easy Ordering", "📊  Track Orders", "🔒  Secure Login", "📄  PDF Receipts"].map(f => (
            <div key={f} style={{ background:"rgba(255,255,255,0.1)", borderRadius:"10px", padding:"10px 18px", fontSize:"13px" }}>{f}</div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ width:"100%", maxWidth:"480px", background:"white", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px", boxShadow:"-10px 0 40px rgba(0,0,0,0.2)", overflowY:"auto" }}>
        <motion.div style={{ width:"100%", paddingBottom:"10px" }} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5 }}>
          
          {/* LOGO */}
          <div style={{ textAlign:"center", marginBottom:"24px" }}>
            <div style={{ width:"65px", height:"65px", background:"linear-gradient(135deg,#1a3c5e,#2e75b6)", borderRadius:"16px", margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"30px", boxShadow:"0 8px 20px rgba(46,117,182,0.3)" }}>🍽️</div>
            <h2 style={{ color:"#1a3c5e", fontWeight:"800", fontSize:"26px", margin:"0" }}>Welcome Back!</h2>
            <p style={{ color:"#888", fontSize:"13px", marginTop:"5px" }}>Sign in to your canteen account</p>
          </div>

          {/* AVATAR */}
          {email && (
            <motion.div style={{ textAlign:"center", marginBottom:"16px" }} initial={{ scale:0 }} animate={{ scale:1 }}>
              <img src={`https://ui-avatars.com/api/?name=${splitEmail}&background=1a3c5e&color=fff&size=80`}
                alt="profile" style={{ borderRadius:"50%", width:"70px", height:"70px", border:"3px solid #2e75b6", boxShadow:"0 4px 15px rgba(46,117,182,0.3)" }} />
            </motion.div>
          )}

          {/* ERROR */}
          {error && (
            <div style={{ background:"#fff5f5", border:"1px solid #feb2b2", borderRadius:"10px", padding:"12px 15px", color:"#c53030", fontSize:"13px", marginBottom:"16px" }}>
              ⚠️ {error}
            </div>
          )}

          {/* EMAIL */}
          <div style={{ marginBottom:"14px" }}>
            <label style={{ color:"#1a3c5e", fontWeight:"600", fontSize:"13px", marginBottom:"6px", display:"block" }}>Email Address</label>
            <input type="email" value={email} onChange={handleEmailChange} required placeholder="Enter your email"
              style={{ width:"100%", padding:"12px 15px", border:"2px solid #e2e8f0", borderRadius:"10px", fontSize:"14px", outline:"none", boxSizing:"border-box" }}
              onFocus={e => e.target.style.borderColor="#2e75b6"}
              onBlur={e => e.target.style.borderColor="#e2e8f0"} />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom:"18px" }}>
            <label style={{ color:"#1a3c5e", fontWeight:"600", fontSize:"13px", marginBottom:"6px", display:"block" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password"
              style={{ width:"100%", padding:"12px 15px", border:"2px solid #e2e8f0", borderRadius:"10px", fontSize:"14px", outline:"none", boxSizing:"border-box" }}
              onFocus={e => e.target.style.borderColor="#2e75b6"}
              onBlur={e => e.target.style.borderColor="#e2e8f0"} />
          </div>

          {/* SIGN IN BUTTON */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", padding:"13px", background:loading?"#94a3b8":"linear-gradient(135deg,#1a3c5e,#2e75b6)", color:"white", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"700", cursor:loading?"not-allowed":"pointer", boxShadow:"0 4px 15px rgba(46,117,182,0.4)" }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          {/* DIVIDER */}
          <div style={{ display:"flex", alignItems:"center", margin:"14px 0", color:"#aaa", fontSize:"13px" }}>
            <div style={{ flex:1, height:"1px", background:"#e2e8f0" }} />
            <span style={{ padding:"0 12px" }}>or</span>
            <div style={{ flex:1, height:"1px", background:"#e2e8f0" }} />
          </div>

          {/* GOOGLE BUTTON */}
          <button onClick={handleGoogleLogin} disabled={googleLoading}
            style={{ width:"100%", padding:"12px", background:"white", color:"#333", border:"2px solid #e2e8f0", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:googleLoading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", transition:"all 0.2s", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}
            onMouseEnter={e => { e.currentTarget.style.background="#f8fafc"; e.currentTarget.style.borderColor="#2e75b6"; }}
            onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.borderColor="#e2e8f0"; }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
            {googleLoading ? "Signing in with Google..." : "Continue with Google"}
          </button>

          <div style={{ textAlign:"center", marginTop:"16px", color:"#888", fontSize:"13px" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color:"#2e75b6", fontWeight:"700", textDecoration:"none" }}>Sign Up</Link>
          </div>

          <div style={{ textAlign:"center", marginTop:"16px", paddingTop:"16px", borderTop:"1px solid #f0f0f0", color:"#aaa", fontSize:"11px" }}>
            University of Thal, Bhakkar — Canteen Management System
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
