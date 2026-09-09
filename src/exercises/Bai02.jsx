import { useState, useEffect } from "react";

export default function Bai02() {
  // Bắt đầu từ 60 giây (bạn có thể đổi thành 10 để test cho nhanh)
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // 1. Xử lý "Bẫy dữ liệu": Nếu thời gian đã về 0 thì DỪNG HẲN, không đếm tiếp
    if (timeLeft <= 0) return;

    // 2. Hẹn giờ: Sau 1 giây (1000ms) thì giảm đi 1 giây
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // 3. Dọn dẹp (Cleanup): Hủy timer cũ trước khi tạo timer mới (chống tràn RAM)
    return () => clearTimeout(timer);
  }, [timeLeft]); // 4. Dependency Array: Chỉ chạy lại effect khi timeLeft thay đổi

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow space-y-4 text-center border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Đồng hồ đếm ngược bài thi</h2>

      {/* Hiển thị số giây còn lại */}
      <div className="text-4xl font-extrabold text-blue-600 font-mono py-4">
        {timeLeft > 0 ? `${timeLeft}s` : "0s"}
      </div>

      {/* Thông báo trạng thái */}
      {timeLeft === 0 ? (
        <p className="text-red-500 font-semibold bg-red-50 py-2 rounded-lg">
          Hết giờ làm bài! Hệ thống đã dừng tính toán.
        </p>
      ) : (
        <p className="text-gray-500 text-sm">
          Thời gian thi còn lại: <span className="font-bold">{timeLeft}</span> giây
        </p>
      )}

      {/* Nút bấm để thử lại */}
      <button
        onClick={() => setTimeLeft(10)} // Thử lại với 10 giây cho nhanh
        className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-black cursor-pointer transition"
      >
        Đặt lại 10 giây (để test nhanh)
      </button>
    </div>
  );
}
