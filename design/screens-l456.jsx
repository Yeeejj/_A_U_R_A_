// screens-l456.jsx — Layer 4 (Product), Layer 5 (Profile), Layer 6 (Settings & Support)

// ════════════════════════════════════════════════════════════════════
// LAYER 4 · Product
// ════════════════════════════════════════════════════════════════════

// L4-16 Product Detail
function ProductDetail() {
  return (
    <Frame
      purpose="Full product record for a HYBRID product (tinted serum foundation). Framed as makeup with skincare benefits — never skincare with incidental makeup. FDA-registered + CPNN-verified trust block. Closes the two-way loop: surfaces the looks this product is featured in (product → look), and is itself the destination of every look's product breakdown (look → product)."
      components={['Hero', 'Makeup-primary category lens + name/price', 'Hybrid-framing card: makeup role primary · skincare actives as supporting benefits', 'FDA-registered · CPNN-verified block', 'Shade options + My-shade', 'Featured-in-looks rail (product → look)', 'Dupe finder', 'Try-On / Add']}
      states={['default']}
      flows={['Featured look → Shop the Look', 'Try On → AR', 'Find dupe → Dupe Finder', 'My shade → Brand Shade Translator', 'Add → Cart / Routine']}>
      <Phone>
        <AppBar title="Product" back action="♡" />
        <Body pad={0} gap={0} scroll>
          <Ph h={210} round={0} label="Product hero image" />
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: WK.accentInk }}>MAKEUP · FACE</span>
              <Txt size={11} style={{ marginTop: 5 }}>Sunnies Face</Txt>
              <H size={18}>Tinted Serum Foundation</H>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}><H size={18} color={WK.ink}>₱545</H><Txt size={11}>30 ml</Txt><span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, color: WK.accentInk, border: '1px solid ' + WK.accent, borderRadius: 14, padding: '5px 11px' }}>♡ Track price</span></div>
            </div>
            {/* hybrid framing — makeup primary, skincare supporting */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✦</span>
                <H size={12.5} color={WK.ink}>Makeup with skincare benefits</H>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Chip on>Serum foundation</Chip><Chip on>Light–medium coverage</Chip>
              </div>
              <Txt size={10}>You wear it as your base — the skincare actives below are a bonus, not the headline.</Txt>
              <div style={{ borderTop: '1px dashed ' + WK.line, paddingTop: 9 }}>
                <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 1, color: WK.goldInk }}>SKINCARE BENEFITS INSIDE</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 7 }}>
                  <BenChip glyph="☀">SPF 30</BenChip><BenChip glyph="◌">Hyaluronic acid</BenChip><BenChip glyph="✧">Niacinamide</BenChip>
                </div>
              </div>
            </Card>
            {/* FDA + CPNN block — prominent */}
            <Card accent style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>✓</div>
              <div>
                <H size={12} color={WK.ink}>FDA-registered · CPNN-verified</H>
                <div style={{ fontSize: 13, fontWeight: 700, color: WK.accentInk, letterSpacing: 0.5, margin: '3px 0' }}>CPNN-CM-2024-0091224</div>
                <Txt size={10}>Verified distributor: Sunnies Face PH. Tap to view on the FDA registry.</Txt>
              </div>
            </Card>
            <div>
              <SecLabel more="My shade ✓">Shades (12)</SecLabel>
              <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 34, borderRadius: 5, background: `hsl(28 ${44 - i * 2}% ${84 - i * 8}%)`, border: i === 3 ? '2px solid ' + WK.accent : '1px solid ' + WK.line, position: 'relative' }}>
                    {i === 3 && <span style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: WK.accent }}>▼</span>}
                  </div>
                ))}
              </div>
            </div>
            {/* product → look : the looks that feature this exact product */}
            <div>
              <SecLabel more="See all">Featured in these looks</SecLabel>
              <Txt size={9.5} style={{ marginTop: 2 }}>See how this shade is used in complete, shoppable looks.</Txt>
              <div style={{ display: 'flex', gap: 10, overflow: 'hidden', marginTop: 9 }}>
                <LookMini name="Soft Morena Glow" count="6" />
                <LookMini name="Office Soft Glam" count="7" />
                <LookMini name="Golden Hour" count="5" dim />
              </div>
            </div>
            {/* dupe finder — prominent button on product */}
            <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, background: WK.goldBg }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: WK.paper, border: '1px solid ' + WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.goldInk, flexShrink: 0 }}>₱</span>
              <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>Find a cheaper dupe</H><Txt size={10} color={WK.goldInk}>AI found 3 similar from ₱290 · save up to 47%</Txt></div>
              <span style={{ fontSize: 16, color: WK.goldInk }}>›</span>
            </div>
            <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
              <Btn kind="secondary" full sm style={{ height: 44 }}>◉ Try On</Btn>
              <Btn kind="secondary" full sm style={{ height: 44 }}>⇄ My shade</Btn>
            </div>
            <Btn kind="primary" full><BasketIcon size={15} /> Add to cart</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
// supporting skincare-benefit chip (clearly secondary to the makeup role)
function BenChip({ glyph, children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 16, fontSize: 10.5, fontWeight: 600, border: '1px solid ' + WK.gold, background: WK.goldBg, color: WK.goldInk }}>
      <span style={{ fontSize: 11 }}>{glyph}</span>{children}
    </span>
  );
}
// product → look card: a look this product is used in (links to Shop the Look)
function LookMini({ name, count, dim }) {
  return (
    <div style={{ width: 128, flexShrink: 0, borderRadius: 10, overflow: 'hidden', border: '1px dashed ' + WK.line, background: WK.paper, opacity: dim ? 0.5 : 1 }}>
      <div style={{ position: 'relative' }}>
        <Ph h={90} round={0} label="" />
        <span style={{ position: 'absolute', top: 6, right: 6, display: 'flex', alignItems: 'center', gap: 4, background: WK.gold, borderRadius: 12, padding: '3px 7px' }}>
          <BasketIcon size={11} /><span style={{ fontSize: 8.5, fontWeight: 700, color: '#3a2a08' }}>Shop</span>
        </span>
      </div>
      <div style={{ padding: '7px 8px' }}>
        <H size={11} style={{ lineHeight: 1.2 }}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 9, color: WK.mid }}>{count} products</span>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: WK.accentInk }}>· uses this ✓</span>
        </div>
      </div>
    </div>
  );
}

// L4-17 Product Comparison
function ProductCompare() {
  return (
    <Frame
      purpose="Compare two or three products across ingredients, safety, price, and shade match."
      components={['Column headers w/ thumbs', 'Comparison rows', 'Winner highlight', 'Pick / add CTA']}
      states={['default']}
      flows={['Column → Product Detail']}>
      <Phone>
        <AppBar title="Compare" back />
        <Body pad={14} gap={0} scroll>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr', alignItems: 'stretch' }}>
            <div />
            <CompHead name="The Ordinary" winner />
            <CompHead name="Estée Lauder" />
            <CompCell head>Price</CompCell><CompCell hi>₱890</CompCell><CompCell>₱4,200</CompCell>
            <CompCell head>Safety</CompCell><CompCell hi>A · Low</CompCell><CompCell>B · Low</CompCell>
            <CompCell head>Similarity</CompCell><CompCell hi>94%</CompCell><CompCell>—</CompCell>
            <CompCell head>Shade match</CompCell><CompCell>n/a</CompCell><CompCell>n/a</CompCell>
            <CompCell head>FDA</CompCell><CompCell hi>✓</CompCell><CompCell>✓</CompCell>
            <CompCell head last>Key actives</CompCell><CompCell last hi>Buffet, HA</CompCell><CompCell last>Peptides</CompCell>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Btn kind="secondary" full sm style={{ height: 42 }}>View</Btn>
            <Btn kind="primary" full>Choose dupe →</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function CompHead({ name, winner }) {
  return (
    <div style={{ padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: winner ? WK.accentBg : 'transparent', borderRadius: '8px 8px 0 0' }}>
      <Ph h={48} w={48} label="" round={6} accent={winner} />
      <span style={{ fontSize: 9.5, fontWeight: 700, color: winner ? WK.accentInk : WK.ink, textAlign: 'center' }}>{name}</span>
      {winner && <span style={{ fontSize: 8, color: WK.accentInk }}>★ best value</span>}
    </div>
  );
}
function CompCell({ children, head, hi, last }) {
  return (
    <div style={{ padding: '11px 8px', borderBottom: last ? 'none' : '1px dashed ' + WK.line, fontSize: head ? 10 : 11.5, fontWeight: head ? 700 : (hi ? 700 : 500), color: head ? WK.mid : (hi ? WK.accentInk : WK.ink), textAlign: head ? 'left' : 'center', background: hi ? 'rgba(248,231,236,.5)' : 'transparent' }}>{children}</div>
  );
}

// L4-18 Routine Builder
function Routine() {
  return (
    <Frame
      purpose="AM/PM routine with ordered steps. Now lives inside Profile — no longer a bottom-nav tab; reached via Profile → My Routine & Tracker."
      components={['AM / PM tabs', 'Ordered step cards (drag)', 'Add-step CTA', 'Link to tracker']}
      states={['default']}
      flows={['Reached from Profile', 'Add step → Discover/Search', 'Track → Efficacy Tracker']}>
      <Phone>
        <AppBar title="My Routine" back action="✎" />
        <Body pad={16} gap={12} scroll>
          <div style={{ display: 'flex', background: WK.panel, borderRadius: 8, padding: 4 }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 6, background: WK.paper, fontSize: 12, fontWeight: 700, color: WK.ink, boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>☀ AM</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '7px 0', fontSize: 12, fontWeight: 600, color: WK.mid }}>☾ PM</div>
          </div>
          <StepCard n={1} name="Gentle Cleanser" brand="CeraVe" />
          <StepCard n={2} name="Niacinamide 10%" brand="The Ordinary" />
          <StepCard n={3} name="Moisturizer" brand="Cetaphil" />
          <StepCard n={4} name="Sunscreen SPF50" brand="Belo" />
          <div style={{ border: '1.5px dashed ' + WK.line, borderRadius: 8, padding: 14, textAlign: 'center', color: WK.mid, fontSize: 12, fontWeight: 600 }}>+ Add a step</div>
          <Banner icon="◔">Tracking this routine · Day 12 of 30 →</Banner>
        </Body>
      </Phone>
    </Frame>
  );
}
function StepCard({ n, name, brand }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: WK.panel, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: WK.mid }}>{n}</span>
      <Ph h={40} w={40} label="" round={6} />
      <div style={{ flex: 1 }}><H size={12}>{name}</H><Txt size={10}>{brand}</Txt></div>
      <span style={{ color: WK.faint, fontSize: 15 }}>⠿</span>
    </div>
  );
}

// L4-19 Wishlist
function Wishlist() {
  return (
    <Frame
      purpose="Saved products grid with quick actions; supports an empty state."
      components={['Saved grid', 'Remove + move-to-routine actions', 'Empty state']}
      states={['default', 'empty']}
      flows={['Move to routine → Routine Builder', 'Card → Product Detail']}>
      <Phone tab="profile">
        <AppBar title="Saved · 8" back action="⌗" />
        <Body pad={16} gap={12} scroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <SavedCard /><SavedCard /><SavedCard /><SavedCard />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function SavedCard() {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <Ph h={88} round={0} label="Product thumb" />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', background: WK.accentBg, border: '1px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.accentInk }}>♥</span>
      </div>
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <TLine w="85%" h={7} strong /><TLine w="50%" h={6} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>₱___</span>
          <span style={{ fontSize: 13, color: WK.accent }}>+</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LAYER 5 · User Profile
// ════════════════════════════════════════════════════════════════════

// L5-20 Profile Home
function Profile() {
  return (
    <Frame
      purpose="Identity + skin-profile summary, with shortcuts into history, achievements, and edit."
      components={['Avatar + name', 'Skin profile summary (tone/type/concerns)', 'My Routine & Tracker (relocated here from bottom nav)', 'Shortcuts (history, achievements, saved)', 'Edit profile']}
      states={['default']}
      flows={['My Routine → Routine Builder', 'History → Skin Journal', 'Achievements → Achievements', 'Edit → Skin Profile Setup']}>
      <Phone tab="profile">
        <AppBar title="Profile" action="⚙" />
        <Body pad={16} gap={14} scroll>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1.5px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: WK.mid }}>◐</div>
            <div style={{ flex: 1 }}><H size={17}>Maria Santos</H><Txt size={11}>Joined Mar 2026 · Free tier</Txt></div>
            <Btn kind="ghost" sm>Edit</Btn>
          </div>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Txt size={10} color={WK.mid}>SKIN PROFILE</Txt>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <Stat k="Tone" v="MST-5" /><Stat k="Type" v="Combo" /><Stat k="Budget" v="₱500" />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              <Chip>Acne</Chip><Chip>Oiliness</Chip><Chip>Dark spots</Chip>
            </div>
          </Card>
          <div style={{ border: '1.5px solid ' + WK.accent, borderRadius: 10, padding: '12px 14px', background: WK.accentBg, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: WK.paper, border: '1px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: WK.accentInk }}>◔</span>
            <div style={{ flex: 1 }}>
              <H size={13} color={WK.ink}>My Routine & Tracker</H>
              <Txt size={10.5} color={WK.accentInk}>AM/PM · 4 steps · Day 12 of 30</Txt>
            </div>
            <span style={{ color: WK.accentInk, fontSize: 16 }}>›</span>
          </div>
          <ProfRow icon="◷" label="Skin journal & history" />
          <ProfRow icon="★" label="Achievements & streaks" />
          <ProfRow icon="♥" label="Saved products" />
        </Body>
      </Phone>
    </Frame>
  );
}
function Stat({ k, v }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 6, padding: '8px 6px', textAlign: 'center' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: WK.ink }}>{v}</div>
      <div style={{ fontSize: 9, color: WK.mid }}>{k}</div>
    </div>
  );
}
function ProfRow({ icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px dashed ' + WK.line }}>
      <span style={{ width: 30, height: 30, borderRadius: 7, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.ink }}>{icon}</span>
      <Txt size={12.5} color={WK.ink} w={600} style={{ flex: 1 }}>{label}</Txt>
      <span style={{ color: WK.faint }}>›</span>
    </div>
  );
}

// L5-21 Skin Journal / History
function Journal() {
  return (
    <Frame
      purpose="Chronological log of past scans + tracker entries, filterable by module."
      components={['Module filter chips', 'Date-grouped entries', 'Entry thumb + result snippet', 'Tap-through to detail']}
      states={['default', 'empty']}
      flows={['Entry → its result detail']}>
      <Phone>
        <AppBar title="Skin Journal" back action="⌗" />
        <Body pad={16} gap={12} scroll>
          <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
            <Chip on>All</Chip><Chip>Tone</Chip><Chip>Condition</Chip><Chip>Tracker</Chip>
          </div>
          <Txt size={10} color={WK.faint} style={{ fontWeight: 700, letterSpacing: 1 }}>THIS WEEK</Txt>
          <JournalRow icon="◔" title="Tracker · Day 12 logged" meta="Today · streak 12" />
          <JournalRow icon="◐" title="Skin tone — MST-5" meta="Mon · 92% confidence" />
          <Txt size={10} color={WK.faint} style={{ fontWeight: 700, letterSpacing: 1, marginTop: 4 }}>EARLIER</Txt>
          <JournalRow icon="◍" title="Skin condition scan" meta="Mar 28 · 3 concerns" />
          <JournalRow icon="⚗" title="Ingredient scan — cleanser" meta="Mar 25 · 2 flags" />
        </Body>
      </Phone>
    </Frame>
  );
}
function JournalRow({ icon, title, meta }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 36, height: 36, borderRadius: 8, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: WK.ink }}>{icon}</span>
      <div style={{ flex: 1 }}><H size={12}>{title}</H><Txt size={10}>{meta}</Txt></div>
      <span style={{ color: WK.faint }}>›</span>
    </div>
  );
}

// L5-22 Achievements
function Achievements() {
  return (
    <Frame
      purpose="Milestones, streaks, and equity/journey badges — gentle, not over-gamified."
      components={['Earned vs locked badges', 'Streak summary', 'Progress to next milestone']}
      states={['default']}
      flows={['Badge → detail / share']}>
      <Phone>
        <AppBar title="Achievements" back />
        <Body pad={16} gap={14} scroll>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: WK.accentInk }}>★</div>
            <div><Txt size={10} color={WK.accentInk}>Your journey</Txt><H size={14} color={WK.ink}>6 badges · 12-day streak</H></div>
          </Card>
          <SecLabel>Earned</SecLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            <Badge label="First scan" on /><Badge label="Routine set" on /><Badge label="Week one" on />
          </div>
          <SecLabel>In progress</SecLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            <Badge label="30 days" /><Badge label="Dupe saver" /><Badge label="Shade pro" />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function Badge({ label, on }) {
  return (
    <div style={{ border: '1.5px dashed ' + (on ? WK.accent : WK.line), borderRadius: 10, padding: '14px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: on ? WK.accentBg : WK.panel, opacity: on ? 1 : 0.6 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid ' + (on ? WK.accent : WK.faint), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: on ? WK.accentInk : WK.faint }}>{on ? '✦' : '◌'}</div>
      <span style={{ fontSize: 9, fontWeight: 600, color: on ? WK.accentInk : WK.mid, textAlign: 'center' }}>{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LAYER 6 · Settings & Support
// ════════════════════════════════════════════════════════════════════

// L6-23 Settings
function Settings() {
  return (
    <Frame
      purpose="Account, notifications, privacy & data controls (RA 10173 / Data Privacy Act), theme, sign-out."
      components={['Grouped setting rows', 'Privacy & data controls section', 'Theme switch', 'Sign out']}
      states={['default']}
      flows={['Subscription → Plans', 'Privacy → data export/delete']}>
      <Phone>
        <AppBar title="Settings" back />
        <Body pad={16} gap={16} scroll>
          <SetGroup title="ACCOUNT">
            <SetRow label="Email & password" v="juan@email" />
            <SetRow label="Subscription" v="Free ›" accent />
          </SetGroup>
          <SetGroup title="NOTIFICATIONS">
            <SetRow label="Daily tracker reminder" toggle on />
            <SetRow label="New dupe alerts" toggle />
          </SetGroup>
          <SetGroup title="PRIVACY & DATA · RA 10173">
            <SetRow label="Download my data" v="›" />
            <SetRow label="Delete my data" v="›" />
            <SetRow label="On-device processing" toggle on />
          </SetGroup>
          <SetGroup title="APPEARANCE">
            <SetRow label="Theme" v="System ›" />
          </SetGroup>
          <Btn kind="secondary" full>Sign out</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function SetGroup({ title, children }) {
  return (
    <div>
      <Txt size={9.5} color={WK.faint} style={{ fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{title}</Txt>
      <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}
function SetRow({ label, v, toggle, on, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 12px', borderBottom: '1px dashed ' + WK.line }}>
      <Txt size={12} color={WK.ink}>{label}</Txt>
      {toggle ? <MiniToggle on={on} /> : <span style={{ fontSize: 11, color: accent ? WK.accentInk : WK.mid, fontWeight: accent ? 700 : 400 }}>{v}</span>}
    </div>
  );
}
function MiniToggle({ on }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? WK.accent : WK.panel2, position: 'relative', border: '1px solid ' + (on ? WK.accent : WK.line) }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 17 : 2, width: 14, height: 14, borderRadius: '50%', background: '#fff' }} />
    </div>
  );
}

// L6-24 Subscription / Plans
function Subscription() {
  return (
    <Frame
      purpose="Free tier presented first & permanently; premium clearly additive, not gating essentials. Explicit no-ads."
      components={['Free plan card (highlighted, current)', 'Premium plan card (additive perks)', 'No-ads-ever statement', 'Feature comparison']}
      states={['default']}
      flows={['Stay free (no pressure)', 'Upgrade → checkout']}>
      <Phone>
        <AppBar title="Plans" back />
        <Body pad={16} gap={14} scroll>
          <Banner icon="◇">No ads, ever — on every plan. Core features are free forever.</Banner>
          <div style={{ border: '2px solid ' + WK.accent, borderRadius: 12, padding: 14, background: WK.accentBg, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <H size={15} color={WK.ink}>Free</H>
              <span style={{ fontSize: 9, fontWeight: 700, color: WK.accentInk, border: '1px solid ' + WK.accent, borderRadius: 12, padding: '3px 9px' }}>YOUR PLAN</span>
            </div>
            <H size={20} color={WK.ink}>₱0 <span style={{ fontSize: 11, fontWeight: 400, color: WK.mid }}>forever</span></H>
            <PlanFeat t="All 7 AI tools" /><PlanFeat t="FDA verification on every product" /><PlanFeat t="Routine + 30-day tracker" />
          </div>
          <div style={{ border: '1.5px dashed ' + WK.line, borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <H size={15}>Premium <span style={{ fontSize: 10, color: WK.mid, fontWeight: 400 }}>· optional extras</span></H>
            <H size={20} color={WK.ink}>₱149 <span style={{ fontSize: 11, fontWeight: 400, color: WK.mid }}>/ month</span></H>
            <PlanFeat t="Unlimited scan history" muted /><PlanFeat t="Advanced trend reports" muted /><PlanFeat t="Priority new-feature access" muted />
            <Btn kind="primary" full style={{ marginTop: 4 }}>Upgrade</Btn>
            <Txt size={9.5} style={{ textAlign: 'center' }}>Essentials are never moved behind this.</Txt>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function PlanFeat({ t, muted }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: muted ? WK.mid : WK.accentInk, fontSize: 12 }}>✓</span>
      <Txt size={11} color={muted ? WK.mid : WK.ink}>{t}</Txt>
    </div>
  );
}

// L6-25 Help & Support
function Help() {
  return (
    <Frame
      purpose="Searchable FAQ + support entry; links to the FDA-verification explainer and mission statement."
      components={['FAQ search', 'FAQ accordion', 'Contact support', 'FDA explainer link', 'Mission statement link']}
      states={['default']}
      flows={['FDA explainer → info page', 'Contact → support thread']}>
      <Phone>
        <AppBar title="Help & Support" back />
        <Body pad={16} gap={12} scroll>
          <div style={{ height: 44, borderRadius: 22, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', fontSize: 12, color: WK.mid }}>⌕ Search help…</div>
          <SecLabel>Popular questions</SecLabel>
          <FaqRow q="How does FDA verification work?" open />
          <FaqRow q="Is the free tier really permanent?" />
          <FaqRow q="How accurate are the AI scans?" />
          <FaqRow q="How is my photo data handled?" />
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16, color: WK.accent }}>◇</span>
            <div style={{ flex: 1 }}><H size={12} color={WK.ink}>Our mission</H><Txt size={10}>Health + equity for every Filipino. Read more ›</Txt></div>
          </Card>
          <Btn kind="secondary" full>Contact support</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function FaqRow({ q, open }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: '11px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Txt size={12} color={WK.ink} w={600} style={{ flex: 1 }}>{q}</Txt>
        <span style={{ color: WK.faint, marginLeft: 8 }}>{open ? '⌄' : '›'}</span>
      </div>
      {open && <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed ' + WK.line }}><Txt size={10.5}>Every product shows its FDA Cosmetic Notification Number, checked against the public FDA Philippines registry and a verified distributor.</Txt></div>}
    </div>
  );
}

Object.assign(window, {
  ProductDetail, ProductCompare, Routine, Wishlist,
  Profile, Journal, Achievements, Settings, Subscription, Help,
});
