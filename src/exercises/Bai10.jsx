import { useState, useMemo, useCallback } from "react";

// 1. Tạo giả lập danh sách 5.000 học viên ngoài component (chỉ tạo 1 lần duy nhất)
const TOTAL_STUDENTS = 5000;
const RAW_STUDENTS = Array.from({ length: TOTAL_STUDENTS }, (_, i) => ({
  id: i + 1,
  name: `Học viên ${i + 1}`,
  email: `hocvien${i + 1}@gmail.com`,
  score: Math.floor(Math.random() * 41) + 60, // Điểm từ 60 đến 100
}));

// Biến đếm số lần vòng lặp lọc thực sự bị kích hoạt chạy lại
let filterCalculationCount = 0;

export default function Bai10() {
  const [searchTerm, setSearchTerm] = useState("");

  // BẪY DỮ LIỆU: Tính năng độc lập (Đánh dấu "Đã kiểm tra")
  const [isChecked, setIsChecked] = useState(false);

  // =================================================================
  // 1. DÙNG useMemo: Khóa bộ nhớ đệm cho kết quả lọc 5.000 học viên
  // =================================================================
  const filteredStudents = useMemo(() => {
    // Mỗi khi khối code này thực sự chạy lại -> tăng biến đếm
    filterCalculationCount++;

    // Giả lập vòng lặp tính toán nặng qua 5.000 phần tử
    return RAW_STUDENTS.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]); // CHỈ tính toán lại khi 'searchTerm' thay đổi!

  // =================================================================
  // 2. DÙNG useCallback: Khóa bộ nhớ đệm cho hàm xử lý sự kiện
  // =================================================================
  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []); // Hàm này không phụ thuộc gì nên giữ nguyên tham chiếu vĩnh viễn

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* TIÊU ĐỀ & NÚT KIỂM THỬ BẪY DỮ LIỆU */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            Quản lý {TOTAL_STUDENTS.toLocaleString()} Học viên
          </h2>
          <p className="text-xs text-gray-500">
            Tối ưu hiệu năng với <code className="text-blue-600 font-mono">useMemo</code> & <code className="text-blue-600 font-mono">useCallback</code>
          </p>
        </div>

        {/* Nút kiểm thử BẪY DỮ LIỆU: Thao tác nút này KHÔNG ĐƯỢC làm lọc lại 5.000 học viên */}
        <button
          onClick={() => setIsChecked((prev) => !prev)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
            isChecked
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          <span>{isChecked ? "✓ Đã kiểm tra" : "○ Chưa kiểm tra"}</span>
        </button>
      </div>

      {/* BẢNG THEO DÕI HIỆU NĂNG TRỰC QUAN */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 font-semibold">Kết quả tìm kiếm:</p>
          <p className="text-lg font-bold text-blue-950 font-mono">
            {filteredStudents.length.toLocaleString()} học viên
          </p>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 font-semibold">Số lần chạy vòng lặp lọc:</p>
          <p className="text-lg font-bold text-amber-950 font-mono">
            {filterCalculationCount} lần
          </p>
        </div>
      </div>

      {/* Ô TÌM KIẾM */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên hoặc email trong 5.000 học viên..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-blue-500 bg-white"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-0.5 rounded cursor-pointer"
          >
            ✕ Xóa
          </button>
        )}
      </div>

      {/* DANH SÁCH HIỂN THỊ (Hiện 10 học viên đầu tiên để tối ưu DOM) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 flex justify-between">
          <span>HỌ TÊN HỌC VIÊN</span>
          <span>ĐIỂM SỐ</span>
        </div>
        <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto text-xs text-gray-700">
          {filteredStudents.slice(0, 15).map((student) => (
            <li key={student.id} className="p-2.5 flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-semibold text-gray-800">{student.name}</p>
                <p className="text-[11px] text-gray-400">{student.email}</p>
              </div>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {student.score}đ
              </span>
            </li>
          ))}
          {filteredStudents.length > 15 && (
            <li className="p-2.5 text-center text-gray-400 text-[11px] bg-gray-50 italic">
              ...và còn {(filteredStudents.length - 15).toLocaleString()} học viên khác phù hợp
            </li>
          )}
          {filteredStudents.length === 0 && (
            <li className="p-6 text-center text-red-500 italic">
              Không tìm thấy học viên nào khớp với "{searchTerm}"
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
