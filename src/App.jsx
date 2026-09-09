import { useState } from "react";
import Bai01 from "./exercises/Bai01";
import Bai02 from "./exercises/Bai02";
import Bai03 from "./exercises/Bai03";
import Bai04 from "./exercises/Bai04";
import Bai06 from "./exercises/Bai06";
import Bai07 from "./exercises/Bai07";
import Bai09 from "./exercises/Bai09";

export default function App() {
  const [currentBai, setCurrentBai] = useState(9); // Mặc định mở bài 9 để bạn kiểm tra

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          ReactJS - Luyện tập 10 Bài
        </h1>

        {/* 10 Nút chọn bài */}
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentBai(num)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition cursor-pointer ${
                currentBai === num
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              Bài {num}
            </button>
          ))}
        </div>

        {/* Khu vực hiển thị bài tập */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[250px]">
          {currentBai === 1 && <Bai01 />}
          {currentBai === 2 && <Bai02 />}
          {currentBai === 3 && <Bai03 />}
          {currentBai === 4 && <Bai04 />}
          {currentBai === 6 && <Bai06 />}
          {currentBai === 7 && <Bai07 />}
          {currentBai === 9 && <Bai09 />}
          {(currentBai === 5 || currentBai === 8 || currentBai === 10) && (
            <p className="text-center text-gray-400 py-12">
              Bài {currentBai} chưa làm. Hãy chọn các bài đã làm (1, 2, 3, 4, 6, 7, 9) nhé!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
