// screens-l3a.jsx — Layer 3 AI modules 9-11 (Skin Tone, Skin Condition, Ingredient Safety)
// Each module = 3 frames: capture/entry → processing → result

// ── shared bits ──────────────────────────────────────────────────────
function ModuleHeader({ title, step }) {
  return (
    <div style={{ position: 'relative' }}>
      <AppBar title={title} back />
      {step && (
        <div style={{ display: 'flex', gap: 6, padding: '8px 16px 0' }}>
          {['Capture', 'Processing', 'Result'].map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 3, borderRadius: 2, background: i + 1 <= step ? WK.accent : WK.panel2 }} />
              <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.3, color: i + 1 === step ? WK.accentInk : WK.faint }}>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MonkScale({ active }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ flex: 1, position: 'relative' }}>
          <div style={{ height: 34, borderRadius: 3, background: `hsl(28 ${36 - i * 1.5}% ${90 - i * 7.6}%)`, border: i === active ? '2.5px solid ' + WK.accent : '1px solid rgba(0,0,0,.08)' }} />
          <div style={{ textAlign: 'center', fontSize: 7.5, color: i === active ? WK.accentInk : WK.faint, marginTop: 2, fontWeight: i === active ? 700 : 400 }}>{i + 1}</div>
          {i === active && <span style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: WK.accent }}>▼</span>}
        </div>
      ))}
    </div>
  );
}

// ════════ 9 · SKIN TONE ANALYSIS ════════
function SkinToneCapture() {
  return (
    <Frame
      purpose="Capture a well-lit selfie to classify skin tone. Guide overlay + lighting hint."
      components={['Camera viewport', 'Face guide oval', 'Capture button', 'Flip camera', 'Lighting hint']}
      states={['capture']}
      flows={['Capture → Processing']}>
      <Phone statusInk="#fff">
        <ModuleHeader title="Skin Tone Analysis" step={1} />
        <CameraFrame guide="face" hint="Center your face · find even, natural light" />
      </Phone>
    </Frame>
  );
}
function SkinToneProcessing() {
  return (
    <Frame
      purpose="On-device classification running. Communicates that analysis is private and quick."
      components={['Captured-photo thumb', 'Processing spinner', 'Progress copy', 'Privacy note']}
      states={['loading']}
      flows={['Auto → Result', 'Failure → Error / retake']}>
      <Phone>
        <ModuleHeader title="Skin Tone Analysis" step={2} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16 }}><Ph h={140} label="Captured selfie" accent /></div>
          <Processing label="Classifying your skin tone…" sub="Mapping to the 10-point Monk Skin Tone Scale. Runs on your device." pct={70} />
        </div>
      </Phone>
    </Frame>
  );
}
function SkinToneResult() {
  return (
    <Frame
      purpose="Show detected Monk Skin Tone match with confidence + a CTA to use it for matching everywhere."
      components={['Monk scale row w/ match highlighted', 'AI result card + confidence', '“Use for matching” CTA', 'Retake link']}
      states={['result', 'success']}
      flows={['Use this → saved to profile → shade-aware results', 'Retake → Capture']}>
      <Phone>
        <ModuleHeader title="Skin Tone Analysis" step={3} />
        <Body pad={16} gap={14}>
          <Ph h={110} label="Selfie + detected region" accent />
          <AICard title="Monk Skin Tone — MST 5" confidence={92} cta="Use this for matching">
            <Txt size={11}>A medium tone with warm-neutral undertones. We'll use this to rank shades and translate across brands.</Txt>
            <div style={{ marginTop: 8 }}><MonkScale active={4} /></div>
          </AICard>
          <div style={{ textAlign: 'center' }}><Btn kind="link">↻ Retake photo</Btn></div>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════ 10 · SKIN CONDITION DETECTION ════════
function SkinCondCapture() {
  return (
    <Frame
      purpose="Face scan to detect skin concerns. Region guide + steady-hold hint."
      components={['Camera viewport', 'Face guide', 'Capture button', 'Multi-angle hint']}
      states={['capture']}
      flows={['Capture → Processing']}>
      <Phone statusInk="#fff">
        <ModuleHeader title="Skin Condition" step={1} />
        <CameraFrame guide="face" hint="Hold steady · we'll scan forehead, cheeks & chin" />
      </Phone>
    </Frame>
  );
}
function SkinCondProcessing() {
  return (
    <Frame
      purpose="Detecting concerns across facial regions. Shows scan progress."
      components={['Captured photo w/ scan overlay', 'Region progress list', 'Processing copy']}
      states={['loading']}
      flows={['Auto → Result', 'Low quality → Error / retake']}>
      <Phone>
        <ModuleHeader title="Skin Condition" step={2} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 14 }}>
          <Ph h={150} label="Scanning regions…" accent />
          <Processing label="Detecting concerns…" sub="Analyzing texture, redness, spots & pores by region." pct={48} />
        </div>
      </Phone>
    </Frame>
  );
}
function SkinCondResult() {
  return (
    <Frame
      purpose="Diagnosis list: detected concerns with confidence + suggested ingredient directions (not medical advice)."
      components={['Concern rows w/ confidence', 'Suggested ingredients chips', 'Disclaimer', 'CTA → matching products']}
      states={['result']}
      flows={['Ingredient chip → Ingredient Scanner', 'Find products → Discover (filtered)']}>
      <Phone>
        <ModuleHeader title="Skin Condition" step={3} />
        <Body pad={16} gap={12} scroll>
          <Ph h={90} label="Annotated face map" accent />
          <SecLabel>Detected concerns</SecLabel>
          <ConcernRow label="Mild acne — T-zone" conf={88} ings="Salicylic acid · Niacinamide" />
          <ConcernRow label="Excess oil" conf={81} ings="Niacinamide · Zinc" />
          <ConcernRow label="Post-acne marks" conf={64} ings="Vitamin C · Alpha arbutin" />
          <Card style={{ background: WK.panel }}>
            <Txt size={10}>⚠ Informational only — not a medical diagnosis. Consult a dermatologist for concerns.</Txt>
          </Card>
          <Btn kind="primary" full>Find matching products</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function ConcernRow({ label, conf, ings }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <H size={12.5}>{label}</H>
        <Confidence value={conf} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {ings.split(' · ').map((x) => <Chip key={x}>{x}</Chip>)}
      </div>
    </div>
  );
}

// ════════ 11 · INGREDIENT SAFETY SCANNER ════════
function IngredientEntry() {
  return (
    <Frame
      purpose="Two entry modes — scan a product label or search an ingredient by name."
      components={['Mode toggle (scan / search)', 'Camera label-scan frame', 'Search field', 'Recent scans']}
      states={['capture', 'empty']}
      flows={['Scan label → Processing', 'Search ingredient → Result']}>
      <Phone statusInk="#fff">
        <ModuleHeader title="Ingredient Safety" step={1} />
        <div style={{ padding: '10px 16px', display: 'flex', gap: 0, background: WK.paper }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderBottom: '2px solid ' + WK.accent, fontSize: 11, fontWeight: 700, color: WK.accentInk }}>Scan label</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderBottom: '1px dashed ' + WK.line, fontSize: 11, fontWeight: 600, color: WK.mid }}>Search ingredient</div>
        </div>
        <CameraFrame guide="rect" hint="Frame the ingredients list on the label" />
      </Phone>
    </Frame>
  );
}
function IngredientProcessing() {
  return (
    <Frame
      purpose="OCR + safety lookup running on the scanned label."
      components={['Scanned-label thumb', 'OCR/parse progress', 'Found-ingredients counter']}
      states={['loading']}
      flows={['Auto → Result', 'Unreadable → Error / rescan']}>
      <Phone>
        <ModuleHeader title="Ingredient Safety" step={2} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 14 }}>
          <Ph h={150} label="Scanned label — OCR" accent />
          <Processing label="Reading ingredients…" sub="Found 18 ingredients · checking EWG / CIR safety data." pct={82} />
        </div>
      </Phone>
    </Frame>
  );
}
function IngredientResult() {
  return (
    <Frame
      purpose="Per-ingredient safety ratings (EWG/CIR-style); flagged items expand for detail."
      components={['Overall safety score', 'Ingredient rows w/ rating', 'Flagged item expanded', 'Find safer alts CTA']}
      states={['result']}
      flows={['Tap flagged → detail', 'Safer alternatives → Discover']}>
      <Phone>
        <ModuleHeader title="Ingredient Safety" step={3} />
        <Body pad={16} gap={10} scroll>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2.5px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: WK.accentInk }}>B</div>
            <div><Txt size={10} color={WK.accentInk}>Overall safety</Txt><H size={13} color={WK.ink}>Low concern · 2 flags</H></div>
          </Card>
          <SecLabel>18 ingredients</SecLabel>
          <IngRow name="Glycerin" rating="Low" />
          <IngRow name="Niacinamide" rating="Low" />
          <IngRow name="Fragrance (Parfum)" rating="Moderate" flagged expanded />
          <IngRow name="Phenoxyethanol" rating="Moderate" flagged />
          <IngRow name="Citric acid" rating="Low" />
        </Body>
      </Phone>
    </Frame>
  );
}
function IngRow({ name, rating, flagged, expanded }) {
  const col = rating === 'Low' ? WK.mid : '#bd7163';
  return (
    <div style={{ border: '1px dashed ' + (flagged ? '#d3a89f' : WK.line), borderRadius: 8, padding: '9px 11px', background: flagged ? '#faf0ee' : WK.paper }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Txt size={12} color={WK.ink} w={600}>{flagged ? '⚠ ' : ''}{name}</Txt>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: col }}>{rating}</span>
          <span style={{ fontSize: 11, color: WK.faint }}>{expanded ? '⌄' : '›'}</span>
        </span>
      </div>
      {expanded && <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed ' + WK.line }}><Txt size={10.5}>Potential irritant / allergen for sensitive skin. Common in scented products — patch-test recommended.</Txt></div>}
    </div>
  );
}

// ════════ 27 · AI COLOR ANALYSIS ════════
function CBasket({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3a2a08" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 8.5h15l-1.3 9.8a2 2 0 0 1-2 1.7H7.8a2 2 0 0 1-2-1.7L4.5 8.5Z" />
      <path d="M9 8.5 11.2 3.8M15 8.5 12.8 3.8" />
      <path d="M9.7 12v4M14.3 12v4" />
    </svg>
  );
}
function PaletteSwatches({ colors }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {colors.map((c, i) => <div key={i} style={{ width: 38, height: 38, borderRadius: 8, background: c, border: '1px solid rgba(0,0,0,.1)' }} />)}
    </div>
  );
}
function UndertoneMeter({ value }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {['Cool', 'Neutral', 'Warm'].map((o) => {
        const on = o.toLowerCase() === value;
        return <div key={o} style={{ flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 8, border: '1.5px solid ' + (on ? WK.gold : WK.line), background: on ? WK.goldBg : 'transparent', fontSize: 11, fontWeight: 700, color: on ? WK.goldInk : WK.mid }}>{o}{on ? ' ✓' : ''}</div>;
      })}
    </div>
  );
}
function ColorShopRow({ swatch, name, shade, price }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: swatch, border: '1px solid rgba(0,0,0,.1)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <H size={12}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}><Txt size={10}>{shade}</Txt><FDABadge sm /></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{price}</span>
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CBasket size={14} /></span>
      </div>
    </div>
  );
}
function ColorCapture() {
  return (
    <Frame
      purpose="Capture a bare-faced selfie in neutral daylight; we sample skin, eye & hair color to read the user's seasonal profile."
      components={['Camera viewport', 'Face guide oval', 'Capture button', 'Bare-face + daylight hint']}
      states={['capture']}
      flows={['Capture → Processing']}>
      <Phone statusInk="#fff">
        <ModuleHeader title="AI Color Analysis" step={1} />
        <CameraFrame guide="face" hint="Bare face · natural daylight · we read skin, eyes & hair" />
      </Phone>
    </Frame>
  );
}
function ColorProcessing() {
  return (
    <Frame
      purpose="Sampling color signals and matching against the 12 seasonal palettes. Runs on device."
      components={['Captured-photo thumb', 'Processing spinner', 'Sampling copy', 'Privacy note']}
      states={['loading']}
      flows={['Auto → Result', 'Low light → Error / retake']}>
      <Phone>
        <ModuleHeader title="AI Color Analysis" step={2} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 14 }}>
          <Ph h={150} label="Captured selfie · sampling color" accent />
          <Processing label="Reading your undertones…" sub="Sampling skin, eye & hair color against the 12 seasonal palettes." pct={64} />
        </div>
      </Phone>
    </Frame>
  );
}
function ColorResult() {
  return (
    <Frame
      purpose="The seasonal color profile: season + undertone with confidence, a flattering palette, a recommended makeup look, and a shoppable product list (gold basket)."
      components={['Season + undertone card + confidence', 'Undertone meter', 'Seasonal palette swatches', 'Recommended-look card + style chips', 'Shoppable product rows (basket)', 'Save to profile + Add palette CTA']}
      states={['result', 'success']}
      flows={['Save → seasonal profile on account', 'Product → Product Detail', 'Add palette → basket / checkout', 'Rescan → Capture']}>
      <Phone>
        <ModuleHeader title="AI Color Analysis" step={3} />
        <Body pad={16} gap={12} scroll>
          {/* season + undertone hero */}
          <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 12, overflow: 'hidden', background: WK.paper }}>
            <div style={{ background: WK.goldBg, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: WK.goldInk }}>AI COLOR PROFILE</span>
              <Confidence value={91} />
            </div>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                {['hsl(14 60% 52%)', 'hsl(40 68% 50%)', 'hsl(70 34% 40%)', 'hsl(28 52% 46%)'].map((c, i) => <div key={i} style={{ background: c }} />)}
              </div>
              <div>
                <Txt size={10} color={WK.goldInk}>Your season</Txt>
                <H size={18} color={WK.ink}>True Autumn</H>
                <Txt size={11}>Warm · golden undertone · medium contrast</Txt>
              </div>
            </div>
          </div>

          <SecLabel>Undertone</SecLabel>
          <UndertoneMeter value="warm" />

          <SecLabel more="8 colors">Your palette</SecLabel>
          <PaletteSwatches colors={['hsl(14 60% 52%)', 'hsl(8 62% 44%)', 'hsl(40 68% 50%)', 'hsl(70 34% 40%)', 'hsl(28 52% 46%)', 'hsl(10 66% 62%)', 'hsl(38 40% 78%)', 'hsl(130 22% 30%)']} />

          <SecLabel>Recommended look</SecLabel>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Ph h={70} w={70} round={8} accent label="Look" />
              <div style={{ flex: 1 }}>
                <H size={13}>Earthy & warm</H>
                <Txt size={11}>Bronze eyes, terracotta lip, sun-kissed glow. Lean warm-toned metallics — skip cool pinks & icy silvers.</Txt>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Bronze eye', 'Terracotta lip', 'Warm coral blush', 'Olive liner'].map((c) => <Chip key={c}>{c}</Chip>)}
            </div>
          </Card>

          <SecLabel more="Shop all">Shop your colors</SecLabel>
          <ColorShopRow swatch="hsl(12 62% 50%)" name="Ever Bilena Matte Lip" shade="Terracotta" price="₱195" />
          <ColorShopRow swatch="hsl(10 68% 64%)" name="Sunnies Face Airblush" shade="Beso · warm coral" price="₱345" />
          <ColorShopRow swatch="hsl(30 50% 46%)" name="BLK Cosmetics Bronzer" shade="Sunkissed" price="₱299" />

          <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
            <Btn kind="secondary" full sm style={{ height: 44 }}>Save to profile</Btn>
            <Btn kind="primary" full style={{ background: WK.gold, border: '1px solid ' + WK.gold, color: '#3a2a08' }}><CBasket size={15} /> Add palette</Btn>
          </div>
          <div style={{ textAlign: 'center' }}><Btn kind="link">↻ Rescan</Btn></div>
        </Body>
      </Phone>
    </Frame>
  );
}

Object.assign(window, {
  SkinToneCapture, SkinToneProcessing, SkinToneResult,
  SkinCondCapture, SkinCondProcessing, SkinCondResult,
  IngredientEntry, IngredientProcessing, IngredientResult,
  ColorCapture, ColorProcessing, ColorResult,
});
