// ===== Login Logic (GUNKUL Warehouse) =====
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const pwToggle = document.getElementById('pwToggle');
const pwInput  = document.getElementById('password');
const form     = document.getElementById('loginForm');
const btn      = document.getElementById('signinBtn');
const errorMsg = document.getElementById('errorMsg');
const usernameInput = document.getElementById('username');

// สลับแสดง/ซ่อนรหัสผ่าน
pwToggle.addEventListener('click', () => {
  const showing = pwToggle.classList.toggle('showing');
  pwInput.type = showing ? 'text' : 'password';
});

function showError(text){
  errorMsg.textContent = text;
  errorMsg.hidden = false;
}

function setLoading(isLoading){
  btn.classList.toggle('loading', isLoading);
  btn.disabled = isLoading;
}

// แปลง error code ของ Firebase เป็นข้อความภาษาไทย
function mapFirebaseError(code){
  switch (code) {
    case 'auth/invalid-email':
      return 'รูปแบบอีเมลไม่ถูกต้อง';
    case 'auth/missing-password':
      return 'กรุณากรอกรหัสผ่าน';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
    case 'auth/user-disabled':
      return 'บัญชีนี้ถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ';
    case 'auth/too-many-requests':
      return 'พยายามเข้าสู่ระบบผิดหลายครั้งเกินไป กรุณาลองใหม่ภายหลัง';
    case 'auth/network-request-failed':
      return 'การเชื่อมต่อเครือข่ายมีปัญหา กรุณาลองใหม่อีกครั้ง';
    default:
      return 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMsg.hidden = true;

  const username = usernameInput.value.trim();
  const password = pwInput.value;

  if (!username || !password) {
    showError('กรุณากรอกอีเมล/ชื่อผู้ใช้ และรหัสผ่านให้ครบถ้วน');
    return;
  }

  setLoading(true);

  signInWithEmailAndPassword(auth, username, password)
    .then(() => {
      window.location.href = 'main.html';
    })
    .catch((err) => {
      setLoading(false);
      showError(mapFirebaseError(err.code));
    });
});
