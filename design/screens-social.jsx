// screens-social.jsx — Layer 8 (Social, Brand & Learn)
// Public Profile · Brand Profile · Brand Sales Analysis · Messages · Notifications · Learn · Favorites

// ── local helpers (Sx prefix) ────────────────────────────────────────
function SxStat({ n, k }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: WK.ink, fontFamily: WK.serif }}>{n}</div>
      <div style={{ fontSize: 9.5, color: WK.mid, marginTop: 1 }}>{k}</div>
    </div>
  );
}
function SxTabs({ items, active = 0 }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px dashed ' + WK.line }}>
      {items.map((t, i) => (
        <div key={t} style={{ flex: 1, textAlign: 'center', padding: '10px 0', fontSize: 11.5, fontWeight: i === active ? 700 : 500, color: i === active ? WK.ink : WK.mid, borderBottom: i === active ? '2px solid ' + WK.accent : '2px solid transparent', marginBottom: -1 }}>{t}</div>
      ))}
    </div>
  );
}
// 2-col masonry-ish post grid cell
function SxPost({ tall }) {
  return (
    <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
      <Ph h={tall ? 150 : 120} round={8} label="" />
      <span style={{ position: 'absolute', bottom: 6, left: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: '#fff', background: 'rgba(0,0,0,.45)', borderRadius: 10, padding: '2px 7px' }}>♡ 1.2k</span>
    </div>
  );
}
// showcase highlight bubble (pinned looks / reels)
function SxHighlight({ label, add }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px ' + (add ? 'dashed ' + WK.accent : 'solid ' + WK.gold), padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: add ? WK.accentBg : WK.paper }}>
        {add ? <span style={{ fontSize: 20, color: WK.accentInk }}>+</span> : <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: WK.panel, border: '1px dashed ' + WK.line }} />}
      </div>
      <span style={{ fontSize: 9.5, fontWeight: 600, color: add ? WK.accentInk : WK.ink }}>{label}</span>
    </div>
  );
}
// brand trust badge — Local / International / Verified Distributor
function SxBrandBadge({ kind, muted }) {
  const map = {
    intl:  { glyph: '⊕', word: 'International', gold: true },
    dist:  { glyph: '✓', word: 'Verified Distributor', rose: true },
    local: { glyph: '⌂', word: 'Local PH' },
  };
  const b = map[kind];
  const bg = muted ? 'transparent' : b.gold ? WK.goldBg : b.rose ? WK.accentBg : WK.panel;
  const fg = muted ? WK.mid : b.gold ? WK.goldInk : b.rose ? WK.accentInk : WK.ink;
  const bd = muted ? WK.line : b.gold ? WK.gold : b.rose ? WK.accent : WK.line;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9.5, fontWeight: 700, color: fg, background: bg, border: '1px ' + (muted ? 'dashed ' : 'solid ') + bd, borderRadius: 14, padding: '4px 10px', opacity: muted ? 0.7 : 1 }}>
      <span>{b.glyph}</span>{b.word}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-35 Public Profile — another user's profile
// ════════════════════════════════════════════════════════════════════
function PublicProfile() {
  return (
    <Frame
      purpose="A creator's public profile as seen by others. Follow + message, public skin profile, and tabs for their posts, shared routines & reviews."
      components={['Cover + avatar + handle', 'Follow + Message buttons', 'Followers/following/posts stats', 'Public skin-profile chips', 'Showcase highlights (pinned looks/reels)', 'Tabs: Posts · Routines · Reviews', 'Post grid']}
      states={['default']}
      flows={['Message → Messages thread', 'Showcase → highlight reel', 'Routines → shared routine', 'Post → Community detail']}>
      <Phone>
        <AppBar title="@maris.glow" back action="⋯" />
        <Body pad={0} gap={0} scroll>
          <div style={{ position: 'relative' }}>
            <Ph h={88} round={0} label="Cover" />
            <div style={{ position: 'absolute', left: 16, bottom: -28, width: 64, height: 64, borderRadius: '50%', border: '3px solid ' + WK.paper, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: WK.mid }}>◐</div>
          </div>
          <div style={{ padding: '36px 16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <H size={17}>Marisol Cruz</H>
                <Txt size={11}>@maris.glow · Skincare creator</Txt>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, border: '1px solid ' + WK.gold, borderRadius: 12, padding: '3px 9px' }}>★ Top Reviewer</span>
            </div>
            <Txt size={11.5} color={WK.ink}>Affordable, FDA-verified glow ups for morena skin 🤎 Sharing honest reviews under ₱1,500.</Txt>
            <div style={{ display: 'flex', padding: '8px 0', borderTop: '1px dashed ' + WK.line, borderBottom: '1px dashed ' + WK.line }}>
              <SxStat n="48.2k" k="Followers" /><SxStat n="312" k="Following" /><SxStat n="186" k="Posts" />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn kind="primary" full sm style={{ height: 40 }}>+ Follow</Btn>
              <Btn kind="secondary" full sm style={{ height: 40 }}>✉ Message</Btn>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip>MST-5</Chip><Chip>Combination</Chip><Chip>Acne-prone</Chip>
            </div>
            <div>
              <Txt size={9.5} color={WK.faint} w={700} style={{ letterSpacing: 0.8, marginBottom: 8 }}>SHOWCASE</Txt>
              <div style={{ display: 'flex', gap: 14, overflow: 'hidden' }}>
                <SxHighlight label="Glow up" /><SxHighlight label="GRWM" /><SxHighlight label="Faves" /><SxHighlight label="Hauls" /><SxHighlight label="New" add />
              </div>
            </div>
          </div>
          <SxTabs items={['Posts', 'Routines', 'Reviews']} active={0} />
          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <SxPost tall /><SxPost /><SxPost /><SxPost tall />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-36 Brand Profile — brand storefront
// ════════════════════════════════════════════════════════════════════
function BrandProfile() {
  return (
    <Frame
      purpose="A brand's in-app storefront. FDA-registered-distributor status is the headline trust signal; follow, message, and shop the verified catalog."
      components={['Brand banner + logo', 'Brand badges: Local / International / Verified Distributor', 'FDA-registered distributor badge', 'Follow + Message', 'Rating + followers', 'Tabs: Products · About · Reviews', 'Product grid w/ FDA badges']}
      states={['default']}
      flows={['Message → Messages', 'Product → Product Detail', 'About → brand story']}>
      <Phone>
        <AppBar title="CeraVe" back action="⤴" />
        <Body pad={0} gap={0} scroll>
          <div style={{ position: 'relative' }}>
            <Ph h={92} round={0} label="Brand banner" />
            <div style={{ position: 'absolute', left: 16, bottom: -26, width: 60, height: 60, borderRadius: 14, border: '3px solid ' + WK.paper, background: WK.paper, boxShadow: '0 2px 8px rgba(0,0,0,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ph h={48} w={48} round={10} label="" />
            </div>
          </div>
          <div style={{ padding: '34px 16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <H size={18}>CeraVe</H>
              <span style={{ fontSize: 13, color: WK.accentInk }}>✓</span>
              <span style={{ fontSize: 10.5, color: WK.mid }}>· Official Store</span>
            </div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              <SxBrandBadge kind="intl" /><SxBrandBadge kind="dist" /><SxBrandBadge kind="local" muted />
            </div>
            <Card accent style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 11 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>✓</span>
              <div style={{ flex: 1 }}><H size={11.5} color={WK.ink}>FDA-registered distributor</H><Txt size={10}>L'Oréal Philippines · LTO-3000-2024</Txt></div>
              <span style={{ fontSize: 10.5, color: WK.accentInk, fontWeight: 700 }}>Verify ›</span>
            </Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 11, color: WK.ink, fontWeight: 600 }}>★ 4.8 <span style={{ color: WK.mid, fontWeight: 400 }}>(12.4k)</span></span>
              <span style={{ fontSize: 11, color: WK.ink, fontWeight: 600 }}>128k <span style={{ color: WK.mid, fontWeight: 400 }}>followers</span></span>
              <span style={{ fontSize: 11, color: WK.ink, fontWeight: 600 }}>42 <span style={{ color: WK.mid, fontWeight: 400 }}>products</span></span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn kind="primary" full sm style={{ height: 40 }}>+ Follow</Btn>
              <Btn kind="secondary" full sm style={{ height: 40 }}>✉ Message</Btn>
            </div>
          </div>
          <SxTabs items={['Products', 'About', 'Reviews']} active={0} />
          <div style={{ padding: 12 }}>
            <div style={{ display: 'flex', gap: 6, overflow: 'hidden', marginBottom: 12 }}>
              <Chip on>All 42</Chip><Chip>Cleansers</Chip><Chip>Moisturizers</Chip><Chip>SPF</Chip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <ProductCard /><ProductCard /><ProductCard /><ProductCard />
            </div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-37 Brand Sales Analysis — seller-side dashboard
// ════════════════════════════════════════════════════════════════════
function BrandSales() {
  return (
    <Frame
      purpose="Seller-portal analytics for brands on Aura: revenue & order KPIs, a sales trend chart, top products, and FDA-compliance health."
      components={['Period switch (7d/30d/90d)', 'KPI cards: revenue · orders · AOV · conversion', 'Sales trend bar chart', 'Top products table', 'FDA compliance status', 'Export report']}
      states={['default']}
      flows={['Product row → product analytics', 'Compliance → renewal flow']}>
      <Phone>
        <AppBar title="Sales analysis" back action="⤓" />
        <Body pad={16} gap={14} scroll>
          <div style={{ display: 'flex', background: WK.panel, borderRadius: 8, padding: 4 }}>
            {['7 days', '30 days', '90 days'].map((t, i) => (
              <div key={t} style={{ flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 6, background: i === 1 ? WK.paper : 'transparent', fontSize: 11, fontWeight: i === 1 ? 700 : 600, color: i === 1 ? WK.ink : WK.mid, boxShadow: i === 1 ? '0 1px 2px rgba(0,0,0,.06)' : 'none' }}>{t}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <SxKpi k="Revenue" v="₱842k" d="+18%" up />
            <SxKpi k="Orders" v="1,284" d="+9%" up />
            <SxKpi k="Avg. order" v="₱656" d="−2%" />
            <SxKpi k="Conversion" v="3.4%" d="+0.4pt" up />
          </div>
          <Card pad={12} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Txt size={11} color={WK.ink} w={700}>Revenue trend</Txt>
              <Txt size={10} color={WK.mid}>vs prev 30d</Txt>
            </div>
            <SxChart />
          </Card>
          <div>
            <SecLabel more="View all ›">Top products</SecLabel>
            <div style={{ border: '1px dashed ' + WK.line, borderRadius: 10, overflow: 'hidden', marginTop: 8 }}>
              <SxProdRow rank="1" name="Foaming Facial Cleanser" units="412 sold" rev="₱267k" />
              <SxProdRow rank="2" name="Moisturizing Lotion 473ml" units="318 sold" rev="₱285k" />
              <SxProdRow rank="3" name="Hydrating Cleanser 236ml" units="201 sold" rev="₱130k" last />
            </div>
          </div>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</span>
            <div style={{ flex: 1 }}><H size={12} color={WK.ink}>FDA compliance · 42/42 active</H><Txt size={10}>Next notification renewal: Sep 2026</Txt></div>
            <span style={{ fontSize: 16, color: WK.accentInk }}>›</span>
          </Card>
        </Body>
      </Phone>
    </Frame>
  );
}
function SxKpi({ k, v, d, up }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 10, padding: '12px 13px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontSize: 10, color: WK.mid }}>{k}</span>
      <span style={{ fontSize: 20, fontWeight: 700, color: WK.ink, fontFamily: WK.serif, lineHeight: 1.1 }}>{v}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: up ? WK.accentInk : WK.mid }}>{up ? '▲' : '▼'} {d}</span>
    </div>
  );
}
function SxChart() {
  const bars = [38, 52, 44, 61, 55, 72, 68, 80, 64, 88, 76, 95];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 92 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, height: h + '%', borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? WK.accent : WK.panel2, border: '1px solid ' + (i === bars.length - 1 ? WK.accent : WK.line) }} />
      ))}
    </div>
  );
}
function SxProdRow({ rank, name, units, rev, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <span style={{ width: 20, height: 20, borderRadius: 6, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: WK.mid }}>{rank}</span>
      <Ph h={34} w={34} round={6} label="" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <H size={11.5} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</H>
        <Txt size={9.5}>{units}</Txt>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{rev}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-38 Messages — conversation list
// ════════════════════════════════════════════════════════════════════
function Messages() {
  return (
    <Frame
      purpose="Inbox of conversations — with brands (orders/support), creators, and Aura's assistant. Unread badges, search, segmented filters."
      components={['Search', 'Segment: All · Brands · People', 'Conversation row: avatar · name · preview · time · unread', 'Verified brand tick', 'Aura assistant pinned']}
      states={['default', 'empty']}
      flows={['Row → chat thread', 'Brand → Brand Profile']}>
      <Phone>
        <AppBar title="Messages" back action="✎" />
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '12px 16px 8px' }}>
            <div style={{ height: 40, borderRadius: 20, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', fontSize: 12, color: WK.mid }}>⌕ Search messages</div>
          </div>
          <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8 }}>
            <Chip on>All</Chip><Chip>Brands</Chip><Chip>People</Chip>
          </div>
          <SxMsg name="Aura Assistant" tick="gold" preview="Your skin scan results are ready to view." time="now" unread={1} pinned />
          <SxMsg name="CeraVe" tick="rose" preview="Your order #AUR-90412 is out for delivery 🚚" time="2m" unread={2} />
          <SxMsg name="@maris.glow" preview="Yes! That dupe works great for oily skin." time="1h" unread={1} />
          <SxMsg name="The Ordinary · Beauty MNL" tick="rose" preview="Thanks for your order! Let us know if…" time="3h" />
          <SxMsg name="@jasph.skin" preview="omg where did you get that shade 😍" time="Yesterday" />
          <SxMsg name="Belo Essentials" tick="rose" preview="New SPF drop — members get early access" time="2d" />
        </Body>
      </Phone>
    </Frame>
  );
}
function SxMsg({ name, preview, time, unread, tick, pinned }) {
  const tickColor = tick === 'gold' ? WK.goldInk : WK.accentInk;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px dashed ' + WK.line, background: pinned ? WK.goldBg : 'transparent' }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: WK.mid, flexShrink: 0 }}>{pinned ? '◇' : '◐'}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 13, fontWeight: unread ? 700 : 600, color: WK.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          {tick && <span style={{ fontSize: 11, color: tickColor }}>✓</span>}
        </div>
        <span style={{ fontSize: 11, color: unread ? WK.ink : WK.mid, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2, fontWeight: unread ? 600 : 400 }}>{preview}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 9.5, color: WK.mid }}>{time}</span>
        {unread ? <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: WK.accent, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span> : <span style={{ height: 18 }} />}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-39 Notification Page
// ════════════════════════════════════════════════════════════════════
function Notifications() {
  return (
    <Frame
      purpose="Unified activity feed grouped by time. Order updates, social activity, tracker reminders & brand drops, each with its own glyph and unread dot."
      components={['Filter chips (All/Orders/Social/You)', 'Date groups: Today · Earlier', 'Notif row: glyph · text · time · unread dot', 'Mark all read']}
      states={['default', 'empty']}
      flows={['Order notif → Order Tracking', 'Social → Community / Profile', 'Tracker → Tracker']}>
      <Phone>
        <AppBar title="Notifications" back action="✓" />
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8, borderBottom: '1px dashed ' + WK.line }}>
            <Chip on>All</Chip><Chip>Orders</Chip><Chip>Social</Chip><Chip>You</Chip>
          </div>
          <div style={{ padding: '12px 16px 6px' }}><Txt size={9.5} color={WK.faint} w={700} style={{ letterSpacing: 1 }}>TODAY</Txt></div>
          <SxNotif glyph="🚚" tone="rose" text={<span><b>Order #AUR-90412</b> is out for delivery. Arriving 2–5 PM.</span>} time="11:40 AM" unread />
          <SxNotif glyph="♡" tone="rose" text={<span><b>@maris.glow</b> and 24 others liked your routine post.</span>} time="9:02 AM" unread />
          <SxNotif glyph="◔" tone="gold" text={<span>Time to log <b>Day 12</b> of your Brightening AM routine.</span>} time="7:30 AM" unread />
          <div style={{ padding: '12px 16px 6px' }}><Txt size={9.5} color={WK.faint} w={700} style={{ letterSpacing: 1 }}>EARLIER</Txt></div>
          <SxNotif glyph="◐" tone="mid" text={<span><b>@jasph.skin</b> started following you.</span>} time="Yesterday" />
          <SxNotif glyph="◇" tone="gold" text={<span><b>CeraVe</b> dropped a new SPF — members get early access.</span>} time="Yesterday" />
          <SxNotif glyph="₱" tone="rose" text={<span>A cheaper FDA-verified dupe was found for an item you saved.</span>} time="Jun 20" />
        </Body>
      </Phone>
    </Frame>
  );
}
function SxNotif({ glyph, tone, text, time, unread }) {
  const bg = tone === 'gold' ? WK.goldBg : tone === 'rose' ? WK.accentBg : WK.panel;
  const fg = tone === 'gold' ? WK.goldInk : tone === 'rose' ? WK.accentInk : WK.ink;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: '1px dashed ' + WK.line, background: unread ? 'oklch(0.97 0.012 60)' : 'transparent' }}>
      <span style={{ width: 36, height: 36, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: fg, flexShrink: 0 }}>{glyph}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, lineHeight: 1.45, color: WK.ink }}>{text}</div>
        <span style={{ fontSize: 9.5, color: WK.mid, display: 'block', marginTop: 3 }}>{time}</span>
      </div>
      {unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: WK.accent, marginTop: 6, flexShrink: 0 }} />}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-40 Learn Page — education hub
// ════════════════════════════════════════════════════════════════════
function Learn() {
  return (
    <Frame
      purpose="Editorial education hub: ingredient science, routine guides, and an FDA-&-safety literacy track — building informed, equitable beauty choices."
      components={['Featured article hero', 'Topic chips', 'Article cards w/ read time', 'Video lesson rail', 'FDA literacy track (progress)']}
      states={['default']}
      flows={['Article → reader', 'FDA track → lessons', 'Ingredient → Ingredient Scanner']}>
      <Phone tab="discover">
        <AppBar title="Learn" action="⌕" />
        <Body pad={16} gap={16} scroll>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <Ph h={170} round={12} label="Featured article cover" />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 14, background: 'linear-gradient(to top, rgba(43,41,38,.85), transparent)' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#fff', background: WK.accent, borderRadius: 4, padding: '3px 8px' }}>SKIN SCIENCE</span>
              <div style={{ fontFamily: WK.serif, fontSize: 17, fontWeight: 600, color: '#fff', marginTop: 8, lineHeight: 1.2 }}>Niacinamide vs. Vitamin C: which fits your skin?</div>
              <Txt size={10} color="rgba(255,255,255,.8)" style={{ marginTop: 4 }}>6 min read · by Dr. Reyes</Txt>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, overflow: 'hidden' }}>
            <Chip on>For you</Chip><Chip>Ingredients</Chip><Chip>Routines</Chip><Chip>FDA & safety</Chip><Chip>Shades</Chip>
          </div>
          <SxLearnRow tag="INGREDIENTS" title="The truth about 'whitening' actives" meta="4 min" />
          <SxLearnRow tag="ROUTINES" title="Building a ₱500 starter routine" meta="5 min" />
          <SxLearnRow tag="SAFETY" title="How to read an FDA notification number" meta="3 min" />
          <div>
            <SecLabel more="See all">Video lessons</SecLabel>
            <div style={{ display: 'flex', gap: 10, overflow: 'hidden', marginTop: 10 }}>
              <SxVideo title="Double cleansing 101" len="2:14" />
              <SxVideo title="Patch testing safely" len="1:48" />
            </div>
          </div>
          <Card accent style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</span>
              <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>FDA literacy track</H><Txt size={10}>3 of 5 lessons complete</Txt></div>
            </div>
            <ProgBar pct={60} />
          </Card>
        </Body>
      </Phone>
    </Frame>
  );
}
function SxLearnRow({ tag, title, meta }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Ph h={64} w={64} round={8} label="" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.8, color: WK.accentInk }}>{tag}</span>
        <H size={13} style={{ marginTop: 3 }}>{title}</H>
        <Txt size={10} style={{ marginTop: 3 }}>{meta} read</Txt>
      </div>
    </div>
  );
}
function SxVideo({ title, len }) {
  return (
    <div style={{ width: 150, flexShrink: 0 }}>
      <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
        <Ph h={92} round={8} label="" />
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.ink }}>▶</span>
        <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 9, color: '#fff', background: 'rgba(0,0,0,.5)', borderRadius: 4, padding: '1px 5px' }}>{len}</span>
      </div>
      <H size={11.5} style={{ marginTop: 6 }}>{title}</H>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L8-41 Favorite / Wishlist — collections view
// ════════════════════════════════════════════════════════════════════
function Favorites() {
  return (
    <Frame
      purpose="Organized favorites by collection (boards) — distinct from the flat Saved grid. Create boards like 'Want to try' or 'Holy grails', each with a cover stack + count."
      components={['New collection button', 'Collection card: cover stack · name · count', 'Recently favorited rail', 'Price-drop alert toggle']}
      states={['default', 'empty']}
      flows={['Collection → product grid', 'Heart → Product Detail', 'Alert → notifications']}>
      <Phone tab="profile">
        <AppBar title="Favorites" back action="+" />
        <Body pad={16} gap={16} scroll>
          <Banner icon="₱">Get notified when anything you ♥ drops in price — alerts on, no ads.</Banner>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <SxCollection name="Want to try" count="14 items" />
            <SxCollection name="Holy grails" count="8 items" />
            <SxCollection name="Dupes to compare" count="6 items" />
            <SxCollectionNew />
          </div>
          <div>
            <SecLabel more="See all">Recently favorited</SecLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              <ProductCard /><ProductCard />
            </div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function SxCollection({ name, count }) {
  return (
    <div>
      <div style={{ position: 'relative', height: 116, borderRadius: 10, overflow: 'hidden', border: '1px dashed ' + WK.line }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', height: '100%', gap: 2 }}>
          <Ph round={0} h="100%" label="" />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2 }}>
            <Ph round={0} h="100%" label="" />
            <Ph round={0} h="100%" label="" />
          </div>
        </div>
        <span style={{ position: 'absolute', top: 7, right: 7, width: 24, height: 24, borderRadius: '50%', background: WK.accentBg, border: '1px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.accentInk }}>♥</span>
      </div>
      <H size={13} style={{ marginTop: 7 }}>{name}</H>
      <Txt size={10}>{count}</Txt>
    </div>
  );
}
function SxCollectionNew() {
  return (
    <div>
      <div style={{ height: 116, borderRadius: 10, border: '1.5px dashed ' + WK.accent, background: WK.accentBg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: WK.accentInk }}>
        <span style={{ fontSize: 22 }}>+</span>
        <span style={{ fontSize: 11, fontWeight: 700 }}>New collection</span>
      </div>
      <div style={{ height: 22, marginTop: 7 }} />
    </div>
  );
}

Object.assign(window, {
  PublicProfile, BrandProfile, BrandSales, Messages, Notifications, Learn, Favorites,
});
