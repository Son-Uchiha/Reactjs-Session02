import { useState } from "react";
import {
  // Dùng cho Cách 1 (JSX truyền thống)
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  // Dùng cho Cách 2 (Data Router hiện đại v6.4+)
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// =================================================================
// 1. CÁC PHÂN HỆ TRANG (DÙNG CHUNG CHO CẢ 2 CÁCH)
// =================================================================

function Dashboard() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800">📊 Cổng thông tin Sinh viên - Dashboard</h3>
      <p className="text-sm text-gray-600">
        Chào mừng bạn quay trở lại! Bạn có <b>2 buổi học</b> trong tuần này.
      </p>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-xs text-blue-600 font-semibold">Tín chỉ tích lũy</p>
          <p className="text-xl font-bold text-blue-900">45/120</p>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
          <p className="text-xs text-emerald-600 font-semibold">Điểm GPA</p>
          <p className="text-xl font-bold text-emerald-900">3.65 / 4.0</p>
        </div>
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800">📅 Lịch học trong tuần</h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <b>Thứ 2 (18h00 - 20h00):</b> ReactJS - React Router DOM & SPA
        </li>
        <li className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <b>Thứ 4 (18h00 - 20h00):</b> Thực hành xây dựng Routing Tree
        </li>
      </ul>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800">👤 Hồ sơ sinh viên</h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p>• <b>Họ và tên:</b> Nguyễn Văn A</p>
        <p>• <b>Mã sinh viên:</b> B20DCCN001</p>
        <p>• <b>Chuyên ngành:</b> Kỹ thuật phần mềm (ReactJS)</p>
      </div>
    </div>
  );
}

// Bẫy dữ liệu: Trang 404
function NotFound() {
  return (
    <div className="text-center py-8 space-y-3">
      <div className="text-4xl">⚠️</div>
      <h3 className="text-lg font-bold text-red-600">404 - Không tìm thấy nội dung!</h3>
      <p className="text-xs text-gray-500">
        Đường dẫn bạn vừa truy cập không tồn tại trên hệ thống.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
      >
        Quay về Trang chủ
      </Link>
    </div>
  );
}

// Hàm style nút điều hướng
const navClass = ({ isActive }) =>
  `px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
    isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
  }`;

// =================================================================
// CÁCH 1: DÙNG JSX ROUTER (<BrowserRouter>, <Routes>, <Route>)
// =================================================================
function Cach1_JSXRouter() {
  return (
    <BrowserRouter>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <nav className="flex items-center gap-1.5 p-3 bg-gray-50 border-b border-gray-200">
          <NavLink to="/" className={navClass}>Dashboard</NavLink>
          <NavLink to="/schedule" className={navClass}>Lịch học</NavLink>
          <NavLink to="/profile" className={navClass}>Hồ sơ</NavLink>
          <NavLink to="/test-404" className={navClass}>Link lỗi 404</NavLink>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// =================================================================
// CÁCH 2: DÙNG DATA ROUTER (createBrowserRouter + <Outlet />)
// =================================================================

// 1. Layout chứa Navbar và <Outlet />
function LayoutCach2() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <nav className="flex items-center gap-1.5 p-3 bg-gray-50 border-b border-gray-200">
        <NavLink to="/" className={navClass}>Dashboard</NavLink>
        <NavLink to="/schedule" className={navClass}>Lịch học</NavLink>
        <NavLink to="/profile" className={navClass}>Hồ sơ</NavLink>
        <NavLink to="/test-404" className={navClass}>Link lỗi 404</NavLink>
      </nav>

      {/* <Outlet /> là vị trí các component con sẽ chui vào hiển thị */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

// 2. Khai báo Router bằng Mảng Object
const routerCach2 = createBrowserRouter([
  {
    path: "/",
    element: <LayoutCach2 />, // Layout cha chứa khung Navbar
    errorElement: <NotFound />, // Xử lý lỗi crash trang
    children: [
      {
        index: true, // Đường dẫn mặc định khi vào "/" -> hiện Dashboard
        element: <Dashboard />,
      },
      {
        path: "schedule", // Tương ứng "/schedule"
        element: <Schedule />,
      },
      {
        path: "profile", // Tương ứng "/profile"
        element: <Profile />,
      },
      {
        path: "*", // Bẫy dữ liệu: Bắt mọi URL sai
        element: <NotFound />,
      },
    ],
  },
]);

function Cach2_CreateBrowserRouter() {
  // Nạp router vào RouterProvider
  return <RouterProvider router={routerCach2} />;
}

// =================================================================
// COMPONENT CHÍNH: CÓ NÚT CHUYỂN ĐỔI ĐỂ BẠN THỬ CẢ 2 CÁCH
// =================================================================
export default function Bai04() {
  const [selectedMethod, setSelectedMethod] = useState(2); // Mặc định mở Cách 2 cho bạn xem

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Nút chuyển đổi chế độ xem */}
      <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
        <span className="text-xs font-bold text-indigo-900 uppercase">
          Chế độ Router:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedMethod(1)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
              selectedMethod === 1
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
            }`}
          >
            Cách 1: JSX Router (&lt;Routes&gt;)
          </button>
          <button
            onClick={() => setSelectedMethod(2)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
              selectedMethod === 2
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
            }`}
          >
            Cách 2: createBrowserRouter (Hiện đại)
          </button>
        </div>
      </div>

      {/* Hiển thị giao diện theo cách đã chọn */}
      {selectedMethod === 1 ? <Cach1_JSXRouter /> : <Cach2_CreateBrowserRouter />}
    </div>
  );
}
