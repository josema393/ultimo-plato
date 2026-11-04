import { useEffect, useMemo, useState, type ReactNode } from 'react'

type Screen =
  | 'onboarding'
  | 'home'
  | 'map'
  | 'restaurant'
  | 'dish'
  | 'checkout'
  | 'confirmation'
  | 'orders'
  | 'profile'
  | 'restaurantPanel'
  | 'publish'
  | 'scan'

type IconName =
  | 'home' | 'map' | 'bag' | 'user' | 'pin' | 'clock' | 'star' | 'back'
  | 'heart' | 'arrow' | 'minus' | 'plus' | 'info' | 'card' | 'check'
  | 'route' | 'leaf' | 'scan' | 'camera' | 'close' | 'chevron'

const PATHS: Record<IconName, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>,
  bag: <><path d="M5 8h14l-1 13H6Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>,
  back: <><path d="m15 18-6-6 6-6"/></>,
  heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  minus: <path d="M5 12h14"/>,
  plus: <><path d="M5 12h14M12 5v14"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  route: <><path d="M5 19c3 0 3-4 6-4h2c3 0 3-4 6-4"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="m16 8 3 3 3-3"/></>,
  leaf: <><path d="M20 4C10 4 5 9 5 17c6 1 13-3 15-13Z"/><path d="M4 21c3-6 7-9 12-12"/></>,
  scan: <><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><path d="M7 12h10M12 7v10"/></>,
  camera: <><path d="M4 8h4l2-3h4l2 3h4v11H4Z"/><circle cx="12" cy="13" r="3"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
}

function Icon({ name, size = 22, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{PATHS[name]}</svg>
}

const photos = {
  ceviche: 'https://images.unsplash.com/photo-1761314036615-f1a9e69514d3?auto=format&fit=crop&w=1000&q=85',
  aji: 'https://images.unsplash.com/photo-1535400875775-0269e7a919af?auto=format&fit=crop&w=1000&q=85',
  lomo: 'https://images.unsplash.com/photo-1726514730572-7e0f664f60d2?auto=format&fit=crop&w=1000&q=85',
  arroz: 'https://images.unsplash.com/photo-1698931351680-edb46f3ff75e?auto=format&fit=crop&w=1000&q=85',
  restaurant: 'https://images.unsplash.com/photo-1562707774-553917f561df?auto=format&fit=crop&w=1200&q=85',
}

const dishes = [
  { name: 'Ají de gallina', restaurant: 'Sazón de la Abuela', distance: '350 m', price: '8.00', old: '16.00', left: 3, time: 'Cierra en 45 min', img: photos.aji },
  { name: 'Lomo saltado', restaurant: 'La Cocina de Don Pepe', distance: '620 m', price: '12.00', old: '24.00', left: 2, time: 'Cierra en 1 h', img: photos.lomo },
  { name: 'Ceviche clásico', restaurant: 'Punto Marino', distance: '850 m', price: '14.00', old: '28.00', left: 1, time: 'Cierra en 28 min', img: photos.ceviche },
  { name: 'Arroz con pollo', restaurant: 'El Rincón Criollo', distance: '900 m', price: '9.50', old: '19.00', left: 4, time: 'Cierra en 1 h 20', img: photos.arroz },
]

function PrimaryButton({ children, onClick, disabled = false, className = '' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; className?: string }) {
  return <button className={`primary-btn ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
}

function TopBar({ title, onBack, right }: { title?: string; onBack: () => void; right?: ReactNode }) {
  return <div className="topbar">
    <button className="icon-btn" onClick={onBack} aria-label="Volver"><Icon name="back" /></button>
    {title && <div className="topbar-title">{title}</div>}
    <div className="topbar-right">{right}</div>
  </div>
}

function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return <button className={`chip ${active ? 'active' : ''}`} onClick={onClick}>{children}</button>
}

function DishCard({ dish, onClick }: { dish: typeof dishes[number]; onClick: () => void }) {
  return <button className="dish-card" onClick={onClick}>
    <div className="dish-image-wrap">
      <img src={dish.img} alt={dish.name} className="dish-image" />
      <span className="discount">-50 %</span>
      <span className="remaining">Quedan {dish.left}</span>
    </div>
    <div className="dish-body">
      <div className="dish-title-row"><div><div className="dish-name">{dish.name}</div><div className="muted">{dish.restaurant}</div></div><Icon name="heart" size={21} /></div>
      <div className="meta-row"><span><Icon name="pin" size={14} /> {dish.distance}</span><span className={dish.left === 1 ? 'urgent' : ''}><Icon name="clock" size={14} /> {dish.time}</span></div>
      <div className="price-row"><strong>S/ {dish.price}</strong><del>S/ {dish.old}</del></div>
    </div>
  </button>
}

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'map', label: 'Mapa', icon: 'map' },
  { id: 'orders', label: 'Pedidos', icon: 'bag' },
  { id: 'profile', label: 'Perfil', icon: 'user' },
]

function BottomNav({ screen, go, restaurant = false }: { screen: Screen; go: (s: Screen) => void; restaurant?: boolean }) {
  const items = restaurant ? [
    { id: 'restaurantPanel' as Screen, label: 'Panel', icon: 'home' as IconName },
    { id: 'publish' as Screen, label: 'Publicar', icon: 'plus' as IconName },
    { id: 'scan' as Screen, label: 'Escanear', icon: 'scan' as IconName },
    { id: 'profile' as Screen, label: 'Perfil', icon: 'user' as IconName },
  ] : navItems
  return <nav className="bottom-nav">{items.map(item =>
    <button key={item.id} onClick={() => go(item.id)} className={screen === item.id ? 'selected' : ''}>
      <Icon name={item.icon} size={21} filled={screen === item.id && item.icon === 'home'} /><span>{item.label}</span>
    </button>
  )}</nav>
}

function Onboarding({ finish }: { finish: () => void }) {
  const [slide, setSlide] = useState(0)
  const content = [
    { tag: 'AHORRA HASTA 50 %', title: <>Platos del día a <em>mitad de precio</em></>, text: 'Disfruta comida deliciosa preparada hoy y ayuda a que nada se desperdicie.', image: photos.lomo },
    { tag: 'TÚ ELIGES', title: <>Elige exactamente <em>lo que quieres</em></>, text: 'Sin cajas sorpresa. Ves cada plato, su precio y cuántas porciones quedan.', image: photos.ceviche },
    { tag: 'UN GESTO QUE SUMA', title: <>Come rico, <em>sin desperdiciar</em></>, text: 'Reserva, paga en la app y recoge tu plato directamente en el restaurante.', image: photos.aji },
  ]
  const item = content[slide]
  return <div className="onboarding">
    <div className="onboard-brand"><span className="brand-mark"><Icon name="leaf" size={20} /></span> Último Plato</div>
    <div className="onboard-visual">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <img key={item.image} src={item.image} alt="Plato peruano" />
      <div className="float-card float-save"><Icon name="leaf" size={16} /> Sin desperdicio</div>
      <div className="float-card float-price">-50 %</div>
    </div>
    <div className="onboard-content">
      <span className="eyebrow">{item.tag}</span>
      <div className="display-title">{item.title}</div>
      <p>{item.text}</p>
      <div className="dots">{content.map((_, i) => <span key={i} className={i === slide ? 'active' : ''} />)}</div>
      {slide < 2 ? <PrimaryButton onClick={() => setSlide(slide + 1)}>Continuar <Icon name="arrow" /></PrimaryButton> :
        <><PrimaryButton onClick={finish}>Empezar <Icon name="arrow" /></PrimaryButton>
        <button className="location-note" onClick={finish}><Icon name="pin" size={20} /><span><strong>Usaremos tu ubicación</strong><small>Para mostrarte platos disponibles cerca. Puedes cambiarla cuando quieras.</small></span></button></>}
    </div>
  </div>
}

function Home({ go }: { go: (s: Screen) => void }) {
  const [filter, setFilter] = useState('Todos')
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t) }, [])
  return <div className="screen with-nav">
    <header className="home-header">
      <button className="location"><span className="location-pin"><Icon name="pin" size={18} /></span><span><small>Tu ubicación</small><strong>Cerca de ti · 1 km</strong></span><Icon name="chevron" size={17} /></button>
      <button className="avatar" onClick={() => go('profile')}>MC</button>
    </header>
    <main className="page-pad">
      <div className="hero-banner">
        <div><span className="live-dot" /> DISPONIBLES AHORA</div>
        <strong><b>12 restaurantes</b> tienen platos cerca de ti</strong>
        <button onClick={() => go('map')}>Ver en el mapa <Icon name="arrow" size={17} /></button>
        <div className="hero-plate"><img src={photos.ceviche} alt="" /></div>
      </div>
      <div className="section-heading"><div><span className="eyebrow">HOY CERCA DE TI</span><h2>¿Qué se te antoja?</h2></div><span className="count">24 platos</span></div>
      <div className="chip-scroll">{['Todos','Criollo','Pollo','Pescado','Chifa','Vegetariano','Postres'].map(x => <Chip key={x} active={x === filter} onClick={() => setFilter(x)}>{x}</Chip>)}</div>
      <div className="dish-list">{loading ? [1,2].map(x => <div className="skeleton-card" key={x}><div/><span/><i/></div>) : dishes.map((dish, i) => <DishCard key={dish.name} dish={dish} onClick={() => go(i === 0 ? 'dish' : 'restaurant')} />)}</div>
    </main>
    <BottomNav screen="home" go={go} />
  </div>
}

function MapScreen({ go }: { go: (s: Screen) => void }) {
  const [radius, setRadius] = useState('1 km')
  const [selected, setSelected] = useState(true)
  return <div className="screen map-screen">
    <div className="map-canvas">
      <div className="map-grid" />
      <div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" />
      <span className="street s1">Av. Arequipa</span><span className="street s2">Jr. Risso</span><span className="street s3">Av. Javier Prado</span>
      <div className="park">Parque Castilla</div>
      {[['pin-a','3','SP'],['pin-b','2','DP'],['pin-c','5','RM'],['pin-d','1','PM']].map(([c,n,l]) => <button className={`map-pin ${c}`} key={c} onClick={() => setSelected(true)}><span>{l}</span><b>{n}</b></button>)}
      <div className="user-dot"><span /></div>
    </div>
    <div className="map-header"><button className="icon-btn" onClick={() => go('home')}><Icon name="back" /></button><div><strong>Platos cerca</strong><small>Lince, Lima</small></div><button className="icon-btn"><Icon name="user" /></button></div>
    <div className="radius-control">{['500 m','1 km','2 km'].map(r => <button key={r} className={radius === r ? 'active' : ''} onClick={() => setRadius(r)}>{r}</button>)}</div>
    {selected && <div className="restaurant-sheet">
      <div className="sheet-handle" />
      <div className="restaurant-mini-head"><div className="rest-logo">SA</div><div><strong>Sazón de la Abuela</strong><span><Icon name="star" size={14} filled /> 4.8 · 350 m · Cierra 9:45 p. m.</span></div><button onClick={() => setSelected(false)}><Icon name="close" size={18} /></button></div>
      <div className="mini-dishes">{dishes.slice(0,2).map(d => <button key={d.name} onClick={() => go('dish')}><img src={d.img} alt="" /><span><strong>{d.name}</strong><small>Quedan {d.left}</small><b>S/ {d.price}</b></span></button>)}</div>
      <PrimaryButton onClick={() => go('restaurant')}>Ver 3 platos disponibles</PrimaryButton>
    </div>}
    <BottomNav screen="map" go={go} />
  </div>
}

function Restaurant({ go }: { go: (s: Screen) => void }) {
  return <div className="screen detail-screen">
    <div className="restaurant-cover"><img src={photos.restaurant} alt="Sazón de la Abuela" /><div className="cover-fade"/><TopBar onBack={() => go('home')} right={<button className="icon-btn"><Icon name="heart" /></button>} /></div>
    <main className="restaurant-content page-pad">
      <div className="rest-logo large">SA</div><h1>Sazón de la Abuela</h1>
      <div className="rating"><Icon name="star" size={16} filled /> 4.8 <span>(126 reseñas)</span> · Criollo</div>
      <div className="info-card"><div><Icon name="pin" /><span><strong>Av. Arequipa 1850, Lince</strong><small>A 350 m de ti</small></span></div><div><Icon name="clock" /><span><strong>Recojo hasta 9:45 p. m.</strong><small className="urgent">Cierra en 45 min</small></span></div></div>
      <div className="section-heading"><div><span className="eyebrow">RECIÉN PUBLICADOS</span><h2>Disponibles ahora</h2></div><span className="count">7 porciones</span></div>
      <div className="compact-list">{dishes.slice(0,3).map(d => <button key={d.name} onClick={() => go('dish')}><img src={d.img} alt={d.name}/><span><strong>{d.name}</strong><small>Quedan {d.left} · -50 %</small><b>S/ {d.price} <del>S/ {d.old}</del></b></span><Icon name="chevron" size={18}/></button>)}</div>
      <h2 className="reviews-title">Lo que dicen</h2>
      <div className="review"><div><span className="avatar small">CV</span><strong>Carla V.</strong><span className="stars">★★★★★</span></div><p>Todo estuvo delicioso y la porción fue generosa. Recogerlo fue rapidísimo.</p></div>
    </main>
  </div>
}

function DishDetail({ go }: { go: (s: Screen) => void }) {
  const [qty, setQty] = useState(1)
  return <div className="screen dish-detail">
    <div className="dish-hero"><img src={photos.aji} alt="Ají de gallina" /><div className="cover-fade"/><TopBar onBack={() => go('home')} right={<button className="icon-btn"><Icon name="heart" /></button>} /><span className="hero-badge">-50 % HOY</span></div>
    <main className="page-pad dish-info">
      <span className="eyebrow">Sazón de la Abuela</span><h1>Ají de gallina</h1>
      <div className="price-detail"><strong>S/ 8.00</strong><del>S/ 16.00</del><span>Ahorras S/ 8</span></div>
      <p className="description">Clásico ají de gallina cremoso, acompañado de arroz, papa amarilla, huevo y aceituna.</p>
      <div className="stock-banner"><span><Icon name="clock" /> Solo quedan <strong>3 porciones</strong></span><small>Preparado hoy</small></div>
      <h3>Alérgenos</h3><div className="allergens"><span>Gluten</span><span>Lácteos</span><span>Huevo</span><button><Icon name="info" size={17}/></button></div>
      <div className="pickup-card"><div className="pickup-icon"><Icon name="bag" /></div><div><small>VENTANA DE RECOJO</small><strong>9:00 – 9:45 p. m.</strong><span><Icon name="pin" size={14}/> Av. Arequipa 1850 · 350 m</span></div></div>
      <div className="quantity-row"><div><strong>¿Cuántas porciones?</strong><small>Máximo 3</small></div><div className="stepper"><button onClick={() => setQty(Math.max(1,qty-1))}><Icon name="minus" size={18}/></button><strong key={qty}>{qty}</strong><button onClick={() => setQty(Math.min(3,qty+1))}><Icon name="plus" size={18}/></button></div></div>
    </main>
    <div className="sticky-action"><PrimaryButton onClick={() => go('checkout')}><span>Reservar</span><b>S/ {(8*qty).toFixed(2)}</b></PrimaryButton></div>
  </div>
}

function TermsSheet({ close }: { close: () => void }) {
  return <div className="modal-backdrop" onClick={close}><div className="terms-sheet" onClick={e => e.stopPropagation()}><div className="sheet-handle"/><button className="close-sheet" onClick={close}><Icon name="close"/></button><span className="eyebrow">COMPRA RESPONSABLE</span><h2>Términos de excedentes</h2><p>Los platos publicados son alimentos preparados durante el día y conservados bajo responsabilidad del restaurante.</p><h3>Antes de comprar</h3><ul><li>Verifica los alérgenos y restricciones alimentarias.</li><li>Recoge dentro de la ventana indicada.</li><li>Consume el plato dentro de las próximas 2 horas.</li><li>Las compras no recogidas no son reembolsables.</li></ul><PrimaryButton onClick={close}>Entendido</PrimaryButton></div></div>
}

function Checkout({ go }: { go: (s: Screen) => void }) {
  const [accepted, setAccepted] = useState(false)
  const [method, setMethod] = useState('Yape')
  const [terms, setTerms] = useState(false)
  return <div className="screen checkout-screen">
    <TopBar title="Finaliza tu reserva" onBack={() => go('dish')} />
    <main className="page-pad">
      <div className="order-card"><img src={photos.aji} alt="" /><div><span className="eyebrow">1 PORCIÓN</span><strong>Ají de gallina</strong><small>Sazón de la Abuela</small></div><b>S/ 8.00</b></div>
      <h3>Recojo</h3><div className="pickup-summary"><div className="mini-map"><div className="mini-road"/><span><Icon name="pin" size={16}/></span></div><div><strong>Hoy, 9:00 – 9:45 p. m.</strong><small>Av. Arequipa 1850, Lince</small><button>Ver indicaciones</button></div></div>
      <h3>Método de pago</h3><div className="payment-grid">{['Yape','Plin','Tarjeta'].map((m,i) => <button key={m} onClick={() => setMethod(m)} className={method === m ? 'active' : ''}><span className={`payment-logo p${i}`}>{i < 2 ? m[0] : <Icon name="card" size={20}/>}</span><strong>{m}</strong>{method === m && <span className="radio-check"><Icon name="check" size={13}/></span>}</button>)}</div>
      <div className="legal-card"><Icon name="info" /><div><strong>Sobre este plato</strong><p>Fue preparado hoy y se ofrece como excedente del día. Te recomendamos consumirlo dentro de las próximas 2 horas. Revisa los alérgenos indicados. El restaurante es responsable de la calidad e inocuidad del alimento.</p><button onClick={() => setTerms(true)}>Leer términos completos <Icon name="chevron" size={15}/></button></div></div>
      <button className={`checkbox-row ${accepted ? 'checked' : ''}`} onClick={() => setAccepted(!accepted)}><span>{accepted && <Icon name="check" size={16}/>}</span><p>Leí y acepto el aviso legal y los términos de compra de excedentes.</p></button>
      <div className="totals"><div><span>Ají de gallina × 1</span><b>S/ 8.00</b></div><div><span>Tarifa de servicio</span><b>S/ 0.50</b></div><hr/><div className="total"><span>Total</span><b>S/ 8.50</b></div></div>
    </main>
    <div className="sticky-action checkout-action"><PrimaryButton disabled={!accepted} onClick={() => go('confirmation')}>{accepted ? 'Pagar S/ 8.50' : 'Acepta los términos para pagar'}</PrimaryButton><small>Pago seguro · Reserva inmediata</small></div>
    {terms && <TermsSheet close={() => setTerms(false)}/>}
  </div>
}

function QRCode() {
  const cells = useMemo(() => Array.from({length: 121},(_,i) => ((i*7+i*i*3+11)%9)<4),[])
  return <div className="qr">{cells.map((on,i) => <i key={i} className={on ? 'on' : ''}/>)}</div>
}

function Confirmation({ go }: { go: (s: Screen) => void }) {
  return <div className="screen confirmation">
    <div className="confetti">{Array.from({length: 24},(_,i) => <i key={i} style={{'--i': i} as React.CSSProperties}/>)}</div>
    <div className="success-icon"><Icon name="check" size={32}/></div><span className="eyebrow">RESERVA CONFIRMADA</span><h1>¡Salvaste un plato!</h1><p>Muéstrale este código al restaurante cuando recojas tu pedido.</p>
    <div className="qr-card"><QRCode/><strong>UP–2847</strong><span>Sazón de la Abuela</span></div>
    <div className="countdown"><small>RECOGE ANTES DE LAS 9:45 P. M.</small><strong>00 <i>:</i> 38 <i>:</i> 24</strong><span>horas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seg</span></div>
    <div className="direction-card"><div className="pickup-icon"><Icon name="pin"/></div><div><strong>Av. Arequipa 1850</strong><small>Lince · A 350 m de ti</small></div><button><Icon name="route"/></button></div>
    <div className="impact-card"><Icon name="leaf"/><div><strong>Tu impacto de hoy</strong><span>Evitaste desperdiciar <b>450 g</b> de comida y ahorraste <b>S/ 8</b>.</span></div></div>
    <div className="confirmation-actions"><PrimaryButton onClick={() => go('orders')}>Ver mi pedido</PrimaryButton><button onClick={() => go('home')}>Volver al inicio</button></div>
  </div>
}

function Orders({ go }: { go: (s: Screen) => void }) {
  const [tab,setTab] = useState('Activos')
  return <div className="screen with-nav"><div className="simple-header"><div><span className="eyebrow">TUS RESCATES</span><h1>Mis pedidos</h1></div><button className="icon-btn"><Icon name="info"/></button></div><main className="page-pad">
    <div className="segmented"><button className={tab==='Activos'?'active':''} onClick={()=>setTab('Activos')}>Activos <span>1</span></button><button className={tab==='Anteriores'?'active':''} onClick={()=>setTab('Anteriores')}>Anteriores</button></div>
    {tab === 'Activos' ? <div className="active-order"><div className="order-status"><span className="live-dot"/> LISTO PARA RECOGER <small>Hoy</small></div><div className="active-food"><img src={photos.aji}/><div><strong>Ají de gallina</strong><span>Sazón de la Abuela</span><b>1 porción · S/ 8.50</b></div></div><div className="pickup-time"><Icon name="clock"/><div><small>RECOGE ENTRE</small><strong>9:00 – 9:45 p. m.</strong></div><span>38 min</span></div><button className="qr-button" onClick={() => go('confirmation')}><span className="qr-small"><QRCode/></span><span><strong>Mostrar código QR</strong><small>UP–2847</small></span><Icon name="chevron"/></button></div> :
      <div className="past-list">{dishes.slice(1,4).map((d,i)=><div key={d.name}><img src={d.img}/><span><strong>{d.name}</strong><small>{i+2} Jun · {d.restaurant}</small><b>S/ {d.price}</b></span><span className="saved">Salvado</span></div>)}</div>}
  </main><BottomNav screen="orders" go={go}/></div>
}

function Profile({ go }: { go: (s: Screen) => void }) {
  return <div className="screen with-nav"><div className="profile-hero"><button className="settings">•••</button><div className="profile-avatar">MC<span><Icon name="leaf" size={16}/></span></div><h1>María Camila</h1><p>Rescatando comida desde junio 2026</p></div><main className="page-pad profile-main">
    <span className="eyebrow">TU IMPACTO</span><h2>Pequeñas acciones, gran cambio</h2><div className="stats-grid"><div><strong>18</strong><span>platos salvados</span></div><div><strong>8.1</strong><span>kg de comida</span></div><div><strong>S/ 146</strong><span>ahorrados</span></div></div>
    <div className="impact-progress"><div><Icon name="leaf"/><span><strong>¡Vas en el top 12 %!</strong><small>2 rescates más para tu próxima insignia</small></span></div><div><i/></div></div>
    <div className="section-heading"><h2>Mis insignias</h2><button>Ver todas</button></div><div className="badges"><div><span>01</span><strong>Primer rescate</strong><small>Desbloqueada</small></div><div><span>10</span><strong>Héroe anti-desperdicio</strong><small>Desbloqueada</small></div><div className="locked"><span>25</span><strong>Impacto real</strong><small>7 platos más</small></div></div>
    <div className="profile-menu"><button><Icon name="user"/><span>Datos personales</span><Icon name="chevron"/></button><button><Icon name="card"/><span>Métodos de pago</span><Icon name="chevron"/></button><button onClick={() => go('restaurantPanel')}><Icon name="home"/><span>Soy restaurante</span><b>Cambiar modo</b><Icon name="chevron"/></button></div>
  </main><BottomNav screen="profile" go={go}/></div>
}

function RestaurantPanel({ go }: { go: (s: Screen) => void }) {
  const [open,setOpen] = useState(true)
  return <div className="screen with-nav restaurant-mode"><div className="simple-header"><div><span className="eyebrow">Sazón de la Abuela</span><h1>Buenas noches, Rosa</h1></div><span className="rest-logo">SA</span></div><main className="page-pad">
    <button className={`surplus-toggle ${open?'on':''}`} onClick={()=>setOpen(!open)}><span><small>ESTADO DE HOY</small><strong>{open?'Tengo sobrantes':'Sin sobrantes'}</strong><i>{open?'Tus platos están visibles':'Actívalo para publicar'}</i></span><b><i/></b></button>
    <div className="panel-heading"><h2>Resumen del día</h2><span>Martes, 18 Jun</span></div><div className="business-stats"><div className="featured"><small>DINERO RECUPERADO</small><strong>S/ 96.50</strong><span>+18 % vs. ayer</span></div><div><small>Publicados</small><strong>12</strong></div><div><small>Reservados</small><strong>8</strong></div><div><small>Recogidos</small><strong>6</strong></div></div>
    <div className="food-saved"><Icon name="leaf"/><span><small>COMIDA SALVADA HOY</small><strong>3.6 kg <i>equivale a 8 platos</i></strong></span></div>
    <div className="panel-heading"><h2>Recojos pendientes</h2><span className="count">2 reservas</span></div><div className="reservations"><div><span className="avatar small">MC</span><span><strong>María Camila</strong><small>Ají de gallina · 1 porción</small></span><b>9:00 – 9:45</b></div><div><span className="avatar small orange">JL</span><span><strong>José Luis</strong><small>Lomo saltado · 2 porciones</small></span><b>9:15 – 10:00</b></div></div>
  </main><BottomNav screen="restaurantPanel" go={go} restaurant/></div>
}

function Publish({ go }: { go: (s: Screen) => void }) {
  const [published,setPublished] = useState(false)
  const [allergens,setAllergens] = useState<string[]>(['Lácteos'])
  return <div className="screen with-nav restaurant-mode"><div className="simple-header"><div><span className="eyebrow">NUEVO EXCEDENTE</span><h1>Publicar plato</h1></div><button className="icon-btn" onClick={()=>go('restaurantPanel')}><Icon name="close"/></button></div><main className="page-pad publish-form">
    <button className="photo-upload"><img src={photos.aji}/><span><Icon name="camera"/> Cambiar foto</span></button>
    <label>Nombre del plato<input defaultValue="Ají de gallina"/></label>
    <div className="form-row"><label>Porciones<input type="number" defaultValue="3"/></label><label>Precio original<div className="money-input"><span>S/</span><input defaultValue="16.00"/></div></label></div>
    <label>Precio rebajado<div className="money-input recommended"><span>S/</span><input defaultValue="8.00"/><b>-50 %</b></div><small className="hint"><Icon name="leaf" size={14}/> Precio ideal sugerido por Último Plato</small></label>
    <label>Alérgenos</label><div className="allergens selectable">{['Gluten','Lácteos','Huevo','Frutos secos'].map(a=><button key={a} className={allergens.includes(a)?'active':''} onClick={()=>setAllergens(allergens.includes(a)?allergens.filter(x=>x!==a):[...allergens,a])}>{allergens.includes(a)&&<Icon name="check" size={14}/>} {a}</button>)}</div>
    <label>Ventana de recojo<div className="time-inputs"><span>Hoy, 9:00 p. m.</span><Icon name="arrow" size={17}/><span>9:45 p. m.</span></div></label>
    <PrimaryButton onClick={()=>{setPublished(true);setTimeout(()=>go('restaurantPanel'),900)}}>{published?<><Icon name="check"/> ¡Plato publicado!</>:<>Publicar ahora <Icon name="arrow"/></>}</PrimaryButton>
  </main><BottomNav screen="publish" go={go} restaurant/></div>
}

function Scanner({ go }: { go: (s: Screen) => void }) {
  const [success,setSuccess] = useState(false)
  return <div className="screen scanner-screen"><div className="scanner-bg"><TopBar title="Validar recojo" onBack={()=>go('restaurantPanel')}/><div className="scanner-copy"><span className="eyebrow">ESCANEA EL CÓDIGO</span><h1>Apunta al QR del cliente</h1><p>La entrega se confirmará automáticamente.</p></div><div className="scan-frame"><i/><i/><i/><i/><span/></div><button className="manual-code" onClick={()=>setSuccess(true)}>Ingresar código manualmente</button></div>
    <div className="scanner-controls"><button><Icon name="camera"/> Linterna</button><span>Cámara lista</span><button onClick={()=>setSuccess(true)}><Icon name="scan"/> Simular QR</button></div>
    {success&&<div className="scan-success"><div className="success-icon"><Icon name="check" size={30}/></div><span className="eyebrow">ENTREGA CONFIRMADA</span><h2>¡Recojo exitoso!</h2><p>Ají de gallina · 1 porción<br/><strong>María Camila</strong></p><div className="impact-card"><Icon name="leaf"/><div><strong>450 g salvados</strong><span>Gracias por ser parte del cambio.</span></div></div><PrimaryButton onClick={()=>{setSuccess(false);go('restaurantPanel')}}>Volver al panel</PrimaryButton></div>}
    <BottomNav screen="scan" go={go} restaurant/>
  </div>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const go = (next: Screen) => { setScreen(next); window.scrollTo({top: 0, behavior: 'smooth'}) }
  return <div className="app-shell">
    {screen === 'onboarding' && <Onboarding finish={() => go('home')}/>}
    {screen === 'home' && <Home go={go}/>}
    {screen === 'map' && <MapScreen go={go}/>}
    {screen === 'restaurant' && <Restaurant go={go}/>}
    {screen === 'dish' && <DishDetail go={go}/>}
    {screen === 'checkout' && <Checkout go={go}/>}
    {screen === 'confirmation' && <Confirmation go={go}/>}
    {screen === 'orders' && <Orders go={go}/>}
    {screen === 'profile' && <Profile go={go}/>}
    {screen === 'restaurantPanel' && <RestaurantPanel go={go}/>}
    {screen === 'publish' && <Publish go={go}/>}
    {screen === 'scan' && <Scanner go={go}/>}
  </div>
}
