# 📘 GUIDE — Profio Portfolio Nhóm

> Đọc kỹ trước khi bắt đầu code. Làm đúng hướng dẫn này giúp trang của bạn hoạt động tốt khi được tổng hợp vào repo chung.

---

## 1. Cấu trúc folder bắt buộc

Folder nộp của bạn **phải** có cấu trúc sau (đặt tên folder là tên của bạn, viết thường, không dấu, không khoảng trắng):

```
tên-bạn/
├── index.html          ← PHẢI đặt tên này, không đổi
├── css/
│   └── style.css       ← có thể tách nhiều file, nhưng phải có file này
├── js/
│   └── main.js         ← entry point JS
└── assets/
    ├── animations/     ← chứa tất cả file Lottie JSON
    └── images/         ← chứa ảnh đại diện, ảnh dự án
```

**Ví dụ tên folder hợp lệ:** `khang/`, `an/`, `minh-tuan/`, `le-van-a/`

---

## 2. ⚠️ Quy tắc đường dẫn — QUAN TRỌNG NHẤT

Đây là lỗi phổ biến nhất khi tích hợp. **Luôn dùng đường dẫn tương đối** bắt đầu bằng `./`:

| ✅ Đúng | ❌ Sai |
|---|---|
| `./css/style.css` | `/css/style.css` |
| `./assets/images/avatar.jpg` | `C:/Users/tên/...` |
| `./assets/animations/hero.json` | `https://lottiefiles.com/...` |
| `./js/main.js` | `../style.css` (nếu file ở root) |

**Lý do:** Khi folder của bạn được đặt vào `/members/tên-bạn/`, đường dẫn `/css/style.css` sẽ trỏ ra ngoài repo và bị lỗi 404. Còn `./css/style.css` luôn đúng vì nó tương đối với vị trí của `index.html`.

**Kiểm tra nhanh:** Tìm kiếm trong code của bạn, nếu thấy `src="/` hoặc `href="/` thì sửa lại ngay.

---

## 3. File Lottie JSON — phải download về local

```html
<!-- ✅ Đúng — file JSON nằm local trong assets/ -->
<script>
  lottie.loadAnimation({
    container: document.getElementById('hero-lottie'),
    path: './assets/animations/hero.json',  // ← đường dẫn local
    renderer: 'svg',
    loop: true,
    autoplay: true
  });
</script>

<!-- ❌ Sai — link trực tiếp từ LottieFiles sẽ hết hạn -->
<script>
  lottie.loadAnimation({
    path: 'https://assets10.lottiefiles.com/packages/lf20_abc123.json'
  });
</script>
```

**Cách download Lottie JSON:**
1. Vào [lottiefiles.com](https://lottiefiles.com) → tìm animation ưng
2. Filter: **Free** license
3. Click vào animation → nút **Download** → chọn **Lottie JSON**
4. Đặt file vào `./assets/animations/`

---

## 4. Ảnh — phải để local

- Ảnh đại diện: `./assets/images/avatar.jpg` (tối thiểu 400×400px, nền trơn)
- Ảnh dự án: `./assets/images/project-1.png` (tỉ lệ 16:9, chụp screenshot giao diện)
- **Không** dùng link Google Drive, imgur, hay link internet trực tiếp

---

## 5. Thư viện CDN được phép dùng

Copy đoạn này vào `<head>` và cuối `<body>` của `index.html`:

```html
<!-- Trong <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Trước </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.min.js"></script>
```

Bạn cũng có thể dùng thêm thư viện khác nếu muốn.

---

## 6. Checklist 19 tiêu chí

Tự kiểm tra trước khi nộp. Đánh dấu `[x]` vào những mục đã làm xong:

### I. Nội dung Portfolio (3.5 điểm)
- [ ] **#1** Header/Navbar/Banner — có thanh điều hướng, menu link đến đúng section
- [ ] **#2** Giới thiệu bản thân — họ tên, ảnh đại diện, ngành học, vị trí định hướng, đoạn giới thiệu
- [ ] **#3** Mục tiêu nghề nghiệp — trình bày rõ định hướng ngắn/dài hạn
- [ ] **#4** Kỹ năng — các công nghệ với mức độ thành thạo
- [ ] **#5** Học vấn/Kinh nghiệm/Hoạt động — có thông tin học vấn, kinh nghiệm hoặc hoạt động
- [ ] **#6** Dự án cá nhân — **tối thiểu 2 dự án**, có tên, mô tả, công nghệ, link GitHub
- [ ] **#7** Chứng chỉ/Giải thưởng/Sở thích — nếu chưa có ghi "Chưa có"

### II. Thiết kế giao diện HTML/CSS (2.5 điểm)
- [ ] **#8** Cấu trúc HTML rõ ràng — dùng semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] **#9** Layout — Flexbox/Grid hợp lý, bố cục cân đối
- [ ] **#10** Thẩm mỹ — màu sắc, font, khoảng cách thống nhất
- [ ] **#11** Responsive — hiển thị tốt trên Desktop, Tablet, Mobile
- [ ] **#12** CSS3 — có hover, transition, transform, animation hoặc hiệu ứng phù hợp

### III. JavaScript & Tương tác (2.0 điểm)
- [ ] **#13** Xử lý JavaScript — dùng DOM, Event, JavaScript để tạo tương tác
- [ ] **#14** Chức năng tương tác — **tối thiểu 2 chức năng** (VD: dark mode, mobile menu, slideshow, modal, filter, tabs...)
- [ ] **#15** Form liên hệ — có form và kiểm tra dữ liệu bằng JavaScript (không dùng `alert`)

### IV. Chất lượng bài làm (1.0 điểm)
- [ ] **#16** Clean Code — code rõ ràng, thụt lề đúng, đặt tên class/biến hợp lý
- [ ] **#17** Tổ chức source — tách HTML/CSS/JS hợp lý, thư mục rõ ràng
- [ ] **#18** Cá nhân hóa — **tất cả nội dung phải là thông tin thật của bạn**

### V. Sáng tạo (1.0 điểm)
- [ ] **#19** Thiết kế/chức năng nâng cao — có ít nhất 1 điểm sáng tạo riêng ngoài yêu cầu cơ bản

---

## 7. Hướng dẫn test trước khi nộp

**Bước 1 — Test đường dẫn:**
```
Mở VS Code → chuột phải index.html → "Open with Live Server"
```
Nếu không có Live Server, mở file bằng trình duyệt trực tiếp, kiểm tra Console (F12) không có lỗi đỏ.

**Bước 2 — Test responsive:**
- Nhấn F12 → icon điện thoại (Toggle Device Toolbar)
- Test các kích thước: iPhone 12 (390px), iPad (768px), Desktop (1440px)
- Không được có thanh scroll ngang, không vỡ layout

**Bước 3 — Test tính năng:**
- [ ] Dark mode bật/tắt được và nhớ sau khi reload
- [ ] Mobile hamburger menu mở/đóng được
- [ ] Form báo lỗi khi submit thiếu thông tin
- [ ] Tất cả link trong navbar scroll đúng section
- [ ] Lottie animation chạy (không bị lỗi console)

**Bước 4 — Test tích hợp (quan trọng):**
- Copy toàn bộ folder vào một vị trí khác trên máy
- Mở lại `index.html` từ vị trí mới
- Nếu mọi thứ vẫn hoạt động → ✅ sẵn sàng nộp

---

## 8. Cách nộp bài

1. Nén folder của bạn thành file `.zip` — đặt tên: `[tên-bạn]-portfolio.zip`
2. Gửi cho **Khang** qua [kênh liên lạc của nhóm]
3. Kèm theo: ảnh đại diện (nếu chưa có trong folder), link GitHub của bạn

**Deadline nộp:** [Nhóm tự thống nhất — gợi ý cuối ngày 9 kể từ ngày bắt đầu]

---

## 9. Template starter

Trong folder `_template/` của repo có sẵn khung HTML/CSS/JS đầy đủ 7 section.  
Copy folder `_template/`, đổi tên thành tên của bạn, rồi thay nội dung placeholder là xong setup.

```
_template/
├── index.html     ← 7 section đầy đủ, CDN đã import sẵn
├── css/style.css  ← CSS variables, reset, tất cả sections
├── js/main.js     ← Dark mode, Tabs, Modal, Form validation, AOS init
└── assets/
    ├── animations/
    └── images/
```

---

> 💬 Có thắc mắc gì liên hệ **Khang** — người tổng hợp repo.
