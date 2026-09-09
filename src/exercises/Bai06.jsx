import { BrowserRouter, useSearchParams } from "react-router-dom";

// 1. Danh sách khóa học mẫu để demo
const COURSES = [
  "Khóa học ReactJS căn bản",
  "Khóa học ReactJS nâng cao",
  "Khóa học NodeJS & Express",
  "Khóa học Lập trình Web HTML5 CSS3",
];

function SearchCourse() {
  // 2. useSearchParams giúp đọc và ghi dữ liệu thẳng lên thanh URL
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. Lấy giá trị 'search' từ URL về (nếu chưa có thì là chuỗi rỗng "")
  const search = searchParams.get("search") || "";

  // 4. Hàm xử lý khi người dùng gõ phím vào ô tìm kiếm
  const handleSearch = (e) => {
    const text = e.target.value;

    // XỬ LÝ BẪY DỮ LIỆU:
    // Nếu người dùng xóa hết chữ -> truyền {} để xóa sạch param, không để lại rác "?search="
    if (text.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ search: text });
    }
  };

  // 5. Lọc danh sách: chỉ giữ lại khóa học có chứa từ khóa đang tìm
  const result = COURSES.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow space-y-4 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Danh mục Khóa học</h2>

      {/* Ô nhập tìm kiếm: giá trị tự động lấy theo biến 'search' từ URL */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Gõ từ khóa (vd: react, node)..."
        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
      />

      {/* Dòng quan sát URL để bạn dễ demo cho thầy cô xem */}
      <div className="text-xs bg-gray-50 p-2.5 rounded border border-dashed border-gray-300">
        Tham số URL hiện tại:{" "}
        <span className={search ? "text-blue-600 font-bold" : "text-gray-400 italic"}>
          {search ? `?search=${search}` : "(Đã dọn sạch - Không có ký tự rác)"}
        </span>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      <ul className="divide-y text-sm text-gray-700">
        {result.length > 0 ? (
          result.map((courseName, index) => (
            <li key={index} className="py-2 flex items-center gap-2">
              <span className="text-blue-500">•</span> {courseName}
            </li>
          ))
        ) : (
          <li className="py-4 text-center text-red-500 text-xs italic">
            Không tìm thấy khóa học nào phù hợp!
          </li>
        )}
      </ul>
    </div>
  );
}

// Bọc BrowserRouter để useSearchParams hoạt động
export default function Bai06() {
  return (
    <BrowserRouter>
      <SearchCourse />
    </BrowserRouter>
  );
}
