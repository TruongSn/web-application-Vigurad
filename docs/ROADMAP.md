# ViGuard Intelligence — Roadmap

25/11/2026 · Theo [Master Plan v1.1](MASTER_PLAN.md). Checklist chỉ tick khi có evidence; **ACCEPTED** cần Technical Lead/Project Owner xác nhận. P0/P1/P2 feature priorities khác Phase numbers. Không tự chuyển phase hoặc commit/push.

## Phase 0 — Discovery, Scope & Governance

- [x] P0.1 Discovery & Inventory — Technical Lead ACCEPTED theo chỉ thị người dùng.
- [x] Chuẩn bị P0.2 Product Brief với scope tạm thời, boundaries, flows và acceptance criteria.
- [x] Chuẩn bị P0.3 workflow, roadmap/status, README và Git ignore policy tối thiểu.
- [x] Technical Lead review/accept P0.2 + P0.3 — theo chỉ thị giao Phase 1.
- [ ] Academic scope gate: Option, rubric ViGuard, quyền dùng chung website, venue/dataset/protocol và contribution/evaluation alignment được xác nhận.

Deliverable hiện tại: Product Brief + governance docs. Academic gate **OPEN**; cho phép design exploration dưới scope tạm thời sau review/giao việc, không coi toàn bộ Phase 0 đã hoàn tất.

## Phase 1 — Design Research & Art Direction

**ACCEPTED** bởi Technical Lead. Project Owner đã trực tiếp xem [preview](design/preview.html) và chọn **A — Tidal Observatory** vì dễ nhìn hơn. Typography/spacing/layout là implementation baseline; hero production chưa chọn. Browser NOT RUN của Phase 1 là lịch sử; local Playwright foundation verification ở P1.5 đã khắc phục blocker này.

- [x] Nghiên cứu references/UX và visual identity; wireframe Home/Scanner/Investigation/Research desktop/mobile trong Design Brief; Codrops/Awwwards không truy cập được, không claim đã nghiên cứu.
- [x] **Color Research:** Adobe Color, Radix Colors, OKLCH, WCAG; ghi nguồn/rationale, phân biệt nguyên tắc và pixel audit chưa chạy.
- [x] Đề xuất **3 palette khác nhau**, giải thích harmony/phối màu và vai trò brand/neutral/semantic/data visualization; Master Plan chỉ là ứng viên ban đầu.
- [x] Preview cùng bố cục/nội dung cho 3 palette, mixed/light/dark và specimen tiếng Việt; 168 cặp contrast đạt threshold qua tính toán.
- [ ] Browser/manual review readability, glyph rendering, dark/light consistency, responsive và keyboard; NOT RUN, không đồng nghĩa contrast-token checks xác nhận toàn UI.
- [x] Project Owner chọn Palette A; giữ Editorial Cyber Intelligence, baseline tokens/layout và shortlist hero A/B/C. Không coi hero tĩnh là production hero.

Deliverable Phase 1: DESIGN_BRIEF và preview HTML. Hero A/B/C được triển khai ở P1.5.3; sau review Project Owner chọn A — Signal Field.

## Phase 1.5 — Creative Frontend & Motion Foundation

Dependency: Phase 1 shortlist/wireframes; cho phép phần frontend bootstrap tối thiểu từ Phase 2 sau khi được giao, không cần backend/model. Phase 2 tiếp tục sau motion gate.

- [x] P1.5.1: React/TS/Vite + Tailwind v4, Router/Motion/Lucide, App Shell và route skeletons; scripts/lockfile; Playwright và Chromium local. **Technical Lead ACCEPTED**.
- [x] P1.5.2: Palette A tokens, fonts self-host, UI primitives, motion tokens/Reveal/hover/press/section entrance và dev-only `/__motion`; build/lint/typecheck + 5 browser tests PASS, screenshots đã xem. **Technical Lead ACCEPTED**.
- [x] P1.5.3: Hero Comparison dev-only với Signal Field (Canvas 2D), Evidence Constellation và Liquid Intelligence (SVG); cùng nội dung/CTA, selector/replay/pause, pointer/idle/entrance và static touch/reduced-motion. **Technical Lead ACCEPTED**.
- [x] P1.5.3 verification: build/lint/typecheck + 12 browser tests PASS; sáu ảnh desktop/mobile và video pointer/switch local; kiểm keyboard/touch/overflow/cleanup cơ bản và production exclusion. Không claim FPS, memory hoặc Web Vitals đã đo.

- [x] Project Owner chọn **A — Signal Field** làm production hero; P1.5.3 Technical Lead ACCEPTED.
- [x] P1.5.4: Signal Field reusable trên Home skeleton; giữ pointer/idle/pause, touch/reduced-motion, DPR cap và cleanup. Không làm full Home P3.1.
- [x] P1.5.5: route entrance, Reveal/section, TextReveal, StaggeredContent, button feedback, shared tab indicator/panel transitions, Disclosure và scroll story. Motion specification gọn trong DESIGN_BRIEF; không thêm dependencies.
- [x] Technical Lead **technically ACCEPTED** P1.5.4 + P1.5.5 theo chỉ thị P3.1. Chất lượng thiết kế Home chưa được Project Owner duyệt.

Gate: concept và motion foundation được duyệt với bằng chứng; thiếu browser verification ghi NOT RUN, chưa claim chất lượng đạt.

Project Owner chuyển **P3.1 lên trước Phase 2** để nâng chất lượng Home thành visual baseline. Foundation kỹ thuật đã được chấp nhận; Phase 2 vẫn chưa bắt đầu. Drawer/loading/result/trace tiếp tục theo state và trang thực ở phase phù hợp. Academic gate vẫn OPEN.

## Phase 2 — Technical Foundation

- [ ] Hoàn thiện frontend đã bootstrap, backend FastAPI, routing/API client/health; project environment và dependencies khóa sau compatibility review/handoff.
- [ ] API contracts, engine registry/adapters not-ready, independent errors/partial results, research schema/loader tối thiểu.
- [ ] Lint/test/CI/config examples/README; verification local, not-ready behavior và privacy boundaries; Docker chỉ khi cần integration.

Gate: contracts và foundation test được, không bịa inference. Reuse source cũ chỉ chọn lọc khi được giao; không di chuyển/sửa source chưa commit ở checkout cũ.

## Phase 3 — Core Product Experience

- [x] P3.1 implementation: Home đầy đủ với Signal Field, responsive navigation, SMS hư cấu tương tác, hai engine độc lập, hành trình sử dụng, research editorial, CTA/footer; visual self-review/refinement và browser evidence.
- [ ] Project Owner trực tiếp review P3.1 và **ACCEPT Design Quality** trước khi lấy Home làm visual baseline cho các trang còn lại.
- [ ] Scanner Quick/Deep/Compare nối API thật, readiness, validation/loading/error/timeout/partial; motion primitives dùng chung.
- [ ] Desktop/mobile/keyboard/reduced-motion, browser interaction review và performance/bundle baseline.

Gate: input → result/not-ready thật; demo/live rõ ràng, không mất SMS hoặc kết quả engine thành công.

## Phase 4 — Investigation Workspace

- [ ] Pipeline visualizer, evidence inspector, execution trace, decision/technical panels; node states chỉ theo trace thực hoặc demo có nhãn.
- [ ] Adapter interface, partial/tool failure/timeout, inert URLs, trace privacy và responsive/accessible fallback.

Gate: phân biệt evidence verified/unverified/unavailable/failed; không dựng tiến trình chạy giả khi chỉ nhận final response.

## Phase 5 — Research Center

- [ ] ViGuard dataset/EDA/features/evaluation/errors và Lab03 Interactive Paper/code walkthrough, experiments/reproduction/new dataset riêng.
- [ ] Validate/import artifacts có provenance/version/protocol/permissions; paper/group results tách biệt, empty state khi thiếu.
- [ ] Quantitative cross-engine comparison chỉ khi protocol/mapping hợp lệ; Learn/Human vs AI và About đầy đủ là P1 nếu đủ thời gian.

Gate: nghiên cứu đúng nguồn, không thay artifact thiếu bằng số liệu paper/demo; không nhận đóng góp tái sử dụng là phát minh mới.

## Phase 6 — ML Integration

- [ ] Nhận ViGuard pipeline/dependencies/labels/golden examples; nhận Lab03 pipeline/provider/tools/interface và phạm vi reproduction.
- [ ] Tích hợp từng engine độc lập, golden prediction parity, failure paths và research exports khớp snapshot.
- [ ] E2E với dữ liệu được phép; dataset mới evaluation và taxonomy/protocol được xác nhận trước quantitative claims.

Gate: inference thật có version/provenance, reproducibility và permissions; không training trong website. Có thể tích hợp sớm từng engine khi handoff sẵn sàng, không phá boundaries.

## Phase 7 — Polish & Evaluation

- [ ] Design/Unslop review giữ direction đã duyệt; browser/motion/performance/accessibility audit và tests phù hợp, ghi PASS/FAIL/NOT RUN.
- [ ] Security/privacy/external-tool restrictions, latency/LLM cost và đánh giá contribution theo protocol thật; không claim lợi ích chưa đo.
- [ ] README/report/video theo rubric từng đồ án; deploy/smoke khi được giao và đủ budget/hosting evidence.

Gate: Definition of Done Master Plan được kiểm chứng, limitations rõ; báo cáo học thuật và links truy cập hợp lệ.
