import { useState } from "react";

export default function Bai01() {
  // 1. Dùng useState thay cho biến thường để React vẽ lại giao diện khi state đổi
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Dữ liệu mô tả (Bạn thử đổi thành "" để kiểm tra nút có bị vô hiệu hóa không nhé)
  const detail = "Nội dung mô tả chi tiết của khóa học ReactJS từ cơ bản đến nâng cao...";
  const shortDesc = "Mô tả ngắn gọn: Khóa học ReactJS căn bản...";

  // 3. Xử lý "bẫy dữ liệu": kiểm tra xem mô tả chi tiết có rỗng không
  const hasDetail = detail.trim() !== "";

  // 4. Hàm đảo ngược trạng thái (true <-> false)
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Mô tả khóa học</h2>

      {/* Hiển thị chi tiết hoặc ngắn gọn tùy theo isExpanded */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {isExpanded ? detail : shortDesc}
      </p>

      {/* Nút bấm: tự động khóa (disabled) nếu hasDetail là false */}
      <button
        onClick={toggleDescription}
        disabled={!hasDetail}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
      >
        {isExpanded ? "Thu gọn" : "Xem chi tiết"}
      </button>
    </div>
  );
}
