import { useRef } from "react";

export default function Bai03() {
  // 1. Ref móc vào ô input Email để điều khiển cuộn và focus
  const emailInputRef = useRef(null);

  // 2. Ref làm "ổ khóa" chống giật lag khi người dùng click liên tục
  const isScrollingRef = useRef(false);

  // 3. Hàm xử lý khi bấm nút "Đăng ký tư vấn ngay" ở chân trang
  const handleScrollToForm = () => {
    // Nếu đang trong quá trình cuộn thì chặn click tiếp theo (chống spam)
    if (isScrollingRef.current) return;

    if (emailInputRef.current) {
      isScrollingRef.current = true; // Khóa lại

      // Cuộn mượt mà đưa ô input lên vị trí giữa màn hình
      emailInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Đặt con trỏ chuột vào ô input (preventScroll để không bị nhảy giật màn hình)
      emailInputRef.current.focus({ preventScroll: true });

      // Mở khóa sau 800ms khi đã cuộn xong
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-12">
      {/* ================= 1. FORM Ở ĐẦU TRANG ================= */}
      <div className="p-6 bg-blue-50 border-2 border-blue-400 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
            Mục tiêu cần cuộn tới
          </span>
          <span className="text-xs text-blue-600 font-medium">Form ở đầu trang</span>
        </div>

        <h3 className="text-lg font-bold text-blue-950">Form Nhận Tư Vấn Khóa Học</h3>
        <p className="text-xs text-blue-700">
          (Khi bấm nút ở cuối trang, màn hình sẽ tự động trượt lên đây và nhấp nháy con trỏ chuột vào ô bên dưới)
        </p>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Địa chỉ Email của bạn:
          </label>
          <input
            ref={emailInputRef} // Móc ref vào đây
            type="email"
            placeholder="vd: nguyenvana@gmail.com"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Chỉ dẫn cho người dùng */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs text-center font-medium animate-pulse">
        👇 Trang đã được kéo dài ra. Bạn hãy <b>lăn chuột xuống tận đáy trang</b> để bấm thử nút nhé!
      </div>

      {/* ================= 2. CÁC ĐOẠN NỘI DUNG Ở GIỮA ĐỂ TẠO KHOẢNG CÁCH DÀI ================= */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-3 shadow-sm">
        <h4 className="font-bold text-gray-800">1. Tổng quan chương trình</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          Chương trình đào tạo được thiết kế chuẩn doanh nghiệp, tập trung 80% thời lượng vào thực hành dự án thực tế. Học viên được đào tạo từ tư duy lập trình đến các kỹ năng nâng cao.
        </p>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-3 shadow-sm">
        <h4 className="font-bold text-gray-800">2. Lộ trình 4 giai đoạn</h4>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>Giai đoạn 1: Nền tảng Frontend vững chắc (HTML5, Modern CSS, ES6+).</li>
          <li>Giai đoạn 2: Làm chủ React Core (Components, Props, State, Virtual DOM).</li>
          <li>Giai đoạn 3: Làm chủ Hooks nâng cao (useRef, useEffect, useMemo, useCallback).</li>
          <li>Giai đoạn 4: Dự án tốt nghiệp và kỹ năng phỏng vấn tuyển dụng.</li>
        </ul>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-3 shadow-sm">
        <h4 className="font-bold text-gray-800">3. Giảng viên và Mentor đồng hành</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          Đội ngũ giảng viên là các Senior Developer với nhiều năm kinh nghiệm tại các tập đoàn công nghệ lớn, hỗ trợ giải đáp 1-1 trong suốt quá trình học tập.
        </p>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-3 shadow-sm">
        <h4 className="font-bold text-gray-800">4. Đồ án tốt nghiệp thực chiến</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          Xây dựng trọn vẹn một ứng dụng Web phân hệ quản trị thực tế (Dashboard, E-commerce, LMS) với đầy đủ xác thực tài khoản, phân quyền và kết nối RESTful API.
        </p>
      </div>

      {/* ================= 3. NÚT Ở CHÂN TRANG (CẦN BẤM ĐỂ CUỘN LÊN ĐẦU) ================= */}
      <div className="p-8 bg-gradient-to-b from-gray-50 to-blue-50 border-2 border-dashed border-blue-300 rounded-2xl text-center space-y-4">
        <p className="text-sm font-semibold text-gray-700">
          📍 Bạn đang ở đáy trang (Form đăng ký đã trôi lên tận trên đầu!)
        </p>
        <p className="text-xs text-gray-500">
          Bấm nút bên dưới để xem trang web <b>tự động lướt ngược lên trên</b> và <b>đặt sẵn con trỏ chuột vào ô Email</b>:
        </p>

        <button
          onClick={handleScrollToForm}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-200 transition-all cursor-pointer active:scale-95"
        >
          🚀 Đăng ký tư vấn ngay (Cuộn lên đầu)
        </button>
      </div>
    </div>
  );
}
