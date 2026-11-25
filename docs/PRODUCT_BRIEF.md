# ViGuard Intelligence — Product Brief

25/11/2026 · P0.2 · Draft chờ Technical Lead review. Nguồn: [Master Plan v1.1](MASTER_PLAN.md), [Discovery](DISCOVERY_REPORT.md). Scope tạm thời; **academic scope gate OPEN**.

## Vision và boundaries

Research-backed AI Security Platform: giúp người dùng kiểm tra SMS, hiểu bằng chứng/giới hạn của AI và khám phá nghiên cứu. Một website, một design system và backend ứng dụng, hai engine qua adapter độc lập:

| Engine / research area | Vai trò |
|---|---|
| ViGuard ML / `/research/viguard` | Pipeline phân loại SMS tiếng Việt; nhãn Safe, Advertisement, Scam; dataset, EDA, features, evaluation và errors riêng |
| SmishX Agent / `/research/lab03` | Tái hiện LLM-based agents; thu thập context, phát hiện phishing và explanation; paper, reproduction, dataset mới và contribution riêng |

Không buộc dùng chung model, dataset, taxonomy hoặc evaluation. Giữ nhãn gốc, engine version, readiness và nguồn; không tự ensemble/lấy trung bình scores. Không training trong repo website.

## MVP scope và sitemap

P0 dưới đây là ưu tiên sản phẩm, không phải trạng thái hoàn thành Phase 0.

| Route mục tiêu | Nội dung / ưu tiên |
|---|---|
| `/` | P0: Home, storytelling nhẹ, hero cursor-reactive có fallback, CTA tới Scanner |
| `/scanner` | P0: Quick Scan, Deep Investigation, Compare Engines; validation/loading/error/partial/not-ready |
| `/investigation` | P0: pipeline, trace thực tế, evidence inspector, decision/technical details |
| `/research`, `/research/viguard`, `/research/lab03` | P0: overview và hai research areas; experiment explorer, original/group results tách biệt |
| Cross-engine experiments trong Research | Chỉ định lượng khi có common dataset/ground truth/taxonomy mapping/protocol được duyệt |
| `/learn`, `/about` đầy đủ | P1: Scam Library, Human vs AI và giới thiệu nhóm; attribution/reference cơ bản vẫn cần trong MVP |
| `/__motion` hoặc prototype riêng | Dev-only Phase 1.5: ba hero concepts và interaction patterns; không đưa vào production navigation |

Foundation P0 gồm tokens, responsive layouts, motion primitives và browser/human review. Một hero production được chọn sau prototype gate; không phát triển đồng thời cả ba concept thành sản phẩm. Palette Master Plan là ứng viên, chưa phải palette production.

## Primary user flows

1. Home → Scanner → nhập/dán SMS hoặc mẫu demo có nhãn → chọn Quick/Deep/Compare → validate → request thật khi engine ready → kết quả từng engine hoặc not-ready/error. Đổi mode giữ SMS; không fake progress.
2. Kết quả Deep → Investigation → chọn bước/node → xem evidence, nguồn, trạng thái và giới hạn → đọc explanation/advice. Nếu chỉ có final response, chờ tổng quát rồi render trace đã nhận; không dựng live timeline theo timer.
3. Research → chọn ViGuard hoặc Lab03 → dataset/method/experiments/errors → xem provenance, protocol và reproducibility. Thiếu artifacts hiển thị empty state; paper results không điền thay group results.
4. Compare → đọc hai kết quả độc lập → xem khác biệt taxonomy và lỗi riêng; giữ kết quả engine đã thành công nếu engine còn lại thất bại. Không suy ra engine nào tốt hơn từ một ví dụ.

## Các điểm sáng tạo cần kiểm chứng

Dual-Engine Analysis; Evidence Explorer với evidence availability/provenance; Interactive Research và paper modules. Signal Field, Signal Scan, Message Deconstruction, Dual Intelligence và Evidence Flow tạo bản sắc trải nghiệm, không phải đóng góp ML đã đo. Human vs AI là P1, kế thừa ý tưởng before/after đã có trong paper; contribution của nhóm phải xác định và đánh giá riêng.

## Academic alignment

Lab03 requirements được đối chiếu ở Discovery với đề local Sections 3–5. Website hỗ trợ trình bày, không thay bài nghiên cứu:

- Paper peer-reviewed, bibliography và venue phù hợp CORE/SCImago; **ranking chưa xác minh**. Phân tích problem, related work, theory/method, datasets, metrics và limitations.
- Hiểu code/data flow, implement/reproduce cốt lõi; tái hiện ít nhất một kết quả chính hoặc comparable evaluation; bắt buộc đánh giá trên **ít nhất một dataset khác paper**, nêu adaptation và giới hạn so sánh.
- Ghi dependencies, environment, hyperparameters, seeds khi áp dụng và lệnh tái lập trong repo nghiên cứu. Phân biệt train/validation/test và kiểm soát leakage.
- Chọn đúng một Option. **Option 1 — Practical Application là đề xuất**, chờ nhóm quyết định: app phải chạy model/output thật, giải quyết unmet needs và có evidence về contribution; UI expose model chưa đủ. Nếu nhóm chọn Option 2, cần hypothesis và fair model comparison; chưa thay đổi scope theo giả định đó.
- Rubric 40 research understanding / 20 implementation-evaluation / 40 analysis-discussion; tối đa +10 bonus có measured benefit. ZIP `[Group-ID].zip`, source/README, video ≤30 phút và report IEEE Conference; dataset link ngoài phải truy cập ít nhất hai năm, đề nêu trừ 50% nếu source/dataset link không truy cập được.

Original Paper Results luôn ghi tác giả/venue, citation, dataset/protocol của paper. Group Results phải có experiment/code/model version, dataset/split, metrics thực, limitations và provenance. Không dùng accuracy 98,8% của paper để quảng bá hiệu năng website. Không công bố SMS cá nhân hoặc private chain-of-thought; chỉ execution trace/evidence và explanation được phép.

## Ngoài MVP

Không authentication/admin/database mặc định; không training mới, microservices, vector database/RAG hoặc automatic engine routing. Streaming, Human vs AI và cinematic GSAP nâng cao là P1; export/feedback storage, shader/3D/Lenis là P2 nếu justified. Không mua hosting/chốt budget trước benchmark; không cài tất cả dependency từ danh sách Master Plan.

## Acceptance criteria chính

- Hai engine qua adapter, readiness/version rõ; chưa có model vẫn dùng được UI với not-ready/empty states. Demo/live phân biệt; không predictions/scores/evidence/metrics giả.
- Scanner xử lý Unicode, validation, timeout/error/partial và compare độc lập, không mất input/kết quả thành công; URL nghi vấn inert.
- Research có hai khu vực và attribution riêng; chỉ công bố artifacts được phép, có version/protocol, giữ paper/group results tách biệt.
- Project Owner duyệt palette/art direction, rồi review ba hero prototypes và chọn một hero production; motion không chặn CTA, có mobile/reduced-motion fallback, keyboard/focus và contrast phù hợp.
- Browser desktop/mobile, interaction/motion/performance và tests phù hợp được chạy và ghi bằng chứng ở phase tương ứng. Chưa chạy thì NOT RUN; không tuyên bố đạt WCAG/Web Vitals/60 FPS bằng đọc code.
- Academic acceptance chỉ hoàn tất khi các quyết định mở được xác nhận và evidence nghiên cứu đáp ứng đề; tài liệu scope này chưa đóng gate.

## Open decisions và phạm vi tạm thời

Nhóm/Project Owner cần xác nhận Option 1/2, rubric ViGuard chính thức, quyền dùng chung website, venue ranking, dataset mới/permissions và common evaluation protocol. Nhóm nghiên cứu cần bàn giao pipeline, interface/dependencies/labels, golden examples và artifacts khớp snapshot; EDA hiện có lệch checksum theo Discovery. Theo dõi owners và trạng thái ở [STATUS](STATUS.md).

Được tiếp tục design exploration dưới scope tạm thời sau review/giao việc; thay đổi học thuật có thể điều chỉnh nội dung/flows. Chưa bắt đầu Phase 1 trong checkpoint này, chưa đánh academic scope gate hoàn tất.
