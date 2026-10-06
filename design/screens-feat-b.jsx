// screens-feat-b.jsx — Layer 9B · Makeup, commerce & social feature deep-dives
// Makeup looks (categorized) · Shop the look · Product budget · Write review ·
// Share MOTD · Social interaction · Account roles (User & Brand)

// ── local helpers (Gx prefix) ───────────────────────────────────────
function GxStars({ n = 5, filled = 5, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ fontSize: size, color: i < filled ? WK.accent : WK.faint }}>{i < filled ? '★' : '☆'}</span>
      ))}
    </div>
  );
}
// look card (cover + meta)
function GxLook({ name, count, creator, tall }) {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px dashed ' + WK.line }}>
      <div style={{ position: 'relative' }}>
        <Ph h={tall ? 168 : 130} round={0} label="" />
        <span style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
          <span style={{ fontFamily: WK.serif, fontSize: 14, fontWeight: 600, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.6)', display: 'block', lineHeight: 1.15 }}>{name}</span>
          <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,.9)', textShadow: '0 1px 3px rgba(0,0,0,.6)' }}>{count} products</span>
        </span>
        <span style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4, background: WK.gold, borderRadius: 12, padding: '3px 7px' }}>
          <BasketIcon size={12} /><span style={{ fontSize: 9, fontWeight: 700, color: '#3a2a08' }}>Shop</span>
        </span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-49 Makeup Looks — discovery, categorized by look
// ════════════════════════════════════════════════════════════════════
function MakeupLooks({ mode = 'beginner' }) {
  const beginner = mode === 'beginner';
  return (
    <Frame
      purpose={beginner
        ? "Makeup LOOKS discovery for a user who self-identified as a Beginner at makeup during onboarding. Step-by-step tutorials are surfaced first as an optional 'Learn the look' rail — never a forced step. The guidance toggle hides them instantly and drops straight to look & product discovery."
        : "The same Makeup LOOKS discovery for an Intermediate/Advanced user. Tutorials are hidden by default — the screen leads with shoppable looks & products. A single tap on the guidance toggle opts back into the tutorial rail for anyone who wants it."}
      components={['Guidance bar — tutorial toggle gated to the onboarding makeup skill level', beginner ? 'Optional "Learn the look" tutorial rail (cover · steps · duration)' : 'Tutorials collapsed · Show-tutorials opt-in', 'Featured look hero', 'Style chips', 'Shoppable look grid (cover · name · count · shop tag)']}
      states={['default']}
      flows={beginner
        ? ['Guidance off → hides tutorials (advanced view)', 'Tutorial → Tutorial Detail', 'Look → Shop the Look', 'Try the look → AR Try-On']
        : ['Guidance on → restores tutorial rail (beginner view)', 'Look → Shop the Look', 'Try the look → AR Try-On', 'Style chip → filtered grid']}>
      <Phone tab="discover">
        <AppBar title="Makeup looks" back action="⌕" />
        <Body pad={16} gap={14} scroll>
          <GuidanceBar on={beginner} />
          {beginner && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>Learn the look · optional</span>
                <span style={{ fontSize: 10, color: WK.accentInk, fontWeight: 700 }}>Hide ×</span>
              </div>
              <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
                <GxTut name="Everyday 5-min face" steps="6" time="5 min" />
                <GxTut name="No-crease eyeshadow" steps="4" time="8 min" />
                <GxTut name="Clean brows 101" steps="3" time="4 min" dim />
              </div>
            </div>
          )}
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <Ph h={180} round={12} label="Featured look" />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 14, background: 'linear-gradient(to top, rgba(43,41,38,.82), transparent)' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#fff', background: WK.accent, borderRadius: 4, padding: '3px 8px' }}>TRENDING</span>
              <div style={{ fontFamily: WK.serif, fontSize: 19, fontWeight: 600, color: '#fff', marginTop: 8 }}>Soft Morena Glow</div>
              <Txt size={10} color="rgba(255,255,255,.85)" style={{ marginTop: 2 }}>6 products · from ₱1,240 · by @maris.glow</Txt>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, overflow: 'hidden' }}>
            <Chip on>All</Chip><Chip>Everyday</Chip><Chip>Morena Glow</Chip><Chip>K-Beauty</Chip><Chip>Bridal</Chip><Chip>Bold</Chip>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <GxLook name="Clean Girl" count="4" tall />
            <GxLook name="Office Soft Glam" count="7" />
            <GxLook name="Golden Hour" count="5" />
            <GxLook name="Bridal Morena" count="9" tall />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
// guidance bar — surfaces/hides tutorials, gated to the onboarding makeup skill level
function GuidanceBar({ on }) {
  return (
    <div style={{ border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), borderRadius: 12, padding: '11px 13px', background: on ? WK.accentBg : WK.paper, display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: on ? WK.accentInk : WK.mid, flexShrink: 0 }}>{on ? '◓' : '◌'}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <H size={12.5} color={WK.ink}>{on ? 'Step-by-step tutorials' : 'Tutorials hidden'}</H>
        <Txt size={9.5} color={on ? WK.accentInk : WK.mid}>{on ? 'On · matched to your Beginner makeup level. Dismiss anytime.' : 'You set makeup to Advanced — straight to looks & products.'}</Txt>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
        <div style={{ width: 38, height: 22, borderRadius: 11, background: on ? WK.accent : WK.panel2, position: 'relative', border: '1px solid ' + (on ? WK.accent : WK.line) }}>
          <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
        </div>
        <span style={{ fontSize: 8.5, fontWeight: 700, color: on ? WK.accentInk : WK.mid }}>{on ? 'Hide' : 'Show'}</span>
      </div>
    </div>
  );
}
// optional tutorial card (horizontal rail)
function GxTut({ name, steps, time, dim }) {
  return (
    <div style={{ width: 150, flexShrink: 0, borderRadius: 10, overflow: 'hidden', border: '1px dashed ' + WK.line, background: WK.paper, opacity: dim ? 0.5 : 1 }}>
      <div style={{ position: 'relative' }}>
        <Ph h={92} round={0} label="" />
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.ink }}>▶</span>
        <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 8, fontWeight: 700, letterSpacing: 0.6, color: '#fff', background: WK.accent, borderRadius: 4, padding: '2px 6px' }}>TUTORIAL</span>
        <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 9, color: '#fff', background: 'rgba(0,0,0,.55)', borderRadius: 4, padding: '1px 6px' }}>{time}</span>
      </div>
      <div style={{ padding: '7px 8px' }}>
        <H size={11} style={{ lineHeight: 1.2 }}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: 8.5, color: WK.mid }}>{steps} steps</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: WK.accentInk, background: WK.accentBg, borderRadius: 8, padding: '1px 6px' }}>Beginner</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-50 Shop the Look — buy everything in a look (the yellow basket)
// ════════════════════════════════════════════════════════════════════
function ShopTheLook() {
  return (
    <Frame
      purpose="The destination of the gold Community basket and every look card: the full product list behind a look, each FDA-verified, with add-individually or add-all-to-cart."
      components={['Look hero + creator', 'Total / bundle price', 'Product list w/ step label (face/eyes/lips) · price · FDA · add', 'Swap for cheaper dupe inline', 'Add all to cart (sticky)', 'Try whole look in AR']}
      states={['default']}
      flows={['Add all → Cart', 'Item → Product Detail', 'Swap → Dupe Finder', 'Try look → AR Try-On']}>
      <Phone>
        <AppBar title="Shop this look" back action="◉" />
        <Body pad={0} gap={0} scroll>
          <div style={{ position: 'relative' }}>
            <Ph h={170} round={0} label="Soft Morena Glow" />
            <span style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #fff', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>◐</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,.6)' }}>by @maris.glow</span>
            </span>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><Txt size={10}>6 products · FDA-registered · CPNN-verified</Txt><H size={18}>₱1,240 total</H></div>
              <Btn kind="secondary" sm style={{ height: 40 }}>◉ Try in AR</Btn>
            </div>
            <GxLookItem step="FACE" name="Fit Me Foundation · 330" price="₱299" />
            <GxLookItem step="FACE" name="Maybelline Concealer" price="₱249" dupe />
            <GxLookItem step="EYES" name="Cream Bronzer Stick" price="₱180" />
            <GxLookItem step="CHEEKS" name="Blush Tint · Rosy" price="₱159" />
            <GxLookItem step="LIPS" name="Lip & Cheek Stain" price="₱199" />
            <GxLookItem step="SET" name="Setting Mist 100ml" price="₱154" last />
          </div>
        </Body>
        <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, background: WK.paper, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div><span style={{ fontSize: 9.5, color: WK.mid }}>Bundle · 6 items</span><div style={{ fontSize: 19, fontWeight: 700, color: WK.ink, fontFamily: WK.serif, lineHeight: 1.1 }}>₱1,240</div></div>
          <Btn kind="primary" full style={{ flex: 1 }}><BasketIcon size={15} /> Add all to cart</Btn>
        </div>
      </Phone>
    </Frame>
  );
}
function GxLookItem({ step, name, price, dupe, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingBottom: last ? 0 : 12, borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <Ph h={48} w={48} round={8} label="" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.8, color: WK.accentInk }}>{step}</span>
        <H size={12} style={{ marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{price}</span><FDABadge sm />
          {dupe && <span style={{ fontSize: 9, color: WK.accentInk, fontWeight: 700 }}>· cheaper dupe ›</span>}
        </div>
      </div>
      <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>+</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-51 Product Budget — set a target price / drop alert for a product
// ════════════════════════════════════════════════════════════════════
function ProductBudget() {
  return (
    <Frame
      purpose="Per-product budgeting: set the price you're willing to pay, see price history, and get alerted (no ads) when it drops — or jump to a cheaper FDA-verified dupe now."
      components={['Product header + current price', 'Target-price slider vs current', 'Price-history sparkline + lowest seen', 'Notify-on-drop toggle', 'Cheaper dupe shortcut']}
      states={['default']}
      flows={['Set alert → Notifications', 'See dupes → Dupe Finder', 'Buy now → Product Detail']}>
      <Phone>
        <AppBar title="Price & budget" back action="♡" />
        <Body pad={16} gap={16} scroll>
          <Card style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Ph h={52} w={52} round={8} label="" />
            <div style={{ flex: 1 }}><Txt size={10}>The Ordinary</Txt><H size={13}>Niacinamide 10% + Zinc</H></div>
            <div style={{ textAlign: 'right' }}><Txt size={9}>now</Txt><H size={16}>₱390</H></div>
          </Card>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Txt size={11} color={WK.ink} w={700}>Notify me under</Txt>
              <span style={{ fontSize: 18, fontWeight: 700, color: WK.accentInk, fontFamily: WK.serif }}>₱320</span>
            </div>
            <div style={{ position: 'relative', height: 6, borderRadius: 3, background: WK.panel2 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '46%', background: WK.accent, borderRadius: 3 }} />
              <div style={{ position: 'absolute', left: '46%', top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: WK.paper, border: '2px solid ' + WK.accent }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: WK.mid, marginTop: 6 }}><span>₱250</span><span>₱450</span></div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Txt size={11} color={WK.ink} w={700}>Price history · 90 days</Txt>
              <Txt size={10} color={WK.accentInk}>Lowest seen ₱340</Txt>
            </div>
            <div style={{ height: 70, border: '1px dashed ' + WK.line, borderRadius: 8, padding: 8 }}>
              <svg width="100%" height="100%" viewBox="0 0 280 54" preserveAspectRatio="none">
                <polyline points="0,20 40,18 80,28 120,22 160,34 200,30 240,16 280,24" fill="none" stroke={WK.accent} strokeWidth="2" />
                <line x1="0" y1="40" x2="280" y2="40" stroke={WK.line} strokeDasharray="3 3" /><text x="2" y="50" fontSize="8" fill={WK.faint} fontFamily="Inter">target ₱320</text>
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid ' + WK.accent, borderRadius: 10, padding: '11px 13px', background: WK.accentBg }}>
            <div><H size={12.5} color={WK.ink}>Alert me when it drops</H><Txt size={10} color={WK.accentInk}>Push + in-app · always ad-free</Txt></div>
            <div style={{ width: 38, height: 22, borderRadius: 11, background: WK.accent, position: 'relative' }}><div style={{ position: 'absolute', top: 2, left: 18, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} /></div>
          </div>
          <Btn kind="secondary" full>₱ See cheaper dupes now →</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-52 Write Review — product AND brand
// ════════════════════════════════════════════════════════════════════
function WriteReview() {
  return (
    <Frame
      purpose="Honest review composer covering the product and the seller/brand. Auto-tags the reviewer's skin profile so readers can weight relevance; photo upload encouraged."
      components={['Product header', 'Overall stars', 'Sub-ratings: effectiveness · value · packaging', 'Skin-profile auto-tag (verified buyer)', 'Photo upload', 'Review text', 'Separate brand/seller rating', 'Post']}
      states={['default']}
      flows={['Post → Product reviews + Brand Profile', 'Add photo → camera/gallery']}>
      <Phone>
        <AppBar title="Write a review" back />
        <Body pad={16} gap={14} scroll>
          <Card style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Ph h={46} w={46} round={8} label="" />
            <div style={{ flex: 1 }}><Txt size={10}>CeraVe</Txt><H size={13}>Foaming Facial Cleanser</H></div>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: WK.accentInk, background: WK.accentBg, border: '1px solid ' + WK.accent, borderRadius: 10, padding: '2px 7px' }}>✓ Verified buyer</span>
          </Card>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
            <Txt size={11} color={WK.ink} w={700}>Rate this product</Txt>
            <GxStars filled={4} size={28} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <GxSubRate label="Effectiveness" filled={5} />
            <GxSubRate label="Value for money" filled={4} />
            <GxSubRate label="Packaging" filled={3} />
          </div>
          <div>
            <Txt size={10} color={WK.faint} w={700} style={{ letterSpacing: 0.8, marginBottom: 7 }}>YOUR SKIN (shown with review)</Txt>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><Chip on>Combination</Chip><Chip on>MST-5</Chip><Chip on>Acne-prone</Chip></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Ph h={56} w={56} round={8} glyph="＋" label="Photo" />
            <div style={{ flex: 1, minHeight: 56, border: '1.5px dashed ' + WK.line, borderRadius: 8, padding: 10, fontSize: 11, color: WK.faint, lineHeight: 1.4 }}>Share your honest experience — how did it work for your skin?</div>
          </div>
          <div style={{ borderTop: '1px dashed ' + WK.line, paddingTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Txt size={11.5} color={WK.ink} w={700}>Rate the seller · Beauty MNL</Txt>
              <GxStars filled={5} size={15} />
            </div>
          </div>
          <Btn kind="primary" full>Post review</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function GxSubRate({ label, filled }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Txt size={11.5} color={WK.ink}>{label}</Txt>
      <GxStars filled={filled} size={15} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-53 Share your MOTD — Makeup of the Day
// ════════════════════════════════════════════════════════════════════
function ShareMOTD() {
  return (
    <Frame
      purpose="Compose & share a Makeup of the Day: tag the exact products as shoppable stickers, add a caption, and post to the Aura feed or external social — every tag stays shoppable."
      components={['Photo canvas + framed MOTD card', 'Tappable product stickers (shoppable)', 'Add-product sticker tool', 'Caption + look name', 'Destinations: Community · IG · TikTok · Copy link', 'Allow others to shop toggle']}
      states={['default']}
      flows={['Tag → product picker', 'Post → Community (shoppable)', 'External → native share sheet']}>
      <Phone>
        <AppBar title="Share your MOTD" back action="◉" />
        <Body pad={16} gap={14} scroll>
          <div style={{ position: 'relative', height: 240, borderRadius: 14, overflow: 'hidden', border: '1px solid ' + WK.line }}>
            <Ph h={240} round={0} label="Your look" />
            {/* shoppable product stickers */}
            <span style={{ position: 'absolute', top: 40, left: 30, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.95)', borderRadius: 20, padding: '4px 5px 4px 9px', boxShadow: '0 3px 10px rgba(0,0,0,.25)' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: WK.ink }}>Lip Stain · Rosy</span>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BasketIcon size={11} /></span>
            </span>
            <span style={{ position: 'absolute', bottom: 60, right: 26, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.95)', borderRadius: 20, padding: '4px 5px 4px 9px', boxShadow: '0 3px 10px rgba(0,0,0,.25)' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: WK.ink }}>Fit Me 330</span>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BasketIcon size={11} /></span>
            </span>
            <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#fff', background: 'rgba(0,0,0,.45)', borderRadius: 4, padding: '3px 8px' }}>MOTD · JUN 22</span>
          </div>
          <Btn kind="ghost" sm full style={{ height: 38 }}>＋ Tag a product</Btn>
          <div style={{ minHeight: 50, border: '1.5px dashed ' + WK.line, borderRadius: 8, padding: 10, fontSize: 11.5, color: WK.ink }}>Soft morena glow for ₱1,240 ✨ all FDA-verified</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid ' + WK.accent, borderRadius: 10, padding: '10px 13px', background: WK.accentBg }}>
            <Txt size={11} color={WK.ink} w={700}>Let others shop my look</Txt>
            <div style={{ width: 38, height: 22, borderRadius: 11, background: WK.accent, position: 'relative' }}><div style={{ position: 'absolute', top: 2, left: 18, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} /></div>
          </div>
          <SecLabel>Share to</SecLabel>
          <div style={{ display: 'flex', gap: 10 }}>
            <GxShareDest glyph="◈" label="Community" on /><GxShareDest glyph="◉" label="Instagram" /><GxShareDest glyph="♪" label="TikTok" /><GxShareDest glyph="⧉" label="Copy link" />
          </div>
          <Btn kind="primary" full>Post MOTD</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function GxShareDest({ glyph, label, on }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 46, height: 46, borderRadius: 13, border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), background: on ? WK.accentBg : WK.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: on ? WK.accentInk : WK.ink }}>{glyph}</span>
      <span style={{ fontSize: 9, color: WK.mid, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-54 Social Interaction — comments, reactions & social share
// ════════════════════════════════════════════════════════════════════
function SocialInteraction() {
  return (
    <Frame
      purpose="The full social layer of a community post: reactions, threaded comments with replies & likes, creator pin, and a share sheet that pushes to external social — keeping the post shoppable."
      components={['Post recap + engagement counts', 'Reaction bar (like/comment/share/save)', 'Threaded comments + replies', 'Pinned creator comment', 'Mention/emoji input', 'Share sheet → external social']}
      states={['default']}
      flows={['Reply → thread', 'Share → social/MOTD', 'Product tag → Shop the Look', 'Avatar → Public Profile']}>
      <Phone>
        <AppBar title="Comments · 318" back action="⤴" />
        <Body pad={0} gap={0} scroll>
          {/* post recap */}
          <div style={{ padding: '12px 16px', borderBottom: '6px solid ' + WK.panel, display: 'flex', gap: 11 }}>
            <Ph h={56} w={56} round={8} label="" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><H size={12.5}>@maris.glow</H><span style={{ fontSize: 10, color: WK.goldInk }}>★</span></div>
              <Txt size={10.5} style={{ marginTop: 2 }}>My 3-step glow up, all under ₱1,500 ✨</Txt>
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <span style={{ fontSize: 11, color: WK.accentInk, fontWeight: 700 }}>♥ 12.4k</span>
                <span style={{ fontSize: 11, color: WK.mid, fontWeight: 600 }}>✑ 318</span>
                <span style={{ fontSize: 11, color: WK.mid, fontWeight: 600 }}>⤴ 1.1k</span>
                <span style={{ fontSize: 11, color: WK.mid, fontWeight: 600 }}>☆ 2.3k</span>
              </div>
            </div>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <GxComment name="@maris.glow" pinned text="Pinned 📌 The lip stain is the ₱199 one tagged above — shop it in the basket!" likes="421" />
            <GxComment name="@jasph.skin" text="This is so helpful, finally affordable AND FDA-verified 🙏" likes="88" reply />
            <GxComment name="@derm.ph" verified text="Great picks — niacinamide before moisturizer is the right order." likes="204" />
            <GxComment name="@bea.makeup" text="What shade is the foundation? 😍" likes="12" />
          </div>
        </Body>
        <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.mid }}>◐</div>
          <div style={{ flex: 1, height: 36, borderRadius: 18, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 11.5, color: WK.faint }}>Add a comment… <span style={{ color: WK.mid }}>@ ☺</span></div>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>➤</span>
        </div>
      </Phone>
    </Frame>
  );
}
function GxComment({ name, text, likes, verified, pinned, reply }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginLeft: reply ? 34 : 0 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.mid, flexShrink: 0 }}>◐</div>
      <div style={{ flex: 1 }}>
        {pinned && <span style={{ fontSize: 8.5, fontWeight: 700, color: WK.goldInk, letterSpacing: 0.5 }}>📌 PINNED</span>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><H size={11.5}>{name}</H>{verified && <span style={{ fontSize: 10, color: WK.accentInk }}>✓</span>}</div>
        <Txt size={11} color={WK.ink} style={{ marginTop: 2 }}>{text}</Txt>
        <div style={{ display: 'flex', gap: 14, marginTop: 5 }}>
          <span style={{ fontSize: 9.5, color: WK.mid, fontWeight: 600 }}>♥ {likes}</span>
          <span style={{ fontSize: 9.5, color: WK.mid, fontWeight: 600 }}>Reply</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// F-55 Account Roles — User & Brand
// ════════════════════════════════════════════════════════════════════
function AccountRole() {
  return (
    <Frame
      purpose="One account, two roles. Shoppers can apply to become a verified Brand/seller — unlocking the storefront, catalog & sales-analysis tools — without losing their shopper side."
      components={['Current role card (Shopper)', 'Role switch', 'Brand/seller benefits list', 'FDA-distributor requirement note', 'Apply / become a brand CTA', 'Active-role indicator']}
      states={['default']}
      flows={['Become a brand → verification flow', 'Switch role → Brand dashboard / Shop', 'Manage → Settings']}>
      <Phone>
        <AppBar title="Account type" back />
        <Body pad={16} gap={14} scroll>
          <Txt size={11.5}>Switch how you use Aura. Your shopper account stays active even after you add a brand.</Txt>
          {/* shopper — active */}
          <div style={{ border: '2px solid ' + WK.accent, borderRadius: 12, padding: 14, background: WK.accentBg, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: WK.paper, border: '1px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: WK.accentInk }}>◐</span>
              <div style={{ flex: 1 }}><H size={14} color={WK.ink}>Shopper</H><Txt size={10.5} color={WK.accentInk}>Scan · shop · track · share</Txt></div>
              <span style={{ fontSize: 9, fontWeight: 700, color: WK.accentInk, border: '1px solid ' + WK.accent, borderRadius: 12, padding: '3px 9px' }}>ACTIVE</span>
            </div>
          </div>
          {/* brand — additive */}
          <div style={{ border: '1.5px dashed ' + WK.gold, borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: WK.goldBg, border: '1px solid ' + WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: WK.goldInk }}>◆</span>
              <div style={{ flex: 1 }}><H size={14}>Brand / Seller</H><Txt size={10.5}>Sell on Aura</Txt></div>
              <span style={{ fontSize: 9, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, borderRadius: 12, padding: '3px 9px' }}>UPGRADE</span>
            </div>
            <GxBenefit t="Your own verified storefront & catalog" />
            <GxBenefit t="Sales analysis & customer insights" />
            <GxBenefit t="Direct messaging with shoppers" />
            <GxBenefit t="Brand badges (Local / Verified Distributor)" />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: WK.panel, borderRadius: 8, padding: 10, marginTop: 2 }}>
              <span style={{ fontSize: 13, color: WK.accentInk }}>✓</span>
              <Txt size={10}>Requires a valid FDA LTO / distributor registration to verify.</Txt>
            </div>
            <Btn kind="primary" full style={{ marginTop: 2 }}>Become a brand →</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function GxBenefit({ t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ color: WK.goldInk, fontSize: 12 }}>✦</span>
      <Txt size={11} color={WK.ink}>{t}</Txt>
    </div>
  );
}

Object.assign(window, {
  MakeupLooks, ShopTheLook, ProductBudget, WriteReview, ShareMOTD, SocialInteraction, AccountRole,
});
