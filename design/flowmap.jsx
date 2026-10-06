// flowmap.jsx — connected node-map of all 25 screens, grouped by layer

function FlowMap() {
  const W = 1500, Hgt = 980;
  // node: id, x, y, label, code, accent(optional)
  const N = (id, x, y, code, label, accent) => ({ id, x, y, code, label, accent });
  const nodes = [
    // L1 onboarding — top row left→right
    N('splash', 40, 60, 'L1-01', 'Splash'),
    N('onboard', 200, 60, 'L1-02', 'Onboarding'),
    N('auth', 360, 60, 'L1-03', 'Auth'),
    N('profile_setup', 520, 60, 'L1-04', 'Skin Profile'),
    N('perms', 680, 60, 'L1-05', 'Permissions'),
    // L2 core — center hub
    N('home', 680, 200, 'L2-06', 'Home', true),
    N('community', 520, 200, 'L2-26', 'Community', true),
    N('discover', 1000, 130, 'L2-07', 'Discover'),
    N('search', 1180, 130, 'L2-08', 'Search & Filter'),
    // L3 AI tools — middle band
    N('tone', 40, 350, 'L3-09', 'Skin Tone'),
    N('cond', 200, 350, 'L3-10', 'Skin Condition'),
    N('ing', 360, 350, 'L3-11', 'Ingredient Safety'),
    N('shade', 520, 350, 'L3-12', 'Shade Translator'),
    N('ar', 680, 350, 'L3-13', 'AR Try-On'),
    N('dupe', 840, 350, 'L3-14', 'Dupe Finder'),
    N('tracker', 1000, 350, 'L3-15', 'Tracker', true),
    N('color', 840, 440, 'L3-27', 'Color Analysis', true),
    // L4 product — lower band
    N('detail', 520, 520, 'L4-16', 'Product Detail', true),
    N('compare', 700, 520, 'L4-17', 'Comparison'),
    N('wishlist', 1020, 520, 'L4-19', 'Wishlist'),
    // L5 profile (Routine now lives here)
    N('profile', 1200, 350, 'L5-20', 'Profile'),
    N('routine', 1200, 470, 'L5-18', 'Routine'),
    N('journal', 1360, 350, 'L5-21', 'Journal'),
    N('achieve', 1360, 470, 'L5-22', 'Achievements'),
    // L6 settings
    N('settings', 1200, 690, 'L6-23', 'Settings'),
    N('subs', 1360, 690, 'L6-24', 'Subscription'),
    N('help', 1360, 810, 'L6-25', 'Help & Support'),
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const NW = 132, NH = 46;
  // edges [from, to, primary?]
  const edges = [
    ['splash', 'onboard', 1], ['onboard', 'auth', 1], ['auth', 'profile_setup', 1], ['profile_setup', 'perms', 1], ['perms', 'home', 1],
    ['home', 'discover'], ['discover', 'search'], ['home', 'community', 1], ['community', 'detail'],
    ['home', 'tone'], ['home', 'cond'], ['home', 'ing'], ['home', 'shade'], ['home', 'ar'], ['home', 'dupe'], ['home', 'tracker', 1], ['home', 'color'],
    ['color', 'detail'], ['color', 'profile'],
    ['tone', 'detail'], ['cond', 'detail'], ['shade', 'detail'], ['dupe', 'detail'], ['discover', 'detail'],
    ['detail', 'ing'], ['detail', 'shade'], ['detail', 'ar'], ['detail', 'dupe'], ['detail', 'compare'], ['detail', 'routine'],
    ['routine', 'tracker', 1], ['tracker', 'journal'],
    ['home', 'profile'], ['profile', 'journal'], ['profile', 'achieve'], ['profile', 'settings'], ['profile', 'wishlist'], ['profile', 'routine', 1],
    ['settings', 'subs'], ['settings', 'help'],
  ];

  const edgePath = (a, b) => {
    const ax = a.x + NW / 2, ay = a.y + NH / 2, bx = b.x + NW / 2, by = b.y + NH / 2;
    const mx = (ax + bx) / 2;
    return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
  };

  return (
    <div className="wk" style={{ width: '100%', height: '100%', background: WK.panel, padding: 36, fontFamily: WK.mono, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: WK.ink, letterSpacing: -0.5 }}>Aura — Flow Map</div>
        <div style={{ fontSize: 12, color: WK.mid }}>27 screens · 6 layers · primary paths in rose</div>
      </div>
      <div style={{ display: 'flex', gap: 18, marginBottom: 18, fontSize: 10, color: WK.mid }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 2, background: WK.accent }} /> primary onboarding / core path</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 2, background: WK.faint }} /> secondary navigation</span>
      </div>

      <div style={{ position: 'relative', width: W, height: Hgt }}>
        <svg width={W} height={Hgt} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill={WK.faint} /></marker>
            <marker id="arrA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill={WK.accent} /></marker>
          </defs>
          {edges.map(([f, t, p], i) => {
            const a = byId[f], b = byId[t];
            if (!a || !b) return null;
            return <path key={i} d={edgePath(a, b)} fill="none" stroke={p ? WK.accent : WK.faint} strokeWidth={p ? 2 : 1.2} strokeDasharray={p ? 'none' : '4 3'} markerEnd={p ? 'url(#arrA)' : 'url(#arr)'} opacity={p ? 0.9 : 0.6} />;
          })}
        </svg>
        {/* layer band labels */}
        {[['L1 · Onboarding', 46], ['L2 · Core', 186], ['L3 · AI Tools', 336], ['L4 · Product', 506], ['L5/6 · Profile & Settings', 676]].map(([t, y], i) => (
          <div key={i} style={{ position: 'absolute', left: -2, top: y, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: WK.faint, transform: 'translateY(-16px)' }}>{t}</div>
        ))}
        {nodes.map((n) => (
          <div key={n.id} style={{ position: 'absolute', left: n.x, top: n.y, width: NW, height: NH, borderRadius: 8, border: '1.5px ' + (n.accent ? 'solid ' + WK.accent : 'dashed ' + WK.line), background: n.accent ? WK.accentBg : WK.paper, padding: '6px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: n.accent ? WK.accentInk : WK.faint }}>{n.code}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: WK.ink, lineHeight: 1.1 }}>{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { FlowMap });
