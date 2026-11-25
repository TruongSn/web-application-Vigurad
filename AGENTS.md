<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **web-application-Vigurad** (2 symbols, 1 relationships, 0 execution flows).

> Index stale? Run `node .gitnexus/run.cjs analyze --index-only` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? Bootstrap with `npx`, `bunx`, or `pnpm dlx` — e.g. `bunx gitnexus@latest analyze` (npm 11 npx crash; #1939).

## Always Do

- **MUST run impact before editing.** Use `impact({target: "symbolName", direction: "upstream"})` or `node .gitnexus/run.cjs impact "symbolName" --direction upstream --repo .`; report callers, processes, and risk. Never substitute grep for graph analysis.
- **MUST analyze graph changes before committing.** Use `detect_changes({scope: "all"})` (MCP) or `node .gitnexus/run.cjs detect-changes --scope all --repo .` (CLI fallback). `partial: true` or `truncated: true` is not a clean check — a zero means unseen, not unaffected; re-run it. For regression review: `detect_changes({scope: "compare", base_ref: "main"})` or `node .gitnexus/run.cjs detect-changes --scope compare --base-ref "main" --repo .`.
- MUST warn on HIGH/CRITICAL `risk` pre-edit; never use `riskSharedAxes` to waive a HIGH/CRITICAL `risk` warning. Compare File/symbol: MCP File omits axes; Graph-RAG expands File.
- **MUST treat `risk: UNKNOWN` as unresolved, not as low.** An empty caller set is not evidence the symbol is unused — it can also mean the callers are not resolvable by the index (plain-object property access, dynamic dispatch, cross-language calls). `impact` pairs `UNKNOWN` with a `riskNote` saying so. Confirm with a text search before treating the symbol as safe to change or delete; do not proceed on the strength of a zero.
- **MUST use `query({search_query: "concept"})` for concepts/flows, `context({name: "symbolName"})` for a named symbol, or `impact` for blast radius, on read-only callers, dependencies, imports, or execution flow.** Graph first; text search only for empty/`UNKNOWN`/literals.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method before MCP/CLI impact analysis.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis, and never read `UNKNOWN` as an all-clear — it means the walk could not answer, which is the one verdict that requires confirming by other means.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit before MCP/CLI graph change analysis.

## Resources

| Resource | Use for |
| --- | --- |
| `gitnexus://repo/web-application-Vigurad/context` | Codebase overview, check index freshness |
| `gitnexus://repo/web-application-Vigurad/clusters` | All functional areas |
| `gitnexus://repo/web-application-Vigurad/processes` | All execution flows |
| `gitnexus://repo/web-application-Vigurad/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
| --- | --- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

# ViGuard Intelligence — Project Workflow

## Nguồn và phạm vi

- Đọc `docs/STATUS.md`, brief/checkpoint được giao và phần liên quan của `docs/ROADMAP.md` trước khi làm. `docs/MASTER_PLAN.md` v1.1 là source of truth; `docs/PRODUCT_BRIEF.md` tóm tắt scope tạm thời. Chỉ đọc thêm nguồn khi cần, không kiểm kê lại môi trường/Skills đã xác minh ở Discovery.
- Canonical web workspace: `D:\HCMUS\HK7\ML\Web\web-application-Vigurad`; giữ GitHub repository hiện tại. Website cũ chỉ tham khảo/reuse chọn lọc ở phase phù hợp; không sửa, xóa hoặc di chuyển source chưa commit. Không sửa repo nghiên cứu.
- Một website, hai engine và hai research areas độc lập. React + TypeScript + Vite; Python + FastAPI; Modular Monolith + Engine Adapter Pattern. Không training trong repo web, không tự thay stack.
- Làm Lean: thay đổi tối thiểu đủ nghiệm thu, không tạo thư mục/tài liệu/framework không có use case. Chỉ thực hiện checkpoint được giao; không tự chuyển phase. Design exploration có thể tiếp tục dưới scope tạm thời sau review, nhưng academic scope gate vẫn OPEN.

## Skill policy

Approved project specifications take precedence over skill defaults. Giữ sáu frontend Skills hiện có; không cài thêm nếu chưa được giao. Chỉ đọc/kích hoạt Skill trực tiếp liên quan, không đọc toàn bộ SKILL.md mỗi task.

| Skill | Phạm vi |
|---|---|
| `frontend-design` | Visual identity, typography, layout |
| `animation-systems` | Animation, motion tokens/choreography |
| `build-awwwards-quality-sites` | Creative references only; không áp defaults stack |
| `modern-web-guidance` | Web standards, performance, accessibility khi làm web |
| `unslop` | Review; không tự thay thiết kế đã duyệt |
| `webapp-testing` | Browser verification |

Motion + CSS/SVG và native scrolling là mặc định. Không tự thêm GSAP, Lenis, Iconify, WebGL hoặc mock ML results. Palette Master Plan là ứng viên ban đầu; Project Owner duyệt palette/art direction trước frontend production. Không tự hạ yêu cầu reduced motion, cursor-reactive hero hoặc tính trung thực khoa học theo defaults của Skill.

## Verification và checkpoint

- Trước sửa: xem Git status, bảo toàn thay đổi có sẵn; tuân thủ impact/graph-first ở trên. UNKNOWN cần kiểm chứng bổ sung, không coi là LOW.
- Demo fixtures phải có nhãn rõ và tách live mode. Không fake predictions, metrics, scores, research results, evidence hoặc tiến trình agent. Thiếu model/artifact thì dùng not-ready/empty state; không tự đồng nhất taxonomy hai engine.
- Paper results và group results phải tách nguồn/version/protocol. Option 1 chỉ là đề xuất; không tự xác nhận rubric ViGuard, quyền dùng chung website, dataset mới hoặc academic gate.
- Chạy checks phù hợp thay đổi; tài liệu cần kiểm tra links, trạng thái/gates, UTF-8 và file diff. UI cần browser review phù hợp, keyboard, mobile, reduced motion; không dùng build/screenshot để tuyên bố motion mượt. Ghi PASS/FAIL/NOT RUN đúng bằng chứng.
- Trước đề xuất đưa vào Git: kiểm tra tracked/untracked/ignored files. Không đưa secrets, SMS riêng tư, tài liệu chưa có quyền công bố, generated caches/build outputs hoặc model lớn vào Git. `.gitignore` không thay thế content review; chỉ tạo ngoại lệ có phạm vi hẹp khi quyền và provenance đã xác nhận.
- Bàn giao ngắn trong chat: status, files, decisions, verification, blockers, Git status và next checkpoint; cập nhật STATUS/ROADMAP vừa đủ. Không cần file báo cáo riêng mỗi task.
- Dừng để Technical Lead review; chỉ đánh ACCEPTED khi có xác nhận. Không commit/push/deploy khi chưa được cho phép; checkpoint P0.2 + P0.3 hiện chưa được phép commit/push. Chưa setup Docker, Python environment hoặc Playwright ở checkpoint này.
