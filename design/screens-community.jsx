// screens-community.jsx — Community hub (personalized to skin) + Tutorial Detail
// The Community tab is now a multi-format hub: photos, videos, tutorials,
// tips/advice & makeup recommendations — every item ranked by how well it
// matches the user's skin condition + palette/undertone.

// ── local helpers (Co prefix) ───────────────────────────────────────
// content-type pill on a media card
function CoType({ kind }) {
  const map = {
    tutorial: { g: '☷', t: 'Tutorial' },
    video:    { g: '▶', t: 'Video' },
    tip:      { g: '✎', t: 'Tip' },
    look:     { g: '◈', t: 'Look' },
    review:   { g: '★', t: 'Review' },
    rec:      { g: '⦿', t: 'Pick' },
  };
  const m = map[kind] || map.video;
  return (
    <span style={{ position: 'absolute', top: 7, left: 7, display: 'flex', alignItems: 'center', gap: 4, fontSize: 8.5, fontWeight: 700, letterSpacing: 0.4, color: '#fff', background: 'rgba(43,41,38,.78)', borderRadius: 12, padding: '3px 8px' }}>
      <span style={{ fontSize: 9 }}>{m.g}</span>{m.t}
    </span>
  );
}
// skin-match tag — WHY this is shown to the user
function CoMatch({ children, gold }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 8.5, fontWeight: 700, color: gold ? WK.goldInk : WK.accentInk, background: gold ? WK.goldBg : WK.accentBg, border: '1px solid ' + (gold ? WK.gold : WK.accent), borderRadius: 10, padding: '2px 7px' }}>
      <span>{gold ? '◐' : '✓'}</span>{children}
    </span>
  );
}
function CoAuthor({ name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: WK.mid }}>◐</span>
      <span style={{ fontSize: 9.5, color: WK.mid, fontWeight: 600 }}>{name}</span>
    </div>
  );
}

// masonry feed card
function CoPost({ kind, h = 130, title, author, match, gold, likes, len, steps }) {
  return (
    <div style={{ breakInside: 'avoid', marginBottom: 12, border: '1px dashed ' + WK.line, borderRadius: 10, overflow: 'hidden', background: WK.paper }}>
      <div style={{ position: 'relative' }}>
        <Ph h={h} round={0} label="" />
        <CoType kind={kind} />
        <span style={{ position: 'absolute', top: 7, right: 7, width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.ink }}>☆</span>
        {(kind === 'video' || kind === 'tutorial') && (
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: WK.ink }}>▶</span>
        )}
        {len && <span style={{ position: 'absolute', bottom: 7, right: 7, fontSize: 8.5, color: '#fff', background: 'rgba(0,0,0,.55)', borderRadius: 4, padding: '1px 6px' }}>{len}</span>}
        {steps && <span style={{ position: 'absolute', bottom: 7, left: 7, fontSize: 8.5, color: '#fff', background: 'rgba(0,0,0,.55)', borderRadius: 4, padding: '1px 6px' }}>{steps} steps</span>}
      </div>
      <div style={{ padding: 9, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <H size={12} style={{ lineHeight: 1.25 }}>{title}</H>
        <CoMatch gold={gold}>{match}</CoMatch>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CoAuthor name={author} />
          <span style={{ fontSize: 9.5, color: WK.mid, fontWeight: 600 }}>♡ {likes}</span>
        </div>
      </div>
    </div>
  );
}

// text-forward TIP card (advice, no photo) — visually distinct
function CoTip({ quote, author, match, gold }) {
  return (
    <div style={{ breakInside: 'avoid', marginBottom: 12, borderRadius: 10, overflow: 'hidden', background: gold ? WK.goldBg : WK.accentBg, border: '1px solid ' + (gold ? WK.gold : WK.accent), padding: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 8.5, fontWeight: 700, letterSpacing: 0.4, color: gold ? WK.goldInk : WK.accentInk }}>✎ TIP</div>
      <div style={{ fontFamily: WK.serif, fontSize: 14, fontWeight: 500, color: WK.ink, lineHeight: 1.3 }}>{quote}</div>
      <CoMatch gold={gold}>{match}</CoMatch>
      <CoAuthor name={author} />
    </div>
  );
}

// makeup-recommendation card (shoppable pick)
function CoRec({ title, author, match }) {
  return (
    <div style={{ breakInside: 'avoid', marginBottom: 12, border: '1.5px solid ' + WK.gold, borderRadius: 10, overflow: 'hidden', background: WK.paper }}>
      <div style={{ position: 'relative' }}>
        <Ph h={120} round={0} label="" />
        <CoType kind="rec" />
        <span style={{ position: 'absolute', bottom: 7, right: 7, width: 28, height: 28, borderRadius: '50%', background: WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BasketIcon size={14} /></span>
      </div>
      <div style={{ padding: 9, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <H size={12} style={{ lineHeight: 1.25 }}>{title}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>₱299</span><FDABadge sm /></div>
        <CoMatch gold>{match}</CoMatch>
        <CoAuthor name={author} />
      </div>
    </div>
  );
}

// horizontal "matched to your skin" rail card
function CoRailCard({ kind, title, match }) {
  return (
    <div style={{ width: 150, flexShrink: 0, border: '1px dashed ' + WK.line, borderRadius: 10, overflow: 'hidden', background: WK.paper }}>
      <div style={{ position: 'relative' }}><Ph h={96} round={0} label="" /><CoType kind={kind} /></div>
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <H size={11} style={{ lineHeight: 1.25 }}>{title}</H>
        <CoMatch gold>{match}</CoMatch>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L2-26 Community — personalized multi-format hub
// ════════════════════════════════════════════════════════════════════
function Community() {
  return (
    <Frame
      purpose="The Community tab, rebuilt as a personalized hub. Stores & surfaces photos, videos, tutorials, tips/advice and makeup recommendations — each ranked by how well it matches the user's skin condition (combination, acne-prone) and palette/undertone (MST-5, warm autumn). Every card shows WHY it was matched. Tap into Reels for the immersive feed; tap + to share your own."
      components={['Personalization header (skin condition + palette) + Adjust', "'For my skin' / 'All' personalization toggle", 'Header: search · Library (☆) · messages', 'Content-type chips: For You · Tutorials · Skincare · Tips · Looks · Reels · Reviews', 'Browse-by-skin-type category strip (yours highlighted)', 'Matched-to-your-skin rail', 'Creators-for-your-skin avatars', 'Mixed-media masonry feed (photo/video/tutorial/tip/skincare/rec)', 'Per-card skin-match reason tag', 'Save (bookmark) + creator', 'Create FAB → upload photo/video/tutorial/tip', 'Reels entry']}
      states={['default', 'empty']}
      flows={['Card → Tutorial / Post Detail', 'Library (☆) → Saved Library', 'Browse all skin types → Browse by Skin', 'Creators → Creators / Following', 'For my skin / All → toggle personalization', 'Rec basket → Shop the Look', 'Reels chip → Community Reels', 'FAB → Create / Upload', 'Adjust → Skin Profile']}>
      <Phone tab="community">
        <div style={{ flex: '0 0 50px', height: 50, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, borderBottom: '1px dashed ' + WK.line }}>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: WK.ink, fontFamily: WK.serif }}>Community</span>
          <span style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: WK.ink }}>⌕</span>
          <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: WK.ink }}>☆</span>
          <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: WK.mid }}>✉</span>
        </div>
        <Body pad={0} gap={0} scroll>
          {/* personalization header */}
          <div style={{ padding: '12px 16px', background: WK.goldBg, borderBottom: '1px solid ' + WK.gold }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid ' + WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WK.goldInk, background: WK.paper }}>◐</span>
              <span style={{ flex: 1, fontSize: 11.5, fontWeight: 700, color: WK.ink }}>Curated for your skin</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: WK.goldInk }}>Adjust ›</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <Chip on>Combination</Chip><Chip on>Acne-prone</Chip><Chip on>MST-5</Chip><Chip on>Warm autumn</Chip>
            </div>
            {/* personalization toggle */}
            <CoSeg options={['For my skin', 'All']} active={0} />
          </div>
          {/* content-type chips */}
          <div className="wk-hscroll" style={{ height: 50, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 7, overflowX: 'auto', flexWrap: 'nowrap', flexShrink: 0, borderBottom: '1px dashed ' + WK.line }}>
            {['For You','Tutorials','Skincare','Tips','Looks','Reels','Reviews'].map((c, i) => (
              <Chip key={c} on={i === 0} style={{ flexShrink: 0 }}>{c}</Chip>
            ))}
          </div>
          {/* browse by skin type / palette entry */}
          <div style={{ padding: '12px 16px 2px' }}>
            <SecLabel more="Browse all ›">Browse by your skin type</SecLabel>
            <div style={{ display: 'flex', gap: 8, overflow: 'hidden', marginTop: 9 }}>
              <CoCat label="Combination" count="2.1k" mine /><CoCat label="Acne-prone" count="4.8k" mine /><CoCat label="Warm autumn" count="930" mine /><CoCat label="Sensitive" count="1.5k" /><CoCat label="MST 1–4" count="3.3k" />
            </div>
          </div>
          {/* matched-to-your-skin rail */}
          <div style={{ padding: '14px 16px 4px' }}>
            <SecLabel more="See all">Matched to your skin</SecLabel>
            <div style={{ display: 'flex', gap: 10, overflow: 'hidden', marginTop: 10 }}>
              <CoRailCard kind="tutorial" title="Oily-skin base that lasts all day" match="Combination" />
              <CoRailCard kind="video" title="Niacinamide for acne — how to layer" match="Acne-prone" />
              <CoRailCard kind="look" title="Warm-toned everyday glow" match="Warm autumn" />
            </div>
          </div>
          {/* creators for your skin */}
          <div style={{ padding: '14px 16px 0' }}>
            <SecLabel more="See all ›">Creators for your skin</SecLabel>
            <div style={{ display: 'flex', gap: 14, overflow: 'hidden', marginTop: 11 }}>
              <CoCreatorAvatar name="@derm.ph" tag="Acne" /><CoCreatorAvatar name="@maris.glow" tag="Warm" /><CoCreatorAvatar name="@shade.guru" tag="MST-5" /><CoCreatorAvatar name="@bea.makeup" tag="Combo" /><CoCreatorAvatar name="@skin.science" tag="PM" />
            </div>
          </div>
          {/* masonry feed */}
          <div style={{ padding: '14px 16px 90px' }}>
            <SecLabel>From the community</SecLabel>
            <div style={{ columns: 2, columnGap: 12, marginTop: 12 }}>
              <CoPost kind="tutorial" h={150} title="3-step morena glow, under ₱1.5k" author="@maris.glow" match="Warm autumn" gold steps="3" likes="12.4k" />
              <CoTip quote="Patch-test actives for 48h before your face — esp. with sensitive, acne-prone skin." author="@derm.ph" match="Acne-prone" />
              <CoPost kind="video" h={168} title="GRWM: dewy base for combination skin" author="@bea.makeup" match="Combination" len="0:42" likes="3.1k" />
              <CoTip quote="Skincare first: niacinamide AM, then SPF. Acne-prone skin calms before makeup even goes on." author="@skin.science" match="Skincare · Acne-prone" />
              <CoRec title="Cream blush in Terracotta — made for warm undertones" author="Picked for you" match="Warm autumn" />
              <CoPost kind="review" h={120} title="Honest review: this SPF on oily skin" author="@jasph.skin" match="Combination" likes="980" />
              <CoPost kind="look" h={140} title="Soft glam for medium-deep skin" author="@aura.looks" match="MST-5" gold likes="5.7k" />
              <CoTip quote="Apply foundation 1 shade test along the jaw — match your depth, not your wrist." author="@shade.guru" match="MST-5" gold />
              <CoPost kind="tutorial" h={150} title="Fade dark spots: a gentle PM routine" author="@skin.science" match="Acne-prone" steps="5" likes="8.2k" />
            </div>
          </div>
        </Body>
        {/* share / create FAB */}
        <div style={{ position: 'absolute', right: 14, bottom: 78, display: 'flex', alignItems: 'center', gap: 8, background: WK.accent, borderRadius: 24, padding: '10px 16px', boxShadow: '0 4px 14px oklch(0.45 0.13 25 / 0.4)', zIndex: 5 }}>
          <span style={{ fontSize: 16, color: '#fff' }}>+</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Create</span>
        </div>
      </Phone>
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════════════
// L2-26c Tutorial / Post Detail — personalized, shoppable
// ════════════════════════════════════════════════════════════════════
function TutorialDetail() {
  return (
    <Frame
      purpose="A community tutorial opened in full. Leads with how well it fits the viewer's skin, then the products used (shoppable, FDA-verified), step-by-step instructions, and creator tips. The payoff of the personalized feed."
      components={['Hero video/photo + play', 'Creator + follow', 'Skin-match banner (condition + palette fit)', 'Meta: type · difficulty · duration', 'Products used (shoppable) + Shop all', 'Numbered steps w/ thumbs', 'Creator tips', 'Save · Share · comment bar']}
      states={['default']}
      flows={['Shop all → Shop the Look', 'Product → Product Detail', 'Try in AR → AR Try-On', 'Comment → Social Interaction', 'Creator → Public Profile']}>
      <Phone>
        <AppBar title="Tutorial" back action="☆" />
        <Body pad={0} gap={0} scroll>
          <div style={{ position: 'relative' }}>
            <Ph h={200} round={0} label="Tutorial video" />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: WK.ink }}>▶</span>
            <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 9.5, color: '#fff', background: 'rgba(0,0,0,.55)', borderRadius: 4, padding: '2px 7px' }}>4:12</span>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 13 }}>
            <H size={18}>3-step morena glow, under ₱1,500</H>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.mid }}>◐</span>
              <div style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><H size={12.5}>@maris.glow</H><span style={{ fontSize: 10, color: WK.goldInk }}>★</span></div><Txt size={9.5}>Skincare creator</Txt></div>
              <Btn kind="secondary" sm>+ Follow</Btn>
            </div>
            {/* skin-match banner */}
            <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: 12, background: WK.goldBg, display: 'flex', gap: 11, alignItems: 'center' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid ' + WK.gold, background: WK.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.goldInk, flexShrink: 0 }}>◐</span>
              <div style={{ flex: 1 }}>
                <H size={12.5} color={WK.ink}>Great match for your skin</H>
                <Txt size={10.5} color={WK.goldInk}>Built for combination, acne-prone skin · warm autumn palette</Txt>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: WK.goldInk }}>92%</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <CoMeta k="Type" v="Tutorial" /><CoMeta k="Level" v="Beginner" /><CoMeta k="Time" v="10 min" />
            </div>
            {/* products used — shoppable */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>Products used (3)</span><div style={{ fontSize: 8.5, fontWeight: 700, color: WK.goldInk, letterSpacing: 0.3 }}>FDA-registered · CPNN-verified · tap to open</div></div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: WK.accentInk }}>Shop all · ₱747 ›</span>
            </div>
            <CoUsed name="Fit Me Foundation · 330" brand="Maybelline" price="₱299" />
            <CoUsed name="Cream Blush · Terracotta" brand="Blk Cosmetics" price="₱249" />
            <CoUsed name="Lip & Cheek Stain · Rosy" brand="Sunnies Face" price="₱199" last />
            {/* steps */}
            <SecLabel>Steps</SecLabel>
            <CoStep n={1} title="Prep & even out" body="Press in foundation with a damp sponge; build only where needed to keep it breathable on combination skin." />
            <CoStep n={2} title="Warm it up" body="Cream blush high on the cheeks and bridge of the nose for that morena glow — warm undertone friendly." />
            <CoStep n={3} title="Lock the look" body="Stain on lips + cheeks, then a light setting mist. Skip heavy powder so acne-prone skin can breathe." last />
            {/* creator tip */}
            <div style={{ border: '1px dashed ' + WK.accent, borderRadius: 10, padding: 12, background: WK.accentBg, display: 'flex', gap: 9 }}>
              <span style={{ fontSize: 14, color: WK.accentInk }}>✎</span>
              <Txt size={10.5} color={WK.accentInk}><b>Creator tip:</b> for oily T-zones, set only the center of your face — leave the cheeks dewy.</Txt>
            </div>
          </div>
        </Body>
        <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: WK.mid, fontWeight: 600 }}>♡ 12.4k</span>
          <span style={{ fontSize: 12, color: WK.mid, fontWeight: 600 }}>✉ 318</span>
          <Btn kind="primary" full style={{ flex: 1 }}>◉ Try this look in AR</Btn>
        </div>
      </Phone>
    </Frame>
  );
}
function CoMeta({ k, v }) {
  return (
    <div style={{ flex: 1, border: '1px dashed ' + WK.line, borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{v}</div>
      <div style={{ fontSize: 8.5, color: WK.mid, marginTop: 1 }}>{k}</div>
    </div>
  );
}
function CoUsed({ name, brand, price, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingBottom: last ? 0 : 11, borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <Ph h={44} w={44} round={8} label="" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <H size={11.5} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}><Txt size={9.5}>{brand}</Txt><FDABadge sm /></div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{price}</span>
      <span style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid ' + WK.accent, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>+</span>
    </div>
  );
}
function CoStep({ n, title, body, last }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{n}</span>
        {!last && <span style={{ width: 2, flex: 1, minHeight: 24, background: WK.line, margin: '2px 0' }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 14, flex: 1 }}>
        <H size={12.5}>{title}</H>
        <Txt size={10.5} style={{ marginTop: 3 }}>{body}</Txt>
      </div>
    </div>
  );
}

// ── new shared helpers ──────────────────────────────────────────────
// segmented toggle (For my skin / All, Saved / My Posts, etc.)
function CoSeg({ options, active = 0 }) {
  return (
    <div style={{ display: 'flex', background: WK.panel, border: '1px solid ' + WK.line, borderRadius: 9, padding: 3, gap: 3 }}>
      {options.map((o, i) => (
        <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 700, padding: '7px 0', borderRadius: 6, color: i === active ? '#fff' : WK.mid, background: i === active ? WK.accent : 'transparent' }}>{o}</span>
      ))}
    </div>
  );
}
// browse-by-skin category pill (mine = matches the user's profile → gold)
function CoCat({ label, count, mine }) {
  return (
    <div style={{ flexShrink: 0, minWidth: 96, border: '1.5px solid ' + (mine ? WK.gold : WK.line), borderStyle: mine ? 'solid' : 'dashed', borderRadius: 10, padding: '9px 11px', background: mine ? WK.goldBg : WK.paper }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {mine && <span style={{ fontSize: 9, color: WK.goldInk }}>◐</span>}
        <span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>{label}</span>
      </div>
      <div style={{ fontSize: 9, color: mine ? WK.goldInk : WK.mid, marginTop: 3 }}>{count} posts</div>
    </div>
  );
}
// circular creator avatar with skin-match tag (who-to-follow rail)
function CoCreatorAvatar({ name, tag }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: 54, flexShrink: 0 }}>
      <div style={{ position: 'relative' }}>
        <span style={{ width: 46, height: 46, borderRadius: '50%', border: '2px solid ' + WK.gold, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: WK.mid }}>◐</span>
        <span style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)', fontSize: 7.5, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, border: '1px solid ' + WK.gold, borderRadius: 8, padding: '1px 5px', whiteSpace: 'nowrap' }}>{tag}</span>
      </div>
      <span style={{ fontSize: 8.5, color: WK.mid, fontWeight: 600, maxWidth: 54, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L2-26d  Saved Library — the user's own stored pictures, videos,
// tutorials & tips, plus their published posts. Personal archive.
// ════════════════════════════════════════════════════════════════════
function SavedLibrary() {
  return (
    <Frame
      purpose="The user's personal Community archive. Everything they've SAVED (photos, videos, tutorials, tips, makeup picks) plus everything they've POSTED — all organized into collections and still tagged by how each item fits their skin condition + palette. The 'store pictures and videos' home base."
      components={['Saved / My Posts segmented toggle', 'Auto-collections: Tutorials · Looks · Skincare · Tips · Products', 'Saved-items grid w/ type pill + skin-match tag', 'Per-item save (filled bookmark)', 'New collection + (organize)', 'My Posts: own uploads w/ view/like stats', 'Empty-collection state']}
      states={['default', 'empty']}
      flows={['Item → Tutorial / Post Detail', 'My Posts → Public Profile', 'Collection → filtered grid', '+ → New collection', 'Tab → Create / Upload']}>
      <Phone tab="community">
        <AppBar title="Your Library" back action="+" />
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '12px 16px 4px' }}>
            <CoSeg options={['Saved', 'My Posts']} active={0} />
          </div>
          {/* personalized note */}
          <div style={{ padding: '10px 16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, color: WK.goldInk, fontWeight: 600 }}>
              <span>◐</span><span>Organized for combination · acne-prone · warm autumn skin</span>
            </div>
          </div>
          {/* collections */}
          <div style={{ padding: '13px 16px 2px' }}>
            <SecLabel more="Edit">Collections</SecLabel>
            <div style={{ display: 'flex', gap: 9, overflow: 'hidden', marginTop: 10 }}>
              <CoCollection label="Tutorials" n="12" /><CoCollection label="Looks" n="8" /><CoCollection label="Skincare" n="15" /><CoCollection label="Tips" n="6" /><CoCollection label="Products" n="9" gold />
            </div>
          </div>
          {/* saved grid */}
          <div style={{ padding: '16px 16px 90px' }}>
            <SecLabel more="Recently saved">All saved</SecLabel>
            <div style={{ columns: 2, columnGap: 12, marginTop: 12 }}>
              <CoPost kind="tutorial" h={150} title="3-step morena glow, under ₱1.5k" author="@maris.glow" match="Warm autumn" gold steps="3" likes="12.4k" />
              <CoPost kind="video" h={130} title="Niacinamide layering for acne" author="@derm.ph" match="Acne-prone" len="1:08" likes="6.7k" />
              <CoTip quote="Set only your T-zone — leave cheeks dewy for combination skin." author="@bea.makeup" match="Combination" />
              <CoPost kind="look" h={148} title="Soft glam for medium-deep skin" author="@aura.looks" match="MST-5" gold likes="5.7k" />
              <CoRec title="Cream blush · Terracotta — warm undertones" author="Saved pick" match="Warm autumn" />
              <CoPost kind="review" h={118} title="Honest review: SPF on oily skin" author="@jasph.skin" match="Combination" likes="980" />
            </div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
// collection folder tile
function CoCollection({ label, n, gold }) {
  return (
    <div style={{ width: 110, flexShrink: 0 }}>
      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px ' + (gold ? 'solid ' + WK.gold : 'dashed ' + WK.line) }}>
        <Ph h={84} round={0} label="" accent={gold} />
        <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 8.5, fontWeight: 700, color: '#fff', background: 'rgba(43,41,38,.78)', borderRadius: 8, padding: '2px 7px' }}>{n}</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: WK.ink, marginTop: 6 }}>{label}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L2-26e  Create / Upload — share a photo, video, tutorial or tip.
// Always tags the post with skin condition + palette so it can be
// matched to the right people.
// ════════════════════════════════════════════════════════════════════
function CreatePost() {
  return (
    <Frame
      purpose="The create/upload composer reached from the Community FAB. The user picks a format (photo, video, tutorial, or tip), adds media + caption, then tags the skin condition & palette it's for — so AURA can surface it to people with matching skin. Tutorials add steps; any post can tag the products used (shoppable)."
      components={['Format picker: Photo · Video · Tutorial · Tip', 'Media drop / upload area', 'Caption field', 'Skin tags (auto-filled from profile, editable)', 'Add products used (shoppable, optional)', 'Tutorial steps (when Tutorial)', 'Visibility (Public / Followers)', 'Post button']}
      states={['default']}
      flows={['Post → appears in Community + My Posts', 'Add products → Search / product picker', 'Skin tags → edit condition / palette', 'Cancel → Community']}>
      <Phone>
        <AppBar title="Create" back action="✕" />
        <Body pad={16} gap={14} scroll>
          {/* format picker */}
          <div style={{ display: 'flex', gap: 8 }}>
            <CoFormat glyph="▦" label="Photo" on />
            <CoFormat glyph="▶" label="Video" />
            <CoFormat glyph="☷" label="Tutorial" />
            <CoFormat glyph="✎" label="Tip" />
          </div>
          {/* media upload */}
          <div style={{ border: '1.5px dashed ' + WK.accent, borderRadius: 10, background: WK.accentBg, padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
            <span style={{ width: 46, height: 46, borderRadius: '50%', border: '1.5px dashed ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: WK.accentInk }}>+</span>
            <H size={13} color={WK.ink}>Add photos or video</H>
            <Txt size={10.5} color={WK.accentInk}>Upload from camera roll or record now</Txt>
          </div>
          {/* caption */}
          <div>
            <SecLabel>Caption</SecLabel>
            <div style={{ marginTop: 8, border: '1px dashed ' + WK.line, borderRadius: 8, padding: 11, minHeight: 56, background: WK.paper }}>
              <Txt size={11} color={WK.faint}>Share what worked for your skin…</Txt>
            </div>
          </div>
          {/* skin tags */}
          <div>
            <SecLabel more="Edit">Who it's for · your skin</SecLabel>
            <Txt size={10} style={{ marginTop: 4 }}>Auto-tagged from your profile so the right people see it</Txt>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 9 }}>
              <Chip on>Combination ✕</Chip><Chip on>Acne-prone ✕</Chip><Chip on>MST-5 ✕</Chip><Chip on>Warm autumn ✕</Chip>
              <Chip>+ Add</Chip>
            </div>
          </div>
          {/* products used */}
          <div>
            <SecLabel more="+ Add">Products used</SecLabel>
            <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', gap: 11, border: '1px dashed ' + WK.line, borderRadius: 8, padding: 9 }}>
              <Ph h={40} w={40} round={8} label="" />
              <div style={{ flex: 1 }}><H size={11}>Tag a product to make it shoppable</H><Txt size={9.5}>Earns from purchases via your post</Txt></div>
            </div>
          </div>
          {/* visibility */}
          <div>
            <SecLabel>Visibility</SecLabel>
            <div style={{ marginTop: 8 }}><CoSeg options={['Public', 'Followers']} active={0} /></div>
          </div>
        </Body>
        <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Btn kind="ghost">Draft</Btn>
          <Btn kind="primary" full style={{ flex: 1 }}>Post to community</Btn>
        </div>
      </Phone>
    </Frame>
  );
}
function CoFormat({ glyph, label, on }) {
  return (
    <div style={{ flex: 1, border: '1.5px solid ' + (on ? WK.accent : WK.line), borderStyle: on ? 'solid' : 'dashed', background: on ? WK.accentBg : WK.paper, borderRadius: 9, padding: '11px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 16, color: on ? WK.accentInk : WK.mid }}>{glyph}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: on ? WK.accentInk : WK.mid }}>{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L2-26f  Browse by Skin — explore the community by skin condition and
// palette/undertone. The user's own categories are highlighted.
// ════════════════════════════════════════════════════════════════════
function BrowseBySkin() {
  return (
    <Frame
      purpose="A directory of the community organized by skin condition and palette/undertone. Tapping any category opens a feed filtered to that skin profile. The user's own matches are highlighted in gold so they can jump straight to people like them — or explore beyond their profile."
      components={['Search field', 'Your profile recap (tappable shortcut)', 'By skin condition — tile grid w/ counts', 'By palette / undertone — swatch tiles', 'By skin goal — chips (anti-acne, brightening…)', "User's own categories highlighted (gold)"]}
      states={['default']}
      flows={['Category → filtered Community feed', 'Your profile → Skin Profile', 'Search → Search & Filter']}>
      <Phone tab="community">
        <AppBar title="Browse" back />
        <Body pad={16} gap={16} scroll>
          {/* search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1px dashed ' + WK.line, borderRadius: 9, padding: '10px 12px' }}>
            <span style={{ fontSize: 14, color: WK.mid }}>⌕</span>
            <Txt size={11} color={WK.faint}>Search conditions, palettes, creators…</Txt>
          </div>
          {/* your profile recap */}
          <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 10, background: WK.goldBg, padding: 12, display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid ' + WK.gold, background: WK.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.goldInk }}>◐</span>
            <div style={{ flex: 1 }}><H size={12.5}>Your skin</H><Txt size={10} color={WK.goldInk}>Combination · acne-prone · MST-5 · warm autumn</Txt></div>
            <span style={{ fontSize: 11, fontWeight: 700, color: WK.goldInk }}>View ›</span>
          </div>
          {/* by condition */}
          <div>
            <SecLabel>By skin condition</SecLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 11 }}>
              <CoBrowseTile label="Combination" count="2.1k" mine />
              <CoBrowseTile label="Acne-prone" count="4.8k" mine />
              <CoBrowseTile label="Oily" count="3.6k" />
              <CoBrowseTile label="Dry" count="2.9k" />
              <CoBrowseTile label="Sensitive" count="1.5k" />
              <CoBrowseTile label="Mature" count="1.1k" />
            </div>
          </div>
          {/* by palette */}
          <div>
            <SecLabel>By palette / undertone</SecLabel>
            <div style={{ display: 'flex', gap: 9, overflow: 'hidden', marginTop: 11 }}>
              <CoSwatch label="Warm autumn" mine /><CoSwatch label="Cool summer" /><CoSwatch label="Soft spring" /><CoSwatch label="Deep winter" />
            </div>
          </div>
          {/* by goal */}
          <div style={{ paddingBottom: 80 }}>
            <SecLabel>By skin goal</SecLabel>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 11 }}>
              <Chip>Clear acne</Chip><Chip>Brighten dark spots</Chip><Chip>Control oil</Chip><Chip>Hydrate</Chip><Chip>Anti-aging</Chip><Chip>Even tone</Chip>
            </div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function CoBrowseTile({ label, count, mine }) {
  return (
    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1.5px ' + (mine ? 'solid ' + WK.gold : 'dashed ' + WK.line) }}>
      <Ph h={74} round={0} label="" accent={mine} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(43,41,38,.66), transparent 60%)' }} />
      {mine && <span style={{ position: 'absolute', top: 7, right: 7, fontSize: 8, fontWeight: 700, color: WK.goldInk, background: WK.goldBg, borderRadius: 8, padding: '2px 6px' }}>Yours</span>}
      <div style={{ position: 'absolute', bottom: 7, left: 9 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{label}</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,.85)' }}>{count} posts</div>
      </div>
    </div>
  );
}
function CoSwatch({ label, mine }) {
  return (
    <div style={{ width: 96, flexShrink: 0, textAlign: 'center' }}>
      <div style={{ width: 96, height: 60, borderRadius: 10, border: '1.5px ' + (mine ? 'solid ' + WK.gold : 'dashed ' + WK.line), background: WK.panel, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 9.5, color: WK.mid }}>swatches</span>
        {mine && <span style={{ position: 'absolute', top: 5, right: 5, fontSize: 9, color: WK.goldInk }}>◐</span>}
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: WK.ink, marginTop: 6 }}>{label}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// L2-26g  Creators / Following — who-to-follow ranked by skin match,
// plus the people the user already follows.
// ════════════════════════════════════════════════════════════════════
function Creators() {
  return (
    <Frame
      purpose="The community's people surface. 'Suggested' ranks creators by how closely their skin profile + specialty match the viewer's, so following them fills the feed with relevant tutorials, tips & looks. 'Following' lists who the user already follows. Each creator shows their skin tags and why they're a match."
      components={['Suggested / Following segmented toggle', 'Search creators', 'Top match spotlight card', 'Creator rows: avatar · specialty · skin-match tags · Follow', 'Verified / derm badge (★)', 'Follower + post counts']}
      states={['default']}
      flows={['Creator → Public Profile', 'Follow → adds to feed + Following', 'Search → creator search']}>
      <Phone tab="community">
        <AppBar title="Creators" back action="⌕" />
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '12px 16px 4px' }}>
            <CoSeg options={['Suggested', 'Following']} active={0} />
          </div>
          {/* spotlight top match */}
          <div style={{ padding: '12px 16px 2px' }}>
            <div style={{ border: '1.5px solid ' + WK.gold, borderRadius: 12, background: WK.goldBg, padding: 14, display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, fontWeight: 700, letterSpacing: 0.6, color: WK.goldInk }}>◐ TOP MATCH FOR YOUR SKIN</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid ' + WK.gold, background: WK.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: WK.mid }}>◐</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><H size={14}>@derm.ph</H><span style={{ fontSize: 11, color: WK.goldInk }}>★</span></div>
                  <Txt size={10}>Dermatologist · acne & combination skin</Txt>
                  <div style={{ display: 'flex', gap: 5, marginTop: 6 }}><CoMatch gold>Acne-prone</CoMatch><CoMatch gold>Combination</CoMatch></div>
                </div>
              </div>
              <Btn kind="primary" full sm>+ Follow</Btn>
            </div>
          </div>
          {/* suggested list */}
          <div style={{ padding: '16px 16px 90px' }}>
            <SecLabel>More creators for your skin</SecLabel>
            <div style={{ marginTop: 6 }}>
              <CoCreatorRow name="@maris.glow" verified spec="Makeup · warm undertones" tags={['Warm autumn']} stat="48k · 210 posts" />
              <CoCreatorRow name="@shade.guru" spec="Shade matching · medium-deep" tags={['MST-5', 'Warm autumn']} stat="32k · 156 posts" />
              <CoCreatorRow name="@bea.makeup" spec="GRWM · combination skin" tags={['Combination']} stat="91k · 540 posts" />
              <CoCreatorRow name="@skin.science" verified spec="Skincare routines · acne" tags={['Acne-prone', 'Skincare']} stat="120k · 380 posts" />
              <CoCreatorRow name="@jasph.skin" spec="Honest reviews · oily skin" tags={['Combination']} stat="18k · 96 posts" last />
            </div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function CoCreatorRow({ name, spec, tags = [], stat, verified, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <span style={{ width: 42, height: 42, borderRadius: '50%', border: '1px dashed ' + WK.line, background: WK.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: WK.mid, flexShrink: 0 }}>◐</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><H size={12.5}>{name}</H>{verified && <span style={{ fontSize: 10, color: WK.goldInk }}>★</span>}</div>
        <Txt size={9.5} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spec}</Txt>
        <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>{tags.map((t, i) => <CoMatch key={i} gold>{t}</CoMatch>)}</div>
      </div>
      <Btn kind="secondary" sm>+ Follow</Btn>
    </div>
  );
}

Object.assign(window, { Community, TutorialDetail, SavedLibrary, CreatePost, BrowseBySkin, Creators });
