import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";

// =================================================================
// 1. WRAPPER COMPONENT: ProtectedRoute (Cánh cổng bảo vệ)
// =================================================================
function ProtectedRoute({ isAuthenticated, children }) {
  // Nếu chưa đăng nhập -> ĐÁ VĂNG sang trang /login
  // 'replace' giúp thay thế URL hiện tại, không lưu vết rác vào lịch sử duyệt web
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập -> Cho phép hiển thị nội dung bên trong (children)
  return children;
}

// =================================================================
// 2. CÁC TRANG TRONG HỆ THỐNG
// =================================================================

// Trang 1: Trang chủ (Công cộng - Ai cũng xem được)
function Home() {
  return (
    <div className="p-4 space-y-2">
      <h3 className="text-base font-bold text-gray-800">🏠 Trang chủ công cộng</h3>
      <p className="text-sm text-gray-600">
        Mọi người đều có thể xem trang này mà không cần đăng nhập.
      </p>
    </div>
  );
}

// Trang 2: Trang đăng nhập (Login)
function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Cập nhật trạng thái đã đăng nhập

    // XỬ LÝ BẪY DỮ LIỆU:
    // Dùng { replace: true } để GHI ĐÈ trang login khỏi lịch sử trình duyệt!
    // Nhờ vậy, sau khi vào phòng học, người dùng bấm nút "Back" sẽ KHÔNG bị quay lại trang Login.
    navigate("/classroom", { replace: true });
  };

  return (
    <div className="p-4 max-w-sm mx-auto space-y-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
      <h3 className="text-base font-bold text-blue-900">🔐 Cổng Đăng Nhập</h3>
      <p className="text-xs text-blue-700">
        Bạn phải đăng nhập để truy cập vào Phòng học ảo!
      </p>
      <button
        onClick={handleLoginSubmit}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow cursor-pointer transition"
      >
        Đăng nhập tài khoản học viên
      </button>
    </div>
  );
}

// Trang 3: Phòng học ảo (VIP - Độc quyền bảo mật)
function Classroom({ onLogout }) {
  return (
    <div className="p-4 space-y-3 bg-emerald-50 border border-emerald-200 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-emerald-900">
          🎓 Phòng học ảo VIP (Nội dung độc quyền)
        </h3>
        <button
          onClick={onLogout}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded cursor-pointer transition"
        >
          Đăng xuất
        </button>
      </div>
      <p className="text-sm text-emerald-800">
        Chúc mừng bạn đã truy cập thành công vào bài giảng độc quyền!
      </p>
      <div className="p-3 bg-white rounded-lg border border-emerald-100 text-xs text-gray-600 space-y-1">
        <p>• Video bài giảng: <b>Làm chủ Protected Routes trong React</b></p>
        <p>• Tài liệu đính kèm: <b>Full mã nguồn đồ án thực chiến</b></p>
      </div>
    </div>
  );
}

// =================================================================
// 3. COMPONENT CHÍNH BÀI 9
// =================================================================
function ProtectedApp() {
  // Quản lý trạng thái đăng nhập (true: đã đăng nhập, false: chưa đăng nhập)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* THANH MENU ĐIỀU HƯỚNG */}
      <nav className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
        <div className="flex gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 text-xs font-semibold rounded-md ${
                isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/classroom"
            className={({ isActive }) =>
              `px-3 py-1 text-xs font-semibold rounded-md ${
                isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            Phòng học ảo (VIP)
          </NavLink>
        </div>

        {/* Trạng thái đăng nhập */}
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-bold ${
            isAuthenticated
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isAuthenticated ? "● Đã đăng nhập" : "○ Chưa đăng nhập"}
        </span>
      </nav>

      {/* CÂY ĐỊNH TUYẾN */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />

          {/* BẢO VỆ TUYẾN ĐƯỜNG /classroom BẰNG ProtectedRoute */}
          <Route
            path="/classroom"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Classroom onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function Bai09() {
  return (
    <BrowserRouter>
      <ProtectedApp />
    </BrowserRouter>
  );
}
