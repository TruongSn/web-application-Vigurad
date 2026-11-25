# P0.1 — Discovery & Inventory

Ngày kiểm kê: **25/11/2026, Asia/Saigon**. Coding Agent: **Codex**, phiên agent dựa trên GPT-6; package CLI cục bộ `@openai/codex@0.172.0`.

## 1. Executive Summary

**Status: COMPLETED cho discovery P0.1; chờ Technical Lead và Project Owner review.** Không đồng nghĩa Phase 0 đã được chấp nhận hoặc website đã chạy được.

- Đã đọc `AGENTS.md`, `CLAUDE.md`, `README.md`, toàn bộ `docs/MASTER_PLAN.md` v1.1 và nội dung text hai PDF trong `docs/references/`. Giữ nguyên React + TypeScript + Vite, Python + FastAPI, Modular Monolith + Engine Adapter Pattern, hai engine/hai research areas độc lập, Motion + CSS/SVG và native scrolling mặc định. Không training trong repo web.
- Workspace hiện tại chủ yếu có tài liệu và Skills; Git chỉ track `README.md`. Website cũ nằm ở **một checkout khác có cùng tên và cùng remote**; có source và tests để tham khảo, chưa có engine thật.
- Node.js 24.12.0 dùng được; `npm.cmd`/`npx.cmd` 11.6.2 chạy được. Python trên PATH lỗi nhưng có Miniconda và interpreter 3.12 trong venv website cũ. Docker CLI/Compose có mặt; chưa kết nối được daemon.
- Có sáu frontend Skills cần thiết. Chưa tìm thấy Playwright runtime trong các môi trường đã kiểm tra; chưa xác minh browser automation hoạt động. Không cần cài thêm một bộ Skills lớn để bắt đầu thiết kế.
- Có đề Lab03, paper SmishX, upstream SmishX và hai checkout ViGuard. Thiếu đề/rubric ViGuard chính thức, repo reproduction của nhóm và model bàn giao trong phạm vi kiểm kê. Option 1/2, quyền dùng chung website, taxonomy/protocol và dataset mới vẫn cần người phụ trách quyết định.

**Giới hạn bằng chứng:** chỉ kiểm kê phiên bản/trạng thái, đọc source/metadata; không khởi động ứng dụng, chạy training, tests, browser review, build hoặc benchmark. PDF được giải nén text stream trong bộ nhớ bằng Python stdlib do không có PDF reader CLI/library trong các runtime đã kiểm tra; không tạo file phụ. Có lỗi glyph/spacing ở một số ký tự; không xác nhận chất lượng hình/bố cục PDF bằng mắt. Các số liệu paper là của tác giả; các kết quả test trong README cũ là lịch sử, không phải kiểm thử P0.1.

## 2. Environment Inventory

| Thành phần | Bằng chứng thực tế | Kết luận |
|---|---|---|
| OS / shell | Windows NT `10.0.26200.0`, PowerShell Desktop `5.1.26100.9818` | READY; không suy diễn Windows edition từ build |
| Node.js | `node --version` → `v24.12.0`, `C:\Program Files\nodejs\node.exe` | READY |
| npm / npx | Lệnh không hậu tố chọn `.ps1` và bị chặn vì execution policy; `npm.cmd --version`, `npx.cmd --version` → `11.6.2` | READY qua `.cmd`; không đổi execution policy |
| Python trên PATH | `python`/`python3` trỏ vào `C:\Users\ntson\AppData\Local\Microsoft\WindowsApps`; `python --version` lỗi không truy cập được executable; không tìm thấy `py` | Không dùng alias này để bootstrap |
| Miniconda | `C:\Users\ntson\miniconda3\Scripts\conda.exe --version` → `26.1.1`; không có lệnh `conda` trên PATH phiên shell | Dùng absolute path để kiểm kê; chưa activate |
| Python base | `C:\Users\ntson\miniconda3\python.exe` → `3.13.11` | Có interpreter; chưa chốt cho website |
| Python website cũ | `D:\HCMUS\HK7\ML\web-application-Vigurad\backend\.venv\Scripts\python.exe` → `3.12.14` | Có thể tham khảo runtime; không di chuyển/copy venv |
| uv | `uv --version` → `0.12.21` | Có; không tải interpreter hoặc tạo environment |
| Git | `git --version` → `2.52.0.windows.1` | READY |
| GitHub CLI | `gh --version` → `2.97.0` | Có CLI; auth/quyền remote **UNVERIFIED**, không đọc token |
| Docker / Compose | `docker --version` → `29.1.3`; `docker compose version` → `v5.0.0-desktop.1` | CLI installed; integration chưa READY |
| Docker daemon | `docker info --format '{{.ServerVersion}}'` thất bại: không thấy pipe `docker_engine`; CLI cũng cảnh báo không đọc được Docker config | Daemon unavailable trong phiên này; chưa kết luận nguyên nhân host |
| GitNexus | `gitnexus.cmd --version` → `1.6.12`; MCP query/impact/detect_changes và `.gitnexus/run.cjs` có mặt | READY cho read-only; xem giới hạn index ở mục 3 |
| Browser | Chrome `158.0.8127.37`, Edge `158.0.4370.33` tại executable chuẩn | Installed; chưa launch |
| Browser automation | Có công cụ `mcp__cua_repl` được cấp trong phiên; không tìm thấy command `playwright`, package global Playwright hoặc thư mục browser cache chuẩn đã kiểm tra | Tool exposed, execution UNVERIFIED; Playwright project MISSING |
| PDF tools | Không tìm thấy `pdftotext`, `pdfinfo`, `pdftoppm` trên PATH; không thấy pypdf/pdfplumber/PyMuPDF/pdfminer.six trong các Python đã kiểm tra | Có thể bổ sung sau nếu cần render/đọc PDF chuẩn; không cài ở P0.1 |

Các environment Conda được `conda env list --json` đăng ký; kiểm tra versions bằng absolute executable, `python -B` và `importlib.metadata`, không import code dự án:

| Environment | Python | Một số package thực sự hiện diện |
|---|---|---|
| `base` | 3.13.11 | FastAPI 0.135.2, Uvicorn 0.42.0, pytest 9.0.2, scikit-learn 1.9.0, joblib 1.5.3 |
| `envs\fastapi-env` | 3.11.18 | FastAPI 0.138.0, Uvicorn 0.52.4 |
| `envs\myenv` | 3.9.25 | FastAPI 0.128.8, Uvicorn 0.39.0, pytest 8.4.2, scikit-learn 1.6.1, joblib 1.5.2 |
| `envs\lifemate-benchmark` | 3.11.18 | Không thấy các package backend/ML được kiểm tra |
| `envs\myenv-maixuan` | UNVERIFIED | Registry có đường dẫn nhưng không thấy `python.exe`; không coi là environment dùng được |
| `e:\AI\NLP\NLTK\.conda` | UNVERIFIED | Chỉ thấy trong registry; không duyệt thư mục ngoài phạm vi dự án |

Registry lặp `myenv` với khác biệt chữ hoa ổ đĩa; không tính thành hai environment độc lập. Không environment nào trong danh sách Conda được báo active. Không thấy Python Playwright trong base, fastapi-env, myenv, lifemate-benchmark hoặc venv website cũ.

**Tương thích cần xử lý sau review:** Node 24.12.0 đáp ứng `engines.node = ^22.13.0 || >=24.0.0` của frontend cũ và mức tối thiểu trong [Vite Getting Started](https://vite.dev/guide/). Đây là kiểm tra điều kiện version, chưa phải build verification. Backend cũ pin dependencies dưới Python 3.12; package base/Conda khác version nên không mặc định dùng thay. ViGuard `pyproject.toml` chỉ có lower bounds, chưa đủ tái lập model serving. Cần nhận version Python/preprocessing/model từ nhóm ML trước khi khóa môi trường mới. Ghi chú npm 11/npx crash trong AGENTS là cảnh báo upstream, **chưa tái hiện**; không chạy `npx` tải package để thử.

## 3. Repository Inventory

Working directory và Git root: `D:\HCMUS\HK7\ML\Web\web-application-Vigurad`.

```text
web-application-Vigurad/
├── .git/
├── .gitnexus/                  # index, metadata, run.cjs
├── .agents/skills/             # 6 frontend Skills + 6 GitNexus Skills khi chốt inventory
├── .claude/skills/             # 6 GitNexus Skills
├── AGENTS.md
├── CLAUDE.md
├── README.md                   # chỉ một heading tên repository
├── skills-lock.json            # provenance của 6 frontend Skills
└── docs/
    ├── MASTER_PLAN.md          # v1.1, 92.968 bytes
    ├── DISCOVERY_REPORT.md     # deliverable duy nhất của P0.1
    └── references/
        ├── Lab 03 - Deep learning Research.pdf   # 69.766 bytes
        └── soups2025-wang.pdf                   # 966.417 bytes
```

Trước khi tạo report: không có `frontend/`, `backend/`, app dependency manifest, lockfile frontend/backend, Dockerfile, Compose, CI hoặc `.gitignore` ở workspace này. `skills-lock.json` là skill manifest, không phải app dependency lockfile.

| Git item | Kết quả |
|---|---|
| Branch / HEAD | `main` / `4b04c9bd3df8673c2bcd10addd709e81e19d73a4` — `Initial commit` |
| Remote | `origin https://github.com/TruongSn/web-application-Vigurad.git` cho fetch/push; chỉ đọc config URL, không fetch/push |
| Tracked files | `git ls-files` chỉ trả `README.md` |
| Working tree ban đầu | Untracked `.agents/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`, `docs/`, `skills-lock.json`; không có tracked diff |
| Worktree khác | Chưa kiểm tra trạng thái trên GitHub; source local cũ chưa được commit, xem bảng dưới |

Giới hạn tìm kiếm: chỉ liệt kê thư mục trực tiếp trong `D:\HCMUS\HK7\ML`, `ML\Web`, sau đó đọc các đường dẫn ViGuard/website liên quan. `Project 1 - Lab` chỉ có thư mục `PaddyYield-LR`; `KHONG XOA` có template `Mau_Bao_Cao_FIT_HCMUS.docx`, không phải đề ViGuard đã xác nhận. Có `ML\Dataset.zip` nhưng không giải nén/đọc. Không quét toàn bộ máy, Downloads hoặc các môn học khác.

| Repo liên quan, đường dẫn dưới `D:\HCMUS\HK7\ML\` | Branch / HEAD | Status / remote |
|---|---|---|
| `web-application-Vigurad` — website cũ, không có đoạn `Web\` | `main` / `4b04c9bd3df8673c2bcd10addd709e81e19d73a4` | README modified; `.gitignore`, AGENTS, PROJECT_BRIEF, backend, frontend, docs, ml, prompts untracked; cùng origin với workspace mới |
| `ViGuard` | `data/son-label-verified` / `23c707cbcfc880333ca83597d6d02d6130efadfe` | Clean tại lúc kiểm kê; origin `https://github.com/HDT-0103/ViGuard.git` |
| `Vigurard\ViGuard` | `data/label-450-900` / `5988862371270ca1f219a1a1f08758d4c17497b1` | Clean tại lúc kiểm kê; cùng origin ViGuard |

Git ban đầu từ chối đọc các checkout ngoài workspace vì `dubious ownership`. Đã dùng **command-scoped** `git --no-optional-locks -c safe.directory=<đúng đường dẫn> -C <đường dẫn> ...` cho các lệnh read-only; không thay global Git config. Không đổi branch, stage hoặc sửa các repo này. Cần chọn canonical checkout trước tái sử dụng; không coi hai checkout ViGuard là hai nghiên cứu độc lập.

**GitNexus:** bind rõ `repo: web-application-Vigurad`; `list_repos` ban đầu có 1 file, 2 nodes, 0 processes, index cùng HEAD. Resource context đọc sau đó báo 5 files, 117 symbols, 0 processes, indexed at `2026-11-25T11:19:01.197Z`; phiên này không gọi `analyze`. Có thay đổi index giữa các lần đọc và thông báo DB bị tiến trình khác giữ; cần coi metadata là snapshot có thể thay đổi. Query frontend/backend trả rỗng, phù hợp inventory không có source ứng dụng; không suy từ graph rằng website cũ không tồn tại. Website cũ/hai repo ViGuard không có trong registry đã liệt kê hết; source đọc thủ công sau kết quả graph rỗng.

Pre-write `impact(target: docs/DISCOVERY_REPORT.md, direction: upstream)` trả **UNKNOWN, target not found, impactedCount null**. Không có tập callers/processes để kết luận LOW. Text search không thấy reference tới report trước khi tạo, file chưa tồn tại và không sửa function/class/method nào; blast radius code không được graph chứng nhận. Chỉ bổ sung tài liệu. `detect_changes(scope: all)` trả 0 changed symbols/0 affected processes, không có cờ partial/truncated; công cụ không thay thế kiểm kê untracked Markdown.

## 4. Existing Code and Reuse Assessment

Đã đọc README/AGENTS website cũ, dependency manifests, `backend/app/main.py`, `services/inference.py`, route `predict.py`, frontend `App.tsx`, `lib/api.ts`, `lib/validation.ts`, `lib/research.ts`, và các primitives trong `components/ui.tsx`. Tests đã xác nhận tồn tại qua file inventory; không chạy lại.

| Phần cũ | Khả năng tái sử dụng / điều kiện |
|---|---|
| Unicode validation | `codePointLength`, giới hạn 10.000 code points và whitespace tương ứng Python; dùng làm điểm xuất phát, chốt lại limits theo model/schema mới |
| API client | Timeout, abort/cancellation, response guards và mapping lỗi có ích; phải thay endpoint/types để hỗ trợ engine IDs, compare, evidence và partial results |
| FastAPI foundation | `create_app`, provider injection, CORS allowlist, exception handling và `UnavailableInferenceProvider` trả 503 là mẫu tốt; cần kiểm tra lại security/contracts khi tích hợp |
| UI states | EmptyState, MetricCard, ChartContainer, readiness/error patterns có thể giữ ý tưởng; dữ liệu research hiện null và không phải EDA/metrics thật |
| Test cases | Schema/API/CORS/Unicode/response guards là scenarios tham khảo; không copy nguyên assertions của `/predict` sang contract mới |
| Research pipeline ViGuard | Giữ trong repo nghiên cứu; có thể nhận aggregate artifacts/converter sau khi kiểm tra provenance, không đưa training/annotation pipeline vào website |

**Không bê nguyên website cũ:** chỉ có một provider; routes `/`, `/research`, `/insights`, `/about`; API `/model-info`, `/predict` chưa có `/engines`, `/analyze`, `/compare`, engine registry hoặc SmishX adapter. `isModelInfo`/`isPrediction` gắn cứng taxonomy ba lớp ViGuard nên không áp dụng trực tiếp cho SmishX. Research schema cũ chưa có hai project/provenance/version đầy đủ. Chưa thấy Motion, ECharts, React Flow trong `package.json` cũ; không coi UI/motion cũ đáp ứng v1.1 khi chưa browser review.

Frontend cũ pin React 19.3.1, Vite 8.3.8, TypeScript 6.0.3, Tailwind 4.3.5; backend lock pin FastAPI 0.163.1, Uvicorn 0.54.0 dưới Python 3.12. Đây là **nội dung manifest và package metadata đọc được**, không phải đề xuất latest hoặc chứng nhận dependency security hiện tại. Không copy `node_modules`, `.venv`, build outputs, lockfiles hay `.env` một cách mặc định. README cũ ghi 56 backend tests, 21 frontend tests và 2 integration tests từng pass; **NOT RUN ở P0.1**, không dùng làm kết quả nghiệm thu hiện tại. Không đọc giá trị secrets, không load model pickle/joblib.

## 5. Research Source Inventory

Trạng thái nguồn: **Available and inspected** = đã đọc phần được nêu; **Available but not inspected** = chỉ xác nhận hiện diện; **Missing** = không tìm thấy trong phạm vi đã kiểm; **Unverified** = chưa đủ bằng chứng xác nhận tính chính thức/hợp lệ. Missing không khẳng định không tồn tại ở nơi khác.

| Nguồn | Trạng thái | Bằng chứng / giới hạn |
|---|---|---|
| Master Plan v1.1 | Available and inspected | `docs/MASTER_PLAN.md`, ngày 25/11/2026; đọc toàn bộ, không sửa |
| Lab03 assignment | Available and inspected | `docs/references/Lab 03 - Deep learning Research.pdf`; đọc text 7 trang, Sections 1–6; bảng rubric ở trang 6 |
| SmishX paper | Available and inspected | `docs/references/soups2025-wang.pdf`; nội dung chính, tables và appendices; Wang et al., SOUPS 2025, pp. 37–56; tên file khác `(1)` trong citation Master Plan, nội dung nhận diện đúng paper |
| SmishX upstream | Available and inspected, phạm vi README/tree/dependencies | [yizhu-joy/SmishX](https://github.com/yizhu-joy/SmishX): có `main.py`, `crawler.js`, data, UserStudy; README ghi Python 3.8+, Node 16+ và các dịch vụ API; không đọc `config.py`, không chạy code hoặc clone. Không phải repo reproduction của nhóm |
| ViGuard requirements/rubric chính thức | Missing / Unverified | README, PROJECT_BRIEF website cũ và guideline nghiên cứu có mặt nhưng không chứng minh là đề/rubric giảng viên; cần nguồn chính thức |
| ViGuard research/training repository | Available and inspected một phần | Hai checkout trong mục 3; đã đọc README, pyproject, manifests, thống kê metadata CSV. Hiện source/EDA/annotation, chưa thấy trained model |
| Lab03 reproduction repository của nhóm | Missing trong phạm vi đã kiểm | Không thấy checkout hoặc bàn giao agent pipeline của nhóm; upstream tác giả không đáp ứng thay yêu cầu này |
| Model artifacts ViGuard | Missing trong hai checkout được kiểm | Không có file `.joblib`, `.pkl`, `.pickle`, `.pt`, `.pth`, `.safetensors`, `.onnx`; chưa có pipeline/version/label mapping/golden examples bàn giao. Không loại trừ định dạng hay vị trí khác |
| Research artifacts ViGuard | Available and inspected một phần | Có `data/reports/eda/.../tables`, figures, manifests và notebooks; đã kiểm `source_label/.../manifest.json`, curated manifest; chưa kiểm toàn bộ figures/notebooks |
| Research documents bổ sung | Available but not inspected | Mỗi checkout ViGuard có `docs/Dataset_Report.docx`, `docs/ViGuard_features_pipeline.docx`; không xác nhận chúng là yêu cầu môn học |
| Datasets/raw archives | Available but not inspected về nội dung | Có `data/raw/`, `ML/Dataset.zip`; không đọc SMS thô, giải nén archive hoặc xác minh toàn bộ license |
| Lab03 reproduction/new-dataset results của nhóm | Missing / Unverified | Chưa nhận metrics, predictions, protocol, source/version và dataset được nhóm chọn |
| CORE/SCImago, quyền dùng chung website, quyền công bố data | Unverified | Chưa có xác nhận tương ứng; SOUPS venue trên paper không tự xác minh điều kiện ranking/rubric |

**Phát hiện về dữ liệu:** hai file `data/interim/sms_candidates_1350.csv` có cùng SHA-256 `f96becb61f9d7fe1308e2d52a4d6402f6e08eb3a303ae2a9b1d5e2c642061c21`, 1.350 rows; 451 rows có `label_verified`, nhưng **cả 1.350 rows vẫn `Needs Review`**. Không coi 451 rows là Approved. Curated manifest ngày 06/11 ghi `exported_rows=0`, `status=no_approved_records`; manifest EDA đã đọc dùng `label_source=proposed`, `label_provider=machine_proposal`, input hash bắt đầu `7a98c8fe`, khác CSV hiện tại. README nói chưa có nhãn xác minh cũng đã lạc hậu so với cột hiện tại. Cần nhóm nghiên cứu xác nhận snapshot/approval và tái xuất artifacts trong repo của họ; P0.1 không sửa hoặc tái chạy pipeline.

**Các yêu cầu học thuật đã đối chiếu trực tiếp với đề Lab03:**

- Sections 3.1–3.3: một paper peer-reviewed, kiểm tra venue theo CORE/SCImago; hiểu method/code/data flow; implement/reproduce lõi; ít nhất một kết quả chính hoặc comparable evaluation; **ít nhất một dataset khác paper**, giải thích adaptation và giới hạn so sánh; ghi dependencies, hyperparameters, seeds khi áp dụng và execution instructions.
- Section 3.4: chọn **đúng một** Option 1 — Practical Application hoặc Option 2 — Model Improvement. Option 1 đòi ứng dụng chạy model/output thật, nghiên cứu unmet needs và đánh giá đóng góp; UI chỉ expose model chưa đủ. Option 2 cần hypothesis và so sánh công bằng; cải tiến không tăng điểm số vẫn có thể hợp lệ nếu phân tích nghiêm túc. Chưa chọn thay nhóm.
- Sections 4–5: rubric 40/20/40, tối đa +10 bonus có bằng chứng; ZIP `[Group-ID].zip`, README install/run, video ≤30 phút, report IEEE Conference; external dataset link tồn tại ít nhất hai năm, đề nêu trừ 50% nếu dataset/source link không truy cập được. Không có điểm riêng cho giao diện đẹp.
- Paper Sections 3–4: external contexts là phần trọng yếu; legitimate/malicious trong đánh giá nhị phân không tương đương ba lớp ViGuard. Dataset 1.200 và accuracy 98,8% là **Original Paper Results**, không phải kết quả nhóm. Sections 5–7 đã có before/after user study, hạn chế AI error/over-reliance và latency; không nhận các ý tưởng này là đóng góp mới hoàn toàn.
- Appendix D có wording spam/promotion rộng hơn mô tả harmful spam ở Section 3.1; cần ghi rõ prompt/taxonomy được reproduce. Paper yêu cầu detailed rationales không cấp quyền hiển thị private chain-of-thought; giữ hướng dẫn execution trace/evidence/explanation của Master Plan.

## 6. Installed Skills Inventory

Các đường dẫn relative trong bảng được tính từ **`D:\HCMUS\HK7\ML\Web\web-application-Vigurad`**. Đã đọc sáu `SKILL.md` frontend để kiểm kê mục đích/ràng buộc, không chạy workflow thiết kế/cài đặt của chúng. Provenance lấy từ `skills-lock.json`; chưa chứng minh toàn bộ folder local byte-identical với pinned upstream commit.

| Exact skill name | Local path | Source repository / commit trong lock | Trạng thái, intended purpose, phase |
|---|---|---|---|
| `frontend-design` | `.agents/skills/frontend-design/SKILL.md` | `anthropics/skills`, `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` | Installed; art direction, typography/layout; Phase 1–3, review 7 |
| `animation-systems` | `.agents/skills/animation-systems/SKILL.md` | `MengTo/Skills`, `a5b1d3d28bd72b206a28e4a76b653792fc7b4859` | Installed; motion principles/tokens/choreography/performance; Phase 1.5, 3–7 |
| `build-awwwards-quality-sites` | `.agents/skills/build-awwwards-quality-sites/SKILL.md` | `MengTo/Skills`, cùng commit trên | Installed; cinematic art direction/visual craft; Phase 1, 1.5, 3, có xung đột cần giới hạn |
| `modern-web-guidance` | `.agents/skills/modern-web-guidance/SKILL.md` | `GoogleChrome/modern-web-guidance`, `2b4aa13a72dd47cd135b06ce5abfccd92e19b24f` | Installed; platform patterns, accessibility/performance; Phase 1.5–7; CLI execution/cache chưa xác minh |
| `unslop` | `.agents/skills/unslop/SKILL.md` | `heydamir/unslop`, `620163eedb3529d9cd23a3994ed8d287d06f760d` | Installed; visual/copy/spacing audit; sau mỗi trang và Phase 7 |
| `webapp-testing` | `.agents/skills/webapp-testing/SKILL.md` | `anthropics/skills`, cùng commit frontend-design | Installed; Python Playwright browser tests/screenshots; Phase 1.5–7; runtime thiếu trong các env đã kiểm |

**GitNexus và user scope:**

- Sáu tên `gitnexus-cli`, `gitnexus-debugging`, `gitnexus-exploring`, `gitnexus-guide`, `gitnexus-impact-analysis`, `gitnexus-refactoring` hiện có ở cả `.agents/skills/<name>/SKILL.md`, `.claude/skills/<name>/SKILL.md` và `C:\Users\ntson\.agents\skills\<name>\SKILL.md`. Hash các bản cùng tên đã đọc trùng nhau: **installed + duplicate**, không xóa. Nguồn package: [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus), xác định từ repository field của package 1.6.12; chưa chứng minh từng file khớp release upstream. Dùng exploration/impact khi đọc/sửa code; detect_changes trước commit ở checkpoint được phép.
- `C:\Users\ntson\.agents\skills\` còn có `find-skills`, `gitnexus-lfg`, `gitnexus-pdg-query`, `gitnexus-plan`, `gitnexus-review`, `gitnexus-taint-analysis`, `gitnexus-work`; exact path theo `<name>/SKILL.md`. Installed qua file inventory; nội dung các workflow ngoài phạm vi **not inspected**; không chạy pipeline hay delegation.
- `C:\Users\ntson\.codex\skills\` có `cloudflare-deploy`, `vercel-deploy`; `.system/` có `create-statusline`, `imagegen`, `openai-docs`, `review-agent`, `skill-creator`, `skill-installer`, mỗi tên có `SKILL.md`. Installed qua inventory; chủ yếu DEFERRED. Không thấy thêm bản user của sáu frontend Skills ở hai roots này.
- Plugin skill **`figma:figma-generate-library`** (frontmatter `figma-generate-library`) tồn tại ở `C:\Users\ntson\.codex\plugins\cache\openai-curated-remote\figma\20.0.0\skills\figma-generate-library\SKILL.md`; đã đọc metadata/scope. Thiết kế tokens/components **trong Figma**, Phase 1 nếu chọn Figma; không bắt buộc theo Master Plan. Source repository/license riêng chưa xác minh.
- Plugin skill **`visualize:visualize`** (frontmatter `visualize`) tồn tại ở `C:\Users\ntson\.codex\plugins\cache\openai-curated-remote\visualize\1.0.89\skills\visualize\SKILL.md`; đã đọc metadata/scope. Dùng interactive explanations **trong conversation**, không thay skill triển khai ECharts cho website; Phase 1/5 nếu cần giải thích. Source repository/license riêng chưa xác minh.
- Không thấy standalone skill chuyên **Accessibility**, **Design System cho React** hoặc **Data Visualization/ECharts** trong project và hai user skill roots. Đây là gap chuyên môn có thể được hỗ trợ một phần bởi frontend-design, animation-systems, modern-web-guidance và tài liệu chính thức; không phải lý do tự cài skill không rõ nguồn.

**Xung đột cần áp dụng đúng thứ tự ưu tiên:** `build-awwwards-quality-sites` yêu cầu GSAP primary, chọn Lenis/Locomotive và Solar/Iconify, còn Master Plan chọn Motion + CSS/SVG, native scrolling và Lucide. Chỉ dùng phần art direction phù hợp; không lấy skill để đổi stack. `unslop` có hướng loại bỏ gradient/parallax và plausible mock data; không được làm mất hero cursor-reactive đã thống nhất hoặc tạo metrics/prediction giả. CTA không chờ choreography dù animation-systems có ví dụ CTA xuất hiện sau. Reduced motion đã là yêu cầu bắt buộc của Master Plan, không phải open decision mới.

### Xác minh các nguồn Skills online

Đã truy cập năm repository ứng viên, README và các skill paths liên quan qua web read-only. Bảng ghi thông tin upstream quan sát ngày kiểm kê; license của skill repository không tự áp dụng cho mọi thư viện/assets mà skill đề xuất. Không chạy các lệnh cài dưới đây.

| Nguồn / exact names đã xác minh | License và installation guidance |
|---|---|
| [anthropics/skills](https://github.com/anthropics/skills): `skills/frontend-design`, `skills/webapp-testing` | Hai `LICENSE.txt` local và upstream ghi Apache-2.0: [frontend license](https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt), [testing license](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/LICENSE.txt). README hướng dẫn Claude marketplace/plugin; không nhầm là lệnh Codex. Với Codex, giữ folder project hiện có; không cần cài lại |
| [MengTo/Skills](https://github.com/MengTo/Skills): `agent-skills/web-design/animation-systems`, `.../build-awwwards-quality-sites` | [MIT](https://github.com/MengTo/Skills/blob/main/LICENSE). README mô tả portable folders, Codex đọc SKILL.md; phần maintenance vẫn nói cần bổ sung installation notes. Không khẳng định có installer chính thức đã kiểm thử |
| [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance): `skills/modern-web-guidance` | [Apache-2.0](https://github.com/GoogleChrome/modern-web-guidance/blob/main/LICENSE). README: `npx modern-web-guidance@latest install` hoặc `npx skills add GoogleChrome/modern-web-guidance`; cần Node ≥22. Folder installed không chứng minh CLI đã cached; chưa chạy |
| [heydamir/unslop](https://github.com/heydamir/unslop): `skills/unslop` | [CC-BY-4.0](https://github.com/heydamir/unslop/blob/main/LICENSE), giữ attribution Damir Sokolovsky. README có `$skill-installer install https://github.com/heydamir/unslop/tree/main/skills/unslop` cho Codex hoặc copy folder vào `.agents/skills/`. Chỉ ghi nhận hướng dẫn; không gọi installer |
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills): `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance`, `gsap-frameworks` | [MIT cho Skills](https://github.com/greensock/gsap-skills/blob/main/LICENSE). README: `npx skills add https://github.com/greensock/gsap-skills`; đã mở `skills/gsap-react/SKILL.md`. Local MISSING nhưng **DEFERRED/P1**, chỉ shortlist core/timeline/scrolltrigger/react/performance nếu đã có lý do dùng GSAP. Không suy license thư viện GSAP từ license Skills |

## 7. Missing Skills and Tools

| Gap | Phân loại | Đề xuất, chưa thực thi |
|---|---|---|
| Source frontend/backend và dependency/CI manifests trong workspace mới | MISSING, Phase 2 | Chọn reuse strategy rồi bootstrap tối thiểu theo gate; không cài toàn stack ở discovery |
| Python project environment/lock tái lập | MISSING | Chọn version dựa trên model/reproduction handoff; tạo env riêng sau duyệt, không dùng base tùy tiện |
| Playwright package/browser setup cho project | MISSING trước Phase 1.5 review | Chọn Python Playwright nếu theo skill hiện có hoặc runner phù hợp đội; xác minh browser launch/local access khi được setup |
| CLI/cache của modern-web-guidance | UNVERIFIED | Xác minh/cài có kiểm soát ở checkpoint setup; hiện chỉ folder và guides có mặt |
| Accessibility automation, Vitest/Pytest/Ruff/ESLint/Prettier cấu hình project | MISSING, Phase 2 trở đi | Chọn tối thiểu theo manifests mới; keyboard/reduced-motion/manual review vẫn bắt buộc |
| Docker daemon khả dụng | BLOCKED cho Docker integration | Kiểm tra Docker Desktop/service/quyền truy cập sau duyệt; không cần chặn discovery/design |
| Accessibility/Design System/ECharts Skills chuyên biệt | MISSING standalone, không phải blocker | Ưu tiên coverage đã có và official docs; chỉ bổ sung khi use case cụ thể, source/license xác minh |
| GSAP Skills, shader/3D/Lenis, cloud deployment | DEFERRED | GSAP P1 nếu justified; 3D/shader/Lenis P2; chưa mua hosting hoặc deploy |

Khuyến nghị dùng bộ nhỏ: `frontend-design` + `animation-systems` + `modern-web-guidance`, thêm `webapp-testing` khi runtime sẵn sàng và `unslop` ở review. Creative skill chỉ dùng có giới hạn như mục 6. Không cần cài Skills mới để hoàn tất P0.1.

## 8. Risks and Blockers

| ID / Master Plan mapping | Mức ảnh hưởng | Cần giải quyết |
|---|---|---|
| R01 / OD-01 | Cao: thất lạc source chưa commit | Hai checkout web cùng origin/HEAD nhưng source cũ untracked; người sở hữu chọn repo/canonical path và cách chuyển phần được chọn. Không xóa/copy/merge ở P0.1 |
| R02 / OD-05 | BLOCKED cho Phase 0 scope gate | Project Owner/nhóm xác nhận Option 1/2, cung cấp đề/rubric ViGuard, kiểm tra quy định dùng chung website và venue ranking |
| R03 / OD-03, OD-04 | BLOCKED cho live integration | Nhóm ML/Lab03 bàn giao pipeline, schema, versions, readiness, golden examples và phạm vi reproduction; chưa có provider/budget chốt |
| R04 / OD-06, OD-07 | BLOCKED cho quantitative comparison/evaluation | Chọn dataset mới được phép sử dụng; thống nhất labels, ground truth, split/metrics/protocol; không coi Advertisement = harmful spam |
| R05 / OD-03, research artifacts | Cao: provenance lạc hậu | Manifest EDA/curated không khớp input CSV hiện tại; cột label_verified chưa đồng nghĩa Approved; nhóm nghiên cứu xác nhận snapshot trước publish |
| R06 / OD-02, OD-12 | Vừa: skill đổi quyết định kiến trúc/visual | Áp dụng Master Plan trước skill defaults; không tự thêm GSAP/Lenis/Iconify hoặc mock metrics |
| R07 / OD-09, OD-13 | Chưa đủ bằng chứng nghiệm thu kỹ thuật | Python PATH lỗi, versions env khác nhau, chưa có project Playwright, Docker daemon unavailable; browser performance/accessibility NOT RUN |
| R08 / OD-10, OD-11 | Human/evaluation gates chưa tới | Lợi ích Evidence Explorer cần protocol và số liệu thật; concept hero phải review ba prototype ở Phase 1.5, chưa chọn production hero |
| R09 / OD-08 | DEFERRED trước deployment | Chưa benchmark RAM/CPU/latency/concurrency/LLM cost; chưa chọn hosting/budget; không lấy số đo paper làm số đo sản phẩm |

Blockers trên không ngăn việc giao inventory; chúng ngăn các gate hoặc tính năng tương ứng. Không tự giải quyết quyết định học thuật bằng việc chọn thư viện hay làm UI trước.

## 9. Recommended Setup Sequence

Chỉ là đề xuất cho các checkpoint được duyệt sau; chưa tự thực thi:

1. **Review P0.1.** Chốt canonical web checkout/reuse scope, bảo toàn source untracked cũ. Giữ repo nghiên cứu độc lập; không tạo remote mới chỉ vì tên mục tiêu trong Master Plan khác tên checkout.
2. **P0.2 — Scope & Academic Alignment, tên đề xuất.** Nhận đề ViGuard, xác nhận Lab03 Option và quyền dùng chung website; chốt MVP, sitemap, contribution/evaluation requirements. Chỉ tạo Product Brief khi checkpoint này được giao.
3. **Research handoff inventory với nhóm.** Chọn canonical ViGuard branch/snapshot; yêu cầu approval/export provenance rõ; nhận repo reproduction, dataset mới candidate, interface/dependencies. Chưa tích hợp model thiếu version.
4. **Phase 1 design.** Dùng Skills hiện có cho wireframes/concepts/tokens; kiểm tra tiếng Việt, focus/contrast và content thật. Không bắt buộc Figma, không chọn hero cuối qua ảnh tĩnh.
5. **Technical setup tối thiểu sau duyệt.** Dùng `.cmd` cho npm/npx; chọn project Python environment riêng, pin dependencies theo compatibility; thiết lập routing/lint/test. Chỉ frontend bootstrap cần cho Phase 1.5, chưa cài toàn bộ advanced effects.
6. **Browser tooling rồi Phase 1.5.** Xác minh Playwright/automation chạy thật; tạo Motion Playground/ba hero prototypes theo Master Plan, đo traces/mobile/reduced motion và chờ human concept gate.
7. **Phase 2 và các phase sản phẩm.** Contract/engine registry/not-ready adapters, research loader và CI; Docker khi daemon dùng được. Sau đó triển khai từng vertical slice, nối từng engine khi handoff đủ. Hosting, GSAP nâng cao, shaders và streaming để đúng phase/priority.

## 10. Checkpoint Verification

| Lệnh / thao tác thực sự đã chạy | Kết quả và giới hạn |
|---|---|
| `Get-Content` AGENTS/CLAUDE/README và Master Plan theo các khoảng dòng nối tiếp | Đã đọc source of truth và v1.1; không sửa Master Plan |
| `Get-ChildItem`, `rg --files` có loại trừ runtime/cache, đọc manifests | Phân biệt workspace docs-only với website cũ có source; không chạy source hay quét toàn máy |
| `node --version`; `npm.cmd --version`; `npx.cmd --version`; `git --version`; `gh --version`; `uv --version` | Versions ở mục 2. `npm`/`npx` không hậu tố FAIL do PowerShell policy; `.cmd` thành công |
| Absolute `conda.exe --version`, `conda.exe env list --json`; từng `python.exe -B` + `importlib.metadata` | Runtime/package presence thực tế ở mục 2; Python PATH FAIL. Một probe ban đầu lỗi quoting, đã chạy lại thành công bằng here-string; không coi lỗi probe là package thiếu |
| `docker --version`; `docker compose version`; `docker info --format '{{.ServerVersion}}'` | CLI versions có thật; daemon probe FAIL; không đổi config/service |
| `git branch --show-current`; `git log -1`; `git remote -v`; `git ls-files`; `git status --porcelain=v1` | Git identity/status ở mục 3; repo phụ cần safe.directory command-scoped; không thay config toàn cục |
| GitNexus `list_repos`, context/processes resources, `query`, pre-write `impact`, `detect_changes(scope: all)` | Query flows rỗng; processes rỗng; impact UNKNOWN cho file mới; detect_changes 0 symbols/processes, không partial/truncated. Không coi đây là chứng nhận untracked docs hoặc source cũ an toàn |
| PDF text-stream extraction bằng Python stdlib `re`/`zlib`, xử lý trong bộ nhớ | Đọc requirements Lab03 và paper; không tạo TXT/PNG phụ, không render; không claim visual QA PDF |
| Python CSV/JSON metadata + SHA-256 | Xác nhận counts/status/hash ở mục 5, không in nội dung SMS; không sửa/re-export dataset |
| Web read-only tới 5 nguồn Skills, upstream SmishX và Vite docs | Xác minh tên/path/license/installation guidance trong phạm vi nêu; không chạy external scripts/installer, không clone |
| Skill inventory và SHA-256 các bản GitNexus cùng tên | Có duplicates đã nêu; không gỡ/cập nhật Skills |
| Kiểm tra report bằng Python stdlib; `git diff --check`; đối chiếu snapshot SHA-256 | Report UTF-8, đủ đúng 10 sections, không trailing whitespace, có newline cuối; `git diff --check` không báo lỗi. Snapshot sau ghi: chỉ thêm `docs/DISCOVERY_REPORT.md`, 0 file cũ modified/deleted trong 261 file được đối chiếu; Master Plan hash giữ nguyên. GitNexus detect_changes sau ghi vẫn 0 symbols/processes; report untracked được kiểm riêng |
| Application tests/build/E2E/browser/performance/security audit | **NOT RUN**: P0.1 chỉ inventory; không có kết quả PASS về sản phẩm |

Phạm vi ghi file của agent: **chỉ thêm `docs/DISCOVERY_REPORT.md`**. Không bootstrap, cài dependency/Skill/MCP, activate/create environment, sửa Master Plan/source/research repo, đổi global config, tạo remote, commit, push, deploy hoặc chuyển P0.2. Có snapshot SHA-256 của 261 file workspace trước khi ghi report để đối chiếu cuối; `.git` và `.gitnexus` không nằm trong snapshot vì metadata/index có thể thay đổi bởi công cụ/tiến trình khác. Master Plan SHA-256 kiểm kê: `143cda8d13c6ebcf82aaad8e4397c3d7a3709f60a787ebbcb9ff113e12670c84`.

**Unexpected findings:** website cũ chứa source chưa commit dù cùng remote/HEAD; hai checkout training có branch/commit khác nhưng CSV giống nhau; EDA manifests lệch checksum hiện tại; Skills creative có defaults xung đột Master Plan; GitNexus index/skill inventory thay đổi giữa các lần đọc mà phiên này không chạy analyze. Không tự ghi đè hoặc dọn các thay đổi này.

**Điểm dừng:** giao P0.1 cho Technical Lead/Project Owner review. Bước tiếp theo đề xuất là P0.2 Scope & Academic Alignment sau khi được chấp nhận; chưa thực hiện.
