// screens-feat-a.jsx — Layer 9A · AI & analysis feature deep-dives
// Message thread · Brand shade translator · Ingredient safety vs profile ·
// Skin color card (PNG) · Tracker before/after · Progress video · Image search

// ── local helpers (Fx prefix) ───────────────────────────────────────
function FxBubble({ me, children, sub }) {
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
      <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 3, alignItems: me ? 'flex-end' : 'flex-start' }}>
        <div style={{ padding: '9px 12px', borderRadius: me ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: me ? WK.accent : WK.panel, color: me ? '#fff' : WK.ink, fontSize: 11.5, lineHeight: 1.4 }}>{children}</div>
        {sub && <span style={{ fontSize: 9, color: WK.faint }}>{sub}</span>}
      </div>
    </div>
  );
}
// labelled metric bar with delta
function FxMetric({ label, pct, delta, good }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: WK.ink, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: good ? WK.accentInk : WK.mid }}>{delta}</span>
      </div>
      <div style={{ height: 7, borderRadius: 4, background: WK.panel2, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: good ? WK.accent : WK.gold }} />
      </div>
    </div>
  );
}
// per-ingredient personalized safety row
function FxIng({ name, verdict, note }) {
  const map = {
    safe:    { bg: WK.accentBg, fg: WK.accentInk, glyph: '✓', word: 'Safe for you' },
    caution: { bg: WK.goldBg, fg: WK.goldInk, glyph: '!', word: 'Caution' },
    avoid:   { bg: '#f4e2e0', fg: '#9c5246', glyph: '✕', word: 'Avoid' },
  };
  const s = map[verdict];
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px dashed ' + WK.line }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: s.bg, color: s.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{s.glyph}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <H size={12}>{name}</H>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: s.fg, background: s.bg, borderRadius: 4, padding: '2px 6px' }}>{s.word}</span>
        </div>
        <Txt size={10.5} style={{ marginTop: 2 }}>{note}</Txt>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-42 Messaging — chat thread (shoppable + order-aware)
// ════════════════════════════════════════════════════════════════════
function MessageThread() {
  return (
    <Frame
      purpose="One-to-one thread. Brand/creator chat is shoppable & order-aware: product cards, order-status cards, and quick replies live inline."
      components={['Header: avatar · verified · online', 'Date divider', 'In/out bubbles', 'Inline product card bubble', 'Order-status bubble', 'Quick-reply chips', 'Input: attach · camera · send']}
      states={['default']}
      flows={['Product card → Product Detail', 'Order card → Order Tracking', 'Avatar → Brand Profile']}>
      <Phone>
        <div style={{ flex: '0 0 56px', height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', borderBottom: '1px dashed ' + WK.line }}>
          <span style={{ fontSize: 20, color: WK.ink, fontWeight: 300 }}>‹</span>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.mid }}>◐</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><H size={13}>CeraVe</H><span style={{ fontSize: 11, color: WK.accentInk }}>✓</span></div>
            <Txt size={9.5} style={{ color: WK.accentInk }}>● Online · replies in mins</Txt>
          </div>
          <span style={{ fontSize: 16, color: WK.mid }}>⋯</span>
        </div>
        <Body pad={14} gap={12} scroll>
          <div style={{ textAlign: 'center' }}><span style={{ fontSize: 9, color: WK.faint, background: WK.panel, borderRadius: 10, padding: '3px 10px' }}>Today</span></div>
          <FxBubble>Hi! When will my order arrive? 🙏</FxBubble>
          {/* order status card */}
          <div style={{ alignSelf: 'flex-start', maxWidth: '82%', border: '1px solid ' + WK.line, borderRadius: '12px 12px 12px 4px', overflow: 'hidden', background: WK.paper }}>
            <div style={{ background: WK.accentBg, padding: '8px 11px', display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 13, color: WK.accentInk }}>🚚</span><span style={{ fontSize: 10.5, fontWeight: 700, color: WK.accentInk }}>Order #AUR-90412 · Out for delivery</span>
            </div>
            <div style={{ padding: 10 }}><Txt size={10.5}>Arriving today, 2–5 PM via J&T Express.</Txt><Btn kind="secondary" sm full style={{ marginTop: 8, height: 32 }}>Track order →</Btn></div>
          </div>
          <FxBubble sub="9:42 AM">Out for delivery today! Here's the item in your order:</FxBubble>
          {/* product card bubble */}
          <div style={{ alignSelf: 'flex-start', maxWidth: '82%', border: '1px solid ' + WK.line, borderRadius: '12px 12px 12px 4px', padding: 8, display: 'flex', gap: 9, background: WK.paper }}>
            <Ph h={46} w={46} round={7} label="" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <H size={11}>Foaming Facial Cleanser</H>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}><span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>₱649</span><FDABadge sm /></div>
            </div>
          </div>
          <FxBubble me sub="9:43 AM · Read">Perfect, salamat! 💛</FxBubble>
        </Body>
        <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
            <Chip>Track order</Chip><Chip>Return item</Chip><Chip>Talk to human</Chip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, color: WK.mid }}>＋</span>
            <span style={{ fontSize: 16, color: WK.mid }}>◉</span>
            <div style={{ flex: 1, height: 38, borderRadius: 19, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 11.5, color: WK.faint }}>Message…</div>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>➤</span>
          </div>
        </div>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-43 Brand Shade Translator — for a specific brand's specific product
// ════════════════════════════════════════════════════════════════════
function BrandShade() {
  return (
    <Frame
      purpose="Shade translator scoped to ONE brand product. Takes the user's analyzed undertone/depth and returns their exact shade name in that line, with nearest alternatives."
      components={['Selected brand + product header', 'Your profile undertone/depth chips', 'Matched shade hero (swatch + name + code)', 'Match confidence', 'Nearby alternatives', 'Try On / Add to cart']}
      states={['result']}
      flows={['Try On → AR', 'Add → Cart', 'Change product → Search']}>
      <Phone>
        <AppBar title="Shade translator" back action="⇄" />
        <Body pad={16} gap={14} scroll>
          <Card style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Ph h={46} w={46} round={8} label="" />
            <div style={{ flex: 1 }}><Txt size={10}>Maybelline</Txt><H size={13}>Fit Me Matte + Poreless</H></div>
            <span style={{ fontSize: 10.5, color: WK.accentInk, fontWeight: 700 }}>Change ›</span>
          </Card>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Chip on>Warm undertone</Chip><Chip on>Depth MST-5</Chip><Chip>Matte finish</Chip>
          </div>
          <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: WK.goldBg, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: WK.goldInk }}>YOUR SHADE IN THIS PRODUCT</span>
              <Confidence value={94} />
            </div>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'hsl(28 38% 62%)', border: '2px solid ' + WK.line, flexShrink: 0 }} />
              <div>
                <H size={20}>330 Toffee</H>
                <Txt size={11} style={{ marginTop: 2 }}>Warm · medium-deep · matte</Txt>
                <Txt size={10} color={WK.faint} style={{ marginTop: 2 }}>≈ your MAC NC44 · Maybelline 330</Txt>
              </div>
            </div>
          </div>
          <SecLabel>If you prefer lighter / deeper</SecLabel>
          <div style={{ display: 'flex', gap: 10 }}>
            <FxShadeAlt name="322 Warm Honey" tone="hsl(28 40% 68%)" sub="−1 step" />
            <FxShadeAlt name="338 Spicy Brown" tone="hsl(26 36% 54%)" sub="+1 step" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="secondary" full sm style={{ height: 44 }}>◉ Try On</Btn>
            <Btn kind="primary" full>Add to cart · ₱299</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function FxShadeAlt({ name, tone, sub }) {
  return (
    <div style={{ flex: 1, border: '1px dashed ' + WK.line, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: tone, border: '1px solid ' + WK.line, flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}><H size={10.5} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</H><Txt size={9}>{sub}</Txt></div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-44 Ingredient Safety — analyzed against YOUR profile
// ════════════════════════════════════════════════════════════════════
function IngredientSafetyProfile() {
  return (
    <Frame
      purpose="Re-frames the ingredient scan as personal: every flag is judged against the user's own skin profile (acne-prone, sensitive, pregnancy, allergies) — not a generic list."
      components={['Personal safety score ring', 'Active profile context chips', 'Per-ingredient verdict (safe/caution/avoid) WITH the reason tied to profile', 'Allergy match alert', 'Find safer alternative']}
      states={['result']}
      flows={['Caution item → why explainer', 'Safer alternative → Dupe Finder', 'Edit profile → Skin Profile']}>
      <Phone>
        <AppBar title="Safe for you?" back action="⚗" />
        <Body pad={16} gap={14} scroll>
          <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 14, background: WK.goldBg }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid ' + WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: WK.goldInk, background: WK.paper }}>B+</div>
            <div style={{ flex: 1 }}>
              <H size={14} color={WK.ink}>Mostly safe for your skin</H>
              <Txt size={10.5} color={WK.goldInk}>2 of 18 ingredients need caution for you</Txt>
            </div>
          </div>
          <div>
            <Txt size={9.5} color={WK.faint} w={700} style={{ letterSpacing: 0.8, marginBottom: 7 }}>JUDGED AGAINST YOUR PROFILE</Txt>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip on>Acne-prone</Chip><Chip on>Sensitive</Chip><Chip on>Fragrance allergy</Chip><span style={{ fontSize: 10.5, color: WK.accentInk, fontWeight: 700, alignSelf: 'center' }}>Edit ›</span>
            </div>
          </div>
          <div style={{ border: '1px solid #c98a80', borderRadius: 10, padding: 11, display: 'flex', gap: 10, alignItems: 'center', background: '#f4e2e0' }}>
            <span style={{ fontSize: 16, color: '#9c5246' }}>⚠</span>
            <Txt size={10.5} style={{ color: '#9c5246', flex: 1 }}>Contains <b>Parfum</b> — matches an allergy on your profile.</Txt>
          </div>
          <SecLabel>Ingredient breakdown</SecLabel>
          <div>
            <FxIng name="Niacinamide" verdict="safe" note="Great for your oiliness & acne concerns." />
            <FxIng name="Parfum / Fragrance" verdict="avoid" note="Flagged — you listed a fragrance allergy." />
            <FxIng name="Denatured Alcohol" verdict="caution" note="Can aggravate your sensitive skin in high amounts." />
            <FxIng name="Glycerin" verdict="safe" note="Humectant — well tolerated for all profiles." />
          </div>
          <Btn kind="primary" full>Find a safer alternative →</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-45 Skin Color Card — shareable + PNG download
// ════════════════════════════════════════════════════════════════════
function SkinCard() {
  return (
    <Frame
      purpose="Turns the skin-tone / color-analysis result into a beautiful, shareable card the user can download as PNG or post — a keepsake + a tool they carry while shopping."
      components={['Rendered card preview (swatch · MST · undertone · season · hex)', 'Download PNG (primary)', 'Share to… ', 'Save to profile', 'Add to wallet/notes hint']}
      states={['result']}
      flows={['Download → PNG saved', 'Share → MOTD / social', 'Use while shopping → Shade Translator']}>
      <Phone>
        <AppBar title="Your skin card" back action="⤴" />
        <Body pad={16} gap={14} scroll>
          {/* the card */}
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid ' + WK.line, boxShadow: '0 8px 24px rgba(0,0,0,.1)' }}>
            <div style={{ background: 'linear-gradient(135deg, hsl(28 35% 64%), hsl(20 30% 52%))', padding: '18px 18px 16px', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.85 }}>AURA · SKIN CARD</span>
                <span style={{ fontSize: 16 }}>◐</span>
              </div>
              <div style={{ fontFamily: WK.serif, fontSize: 26, fontWeight: 600, marginTop: 16, lineHeight: 1.1 }}>Warm Autumn</div>
              <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Maria Santos · MST-5</div>
            </div>
            <div style={{ padding: 16, background: WK.paper, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['hsl(28 38% 70%)', 'hsl(26 36% 60%)', 'hsl(22 34% 50%)', 'hsl(18 30% 40%)'].map((c, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ height: 44, borderRadius: 7, background: c, border: '1px solid ' + WK.line }} />
                    <span style={{ fontSize: 8, color: WK.faint, textAlign: 'center', fontFamily: 'monospace' }}>#{['C9A47E', 'B98A63', '9E7350', '6E4F38'][i]}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <FxCardStat k="Undertone" v="Warm" /><FxCardStat k="Depth" v="Medium" /><FxCardStat k="Season" v="Autumn" />
              </div>
              <Txt size={9.5} color={WK.faint} style={{ textAlign: 'center' }}>Flattering: olive · rust · gold · cream · teal</Txt>
            </div>
          </div>
          <Btn kind="primary" full>⤓ Download PNG</Btn>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="secondary" full sm style={{ height: 42 }}>⤴ Share</Btn>
            <Btn kind="secondary" full sm style={{ height: 42 }}>♥ Save to profile</Btn>
          </div>
          <Banner icon="⇄">Carry your card while shopping — it powers shade matching everywhere.</Banner>
        </Body>
      </Phone>
    </Frame>
  );
}
function FxCardStat({ k, v }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 7, padding: '8px 6px', textAlign: 'center' }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: WK.ink }}>{v}</div>
      <div style={{ fontSize: 8.5, color: WK.mid, marginTop: 1 }}>{k}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-46 Tracker — Before & After analysis
// ════════════════════════════════════════════════════════════════════
function TrackerBeforeAfter() {
  return (
    <Frame
      purpose="Compares two tracker photos (Day 1 vs latest) with an AI read-out of measurable change — the payoff moment of the 30-day tracker."
      components={['Before/after compare slider', 'Date range picker', 'AI change summary', 'Per-concern metric deltas', 'Generate video / Share']}
      states={['result']}
      flows={['Generate reel → Progress Video', 'Share → MOTD / Community']}>
      <Phone>
        <AppBar title="Before & After" back action="⤴" />
        <Body pad={16} gap={14} scroll>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip on>Day 1 → Day 30</Chip>
            <Txt size={10} color={WK.mid}>Brightening AM routine</Txt>
          </div>
          {/* compare slider */}
          <div style={{ position: 'relative', height: 230, borderRadius: 12, overflow: 'hidden', border: '1px solid ' + WK.line }}>
            <Ph h={230} round={0} label="Latest · Day 30" />
            <div style={{ position: 'absolute', inset: 0, width: '50%', overflow: 'hidden', borderRight: '2px solid #fff' }}>
              <div style={{ width: 'calc(200%)', height: '100%' }}><Ph h={230} round={0} label="Before · Day 1" /></div>
            </div>
            <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,.5)', borderRadius: 4, padding: '2px 7px' }}>BEFORE</span>
            <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700, color: '#fff', background: WK.accent, borderRadius: 4, padding: '2px 7px' }}>AFTER</span>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 30, height: 30, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.ink, boxShadow: '0 2px 6px rgba(0,0,0,.3)' }}>⇄</div>
          </div>
          <AICard title="Visible improvement over 30 days" confidence={88}>
            <Txt size={11}>Acne lesions and redness reduced; overall tone looks more even. Keep going — consistency is working.</Txt>
          </AICard>
          <SecLabel>Measured change</SecLabel>
          <FxMetric label="Acne / breakouts" pct={60} delta="−42%" good />
          <FxMetric label="Redness" pct={48} delta="−28%" good />
          <FxMetric label="Skin brightness" pct={72} delta="+18%" good />
          <FxMetric label="Even tone" pct={66} delta="+15%" good />
          <Btn kind="primary" full>▶ Generate 30-day reel</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-47 Progress Video — auto-generated compilation
// ════════════════════════════════════════════════════════════════════
function ProgressVideo() {
  return (
    <Frame
      purpose="Stitches the tracker's daily/weekly photos into a shareable time-lapse reel — auto-aligned faces, music, and milestone captions."
      components={['Video preview w/ play + scrubber', 'Photo timeline (frames used)', 'Style/music picker', 'Caption + milestone overlays', 'Download / Share to Community']}
      states={['default']}
      flows={['Share → Community / MOTD', 'Download → saved', 'Add caption → editor']}>
      <Phone dark statusInk="#fff">
        <AppBar title="30-day glow-up reel" back dark action="⤓" />
        <Body pad={16} gap={14} scroll style={{ background: '#2b2926' }}>
          <div style={{ position: 'relative', height: 280, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,.15)' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#1f1d1b' }}>
              <svg width="100%" height="100%" style={{ opacity: 0.18 }} preserveAspectRatio="none"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff" /><line x1="100%" y1="0" x2="0" y2="100%" stroke="#fff" /></svg>
            </div>
            <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 700, color: '#fff', background: WK.accent, borderRadius: 4, padding: '3px 8px' }}>DAY 18 / 30</span>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: WK.ink }}>▶</div>
            <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}>
              <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.3)', overflow: 'hidden' }}><div style={{ width: '58%', height: '100%', background: '#fff' }} /></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: 'rgba(255,255,255,.7)' }}><span>0:09</span><span>0:15</span></div>
            </div>
          </div>
          {/* frame timeline */}
          <div style={{ display: 'flex', gap: 5, overflow: 'hidden' }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 40, borderRadius: 5, background: '#3a3733', border: '1px solid ' + (i === 4 ? WK.accent : 'rgba(255,255,255,.15)') }} />
            ))}
          </div>
          <div>
            <Txt size={10} style={{ color: 'rgba(255,255,255,.6)', fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>STYLE & MUSIC</Txt>
            <div style={{ display: 'flex', gap: 7, overflow: 'hidden' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#3a2a08', background: WK.gold, borderRadius: 14, padding: '6px 12px' }}>♪ Upbeat</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 14, padding: '6px 12px' }}>Calm</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 14, padding: '6px 12px' }}>No music</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="secondary" full sm style={{ height: 44, color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>⤓ Save</Btn>
            <Btn kind="primary" full>⤴ Share to Community</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-48 Search by Image — visual search
// ════════════════════════════════════════════════════════════════════
function ImageSearch() {
  return (
    <Frame
      purpose="Snap or upload a photo of any product/packaging and find it (or FDA-verified equivalents) in the catalog by visual match."
      components={['Captured/uploaded image w/ crop frame', 'Re-shoot / upload from gallery', 'Detected-object chips', 'Visual-match results grid w/ similarity %', 'FDA-verified-only toggle']}
      states={['result', 'empty']}
      flows={['Result → Product Detail', 'No exact match → Dupe Finder', 'Crop → re-search']}>
      <Phone>
        <AppBar title="Search by image" back action="◉" />
        <Body pad={16} gap={14} scroll>
          <div style={{ position: 'relative', height: 150, borderRadius: 12, overflow: 'hidden', border: '1px solid ' + WK.line }}>
            <Ph h={150} round={0} label="Your photo" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 96, height: 96, border: '2px solid #fff', borderRadius: 10, boxShadow: '0 0 0 999px rgba(0,0,0,.25)' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="secondary" full sm style={{ height: 38 }}>◉ Re-shoot</Btn>
            <Btn kind="secondary" full sm style={{ height: 38 }}>⊞ Gallery</Btn>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <Txt size={10} color={WK.faint} w={700}>DETECTED:</Txt>
            <Chip on>Serum bottle</Chip><Chip>Dropper</Chip><Chip>Amber glass</Chip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed ' + WK.line, borderBottom: '1px dashed ' + WK.line, padding: '9px 0' }}>
            <Txt size={11.5} color={WK.ink} w={700}>Visual matches · 12</Txt>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: WK.ink }}>FDA only <span style={{ width: 32, height: 18, borderRadius: 9, background: WK.accent, position: 'relative', display: 'inline-block' }}><span style={{ position: 'absolute', top: 2, left: 16, width: 14, height: 14, borderRadius: '50%', background: '#fff' }} /></span></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <FxMatchCard pct={96} /><FxMatchCard pct={89} /><FxMatchCard pct={84} /><FxMatchCard pct={78} />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function FxMatchCard({ pct }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <Ph h={88} round={0} label="" />
        <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 8.5, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, border: '1px solid ' + WK.gold, borderRadius: 10, padding: '2px 7px' }}>{pct}% match</span>
      </div>
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <TLine w="85%" h={7} strong /><TLine w="50%" h={6} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>₱___</span><FDABadge sm />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MessageThread, BrandShade, IngredientSafetyProfile, SkinCard,
  TrackerBeforeAfter, ProgressVideo, ImageSearch,
});
