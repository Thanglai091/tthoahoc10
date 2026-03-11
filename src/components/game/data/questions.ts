// ============================================================
// Dữ liệu câu hỏi cho tất cả mini-games
// Nội dung: Phản Ứng Cháy Nổ - Hóa học THPT
// ============================================================

export interface QuizOption {
  text: string;
  correct: boolean;
  explanation: string;
}

export interface Game1Question {
  id: number;
  scenario: string;
  question: string;
  icon: string;
  options: QuizOption[];
}

export interface Game2Item {
  id: number;
  text: string;
  icon: string;
  type: "vatLy" | "hoaHoc" | "bui";
}

export interface SpeedOption {
  text: string;
  correct: boolean;
}

export interface Game3Question {
  id: number;
  question: string;
  options: SpeedOption[];
}

export interface TempItem {
  id: number;
  name: string;
  temp: string;
  tempValue: number;
  icon: string;
  category: string;
  color: string;
}

export interface TrueFalseQuestion {
  id: number;
  statement: string;
  icon: string;
  isTrue: boolean;
  explanation: string;
}

// ============================================================
// GAME 1: Tam Giác Lửa - Quiz dập lửa (5 câu)
// ============================================================
export const game1Questions: Game1Question[] = [
  {
    id: 1,
    scenario: "Bếp Gas Bùng Cháy",
    question: "Lửa bùng lên từ bếp gas rò rỉ! Biện pháp nào đúng nhất để dập tắt an toàn?",
    icon: "🍳",
    options: [
      { text: "Đổ nước vào ngọn lửa ngay lập tức", correct: false, explanation: "❌ Nước làm văng lửa xung quanh - nguy hiểm hơn!" },
      { text: "Khóa van bình gas, loại bỏ chất cháy", correct: true, explanation: "✅ Loại bỏ chất cháy → tam giác lửa mất đỉnh, lửa tắt!" },
      { text: "Dùng quạt thổi mạnh cho lửa tắt", correct: false, explanation: "❌ Thổi = cung cấp thêm O₂ = lửa to hơn nhiều!" },
      { text: "Mở hết cửa sổ cho thoáng gió", correct: false, explanation: "❌ Oxygen nhiều = lửa cháy mạnh hơn!" },
    ],
  },
  {
    id: 2,
    scenario: "Cháy Xăng Dầu",
    question: "Bình xăng trong kho bốc cháy! Tại sao KHÔNG được đổ nước để dập?",
    icon: "⛽",
    options: [
      { text: "Xăng nổi trên nước và lan rộng hơn", correct: true, explanation: "✅ Đúng! Xăng nhẹ hơn nước → nổi lên → lửa lan khắp nơi. Dùng bình CO₂!" },
      { text: "Nước và xăng xảy ra phản ứng hóa học mạnh", correct: false, explanation: "❌ Không có phản ứng hóa học giữa xăng và nước" },
      { text: "Nước sẽ làm tắt lửa rất nhanh chóng", correct: false, explanation: "❌ Nước không hiệu quả với cháy xăng dầu" },
      { text: "Sợ nước bị vào bình xăng gây hỏng", correct: false, explanation: "❌ Đây không phải lý do an toàn cốt lõi" },
    ],
  },
  {
    id: 3,
    scenario: "Cháy Điện",
    question: "Cầu dao điện đang bốc lửa! Phương án nào an toàn nhất?",
    icon: "⚡",
    options: [
      { text: "Đổ nước vào cầu dao để dập nhanh", correct: false, explanation: "❌ Nước dẫn điện → bị điện giật ngay lập tức! Cực kỳ nguy hiểm!" },
      { text: "Dùng tay có găng tay cao su để dập", correct: false, explanation: "❌ Quá nguy hiểm - cần dụng cụ chuyên dụng PCCC!" },
      { text: "Ngắt cầu dao tổng, dùng bình chữa cháy CO₂", correct: true, explanation: "✅ Cắt nguồn điện trước! CO₂ không dẫn điện - hoàn toàn an toàn!" },
      { text: "Bỏ chạy ngay khỏi hiện trường", correct: false, explanation: "❌ Lửa sẽ lan! Phải ngắt điện và dập lửa trước khi sơ tán!" },
    ],
  },
  {
    id: 4,
    scenario: "Ngưỡng Oxygen",
    question: "O₂ trong không khí phải giảm xuống dưới bao nhiêu % thì hầu hết phản ứng cháy đều ngừng?",
    icon: "💨",
    options: [
      { text: "21% (mức bình thường không khí)", correct: false, explanation: "❌ 21% là mức O₂ bình thường - cháy tốt!" },
      { text: "18% (giảm nhẹ)", correct: false, explanation: "❌ Ở 18% vẫn còn đủ O₂ để duy trì nhiều đám cháy" },
      { text: "14% (hầu hết ngừng cháy)", correct: true, explanation: "✅ Đúng! Dưới 14% O₂, hầu hết đám cháy tự tắt. (Trừ H₂ - vẫn cháy ở 5%!)" },
      { text: "5% (chỉ còn rất ít)", correct: false, explanation: "❌ 5% là ngưỡng đặc biệt chỉ của Hydrogen" },
    ],
  },
  {
    id: 5,
    scenario: "Cháy Rừng Amazon",
    question: "Cháy rừng Amazon gây ra hậu quả nghiêm trọng nào liên quan đến khí hóa học?",
    icon: "🌲",
    options: [
      { text: "Tạo ra H₂SO₄ gây mưa axit toàn cầu", correct: false, explanation: "❌ Mưa axit chủ yếu từ SO₂ và NOₓ trong công nghiệp" },
      { text: "Phát thải CO₂, CO, HCN... gây hiệu ứng nhà kính và ô nhiễm", correct: true, explanation: "✅ Cháy rừng phát thải CO₂ (nhà kính) + nhiều khí độc hại khác!" },
      { text: "Phá hủy tầng ozone bằng khí CFC", correct: false, explanation: "❌ CFC từ các thiết bị lạnh, không từ cháy rừng" },
      { text: "Không ảnh hưởng đến khí hậu toàn cầu", correct: false, explanation: "❌ Amazon lưu trữ 2 tỷ tấn CO₂/năm - cháy = thảm họa khí hậu!" },
    ],
  },
];

// ============================================================
// GAME 2: Phân Loại Nổ - Phân loại 9 tình huống
// ============================================================
export const game2Items: Game2Item[] = [
  { id: 1, text: "Nổ nồi áp suất khi đun nấu", icon: "🫕", type: "vatLy" },
  { id: 2, text: "Nổ lốp xe bị bơm quá căng", icon: "🚗", type: "vatLy" },
  { id: 3, text: "Nổ bình gas rò rỉ gặp lửa", icon: "💥", type: "hoaHoc" },
  { id: 4, text: "Nổ thuốc nổ TNT", icon: "💣", type: "hoaHoc" },
  { id: 5, text: "Nổ ruột phích đựng nước nóng", icon: "☕", type: "vatLy" },
  { id: 6, text: "Nổ bụi bột mì trong nhà máy", icon: "🌾", type: "bui" },
  { id: 7, text: "Hỗn hợp H₂ + O₂ phát nổ", icon: "⚗️", type: "hoaHoc" },
  { id: 8, text: "Nổ bụi than trong hầm mỏ", icon: "⛏️", type: "bui" },
  { id: 9, text: "Nổ chai nước ngọt bị lắc mạnh", icon: "🥤", type: "vatLy" },
];

export const game2Categories = {
  vatLy: { label: "Nổ Vật Lý", color: "#3b82f6", bg: "rgba(59,130,246,0.15)", description: "Không có phản ứng hóa học" },
  hoaHoc: { label: "Nổ Hóa Học", color: "#ef4444", bg: "rgba(239,68,68,0.15)", description: "Có phản ứng hóa học" },
  bui: { label: "Nổ Bụi", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", description: "Bụi mịn + O₂ + không gian kín" },
};

// ============================================================
// GAME 3: 60 Giây Sinh Tử - Speed quiz (15 câu)
// ============================================================
export const game3Questions: Game3Question[] = [
  {
    id: 1,
    question: "Điểm chớp nháy của xăng là bao nhiêu?",
    options: [
      { text: "-43°C", correct: true },
      { text: "13°C", correct: false },
      { text: "38°C", correct: false },
      { text: "247°C", correct: false },
    ],
  },
  {
    id: 2,
    question: "Ethanol (cồn) có điểm chớp nháy là?",
    options: [
      { text: "-43°C", correct: false },
      { text: "13°C", correct: true },
      { text: "38°C", correct: false },
      { text: "160°C", correct: false },
    ],
  },
  {
    id: 3,
    question: "Điều kiện nào KHÔNG bắt buộc để phản ứng cháy xảy ra?",
    options: [
      { text: "Chất cháy (nhiên liệu)", correct: false },
      { text: "Chất oxy hóa (O₂)", correct: false },
      { text: "Có nước", correct: true },
      { text: "Nguồn nhiệt khơi mào", correct: false },
    ],
  },
  {
    id: 4,
    question: "Nổ bụi bột ngũ cốc trong nhà máy là loại nổ gì?",
    options: [
      { text: "Nổ vật lý", correct: false },
      { text: "Nổ hóa học thông thường", correct: false },
      { text: "Nổ bụi", correct: true },
      { text: "Không phải nổ", correct: false },
    ],
  },
  {
    id: 5,
    question: "Nhiệt độ tự bốc cháy của xăng là bao nhiêu?",
    options: [
      { text: "100–150°C", correct: false },
      { text: "247–280°C", correct: true },
      { text: "426°C", correct: false },
      { text: "500°C", correct: false },
    ],
  },
  {
    id: 6,
    question: "Khí nào vẫn cháy khi O₂ trong không khí chỉ còn 5%?",
    options: [
      { text: "Methane (CH₄)", correct: false },
      { text: "Carbon monoxide (CO)", correct: false },
      { text: "Hydrogen (H₂)", correct: true },
      { text: "Propane (C₃H₈)", correct: false },
    ],
  },
  {
    id: 7,
    question: "Dầu diesel sinh học có điểm chớp nháy là bao nhiêu?",
    options: [
      { text: "38–72°C", correct: false },
      { text: "100°C", correct: false },
      { text: "160°C", correct: true },
      { text: "247°C", correct: false },
    ],
  },
  {
    id: 8,
    question: "Acetylene (khí đất đèn) cháy đạt nhiệt độ ngọn lửa tối đa?",
    options: [
      { text: "1963°C", correct: false },
      { text: "2100°C", correct: false },
      { text: "2334°C", correct: true },
      { text: "3000°C", correct: false },
    ],
  },
  {
    id: 9,
    question: "Methane cháy trong không khí đạt nhiệt độ ngọn lửa tối đa?",
    options: [
      { text: "1200°C", correct: false },
      { text: "1963°C", correct: true },
      { text: "2334°C", correct: false },
      { text: "2800°C", correct: false },
    ],
  },
  {
    id: 10,
    question: "Chất lỏng có điểm chớp nháy dưới 37.8°C được gọi là gì?",
    options: [
      { text: "Chất lỏng nguy hiểm", correct: false },
      { text: "Chất lỏng dễ cháy", correct: true },
      { text: "Chất lỏng có thể gây cháy", correct: false },
      { text: "Chất lỏng không cháy", correct: false },
    ],
  },
  {
    id: 11,
    question: "Nổ bụi cần thỏa bao nhiêu điều kiện?",
    options: [
      { text: "3 điều kiện", correct: false },
      { text: "4 điều kiện", correct: false },
      { text: "5 điều kiện", correct: true },
      { text: "2 điều kiện", correct: false },
    ],
  },
  {
    id: 12,
    question: "Nguyên nhân chính nào khiến bóng bay hydrogen nguy hiểm?",
    options: [
      { text: "Helium bên trong có độc", correct: false },
      { text: "H₂ + O₂ tạo hỗn hợp nổ, rất dễ kích nổ", correct: true },
      { text: "Bóng quá căng tạo áp suất cao", correct: false },
      { text: "Hydrogen nặng hơn không khí", correct: false },
    ],
  },
  {
    id: 13,
    question: "Phản ứng cháy về bản chất là loại phản ứng nào?",
    options: [
      { text: "Phản ứng tổng hợp", correct: false },
      { text: "Phản ứng oxi hóa – khử", correct: true },
      { text: "Phản ứng phân hủy", correct: false },
      { text: "Phản ứng trao đổi ion", correct: false },
    ],
  },
  {
    id: 14,
    question: "Nổ vật lý có đặc điểm gì khác nổ hóa học?",
    options: [
      { text: "Tạo ra chất hóa học mới", correct: false },
      { text: "Tỏa ra nhiệt rất lớn", correct: false },
      { text: "Không có phản ứng hóa học xảy ra", correct: true },
      { text: "Cần oxy để xảy ra", correct: false },
    ],
  },
  {
    id: 15,
    question: "Vì sao xăng cần bảo quản cẩn thận hơn dầu hỏa?",
    options: [
      { text: "Xăng đắt hơn dầu hỏa", correct: false },
      { text: "Điểm chớp nháy xăng (-43°C) thấp hơn nhiều so với dầu hỏa", correct: true },
      { text: "Xăng nặng hơn dầu hỏa", correct: false },
      { text: "Dầu hỏa ít bay hơi hơn", correct: false },
    ],
  },
];

// ============================================================
// GAME 4: Sắp Xếp Nhiệt Độ - Click theo thứ tự đúng
// ============================================================
export const game4Items: TempItem[] = [
  {
    id: 1,
    name: "Xăng",
    temp: "−43°C",
    tempValue: -43,
    icon: "⛽",
    category: "Điểm chớp nháy",
    color: "#ef4444",
  },
  {
    id: 2,
    name: "Ethanol",
    temp: "13°C",
    tempValue: 13,
    icon: "🧪",
    category: "Điểm chớp nháy",
    color: "#f97316",
  },
  {
    id: 3,
    name: "Dầu Hỏa",
    temp: "38–72°C",
    tempValue: 55,
    icon: "🪔",
    category: "Điểm chớp nháy",
    color: "#eab308",
  },
  {
    id: 4,
    name: "Dầu Diesel\nSinh Học",
    temp: "160°C",
    tempValue: 160,
    icon: "🚛",
    category: "Điểm chớp nháy",
    color: "#22c55e",
  },
];

// ============================================================
// GAME 5: Đúng Hay Sai - True/False rapid fire (10 câu)
// ============================================================
export const game5Questions: TrueFalseQuestion[] = [
  {
    id: 1,
    statement: "Xăng có điểm chớp nháy thấp hơn dầu hỏa nhiều lần",
    icon: "⛽",
    isTrue: true,
    explanation: "Đúng! Xăng: −43°C so với Dầu hỏa: 38–72°C",
  },
  {
    id: 2,
    statement: "Có thể dùng nước để dập tắt đám cháy xăng dầu",
    icon: "💧",
    isTrue: false,
    explanation: "Sai! Xăng nổi trên nước → lửa lan khắp nơi. Dùng CO₂ hoặc bột chữa cháy!",
  },
  {
    id: 3,
    statement: "Hydrogen vẫn cháy khi O₂ trong không khí giảm xuống 5%",
    icon: "🎈",
    isTrue: true,
    explanation: "Đúng! H₂ rất dễ cháy, cháy được ở ngưỡng O₂ rất thấp (5%)",
  },
  {
    id: 4,
    statement: "Nổ nồi áp suất khi đun nấu là loại nổ hóa học",
    icon: "🫕",
    isTrue: false,
    explanation: "Sai! Đây là nổ VẬT LÝ — giãn nở thể tích đột ngột, không có phản ứng hóa học",
  },
  {
    id: 5,
    statement: "Phản ứng cháy cần đủ 3 điều kiện: chất cháy, O₂, mồi lửa",
    icon: "🔺",
    isTrue: true,
    explanation: "Đúng! Đây là 'Tam Giác Lửa' — thiếu 1 trong 3 là lửa tắt!",
  },
  {
    id: 6,
    statement: "Bụi đường ăn (bột đường) có thể gây ra vụ nổ bụi",
    icon: "🍬",
    isTrue: true,
    explanation: "Đúng! Bột đường là vật liệu hữu cơ mịn, đủ điều kiện là gây nổ bụi",
  },
  {
    id: 7,
    statement: "Ngọn lửa acetylene nóng hơn ngọn lửa methane",
    icon: "🔥",
    isTrue: true,
    explanation: "Đúng! Acetylene: 2334°C, Methane: 1963°C — acetylene nóng hơn nhiều",
  },
  {
    id: 8,
    statement: "Cháy rừng không ảnh hưởng đến hiệu ứng nhà kính",
    icon: "🌲",
    isTrue: false,
    explanation: "Sai! Amazon lưu trữ 2 tỷ tấn CO₂/năm — cháy rừng làm tăng mạnh hiệu ứng nhà kính",
  },
  {
    id: 9,
    statement: "Nổ bụi xảy ra khi có đủ 5 điều kiện cụ thể",
    icon: "💫",
    isTrue: true,
    explanation: "Đúng! Gồm: bụi mịn, nồng độ đủ, O₂, nguồn nhiệt, không gian kín",
  },
  {
    id: 10,
    statement: "Khí helium (He) có thể thay thế hydrogen bơm bóng bay an toàn hơn",
    icon: "🎈",
    isTrue: true,
    explanation: "Đúng! He là khí trơ, không cháy, không nổ — an toàn tuyệt đối để bơm bóng bay",
  },
];
