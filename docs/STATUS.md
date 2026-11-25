# ViGuard Intelligence — Status

Cập nhật 25/11/2026 · Canonical workspace: `D:\HCMUS\HK7\ML\Web\web-application-Vigurad`.

## Checkpoints

| Hạng mục | Trạng thái |
|---|---|
| P0.1 — Discovery & Inventory | **ACCEPTED** bởi Technical Lead theo chỉ thị người dùng; Discovery giữ nguyên như snapshot lịch sử |
| P0.2 — Scope & Academic Alignment | **ACCEPTED** bởi Technical Lead theo chỉ thị giao Phase 1; academic scope gate vẫn **OPEN** |
| P0.3 — Project Governance | **ACCEPTED** bởi Technical Lead theo chỉ thị giao Phase 1 |
| Phase 1 — Design Research & Art Direction | **ACCEPTED** bởi Technical Lead; Project Owner đã trực tiếp xem preview và chọn A — Tidal Observatory |
| P1.5.1 + P1.5.2 — Bootstrap & Design System | **ACCEPTED** bởi Technical Lead theo chỉ thị giao P1.5.3 |
| P1.5.3 — Three Interactive Hero Prototypes | **ACCEPTED** bởi Technical Lead; Project Owner chọn A — Signal Field |
| P1.5.4 + P1.5.5 — Motion refinement & finalization | **Technically ACCEPTED** bởi Technical Lead theo chỉ thị giao P3.1; không đồng nghĩa visual quality được duyệt |
| P3.1 — Production Home & Creative Visual Refinement | **IMPLEMENTED — chờ Project Owner design review**; thực hiện trước Phase 2 theo chỉ thị |
| Phase 2 | **NOT STARTED**; chưa bắt đầu backend/contracts |

## Quyết định đang áp dụng

- Giữ canonical workspace trên và GitHub repository hiện tại. Website cũ chỉ tham khảo/reuse chọn lọc ở phase phù hợp; source chưa commit và repo nghiên cứu được giữ nguyên.
- Master Plan v1.1 là source of truth; giữ React/TS/Vite, Python/FastAPI, Modular Monolith + Engine Adapter Pattern, hai engine/hai research areas độc lập.
- Giữ sáu frontend Skills; activated theo nhiệm vụ, specifications ưu tiên trước defaults. Motion + CSS/SVG, native scroll; không tự thêm GSAP/Lenis/Iconify/WebGL hoặc mock ML results.
- Palette **A — Tidal Observatory APPROVED**; giữ nguyên HEX. Project Owner chọn **A — Signal Field** làm production hero direction: Editorial Cyber Intelligence, dark cinematic hero và light editorial research surfaces. Không mở lại concept research.
- Option 1 — Practical Application là **đề xuất**, chưa phải quyết định nhóm. Cho phép design exploration dưới scope tạm thời sau review/giao việc; chưa đóng academic gate.
- Docker, Python environment và Playwright setup để checkpoint phù hợp sau này; không phải prerequisite cho governance hiện tại. Không commit/push trước review và cho phép tiếp theo.

## Open decisions / blockers

| Nội dung | Người cần xác nhận | Ảnh hưởng |
|---|---|---|
| Lab03 Option 1/2 và contribution/evaluation criteria | Nhóm Lab03 + Project Owner | Academic scope gate; không tự chọn thay |
| Rubric ViGuard chính thức, quyền dùng chung website, venue ranking phù hợp đề | Nhóm/giảng viên + Project Owner | Academic alignment chưa được xác nhận đầy đủ |
| Dataset mới Lab03, license/permissions, nguồn/chuẩn bị/adaptation | Nhóm Lab03 | Evaluation bắt buộc; không thay bằng dataset paper |
| Taxonomy mapping, ground truth, split/metrics/common protocol | Hai nhóm nghiên cứu | Chặn quantitative cross-engine comparison; vẫn hiển thị độc lập |
| Research handoff: pipeline/interface/runtime/dependencies/version/labels/golden examples, provider/tools và artifacts | Nhóm ML + Lab03 | Chặn live integration; EDA manifests lệch input checksum theo Discovery cần nhóm xác nhận/re-export |
| Quyền công bố PDF references/datasets/artifacts | Project Owner + chủ sở hữu nguồn | Mặc định giữ local/ignored, chưa đưa tài liệu gốc hoặc SMS riêng tư vào Git |

## Git publication scope

Ứng viên review: `.gitignore`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `skills-lock.json`, `docs/MASTER_PLAN.md`, `docs/DISCOVERY_REPORT.md`, `docs/PRODUCT_BRIEF.md`, `docs/ROADMAP.md`, `docs/STATUS.md` và Skills đã cài cùng license/provenance đi kèm. Không dùng `git add .` mặc định; review danh sách cụ thể trước stage khi được phép.

`docs/references/` bị ignore do quyền công bố chưa xác nhận; file local không bị xóa. Secrets, private data/SMS, environments/dependencies, generated caches/build outputs, model binaries và generated research exports mặc định excluded. `.gitignore` không bảo vệ file đã track hoặc phát hiện PII trong nội dung bất kỳ; ngoại lệ cần xác nhận quyền và review nội dung. Chưa stage/commit/push.

## Verification và bước tiếp theo

Chỉ kiểm tra tài liệu/config: Git diff/status, preserve GitNexus block, hashes Master Plan/Discovery/CLAUDE/skill lock, local links và ignore rules với đường dẫn giả định, danh sách tracked/untracked/ignored. GitNexus impact trả UNKNOWN cho docs/config (không callers/processes xác định được); kiểm chứng text refs bổ sung, không diễn giải là LOW. Không sửa code symbols. Application tests/build/browser checks **NOT RUN**, không có ứng dụng mới ở checkpoint này.

Kết quả kiểm tra P0.2/P0.3: UTF-8/local links/whitespace hợp lệ, `git diff --check` không báo lỗi; Git cảnh báo LF→CRLF theo cấu hình hiện hữu, không đổi cấu hình. GitNexus block giữ nguyên byte-for-byte; hashes Master Plan, Discovery, CLAUDE và skill lock không đổi. `git ls-files --cached --others --exclude-standard` liệt kê 264 ứng viên (254 file Skills hiện hữu, 5 docs Markdown, 5 file root); chỉ README đang tracked. Các PDF local, secrets/env, dependencies, caches/build/model/generated research paths thử bằng `git check-ignore` bị loại; `.env` examples và source docs/Skills vẫn được phép. Scan signature token/private-key trên text ứng viên không có hit; đây không phải chứng nhận không có mọi dạng secrets/PII. Các đường dẫn `references/` còn trong ứng viên thuộc Unslop Skill đã cài, giữ nguyên assets/license/attribution hiện hữu; không phải PDF học thuật local. GitNexus detect_changes báo 1 README section thay đổi, 0 affected processes, risk low, không partial/truncated; untracked docs/config được kiểm riêng. Không stage/commit/push.

Bước tiếp theo: Project Owner trực tiếp trải nghiệm Home hoàn chỉnh tại `http://127.0.0.1:5173/`; visual baseline và Design Quality **chưa ACCEPTED**. P3.1 được chuyển lên trước Phase 2 để xác lập chất lượng thiết kế. Academic scope gate vẫn OPEN; không tự chuyển phase.

## Phase 1 verification — 25/11/2026

Tạo `docs/DESIGN_BRIEF.md`, `docs/design/preview.html`; cập nhật ROADMAP/STATUS. Không sửa Master Plan, source cũ/research repos, không cài dependency/Skill, không API/model/metrics/traces giả, không commit/push. Dùng frontend-design chính, animation-systems, creative reference phần phù hợp của build-awwwards-quality-sites, local modern-web-guidance color/accessibility; không áp stack defaults.

Contrast: Python độc lập và JS cùng công thức WCAG sRGB, 56 pairs/palette, **168/168 PASS theo threshold chưa làm tròn**. Min normal text A/B/C: 4.87/4.96/4.72; min UI boundary/focus: 3.34/3.03/3.10. Đây là token checks, không phải chứng nhận WCAG trang render. Node VM + DOM stub: **14 smoke cases PASS** cho palette/contrast rows, mode giữ Unicode input, submit not-ready, mẫu result states và theme handler; không phải browser test. Harness lần đầu lỗi encoding chuỗi tiếng Việt khi pipe từ PowerShell, chạy lại với Unicode escapes thành công; không cần đổi product text. Static HTML có một main, IDs duy nhất, label-for resolve.

**Browser PASS/FAIL/NOT RUN: NOT RUN.** CUA inventory báo browser access host unavailable, không có browser tabs khả dụng. Chưa lưu screenshot, chưa kiểm rendering mobile/font glyphs/keyboard/assistive tech/forced colors. Preview offline dùng local/fallback fonts; nút tải Google Fonts là tùy chọn cần mạng, chưa kiểm tải bằng browser. Mở file trực tiếp để review, không cần server/dependency. Không tự coi palette, type hoặc motion đã được human-approved.

## P1.5.1 + P1.5.2 verification — 25/11/2026

- Frontend tại `frontend/`: React 19.3.1, React Router 8.5.3, TypeScript 6.0.3, Vite 8.3.8, Tailwind CSS/@tailwindcss/vite 4.3.5, Motion 14.14.0 (`motion/react`), Lucide 1.80.0; Playwright Test 1.65.1 + Chromium 159.0.8154.6 local. Dependencies pin exact + package-lock; ESLint 10.15.0, typescript-eslint 8.74.0. Npm install audit tại thời điểm cài: 0 vulnerabilities; không phải security audit toàn ứng dụng.
- `src/app`, `pages`, `components/{layout,ui,motion}`, `styles`, `lib`; chỉ folder có source thật. Home skeleton, route placeholders Scanner/Investigation/Research/404, App Shell/navigation/skip link; `/__motion` không có trong production build hoặc main navigation.
- Tokens CSS + Tailwind v4 Vite plugin/@theme, không trộn Tailwind v3 config; 17/17 Tidal color values khớp preview, semantic colors riêng. Active dùng surface đã duyệt và aria-selected/shape, không thêm palette mới. Fonts self-host qua Fontsource 5.3.0 (Be Vietnam Pro 400/500/600, Space Grotesk 500/600, JetBrains Mono 400; latin/vietnamese subsets), SIL OFL licenses ở `frontend/public/licenses/`. Không phụ thuộc CDN.
- UI primitives: Button, Container, SectionHeading, Input/Textarea, Tabs, StatusIndicator, Panel. Tabs có arrow/Home/End, roving tabIndex và initial hidden panels; dùng ARIA fallback có kiểm chứng thay vì phụ thuộc `focusgroup` experimental. Motion tokens seconds/ms rõ, easing/springs/stagger/enter/exit; Reveal/section entrance, SubtleHover, Button press feedback, `MotionConfig reducedMotion="user"` + reduced-motion fallback tức thời. Không cursor/smooth-scroll/hero prototypes.
- **PASS:** `npm.cmd run build`, `npm.cmd run lint`, `npm.cmd run typecheck`; `npm.cmd run test:browser` **5/5 tests PASS**. Browser thật kiểm routes/runtime errors/font assets local, 375/390/768/1440 px không horizontal overflow, keyboard/visible focus/tab selection/input giữ tiếng Việt, reduced-motion không transform và nội dung hiện đủ, computed contrast light/dark controls/text. Đã sửa focus StrictMode, CSS container collision và dark heading contrast được phát hiện trong lượt đầu; đã chạy lại thành công.
- Production smoke bằng Playwright local: Home PASS; `/__motion` bị loại PASS; chặn font network để kiểm fallback + không overflow PASS. Screenshot desktop/mobile và font fallback đã xem bằng mắt; không clipping dấu tiếng Việt rõ rệt trong mẫu kiểm tra. Đây không phải chứng nhận mọi glyph/thiết bị, WCAG toàn trang hoặc hiệu năng motion 60 FPS. Screenreader/forced-colors/Firefox/WebKit: NOT RUN. Build baseline JS 267.19 kB (85.53 kB gzip), CSS 22.16 kB (8.92 kB gzip), không claim Web Vitals.
- Evidence ignored tại `frontend/test-results/review/`: `home-1440.png`, `home-390.png`, `foundation-1440.png`, `foundation-390.png`, `font-fallback-390.png`. Các ảnh P1 được kiểm lại ở foundation, không đổi trạng thái lịch sử browser NOT RUN của checkpoint P1.
- Chạy: `cd frontend`, `npm.cmd ci`, `npm.cmd run browser:install` nếu máy chưa có Chromium local, `npm.cmd run dev`; test `npm.cmd run test:browser`, production preview `npm.cmd run build` rồi `npm.cmd run preview` (4173). Chromium cache trong `frontend/node_modules/.cache/ms-playwright`, install helper đã kiểm chạy; không đổi execution policy/global configuration. Playwright npm runner dùng thay Python helper để cùng tooling TS và theo yêu cầu local testing. Browser host Agent không cần thiết.
- Network npm trong sandbox ban đầu EACCES, đã cài thành công qua tool escalation được duyệt; không còn blocker runtime. Modern Web Guidance CLI offline ENOTCACHED: dùng guides color/accessibility/tabs đã cài + official Tailwind/Motion/Router/Playwright docs; không cài Skill mới. npm package scripts và tests được kiểm, không dùng hidden approval để giả PASS.
- Không sửa Master Plan/repo cũ/repo nghiên cứu, chưa backend/ML hoặc dữ liệu giả, chưa commit/push. Source/frontend và docs vẫn chờ review; academic scope gate OPEN.

## P1.5.3 verification — 25/11/2026

- Hero Comparison ở dev-only `/__motion`: A — Signal Field dùng Canvas 2D cho 437 điểm phản ứng cục bộ và đường tín hiệu; B — Evidence Constellation dùng SVG với tin nhắn trung tâm, bốn node có bố cục và liên kết; C — Liquid Intelligence dùng 17 lớp contour SVG biến dạng hữu cơ. Canvas tránh cập nhật hàng trăm DOM nodes; DPR giới hạn 1.5. Cùng Palette A, typography, headline/copy/CTA và kích thước hero; artwork có nhãn trừu tượng, không phải kết quả ML/evidence thật.
- Radio selector dùng keyboard native; entrance/switch/replay/CTA dùng Motion và tokens hiện có. Một RAF cho artwork đang hiện, pointer smoothing không qua React state; pause giữ frame, offscreen/hidden/blur dừng loop, exit/unmount hủy RAF/listeners/observers. Touch/reduced-motion có hình tĩnh đầy đủ và CTA dùng được; native scrolling.
- **PASS:** build, lint, typecheck và **12/12 Chromium browser tests** (5 foundation + 7 hero). Kiểm A/B/C, pointer/leave, switch/replay/pause, CTA, radio arrow/focus, reduced motion, touch emulation, 375/390/768/1440 px không overflow, console/runtime errors. Sau 9 lần switch không thấy RAF tích lũy trong phép kiểm; hidden state được mô phỏng bằng visibility event, không phải background-tab benchmark.
- Production smoke: Home render được; `/__motion` không render playground; bundle JS/CSS không chứa renderer/hero selectors. Home, App routing, palette tokens, package/lockfile, Master Plan và Design Brief giữ nguyên. Build hiện tại JS 267.19 kB (85.53 kB gzip), CSS 24.08 kB (9.33 kB gzip); không dùng bundle size để kết luận FPS/Web Vitals.
- Evidence local, ignored: `frontend/test-results/hero-review/{A,B,C}-{1440,390}.png` (sáu ảnh đã visual review) và `interaction.webm` (pointer + chuyển ba concept). Browser report: `frontend/playwright-report/index.html`. Test runner tái tạo/xóa evidence khi chạy lại; ảnh font-fallback của checkpoint trước không được giữ trong output mới.
- Không thêm dependencies/Skills; dùng frontend-design, animation-systems, build-awwwards-quality-sites (creative guidance), webapp-testing và local modern-web-guidance cho pause/reduced-motion. Không đổi stack, backend/research repo hoặc chọn production hero.
- Giới hạn: Chromium desktop + mobile/touch emulation; thiết bị thật, Firefox/WebKit, screenreader và memory/FPS/Web Vitals profiling **NOT RUN**. RAF checks chỉ kiểm lifecycle cơ bản, không chứng nhận không có mọi resource leak. GitNexus trả UNKNOWN cho frontend chưa được index; đã đối chiếu imports/refs bằng text, không coi UNKNOWN là LOW. Chưa stage/commit/push; chờ review.

## P1.5.4 + P1.5.5 verification — 25/11/2026

- Signal Field đã thành component reusable trong `components/hero/`, dùng trên Home skeleton. Renderer và scene controller được tách để tái sử dụng lifecycle; B/C + comparison vẫn chỉ import từ dev route. Không làm full Home P3.1, backend hoặc phase sau. Palette tokens, package/lockfile và Master Plan không đổi; không thêm dependency/Skill.
- Motion foundation: PageTransition enter-only, Reveal/section hiện có, TextReveal, StaggeredContent, shared tab indicator và panel transition giữ mounted state, Disclosure đóng inert/aria-hidden ngay. Playground thêm scroll story native: reduced-motion dùng marker tĩnh, mobile không sticky. Spec/rationale gọn trong DESIGN_BRIEF, tránh thêm tài liệu quản lý riêng.
- **PASS:** build, lint, typecheck; suite cuối **17/17 Chromium tests** (5 foundation + 7 hero + 5 finalization), chạy `npx.cmd playwright test --reporter=list --output=test-results/verified`. Kiểm pointer/pause, CTA, six Home↔Scanner cycles, back/forward/focus, keyboard tabs và input giữ dấu/state, expand/collapse/inert, 375/390/768/1440 responsive, DPR 3 backing scale ≤1.5, touch/reduced-motion, runtime/console errors. Production smoke/bundle checks PASS: Home có A, `/__motion`/comparison/B/C excluded. Test production cần build + preview 4173 đang chạy như README.
- Đo cục bộ selected Canvas: Chromium headless, viewport 1440×1000, DPR 1, 126 draw samples sau warm-up trong pointer sweep; CPU draw median **0.20ms**, p95 **0.30ms**, max **0.50ms**. Instrument clearRect→stroke; không gồm GPU/paint, không phải FPS hoặc Web Vitals. Qua repeated navigation không thấy RAF tích lũy trong check; không chứng nhận mọi memory leak.
- Build JS **411.37 kB / 133.73 kB gzip**, CSS **27.84 / 10.24 kB gzip**; JS gzip tăng 48.20 kB so với P1.5.3 khi production bắt đầu dùng hero và route Motion. Không gọi bundle size là runtime performance benchmark.
- Evidence ignored tại `frontend/test-results/finalization/`: `home-desktop.png`, `home-mobile.png`, `playground.png`, `interaction.webm`, `runtime.json`. Đã visual review ảnh render; video là capture để Owner xem. Focused Unslop review giữ art direction, không đổi palette hoặc bỏ approved interaction; attribution ở DESIGN_BRIEF. Skills: frontend-design, animation-systems, webapp-testing, unslop.
- Giới hạn: hardware mobile, Firefox/WebKit, screenreader, forced colors, heap/GPU/full-frame profiling và Web Vitals NOT RUN. Lượt đầu test harness lỗi TS/encoding đã sửa, full rerun PASS; reporter HTML/cleanup cũ bị kẹt, đã dừng đúng runner của task và dùng list reporter/output mới. Không coi report HTML cũ là evidence mới.
- GitNexus ban đầu trả UNKNOWN cho frontend chưa index; text refs bổ sung. Graph sau đó resolve Tabs/MotionStudies/HeroComparison: LOW, caller MotionPlayground; lazy MotionPlayground vẫn UNKNOWN. detect_changes chỉ phản ánh README tracked, không bao phủ untracked frontend. Git diff check PASS; scan 52 source/docs/config candidates không có token/private-key signature hoặc generated candidates, không phải chứng nhận mọi secrets/PII. Master Plan có whitespace sẵn có, giữ nguyên hash.

Proposed checkpoint commit scope (chưa stage): `frontend/src/`, `tests/`, `scripts/`, config Vite/TS/ESLint/Playwright, `index.html`, package/lockfile và font licenses; root README/.gitignore/AGENTS/CLAUDE/skills-lock và docs Markdown + `docs/design/preview.html` đã review. Skills đã cài cần review provenance/license riêng nếu đưa vào snapshot, không tự stage toàn bộ `.agents/.claude` hoặc dùng `git add .`. Exclude secrets/.env, private SMS/data, PDFs chưa có quyền, model artifacts, node_modules/cache/dist, test-results/playwright-report và `.gitnexus`.

Frontend creative foundation sẵn sàng bàn giao Phase 2 sau Technical Lead review checkpoint này; Phase 2 chưa bắt đầu. Academic scope gate và research handoff vẫn OPEN.

## P3.1 verification — 25/11/2026

- **IMPLEMENTED / Design Quality PENDING Project Owner review.** P3.1 được chuyển lên trước Phase 2 theo chỉ thị; technical acceptance của Phase 1.5 không phải aesthetic approval. Home đầy đủ: integrated Signal Field, mobile navigation, SMS reading study hư cấu, ML/Agent chapters riêng, how-it-works, research index, privacy/CTA/footer. Các route sản phẩm khác vẫn placeholders; academic gate OPEN.
- First full desktop/mobile render → focused Unslop review → refinement → final captures đã xem: tăng size nav/chú thích, pause một dòng, rút khoảng nghỉ transition quote, readiness ở hero, mobile ưu tiên copy trước diagram. Không nghiên cứu lại palette/references; assets do code dự án tạo + Lucide/fonts đã có, không media ngoài hoặc dependency mới. Giữ Master Plan, exact palette tokens và package/lockfile nguyên hash.
- **PASS** build/lint/typecheck; **17 existing regression tests PASS** trong lượt suite P3.1, **6/6 targeted Home tests PASS** ở lượt cuối (`npx.cmd playwright test tests/home.spec.ts --reporter=list --output=test-results/p31-home`). Capture helper ban đầu cuộn giữa section dài nên bỏ qua reveal ở đầu, đã sửa cuộn từng reveal; không diễn giải lỗi harness thành lỗi renderer. Không claim có một report full-suite 23/23 mới: kết quả PASS được tổng hợp từ hai lượt trên.
- Browser checks: 375/390/768/1440 px không overflow (regression), Home 1440/390 full-page; nav/CTA/placeholder routing, mobile menu keyboard/Escape/outside/resize/focus, annotation controls và inert `.example`, reduced motion, scroll rail/native scrolling, offscreen/pause/RAF cleanup, Canvas unavailable/SVG fallback. Five sampled rendered text/background contrast pairs ≥4.5:1; không chứng nhận toàn trang WCAG. Console/runtime checks không có lỗi liên quan. Existing playground và production isolation A-only PASS.
- Bundle investigation qua Vite chunk.modules (local ignored `frontend/tmp/bundle-{before,after}.json`): full Motion đưa drag/pan ~26,067 và projection ~65,177 rendered bytes vào baseline. Production chuyển `motion` sang `m` + LazyMotion/domAnimation ở hero/route/reveal primitives; phần implementation nặng được tree-shake (còn stubs/helpers ~178/~1,178 bytes). LayoutGroup của playground giữ nguyên dev-only. Đây là module rendered bytes, không phải network transfer.
- Final build JS **382.06 kB / 124.97 kB gzip**, giảm **8.76 kB gzip** so với P1.5.5 dù thêm Home; CSS **44.17 / 13.37 kB gzip**. Canvas CPU draw đo lại: 125 samples sau warm-up, Chromium headless 1440×1000 DPR 1, median **0.20ms**, p95 **0.30ms**, max **0.40ms** (`frontend/test-results/finalization/runtime.json`). Không bao gồm GPU/paint, FPS hoặc Web Vitals.
- Final evidence ignored: `frontend/test-results/home-review/full-{1440,390}.png`, `hero-{1440,390}.png`, `interaction.webm` (pointer, scroll qua sections, annotation). Video đã capture để Owner xem; ảnh full-page và hero đã visual review. Hardware mobile, Firefox/WebKit, screenreader, full accessibility/heap/GPU/Web Vitals audit NOT RUN. SPA cần JavaScript; chưa thêm SSR.
- Thay đổi 16 source/test/docs files: Home + home.css, HomeStory, SignalField + CSS/production-hero.css, AppShell + shell.css, main, Patterns/Reveal, home.spec và README/DESIGN_BRIEF/ROADMAP/STATUS. GitNexus impact resolve Home/SignalField/AppShell LOW; main/new files UNKNOWN được đối chiếu text refs. Working tree còn nhiều untracked từ checkpoint trước; không stage/commit/push. UTF-8/whitespace checks PASS cho files thay đổi, token/private-key signature scan không hit và không có generated candidates; không coi là chứng nhận mọi secrets/PII.

Dừng tại Home design review: `http://127.0.0.1:5173/`. Không bắt đầu Phase 2 hoặc triển khai các product pages khác trước chỉ thị tiếp theo.
