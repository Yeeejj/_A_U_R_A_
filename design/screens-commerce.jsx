// screens-commerce.jsx — Layer 7 (Commerce & Checkout) + Create Routine
// Cart → Buy (review) → Shipping → Address → Map → Payment → Order Tracking

// ── local helpers (Cx prefix to avoid global collisions) ─────────────
function CxField({ label, value, ph, half, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? 1 : 'none', minWidth: 0 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: WK.mid }}>{label}</span>
      <div style={{ height: 42, borderRadius: 6, border: '1.5px solid ' + (error ? '#c98a80' : WK.line), display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 12, color: value ? WK.ink : WK.faint }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || ph}</span>
      </div>
    </div>
  );
}
function CxSelect({ label, value, half }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? 1 : 'none', minWidth: 0 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: WK.mid }}>{label}</span>
      <div style={{ height: 42, borderRadius: 6, border: '1.5px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 12, color: value ? WK.ink : WK.faint }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
        <span style={{ color: WK.faint, fontSize: 11 }}>⌄</span>
      </div>
    </div>
  );
}
// price-summary row
function CxSum({ k, v, strong, accent, free }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: strong ? 13 : 11.5, fontWeight: strong ? 700 : 500, color: strong ? WK.ink : WK.mid }}>{k}</span>
      <span style={{ fontSize: strong ? 16 : 11.5, fontWeight: strong ? 700 : 600, color: free ? WK.accentInk : (accent ? WK.accentInk : WK.ink), fontFamily: strong ? WK.serif : WK.mono }}>{v}</span>
    </div>
  );
}
// sticky checkout footer
function CxFoot({ total, cta, note }) {
  return (
    <div style={{ flexShrink: 0, borderTop: '1px dashed ' + WK.line, background: WK.paper, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      {total && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 9.5, color: WK.mid }}>{note || 'Total'}</span>
          <span style={{ fontSize: 19, fontWeight: 700, color: WK.ink, fontFamily: WK.serif, lineHeight: 1.1 }}>{total}</span>
        </div>
      )}
      <Btn kind="primary" full style={{ flex: 1 }}>{cta}</Btn>
    </div>
  );
}
// qty stepper
function CxQty({ n = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid ' + WK.line, borderRadius: 6, overflow: 'hidden' }}>
      <span style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.mid }}>−</span>
      <span style={{ width: 24, textAlign: 'center', fontSize: 12, fontWeight: 700, color: WK.ink }}>{n}</span>
      <span style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.ink }}>+</span>
    </div>
  );
}
// edit-summary card (address / payment recap with Change link)
function CxRecap({ icon, label, title, lines = [], action = 'Change', accent }) {
  return (
    <div style={{ border: '1.5px ' + (accent ? 'solid ' + WK.accent : 'dashed ' + WK.line), borderRadius: 10, padding: 12, display: 'flex', gap: 11, alignItems: 'flex-start', background: accent ? WK.accentBg : WK.paper }}>
      <span style={{ width: 30, height: 30, borderRadius: 8, background: WK.panel, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.ink, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9.5, letterSpacing: 0.8, fontWeight: 700, color: WK.faint, marginBottom: 3 }}>{label}</div>
        <H size={12.5}>{title}</H>
        {lines.map((l, i) => <Txt key={i} size={10.5} style={{ marginTop: 1 }}>{l}</Txt>)}
      </div>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: WK.accentInk }}>{action} ›</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LAYER 7 · Commerce & Checkout
// ════════════════════════════════════════════════════════════════════

// L7-28 Cart — grouped by seller, qty steppers, free-ship progress
function Cart() {
  return (
    <Frame
      purpose="Marketplace cart grouped by seller/brand. Each line keeps its FDA badge; free-shipping progress nudges. Sticky checkout footer."
      components={['Seller group header + select-all', 'Cart line: thumb · variant · qty stepper · price · FDA', 'Free-shipping progress bar', 'Voucher entry', 'Sticky subtotal + Checkout']}
      states={['default', 'empty']}
      flows={['Checkout → Buy (review)', 'Line → Product Detail', 'Voucher → applied']}>
      <Phone>
        <AppBar title="Cart · 3 items" back action="✎" />
        <Body pad={0} gap={0} scroll>
          <div style={{ padding: '12px 16px', borderBottom: '1px dashed ' + WK.line }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
              <Txt size={10.5} color={WK.accentInk} w={700}>Add ₱351 more for free shipping</Txt>
              <span style={{ fontSize: 13, color: WK.gold }}>🚚</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: WK.panel2, overflow: 'hidden' }}><div style={{ width: '68%', height: '100%', background: WK.accent }} /></div>
          </div>
          <CxCartGroup seller="CeraVe PH · Verified distributor">
            <CxCartLine name="Foaming Facial Cleanser" variant="236 ml" price="₱649" n={1} />
            <CxCartLine name="Moisturizing Lotion" variant="473 ml" price="₱899" n={1} />
          </CxCartGroup>
          <CxCartGroup seller="The Ordinary · Beauty MNL">
            <CxCartLine name="Niacinamide 10% + Zinc" variant="30 ml" price="₱390" n={2} last />
          </CxCartGroup>
        </Body>
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ height: 40, borderRadius: 8, border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, fontSize: 11.5, color: WK.mid }}>
            <span style={{ color: WK.accent }}>◇</span> Enter voucher code <span style={{ marginLeft: 'auto', color: WK.accentInk, fontWeight: 700 }}>Apply</span>
          </div>
        </div>
        <CxFoot total="₱2,328" cta="Checkout (4)" note="Subtotal · 4 items" />
      </Phone>
    </Frame>
  );
}
function CxCartGroup({ seller, children }) {
  return (
    <div style={{ padding: '12px 16px', borderBottom: '6px solid ' + WK.panel }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid ' + WK.accent, background: WK.accentBg, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: WK.ink }}>{seller}</span>
        <span style={{ color: WK.faint, marginLeft: 'auto' }}>›</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}
function CxCartLine({ name, variant, price, n }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ width: 16, height: 16, marginTop: 26, borderRadius: 4, border: '1.5px solid ' + WK.accent, background: WK.accentBg, color: WK.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>✓</span>
      <Ph h={64} w={64} round={8} label="" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <H size={12.5} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</H>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0' }}>
          <span style={{ fontSize: 10, color: WK.mid, background: WK.panel, borderRadius: 4, padding: '2px 7px' }}>{variant} ⌄</span>
          <FDABadge sm />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: WK.ink, fontFamily: WK.serif }}>{price}</span>
          <CxQty n={n} />
        </div>
      </div>
    </div>
  );
}

// L7-29 Buy — checkout review / place order
function Buy() {
  return (
    <Frame
      purpose="Single review screen before payment. Recaps address, shipping, payment & items with edit links; full price breakdown; place-order CTA."
      components={['Address recap → Shipping', 'Delivery method recap', 'Item list (condensed)', 'Voucher + coins', 'Payment recap → Payment', 'Price breakdown', 'Place Order (sticky)']}
      states={['default']}
      flows={['Address → Shipping', 'Payment → Payment', 'Place Order → Order Tracking']}>
      <Phone>
        <AppBar title="Checkout" back />
        <Body pad={16} gap={12} scroll>
          <CxRecap icon="◎" label="DELIVER TO" title="Maria Santos · 0917 555 0142" lines={['12 Mabini St, Brgy Poblacion, Makati City, Metro Manila 1210']} action="Change" accent />
          <CxRecap icon="🚚" label="DELIVERY" title="Standard · J&T Express" lines={['Arrives Jun 25–27 · ₱49']} />
          <Card pad={12} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Txt size={10} color={WK.faint} w={700} style={{ letterSpacing: 0.8 }}>YOUR ORDER · 4 ITEMS</Txt>
              <span style={{ fontSize: 10.5, color: WK.accentInk, fontWeight: 700 }}>Edit ›</span>
            </div>
            <CxMiniItem name="Foaming Facial Cleanser" qty="×1" price="₱649" />
            <CxMiniItem name="Moisturizing Lotion" qty="×1" price="₱899" />
            <CxMiniItem name="Niacinamide 10% + Zinc" qty="×2" price="₱780" last />
          </Card>
          <CxRecap icon="₲" label="PAYMENT" title="GCash" lines={['•••• 0142']} action="Change" />
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, height: 40, borderRadius: 8, border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6, fontSize: 11, color: WK.mid }}><span style={{ color: WK.accent }}>◇</span> Voucher</div>
            <div style={{ flex: 1, height: 40, borderRadius: 8, border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6, fontSize: 11, color: WK.mid }}><span style={{ color: WK.gold }}>◉</span> Aura Coins · 50</div>
          </div>
          <Card pad={12} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CxSum k="Merchandise" v="₱2,328" />
            <CxSum k="Shipping" v="₱49" />
            <CxSum k="Voucher discount" v="−₱100" accent />
            <div style={{ borderTop: '1px dashed ' + WK.line, margin: '2px 0' }} />
            <CxSum k="Total payment" v="₱2,277" strong />
          </Card>
        </Body>
        <CxFoot total="₱2,277" cta="Place Order" />
      </Phone>
    </Frame>
  );
}
function CxMiniItem({ name, qty, price, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: last ? 0 : 8, borderBottom: last ? 'none' : '1px dashed ' + WK.line }}>
      <Ph h={36} w={36} round={6} label="" />
      <span style={{ flex: 1, fontSize: 11.5, color: WK.ink, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      <span style={{ fontSize: 10.5, color: WK.mid }}>{qty}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: WK.ink }}>{price}</span>
    </div>
  );
}

// L7-30 Shipping — address + courier selection
function Shipping() {
  return (
    <Frame
      purpose="Pick delivery address and courier. Couriers shown as selectable rows with ETA + cost; add-new-address entry."
      components={['Selected address card → edit', 'Add new address', 'Courier radio rows (J&T, LBC, Lalamove)', 'ETA + price per option', 'Continue']}
      states={['default']}
      flows={['Add address → Inserting Address', 'Edit → Maps Page', 'Continue → Payment']}>
      <Phone>
        <AppBar title="Shipping" back />
        <Body pad={16} gap={14} scroll>
          <SecLabel more="Add new">Delivery address</SecLabel>
          <CxRecap icon="◎" label="HOME · DEFAULT" title="Maria Santos · 0917 555 0142" lines={['12 Mabini St, Brgy Poblacion, Makati City, Metro Manila 1210']} action="Edit" accent />
          <div style={{ border: '1.5px dashed ' + WK.line, borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10, color: WK.mid, fontSize: 12, fontWeight: 600 }}>
            <span style={{ fontSize: 16, color: WK.accent }}>+</span> Add a new address
          </div>
          <SecLabel>Delivery method</SecLabel>
          <CxShipOpt name="Standard · J&T Express" eta="Jun 25–27 (3–5 days)" price="₱49" on />
          <CxShipOpt name="Express · Lalamove" eta="Same day · within Metro Manila" price="₱180" />
          <CxShipOpt name="Economy · LBC" eta="Jun 27–30 (5–8 days)" price="Free" free />
          <Banner icon="◇">Cash on Delivery available for orders under ₱5,000.</Banner>
        </Body>
        <CxFoot cta="Continue to payment →" />
      </Phone>
    </Frame>
  );
}
function CxShipOpt({ name, eta, price, on, free }) {
  return (
    <div style={{ border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 11, background: on ? WK.accentBg : WK.paper }}>
      <span style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (on ? WK.accent : WK.faint), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {on && <span style={{ width: 9, height: 9, borderRadius: '50%', background: WK.accent }} />}
      </span>
      <div style={{ flex: 1 }}>
        <H size={12.5}>{name}</H>
        <Txt size={10.5}>{eta}</Txt>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: free ? WK.accentInk : WK.ink, fontFamily: WK.serif }}>{price}</span>
    </div>
  );
}

// L7-31 Inserting Address — PH address form
function AddressForm() {
  return (
    <Frame
      purpose="Add / edit a shipping address using the PH region→barangay hierarchy. Pin-on-map shortcut, label, default toggle."
      components={['Use current location → Map', 'Name + phone', 'Region / Province / City / Barangay selects', 'Street + postal', 'Label (Home/Work)', 'Set as default toggle', 'Save']}
      states={['default']}
      flows={['Pin on map → Maps Page', 'Save → back to Shipping']}>
      <Phone>
        <AppBar title="New address" back />
        <Body pad={16} gap={12} scroll>
          <div style={{ border: '1.5px solid ' + WK.accent, borderRadius: 10, padding: '11px 12px', background: WK.accentBg, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15, color: WK.accentInk }}>◎</span>
            <Txt size={11.5} color={WK.accentInk} w={700} style={{ flex: 1 }}>Pin your location on the map</Txt>
            <span style={{ fontSize: 11, color: WK.accentInk, fontWeight: 700 }}>Open ›</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <CxField label="Full name" value="Maria Santos" half />
            <CxField label="Phone" value="0917 555 0142" half />
          </div>
          <CxSelect label="Region" value="NCR — Metro Manila" />
          <div style={{ display: 'flex', gap: 10 }}>
            <CxSelect label="City / Municipality" value="Makati City" half />
            <CxSelect label="Barangay" value="Poblacion" half />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <CxField label="Street, bldg, unit" value="12 Mabini St" half />
            <CxField label="Postal" value="1210" half />
          </div>
          <CxField label="Delivery note (optional)" ph="e.g. Gate code, landmark…" />
          <SecLabel>Label as</SecLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip on>⌂ Home</Chip><Chip>◇ Work</Chip><Chip>+ Other</Chip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed ' + WK.line, marginTop: 2 }}>
            <Txt size={12} color={WK.ink} w={600}>Set as default address</Txt>
            <div style={{ width: 38, height: 22, borderRadius: 11, background: WK.accent, position: 'relative', border: '1px solid ' + WK.accent }}><div style={{ position: 'absolute', top: 2, left: 18, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} /></div>
          </div>
        </Body>
        <CxFoot cta="Save address" />
      </Phone>
    </Frame>
  );
}

// L7-32 Maps Page for Address — pin picker
function AddressMap() {
  return (
    <Frame
      purpose="Drag-to-pin location picker. Reverse-geocoded address fills the bottom sheet; confirm carries it back into the address form."
      components={['Search location bar', 'Map canvas w/ center pin', 'Recenter (GPS) button', 'Bottom sheet: detected address + label', 'Confirm location']}
      states={['default']}
      flows={['Confirm → Inserting Address (prefilled)']}>
      <Phone>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
          <StatusBar ink={WK.ink} />
          {/* search overlay */}
          <div style={{ position: 'absolute', top: 38, left: 14, right: 14, zIndex: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, background: WK.paper, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: WK.ink, boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}>‹</span>
            <div style={{ flex: 1, height: 38, borderRadius: 10, background: WK.paper, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', fontSize: 12, color: WK.mid, boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}>⌕ Search a place or address…</div>
          </div>
          {/* map canvas */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'oklch(0.93 0.02 130)' }}>
            <MapGrid />
            {/* center pin */}
            <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%,-100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', transform: 'rotate(45deg)', background: WK.accent, border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,.3)' }} />
              <div style={{ width: 10, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,.25)', marginTop: 4 }} />
            </div>
            {/* recenter */}
            <div style={{ position: 'absolute', right: 14, bottom: 14, width: 40, height: 40, borderRadius: '50%', background: WK.paper, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: WK.accentInk, boxShadow: '0 2px 8px rgba(0,0,0,.18)' }}>◎</div>
          </div>
          {/* bottom sheet */}
          <div style={{ flexShrink: 0, background: WK.paper, borderTop: '1.5px solid ' + WK.line, borderRadius: '16px 16px 0 0', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 -8px 24px rgba(0,0,0,.1)' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: WK.faint, alignSelf: 'center' }} />
            <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, color: WK.accent }}>◎</span>
              <div style={{ flex: 1 }}>
                <H size={13}>12 Mabini Street</H>
                <Txt size={11}>Brgy Poblacion, Makati City, Metro Manila 1210</Txt>
              </div>
              <span style={{ fontSize: 10.5, color: WK.accentInk, fontWeight: 700 }}>Move pin</span>
            </div>
            <Btn kind="primary" full>Confirm location</Btn>
          </div>
        </div>
      </Phone>
    </Frame>
  );
}
function MapGrid() {
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 390 500">
      <rect width="390" height="500" fill="oklch(0.945 0.018 125)" />
      {/* blocks */}
      {[40, 150, 260].map((y) => [30, 140, 250].map((x) => (
        <rect key={x + '-' + y} x={x} y={y} width="80" height="70" rx="4" fill="oklch(0.965 0.012 90)" stroke="oklch(0.88 0.02 120)" strokeWidth="1" />
      )))}
      {/* roads */}
      <line x1="0" y1="120" x2="390" y2="120" stroke="#fff" strokeWidth="9" />
      <line x1="0" y1="235" x2="390" y2="235" stroke="#fff" strokeWidth="12" />
      <line x1="0" y1="350" x2="390" y2="350" stroke="#fff" strokeWidth="9" />
      <line x1="120" y1="0" x2="120" y2="500" stroke="#fff" strokeWidth="9" />
      <line x1="235" y1="0" x2="235" y2="500" stroke="#fff" strokeWidth="12" />
      {/* water hint */}
      <path d="M300 0 Q340 120 320 260 T360 500 L390 500 L390 0 Z" fill="oklch(0.9 0.04 220)" opacity="0.6" />
      <text x="150" y="232" fontSize="8" fill="oklch(0.6 0.02 120)" fontFamily="Inter">Mabini St</text>
    </svg>
  );
}

// L7-33 Payment — method selection (PH wallets, cards, COD)
function Payment() {
  return (
    <Frame
      purpose="Choose payment method. Philippine wallets first (GCash, Maya), then cards & COD. Selected method expands; clear total."
      components={['E-wallet rows (GCash, Maya, GrabPay)', 'Card row + saved card', 'COD row', 'Add card form (collapsed)', 'Order total + Pay CTA']}
      states={['default']}
      flows={['Add card → form', 'Pay → Order Tracking']}>
      <Phone>
        <AppBar title="Payment" back />
        <Body pad={16} gap={14} scroll>
          <SecLabel>E-wallets</SecLabel>
          <CxPay icon="₲" name="GCash" sub="•••• 0142 · linked" on />
          <CxPay icon="◑" name="Maya" sub="Pay with Maya balance" />
          <CxPay icon="◍" name="GrabPay" sub="Link your GrabPay wallet" />
          <SecLabel>Cards</SecLabel>
          <CxPay icon="▭" name="Visa •••• 4821" sub="Expires 08/27" />
          <div style={{ border: '1.5px dashed ' + WK.line, borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10, color: WK.mid, fontSize: 12, fontWeight: 600 }}>
            <span style={{ fontSize: 15, color: WK.accent }}>+</span> Add credit / debit card
          </div>
          <SecLabel>Other</SecLabel>
          <CxPay icon="₱" name="Cash on Delivery" sub="Pay courier when it arrives" />
          <Card pad={12} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
            <CxSum k="Total payment" v="₱2,277" strong />
            <Txt size={9.5} color={WK.faint}>Secured by Aura Pay · PCI-DSS compliant</Txt>
          </Card>
        </Body>
        <CxFoot total="₱2,277" cta="Pay with GCash" />
      </Phone>
    </Frame>
  );
}
function CxPay({ icon, name, sub, on }) {
  return (
    <div style={{ border: '1.5px ' + (on ? 'solid ' + WK.accent : 'dashed ' + WK.line), borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 11, background: on ? WK.accentBg : WK.paper }}>
      <span style={{ width: 36, height: 36, borderRadius: 9, background: WK.panel, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: WK.ink, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <H size={12.5}>{name}</H>
        <Txt size={10.5}>{sub}</Txt>
      </div>
      <span style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (on ? WK.accent : WK.faint), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {on && <span style={{ width: 9, height: 9, borderRadius: '50%', background: WK.accent }} />}
      </span>
    </div>
  );
}

// L7-34 Order Tracking — status timeline + courier
function OrderTracking() {
  return (
    <Frame
      purpose="Live order status with vertical timeline, courier card, map snippet, ETA, and the items in this parcel."
      components={['Status hero + ETA', 'Vertical step timeline', 'Courier card → call/chat', 'Mini map snippet', 'Parcel item list', 'Help with order']}
      states={['default']}
      flows={['Chat courier → Messages', 'Item → Product Detail', 'Help → Help & Support']}>
      <Phone>
        <AppBar title="Order #AUR-90412" back action="⋯" />
        <Body pad={16} gap={14} scroll>
          <Card accent style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid ' + WK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: WK.accentInk }}>🚚</div>
            <div style={{ flex: 1 }}>
              <Txt size={10} color={WK.accentInk} w={700}>OUT FOR DELIVERY</Txt>
              <H size={15} color={WK.ink}>Arriving today, 2–5 PM</H>
            </div>
          </Card>
          {/* mini map */}
          <div style={{ height: 110, borderRadius: 10, overflow: 'hidden', border: '1px solid ' + WK.line, position: 'relative' }}>
            <MapGrid />
            <div style={{ position: 'absolute', top: '46%', left: '38%', transform: 'translate(-50%,-100%)', width: 22, height: 22, borderRadius: '50% 50% 50% 0', transform: 'translate(-50%,-100%) rotate(45deg)', background: WK.accent, border: '2px solid #fff' }} />
            <span style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 9, color: WK.mid, background: 'rgba(255,255,255,.85)', borderRadius: 4, padding: '2px 6px' }}>Rider 3.2 km away</span>
          </div>
          <div style={{ border: '1px dashed ' + WK.line, borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1px dashed ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.mid }}>◐</div>
            <div style={{ flex: 1 }}><H size={12.5}>J&T Express · Rider Boy</H><Txt size={10.5}>Plate NCR 8821 · ★ 4.9</Txt></div>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.accentInk }}>✆</span>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WK.accentInk }}>✉</span>
          </div>
          <SecLabel>Progress</SecLabel>
          <div style={{ paddingLeft: 4 }}>
            <CxTrack title="Order placed" time="Jun 22 · 9:14 AM" done />
            <CxTrack title="Packed by seller" time="Jun 22 · 4:30 PM" done />
            <CxTrack title="Picked up by courier" time="Jun 23 · 8:02 AM" done />
            <CxTrack title="Out for delivery" time="Today · 11:40 AM" active />
            <CxTrack title="Delivered" time="Estimated today, 2–5 PM" last />
          </div>
        </Body>
      </Phone>
    </Frame>
  );
}
function CxTrack({ title, time, done, active, last }) {
  const color = done ? WK.accent : active ? WK.accent : WK.faint;
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid ' + color, background: done || active ? WK.accent : WK.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff' }}>{done ? '✓' : ''}</span>
        {!last && <span style={{ width: 2, flex: 1, minHeight: 26, background: done ? WK.accent : WK.line, margin: '2px 0' }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 14 }}>
        <H size={12.5} color={active ? WK.accentInk : (done ? WK.ink : WK.mid)}>{title}</H>
        <Txt size={10}>{time}</Txt>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// Create Routine (lives near Layer 5 · Routine)
// ════════════════════════════════════════════════════════════════════
function CreateRoutine() {
  return (
    <Frame
      purpose="Guided creation of a new routine from scratch: name it, set AM/PM + reminder, then add ordered product steps from search or scans."
      components={['Routine name field', 'AM / PM segmented + reminder time', 'Empty step builder w/ add-from-search', 'Suggested-from-profile rail', 'Save & start tracking']}
      states={['default', 'empty']}
      flows={['Add step → Search / Discover', 'AI suggest → personalized picks', 'Save → My Routine + Tracker']}>
      <Phone>
        <AppBar title="Create routine" back action="✓" />
        <Body pad={16} gap={14} scroll>
          <CxField label="Routine name" value="Brightening AM" />
          <div>
            <SecLabel>Time of day</SecLabel>
            <div style={{ display: 'flex', background: WK.panel, borderRadius: 8, padding: 4, marginTop: 8 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 6, background: WK.paper, fontSize: 12, fontWeight: 700, color: WK.ink, boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>☀ AM</div>
              <div style={{ flex: 1, textAlign: 'center', padding: '7px 0', fontSize: 12, fontWeight: 600, color: WK.mid }}>☾ PM</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px dashed ' + WK.line, borderRadius: 8, padding: '11px 12px' }}>
            <Txt size={12} color={WK.ink} w={600}>⏰ Daily reminder</Txt>
            <span style={{ fontSize: 11.5, color: WK.accentInk, fontWeight: 700 }}>7:30 AM ›</span>
          </div>
          <SecLabel more="Add ›">Steps · 1</SecLabel>
          <div style={{ border: '1px dashed ' + WK.line, borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: WK.panel, border: '1px solid ' + WK.line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: WK.mid }}>1</span>
            <Ph h={40} w={40} round={6} label="" />
            <div style={{ flex: 1 }}><H size={12}>Vitamin C Serum</H><Txt size={10}>The Inkey List</Txt></div>
            <span style={{ color: WK.faint, fontSize: 15 }}>⠿</span>
          </div>
          <div style={{ border: '1.5px dashed ' + WK.accent, borderRadius: 8, padding: 14, textAlign: 'center', color: WK.accentInk, fontSize: 12, fontWeight: 700, background: WK.accentBg }}>+ Add a product step</div>
          <div>
            <SecLabel>Suggested for your profile</SecLabel>
            <div style={{ display: 'flex', gap: 10, overflow: 'hidden', marginTop: 8 }}>
              <div style={{ width: 120, flexShrink: 0 }}><ProductCard /></div>
              <div style={{ width: 120, flexShrink: 0 }}><ProductCard /></div>
              <div style={{ width: 120, flexShrink: 0, opacity: 0.5 }}><ProductCard /></div>
            </div>
          </div>
        </Body>
        <CxFoot cta="Save & start tracking" />
      </Phone>
    </Frame>
  );
}

Object.assign(window, {
  Cart, Buy, Shipping, AddressForm, AddressMap, Payment, OrderTracking, CreateRoutine,
});
