# ViGuard Intelligence

Understand the message. Uncover the threat.

Website thống nhất cho ViGuard ML Engine (Vietnamese SMS classification) và Lab03 SmishX Agent Engine (LLM-based SMS phishing detection). Hai engine, taxonomy và hai research areas độc lập; kết quả và bằng chứng luôn có nguồn rõ ràng.

Canonical workspace: `D:\HCMUS\HK7\ML\Web\web-application-Vigurad`. Giữ repository GitHub hiện tại. Website cũ chỉ là nguồn tham khảo để tái sử dụng có chọn lọc sau này.

## Trạng thái

P0.1, P0.2 + P0.3, Phase 1 và Phase 1.5 **technically ACCEPTED**. Giữ Palette A — Tidal Observatory và **Signal Field**. P3.1 Production Home được chuyển lên trước Phase 2, đã triển khai và **chờ Project Owner design review**; technical acceptance không đồng nghĩa Design Quality được duyệt. Academic scope gate vẫn **OPEN**.

Home có cinematic Signal Field, SMS reading study có nhãn hư cấu, hai engine độc lập, hành trình sử dụng, research editorial và CTA/footer. Navigation có mobile menu. Scanner/Investigation/Research vẫn là placeholders; không có backend/API/inference. Playground dev-only `/__motion` giữ A/B/C và motion foundation.

## Chạy frontend local

Node hiện kiểm chứng: 24.12.0. Từ repository root trong PowerShell:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Mở `http://127.0.0.1:5173/`; foundation review tại `http://127.0.0.1:5173/__motion` (chỉ development, không xuất hiện ở production). Fonts đóng gói local qua Fontsource, hỗ trợ latin/vietnamese; license SIL OFL trong `frontend/public/licenses/`. Không cần CDN hoặc backend.

```powershell
# Từ frontend/, tải Chromium local nếu chưa có:
npm.cmd run browser:install
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test:browser
npm.cmd run build
npm.cmd run preview
```

Production preview tại `http://127.0.0.1:4173/`. Browser tests tự khởi động/reuse dev server; test production exclusion cần chạy preview sau build. Chromium nằm trong `node_modules/.cache/ms-playwright`; screenshots/report nằm trong `test-results`/`playwright-report` và được ignore. Bộ kiểm tra có 23 Chromium tests (17 regression + 6 Home). Full-page/hero desktop/mobile và video mới ở `frontend/test-results/home-review/`; output được tái tạo khi chạy tests. Kết quả và giới hạn trong STATUS; không phải chứng nhận accessibility hoặc hiệu năng toàn diện.

## Định hướng kỹ thuật

React + TypeScript + Vite, Tailwind/shadcn primitives; Motion + CSS/SVG và native scrolling mặc định. Backend Python + FastAPI theo Modular Monolith + Engine Adapter Pattern. ECharts cho charts, React Flow cho pipeline khi tới phase phù hợp. Model/training và Lab03 reproduction phát triển riêng; website chỉ tích hợp pipeline/artifacts có provenance, không training model mới.

MVP mục tiêu gồm Home cinematic nhẹ, Scanner Quick/Deep/Compare, Investigation/evidence và hai khu vực Research. Demo phải ghi nhãn; thiếu engine hiển thị not-ready, không giả kết quả. Palette và art direction cần Project Owner duyệt trước production.

## Tài liệu

- [Master Plan v1.1](docs/MASTER_PLAN.md): source of truth.
- [Product Brief](docs/PRODUCT_BRIEF.md): scope tạm thời, user flows và acceptance criteria.
- [Roadmap](docs/ROADMAP.md): phase/gates, bao gồm Color Research bắt buộc.
- [Status](docs/STATUS.md): trạng thái, quyết định và blockers hiện tại.
- [Discovery Report](docs/DISCOVERY_REPORT.md): snapshot P0.1 đã được chấp nhận; các trạng thái lịch sử giữ nguyên.
- [Agent workflow](AGENTS.md): quy tắc làm việc và GitNexus.

Secrets, SMS riêng tư, model lớn và tài liệu tham khảo chưa xác nhận quyền công bố không đưa vào Git. Hai PDF local trong `docs/references/` được giữ tại máy, mặc định ignored; người clone repo cần nguồn tài liệu được phép chia sẻ từ Project Owner. Không commit/push ở checkpoint hiện tại.
