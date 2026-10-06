// screens-l1l2.jsx — Frame 0 (component sheet), Layer 1 (Onboarding/Auth), Layer 2 (Core Nav)

// ── Component-sheet helpers (local) ──────────────────────────────────
function Spec({ title, note, w, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: w }}>
      <div style={{ fontSize: 10, letterSpacing: 1, fontWeight: 700, color: WK.mid }}>{title}</div>
      <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 14, background: WK.paper, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', minHeight: 60, justifyContent: 'center' }}>
        {children}
      </div>
      {note && <div style={{ fontSize: 9.5, color: WK.faint, lineHeight: 1.4 }}>{note}</div>}
    </div>
  );
}

function ComponentSheet() {
  return (
    <div className="wk" style={{ width: '100%', height: '100%', background: WK.panel, padding: 36, overflow: 'hidden', fontFamily: WK.mono }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: WK.ink, letterSpacing: -0.5 }}>Aura — Global Component Sheet</div>
        <div style={{ fontSize: 12, color: WK.mid }}>Frame 0 · design once, reuse everywhere</div>
      </div>
      <div style={{ fontSize: 11, color: WK.mid, marginBottom: 24, maxWidth: 720, lineHeight: 1.5 }}>
        Mid-fidelity grayscale system. Single rose accent flags primary actions + AI-result highlights only. All photos shown as labelled dashed placeholders.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, alignItems: 'start' }}>
        {/* Tab bar */}
        <div style={{ gridColumn: 'span 2' }}>
          <Spec title="BOTTOM TAB BAR — 5 tabs, raised center Scan">
            <div style={{ width: 360, height: 64, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0 }}><TabBar active="home" /></div>
            </div>
          </Spec>
        </div>
        {/* App bar */}
        <Spec title="TOP APP BAR">
          <div style={{ width: '100%' }}>
            <div style={{ position: 'relative' }}><AppBar title="Screen Title" back action="⚙" /></div>
          </div>
        </Spec>

        {/* Buttons */}
        <Spec title="BUTTONS + LINK" note="Primary = rose (one per screen). Secondary = outline. Ghost = dashed.">
          <Btn kind="primary">Primary action</Btn>
          <Btn kind="secondary">Secondary</Btn>
          <Btn kind="ghost" sm>Ghost / tertiary</Btn>
          <Btn kind="link">Text link →</Btn>
        </Spec>

        {/* Chips + badges */}
        <Spec title="CHIPS · FDA BADGE · CONFIDENCE">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Chip on>Selected</Chip><Chip>Oily</Chip><Chip>Acne</Chip>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <FDABadge /><Confidence value={92} />
          </div>
        </Spec>

        {/* Free tier banner */}
        <Spec title="FREE-TIER / NO-ADS BANNER">
          <Banner>Free forever · No ads, ever</Banner>
          <Banner icon="₱">Equity commitment — core features never gated</Banner>
        </Spec>

        {/* Product card */}
        <Spec title="PRODUCT CARD">
          <div style={{ width: 150 }}><ProductCard /></div>
        </Spec>

        {/* AI result card */}
        <div style={{ gridColumn: 'span 2' }}>
          <Spec title="AI RESULT CARD — label · confidence · detail · CTA">
            <div style={{ width: 320 }}>
              <AICard title="Detected match" confidence={92} cta="Use this result">
                <Txt size={11}>Supporting detail line describing the AI output and what it means for the user.</Txt>
              </AICard>
            </div>
          </Spec>
        </div>

        {/* Camera frame */}
        <Spec title="CAMERA CAPTURE FRAME">
          <div style={{ width: 150, height: 250, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <CameraFrame guide="face" />
          </div>
        </Spec>

        {/* States */}
        <div style={{ gridColumn: 'span 2' }}>
          <Spec title="STATE BLOCKS — empty · loading/processing · error">
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
              <div style={{ flex: 1, height: 210, border: '1px dashed ' + WK.line, borderRadius: 8, display: 'flex', flexDirection: 'column' }}><Empty title="Nothing here yet" sub="Empty-state copy + CTA" cta="Add" /></div>
              <div style={{ flex: 1, height: 210, border: '1px dashed ' + WK.line, borderRadius: 8, display: 'flex', flexDirection: 'column' }}><Processing label="Processing…" sub="Progress copy" pct={64} /></div>
              <div style={{ flex: 1, height: 210, border: '1px dashed ' + WK.line, borderRadius: 8, display: 'flex', flexDirection: 'column' }}><ErrorBlock title="Couldn't load" sub="Error copy + retry" /></div>
            </div>
          </Spec>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LAYER 1 · Onboarding & Auth
// ════════════════════════════════════════════════════════════════════

// L1-01 Splash
function Splash() {
  return (
    <Frame
      purpose="Brand entry point while the app boots and the session is restored."
      components={['Centered Aura logo', 'Subtle load indicator', 'Tagline']}
      states={['loading']}
      flows={['Auto-advances to Onboarding (new) or Home (returning)']}>
      <Phone>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', border: '2px dashed ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, color: WK.accent, fontWeight: 700 }}>◐</div>
          <H size={28} style={{ letterSpacing: 2 }}>AURA</H>
          <Txt size={11} style={{ letterSpacing: 1 }}>beauty intelligence</Txt>
        </div>
        <div style={{ paddingBottom: 48, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px dashed ' + WK.faint, borderTopColor: 'transparent' }} />
        </div>
      </Phone>
    </Frame>
  );
}

// L1-02 Onboarding carousel
function Onboarding() {
  return (
    <Frame
      purpose="3–4 swipeable slides: value prop, the SDG health + equity mission, and the free-tier promise."
      components={['Full-bleed illustration placeholder', 'Headline + body', 'Page dots', 'Get Started (primary) + Log In']}
      states={['default']}
      flows={['Swipe between slides', 'Get Started → Sign Up', 'Log In → Auth']}>
      <Phone>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Btn kind="link">Skip</Btn></div>
          <Ph h={300} label="Mission illustration — health + equity for all skin tones" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <H size={20}>Beauty that works for every Filipino</H>
            <Txt size={12.5}>Seven AI tools — tone, skin, ingredients, shades, try-on, dupes & tracking — in one app. Built for all tones and budgets.</Txt>
          </div>
          <div style={{ marginTop: 4 }}><Dots n={4} active={1} /></div>
          <div style={{ flex: 1 }} />
          <Btn kind="primary" full>Get Started</Btn>
          <div style={{ textAlign: 'center' }}><Btn kind="link">I already have an account · Log In</Btn></div>
        </div>
      </Phone>
    </Frame>
  );
}

// L1-03 Auth
function Auth() {
  return (
    <Frame
      purpose="Email + social (Firebase) auth; toggle sign-up / login; guest skip. Shows validation error."
      components={['Sign up / Log in toggle', 'Email + password fields', 'Social auth buttons', 'Inline validation error', 'Continue as guest']}
      states={['default', 'error']}
      flows={['Success → Interests & Personalization', 'Guest → Home (limited)']}>
      <Phone>
        <AppBar title="Create your account" back />
        <Body pad={20} gap={14}>
          <div style={{ display: 'flex', background: WK.panel, borderRadius: 8, padding: 4 }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 6, background: WK.paper, fontSize: 12, fontWeight: 700, color: WK.ink, boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>Sign Up</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: 12, fontWeight: 600, color: WK.mid }}>Log In</div>
          </div>
          <Field label="Email" value="juan@email" />
          <Field label="Password" value="••••••••" error="Password must be 8+ characters" />
          <Btn kind="primary" full>Create account</Btn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: WK.faint, fontSize: 10 }}>
            <div style={{ flex: 1, borderTop: '1px dashed ' + WK.line }} /> or continue with <div style={{ flex: 1, borderTop: '1px dashed ' + WK.line }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn kind="secondary" full sm style={{ height: 42 }}>Google</Btn>
            <Btn kind="secondary" full sm style={{ height: 42 }}>Apple</Btn>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ textAlign: 'center' }}><Btn kind="link">Continue as guest →</Btn></div>
        </Body>
      </Phone>
    </Frame>
  );
}
function Field({ label, value, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: WK.mid }}>{label}</span>
      <div style={{ height: 42, borderRadius: 6, border: '1.5px solid ' + (error ? '#c98a80' : WK.line), display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 12, color: WK.mid }}>{value}</div>
      {error && <span style={{ fontSize: 10, color: '#bd7163' }}>⚠ {error}</span>}
    </div>
  );
}

// L1-03b … L1-03f  Interests & Personalization — now a STEPPED flow, one
// question per screen, captured right after sign-up and before the skin/shade
// analysis. Low-friction: tappable cards, chips & a slider. Feeds the
// personalization engine so recs, dupes & routine pacing are relevant from
// session 1.

// shared step scaffold — header (step counter + Skip) · progress · footer (Back/Continue)
function IStep({ step, total = 6, title, sub, back = true, cta = 'Continue', children }) {
  return (
    <Phone>
      <div style={{ flex: '0 0 50px', height: 50, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, borderBottom: '1px dashed ' + WK.line }}>
        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: WK.ink }}>Let's personalize · {step} of {total}</span>
        <Btn kind="link">Skip for now</Btn>
      </div>
      <Body pad={20} gap={16} scroll>
        <ProgBar pct={Math.round((step / total) * 100)} />
        <div>
          <H size={19}>{title}</H>
          {sub && <Txt size={11} style={{ marginTop: 4 }}>{sub}</Txt>}
        </div>
        {children}
      </Body>
      <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, padding: '12px 16px', display: 'flex', gap: 10 }}>
        {back && <Btn kind="secondary" sm style={{ height: 44, flex: '0 0 90px' }}>Back</Btn>}
        <Btn kind="primary" full style={{ flex: 1 }}>{cta}</Btn>
      </div>
    </Phone>
  );
}

// L1-03b · Step 1 — Makeup looks & aesthetics (multi-select, global)
function InterestsLooks() {
  return (
    <Frame
      purpose="Step 1 of the post-sign-up personalization flow. Captures the aesthetics the user loves — drawn from makeup cultures around the world, not just a few defaults — so the AI can bias looks, tutorials & product recs from session 1. Multi-select, scrollable card grid."
      components={['Step counter + Skip', 'Progress bar', 'Global aesthetic cards (multi-select, 16 looks)', 'Check indicator', 'Continue (primary)']}
      states={['default']}
      flows={['Continue → Step 2 · Skincare consistency', 'Skip → Skin Profile Setup', 'Selections → personalization engine']}>
      <IStep step={1} title="What looks do you love?" sub="Pick any that speak to you — from anywhere in the world. Choose as many as you like." back={false}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9 }}>
          <LookCard label="Natural" sub="no-makeup" on />
          <LookCard label="Soft glam" sub="everyday" />
          <LookCard label="Full glam" sub="full beat" on />
          <LookCard label="Bold" sub="graphic liner" />
          <LookCard label="Clean girl" sub="minimal" />
          <LookCard label="K-beauty" sub="dewy · Korea" on />
          <LookCard label="J-beauty" sub="soft · Japan" />
          <LookCard label="Douyin" sub="China" />
          <LookCard label="Bollywood" sub="India" />
          <LookCard label="Khaleeji" sub="Gulf glam" />
          <LookCard label="Latina glam" sub="bold lip" />
          <LookCard label="Afro-glam" sub="vivid color" />
          <LookCard label="Editorial" sub="high fashion" />
          <LookCard label="Retro" sub="vintage" />
          <LookCard label="Festival" sub="gems & graphic" />
          <LookCard label="Goth / alt" sub="dark" />
        </div>
      </IStep>
    </Frame>
  );
}

// L1-03c · Step 2 — Skincare routine consistency (single-select)
function InterestsSkincare() {
  return (
    <Frame
      purpose="Step 2 of the personalization flow. How consistently the user maintains a skincare routine — sets the baseline for how the AI paces routine suggestions (gentle ramp vs. advanced layering)."
      components={['Step counter + Skip', 'Progress bar', 'Consistency option cards (single-select)', 'Back / Continue']}
      states={['default']}
      flows={['Continue → Step 3 · Makeup frequency', 'Back → Step 1', 'Skip → Skin Profile Setup']}>
      <IStep step={2} title="How consistent is your skincare?" sub="No judgement — this just sets your starting pace.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OptCard glyph="○" label="Just starting" sub="Little to no routine yet" />
          <OptCard glyph="◑" label="On & off" sub="Some days, not every day" on />
          <OptCard glyph="◐" label="Daily" sub="A steady once-a-day routine" />
          <OptCard glyph="●" label="Devoted" sub="Full AM + PM, multi-step" />
        </div>
      </IStep>
    </Frame>
  );
}

// L1-03d · Step 3 — Makeup frequency (single-select)
function InterestsMakeup() {
  return (
    <Frame
      purpose="Step 3 of the personalization flow. How often the user wears makeup — tunes how heavily the feed and recs lean makeup vs. skincare."
      components={['Step counter + Skip', 'Progress bar', 'Frequency option cards (single-select)', 'Back / Continue']}
      states={['default']}
      flows={['Continue → Step 4 · Skill level', 'Back → Step 2', 'Skip → Skin Profile Setup']}>
      <IStep step={3} title="How often do you wear makeup?">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OptCard glyph="◇" label="Rarely" sub="Special occasions only" />
          <OptCard glyph="◈" label="Weekends" sub="A look or two a week" on />
          <OptCard glyph="◉" label="A few times a week" sub="Most working days" />
          <OptCard glyph="✦" label="Every day" sub="It's part of my routine" />
        </div>
      </IStep>
    </Frame>
  );
}

// L1-03d2 · Step 4 — Skill level per domain (skincare & makeup, independent)
function SkillLevel() {
  return (
    <Frame
      purpose="Step 4 of the personalization flow. The user self-identifies their experience level for skincare and makeup SEPARATELY (Beginner / Intermediate / Advanced) — a user can be advanced in skincare but a beginner in makeup. This calibrates the DEPTH of guidance: beginners get step-by-step explanations, advanced users get streamlined, product-forward content."
      components={['Step counter + Skip', 'Progress bar', 'Two domain blocks (Skincare · Makeup), each with an icon + live descriptor', 'Per-domain 3-segment selector — Beginner / Intermediate / Advanced with depth bars', 'Why-this-matters note', 'Back / Continue']}
      states={['default']}
      flows={['Continue → Step 5 · Lifestyle', 'Back → Step 3', 'Skip → Skin Profile Setup', 'Levels → personalization engine (guidance depth per domain)']}>
      <IStep step={4} title="How experienced are you?" sub="Rate skincare and makeup on their own — it's fine to be a pro at one and brand-new to the other. This sets how much we explain.">
        <SkillBlock domain="Skincare" glyph="◍" level={2} note="You know your actives & layering" />
        <SkillBlock domain="Makeup" glyph="✦" level={0} note="Just getting started" />
        <div style={{ border: '1px dashed ' + WK.gold, borderRadius: 10, background: WK.goldBg, padding: 12, display: 'flex', gap: 9, alignItems: 'flex-start', marginTop: 2 }}>
          <span style={{ fontSize: 14, color: WK.goldInk }}>◐</span>
          <Txt size={10.5} color={WK.goldInk}>We tune guidance to each area on its own. Beginner unlocks step-by-step walkthroughs; Advanced strips them back to streamlined, product-first picks. Change it anytime in your profile.</Txt>
        </div>
      </IStep>
    </Frame>
  );
}
// per-domain segmented skill selector with depth bars
function SkillBlock({ domain, glyph, level, note }) {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  return (
    <div style={{ border: '1.5px dashed ' + WK.line, borderRadius: 12, padding: 14, background: WK.paper, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: WK.ink, flexShrink: 0 }}>{glyph}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: WK.serif, fontSize: 14, fontWeight: 600, color: WK.ink, letterSpacing: -0.2 }}>{domain}</div>
          <div style={{ fontSize: 9.5, color: WK.mid }}>{note}</div>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: WK.accentInk, background: WK.accentBg, border: '1px solid ' + WK.accent, borderRadius: 12, padding: '3px 10px', flexShrink: 0 }}>{levels[level]}</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {levels.map((l, i) => {
          const on = i === level;
          return (
            <div key={i} style={{ flex: 1, borderRadius: 9, padding: '11px 4px 9px', border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), background: on ? WK.accentBg : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <SkillBars n={i + 1} on={on} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: on ? WK.accentInk : WK.mid }}>{l}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// depth indicator — i+1 of 3 bars filled
function SkillBars({ n, on }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 16 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 4, height: 6 + i * 5, borderRadius: 1, background: i < n ? (on ? WK.accent : WK.mid) : (on ? 'oklch(0.84 0.05 28)' : WK.line) }} />
      ))}
    </div>
  );
}

// L1-03e · Step 5 — Daily lifestyle activity (single-select)
function InterestsLifestyle() {
  return (
    <Frame
      purpose="Step 5 of the personalization flow. How active the user's day is — informs longevity/transfer-proof product picks and routine timing."
      components={['Step counter + Skip', 'Progress bar', 'Lifestyle cards (single-select, 2-col)', 'Back / Continue']}
      states={['default']}
      flows={['Continue → Step 6 · Time for beauty', 'Back → Step 4 · Skill level', 'Skip → Skin Profile Setup']}>
      <IStep step={5} title="How active is your day?" sub="Helps us match wear-time and finish.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <LifeCard glyph="⌂" label="Mostly indoors" on />
          <LifeCard glyph="◎" label="On the go" />
          <LifeCard glyph="☀" label="Outdoors / active" />
          <LifeCard glyph="✦" label="Workout-heavy" />
        </div>
      </IStep>
    </Frame>
  );
}

// L1-03f · Step 5 — Time available for beauty (slider) → finishes the flow
function InterestsTime() {
  return (
    <Frame
      purpose="Final step of the personalization flow. How much time the user typically has for beauty — sets routine length & complexity (quick 5-min vs. relaxed multi-step). On finish, the answers seed the AI engine and the user proceeds to the skin condition assessment."
      components={['Step counter + Skip', 'Progress bar', 'Time slider (busy ↔ relaxed)', 'Why-this-matters note', 'Back / Finish']}
      states={['default']}
      flows={['Finish → Skin Profile Setup', 'Back → Step 5', 'Answers → personalization engine (recs · dupes · pacing)']}>
      <IStep step={6} title="How much time do you have?" sub="We'll pace your routine to fit your life." cta="Finish">
        <div style={{ marginTop: 8 }}><Slider min="Busy · quick" max="Relaxed · I take my time" /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Txt size={10}>5-min face</Txt><Txt size={10}>multi-step ritual</Txt>
        </div>
        <div style={{ flex: 1, minHeight: 12 }} />
        <div style={{ border: '1px dashed ' + WK.gold, borderRadius: 10, background: WK.goldBg, padding: 12, display: 'flex', gap: 9, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 14, color: WK.goldInk }}>◐</span>
          <Txt size={10.5} color={WK.goldInk}>That's it! Aura uses your answers to tailor product picks, dupe suggestions & routine pacing from your very first session — even before your skin scan. You can change these anytime.</Txt>
        </div>
      </IStep>
    </Frame>
  );
}

// multi-select aesthetic card (image + label + check)
function LookCard({ label, sub, on }) {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), background: on ? WK.accentBg : WK.paper }}>
      <div style={{ position: 'relative' }}>
        <Ph h={60} round={0} label="" accent={on} />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: '50%', border: '1.5px solid ' + (on ? WK.accent : WK.line), background: on ? WK.accent : 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>{on ? '✓' : ''}</span>
      </div>
      <div style={{ padding: '6px 8px' }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: WK.ink }}>{label}</div>
        <div style={{ fontSize: 8, color: on ? WK.accentInk : WK.mid }}>{sub}</div>
      </div>
    </div>
  );
}
// single-select option card (icon · label · sub · radio)
function OptCard({ glyph, label, sub, on }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 10, padding: '13px 13px', border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), background: on ? WK.accentBg : WK.paper }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: on ? WK.accentInk : WK.mid, flexShrink: 0 }}>{glyph}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: on ? WK.accentInk : WK.ink }}>{label}</div>
        <div style={{ fontSize: 9.5, color: WK.mid }}>{sub}</div>
      </div>
      <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid ' + (on ? WK.accent : WK.line), background: on ? WK.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', flexShrink: 0 }}>{on ? '✓' : ''}</span>
    </div>
  );
}
// single-select lifestyle card
function LifeCard({ glyph, label, on }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 9, padding: '12px 12px', border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), background: on ? WK.accentBg : WK.paper }}>
      <span style={{ fontSize: 16, color: on ? WK.accentInk : WK.mid }}>{glyph}</span>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: on ? WK.accentInk : WK.ink }}>{label}</span>
    </div>
  );
}

// L1-04 Skin Profile Setup
function SkinProfile() {
  return (
    <Frame
      purpose="Multi-step questionnaire building the user's skin profile, used to personalize every module."
      components={['Step progress bar', 'Skin type select', 'Concern multi-select chips', 'Budget ₱ slider', 'Shade self-estimate', 'Next / Back']}
      states={['default', 'success']}
      flows={['Step 1→4', 'Complete → Permissions Primer']}>
      <Phone>
        <AppBar title="Skin profile · Step 2 of 4" back />
        <Body pad={20} gap={16}>
          <ProgBar pct={50} />
          <H size={17}>What are your top concerns?</H>
          <Txt size={11}>Select all that apply — this tailors your AI results.</Txt>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip on>Acne</Chip><Chip>Dark spots</Chip><Chip on>Oiliness</Chip><Chip>Dryness</Chip><Chip>Redness</Chip><Chip>Pores</Chip><Chip>Aging</Chip><Chip>Sensitivity</Chip>
          </div>
          <div style={{ marginTop: 6 }}><SecLabel>Monthly budget</SecLabel></div>
          <Slider min="₱200" max="₱5,000+" />
          <SecLabel>Shade self-estimate</SecLabel>
          <SwatchRow active={4} />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn kind="secondary" sm style={{ height: 44, flex: '0 0 90px' }}>Back</Btn>
            <Btn kind="primary" full>Next</Btn>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function Slider({ min, max }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: WK.panel2 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '58%', background: WK.accent, borderRadius: 3 }} />
        <div style={{ position: 'absolute', left: '58%', top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: WK.paper, border: '2px solid ' + WK.accent }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: WK.mid }}><span>{min}</span><span>{max}</span></div>
    </div>
  );
}
function SwatchRow({ active }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 30, borderRadius: 3, background: `hsl(28 ${30 - i}% ${88 - i * 7}%)`, border: i === active ? '2px solid ' + WK.accent : '1px solid ' + WK.line, position: 'relative' }}>
          {i === active && <span style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: WK.accent }}>▼</span>}
        </div>
      ))}
    </div>
  );
}

// L1-05 Permissions primer
function Permissions() {
  return (
    <Frame
      purpose="Friendly explainer for camera access (scans/AR) shown BEFORE the OS dialog to lift grant rates."
      components={['Illustration', 'Why-we-need-it bullets', 'Allow (primary)', 'Maybe later']}
      states={['default']}
      flows={['Allow → OS dialog → Home', 'Maybe later → Home (scan gated)']}>
      <Phone>
        <Body pad={24} gap={18}>
          <div style={{ flex: 1 }} />
          <Ph h={170} label="Camera permission illustration" round={12} />
          <H size={20}>Enable your camera</H>
          <Txt size={12.5}>Aura uses your camera only for skin scans and virtual try-on. Photos stay on your device unless you choose to save them.</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            <PermRow label="Skin tone & condition analysis" />
            <PermRow label="AR virtual try-on" />
            <PermRow label="Progress photos for your tracker" />
          </div>
          <div style={{ flex: 1 }} />
          <Btn kind="primary" full>Allow camera access</Btn>
          <div style={{ textAlign: 'center' }}><Btn kind="link">Maybe later</Btn></div>
        </Body>
      </Phone>
    </Frame>
  );
}
function PermRow({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 24, height: 24, borderRadius: '50%', border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.mid }}>✓</span>
      <Txt size={11.5} color={WK.ink}>{label}</Txt>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LAYER 2 · Core Navigation
// ════════════════════════════════════════════════════════════════════

// L2-06 Home / Dashboard
function Home() {
  return (
    <Frame
      purpose="Personalized hub: profile snapshot, 8 AI-tool launchers, tracker continuation, picks, no-ads reassurance."
      components={['Greeting + profile snapshot', '8 AI quick-action tiles', 'Continue-tracker card', 'Personalized picks rail', 'No-ads footer']}
      states={['default']}
      flows={['Tile → AI tool', 'Tracker card → Efficacy Tracker', 'Pick → Product Detail']}>
      <Phone tab="home">
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Txt size={11}>Magandang umaga,</Txt>
              <H size={18}>Maria 👋</H>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: WK.mid }}>◐</div>
          </div>
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: WK.panel, border: '1px dashed ' + WK.line }} />
              <div style={{ flex: 1 }}>
                <Txt size={10}>Your skin profile</Txt>
                <H size={13}>Combination · MST-5 · Acne, oiliness</H>
              </div>
              <span style={{ fontSize: 16, color: WK.faint }}>›</span>
            </Card>

            <SecLabel>AI tools</SecLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[['◐','Tone'],['◍','Skin'],['◓','Color'],['⚗','Safety'],['⇄','Shade'],['◉','Try-On'],['₱','Dupes'],['◔','Tracker']].map(([g, l], i) => (
                <div key={i} style={{ aspectRatio: '1', border: '1px dashed ' + WK.line, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: WK.paper }}>
                  <span style={{ fontSize: 18, color: WK.ink }}>{g}</span>
                  <span style={{ fontSize: 8.5, color: WK.mid, fontWeight: 600 }}>{l}</span>
                </div>
              ))}
            </div>

            <Card accent style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px dashed ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: WK.accent }}>12</div>
              <div style={{ flex: 1 }}>
                <Txt size={10} color={WK.accentInk}>Continue your tracker</Txt>
                <H size={13} color={WK.ink}>Day 12 of 30 · log today</H>
              </div>
              <Btn kind="primary" sm>Log</Btn>
            </Card>

            <SecLabel more="See all">Picked for you</SecLabel>
            <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
              <div style={{ width: 130, flexShrink: 0 }}><ProductCard /></div>
              <div style={{ width: 130, flexShrink: 0 }}><ProductCard /></div>
              <div style={{ width: 130, flexShrink: 0, opacity: 0.5 }}><ProductCard /></div>
            </div>

            <Banner icon="◇" style={{ marginBottom: 16 }}>No ads, ever. Free tier is permanent.</Banner>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}

// L2-07 Discover
function Discover() {
  return (
    <Frame
      purpose="Browse feed of FDA-verified products organized into category rails."
      components={['Search entry', 'Category rails (skincare/makeup/dupes)', 'Product cards w/ FDA badge', 'Sticky filter button']}
      states={['default']}
      flows={['Search → Search & Filter', 'Card → Product Detail']}>
      <Phone tab="discover">
        <AppBar title="Discover" action="⌕" />
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflow: 'hidden' }}>
            <Chip on>All</Chip><Chip>Skincare</Chip><Chip>Makeup</Chip><Chip>Dupes</Chip><Chip>Sun</Chip>
          </div>
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Rail title="Recommended for your skin" />
            <Rail title="Budget dupes under ₱300" />
            <div>
              <SecLabel more="Filter">All products</SecLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10, paddingBottom: 16 }}>
                <ProductCard /><ProductCard /><ProductCard /><ProductCard />
              </div>
            </div>
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function Rail({ title }) {
  return (
    <div>
      <SecLabel more="See all">{title}</SecLabel>
      <div style={{ display: 'flex', gap: 10, overflow: 'hidden', marginTop: 10 }}>
        <div style={{ width: 124, flexShrink: 0 }}><ProductCard /></div>
        <div style={{ width: 124, flexShrink: 0 }}><ProductCard /></div>
        <div style={{ width: 124, flexShrink: 0, opacity: 0.5 }}><ProductCard /></div>
      </div>
    </div>
  );
}

// L2-08 Search & Filter
function SearchFilter() {
  return (
    <Frame
      purpose="Search products + a filter sheet (price, concern, brand, shade, FDA-only). Shows results grid."
      components={['Search bar', 'Search-by-image (camera) entry', 'Filter button w/ active-count badge', 'Recent searches', 'Filter bottom-sheet', 'FDA-verified-only toggle', 'Results grid']}
      states={['default', 'empty']}
      flows={['Camera → Search by Image', 'Apply filters → results', 'Result → Product Detail']}>
      <Phone>
        <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, color: WK.ink }}>‹</span>
          <div style={{ flex: 1, height: 40, borderRadius: 20, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 0 14px', fontSize: 12, color: WK.mid }}>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>⌕ niacinamide serum</span>
            <span style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.accentInk }}>◉</span>
          </div>
          <span style={{ position: 'relative', width: 40, height: 40, borderRadius: 12, border: '1.5px solid ' + WK.accent, background: WK.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: WK.accentInk, flexShrink: 0 }}>☷<span style={{ position: 'absolute', top: -5, right: -5, minWidth: 16, height: 16, borderRadius: 8, background: WK.accent, color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid ' + WK.paper }}>3</span></span>
        </div>
        <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SecLabel>Results · 24</SecLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <ProductCard /><ProductCard />
            </div>
          </div>
          {/* filter sheet */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: WK.paper, borderTop: '1.5px solid ' + WK.line, borderRadius: '16px 16px 0 0', padding: 16, boxShadow: '0 -8px 24px rgba(0,0,0,.08)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: WK.faint, alignSelf: 'center' }} />
            <H size={14}>Filters</H>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dashed ' + WK.line }}>
              <Txt size={12} color={WK.ink}>FDA-verified only</Txt>
              <Toggle on />
            </div>
            <FilterRow label="Price" value="₱100 – ₱500" />
            <FilterRow label="Concern" value="Acne, Oiliness" />
            <FilterRow label="Brand" value="Any" />
            <FilterRow label="Shade" value="MST 4–6" />
            <Btn kind="primary" full>Show 24 results</Btn>
          </div>
        </div>
      </Phone>
    </Frame>
  );
}
function FilterRow({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
      <Txt size={12} color={WK.ink}>{label}</Txt>
      <span style={{ fontSize: 11, color: WK.mid }}>{value} ›</span>
    </div>
  );
}
function Toggle({ on }) {
  return (
    <div style={{ width: 38, height: 22, borderRadius: 11, background: on ? WK.accent : WK.panel2, position: 'relative', border: '1px solid ' + (on ? WK.accent : WK.line) }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LAYER 2 · Community Feed (replaces Routine in the bottom nav)
// ════════════════════════════════════════════════════════════════════

// L2-26 Community Feed — vertical, full-screen UGC feed (TikTok-style).
// Every post is shoppable: the gold basket links straight to the
// FDA-verified products used in the clip.
// CommunityReels — immersive, full-screen reels mode of Community (reached
// from the Community hub). Personalized: the "For Your Skin" feed surfaces
// clips matched to the user's skin condition + palette. Every post is
// shoppable — the gold basket links to the FDA-verified products used.
function CommunityReels() {
  return (
    <Frame
      purpose="Immersive reels mode of Community (full-screen, TikTok-style). The 'For Your Skin' feed is filtered to the user's skin condition + palette. Every post is shoppable — the gold basket opens Shop the Look."
      components={['Full-screen video post', 'Following / For You / For Your Skin switch', 'Skin-match chip on personalized posts', 'Engagement rail — like · comment · share · save', 'Creator + caption + sound', 'Shoppable basket (gold) + product count', 'Pinned product tag → Product Detail']}
      states={['default']}
      flows={['Swipe up → next post', 'Basket → Shop the Look', 'Product tag → Product Detail', 'Avatar → Public Profile', 'Sound → audio page']}>
      <Phone tab="community" dark statusInk="#fff">
        <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', background: '#2b2926' }}>
          {/* video media placeholder */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.16 }} preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#fff" strokeWidth="1" />
          </svg>
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 10.5, color: 'rgba(255,255,255,.5)', letterSpacing: 0.5 }}>User video · 0:14</span>

          {/* top feed switch */}
          <div style={{ position: 'absolute', top: 8, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>Following</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>For You</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', position: 'relative' }}>For Your Skin
              <span style={{ position: 'absolute', left: '50%', bottom: -7, transform: 'translateX(-50%)', width: 18, height: 2.5, borderRadius: 2, background: '#fff' }} />
            </span>
            <span style={{ position: 'absolute', right: 14, top: 0, fontSize: 16, color: '#fff' }}>⌕</span>
          </div>

          {/* right engagement rail */}
          <div style={{ position: 'absolute', right: 10, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', marginBottom: 4 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', border: '2px solid #fff', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff' }}>◐</div>
              <span style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 18, height: 18, borderRadius: '50%', background: WK.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, border: '1.5px solid #2b2926' }}>+</span>
            </div>
            <RailAction glyph="♡" label="12.4k" />
            <RailAction glyph="✑" label="318" />
            <RailAction glyph="⤴" label="Share" />
            <RailAction glyph="☆" label="Save" />
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,255,255,.3)', background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: '#fff' }}>♪</div>
          </div>

          {/* pinned shoppable product tag — links into Product Detail */}
          <div style={{ position: 'absolute', left: 14, top: '40%', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.96)', borderRadius: 12, padding: '7px 8px', boxShadow: '0 6px 18px rgba(0,0,0,.35)', maxWidth: 232 }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: WK.panel2, border: '1px solid ' + WK.line, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: .5 }} preserveAspectRatio="none"><line x1="0" y1="0" x2="100%" y2="100%" stroke={WK.faint} /><line x1="100%" y1="0" x2="0" y2="100%" stroke={WK.faint} /></svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: WK.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>CeraVe Foaming Cleanser</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: WK.ink }}>₱649</span>
                <FDABadge sm />
              </div>
            </div>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BasketIcon size={14} />
            </span>
          </div>

          {/* shoppable basket (the "yellow basket") + label */}
          <div style={{ position: 'absolute', left: 14, bottom: 116, display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: WK.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,.4)' }}>
                <BasketIcon size={22} />
              </div>
              <span style={{ position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 9, background: WK.accent, color: '#fff', fontSize: 10.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #2b2926' }}>3</span>
            </div>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: '#3a2a08', background: WK.goldBg, borderRadius: 14, padding: '7px 12px' }}>Shop this look</span>
          </div>

          {/* creator + caption + sound */}
          <div style={{ position: 'absolute', left: 14, right: 70, bottom: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>@maris.glow</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,.6)', borderRadius: 12, padding: '2px 9px' }}>Follow</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#3a2a08', background: WK.goldBg, borderRadius: 12, padding: '3px 8px' }}>✓ Matches your skin</span>
            </div>
            <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.92)', lineHeight: 1.4 }}>My 3-step FDA-verified glow up — all under ₱1,500 ✨ <span style={{ color: '#fff', fontWeight: 700 }}>#skintok #fyp #affordable</span></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#fff' }}>♪</span>
              <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,.85)' }}>original sound — maris.glow</span>
            </div>
          </div>

          {/* swipe-up hint */}
          <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: 'rgba(255,255,255,.4)', letterSpacing: 0.5 }}>▴ swipe for next</div>
        </div>
      </Phone>
    </Frame>
  );
}
function RailAction({ glyph, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <span style={{ fontSize: 24, color: '#fff', lineHeight: 1 }}>{glyph}</span>
      <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.9)' }}>{label}</span>
    </div>
  );
}
function BasketIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3a2a08" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 8.5h15l-1.3 9.8a2 2 0 0 1-2 1.7H7.8a2 2 0 0 1-2-1.7L4.5 8.5Z" />
      <path d="M9 8.5 11.2 3.8M15 8.5 12.8 3.8" />
      <path d="M9.7 12v4M14.3 12v4" />
    </svg>
  );
}

Object.assign(window, { ComponentSheet, Splash, Onboarding, Auth, InterestsLooks, InterestsSkincare, InterestsMakeup, SkillLevel, InterestsLifestyle, InterestsTime, SkinProfile, Permissions, Home, Discover, SearchFilter, CommunityReels });
