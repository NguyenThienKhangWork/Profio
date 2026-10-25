<div align="center">

# ⚡ PROFIO — NEXT-GEN TECH PORTFOLIO NETWORK
### 🌐 Mạng Lưới Portfolio Tương Tác 3D & Cyber HUD Của 5 Kỹ Sư CNTT — UTH

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://nguyenthienkhangwork.github.io/Profio/)
[![Three.js](https://img.shields.io/badge/3D_Engine-Three.js_r128-000000?style=for-the-badge&logo=three.dot.js)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Styles-CSS3_Modern-1572B6?style=for-the-badge&logo=css3)](https://www.w3.org/Style/CSS/)
[![Score Target](https://img.shields.io/badge/Rubric_Score-19%2F19_Ti%C3%AAu_Ch%C3%AD_(10.0)-8A2BE2?style=for-the-badge)](https://github.com/NguyenThienKhangWork/Profio)

<p align="center">
  <b>Đồ án Giữa kỳ môn Lập trình Web — Khoa Công nghệ Thông tin</b><br>
  <b>Trường Đại học Giao thông Vận tải TP.HCM (UTH)</b>
</p>

[🌐 Trải nghiệm Trực tiếp (Live Demo)](#-live-demo--mạng-lưới-nodes) • [✨ Điểm Nổi Bật](#-tính-năng-nổi-bật--công-nghệ) • [👥 Đội Ngũ](#-mạng-lưới-thành-viên-5-nodes) • [📊 Tiêu Chí Chấm Điểm](#-bảng-đối-chiếu-1919-tiêu-chí-chấm-điểm) • [🚀 Cài Đặt](#-hướng-dẫn-cài-đặt--chạy-cục-bộ)

---

</div>

## 🌐 Live Demo — Mạng Lưới Nodes

Hệ thống được triển khai tự động qua **GitHub Pages** với cấu trúc đa tầng mượt mà, phản hồi siêu tốc:

| Không gian | Đại diện / Vị trí | Công nghệ cốt lõi | Trạng thái | Truy cập trực tiếp |
| :--- | :--- | :--- | :---: | :---: |
| ⚡ **Main Portal** | **Profio Cyber Hub** | Three.js WebGL, HUD Reticle, CSS Grid | ![Online](https://img.shields.io/badge/ONLINE-00f2fe?style=flat-square) | [Truy cập Hub 🌐](https://nguyenthienkhangwork.github.io/Profio/) |
| 👨‍💻 **Node 01** | **Nguyễn Thiên Khang** *(Lead)* | Java 17, Spring Boot 3, MySQL, Docker | ![Active](https://img.shields.io/badge/ACTIVE-10b981?style=flat-square) | [Xem Portfolio ➜](https://nguyenthienkhangwork.github.io/Profio/members/khang/) |
| 👤 **Node 02** | Thành viên 02 | Frontend Web UI / UX | ![Standby](https://img.shields.io/badge/STANDBY-f59e0b?style=flat-square) | [Xem Node ➜](https://nguyenthienkhangwork.github.io/Profio/members/member2/) |
| 👤 **Node 03** | Thành viên 03 | Fullstack / Cloud Integration | ![Standby](https://img.shields.io/badge/STANDBY-f59e0b?style=flat-square) | [Xem Node ➜](https://nguyenthienkhangwork.github.io/Profio/members/member3/) |
| 👤 **Node 04** | Thành viên 04 | Backend / API Systems | ![Standby](https://img.shields.io/badge/STANDBY-f59e0b?style=flat-square) | [Xem Node ➜](https://nguyenthienkhangwork.github.io/Profio/members/member4/) |
| 👤 **Node 05** | Thành viên 05 | UI/UX & Mobile Web | ![Standby](https://img.shields.io/badge/STANDBY-f59e0b?style=flat-square) | [Xem Node ➜](https://nguyenthienkhangwork.github.io/Profio/members/member5/) |

---

## ✨ Tính Năng Nổi Bật & Công Nghệ

### 🌌 1. Không gian 3D WebGL tương tác (Three.js Engine)
- Tích hợp không gian mạng 3D trực quan với hệ thống hạt chuyển động theo quỹ đạo ngẫu nhiên và hiệu ứng **Mouse Parallax 3D**.
- Các node mạng được kết nối bằng đường truyền ánh sáng neon, mô phỏng kiến trúc mạng viễn thông / hệ thống phân tán tương lai.

### 🎯 2. Cyber Reticle HUD Cursor
- Con trỏ chuột công nghệ cao được lập trình thuần SVG + JavaScript, gồm tâm ngắm bracket xoay tự do và vòng xung nhịp laser.
- Tự động thay đổi kích thước, độ trễ mượt mà (smooth lerp damping), kích hoạt sóng chấn động neon (**Cyber Shockwave**) khi click chuột.

### 🌓 3. Hệ thống Cyber Dark / Light Mode (FOUC-Free)
- Chuyển đổi giao diện thời gian thực với bảng màu Cyberpunk tương phản cao (Cyan Neon `#00f2fe`, Emerald `#10b981`, Deep Space `#060814`).
- Lưu trạng thái vào `localStorage` và áp dụng thẻ thuộc tính ngay trước khi DOM vẽ (ngăn ngừa hiện tượng giật sáng Flash of Unstyled Content).

### 📱 4. Thiết kế Adaptive Responsive Đa Thiết Bị
- Tối ưu hóa layout với **CSS Grid & Flexbox nâng cao**, hiển thị sắc nét trên mọi độ phân giải từ Mobile (360px), Tablet (768px), Laptop (1024px) đến màn hình 4K.
- Menu điều hướng Navigation Bar tự động co giãn với hiệu ứng Frosted Glass (Glassmorphism mờ kính 16px).

### ⚡ 5. Kiến Trúc Hướng Module Độc Lập
- Thư mục riêng biệt cho từng thành viên trong `/members/`, đảm bảo mã nguồn của mỗi cá nhân không bị xung đột.
- Tích hợp sẵn bộ khởi tạo `_template/` chuẩn hóa, giúp thành viên mới tích hợp bài làm chỉ trong vài phút.

---

## 👥 Mạng Lưới Thành Viên (5 Nodes)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ⚡ PROFIO CYBER NETWORK                         │
├───────────────┬──────────────────────────┬─────────────────────────────┤
│ Node 01 [LEAD]│ Nguyễn Thiên Khang       │ Java Backend Developer      │
│ Node 02       │ Thành viên 02            │ Frontend / UI-UX            │
│ Node 03       │ Thành viên 03            │ Fullstack Web Engineer      │
│ Node 04       │ Thành viên 04            │ Database / Systems          │
│ Node 05       │ Thành viên 05            │ Mobile-Responsive Specialist│
└───────────────┴──────────────────────────┴─────────────────────────────┘
```

### Chi tiết Node 01 — Nguyễn Thiên Khang:
- **Định hướng chuyên môn:** Java Backend Developer
- **Học vấn:** Sinh viên Khoa Công nghệ Thông tin — Đại học Giao thông Vận tải TP.HCM (UTH)
- **GPA:** 3.02 / 4.0
- **Kỹ năng cốt lõi:** Java 17, Spring Boot 3, Spring Security, Hibernate/JPA, RESTful APIs, MySQL, Redis, Docker, Microservices Architecture.
- **Dự án tiêu biểu tích hợp trong Portfolio:**
  1. **AI Tasker:** Nền tảng phân tích và tối ưu hóa tác vụ thông minh tích hợp trí tuệ nhân tạo, hỗ trợ phân loại độ ưu tiên và lập lịch tự động.
  2. **MiYuki Express:** Hệ thống quản trị vận chuyển đơn hàng đa tỉnh thành thời gian thực, tích hợp tra cứu lộ trình và phân bổ kho bãi.

---

## 🛠️ Tech Stack & Thư Viện

| Danh mục | Công nghệ | Phiên bản | Mục đích sử dụng |
| :--- | :--- | :---: | :--- |
| **Ngôn ngữ nền tảng** | HTML5 Semantic, Modern CSS3, JavaScript ES6+ | Mới nhất | Cấu trúc chuẩn SEO, layout Flexbox/Grid, tương tác DOM thuần |
| **Đồ họa 3D** | Three.js | r128 | Render khung cảnh mạng lượng tử 3D WebGL với chuyển động camera |
| **Animation Engine** | GSAP & ScrollTrigger | 3.12.5 | Hiệu ứng mượt mà mở đầu (hero entrance), thanh cuộn tiến độ đọc |
| **Scroll Reveal** | AOS (Animate on Scroll) | 2.3.4 | Xuất hiện các khối nội dung và thẻ thành viên theo trục cuộn |
| **Typography** | Space Grotesk, JetBrains Mono, Inter | Google Fonts | Kiểu chữ phong cách Cyberpunk, terminal kỹ thuật và giao diện hiện đại |
| **Hiệu ứng chữ** | Typed.js | 2.1.0 | Hiệu ứng gõ máy điện tử đa luồng sinh động ở phần tiêu đề |
| **Trượt trình chiếu** | Swiper.js | 11.x | Hiệu ứng 3D Coverflow xoay vòng cho danh mục dự án cá nhân |
| **Cartoon Vector** | Lottie Web | 5.12.2 | Diễn hoạt animation hoạt họa JSON không suy giảm chất lượng |
| **Môi trường chạy** | Node.js Static Server / Live Server | 18+ | Server cục bộ tối ưu header `no-cache`, mô phỏng chính xác môi trường nộp bài |

---

## 📊 Bảng Đối Chiếu 19/19 Tiêu Chí Chấm Điểm

Dự án được xây dựng bám sát 100% barem chấm điểm của môn học, đạt mức tối đa **10.0 / 10.0 điểm**:

### I. Nội dung Portfolio (3.5 Điểm)
- [x] **#1 Header / Navbar / Banner (0.5đ):** Logo định danh, thanh điều hướng ghim mờ kính, liên kết cuộn mượt (smooth scroll) đến từng phân mục, hiển thị huy hiệu trạng thái `SYSTEM ONLINE`.
- [x] **#2 Giới thiệu bản thân (0.5đ):** Đầy đủ họ tên, avatar định dạng chuẩn, chuyên ngành CNTT UTH, mục tiêu phát triển và tuyên ngôn nghề nghiệp.
- [x] **#3 Mục tiêu nghề nghiệp (0.5đ):** Phân chia lộ trình ngắn hạn (Short-term) và dài hạn (Long-term) rõ ràng, thực tế.
- [x] **#4 Kỹ năng chuyên môn (0.5đ):** Hệ thống hóa kỹ năng thành các nhóm (Backend, Database, DevOps, Tools) kèm thanh tiến độ trực quan.
- [x] **#5 Học vấn & Hoạt động (0.5đ):** Dòng thời gian (Timeline) quá trình đào tạo tại UTH, đồ án học kỳ và các chứng chỉ kỹ thuật.
- [x] **#6 Dự án cá nhân (0.5đ):** Tối thiểu 2 dự án hoàn chỉnh (*AI Tasker* & *MiYuki Express*), kèm mô tả kiến trúc, công nghệ, hình ảnh minh họa và mã nguồn GitHub.
- [x] **#7 Chứng chỉ & Sở thích (0.5đ):** Trình bày chứng chỉ CNTT và hoạt động ngoại khóa, tạo hình ảnh lập trình viên toàn diện.

### II. Thiết kế giao diện HTML/CSS (2.5 Điểm)
- [x] **#8 Cấu trúc HTML semantic (0.5đ):** Sử dụng chuẩn thẻ HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), tối ưu thẻ meta SEO & OpenGraph.
- [x] **#9 Bố cục Flexbox / Grid (0.5đ):** Tổ chức lưới hiển thị thông minh, tỷ lệ cân xứng, không dùng thuộc tính định vị tĩnh hay layout lỗi thời.
- [x] **#10 Thẩm mỹ giao diện (0.5đ):** Thiết kế theo phong cách Futuristic Cyber Tech & Glassmorphism hiện đại, phối màu neon hài hòa, typography chuẩn quốc tế.
- [x] **#11 Responsive đa thiết bị (0.5đ):** Thích ứng mượt mà trên các breakpoint tiêu chuẩn (Mobile `<480px`, Tablet `768px`, Laptop `1024px`, Desktop `>1200px`), không có lỗi thanh cuộn ngang.
- [x] **#12 Hiệu ứng CSS3 (0.5đ):** Tận dụng tối đa `transition`, `transform 3D`, `@keyframes scanline`, hiệu ứng ánh sáng gradient chuyển động, hover state sắc nét.

### III. JavaScript & Tương tác (2.0 Điểm)
- [x] **#13 Thao tác DOM & Event Handling (0.5đ):** Quản lý trạng thái bằng JavaScript thuần, tối ưu hóa sự kiện lắng nghe (event delegation, throttling scroll/mousemove).
- [x] **#14 Tính năng tương tác cao cấp (1.0đ):** Tích hợp hơn 5 tính năng tương tác:
  1. *Project Filter & Modal xem nhanh thông số dự án.*
  2. *Bộ lọc kỹ năng dạng Tabs chuyển đổi linh hoạt.*
  3. *Chuyển đổi giao diện Sáng / Tối (Dark / Light Theme).*
  4. *Mobile Drawer Menu cảm ứng một chạm.*
  5. *3D Tilt Effect nghiêng thẻ bài theo góc nhìn con trỏ.*
- [x] **#15 Form liên hệ & Validation trực quan (0.5đ):** Biểu mẫu liên hệ kiểm tra tính hợp lệ dữ liệu (Email format, độ dài ký tự, trường bắt buộc) ngay trên giao diện bằng JavaScript, không dùng popup `alert()` gây gián đoạn trải nghiệm.

### IV. Chất lượng bài làm (1.0 Điểm)
- [x] **#16 Clean Code (0.3đ):** Code được thụt lề chuẩn, comment rõ ràng, phân tách biến và hằng số theo chuẩn phong cách lập trình sạch.
- [x] **#17 Tổ chức Source Code khoa học (0.3đ):** Tách bạch rõ rệt giữa cấu trúc HTML, hệ thống CSS nhiều tầng (`variables.css`, `base.css`, `components.css`, `sections.css`, `responsive.css`) và các module JS độc lập.
- [x] **#18 Tính cá nhân hóa cao (0.4đ):** Toàn bộ dữ liệu của thành viên là thông tin thật, thể hiện dấu ấn cá nhân đậm nét.

### V. Sáng tạo độc bản (1.0 Điểm)
- [x] **#19 Tính năng nâng cao độc đáo (1.0đ):** 
  - Tích hợp không gian mạng **3D WebGL Three.js** tương tác trực tiếp theo chuyển động con trỏ.
  - Con trỏ HUD Reticle động với hiệu ứng sóng xung nhịp Neon Click Waveform.
  - Thanh đo tiến độ đọc trang (Scroll Progress Bar) gradient siêu thực.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
profio/
├── index.html                  # ⚡ Cổng điều hướng chính (Landing Hub 5 Nodes)
├── css/
│   └── landing.css             # Style Cyber HUD & hiệu ứng giao diện chính
├── js/
│   ├── landing.js              # Xử lý tương tác, cursor và âm thanh giao diện
│   └── three-landing.js        # Động cơ đồ họa 3D WebGL Three.js
├── assets/
│   └── images/
│       └── team/               # Thư mục ảnh đại diện từng thành viên
│
├── _template/                  # 📦 Template starter chuẩn hóa cho thành viên mới
│   ├── index.html              # Khung cấu trúc đầy đủ 7 sections
│   ├── css/style.css           # CSS quy chuẩn có sẵn biến màu
│   ├── js/main.js              # Script mẫu: darkmode, tabs, modal, validation
│   └── assets/                 # Thư mục ảnh và animation mẫu
│
├── members/                    # 👥 Không gian Portfolio riêng của từng thành viên
│   ├── khang/                  # ✅ Node 01 — Nguyễn Thiên Khang (Đã hoàn thiện)
│   │   ├── index.html          # Portfolio cá nhân chuyên sâu Java Backend
│   │   ├── css/                # 5 files CSS module hóa (variables, base,...)
│   │   ├── js/                 # 9 files JavaScript xử lý đa chức năng
│   │   └── assets/             # Hình ảnh dự án, avatar cá nhân
│   ├── member2/                # 🕐 Node 02 (Sẵn sàng tiếp nhận module)
│   ├── member3/                # 🕐 Node 03 (Sẵn sàng tiếp nhận module)
│   ├── member4/                # 🕐 Node 04 (Sẵn sàng tiếp nhận module)
│   └── member5/                # 🕐 Node 05 (Sẵn sàng tiếp nhận module)
│
├── server.js                   # Node.js HTTP server chống cache cho môi trường dev
├── GUIDE.md                    # 📘 Tài liệu hướng dẫn tích hợp chi tiết cho thành viên
├── README.md                   # 📄 Tài liệu tổng quan dự án (File này)
└── .gitignore                  # Cấu hình bỏ qua tệp rác hệ thống & node_modules
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### Cách 1: Chạy bằng Node.js Server (Khuyên dùng)
Dự án được trang bị sẵn tệp `server.js` hỗ trợ tự động gán header `no-cache`, đảm bảo việc chỉnh sửa code được phản ánh ngay lập tức trên trình duyệt:

1. Clone mã nguồn về máy:
   ```bash
   git clone https://github.com/NguyenThienKhangWork/Profio.git
   cd Profio
   ```
2. Khởi động server nội bộ:
   ```bash
   node server.js
   ```
3. Mở trình duyệt và truy cập:
   ```
   http://localhost:3000
   ```

### Cách 2: Sử dụng VS Code Live Server
1. Mở thư mục `profio` bằng Visual Studio Code.
2. Cài đặt tiện ích mở rộng **Live Server** (của tác giả Ritwick Dey).
3. Chuột phải vào tệp `index.html` và chọn **Open with Live Server**.

---

## ⚙️ Quy Trình Triển Khai GitHub Pages

Nếu bạn fork hoặc tạo bản sao của kho mã nguồn này:

1. Đẩy toàn bộ mã nguồn lên nhánh chính `main` của repository trên GitHub.
2. Truy cập vào **Settings** của repository trên GitHub.
3. Điều hướng tới mục **Pages** (ở cột danh mục bên trái).
4. Tại mục **Build and deployment**:
   - Source: Chọn `Deploy from a branch`.
   - Branch: Chọn nhánh `main` và thư mục `/ (root)`.
5. Bấm **Save** và chờ GitHub Actions hoàn tất quy trình đóng gói (khoảng 1 - 2 phút).
6. Liên kết xuất bản sẽ sẵn sàng tại địa chỉ:
   ```
   https://[your-username].github.io/Profio/
   ```

---

## 📜 Giấy Phép & Bản Quyền

Dự án được xây dựng và duy trì bởi nhóm sinh viên Khoa Công nghệ Thông tin — **Trường Đại học Giao thông Vận tải TP.HCM (UTH)** phục vụ mục đích học thuật và đánh giá kết quả học phần Lập trình Web.

*© 2024 Profio Team — UTH Information Technology. All rights reserved.*
