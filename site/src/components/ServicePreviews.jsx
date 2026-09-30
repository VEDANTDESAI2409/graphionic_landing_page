/* ============================================================
   Miniature UI previews that sit in the lower half of each
   service card. Pure inline SVG — no images, scales crisply.
   Each is drawn on a 260 x 210 canvas, anchored bottom-left.
   ============================================================ */

const C = {
  ink: '#0F1B2E', slate: '#5B7089', line: '#E4EBF3',
  blue: '#007AFF', sky: '#8FC6FF', green: '#22C55E',
  amber: '#F5A623', violet: '#8B5CF6', paper: '#FFFFFF',
};

const Frame = ({ children }) => (
  <svg viewBox="0 0 260 210" preserveAspectRatio="xMinYMax slice" className="svc-prev-svg">
    {children}
  </svg>
);

/* 1 — Web & E-commerce : product page card */
export const PrevEcom = () => (
  <Frame>
    <g>
      <rect x="14" y="16" width="246" height="200" rx="12" fill={C.paper} stroke={C.line} />
      <rect x="14" y="16" width="246" height="22" rx="12" fill={C.ink} />
      <rect x="14" y="30" width="246" height="8" fill={C.ink} />
      <circle cx="26" cy="27" r="2.6" fill="#4A5A70" />
      <text x="36" y="30" fontSize="7" fill="#9FB0C4" fontFamily="sans-serif">Store</text>
      <rect x="26" y="50" width="60" height="6" rx="3" fill={C.ink} opacity=".8" />
      <rect x="26" y="62" width="94" height="5" rx="2.5" fill={C.slate} opacity=".45" />
      <rect x="26" y="76" width="46" height="14" rx="7" fill={C.blue} />
      {/* headphones */}
      <g transform="translate(150 62)">
        <path d="M4 34a30 30 0 0 1 60 0" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
        <rect x="-2" y="30" width="17" height="30" rx="8" fill={C.ink} />
        <rect x="53" y="30" width="17" height="30" rx="8" fill={C.ink} />
        <rect x="1" y="34" width="11" height="22" rx="5" fill="#3B4A61" />
      </g>
      <rect x="26" y="112" width="210" height="1" fill={C.line} />
      <g>
        <rect x="26" y="126" width="62" height="52" rx="8" fill="#F1F6FC" />
        <rect x="98" y="126" width="62" height="52" rx="8" fill="#F1F6FC" />
        <rect x="170" y="126" width="62" height="52" rx="8" fill="#F1F6FC" />
        <circle cx="57" cy="146" r="9" fill={C.sky} opacity=".7" />
        <circle cx="129" cy="146" r="9" fill={C.green} opacity=".55" />
        <circle cx="201" cy="146" r="9" fill={C.amber} opacity=".55" />
        <rect x="40" y="164" width="34" height="4" rx="2" fill={C.slate} opacity=".3" />
        <rect x="112" y="164" width="34" height="4" rx="2" fill={C.slate} opacity=".3" />
        <rect x="184" y="164" width="34" height="4" rx="2" fill={C.slate} opacity=".3" />
      </g>
    </g>
  </Frame>
);

/* 2 — Web Apps : analytics dashboard */
export const PrevWebApp = () => (
  <Frame>
    <rect x="14" y="16" width="246" height="200" rx="12" fill={C.paper} stroke={C.line} />
    <rect x="14" y="16" width="70" height="200" rx="12" fill="#101B2D" />
    <rect x="72" y="16" width="12" height="200" fill="#101B2D" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="26" y={44 + i * 22} width="9" height="9" rx="2.5" fill={i === 0 ? C.blue : '#33455E'} />
        <rect x="41" y={46 + i * 22} width="28" height="5" rx="2.5" fill={i === 0 ? '#8FC6FF' : '#33455E'} />
      </g>
    ))}
    <rect x="96" y="34" width="52" height="6" rx="3" fill={C.ink} opacity=".8" />
    <rect x="96" y="52" width="66" height="40" rx="8" fill="#F1F6FC" />
    <rect x="170" y="52" width="66" height="40" rx="8" fill="#F1F6FC" />
    <text x="106" y="72" fontSize="11" fontWeight="700" fill={C.ink} fontFamily="sans-serif">12,480</text>
    <text x="180" y="72" fontSize="11" fontWeight="700" fill={C.green} fontFamily="sans-serif">$5,660</text>
    <rect x="106" y="78" width="24" height="3.5" rx="1.75" fill={C.slate} opacity=".35" />
    <rect x="180" y="78" width="24" height="3.5" rx="1.75" fill={C.slate} opacity=".35" />
    <rect x="96" y="102" width="140" height="80" rx="8" fill="#F8FBFE" stroke={C.line} />
    <path d="M106 168 L126 150 L146 158 L166 132 L186 140 L206 118 L226 126"
      fill="none" stroke={C.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M106 168 L126 150 L146 158 L166 132 L186 140 L206 118 L226 126 L226 176 L106 176 Z"
      fill={C.blue} opacity=".1" />
  </Frame>
);

/* 3 — Mobile Apps : two phones */
export const PrevMobile = () => (
  <Frame>
    <g transform="translate(22 22)">
      <rect x="0" y="8" width="90" height="186" rx="14" fill={C.paper} stroke={C.line} strokeWidth="1.5" />
      <rect x="30" y="14" width="30" height="5" rx="2.5" fill={C.line} />
      <rect x="12" y="30" width="46" height="5" rx="2.5" fill={C.ink} opacity=".8" />
      <rect x="12" y="41" width="34" height="4" rx="2" fill={C.slate} opacity=".4" />
      <rect x="12" y="56" width="66" height="34" rx="8" fill={C.blue} />
      <rect x="20" y="66" width="30" height="4" rx="2" fill="#fff" opacity=".85" />
      <rect x="20" y="75" width="42" height="4" rx="2" fill="#fff" opacity=".45" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="12" y={100 + i * 24} width="18" height="18" rx="6" fill="#EDF3FA" />
          <rect x="36" y={105 + i * 24} width="40" height="4" rx="2" fill={C.slate} opacity=".3" />
          <rect x="36" y={112 + i * 24} width="26" height="3.5" rx="1.75" fill={C.slate} opacity=".2" />
        </g>
      ))}
    </g>
    <g transform="translate(122 6)">
      <rect x="0" y="8" width="94" height="196" rx="15" fill="#101B2D" />
      <rect x="5" y="13" width="84" height="186" rx="12" fill="#16233A" />
      <rect x="32" y="18" width="30" height="5" rx="2.5" fill="#2C3C56" />
      <circle cx="47" cy="90" r="34" fill="none" stroke="#26374F" strokeWidth="8" />
      <circle cx="47" cy="90" r="34" fill="none" stroke={C.blue} strokeWidth="8"
        strokeLinecap="round" strokeDasharray="160 214" transform="rotate(-90 47 90)" />
      <text x="47" y="94" fontSize="14" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="sans-serif">7,240</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={14 + i * 24} y="146" width="18" height="18" rx="6" fill="#22304A" />
      ))}
      <rect x="14" y="174" width="66" height="5" rx="2.5" fill="#22304A" />
    </g>
  </Frame>
);

/* 4 — Automation (focal) : workflow builder */
export const PrevAutomation = () => (
  <Frame>
    <rect x="14" y="16" width="246" height="200" rx="12" fill={C.paper} stroke={C.line} />
    <rect x="14" y="16" width="42" height="200" rx="12" fill="#101B2D" />
    <rect x="46" y="16" width="10" height="200" fill="#101B2D" />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx="35" cy={44 + i * 30} r="7" fill="none" stroke={i === 0 ? C.blue : '#39485F'} strokeWidth="2" />
    ))}
    {[
      { y: 38, c: C.green, t: 'When order is placed' },
      { y: 74, c: C.blue, t: 'Send confirmation email' },
      { y: 110, c: C.amber, t: 'Update inventory' },
      { y: 146, c: C.violet, t: 'Notify team' },
    ].map((s, i) => (
      <g key={i}>
        {i > 0 && <path d={`M96 ${s.y - 10} L96 ${s.y + 2}`} stroke={C.line} strokeWidth="2" strokeLinecap="round" />}
        <rect x="74" y={s.y} width="168" height="28" rx="9" fill={C.paper} stroke={C.line} />
        <rect x="74" y={s.y} width="168" height="28" rx="9" fill={s.c} opacity=".05" />
        <rect x="84" y={s.y + 8} width="12" height="12" rx="3.5" fill={s.c} opacity=".9" />
        <text x="103" y={s.y + 18} fontSize="8" fill={C.ink} fontFamily="sans-serif">{s.t}</text>
      </g>
    ))}
  </Frame>
);

/* 5 — AI Solutions : assistant prompt list */
export const PrevAi = () => (
  <Frame>
    <rect x="14" y="16" width="246" height="200" rx="12" fill={C.paper} stroke={C.line} />
    <rect x="14" y="16" width="52" height="200" rx="12" fill="#F4F8FC" />
    <rect x="56" y="16" width="10" height="200" fill="#F4F8FC" />
    <circle cx="34" cy="38" r="7" fill={C.violet} opacity=".75" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x="24" y={58 + i * 16} width="30" height="5" rx="2.5" fill={C.slate} opacity=".22" />
    ))}
    <text x="80" y="42" fontSize="8.5" fontWeight="700" fill={C.ink} fontFamily="sans-serif">AI Assistant</text>
    <text x="80" y="66" fontSize="11" fontWeight="700" fill={C.ink} fontFamily="sans-serif">How can I help</text>
    <text x="80" y="80" fontSize="11" fontWeight="700" fill={C.ink} fontFamily="sans-serif">you today?</text>
    {['Analyze this data', 'Create a summary', 'Generate insights'].map((t, i) => (
      <g key={t}>
        <rect x="80" y={96 + i * 26} width="158" height="20" rx="7" fill="#F7FAFD" stroke={C.line} />
        <circle cx="92" cy={106 + i * 26} r="3.4" fill={C.violet} opacity=".6" />
        <text x="102" y={109 + i * 26} fontSize="7.5" fill={C.slate} fontFamily="sans-serif">{t}</text>
      </g>
    ))}
    <rect x="80" y="176" width="158" height="22" rx="11" fill="#F1F6FC" stroke={C.line} />
    <circle cx="226" cy="187" r="8" fill={C.blue} />
    <path d="M222.5 187h7M226.5 184l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </Frame>
);

/* 6 — Support : chat thread */
export const PrevSupport = () => (
  <Frame>
    <rect x="14" y="16" width="246" height="200" rx="12" fill={C.paper} stroke={C.line} />
    <g>
      <circle cx="34" cy="44" r="10" fill="#D8E4F0" />
      <circle cx="34" cy="41" r="3.6" fill="#A9BDD3" />
      <path d="M27 50a7 7 0 0 1 14 0" fill="#A9BDD3" />
      <rect x="50" y="32" width="150" height="26" rx="10" fill="#F1F6FC" />
      <text x="60" y="48" fontSize="8" fill={C.ink} fontFamily="sans-serif">Hi! How can we help you?</text>
    </g>
    <g>
      <rect x="86" y="72" width="152" height="26" rx="10" fill={C.blue} />
      <text x="96" y="88" fontSize="8" fill="#fff" fontFamily="sans-serif">I need help with my account</text>
    </g>
    <g>
      <circle cx="34" cy="124" r="10" fill={C.ink} />
      <text x="34" y="128" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="sans-serif">S</text>
      <rect x="50" y="108" width="160" height="38" rx="10" fill="#F1F6FC" />
      <text x="60" y="124" fontSize="8" fill={C.ink} fontFamily="sans-serif">Sure! I'll be happy to help</text>
      <text x="60" y="136" fontSize="8" fill={C.ink} fontFamily="sans-serif">you with that.</text>
    </g>
    <rect x="26" y="170" width="210" height="26" rx="13" fill="#F7FAFD" stroke={C.line} />
    <text x="42" y="187" fontSize="8" fill={C.slate} opacity=".6" fontFamily="sans-serif">Type a message...</text>
    <circle cx="222" cy="183" r="9" fill={C.blue} />
    <path d="M218 183h8M222.5 179.5l3.5 3.5-3.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </Frame>
);

/* 7 — SEO & Growth : traffic chart */
export const PrevSeo = () => (
  <Frame>
    <rect x="14" y="16" width="246" height="200" rx="12" fill={C.paper} stroke={C.line} />
    <text x="30" y="42" fontSize="8.5" fill={C.slate} fontFamily="sans-serif">Organic Traffic</text>
    <path d="M232 36l4 4 4-4" stroke={C.slate} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <text x="30" y="70" fontSize="19" fontWeight="700" fill={C.ink} fontFamily="sans-serif">24,892</text>
    <text x="118" y="68" fontSize="9" fontWeight="700" fill={C.green} fontFamily="sans-serif">+12.5%</text>
    <rect x="180" y="56" width="56" height="18" rx="9" fill={C.ink} />
    <text x="208" y="68" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="sans-serif">+12.5%</text>
    <path d="M30 168 C60 164 74 150 96 148 C120 146 132 132 156 124 C182 116 200 96 236 88"
      fill="none" stroke={C.green} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M30 168 C60 164 74 150 96 148 C120 146 132 132 156 124 C182 116 200 96 236 88 L236 182 L30 182 Z"
      fill={C.green} opacity=".1" />
    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
      <text key={m} x={34 + i * 40} y="198" fontSize="7" fill={C.slate} opacity=".55" fontFamily="sans-serif">{m}</text>
    ))}
  </Frame>
);

export const PREVIEWS = [
  PrevEcom, PrevWebApp, PrevMobile, PrevAutomation, PrevAi, PrevSupport, PrevSeo,
];
