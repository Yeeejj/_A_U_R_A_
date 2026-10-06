// screens-l3b.jsx — Layer 3 AI modules 12-15 (Shade Translator, AR Try-On, Dupe Finder, Tracker)

function StepHead({ title, step, labels, dark }) {
  return (
    <div>
      <AppBar title={title} back dark={dark} />
      {labels && (
        <div style={{ display: 'flex', gap: 6, padding: '8px 16px 0' }}>
          {labels.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 3, borderRadius: 2, background: i + 1 <= step ? WK.accent : 'rgba(150,150,150,.3)' }} />
              <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.3, color: i + 1 === step ? WK.accentInk : (dark ? 'rgba(255,255,255,.5)' : WK.faint) }}>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════ 12 · SHADE TRANSLATOR ════════
function ShadeInput() {
  return (
    <Frame
      purpose="Pick a product/shade the user already knows; we translate it across brands (CIELAB match)."
      components={['Search/pick a known product', 'Selected shade chip', 'Recent shades', 'Browse by brand', 'Translate CTA']}
      states={['empty', 'default']}
      flows={['Pick shade → Processing']}>
      <Phone>
        <StepHead title="Shade Translator" step={1} labels={['Pick', 'Matching', 'Results']} />
        <Body pad={16} gap={14}>
          <Txt size={12}>Start from a shade you already wear — we'll find equivalents in other brands.</Txt>
          <div style={{ height: 44, borderRadius: 22, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', fontSize: 12, color: WK.mid }}>⌕ Search brand or product…</div>
          <Card accent style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'hsl(26 30% 64%)', border: '1px solid rgba(0,0,0,.1)' }} />
            <div style={{ flex: 1 }}><Txt size={10} color={WK.accentInk}>Selected</Txt><H size={12} color={WK.ink}>Maybelline Fit Me · 330</H></div>
            <span style={{ color: WK.accent }}>✓</span>
          </Card>
          <SecLabel>Recent</SecLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            {['hsl(28 30% 78%)', 'hsl(26 28% 58%)', 'hsl(24 26% 44%)'].map((c, i) => (
              <div key={i} style={{ width: 40, height: 40, borderRadius: 8, background: c, border: '1px solid ' + WK.line }} />
            ))}
          </div>
          <SecLabel more="See all">Browse by brand</SecLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Maybelline', 'Ever Bilena', 'Vice Cosmetics', 'BLK', 'Sunnies Face', 'Happy Skin', 'Issy', 'Colourette'].map((b, i) => (
              <Chip key={b} on={i === 0}>{b}</Chip>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <Btn kind="primary" full>Translate shade</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function ShadeProcessing() {
  return (
    <Frame
      purpose="Computing perceptual color distance (CIELAB ΔE) against the cross-brand shade library."
      components={['Source-shade chip', 'Matching progress', 'Brands-scanned counter']}
      states={['loading']}
      flows={['Auto → Results']}>
      <Phone>
        <StepHead title="Shade Translator" step={2} labels={['Pick', 'Matching', 'Results']} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 14, alignItems: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 10, background: 'hsl(26 30% 64%)', border: '1px solid rgba(0,0,0,.1)', marginTop: 8 }} />
          <Processing label="Matching across brands…" sub="Comparing CIELAB ΔE across 40+ FDA-verified brands." pct={56} />
        </div>
      </Phone>
    </Frame>
  );
}
function ShadeResult() {
  return (
    <Frame
      purpose="Ranked cross-brand equivalents with match closeness + FDA badge on each."
      components={['Source vs match swatches', 'ΔE / match % per row', 'FDA badge', 'View product CTA']}
      states={['result']}
      flows={['Row → Product Detail']}>
      <Phone>
        <StepHead title="Shade Translator" step={3} labels={['Pick', 'Matching', 'Results']} />
        <Body pad={16} gap={10} scroll>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 7, background: 'hsl(26 30% 64%)' }} />
            <div style={{ flex: 1 }}><Txt size={10} color={WK.accentInk}>Translating from</Txt><H size={12} color={WK.ink}>Fit Me 330</H></div>
          </Card>
          <SecLabel>Closest matches</SecLabel>
          <ShadeMatch brand="Maybelline · 330" pct={99} c="hsl(26 30% 64%)" />
          <ShadeMatch brand="Ever Bilena · Med 3" pct={96} c="hsl(27 29% 62%)" />
          <ShadeMatch brand="Vice · Natural" pct={92} c="hsl(25 27% 60%)" />
          <ShadeMatch brand="BLK · 04 Honey" pct={88} c="hsl(28 31% 66%)" />
        </Body>
      </Phone>
    </Frame>
  );
}
function ShadeMatch({ brand, pct, c }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: 7, background: c, border: '1px solid rgba(0,0,0,.1)' }} />
      <div style={{ flex: 1 }}>
        <H size={12}>{brand}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}><Confidence value={pct} /><FDABadge sm /></div>
      </div>
      <span style={{ fontSize: 15, color: WK.faint }}>›</span>
    </div>
  );
}

// ════════ 13 · AR VIRTUAL TRY-ON ════════
function ARCapture() {
  return (
    <Frame
      purpose="Live camera with PBR product overlay; pick product/shade, tune intensity, capture/share."
      components={['Live AR viewport', 'Product/shade selector rail', 'Intensity slider', 'Capture / share', 'Add to routine']}
      states={['capture']}
      flows={['Select shade → re-render', 'Capture → share / save', 'Add to routine → Routine Builder']}>
      <Phone statusInk="#fff" dark>
        <StepHead title="AR Try-On" step={1} labels={['Try on', 'Rendering', 'Captured']} dark />
        <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#2b2926', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.22 }} preserveAspectRatio="none"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff" /><line x1="100%" y1="0" x2="0" y2="100%" stroke="#fff" /></svg>
            <div style={{ width: 150, height: 200, border: '2px dashed rgba(255,255,255,.6)', borderRadius: '50%', position: 'relative' }}>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,255,255,.7)', textAlign: 'center', padding: 12 }}>Live face w/ PBR lipstick overlay</span>
            </div>
            <div style={{ position: 'absolute', right: 14, top: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,.6)' }}>Intensity</span>
              <div style={{ width: 4, height: 90, borderRadius: 2, background: 'rgba(255,255,255,.25)', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: WK.accent }} />
              </div>
            </div>
          </div>
          {/* shade rail */}
          <div style={{ flex: '0 0 56px', display: 'flex', gap: 8, padding: '0 14px', alignItems: 'center', overflow: 'hidden' }}>
            {['hsl(2 60% 52%)', 'hsl(348 55% 60%)', 'hsl(15 55% 55%)', 'hsl(330 40% 58%)', 'hsl(20 45% 48%)'].map((c, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: i === 1 ? '2.5px solid #fff' : '1px solid rgba(255,255,255,.3)', flexShrink: 0 }} />
            ))}
          </div>
          <div style={{ flex: '0 0 84px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 24px' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)' }}>⤴ Share</span>
            <div style={{ width: 58, height: 58, borderRadius: '50%', border: '4px solid #fff', background: WK.accent }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)' }}>+ Routine</span>
          </div>
        </div>
      </Phone>
    </Frame>
  );
}
function ARProcessing() {
  return (
    <Frame
      purpose="Re-rendering the PBR overlay after a shade/intensity change or initial face-mesh lock."
      components={['Dimmed viewport', 'Face-mesh lock indicator', 'Rendering copy']}
      states={['loading']}
      flows={['Auto → live try-on']}>
      <Phone dark statusInk="#fff">
        <StepHead title="AR Try-On" step={2} labels={['Try on', 'Rendering', 'Captured']} dark />
        <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#2b2926', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px dashed ' + WK.accent, borderTopColor: 'transparent' }} />
          <H size={14} color="#fff">Locking face mesh…</H>
          <Txt size={11} color="rgba(255,255,255,.6)" style={{ maxWidth: 200, textAlign: 'center' }}>Rendering physically-based shade in your lighting.</Txt>
        </div>
      </Phone>
    </Frame>
  );
}
function ARResult() {
  return (
    <Frame
      purpose="Captured try-on still: confirm the look, save/share, or push the product into a routine."
      components={['Captured AR still', 'Applied-product card', 'Save / Share', 'Add to routine (primary)', 'Buy / find dupe']}
      states={['result', 'success']}
      flows={['Add to routine → Routine Builder', 'Find dupe → Dupe Finder']}>
      <Phone>
        <StepHead title="AR Try-On" step={3} labels={['Try on', 'Rendering', 'Captured']} />
        <Body pad={16} gap={12}>
          <Ph h={300} label="Captured try-on look" accent />
          <Card style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Ph h={42} w={42} label="" round={6} />
            <div style={{ flex: 1 }}><H size={12}>Vice Cosmetics · Liptint</H><div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}><Txt size={11} w={700} color={WK.ink}>₱249</Txt><FDABadge sm /></div></div>
          </Card>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn kind="secondary" full sm style={{ height: 44 }}>Find dupe</Btn>
            <Btn kind="primary" full>+ Add to routine</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════ 14 · DUPE FINDER ════════
function DupeInput() {
  return (
    <Frame
      purpose="Enter a target (often pricey) product; we find budget-optimized alternatives."
      components={['Target product search/scan', 'Selected target card', 'Budget cap slider', 'Find dupes CTA']}
      states={['empty', 'default']}
      flows={['Find dupes → Processing']}>
      <Phone>
        <StepHead title="Dupe Finder" step={1} labels={['Target', 'Finding', 'Dupes']} />
        <Body pad={16} gap={14}>
          <Txt size={12}>Tell us the product you love — we'll find cheaper matches that perform alike.</Txt>
          <div style={{ height: 44, borderRadius: 22, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', fontSize: 12, color: WK.mid }}>⌕ Search or scan a product…</div>
          <Card accent style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Ph h={48} w={48} label="" round={6} accent />
            <div style={{ flex: 1 }}><Txt size={10} color={WK.accentInk}>Target product</Txt><H size={12} color={WK.ink}>Estée Lauder Serum</H><Txt size={11} color={WK.ink} w={700}>₱4,200</Txt></div>
          </Card>
          <SecLabel>Max budget</SecLabel>
          <DupeSlider />
          <div style={{ flex: 1 }} />
          <Btn kind="primary" full>Find budget dupes</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function DupeSlider() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: WK.panel2 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', background: WK.accent, borderRadius: 3 }} />
        <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: '#fff', border: '2px solid ' + WK.accent }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: WK.mid }}><span>₱100</span><span style={{ color: WK.accentInk, fontWeight: 700 }}>under ₱600</span><span>₱2,000</span></div>
    </div>
  );
}
function DupeProcessing() {
  return (
    <Frame
      purpose="Ranking alternatives by ingredient + performance similarity within the budget cap."
      components={['Target thumb', 'Similarity-scan progress', 'Candidates-scanned counter']}
      states={['loading']}
      flows={['Auto → Dupes']}>
      <Phone>
        <StepHead title="Dupe Finder" step={2} labels={['Target', 'Finding', 'Dupes']} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 14 }}>
          <Ph h={120} label="Target product" accent />
          <Processing label="Finding dupes…" sub="Ranking 60 candidates by ingredient overlap & similarity." pct={72} />
        </div>
      </Phone>
    </Frame>
  );
}
function DupeResult() {
  return (
    <Frame
      purpose="Budget-optimized alternatives ranked by similarity %, with savings (₱) highlighted."
      components={['Dupe rows: similarity % + savings', 'FDA badge', 'Side-by-side compare CTA']}
      states={['result', 'success']}
      flows={['Compare → Product Comparison', 'Row → Product Detail']}>
      <Phone>
        <StepHead title="Dupe Finder" step={3} labels={['Target', 'Finding', 'Dupes']} />
        <Body pad={16} gap={10} scroll>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Ph h={34} w={34} label="" round={6} accent />
            <div style={{ flex: 1 }}><Txt size={10} color={WK.accentInk}>Dupes for</Txt><H size={12} color={WK.ink}>Estée Lauder Serum · ₱4,200</H></div>
          </Card>
          <SecLabel more="Compare ⇄">3 strong matches</SecLabel>
          <DupeRow name="The Ordinary Buffet" sim={94} price="₱890" save="3,310" />
          <DupeRow name="Skin Genie Pro Serum" sim={89} price="₱420" save="3,780" />
          <DupeRow name="Careline Repair" sim={82} price="₱180" save="4,020" />
        </Body>
      </Phone>
    </Frame>
  );
}
function DupeRow({ name, sim, price, save }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
      <Ph h={44} w={44} label="" round={6} />
      <div style={{ flex: 1 }}>
        <H size={12}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}><Confidence value={sim} /><FDABadge sm /></div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Txt size={12} color={WK.ink} w={700}>{price}</Txt>
        <div style={{ fontSize: 9.5, color: WK.accentInk, fontWeight: 700 }}>save ₱{save}</div>
      </div>
    </div>
  );
}

// ════════ 15 · 30-DAY EFFICACY TRACKER ════════
function TrackerSetup() {
  return (
    <Frame
      purpose="Empty/onboarding state: start a 30-day tracker for a routine, set a daily reminder."
      components={['Routine link', 'Goal/concern select', 'Reminder time', 'Start tracker CTA', 'Empty timeline']}
      states={['empty']}
      flows={['Start → daily log', 'Reminder → notifications']}>
      <Phone>
        <AppBar title="30-Day Tracker" back action="?" />
        <Body pad={16} gap={14}>
          <Ph h={120} label="Tracker intro illustration" round={10} />
          <H size={16}>Track what actually works</H>
          <Txt size={12}>Log your routine + a progress photo each day. See a before/after over 30 days.</Txt>
          <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Txt size={12} color={WK.ink}>Daily reminder</Txt><Txt size={11}>9:00 PM ›</Txt>
          </Card>
          <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Txt size={12} color={WK.ink}>Tracking goal</Txt><Txt size={11}>Clear acne ›</Txt>
          </Card>
          <div style={{ flex: 1 }} />
          <Btn kind="primary" full>Start my 30 days</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function TrackerLog() {
  return (
    <Frame
      purpose="Daily log: capture a progress photo, check off routine steps, add a note."
      components={['Day badge', 'Progress-photo capture', 'Routine checklist', 'Note field', 'Save day']}
      states={['capture']}
      flows={['Save → updates timeline & streak']}>
      <Phone>
        <AppBar title="Log · Day 12" back />
        <Body pad={16} gap={14}>
          <Ph h={150} label="Today's progress photo" accent />
          <SecLabel>Did you complete your routine?</SecLabel>
          <Check label="AM — Cleanser, Niacinamide, SPF" on />
          <Check label="PM — Cleanser, Retinol, Moisturizer" on />
          <Check label="Weekly — Exfoliant" />
          <div style={{ height: 56, borderRadius: 8, border: '1px dashed ' + WK.line, padding: 10, fontSize: 11, color: WK.faint }}>Add a note (optional)…</div>
          <Btn kind="primary" full>Save today</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function Check({ label, on }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 22, height: 22, borderRadius: 5, border: '1.5px solid ' + (on ? WK.accent : WK.line), background: on ? WK.accent : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{on ? '✓' : ''}</span>
      <Txt size={11.5} color={WK.ink}>{label}</Txt>
    </div>
  );
}
function TrackerResult() {
  return (
    <Frame
      purpose="Progress view: day-by-day timeline, before/after slider, streak indicator."
      components={['Streak / progress ring', 'Before/after compare slider', 'Day timeline strip', 'Reminder setting']}
      states={['result', 'success']}
      flows={['Day → that log entry', 'Entry → Journal/History']}>
      <Phone>
        <AppBar title="Your 30 Days" back action="⤴" />
        <Body pad={16} gap={14} scroll>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: WK.accentInk }}>12</div>
            <div><Txt size={10} color={WK.accentInk}>Current streak</Txt><H size={14} color={WK.ink}>12-day streak · 40%</H></div>
          </Card>
          <SecLabel>Before / after</SecLabel>
          <div style={{ position: 'relative', height: 170, borderRadius: 10, overflow: 'hidden', border: '1.5px dashed ' + WK.line, display: 'flex' }}>
            <div style={{ flex: 1, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: WK.mid }}>Day 1</div>
            <div style={{ flex: 1, background: WK.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: WK.accentInk }}>Day 12</div>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: WK.accent }}><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 26, height: 26, borderRadius: '50%', background: '#fff', border: '2px solid ' + WK.accent, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WK.accent }}>⇄</div></div>
          </div>
          <SecLabel>Timeline</SecLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ width: 26, height: 26, borderRadius: 5, border: '1px solid ' + WK.line, background: i < 12 ? WK.accentBg : WK.panel, fontSize: 8.5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i < 12 ? WK.accentInk : WK.faint }}>{i + 1}</div>
            ))}
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}

Object.assign(window, {
  ShadeInput, ShadeProcessing, ShadeResult,
  ARCapture, ARProcessing, ARResult,
  DupeInput, DupeProcessing, DupeResult,
  TrackerSetup, TrackerLog, TrackerResult,
});
