// screens-l4-plus.jsx — Layer 4 (Product) · REDESIGNED + AR Try-On flow
// A richer product layer: detail v2 with an AR entry baked in, a 3-step
// product-context AR try-on (live filter → shade/finish studio → before/after
// capture), skin-matched reviews, ingredient breakdown, compare v2, saved v2.

// ── AR-specific dark-screen palette ──────────────────────────────────
const AR = {
  bg:    '#211f1d',
  panel: 'rgba(255,255,255,.08)',
  panelSolid: '#2c2926',
  line:  'rgba(255,255,255,.18)',
  ink:   '#f6f1ee',
  mid:   'rgba(246,241,238,.62)',
  faint: 'rgba(246,241,238,.4)',
  rose:  WK.rose,
  gold:  WK.gold,
};

// ════════════════════════════════════════════════════════════════════
// L4+ -16 · Product Detail (redesigned)
// ════════════════════════════════════════════════════════════════════
function ProductDetailV2() {
  return (
    <Frame
      purpose="Redesigned product record. The biggest change: AR Try-On is promoted from a buried Layer-3 tool to a first-class, product-context action — a live media tile in the gallery AND a persistent button in the sticky action bar, both pre-loaded with THIS product + your matched shade. Shades, reviews and ingredients are now skin-matched to the viewer, and a single sticky bar keeps Try-On + Add reachable from any scroll position."
      components={['Media gallery w/ live AR tile (tap → AR)', 'Skin-match score for the viewer', 'Shade selector → opens AR pre-loaded', 'Hybrid framing (makeup + skincare benefits)', 'FDA · CPNN verification', 'Reviews preview (skin-matched)', 'Ingredients & dupe entries', 'Sticky action bar: Try On · Add']}
      states={['default']}
      flows={['AR tile / Try On → L4+-AR1 (this product loaded)', 'Shade → AR with shade pre-selected', 'Reviews → L4+-16b', 'Ingredients → L4+-16c', 'Dupe → Dupe Finder', 'Add → Cart']}>
      <Phone>
        <AppBar title="Product" back action="♡" />
        <div className="wk-scroll" style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* media gallery — first tile is a LIVE AR entry */}
          <div style={{ display: 'flex', gap: 8, padding: 12, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: 150, flexShrink: 0 }}>
              <Ph h={190} w={150} round={10} label="" />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 10, border: '2px solid ' + WK.accent, background: 'oklch(0.45 0.13 25 / 0.14)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>◉</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: WK.accentInk }}>Try on live</span>
                <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 1, color: '#fff', background: WK.accent, borderRadius: 10, padding: '2px 8px' }}>AR FILTER</span>
              </div>
            </div>
            <Ph h={190} w={120} round={10} label="Front" />
            <Ph h={190} w={120} round={10} label="Swatch" />
          </div>

          <div style={{ padding: '0 16px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: WK.accentInk }}>MAKEUP · LIPS</span>
              <Txt size={11} style={{ marginTop: 5 }}>Sunnies Face</Txt>
              <H size={19}>Fluffmatte Lippie — “Hopeful”</H>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <H size={18} color={WK.ink}>₱345</H>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: WK.mid }}>★ 4.7 · 2.1k</span>
                <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, color: WK.accentInk, border: '1px solid ' + WK.accent, borderRadius: 14, padding: '5px 11px' }}>♡ Track price</span>
              </div>
            </div>

            {/* skin-match score — personalised to viewer */}
            <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 12, background: WK.goldBg }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', border: '3px solid ' + WK.gold, color: WK.goldInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>92%</div>
              <div style={{ flex: 1 }}>
                <H size={12.5} color={WK.ink}>Strong match for your skin</H>
                <Txt size={10} color={WK.goldInk}>Warm undertone · MST-5 · matte finish you favour</Txt>
              </div>
            </div>

            {/* shade selector — every swatch opens AR pre-loaded */}
            <div>
              <SecLabel more="Tap a shade to try on ◉">Shade · “Hopeful” ✓</SecLabel>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {['28 62% 58%', '20 58% 48%', '12 50% 40%', '8 46% 34%', '32 40% 56%', '16 44% 46%', '24 36% 38%'].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: 38, borderRadius: 6, background: `hsl(${h})`, border: i === 0 ? '2px solid ' + WK.accent : '1px solid ' + WK.line, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 3 }}>
                    {i === 0 && <span style={{ fontSize: 10, color: '#fff' }}>◉</span>}
                  </div>
                ))}
              </div>
              <Txt size={9.5} style={{ marginTop: 6 }}>Your AI-matched shade is pre-selected. Swatches open the live AR camera with that shade applied.</Txt>
            </div>

            {/* hybrid framing */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✦</span>
                <H size={12.5} color={WK.ink}>Matte colour with lip-care benefits</H>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Chip on>Full pigment</Chip><Chip on>Weightless matte</Chip>
              </div>
              <div style={{ borderTop: '1px dashed ' + WK.line, paddingTop: 9, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <PlusChip glyph="◌">Hyaluronic acid</PlusChip><PlusChip glyph="✧">Vitamin E</PlusChip>
              </div>
            </Card>

            {/* FDA + CPNN */}
            <Card accent style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>✓</div>
              <div style={{ flex: 1 }}>
                <H size={12} color={WK.ink}>FDA-registered · CPNN-verified</H>
                <Txt size={10}>CPNN-CM-2024-0091224 · tap to view on FDA registry</Txt>
              </div>
              <span style={{ fontSize: 16, color: WK.accentInk }}>›</span>
            </Card>

            {/* reviews preview — skin matched */}
            <div>
              <SecLabel more="See all 2.1k ›">Reviews from skin like yours</SecLabel>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <ReviewMini stars="★★★★★" who="Warm · MST-5 · combo" txt="Doesn't go patchy on morena skin. The matte isn't drying." />
                <ReviewMini stars="★★★★☆" who="Warm · MST-6 · oily" txt="Pigment is unreal for the price. Transfers a little." />
              </div>
            </div>

            {/* ingredients + dupe entries */}
            <RowLink icon="⚗" title="Ingredients & safety" sub="14 ingredients · 0 flags for your profile" />
            <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, background: WK.goldBg }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: WK.paper, border: '1px solid ' + WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.goldInk, flexShrink: 0 }}>₱</span>
              <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>Find a cheaper dupe</H><Txt size={10} color={WK.goldInk}>AI found 3 similar from ₱180 · save up to 48%</Txt></div>
              <span style={{ fontSize: 16, color: WK.goldInk }}>›</span>
            </div>
          </div>
        </div>

        {/* sticky action bar — Try-On always reachable */}
        <div style={{ flex: '0 0 auto', borderTop: '1px dashed ' + WK.line, background: WK.paper, padding: '10px 14px', display: 'flex', gap: 8 }}>
          <Btn kind="secondary" sm style={{ height: 46, flex: '0 0 132px', borderColor: WK.accent, color: WK.accentInk }}>◉ Try on · AR</Btn>
          <Btn kind="primary" full style={{ height: 46 }}><CartGlyph size={15} /> Add · ₱345</Btn>
        </div>
      </Phone>
    </Frame>
  );
}
function PlusChip({ glyph, children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 16, fontSize: 10.5, fontWeight: 600, border: '1px solid ' + WK.gold, background: WK.goldBg, color: WK.goldInk }}>
      <span style={{ fontSize: 11 }}>{glyph}</span>{children}
    </span>
  );
}
function ReviewMini({ stars, who, txt }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: WK.accent, letterSpacing: 1 }}>{stars}</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, borderRadius: 10, padding: '2px 7px' }}>{who}</span>
      </div>
      <Txt size={10.5} style={{ marginTop: 5 }}>{txt}</Txt>
    </div>
  );
}
function RowLink({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px dashed ' + WK.line, borderBottom: '1px dashed ' + WK.line }}>
      <span style={{ width: 30, height: 30, borderRadius: 7, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.ink }}>{icon}</span>
      <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>{title}</H><Txt size={10}>{sub}</Txt></div>
      <span style={{ color: WK.faint }}>›</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L4+ -AR1 · AR Try-On · Live filter
// ════════════════════════════════════════════════════════════════════
function ARTryOn() {
  return (
    <Frame
      purpose="The live AR try-on, entered FROM a product (not a generic Layer-3 tool). The real camera renders the selected product as a face filter in real time. The product context stays pinned at top; the shade rail and intensity live at the bottom so the face is never covered. This is the core 'AR / Filter' experience — pick a shade, see it on your own face instantly, then push deeper into the studio or capture."
      components={['Live camera viewport + face mesh guide', 'Pinned product chip (name · shade)', 'Live AR badge + match pill', 'Horizontal shade rail (your match flagged)', 'Intensity slider', 'Add-layer (stack blush/brow) entry', 'Capture shutter · flip cam · gallery', 'Studio (filter/finish) entry']}
      states={['result']}
      flows={['Adjust → L4+-AR2 (shade & finish studio)', 'Shutter → L4+-AR3 (before/after capture)', 'Add layer → stack another product', 'Add to cart (tried shade)']}>
      <Phone dark statusInk="#fff">
        <ArCamera>
          {/* pinned product context */}
          <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', alignItems: 'center', gap: 8, zIndex: 4 }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: AR.panel, border: '1px solid ' + AR.line, color: AR.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>‹</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: AR.panel, border: '1px solid ' + AR.line, borderRadius: 20, padding: '5px 6px 5px 5px' }}>
              <span style={{ width: 26, height: 26, borderRadius: 6, background: 'hsl(28 62% 58%)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: AR.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Fluffmatte · “Hopeful”</div>
                <div style={{ fontSize: 8.5, color: AR.mid }}>Your matched shade</div>
              </div>
            </div>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: AR.panel, border: '1px solid ' + AR.line, color: AR.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>?</span>
          </div>

          {/* live badge */}
          <span style={{ position: 'absolute', top: 56, left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,.45)', border: '1px solid ' + AR.line, borderRadius: 14, padding: '4px 11px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: WK.rose }} />
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: AR.ink }}>LIVE AR · 60 FPS</span>
          </span>

          {/* lip filter highlight marker on the face guide */}
          <span style={{ position: 'absolute', top: '57%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3, fontSize: 9, color: 'rgba(255,255,255,.85)', background: 'rgba(0,0,0,.4)', borderRadius: 10, padding: '3px 8px' }}>◠ lip filter applied</span>
        </ArCamera>

        {/* bottom control deck */}
        <div style={{ flex: '0 0 auto', background: AR.panelSolid, borderTop: '1px solid ' + AR.line, padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArShadeRail />
          <ArSlider label="Intensity" pct={68} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ArCtrl glyph="⊞" label="Gallery" />
            <ArShutter />
            <ArCtrl glyph="⟲" label="Flip" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <ArDeckBtn glyph="✦" label="Studio · filter" />
            <ArDeckBtn glyph="＋" label="Stack a layer" />
            <ArDeckBtn glyph="♡" label="Add ₱345" solid />
          </div>
        </div>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// L4+ -AR2 · AR Try-On · Shade & filter studio
// ════════════════════════════════════════════════════════════════════
function ARTryOnAdjust() {
  return (
    <Frame
      purpose="The expanded 'filter studio' bottom sheet over the live camera. Beyond a single shade, the user fine-tunes the look: full shade grid (AI-match flagged), finish (matte/satin/dewy/gloss), intensity & warmth, and a stacked-layers list so a whole face — lippie + blush + brow — can be tried as one filter and shopped together. This is what makes it a real 'filter', not just a tint preview."
      components={['Live preview strip (collapsed camera)', 'Finish selector (matte/satin/dewy/gloss)', 'Full shade grid w/ AI-match flag', 'Intensity + warmth sliders', 'Stacked layers list (multi-product look)', 'Compare-to-bare toggle', 'Save look · Add all to cart']}
      states={['result']}
      flows={['Back → L4+-AR1 live', 'Add layer → product picker', 'Save look → Shop the Look', 'Add all → Cart']}>
      <Phone dark statusInk="#fff">
        {/* collapsed live preview */}
        <div style={{ flex: '0 0 168px', position: 'relative', background: AR.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArMeshBg />
          <div style={{ width: 110, height: 140, border: '2px dashed rgba(255,255,255,.5)', borderRadius: '50%', position: 'relative', zIndex: 1 }} />
          <span style={{ position: 'absolute', top: 12, left: 14, zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,.45)', borderRadius: 12, padding: '4px 10px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: WK.rose }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: AR.ink }}>LIVE</span>
          </span>
          <span style={{ position: 'absolute', top: 12, right: 14, zIndex: 3, fontSize: 9.5, fontWeight: 700, color: AR.ink, background: 'rgba(0,0,0,.45)', borderRadius: 12, padding: '4px 10px' }}>Compare bare ◑</span>
        </div>

        {/* studio sheet */}
        <div className="wk-scroll" style={{ flex: 1, minHeight: 0, overflow: 'auto', background: AR.panelSolid, borderTop: '1px solid ' + AR.line, padding: '14px 14px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ width: 38, height: 4, borderRadius: 2, background: AR.line, alignSelf: 'center' }} />

          <div>
            <ArLabel>Finish</ArLabel>
            <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
              <ArSeg label="Matte" on /><ArSeg label="Satin" /><ArSeg label="Dewy" /><ArSeg label="Gloss" />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ArLabel>Shade · 12 options</ArLabel>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#2a2018', background: WK.gold, borderRadius: 10, padding: '2px 8px' }}>◐ AI match</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 7, marginTop: 9 }}>
              {['28 62% 58%','20 58% 48%','12 50% 40%','8 46% 34%','32 40% 56%','16 44% 46%','24 36% 38%','10 40% 30%','30 50% 62%','18 52% 44%','6 42% 30%','22 44% 52%'].map((h, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 7, background: `hsl(${h})`, border: i === 0 ? '2px solid #fff' : '1px solid ' + AR.line, position: 'relative' }}>
                  {i === 0 && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>✓</span>}
                  {i === 0 && <span style={{ position: 'absolute', top: -7, right: -4, fontSize: 9, color: WK.gold }}>★</span>}
                </div>
              ))}
            </div>
          </div>

          <ArSlider label="Intensity" pct={68} light />
          <ArSlider label="Warmth" pct={42} light />

          <div>
            <ArLabel>Layers in this look</ArLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 9 }}>
              <ArLayerRow swatch="hsl(28 62% 58%)" name="Lippie · “Hopeful”" role="Lips · matte" on />
              <ArLayerRow swatch="hsl(8 50% 60%)" name="Airblush · “Beso”" role="Cheeks · satin" on />
              <ArLayerRow swatch="hsl(24 30% 32%)" name="Brow Game" role="Brows · soft" />
              <div style={{ border: '1.5px dashed ' + AR.line, borderRadius: 8, padding: 11, textAlign: 'center', fontSize: 11, fontWeight: 600, color: AR.mid }}>＋ Stack another product</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <ArDeckBtn glyph="⤓" label="Save look" />
            <ArDeckBtn glyph="♡" label="Add all · ₱720" solid />
          </div>
        </div>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// L4+ -AR3 · AR Try-On · Before / After & capture
// ════════════════════════════════════════════════════════════════════
function ARTryOnCapture() {
  return (
    <Frame
      purpose="Post-capture review. A split before/after of the user's own face proves the look, with a drag handle to wipe between bare and applied. From here the tried look converts: add the exact shades to cart, save to a look, or share to the community / as a MOTD. Closes the AR → commerce + AR → social loops directly off a real photo of the user."
      components={['Before/after split with wipe handle', 'Shades-used legend (shoppable)', 'Retake · save to gallery', 'Add tried shades to cart', 'Save as look', 'Share to community / MOTD']}
      states={['result']}
      flows={['Retake → L4+-AR1', 'Add shades → Cart', 'Save look → Shop the Look', 'Share → Share your MOTD / Community']}>
      <Phone dark statusInk="#fff">
        <AppBar title="Your try-on" back dark action="⤓" />
        {/* before/after split */}
        <div style={{ flex: '0 0 360px', position: 'relative', background: AR.bg, overflow: 'hidden' }}>
          <ArMeshBg />
          {/* labels */}
          <span style={{ position: 'absolute', top: 12, left: 14, zIndex: 3, fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: AR.ink, background: 'rgba(0,0,0,.5)', borderRadius: 10, padding: '4px 10px' }}>BEFORE</span>
          <span style={{ position: 'absolute', top: 12, right: 14, zIndex: 3, fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: '#2a2018', background: WK.gold, borderRadius: 10, padding: '4px 10px' }}>AFTER · AR</span>
          {/* wipe divider */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'rgba(255,255,255,.85)', zIndex: 3 }}>
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: '#fff', color: AR.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>⇄</span>
          </div>
          <span style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 3, fontSize: 9, color: AR.mid }}>Drag to compare</span>
        </div>

        <div className="wk-scroll" style={{ flex: 1, minHeight: 0, overflow: 'auto', background: AR.panelSolid, padding: '14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* shoppable legend */}
          <div>
            <ArLabel>Shades in this look — tap to shop</ArLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 9 }}>
              <ArLayerRow swatch="hsl(28 62% 58%)" name="Fluffmatte · “Hopeful”" role="₱345 · in stock" on shop />
              <ArLayerRow swatch="hsl(8 50% 60%)" name="Airblush · “Beso”" role="₱375 · in stock" on shop />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <ArDeckBtn glyph="⟲" label="Retake" />
            <ArDeckBtn glyph="✎" label="Save look" />
            <ArDeckBtn glyph="↗" label="Share MOTD" />
          </div>
          <Btn kind="primary" full style={{ height: 46 }}><CartGlyph size={15} /> Add both shades · ₱720</Btn>
          <Txt size={9.5} color={AR.faint} style={{ textAlign: 'center' }}>Photo stays on your device until you choose to share.</Txt>
        </div>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// L4+ -16b · Reviews (skin-matched)
// ════════════════════════════════════════════════════════════════════
function ProductReviews() {
  return (
    <Frame
      purpose="Full reviews, re-sorted around the question shoppers actually have: 'will this work on skin like mine?'. A 'people like you' filter surfaces reviewers with a matching tone/type/undertone first, photo reviews are AR-tagged when they used try-on, and the rating breakdown is split by skin profile so a 5-star average doesn't hide a poor match for darker tones."
      components={['Rating summary + distribution', 'People-like-you filter (default on)', 'Skin-profile chips on each review', 'AR-verified review tag', 'Photo review thumbnails', 'Helpful / sort controls', 'Write a review CTA']}
      states={['default']}
      flows={['Write review → F-52', 'Photo → review detail', 'AR-tagged → that try-on look']}>
      <Phone>
        <AppBar title="Reviews · 2.1k" back action="⌗" />
        <Body pad={16} gap={14} scroll>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <H size={30} color={WK.ink}>4.7</H>
              <div style={{ fontSize: 12, color: WK.accent, letterSpacing: 1 }}>★★★★★</div>
              <Txt size={9.5}>2,143 reviews</Txt>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['5',82],['4',12],['3',4],['2',1],['1',1]].map(([n, p]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 9, color: WK.mid, width: 8 }}>{n}</span>
                  <span style={{ flex: 1, height: 5, borderRadius: 3, background: WK.panel2, overflow: 'hidden' }}><span style={{ display: 'block', width: p + '%', height: '100%', background: WK.accent }} /></span>
                  <span style={{ fontSize: 9, color: WK.faint, width: 24 }}>{p}%</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
            <Chip on>◐ People like you</Chip><Chip>With photos</Chip><Chip>◉ AR tried</Chip><Chip>Recent</Chip>
          </div>

          {/* match callout */}
          <Banner icon="◐">Showing reviewers with your tone & type first — 312 close matches.</Banner>

          <ReviewFull stars="★★★★★" name="Andrea R." who="Warm · MST-5 · combo" ar txt="Used the AR try-on before buying and it was spot on. On real skin it's even better — true matte, no patches by lunch." />
          <ReviewFull stars="★★★★☆" name="Bea M." who="Warm · MST-6 · oily" photo txt="Pigment is incredible for ₱345. Knocked a star because it transfers onto cups." />
          <ReviewFull stars="★★★★★" name="Carla T." who="Neutral · MST-4 · dry" txt="Layer a balm under it if your lips are dry and it's perfect." />

          <Btn kind="secondary" full>✎ Write a review</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function ReviewFull({ stars, name, who, txt, ar, photo }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 28, height: 28, borderRadius: '50%', border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.mid }}>◐</span>
        <div style={{ flex: 1 }}>
          <H size={12}>{name}</H>
          <span style={{ fontSize: 9, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, borderRadius: 10, padding: '2px 7px' }}>{who}</span>
        </div>
        <span style={{ fontSize: 11, color: WK.accent, letterSpacing: 1 }}>{stars}</span>
      </div>
      <Txt size={10.5} color={WK.ink} style={{ lineHeight: 1.5 }}>{txt}</Txt>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {ar && <span style={{ fontSize: 9, fontWeight: 700, color: WK.accentInk, border: '1px solid ' + WK.accent, borderRadius: 10, padding: '2px 8px' }}>◉ Tried in AR</span>}
        {photo && <span style={{ width: 34, height: 34, borderRadius: 6, border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: WK.faint }}>▦</span>}
        <span style={{ marginLeft: 'auto', fontSize: 10, color: WK.mid }}>♡ Helpful · 24</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L4+ -16c · Ingredients & safety
// ════════════════════════════════════════════════════════════════════
function IngredientBreakdown() {
  return (
    <Frame
      purpose="A full, profile-aware ingredient breakdown — the deep screen behind the product's 'Ingredients & safety' row. Every ingredient is checked against the user's flagged sensitivities and pregnancy/age context, sorted flags-first, with plain-language function tags. Replaces the old single safety grade with a transparent, auditable list, and links straight to the Ingredient Safety scanner."
      components={['Personal safety summary (flags for you)', 'Sortable ingredient list', 'Per-ingredient: function · concern level', 'Your-sensitivity flag chips', 'Pregnancy / age context note', 'Open full scanner link']}
      states={['default']}
      flows={['Flagged item → ingredient detail', 'Scan another → L3-11', 'Back → Product Detail']}>
      <Phone>
        <AppBar title="Ingredients & safety" back />
        <Body pad={16} gap={13} scroll>
          <Card accent style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>✓</div>
            <div style={{ flex: 1 }}>
              <H size={13} color={WK.ink}>No flags for your profile</H>
              <Txt size={10}>Checked against: fragrance sensitivity · combo skin · 14 ingredients</Txt>
            </div>
          </Card>
          <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
            <Chip on>All 14</Chip><Chip>Flags first</Chip><Chip>Actives</Chip>
          </div>
          <IngSafetyRow name="Hyaluronic Acid" fn="Hydration · humectant" level="safe" />
          <IngSafetyRow name="Tocopherol (Vit E)" fn="Antioxidant · conditioning" level="safe" />
          <IngSafetyRow name="Ricinus Communis Oil" fn="Emollient · castor oil" level="safe" />
          <IngSafetyRow name="Parfum / Fragrance" fn="Scent" level="watch" note="You flagged fragrance sensitivity — low concentration here." />
          <IngSafetyRow name="Red 7 Lake (CI 15850)" fn="Colourant" level="safe" />
          <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, background: WK.goldBg }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: WK.paper, border: '1px solid ' + WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.goldInk, flexShrink: 0 }}>⚗</span>
            <div style={{ flex: 1 }}><H size={12} color={WK.ink}>Scan your own product</H><Txt size={10} color={WK.goldInk}>Check anything against your profile ›</Txt></div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function IngSafetyRow({ name, fn, level, note }) {
  const map = {
    safe:  { c: WK.accentInk, bg: WK.accentBg, b: WK.accent, t: 'OK for you', g: '✓' },
    watch: { c: WK.goldInk, bg: WK.goldBg, b: WK.gold, t: 'Watch', g: '!' },
  };
  const s = map[level] || map.safe;
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 11, display: 'flex', flexDirection: 'column', gap: note ? 7 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}><H size={12}>{name}</H><Txt size={9.5}>{fn}</Txt></div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontWeight: 700, color: s.c, background: s.bg, border: '1px solid ' + s.b, borderRadius: 12, padding: '3px 9px' }}>{s.g} {s.t}</span>
      </div>
      {note && <div style={{ borderTop: '1px dashed ' + WK.line, paddingTop: 7 }}><Txt size={9.5} color={WK.goldInk}>{note}</Txt></div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L4+ -17 · Compare + AR both
// ════════════════════════════════════════════════════════════════════
function ProductCompareV2() {
  return (
    <Frame
      purpose="Comparison upgraded with a visual head, a shade-match row, and the ability to try BOTH candidates in AR before deciding — the wireframe-era table is now a decision tool that pulls AR and skin-match into the same view. Winner is flagged on best value, but the user can flip the deciding metric."
      components={['Visual column heads w/ swatch', 'Try-both-in-AR CTA', 'Rows: price · shade match · safety · finish · FDA', 'Your-match row (personalised)', 'Winner flag (editable metric)', 'Choose / add CTA']}
      states={['default']}
      flows={['Try both → AR split try-on', 'Column → Product Detail', 'Choose → Cart']}>
      <Phone>
        <AppBar title="Compare" back />
        <Body pad={14} gap={0} scroll>
          <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr 1fr', alignItems: 'stretch' }}>
            <div />
            <CmpHead name="Fluffmatte" sub="“Hopeful”" sw="hsl(28 62% 58%)" winner />
            <CmpHead name="Velvet Stain" sub="“Saffron”" sw="hsl(18 56% 50%)" />
            <CmpRow head>Price</CmpRow><CmpCell hi>₱345</CmpCell><CmpCell>₱520</CmpCell>
            <CmpRow head>Your shade match</CmpRow><CmpCell hi>92%</CmpCell><CmpCell>78%</CmpCell>
            <CmpRow head>Finish</CmpRow><CmpCell>Matte</CmpCell><CmpCell>Satin</CmpCell>
            <CmpRow head>Safety (you)</CmpRow><CmpCell hi>No flags</CmpCell><CmpCell>1 watch</CmpCell>
            <CmpRow head>Wear time</CmpRow><CmpCell>6 hr</CmpCell><CmpCell hi>8 hr</CmpCell>
            <CmpRow head last>FDA · CPNN</CmpRow><CmpCell last hi>✓</CmpCell><CmpCell last hi>✓</CmpCell>
          </div>
          <div style={{ border: '1.5px solid ' + WK.accent, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, background: WK.accentBg, marginTop: 14 }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>◉</span>
            <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>Try both in AR</H><Txt size={10} color={WK.accentInk}>See each shade on your face, side by side</Txt></div>
            <span style={{ fontSize: 16, color: WK.accentInk }}>›</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Btn kind="secondary" full sm style={{ height: 44 }}>View</Btn>
            <Btn kind="primary" full>Choose Fluffmatte →</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function CmpHead({ name, sub, sw, winner }) {
  return (
    <div style={{ padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: winner ? WK.accentBg : 'transparent', borderRadius: '8px 8px 0 0' }}>
      <div style={{ width: 46, height: 46, borderRadius: 8, background: sw, border: winner ? '2px solid ' + WK.accent : '1px solid ' + WK.line }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: winner ? WK.accentInk : WK.ink, textAlign: 'center' }}>{name}</span>
      <span style={{ fontSize: 8.5, color: WK.mid }}>{sub}</span>
      {winner && <span style={{ fontSize: 8, color: WK.accentInk }}>★ best value</span>}
    </div>
  );
}
function CmpRow({ children, head, last }) {
  return <div style={{ padding: '11px 6px', borderBottom: last ? 'none' : '1px dashed ' + WK.line, fontSize: 10, fontWeight: 700, color: WK.mid, display: 'flex', alignItems: 'center' }}>{children}</div>;
}
function CmpCell({ children, hi, last }) {
  return <div style={{ padding: '11px 8px', borderBottom: last ? 'none' : '1px dashed ' + WK.line, fontSize: 11.5, fontWeight: hi ? 700 : 500, color: hi ? WK.accentInk : WK.ink, textAlign: 'center', background: hi ? 'rgba(248,231,236,.5)' : 'transparent' }}>{children}</div>;
}

// ════════════════════════════════════════════════════════════════════
// L4+ -19 · Saved (price-drop + AR-tried)
// ════════════════════════════════════════════════════════════════════
function WishlistV2() {
  return (
    <Frame
      purpose="Saved upgraded into an active shortlist: items the user already tried in AR are flagged, price-drops on tracked products surface at the top, and each card can go straight back to AR or into the cart. Grouped so the decision-ready (tried + matched) items lead, with an empty state for first-time users."
      components={['Price-drop alert strip', 'Saved grid: AR-tried + match badges', 'Quick re-try AR · add actions', 'Move to routine', 'Sort / group control', 'Empty state']}
      states={['default', 'empty']}
      flows={['Re-try → AR try-on', 'Card → Product Detail', 'Add → Cart', 'Move → Routine']}>
      <Phone tab="profile">
        <AppBar title="Saved · 8" back action="⌗" />
        <Body pad={16} gap={12} scroll>
          <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 10, background: WK.goldBg }}>
            <span style={{ fontSize: 15, color: WK.goldInk }}>↓</span>
            <div style={{ flex: 1 }}><H size={12} color={WK.ink}>2 price drops</H><Txt size={9.5} color={WK.goldInk}>Items you tracked are cheaper now</Txt></div>
            <span style={{ fontSize: 14, color: WK.goldInk }}>›</span>
          </div>
          <Txt size={9.5} color={WK.faint} style={{ fontWeight: 700, letterSpacing: 1 }}>TRIED IN AR · READY TO DECIDE</Txt>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <SavedCardV2 name="Fluffmatte · “Hopeful”" price="₱345" ar match drop /><SavedCardV2 name="Airblush · “Beso”" price="₱375" ar match />
          </div>
          <Txt size={9.5} color={WK.faint} style={{ fontWeight: 700, letterSpacing: 1, marginTop: 2 }}>ALSO SAVED</Txt>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <SavedCardV2 name="Tinted Serum" price="₱545" drop /><SavedCardV2 name="Glow Primer" price="₱490" />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function SavedCardV2({ name, price, ar, match, drop }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, overflow: 'hidden', background: WK.paper }}>
      <div style={{ position: 'relative' }}>
        <Ph h={92} round={0} label="" />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', background: WK.accentBg, border: '1px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.accentInk }}>♥</span>
        <div style={{ position: 'absolute', top: 6, left: 6, display: 'flex', gap: 4 }}>
          {ar && <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', background: WK.accent, borderRadius: 8, padding: '2px 6px' }}>◉ Tried</span>}
          {match && <span style={{ fontSize: 8, fontWeight: 700, color: '#2a2018', background: WK.gold, borderRadius: 8, padding: '2px 6px' }}>92%</span>}
        </div>
      </div>
      <div style={{ padding: 9, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <H size={11} style={{ lineHeight: 1.2 }}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: WK.ink }}>{price}</span>
          {drop && <span style={{ fontSize: 8.5, fontWeight: 700, color: WK.goldInk }}>↓ drop</span>}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ flex: 1, height: 28, borderRadius: 6, border: '1.5px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 700 }}>◉ Re-try</span>
          <span style={{ flex: 1, height: 28, borderRadius: 6, background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 700 }}>+ Add</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// AR shared primitives
// ════════════════════════════════════════════════════════════════════
function ArMeshBg() {
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.22 }} preserveAspectRatio="none">
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff" strokeWidth="1" />
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}
function ArCamera({ children }) {
  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', background: AR.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ArMeshBg />
      {/* face mesh guide */}
      <div style={{ width: 168, height: 224, border: '2px dashed rgba(255,255,255,.6)', borderRadius: '50%', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '54%', left: '50%', width: 70, transform: 'translateX(-50%)', borderTop: '1px dashed rgba(255,255,255,.4)' }} />
        <div style={{ position: 'absolute', top: '64%', left: '50%', width: 44, height: 16, transform: 'translateX(-50%)', border: '1px solid ' + WK.rose, borderRadius: '0 0 22px 22px' }} />
      </div>
      {children}
    </div>
  );
}
function ArShadeRail() {
  const shades = ['28 62% 58%','20 58% 48%','12 50% 40%','8 46% 34%','32 40% 56%','16 44% 46%','24 36% 38%','10 40% 30%'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: AR.mid }}>SHADES</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#2a2018', background: WK.gold, borderRadius: 10, padding: '2px 8px' }}>◐ “Hopeful” = your match</span>
      </div>
      <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
        {shades.map((h, i) => (
          <div key={i} style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', background: `hsl(${h})`, border: i === 0 ? '2px solid #fff' : '1px solid ' + AR.line, position: 'relative' }}>
            {i === 0 && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff' }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
function ArSlider({ label, pct, light }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: light ? AR.mid : AR.mid }}>{label.toUpperCase()}</span>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: AR.ink }}>{pct}%</span>
      </div>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,.14)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct + '%', borderRadius: 3, background: WK.gold }} />
        <div style={{ position: 'absolute', left: `calc(${pct}% - 8px)`, top: -5, width: 16, height: 16, borderRadius: '50%', background: '#fff', border: '2px solid ' + WK.gold }} />
      </div>
    </div>
  );
}
function ArCtrl({ glyph, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid ' + AR.line, background: AR.panel, color: AR.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{glyph}</span>
      <span style={{ fontSize: 8.5, color: AR.mid }}>{label}</span>
    </div>
  );
}
function ArShutter() {
  return (
    <div style={{ width: 66, height: 66, borderRadius: '50%', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 50, height: 50, borderRadius: '50%', background: WK.accent }} />
    </div>
  );
}
function ArDeckBtn({ glyph, label, solid }) {
  return (
    <div style={{ flex: 1, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, fontWeight: 700, background: solid ? WK.accent : AR.panel, color: solid ? '#fff' : AR.ink, border: '1px solid ' + (solid ? WK.accent : AR.line) }}>
      <span style={{ fontSize: 13 }}>{glyph}</span>{label}
    </div>
  );
}
function ArLabel({ children }) {
  return <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1, color: AR.mid }}>{children}</span>;
}
function ArSeg({ label, on }) {
  return <div style={{ flex: 1, height: 34, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, background: on ? '#fff' : 'transparent', color: on ? AR.bg : AR.mid, border: '1px solid ' + (on ? '#fff' : AR.line) }}>{label}</div>;
}
function ArLayerRow({ swatch, name, role, on, shop }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: AR.panel, border: '1px solid ' + AR.line }}>
      <span style={{ width: 24, height: 24, borderRadius: '50%', background: swatch, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: AR.ink }}>{name}</div>
        <div style={{ fontSize: 9, color: AR.mid }}>{role}</div>
      </div>
      {shop ? <span style={{ fontSize: 9.5, fontWeight: 700, color: '#2a2018', background: WK.gold, borderRadius: 10, padding: '4px 9px' }}>+ Add</span>
            : <span style={{ width: 30, height: 18, borderRadius: 9, background: on ? WK.gold : 'rgba(255,255,255,.14)', position: 'relative', flexShrink: 0 }}><span style={{ position: 'absolute', top: 2, left: on ? 14 : 2, width: 14, height: 14, borderRadius: '50%', background: '#fff' }} /></span>}
    </div>
  );
}

// small basket icon (renamed to avoid clobbering the kit's BasketIcon)
function CartGlyph({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 7h18l-1.5 12.5a1 1 0 01-1 .9H5.5a1 1 0 01-1-.9L3 7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, {
  ProductDetailV2, ARTryOn, ARTryOnAdjust, ARTryOnCapture,
  ProductReviews, IngredientBreakdown, ProductCompareV2, WishlistV2,
});
