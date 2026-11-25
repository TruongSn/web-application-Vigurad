# ViGuard — Design Research & Art Direction

25/11/2026 · Phase 1 và P1.5.3 **ACCEPTED**. Project Owner chọn Palette A — Tidal Observatory và hero A — Signal Field. Academic scope gate vẫn OPEN. Các ghi chú exploration bên dưới được giữ làm lịch sử.

## Direction proposal

**Editorial Cyber Intelligence**: một bàn đọc bằng chứng, không phải bảng điều khiển cảnh báo. Bản sắc đến từ cặp SMS → Evidence, phân nhánh hai engine và cấu trúc research có nguồn. Heading lớn nhưng ngắn; khối nội dung lệch nhịp theo nhiệm vụ; vùng điều tra tối, vùng đọc/nhập liệu sáng. Một visual trọng tâm, không card grid lặp, logo wall, metric giả hay decorative badges.

Đề xuất ưu tiên **A — Tidal Observatory**, chưa duyệt. Giữ type/grid chung để Project Owner so màu công bằng; các directions bên dưới khác về cảm giác biên tập, hierarchy/content emphasis và cách kể chuyện, không chỉ đổi accent. Preview cố ý không đổi bố cục theo direction để tránh làm sai lệch phép so palette.

## Research: nguồn thực sự truy cập và quyết định rút ra

Ngày truy cập 25/11/2026. Đã đọc nội dung trang/docs qua web tool; **không phải pixel/animation audit bằng browser**. Nguyên tắc bố cục bên dưới là đề xuất áp dụng, không phải phép đo CSS của website tham khảo.

| Nguồn | Quan sát từ nội dung truy cập được → áp dụng cho ViGuard |
|---|---|
| [Linear](https://linear.app/) | Hero dẫn tới mô tả product/workspace cụ thể → mở bằng một SMS và hai hướng phân tích; trạng thái là thông tin, không decoration. Nhóm nội dung theo workflow thay vì dashboard cards đồng dạng |
| [Stripe](https://stripe.com/) | Product narrative có CTA và các nhóm giải pháp → đi từ vấn đề/SMS đến engine rồi evidence; mỗi section trả lời một câu hỏi. Không lấy gradients hoặc số liệu business của Stripe làm proof cho ViGuard |
| [Apple](https://www.apple.com/) | Các section sản phẩm có headline ngắn và cặp hành động rõ → một thông điệp/scene, typography làm hierarchy, CTA không phải đợi animation. Không sao chép imagery/identity |
| [Vercel](https://vercel.com/) | Phân biệt Agent Stack, Core Platform và developer resources → nav gọn ở cấp nhiệm vụ, technical details ở lớp disclosure sau kết luận; không đưa tất cả thuật ngữ vào hero |
| [Rauno’s Craft](https://rauno.me/craft) | Có Inline Conversion, Toolbar Morph và các prototype cụ thể → interaction nên giữ ngữ cảnh giữa selection/detail; bằng chứng mở ngay tại inspector. Chưa trực tiếp chạy các demo, không claim đã kiểm độ mượt |
| [Emil Kowalski](https://emilkowal.ski/) | Portfolio dẫn Sonner/Vaul/animations.dev → ưu tiên feedback, drawer và states hữu dụng hơn animation rải khắp trang. `/ui` không truy cập được; chưa đọc bài hay xem motion ở URL đó |
| [Cloudflare](https://www.cloudflare.com/) | Narrative kết nối infrastructure và security theo phạm vi sản phẩm → diễn giải roles/capabilities riêng hai engine, không dùng hình ổ khóa chung chung hoặc mượn threat counters |
| [Observable](https://observablehq.com/) | Computational document, explorable explanations và data workflows → Research Center theo một câu hỏi + nguồn + protocol + bảng/visual; không xếp chỉ số chưa có vào cards |
| [Codrops](https://tympanus.net/codrops/), [Awwwards](https://www.awwwards.com/) | Lần truy cập lần lượt 403 / timeout. **Chưa nghiên cứu được nội dung**; không dùng làm bằng chứng cho direction này |

Synthesis cụ thể: content width 1200 px, left-aligned type, hero hai cột 1.15:1; section spacing rộng hơn khoảng cách trong group. Nền phẳng, border có vai trò; research dùng editorial rows, scanner dùng một workbench, investigation dùng master/detail. Signature là nhánh SMS → hai engine, không neon particles khắp website.

## Color theory → UI system

- [Adobe Color](https://color.adobe.com/create/color-wheel): dùng base hue/harmony làm điểm khởi đầu, không coi wheel tự bảo đảm accessibility. Tách hue (identity), chroma (độ nổi), lightness (hierarchy). Tỷ lệ diện tích đề xuất: neutral chiếm phần lớn, brand cho hành động/selection, accent chỉ một vài điểm có nghĩa; không phải quy tắc phần trăm cứng.
- [Radix scale roles](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale): tách background, interactive/hover, border, solid fill và text. Học cách alias theo role, không copy nguyên scale hoặc cài UI kit. Dark variant không đơn thuần invert HEX. [Radix theme color](https://www.radix-ui.com/themes/docs/theme/color) là reference cho accent/gray độc lập.
- [OKLCH / MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch): cân chỉnh lightness/chroma/hue riêng để phát triển scales; cùng L không tự bảo đảm contrast. Preview chốt **HEX sRGB** ổn định, không sinh màu live bằng OKLCH; ratio tính trên màu sRGB đã chọn. Không coi ba palette là output tự động từ Adobe/Radix.
- [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): normal text ≥4.5:1; large text ≥3:1 (24 CSS px hoặc khoảng 18.67 px bold). [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): boundaries/states/focus cần nhận diện ≥3:1 với nền liền kề. Kiểm threshold bằng số **chưa làm tròn**. Decorative divider không thay control boundary.

| Palette / art direction | Harmony & thế mạnh | Trade-off / layout character dự kiến |
|---|---|---|
| A — Tidal Observatory | Petrol–teal tương cận, đồng ấm đối trọng nhỏ. Công cụ điều tra chính xác nhưng bớt lạnh | Gần concept Master Plan nhất; tránh trở lại cliché cyan glow. Hero SMS phân nhánh, research/editorial sáng, investigation tối |
| B — Archive & Signal | Burgundy–cobalt tương phản lạnh/ấm, paper neutral ấm. Bản sắc viện nghiên cứu/ấn phẩm rõ | Burgundy dễ bị hiểu là danger: luôn kèm nhãn và không dùng brand cho error. Research-first narrative, caption/citation nổi, visual như hồ sơ chứng cứ |
| C — Field Notes | Forest–ochre trên neutrals xanh rất nhẹ, chroma thấp. Điềm tĩnh, dễ tiếp cận | Brand xanh gần Safe: luôn tách nhãn/status bằng text/shape; có thể ít cảm giác cyber hơn. Message-first narrative, nhịp đọc thoáng và hướng dẫn người dùng nổi hơn |

### Token ledger (light / dark)

`bg` nền trang; `surface` nền panel; `text/muted` primary/secondary text; `brand` filled action/link; `accent` secondary highlight; `border` interactive boundary; `hover` hover surface; `focus` focus ring. Dark aliases: `dark/ds/dt/dm/db/da/line/dh`; dark focus = `db`. Button foreground: white ở light, `dark` ở dark. Màu semantic dùng trên surface trung tính, không dùng brand để ngầm biểu thị outcome.

| Role | A light / dark | B light / dark | C light / dark |
|---|---|---|---|
| Background | `#F2F6F7` / `#0B1D26` | `#F7F3ED` / `#251E24` | `#F2F5F0` / `#15271E` |
| Surface | `#FFFFFF` / `#142D38` | `#FFFDFA` / `#352A32` | `#FFFFFF` / `#23392C` |
| Primary text | `#182F39` / `#EDF7F7` | `#2B2426` / `#FFF4F7` | `#202C23` / `#EDF5EA` |
| Secondary text | `#4D6570` / `#B3C9CF` | `#665957` / `#D6BCCB` | `#526354` / `#C0D2BC` |
| Brand | `#076F7B` / `#61D6CE` | `#8B3549` / `#F0A7B8` | `#356344` / `#ACD9A7` |
| Accent | `#9A4524` / `#E9A882` | `#365B99` / `#A4C1F4` | `#8B5A12` / `#EDCA7B` |
| Border | `#67838C` / `#74949E` | `#927D78` / `#9F8495` | `#748278` / `#819B86` |
| Hover | `#DCEDEE` / `#213F4B` | `#EBE2DE` / `#4B3945` | `#DFE9DD` / `#304D39` |
| Focus | `#006B75` / `#61D6CE` | `#8B3549` / `#F0A7B8` | `#356344` / `#ACD9A7` |

Semantic chung để giữ ý nghĩa giữa palette: light Safe `#1E663F`, Advertisement `#85500C`, Scam `#B12E39`; dark lần lượt `#8CDBAD`, `#F2C879`, `#FFA6AC`. Luôn kèm tên và ký hiệu ✓ / ◇ / !; không dùng màu đơn độc. Không coi Advertisement là harmful spam của SmishX.

Data visualization dùng categorical series riêng: ViGuard = brand, Agent = accent, unavailable/reference = neutral secondary; thứ tự/nhãn/pattern ổn định giữa themes. Ba lớp semantic không dùng cho mọi dataset tùy tiện. Charts production cần thêm marker/line dash/direct labels, units/citation và table fallback; chưa có data/chart thật ở preview, chưa claim color-blind validation.

### Contrast verification

Tính bằng WCAG relative luminance: chuyển sRGB channel với ngưỡng 0.04045, weights 0.2126/0.7152/0.0722; ratio `(Lmax+0.05)/(Lmin+0.05)`. 56 checks/palette: 7 text roles × 3 backgrounds × 2 modes, boundary/focus × 3 backgrounds × 2 modes, 2 button pairs. PASS kiểm **168 cặp token**, không chứng nhận toàn trang WCAG. Ledger tương tác trong preview hiển thị đầy đủ cặp HEX/ratio/threshold.

| Foreground / background | A | B | C | Ng??ng |
|---|---:|---:|---:|---:|
| text / surface | 13.96:1 | 14.95:1 | 14.52:1 | 4.5:1 |
| muted / surface | 6.16:1 | 6.60:1 | 6.42:1 | 4.5:1 |
| brand / hover | 4.87:1 | 6.09:1 | 5.58:1 | 4.5:1 |
| dt / ds | 13.16:1 | 12.78:1 | 11.13:1 | 4.5:1 |
| dm / ds | 8.32:1 | 7.79:1 | 7.79:1 | 4.5:1 |
| border / hover | 3.34:1 | 3.03:1 | 3.23:1 | 3:1 |
| line / dh | 3.45:1 | 3.15:1 | 3.10:1 | 3:1 |
| focus / surface | 6.25:1 | 7.65:1 | 6.95:1 | 3:1 |
| db / ds | 8.22:1 | 7.15:1 | 7.82:1 | 3:1 |
| White / brand button | 5.88:1 | 7.77:1 | 6.95:1 | 4.5:1 |

Initial audit đã sửa A brand/hover 4.486:1 (không làm tròn thành PASS), A dark boundary/hover 2.771:1 và C light boundary/hover 2.847:1. Kết quả cuối ở bảng trên. Không opacity lên foreground/background đã đo; nếu thêm alpha/ảnh/gradient sau này phải đo màu composite lại. Focus 3 px, offset 4 px tách khỏi fill; target control tối thiểu 44 px ở các button/select. Browser/assistive-tech/forced-colors và color-blind checks chưa chạy.

## Typography & layout system

| Role | Proposal / lý do | Scale, weight, line height |
|---|---|---|
| Display / headings | Space Grotesk: cấu trúc kỹ thuật, giữ nét riêng ở headline; chỉ heading, không dùng body dài | H1 44 mobile →80 desktop /600 /1.17; H2 29→43 /600 /1.17; H3 20 /600 /1.2; tracking tối đa −0.045em chỉ heading lớn |
| Body / controls | Be Vietnam Pro: thiết kế cho tiếng Việt, dấu rõ; chọn vì ngữ cảnh nội dung, không chỉ vì Master Plan | Body 16 /400 /1.65–1.75; lead 18 /400 /1.6; controls 16 /600; caption 13–14 /400 /1.6 |
| Technical | JetBrains Mono: IDs, versions, nguồn kỹ thuật; không dùng mono cho mọi label | 13–14 /400 /1.6; tabular numbers khi cần |

Cả ba có subset `vietnamese` và license OFL trong metadata Google Fonts: [Be Vietnam Pro](https://github.com/google/fonts/blob/main/ofl/bevietnampro/METADATA.pb), [Space Grotesk](https://github.com/google/fonts/blob/main/ofl/spacegrotesk/METADATA.pb), [JetBrains Mono](https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/METADATA.pb). License: [Be Vietnam Pro OFL](https://github.com/google/fonts/blob/main/ofl/bevietnampro/OFL.txt), [Space Grotesk OFL](https://github.com/google/fonts/blob/main/ofl/spacegrotesk/OFL.txt), [JetBrains Mono OFL](https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt); SIL OFL 1.1. Khi self-host sau này giữ license/attribution, chỉ các weight cần dùng.

**Preview offline mặc định**, không dependency/font được cài. Dùng local font nếu đã có, fallback Segoe UI/sans-serif và Consolas/monospace. Có nút opt-in tải webfonts từ Google Fonts để chủ dự án review font đề xuất; mất mạng vẫn đọc được. Subset/license được xác minh qua metadata; **glyph rendering/fallback thực tế chưa kiểm browser**, không tự báo PASS readability. Chuỗi specimen có “Nguyễn”, “quyền riêng tư”, “bằng chứng”, “ễ ộ ắ ự” để kiểm dấu/chồng dấu và line height.

Grid: max content 1200 px; 12 cột conceptual desktop, 4 mobile, gap 24–32; gutter 32 desktop/20 mobile; reading measure khoảng 60–75ch. Spacing 4/8/12/16/24/32/48/64/80; section 72 desktop/48 mobile. Buttons 44–48 px, textarea min 160 px; panel padding 32→24; radius controls 6, workbench 8, không mọi khối thành card tròn. Mobile breakpoint preview 780 px: input/result/evidence xếp dọc, nav wrap, tables scroll trong container. Review bắt buộc 375/390, 768, 1440 px sau khi browser host khả dụng.

## Wireframes và UX decisions

Sơ đồ conceptual, chưa phải production pages. Nav: Home / Scanner / Investigation / Research; Learn/About đầy đủ vẫn P1. Nội dung chính và CTA left-aligned, không che sau animation.

```text
Home desktop                       Home mobile
Nav                                Brand / nav wrap
Headline + CTA | SMS → hai engine   Headline → CTA → SMS → hai engine
Problem → deconstruction           Problem → engine roles → preview
Engine roles → preview → research  Research → privacy → CTA

Scanner desktop                    Scanner mobile
Quick / Deep / Compare             Mode selector
SMS input | Result                 SMS input → action → result
Quick: ML result                   Quick: ML result
Deep: Agent → evidence link        Deep: result → evidence drawer/link
Compare: ML | Agent, errors riêng  Compare: ML → Agent, errors riêng

Investigation desktop              Investigation mobile
Case | pipeline/list | inspector   Case → steps selector/list
Decision + evidence + limits       Selected evidence → decision/limits
Node selection giữ context         Details/accordion; list thay graph

Research desktop                   Research mobile
Project tabs → overview            Project selector → overview
Method | citations                 Method → citation → experiment
Experiment → chart/table → errors  Chart/table scroll → errors/limits
Paper/group results tách nguồn     Paper/group labels luôn hiện
```

Scanner giữ SMS khi đổi mode, validation không gọi API trong preview; not-ready không giả loading. Compare production giữ phần thành công và lỗi độc lập; preview hiện trạng thái chưa kết nối cả hai, không gán nhãn cho SMS. Result-state select là **design review control**, không đưa vào user flow production. Evidence disclosure native `<details>`; unavailable nói rõ chưa thu thập, không dựng trace. Research là hàng editorial có empty states, không đặt dummy metrics để làm đầy.

## Hero shortlist cho Phase 1.5 — chưa code prototype

| Concept | Visual / cursor / scroll / motion | Công nghệ, fallback và trade-off |
|---|---|---|
| A — Signal Field | Trường tín hiệu quanh SMS; con trỏ tác động nhẹ lên vùng lân cận, CTA/hitbox đứng yên. Scroll: message → dấu hiệu → hai nhánh; reveal một lần, không khóa cuộn | CSS/SVG + Motion; Canvas 2D chỉ khi cần mật độ. Touch/reduced-motion: field tĩnh, semantic content đầy đủ. Ít GPU nhất nếu CSS/SVG; pause offscreen/hidden, không setState mỗi pointermove |
| B — Evidence Constellation | Các node SMS/brand/URL nối theo vai trò; hover/focus làm rõ node. Scroll theo lớp evidence, không dùng timer giả agent execution | SVG + Motion; React Flow chỉ workspace có pan/zoom thật. Mobile: ordered list + inspector; reduced-motion kết nối tĩnh. Tăng chi phí hit testing/labels và dễ rối; giới hạn số node |
| C — Liquid Intelligence | Dòng sáng trừu tượng nhẹ sau typography; cursor làm dịch chuyển sáng nhỏ. Scroll chuyển surface nhẹ tới nội dung research; không blur text | Phase 1.5 ưu tiên thử CSS layers + Motion, không thêm WebGL. Nếu không đủ concept thì ghi hạn chế, shader là P2 riêng khi justified. Mobile/reduced-motion static field; GPU/contrast/readability rủi ro cao nhất, có thể loại |

Giữ Motion + CSS/SVG, native scrolling, CTA dùng ngay; chưa GSAP/Lenis/WebGL. A là **ưu tiên prototype**, không phải hero đã được chọn. Signal Scan sau này chỉ tồn tại trong request thật; tất cả concept marketing phải ghi minh họa nếu không phải evidence live.

## Artifact, verification và review gate

[Mở preview](design/preview.html): một file HTML/CSS/JS, đổi 3 palette trên cùng DOM/content; mixed/light/dark surfaces; hero/nav/buttons/mode selectors/SMS/result-state/evidence, typography tiếng Việt, color ledger/ratio. Không API, lưu SMS, model, research metrics hay trace. Font tải ngoài chỉ theo click tùy chọn; không font/library dependency mặc định.

Skills dùng: frontend-design chính; build-awwwards-quality-sites chỉ art direction/reference constraints; animation-systems cho shortlist/fallback; modern-web-guidance local `color`/`accessibility` cho contrast/semantic labels/focus. Không gọi installer hoặc npx tải package: user cấm dependency mới; search bằng `rg` và đọc guides đã cài. Không áp GSAP/smooth-scroll/Iconify defaults.

**Browser checks: NOT RUN.** `cua.getState()` trả “browser access host is unavailable”, không có browser control tab. Không có screenshots/browser layout, glyph rendering, animation hoặc mobile validation để bàn giao; không coi static checks là browser PASS. Mở trực tiếp `docs/design/preview.html` trên máy, thử 3 palettes × mixed/light/dark, mode/input/state/disclosure, keyboard/zoom, desktop/mobile và optional fonts trước duyệt. Screenreader/reduced-motion/forced-colors cũng chờ browser/manual review.

Ghi chú lịch sử Phase 1: tại thời điểm đó Project Owner cần review palette/type/layout/shortlist. Quyết định được cập nhật bên dưới; academic decisions trong STATUS vẫn OPEN.

## Approved creative foundation — P1.5.4 + P1.5.5

Project Owner chọn **Signal Field** làm production hero direction; giữ **Palette A — Tidal Observatory**, Editorial Cyber Intelligence, dark cinematic hero và light editorial research surfaces. A đã vào Home skeleton; full Home vẫn thuộc P3.1. B/C giữ dev-only, không tiếp tục refinement.

Motion spec gọn, source tokens: `frontend/src/lib/motion.ts`; Motion dùng seconds, CSS dùng ms:

| Pattern / component | Intended use và behavior |
|---|---|
| PageTransition | Route hiện ngay, opacity .96 → 1 + rise 4px / 240ms; không exit wait, AppShell quản lý focus main/scroll reset |
| Reveal / section | Content 6px, section 12px / 240ms; section trigger một lần, không animate mọi phần tử |
| TextReveal / StaggeredContent | Whole phrase 6px / 360ms, giữ semantic text; nhóm nhỏ 8px / 240ms, stagger 40ms và delay cap 160ms |
| Buttons / SubtleHover | Reuse feedback 150ms, dịch nhỏ, CTA dùng ngay, không magnetic cursor |
| Tabs | LayoutGroup scoped instance, shared underline 240ms; panel đổi ngay, fade/rise 4px, giữ mounted children/input và arrow/Home/End |
| Disclosure | aria-expanded/controls; region giữ state, đóng inert/aria-hidden ngay; height auto + opacity 240ms trên vùng nhỏ do người dùng mở |
| Scroll story | Native scroll; marker transform theo viewport progress, text đọc độc lập; sticky chỉ desktop, không pin |
| Signal Field | 437 dots Canvas 2D, DPR ≤1.5, delta-capped RAF smoothing; pause giữ frame; offscreen/hidden/blur/unmount dừng loop/cleanup; SVG fallback |

Ease-out `[.22,1,.36,1]`; reduced-motion: instant/final state, tắt scroll scrub/idle/pointer deformation. Touch: field tĩnh, nội dung/CTA đầy đủ. Height animation là ngoại lệ Disclosure có layout cost giới hạn; các entrance/interaction khác ưu tiên transform/opacity. Không fake loading, predictions, evidence hoặc agent traces.

Focused visual audit dùng [Unslop của Damir Sokolovsky](https://heydamir.design/unslop) (CC BY 4.0): giữ approved field, tinted neutrals và typography. Home có một visual signature, copy trên vùng yên, một primary CTA và một secondary; không thêm glow, gradient, badges hay marketing cards. Browser evidence và giới hạn ở STATUS.

## P3.1 — Production Home implementation

P1.5.4/P1.5.5 được Technical Lead technically ACCEPTED; Project Owner chưa duyệt visual quality. P3.1 được chuyển lên trước Phase 2 để làm Home hoàn chỉnh và review chất lượng trực tiếp, không mở lại palette/concept research.

- Giữ Palette A, self-hosted fonts và Signal Field. Hero dùng typography lớn, dòng thứ hai lệch nhẹ, field tràn sang mép trang và nhường vùng yên cho copy/CTA; bỏ cảm giác khung demo Canvas. Mobile có hierarchy riêng và menu disclosure.
- Section sequence: dark hero → light SMS reading study → hai chương ML/Agent với surface khác nhau → hành trình sử dụng → research editorial index → dark CTA/footer. Engine chapters đảo vị trí diagram/copy trên desktop, đọc copy trước diagram trên mobile; không feature-card grid.
- SMS là nội dung hư cấu, `.example` không là link. Ba nút quan sát chọn highlight bằng tên và underline, không phân loại SMS. Diagram ML/Agent là mô tả phương pháp, không metrics/evidence/trace thật; nhãn ViGuard không áp sang SmishX. Paper/group results và trạng thái chưa tích hợp được nói rõ.
- Motion: một hero entrance, field pointer/idle hiện có; Reveal chỉ trên vài heading; native scroll rail mô tả hành trình, không chạy giả agent. Reduced motion giữ layout tĩnh hoàn chỉnh. Nav/focus/CTA dùng ngay.
- Self-review trên full desktop/mobile render: tăng kích thước chú thích/nav, bỏ caption field phụ trên mobile, thu gọn pause thành một dòng với accessible name đầy đủ, giảm khoảng nghỉ trước transition quote, thêm readiness ngay tại hero. Giữ nét riêng của field, không thêm gradient/glow/media stock.
- Assets: artwork Canvas/SVG và các diagram giao diện do dự án tạo, Lucide hiện có, fonts/license giữ nguyên; không thêm hình bên ngoài, GSAP/Lenis/WebGL hay dependency. Bundle review và browser evidence ở STATUS.

**Design Quality: PENDING Project Owner review**, không tự gán aesthetic approval từ build/tests hoặc ảnh chụp.
