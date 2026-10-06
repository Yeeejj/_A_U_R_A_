// wireframe-kit.jsx — Aura wireframe primitives (mono blueprint, grayscale + rose accent)
// All components export to window for use across screen files.

// Warm Filipino editorial palette — ivory canvas, deep rose primary,
// antique gold for AI/premium accents, cocoa text. (Token key `mono` is kept
// as the body-sans value so every existing reference picks up Inter.)
const WK = {
  ink:    'oklch(0.22 0.025 30)',   // cocoa charcoal — primary text / strong strokes
  mid:    'oklch(0.5 0.03 40)',     // muted — secondary text
  faint:  'oklch(0.74 0.028 55)',   // hairlines / placeholder strokes
  line:   'oklch(0.84 0.025 55)',   // dashed borders
  paper:  'oklch(0.99 0.012 60)',   // device bg — near ivory
  panel:  'oklch(0.955 0.018 60)',  // fill / annotation bg — muted
  panel2: 'oklch(0.915 0.022 55)',  // deeper fill
  accent: 'oklch(0.45 0.13 25)',    // deep rose — primary actions
  accentBg:'oklch(0.92 0.05 28)',   // rose tint fill
  accentInk:'oklch(0.4 0.12 26)',   // deep rose ink on tint
  gold:   'oklch(0.74 0.115 73)',   // antique gold — AI / premium accents
  goldBg: 'oklch(0.93 0.06 80)',    // soft champagne tint
  goldInk:'oklch(0.52 0.085 68)',   // gold ink on tint
  rose:   'oklch(0.65 0.15 20)',    // bright rose
  mono: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  serif: '"Fraunces", Georgia, "Times New Roman", serif',
};

// one-time CSS
if (typeof document !== 'undefined' && !document.getElementById('wk-styles')) {
  const s = document.createElement('style');
  s.id = 'wk-styles';
  s.textContent = `
    .wk *{box-sizing:border-box;font-family:${WK.mono};}
    .wk-scroll::-webkit-scrollbar{display:none;}
    .wk-scroll{scrollbar-width:none;}
  `;
  document.head.appendChild(s);
}

// ── Frame: phone (390×844) + margin annotation column ────────────────
function Frame({ children, purpose, components = [], states = [], flows = [] }) {
  return (
    <div className="wk" style={{ display: 'flex', gap: 0, width: '100%', height: '100%', background: WK.panel, fontFamily: WK.mono }}>
      <div style={{ flex: '0 0 390px', width: 390, height: 844, position: 'relative', background: WK.paper, boxShadow: 'inset 0 0 0 1px ' + WK.panel2 }}>
        {children}
      </div>
      <AnnoCol purpose={purpose} components={components} states={states} flows={flows} />
    </div>
  );
}

function AnnoCol({ purpose, components, states, flows }) {
  return (
    <div style={{ flex: 1, minWidth: 0, height: 844, padding: '26px 24px', borderLeft: '1px dashed ' + WK.line, display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden' }}>
      <AnnoBlock label="PURPOSE">
        <div style={{ fontSize: 12.5, lineHeight: 1.55, color: WK.ink }}>{purpose}</div>
      </AnnoBlock>
      {components.length > 0 && (
        <AnnoBlock label="KEY COMPONENTS">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {components.map((c, i) => (
              <li key={i} style={{ fontSize: 11.5, lineHeight: 1.4, color: WK.mid, display: 'flex', gap: 7 }}>
                <span style={{ color: WK.faint }}>—</span><span>{c}</span>
              </li>
            ))}
          </ul>
        </AnnoBlock>
      )}
      {states.length > 0 && (
        <AnnoBlock label="STATES">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {states.map((st, i) => <StateTag key={i} kind={st} />)}
          </div>
        </AnnoBlock>
      )}
      {flows.length > 0 && (
        <AnnoBlock label="FLOW">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {flows.map((f, i) => (
              <div key={i} style={{ fontSize: 11, lineHeight: 1.4, color: WK.mid, display: 'flex', gap: 6, alignItems: 'baseline' }}>
                <span style={{ color: WK.accent, fontWeight: 700 }}>→</span><span>{f}</span>
              </div>
            ))}
          </div>
        </AnnoBlock>
      )}
    </div>
  );
}

function AnnoBlock({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, letterSpacing: 1.5, color: WK.faint, fontWeight: 700, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

const STATE_STYLES = {
  empty:   { bg: WK.panel2, fg: WK.mid },
  loading: { bg: WK.panel2, fg: WK.mid },
  error:   { bg: '#f4e2e0', fg: '#9c5246' },
  success: { bg: WK.accentBg, fg: WK.accentInk },
  capture: { bg: WK.panel2, fg: WK.mid },
  result:  { bg: WK.accentBg, fg: WK.accentInk },
};
function StateTag({ kind }) {
  const st = STATE_STYLES[kind] || { bg: WK.panel2, fg: WK.mid };
  return (
    <span style={{ fontSize: 9.5, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', borderRadius: 2, background: st.bg, color: st.fg }}>{kind}</span>
  );
}

// ── Phone scaffold ───────────────────────────────────────────────────
function Phone({ children, tab, dark, statusInk }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: dark ? '#2b2926' : WK.paper, overflow: 'hidden' }}>
      <StatusBar ink={statusInk || (dark ? '#fff' : WK.ink)} />
      <div className="wk-scroll" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {tab !== undefined && <TabBar active={tab} />}
    </div>
  );
}

function StatusBar({ ink = WK.ink }) {
  return (
    <div style={{ flex: '0 0 30px', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', fontSize: 11, fontWeight: 700, color: ink, letterSpacing: 0.3 }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center', fontWeight: 600 }}>
        <span style={{ letterSpacing: -1 }}>●●●</span>
        <span style={{ fontSize: 10 }}>WiFi</span>
        <span style={{ border: '1px solid ' + ink, borderRadius: 2, padding: '0 3px', fontSize: 8, lineHeight: 1.5 }}>82</span>
      </span>
    </div>
  );
}

// Bottom tab bar — 5 tabs, center Scan raised
const TABS = [
  { id: 'home', label: 'Home', glyph: '⌂' },
  { id: 'discover', label: 'Discover', glyph: '◎' },
  { id: 'scan', label: 'Scan', glyph: '◉' },
  { id: 'community', label: 'Community', glyph: '◈' },
  { id: 'profile', label: 'Profile', glyph: '◐' },
];
function TabBar({ active }) {
  return (
    <div style={{ flex: '0 0 64px', height: 64, borderTop: '1px dashed ' + WK.line, background: WK.paper, display: 'flex', position: 'relative' }}>
      {TABS.map((t) => {
        const on = t.id === active;
        if (t.id === 'scan') {
          return (
            <div key={t.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
              <div style={{ width: 52, height: 52, marginTop: -18, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 4px 12px oklch(0.45 0.13 25 / 0.32)' }}>{t.glyph}</div>
              <span style={{ fontSize: 9, color: WK.accentInk, marginTop: 3, fontWeight: 700 }}>{t.label}</span>
            </div>
          );
        }
        return (
          <div key={t.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: on ? WK.ink : WK.faint }}>
            <span style={{ fontSize: 18, fontWeight: on ? 700 : 400 }}>{t.glyph}</span>
            <span style={{ fontSize: 9, fontWeight: on ? 700 : 500 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── App bar ──────────────────────────────────────────────────────────
function AppBar({ title, back, action, dark }) {
  const ink = dark ? '#fff' : WK.ink;
  return (
    <div style={{ flex: '0 0 50px', height: 50, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, borderBottom: '1px dashed ' + WK.line }}>
      {back && <span style={{ fontSize: 20, color: ink, fontWeight: 300 }}>‹</span>}
      <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: ink, letterSpacing: 0.2 }}>{title}</span>
      {action && <span style={{ width: 30, height: 30, border: '1px dashed ' + WK.line, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: WK.mid }}>{action}</span>}
    </div>
  );
}

// ── Body wrapper (padded scroll region) ──────────────────────────────
function Body({ children, pad = 16, gap = 14, scroll, style }) {
  return (
    <div className="wk-scroll" style={{ flex: 1, minHeight: 0, overflow: scroll ? 'auto' : 'hidden', padding: pad, display: 'flex', flexDirection: 'column', gap, ...style }}>
      {children}
    </div>
  );
}

// ── Primitives ───────────────────────────────────────────────────────
// Image / photo placeholder: dashed box with X + label
function Ph({ h = 80, w = '100%', label, glyph, round = 4, accent, style }) {
  return (
    <div style={{ width: w, height: h, borderRadius: round, border: '1.5px dashed ' + (accent ? WK.accent : WK.line), background: accent ? WK.accentBg : WK.panel, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, ...style }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={accent ? WK.accent : WK.faint} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={accent ? WK.accent : WK.faint} strokeWidth="1" />
      </svg>
      {(label || glyph) && (
        <span style={{ position: 'relative', zIndex: 1, fontSize: 10, color: accent ? WK.accentInk : WK.mid, background: accent ? WK.accentBg : WK.panel, padding: '2px 6px', textAlign: 'center', maxWidth: '90%', lineHeight: 1.3 }}>
          {glyph && <span style={{ fontSize: 16, display: 'block' }}>{glyph}</span>}
          {label}
        </span>
      )}
    </div>
  );
}

// Text line bars (skeleton-ish but for hierarchy)
function TLine({ w = '100%', h = 8, strong, style }) {
  return <div style={{ width: w, height: h, borderRadius: 2, background: strong ? WK.mid : WK.faint, opacity: strong ? 0.9 : 0.55, ...style }} />;
}
function TLines({ lines = 3, gap = 6, last = '70%' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => <TLine key={i} w={i === lines - 1 ? last : '100%'} h={7} />)}
    </div>
  );
}

// Heading text (actual readable label, mono)
function H({ children, size = 16, w = 600, color, mt, mb, style }) {
  return <div style={{ fontFamily: WK.serif, fontSize: size, fontWeight: w, color: color || WK.ink, marginTop: mt, marginBottom: mb, lineHeight: 1.2, letterSpacing: -0.3, ...style }}>{children}</div>;
}
function Txt({ children, size = 11.5, color, w = 400, style }) {
  return <div style={{ fontSize: size, fontWeight: w, color: color || WK.mid, lineHeight: 1.45, ...style }}>{children}</div>;
}

// Buttons
function Btn({ children, kind = 'primary', full, sm, style }) {
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: sm ? 32 : 44, padding: sm ? '0 14px' : '0 18px', borderRadius: 6, fontSize: sm ? 11 : 13, fontWeight: 700, width: full ? '100%' : 'auto', letterSpacing: 0.2, flexShrink: 0 };
  const kinds = {
    primary:   { background: WK.accent, color: '#fff', border: '1px solid ' + WK.accent },
    secondary: { background: 'transparent', color: WK.ink, border: '1.5px solid ' + WK.line },
    ghost:     { background: WK.panel, color: WK.mid, border: '1px dashed ' + WK.line },
    link:      { background: 'transparent', color: WK.accentInk, border: 'none', textDecoration: 'underline', height: 'auto', padding: 0 },
  };
  return <div style={{ ...base, ...kinds[kind], ...style }}>{children}</div>;
}

// Chip (selectable pill)
function Chip({ children, on, accent, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 16, fontSize: 11, fontWeight: 600, border: '1.5px solid ' + (on ? WK.accent : WK.line), background: on ? WK.accentBg : 'transparent', color: on ? WK.accentInk : WK.mid, ...style }}>{children}</span>
  );
}

// FDA verified badge
function FDABadge({ sm, style }) {
  return null;
}

// Generic dashed card container
function Card({ children, pad = 12, accent, style }) {
  return (
    <div style={{ border: '1.5px dashed ' + (accent ? WK.accent : WK.line), borderRadius: 8, padding: pad, background: accent ? WK.accentBg : WK.paper, ...style }}>{children}</div>
  );
}

// Product card (vertical)
function ProductCard({ w = '100%', h }) {
  return (
    <div style={{ width: w, border: '1px dashed ' + WK.line, borderRadius: 8, overflow: 'hidden', background: WK.paper, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <Ph h={h || 96} round={0} label="Product thumb" />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.mid }}>♡</span>
      </div>
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <TLine w="80%" h={7} strong />
        <TLine w="50%" h={6} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>₱___</span>
          <FDABadge sm />
        </div>
      </div>
    </div>
  );
}

// AI result card
function AICard({ title, confidence, children, cta }) {
  return (
    <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, overflow: 'hidden', background: WK.paper }}>
      <div style={{ background: WK.goldBg, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: WK.goldInk }}>AI RESULT</span>
        {confidence != null && <Confidence value={confidence} />}
      </div>
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {title && <H size={15} color={WK.ink}>{title}</H>}
        {children}
        {cta && <Btn kind="primary" full sm style={{ marginTop: 2 }}>{cta}</Btn>}
      </div>
    </div>
  );
}
function Confidence({ value }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 56, height: 5, borderRadius: 3, background: WK.panel2, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: value + '%', background: WK.gold }} />
      </span>
      <span style={{ fontSize: 9.5, fontWeight: 700, color: WK.goldInk }}>{value}%</span>
    </span>
  );
}

// Processing / loading block
function Processing({ label = 'Analyzing…', sub, pct }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24, textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px dashed ' + WK.gold, borderTopColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 20, color: WK.gold }}>◐</span>
      </div>
      <H size={14}>{label}</H>
      {sub && <Txt size={11} style={{ maxWidth: 220 }}>{sub}</Txt>}
      {pct != null && (
        <div style={{ width: 180, height: 6, borderRadius: 3, background: WK.panel2, overflow: 'hidden' }}>
          <div style={{ width: pct + '%', height: '100%', background: WK.gold }} />
        </div>
      )}
    </div>
  );
}

// Camera capture frame
function CameraFrame({ guide = 'face', hint, children }) {
  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#2b2926', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* viewport placeholder */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff" strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#fff" strokeWidth="1" />
        </svg>
        {/* guide overlay */}
        {guide === 'face' && <div style={{ width: 170, height: 230, border: '2px dashed rgba(255,255,255,.7)', borderRadius: '50%', position: 'relative', zIndex: 1 }} />}
        {guide === 'rect' && <div style={{ width: 240, height: 150, border: '2px dashed rgba(255,255,255,.7)', borderRadius: 8, position: 'relative', zIndex: 1 }} />}
        <span style={{ position: 'absolute', top: 14, left: 0, right: 0, textAlign: 'center', fontSize: 10.5, color: 'rgba(255,255,255,.8)', zIndex: 2 }}>Live camera viewport</span>
        {children}
      </div>
      {/* capture controls */}
      <div style={{ flex: '0 0 96px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 28px', position: 'relative' }}>
        {hint && <span style={{ position: 'absolute', top: 6, left: 0, right: 0, textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,.7)' }}>{hint}</span>}
        <span style={{ width: 36, height: 36, borderRadius: 7, border: '1px dashed rgba(255,255,255,.5)', color: 'rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>⚡</span>
        <div style={{ width: 64, height: 64, borderRadius: '50%', border: '4px solid #fff', background: WK.accent }} />
        <span style={{ width: 36, height: 36, borderRadius: '50%', border: '1px dashed rgba(255,255,255,.5)', color: 'rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⟲</span>
      </div>
    </div>
  );
}

// Banner (free-tier / no-ads)
function Banner({ children, icon = '◇', style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 6, border: '1px dashed ' + WK.accent, background: WK.accentBg, ...style }}>
      <span style={{ fontSize: 13, color: WK.accent }}>{icon}</span>
      <span style={{ fontSize: 10.5, color: WK.accentInk, fontWeight: 600, lineHeight: 1.35 }}>{children}</span>
    </div>
  );
}

// Section label inside screen
function SecLabel({ children, more }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{children}</span>
      {more && <span style={{ fontSize: 10, color: WK.mid }}>{more}</span>}
    </div>
  );
}

// Row (list item)
function Row({ children, style }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px dashed ' + WK.line, ...style }}>{children}</div>;
}

// Progress dots (carousel / steps)
function Dots({ n, active }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, background: i === active ? WK.accent : WK.faint }} />
      ))}
    </div>
  );
}

// Progress bar (stepper)
function ProgBar({ pct }) {
  return (
    <div style={{ width: '100%', height: 5, borderRadius: 3, background: WK.panel2, overflow: 'hidden' }}>
      <div style={{ width: pct + '%', height: '100%', background: WK.accent }} />
    </div>
  );
}

// Empty state block
function Empty({ icon = '◇', title, sub, cta }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 28, textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: WK.faint }}>{icon}</div>
      <H size={14}>{title}</H>
      {sub && <Txt size={11} style={{ maxWidth: 220 }}>{sub}</Txt>}
      {cta && <Btn kind="primary" sm style={{ marginTop: 4 }}>{cta}</Btn>}
    </div>
  );
}

// Error block
function ErrorBlock({ title = 'Something went wrong', sub, cta = 'Retry' }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 28, textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px dashed #c98a80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#bd7163' }}>!</div>
      <H size={14}>{title}</H>
      {sub && <Txt size={11} style={{ maxWidth: 230 }}>{sub}</Txt>}
      <Btn kind="secondary" sm style={{ marginTop: 4 }}>↻ {cta}</Btn>
    </div>
  );
}

Object.assign(window, {
  WK, Frame, AnnoCol, AnnoBlock, StateTag, Phone, StatusBar, TabBar, AppBar, Body,
  Ph, TLine, TLines, H, Txt, Btn, Chip, FDABadge, Card, ProductCard, AICard, Confidence,
  Processing, CameraFrame, Banner, SecLabel, Row, Dots, ProgBar, Empty, ErrorBlock,
});
