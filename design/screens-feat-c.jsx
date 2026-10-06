// screens-feat-c.jsx — Layer 10 · Edge cases, trust & policy
// Resolves the open product questions: profile conflict, condition categories,
// daily/weekly cadence, free/paid tiers, age-appropriateness, data privacy,
// customer support, bug reports, feature requests, system accuracy, trust & safety.

// ── local helpers (Pc prefix to avoid scope collisions) ──────────────
function PcToggle({ on }) {
  return (
    <div style={{ width: 38, height: 22, borderRadius: 11, background: on ? WK.accent : WK.panel2, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
    </div>
  );
}
function PcRadio({ on }) {
  return (
    <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid ' + (on ? WK.accent : WK.faint), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {on && <span style={{ width: 9, height: 9, borderRadius: '50%', background: WK.accent }} />}
    </span>
  );
}
function PcCheck({ on, x }) {
  return (
    <span style={{ width: 18, height: 18, borderRadius: 5, border: '1.5px solid ' + (on ? WK.accent : WK.line), background: on ? WK.accent : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
      {on ? '✓' : (x ? <span style={{ color: WK.faint }}>—</span> : '')}
    </span>
  );
}
function PcField({ label, value, ph, glyph }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: WK.faint, marginBottom: 6 }}>{label}</div>
      <div style={{ minHeight: 42, border: '1.5px ' + (value ? 'solid ' + WK.line : 'dashed ' + WK.line), borderRadius: 8, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: value ? WK.ink : WK.faint }}>
        {glyph && <span style={{ color: WK.mid }}>{glyph}</span>}{value || ph}
      </div>
    </div>
  );
}
function PcSection({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: WK.faint, textTransform: 'uppercase', marginTop: 4 }}>{children}</div>;
}

// ════════════════════════════════════════════════════════════════════
// P-56 Profile Conflict — User vs System (AI) reconciliation
// ════════════════════════════════════════════════════════════════════
function ProfileConflict() {
  return (
    <Frame
      purpose="Resolves the disagreement between what the user self-declared at onboarding and what an Aura scan detected. Surfaces both values side-by-side with confidence, lets the user keep, accept, or blend — never silently overwriting their profile."
      components={['Conflict summary header', 'Per-attribute compare card (You said · Aura detected + confidence)', 'Three-way choice: Keep mine / Use Aura / Decide later', 'Why-different explainer', 'Apply to profile CTA']}
      states={['error']}
      flows={['Apply → Skin Profile updated', 'Rescan → Skin Condition Capture', 'Decide later → keeps self-declared']}>
      <Phone>
        <AppBar title="Review scan results" back />
        <Body pad={16} gap={14} scroll>
          <Card accent style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, color: WK.accentInk }}>⚠</span>
            <div><H size={13} color={WK.ink}>2 things don't match your profile</H><Txt size={10.5} color={WK.accentInk}>Your scan from today differs from what you told us. Choose what to keep.</Txt></div>
          </Card>

          <PcConflict
            attr="Skin type"
            mine="Dry"
            sys="Combination"
            conf={86}
            note="Detected oilier T-zone than a fully dry profile." />
          <PcConflict
            attr="Undertone"
            mine="Warm"
            sys="Neutral"
            conf={71}
            note="Borderline reading — lighting can shift this." />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: WK.panel }}>
            <span style={{ fontSize: 13, color: WK.mid }}>↻</span>
            <Txt size={10.5}>Unsure? <span style={{ color: WK.accentInk, fontWeight: 700 }}>Rescan in natural light</span> for a better read.</Txt>
          </div>
          <Btn kind="primary" full>Apply choices to my profile</Btn>
          <Btn kind="link" style={{ alignSelf: 'center' }}>Keep my profile, ignore scan</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcConflict({ attr, mine, sys, conf, note }) {
  return (
    <Card pad={13} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <H size={13}>{attr}</H>
      <div style={{ display: 'flex', gap: 9 }}>
        <div style={{ flex: 1, border: '1.5px solid ' + WK.line, borderRadius: 8, padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: WK.faint }}>YOU SAID</span><PcRadio /></div>
          <H size={15} color={WK.ink}>{mine}</H>
        </div>
        <div style={{ flex: 1, border: '2px solid ' + WK.accent, borderRadius: 8, padding: '10px 11px', background: WK.accentBg, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: WK.goldInk }}>AURA DETECTED</span><PcRadio on /></div>
          <H size={15} color={WK.ink}>{sys}</H>
          <Confidence value={conf} />
        </div>
      </div>
      <Txt size={10}>{note}</Txt>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-57 Update Skin Condition Categories — manage tracked concerns
// ════════════════════════════════════════════════════════════════════
function SkinConditions() {
  return (
    <Frame
      purpose="Lets the user curate which skin conditions Aura tracks and tailors recommendations around. Conditions can be self-added or scan-detected; each carries a severity the user can adjust, and the whole set re-tunes Discover, routines & ingredient flags."
      components={['Active conditions list (source tag · severity slider · remove)', 'Detected-but-not-added suggestions', 'Add custom condition', 'Severity scale (mild → severe)', 'Re-scan to refresh', 'Save changes']}
      states={['default']}
      flows={['Save → re-tunes recommendations', 'Add → condition picker', 'Re-scan → Skin Condition Capture']}>
      <Phone tab="profile">
        <AppBar title="My skin conditions" back action="↻" />
        <Body pad={16} gap={13} scroll>
          <Txt size={11}>These shape your recommendations, ingredient warnings & routine. Adjust anytime.</Txt>
          <PcSection>Tracking · 3</PcSection>
          <PcCondition name="Acne" sev="Moderate" pct={58} src="Scan" />
          <PcCondition name="Hyperpigmentation" sev="Mild" pct={30} src="Scan" />
          <PcCondition name="Dryness" sev="Mild" pct={28} src="You added" />
          <PcSection>Detected today · not tracked</PcSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <PcSuggest name="Redness / sensitivity" conf={74} />
            <PcSuggest name="Enlarged pores" conf={61} />
          </div>
          <Btn kind="ghost" full sm style={{ height: 42 }}>＋ Add a condition manually</Btn>
          <Banner icon="ℹ">Aura gives skincare guidance, not a medical diagnosis. See a dermatologist for persistent concerns.</Banner>
        </Body>
        <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, padding: '12px 16px', background: WK.paper }}>
          <Btn kind="primary" full>Save changes</Btn>
        </div>
      </Phone>
    </Frame>
  );
}
function PcCondition({ name, sev, pct, src }) {
  return (
    <Card pad={12} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <H size={13} style={{ flex: 1 }}>{name}</H>
        <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.4, color: WK.mid, background: WK.panel, borderRadius: 10, padding: '3px 8px' }}>{src}</span>
        <span style={{ fontSize: 16, color: WK.faint }}>×</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 10, color: WK.mid, width: 58 }}>{sev}</span>
        <div style={{ flex: 1, position: 'relative', height: 5, borderRadius: 3, background: WK.panel2 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct + '%', background: WK.accent, borderRadius: 3 }} />
          <div style={{ position: 'absolute', left: pct + '%', top: '50%', transform: 'translate(-50%,-50%)', width: 15, height: 15, borderRadius: '50%', background: WK.paper, border: '2px solid ' + WK.accent }} />
        </div>
      </div>
    </Card>
  );
}
function PcSuggest({ name, conf }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1.5px dashed ' + WK.gold, borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ flex: 1 }}><H size={12.5}>{name}</H><Confidence value={conf} /></div>
      <Btn kind="secondary" sm>＋ Track</Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-58 Daily vs Weekly Routine — cadence clarity
// ════════════════════════════════════════════════════════════════════
function RoutineCadence() {
  return (
    <Frame
      purpose="Splits a routine into DAILY (AM / PM, every day) and WEEKLY (exfoliants, masks, treatments on set days) so users never over-use actives. A cadence toggle switches views; weekly steps show which days they fall on."
      components={['Daily / Weekly segmented toggle', 'AM & PM day groups w/ step order', 'Weekly cadence chips (day-of-week)', 'Per-step frequency badge', 'Conflict warning (don\'t mix actives)', 'Add step']}
      states={['default']}
      flows={['Toggle → Daily/Weekly view', 'Step → Product Detail', 'Add → Create Routine']}>
      <Phone tab="profile">
        <AppBar title="My routine" back action="✎" />
        <Body pad={16} gap={14} scroll>
          <div style={{ display: 'flex', background: WK.panel, borderRadius: 10, padding: 4 }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 7, background: WK.paper, boxShadow: '0 1px 3px rgba(0,0,0,.08)', fontSize: 12, fontWeight: 700, color: WK.ink }}>Daily</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '9px 0', fontSize: 12, fontWeight: 600, color: WK.mid }}>Weekly</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: WK.gold }}>☀</span><H size={14} style={{ flex: 1 }}>Morning</H><span style={{ fontSize: 9.5, color: WK.mid }}>4 steps · every day</span>
          </div>
          <Card pad={0}>
            <PcStep n="1" name="Gentle Cleanser" tag="Daily" />
            <PcStep n="2" name="Vitamin C Serum" tag="AM only" />
            <PcStep n="3" name="Niacinamide 10%" tag="Daily" />
            <PcStep n="4" name="SPF 50 Sunscreen" tag="Daily · AM" last />
          </Card>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: WK.mid }}>☾</span><H size={14} style={{ flex: 1 }}>Evening</H><span style={{ fontSize: 9.5, color: WK.mid }}>3 steps · every day</span>
          </div>
          <Card pad={0}>
            <PcStep n="1" name="Oil Cleanser" tag="PM only" />
            <PcStep n="2" name="Moisturizer" tag="Daily" />
            <PcStep n="3" name="Retinol 0.3%" tag="PM · see weekly" warn last />
          </Card>

          <Banner icon="⚠">Retinol & exfoliant are scheduled on different nights so they never overlap — check the Weekly tab.</Banner>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcStep({ n, name, tag, warn, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: WK.panel, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: WK.mid, flexShrink: 0 }}>{n}</span>
      <Ph h={34} w={34} round={7} label="" />
      <H size={12.5} style={{ flex: 1 }}>{name}</H>
      <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.3, color: warn ? WK.accentInk : WK.mid, background: warn ? WK.accentBg : WK.panel, border: '1px solid ' + (warn ? WK.accent : WK.line), borderRadius: 10, padding: '3px 8px', flexShrink: 0 }}>{tag}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-58b Weekly cadence view (paired with above)
// ════════════════════════════════════════════════════════════════════
function RoutineWeekly() {
  return (
    <Frame
      purpose="The Weekly half of the routine: treatments that run on a cadence rather than daily. A week strip shows which nights each active falls on, spacing actives apart automatically to avoid irritation."
      components={['Daily / Weekly toggle (Weekly active)', 'Week-day strip with scheduled dots', 'Weekly treatment cards (frequency · days)', 'Auto-spacing note', 'Reschedule a treatment']}
      states={['default']}
      flows={['Day dot → that night\'s steps', 'Reschedule → cadence picker', 'Toggle → Daily view']}>
      <Phone tab="profile">
        <AppBar title="My routine" back action="✎" />
        <Body pad={16} gap={14} scroll>
          <div style={{ display: 'flex', background: WK.panel, borderRadius: 10, padding: 4 }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '9px 0', fontSize: 12, fontWeight: 600, color: WK.mid }}>Daily</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 7, background: WK.paper, boxShadow: '0 1px 3px rgba(0,0,0,.08)', fontSize: 12, fontWeight: 700, color: WK.ink }}>Weekly</div>
          </div>
          <Card pad={13}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[['M', 1], ['T', 0], ['W', 2], ['T', 0], ['F', 1], ['S', 0], ['S', 3]].map(([d, kind], i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: WK.mid }}>{d}</span>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: kind === 1 ? WK.accent : kind === 2 ? WK.gold : kind === 3 ? WK.ink : WK.panel2, border: kind === 0 ? '1px solid ' + WK.line : 'none' }} />
                </div>
              ))}
            </div>
          </Card>
          <PcWeekly name="Exfoliant · AHA 7%" freq="2× / week" days="Mon · Fri" dot={WK.accent} />
          <PcWeekly name="Clay Mask" freq="1× / week" days="Wed" dot={WK.gold} />
          <PcWeekly name="Hydrating Sheet Mask" freq="1× / week" days="Sun" dot={WK.ink} />
          <Banner icon="✓">Aura spaces exfoliant and retinol nights apart so your skin barrier stays happy.</Banner>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcWeekly({ name, freq, days, dot }) {
  return (
    <Card pad={13} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      <Ph h={40} w={40} round={8} label="" />
      <div style={{ flex: 1 }}><H size={13}>{name}</H><Txt size={10}>{days}</Txt></div>
      <span style={{ fontSize: 9.5, fontWeight: 700, color: WK.accentInk, background: WK.accentBg, border: '1px solid ' + WK.accent, borderRadius: 10, padding: '4px 9px' }}>{freq}</span>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-59 Free vs Paid tier — Aura+ comparison
// ════════════════════════════════════════════════════════════════════
function TierCompare() {
  const rows = [
    ['Daily routine & reminders', true, true],
    ['Product scan & FDA check', true, true],
    ['Skin tone & color analysis', '1 / month', 'Unlimited'],
    ['AI skin condition tracking', 'Basic', 'Full history'],
    ['AR try-on & shade translator', false, true],
    ['Dupe finder & price alerts', false, true],
    ['Personalized routine builder', false, true],
    ['Ad-free experience', false, true],
  ];
  return (
    <Frame
      purpose="Makes the value boundary between Free and Aura+ explicit before any paywall. A scannable feature matrix shows exactly what each tier unlocks, with monthly/yearly pricing and a no-pressure 'stay free' path."
      components={['Plan headers (Free · Aura+)', 'Feature matrix (✓ / — / limit text)', 'Billing toggle monthly/yearly', 'Price + savings badge', 'Upgrade CTA', 'Stay-on-free link', 'Restore purchase']}
      states={['default']}
      flows={['Upgrade → Payment', 'Stay free → Settings', 'Restore → account check']}>
      <Phone tab="profile">
        <AppBar title="Plans" back />
        <Body pad={16} gap={14} scroll>
          <div style={{ textAlign: 'center' }}><H size={20}>Choose your plan</H><Txt size={11} style={{ marginTop: 3 }}>Everything you need to start is free, forever.</Txt></div>
          <div style={{ display: 'flex', alignSelf: 'center', background: WK.panel, borderRadius: 9, padding: 3 }}>
            <span style={{ padding: '7px 16px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: WK.mid }}>Monthly</span>
            <span style={{ padding: '7px 16px', borderRadius: 6, background: WK.paper, boxShadow: '0 1px 3px rgba(0,0,0,.08)', fontSize: 11, fontWeight: 700, color: WK.ink }}>Yearly · save 30%</span>
          </div>

          <div style={{ border: '1.5px solid ' + WK.line, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid ' + WK.line, background: WK.panel }}>
              <div style={{ flex: 1, padding: '11px 13px' }}><span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>Feature</span></div>
              <div style={{ width: 64, padding: '11px 6px', textAlign: 'center', borderLeft: '1px solid ' + WK.line }}><span style={{ fontSize: 11, fontWeight: 700, color: WK.mid }}>Free</span></div>
              <div style={{ width: 72, padding: '11px 6px', textAlign: 'center', borderLeft: '1px solid ' + WK.line, background: WK.goldBg }}><span style={{ fontSize: 11, fontWeight: 700, color: WK.goldInk }}>Aura+</span></div>
            </div>
            {rows.map((r, i) => (
              <div key={i} style={{ display: 'flex', borderBottom: i === rows.length - 1 ? 'none' : '1px dashed ' + WK.line }}>
                <div style={{ flex: 1, padding: '11px 13px', display: 'flex', alignItems: 'center' }}><span style={{ fontSize: 11.5, color: WK.ink }}>{r[0]}</span></div>
                <div style={{ width: 64, padding: '11px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid ' + WK.line }}><PcCell v={r[1]} /></div>
                <div style={{ width: 72, padding: '11px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid ' + WK.line, background: 'oklch(0.97 0.03 80)' }}><PcCell v={r[2]} gold /></div>
              </div>
            ))}
          </div>

          <div style={{ border: '2px solid ' + WK.gold, borderRadius: 12, padding: 14, background: WK.goldBg, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}><span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, color: WK.goldInk }}>AURA+ YEARLY</span><div style={{ fontFamily: WK.serif, fontSize: 22, fontWeight: 600, color: WK.ink, lineHeight: 1.1 }}>₱149<span style={{ fontSize: 12, color: WK.mid }}>/mo</span></div><Txt size={9.5} color={WK.goldInk}>billed ₱1,788/yr · 7-day free trial</Txt></div>
          </div>
          <Btn kind="primary" full>Start free trial</Btn>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}><Btn kind="link">Stay on Free</Btn><Btn kind="link">Restore purchase</Btn></div>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcCell({ v, gold }) {
  if (v === true) return <span style={{ fontSize: 14, fontWeight: 700, color: gold ? WK.goldInk : WK.accentInk }}>✓</span>;
  if (v === false) return <span style={{ fontSize: 14, color: WK.faint }}>—</span>;
  return <span style={{ fontSize: 9.5, fontWeight: 700, color: gold ? WK.goldInk : WK.mid, textAlign: 'center', lineHeight: 1.2 }}>{v}</span>;
}

// ════════════════════════════════════════════════════════════════════
// P-60 Age Appropriate — age gate & teen-safe mode
// ════════════════════════════════════════════════════════════════════
function AgeAppropriate() {
  return (
    <Frame
      purpose="Keeps the experience age-appropriate. Confirms date of birth, then tailors the app: under-18 gets a gentler routine, hides strong actives & adult-targeted products, and routes purchases through guardian consent. Adult-only content is gated."
      components={['Date-of-birth confirm', 'Detected age band + Teen Mode card', 'Restricted-actives explainer (retinoids, high-% acids)', 'Guardian consent for purchases', 'Content sensitivity toggle', 'Why we ask (privacy link)']}
      states={['default']}
      flows={['Confirm → tailors recommendations', 'Guardian consent → email verify', 'Learn more → Data & Privacy']}>
      <Phone>
        <AppBar title="Age & safety" back />
        <Body pad={16} gap={14} scroll>
          <PcField label="DATE OF BIRTH" value="14 March 2009" glyph="◷" />
          <div style={{ border: '2px solid ' + WK.accent, borderRadius: 12, padding: 14, background: WK.accentBg, display: 'flex', flexDirection: 'column', gap: 9 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: WK.paper, border: '1px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>◑</span>
              <div style={{ flex: 1 }}><H size={14} color={WK.ink}>Teen Mode is on</H><Txt size={10.5} color={WK.accentInk}>You're 16 — Aura keeps things gentle & safe.</Txt></div>
            </div>
          </div>
          <PcSection>What changes in Teen Mode</PcSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PcAgeRow t="Strong actives hidden" s="No prescription retinoids or high-% acids in your feed." />
            <PcAgeRow t="Gentler routine templates" s="Cleanse · moisturize · SPF — barrier-first." />
            <PcAgeRow t="Adult-targeted content filtered" s="Anti-aging & some makeup looks are hidden." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, border: '1.5px solid ' + WK.gold, borderRadius: 10, padding: '12px 13px', background: WK.goldBg }}>
            <span style={{ fontSize: 17, color: WK.goldInk }}>♟</span>
            <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>Guardian consent for purchases</H><Txt size={10} color={WK.goldInk}>Orders need a parent/guardian's approval by email.</Txt></div>
            <PcToggle on />
          </div>
          <Btn kind="link" style={{ alignSelf: 'center' }}>Why we ask for your age →</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcAgeRow({ t, s }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ color: WK.accentInk, fontSize: 13, marginTop: 1 }}>✓</span>
      <div><H size={12} color={WK.ink}>{t}</H><Txt size={10}>{s}</Txt></div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-61 Security & Data Privacy — controls & consent
// ════════════════════════════════════════════════════════════════════
function DataPrivacy() {
  return (
    <Frame
      purpose="Central control for the sensitive data Aura handles — face scans, skin photos, biometrics. Plain-language consent toggles, encryption & retention notes, plus the two hard rights: download everything, delete everything."
      components={['Security status card (encrypted · biometric lock)', 'Consent toggles (face data · personalization · research)', 'Photo retention selector', 'Data-sharing with brands toggle', 'Download my data', 'Delete account & data (destructive)']}
      states={['default']}
      flows={['Delete → confirm + 30-day grace', 'Download → email export', 'Toggle → updates consent log']}>
      <Phone tab="profile">
        <AppBar title="Privacy & data" back />
        <Body pad={16} gap={13} scroll>
          <div style={{ border: '1.5px solid ' + WK.accent, borderRadius: 12, padding: 13, background: WK.accentBg, display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ fontSize: 20, color: WK.accentInk }}>⛨</span>
            <div><H size={13} color={WK.ink}>Your data is encrypted</H><Txt size={10} color={WK.accentInk}>Scans are processed on-device where possible · end-to-end encrypted in transit.</Txt></div>
          </div>
          <PcSection>Consent</PcSection>
          <Card pad={0}>
            <PcPrivRow t="Store my face & skin scans" s="Needed for progress tracking" on />
            <PcPrivRow t="Personalize my recommendations" s="Uses skin profile & history" on />
            <PcPrivRow t="Share anonymized data for research" s="Improves Aura's AI · opt-in" />
            <PcPrivRow t="Let brands see anonymized insights" s="Never your identity" last />
          </Card>
          <PcSection>Photo retention</PcSection>
          <div style={{ display: 'flex', gap: 8 }}><Chip>30 days</Chip><Chip on>1 year</Chip><Chip>Until I delete</Chip></div>
          <PcSection>Your data rights</PcSection>
          <Btn kind="secondary" full>⤓ Download all my data</Btn>
          <div style={{ border: '1.5px dashed #c98a80', borderRadius: 8, padding: '12px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15, color: '#bd7163' }}>⌫</span>
            <div style={{ flex: 1 }}><H size={12.5} color="#9c5246">Delete account & all data</H><Txt size={10} style={{ color: '#9c5246' }}>Permanent after a 30-day grace period.</Txt></div>
          </div>
          <Btn kind="link" style={{ alignSelf: 'center' }}>Privacy Policy · Terms</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcPrivRow({ t, s, on, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <div style={{ flex: 1 }}><H size={12} color={WK.ink}>{t}</H><Txt size={10}>{s}</Txt></div>
      <PcToggle on={on} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-62 Customer Support — help hub
// ════════════════════════════════════════════════════════════════════
function SupportHub() {
  return (
    <Frame
      purpose="The front door for help. Search-first FAQ, fast contact channels (live chat with status, email), open-ticket tracking, and quick links into the dedicated bug-report & feature-request flows."
      components={['Search help', 'Contact channels (live chat · email · call)', 'My tickets (status pills)', 'Browse-by-topic categories', 'Links → Report a bug / Request a feature', 'Status: agents online']}
      states={['default']}
      flows={['Live chat → conversation', 'Ticket → ticket detail', 'Bug → Report a bug', 'Topic → article list']}>
      <Phone tab="profile">
        <AppBar title="Help & support" back />
        <Body pad={16} gap={14} scroll>
          <div style={{ height: 44, borderRadius: 22, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 9, padding: '0 16px' }}>
            <span style={{ color: WK.faint }}>⌕</span><span style={{ fontSize: 12.5, color: WK.faint }}>Search help articles…</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <PcChannel glyph="✎" label="Live chat" note="Online" on />
            <PcChannel glyph="✉" label="Email us" note="< 24h" />
            <PcChannel glyph="✆" label="Call" note="9–6 PHT" />
          </div>
          <SecLabel more="View all">My tickets</SecLabel>
          <Card pad={0}>
            <PcTicket id="#4821" t="Refund for cancelled order" status="In progress" kind="prog" />
            <PcTicket id="#4790" t="Scan keeps failing on selfie" status="Resolved" kind="ok" last />
          </Card>
          <SecLabel>Browse by topic</SecLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <PcTopic glyph="◉" t="Scanning & AI" />
            <PcTopic glyph="⛌" t="Orders & shipping" />
            <PcTopic glyph="◐" t="Account & profile" />
            <PcTopic glyph="✦" t="Aura+ & billing" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn kind="ghost" sm full style={{ height: 40 }}>⚲ Report a bug</Btn>
            <Btn kind="ghost" sm full style={{ height: 40 }}>✲ Request a feature</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcChannel({ glyph, label, note, on }) {
  return (
    <div style={{ flex: 1, border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), borderRadius: 12, padding: '13px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: on ? WK.accentBg : WK.paper }}>
      <span style={{ fontSize: 19, color: on ? WK.accentInk : WK.ink }}>{glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: WK.ink }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: on ? WK.accentInk : WK.mid }}>{on && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'oklch(0.6 0.13 150)' }} />}{note}</span>
    </div>
  );
}
function PcTicket({ id, t, status, kind, last }) {
  const c = kind === 'ok' ? { bg: WK.accentBg, fg: WK.accentInk, bd: WK.accent } : { bg: WK.goldBg, fg: WK.goldInk, bd: WK.gold };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: WK.faint }}>{id}</span>
      <H size={12} style={{ flex: 1 }}>{t}</H>
      <span style={{ fontSize: 8.5, fontWeight: 700, color: c.fg, background: c.bg, border: '1px solid ' + c.bd, borderRadius: 10, padding: '3px 8px' }}>{status}</span>
    </div>
  );
}
function PcTopic({ glyph, t }) {
  return (
    <div style={{ border: '1px dashed ' + WK.line, borderRadius: 10, padding: '14px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 17, color: WK.mid }}>{glyph}</span><H size={12}>{t}</H>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-63 Bug Reports — structured report form
// ════════════════════════════════════════════════════════════════════
function BugReport() {
  return (
    <Frame
      purpose="A structured bug report that gives engineering enough to reproduce: what happened, where, severity, a screenshot/recording, and auto-attached device & app context — no manual typing of versions."
      components={['Where it happened (screen picker)', 'What went wrong (text)', 'Severity selector', 'Reproduce steps', 'Attach screenshot/recording', 'Auto-attached diagnostics (read-only)', 'Submit']}
      states={['default']}
      flows={['Submit → ticket created → Support', 'Attach → camera roll / screen rec']}>
      <Phone>
        <AppBar title="Report a bug" back />
        <Body pad={16} gap={14} scroll>
          <PcField label="WHERE DID IT HAPPEN?" value="Scan · Skin condition result" glyph="◉" />
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: WK.faint, marginBottom: 6 }}>WHAT WENT WRONG?</div>
            <div style={{ minHeight: 76, border: '1.5px dashed ' + WK.line, borderRadius: 8, padding: 11, fontSize: 11.5, color: WK.ink, lineHeight: 1.45 }}>The result screen freezes after the progress bar hits 100%. Have to force-close the app.</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: WK.faint, marginBottom: 7 }}>SEVERITY</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip>Minor</Chip><Chip>Annoying</Chip><Chip on>Blocks me</Chip><Chip>Crash</Chip>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: WK.faint, marginBottom: 7 }}>ATTACH</div>
            <div style={{ display: 'flex', gap: 9 }}>
              <Ph h={62} w={62} round={8} glyph="＋" label="Shot" />
              <Ph h={62} w={62} round={8} glyph="▷" label="Record" />
            </div>
          </div>
          <Card pad={12} style={{ background: WK.panel }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, color: WK.faint }}>AUTO-ATTACHED</span>
              <span style={{ fontSize: 9.5, color: WK.mid }}>read-only</span>
            </div>
            <PcDiag k="App version" v="Aura 3.2.1 (build 412)" />
            <PcDiag k="Device" v="iPhone 13 · iOS 18.2" />
            <PcDiag k="Logs" v="Last 200 lines attached" last />
          </Card>
          <Btn kind="primary" full>Submit report</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcDiag({ k, v, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <span style={{ fontSize: 10.5, color: WK.mid }}>{k}</span><span style={{ fontSize: 10.5, fontWeight: 600, color: WK.ink }}>{v}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-64 Feature Requests — ideas board with voting
// ════════════════════════════════════════════════════════════════════
function FeatureRequest() {
  return (
    <Frame
      purpose="A public ideas board so users shape the roadmap. Submit an idea, upvote others, and follow status as the team moves it from Under review → Planned → Shipped. Reduces duplicate requests and shows users they're heard."
      components={['Submit an idea CTA', 'Filter: Trending / New / Planned / Shipped', 'Idea card (upvote count · status pill · comments)', 'Status legend', 'Your submitted ideas']}
      states={['default']}
      flows={['Submit → idea composer', 'Upvote → +1 & follow', 'Idea → discussion thread']}>
      <Phone>
        <AppBar title="Feature requests" back action="＋" />
        <Body pad={16} gap={13} scroll>
          <Btn kind="primary" full>✲ Suggest a feature</Btn>
          <div style={{ display: 'flex', gap: 7, overflow: 'hidden' }}>
            <Chip on>Trending</Chip><Chip>New</Chip><Chip>Planned</Chip><Chip>Shipped</Chip>
          </div>
          <PcIdea votes="1.2k" voted t="Save multiple skin profiles (e.g. for family)" status="Planned" kind="plan" cmt="84" />
          <PcIdea votes="947" t="Barcode scan straight to FDA check" status="Under review" kind="rev" cmt="51" />
          <PcIdea votes="612" t="Dark mode" status="Under review" kind="rev" cmt="33" />
          <PcIdea votes="488" t="Export routine as a shareable card" status="Shipped" kind="ship" cmt="20" />
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 2 }}>
            <PcLegend c={WK.gold} t="Under review" /><PcLegend c={WK.accent} t="Planned" /><PcLegend c="oklch(0.6 0.13 150)" t="Shipped" />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcIdea({ votes, voted, t, status, kind, cmt }) {
  const c = kind === 'ship' ? { bg: 'oklch(0.93 0.05 150)', fg: 'oklch(0.4 0.1 150)', bd: 'oklch(0.6 0.13 150)' } : kind === 'plan' ? { bg: WK.accentBg, fg: WK.accentInk, bd: WK.accent } : { bg: WK.goldBg, fg: WK.goldInk, bd: WK.gold };
  return (
    <Card pad={12} style={{ display: 'flex', gap: 12 }}>
      <div style={{ width: 46, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: '1.5px solid ' + (voted ? WK.accent : WK.line), borderRadius: 8, padding: '8px 0', background: voted ? WK.accentBg : WK.paper, flexShrink: 0 }}>
        <span style={{ fontSize: 14, color: voted ? WK.accentInk : WK.mid }}>▲</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: voted ? WK.accentInk : WK.ink }}>{votes}</span>
      </div>
      <div style={{ flex: 1 }}>
        <H size={12.5} style={{ lineHeight: 1.3 }}>{t}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 8 }}>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: c.fg, background: c.bg, border: '1px solid ' + c.bd, borderRadius: 10, padding: '3px 8px' }}>{status}</span>
          <span style={{ fontSize: 10, color: WK.mid }}>✑ {cmt}</span>
        </div>
      </div>
    </Card>
  );
}
function PcLegend({ c, t }) {
  return <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: WK.mid }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />{t}</span>;
}

// ════════════════════════════════════════════════════════════════════
// P-65 System Accuracy — AI transparency & feedback
// ════════════════════════════════════════════════════════════════════
function SystemAccuracy() {
  return (
    <Frame
      purpose="Builds trust in the AI by being honest about it. Shows how confident a result is and why, lets users flag an inaccurate result (feeding model improvement), and states plainly that Aura is guidance — not a medical diagnosis."
      components={['Result recap + confidence breakdown', 'Factors affecting accuracy (lighting/angle)', '\u2018Was this accurate?\u2019 yes/no feedback', 'Report inaccurate result → correction', 'Improve-your-scan tips', 'Medical disclaimer']}
      states={['result']}
      flows={['Not accurate → correction form', 'Improve → rescan tips', 'Yes → logged as confirmed']}>
      <Phone>
        <AppBar title="How accurate is this?" back />
        <Body pad={16} gap={14} scroll>
          <AICard title="Skin type · Combination" confidence={86}>
            <Txt size={10.5}>Based on your scan from today, 9:32 AM.</Txt>
          </AICard>
          <PcSection>What affected this reading</PcSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <PcFactor t="Good lighting" s="Even, natural light" good />
            <PcFactor t="Slight angle" s="Face tilted ~15° — can shift results" />
            <PcFactor t="No makeup detected" s="Bare skin gives the best read" good />
          </div>
          <div style={{ border: '1.5px solid ' + WK.line, borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 11, alignItems: 'center' }}>
            <H size={13}>Was this accurate?</H>
            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
              <Btn kind="secondary" full>👍 Yes, looks right</Btn>
              <Btn kind="secondary" full style={{ borderColor: WK.accent, color: WK.accentInk }}>👎 Not quite</Btn>
            </div>
            <Txt size={9.5} style={{ textAlign: 'center' }}>Your feedback trains Aura's model for everyone.</Txt>
          </div>
          <Banner icon="ℹ">Aura's analysis is for cosmetic guidance only and is not a medical diagnosis. For skin health concerns, consult a licensed dermatologist.</Banner>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcFactor({ t, s, good }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, background: good ? WK.accentBg : WK.goldBg, color: good ? WK.accentInk : WK.goldInk }}>{good ? '✓' : '!'}</span>
      <div><H size={12} color={WK.ink}>{t}</H><Txt size={10}>{s}</Txt></div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-66 Fake Accounts & Products — trust & safety / report
// ════════════════════════════════════════════════════════════════════
function TrustSafety() {
  return (
    <Frame
      purpose="The integrity layer. Aura verifies sellers against FDA registration and flags listings that fail checks; users can report a counterfeit product or a fake/impersonating account. Verified badges make legitimacy legible at a glance."
      components={['Verification status banner (this listing)', 'Report type: Counterfeit product / Fake account / Scam', 'Reason picker', 'Evidence upload', 'Auto-flag indicators (price · unverified seller)', 'How Aura verifies (FDA LTO)', 'Submit report']}
      states={['error']}
      flows={['Submit → trust & safety review', 'Verify seller → Brand Profile', 'Learn → verification policy']}>
      <Phone>
        <AppBar title="Report" back />
        <Body pad={16} gap={14} scroll>
          <div style={{ border: '1.5px dashed #c98a80', borderRadius: 12, padding: 13, background: '#f7e7e4', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 19, color: '#bd7163' }}>⚠</span>
            <div><H size={13} color="#9c5246">This seller isn't verified</H><Txt size={10.5} style={{ color: '#9c5246' }}>No matching FDA registration found. Price is 60% below typical — take care.</Txt></div>
          </div>
          <PcSection>What are you reporting?</PcSection>
          <Card pad={0}>
            <PcReportRow t="Counterfeit / fake product" s="Not authentic, no FDA proof" on />
            <PcReportRow t="Fake or impersonating account" s="Pretending to be a brand/person" />
            <PcReportRow t="Scam or fraud" s="Payment or listing scam" last />
          </Card>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: WK.faint, marginBottom: 6 }}>TELL US MORE</div>
            <div style={{ minHeight: 64, border: '1.5px dashed ' + WK.line, borderRadius: 8, padding: 11, fontSize: 11.5, color: WK.faint, lineHeight: 1.45 }}>Describe what made this look fake…</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: WK.faint, marginBottom: 7 }}>EVIDENCE (optional)</div>
            <div style={{ display: 'flex', gap: 9 }}><Ph h={60} w={60} round={8} glyph="＋" label="Photo" /><Ph h={60} w={60} round={8} glyph="⧉" label="Link" /></div>
          </div>
          <div style={{ display: 'flex', gap: 9, alignItems: 'center', padding: '10px 12px', borderRadius: 8, background: WK.panel }}>
            <span style={{ fontSize: 13, color: WK.accentInk }}>⛨</span>
            <Txt size={10}>Aura cross-checks every seller against the <span style={{ fontWeight: 700, color: WK.accentInk }}>FDA LTO registry</span>. <span style={{ color: WK.accentInk, fontWeight: 700 }}>How it works ›</span></Txt>
          </div>
          <Btn kind="primary" full>Submit report</Btn>
        </Body>
      </Phone>
    </Frame>
  );
}
function PcReportRow({ t, s, on, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <PcRadio on={on} />
      <div style={{ flex: 1 }}><H size={12.5} color={WK.ink}>{t}</H><Txt size={10}>{s}</Txt></div>
    </div>
  );
}

Object.assign(window, {
  ProfileConflict, SkinConditions, RoutineCadence, RoutineWeekly, TierCompare,
  AgeAppropriate, DataPrivacy, SupportHub, BugReport, FeatureRequest, SystemAccuracy, TrustSafety,
});
