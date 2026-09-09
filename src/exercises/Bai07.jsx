import { useState, useEffect } from "react";

// =================================================================
// 1. CUSTOM HOOK: useCountdown (Tái sử dụng logic đếm ngược)
// =================================================================
function useCountdown(initialSeconds = 60) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // BẪY DỮ LIỆU 1: Không chạy nếu chưa bấm start hoặc thời gian đã hết (<= 0)
    if (!isRunning || timeLeft <= 0) return;

    // Hẹn giờ: Cứ mỗi 1 giây (1000ms) thì giảm 1 giây
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Tự động ngắt khi chạm mốc 0
        if (prev <= 1) {
          setIsRunning(false); // Dừng lại
          return 0;            // Giữ ở mức 0, không đếm âm
        }
        return prev - 1;
      });
    }, 1000);

    // BẪY DỮ LIỆU 2: Dọn dẹp bộ nhớ (Cleanup) khi tạm dừng hoặc unmount
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Các phương thức điều khiển theo yêu cầu đề bài
  const start = () => {
    if (timeLeft > 0) setIsRunning(true);
  };
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  // Trả về dữ liệu và các hàm điều khiển
  return { timeLeft, isRunning, start, pause, reset };
}

// =================================================================
// 2. PHÂN HỆ 1: Bài kiểm tra trắc nghiệm (Dùng useCountdown 30s)
// =================================================================
function ExamTimer() {
  const { timeLeft, isRunning, start, pause, reset } = useCountdown(30);

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-sm">📝 Bài thi Trắc nghiệm</h3>
        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">
          30 Giây
        </span>
      </div>

      <div className="text-3xl font-extrabold text-blue-600 font-mono text-center py-2">
        {timeLeft}s
      </div>

      {timeLeft === 0 && (
        <p className="text-xs text-red-500 font-bold text-center">
          Hết giờ nộp bài thi!
        </p>
      )}

      {/* Cụm nút điều khiển: start, pause, reset */}
      <div className="flex gap-2 justify-center pt-1">
        <button
          onClick={start}
          disabled={isRunning || timeLeft === 0}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
        >
          Bắt đầu
        </button>
        <button
          onClick={pause}
          disabled={!isRunning}
          className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
        >
          Tạm dừng
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-xs font-medium hover:bg-gray-700 cursor-pointer"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}

// =================================================================
// 3. PHÂN HỆ 2: Sự kiện Flash Sale (Dùng chung useCountdown 10s)
// =================================================================
function FlashSaleTimer() {
  const { timeLeft, isRunning, start, pause, reset } = useCountdown(10);

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-sm">⚡ Sự kiện Flash Sale</h3>
        <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-semibold">
          10 Giây
        </span>
      </div>

      <div className="text-3xl font-extrabold text-red-600 font-mono text-center py-2">
        {timeLeft}s
      </div>

      {timeLeft === 0 && (
        <p className="text-xs text-red-500 font-bold text-center">
          Flash Sale đã kết thúc!
        </p>
      )}

      {/* Cụm nút điều khiển */}
      <div className="flex gap-2 justify-center pt-1">
        <button
          onClick={start}
          disabled={isRunning || timeLeft === 0}
          className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
        >
          Săn Sale
        </button>
        <button
          onClick={pause}
          disabled={!isRunning}
          className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
        >
          Tạm dừng
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-xs font-medium hover:bg-gray-700 cursor-pointer"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENT CHÍNH BÀI 7
// =================================================================
export default function Bai07() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="border-b border-gray-100 pb-3 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Custom Hook: <code className="text-blue-600">useCountdown</code>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Một Hook logic duy nhất nhưng cung cấp bộ đếm cho cả 2 phân hệ khác nhau
        </p>
      </div>

      {/* Hiển thị 2 phân hệ cạnh nhau để chứng minh tính tái sử dụng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExamTimer />
        <FlashSaleTimer />
      </div>
    </div>
  );
}
