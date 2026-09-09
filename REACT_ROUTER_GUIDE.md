# 📖 SỔ TAY HƯỚNG DẪN REACT ROUTER DOM (V6.4+)

Tài liệu hướng dẫn toàn diện từ cơ bản đến nâng cao về định tuyến (Routing) trong ứng dụng React Single Page Application (SPA).

---

## 1. Bản chất cốt lõi: Client-side Routing & SPA là gì?

* **Web truyền thống (Multi-Page Application - MPA):**
  * Khi người dùng click vào thẻ `<a href="/about.html">`, trình duyệt gửi yêu cầu lên Server.
  * Server trả về một file HTML mới $\rightarrow$ Trình duyệt **xoay tròn tải lại toàn bộ trang web** (màn hình bị chớp trắng gián đoạn).
* **React SPA (Single Page Application):**
  * Cả ứng dụng thực chất **chỉ có duy nhất 1 file `index.html`**.
  * Khi bấm chuyển trang: Trình duyệt **hoàn toàn không tải lại trang (No reload)**.
  * URL trên thanh địa chỉ thay đổi.
  * React Router chỉ âm thầm **tháo component cũ ra và gắn component mới vào**. Trải nghiệm mượt mà tức thì!

---

## 2. Cài đặt thư viện

Trong thư mục dự án React, mở terminal và chạy:

```bash
npm install react-router-dom
```

---

## 3. Cách 1: Định tuyến JSX Router (Truyền thống, dễ học nhất)

Thích hợp cho: **Người mới bắt đầu, bài tập nhỏ trên lớp, component độc lập**.

### Bộ 4 component cốt lõi:
1. `<BrowserRouter>`: Bọc ngoài cùng toàn bộ ứng dụng để quản lý URL.
2. `<Routes>`: Thùng chứa danh sách các trang.
3. `<Route path="..." element={<... />} />`: Định nghĩa đường dẫn và component hiển thị.
4. `<Link>` hoặc `<NavLink>`: Nút chuyển trang (thay thế thẻ `<a>` để không bị tải lại trang).

### Code mẫu hoàn chỉnh:
```jsx
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";

// Các trang con
function Home() {
  return <h2>Trang chủ</h2>;
}
function About() {
  return <h2>Trang giới thiệu</h2>;
}
function NotFound() {
  return (
    <div>
      <h2>404 - Không tìm thấy trang</h2>
      <Link to="/">Quay về Trang chủ</Link>
    </div>
  );
}

// Component chính
export default function App() {
  return (
    <BrowserRouter>
      {/* THANH MENU (NAVBAR) */}
      <nav className="flex gap-4 p-4 bg-gray-100">
        {/* NavLink tự có biến isActive để biết nút nào đang được bấm */}
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}
        >
          Trang chủ
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}
        >
          Giới thiệu
        </NavLink>
      </nav>

      {/* CÂY ĐỊNH TUYẾN */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Bẫy dữ liệu: Bắt mọi link lỗi 404 bằng dấu sao * */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

---

## 4. Cách 2: Data Router với `createBrowserRouter` (Chuẩn đi làm thực tế)

Thích hợp cho: **Dự án thực tế, đồ án tốt nghiệp, ứng dụng doanh nghiệp**.

### Ưu điểm vượt trội:
* Cấu trúc Layout cha - con phân chia cực kỳ sạch sẽ qua mảng `children`.
* Dùng **`<Outlet />`** làm vị trí hiển thị trang con (Header/Sidebar chỉ cần viết 1 lần duy nhất).
* Tự động bắt lỗi crash trang qua **`errorElement`**.
* Hỗ trợ Data APIs hiện đại (`loader`, `action`).

### Code mẫu hoàn chỉnh:
```jsx
import { createBrowserRouter, RouterProvider, Outlet, NavLink } from "react-router-dom";

// 1. Tạo Layout chung chứa Menu và <Outlet />
function RootLayout() {
  return (
    <div>
      <header className="p-4 bg-blue-600 text-white flex gap-4">
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/products">Sản phẩm</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
      </header>

      {/* <Outlet /> là vị trí các trang con sẽ nhảy vào hiển thị */}
      <main className="p-6">
        <Outlet />
      </main>

      <footer className="p-4 bg-gray-100 text-center">Bản quyền 2026</footer>
    </div>
  );
}

// 2. Cấu hình Cây định tuyến bằng Mảng Object
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,       // Layout cha
    errorElement: <ErrorPage />,   // Bắt lỗi nếu trang bị crash
    children: [
      { index: true, element: <HomePage /> },           // Tương ứng path: "/"
      { path: "products", element: <ProductsPage /> },  // Tương ứng path: "/products"
      { path: "contact", element: <ContactPage /> },    // Tương ứng path: "/contact"
      { path: "*", element: <NotFoundPage /> },         // Bẫy 404
    ],
  },
  // Trang nằm ngoài Layout cha (Không có Header/Footer chung)
  { path: "/login", element: <LoginPage /> },
]);

// 3. Nạp vào App
export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## 5. Bốn React Hooks "Bất ly thân" khi đi làm

Khi làm việc với React Router, đây là 4 Hook bạn sẽ dùng hàng ngày:

### 1. `useNavigate()`: Chuyển trang bằng mã JavaScript
Dùng khi bạn muốn chuyển trang sau khi thực hiện một hành động (ví dụ: sau khi Đăng nhập thành công hoặc Bấm nút Mua hàng).
```jsx
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 1. Xử lý kiểm tra tài khoản, mật khẩu...
    // 2. Đăng nhập thành công -> Chuyển về Dashboard:
    navigate("/dashboard");
    
    // Hoặc quay lại trang trước đó trong lịch sử:
    // navigate(-1);
  };

  return <button onClick={handleLogin}>Đăng nhập</button>;
}
```

### 2. `useParams()`: Lấy tham số động trên URL
Dùng khi làm trang chi tiết sản phẩm, chi tiết bài viết, chi tiết người dùng (`/products/:id`).
```jsx
// Cấu hình Route: <Route path="/products/:id" element={<ProductDetail />} />

import { useParams } from "react-router-dom";

function ProductDetail() {
  // Lấy ra id từ URL (Ví dụ URL là /products/123 -> id = "123")
  const { id } = useParams();

  return <div>Đang xem chi tiết sản phẩm mang ID: {id}</div>;
}
```

### 3. `useSearchParams()`: Quản lý Query Parameters (Tìm kiếm, Phân trang, Bộ lọc)
Dùng khi URL có dạng tham số truy vấn: `/products?search=react&sort=asc&page=2`.
```jsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc giá trị trên URL:
  const keyword = searchParams.get("search") || "";

  // Cập nhật giá trị mới lên URL:
  const handleFilter = (newSort) => {
    setSearchParams({ search: keyword, sort: newSort });
  };

  return <div>Từ khóa đang tìm: {keyword}</div>;
}
```

### 4. `useLocation()`: Lấy thông tin URL hiện tại
Dùng để biết người dùng đang đứng ở đường dẫn nào (`pathname`) hoặc nhận dữ liệu truyền ngầm qua `state`.
```jsx
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  console.log("Đường dẫn hiện tại:", location.pathname); // Ví dụ: "/profile"
  return <div>Bạn đang ở đường dẫn: {location.pathname}</div>;
}
```

---

## 6. Tổng kết bảng tra cứu nhanh

| Mục tiêu | Công cụ / Cú pháp |
| :--- | :--- |
| Chuyển trang trong giao diện (không reload) | `<Link to="...">` hoặc `<NavLink to="...">` |
| Làm nổi bật menu đang được chọn | `<NavLink className={({ isActive }) => ...}>` |
| Chuyển trang bằng mã JavaScript | `const navigate = useNavigate(); navigate('/home');` |
| Bắt lỗi đường dẫn không tồn tại (404) | `<Route path="*" element={<NotFound />} />` |
| Vị trí nhét các trang con vào Layout cha | `<Outlet />` |
| Lấy `id` từ đường dẫn `/users/:id` | `const { id } = useParams();` |
| Bắt buộc chuyển hướng trang ngay lập tức | `<Navigate to="/login" replace />` |
