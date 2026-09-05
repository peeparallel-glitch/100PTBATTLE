

// Global error catcher
window.onerror = function(message, source, lineno, colno, error) {
  const panel = document.getElementById('debug-log-panel');
  const content = document.getElementById('debug-log-content');
  if (panel && content) {
    panel.style.display = 'block';
    const div = document.createElement('div');
    div.textContent = `[${new Date().toLocaleTimeString()}] ${message} (at ${source.split('/').pop()}:${lineno}:${colno})`;
    content.appendChild(div);
  }
  console.error(message, source, lineno, colno, error);
  return false;
};


// ============================================================
//  CONSTANTS
// ============================================================

const SKILLS = {
  none: { name: 'なし', icon: '—', desc: 'スキルを装備しない。', type: 'パッシブ', cat: 'その他', badge: 'none', isInitial: true },
  
  // 【初期解放スキル（16個）】
  shuriken: { name: '魔力の手裏剣', icon: '🌀', desc: '自身の攻撃力の75%相当の威力で、相手の防御の構えを完全に無視してダイレクトに突き立てる。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', isInitial: true },
  midare: { name: 'みだれうち', icon: '🏹', desc: '自身の運命力に応じた確率で、目にも留まらぬ2連撃を繰り出す。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', isInitial: true },
  weakmaker: { name: 'ウィークメーカー', icon: '📉', desc: '痛烈な一撃を見舞うと同時に、相手の最も秀でた能力を数ターンの間削ぎ落とす。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', isInitial: true },
  heal: { name: 'ヒール', icon: '💖', desc: '標準的な治癒魔術。自身の最大生命力の30%を回復する。', type: 'アクティブ', cat: '回復系', badge: 'heal', isInitial: true },
  regen: { name: 'リジェネレート', icon: '💧', desc: '3ターンの間、ターン開始時に自身の最大生命力の8%ずつ再生し続ける。', type: 'アクティブ', cat: '回復系', badge: 'heal', isInitial: true },
  soulshare: { name: 'ソウルシェア', icon: '🧪', desc: '相手の生命力が己を上回る時、その因果の糸を手繰り寄せて生命力を10奪い取る。', type: 'アクティブ', cat: '回復系', badge: 'heal', isInitial: true },
  teppeki: { name: '鉄壁の構え', icon: '🧱', desc: '数ターンの間、身構えることで自身の防御能力を倍加させる。', type: 'アクティブ', cat: '防御系', badge: 'defense', isInitial: true },
  enmaku: { name: '煙幕', icon: '🌫️', desc: '視界を遮る煙を巻き散らし、数ターンの間、相手の攻撃や致命の一撃の命中率を半減させる。', type: 'アクティブ', cat: '防御系', badge: 'defense', isInitial: true },
  paperarmor: { name: '紙装甲の呪い', icon: '📜', desc: '不吉な呪言。数ターンの間、相手の身に纏う守りの力を半分に低下させる。', type: 'アクティブ', cat: '補助系', badge: 'support', isInitial: true },
  strengthen: { name: '筋力強化', icon: '💪', desc: '肉体のリミッターを一時的に解除し、数ターンの間、自身の攻撃威力を1.5倍にする。', type: 'アクティブ', cat: '補助系', badge: 'support', isInitial: true },
  slownurse: { name: '鈍足の呪い', icon: '⏳', desc: '大気の枷。数ターンの間、相手の身のこなし（素早さ）を大きく引き下げる。', type: 'アクティブ', cat: '補助系', badge: 'support', isInitial: true },
  draw: { name: 'ドローイング', icon: '🎨', desc: '戦場の時間を一時的に凍結させ、このターンはお互いに一切の干渉（ダメージ）を無効化する。', type: 'アクティブ', cat: 'その他', badge: 'special', isInitial: true },
  toge: { name: 'トゲトゲの甲羅', icon: '🌵', desc: '（自動発動）衝撃を受けた際、その反動で一度だけ相手の足留め（素早さ減衰）を行う。', type: 'パッシブ', cat: '防御系', badge: 'defense', isInitial: true },
  secondwind: { name: 'セカンド風', icon: '🌬️', desc: '（自動発動）生命力が残り4分の1以下になった刹那、防衛本能が働き生命力を10回復する。', type: 'パッシブ', cat: '回復系', badge: 'heal', isInitial: true },
  firstwind: { name: '最速の風', icon: '🍃', desc: '（自動発動）追い風を纏い、最初の2ターンの間のみ驚異的な先制判定（素早さ+100）を得る。', type: 'パッシブ', cat: '補助系', badge: 'support', isInitial: true },
  shuffle: { name: 'ステータス・シャッフル', icon: '🔀', desc: '（自動発動）初手のみ発動。因果を歪め、この戦闘中お互いの「素早さ」の数値を完全にストップ（入れ替え）する。', type: 'パッシブ', cat: 'その他', badge: 'special', isInitial: true },

  // 【リーグ優勝景品スキル（21個：ミステリー枠）】
  // ※ 秘伝書対応属性：
  //   - 攻撃の秘伝書 (attack): 6個
  //   - 防御の秘伝書 (defense): 7個
  //   - 特殊の秘伝書 (special): 8個
  gigabreak: { name: 'ギガブレイク', icon: '⚡', desc: '自身の物理攻撃力に、秘められた『運』の強さを上乗せして叩き込む絶対破断の一撃。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  moroha: { name: '諸刃の剣', icon: '🩸', desc: '自身の攻撃力を2倍にして放つ凄絶な一撃。ただし、反動として己の最大生命力の3割を失う。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  sutemi: { name: '捨て身の突撃', icon: '💥', desc: '次ターンの行動を最優先（絶対先手）にし、守り無視の痛撃を放つ。ただし代償としてそのターンは無防備（防御0）となる。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  ichigeki: { name: '一撃必殺', icon: '🎯', desc: '命中率は極めて低いが、宿れば相手の命を吹き飛ばすか、あるいは瀕死（残りHP1）に追い込むロマンの極み。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  charge: { name: 'ハイパーチャージ', icon: '🔋', desc: '1ターン精神を統一して行動をパスする代わりに、次ターンの攻撃威力を3倍に膨れ上がらせる。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  haisui: { name: '背水の陣', icon: '🔥', desc: '己の生命力が半分以下の窮地にて、一度だけ守りを貫通する確定の致命（クリティカル）を放つ。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },

  daibogyo: { name: '大防御', icon: '🛡️', desc: '大半のダメージ（80%）をカットする絶対の構え。2ターンの間効果が継続する。', type: 'アクティブ', cat: '防御系', badge: 'defense', scrollType: 'defense' },
  fudo: { name: '不動の構え', icon: '🏔️', desc: '如何なる致命の理（防御無視）をもシャットアウトし、ただの通常攻撃として受け流す不屈の構え。', type: 'アクティブ', cat: '防御系', badge: 'defense', scrollType: 'defense' },
  shield: { name: 'エネルギーシールド', icon: '🔮', desc: '自身の『運』の数値に呼応した、ダメージを肩代わりする魔力の障壁を自らに展開する。', type: 'アクティブ', cat: '防御系', badge: 'defense', scrollType: 'defense' },
  吸血: { name: '吸血の牙', icon: '🦇', desc: '吸血鬼の如き一撃。このターン相手に与えた損害の半分を、そのまま自身の生命力として吸収する。', type: 'アクティブ', cat: '回復系', badge: 'heal', scrollType: 'defense' },
  pray: { name: '運命の祈り', icon: '🌟', desc: '天に祈りを捧げる。自身の『運』の数値そのものを奇跡の癒やしとして生命力に変える。', type: 'アクティブ', cat: '回復系', badge: 'heal', scrollType: 'defense' },
  fukutsu: { name: '不屈の闘志', icon: '🦁', desc: '生命力残り1 of 極限状態でのみ使用可能。生命力を8割まで大回復させるが、次ターンの攻撃力が鈍る。', type: 'アクティブ', cat: '回復系', badge: 'heal', scrollType: 'defense' },
  migawari: { name: '身代わり人形', icon: '🧸', desc: '（自動発動）命を失うほどの致命傷を受けた際、一度だけ身代わりが砕け散り生命力1で戦場に踏みとどまる。', type: 'パッシブ', cat: '防御系', badge: 'defense', scrollType: 'defense' },

  weightdown: { name: 'ウェイトダウン', icon: '⚓', desc: '相手の頑強さ（防御力）をそのまま重さに変換し、その数値分だけ相手の素早さを引き下げる（重装甲対策）。', type: 'アクティブ', cat: '補助系', badge: 'support', scrollType: 'special' },
  overclock: { name: 'オーバークロック', icon: '⚙️', desc: '2ターンの間、自身の身のこなし（素早さ）を2倍に跳ね上げる。ただし、過負荷により効果終了時に生命力が5減少する。', type: 'アクティブ', cat: '補助系', badge: 'support', scrollType: 'special' },
  shadowstep: { name: 'シャドーステップ', icon: '👣', desc: '数ターンの間、自身の残像を残すことで、相手の攻撃を高確率で回避する。', type: 'アクティブ', cat: '補助系', badge: 'support', scrollType: 'special' },
  swap: { name: '等価交換', icon: '⚖️', desc: '禁忌とされる生命の天秤。お互いの現在生命力をそのまま入れ替える。起死回生の光となるか、自滅の闇となるか。', type: 'アクティブ', cat: 'その他', badge: 'special', scrollType: 'special' },
  jackpot: { name: 'ジャックポット', icon: '🎰', desc: '相手より『運』が勝っている場合、このターンの自身の攻勢をすべて確定の致命（クリティカル）へと変える。', type: 'アクティブ', cat: 'その他', badge: 'special', scrollType: 'special' },
  copy: { name: 'コピーキャット', icon: '🐱', desc: '鏡の如き業。相手が直前のターンに発動したスキルを、そのまま自分の能力として模倣し発動する。', type: 'アクティブ', cat: 'その他', badge: 'special', scrollType: 'special' },
  amanajaku: { name: '天邪鬼', icon: '🎭', desc: 'このターンのみ戦場の理を反転させる。自身の力が弱いほど、相手の守りが堅いほど、生じる衝撃は肥大化する。', type: 'アクティブ', cat: 'その他', badge: 'special', scrollType: 'special' },
  reverse: { name: 'リバースルーム', icon: '🌀', desc: '3ターンの間、時空を歪めて「身のこなしが遅い者」から先に行動できるようになる奇妙な空間を展開する。', type: 'アクティブ', cat: 'その他', badge: 'special', scrollType: 'special' },
  parry: { name: 'パリィ', icon: '⚔️', desc: '（自動発動）相手が自分より俊敏である場合、その初撃（1発目）のみ100%の確率で完全に受け流して無効化する。', type: 'パッシブ', cat: '防御系', badge: 'defense', scrollType: 'special' },
  fortress: { name: '最後の砦', icon: '🏰', desc: '（自動発動）自身の生命力が2割以下に陥った瞬間、自動で1ターンのみあらゆる損害を無効化する無敵状態と化す。', type: 'パッシブ', cat: '防御系', badge: 'defense', scrollType: 'special' },
  recycle: { name: 'リサイクル', icon: '♻️', desc: '（自動発動）相手がスキルを放った直後にトリガー。そのスキルによって自分が受けた損害の半分を即座に修復（回復）する。', type: 'パッシブ', cat: '回復系', badge: 'heal', scrollType: 'special' },
  fdice: { name: 'フォーチュンダイス', icon: '🎲', desc: '（自動発動）戦闘開始時に運命のダイスを振る。自身の『運』の数値がランダムで大きく上下に変動する。', type: 'パッシブ', cat: '補助系', badge: 'support', scrollType: 'special' },
  pressure: { name: 'プレッシャー', icon: '👁️', desc: '（自動発動）戦闘開始時、相手の『運』が自分より低い場合、圧倒的な覇気で相手の初手の行動を強制的にパス（怯え）させる。', type: 'パッシブ', cat: '補助系', badge: 'support', scrollType: 'special' },

  // --- 追加された微妙・ハズレ寄り9スキル ---
  intimidate: { name: '威嚇のポーズ', icon: '🦁', desc: '（自動発動）戦闘開始時、10%の確率で相手の攻撃力を1減少させる。', type: 'パッシブ', cat: '補助系', badge: 'support', scrollType: 'attack' },
  playdead: { name: '死んだふり', icon: '💤', desc: '（自動発動）自身の生命力が10%以下になった際、次の1ターンお互いを行動不能にする。', type: 'パッシブ', cat: 'その他', badge: 'special', scrollType: 'defense' },
  particularity: { name: '無駄なこだわり', icon: '📐', desc: '（自動発動）自身のいずれかのステータスが偶数の時のみ、相手に与えるダメージが5%増加する。', type: 'パッシブ', cat: '攻撃系', badge: 'attack', scrollType: 'special' },
  poorcounter: { name: '未熟なカウンター', icon: '🔁', desc: '（自動発動）被弾時、5%の確率で受けたダメージの10%を反射する。', type: 'パッシブ', cat: '防御系', badge: 'defense', scrollType: 'defense' },
  heavyatk: { name: '大振り', icon: '💪', desc: '（自動発動）戦闘開始時、自身の攻撃力が15%増加するが、代わりに素早さが30%減少する。', type: 'パッシブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  luckstrike: { name: '運頼みのひと突き', icon: '🎲', desc: '自身の攻撃力に、自身の「運」の数値をそのまま固定の追加ダメージとして上乗せして突く。', type: 'アクティブ', cat: '攻撃系', badge: 'attack', scrollType: 'attack' },
  selfsatisfaction: { name: '自己満足', icon: '✨', desc: '（自動発動）敵モンスターを撃破した瞬間に、自身の生命力を1だけ回復する。', type: 'パッシブ', cat: '回復系', badge: 'heal', scrollType: 'special' },
  blankshot: { name: '空砲', icon: '💨', desc: '1ターン目の攻撃時のみ発動可能。ダメージを与えない代わりに、相手の防御力を5%低下させる。', type: 'アクティブ', cat: '補助系', badge: 'support', scrollType: 'special' },
  glassshield: { name: 'ガラスの盾', icon: '🛡️', desc: '（自動発動）戦闘開始時に展開。最初の1回目の被弾のみ防御力が1.2倍になるが、以降は防御力が10%低下する。', type: 'パッシブ', cat: '防御系', badge: 'defense', scrollType: 'defense' },
};

const STAT_COLORS = { hp:'#10b981', attack:'#ef4444', defense:'#3d9be9', speed:'#f59e0b', luck:'#a855f7' };
const STAT_LABELS = { hp:'❤️ HP', attack:'⚔️ 攻撃', defense:'🛡️ 防御', speed:'💨 素早', luck:'⭐ 運' };
const STAT_MINS   = { hp:1, attack:1, defense:0, speed:0, luck:0 };
const STAT_MAXS   = { hp:97, attack:97, defense:98, speed:98, luck:98 };
const STAT_KEYS   = ['hp','attack','defense','speed','luck'];
const MONSTER_ICONS = ['🟦','🟧','🟩','🟪','🟥','⬛','🔵','🔴','🟡','⚪'];

// ============================================================
//  MONSTER TYPES & BONUS (9系統)
// ============================================================
const MONSTER_TYPES = {
  dragon: { label:'ドラゴン系', icon:'🐉', color:'#ef4444',
    bonus:{ hp:0, attack:10, defense:0, speed:0, luck:0 },
    base:{ hp:1, attack:11, defense:0, speed:0, luck:0 },
    names:['アルファドラゴン','インフェルノス','オメガカイザー'] },
  golem: { label:'ゴーレム系', icon:'🗿', color:'#3d9be9',
    bonus:{ hp:0, attack:0, defense:10, speed:0, luck:0 },
    base:{ hp:1, attack:1, defense:10, speed:0, luck:0 },
    names:['ストーンコング','ジェイドガーディアン','ギガストーン'] },
  bird: { label:'鳥・飛空系', icon:'🦅', color:'#00d4ff',
    bonus:{ hp:0, attack:5, defense:0, speed:5, luck:0 },
    base:{ hp:1, attack:6, defense:0, speed:5, luck:0 },
    names:['ハーピィクイーン','ガルーダ','グリフォニクス'] },
  beast: { label:'獣（魔獣）系', icon:'🦁', color:'#f59e0b',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:10 },
    base:{ hp:1, attack:1, defense:0, speed:0, luck:10 },
    names:['サーベルタイガー','キマイラロード','フェンリル'] },
  undead: { label:'アンデッド系', icon:'💀', color:'#a855f7',
    bonus:{ hp:10, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:11, attack:1, defense:0, speed:0, luck:0 },
    names:['マミースミス','ファントムナイト','デスサイズ'] },
  slime: { label:'スライム系', icon:'🟢', color:'#22c55e',
    bonus:{ hp:5, attack:0, defense:5, speed:0, luck:0 },
    base:{ hp:6, attack:1, defense:5, speed:0, luck:0 },
    names:['スライム','キングスライム','ゴッドゼリー'] },
  devil: { label:'悪魔（デビル）系', icon:'😈', color:'#ec4899',
    bonus:{ hp:0, attack:5, defense:5, speed:0, luck:0 },
    base:{ hp:1, attack:6, defense:5, speed:0, luck:0 },
    names:['プチデビル','サキュバス','ベルゼバブ'] },
  plant: { label:'植物（自然）系', icon:'🌿', color:'#84cc16',
    bonus:{ hp:0, attack:0, defense:5, speed:0, luck:5 },
    base:{ hp:1, attack:1, defense:5, speed:0, luck:5 },
    names:['マンドラゴラ','アルラウネ','世界樹の眷属'] },
  metal: { label:'メタル（機械）系', icon:'⚙️', color:'#64748b',
    bonus:{ hp:0, attack:0, defense:0, speed:10, luck:0 },
    base:{ hp:1, attack:1, defense:0, speed:10, luck:0 },
    names:['アイアンギガ','メタルビット','ジェノサイダー'] },
  // === 追加5系統（武舞台ショップ解放枠） ===
  robo: { label:'ロボ系', icon:'🤖', color:'#60a5fa', series:'robo',
    bonus:{ hp:0, attack:5, defense:5, speed:0, luck:0 },
    base:{ hp:1, attack:6, defense:5, speed:0, luck:0 },
    names:['セイバー・ブルー','アイアン・トルーパー','アーク・オーロラ'] },
  god: { label:'神系', icon:'⚡', color:'#fbbf24', series:'shin',
    bonus:{ hp:0, attack:0, defense:0, speed:5, luck:5 },
    base:{ hp:1, attack:1, defense:0, speed:5, luck:5 },
    names:['アテナ','ゼウス','アヌビス'] },
  dinosaur: { label:'恐竜系', icon:'🦖', color:'#dc2626', series:'dinosaur',
    bonus:{ hp:5, attack:5, defense:0, speed:0, luck:0 },
    base:{ hp:6, attack:6, defense:0, speed:0, luck:0 },
    names:['ティラノス','トリケラトン','プテラノドン'] },
  toy: { label:'ぬいぐるみ系', icon:'🧸', color:'#f472b6', series:'toy',
    bonus:{ hp:5, attack:0, defense:0, speed:0, luck:5 },
    base:{ hp:6, attack:1, defense:0, speed:0, luck:5 },
    names:['クマさんパペット','呪いのウサギ','ネコぬぐるみ'] },
    names:[] },
  ghost: { label:'おばけ系', icon:'👻', color:'#c084fc', series:'ghost',
    bonus:{ hp:0, attack:0, defense:5, speed:5, luck:0 },
    base:{ hp:1, attack:1, defense:5, speed:5, luck:0 },
    names:[] },
  other: { label:'その他', icon:'⭐', color:'#94a3b8',
    bonus:{ hp:2, attack:2, defense:2, speed:2, luck:2 },
    base:{ hp:3, attack:3, defense:2, speed:2, luck:2 },
    names:[], hidden:true },
};

// ============================================================
//  ADDITIONAL MONSTERS & IMAGE MAPPINGS (IMG3)
// ============================================================
const ADDITIONAL_MONSTER_IMAGES = {
  // ロボシリーズ
  'セイバー・ブルー': 'IMG3/01seiva.png',
  'アイアン・トルーパー': 'IMG3/02aian.png',
  'アーク・オーロラ': 'IMG3/03a-ku.png',
  // 神シリーズ
  'アテナ': 'IMG3/04atena.jpg',
  'ゼウス': 'IMG3/05zeus.jpg',
  'アヌビス': 'IMG3/06erumes.jpg',
  // 恐竜シリーズ
  'ティラノス': 'IMG3/07thirano.jpg',
  'トリケラトン': 'IMG3/08torikeran.jpg',
  'プテラノドン': 'IMG3/09putera.jpg',
  // ぬいぐるみシリーズ
  'クマさんパペット': 'IMG3/10kumapape.jpg',
  '呪いのウサギ': 'IMG3/11usagi.jpg',
  'ネコぬぐるみ': 'IMG3/12neko.jpg'
};

const additionalMonsters = [
  // ロボシリーズ
  { id: 'm_robo_01', name: 'セイバー・ブルー', category: 'ロボ', systemType: 'ロボ系', monsterClass: 'セイバー・ブルー', image: 'IMG3/01seiva.png' },
  { id: 'm_robo_02', name: 'アイアン・トルーパー', category: 'ロボ', systemType: 'ロボ系', monsterClass: 'アイアン・トルーパー', image: 'IMG3/02aian.png' },
  { id: 'm_robo_03', name: 'アーク・オーロラ', category: 'ロボ', systemType: 'ロボ系', monsterClass: 'アーク・オーロラ', image: 'IMG3/03a-ku.png' },
  // 神シリーズ
  { id: 'm_god_01', name: 'アテナ', category: '神', systemType: '神系', monsterClass: 'アテナ', image: 'IMG3/04atena.jpg' },
  { id: 'm_god_02', name: 'ゼウス', category: '神', systemType: '神系', monsterClass: 'ゼウス', image: 'IMG3/05zeus.jpg' },
  { id: 'm_god_03', name: 'アヌビス', category: '神', systemType: '神系', monsterClass: 'アヌビス', image: 'IMG3/06erumes.jpg' },
  // 恐竜シリーズ
  { id: 'm_dino_01', name: 'ティラノス', category: '恐竜', systemType: '恐竜系', monsterClass: 'ティラノス', image: 'IMG3/07thirano.jpg' },
  { id: 'm_dino_02', name: 'トリケラトン', category: '恐竜', systemType: '恐竜系', monsterClass: 'トリケラトン', image: 'IMG3/08torikeran.jpg' },
  { id: 'm_dino_03', name: 'プテラノドン', category: '恐竜', systemType: '恐竜系', monsterClass: 'プテラノドン', image: 'IMG3/09putera.jpg' },
  // ぬいぐるみシリーズ
  { id: 'm_plush_01', name: 'クマさんパペット', category: 'ぬいぐるみ', systemType: 'ぬいぐるみ系', monsterClass: 'クマさんパペット', image: 'IMG3/10kumapape.jpg' },
  { id: 'm_plush_02', name: '呪いのウサギ', category: 'ぬいぐるみ', systemType: 'ぬいぐるみ系', monsterClass: '呪いのウサギ', image: 'IMG3/11usagi.jpg' },
  { id: 'm_plush_03', name: 'ネコぬぐるみ', category: 'ぬいぐるみ', systemType: 'ぬいぐるみ系', monsterClass: 'ネコぬぐるみ', image: 'IMG3/12neko.jpg' }
];


function getBaseStatus(type) {
  var t = MONSTER_TYPES[type] || MONSTER_TYPES.other;
  return { hp:t.base.hp, attack:t.base.attack, defense:t.base.defense, speed:t.base.speed, luck:t.base.luck };
}

const STAGE_ENEMIES = [
  {
    name:'ゴブリンチーフ', title:'小賢しい略奪者', icon:'👺',
    rumor:'「弱いと思って油断するな。あいつはそこそこバランスが取れていて、初心者狩りの常習犯だ」',
    hp:20, attack:25, defense:20, speed:25, luck:20, skill:'none', type:'other',
  },
  {
    name:'ダークブレード', title:'神速の暗殺者', icon:'🗡️',
    rumor:'「あいつの動きは見えない。気づいたときには終わってる」素早さに全てを賭けた刺客と噂される。',
    hp:5, attack:10, defense:5, speed:82, luck:8, skill:'firstwind', type:'other',
  },
  {
    name:'アイアンゴーレム', title:'鉄壁の守護者', icon:'🛡️',
    rumor:'「どんな攻撃も通らないらしい。守りを突き破る手段を考えろ」防御に異常なポイントを割いているとの情報。',
    hp:15, attack:10, defense:76, speed:5, luck:4, skill:'none', type:'golem',
  },
  {
    name:'メガドラゴン', title:'大火力の破壊者', icon:'🐉',
    rumor:'「一撃がとにかくヤバい。ガードしても意味ない。先手を取るか逃げ回るしかない」と戦士が震えながら語った。',
    hp:15, attack:80, defense:5, speed:5, luck:5, skill:'haisui', type:'dragon',
  },
  {
    name:'ラッキースター', title:'ラッキーギャンブラー', icon:'⭐',
    rumor:'「運でどうにかしてるだけだろ……と思ってたら全員やられた。あいつの"運"は本物かもしれない」',
    hp:15, attack:10, defense:5, speed:10, luck:70, skill:'shuriken', type:'bird',
  },
  {
    name:'ダークマナ', title:'魔力の暴走体', icon:'🔮',
    rumor:'「奴の周りは魔力が渦巻いている。手裏剣のような魔弾を絶え間なく飛ばしてくるぞ」',
    hp:15, attack:40, defense:5, speed:20, luck:30, skill:'shuriken', type:'bird',
  },
  {
    name:'スピードスター', title:'疾風 of 幻影', icon:'🦅',
    rumor:'「速すぎて残像すら見えない。最初のターンの速さは尋常じゃない」',
    hp:15, attack:20, defense:15, speed:50, luck:10, skill:'firstwind', type:'bird',
  },
  {
    name:'リビングアーマー', title:'呪われし重装甲', icon:'🛡️',
    rumor:'「古い鎧が勝手に動いている。非常に硬いが、動きは極めて遅い」',
    hp:25, attack:15, defense:60, speed:5, luck:5, skill:'none', type:'golem',
  },
  {
    name:'バーサーカー', title:'狂乱の戦士', icon:'🪓',
    rumor:'「傷つくほどに狂暴さを増す。体力が減った彼の攻撃には絶対に当たるな」',
    hp:35, attack:45, defense:10, speed:10, luck:10, skill:'haisui', type:'other',
  },
  {
    name:'ギャンブラー', title:'命を賭ける曲芸師', icon:'🃏',
    rumor:'「すべてを運に任せている。彼のサイコロが6を示したとき、恐ろしい奇跡が起きる」',
    hp:15, attack:15, defense:10, speed:10, luck:60, skill:'shuriken', type:'other',
  },
  {
    name:'アサシンダガー', title:'漆黒 of 暗殺者', icon:'🗡️',
    rumor:'「一瞬の隙も見逃さない。開幕の奇襲を凌ぎきれるかどうかが勝負の分かれ目だ」',
    hp:15, attack:35, defense:10, speed:40, luck:10, skill:'firstwind', type:'other',
  },
  {
    name:'マウンテンコング', title:'大山脈の覇王', icon:'🦍',
    rumor:'「その巨体から繰り出される拳は岩をも砕く。タフで力強いが、素早さは皆無だ」',
    hp:45, attack:40, defense:15, speed:5, luck:5, skill:'none', type:'beast',
  },
  {
    name:'ヴァンパイア', title:'闇夜の吸血鬼', icon:'🧛',
    rumor:'「追い詰められると真の力を発揮する。彼の牙が赤く光るとき、戦慄の一撃が放たれる」',
    hp:30, attack:35, defense:15, speed:15, luck:15, skill:'haisui', type:'undead',
  },
  {
    name:'ミラージュゴースト', title:'霧に消える幻影', icon:'👻',
    rumor:'「攻撃が虚空を切り裂くだけ。驚異的な回避能力と魔力の飛び道具を持つ」',
    hp:10, attack:25, defense:5, speed:45, luck:25, skill:'shuriken', type:'bird',
  },
  {
    name:'ストーンナイト', title:'頑強なる石像兵', icon:'🗿',
    rumor:'「意志を持たぬ石の兵士。並大抵の攻撃では傷一つつけられない硬度を誇る」',
    hp:20, attack:20, defense:65, speed:2, luck:3, skill:'none', type:'golem',
  },
  {
    name:'ネクロマンサー', title:'死霊を操る導師', icon:'💀',
    rumor:'「怪しげな呪術でこちらの防御を無視したダメージを与えてくる。早めに決着をつけるのだ」',
    hp:20, attack:30, defense:10, speed:20, luck:30, skill:'shuriken', type:'undead',
  },
  {
    name:'ライトニングバード', title:'雷鳴の怪鳥', icon:'⚡',
    rumor:'「雷光の如き速度で飛び交う。最初のターンで先手を取るのは絶望的だ」',
    hp:15, attack:25, defense:10, speed:55, luck:5, skill:'firstwind', type:'bird',
  },
  {
    name:'オークウォーリア', title:'剛腕の戦士', icon:'🐗',
    rumor:'「攻守のバランスが非常によく取れている。基本に忠実で、隙がない強敵だ」',
    hp:35, attack:35, defense:20, speed:10, luck:10, skill:'none', type:'beast',
  },
  {
    name:'デススコーピオン', title:'砂漠の毒針', icon:'🦂',
    rumor:'「体力が衰えたその瞬間、一撃必殺の毒針が獲物の息の根を止めるだろう」',
    hp:25, attack:40, defense:15, speed:20, luck:10, skill:'haisui', type:'beast',
  },
  {
    name:'フェアリープリンセス', title:'幸運をもたらす妖精', icon:'🧚',
    rumor:'「彼女の周りには幸運の光が満ちている。奇跡的なクリティカルを連発してくるぞ」',
    hp:15, attack:20, defense:5, speed:20, luck:50, skill:'shuriken', type:'bird',
  },
  {
    name:'パラディン', title:'聖なる守護騎士', icon:'🛡️',
    rumor:'「盾を掲げ、絶対に崩れない構えをとる。長期戦を覚悟しなければならない」',
    hp:40, attack:20, defense:40, speed:5, luck:5, skill:'none', type:'other',
  },
  {
    name:'ファントムシーフ', title:'神出鬼没の怪盗', icon:'🎩',
    rumor:'「素早い身のこなしで攻撃をかわし、煙幕の如き手裏剣で確実に追い詰めてくる」',
    hp:20, attack:25, defense:10, speed:35, luck:20, skill:'shuriken', type:'other',
  },
  {
    name:'フェンサー', title:'華麗なる剣士', icon:'🤺',
    rumor:'「戦いの序盤に最も鋭い剣技を見せる。最初のターンに吹く突風のような連撃に耐えられるか」',
    hp:25, attack:30, defense:15, speed:30, luck:10, skill:'firstwind', type:'other',
  },
  {
    name:'キマイラ', title:'合成魔獣', icon:'🦁',
    rumor:'「複数の獣の力を持ち、手負いになったときの凶暴性は計り知れない」',
    hp:30, attack:40, defense:20, speed:10, luck:10, skill:'haisui', type:'beast',
  },
  {
    name:'ロイヤルガード', title:'王都 of 近衛兵長', icon:'👑',
    rumor:'「あらゆる能力が高水準。最後の壁として、あなたの戦略のすべてが試されるだろう」',
    hp:29, attack:29, defense:27, speed:15, luck:10, skill:'none', type:'other',
  },
];

const DEFAULT_MONSTERS = () => [
  { name:'スライム',         type:'slime',  hp:26, attack:11, defense:25, speed:20, luck:18, skill:'none' },
  { name:'アルファドラゴン', type:'dragon', hp:15, attack:41, defense:10, speed:20, luck:14, skill:'none' },
  { name:'ストーンコング',   type:'golem',  hp:20, attack:11, defense:40, speed:15, luck:14, skill:'none' },
  { name:'ハーピィクイーン', type:'bird',   hp:11, attack:21, defense:10, speed:35, luck:23, skill:'firstwind' },
  { name:'サーベルタイガー', type:'beast',  hp:21, attack:21, defense:10, speed:20, luck:28, skill:'haisui' },
  { name:'マミースミス',     type:'undead', hp:41, attack:16, defense:20, speed:10, luck:13, skill:'none' },
  { name:'プチデビル',       type:'devil',  hp:16, attack:26, defense:20, speed:20, luck:18, skill:'shuriken' },
  { name:'マンドラゴラ',     type:'plant',  hp:21, attack:16, defense:25, speed:15, luck:23, skill:'none' },
  { name:'アイアンギガ',     type:'metal',  hp:15, attack:11, defense:20, speed:40, luck:14, skill:'firstwind' },
  { name:'キングスライム',   type:'slime',  hp:36, attack:11, defense:25, speed:10, luck:18, skill:'haisui' },
];

// ============================================================
//  STATE
// ============================================================

let monsters = [];
let selSlot = null;
let selBattle = 0;
let stageIndex = 0;
let record = { win:0, lose:0, draw:0 };
let currentEnemy = null;
let battleSpeedMul = 1;
let battleTimers = [];


let skillUsedThisBattle = false;
let battleTimerInterval = null;
let battleTimerCount = 30;

let battleMode = 'manual'; // 'manual' or 'auto'
let autoStrategy = 'gangan'; // 'gangan' (ガンガン), 'inochi' (いのち大事に), 'batchiri' (バッチリ)
let currentTurn = 0;
let isPlayerTurn = false;
let pState = null;
let eState = null;
let activeTimers = [];

// ============// ============================================================
//  PERSISTENCE & UTILITIES
// ============================================================

function setSpeed(spd) {
  battleSpeedMul = spd;
  [1, 2, 3].forEach(s => {
    const btn = document.getElementById('spd-' + s);
    if (btn) {
      if (s === spd) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
}

function setBattleMode(mode) {
  battleMode = mode;
  const btnManual = document.getElementById("btn-mode-manual");
  const btnAuto = document.getElementById("btn-mode-auto");
  const stratPanel = document.getElementById("auto-strategy-panel");
  if (btnManual) {
    if (mode === "manual") btnManual.classList.add("active");
    else btnManual.classList.remove("active");
  }
  if (btnAuto) {
    if (mode === "auto") btnAuto.classList.add("active");
    else btnAuto.classList.remove("active");
  }
  if (stratPanel) {
    stratPanel.style.display = (mode === "auto") ? "flex" : "none";
  }
}

function setStrategy(strat) {
  autoStrategy = strat;
  ["gangan", "inochi", "batchiri"].forEach(s => {
    const btn = document.getElementById("strat-" + s);
    if (btn) {
      if (s === strat) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });
}

function delay(ms) {
  return ms / (battleSpeedMul || 1);
}

let activeSlotId = 1;
let bp = 0;
let unlockedSeries = []; // 'robo', 'shin', 'dinosaur', 'toy', 'ghost'
let maxMonsterSlots = 6;
let ownedItems = {
  expandSlot: 1,
  resetStats: 1,
  changeSkill: 1
};

function getSlotKey(slotId) {
  return '100pt_v3_slot_' + (slotId || activeSlotId || 1);
}

function getSlotData(slotId) {
  try {
    const raw = localStorage.getItem(getSlotKey(slotId));
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse slot data:', e);
  }
  return null;
}

function formatDate(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function save() {
  const slotData = {
    updatedAt: formatDate(new Date()),
    playerName: playerName,
    labMonstersSolo: labMonstersSolo,
    labMonstersFree: labMonstersFree,
    stageIndex: stageIndex,
    record: record,
    unlockedSkills: unlockedSkills,
    survivalBestRecord: survivalBestRecord,
    gameProgress: gameProgress,
    bp: bp,
    unlockedSeries: unlockedSeries,
    maxMonsterSlots: maxMonsterSlots,
    ownedItems: ownedItems
  };
  localStorage.setItem(getSlotKey(activeSlotId), JSON.stringify(slotData));
  localStorage.setItem('100pt_v3_active_slot', String(activeSlotId));
}

function resetMemoryState() {
  playerName = '';
  labMonstersSolo = [];
  labMonstersFree = [];
  stageIndex = 0;
  record = { win: 0, lose: 0, draw: 0 };
  unlockedSkills = [];
  survivalBestRecord = 0;
  gameProgress = {
    tutorialStep: 0,
    bossRevengeUnlocked: false, // 初期状態ではロック
    bossDefeated: false,
  };
  bp = 0;
  unlockedSeries = [];
  currentLabPage = 1;
  maxMonsterSlots = 6;
  ownedItems = {
    resetStats: 1,
    changeSkill: 1
  };
}

function loadSlot(slotId) {
  activeSlotId = slotId || 1;
  localStorage.setItem('100pt_v3_active_slot', String(activeSlotId));
  const data = getSlotData(activeSlotId);
  if (data) {
    playerName = data.playerName || '';
    labMonstersSolo = Array.isArray(data.labMonstersSolo) ? data.labMonstersSolo : [];
    labMonstersFree = Array.isArray(data.labMonstersFree) ? data.labMonstersFree : [];
    stageIndex = typeof data.stageIndex === 'number' ? data.stageIndex : 0;
    record = data.record || { win: 0, lose: 0, draw: 0 };
    unlockedSkills = Array.isArray(data.unlockedSkills) ? data.unlockedSkills : [];
    survivalBestRecord = typeof data.survivalBestRecord === 'number' ? data.survivalBestRecord : 0;
    gameProgress = data.gameProgress ? { ...data.gameProgress } : { tutorialStep: 4, bossRevengeUnlocked: false, bossDefeated: false };
    bp = typeof data.bp === 'number' ? data.bp : 0;
    unlockedSeries = Array.isArray(data.unlockedSeries) ? data.unlockedSeries : [];
    maxMonsterSlots = typeof data.maxMonsterSlots === 'number' ? data.maxMonsterSlots : 6;
    ownedItems = data.ownedItems ? { ...data.ownedItems } : { resetStats: 1, changeSkill: 1 };
  } else {
    resetMemoryState();
  }
}

function deleteSlotData(slotId) {
  localStorage.removeItem(getSlotKey(slotId));
  if (activeSlotId === slotId) {
    resetMemoryState();
  }
}

function migrateOldSaveDataIfNeeded() {
  const activeS = localStorage.getItem('100pt_v3_active_slot');
  if (activeS) {
    activeSlotId = parseInt(activeS, 10) || 1;
    return;
  }
  
  const oldPName = localStorage.getItem('100pt_v3_playerName');
  if (oldPName && !localStorage.getItem(getSlotKey(1))) {
    try {
      const lmSolo = JSON.parse(localStorage.getItem('100pt_v3_lab_monsters_solo') || '[]');
      const lmFree = JSON.parse(localStorage.getItem('100pt_v3_lab_monsters_free') || '[]');
      const sIndex = parseInt(localStorage.getItem('100pt_v2_stage') || '0', 10);
      const rec = JSON.parse(localStorage.getItem('100pt_v2_record') || '{"win":0,"lose":0,"draw":0}');
      const unl = JSON.parse(localStorage.getItem('100pt_v3_unlocked') || '[]');
      const surBest = parseInt(localStorage.getItem('100pt_v3_survivalBest') || '0', 10);
      const prog = JSON.parse(localStorage.getItem('100pt_v3_progress') || '{"tutorialStep":4,"bossRevengeUnlocked":false,"bossDefeated":false}');

      const slot1Data = {
        updatedAt: formatDate(new Date()),
        playerName: oldPName,
        labMonstersSolo: lmSolo,
        labMonstersFree: lmFree,
        stageIndex: sIndex,
        record: rec,
        unlockedSkills: unl,
        survivalBestRecord: surBest,
        gameProgress: prog
      };
      localStorage.setItem(getSlotKey(1), JSON.stringify(slot1Data));
      localStorage.setItem('100pt_v3_active_slot', '1');
      activeSlotId = 1;
    } catch(e) {
      console.error('Migration failed:', e);
    }
  }
}

function load() {
  migrateOldSaveDataIfNeeded();
  loadSlot(activeSlotId);
}

function updateRecord() {
  const winEl = document.getElementById('rec-win');
  const loseEl = document.getElementById('rec-lose');
  const drawEl = document.getElementById('rec-draw');
  if (winEl) winEl.textContent = `🏆 ${record.win || 0}`;
  if (loseEl) loseEl.textContent = `💀 ${record.lose || 0}`;
  if (drawEl) drawEl.textContent = `🤝 ${record.draw || 0}`;
}

// ============================================================
//  BGM MANAGEMENT SYSTEM (SoundManager)
// ============================================================
class BGMManager {
  constructor() {
    this.currentBGM = null;
    this.currentKey = null;
    this.bgmVolume = 0.5; // BGM音量 (0.0～1.0)
    this.seVolume = 0.5;  // SE音量 (0.0～1.0)
    
    // localStorageから音量設定を復元
    const savedBgm = localStorage.getItem('100pt_bgm_volume');
    const savedSe = localStorage.getItem('100pt_se_volume');
    if (savedBgm !== null) this.bgmVolume = parseFloat(savedBgm);
    if (savedSe !== null) this.seVolume = parseFloat(savedSe);
    
    // BGMファイルパス定義（相対パス指定・BGM1フォルダ内の実ファイルに対応）
    this.bgmList = {
      title: './BGM1/OP BGM1.mp3',        // タイトル・マップ画面
      map: './BGM1/OP BGM1.mp3',          // マップ画面
      lab: './BGM1/raboBGM1.mp3',         // ラボ画面・作成画面
      normalBattle: './BGM1/battle１.mp3', // 通常バトル（リーグ・フリー・勝ち抜き・武舞台）
      bossBattle: './BGM1/BOSSbattle１.mp3', // 覇王ボス戦・チュートリアル・再戦ボス
      victory: './BGM1/Victory.mp3',      // 勝利時
      lose: './BGM1/lose.mp3',             // 敗北時
      
      towerSelect: './BGM1/Tower.mp3',       // 試練の塔 モンスター選出・準備画面
      colosseumSelect: './BGM1/Colosseum.mp3',// コロッシアム モンスター選出・準備画面

      bubutai: './BGM1/bubutai.mp3',         // 武舞台
      p2pShrine: './BGM1/P2PBGM.mp3',        // 異次元の祠

      haouPrep: './BGM1/haou.mp3',           // 覇王バトル準備画面
      shop: './BGM1/syouten.mp3'             // 商店画面
    };
  }

  // BGMの再生（同じ曲が流れている場合は継続再生）
  play(key, isLoop = true) {
    if (this.currentKey === key && this.currentBGM && !this.currentBGM.paused) {
      return; // すでに同じ曲が再生中なら何もしない
    }

    // 現在再生中のBGMを停止
    this.stop();

    const filePath = this.bgmList[key];
    if (!filePath) {
      console.warn(`BGM Key "${key}" に対応する音源が見つかりません。`);
      return;
    }

    this.currentBGM = new Audio(filePath);
    this.currentBGM.loop = true; // 全てのBGMを常にループ再生
    this.currentBGM.volume = this.bgmVolume;
    
    this.currentBGM.play().catch(err => {
      // ユーザーが画面操作する前の自動再生ブロック（ブラウザ仕様）対策
      console.log("ユーザー操作を待機中: " + err);
    });

    this.currentKey = key;
  }

  // BGMの停止
  stop() {
    if (this.currentBGM) {
      this.currentBGM.pause();
      this.currentBGM.currentTime = 0;
      this.currentBGM = null;
    }
    this.currentKey = null;
  }

  // BGMの一時停止（バックグラウンド移行時用）
  pause() {
    if (this.currentBGM && !this.currentBGM.paused) {
      this.currentBGM.pause();
    }
  }

  // BGMの再生再開（フォアグラウンド復帰時用）
  resume() {
    if (this.currentBGM && this.currentBGM.paused && this.currentKey) {
      this.currentBGM.play().catch(() => {});
    }
  }

  // BGM音量の設定
  setBgmVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.currentBGM) {
      this.currentBGM.volume = this.bgmVolume;
    }
    localStorage.setItem('100pt_bgm_volume', this.bgmVolume.toString());
  }

  // SE音量の設定
  setSeVolume(vol) {
    this.seVolume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('100pt_se_volume', this.seVolume.toString());
  }

  // SE再生用ヘルパー
  playSE(filePath) {
    const se = new Audio(filePath);
    se.volume = this.seVolume;
    se.play().catch(() => {});
  }
}

// グローバルインスタンス化
window.bgmManager = new BGMManager();

// 初回クリック/タップ時にブラウザの音声自動再生ブロックを解除
document.addEventListener('click', () => {
  if (window.bgmManager && window.bgmManager.currentBGM && window.bgmManager.currentBGM.paused && window.bgmManager.currentKey) {
    window.bgmManager.currentBGM.play().catch(() => {});
  }
}, { once: false });

// バックグラウンド切り替え（タブ移動・アプリ非アクティブ）時の自動一時停止 / 復帰制御
let isGamePausedByVisibility = false;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 1. バックグラウンド移動時: BGMを一時停止
    if (window.bgmManager) {
      window.bgmManager.pause();
    }
    // 2. バトルの思考タイマー（カウントダウン）の一時停止
    if (typeof battleTimerInterval !== 'undefined' && battleTimerInterval) {
      clearInterval(battleTimerInterval);
      battleTimerInterval = null;
      isGamePausedByVisibility = true;
    }
  } else {
    // 3. フォアグラウンド復帰時: BGM再生の再開
    if (window.bgmManager) {
      window.bgmManager.resume();
    }
    // 4. 思考タイマーが一時停止中であれば再開
    if (isGamePausedByVisibility) {
      isGamePausedByVisibility = false;
      if (typeof startThinkingTimer === 'function' && typeof isPlayerTurn !== 'undefined' && isPlayerTurn) {
        startThinkingTimer();
      }
    }
  }
});

// ============================================================
//  SETTINGS MODAL (音量設定)
// ============================================================
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  // スライダーの値を現在の音量に同期
  const bgmSlider = document.getElementById('bgm-volume-slider');
  const seSlider = document.getElementById('se-volume-slider');
  const bgmLabel = document.getElementById('bgm-vol-label');
  const seLabel = document.getElementById('se-vol-label');

  if (bgmSlider && window.bgmManager) {
    bgmSlider.value = Math.round(window.bgmManager.bgmVolume * 100);
    if (bgmLabel) bgmLabel.textContent = bgmSlider.value + '%';
  }
  if (seSlider && window.bgmManager) {
    seSlider.value = Math.round(window.bgmManager.seVolume * 100);
    if (seLabel) seLabel.textContent = seSlider.value + '%';
  }

  modal.style.display = 'flex';
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.style.display = 'none';
}

function onBgmVolumeChange(val) {
  const v = parseInt(val);
  const label = document.getElementById('bgm-vol-label');
  if (label) label.textContent = v + '%';
  if (window.bgmManager) {
    window.bgmManager.setBgmVolume(v / 100);
  }
}

function onSeVolumeChange(val) {
  const v = parseInt(val);
  const label = document.getElementById('se-vol-label');
  if (label) label.textContent = v + '%';
  if (window.bgmManager) {
    window.bgmManager.setSeVolume(v / 100);
  }
}

// 【1】試練の塔のモンスター選出画面を表示した時
function showTowerMonsterSelectScene() {
  if (window.bgmManager) {
    window.bgmManager.play('towerSelect', true); // Tower.mp3 をループ再生
  }
}

// 【2】コロシアムのモンスター選出画面を表示した時
function showColosseumMonsterSelectScene() {
  if (window.bgmManager) {
    window.bgmManager.play('colosseumSelect', true); // Colosseum.mp3 をループ再生
  }
}

// 【3】武舞台画面／ステージを表示した時
function showBubutaiScene() {
  if (window.bgmManager) {
    window.bgmManager.play('bubutai', true); // bubutai.mp3 をループ再生
  }
}

// 【4】異次元の祠画面／ステージを表示した時
function showP2PShrineScene() {
  if (window.bgmManager) {
    window.bgmManager.play('p2pShrine', true); // P2PBGM.mp3 をループ再生
  }
}

// 【5】覇王バトルの準備（選出）画面を表示した時
function showHaouPrepScene() {
  if (window.bgmManager) {
    window.bgmManager.play('haouPrep', true); // haou.mp3 をループ再生
  }
}

// 【6】商店画面を表示した時
function showShopScene() {
  if (window.bgmManager) {
    window.bgmManager.play('shop', true); // syouten.mp3 をループ再生
  }
}

//  NEW LAB & CREATOR SYSTEM (V3 Schema)
// ============================================================

let playerName = '';
let labMonstersSolo = []; // Max 6, for league and survival
let labMonstersFree = []; // Max 6, for free battle
let creatorReturnToScouting = false; // Flag to redirect after manual creation

let currentLabMode = 'story'; // 'story' (ストーリー用), 'free' (フリーバトル用)

// Helper to get active lab based on selected lab mode
function getActiveLab() {
  if (typeof currentLabMode !== 'undefined' && currentLabMode === 'free') {
    return labMonstersFree;
  }
  return labMonstersSolo;
}

// Helper to set active lab content
function setActiveLab(list) {
  if (typeof currentLabMode !== 'undefined' && currentLabMode === 'free') {
    labMonstersFree = list;
  } else {
    labMonstersSolo = list;
  }
}

// Switch lab mode function (Story vs Free)
function switchLabMode(mode) {
  currentLabMode = mode;
  
  const tabStory = document.getElementById('lab-mode-tab-story');
  const tabFree = document.getElementById('lab-mode-tab-free');
  
  if (mode === 'story') {
    if (tabStory) {
      tabStory.style.borderColor = 'var(--accent-gold)';
      tabStory.style.background = 'rgba(245,158,11,0.08)';
      tabStory.style.color = 'var(--accent-gold)';
    }
    if (tabFree) {
      tabFree.style.borderColor = 'rgba(255,255,255,0.1)';
      tabFree.style.background = 'transparent';
      tabFree.style.color = 'var(--text-dim)';
    }
  } else {
    if (tabStory) {
      tabStory.style.borderColor = 'rgba(255,255,255,0.1)';
      tabStory.style.background = 'transparent';
      tabStory.style.color = 'var(--text-dim)';
    }
    if (tabFree) {
      tabFree.style.borderColor = 'var(--accent-cyan)';
      tabFree.style.background = 'rgba(0,212,255,0.08)';
      tabFree.style.color = 'var(--accent-cyan)';
    }
  }
  
  // Transition animation (fade-in restart)
  const grid = document.getElementById('lab-grid-6');
  if (grid) {
    grid.classList.remove('fade-in');
    void grid.offsetWidth; // Trigger reflow for animation restart
    grid.classList.add('fade-in');
  }

  // Refresh display
  renderLabGrid();
  updateLabStatsDisplay();
}

function updateLabStatsDisplay() {
  const labCount = document.getElementById('lab-unlocked-count');
  if (labCount) {
    if (currentLabMode === 'free') {
      labCount.textContent = '🔓 解放済みスキル: 30 / 30 (フリー対戦：全解放)';
      labCount.style.color = 'var(--accent-cyan)';
    } else {
      const sp = getSkillProgress();
      labCount.textContent = '🔓 解放済みスキル: ' + sp.count + ' / ' + sp.total;
      labCount.style.color = 'var(--accent-gold)';
    }
  }
  
  const monstersCount = document.getElementById('lab-monsters-count');
  if (monstersCount) {
    monstersCount.textContent = '登録数: ' + getActiveLab().length + ' / 6';
  }
}

let creatorStep = 1;

let currentGameMode = 'league'; // 'league', 'survival', 'free'
let unlockedSkills = []; // IDs of unlocked prize skills
let survivalWins = 0;
let survivalBestRecord = 0;

// Tutorial & Story Progression
let gameProgress = {
  tutorialStep: 0,   // 0:新規 1:OP完了→ラボ誘導 2:初代作成完了→ボス誘導 3:初敗北→再作成 4:完了
  bossRevengeUnlocked: false,
  bossDefeated: false,
};

const TUTORIAL_BOSS = {
  name: '覇王 ヴィクター',
  title: '闘技場の覇王',
  icon: '👹',
  rumor: '闘技場で数多の挑戦者を退けてきた最強の存在。未知のスキルを使うという噂も…',
  hp: 99, attack: 80, defense: 60, speed: 50, luck: 50,
  skill: 'gigabreak', type: 'other'
};

const HAOU_REVENGE_BOSS = {
  name: '覇王ヴィクター',
  title: '闘技場の覇王 (リベンジ)',
  icon: '👹',
  rumor: 'すべてのスキルを極めし研究者と対峙する覇王の全力。超高火力・紙耐久の極限ビルド！',
  hp: 50, attack: 58, defense: 12, speed: 28, luck: 10,
  skill: 'gigabreak', type: 'other'
};

// Creator Temporary State
let creatorTemp = {
  systemType: '',
  monsterClass: '',
  name: '',
  stats: { hp: 10, attack: 10, defense: 10, speed: 10, luck: 10 },
  bonusLeft: 30,
  skills: { active: [], passive: [] },
  editingLabIndex: null  // リセット薬経由の再配分時に対象モンスターのインデックスを保持
};

// V3 Schemas and default configurations
// (Old save/load removed - using V3 split lab version below)

// Custom screen navigation overrides

function updateCreatorPreview() {
  if (!creatorTemp) return;
  const pName = creatorTemp.name || 'ななしのモンスター';
  const pClass = creatorTemp.monsterClass || '未選択';
  const pSys = creatorTemp.systemType || 'ドラゴン系';
  
  // 1. Name & details
  const nameEl = document.getElementById('cr-preview-name');
  const classEl = document.getElementById('cr-preview-class');
  if (nameEl) nameEl.textContent = pName;
  if (classEl) classEl.textContent = `${pSys} / ${pClass}`;
  
  // 2. Monster visual
  const visualEl = document.getElementById('cr-preview-visual');
  if (visualEl) {
    const sysKey = Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === pSys) || 'other';
    const defaultIcon = MONSTER_TYPES[sysKey] ? MONSTER_TYPES[sysKey].icon : '🐲';
    
    if (typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined' && ADDITIONAL_MONSTER_IMAGES[pClass]) {
      visualEl.innerHTML = `<img src="${ADDITIONAL_MONSTER_IMAGES[pClass]}" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'アルファドラゴン') {
      visualEl.innerHTML = `<img src="IMG/dragon１A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'インフェルノス') {
      visualEl.innerHTML = `<img src="IMG/dragon２A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'オメガカイザー') {
      visualEl.innerHTML = `<img src="IMG/dragon３A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ストーンコング') {
      visualEl.innerHTML = `<img src="IMG/go-remu1A_.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ジェイドガーディアン') {
      visualEl.innerHTML = `<img src="IMG/go-remu2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ギガストーン') {
      visualEl.innerHTML = `<img src="IMG/go-remu3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ハーピィクイーン') {
      visualEl.innerHTML = `<img src="IMG/tori1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ガルーダ') {
      visualEl.innerHTML = `<img src="IMG/tori2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'グリフォニクス') {
      visualEl.innerHTML = `<img src="IMG/tori3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'サーベルタイガー') {
      visualEl.innerHTML = `<img src="IMG/kemono1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'キマイラロード') {
      visualEl.innerHTML = `<img src="IMG/kemono2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'フェンリル') {
      visualEl.innerHTML = `<img src="IMG/kemono3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'マミースミス') {
      visualEl.innerHTML = `<img src="IMG/anded1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ファントムナイト') {
      visualEl.innerHTML = `<img src="IMG/anded2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'デスサイズ') {
      visualEl.innerHTML = `<img src="IMG/anded3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'スライム') {
      visualEl.innerHTML = `<img src="IMG/suraim1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'キングスライム') {
      visualEl.innerHTML = `<img src="IMG/suraim2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ゴッドゼリー') {
      visualEl.innerHTML = `<img src="IMG/suraim3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'プチデビル') {
      visualEl.innerHTML = `<img src="IMG/devil1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'サキュバス') {
      visualEl.innerHTML = `<img src="IMG/devil2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ベルゼバブ') {
      visualEl.innerHTML = `<img src="IMG/devil3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'マンドラゴラ') {
      visualEl.innerHTML = `<img src="IMG/natu1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'アルラウネ') {
      visualEl.innerHTML = `<img src="IMG/natu2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '世界樹の眷属') {
      visualEl.innerHTML = `<img src="IMG/natu3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'アイアンギガ') {
      visualEl.innerHTML = `<img src="IMG/metar1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'メタルビット') {
      visualEl.innerHTML = `<img src="IMG/metar2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === 'ジェノサイダー') {
      visualEl.innerHTML = `<img src="IMG/metar3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else {
      visualEl.innerHTML = `<span style="font-size: 80px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));">${defaultIcon}</span>`;
    }
  }
  
  // 3. Stats allocation values and bars
  const stats = creatorTemp.stats || { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 };
  const maxAlloc = 110;
  const statsKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
  statsKeys.forEach(k => {
    const val = stats[k] || 0;
    const valEl = document.getElementById(`cr-preview-val-${k}`);
    const barEl = document.getElementById(`cr-preview-bar-${k}`);
    if (valEl) valEl.textContent = (k === 'hp') ? `${val * 5} (${val}pt)` : val;
    if (barEl) barEl.style.width = `${Math.min(100, (val / maxAlloc) * 100)}%`;
  });
  
  // 4. Skill details
  const skillNameEl = document.getElementById('cr-preview-skill-name');
  const skillDescEl = document.getElementById('cr-preview-skill-desc');
  const activeSkill = (creatorTemp.skills && creatorTemp.skills.active && creatorTemp.skills.active[0]) || '';
  const passiveSkill = (creatorTemp.skills && creatorTemp.skills.passive && creatorTemp.skills.passive[0]) || '';
  
  const actSk = SKILLS[activeSkill] || null;
  const pasSk = SKILLS[passiveSkill] || null;

  if (actSk && actSk.id !== 'none') {
    if (skillNameEl) skillNameEl.textContent = `⚡ ${actSk.name} (MP: 8)`;
    if (skillDescEl) skillDescEl.textContent = `【攻撃スキル】${actSk.desc}`;
  } else if (pasSk && pasSk.id !== 'none') {
    if (skillNameEl) skillNameEl.textContent = `🛡️ ${pasSk.name} (MP 8で自動発動)`;
    if (skillDescEl) skillDescEl.textContent = `【パッシブスキル】${pasSk.desc}`;
  } else {
    if (skillNameEl) skillNameEl.textContent = 'なし';
    if (skillDescEl) skillDescEl.textContent = 'スキルが選択されていません。';
  }
}

function goScreen(name) {
  // Clear battle timers and logs if transitioning screens
  battleTimers.forEach(t => clearTimeout(t));
  battleTimers = [];
  if (typeof clearLog === 'function') clearLog();

  // BGM再生制御
  if (window.bgmManager) {
    if (name === 'lab' || name === 'creator') {
      window.bgmManager.play('lab', true);
    } else if (name === 'scouting') {
      if (currentGameMode === 'survival') {
        window.bgmManager.play('towerSelect', true);     // Tower.mp3
      } else if (currentGameMode === 'boss-revenge') {
        window.bgmManager.play('haouPrep', true);        // haou.mp3 (覇王バトル準備画面)
      } else {
        window.bgmManager.play('colosseumSelect', true); // Colosseum.mp3
      }
    } else if (name === 'reward-shop') {
      window.bgmManager.play('shop', true);              // syouten.mp3 (商店画面)
    } else if (name === 'free-battle-lobby') {
      window.bgmManager.play('p2pShrine', true);          // P2PBGM.mp3 (異次元の祠)
    } else if (name === 'team-arena-menu' || name === 'ta-party' || name === 'ta-progress') {
      window.bgmManager.play('bubutai', true);            // bubutai.mp3 (武舞台)
    } else if (name === 'battle') {
      const isBoss = (currentEnemy && (currentEnemy.name === '覇王ヴィクター' || currentEnemy.name === '覇王ヴィクター(再戦)')) || currentGameMode === 'boss-revenge';
      if (isBoss) {
        window.bgmManager.play('bossBattle', true);
      } else {
        window.bgmManager.play('normalBattle', true);
      }
    } else {
      window.bgmManager.play('title', true);
    }
  }

  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  // Update headers and show
  const header = document.getElementById('header');
  if (name === 'title' || name === 'name-dialog' || name === 'battle' || name === 'free-battle-lobby' || name === 'team-arena-menu' || name === 'reward-shop' || name === 'ta-party' || name === 'ta-progress') {
    header.style.display = 'none';
  } else {
    header.style.display = 'flex';
  }

  const el = document.getElementById(name + '-screen');
  if (el) {
    if (name === 'name-dialog' || name === 'creator' || name === 'lab' || name === 'scouting' || name === 'free-battle-lobby' || name === 'team-arena-menu' || name === 'reward-shop' || name === 'ta-party' || name === 'ta-progress') {
      el.style.display = 'flex';
    } else {
      el.style.display = 'block';
    }
    el.classList.add('active');
    el.classList.remove('fade-in');
    void el.offsetWidth;
    el.classList.add('fade-in');
  }

  if (name === 'free-battle-lobby') {
    triggerFirstTimeHelp('free');
  }
  if (name === 'battle') {
    document.body.style.overflow = 'hidden';
    
    // Apply background image depending on game mode
    const battleWrapper = document.querySelector('.battle-wrapper-169');
    if (battleWrapper) {
      if (currentGameMode === 'survival') {
        battleWrapper.style.backgroundImage = "url('IMGTITLE/siren.png')";
        battleWrapper.style.backgroundSize = "cover";
        battleWrapper.style.backgroundPosition = "center bottom";
        battleWrapper.style.backgroundRepeat = "no-repeat";
      } else if (currentGameMode === 'league' || currentGameMode === 'boss-revenge') {
        battleWrapper.style.backgroundImage = "url('IMGTITLE/korosiam.png')";
        battleWrapper.style.backgroundSize = "cover";
        battleWrapper.style.backgroundPosition = "center bottom";
        battleWrapper.style.backgroundRepeat = "no-repeat";
      } else if (currentGameMode === 'free' || currentGameMode === 'team-arena') {
        battleWrapper.style.backgroundImage = "url('IMGTITLE/bubutai.jpg')";
        battleWrapper.style.backgroundSize = "cover";
        battleWrapper.style.backgroundPosition = "center bottom";
        battleWrapper.style.backgroundRepeat = "no-repeat";
      } else {
        // Reset to default style if not survival, league, free or team-arena
        battleWrapper.style.backgroundImage = "";
        battleWrapper.style.backgroundSize = "";
        battleWrapper.style.backgroundPosition = "";
        battleWrapper.style.backgroundRepeat = "";
      }
    }
    
    initBattle();
  } else {
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
  }
  
  if (name === 'main-menu') {
    updateSkillProgressUI();
    updateMenuFacilities();
    const nameEl = document.getElementById('menu-player-name');
    if (nameEl) nameEl.textContent = '研究者: ' + playerName;
  }

  if (name === 'lab') {
    document.getElementById('tab-lab').classList.add('active');
    switchLabMode('story');
    triggerFirstTimeHelp('lab');

    // Tutorial Phase 2: Auto-create first monster
    // Tutorial Phase 2: Auto-create first monster & transition to Colosseum
    if (gameProgress.tutorialStep === 1) {
      // メッセージ1（ラボ到達時）
      showStoryDialog([
        { speaker: playerName || '主人公', text: '「これが王都のラボか、さすがだな。よし、手始めに自慢のモンスターを作ろう！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      ], () => {
        // モンスター生成演出 & ポチ自動生成
        if (window.soundManager && typeof window.soundManager.playSE === 'function') {
          try { window.soundManager.playSE('create'); } catch(e) {}
        }
        
        const starterMonster = {
          name: 'ポチ',
          systemType: 'スライム系',
          monsterClass: 'スライム',
          stats: { hp: 20, attack: 20, defense: 20, speed: 20, luck: 20 },
          skills: { active: ['none'], passive: ['none'] }
        };
        labMonstersSolo.push(starterMonster);
        gameProgress.tutorialStep = 2;
        save();
        renderLabGrid();

        // メッセージ2（ポチ誕生後）
        showStoryDialog([
          { speaker: playerName || '主人公', text: '「よしできた！王都モンスター１号のポチだ！コイツと共にこの国で一番強い奴に挑戦して、一気に名前を売ってやる！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        ], () => {
          // メッセージ2のタップ後、コロシアムへの自動移動演出
          onPochiCreatedStoryEnd();
        });
      });
    }

    // Tutorial Phase 3: Return after defeat
    if (gameProgress.tutorialStep === 3) {
      showStoryDialog([
        { speaker: playerName || '主人公', text: '「くっそ〜〜！ 言いたい放題言いやがって……！ でも、悔しいけどあいつの言う通りだ。手も足も出なかった……。」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: playerName || '主人公', text: '「『ステータスの割り振り』と『スキル』か……。よし！ 新しいモンスターを生成して、今度はちゃんと考えてポイント（100pt）を振り分けてやる！\n\nHPを増やして一撃死を防ぐか、攻撃に全振りして大技を叩き込むか……待ってろよヴィクター！ 次に会った時は、びっくりさせてやるからな！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      ], null);
    }
  } else if (name === 'scouting') {
    document.getElementById('tab-scouting').classList.add('active');
    
    // ★ ゲームモードに応じてパーティ編成データを強制切替（ラボのタブ状態に依存しない）
    if (currentGameMode === 'free') {
      currentLabMode = 'free';  // フリーバトル → フリー用編成
    } else {
      currentLabMode = 'story'; // 試練の塔・リーグ戦・武舞台・覇王リベンジ → ストーリー用編成
    }
    
    // ゲームモードに応じてバトル前確認画面の背景を動的切り替え
    const scoutScreen = document.getElementById('scouting-screen');
    if (scoutScreen) {
      if (currentGameMode === 'survival') {
        scoutScreen.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('IMGTITLE/sirenn1F.png')";
      } else {
        // 通常のリーグ戦等は控え室背景
        scoutScreen.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('IMGTITLE/hikaesitu.png')";
      }
      scoutScreen.style.backgroundSize = "cover";
      scoutScreen.style.backgroundPosition = "center center";
      scoutScreen.style.backgroundRepeat = "no-repeat";
    }

    if (currentGameMode === 'survival') {
      triggerFirstTimeHelp('tower');
    } else {
      triggerFirstTimeHelp('league');
    }
    if (gameProgress.tutorialStep === 2) {
      currentEnemy = { ...TUTORIAL_BOSS };
    } else if (currentGameMode === 'boss-revenge') {
      currentEnemy = { ...HAOU_REVENGE_BOSS };
    } else {
      prepareStage();
    }
    renderSelList();
    renderEnemyInfo();
    // チュートリアル（覇王戦前）会話イベント
    if (gameProgress.tutorialStep === 2) {
      const startBtn = document.getElementById('btn-battle') || document.querySelector('.battle-start-btn');
      if (startBtn) {
        startBtn.disabled = true;
        startBtn.classList.remove('active');
        startBtn.style.opacity = '0.5';
        startBtn.style.pointerEvents = 'none';
      }
      showStoryDialog([
        { speaker: playerName || '主人公', text: '「こ、これが覇王か。とんでもない化け物だ。よし！やってやる！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: playerName || '主人公', text: '「おい！ あんたがこの国で一番強いっていう『覇王 ヴィクター』だな！ オレとバトルしろ！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: '覇王 ヴィクター', text: '「……ほう。見慣れぬ身なり、そして洗練されていない顔つき……片田舎から出てきたばかりの新米か。いいだろう、相手になってやる。私に挑む愚かさに、いつ気づくか見ものだな。」', color: '#ef4444', speakerTextColor: '#fff' },
      ], () => {
        onColosseumPreBattleStoryEnd();
      });
    }
  }

  // Header UI elements display logic depending on active screen
  const tabScouting = document.getElementById('tab-scouting');
  const tabLab = document.getElementById('tab-lab');
  const stageDisplay = document.getElementById('stage-display');

  if (tabScouting) {
    if (name === 'lab') {
      tabScouting.style.display = 'none';
    } else {
      tabScouting.style.display = 'inline-block';
      if (currentGameMode === 'survival') {
        tabScouting.textContent = '🗼 試練の塔';
      } else {
        tabScouting.textContent = '🏆 リーグ戦';
      }
    }
  }
  if (tabLab) {
    if (name === 'scouting') {
      tabLab.style.display = 'none';
    } else {
      tabLab.style.display = 'inline-block';
    }
  }
  if (stageDisplay) {
    if (name === 'lab') {
      stageDisplay.style.display = 'none';
    } else {
      stageDisplay.style.display = 'block';
      if (currentGameMode === 'survival') {
        stageDisplay.textContent = `試練の塔: ${survivalWins}層`;
      }
    }
  }
}

// 1. Title -> Name input

// 全体の最初のクリックで自動的に最適フルスクリーン化するグローバルリスナー
document.addEventListener('click', function initFullscreen() {
  const isFS = document.fullscreenElement || 
               document.webkitFullscreenElement || 
               document.mozFullScreenElement || 
               document.msFullscreenElement;
  if (!isFS && !document.body.classList.contains('virtual-fullscreen')) {
    requestDeviceFullscreen();
  }
  document.removeEventListener('click', initFullscreen);
}, { once: true });

// デバイス・OS自動判定対応フルスクリーン要求
function requestDeviceFullscreen() {
  const el = document.documentElement;
  const ua = navigator.userAgent.toLowerCase();
  
  // デバイスの簡易判別
  const isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/.test(ua);
  const isMobile = isIOS || isAndroid || /mobi|mini|fennec|iemobile|opera mobi/i.test(ua);

  // 標準および各ベンダーのフルスクリーンAPI
  const requestFS = el.requestFullscreen || 
                    el.webkitRequestFullscreen || 
                    el.mozRequestFullScreen || 
                    el.msRequestFullscreen;

  if (requestFS) {
    requestFS.call(el).then(() => {
      // モバイル端末で画面向きロックが利用可能な場合は、ゲーム向きの横画面(landscape)にロック
      if (isMobile && screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(err => {
          console.warn("Orientation lock rejected:", err);
        });
      }
    }).catch(err => {
      console.warn("Fullscreen request rejected, switching to virtual mode:", err);
      fallbackVirtualFullscreen();
    });
  } else {
    // API非対応デバイス（主にiPhone Safari）は仮想フルスクリーンにフォールバック
    fallbackVirtualFullscreen();
  }
}

// 仮想フルスクリーン（CSSで画面最大化）
function fallbackVirtualFullscreen() {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  if (isIOS) {
    // iOS Safari用アドレスバー自動非表示化ハック
    window.scrollTo(0, 1);
  }
  
  document.body.classList.add('virtual-fullscreen');
  
  // メタタグのviewportをピンチズーム無効・画面幅最大に更新
  let viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover");
  }
}

// フルスクリーン解除
function exitDeviceFullscreen() {
  const exitFS = document.exitFullscreen || 
                 document.webkitExitFullscreen || 
                 document.mozCancelFullScreen || 
                 document.msExitFullscreen;
                 
  if (exitFS && (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
    exitFS.call(document).catch(err => console.warn(err));
  }
  document.body.classList.remove('virtual-fullscreen');
}

function toggleFullscreen() {
  const isFS = document.fullscreenElement || 
               document.webkitFullscreenElement || 
               document.mozFullScreenElement || 
               document.msFullscreenElement;

  if (!isFS && !document.body.classList.contains('virtual-fullscreen')) {
    requestDeviceFullscreen();
  } else {
    exitDeviceFullscreen();
  }
}

function autoFullscreen() {
  // 自動判別フルスクリーン
  requestDeviceFullscreen();
}

function showNameDialog() {
  // ユーザーのインタラクション契機で最適フルスクリーンを起動
  requestDeviceFullscreen();
  goScreen('name-dialog');
}

function confirmPlayerName() {
  const input = document.getElementById("player-name-input");
  const error = document.getElementById("name-error");
  const val = input.value.trim();
  if (!val) {
    error.style.display = "block";
    return;
  }
  error.style.display = "none";
  playerName = val;
  save();
  
  if (gameProgress.tutorialStep === 0) {
    // 名前入力画面を閉じてマップ画面を表示し、その上でオープニングメッセージを表示
    goScreen("main-menu");
    showStoryDialog([
      { speaker: playerName, text: "すっげえ……！ これが王都か！ 人も街も見たことないデカさだ！", color: "var(--accent-cyan)", speakerTextColor: "#000" },
      { speaker: "ナレーション", text: "片田舎の村から自分の力を試したくて王都に出てきた主人公。\nこの王都で最強のモンスターを作り名を売ろうと野心を燃やす。\nこの王都には強大なモンスターを率いる猛者たちが集うコロシアムがある。\nまずは研究所で自分だけのモンスターを生み出そう！", color: "var(--accent-gold)" },
      { speaker: playerName, text: "まずはラボだ！モンスターを作って俺のデビュー戦だ！", color: "var(--accent-cyan)", speakerTextColor: "#000" },
    ], () => {
      onOpeningStoryEnd();
    });
  } else {
    goScreen("main-menu");
  }
}
function onOpeningStoryEnd() {
  // 1. テキストウィンドウを閉じる
  const overlay = document.getElementById("story-dialog-overlay");
  if (overlay) overlay.style.display = "none";

  // チュートリアルステップ更新とセーブ (Step 1: プレイヤーのラボタップ待ち)
  gameProgress.tutorialStep = 1;
  save();

  // 2. マップ画面を表示（背景：王都マップ）
  goScreen("main-menu");

  // 3. マップ上の「ラボ（研究所）」アイコンを強調ハイライト（タップ誘導）
  highlightLabIcon();
}

function highlightLabIcon() {
  const labArea = document.getElementById("map-area-lab");
  const arrowLab = document.getElementById("tutorial-arrow-lab");
  if (arrowLab) arrowLab.style.display = "block";
  if (labArea) {
    labArea.style.boxShadow = "0 0 35px var(--accent-gold), inset 0 0 20px rgba(245,158,11,0.8)";
    labArea.style.borderColor = "var(--accent-gold)";
    labArea.style.transform = "scale(1.05)";
  }
}

// 2. Render Lab Grid (6 slot cards)



function renderLabGrid() {
  const grid = document.getElementById('lab-grid-6');
  const countDisplay = document.getElementById('lab-monsters-count');
  const randomBtn = document.getElementById('btn-random-create');
  const welcome = document.getElementById('lab-player-welcome');
  
  const activeLab = getActiveLab();
  
  welcome.textContent = `こんにちは、${playerName} 研究員！`;
  countDisplay.textContent = `登録数: ${activeLab.length} / ${maxMonsterSlots}`;
  
  // 1ページあたり6枠表示の制御（最大スロット数基準でページを決定）
  const maxPage = Math.max(1, Math.ceil(maxMonsterSlots / ITEMS_PER_PAGE));
  if (currentLabPage > maxPage) currentLabPage = maxPage;
  if (currentLabPage < 1) currentLabPage = 1;
  
  const startIndex = (currentLabPage - 1) * ITEMS_PER_PAGE;
  randomBtn.disabled = activeLab.length >= maxMonsterSlots;

  grid.innerHTML = '';
  
  // Clamp selectedLabIndex
  if (selectedLabIndex >= activeLab.length) {
    selectedLabIndex = Math.max(0, activeLab.length - 1);
  }
  
  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const globalIndex = startIndex + i;
    const card = document.createElement('div');
    
    if (globalIndex < activeLab.length) {
      // Registered slot
      const m = activeLab[globalIndex];
      card.className = 'monster-card-6';
      card.style.height = '230px';
      card.style.minHeight = '230px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.style.padding = '12px';
      
      if (globalIndex === selectedLabIndex) {
        card.classList.add('selected');
      }
      
      card.innerHTML = `
        <div onclick="selectLabMonster(${globalIndex}, false)" style="width: 100%; text-align: center; cursor: pointer;" title="クリックで選択">
          <div style="font-weight:bold; font-size:18px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.name}</div>
          <div style="font-size:12px; color:var(--text-dim); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.monsterClass}</div>
        </div>
        
        <!-- Clickable Visual Area to open modal detail window -->
        <div onclick="selectLabMonster(${globalIndex}, true)" style="height: 75px; display:flex; align-items:center; justify-content:center; cursor:pointer; width:100%; background:transparent; border-radius:6px; border: 1px dashed rgba(255,255,255,0.12);" title="画像クリックで詳細表示">
          ${getMonsterVisualHTML(m.monsterClass, m.systemType, '60px')}
        </div>
        
        <!-- Inline controls directly in card slot -->
        <div style="width: 100%;">
          <div style="display:flex; gap:4px; margin-bottom:4px; width:100%;">
            <button class="btn-secondary" style="padding:2px 4px; font-size:13px; flex:1;" onclick="moveMonster(${globalIndex}, -1)" ${globalIndex === 0 ? 'disabled' : ''}>◀</button>
            <button class="btn-secondary" style="padding:2px 4px; font-size:13px; flex:1;" onclick="moveMonster(${globalIndex}, 1)" ${globalIndex === activeLab.length - 1 ? 'disabled' : ''}>▶</button>
          </div>
          <div style="display:flex; gap:4px; width:100%;">
            <button class="btn-secondary" style="border-color:rgba(245,158,11,0.3); color:var(--accent-gold); padding:2px 4px; font-size:13px; flex:1.2; display:flex; align-items:center; justify-content:center; gap:2px;" onclick="renameMonster(${globalIndex})">✏️ 改名</button>
            <button class="btn-secondary" style="border-color:rgba(239,68,68,0.4); color:var(--accent-red); padding:2px 4px; font-size:13px; flex:1;" onclick="deleteMonster(${globalIndex})">📦 別れ</button>
          </div>
        </div>
      `;
    } else if (globalIndex < maxMonsterSlots) {
      // Unlocked empty slot
      card.className = 'monster-card-6 empty';
      card.style.height = '230px';
      card.style.minHeight = '230px';
      card.innerHTML = `
        <button class="empty-create-btn" onclick="startManualCreate()">＋ 調合</button>
      `;
    } else {
      // Locked slot (shows lock style)
      card.className = 'monster-card-6 empty locked';
      card.style.height = '230px';
      card.style.minHeight = '230px';
      card.style.background = 'rgba(0,0,0,0.45)';
      card.style.border = '1px dashed rgba(255,255,255,0.05)';
      card.style.cursor = 'not-allowed';
      card.innerHTML = `
        <div style="font-size:24px; color:rgba(255,255,255,0.15); margin-bottom: 4px;">🔒</div>
        <div style="font-size:11px; color:rgba(255,255,255,0.25);">ケージ未開放<br>(アイテムで拡張)</div>
      `;
    }
    grid.appendChild(card);
  }

  // ページネーションUIの更新
  document.getElementById('lab-page-text').textContent = `${currentLabPage} / ${maxPage}`;
  document.getElementById('lab-prev-btn').disabled = (currentLabPage === 1);
  document.getElementById('lab-next-btn').disabled = (currentLabPage === maxPage);

  // Update underlying active borders but do not open popup automatically
  selectLabMonster(selectedLabIndex, false);
}

function changeLabPage(delta) {
  const activeLab = getActiveLab();
  const maxPage = Math.max(1, Math.ceil(maxMonsterSlots / ITEMS_PER_PAGE));
  currentLabPage += delta;
  if (currentLabPage > maxPage) currentLabPage = maxPage;
  if (currentLabPage < 1) currentLabPage = 1;
  renderLabGrid();
}

// ============ LAB ITEM SYSTEM ============

const LAB_ITEMS_DEF = {
  resetStats: {
    name: '💊 ステータスリセット薬',
    desc: '対象モンスターのステータス配分を初期化し、100ptを再配分できます。',
    icon: '💊'
  },
  changeSkill: {
    name: '📜 スキル再構成薬',
    desc: '対象モンスターのアクティブスキルをランダムに変更します。',
    icon: '📜'
  },
  expandSlot2: {
    name: '🏠 モンスター枠拡張 (+2)',
    desc: 'モンスター保管枠を +2 拡張します。',
    icon: '🏠'
  }
};

function openLabItemModal() {
  const modal = document.getElementById('lab-item-modal');
  if (!modal) return;
  renderOwnedItemList();
  modal.classList.add('active');
  modal.style.display = 'flex';
}

function closeLabItemModal() {
  const modal = document.getElementById('lab-item-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function renderOwnedItemList() {
  const container = document.getElementById('lab-item-list');
  if (!container) return;
  container.innerHTML = '';

  let hasAny = false;
  Object.entries(LAB_ITEMS_DEF).forEach(([itemId, def]) => {
    const count = ownedItems[itemId] || 0;
    hasAny = hasAny || count > 0;
    
    const card = document.createElement('div');
    card.style = 'display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:8px; padding:12px 16px; transition:all 0.2s;';
    
    const canUse = count > 0;
    card.innerHTML = `
      <div style="text-align:left; flex:1;">
        <div style="font-weight:bold; font-size:15px; color:var(--text-primary);">${def.name}</div>
        <div style="font-size:12px; color:var(--text-dim); margin-top:3px; line-height:1.3;">${def.desc}</div>
        <div style="font-size:13px; color:var(--accent-gold); margin-top:4px;">所持数: <strong>${count}</strong></div>
      </div>
      <div style="margin-left:12px;">
        <button class="title-btn" style="padding:8px 16px; font-size:13px; ${!canUse ? 'opacity:0.4; cursor:not-allowed; background:#475569; color:#cbd5e1; box-shadow:none;' : ''}" 
          ${!canUse ? 'disabled' : ''} onclick="useLabItem('${itemId}')">使用</button>
      </div>
    `;
    container.appendChild(card);
  });

  if (!hasAny) {
    container.innerHTML = '<div style="text-align:center; color:var(--text-dim); padding:20px;">所持アイテムがありません。<br>バトル報酬やショップで入手できます。</div>';
  }
}

// ============================================================
//  MONSTER SELECT MODAL (replaces browser prompt)
// ============================================================
let _monsterSelectResolve = null;

function showMonsterSelectModal(title, monsterList, formatFn) {
  return new Promise((resolve) => {
    _monsterSelectResolve = resolve;
    const modal = document.getElementById('monster-select-modal');
    const titleEl = document.getElementById('monster-select-title');
    const listEl = document.getElementById('monster-select-list');
    titleEl.textContent = title;
    listEl.innerHTML = '';
    monsterList.forEach((m, i) => {
      const btn = document.createElement('button');
      btn.className = 'monster-select-card';
      const label = formatFn ? formatFn(m, i) : `${m.name}`;
      btn.innerHTML = label;
      btn.onclick = () => {
        // 先にresolveを取得・実行してからモーダルを閉じる
        // (closeMonsterSelectModal内で-1にresolveされるのを防ぐ)
        const r = _monsterSelectResolve;
        _monsterSelectResolve = null;
        // モーダルを視覚的に閉じる
        const md = document.getElementById('monster-select-modal');
        if (md) { md.classList.remove('active'); md.style.display = 'none'; }
        // 選択されたインデックスでresolve
        if (r) r(i);
      };
      listEl.appendChild(btn);
    });
    modal.classList.add('active');
    modal.style.display = 'flex';
  });
}

function closeMonsterSelectModal() {
  const modal = document.getElementById('monster-select-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
  if (_monsterSelectResolve) { const r = _monsterSelectResolve; _monsterSelectResolve = null; r(-1); }
}

// ============================================================
//  STATUS ALLOCATION POPUP SYSTEM (For Reset Stats Item)
// ============================================================
let _popupTempState = null;

function showStatusAllocationPopup(monster, labIndex) {
  if (!monster) return;
  const modal = document.getElementById('status-allocation-modal');
  if (!modal) return;

  // 系統ベース値の計算
  let sysId = 'dragon';
  for (const [id, t] of Object.entries(MONSTER_TYPES)) {
    if (t.label === monster.systemType) { sysId = id; break; }
  }
  const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };

  const minHp = Math.max(1, Number(typeInfo.base.hp) || 0);
  const minAtk = Math.max(1, Number(typeInfo.base.attack) || 0);
  const minDef = Math.max(0, Number(typeInfo.base.defense) || 0);
  const minSpd = Math.max(0, Number(typeInfo.base.speed) || 0);
  const minLck = Math.max(0, Number(typeInfo.base.luck) || 0);

  _popupTempState = {
    labIndex: labIndex,
    monster: monster,
    minStats: { hp: minHp, attack: minAtk, defense: minDef, speed: minSpd, luck: minLck },
    currentStats: { hp: minHp, attack: minAtk, defense: minDef, speed: minSpd, luck: minLck },
    bonusLeft: 98
  };

  document.getElementById('stat-popup-monster-name').textContent = monster.name;
  renderStatusAllocationPopupUI();
  modal.classList.add('active');
  modal.style.display = 'flex';
}

function renderStatusAllocationPopupUI() {
  if (!_popupTempState) return;
  document.getElementById('stat-popup-bonus-left').textContent = `${_popupTempState.bonusLeft} pt`;

  const container = document.getElementById('stat-popup-rows');
  if (!container) return;
  container.innerHTML = '';

  const statLabels = { hp: '❤️ HP', attack: '⚔️ 攻撃', defense: '🛡️ 防御', speed: '💨 素早', luck: '⭐ 運' };

  Object.entries(statLabels).forEach(([key, labelText]) => {
    const curVal = _popupTempState.currentStats[key];
    const minVal = _popupTempState.minStats[key];

    const row = document.createElement('div');
    row.style = 'display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); border:1px solid rgba(0,210,255,0.2); border-radius:8px; padding:6px 12px;';

    const labelSpan = document.createElement('span');
    labelSpan.style = 'font-size:14px; font-weight:bold; width:90px; color:var(--text-primary);';
    labelSpan.textContent = labelText;

    const controls = document.createElement('div');
    controls.style = 'display:flex; gap:4px; align-items:center;';

    // -10
    const m10 = document.createElement('button');
    m10.className = 'alloc-btn';
    m10.style = 'width:44px; padding:4px 0; font-size:13px;';
    m10.textContent = '-10';
    m10.onclick = () => changePopupStat(key, -10);

    // -1
    const m1 = document.createElement('button');
    m1.className = 'alloc-btn';
    m1.style = 'width:36px; padding:4px 0; font-size:13px;';
    m1.textContent = '-1';
    m1.onclick = () => changePopupStat(key, -1);

    const valSpan = document.createElement('span');
    valSpan.style = 'font-size:16px; font-weight:bold; color:var(--accent-cyan); width:46px; text-align:center; display:inline-block;';
    valSpan.textContent = curVal;

    // +1
    const p1 = document.createElement('button');
    p1.className = 'alloc-btn';
    p1.style = 'width:36px; padding:4px 0; font-size:13px;';
    p1.textContent = '+1';
    p1.onclick = () => changePopupStat(key, 1);

    // +10
    const p10 = document.createElement('button');
    p10.className = 'alloc-btn';
    p10.style = 'width:44px; padding:4px 0; font-size:13px;';
    p10.textContent = '+10';
    p10.onclick = () => changePopupStat(key, 10);

    controls.appendChild(m10);
    controls.appendChild(m1);
    controls.appendChild(valSpan);
    controls.appendChild(p1);
    controls.appendChild(p10);

    row.appendChild(labelSpan);
    row.appendChild(controls);
    container.appendChild(row);
  });
}

function changePopupStat(key, delta) {
  if (!_popupTempState) return;
  const cur = _popupTempState.currentStats[key];
  const min = _popupTempState.minStats[key];
  let target = cur + delta;

  if (delta < 0) {
    if (target < min) target = min;
    const diff = cur - target;
    _popupTempState.currentStats[key] = target;
    _popupTempState.bonusLeft += diff;
  } else {
    if (target - cur > _popupTempState.bonusLeft) {
      target = cur + _popupTempState.bonusLeft;
    }
    const diff = target - cur;
    _popupTempState.currentStats[key] = target;
    _popupTempState.bonusLeft -= diff;
  }
  renderStatusAllocationPopupUI();
}

function confirmStatusAllocationPopup() {
  if (!_popupTempState) return;
  if (_popupTempState.bonusLeft !== 0) {
    alert(`ボーナスポイントが ${_popupTempState.bonusLeft}pt 残っています！すべてのポイント(残り0pt)を割り振ってください。`);
    return;
  }

  const m = _popupTempState.monster;
  m.stats = { ..._popupTempState.currentStats };
  save();

  closeStatusAllocationPopup();
  renderLabGrid();
  showSystemModal(`「${m.name}」のステータスを再設定しました！`);
}

function closeStatusAllocationPopup() {
  const modal = document.getElementById('status-allocation-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
  _popupTempState = null;
}

// ============================================================
//  SKILL SELECT POPUP SYSTEM (For Change Skill Item)
// ============================================================
let _skillSelectTarget = null;

function showSkillSelectPopup(monster, labIndex) {
  if (!monster) return;
  const modal = document.getElementById('skill-select-modal');
  if (!modal) return;

  _skillSelectTarget = { monster: monster, labIndex: labIndex };

  // モンスター名と現在スキルを表示
  document.getElementById('skill-popup-monster-name').textContent = monster.name;
  const curSkillId = (monster.skills && monster.skills.active && monster.skills.active[0]) || 'none';
  const curSkillInfo = SKILLS[curSkillId] || SKILLS.none;
  document.getElementById('skill-popup-current').textContent = `${curSkillInfo.icon || ''} ${curSkillInfo.name}`;

  // 解放済みスキル一覧を取得
  const availableSkills = Object.keys(SKILLS).filter(id => {
    if (id === 'none') return false;
    const sk = SKILLS[id];
    return sk.isInitial || unlockedSkills.includes(id);
  });

  const listEl = document.getElementById('skill-popup-list');
  listEl.innerHTML = '';

  if (availableSkills.length === 0) {
    listEl.innerHTML = '<div style="text-align:center; color:var(--text-dim); padding:20px;">解放済みスキルがありません。</div>';
  } else {
    // カテゴリ別に分類
    const categories = {};
    availableSkills.forEach(id => {
      const sk = SKILLS[id];
      const cat = sk.cat || 'その他';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(id);
    });

    Object.entries(categories).forEach(([catName, skillIds]) => {
      // カテゴリヘッダー
      const catHeader = document.createElement('div');
      catHeader.style = 'font-size:12px; font-weight:bold; color:var(--accent-gold); margin-top:6px; padding:2px 4px; border-bottom:1px solid rgba(245,158,11,0.2);';
      catHeader.textContent = `── ${catName} ──`;
      listEl.appendChild(catHeader);

      skillIds.forEach(id => {
        const sk = SKILLS[id];
        const isCurrent = (id === curSkillId);
        const btn = document.createElement('button');
        btn.style = `width:100%; text-align:left; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:13px; border:1px solid ${isCurrent ? 'rgba(0,210,255,0.5)' : 'rgba(255,255,255,0.08)'}; background:${isCurrent ? 'rgba(0,210,255,0.12)' : 'rgba(255,255,255,0.03)'}; color:#fff; transition:background 0.2s, border-color 0.2s; display:flex; flex-direction:column; gap:2px;`;
        btn.innerHTML = `
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:16px;">${sk.icon || '⚡'}</span>
            <span style="font-weight:bold; font-size:14px;">${sk.name}</span>
            <span style="font-size:11px; color:var(--text-dim); margin-left:auto;">${sk.type}</span>
            ${isCurrent ? '<span style="font-size:11px; color:var(--accent-cyan);">【装備中】</span>' : ''}
          </div>
          <div style="font-size:12px; color:var(--text-dim); line-height:1.4; padding-left:24px;">${sk.desc}</div>
        `;
        btn.onmouseenter = () => { if (!isCurrent) { btn.style.background = 'rgba(245,158,11,0.12)'; btn.style.borderColor = 'rgba(245,158,11,0.5)'; } };
        btn.onmouseleave = () => { if (!isCurrent) { btn.style.background = 'rgba(255,255,255,0.03)'; btn.style.borderColor = 'rgba(255,255,255,0.08)'; } };
        btn.onclick = () => confirmSkillSelect(id);
        listEl.appendChild(btn);
      });
    });
  }

  modal.classList.add('active');
  modal.style.display = 'flex';
}

function confirmSkillSelect(skillId) {
  if (!_skillSelectTarget) return;
  const m = _skillSelectTarget.monster;
  const oldSkillId = (m.skills && m.skills.active && m.skills.active[0]) || 'none';
  const oldSkillName = (SKILLS[oldSkillId] || SKILLS.none).name;

  if (!m.skills) m.skills = { active: ['none'], passive: [] };
  m.skills.active[0] = skillId;
  ownedItems.changeSkill--;
  save();

  closeSkillSelectPopup();
  renderLabGrid();
  showSystemModal(`「${m.name}」のスキルを変更しました！\n【${oldSkillName}】 ➔ 【${(SKILLS[skillId] || SKILLS.none).name}】`);
}

function closeSkillSelectPopup() {
  const modal = document.getElementById('skill-select-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
  _skillSelectTarget = null;
}

async function useLabItem(itemId) {
  try {
    const count = ownedItems[itemId] || 0;
    if (count <= 0) {
      alert('このアイテムは所持していません。');
      return;
    }

  switch (itemId) {
    case 'resetStats': {
      const activeLab = getActiveLab();
      if (activeLab.length === 0) {
        alert('対象となるモンスターがいません。');
        return;
      }
      closeLabItemModal();
      const idx = await showMonsterSelectModal(
        '💊 ステータスリセット薬 ─ 対象を選択',
        activeLab,
        (m, i) => `<span>${m.name}</span><span class="msc-sub">${m.systemType || ''}</span>`
      );
      if (idx < 0) return;
      const target = activeLab[idx];

      // すべての選択モーダルを消去
      if (typeof closeLabDetailModal === 'function') closeLabDetailModal();
      if (typeof closeLabItemModal === 'function') closeLabItemModal();
      if (typeof closeMonsterSelectModal === 'function') closeMonsterSelectModal();
      document.querySelectorAll('#monster-select-modal, #lab-item-modal, #lab-detail-modal').forEach(m => {
        m.style.display = 'none';
        m.classList.remove('active');
      });

      ownedItems.resetStats--;
      save();

      // ポップアップダイアログ形式でステータス再分配UIを表示
      showStatusAllocationPopup(target, idx);
      break;
    }
    case 'changeSkill': {
      const activeLab = getActiveLab();
      if (activeLab.length === 0) {
        alert('対象となるモンスターがいません。');
        return;
      }
      closeLabItemModal();
      const idx = await showMonsterSelectModal(
        '🧪 スキル再構成薬 ─ 対象を選択',
        activeLab,
        (m, i) => {
          const sk = m.skills && m.skills.active ? m.skills.active.map(s => (SKILLS[s] || SKILLS.none).name).join(', ') : 'なし';
          return `<span>${m.name}</span><span class="msc-sub">現在: ${sk}</span>`;
        }
      );
      if (idx < 0) return;
      const target = activeLab[idx];

      // 解放済みスキルの存在チェック
      const availableSkills = Object.keys(SKILLS).filter(id => {
        if (id === 'none') return false;
        const sk = SKILLS[id];
        return sk.isInitial || unlockedSkills.includes(id);
      });
      if (availableSkills.length === 0) {
        alert('解放済みスキルがありません。');
        return;
      }

      // すべての選択モーダルを消去
      if (typeof closeLabDetailModal === 'function') closeLabDetailModal();
      if (typeof closeLabItemModal === 'function') closeLabItemModal();
      document.querySelectorAll('#monster-select-modal, #lab-item-modal, #lab-detail-modal').forEach(m => {
        m.style.display = 'none';
        m.classList.remove('active');
      });

      // スキル選択ポップアップを表示（アイテム消費は選択確定時に実行）
      showSkillSelectPopup(target, idx);
      break;
    }
    case 'expandSlot2': {
      const ok = await showConfirmModal('モンスター枠拡張 (+2) を使用しますか？\nモンスター保管枠が +2 拡張されます。');
      if (!ok) return;
      ownedItems.expandSlot2--;
      maxMonsterSlots += 2;
      save();
      closeLabItemModal();
      // 即座にDOM要素を直接更新
      const countEl = document.getElementById('lab-monsters-count');
      if (countEl) countEl.textContent = `登録数: ${getActiveLab().length} / ${maxMonsterSlots}`;
      const maxPg = Math.max(1, Math.ceil(maxMonsterSlots / ITEMS_PER_PAGE));
      const pgText = document.getElementById('lab-page-text');
      if (pgText) pgText.textContent = `${currentLabPage} / ${maxPg}`;
      const nextBtn = document.getElementById('lab-next-btn');
      if (nextBtn) nextBtn.disabled = (currentLabPage >= maxPg);
      // メッセージを閉じた後にラボ全体を再描画
      showSystemModal(`保管枠が拡張されました！ 現在の最大枠: ${maxMonsterSlots}`, function() {
        renderLabGrid();
      });
      return;
    }
  }
  closeLabItemModal();
  } catch (err) {
    console.error('アイテム使用処理でエラーが発生しました:', err);
  }
}


function openSkillsLibrary() {
  const overlay = document.getElementById('skills-library-overlay');
  const content = document.getElementById('skills-library-content');
  if (!overlay || !content) return;

  content.innerHTML = '';
  
  // Sort category order
  const catOrder = ['攻撃系', '防御系', '回復系', '補助系', 'その他'];
  const categories = {};
  catOrder.forEach(c => categories[c] = []);
  
  // Group skills by category
  Object.entries(SKILLS).forEach(([id, sk]) => {
    if (id === 'none') return;
    const catKey = sk.cat || 'その他';
    if (!categories[catKey]) categories[catKey] = [];
    categories[catKey].push({ id, ...sk });
  });

  // Render categories and their skills
  catOrder.forEach(catName => {
    const list = categories[catName];
    if (!list || list.length === 0) return;
    
    const catHeader = document.createElement('div');
    catHeader.style = 'font-weight:bold; color:var(--accent-gold); font-size:13px; margin-top:10px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;';
    catHeader.textContent = '【' + catName + '】';
    content.appendChild(catHeader);

    list.forEach(sk => {
      // Check if unlocked (either initial or unlocked by scrolls)
      const isUnlocked = sk.isInitial || unlockedSkills.includes(sk.id);
      
      const item = document.createElement('div');
      item.style = 'display:flex; align-items:flex-start; gap:10px; padding:8px; border-bottom:1px solid rgba(255,255,255,0.03); background:rgba(255,255,255,0.01); border-radius:6px;';
      
      const badgeColor = sk.type === 'アクティブ' ? 'var(--accent-red)' : 'var(--accent-green)';
      
      if (isUnlocked) {
        item.innerHTML = `
          <div style="font-size:28px; min-width:36px; text-align:center;">${sk.icon}</div>
          <div style="flex:1;">
            <div style="font-weight:bold; font-size:16px; color:var(--text-primary);">
              ${sk.name}
              <span style="font-size:12px; background:rgba(255,255,255,0.06); color:${badgeColor}; border:1px solid ${badgeColor}; padding:0px 3px; border-radius:3px; margin-left:4px; font-weight:normal;">
                ${sk.type}
              </span>
            </div>
            <div style="font-size:14px; color:var(--text-secondary); margin-top:2px; line-height:1.3;">${sk.desc}</div>
          </div>
        `;
      } else {
        item.style.opacity = '0.5';
        item.innerHTML = `
          <div style="font-size:24px; min-width:32px; text-align:center; color:var(--text-dim);">🔒</div>
          <div style="flex:1;">
            <div style="font-weight:bold; font-size:16px; color:var(--text-dim);">
              ？？？？
              <span style="font-size:12px; background:rgba(255,255,255,0.04); color:var(--text-dim); border:1px solid var(--text-dim); padding:0px 3px; border-radius:3px; margin-left:4px; font-weight:normal;">
                ${sk.type}
              </span>
            </div>
            <div style="font-size:14px; color:var(--text-dim); margin-top:2px;">（秘伝の書から解放すると表示されます）</div>
          </div>
        `;
      }
      
      content.appendChild(item);
    });
  });

  overlay.style.display = 'flex';
}

function closeSkillsLibrary() {
  document.getElementById('skills-library-overlay').style.display = 'none';
}

function renameMonster(idx) {
  const activeLab = getActiveLab();
  const m = activeLab[idx];
  if (!m) return;
  
  const overlay = document.getElementById('rename-modal-overlay');
  const input = document.getElementById('rename-modal-input');
  const confirmBtn = document.getElementById('rename-btn-confirm');
  if (!overlay || !input || !confirmBtn) return;
  
  // 現在のモンスター名を初期値として設定
  input.value = m.name;
  overlay.classList.add('active'); // クラスベースでの表示制御
  
  // フォーカスを合わせる
  setTimeout(() => input.focus(), 50);
  
  // 古いイベントリスナーの蓄積を防ぐため決定ボタンを複製・置換
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  
  newConfirmBtn.addEventListener('click', () => {
    const trimmed = input.value.trim();
    if (trimmed === '') {
      alert('名前を空欄にすることはできません。');
      return;
    }
    m.name = trimmed;
    save();
    renderLabGrid();
    closeRenameModal();
  });

  // Enterキーでの決定もサポート
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      newConfirmBtn.click();
    }
  };
}

function closeRenameModal() {
  const overlay = document.getElementById('rename-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active'); // クラスベースでの非表示制御
  }
}

function moveMonster(idx, dir) {
  const activeLab = getActiveLab();
  const targetIdx = idx + dir;
  if (targetIdx < 0 || targetIdx >= activeLab.length) return;
  
  // Swap elements
  const temp = activeLab[idx];
  activeLab[idx] = activeLab[targetIdx];
  activeLab[targetIdx] = temp;
  
  save();
  renderLabGrid();
}


let selectedLabIndex = 0;
let currentLabPage = 1;
const ITEMS_PER_PAGE = 6;

function getMonsterVisualHTML(monsterClass, systemType, height = '75px') {
  if (monsterClass && typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined' && ADDITIONAL_MONSTER_IMAGES[monsterClass]) {
    return `<img src="${ADDITIONAL_MONSTER_IMAGES[monsterClass]}" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  }
  const sysKey = Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === systemType) || 'other';
  const defaultIcon = MONSTER_TYPES[sysKey] ? MONSTER_TYPES[sysKey].icon : '🐲';
  
  if (monsterClass === 'アルファドラゴン') {
    return `<img src="IMG/dragon１A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'インフェルノス') {
    return `<img src="IMG/dragon２A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'オメガカイザー') {
    return `<img src="IMG/dragon３A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ストーンコング') {
    return `<img src="IMG/go-remu1A_.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ジェイドガーディアン') {
    return `<img src="IMG/go-remu2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ギガストーン') {
    return `<img src="IMG/go-remu3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ハーピィクイーン') {
    return `<img src="IMG/tori1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ガルーダ') {
    return `<img src="IMG/tori2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'グリフォニクス') {
    return `<img src="IMG/tori3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'サーベルタイガー') {
    return `<img src="IMG/kemono1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'キマイラロード') {
    return `<img src="IMG/kemono2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'フェンリル') {
    return `<img src="IMG/kemono3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'マミースミス') {
    return `<img src="IMG/anded1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ファントムナイト') {
    return `<img src="IMG/anded2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'デスサイズ') {
    return `<img src="IMG/anded3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'スライム') {
    return `<img src="IMG/suraim1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'キングスライム') {
    return `<img src="IMG/suraim2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ゴッドゼリー') {
    return `<img src="IMG/suraim3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'プチデビル') {
    return `<img src="IMG/devil1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'サキュバス') {
    return `<img src="IMG/devil2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ベルゼバブ') {
    return `<img src="IMG/devil3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'マンドラゴラ') {
    return `<img src="IMG/natu1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'アルラウネ') {
    return `<img src="IMG/natu2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '世界樹の眷属') {
    return `<img src="IMG/natu3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'アイアンギガ') {
    return `<img src="IMG/metar1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'メタルビット') {
    return `<img src="IMG/metar2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === 'ジェノサイダー') {
    return `<img src="IMG/metar3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else {
    return `<span style="font-size: 50px; filter: drop-shadow(0 0 6px rgba(255,255,255,0.15));">${defaultIcon}</span>`;
  }
}


function closeLabDetailModal() {
  document.getElementById('lab-detail-modal').style.display = 'none';
}

function zoomMonsterVisual(monsterClass, systemType) {
  const content = document.getElementById('image-zoom-content');
  const modal = document.getElementById('image-zoom-modal');
  if (!content || !modal) return;
  
  // Get original visual HTML with 425px height (5.0x of 85px)
  let visualHTML = getMonsterVisualHTML(monsterClass, systemType, '425px');
  
  // If it's an emoji span, replace font size with 250px (5.0x of 50px)
  if (visualHTML.includes('font-size: 50px')) {
    visualHTML = visualHTML.replace('font-size: 50px', 'font-size: 250px');
  }
  
  content.innerHTML = visualHTML;
  modal.style.display = 'flex';
}

function zoomCreatorPreviewVisual() {
  if (!creatorTemp) return;
  zoomMonsterVisual(creatorTemp.monsterClass, creatorTemp.systemType);
}

function closeImageZoomModal() {
  const modal = document.getElementById('image-zoom-modal');
  if (modal) modal.style.display = 'none';
}

function selectLabMonster(idx, autoOpen = true) {
  selectedLabIndex = idx;
  
  // Update active border class on cards
  const cards = document.querySelectorAll('#lab-grid-6 .monster-card-6');
  cards.forEach((c, i) => {
    if (i === idx) {
      c.classList.add('lab-selected');
      c.style.borderColor = 'var(--accent-cyan)';
      c.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.25)';
      c.style.background = 'rgba(0, 0, 0, 0.7)';
    } else {
      c.classList.remove('lab-selected');
      c.style.borderColor = '';
      c.style.boxShadow = '';
      c.style.background = 'transparent';
    }
  });

  const activeLab = getActiveLab();
  const modal = document.getElementById('lab-detail-modal');
  const modalContent = document.getElementById('lab-modal-content-area');
  if (!modal || !modalContent) return;

  if (activeLab.length === 0 || idx >= activeLab.length) {
    modal.style.display = 'none';
    return;
  }

  const m = activeLab[idx];
  const mainSkillId = m.skills.active[0] || m.skills.passive[0] || 'none';
  const mainSkill = SKILLS[mainSkillId] || SKILLS.none;

  modalContent.innerHTML = `
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="font-size: 16px; font-weight: bold; color: var(--accent-cyan); text-align: center; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">🧬 モンスター詳細</div>
        
        <!-- Preview Header -->
        <div style="text-align: center; margin-bottom: 6px;">
          <div style="font-size: 22px; font-weight: 900; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.name}</div>
          <div style="font-size: 13px; color: var(--text-dim); margin-top: 1px;">${m.monsterClass} (${m.systemType})</div>
        </div>
        
        <!-- Visual Display -->
        <div onclick="zoomMonsterVisual('${m.monsterClass}', '${m.systemType}')" style="height: 90px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 8px; position: relative; overflow: hidden; cursor: pointer;" title="クリックで拡大表示">
          ${getMonsterVisualHTML(m.monsterClass, m.systemType, '70px')}
        </div>
        
        <!-- Stats Board -->
        <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 8px; background: rgba(0,0,0,0.15); padding: 8px 10px; border-radius: 6px;">
          <!-- HP -->
          <div style="display: flex; flex-direction: column; gap: 1px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>HP</span><strong style="color: #fff;">${m.stats.hp}</strong></div>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;"><div style="width: ${Math.min(100, (m.stats.hp / 110) * 100)}%; height: 100%; background: #a855f7; transition: width 0.3s ease-out;"></div></div>
          </div>
          <!-- ATK -->
          <div style="display: flex; flex-direction: column; gap: 1px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>ATK</span><strong style="color: #fff;">${m.stats.attack}</strong></div>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;"><div style="width: ${Math.min(100, (m.stats.attack / 110) * 100)}%; height: 100%; background: #ef4444; transition: width 0.3s ease-out;"></div></div>
          </div>
          <!-- DEF -->
          <div style="display: flex; flex-direction: column; gap: 1px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>DEF</span><strong style="color: #fff;">${m.stats.defense}</strong></div>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;"><div style="width: ${Math.min(100, (m.stats.defense / 110) * 100)}%; height: 100%; background: #3b82f6; transition: width 0.3s ease-out;"></div></div>
          </div>
          <!-- SPD -->
          <div style="display: flex; flex-direction: column; gap: 1px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>SPD</span><strong style="color: #fff;">${m.stats.speed}</strong></div>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;"><div style="width: ${Math.min(100, (m.stats.speed / 110) * 100)}%; height: 100%; background: #10b981; transition: width 0.3s ease-out;"></div></div>
          </div>
          <!-- LUK -->
          <div style="display: flex; flex-direction: column; gap: 1px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>LUK</span><strong style="color: #fff;">${m.stats.luck}</strong></div>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;"><div style="width: ${Math.min(100, (m.stats.luck / 110) * 100)}%; height: 100%; background: #eab308; transition: width 0.3s ease-out;"></div></div>
          </div>
        </div>
        
        <!-- Skill Detail Box -->
        <div style="background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.2); border-radius: 6px; padding: 7px 10px; min-height: 44px; display: flex; flex-direction: column; justify-content: center; gap: 2px;">
          <div style="font-size: 12px; color: var(--accent-cyan); font-weight: bold;">⚡ 装備スキル: <span style="color: #fff; font-size: 13px; margin-left: 6px;">${mainSkill.name}</span></div>
          <div style="font-size: 11px; color: var(--text-dim); line-height: 1.3;">${mainSkill.desc}</div>
        </div>
      </div>
      
      <!-- Modal Close Trigger (Bottom) -->
      <button class="title-btn" onclick="closeLabDetailModal()" style="margin-top: 10px; padding: 5px 0; font-size: 16px; width: 100%;">閉じる</button>
    </div>
  `;

  if (autoOpen) {
    modal.style.display = 'flex';
  }
}



async function deleteMonster(idx) {
  if (selectedLabIndex === idx) { selectedLabIndex = Math.max(0, idx - 1); }
  closeLabDetailModal();
  const result = await showConfirmModal('このモンスターと本当にお別れしますか？\n(二度と戻ってきません)');
  if (result) {
    const activeLab = getActiveLab();
    activeLab.splice(idx, 1);
    save();
    renderLabGrid();
  }
}

// 3. Manual Step-by-Step Creator
function startManualCreate() {
  if (getActiveLab().length >= maxMonsterSlots) {
    alert('ラボの登録枠がいっぱいです！');
    return;
  }
  
  // Initialize temporary state
  creatorStep = 1;
  creatorTemp = {
    systemType: '',
    monsterClass: '',
    name: '',
    stats: { hp: 1, attack: 1, defense: 1, speed: 1, luck: 1 },
    bonusLeft: 98,
    skills: { active: [], passive: [] },
    editingLabIndex: null
  };

  // Populate System Select dropdown with optgroup separation
  const sysSelect = document.getElementById('creator-system-select');
  sysSelect.innerHTML = '';
  
  // 基本系統グループ（初期解放）
  const baseGroup = document.createElement('optgroup');
  baseGroup.label = '── 基本系統（初期解放） ──';
  
  // 追加系統グループ（要解放）
  const extraGroup = document.createElement('optgroup');
  extraGroup.label = '── 武舞台解放系統 ──';
  
  Object.entries(MONSTER_TYPES).forEach(([id, t]) => {
    if (t.hidden) return;
    
    const opt = document.createElement('option');
    opt.value = id;
    
    if (t.series) {
      // 追加5系統：シリーズ解放が必要
      const isLocked = !isSeriesUnlocked(t.series);
      const seriesNames = { robo:'ロボシリーズ', shin:'神シリーズ', dinosaur:'恐竜シリーズ', toy:'ぬいぐるみシリーズ', ghost:'おばけシリーズ' };
      if (isLocked) {
        opt.textContent = `${t.icon} ${t.label} (🔒 ${seriesNames[t.series] || t.series}解放が必要)`;
        opt.disabled = true;
      } else {
        opt.textContent = `${t.icon} ${t.label}`;
      }
      extraGroup.appendChild(opt);
    } else {
      // 基本系統：常に選択可能
      opt.textContent = `${t.icon} ${t.label}`;
      baseGroup.appendChild(opt);
    }
  });
  
  sysSelect.appendChild(baseGroup);
  sysSelect.appendChild(extraGroup);
  
  // Trigger change handler
  onCreatorSystemChange();
  
  showStep(1);
  goScreen('creator');
}

function showStep(step) {
  creatorStep = step;
  
  // Update Indicators
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById('step-dot-' + i);
    dot.className = 'step-dot';
    if (i < step) dot.classList.add('complete');
    else if (i === step) dot.classList.add('active');
  }

  // Update panels display
  for (let i = 1; i <= 3; i++) {
    const content = document.getElementById('step-content-' + i);
    content.style.display = i === step ? 'block' : 'none';
  }

  // Buttons state
  document.getElementById('btn-creator-prev').disabled = step === 1;
  updateCreatorPreview();
  const nextBtn = document.getElementById('btn-creator-next');
  if (step === 3) {
    nextBtn.textContent = '決定';
  } else {
    nextBtn.textContent = '次へ';
  }
}

function onCreatorSystemChange() {
  const sysId = document.getElementById('creator-system-select').value;
  const t = MONSTER_TYPES[sysId];
  creatorTemp.systemType = t.label;
  updateCreatorPreview();

  // Populate Classes Select dropdown
  const classSelect = document.getElementById('creator-class-select');
  classSelect.innerHTML = '';
  t.names.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    classSelect.appendChild(opt);
  });

  onCreatorClassChange();
}

function onCreatorClassChange() {
  const className = document.getElementById('creator-class-select').value;
  creatorTemp.monsterClass = className;
  
  // Auto default name
  document.getElementById('creator-name-input').value = className;
  creatorTemp.name = className;
  updateCreatorPreview();
}

function creatorPrev() {
  if (creatorStep === 1) {
    // Cancel and return to lab
    creatorTemp.editingLabIndex = null;
    goScreen('lab');
  } else if (creatorStep === 2 && creatorTemp.editingLabIndex !== null && creatorTemp.editingLabIndex !== undefined) {
    // リセット薬経由の編集モード：ステップ1には戻らずラボに戻る
    creatorTemp.editingLabIndex = null;
    goScreen('lab');
  } else if (creatorStep > 1) {
    showStep(creatorStep - 1);
  }
}

function creatorNext() {
  if (creatorStep === 1) {
    // Validate name
    const nameInput = document.getElementById('creator-name-input').value.trim();
    if (!nameInput) {
      alert('モンスターの名前を入力してください！');
      return;
    }
    creatorTemp.name = nameInput;
    
    // Copy the selected system type's base status and add basic minimum
    const sysId = document.getElementById('creator-system-select').value;
    const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
    
    // Minimum boundary: The larger of basic minimums (HP:1, ATK:1, others:0) or system-specific bases
    const minHp = Math.max(1, Number(typeInfo.base.hp) || 0);
    const minAtk = Math.max(1, Number(typeInfo.base.attack) || 0);
    const minDef = Math.max(0, Number(typeInfo.base.defense) || 0);
    const minSpd = Math.max(0, Number(typeInfo.base.speed) || 0);
    const minLck = Math.max(0, Number(typeInfo.base.luck) || 0);

    creatorTemp.stats = {
      hp: minHp,
      attack: minAtk,
      defense: minDef,
      speed: minSpd,
      luck: minLck
    };
    creatorTemp.bonusLeft = 98;
    
    // Set up step 2 UI
    buildCreatorStatAllocator();
    showStep(2);
  } else if (creatorStep === 2) {
    // Check remaining points
    if (creatorTemp.bonusLeft !== 0) {
      alert(`ボーナスポイントが ${creatorTemp.bonusLeft}pt 残っています。すべて(残り0ptになるまで)割り振ってください！`);
      return;
    }
    
    // リセット薬経由の再配分モード：ステータスのみ更新してスキル選択はスキップ
    if (creatorTemp.editingLabIndex !== null && creatorTemp.editingLabIndex !== undefined) {
      const activeLab = getActiveLab();
      const editIdx = creatorTemp.editingLabIndex;
      if (editIdx >= 0 && editIdx < activeLab.length) {
        // ステータスのみ上書き（スキルは元のまま保持）
        activeLab[editIdx].stats = { ...creatorTemp.stats };
        save();
        alert(`「${activeLab[editIdx].name}」のステータスを再配分しました！`);
        creatorTemp.editingLabIndex = null;
        goScreen('lab');
        return;
      }
    }

    // 新規作成モード：ステップ3（スキル選択）へ
    buildCreatorSkillSelector();
    showStep(3);
  } else if (creatorStep === 3) {
    // Finalize save
    const totalChosen = creatorTemp.skills.active.length + creatorTemp.skills.passive.length;
    if (totalChosen < 1) {
      alert('スキルを1つ選択してください！');
      return;
    }
    
    const activeLab = getActiveLab();
    // 新規作成モード
    // Save to lab
    if (activeLab.length >= maxMonsterSlots) {
      alert('ラボの登録枠がいっぱいです！');
      return;
    }
    
    const finalMonster = {
      id: String(Date.now()),
      name: creatorTemp.name,
      systemType: creatorTemp.systemType,
      monsterClass: creatorTemp.monsterClass,
      stats: { ...creatorTemp.stats },
      skills: { ...creatorTemp.skills }
    };
    
    activeLab.push(finalMonster);
    save();
    
    // Tutorial Phase 3 completion: Messages 3 & 4
    if (gameProgress.tutorialStep === 3) {
      showStoryDialog([
        { speaker: playerName || '主人公', text: '「よし、できたぞ！ コイツが俺の考え抜いた『最高のビルドモンスター』だ！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: playerName || '主人公', text: '「まずはコイツで闘技場を勝ち進んで、もっと強力なスキルを手に入れるぞ！ 待ってろよヴィクター、すぐに追いついてやる！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      ], () => {
        onFirstBuildCompleteStoryEnd();
      });
      return; // チュートリアル中はダイアログ完了後に遷移
    }
    if (creatorReturnToScouting) {
      creatorReturnToScouting = false;
      goScreen('scouting');
    } else {
      goScreen('lab');
    }
  }
}

// Step 2: Stats Allocation Building
function buildCreatorStatAllocator() {
  const container = document.getElementById('stat-allocator-container');
  container.innerHTML = '';
  
  const statKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
  const labels = { hp: '❤️ HP', attack: '⚔️ 攻撃', defense: '🛡️ 防御', speed: '💨 素早', luck: '⭐ 運' };
  
  const sysSelect = document.getElementById('creator-system-select');
  const sysId = sysSelect ? sysSelect.value : 'dragon';
  const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
  
  // Enforce base limits
  statKeys.forEach(k => {
    const basicMin = (k === 'hp' || k === 'attack') ? 1 : 0;
    const minVal = Math.max(basicMin, Number(typeInfo.base[k]) || 0);
    if (creatorTemp.stats[k] < minVal) {
      creatorTemp.stats[k] = minVal;
    }
  });
  
  Object.entries(labels).forEach(([statKey, labelText]) => {
    const basicMin = (statKey === 'hp' || statKey === 'attack') ? 1 : 0;
    const minVal = Math.max(basicMin, Number(typeInfo.base[statKey]) || 0);
    
    const row = document.createElement('div');
    row.className = 'alloc-row';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'alloc-label';
    labelSpan.textContent = labelText;
    
    const controls = document.createElement('div');
    controls.className = 'alloc-controls';
    controls.style = 'display: flex; align-items: center; gap: 6px;';
    
    // -10 Button
    const minus10Btn = document.createElement('button');
    minus10Btn.className = 'alloc-btn';
    minus10Btn.style = 'width: 50px; font-size: 15px; padding: 4px 0;';
    minus10Btn.textContent = '-10';
    minus10Btn.id = `btn-minus10-${statKey}`;
    minus10Btn.onclick = () => {
      const current = Number(creatorTemp.stats[statKey]);
      const target = Math.max(minVal, current - 10);
      creatorTemp.stats[statKey] = target;
      updateAllocatorUI();
    };

    // -1 Button
    const minusBtn = document.createElement('button');
    minusBtn.className = 'alloc-btn';
    minusBtn.textContent = '－';
    minusBtn.id = `btn-minus-${statKey}`;
    minusBtn.onclick = () => {
      const current = Number(creatorTemp.stats[statKey]);
      if (current > minVal) {
        creatorTemp.stats[statKey] = current - 1;
        updateAllocatorUI();
      }
    };
    
    // Value Label
    const valSpan = document.createElement('span');
    valSpan.className = 'alloc-value';
    valSpan.id = 'creator-alloc-val-' + statKey;
    valSpan.textContent = creatorTemp.stats[statKey];
    
    // +1 Button
    const plusBtn = document.createElement('button');
    plusBtn.className = 'alloc-btn';
    plusBtn.textContent = '＋';
    plusBtn.id = `btn-plus-${statKey}`;
    plusBtn.onclick = () => {
      if (creatorTemp.bonusLeft > 0) {
        creatorTemp.stats[statKey] = Number(creatorTemp.stats[statKey]) + 1;
        updateAllocatorUI();
      }
    };

    // +10 Button
    const plus10Btn = document.createElement('button');
    plus10Btn.className = 'alloc-btn';
    plus10Btn.style = 'width: 50px; font-size: 15px; padding: 4px 0;';
    plus10Btn.textContent = '+10';
    plus10Btn.id = `btn-plus10-${statKey}`;
    plus10Btn.onclick = () => {
      const addAmt = Math.min(10, creatorTemp.bonusLeft);
      creatorTemp.stats[statKey] = Number(creatorTemp.stats[statKey]) + addAmt;
      updateAllocatorUI();
    };
    
    controls.appendChild(minus10Btn);
    controls.appendChild(minusBtn);
    controls.appendChild(valSpan);
    controls.appendChild(plusBtn);
    controls.appendChild(plus10Btn);
    
    row.appendChild(labelSpan);
    row.appendChild(controls);
    container.appendChild(row);

    // Visual gauge
    const gaugeWrap = document.createElement('div');
    gaugeWrap.className = 'mini-gauge-container';
    gaugeWrap.style.margin = '4px 0 10px 0';
    
    const gaugeFill = document.createElement('div');
    gaugeFill.className = 'mini-gauge-fill fill-' + (statKey === 'hp' ? 'hp' : (statKey === 'attack' ? 'atk' : (statKey === 'defense' ? 'def' : (statKey === 'speed' ? 'spd' : 'lck'))));
    gaugeFill.id = 'creator-alloc-gauge-' + statKey;
    
    gaugeWrap.appendChild(gaugeFill);
    container.appendChild(gaugeWrap);
  });
  
  updateAllocatorUI();
}

function updateAllocatorUI() {
  const statKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
  
  const sysSelect = document.getElementById('creator-system-select');
  const sysId = sysSelect ? sysSelect.value : 'dragon';
  const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
  
  // Calculate allocated bonus points based on (currentVal - minVal)
  let allocatedPoints = 0;
  statKeys.forEach(k => {
    const basicMin = (k === 'hp' || k === 'attack') ? 1 : 0;
    const minVal = Math.max(basicMin, Number(typeInfo.base[k]) || 0);
    const currentVal = Number(creatorTemp.stats[k]);
    allocatedPoints += Math.max(0, currentVal - minVal);
  });
  
  const remaining = Math.max(0, 98 - allocatedPoints);
  creatorTemp.bonusLeft = remaining;
  
  const bonusPtsDisplay = document.getElementById('creator-bonus-pts');
  if (bonusPtsDisplay) {
    bonusPtsDisplay.textContent = remaining;
  }
  
  statKeys.forEach(statKey => {
    const basicMin = (statKey === 'hp' || statKey === 'attack') ? 1 : 0;
    const minVal = Math.max(basicMin, Number(typeInfo.base[statKey]) || 0);
    const currentVal = Number(creatorTemp.stats[statKey]);
    
    const valSpan = document.getElementById('creator-alloc-val-' + statKey);
    if (valSpan) {
      valSpan.textContent = currentVal;
    }
    
    const m10Btn = document.getElementById(`btn-minus10-${statKey}`);
    const mBtn = document.getElementById(`btn-minus-${statKey}`);
    const pBtn = document.getElementById(`btn-plus-${statKey}`);
    const p10Btn = document.getElementById(`btn-plus10-${statKey}`);
    
    if (m10Btn) m10Btn.disabled = currentVal <= minVal;
    if (mBtn) mBtn.disabled = currentVal <= minVal;
    
    if (pBtn) pBtn.disabled = remaining <= 0;
    if (p10Btn) p10Btn.disabled = remaining <= 0;

    // Dynamically adjust visual gauge width (relative to a max scale of 100)
    const gaugeEl = document.getElementById('creator-alloc-gauge-' + statKey);
    if (gaugeEl) {
      gaugeEl.style.width = Math.min(100, (currentVal / 100) * 100) + '%';
    }
  });
}

function buildCreatorSkillSelector() {
  const container = document.getElementById('creator-skills-list');
  if (!container) { console.error('creator-skills-list not found'); return; }
  container.innerHTML = '';
  
  // Get available skills for current game mode
  const availableIds = getAvailableSkills();
  
  // Group skills by category
  const categories = {};
  const catOrder = ['攻撃系', '防御系', '回復系', '補助系', 'その他'];
  catOrder.forEach(c => categories[c] = []);
  
  Object.entries(SKILLS).forEach(([id, sk]) => {
    if (id === 'none') return;
    if (!availableIds.includes(id)) return;
    const catKey = sk.cat || 'その他';
    if (!categories[catKey]) categories[catKey] = [];
    categories[catKey].push({ id, ...sk });
  });

  // Determine currently selected skill
  const currentSkillId = creatorTemp.skills.active[0] || creatorTemp.skills.passive[0] || '';

  // Render by category
  catOrder.forEach(catName => {
    const list = categories[catName];
    if (!list || list.length === 0) return;
    
    const header = document.createElement('div');
    header.style = 'font-size:15px; color:var(--accent-gold); font-weight:700; margin-top:8px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;';
    header.textContent = '【' + catName + '】';
    container.appendChild(header);

    list.forEach(sk => {
      const item = document.createElement('label');
      item.style = 'display:flex; align-items:flex-start; gap:8px; padding:6px; cursor:pointer; font-size:16px; border-bottom:1px solid rgba(255,255,255,0.03);';
      
      const rad = document.createElement('input');
      rad.type = 'radio';
      rad.name = 'creator-skill-choice';
      rad.value = sk.id;
      rad.style = 'margin-top:2px;';
      
      const isSelected = (sk.type === 'アクティブ' && creatorTemp.skills.active.includes(sk.id)) ||
                         (sk.type === 'パッシブ' && creatorTemp.skills.passive.includes(sk.id));
      rad.checked = isSelected;
      
      rad.onchange = () => {
        if (rad.checked) {
          if (sk.type === 'アクティブ') {
            creatorTemp.skills = { active: [sk.id], passive: [] };
          } else {
            creatorTemp.skills = { active: [], passive: [sk.id] };
          }
        }
        updateCreatorPreview();
      };
      
      item.appendChild(rad);
      
      const descDiv = document.createElement('div');
      const badgeColor = sk.type === 'アクティブ' ? 'var(--accent-red)' : 'var(--accent-green)';
      const typeLabel = sk.type === 'アクティブ' ? `${sk.type} (MP: 8)` : `${sk.type} (MP 8で自動発動)`;
      descDiv.innerHTML = '<strong>' + sk.icon + ' ' + sk.name + '</strong> <span style="font-size:12px; background:rgba(255,255,255,0.06); color:' + badgeColor + '; border:1px solid ' + badgeColor + '; padding:0px 3px; border-radius:3px; margin-left:4px;">' + typeLabel + '</span><br><span style="font-size:14px; color:var(--text-dim);">' + sk.desc + '</span>';
      item.appendChild(descDiv);
      container.appendChild(item);
    });
  });
}

// 4. Random Create Logic
function executeRandomCreate() {
  if (getActiveLab().length >= maxMonsterSlots) {
    alert('ラボの登録枠がいっぱいです！');
    return;
  }
  
  // 1. Pick a random system and class
  const availableTypes = Object.entries(MONSTER_TYPES).filter(([id, t]) => {
    if (t.hidden) return false;
    if (t.series && !isSeriesUnlocked(t.series)) return false;
    return true;
  });
  
  const randomTypeTuple = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  const systemId = randomTypeTuple[0];
  const systemObj = randomTypeTuple[1];
  
  const className = systemObj.names[Math.floor(Math.random() * systemObj.names.length)];
  
  // 2. Initialize from system base and distribute 98 points
  const stats = { hp: 1, attack: 1, defense: 1, speed: 1, luck: 1 };
  let bonusLeft = 105; // 110 - 5(min 1 each)
  const statKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
  while (bonusLeft > 0) {
    const key = statKeys[Math.floor(Math.random() * statKeys.length)];
    stats[key]++;
    bonusLeft--;
  }

  // 3. Distribute exactly 1 random skill from database
  const availableIds = getAvailableSkills().filter(id => id !== 'none');
  const skillPool = availableIds.map(id => ({ id, ...SKILLS[id] }));
  const chosenSkill = skillPool[Math.floor(Math.random() * skillPool.length)];
  const skillsObj = { active: [], passive: [] };
  if (chosenSkill.type === 'アクティブ') {
    skillsObj.active = [chosenSkill.id];
  } else {
    skillsObj.passive = [chosenSkill.id];
  }

  const randomMonster = {
    id: String(Date.now()),
    name: className,
    systemType: systemObj.label,
    monsterClass: className,
    stats: stats,
    skills: skillsObj
  };

  const activeLab = getActiveLab();
  activeLab.push(randomMonster);
  save();
  
  // Tutorial Phase 3 completion: Messages 3 & 4
  if (gameProgress.tutorialStep === 3) {
    showStoryDialog([
      { speaker: playerName || '主人公', text: '「よし、できたぞ！ コイツが俺の考え抜いた『最高のビルドモンスター』だ！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      { speaker: playerName || '主人公', text: '「まずはコイツで闘技場を勝ち進んで、もっと強力なスキルを手に入れるぞ！ 待ってろよヴィクター、すぐに追いついてやる！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    ], () => {
      onFirstBuildCompleteStoryEnd();
    });
    return; // チュートリアル中はダイアログ完了後に遷移
  }
  renderLabGrid();
  
  addLogMessageToBattleScreen(`🎲 【${className}】がランダム作成されました！`);
}

function addLogMessageToBattleScreen(text) {
  alert(text);
}

// 5. Scouting Selection list mapping to labMonsters
function renderSelList() {
  const container = document.getElementById('scout-monster-list');
  if (!container) return;
  container.innerHTML = '';
  
  const activeLab = getActiveLab();
  // Ensure selected index is inside bounds
  if (selBattle >= activeLab.length) {
    selBattle = 0;
  }
  
  const btn = document.getElementById('btn-battle');
  
  if (activeLab.length === 0) {
    container.innerHTML = `<div style="color:var(--text-dim); text-align:center; padding:20px; font-size:16px;">作成したモンスターがいません。ラボで作成してください。</div>`;
    if (btn) btn.disabled = true;
    return;
  }

  getActiveLab().forEach((m, idx) => {
    const d = document.createElement('div');
    d.className = 'scout-monster-item' + (selBattle === idx ? ' active' : '');
    d.onclick = () => {
      selBattle = idx;
      renderSelList();
    };
    
    const actSkills = m.skills.active.map(sk => SKILLS[sk] ? SKILLS[sk].name : sk).join(', ');
    const pasSkill = SKILLS[m.skills.passive[0]] ? SKILLS[m.skills.passive[0]].name : m.skills.passive[0];

    d.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
        <span style="font-weight:bold; color:var(--accent-gold); font-size:16px;">${m.name}</span>
        <span style="font-size:14px; color:var(--text-dim);">${m.monsterClass} (${m.systemType})</span>
      </div>
      <div style="font-size:14px; color:var(--text-main); margin-bottom:4px;">
        HP:${m.stats.hp} ATK:${m.stats.attack} DEF:${m.stats.defense} SPD:${m.stats.speed} LCK:${m.stats.luck}
      </div>
      <div style="font-size:13px; color:var(--text-dim);">
        ⚡ スキル: ${actSkills || pasSkill || 'なし'}
      </div>
    `;
    container.appendChild(d);
  });

  if (btn) btn.disabled = false;
}




// ============================================================
//  GAME MODE MANAGEMENT
// ============================================================

function startMode(mode) {
  currentGameMode = mode;
  
  if (mode === 'league') {
    currentLabMode = 'story';
    // stageIndex reset removed to support resuming league battles from saved stageIndex
  } else if (mode === 'survival') {
    currentLabMode = 'story';
    survivalWins = 0;
  } else if (mode === 'free') {
    currentLabMode = 'free';
  }
  
  // Prepare the enemy immediately when starting a mode!
  prepareStage();
  
  const activeLab = getActiveLab();
  if (activeLab.length === 0) {
    const modeName = mode === 'free' ? 'フリー対戦' : (mode === 'league' ? 'リーグ戦' : '勝ち抜き戦');
    alert(`【${modeName}】を開始するにはモンスターが必要です。モンスター作成画面に移行します。`);
    creatorReturnToScouting = true;
    startManualCreate();
  } else {
    creatorReturnToScouting = false;
    if (mode === 'free') {
      goScreen('free-battle-lobby');
    } else {
      goScreen('scouting');
    }
  }
}

function getAvailableSkills() {
  if (typeof currentLabMode !== 'undefined' && currentLabMode === 'free') {
    // Free battle: all skills available
    return Object.keys(SKILLS);
  }
  
  // League/Story mode: initial 16 + unlocked prize skills
  const available = [];
  Object.entries(SKILLS).forEach(([id, sk]) => {
    if (sk.isInitial) {
      available.push(id);
    } else if (unlockedSkills.includes(id)) {
      available.push(id);
    }
  });
  return available;
}

// Scroll reward system
function showScrollReward() {
  const overlay = document.getElementById('scroll-overlay');
  const result = document.getElementById('scroll-result');
  const cards = document.getElementById('scroll-cards-container');
  result.style.display = 'none';
  cards.style.display = 'flex';
  overlay.style.display = 'flex';
}

function pickScroll(scrollType) {
  // Find prize skills of this scrollType that are not yet unlocked
  const candidates = [];
  Object.entries(SKILLS).forEach(([id, sk]) => {
    if (sk.scrollType === scrollType && !sk.isInitial && !unlockedSkills.includes(id)) {
      candidates.push({ id, ...sk });
    }
  });
  
  const cards = document.getElementById('scroll-cards-container');
  const result = document.getElementById('scroll-result');
  const resultText = document.getElementById('scroll-result-text');
  
  if (candidates.length === 0) {
    cards.style.display = 'none';
    resultText.innerHTML = 'この秘伝書の技はすべて修得済みです！<br>おめでとうございます！';
    result.style.display = 'block';
    return;
  }
  
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  unlockedSkills.push(chosen.id);
  save();
  updateSkillProgressUI();
  checkSkillMilestones();
  
  cards.style.display = 'none';
  resultText.innerHTML = chosen.icon + ' <span style="color:var(--accent-gold);">『' + chosen.name + '』</span> のスキルを新たに修得した！<br><span style="font-size:15px; color:var(--text-dim); margin-top:8px; display:inline-block;">' + chosen.desc + '</span>';
  result.style.display = 'block';
}

function closeScrollOverlay() {
  document.getElementById('scroll-overlay').style.display = 'none';
  goScreen('main-menu');
}


function prepareStage() {
  const badge = document.getElementById('stage-display');
  if (!badge) return; // Guard: element may not exist yet during early init
  
  if (currentGameMode === 'league') {
    if (stageIndex >= STAGE_ENEMIES.length) {
      stageIndex = 0; // reset if overflow
    }
    currentEnemy = STAGE_ENEMIES[stageIndex];
    badge.textContent = `STAGE ${stageIndex + 1} / ${STAGE_ENEMIES.length}`;
  } else if (currentGameMode === 'survival') {
    // Survival mode: Pick a random base from STAGE_ENEMIES and scale stats slightly based on wins
    const baseEnemy = STAGE_ENEMIES[Math.floor(Math.random() * STAGE_ENEMIES.length)];
    
    // Scale stats slightly: +2% per win
    const scale = 1.0 + (survivalWins * 0.02);
    currentEnemy = {
      name: baseEnemy.name,
      title: `試練の塔 (階層: ${survivalWins + 1}階)`,
      icon: baseEnemy.icon,
      rumor: `塔の門番として立ちふさがる！ 現在の到達階層: ${survivalWins}階`,
      hp: Math.max(1, Math.round(baseEnemy.hp * scale)),
      attack: Math.max(1, Math.round(baseEnemy.attack * scale)),
      defense: Math.max(1, Math.round(baseEnemy.defense * scale)),
      speed: Math.max(1, Math.round(baseEnemy.speed * scale)),
      luck: Math.max(1, Math.round(baseEnemy.luck * scale)),
      skill: baseEnemy.skill,
      type: baseEnemy.type
    };
    badge.textContent = `🗼 試練の塔: ${survivalWins + 1}階 (BEST: ${survivalBestRecord}階)`;
  } else {
    // Free Battle: Pick a random enemy from list
    const baseEnemy = STAGE_ENEMIES[Math.floor(Math.random() * STAGE_ENEMIES.length)];
    currentEnemy = { ...baseEnemy };
    badge.textContent = `⚔️ フリー対戦`;
  }

  renderEnemyInfo();
}



const STAGE_IMAGES_LIST = [
  "IMG2/01goburin.png",
  "IMG2/02da-kub.png",
  "IMG2/03aiang.png",
  "IMG2/04megado.png",
  "IMG2/05sta-.png",
  "IMG2/06da-kumana.png",
  "IMG2/07supi-do.png",
  "IMG2/08ribinga-ma.png",
  "IMG2/09ba-sa-ka.png",
  "IMG2/10gyanbura-.png",
  "IMG2/11asasinn.png",
  "IMG2/12kong.png",
  "IMG2/13vanpaia.png",
  "IMG2/14go-st.png",
  "IMG2/15sto-ngorem.png",
  "IMG2/16nekuro.png",
  "IMG2/17raitoba-fdo.png",
  "IMG2/18o-ku.png",
  "IMG2/19suko-pio.png",
  "IMG2/20feari-.png",
  "IMG2/21paradhin.png",
  "IMG2/22fantomsi-fu.png",
  "IMG2/23fensa-.png",
  "IMG2/24kimaira.png",
  "IMG2/25roiyaruga-do.png"
];

function getEnemyImageHTML(eObj) {
  const imgClass = "enemy-monster-img";
  // 0. eObj が sprite / image を持つ場合、または「覇王」の場合は指定パス画像（./IMG2/haou.jpg）を表示
  if (eObj && typeof eObj === "object") {
    const customImg = eObj.sprite || eObj.image || (typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined' ? (ADDITIONAL_MONSTER_IMAGES[eObj.monsterClass || eObj.name] || ADDITIONAL_MONSTER_IMAGES[eObj.name]) : null);
    if (customImg) {
      return `<img src="${customImg}" class="${imgClass}">`;
    }
    if (eObj.name && eObj.name.includes("覇王")) {
      return `<img src="./IMG2/haou.jpg" class="${imgClass}">`;
    }
  }
  if (typeof eObj === "string" && eObj.includes("覇王")) {
    return `<img src="./IMG2/haou.jpg" class="${imgClass}">`;
  }


  // 1. リーグ戦（CPUリーグ）の場合は従来通りステージ画像を使用
  if (typeof stageIndex !== 'undefined' && currentGameMode === 'league' && STAGE_IMAGES_LIST[stageIndex]) {
    return `<img src="${STAGE_IMAGES_LIST[stageIndex]}" class="${imgClass}">`;
  }

  // 種族名・名前の検索用キーを取得
  let mClass = '';
  let sysType = '';
  let eName = '';
  
  if (typeof eObj === 'string') {
    eName = eObj;
    mClass = eObj;
  } else if (eObj && typeof eObj === 'object') {
    mClass = eObj.monsterClass || eObj.title || eObj.name || '';
    sysType = eObj.systemType || '';
    eName = eObj.name || '';
  }

  // 2. 既存のSTAGE_ENEMIES順次マッチ（リーグ戦等）
  if (typeof STAGE_ENEMIES !== 'undefined') {
    const idx = STAGE_ENEMIES.findIndex(x => x.name === eName || x.name === mClass);
    if (idx !== -1 && STAGE_IMAGES_LIST[idx]) {
      return `<img src="${STAGE_IMAGES_LIST[idx]}" class="${imgClass}">`;
    }
  }

  // 3. プレイヤー利用可能全27種族の敵用グラフィック画像 (B.png シリーズ)
  const getImg = (src) => `<img src="${src}" class="${imgClass}">`;
  if (mClass === 'アルファドラゴン' || eName === 'アルファドラゴン') return getImg("IMG/dragon１B.png");
  if (mClass === 'インフェルノス' || eName === 'インフェルノス') return getImg("IMG/dragon２B.png");
  if (mClass === 'オメガカイザー' || eName === 'オメガカイザー') return getImg("IMG/dragon３B.png");
  if (mClass === 'ストーンコング' || eName === 'ストーンコング') return getImg("IMG/go-remu1B.png");
  if (mClass === 'ジェイドガーディアン' || eName === 'ジェイドガーディアン') return getImg("IMG/go-remu2B.png");
  if (mClass === 'ギガストーン' || eName === 'ギガストーン') return getImg("IMG/go-remu3B.png");
  if (mClass === 'ハーピィクイーン' || eName === 'ハーピィクイーン') return getImg("IMG/tori1B.png");
  if (mClass === 'ガルーダ' || eName === 'ガルーダ') return getImg("IMG/tori2B.png");
  if (mClass === 'グリフォニクス' || eName === 'グリフォニクス') return getImg("IMG/tori3B.png");
  if (mClass === 'サーベルタイガー' || eName === 'サーベルタイガー') return getImg("IMG/kemono1B.png");
  if (mClass === 'キマイラロード' || eName === 'キマイラロード') return getImg("IMG/kemono2B.png");
  if (mClass === 'フェンリル' || eName === 'フェンリル') return getImg("IMG/kemono3B.png");
  if (mClass === 'マミースミス' || eName === 'マミースミス') return getImg("IMG/anded1B.png");
  if (mClass === 'ファントムナイト' || eName === 'ファントムナイト') return getImg("IMG/anded2B.png");
  if (mClass === 'デスサイズ' || eName === 'デスサイズ') return getImg("IMG/anded3B.png");
  if (mClass === 'スライム' || eName === 'スライム') return getImg("IMG/suraim1B.png");
  if (mClass === 'キングスライム' || eName === 'キングスライム') return getImg("IMG/suraim2B.png");
  if (mClass === 'ゴッドゼリー' || eName === 'ゴッドゼリー') return getImg("IMG/suraim3B.png");
  if (mClass === 'プチデビル' || eName === 'プチデビル') return getImg("IMG/devil1B.png");
  if (mClass === 'サキュバス' || eName === 'サキュバス') return getImg("IMG/devil2B.png");
  if (mClass === 'ベルゼバブ' || eName === 'ベルゼバブ') return getImg("IMG/devil3B.png");
  if (mClass === 'マンドラゴラ' || eName === 'マンドラゴラ') return getImg("IMG/natu1B.png");
  if (mClass === 'アルラウネ' || eName === 'アルラウネ') return getImg("IMG/natu2B.png");
  if (mClass === '世界樹の眷属' || eName === '世界樹の眷属') return getImg("IMG/natu3B.png");
  if (mClass === 'アイアンギガ' || eName === 'アイアンギガ') return getImg("IMG/metar1B.png");
  if (mClass === 'メタルビット' || eName === 'メタルビット') return getImg("IMG/metar2B.png");
  if (mClass === 'ジェノサイダー' || eName === 'ジェノサイダー') return getImg("IMG/metar3B.png");

  // 4. 系統名によるフォールバック画像設定
  if (sysType.includes('ドラゴン')) return getImg("IMG/dragon１B.png");
  if (sysType.includes('岩石') || sysType.includes('ゴーレム')) return getImg("IMG/go-remu1B.png");
  if (sysType.includes('鳥')) return getImg("IMG/tori1B.png");
  if (sysType.includes('獣')) return getImg("IMG/kemono1B.png");
  if (sysType.includes('アンデッド') || sysType.includes('不死')) return getImg("IMG/anded1B.png");
  if (sysType.includes('スライム')) return getImg("IMG/suraim1B.png");
  if (sysType.includes('悪魔') || sysType.includes('デビル')) return getImg("IMG/devil1B.png");
  if (sysType.includes('植物') || sysType.includes('自然')) return getImg("IMG/natu1B.png");
  if (sysType.includes('メタル') || sysType.includes('機械')) return getImg("IMG/metar1B.png");

  return `<span style="font-size: 65px; display: inline-block;">🐲</span>`;
}

function renderEnemyInfo() {
  const panel = document.getElementById('scout-enemy-panel');
  if (!panel) return;
  
  if (!currentEnemy) {
    panel.innerHTML = '<div style="color:var(--text-dim); text-align:center; padding:20px;">対戦相手を準備中...</div>';
    return;
  }
  
  const e = currentEnemy;
  const isTutorialBoss = (gameProgress.tutorialStep === 2);
  
  let badgeLabel;
  if (currentGameMode === 'boss-revenge') {
    badgeLabel = '👑 覇王リベンジマッチ';
  } else if (currentGameMode === 'league') {
    badgeLabel = `⚠️ STAGE ${stageIndex + 1}`;
  } else {
    badgeLabel = `🗼 試練の塔: ${survivalWins + 1}階`;
  }
  
  // チュートリアル時はステータスを隠蔽
  const dispHP = isTutorialBoss ? '？？？' : e.hp;
  const dispATK = isTutorialBoss ? '？？？' : e.attack;
  const dispDEF = isTutorialBoss ? '？？？' : e.defense;
  const dispSPD = isTutorialBoss ? '？？？' : e.speed;
  const dispLUK = isTutorialBoss ? '？？？' : e.luck;
  const gaugeHP = isTutorialBoss ? 0 : Math.min(100, (e.hp / 110) * 100);
  const gaugeATK = isTutorialBoss ? 0 : Math.min(100, (e.attack / 110) * 100);
  const gaugeDEF = isTutorialBoss ? 0 : Math.min(100, (e.defense / 110) * 100);
  const gaugeSPD = isTutorialBoss ? 0 : Math.min(100, (e.speed / 110) * 100);
  const gaugeLUK = isTutorialBoss ? 0 : Math.min(100, (e.luck / 110) * 100);
  
  panel.innerHTML = `
    <div class="enemy-rank-badge" style="margin-top:0px;">${badgeLabel}</div>
    <div class="enemy-icon" style="height: 70px; display: flex; align-items: center; justify-content: center; margin: 2px 0;">${getEnemyImageHTML(e)}</div>
    <div class="enemy-name-display" style="color:var(--accent-red); font-weight:bold; font-size:16px;">${e.name}</div>
    <div class="enemy-title-display" style="font-size:11px; margin-bottom:4px;">${e.title || '謎の対戦相手'}</div>
    
    <div class="rumor-box">
      <div class="rumor-label">📢 噂・情報</div>
      <div class="rumor-text" style="font-size:12px; line-height:1.3;">${isTutorialBoss ? '未知の強敵。ステータスは一切不明……' : (e.rumor || '敵に関する情報は十分に掴めていない。')}</div>
    </div>
    
    <div class="enemy-stats-preview" style="margin-top:6px; display:grid; grid-template-columns:repeat(2, 1fr); gap:4px 10px; background:transparent !important; border:2px solid rgba(255,255,255,0.6) !important; border-radius:8px; padding:6px; font-size:12px; text-align:left;">
      <div>
        HP: <strong style="color:var(--text-primary);">${dispHP}</strong>
        <div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-hp" style="width: ${gaugeHP}%;"></div></div>
      </div>
      <div>
        攻撃: <strong style="color:var(--text-primary);">${dispATK}</strong>
        <div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-atk" style="width: ${gaugeATK}%;"></div></div>
      </div>
      <div>
        防御: <strong style="color:var(--text-primary);">${dispDEF}</strong>
        <div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-def" style="width: ${gaugeDEF}%;"></div></div>
      </div>
      <div>
        素早: <strong style="color:var(--text-primary);">${dispSPD}</strong>
        <div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-spd" style="width: ${gaugeSPD}%;"></div></div>
      </div>
      <div style="grid-column: span 2;">
        運: <strong style="color:var(--text-primary);">${dispLUK}</strong>
        <div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-lck" style="width: ${gaugeLUK}%;"></div></div>
      </div>
      <div style="grid-column: span 2; border-top:1px solid rgba(255,255,255,0.2); padding-top:4px; margin-top:2px;">
        ⚡ スキル: <strong style="color:var(--text-secondary);">❓ 未知の技 (発動時に開示)</strong>
      </div>
    </div>
  `;
}

function initBattle() {
  console.log('initBattle started');
  
  // 1. Clear old timers and logs
  battleTimers.forEach(t => clearTimeout(t));
  battleTimers = [];
  activeTimers.forEach(t => clearTimeout(t));
  activeTimers = [];
  clearLog();

  // ★ ゲームモードに応じてパーティ編成データを強制切替（二重安全策）
  if (currentGameMode === 'free') {
    currentLabMode = 'free';
  } else {
    currentLabMode = 'story';
  }

  // 2. Fetch monster and enemy parameters (pre-requisites)
  const activeLab = getActiveLab();
  
  // ★ パーティが空の場合は出撃エラー警告
  if (activeLab.length === 0) {
    const modeLabel = currentGameMode === 'free' ? 'フリーバトル用' : 'ストーリー用';
    alert(`${modeLabel}の編成にモンスターが登録されていません。\nラボで${modeLabel}編成にモンスターを登録してください。`);
    goScreen('lab');
    return;
  }
  let pm = activeLab[selBattle];
  if (!pm) {
    if (activeLab.length > 0) {
      selBattle = 0;
      pm = activeLab[0];
    } else {
      pm = {
        name: 'ダミードラゴン',
        systemType: 'ドラゴン系',
        monsterClass: 'アルファドラゴン',
        stats: { hp: 22, attack: 22, defense: 22, speed: 22, luck: 22 },
        skills: { active: ['none'], passive: [] }
      };
    }
  }

  if (!pm.stats) pm.stats = { hp: 22, attack: 22, defense: 22, speed: 22, luck: 22 };
  if (!pm.skills) pm.skills = { active: ['none'], passive: [] };

  const pHp = (pm.stats.hp !== undefined && pm.stats.hp !== null) ? Number(pm.stats.hp) * 5 : 100;
  const pAtk = (pm.stats.attack !== undefined && pm.stats.attack !== null) ? Number(pm.stats.attack) : 22;
  const pDef = (pm.stats.defense !== undefined && pm.stats.defense !== null) ? Number(pm.stats.defense) : 22;
  const pSpd = (pm.stats.speed !== undefined && pm.stats.speed !== null) ? Number(pm.stats.speed) : 22;
  const pLck = (pm.stats.luck !== undefined && pm.stats.luck !== null) ? Number(pm.stats.luck) : 22;

  pState = { 
    name: pm.name || 'ななしのモンスター',
    type: Object.keys(MONSTER_TYPES).find(key => MONSTER_TYPES[key].label === pm.systemType) || 'other',
    hp: pHp,
    attack: pAtk,
    defense: pDef,
    speed: pSpd,
    luck: pLck,
    mp: 10,
    maxMp: 10,
    skill: (pm.skills && pm.skills.active && pm.skills.active[0]) || 'none',
    passiveSkill: (pm.skills && pm.skills.passive && pm.skills.passive[0]) || 'none',
    skillsList: pm.skills,
    cur: pHp, 
    max: pHp, 
    skillUsed: false,
    charged: false,
    defending: false,
    piorimTurns: 0,
    barrier: 0,
    regenTurns: 0,
    teppekiTurns: 0,
    enmakuTurns: 0,
    weakmakerTurns: 0,
    strengthenTurns: 0,
    paperarmorTurns: 0,
    slownurseTurns: 0,
    overclockTurns: 0,
    shadowstepTurns: 0,
    reverseTurns: 0,
    nextTurnPriority: false,
    migawariTriggered: false,
    togeTriggered: false,
    fortressTurns: 0,
    parryTriggered: false,
    recycleHeal: 0,
    lastOpponentSkill: 'none',
    scared: false,
    glassShieldActive: false,
    evasionStreak: 0,
    playdeadTriggered: false,
  };

  if (!currentEnemy) {
    prepareStage();
  }
  const em = currentEnemy || {
    name: 'ゴブリンチーフ',
    type: 'other',
    hp: 18,
    attack: 22,
    defense: 15,
    speed: 25,
    luck: 20,
    skill: 'none'
  };

  const eHp = (em.hp !== undefined && em.hp !== null) ? (Number(em.hp) <= 100 ? Number(em.hp) * 5 : Number(em.hp)) : 100;
  const eAtk = (em.attack !== undefined && em.attack !== null) ? Number(em.attack) : 22;
  const eDef = (em.defense !== undefined && em.defense !== null) ? Number(em.defense) : 15;
  const eSpd = (em.speed !== undefined && em.speed !== null) ? Number(em.speed) : 25;
  const eLck = (em.luck !== undefined && em.luck !== null) ? Number(em.luck) : 20;

  eState = { 
    skillRevealed: false,
    name: em.name || '謎の敵',
    type: em.type || 'other',
    hp: eHp,
    attack: eAtk,
    defense: eDef,
    speed: eSpd,
    luck: eLck,
    mp: 10,
    maxMp: 10,
    skill: em.skill || 'none',
    skillsList: { active: [em.skill || 'none'], passive: [em.skill || 'none'] },
    cur: eHp, 
    max: eHp, 
    skillUsed: false,
    charged: false,
    defending: false,
    piorimTurns: 0,
    barrier: 0,
    regenTurns: 0,
    teppekiTurns: 0,
    enmakuTurns: 0,
    weakmakerTurns: 0,
    strengthenTurns: 0,
    paperarmorTurns: 0,
    slownurseTurns: 0,
    overclockTurns: 0,
    shadowstepTurns: 0,
    reverseTurns: 0,
    nextTurnPriority: false,
    migawariTriggered: false,
    togeTriggered: false,
    fortressTurns: 0,
    parryTriggered: false,
    recycleHeal: 0,
    lastOpponentSkill: 'none',
    scared: false,
    glassShieldActive: false,
    evasionStreak: 0,
    playdeadTriggered: false,
  };

  // 3. UI and board setup
  try {
    const ctrl = document.getElementById('battle-controls');
    if (ctrl) ctrl.style.display = 'flex';
    const resModal = document.getElementById('battle-result-modal');
    if (resModal) resModal.style.display = 'none';

    // Reset usage limits
    skillUsedThisBattle = false;
    let skillBtn = document.getElementById('btn-command-skill');
    if (skillBtn) {
      skillBtn.disabled = false;
      skillBtn.style.opacity = '1';
      const usageInfo = document.getElementById('skill-btn-usage-info');
      if (usageInfo) usageInfo.textContent = '1戦1回限り';
    }

    // Set header labels for System and Classes
    const playerSysLabel = document.getElementById('player-sys-label');
    const playerClassLabel = document.getElementById('player-class-label');
    const enemySysLabel = document.getElementById('enemy-sys-label');
    const enemyClassLabel = document.getElementById('enemy-class-label');
    
    if (playerSysLabel) playerSysLabel.textContent = '[SYSTEM: ' + pm.systemType + ']';
    if (playerClassLabel) playerClassLabel.textContent = pm.monsterClass;
    if (enemySysLabel) enemySysLabel.textContent = '[SYSTEM: ' + (MONSTER_TYPES[em.type] ? MONSTER_TYPES[em.type].label : '？？？') + ']';
    if (enemyClassLabel) enemyClassLabel.textContent = em.title || 'エネミー';

    // Render Stats to Board and update Gauge Bars
    const maxVal = 110;
    
    document.getElementById('stat-val-p-hp').textContent = pHp;
    document.getElementById('stat-val-p-attack').textContent = pAtk;
    document.getElementById('stat-bar-p-attack').style.width = Math.min(100, (pAtk / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-p-defense').textContent = pDef;
    document.getElementById('stat-bar-p-defense').style.width = Math.min(100, (pDef / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-p-speed').textContent = pSpd;
    document.getElementById('stat-bar-p-speed').style.width = Math.min(100, (pSpd / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-p-luck').textContent = pLck;
    document.getElementById('stat-bar-p-luck').style.width = Math.min(100, (pLck / maxVal) * 100) + '%';

    const isTutorialMode = (gameProgress.tutorialStep === 2);
    
    document.getElementById('stat-val-e-hp').textContent = isTutorialMode ? '？？？' : eHp;
    document.getElementById('stat-val-e-attack').textContent = isTutorialMode ? '？？？' : eAtk;
    document.getElementById('stat-bar-e-attack').style.width = isTutorialMode ? '0%' : Math.min(100, (eAtk / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-e-defense').textContent = isTutorialMode ? '？？？' : eDef;
    document.getElementById('stat-bar-e-defense').style.width = isTutorialMode ? '0%' : Math.min(100, (eDef / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-e-speed').textContent = isTutorialMode ? '？？？' : eSpd;
    document.getElementById('stat-bar-e-speed').style.width = isTutorialMode ? '0%' : Math.min(100, (eSpd / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-e-luck').textContent = isTutorialMode ? '？？？' : eLck;
    document.getElementById('stat-bar-e-luck').style.width = isTutorialMode ? '0%' : Math.min(100, (eLck / maxVal) * 100) + '%';

    // Render Skills board
    const mySkill = pm.skills.active[0] || 'none';
    document.getElementById('player-skill-name').textContent = (SKILLS[mySkill] || SKILLS.none).name;
    document.getElementById('player-skill-desc').textContent = (SKILLS[mySkill] || SKILLS.none).desc;

    // Secret Enemy skill setup
    const enemySkillNameEl = document.getElementById('enemy-skill-name');
    if (enemySkillNameEl) {
      enemySkillNameEl.textContent = '[ ？？？？？？ ]';
      enemySkillNameEl.setAttribute('data-text', '[ ？？？？？？ ]');
      enemySkillNameEl.classList.add('glitch-text');
    }

    // Advice Setup
    renderAdvice();

    const sysKey = Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === pm.systemType) || 'other';
    document.getElementById('fn-player').textContent = pState.name;
    document.getElementById('fn-enemy').textContent = eState.name;

    // Set player visual (check monsterClass or custom name)
    const playerIconEl = document.getElementById('fi-player');
    const pNameForImage = pm.monsterClass || pState.name;
    if (pNameForImage === 'アルファドラゴン') {
      playerIconEl.innerHTML = `<img src="IMG/dragon１A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'インフェルノス') {
      playerIconEl.innerHTML = `<img src="IMG/dragon２A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'オメガカイザー') {
      playerIconEl.innerHTML = `<img src="IMG/dragon３A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ストーンコング') {
      playerIconEl.innerHTML = `<img src="IMG/go-remu1A_.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ジェイドガーディアン') {
      playerIconEl.innerHTML = `<img src="IMG/go-remu2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ギガストーン') {
      playerIconEl.innerHTML = `<img src="IMG/go-remu3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ハーピィクイーン') {
      playerIconEl.innerHTML = `<img src="IMG/tori1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ガルーダ') {
      playerIconEl.innerHTML = `<img src="IMG/tori2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'グリフォニクス') {
      playerIconEl.innerHTML = `<img src="IMG/tori3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'サーベルタイガー') {
      playerIconEl.innerHTML = `<img src="IMG/kemono1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'キマイラロード') {
      playerIconEl.innerHTML = `<img src="IMG/kemono2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'フェンリル') {
      playerIconEl.innerHTML = `<img src="IMG/kemono3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'マミースミス') {
      playerIconEl.innerHTML = `<img src="IMG/anded1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ファントムナイト') {
      playerIconEl.innerHTML = `<img src="IMG/anded2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'デスサイズ') {
      playerIconEl.innerHTML = `<img src="IMG/anded3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'スライム') {
      playerIconEl.innerHTML = `<img src="IMG/suraim1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'キングスライム') {
      playerIconEl.innerHTML = `<img src="IMG/suraim2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ゴッドゼリー') {
      playerIconEl.innerHTML = `<img src="IMG/suraim3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'プチデビル') {
      playerIconEl.innerHTML = `<img src="IMG/devil1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'サキュバス') {
      playerIconEl.innerHTML = `<img src="IMG/devil2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ベルゼバブ') {
      playerIconEl.innerHTML = `<img src="IMG/devil3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'マンドラゴラ') {
      playerIconEl.innerHTML = `<img src="IMG/natu1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'アルラウネ') {
      playerIconEl.innerHTML = `<img src="IMG/natu2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === '世界樹の眷属') {
      playerIconEl.innerHTML = `<img src="IMG/natu3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'アイアンギガ') {
      playerIconEl.innerHTML = `<img src="IMG/metar1A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'メタルビット') {
      playerIconEl.innerHTML = `<img src="IMG/metar2A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else if (pNameForImage === 'ジェノサイダー') {
      playerIconEl.innerHTML = `<img src="IMG/metar3A.png" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">`;
    } else {
      playerIconEl.innerHTML = MONSTER_TYPES[sysKey] ? MONSTER_TYPES[sysKey].icon : '🐲';
    }

        // Set enemy visual using unified getEnemyImageHTML
    const enemyIconEl = document.getElementById('fi-enemy');
    enemyIconEl.innerHTML = getEnemyImageHTML(em);
    setHp('p', pState); setHp('e', eState);
    setMp('p', pState); setMp('e', eState);
    updateBuffsUI('p', pState); updateBuffsUI('e', eState);
    clearLog();

    const active1 = (pm.skills && pm.skills.active && pm.skills.active[0]) || 'none';
    pState.skill = active1;
    
    const userSk = SKILLS[pState.skill] || SKILLS.none;
    if (pState.skill === 'none' || userSk.type === 'パッシブ') {
      skillBtn.disabled = true;
      skillBtn.style.opacity = '0.5';
      skillBtn.textContent = '⚡ スキルなし (MP: 8)';
    } else {
      const canUseSkill = (pState.mp >= 8);
      skillBtn.disabled = !canUseSkill;
      skillBtn.style.opacity = canUseSkill ? '1.0' : '0.5';
      skillBtn.textContent = '⚡ ' + userSk.name + ' (MP: 8)';
    }
    
    skillBtn.onclick = () => {
      if (pState.mp < 8) {
        alert('MPが足りません！（必要MP: 8）');
        return;
      }
      selectCommand('skill');
    };

    // イベント戦・ラスボス覇王戦での撤退制御
    const escapeBtn = document.getElementById('escape-btn');
    if (escapeBtn) {
      const isBossFight = (eState && (eState.name === '覇王ヴィクター' || eState.isBoss));
      escapeBtn.disabled = isBossFight;
      escapeBtn.style.opacity = isBossFight ? '0.4' : '1.0';
      escapeBtn.style.cursor = isBossFight ? 'not-allowed' : 'pointer';
    }

    currentTurn = 0;
    addLog(`⚔️ バトル開始！ 【${pState.name}】 vs 【${eState.name}】`, 'log-info');
    
    const ptInfo = MONSTER_TYPES[pState.type] || MONSTER_TYPES.other;
    const etInfo = MONSTER_TYPES[eState.type] || MONSTER_TYPES.other;
    addLog(ptInfo.icon+' '+pState.name+'：【'+ptInfo.label+'】', 'log-info');
    addLog(etInfo.icon+' '+eState.name+'：【'+etInfo.label+'】', 'log-info');

    // TRIGGER BATTLE START PASSIVES
    [pState, eState].forEach((actor, idx) => {
      const opp = idx === 0 ? eState : pState;
      const sk = actor.skill;
      const passives = (actor.skillsList && Array.isArray(actor.skillsList.passive)) ? actor.skillsList.passive : [];
      
      // フォーチュンダイス
      if (sk === 'fdice' || passives.includes('fdice')) {
        const roll = Math.floor(Math.random() * 41) - 10;
        actor.luck = Math.max(0, actor.luck + roll);
        addLog(`🎲 ${actor.name} の「フォーチュンダイス」！ 運が ${roll >= 0 ? '+' + roll : roll} 変動し、運:${actor.luck} になった！`, 'log-skill');
      }
      
      // プレッシャー
      if (sk === 'pressure' || passives.includes('pressure')) {
        if (actor.luck > opp.luck) {
          opp.scared = true;
          addLog(`👁️ ${actor.name} の「プレッシャー」！ ${opp.name} は怯えて動けない！`, 'log-skill');
        }
      }
      
      // ステータス・シャッフル
      if (sk === 'shuffle' || passives.includes('shuffle')) {
        const tmpSpd = actor.speed;
        actor.speed = opp.speed;
        opp.speed = tmpSpd;
        addLog(`🔀 ${actor.name} の「ステータス・シャッフル」！ お互いの素早さ(${actor.speed} ⇄ ${opp.speed})が入れ替わった！`, 'log-skill');
      }

      // 大振り
      if (sk === 'heavyatk' || passives.includes('heavyatk')) {
        actor.attack = Math.floor(actor.attack * 1.15);
        actor.speed = Math.floor(actor.speed * 0.7);
        addLog(`💪 ${actor.name} の「大振り」！ 攻撃力+15%、素早さ-30%に変動した！ (攻撃:${actor.attack} / 素早さ:${actor.speed})`, 'log-skill');
      }

      // 威嚇のポーズ
      if (sk === 'intimidate' || passives.includes('intimidate')) {
        opp.attack = Math.max(1, opp.attack - 1);
        addLog(`🦁 ${actor.name} の「威嚇のポーズ」！ ${opp.name} の攻撃力を 1 減少させた！ (攻撃:${opp.attack})`, 'log-skill');
      }

      // ガラスの盾
      if (sk === 'glassshield' || passives.includes('glassshield')) {
        actor.glassShieldActive = true;
        addLog(`🛡️ ${actor.name} は「ガラスの盾」を構えた！ 初撃の防御力1.2倍、以降10%低下！`, 'log-skill');
      }
    });

    setHp('p', pState); setHp('e', eState);
    setBattleMode(battleMode);
    setStrategy(autoStrategy);

    nextTurn();

  } catch (err) {
    window.onerror(err.message, 'index.html', 0, 0, err);
  }
}

function nextTurn() {
  currentTurn++;
  addLog(`<span class="log-turn">◆ ターン ${currentTurn} ◆</span>`, 'log-turn');

  // MP auto-recovery per turn (+1)
  [pState, eState].forEach((actor, i) => {
    if (actor.cur <= 0) return;
    actor.mp = Math.min(actor.maxMp || 10, (actor.mp || 0) + 1);
    setMp(i === 0 ? 'p' : 'e', actor);
    
    // MPが8以上たまり次第、パッシブスキルをターン頭で自動発動
    const opp = i === 0 ? eState : pState;
    checkAutoPassiveTrigger(i === 0 ? 'p' : 'e', actor, i === 0 ? 'e' : 'p', opp);

    // Regen passive
    if (actor.regenTurns > 0) {
      const healAmt = Math.min(actor.max - actor.cur, Math.max(1, Math.floor(actor.max * 0.08)));
      actor.cur = Math.min(actor.max, actor.cur + healAmt);
      setHp(i === 0 ? 'p' : 'e', actor);
      addLog(`💧 ${actor.name} のリジェネレートで最大HPの8%(${healAmt})回復！ (残HP: ${actor.cur})`, 'log-info');
      actor.regenTurns--;
      if (actor.regenTurns === 0) addLog(`💧 ${actor.name} のリジェネレートが切れた。`, 'log-info');
    }

    // Buff turn countdowns
    if (actor.daibogyoTurns > 0) {
      actor.daibogyoTurns--;
      if (actor.daibogyoTurns === 0) {
        actor.daibogyoActive = false;
        addLog(`🛡️ ${actor.name} の大防御の効果が切れた。`, 'log-info');
      }
    }
    if (actor.teppekiTurns > 0) {
      actor.teppekiTurns--;
      if (actor.teppekiTurns === 0) addLog(`🧱 ${actor.name} の鉄壁の構えが切れた。`, 'log-info');
    }
    if (actor.strengthenTurns > 0) {
      actor.strengthenTurns--;
      if (actor.strengthenTurns === 0) addLog(`💪 ${actor.name} の筋力強化が切れた。`, 'log-info');
    }
    if (actor.paperarmorTurns > 0) {
      actor.paperarmorTurns--;
      if (actor.paperarmorTurns === 0) addLog(`📜 ${actor.name} の紙装甲の呪いが切れた。`, 'log-info');
    }
    if (actor.slownurseTurns > 0) {
      actor.slownurseTurns--;
      if (actor.slownurseTurns === 0) addLog(`⏳ ${actor.name} の鈍足の呪いが切れた。`, 'log-info');
    }
    if (actor.overclockTurns > 0) {
      actor.overclockTurns--;
      if (actor.overclockTurns === 0) {
        actor.cur = Math.max(1, actor.cur - 5);
        addLog(`⚙️ ${actor.name} のオーバークロック終了！ 反動でHPが 5 減少した！`, 'log-info');
        setHp(i === 0 ? 'p' : 'e', actor);
      }
    }
    if (actor.shadowstepTurns > 0) {
      actor.shadowstepTurns--;
      if (actor.shadowstepTurns === 0) addLog(`👣 ${actor.name} のシャドーステップが切れた。`, 'log-info');
    }
    if (actor.reverseTurns > 0) {
      actor.reverseTurns--;
      if (actor.reverseTurns === 0) addLog(`🌀 ${actor.name} のリバースルーム空間が収束した。`, 'log-info');
    }
    if (actor.fortressTurns > 0) {
      actor.fortressTurns--;
      if (actor.fortressTurns === 0) addLog(`🏰 ${actor.name} の最後の砦（無敵効果）が切れた。`, 'log-info');
    }

    // 規定ターン経過のバフ解除＆ステータス復元更新
    updateMonsterBuffs(actor, i === 0 ? 'p' : 'e');
  });

  updateBuffsUI('p', pState);
  updateBuffsUI('e', eState);

  // 怯え(pressure) の処理
  if (pState.scared) {
    pState.scared = false;
    addLog(`👁️ ${pState.name} は怯えてこのターン動けない！`, 'log-miss');
    isPlayerTurn = false;
    enableCommandButtons(false);
    const t = setTimeout(() => {
      // Enemy acts, player does nothing
      executeTurnActions('none', decideEnemyCommand(), false);
    }, delay(600));
    activeTimers.push(t);
    return;
  }
  if (eState.scared) {
    eState.scared = false;
    addLog(`👁️ ${eState.name} は怯えてこのターン動けない！`, 'log-miss');
    if (battleMode === 'manual') {
      isPlayerTurn = true;
      enableCommandButtons(true);
    } else {
      isPlayerTurn = false;
      enableCommandButtons(false);
      const t = setTimeout(() => {
        executeTurnActions(decidePlayerAutoCommand(), 'none', true);
      }, delay(400));
      activeTimers.push(t);
    }
    return;
  }

  if (battleMode === 'manual') {
    isPlayerTurn = true;
    enableCommandButtons(true);
  } else {
    isPlayerTurn = false;
    enableCommandButtons(false);
    const t = setTimeout(() => triggerAutoAction(), delay(300));
    activeTimers.push(t);
  }
}

function enableCommandButtons(enable) {
  const buttons = document.querySelectorAll('#manual-commands-panel button');
  const userSk = (pState && SKILLS[pState.skill]) ? SKILLS[pState.skill] : SKILLS.none;
  const pMp = (pState && pState.mp !== undefined) ? pState.mp : 10;
  
  buttons.forEach(btn => {
    if (btn.id === 'btn-command-skill') {
      const isSkillAvailable = enable && pMp >= 8 && pState.skill !== 'none' && userSk.type !== 'パッシブ';
      btn.disabled = !isSkillAvailable;
      btn.style.opacity = isSkillAvailable ? '1.0' : '0.5';
      const usageInfo = document.getElementById('skill-btn-usage-info');
      if (usageInfo) usageInfo.textContent = '(MP: 8)';
    } else {
      btn.disabled = !enable;
    }
  });

  if (enable) {
    startThinkingTimer();
    renderAdvice();
  } else {
    stopThinkingTimer();
  }
}

function getEffectiveSpeed(state) {
  let spd = state.speed;
  if (state.slownurseTurns > 0) spd = Math.max(0, spd - 20);
  if (state.overclockTurns > 0) spd *= 2;
  const passives = (state.skillsList && Array.isArray(state.skillsList.passive)) ? state.skillsList.passive : [];
  if (currentTurn <= 2 && (state.skill === 'firstwind' || passives.includes('firstwind'))) spd += 100;
  return spd;
}

function calculateEvasionRate(attacker, defender) {
  const atkSpd = getEffectiveSpeed(attacker);
  const defSpd = getEffectiveSpeed(defender);

  // 基本計算: 防御側SPD + 防御側LUK×0.5 - 攻撃側LUK×0.5
  let evasion = defSpd + (defender.luck * 0.5) - (attacker.luck * 0.5);
  if (defender.shadowstepTurns > 0) evasion += 20;
  if (attacker.enmakuTurns > 0) evasion += 50;

  return Math.max(0, Math.min(100, Math.floor(evasion)));
}

function getGlassShieldDefense(state) {
  let def = state.defense;
  if (state.teppekiTurns > 0) def *= 2;
  if (state.paperarmorTurns > 0) def = Math.floor(def / 2);
  
  const passives = (state.skillsList && Array.isArray(state.skillsList.passive)) ? state.skillsList.passive : [];
  if (state.skill === 'glassshield' || passives.includes('glassshield')) {
    if (state.glassShieldActive) {
      def = Math.floor(def * 1.2);
      state.glassShieldActive = false;
      addLog(`🛡️ ${state.name} の「ガラスの盾」発動！ 初撃を耐えるため防御力1.2倍！`, 'log-skill');
    } else {
      def = Math.max(0, Math.floor(def * 0.9));
    }
  }
  return def;
}

function selectCommand(playerCmd) {
  if (!isPlayerTurn) return;

  if (playerCmd === 'surrender' || playerCmd === 'escape') {
    showConfirmModal('戦闘から撤退しますか？').then(result => {
      if (result) {
        addLog(`🏃 ${pState.name} は戦闘から撤退した！`, 'log-miss');
        if (window.soundManager) window.soundManager.playSE('escape');
        pState.cur = 0;
        setTimeout(() => {
          showResult();
        }, 500);
      }
    });
    return;
  }


  if (playerCmd === 'skill') {
    if (!pState || pState.mp < 8) {
      alert('MPが足りません！（必要MP: 8）');
      return;
    }
  }

  isPlayerTurn = false;
  enableCommandButtons(false);

  const enemyCmd = decideEnemyCommand();

  // Speed and absolute priorities
  let pSpd = getEffectiveSpeed(pState);
  let eSpd = getEffectiveSpeed(eState);

  let playerFirst;
  
  // Sutemi absolute priority check
  const pSutemi = pState.nextTurnPriority;
  const eSutemi = eState.nextTurnPriority;
  pState.nextTurnPriority = false;
  eState.nextTurnPriority = false;

  // Reverse room condition (素早さが低い方が早い)
  const isReversed = pState.reverseTurns > 0 || eState.reverseTurns > 0;

  if (pSutemi && !eSutemi) {
    playerFirst = true;
  } else if (eSutemi && !pSutemi) {
    playerFirst = false;
  } else {
    if (isReversed) {
      if (pSpd < eSpd) playerFirst = true;
      else if (eSpd < pSpd) playerFirst = false;
      else playerFirst = pState.luck > eState.luck;
    } else {
      if (pSpd > eSpd) playerFirst = true;
      else if (eSpd > pSpd) playerFirst = false;
      else playerFirst = pState.luck > eState.luck;
    }
  }

  executeTurnActions(playerCmd, enemyCmd, playerFirst);
}

function triggerAutoAction() {
  const playerCmd = decidePlayerAutoCommand();
  const enemyCmd = decideEnemyCommand();

  let pSpd = getEffectiveSpeed(pState);
  let eSpd = getEffectiveSpeed(eState);

  const pSutemi = pState.nextTurnPriority;
  const eSutemi = eState.nextTurnPriority;
  pState.nextTurnPriority = false;
  eState.nextTurnPriority = false;

  const isReversed = pState.reverseTurns > 0 || eState.reverseTurns > 0;

  let playerFirst;
  if (pSutemi && !eSutemi) {
    playerFirst = true;
  } else if (eSutemi && !pSutemi) {
    playerFirst = false;
  } else {
    if (isReversed) {
      if (pSpd < eSpd) playerFirst = true;
      else if (eSpd < pSpd) playerFirst = false;
      else playerFirst = pState.luck > eState.luck;
    } else {
      if (pSpd > eSpd) playerFirst = true;
      else if (eSpd > pSpd) playerFirst = false;
      else playerFirst = pState.luck > eState.luck;
    }
  }

  executeTurnActions(playerCmd, enemyCmd, playerFirst);
}

function decidePlayerAutoCommand() {
  const sk = pState.skill;
  const hpPct = pState.cur / pState.max;
  const userSk = SKILLS[sk] || SKILLS.none;

  // If skill can be used (MP >= 8), use under matching conditions
  const pMpAuto = (pState.mp !== undefined) ? pState.mp : 10;
  if (sk !== 'none' && pMpAuto >= 8 && userSk.type === 'アクティブ') {
    // Healing action priority
    if (['heal', 'pray', 'soulshare', 'fukutsu'].includes(sk)) {
      if (sk === 'fukutsu' && pState.cur === 1) return 'skill';
      if (hpPct <= 0.4) return 'skill';
    }
    // Strategic buff priority
    if (['strengthen', 'teppeki', 'daibogyo', 'shadowstep', 'reverse'].includes(sk)) {
      if (Math.random() < 0.5) return 'skill';
    }
    // Special turn-1 limit skill: blankshot
    if (sk === 'blankshot') {
      if (currentTurn === 1) return 'skill';
    }
    // High offensive skills
    if (['gigabreak', 'moroha', 'sutemi', 'shuriken', 'midare', 'ichigeki', 'weakmaker', 'luckstrike'].includes(sk)) {
      if (Math.random() < 0.7) return 'skill';
    }
  }

  if (autoStrategy === 'gangan') {
    if (!pState.charged && Math.random() < 0.15) return 'charge';
    return 'attack';
  } 
  if (autoStrategy === 'inochi') {
    if (hpPct <= 0.4 && Math.random() < 0.4) return 'defend';
    return 'attack';
  } 
  if (autoStrategy === 'batchiri') {
    if (hpPct <= 0.25 && Math.random() < 0.3) return 'defend';
    return 'attack';
  }
  return 'attack';
}

function decideEnemyCommand() {
  const sk = eState.skill;
  const hpPct = eState.cur / eState.max;
  const enemySk = SKILLS[sk] || SKILLS.none;
  const eMp = (eState.mp !== undefined) ? eState.mp : 10;

  // MP 8以上でスキルを使用可能
  if (sk !== 'none' && enemySk.type === 'アクティブ' && eMp >= 8) {
    if (['heal', 'pray', 'soulshare', 'fukutsu'].includes(sk)) {
      if (sk === 'fukutsu' && eState.cur === 1) return 'skill';
      if (hpPct <= 0.4) return 'skill';
    }
    if (sk === 'blankshot' && currentTurn === 1) return 'skill';
    if (Math.random() < 0.6) return 'skill';
  }

  // MPが不足している際、チャージやガードで効率よくMPを貯める
  if (eMp < 8) {
    if (!eState.charged && Math.random() < 0.3) return 'charge';
    if (hpPct <= 0.3 && Math.random() < 0.25) return 'defend';
  }

  if (hpPct <= 0.25 && Math.random() < 0.2) return 'defend';
  return 'attack';
}

function executeTurnActions(pCmd, eCmd, playerFirst) {
  const actions = playerFirst 
    ? [ { side: 'p', cmd: pCmd, otherCmd: eCmd }, { side: 'e', cmd: eCmd, otherCmd: pCmd } ]
    : [ { side: 'e', cmd: eCmd, otherCmd: pCmd }, { side: 'p', cmd: pCmd, otherCmd: eCmd } ];

  executeSingleAction(actions[0].side, actions[0].cmd, actions[1].side, actions[1].cmd, () => {
    if (pState.cur > 0 && eState.cur > 0) {
      executeSingleAction(actions[1].side, actions[1].cmd, actions[0].side, actions[0].cmd, () => {
        if (pState.cur > 0 && eState.cur > 0) {
          const t = setTimeout(() => nextTurn(), delay(400));
          activeTimers.push(t);
        } else {
          const t = setTimeout(() => checkBattleEnd(), delay(400));
          activeTimers.push(t);
        }
      });
    } else {
      const t = setTimeout(() => checkBattleEnd(), delay(400));
      activeTimers.push(t);
    }
  });
}

function executeSingleAction(actorSide, cmd, targetSide, targetCmd, onComplete) {
  const actor = actorSide === 'p' ? pState : eState;
  const target = targetSide === 'p' ? pState : eState;
  
  if (actor.cur <= 0) {
    onComplete();
    return;
  }

  if (actor.scared) {
    actor.scared = false;
    addLog(`💤 ${actor.name} は動けない状態になっている！`, 'log-miss');
    onComplete();
    return;
  }

  // Clear defend unless they defended this turn
  if (cmd !== 'defend') actor.defending = false;

  const isCharged = actor.charged;
  const isDefending = target.defending;

  // Pre-action passive: Parry (パリィ - Initial fast dodge)
  let parried = false;
  if (hasPassive(target, 'parry') && !target.parryTriggered) {
    const actorSpd = getEffectiveSpeed(actor);
    const targetSpd = getEffectiveSpeed(target);
    if (actorSpd > targetSpd) {
      target.parryTriggered = true;
      parried = true;
    }
  }

  if (cmd === 'none') {
    onComplete();
    return;
  }

  if (cmd === 'attack') {
    addLog(`⚔️ ${actor.name} の攻撃！`, 'log-normal');
    
    // Parry activation check
    if (parried) {
      const t = setTimeout(() => {
        addLog(`⚔️ ${target.name} はパッシブ「パリィ」を発動！ 初回攻撃を完全回避！`, 'log-skill');
        onComplete();
      }, delay(300));
      activeTimers.push(t);
      return;
    }

    // 回避率計算（新方式）
    let evasion = calculateEvasionRate(actor, target);

    if (Math.random() * 100 < evasion) {
      const t = setTimeout(() => {
        target.evasionStreak = (target.evasionStreak || 0) + 1;
        addLog(`💫 ${target.name} は攻撃をかわした！ (回避率:${Math.round(evasion)}%)`, 'log-miss');
        if (isCharged) actor.charged = false;
        updateBuffsUI(actorSide, actor);
        onComplete();
      }, delay(300));
      activeTimers.push(t);
      return;
    }

    target.evasionStreak = 0; // 命中したのでストリークリセット
    // Critical check
    let critChance = actor.luck;
    if (actor.enmakuTurns > 0) critChance *= 0.5; // enmaku halves crit
    let isCrit = Math.random() * 100 < critChance;
    
    // Fortress (無敵) check
    if (target.fortressTurns > 0) {
      const t = setTimeout(() => {
        addLog(`🏰 ${target.name} は無敵状態！ ダメージを全く受けない！`, 'log-miss');
        if (isCharged) actor.charged = false;
        onComplete();
      }, delay(300));
      activeTimers.push(t);
      return;
    }

    let dmg = 0;
    if (isCrit && target.skill !== 'fudo') {
      dmg = actor.attack;
      if (actor.strengthenTurns > 0) dmg = Math.floor(dmg * 1.5);
      dmg = Math.floor(dmg);

      if (isDefending) dmg = Math.floor(dmg / 2);

      processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);
    } else {
      let atk = actor.attack;
      if (actor.strengthenTurns > 0) atk = Math.floor(atk * 1.5);
      let def = getGlassShieldDefense(target);

      dmg = Math.max(0, atk - def);
      dmg = Math.floor(dmg);

      if (isDefending) dmg = Math.floor(dmg / 2);

      // Scrap damage 30% chance
      let isScrap = false;
      if (dmg === 0 && Math.random() < 0.3) {
        dmg = 1;
        isScrap = true;
      }

      processDamage(actorSide, actor, targetSide, target, dmg, false, isScrap, onComplete);
    }

  } else if (cmd === 'charge') {
    actor.charged = true;
    if (!actor.chargeMultiplier) {
      actor.chargeMultiplier = 2; // Normal charge command gives 2x damage multiplier next turn
    }
    actor.mp = Math.min(actor.maxMp || 10, (actor.mp || 0) + 2);
    setMp(actorSide, actor);
    addLog(`🔋 ${actor.name} は力をためている！（MP +2 回復 / MP:${actor.mp}）`, 'log-info');
    checkAutoPassiveTrigger(actorSide, actor, targetSide, target);
    updateBuffsUI(actorSide, actor);
    const t = setTimeout(() => onComplete(), delay(400));
    activeTimers.push(t);

  } else if (cmd === 'defend') {
    actor.defending = true;
    actor.mp = Math.min(actor.maxMp || 10, (actor.mp || 0) + 1);
    setMp(actorSide, actor);
    addLog(`🛡️ ${actor.name} は身を守っている！（MP +1 回復 / MP:${actor.mp}）`, 'log-info');
    checkAutoPassiveTrigger(actorSide, actor, targetSide, target);
    updateBuffsUI(actorSide, actor);
    const t = setTimeout(() => onComplete(), delay(400));
    activeTimers.push(t);

  } else if (cmd === 'skill') {
    actor.mp = Math.max(0, (actor.mp || 0) - 8);
    setMp(actorSide, actor);
    const sk = actor.skill;
    // Reveal enemy skill on first use
    if (actor === eState && !actor.skillRevealed && sk !== 'none' && SKILLS[sk]) {
      actor.skillRevealed = true;
      const enemySkillEl = document.getElementById('enemy-skill-name');
      if (enemySkillEl) {
        enemySkillEl.textContent = SKILLS[sk].icon + ' ' + SKILLS[sk].name;
        enemySkillEl.classList.remove('glitch-text');
        enemySkillEl.removeAttribute('data-text');
      }
      addLog(`❗ ${actor.name} の隠された技が判明！ → ${SKILLS[sk].icon} 【${SKILLS[sk].name}】`, 'log-crit');
    }

    oppLastActiveSkill(target, sk); // Store last skill for copycat
    addLog(`⚡ ${actor.name} の「${(SKILLS[sk]||SKILLS.none).name}」！（MP -8 / MP:${actor.mp}）`, 'log-skill');

    // 攻撃スキルの命中率・回避判定（通常攻撃と同等の回避率・パリィ・無敵判定）
    const attackSkills = ['gigabreak', 'moroha', 'sutemi', 'shuriken', 'midare', 'ichigeki', 'weakmaker', 'haisui', '吸血', 'jackpot'];
    if (attackSkills.includes(sk)) {
      // 1. パリィ判定
      if (parried) {
        const t = setTimeout(() => {
          addLog(`⚔️ ${target.name} はパッシブ「パリィ」を発動！ スキルを完全回避！`, 'log-skill');
          if (isCharged) actor.charged = false;
          onComplete();
        }, delay(300));
        activeTimers.push(t);
        return;
      }

      // 2. 回避率判定 (相手のSPD, LUK, 残像, 煙幕等)
    // 回避率計算（新方式）
    let evasion = calculateEvasionRate(actor, target);

      if (Math.random() * 100 < evasion) {
        const t = setTimeout(() => {
          addLog(`💫 ${target.name} はスキルの攻撃をかわした！ (回避率:${Math.round(evasion)}%)`, 'log-miss');
          if (isCharged) actor.charged = false;
          updateBuffsUI(actorSide, actor);
          onComplete();
        }, delay(300));
        activeTimers.push(t);
        return;
      }

      target.evasionStreak = 0; // 命中したのでストリークリセット
      // 3. 無敵判定 (最後の砦)
      if (target.fortressTurns > 0) {
        const t = setTimeout(() => {
          addLog(`🏰 ${target.name} は無敵状態！ スキルダメージを受けない！`, 'log-miss');
          if (isCharged) actor.charged = false;
          onComplete();
        }, delay(300));
        activeTimers.push(t);
        return;
      }
    }

    if (sk === 'gigabreak') {
      let dmg = actor.attack + actor.luck;
      dmg = Math.floor(dmg);
      if (isDefending) dmg = Math.floor(dmg / 2);
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, onComplete);

    } else if (sk === 'moroha') {
      let dmg = actor.attack * 2;
      dmg = Math.floor(dmg);
      if (isDefending) dmg = Math.floor(dmg / 2);
      
      const recoil = Math.floor(actor.max * 0.3);
      actor.cur = Math.max(1, actor.cur - recoil); // Recoil won't directly kill actor (leaves 1 HP)

      processDamage(actorSide, actor, targetSide, target, dmg, false, false, () => {
        addLog(`🩸 諸刃の反動！ ${actor.name} は ${recoil} の反動ダメージを受けた！`, 'log-miss');
        setHp(actorSide, actor);
        onComplete();
      });

    } else if (sk === 'sutemi') {
      actor.nextTurnPriority = true; // absolute priority next turn
      actor.defense = 0; // defense to 0 for this turn
      let dmg = actor.attack;
      dmg = Math.floor(dmg); // ignore defense!
      processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);

    } else if (sk === 'shuriken') {
      let dmg = actor.attack * 0.75;
      dmg = Math.floor(dmg); // ignores defense
      processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);

    } else if (sk === 'counter') {
      addLog(`🔁 ${actor.name} はカウンターの構えをとった！`, 'log-info');
      // Wait for next hits
      onComplete();

    } else if (sk === 'midare') {
      if (Math.random() * 100 < actor.luck) {
        addLog(`🏹 運気上昇！2回みだれうち攻撃！`, 'log-skill');
        let dmg1 = Math.max(1, actor.attack - getGlassShieldDefense(target));
        let dmg2 = Math.max(1, actor.attack - getGlassShieldDefense(target));
        target.cur = Math.max(0, target.cur - dmg1);
        setHp(targetSide, target);
        addLog(`🏹 1回目：${target.name} に ${dmg1} のダメージ！`, targetSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
        
        const t = setTimeout(() => {
          target.cur = Math.max(0, target.cur - dmg2);
          setHp(targetSide, target);
          addLog(`🏹 2回目：${target.name} に ${dmg2} のダメージ！`, targetSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
          onComplete();
        }, delay(400));
        activeTimers.push(t);
      } else {
        addLog(`🏹 みだれうちは不発に終わった…通常の攻撃！`, 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'ichigeki') {
      if (Math.random() < 0.2) {
        let dmg = target.cur - 1; // Reduces target HP to 1
        if (dmg <= 0) dmg = 1;
        target.cur = 1;
        flashHit(targetSide);
        showDmgFloat(targetSide, dmg, '#ef4444');
        addLog(`🎯 クリーンヒット！！！ ${target.name} のHPを1にした！`, 'log-crit');
        setHp(targetSide, target);
        onComplete();
      } else {
        addLog(`🎯 一撃必殺は外れた！`, 'log-miss');
        onComplete();
      }

    } else if (sk === 'charge') {
      actor.charged = true;
      actor.chargeMultiplier = 3; // 3x next turn
      addLog(`🔋 限界チャージ！ 次のターンの威力が3倍になる！`, 'log-info');
      updateBuffsUI(actorSide, actor);
      onComplete();

    } else if (sk === 'weakmaker') {
      // Find highest stat of target
      let highestStat = 'attack';
      let highestVal = target.attack;
      if (target.defense > highestVal) { highestStat = 'defense'; highestVal = target.defense; }
      if (target.speed > highestVal) { highestStat = 'speed'; highestVal = target.speed; }
      if (target.luck > highestVal) { highestStat = 'luck'; highestVal = target.luck; }
      
      applyBuff(target, { id: 'weakmaker_' + highestStat, name: 'ウィークメーカー', type: highestStat, val: -20, duration: 3 });
      addLog(`📉 ウィークメーカー！ ${target.name} の最大能力【${highestStat.toUpperCase()}】を 20 減少させた！`, 'log-skill');
      
      let dmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, onComplete);

    } else if (sk === 'haisui') {
      if (actor.cur <= actor.max / 2) {
        let dmg = actor.attack * 1.5;
        dmg = Math.floor(dmg);
        // Guaranteed Critical
        processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);
      } else {
        addLog(`⚠️ 発動条件（HP半分以下）を満たしていない！通常攻撃！`, 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'daibogyo') {
      actor.defending = true;
      actor.daibogyoActive = true;
      actor.daibogyoTurns = 2;
      addLog(`🛡️ ${actor.name} は大防御の構え！ 2ターンの間、受けるダメージの80%をカット！`, 'log-info');
      onComplete();
    } else if (sk === 'teppeki') {
      actor.teppekiTurns = 3;
      addLog(`🧱 鉄壁の構え！ 3ターンの間、自身の防御力が2倍になる！`, 'log-info');
      onComplete();

    } else if (sk === 'fudo') {
      actor.fudoActive = true;
      addLog(`🏔️ 不動の構え！ これ以降クリティカルを受けない！`, 'log-info');
      onComplete();

    } else if (sk === 'enmaku') {
      target.enmakuTurns = 2;
      addLog(`🌫️ 煙幕を撒いた！ 2ターンの間、${target.name} の命中率が半減する！`, 'log-info');
      onComplete();

    } else if (sk === 'shield') {
      actor.barrier = actor.luck;
      addLog(`🔮 エネルギーシールド！ 運数値(${actor.luck})分のバリアを展開！`, 'log-info');
      updateBuffsUI(actorSide, actor);
      onComplete();

    } else if (sk === 'heal') {
      const healAmt = Math.min(actor.max - actor.cur, Math.max(1, Math.floor(actor.max * 0.3)));
      actor.cur += healAmt;
      addLog(`💖 ヒール！ 最大HPの30%(${healAmt})回復した！`, 'log-skill');
      setHp(actorSide, actor);
      onComplete();

    } else if (sk === 'regen') {
      actor.regenTurns = 3;
      addLog(`💧 リジェネレート！ 3ターンの間、持続回復状態に入る！`, 'log-info');
      onComplete();

    } else if (sk === '吸血') {
      let dmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, () => {
        const healAmt = Math.floor(dmg * 0.5);
        if (healAmt > 0) {
          actor.cur = Math.min(actor.max, actor.cur + healAmt);
          addLog(`🦇 吸血の牙！ 与えたダメージの半分(${healAmt})、自身のHPを回復した！`, 'log-skill');
          setHp(actorSide, actor);
        }
        onComplete();
      });

    } else if (sk === 'pray') {
      const restore = Math.min(actor.max - actor.cur, actor.luck);
      actor.cur += restore;
      addLog(`🌟 運命の祈り！ 運の数値分 HPが ${restore} 回復した！`, 'log-skill');
      setHp(actorSide, actor);
      onComplete();

    } else if (sk === 'soulshare') {
      if (target.cur > actor.cur) {
        target.cur = Math.max(1, target.cur - 10);
        actor.cur = Math.min(actor.max, actor.cur + 10);
        addLog(`🧪 ソウルシェア！ ${target.name} のHPを 10 奪い取った！`, 'log-skill');
        setHp(actorSide, actor);
        setHp(targetSide, target);
      } else {
        addLog(`🧪 相手の方がHPが低いため、不発に終わった…`, 'log-miss');
      }
      onComplete();

    } else if (sk === 'luckstrike') {
      let baseDmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
      let dmg = baseDmg + actor.luck;
      addLog(`🎲 ${actor.name} の「運頼みのひと突き」！ 運の数値(${actor.luck})を追加ダメージとして与える！`, 'log-skill');
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, onComplete);

    } else if (sk === 'blankshot') {
      if (currentTurn === 1) {
        const defReduction = Math.floor(target.defense * 0.05);
        applyBuff(target, { id: 'blankshot', name: '空砲', type: 'defense', val: -defReduction, duration: 3 });
        addLog(`💨 ${actor.name} の「空砲」！ ${target.name} の防御力を5%低下させた！ (防御:${target.defense})`, 'log-skill');
        processDamage(actorSide, actor, targetSide, target, 0, false, false, onComplete);
      } else {
        addLog(`💨 空砲は1ターン目のみ有効！通常攻撃！`, 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'fukutsu') {
      if (actor.cur === 1) {
        const healAmt = Math.floor(actor.max * 0.8);
        actor.cur = Math.min(actor.max, actor.cur + healAmt);
        actor.strengthenTurns = 2;
        actor.attackMultiplier = 0.5; // Next turn attack halved (handled in processDamage)
        addLog(`🦁 不屈の闘志！ 最大HPの80%(${healAmt})回復したが、次ターン攻撃力半減！`, 'log-skill');
        setHp(actorSide, actor);
      } else {
        addLog(`🦁 残りHPが 1 の状態でのみ使用可能！通常攻撃！`, 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'paperarmor') {
      target.paperarmorTurns = 3;
      addLog(`📜 紙装甲の呪い！ 3ターンの間、${target.name} の防御力を半分にする！`, 'log-info');
      onComplete();

    } else if (sk === 'strengthen') {
      actor.strengthenTurns = 2;
      addLog(`💪 筋力強化！ 2ターンの間、自身の攻撃力が1.5倍になる！`, 'log-info');
      onComplete();

    } else if (sk === 'slownurse') {
      target.slownurseTurns = 3;
      addLog(`⏳ 鈍足の呪い！ 3ターンの間、${target.name} の素早さを -20 する！`, 'log-info');
      onComplete();

    } else if (sk === 'weightdown') {
      const reduction = target.defense;
      applyBuff(target, { id: 'weightdown', name: 'ウェイトダウン', type: 'speed', val: -reduction, duration: 3 });
      addLog(`⚓ ウェイトダウン！ ${target.name} の素早さを防御力分(-${reduction})引き下げた！`, 'log-info');
      onComplete();

    } else if (sk === 'overclock') {
      actor.overclockTurns = 2;
      addLog(`⚙️ オーバークロック！ 2ターンの間、素早さが2倍になるが、終了時にHP5減少！`, 'log-info');
      onComplete();

    } else if (sk === 'shadowstep') {
      actor.shadowstepTurns = 3;
      addLog(`👣 シャドーステップ！ 3ターンの間、自身の回避率が20%増加！`, 'log-info');
      onComplete();

    } else if (sk === 'swap') {
      const pHP = actor.cur;
      const eHP = target.cur;
      
      const elP = document.getElementById('fc-player');
      const elE = document.getElementById('fc-enemy');
      
      if (elP && elE) {
        elP.classList.add('viewn-right-to-left');
        elE.classList.add('viewn-left-to-right');
        
        const adv = document.getElementById('battle-advice-box');
        if (adv) {
          adv.textContent = '⚠️ WARNING: Quantum swap detected. Relocating life parameters...';
          adv.style.color = '#ef4444';
        }
        
        setTimeout(() => {
          actor.cur = eHP;
          target.cur = pHP;
          addLog(`⚖️ 等価交換！ お互いの現在HPを入れ替えた！`, 'log-skill');
          setHp(actorSide, actor);
          setHp(targetSide, target);
          elP.classList.remove('viewn-right-to-left');
          elE.classList.remove('viewn-left-to-right');
          if (adv) {
            adv.style.color = '#00d4ff';
            renderAdvice();
          }
          onComplete();
        }, 800);
      } else {
        actor.cur = eHP;
        target.cur = pHP;
        addLog(`⚖️ 等価交換！ お互いの現在HPを入れ替えた！`, 'log-skill');
        setHp(actorSide, actor);
        setHp(targetSide, target);
        onComplete();
      }

    } else if (sk === 'draw') {
      actor.drawingTurns = 1;
      target.drawingTurns = 1;
      addLog(`🎨 ドローイング！ このターンのダメージは無効化される！`, 'log-info');
      onComplete();

    } else if (sk === 'jackpot') {
      if (actor.luck > target.luck) {
        actor.jackpotActive = true;
        addLog(`🎰 ジャックポット！ 運が相手より高いため、このターン確定クリティカル！`, 'log-skill');
        let dmg = actor.attack;
        dmg = Math.floor(dmg);
        processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);
      } else {
        addLog(`🎰 運が相手以下であるため、不発…通常の攻撃！`, 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'copy') {
      const copied = target.lastOpponentSkill;
      if (copied && copied !== 'none' && copied !== 'copy') {
        addLog(`🐱 コピーキャット！ 相手の最後に使ったスキル「${(SKILLS[copied]||SKILLS.none).name}」をコピー！`, 'log-skill');
        actor.skill = copied;
        executeSingleAction(actorSide, 'skill', targetSide, targetCmd, () => {
          actor.skill = 'copy'; // Restore copycat
          onComplete();
        });
      } else {
        addLog(`🐱 コピーできるスキルがありません！通常攻撃！`, 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'amanajaku') {
      actor.amanajakuActive = true;
      // High defense/low attack = high damage!
      let dmg = Math.max(1, (100 - actor.attack) + target.defense);
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, onComplete);

    } else if (sk === 'reverse') {
      actor.reverseTurns = 3;
      target.reverseTurns = 3;
      addLog(`🌀 リバースルーム！ 3ターンの間、素早さが遅い方が先手を取る空間を展開！`, 'log-info');
      onComplete();
    } else {
      executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
    }
  }
}

function oppLastActiveSkill(opp, sk) {
  opp.lastOpponentSkill = sk;
}

function processDamage(actorSide, actor, targetSide, target, rawDmg, isCrit, isScrap, onComplete) {
  // Check Drawing
  if (actor.drawingTurns > 0 || target.drawingTurns > 0) {
    addLog(`🎨 ドローイングの効果により、ダメージが無効化された！`, 'log-miss');
    if (actor.charged) actor.charged = false;
    onComplete();
    return;
  }

  // Check Daibogyo (大防御)
  if (target.daibogyoActive) {
    // 大防御: 80%カット (20%貫通)
    const rawDmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
    const penDmg = Math.max(1, Math.floor(rawDmg * 0.2));
    target.cur = Math.max(0, target.cur - penDmg);
    setHp(target === pState ? 'p' : 'e', target);
    flashHit(target === pState ? 'p' : 'e');
    showDmgFloat(target === pState ? 'p' : 'e', penDmg, '#f59e0b');
    addLog(`🛡️ ${target.name} は大防御の構え！ 大半を防いだが ${penDmg} ダメージ貫通！`, 'log-miss');
    if (actor.charged) actor.charged = false;
    // target.daibogyoActive persists for daibogyoTurns duration
    if (target.cur <= 0) {
      // 自己満足 (撃破時回復)
      const actorPassives = (actor.skillsList && Array.isArray(actor.skillsList.passive)) ? actor.skillsList.passive : [];
      if (actor.skill === 'selfsatisfaction' || actorPassives.includes('selfsatisfaction')) {
        actor.cur = Math.min(actor.max, actor.cur + 1);
        addLog(`✨ ${actor.name} の「自己満足」！ 敵を撃破したためHPが 1 回復した！`, 'log-skill');
        setHp(actorSide, actor);
      }
      checkBattleEnd();
      return;
    }
    onComplete();
    return;
  }

  // Handle charge multipliers
  let finalDmg = rawDmg;
  if (actor.chargeMultiplier) {
    finalDmg *= actor.chargeMultiplier;
    actor.chargeMultiplier = null; // Consume
  }

  // Handle fukutsu debuff (攻擊力半減)
  if (actor.attackMultiplier) {
    finalDmg = Math.floor(finalDmg * actor.attackMultiplier);
    actor.attackMultiplier = null; // Consume
  }

  // 無駄なこだわり (偶数ステータス時与ダメージ+5%)
  const actorPassives = (actor.skillsList && Array.isArray(actor.skillsList.passive)) ? actor.skillsList.passive : [];
  if (actor.skill === 'particularity' || actorPassives.includes('particularity')) {
    if ([actor.attack, actor.defense, actor.speed, actor.luck].some(v => v % 2 === 0)) {
      finalDmg = Math.floor(finalDmg * 1.05);
    }
  }

  // Energy shield (バリア) absorption
  if (target.barrier > 0) {
    const absorb = Math.min(target.barrier, finalDmg);
    target.barrier -= absorb;
    finalDmg -= absorb;
    addLog(`🔮 エネルギーシールドが ${absorb} ダメージを吸収！ バリア残り:${target.barrier}`, 'log-info');
  }

  // Apply final damage to HP
  target.cur = Math.max(0, target.cur - finalDmg);

  // 自己満足 (撃破時回復)
  if (target.cur <= 0) {
    if (actor.skill === 'selfsatisfaction' || actorPassives.includes('selfsatisfaction')) {
      actor.cur = Math.min(actor.max, actor.cur + 1);
      addLog(`✨ ${actor.name} の「自己満足」！ 敵を撃破したためHPが 1 回復した！`, 'log-skill');
      setHp(actorSide, actor);
    }
  }

  // Trigger Recycle Passive value storage
  target.recycleHeal = Math.floor(finalDmg / 2);

  const isPlayerTarget = targetSide === 'p';
  const color = isCrit ? '#f59e0b' : (isPlayerTarget ? '#00d4ff' : '#ef4444');

  const t = setTimeout(() => {
    if (finalDmg > 0) {
      flashHit(targetSide);
      showDmgFloat(targetSide, finalDmg, color);
    }

    if (isCrit) {
      addLog(`💥 会心の一撃！ ${target.name} に ${finalDmg} の大ダメージ！`, 'log-crit');
    } else if (isScrap) {
      addLog(`⚔️ かすり傷！ ${target.name} に 1 のダメージ！`, isPlayerTarget ? 'log-dmg-p' : 'log-dmg-e');
    } else {
      addLog(`⚔️ ${target.name} に ${finalDmg} のダメージ！`, isPlayerTarget ? 'log-dmg-p' : 'log-dmg-e');
    }

    setHp(targetSide, target);

    // Clean up charge
    if (actor.charged) actor.charged = false;
    updateBuffsUI(actorSide, actor);
    updateBuffsUI(targetSide, target);

    // ==========================================
    // POST-DAMAGE PASSIVES TRIGGER
    // ==========================================
    triggerPostDamagePassives(actorSide, actor, targetSide, target, finalDmg, () => {
      // Check Counter blow (カウンターブロー)
      if (hasPassive(target, 'counter') && !target.skillUsed && target.cur > 0 && finalDmg > 0) {
        target.skillUsed = true;
        const counterDmg = Math.floor(finalDmg * 1.5);
        addLog(`🔁 ${target.name} の「カウンターブロー」発動！ ダメージの1.5倍を撃ち返す！`, 'log-skill');
        
        actor.cur = Math.max(0, actor.cur - counterDmg);
        setHp(actorSide, actor);
        flashHit(actorSide);
        showDmgFloat(actorSide, counterDmg, '#ef4444');
        addLog(`🔁 カウンター直撃！ ${actor.name} に ${counterDmg} のダメージ！`, actorSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
      }

      onComplete();
    });

  }, delay(300));
  activeTimers.push(t);
}

function triggerPostDamagePassives(actorSide, actor, targetSide, target, dmg, cb) {
  const hpPct = target.cur / target.max;
  const targetPassives = (target.skillsList && Array.isArray(target.skillsList.passive)) ? target.skillsList.passive : [];

  // 未熟なカウンター (被弾時5%の確率でダメージの10%を反射)
  if ((target.skill === 'poorcounter' || targetPassives.includes('poorcounter')) && target.cur > 0 && dmg > 0) {
    if (Math.random() < 0.05) {
      const reflectDmg = Math.max(1, Math.floor(dmg * 0.1));
      actor.cur = Math.max(0, actor.cur - reflectDmg);
      addLog(`🔁 ${target.name} の「未熟なカウンター」！ ダメージの10%（${reflectDmg}）を反射した！`, 'log-skill');
      setHp(actorSide, actor);
      flashHit(actorSide);
      showDmgFloat(actorSide, reflectDmg, '#ef4444');
    }
  }

  // 死んだふり (HP10%以下で1ターン両者行動不能)
  if ((hasPassive(target, 'playdead') || targetPassives.includes('playdead')) && hpPct <= 0.10 && target.cur > 0 && !target.playdeadTriggered) {
    target.playdeadTriggered = true;
    pState.scared = true;
    eState.scared = true;
    addLog(`💤 ${target.name} の「死んだふり」！ 次の1ターンお互い行動不能になる！`, 'log-skill');
  }

  // 1. Toge (トゲトゲの甲羅)
  if (hasPassive(target, 'toge') && !target.togeTriggered && target.cur > 0) {
    target.togeTriggered = true;
    actor.speed = Math.max(0, actor.speed - 10);
    addLog(`🌵 ${target.name} の「トゲトゲの甲羅」！ ${actor.name} の素早さを 10 減少させた！`, 'log-skill');
  }

  // 2. Second wind (セカンド風 - HP25%以下で10回復)
  if (hasPassive(target, 'secondwind') && hpPct <= 0.25 && target.cur > 0 && !target.secondwindTriggered) {
    target.secondwindTriggered = true;
    const restore = Math.min(target.max - target.cur, 10);
    target.cur += restore;
    addLog(`🌬️ ${target.name} の「セカンド風」！ HPが ${restore} 自動回復した！`, 'log-skill');
    setHp(targetSide, target);
  }

  // 3. Recycle (リサイクル - 相手のアクティブ使用に被ダメ半分回復)
  if (hasPassive(target, 'recycle') && actor.skillUsed && target.recycleHeal > 0 && target.cur > 0) {
    const restore = Math.min(target.max - target.cur, target.recycleHeal);
    target.cur += restore;
    addLog(`♻️ ${target.name} の「リサイクル」！ 相手のアクティブスキルダメージの半分(${restore})を回復した！`, 'log-skill');
    target.recycleHeal = 0; // consume
    setHp(targetSide, target);
  }

  // 4. Fortress (最後の砦 - HP20%以下で無敵1ターン)
  if (hasPassive(target, 'fortress') && hpPct <= 0.20 && target.cur > 0 && !target.fortressTriggered) {
    target.fortressTriggered = true;
    target.fortressTurns = 1;
    addLog(`🏰 ${target.name} の「最後の砦」発動！ 1ターンの間無敵になる！`, 'log-skill');
  }

  // 5. Migawari (身代わり人形 - 致死回避)
  if (target.cur === 0 && hasPassive(target, 'migawari') && !target.migawariTriggered) {
    target.migawariTriggered = true;
    target.cur = 1;
    addLog(`🧸 ${target.name} の「身代わり人形」発動！ HP 1 で踏みとどまった！`, 'log-skill');
    setHp(targetSide, target);
  }

  cb();
}

// バフ/デバフ管理：重複防止（効果を加算せず、ターン数のみリセット）および新規付与
function applyBuff(monster, newBuff) {
  if (!monster) return;
  if (!monster.activeBuffs) monster.activeBuffs = [];

  const existingBuff = monster.activeBuffs.find(b => b.id === newBuff.id);
  if (existingBuff) {
    // 既存バフがある場合はターン数のみ更新（ステータス重複加算を防止）
    existingBuff.duration = newBuff.duration;
    addLog(`✨ ${monster.name} の『${newBuff.name}』の効果時間がリセットされた！（残り ${newBuff.duration} ターン）`, 'log-skill');
  } else {
    // 新規付与：ステータス変化を適用して配列に保持
    if (newBuff.val && newBuff.type) {
      monster[newBuff.type] = (monster[newBuff.type] || 0) + newBuff.val;
      if (monster[newBuff.type] < 0) monster[newBuff.type] = 0;
    }
    monster.activeBuffs.push(newBuff);
    const sign = newBuff.val >= 0 ? '+' : '';
    if (newBuff.val && newBuff.type) {
      addLog(`✨ ${monster.name} の ${newBuff.type.toUpperCase()} が ${sign}${newBuff.val}！ (${newBuff.duration}ターン)`, 'log-skill');
    }
  }
}

// ターン経過時のバフ更新・効果解除ロジック
function updateMonsterBuffs(monster, side) {
  if (!monster || !monster.activeBuffs || monster.activeBuffs.length === 0) return;

  for (let i = monster.activeBuffs.length - 1; i >= 0; i--) {
    let buff = monster.activeBuffs[i];
    buff.duration -= 1; // 1ターン消費

    // 規定ターン終了（残り0ターン）の判定
    if (buff.duration <= 0) {
      // 1. 上昇・低下させたステータスを元に戻す
      if (buff.val && buff.type) {
        monster[buff.type] -= buff.val;
        if (monster[buff.type] < 0) monster[buff.type] = 0;
      }

      // 2. ログ表示
      addLog(`⏳ ${monster.name} のスキル効果『${buff.name}』が切れた！`, 'log-info');

      // 3. 配列から削除
      monster.activeBuffs.splice(i, 1);
    }
  }
}

function updateBuffsUI(side, state) {
  const container = document.getElementById('buffs-' + side);
  if (!container) return;
  container.innerHTML = '';
  
  const buffs = [];
  if (state.charged) buffs.push(`<span style="background:rgba(245,158,11,0.15); color:var(--accent-gold); border:1px solid rgba(245,158,11,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🔋 ため</span>`);
  if (state.defending) buffs.push(`<span style="background:rgba(61,155,233,0.15); color:var(--accent-blue); border:1px solid rgba(61,155,233,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🛡️ 防御</span>`);
  if (state.barrier > 0) buffs.push(`<span style="background:rgba(168,85,247,0.15); color:var(--accent-purple); border:1px solid rgba(168,85,247,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🔮 バリア(${state.barrier})</span>`);
  if (state.regenTurns > 0) buffs.push(`<span style="background:rgba(16,185,129,0.15); color:var(--accent-green); border:1px solid rgba(16,185,129,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">💧 リジェネ(${state.regenTurns})</span>`);
  if (state.teppekiTurns > 0) buffs.push(`<span style="background:rgba(61,155,233,0.15); color:var(--accent-blue); border:1px solid rgba(61,155,233,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🧱 防御x2(${state.teppekiTurns})</span>`);
  if (state.strengthenTurns > 0) buffs.push(`<span style="background:rgba(239,68,68,0.15); color:var(--accent-red); border:1px solid rgba(239,68,68,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">💪 攻撃1.5倍</span>`);
  if (state.shadowstepTurns > 0) buffs.push(`<span style="background:rgba(245,158,11,0.15); color:var(--accent-gold); border:1px solid rgba(245,158,11,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">👣 回避率+20%</span>`);
  if (state.reverseTurns > 0) buffs.push(`<span style="background:rgba(168,85,247,0.15); color:var(--accent-purple); border:1px solid rgba(168,85,247,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🌀 リバース</span>`);
  if (state.fortressTurns > 0) buffs.push(`<span style="background:rgba(16,185,129,0.15); color:var(--accent-green); border:1px solid rgba(16,185,129,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🏰 無敵</span>`);

  if (state.activeBuffs && state.activeBuffs.length > 0) {
    state.activeBuffs.forEach(b => {
      buffs.push(`<span style="background:rgba(0,212,255,0.15); color:var(--accent-cyan); border:1px solid rgba(0,212,255,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">✨ ${b.name}(${b.duration})</span>`);
    });
  }

  container.innerHTML = buffs.join(' ');
}


function clearLog() {
  const log1 = document.getElementById('battle-log');
  if (log1) log1.innerHTML = '';
  const log2 = document.getElementById('battle-top-log');
  if (log2) log2.innerHTML = '';
}

function addLog(msg, cls) {
  // 最上部中央に表示するための新規ログコンテナを動的に生成
  let log = document.getElementById('battle-top-log');
  if (!log) {
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) {
      log = document.createElement('div');
      log.id = 'battle-top-log';
      log.style.cssText = `
        position: absolute !important;
        top: 45px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 44% !important;
        height: 200px !important; /* 200pxに拡張 */
        background: rgba(0, 0, 0, 0.75) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 6px !important;
        z-index: 999 !important;
        padding: 8px 12px !important;
        box-sizing: border-box !important;
        overflow-y: auto !important;
        color: #ffffff !important;
        font-family: inherit !important;
        display: block !important;
        pointer-events: auto !important;
      `;
      battleScreen.appendChild(log);
    }
  }

  if (log) {
    const d = document.createElement('div');
    d.className = 'log-entry ' + (cls || '');
    d.innerHTML = msg;
    d.style.fontSize = '13px';
    d.style.lineHeight = '1.4';
    d.style.marginBottom = '4px';
    d.style.color = '#ffffff';
    d.style.textShadow = '1px 1px 1px #000';
    
    // Transition style for slide-up entering
    d.style.opacity = '0';
    d.style.transform = 'translateY(10px)';
    d.style.transition = 'all 0.15s ease-out';
    
    log.appendChild(d);
    
    // Trigger entry animation
    setTimeout(() => {
      d.style.opacity = '1';
      d.style.transform = 'translateY(0)';
    }, 10);

    // Keep all logs so the player can scroll up to review them, and auto-scroll to the bottom.
    log.scrollTop = log.scrollHeight;
  }

  // 最上部中央のマーキー表示エリア（ターン数専用）の連動処理
  const marquee = document.getElementById('battle-marquee-log');
  if (marquee && msg.includes('ターン')) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = msg;
    const rawText = tempDiv.textContent || tempDiv.innerText || msg;
    // 「◆ ターン 1 ◆」のような表記から「ターン 1」を切り出して綺麗に表示
    const cleanTurn = rawText.match(/ターン\s*\d+/);
    if (cleanTurn) {
      marquee.textContent = cleanTurn[0];
    } else {
      marquee.textContent = rawText.replace(/[◆\s]/g, '');
    }
  }
}

function setHp(side, state) {
  const fill = document.getElementById('hp-bar-' + side);
  const txt = document.getElementById('hp-txt-' + side);
  if (!fill || !txt) return;
  const pct = Math.max(0, state.cur / state.max * 100);
  fill.style.width = pct + '%';
  // Use cyber-themed colors based on side and HP percentage
  if (side === 'e') {
    if (pct > 50) fill.style.background = 'linear-gradient(90deg, #ef4444, #f97316)';
    else if (pct > 25) fill.style.background = 'linear-gradient(90deg, #f97316, #fbbf24)';
    else fill.style.background = 'linear-gradient(90deg, #dc2626, #991b1b)';
  } else {
    if (pct > 50) fill.style.background = 'linear-gradient(90deg, #00d4ff, #10b981)';
    else if (pct > 25) fill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
    else fill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
  }
  const isTutorialMode = (gameProgress.tutorialStep === 2);
  if (side === 'e' && isTutorialMode) {
    txt.textContent = 'HP ？？？ / ？？？';
  } else {
    txt.textContent = 'HP ' + state.cur + ' / ' + state.max;
  }
}

// パッシブスキル判定ヘルパー：skill または passiveSkill に指定IDが含まれているか確認
function hasPassive(actor, skillId) {
  if (!actor) return false;
  if (actor.passiveSkill === skillId) return true;
  if (actor.skill === skillId) return true;
  return false;
}

// パッシブスキルの自動MP消費発動システム (MP 8以上で自動発動し、MP 8を消費して強力な効果を適用)
function checkAutoPassiveTrigger(actorSide, actor, targetSide, target) {
  if (!actor || actor.cur <= 0) return;
  const psk = actor.passiveSkill || (actor.skillsList && actor.skillsList.passive && actor.skillsList.passive[0]) || 'none';
  if (psk === 'none') return;
  
  const skInfo = SKILLS[psk];
  if (!skInfo || skInfo.type !== 'パッシブ') return;

  // MPが8以上あるかチェック
  const curMp = (actor.mp !== undefined) ? actor.mp : 10;
  if (curMp < 8) return;

  // MP 8 を消費
  actor.mp = Math.max(0, curMp - 8);
  setMp(actorSide, actor);

  addLog(`✨ ${actor.name} のパッシブスキル『${skInfo.name}』が自動発動！（MP 8消費 / 残MP:${actor.mp}）`, 'log-crit');

  // スキルごとのパッシブ効果を発動
  if (psk === 'secondwind') {
    const heal = Math.min(actor.max - actor.cur, Math.floor(actor.max * 0.4) || 25);
    actor.cur += heal;
    setHp(actorSide, actor);
    addLog(`🌬️ 【${skInfo.name}】 活力がみなぎり、生命力が ${heal} 回復した！`, actorSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
  } else if (psk === 'fortress') {
    actor.fortressTurns = 1;
    addLog(`🏰 【${skInfo.name}】 鉄壁の結界を展開！ 1ターンの間無敵状態となった！`, 'log-skill');
  } else if (psk === 'heavyatk') {
    actor.strengthenTurns = 2;
    addLog(`💪 【${skInfo.name}】 剛力解放！ 2ターンの間、攻撃威力が1.5倍に上昇！`, 'log-skill');
  } else if (psk === 'firstwind') {
    applyBuff(actor, { id: 'psk_spd_boost', name: skInfo.name, type: 'speed', val: 100, duration: 2 });
  } else if (psk === 'shuffle') {
    const spdBoost = Math.floor(actor.speed * 0.5) + 5;
    applyBuff(actor, { id: 'psk_spd_boost', name: skInfo.name, type: 'speed', val: spdBoost, duration: 2 });
    applyBuff(actor, { id: 'psk_spd_boost', name: skInfo.name, type: 'speed', val: spdBoost, duration: 2 });
  } else if (psk === 'toge' || psk === 'intimidate') {
    if (target && target.cur > 0) {
      applyBuff(target, { id: 'psk_toge_spd', name: skInfo.name, type: 'speed', val: -15, duration: 2 });
      applyBuff(target, { id: 'psk_toge_atk', name: skInfo.name, type: 'attack', val: -5, duration: 2 });
    }
  } else if (psk === 'glassshield' || psk === 'parry' || psk === 'poorcounter') {
    actor.teppekiTurns = 2;
    addLog(`🛡️ 【${skInfo.name}】 守護のオーラ！ 2ターンの間、防御力が2倍に上昇！`, 'log-skill');
  } else if (psk === 'recycle' || psk === 'selfsatisfaction') {
    actor.regenTurns = 3;
    addLog(`💧 【${skInfo.name}】 生命の循環！ 3ターンの間リジェネレート(毎ターン持続回復)が付与された！`, 'log-skill');
  } else if (psk === 'fdice' || psk === 'pressure') {
    applyBuff(actor, { id: 'psk_luck_boost', name: skInfo.name, type: 'luck', val: 15, duration: 2 });
    if (target) target.scared = true;
  } else if (psk === 'migawari' || psk === 'playdead') {
    actor.barrier = (actor.barrier || 0) + 20;
    addLog(`🧸 【${skInfo.name}】 身代わりの防護壁！ ダメージを20肩代わりするバリアを展開した！`, 'log-skill');
  } else {
    // 汎用パッシブ（particularityなど）：攻防ブースト
    actor.strengthenTurns = 2;
    actor.teppekiTurns = 2;
    addLog(`✨ 【${skInfo.name}】 潜在能力が極限覚醒！ 2ターンの間、攻撃1.5倍＆防御2倍！`, 'log-skill');
  }

  updateBuffsUI(actorSide, actor);
  if (targetSide && target) updateBuffsUI(targetSide, target);
}

function setMp(side, state) {
  if (!state) return;
  const fill = document.getElementById('mp-bar-' + side);
  const txt = document.getElementById('mp-txt-' + side);
  if (!fill || !txt) return;
  const cur = Math.max(0, Math.min(state.maxMp || 10, state.mp !== undefined ? state.mp : 10));
  const max = state.maxMp || 10;
  const pct = Math.max(0, Math.min(100, (cur / max) * 100));
  fill.style.width = pct + '%';
  txt.textContent = 'MP ' + cur + ' / ' + max;

  if (side === 'p') {
    const skillBtn = document.getElementById('btn-command-skill');
    if (skillBtn) {
      const userSk = (pState && SKILLS[pState.skill]) ? SKILLS[pState.skill] : SKILLS.none;
      if (cur < 8 || state.skill === 'none' || userSk.type === 'パッシブ') {
        skillBtn.disabled = true;
        skillBtn.style.opacity = '0.5';
      } else if (isPlayerTurn) {
        skillBtn.disabled = false;
        skillBtn.style.opacity = '1.0';
      }
    }
  }
}

function flashHit(side) {
  const isEnemy = side === 'e';
  const icon = document.getElementById('fi-' + (isEnemy ? 'enemy' : 'player'));
  if (!icon) return;

  // 被弾モンスターの画像上に「光る斜め斬撃エフェクト」を動的生成して一閃させる
  const slash = document.createElement('div');
  slash.className = 'slash-effect';
  if (icon.parentNode) {
    icon.parentNode.appendChild(slash);
    // アニメーション完了後に要素を自動クリーンアップ
    setTimeout(() => {
      slash.remove();
    }, 300);
  }

  // 連続ヒット時は前のアニメーションをキャンセル
  if (icon._hitAnim) { try { icon._hitAnim.cancel(); } catch(e){} icon._hitAnim = null; }

  // ベースtransformを保持（敵:scaleX(-1) / 味方:なし）
  const base = isEnemy ? 'scaleX(-1) scale(1.5)' : 'scale(1.5)';
  const baseFilter = isEnemy
    ? 'drop-shadow(0 20px 8px rgba(0,0,0,0.55)) drop-shadow(0 0 15px rgba(239,68,68,0.3))'
    : 'drop-shadow(0 20px 8px rgba(0,0,0,0.55)) drop-shadow(0 0 15px rgba(0,212,255,0.3))';

  // Web Animations APIでマイルドな被弾演出（軽い跳ね＋ほんのり白発光）
  icon._hitAnim = icon.animate([
    { transform: `${base} translate(0, 0)`, filter: 'brightness(1)', offset: 0 },
    { transform: `${base} translate(-4px, -3px)`, filter: 'brightness(1.6) drop-shadow(0 0 10px rgba(255,255,255,0.4))', offset: 0.15 },
    { transform: `${base} translate(4px, 1px)`, filter: 'brightness(1.3)', offset: 0.3 },
    { transform: `${base} translate(-2px, 0)`, filter: 'brightness(1)', offset: 0.5 },
    { transform: `${base} translate(2px, 0)`, filter: 'brightness(1)', offset: 0.7 },
    { transform: `${base} translate(0, 0)`, filter: baseFilter, offset: 1 }
  ], {
    duration: 350,
    easing: 'ease-out',
    fill: 'none'
  });
}


// Hologram SVG connector line between Commands and Targets
function connectHologramLine(actionType) {
  return; // Disabled per user request
  const svg = document.getElementById('hologram-lines-svg');
  const path = document.getElementById('hologram-active-path');
  const wrapper = document.querySelector('.battle-wrapper-169');
  
  let btnId = 'btn-cmd-normal';
  if (actionType === 'skill') btnId = 'btn-command-skill';
  
  const btn = document.getElementById(btnId);
  const enemyCard = document.getElementById('fc-enemy');
  
  if (!btn || !enemyCard || !svg || !path || !wrapper) return;
  
  const wRect = wrapper.getBoundingClientRect();
  const bRect = btn.getBoundingClientRect();
  const eRect = enemyCard.getBoundingClientRect();
  
  // Calculate relative positions inside the 16:9 container
  const startX = (bRect.left + bRect.width / 2) - wRect.left;
  const startY = (bRect.top + bRect.height / 2) - wRect.top;
  
  const endX = (eRect.left + eRect.width / 2) - wRect.left;
  const endY = (eRect.top + eRect.height / 2) - wRect.top;
  
  // Create beautiful bezier curve path
  const controlY = startY - 60;
  const d = `M ${startX} ${startY} Q ${(startX + endX) / 2} ${controlY} ${endX} ${endY}`;
  
  path.setAttribute('d', d);
  path.style.display = 'block';
  
  // Highlight targeted container with dynamic aura effect
  if (actionType === 'attack') {
    enemyCard.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4), inset -10px 0 20px rgba(239, 68, 68, 0.05)';
    path.setAttribute('stroke', 'url(#hologram-grad-attack)');
  } else {
    enemyCard.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.4), inset -10px 0 20px rgba(168, 85, 247, 0.05)';
    path.setAttribute('stroke', 'url(#hologram-grad-skill)');
  }
}

function clearHologramLine() {
  const path = document.getElementById('hologram-active-path');
  if (path) path.style.display = 'none';
  
  const enemyCard = document.getElementById('fc-enemy');
  if (enemyCard) {
    enemyCard.style.boxShadow = '';
  }
}

// Generate real-time tactical recommendation based on state comparisons
function renderAdvice() {
  const box = document.getElementById('battle-advice-box');
  if (!box || !pState || !eState) return;
  
  let advice = '[ADVICE] 戦術分析中...';
  
  if (eState.cur === 1) {
    advice = '🎯 [TARGET ELIMINATION]: 相手の残りHPは1です！確実に先制できるスキル、または通常攻撃で仕留めましょう。';
  } else if (pState.cur < pState.max * 0.3) {
    advice = '⚠️ [CRITICAL HEALTH]: 自身のHPが大幅に低下しています！防御を固めるか、回復スキルで凌いでください。';
  } else if (eState.speed > pState.speed) {
    advice = `⚡ [SPEED DISADVANTAGE]: 相手のSPD(${eState.speed})はこちらのSPD(${pState.speed})を上回っています。先制攻撃に備えてください。`;
  } else if (pState.speed > eState.speed) {
    advice = `⚔️ [INITIATIVE ADVANTAGE]: こちらのSPD(${pState.speed})が勝っています。相手より早く行動可能です。攻勢に出ましょう。`;
  } else {
    advice = '💬 [TACTICAL INFO]: お互いの実力は拮抗しています。敵の出方を見極めてコマンドを決定してください。';
  }
  
  box.textContent = advice;
}

// 30-Second Turn thinking timer countdown
function startThinkingTimer() {
  stopThinkingTimer();
  battleTimerCount = 30;
  
  const timerEl = document.getElementById('battle-timer');
  if (timerEl) {
    timerEl.textContent = 'THINKING: 30';
    timerEl.style.color = 'var(--accent-red)';
  }
  
  battleTimerInterval = setInterval(() => {
    battleTimerCount--;
    if (timerEl) {
      timerEl.textContent = 'THINKING: ' + battleTimerCount;
    }
    
    if (battleTimerCount <= 5) {
      if (timerEl) timerEl.style.color = '#ef4444';
    }
    
    if (battleTimerCount <= 0) {
      stopThinkingTimer();
      // Auto-trigger default action (Normal Attack) on timeout
      if (isPlayerTurn) {
        selectCommand('attack');
      }
    }
  }, 1000);
}

function stopThinkingTimer() {
  if (battleTimerInterval) {
    clearInterval(battleTimerInterval);
    battleTimerInterval = null;
  }
}

function showDmgFloat(side, dmg, color) {
  // Monster Image Center Damage Popup
  const icon = document.getElementById('fi-' + (side === 'p' ? 'player' : 'enemy'));
  if (icon && icon.parentElement) {
    const imgContainer = icon.parentElement;
    if (getComputedStyle(imgContainer).position === 'static') {
      imgContainer.style.position = 'relative';
    }
    const pop = document.createElement('div');
    pop.className = 'damage-popup';
    pop.textContent = '-' + dmg;
    if (color && color !== '#ef4444') {
      pop.style.color = color;
    }
    imgContainer.appendChild(pop);
    setTimeout(() => pop.remove(), 700);
  }
}

function checkBattleEnd() {
  if (pState.cur <= 0 && eState.cur <= 0) {
    addLog('⚖️ 相打ち！引き分け！', 'log-miss');
    const t = setTimeout(() => showResult(), delay(600));
    activeTimers.push(t);
  } else if (eState.cur <= 0) {
    addLog('🎉 ' + pState.name + ' の勝利！', 'log-crit');
    const t = setTimeout(() => showResult(), delay(600));
    activeTimers.push(t);
  } else if (pState.cur <= 0) {
    addLog('💀 ' + pState.name + ' は倒れた…', 'log-miss');
    const t = setTimeout(() => showResult(), delay(600));
    activeTimers.push(t);
  }
}

// ============================================================
//  RESULT
// ============================================================

function showResult() {
  stopThinkingTimer();
  const panel = document.getElementById('battle-result-panel');
  const banner = document.getElementById('battle-result-banner');
  const sub = document.getElementById('battle-result-sub');
  const nextBtn = document.getElementById('battle-result-next');
  const labBtn = document.getElementById('battle-result-lab');
  const ctrl = document.getElementById('battle-controls');

  if (ctrl) ctrl.style.display = 'none';

  // デフォルトでは両方のボタンを表示
  if (nextBtn) nextBtn.style.display = 'block';
  if (labBtn) labBtn.style.display = 'block';

  // 勝敗決定時のBGM再生（ループ再生）
  if (window.bgmManager) {
    if (pState.cur > 0 && eState.cur <= 0) {
      window.bgmManager.play('victory', true);
    } else if (eState.cur > 0 && pState.cur <= 0) {
      window.bgmManager.play('lose', true);
    }
  }

  if (currentGameMode === 'team-arena') {
    const playerWon = (pState.cur > 0 && eState.cur <= 0);
    const draw = (pState.cur <= 0 && eState.cur <= 0);

    if (draw) {
      banner.textContent = 'DRAW';
      banner.style.color = 'var(--text-primary)';
      banner.style.textShadow = 'none';
      if (panel) panel.style.borderColor = 'var(--border)';
      sub.textContent = '決着がつかなかった… 再戦します。';
      nextBtn.textContent = '🔄 再戦する';
    } else if (playerWon) {
      banner.textContent = 'VICTORY!';
      banner.style.color = 'var(--accent-gold)';
      banner.style.textShadow = '0 0 10px rgba(245,158,11,0.5)';
      if (panel) panel.style.borderColor = 'var(--accent-gold)';
      sub.textContent = `${pState.name} が ${eState.name} を撃破した！`;
      record.win++;
      nextBtn.textContent = '🗺️ 次へ';
    } else {
      banner.textContent = 'DEFEAT...';
      banner.style.color = 'var(--accent-red)';
      banner.style.textShadow = '0 0 10px rgba(239,68,68,0.5)';
      if (panel) panel.style.borderColor = 'var(--accent-red)';
      sub.textContent = `${pState.name} は ${eState.name} に敗れた…`;
      record.lose++;
      nextBtn.textContent = '🗺️ 次へ';
    }

    save();
    updateRecord();
    const modal = document.getElementById('battle-result-modal');
    if (modal) modal.style.display = 'flex';
    return;
  }

  if (pState.cur > 0 && eState.cur <= 0) {
    banner.textContent = 'VICTORY!';
    banner.style.color = 'var(--accent-gold)';
    banner.style.textShadow = '0 0 10px rgba(245,158,11,0.5)';
    if (panel) panel.style.borderColor = 'var(--accent-gold)';
    sub.textContent = `${pState.name} が ${eState.name} を撃破した！`;
    record.win++;

    // ラスボス覇王戦勝利時: 「ラボへ」ボタンを隠し、ボタン選択肢を「🗺️次へ」の1つにする
    if (currentGameMode === 'boss-revenge') {
      if (labBtn) labBtn.style.display = 'none';
      nextBtn.textContent = '🗺️ 次へ';
      save();
      updateRecord();
      const modal = document.getElementById('battle-result-modal');
      if (modal) modal.style.display = 'flex';
      return;
    }

    if (currentGameMode === 'league') {
      stageIndex++;
      if (stageIndex >= STAGE_ENEMIES.length) {
        sub.textContent = `${pState.name} が ${eState.name} を撃破した！ 🎉 リーグ全ステージクリア！ おめでとう！`;
        nextBtn.textContent = '🔄 最初から挑戦';
        // Win reward trigger
        setTimeout(() => showScrollReward(), 1500);
      } else {
        nextBtn.textContent = '🗺️ 次のステージへ';
      }
    } else if (currentGameMode === 'survival') {
      survivalWins++;
      if (survivalWins > survivalBestRecord) {
        survivalBestRecord = survivalWins;
      }
      sub.textContent += ` 🎉 ${survivalWins}連勝達成！ (BEST: ${survivalBestRecord})`;
      nextBtn.textContent = `🔥 次の対戦へ (${survivalWins}連勝中)`;
    } else {
      nextBtn.textContent = '🗺️ もう一度対戦';
    }

  } else if (eState.cur > 0 && pState.cur <= 0) {
    banner.textContent = 'DEFEAT...';
    banner.style.color = 'var(--accent-red)';
    banner.style.textShadow = '0 0 10px rgba(239,68,68,0.5)';
    if (panel) panel.style.borderColor = 'var(--accent-red)';
    sub.textContent = `${pState.name} は ${eState.name} に敗れた…`;
    record.lose++;

    // Tutorial boss defeat event
    if (gameProgress.tutorialStep === 2 && currentEnemy && (currentEnemy.name.includes('覇王'))) {
      record.lose--; // Don't count tutorial defeat in stats
      save();
      updateRecord();
      
      const modal = document.getElementById('battle-result-modal');
      const labBtn = document.getElementById('battle-result-lab') || document.querySelector('.result-btn.secondary');
      
      if (labBtn) labBtn.style.display = 'none';
      if (nextBtn) {
        nextBtn.style.display = 'inline-block';
        nextBtn.textContent = '🗺️ 次へ';
        const defaultOnClick = nextBtn.onclick;
        nextBtn.onclick = () => {
          if (modal) modal.style.display = 'none';
          if (labBtn) labBtn.style.display = '';
          nextBtn.onclick = defaultOnClick;
          onTutorialBossDefeat();
        };
      }
      
      if (modal) modal.style.display = 'flex';
      return;
    }

    // ラスボス覇王戦敗北時: 「次へ」ボタンを隠し、ボタン選択肢を「🔬 ラボへ」の1つにする
    if (currentGameMode === 'boss-revenge') {
      if (nextBtn) nextBtn.style.display = 'none';
      save();
      updateRecord();
      const modal = document.getElementById('battle-result-modal');
      if (modal) modal.style.display = 'flex';
      return;
    }

    if (currentGameMode === 'survival') {
      sub.textContent += ` 💀 連勝記録は ${survivalWins} でストップしました。(BEST: ${survivalBestRecord})`;
      survivalWins = 0;
      nextBtn.textContent = '🔄 最初から挑戦';
    } else {
      nextBtn.textContent = '🔄 もう一度挑戦';
    }

  } else {
    banner.textContent = 'DRAW';
    banner.style.color = 'var(--text-primary)';
    banner.style.textShadow = 'none';
    if (panel) panel.style.borderColor = 'var(--border)';
    sub.textContent = '決着がつかなかった…';
    record.draw++;
    nextBtn.textContent = '🔄 再戦する';
  }

  save();
  updateRecord();
  prepareStage();
  const modal = document.getElementById('battle-result-modal');
  if (modal) modal.style.display = 'flex';
}

function resultNext() {
  const modal = document.getElementById('battle-result-modal');
  if (modal) modal.style.display = 'none';

  if (currentGameMode === 'boss-revenge') {
    handleBossRevengeVictory();
    return;
  }

  if (currentGameMode === 'free') {
    const overlay = document.getElementById('result-overlay');

    if (p2pBoutState) {
      const playerWon = (pState.cur > 0 && eState.cur <= 0);
      const draw = (pState.cur <= 0 && eState.cur <= 0);
      if (!draw) {
        if (playerWon) p2pBoutState.boutMyWins++;
        else p2pBoutState.boutOppWins++;
      }
      const isFinished = p2pBoutState.boutMyWins >= 2 || p2pBoutState.boutOppWins >= 2 || p2pBoutState.boutIndex >= 2;
      if (!isFinished) {
        p2pBoutState.boutIndex++;
        if (overlay) overlay.classList.remove('visible');
        startP2PTeamBout(p2pBoutState.boutIndex);
        return;
      } else {
        const w = p2pBoutState.boutMyWins;
        const l = p2pBoutState.boutOppWins;
        alert('フリー団体戦終了！\n\n【対戦結果】\nあなた：' + w + '勝\nあいて：' + l + '勝\n\n' + (w > l ? '🎉 見事勝ち越しました！おめでとう！' : '💀 惜しくも負けてしまいました。修行し直しましょう！'));
        p2pBoutState = null;
      }
    }

    if (overlay) overlay.classList.remove('visible');
    goScreen('free-battle-lobby');
    showP2PStep(3);
    return;
  }

  if (currentGameMode === 'team-arena' && taState) {
    if (taState.eliminated) {
      return;
    }
    
    const playerWon = (pState.cur > 0 && eState.cur <= 0);
    const draw = (pState.cur <= 0 && eState.cur <= 0);
    
    if (draw) {
      taStartNextBout();
      return;
    }
    
    const res = taHandleBoutResult(playerWon);
    if (res === 'match-won') {
      taShowProgressScreen();
    } else if (res === 'bout-continue') {
      taShowBoutInterim();
    }
    return;
  }

  const overlay = document.getElementById('result-overlay');
  if (overlay) overlay.classList.remove('visible');
  selBattle = 0;
  goScreen('scouting');
}

function resultLab() {
  const modal = document.getElementById('battle-result-modal');
  if (modal) modal.style.display = 'none';
  const overlay = document.getElementById('result-overlay');
  if (overlay) overlay.classList.remove('visible');
  
  if (currentGameMode === 'free') {
    // フリー対戦終了後にラボに戻る時は、フリーバトル用ラボタブを自動的に選択
    selBattle = 0;
    goScreen('lab');
    switchLabMode('free');
  } else {
    selBattle = 0;
    goScreen('lab');
  }
}

// ============================================================
//  SAVE SLOT UI & MANAGEMENT SYSTEM
// ============================================================

function handleTitleStart() {
  const d = getSlotData(activeSlotId);
  if (d && d.playerName) {
    openSaveSlotModal();
  } else {
    let anyData = false;
    for (let i = 1; i <= 3; i++) {
      if (getSlotData(i)) { anyData = true; break; }
    }
    if (anyData) {
      openSaveSlotModal();
    } else {
      startNewGameInSlot(1);
    }
  }
}

function openSaveSlotModal() {
  renderSaveSlots();
  const overlay = document.getElementById('save-slot-overlay');
  if (overlay) overlay.style.display = 'flex';
}

function closeSaveSlotModal() {
  const overlay = document.getElementById('save-slot-overlay');
  if (overlay) overlay.style.display = 'none';
}

function renderSaveSlots() {
  const container = document.getElementById('save-slots-container');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 1; i <= 3; i++) {
    const data = getSlotData(i);
    const isActive = (i === activeSlotId);
    
    const card = document.createElement('div');
    card.className = 'slot-card' + (isActive ? ' active-slot' : '');
    
    if (data && data.playerName) {
      const unlockedCount = Array.isArray(data.unlockedSkills) ? data.unlockedSkills.length : 0;
      const pct = Math.floor((unlockedCount / 30) * 100);
      const stageStr = typeof data.stageIndex === 'number' ? (data.stageIndex + 1) : 1;
      const wins = (data.record && data.record.win) || 0;
      const loses = (data.record && data.record.lose) || 0;

      card.innerHTML = `
        <div class="slot-card-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:bold; font-size:16px; color:var(--accent-gold);">SLOT ${i}</span>
            ${isActive ? '<span style="font-size:11px; background:var(--accent-gold); color:#000; font-weight:bold; padding:1px 6px; border-radius:3px;">選択中</span>' : ''}
          </div>
          <span class="slot-badge in-use">プレイ中</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:2px;">
          <div style="font-size:18px; font-weight:bold; color:var(--text-primary);">${data.playerName}</div>
          <div style="font-size:12px; color:var(--text-dim);">最終保存: ${data.updatedAt || '不明'}</div>
        </div>
        <div style="font-size:13px; color:var(--text-secondary); display:flex; gap:12px; flex-wrap:wrap; margin-top:2px;">
          <span>⚔️ STAGE ${stageStr}</span>
          <span>📜 スキル解明: ${unlockedCount}/30 (${pct}%)</span>
          <span>🏆 戦績: ${wins}勝 ${loses}敗</span>
        </div>
        <div class="slot-actions">
          <button class="btn-secondary" style="padding:4px 12px; font-size:13px; border-color:var(--accent-cyan); color:var(--accent-cyan);" onclick="loadGameFromSlot(${i})">▶ つづきから</button>
          <button class="btn-secondary" style="padding:4px 12px; font-size:13px; border-color:rgba(245,158,11,0.4); color:var(--accent-gold);" onclick="manualSaveToSlot(${i})">💾 上書き保存</button>
          <button class="btn-secondary" style="padding:4px 10px; font-size:13px; border-color:rgba(239,68,68,0.4); color:var(--accent-red);" onclick="deleteSlotConfirm(${i})">🗑️ 削除</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="slot-card-header">
          <span style="font-weight:bold; font-size:16px; color:var(--text-dim);">SLOT ${i}</span>
          <span class="slot-badge empty">新規データ (Empty)</span>
        </div>
        <div style="font-size:14px; color:var(--text-dim); padding:8px 0;">セーブデータがありません</div>
        <div class="slot-actions">
          <button class="title-btn" style="padding:4px 16px; font-size:14px;" onclick="startNewGameInSlot(${i})">＋ はじめから</button>
        </div>
      `;
    }
    container.appendChild(card);
  }
}

function loadGameFromSlot(slotId) {
  loadSlot(slotId);
  closeSaveSlotModal();
  if (playerName) {
    goScreen('main-menu');
  } else {
    showNameDialog();
  }
}

function manualSaveToSlot(slotId) {
  activeSlotId = slotId;
  save();
  renderSaveSlots();
  alert(`SLOT ${slotId} に保存しました！`);
}

function startNewGameInSlot(slotId) {
  activeSlotId = slotId;
  deleteSlotData(slotId);
  resetMemoryState();
  closeSaveSlotModal();
  showNameDialog();
}

async function deleteSlotConfirm(slotId) {
  const result = await showConfirmModal(`SLOT ${slotId} のセーブデータを本当に削除しますか？\n(削除されたデータは二度と復元できません)`);
  if (result) {
    deleteSlotData(slotId);
    renderSaveSlots();
  }
}



// ============================================================
//  SYSTEM MESSAGE MODAL (Custom Alert Replacement)
// ============================================================
let _sysModalCallback = null;
const _nativeAlert = window.alert.bind(window);

function showSystemModal(message, callback) {
  const backdrop = document.getElementById('system-modal-backdrop');
  const dialog = document.getElementById('system-modal-dialog');
  const textEl = document.getElementById('system-modal-msg-text');
  if (backdrop && dialog && textEl) {
    textEl.textContent = message;
    backdrop.style.display = 'block';
    dialog.style.display = 'block';
    _sysModalCallback = callback || null;
    // Focus the OK button for accessibility
    const okBtn = document.getElementById('system-modal-ok-btn');
    if (okBtn) setTimeout(() => okBtn.focus(), 50);
  } else {
    // Fallback if DOM not ready
    _nativeAlert(message);
    if (callback) callback();
  }
}

function closeSystemModal() {
  const backdrop = document.getElementById('system-modal-backdrop');
  const dialog = document.getElementById('system-modal-dialog');
  if (backdrop) backdrop.style.display = 'none';
  if (dialog) dialog.style.display = 'none';
  if (_sysModalCallback) {
    const cb = _sysModalCallback;
    _sysModalCallback = null;
    cb();
  }
}

// Override window.alert to use custom modal
window.alert = function(message) {
  showSystemModal(message);
};


// ============================================================
//  CONFIRM MODAL (Custom confirm() Replacement)
// ============================================================
let _confirmResolve = null;

function showConfirmModal(message) {
  return new Promise((resolve) => {
    const backdrop = document.getElementById('confirm-modal-backdrop');
    const dialog = document.getElementById('confirm-modal-dialog');
    const textEl = document.getElementById('confirm-modal-msg-text');
    if (backdrop && dialog && textEl) {
      textEl.textContent = message;
      backdrop.style.display = 'block';
      dialog.style.display = 'block';
      _confirmResolve = resolve;
      const okBtn = document.getElementById('confirm-modal-ok-btn');
      if (okBtn) setTimeout(() => okBtn.focus(), 50);
    } else {
      resolve(confirm(message));
    }
  });
}

function resolveConfirmModal(result) {
  const backdrop = document.getElementById('confirm-modal-backdrop');
  const dialog = document.getElementById('confirm-modal-dialog');
  if (backdrop) backdrop.style.display = 'none';
  if (dialog) dialog.style.display = 'none';
  if (_confirmResolve) {
    const r = _confirmResolve;
    _confirmResolve = null;
    r(result);
  }
}

// ============================================================
//  STORY DIALOG SYSTEM
// ============================================================
let storyDialogQueue = [];
let storyDialogCallback = null;

function onFirstBuildCompleteStoryEnd() {
  gameProgress.tutorialStep = 4;
  save();
  goScreen('main-menu');
  
  const arrowArena = document.getElementById('tutorial-arrow-arena');
  const btnArena = document.querySelector('.menu-mode-btn[onclick*="startMode(\'league\')"]');
  if (arrowArena) {
    arrowArena.style.display = 'block';
    arrowArena.style.animation = 'tutorial-bounce 0.8s ease-in-out infinite';
  }
  if (btnArena) {
    btnArena.style.boxShadow = '0 0 25px var(--accent-gold)';
    btnArena.style.borderColor = 'var(--accent-gold)';
  }
}

function onTutorialBossDefeat() {
  const pName = playerName || '主人公';
  showStoryDialog([
    { speaker: pName, text: '「な、なんだよこれ……！ こんなにあっさり倒されるなんて……そんなのありかよ！？」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '覇王 ヴィクター', text: '「……ガッカリさせないでくれ。力自慢の田舎者が、ただ数値を適当に割り振っただけの『ゴミクズ』を引き連れてくるとはな。」', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: pName, text: '「ゴミクズだと……！？ オレの相棒をバカにするな！」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '覇王 ヴィクター', text: '「事実を言っているのだ。この世界において、ステータスの数値をどう配分するか……そしてどんなスキルを1つセットするか、その『ビルド』にこそ真の強さが宿る。\n\nお前のモンスターには何の戦略も、尖った強さ（ビルド）も存在しない。これでは戦い以前の問題だ。」', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: pName, text: '「・・・・・・」', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '覇王 ヴィクター', text: '「無知な若者よ、街のラボへ戻るがいい。モンスターを作り直し、100という限られたポイントを研ぎ澄ませ。スキルのシナジーを理解し、真に強いビルドを組み上げたなら……また私に挑戦するがいい。フハハハ！」', color: '#ef4444', speakerTextColor: '#fff' },
  ], () => {
    gameProgress.tutorialStep = 3;
    save();
    goScreen('lab');
  });
}

function onColosseumPreBattleStoryEnd() {
  // 1. テキストウィンドウを閉じる
  // 2. 「バトル開始！」ボタンを活性化（クリック可能状態に）
  const startBtn = document.getElementById('btn-battle') || document.querySelector('.battle-start-btn');
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.classList.add('active');
    startBtn.style.opacity = '1';
    startBtn.style.pointerEvents = 'auto';
    startBtn.style.boxShadow = '0 0 20px var(--accent-gold)';
  }
}

function onPochiCreatedStoryEnd() {
  // 1. テキストウィンドウを閉じる
  // 2. マップ画面へ遷移し、プレイヤーがタップで移動できるようにコロシアム（闘技場）のアイコンをハイライト演出
  goScreen('main-menu');
  
  const arrowArena = document.getElementById('tutorial-arrow-arena');
  const btnArena = document.querySelector('.menu-mode-btn[onclick*="startMode(\'league\')"]');
  if (arrowArena) {
    arrowArena.style.display = 'block';
    arrowArena.style.animation = 'tutorial-bounce 0.8s ease-in-out infinite';
  }
  if (btnArena) {
    btnArena.style.boxShadow = '0 0 25px var(--accent-gold)';
    btnArena.style.borderColor = 'var(--accent-gold)';
  }
}
function showStoryDialog(dialogList, onComplete) {
  storyDialogQueue = [...dialogList];
  storyDialogCallback = onComplete || null;
  advanceStoryDialog();
}

function advanceStoryDialog() {
  const overlay = document.getElementById('story-dialog-overlay');
  if (storyDialogQueue.length === 0) {
    overlay.style.display = 'none';
    if (storyDialogCallback) {
      const cb = storyDialogCallback;
      storyDialogCallback = null;
      cb();
    }
    return;
  }
  const item = storyDialogQueue.shift();
  const speakerEl = document.getElementById('story-speaker');
  const textEl = document.getElementById('story-text');
  speakerEl.textContent = item.speaker || 'ナレーション';
  speakerEl.style.background = item.color || 'var(--accent-gold)';
  speakerEl.style.color = item.speakerTextColor || '#000';
  textEl.textContent = item.text;
  overlay.style.display = 'flex';
}

// ============================================================
//  TUTORIAL PROGRESSION SYSTEM
// ============================================================

const REWARD_SHOP_ITEMS = [
  { id: 'robo', name: '🤖 ロボシリーズ', sub: 'メカニカル小隊', desc: 'メタル・機械系の作成権をアンロック', system: 'metal', price: 500 },
  { id: 'shin', name: '⚡ 神シリーズ', sub: '神話の聖闘士', desc: '悪魔（デビル）系の作成権をアンロック', system: 'devil', price: 500 },
  { id: 'dinosaur', name: '🦖 恐竜シリーズ', sub: '太古 of 覇者', desc: 'ドラゴン系の作成権をアンロック', system: 'dragon', price: 500 },
  { id: 'toy', name: '🧸 ぬいぐるみシリーズ', sub: 'パッチワーク', desc: '植物（自然）系の作成権をアンロック', system: 'plant', price: 500 },
  { id: 'ghost', name: '👻 おばけシリーズ', sub: 'ゆめかわナイトメア', desc: 'アンデッド系の作成権をアンロック', system: 'undead', price: 500 },
  
  // 育成・拡張アイテム
  { id: 'item_expand_slot_2', name: '🏠 モンスター枠拡張 (+2)', sub: 'ラボケージ拡張', desc: 'モンスター保管枠を最大+2枠拡張します（即時反映）。', isItem: true, price: 500 },
  { id: 'item_reset_stats', name: '💊 ステータスリセット薬', sub: '育成リセット', desc: 'モンスター1体の能力配分を初期化し100ptを再配分できます。', isItem: true, price: 300 },
  { id: 'item_change_skill', name: '📜 スキル再構成薬', sub: 'スキル再抽選', desc: 'モンスター1体のアクティブスキルをランダムに変更します。', isItem: true, price: 300 }
];

function renderRewardShop() {
  const shopBp = document.getElementById('shop-bp-display');
  const activeBp = (typeof debugMode !== 'undefined' && debugMode) ? 9999 : bp;
  if (shopBp) shopBp.textContent = `${activeBp} BP`;
  
  const container = document.getElementById('shop-items-list');
  if (!container) return;
  container.innerHTML = '';
  
  REWARD_SHOP_ITEMS.forEach(item => {
    const isUnlocked = !item.isItem && isSeriesUnlocked(item.id);
    const card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; transition:all 0.2s;';
    
    let buttonHtml = '';
    if (isUnlocked) {
      buttonHtml = `<button class="btn-secondary" style="border-color:var(--accent-green); color:var(--accent-green); cursor:default; font-weight:bold;" disabled>✅ 解放済み</button>`;
    } else {
      const activeBp = (typeof debugMode !== 'undefined' && debugMode) ? 9999 : bp;
      const price = item.price || 500;
      const canBuy = activeBp >= price;
      buttonHtml = `<button class="title-btn" style="padding:8px 16px; font-size:13px; ${!canBuy ? 'opacity:0.5; cursor:not-allowed; background:#475569; color:#cbd5e1; box-shadow:none;' : ''}" ${!canBuy ? 'disabled' : ''} onclick="buyShopItem('${item.id}')">${price} BPで購入</button>`;
    }
    
    card.innerHTML = `
      <div style="text-align:left;">
        <div style="font-weight:bold; font-size:16px; color:var(--text-primary);">${item.name}</div>
        <div style="font-size:12px; color:var(--accent-gold); margin-top:2px;">【${item.sub}】</div>
        <div style="font-size:13px; color:var(--text-dim); margin-top:4px;">${item.desc}</div>
      </div>
      <div>
        ${buttonHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function buyShopItem(itemId) {
  const item = REWARD_SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const price = item.price || 500;
  const activeBp = (typeof debugMode !== 'undefined' && debugMode) ? 9999 : bp;
  
  if (activeBp < price) {
    alert('武舞台ポイント(BP)が不足しています！');
    return;
  }
  
  if (!item.isItem && isSeriesUnlocked(itemId) && !(typeof debugMode !== 'undefined' && debugMode)) {
    alert('すでに解放されています！');
    return;
  }
  
  if (typeof debugMode !== 'undefined' && debugMode) {
    alert('デバッグモード中は購入できません。通常モードでお楽しみください。');
    return;
  }
  
  bp -= price;
  
  if (item.isItem) {
    if (itemId === 'item_expand_slot_2') {
      ownedItems.expandSlot2 = (ownedItems.expandSlot2 || 0) + 1;
      alert('「モンスター枠拡張 (+2)」を購入しました！ラボのアイテム画面から使用できます。');
    } else if (itemId === 'item_reset_stats') {
      ownedItems.resetStats = (ownedItems.resetStats || 0) + 1;
      alert('「ステータスリセット薬」を購入しました！ラボのアイテム画面から使用できます。');
    } else if (itemId === 'item_change_skill') {
      ownedItems.changeSkill = (ownedItems.changeSkill || 0) + 1;
      alert('「スキル再構成薬」を購入しました！ラボのアイテム画面から使用できます。');
    }
  } else {
    unlockedSeries.push(itemId);
    alert('シリーズを解放しました！ラボ調合で使用可能になります。');
  }
  
  save();
  renderRewardShop();
}

function getSkillProgress() {
  if (typeof debugMode !== 'undefined' && debugMode) {
    return { count: 30, total: 30, pct: 100 };
  }
  const uniqueCount = Math.min(new Set(unlockedSkills).size, 30);
  return { count: uniqueCount, total: 30, pct: Math.floor((uniqueCount / 30) * 100) };
}

function updateSkillProgressUI() {
  const sp = getSkillProgress();
  const menuCount = document.getElementById('menu-unlocked-count');
  if (menuCount) menuCount.textContent = sp.count;
  const labCount = document.getElementById('lab-unlocked-count');
  if (labCount) labCount.textContent = '🔓 解放済みスキル: ' + sp.count + ' / ' + sp.total;
  const meterFill = document.getElementById('skill-meter-fill');
  if (meterFill) meterFill.style.width = sp.pct + '%';
  const meterText = document.getElementById('skill-meter-text');
  if (meterText) meterText.textContent = '📜 スキル解明度: ' + sp.count + '/' + sp.total + ' (' + sp.pct + '%)';
}

function isSeriesUnlocked(seriesId) {
  if (typeof debugMode !== 'undefined' && debugMode) {
    return true;
  }
  return unlockedSeries.includes(seriesId);
}

function updateMenuFacilities() {
  const sp = getSkillProgress();
  const mapTeam = document.getElementById('map-area-team-arena');
  const mapTower = document.getElementById('map-area-tower');
  const mapRevenge = document.getElementById('map-area-boss-revenge');
  
  // スキル解明数が30（全解放）に達しているかチェックして覇王リベンジのフラグを更新
  if (sp.count >= 30) {
    gameProgress.bossRevengeUnlocked = true;
  } else {
    gameProgress.bossRevengeUnlocked = false;
  }
  
  if (mapTeam) {
    const lockEl = document.getElementById('map-lock-team-arena');
    const tooltipEl = mapTeam.querySelector('.map-area-tooltip');
    if (sp.pct >= 50) {
      mapTeam.classList.remove('locked');
      if (lockEl) lockEl.style.display = 'none';
      if (tooltipEl) tooltipEl.innerHTML = `🛡️ 武舞台（団体戦）<br><span style="font-size:10px; color:#aaa;">3vs3トーナメント (所持BP: ${bp} BP)</span>`;
    } else {
      mapTeam.classList.add('locked');
      if (lockEl) lockEl.style.display = 'block';
      if (tooltipEl) tooltipEl.innerHTML = `🛡️ 武舞台（団体戦）<br><span style="font-size:10px; color:#ef4444; font-weight:bold;">🔒 スキル解明度50%で解放</span>`;
    }
  }
  if (mapTower) {
    const lockEl = document.getElementById('map-lock-tower');
    const tooltipEl = mapTower.querySelector('.map-area-tooltip');
    if (sp.pct >= 50) {
      mapTower.classList.remove('locked');
      if (lockEl) lockEl.style.display = 'none';
      if (tooltipEl) tooltipEl.innerHTML = `🗼 試練のタワー<br><span style="font-size:10px; color:#aaa;">サバイバル勝ち抜き戦</span>`;
    } else {
      mapTower.classList.add('locked');
      if (lockEl) lockEl.style.display = 'block';
      if (tooltipEl) tooltipEl.innerHTML = `🗼 試練のタワー<br><span style="font-size:10px; color:#ef4444; font-weight:bold;">🔒 スキル解明度50%で解放</span>`;
    }
  }
  if (mapRevenge) {
    const lockEl = document.getElementById('map-lock-boss-revenge');
    const tooltipEl = document.getElementById('boss-revenge-tooltip');
    
    // 常時 flex 表示
    mapRevenge.style.display = 'flex';
    
    if (gameProgress.bossRevengeUnlocked) {
      mapRevenge.classList.remove('locked');
      if (lockEl) lockEl.style.display = 'none';
      if (tooltipEl) tooltipEl.innerHTML = `👑 覇王リベンジマッチ<br><span style="font-size:10px; color:#fff;">闘技場の覇王へリベンジ</span>`;
    } else {
      mapRevenge.classList.add('locked');
      if (lockEl) lockEl.style.display = 'block';
      if (tooltipEl) tooltipEl.innerHTML = `👑 覇王リベンジマッチ<br><span style="font-size:10px; color:#ef4444; font-weight:bold;">🔒 スキル30個全解放でアンロック</span>`;
    }
  }
  
  // Tutorial navigation arrows & Lab highlight box
  const arrowLab = document.getElementById('tutorial-arrow-lab');
  const arrowArena = document.getElementById('tutorial-arrow-arena');
  if (arrowLab) arrowLab.style.display = (gameProgress.tutorialStep === 1) ? 'block' : 'none';
  if (arrowArena) arrowArena.style.display = (gameProgress.tutorialStep === 2) ? 'block' : 'none';

  const labArea = document.getElementById('map-area-lab');
  if (labArea) {
    if (gameProgress.tutorialStep === 1) {
      labArea.style.boxShadow = '0 0 35px var(--accent-gold), inset 0 0 20px rgba(245,158,11,0.8)';
      labArea.style.borderColor = 'var(--accent-gold)';
      labArea.style.transform = 'scale(1.05)';
    } else {
      labArea.style.boxShadow = '';
      labArea.style.borderColor = '';
      labArea.style.transform = '';
    }
  }
}

function onMapAreaClick(facility) {
  const sp = getSkillProgress();
  
  // ★ チュートリアル中のマップ行動制限
  if (gameProgress.tutorialStep === 1) {
    if (facility !== 'lab') {
      alert('【チュートリアル中】まずはモンスター研究所（ラボ）へ向かいましょう！');
      return;
    }
  } else if (gameProgress.tutorialStep === 2) {
    if (facility !== 'league') {
      alert('【チュートリアル中】ポチと共にコロシアム（闘技場）へ向かい、覇王 ヴィクターに挑戦しましょう！');
      return;
    }
  } else if (gameProgress.tutorialStep === 3) {
    const activeLab = getActiveLab ? getActiveLab() : [];
    if (activeLab.length < 2 && facility !== 'lab') {
      alert('【チュートリアル中】まずはラボで新しいモンスターを生み出しましょう！');
      return;
    }
  }

  if (facility === 'team-arena') {
    if (sp.pct < 50) {
      alert('【武舞台（団体戦）】はスキル解明度が50%以上になると解放されます。現在: ' + sp.pct + '%');
      return;
    }
    openTeamArenaMenu();
  } else if (facility === 'tower') {
    if (sp.pct < 50) {
      alert('【試練のタワー（勝ち抜き戦）】はスキル解明度が50%以上になると解放されます。現在: ' + sp.pct + '%');
      return;
    }
    startMode('survival');
  } else if (facility === 'lab') {
    goScreen('lab');
  } else if (facility === 'league') {
    startMode('league');
  } else if (facility === 'free') {
    startMode('free');
  } else if (facility === 'shop') {
    openRewardShop();
  }
}
function checkSkillMilestones() {
  const sp = getSkillProgress();
  
  // 50% milestone (15 skills)
  if (sp.count >= 15 && !localStorage.getItem('100pt_milestone_50')) {
    localStorage.setItem('100pt_milestone_50', 'true');
    showStoryDialog([
      { speaker: 'ナレーション', text: 'スキルの解明が大きく進んできた！ 首都の『武舞台（団体戦）』と『試練のタワー』への挑戦権が得られた！', color: 'var(--accent-gold)' },
      { speaker: playerName, text: 'やった！ 新たな戦いの場が開かれたぞ！ もっとスキルを集めて、あの覇王にリベンジだ！', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    ], () => {
      updateMenuFacilities();
      save();
    });
  }
  
  // 100% milestone (30 skills)
  if (sp.count >= 30 && !gameProgress.bossRevengeUnlocked) {
    gameProgress.bossRevengeUnlocked = true;
    save();
    showStoryDialog([
      { speaker: 'ナレーション', text: 'すべてのスキルを解明した！ これが最高峰 of モンスター研究の成果だ！', color: 'var(--accent-gold)' },
      { speaker: playerName, text: 'ついに全てのスキルを手に入れた…！ これが僕たちの最高のビルドだ！ 再びあの覇王に挑おう！', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      { speaker: 'ナレーション', text: '闘技場に『👑 覇王リベンジマッチ』が解放されました！', color: 'var(--accent-gold)' },
    ], () => {
      updateMenuFacilities();
      goScreen('main-menu');
    });
  }
}

function startBossRevenge() {
  if (gameProgress.tutorialStep < 4) {
    alert('【チュートリアル中】指定の場所以外へは移動できません。');
    return;
  }
  if (!gameProgress.bossRevengeUnlocked) {
    alert('【ロック中】スキルを全解放（30/30）すると覇王リベンジマッチに挑戦できます！');
    return;
  }
  
  const activeLab = getActiveLab();
  if (activeLab.length === 0) {
    alert('モンスターが必要です。ラボで作成してください。');
    return;
  }

  // 戦闘前会話ストーリー
  showStoryDialog([
    { speaker: '覇王ヴィクター', text: 'ほう、あのときの田舎者の若造か。すべてのスキルを解明して舞い戻ってくるとはな。', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: playerName, text: 'あの時の負けを返しに来た！これが僕たちの集大成のパーティだ！', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '覇王ヴィクター', text: 'ハハハッ！良い面構えだ。ならば全力で相手をしてやろう！いくぞ！', color: '#ef4444', speakerTextColor: '#fff' }
  ], () => {
    // ストーリー読了後に専用バトル前確認画面へ遷移
    currentGameMode = 'boss-revenge';
    currentEnemy = { ...HAOU_REVENGE_BOSS };
    goScreen('scouting');
  });
}

function handleBossRevengeVictory() {
  gameProgress.bossDefeated = true;
  save();
  showStoryDialog([
    { speaker: '覇王ヴィクター', text: 'バ…バカな…！ あの時の田舎者がここまで…！', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: playerName || '研究員', text: 'あの日の借りは返したよ。僕たちは最高のチームだ！', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '覇王ヴィクター', text: '100ptという制限の中で、これほどの領域に達するとは…だが覚えておけ、世界にはまだ見ぬ強豪（ビルド）がごまんといることを…！', color: '#ef4444', speakerTextColor: '#fff' }
  ], () => {
    startEndingCredits();
  });
}

function startEndingCredits() {
  const endingScreen = document.getElementById('ending-screen');
  const creditsContainer = document.getElementById('credits-container');
  const finishBtn = document.getElementById('finish-ed-btn');
  
  const nameEl = document.getElementById('ending-researcher-name');
  if (nameEl) {
    const pName = (typeof playerName === 'string' && playerName.trim()) ? playerName.trim() : 'Pee';
    nameEl.textContent = pName.endsWith('研究員') ? pName : (pName + '研究員');
  }

  if (window.bgmManager) {
    window.bgmManager.play('victory', true); // Victory.mp3 をループ再生
  }

  if (endingScreen) {
    endingScreen.style.display = 'flex';
    if (creditsContainer) {
      creditsContainer.classList.remove('roll-animation');
      void creditsContainer.offsetWidth; // reflow
      creditsContainer.classList.add('roll-animation');
    }
  }

  if (finishBtn) {
    finishBtn.onclick = () => {
      // 1. エンディング画面を閉じる
      if (endingScreen) endingScreen.style.display = 'none';

      // 2. クリア済みフラグの保存
      localStorage.setItem('game_cleared', 'true');
      gameProgress.bossDefeated = true;
      save();

      // 3. マップ画面へ遷移
      goScreen('main-menu');

      // 4. BGMをマップ用（OP BGM1）へ復帰
      if (window.bgmManager) {
        window.bgmManager.play('map', true);
      }

      // 5. クリア後メッセージの表示
      alert("祝・覇王撃破！\n試練の塔やコロシアムで引き続きモンスター育成とバトルをお楽しみください！");
    };
  }
}

// ============================================================
//  TEAM ARENA (武舞台) & SHOP SYSTEM
// ============================================================

function openTeamArenaMenu() {
  const bpDisplay = document.getElementById('team-arena-bp-display');
  if (bpDisplay) bpDisplay.textContent = `${bp} BP`;
  goScreen('team-arena-menu');
  triggerFirstTimeHelp('team-arena');
}

function startTeamArenaBattle() {
  // ★ 武舞台はストーリー用編成を強制参照
  currentLabMode = 'story';
  let activeLab = getActiveLab();
  if (activeLab.length < 3) {
    if (typeof debugMode !== 'undefined' && debugMode) {
      const dummyNames = ['デバッグ先鋒', 'デバッグ中堅', 'デバッグ大将'];
      while (activeLab.length < 3) {
        const m = {
          id: String(Date.now() + activeLab.length),
          name: dummyNames[activeLab.length] || 'デバッグ兵',
          systemType: 'スライム系',
          monsterClass: 'スライム',
          stats: { hp: 50, attack: 40, defense: 40, speed: 40, luck: 40 },
          skills: { active: ['none'], passive: [] }
        };
        activeLab.push(m);
      }
      save();
      renderLabGrid();
      alert('🛠️ デバッグ機能：モンスターが不足していたため、テスト用モンスターを自動生成しました！');
    } else {
      alert('武舞台（団体戦）に挑戦するには、ラボにモンスターが少なくとも3体登録されている必要があります。');
      return;
    }
  }
  
  // Initialize team arena state
  taState = {
    myTeam: [null, null, null], // indices into activeLab
    round: 0,        // 0-4 (5 rounds total)
    roundWins: 0,     // how many rounds won
    boutIndex: 0,     // 0=先鋒, 1=中堅, 2=大将
    boutMyWins: 0,    // wins in current match
    boutEnemyWins: 0, // enemy wins in current match
    enemyTeams: [],   // generated enemy teams for each round
    eliminated: false,
    activeSlotIdx: 0  // which slot is being selected
  };
  
  // Generate 5 enemy teams with scaling difficulty
  taState.enemyTeams = taGenerateAllEnemyTeams();
  
  // Open party selection screen
  taRenderPartySelect();
  goScreen('ta-party');
}

// ---- Team Arena State ----
let taState = null;
const TA_ROUND_NAMES = ['1回戦', '2回戦', '準々決勝', '準決勝', '決勝'];
const TA_BOUT_NAMES = ['先鋒戦', '中堅戦', '大将戦'];
const TA_SLOT_LABELS = ['先鋒', '中堅', '大将'];
const TA_RANK_REWARDS = [0, 0, 0, 40, 80, 120]; // 順位報酬: index = roundWins
const TA_PARTICIPATION_REWARD = 10; // 参加賞


// ---- Enemy Team Generation ----
function taGenerateAllEnemyTeams() {
  const teams = [];
  
  // 系統キーの一覧
  const typeKeys = Object.keys(MONSTER_TYPES).filter(k => !MONSTER_TYPES[k].hidden);
  
  // 名前プールの収集：通常リーグ戦に登場するモンスターの名前
  const leagueNames = STAGE_ENEMIES.map(e => e.name);
  // ラボ調合可能なモンスターの名前
  let creatorNames = [];
  typeKeys.forEach(k => {
    creatorNames = creatorNames.concat(MONSTER_TYPES[k].names);
  });
  // 全名前プール
  const enemyNamePool = [...new Set([...leagueNames, ...creatorNames])];

  // スキルプールの定義
  // 1. 初期解放スキル（アクティブとパッシブ）
  const initialActive = ['shuriken', 'midare', 'weakmaker', 'heal', 'regen', 'soulshare', 'teppeki', 'enmaku', 'paperarmor', 'strengthen', 'slownurse', 'draw'];
  const initialPassive = ['toge', 'secondwind', 'firstwind', 'shuffle'];
  
  // 2. 解放済みスキル（プレイヤーが解放したもの unlockedSkills）
  const unlockedActive = unlockedSkills.filter(id => SKILLS[id] && SKILLS[id].type === 'アクティブ');
  const unlockedPassive = unlockedSkills.filter(id => SKILLS[id] && SKILLS[id].type === 'パッシブ');
  
  const activePool = [...new Set([...initialActive, ...unlockedActive])];
  const passivePool = [...new Set([...initialPassive, ...unlockedPassive])];

  for (let round = 0; round < 5; round++) {
    const team = [];
    
    for (let pos = 0; pos < 3; pos++) {
      // 1. 系統の選定
      const typeKey = typeKeys[Math.floor(Math.random() * typeKeys.length)];
      const typeObj = MONSTER_TYPES[typeKey];
      
      // 2. 名前の選定
      let mName = typeObj.names[Math.floor(Math.random() * typeObj.names.length)];
      if (!mName && enemyNamePool.length > 0) {
        mName = enemyNamePool[Math.floor(Math.random() * enemyNamePool.length)];
      }
      
      // 3. ステータス振り分け（ぴったり110ポイント）
      const baseStats = typeObj.base || { hp: 1, attack: 1, defense: 0, speed: 0, luck: 0 };
      const stats = {
        hp: baseStats.hp || 1,
        attack: baseStats.attack || 1,
        defense: baseStats.defense || 0,
        speed: baseStats.speed || 0,
        luck: baseStats.luck || 0
      };
      
      // baseパラメータの合計値を計算
      const baseSum = stats.hp + stats.attack + stats.defense + stats.speed + stats.luck;
      let remain = 110 - baseSum; // 110ptからの不足分
      
      const statKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
      
      // 回戦（round）が進むほど、ステータス配分に「極端な尖り」を持たせる
      if (round >= 2) {
        // 特化対象ステータスをランダムに1つ選ぶ
        const specKey = statKeys[Math.floor(Math.random() * statKeys.length)];
        // 決勝(round === 4)は70〜90pt、準々・準決(round 2, 3)は40〜65ptを特定ステータスに配分
        const specPts = round === 4 ? (70 + Math.floor(Math.random() * 20)) : (40 + Math.floor(Math.random() * 25));
        const allocated = Math.min(remain, specPts);
        stats[specKey] += allocated;
        remain -= allocated;
      }
      
      // 残りのポイントをランダムに配分（合計値調整）
      while (remain > 0) {
        const key = statKeys[Math.floor(Math.random() * statKeys.length)];
        stats[key]++;
        remain--;
      }
      
      // 4. スキルのランダムセット（アクティブ0〜1個、パッシブ0〜1個、最低1個）
      const skillsObj = { active: [], passive: [] };
      
      // 確率設定：後半の回戦ほど2個持ち（両方セット）の確率が上がる
      const skillCount = round === 4 ? 2 : (Math.random() < (0.5 + round * 0.1) ? 2 : 1);
      
      if (skillCount === 2) {
        const actSkill = activePool[Math.floor(Math.random() * activePool.length)] || 'none';
        const pasSkill = passivePool[Math.floor(Math.random() * passivePool.length)] || 'none';
        skillsObj.active.push(actSkill);
        skillsObj.passive.push(pasSkill);
      } else {
        if (Math.random() < 0.5) {
          const actSkill = activePool[Math.floor(Math.random() * activePool.length)] || 'none';
          skillsObj.active.push(actSkill);
        } else {
          const pasSkill = passivePool[Math.floor(Math.random() * passivePool.length)] || 'none';
          skillsObj.passive.push(pasSkill);
        }
      }
      
      team.push({
        name: mName,
        icon: typeObj.icon,
        systemType: typeObj.label,
        type: typeKey,
        stats: stats,
        skills: skillsObj
      });
    }
    team.forEach((m, idx) => {
      // プレビュー用に表示名スキルを作成
      const sArr = [];
      if (m.skills.active[0] && m.skills.active[0] !== 'none') {
        const sk = SKILLS[m.skills.active[0]];
        if (sk) sArr.push(sk.name);
      }
      if (m.skills.passive[0] && m.skills.passive[0] !== 'none') {
        const sk = SKILLS[m.skills.passive[0]];
        if (sk) sArr.push(sk.name);
      }
      m.skillName = sArr.length > 0 ? sArr.join(' / ') : 'なし';
    });
    team.forEach((m, idx) => {
      // 後方互換性用
      m.skill = m.skills.active[0] || m.skills.passive[0] || 'none';
    });
    teams.push(team);
  }
  return teams;
}

// ---- Party Selection UI ----
function taRenderPartySelect() {
  // ★ 武舞台はストーリー用編成を強制参照
  currentLabMode = 'story';
  const activeLab = getActiveLab();
  
  // Render slots
  for (let i = 0; i < 3; i++) {
    const content = document.getElementById('ta-slot-' + i + '-content');
    const slot = document.getElementById('ta-slot-' + i);
    if (!content || !slot) continue;
    
    const idx = taState.myTeam[i];
    if (idx !== null && activeLab[idx]) {
      const m = activeLab[idx];
      content.innerHTML = `<div><strong style="color:#fff;">${m.name}</strong><br><span style="font-size:12px; color:var(--text-dim);">${m.systemType}</span></div>`;
      slot.style.borderColor = 'var(--accent-gold)';
      slot.style.borderStyle = 'solid';
    } else {
      content.textContent = '未選択';
      slot.style.borderColor = 'rgba(255,255,255,0.15)';
      slot.style.borderStyle = 'dashed';
    }
  }
  
  // Highlight active slot
  for (let i = 0; i < 3; i++) {
    const slot = document.getElementById('ta-slot-' + i);
    if (i === taState.activeSlotIdx) {
      slot.style.boxShadow = '0 0 10px rgba(0,200,255,0.4)';
    } else {
      slot.style.boxShadow = 'none';
    }
  }
  
  // Render roster
  const roster = document.getElementById('ta-roster-list');
  if (!roster) return;
  roster.innerHTML = '';
  
  const usedIndices = taState.myTeam.filter(v => v !== null);
  
  activeLab.forEach((m, idx) => {
    const isUsed = usedIndices.includes(idx);
    const usedInSlot = taState.myTeam.indexOf(idx);
    
    const item = document.createElement('div');
    item.style = `padding:10px 12px; border:1px solid ${isUsed ? 'var(--accent-gold)' : 'var(--border)'}; border-radius:6px; cursor:pointer; transition:all 0.2s; background:${isUsed ? 'rgba(245,158,11,0.08)' : 'rgba(0,0,0,0.15)'}; opacity:${isUsed ? '0.6' : '1'};`;
    
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:${isUsed ? 'var(--text-dim)' : '#fff'};">${m.name}</strong>
          <span style="font-size:12px; color:var(--text-dim); margin-left:8px;">${m.systemType}</span>
          ${isUsed ? `<span style="font-size:11px; color:var(--accent-gold); margin-left:6px;">→ ${TA_SLOT_LABELS[usedInSlot]}</span>` : ''}
        </div>
        <div style="font-size:12px; color:var(--text-dim);">
          HP:${m.stats.hp} ATK:${m.stats.attack} DEF:${m.stats.defense}
        </div>
      </div>
    `;
    
    item.onclick = () => {
      if (isUsed) {
        // Remove from slot
        const slotIdx = taState.myTeam.indexOf(idx);
        if (slotIdx !== -1) taState.myTeam[slotIdx] = null;
      } else {
        // Assign to active slot
        // If slot already has a monster, replace it
        taState.myTeam[taState.activeSlotIdx] = idx;
        // Auto advance to next empty slot
        for (let s = 0; s < 3; s++) {
          if (taState.myTeam[s] === null) {
            taState.activeSlotIdx = s;
            break;
          }
        }
      }
      taRenderPartySelect();
    };
    
    roster.appendChild(item);
  });
  
  // Update start button
  const startBtn = document.getElementById('ta-start-btn');
  const allFilled = taState.myTeam.every(v => v !== null);
  if (startBtn) startBtn.disabled = !allFilled;
}

function taSelectSlot(slotIdx) {
  taState.activeSlotIdx = slotIdx;
  taRenderPartySelect();
}

// ---- Tournament Start ----
function taStartTournament() {
  taState.round = 0;
  taState.roundWins = 0;
  taState.eliminated = false;
  taShowProgressScreen();
}

// ---- Progress Screen ----
function taShowProgressScreen() {
  const round = taState.round;
  // ★ 武舞台はストーリー用編成を強制参照
  currentLabMode = 'story';
  const activeLab = getActiveLab();
  
  // Round indicators
  const roundDisplay = document.getElementById('ta-round-display');
  if (roundDisplay) {
    roundDisplay.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const indicator = document.createElement('div');
      let bg = 'rgba(255,255,255,0.06)';
      let color = 'var(--text-dim)';
      let border = '1px solid var(--border)';
      if (i < round) { bg = 'rgba(34,197,94,0.15)'; color = 'var(--accent-green)'; border = '1px solid var(--accent-green)'; }
      else if (i === round) { bg = 'rgba(245,158,11,0.15)'; color = 'var(--accent-gold)'; border = '2px solid var(--accent-gold)'; }
      indicator.style = `padding:6px 14px; border-radius:6px; font-size:13px; font-weight:bold; background:${bg}; color:${color}; border:${border};`;
      indicator.textContent = TA_ROUND_NAMES[i];
      roundDisplay.appendChild(indicator);
    }
  }
  
  // Match title
  const matchTitle = document.getElementById('ta-match-title');
  if (matchTitle) matchTitle.textContent = `第${round + 1}戦：${TA_ROUND_NAMES[round]}`;
  
  // Reset bout state
  taState.boutIndex = 0;
  taState.boutMyWins = 0;
  taState.boutEnemyWins = 0;
  
  // My team preview (detailed - same format as enemy)
  const myPreview = document.getElementById('ta-my-team-preview');
  if (myPreview) {
    myPreview.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const m = activeLab[taState.myTeam[i]];
      if (!m) continue;
      
      // スキル名の解決
      const mySkillsText = [];
      if (m.skills && m.skills.active) {
        m.skills.active.forEach(sid => {
          if (sid && sid !== 'none' && SKILLS[sid]) mySkillsText.push(SKILLS[sid].icon + SKILLS[sid].name);
        });
      }
      if (m.skills && m.skills.passive) {
        m.skills.passive.forEach(sid => {
          if (sid && sid !== 'none' && SKILLS[sid]) mySkillsText.push(SKILLS[sid].icon + SKILLS[sid].name);
        });
      }
      const mySkillStr = mySkillsText.length > 0 ? mySkillsText.join(' / ') : 'なし';
      
      // アイコンの取得
      let mIcon = '';
      const typeKeys = Object.keys(MONSTER_TYPES);
      for (const tk of typeKeys) {
        if (MONSTER_TYPES[tk].label === m.systemType) { mIcon = MONSTER_TYPES[tk].icon; break; }
      }

      const div = document.createElement('div');
      div.style = 'padding:6px 10px; border-radius:6px; background:rgba(0,100,255,0.08); border: 1px solid rgba(0,100,255,0.15); margin-bottom: 6px; line-height: 1.4; text-align: left;';
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
          <span style="color:var(--accent-gold); font-weight:bold;">${TA_SLOT_LABELS[i]}</span>
          <span style="color:#fff; font-weight: bold;">${mIcon} ${m.name}</span>
        </div>
        <div style="font-size:11px; color:var(--text-dim); margin-top: 2px;">
          HP:${m.stats.hp} A:${m.stats.attack} D:${m.stats.defense} S:${m.stats.speed} L:${m.stats.luck}
        </div>
        <div style="font-size:11px; color:var(--accent-cyan); margin-top: 2px; font-weight: bold;">
          ⚡ スキル: ${mySkillStr}
        </div>
      `;
      myPreview.appendChild(div);
    }
  }
  
  // Enemy team preview
  const enemyPreview = document.getElementById('ta-enemy-team-preview');
  const enemyTeam = taState.enemyTeams[round];
  if (enemyPreview && enemyTeam) {
    enemyPreview.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const e = enemyTeam[i];
      
      const skillsText = [];
      if (e.skills.active[0] && e.skills.active[0] !== 'none') {
        const sk = SKILLS[e.skills.active[0]];
        if (sk) skillsText.push(sk.icon + sk.name);
      }
      if (e.skills.passive[0] && e.skills.passive[0] !== 'none') {
        const sk = SKILLS[e.skills.passive[0]];
        if (sk) skillsText.push(sk.icon + sk.name);
      }
      const skillStr = skillsText.length > 0 ? skillsText.join(' / ') : 'なし';

      const div = document.createElement('div');
      div.style = 'padding:6px 10px; border-radius:6px; background:rgba(255,0,0,0.08); border: 1px solid rgba(255,0,0,0.15); margin-bottom: 6px; line-height: 1.4; text-align: left;';
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
          <span style="color:var(--accent-gold); font-weight:bold;">${TA_SLOT_LABELS[i]}</span>
          <span style="color:#fff; font-weight: bold;">${e.icon} ${e.name}</span>
        </div>
        <div style="font-size:11px; color:var(--text-dim); margin-top: 2px;">
          HP:${e.stats.hp} A:${e.stats.attack} D:${e.stats.defense} S:${e.stats.speed} L:${e.stats.luck}
        </div>
        <div style="font-size:11px; color:var(--accent-cyan); margin-top: 2px; font-weight: bold;">
          ⚡ スキル: ${skillStr}
        </div>
      `;
      enemyPreview.appendChild(div);
    }
  }
  
  // Score
  const scoreMyEl = document.getElementById('ta-score-my');
  const scoreEnemyEl = document.getElementById('ta-score-enemy');
  if (scoreMyEl) scoreMyEl.textContent = '0';
  if (scoreEnemyEl) scoreEnemyEl.textContent = '0';
  
  // Battle order
  const orderEl = document.getElementById('ta-battle-order');
  if (orderEl) orderEl.textContent = `次の対戦：【${TA_BOUT_NAMES[0]}】`;
  
  // Button
  const btn = document.getElementById('ta-next-battle-btn');
  if (btn) {
    btn.textContent = '⚔️ 先鋒戦 開始！';
    btn.disabled = false;
    btn.onclick = () => taStartNextBout();
  }
  
  goScreen('ta-progress');
}

// ---- Start Next Bout (1v1 Battle) ----
function taStartNextBout() {
  // ★ 武舞台はストーリー用編成を強制参照
  currentLabMode = 'story';
  const activeLab = getActiveLab();
  const round = taState.round;
  const bout = taState.boutIndex;
  
  // Set game mode
  currentGameMode = 'team-arena';
  
  // Set my monster for this bout
  const myMonsterIdx = taState.myTeam[bout];
  selBattle = myMonsterIdx;
  
  // Set enemy for this bout
  const enemyData = taState.enemyTeams[round][bout];
  
  // 装備するスキルの決定（アクティブ・パッシブから選定）
  let chosenSkill = 'none';
  if (enemyData.skills.active[0] && enemyData.skills.active[0] !== 'none') {
    chosenSkill = enemyData.skills.active[0];
  } else if (enemyData.skills.passive[0] && enemyData.skills.passive[0] !== 'none') {
    chosenSkill = enemyData.skills.passive[0];
  }
  // 両方持っている場合は50%の確率でどちらかを選択
  if (enemyData.skills.active[0] && enemyData.skills.active[0] !== 'none' &&
      enemyData.skills.passive[0] && enemyData.skills.passive[0] !== 'none') {
    chosenSkill = Math.random() < 0.5 ? enemyData.skills.active[0] : enemyData.skills.passive[0];
  }

  const skObj = SKILLS[chosenSkill] || SKILLS.none;

  currentEnemy = {
    name: enemyData.name,
    title: `${TA_ROUND_NAMES[round]} - ${TA_BOUT_NAMES[bout]}`,
    icon: enemyData.icon,
    rumor: `武舞台${TA_ROUND_NAMES[round]}の${TA_BOUT_NAMES[bout]}！ 装備スキル：${skObj.icon}${skObj.name}`,
    hp: enemyData.stats.hp,
    attack: enemyData.stats.attack,
    defense: enemyData.stats.defense,
    speed: enemyData.stats.speed,
    luck: enemyData.stats.luck,
    skill: chosenSkill,
    type: enemyData.type
  };
  
  // Update stage display
  const badge = document.getElementById('stage-display');
  if (badge) badge.textContent = `武舞台 ${TA_ROUND_NAMES[round]} - ${TA_BOUT_NAMES[bout]}`;
  
  goScreen('battle');
}

// ---- Handle Team Arena Battle Result (called from showResult) ----
function taHandleBoutResult(playerWon) {
  if (!taState) return;
  
  if (playerWon) {
    taState.boutMyWins++;
  } else {
    taState.boutEnemyWins++;
  }
  
  // Check if match is decided (best of 3 = first to 2 wins)
  if (taState.boutMyWins >= 2) {
    // Match won!
    taState.roundWins++;
    taState.round++;
    
    if (taState.round >= 5) {
      // Tournament champion!
      taEndTournament(true);
      return 'tournament-won';
    } else {
      return 'match-won';
    }
  } else if (taState.boutEnemyWins >= 2) {
    // Match lost - eliminated
    taState.eliminated = true;
    taEndTournament(false);
    return 'match-lost';
  } else {
    // Continue to next bout
    taState.boutIndex++;
    return 'bout-continue';
  }
}

function taShowBoutInterim() {
  const scoreMyEl = document.getElementById('ta-score-my');
  const scoreEnemyEl = document.getElementById('ta-score-enemy');
  if (scoreMyEl) scoreMyEl.textContent = String(taState.boutMyWins);
  if (scoreEnemyEl) scoreEnemyEl.textContent = String(taState.boutEnemyWins);
  
  const orderEl = document.getElementById('ta-battle-order');
  if (orderEl) orderEl.textContent = `次の対戦：【${TA_BOUT_NAMES[taState.boutIndex]}】`;
  
  const matchTitle = document.getElementById('ta-match-title');
  if (matchTitle) matchTitle.textContent = `第${taState.round + 1}戦：${TA_ROUND_NAMES[taState.round]}`;
  
  const btn = document.getElementById('ta-next-battle-btn');
  if (btn) {
    btn.textContent = `⚔️ ${TA_BOUT_NAMES[taState.boutIndex]} 開始！`;
    btn.disabled = false;
    btn.onclick = () => taStartNextBout();
  }
  
  goScreen('ta-progress');
}

function taEndTournament(isChampion) {
  const rankBp = TA_RANK_REWARDS[taState.roundWins] || 0;
  const partBp = TA_PARTICIPATION_REWARD;
  const totalEarned = rankBp + partBp;
  
  bp += totalEarned;
  save();
  
  // 成績テキストの組み立て
  let rankText = '';
  if (isChampion) {
    rankText = '優勝（5勝0敗）';
  } else {
    const wins = taState.roundWins;
    if (wins === 4) {
      rankText = '準優勝（4勝1敗）';
    } else if (wins === 3) {
      rankText = '3位（3勝1敗）';
    } else {
      const matchName = TA_ROUND_NAMES[taState.round] || `${taState.round + 1}回戦`;
      rankText = `${matchName}敗退（${wins}勝1敗）`;
    }
  }

  // モーダルのDOMを更新
  const rankTextEl = document.getElementById('ta-res-rank-text');
  const rankBpEl = document.getElementById('ta-res-rank-bp');
  const partBpEl = document.getElementById('ta-res-part-bp');
  const totalBpEl = document.getElementById('ta-res-total-bp');
  const currentBpEl = document.getElementById('ta-res-current-bp');
  
  if (rankTextEl) rankTextEl.textContent = rankText;
  if (rankBpEl) rankBpEl.textContent = `${rankBp} BP`;
  if (partBpEl) partBpEl.textContent = `${partBp} BP`;
  if (totalBpEl) totalBpEl.textContent = `${totalEarned} BP`;
  if (currentBpEl) currentBpEl.textContent = String(bp);
  
  // 既存の結果モーダル（1vs1の最後のバトルのやつ）が開いている場合は非表示にする
  const battleResultModal = document.getElementById('battle-result-modal');
  if (battleResultModal) battleResultModal.style.display = 'none';
  
  // 団体戦リザルトモーダルを表示
  const taResultModal = document.getElementById('ta-result-modal');
  if (taResultModal) taResultModal.style.display = 'flex';
}

function closeTaResultModal() {
  const modal = document.getElementById('ta-result-modal');
  if (modal) modal.style.display = 'none';
  taState = null;
  currentGameMode = 'league'; // reset
  goScreen('team-arena-menu');
  openTeamArenaMenu();
}


function openRewardShop() {
  renderRewardShop();
  goScreen('reward-shop');
}



// ============================================================
//  DEBUG MODE
// ============================================================

let debugMode = false;
let debugBackup = null; // stores original state before debug ON

function toggleDebugMode() {
  debugMode = !debugMode;
  const btn = document.getElementById('debug-toggle-btn');
  
  if (debugMode) {
    // Update button style
    if (btn) {
      btn.textContent = '🛠️ デバッグ: ON';
      btn.style.background = 'linear-gradient(135deg, #e63946, #fca311)';
      btn.style.color = '#fff';
      btn.style.borderColor = '#fca311';
      btn.style.boxShadow = '0 0 12px rgba(252,163,17,0.5)';
    }
    bp = 9999;
    alert('🛠️ デバッグモード ON\n\n・全施設・全モードのロック解除\n・全スキル解放状態として調合可能\n・BP 9999状態でショップ購入可能\n・全シリーズ解放状態で調合可能');
  } else {
    // Reset button style
    if (btn) {
      btn.textContent = '🛠️ デバッグ: OFF';
      btn.style.background = 'rgba(0,0,0,0.3)';
      btn.style.color = '#94a3b8';
      btn.style.borderColor = 'rgba(255,255,255,0.15)';
      btn.style.boxShadow = 'none';
    }
    
    alert('🛠️ デバッグモード OFF\n\n通常のゲーム進行状況に復元しました。');
  }
  
  // Refresh UI based on the new debug mode flag state
  updateMenuFacilities();
  updateSkillProgressUI();
  
  if (document.getElementById('lab-screen').style.display !== 'none') {
    renderLabGrid();
    updateLabStatsDisplay();
  }
  if (document.getElementById('reward-shop-screen').style.display !== 'none') {
    renderRewardShop();
  }
  
  // Immediately save the clean, unaltered state just to sync
  save();
}

// ============================================================
//  BOOT
// ============================================================

function updateGameScale() {
  const vp = document.getElementById('game-viewport');
  if (!vp) return;
  const baseW = 1280;
  const baseH = 720;
  const winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
  // アスペクト比を維持して画面内に収めるスケール値を計算
  const scale = Math.min(winW / baseW, winH / baseH);
  vp.style.transformOrigin = 'center center';
  vp.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', updateGameScale);
window.addEventListener('orientationchange', updateGameScale);
window.addEventListener('load', updateGameScale);


// ============================================================
//  FACILITY GUIDE & HELP SYSTEM
// ============================================================
const FACILITY_HELP_DATA = {
  lab: {
    title: '🔬 モンスター研究所（ラボ）',
    icon: '🔬',
    text: '【モンスター研究所の役割】\n・所持スキルと100ポイントの割り振りを行い、独自のモンスターを調合・作成できます。\n・「ストーリー用」と「フリー対戦用」のモンスターは別々に保存されます。'
  },
  league: {
    title: '🏆 コロシアム（リーグ戦）',
    icon: '🏆',
    text: '【コロシアム（リーグ戦）の役割】\n・最強の研究者を目指すメインストーリーモードです。\n・CPUトレーナー達と1vs1のバトルを行い、勝利することでリーグ制覇を目指します。\n・勝利時の報酬「秘伝の書」から新たなスキルを獲得し、解放できます。'
  },
  tower: {
    title: '🗼 試練のタワー',
    icon: '🗼',
    text: '【試練のタワーの役割】\n・自軍の限界に挑む「サバイバル勝ち抜き戦」です。\n・連勝するごとに敵の強さが増していきます。\n・どこまで何連勝の記録を伸ばせるか挑戦するやり込みモードです。'
  },
  'team-arena': {
    title: '🛡️ 武舞台（団体戦）',
    icon: '🛡️',
    text: '【武舞台（団体戦）の役割】\n・3対3のチームバトルで勝ち越し数を競う団体戦です。\n・「先鋒戦」「中堅戦」「大将戦」を行い、先に2勝したチームが勝利となります。\n・勝利してBPを獲得し、限定モンスターなどを解放しましょう！'
  },
  free: {
    title: '🌀 異次元の祠（フリー対戦）',
    icon: '🌀',
    text: '【異次元の祠（フリー対戦）の役割】\n・他のプレイヤーまたは練習用Botとリアルタイムに対戦できます。\n・すべてのスキルが解放されたフラットな環境で構築の強さを競います。\n・「シングルス(1vs1)」または「チームス(3vs3団体戦)」が遊べます。'
  }
};

let shownFacilityHelps = {};
try {
  const saved = localStorage.getItem('100pt_shown_helps');
  if (saved) shownFacilityHelps = JSON.parse(saved);
} catch(e) {}

function showHelp(facility) {
  const data = FACILITY_HELP_DATA[facility];
  if (!data) return;
  
  document.getElementById('help-icon').textContent = data.icon;
  document.getElementById('help-title').textContent = data.title;
  document.getElementById('help-text').textContent = data.text;
  document.getElementById('facility-help-overlay').style.display = 'flex';
}

function closeHelp() {
  document.getElementById('facility-help-overlay').style.display = 'none';
}

function triggerFirstTimeHelp(facility) {
  if (!shownFacilityHelps[facility]) {
    shownFacilityHelps[facility] = true;
    try {
      localStorage.setItem('100pt_shown_helps', JSON.stringify(shownFacilityHelps));
    } catch(e) {}
    setTimeout(() => {
      showHelp(facility);
    }, 400);
  }
}

// OP画面タップ時のイベント登録＆スタートテキスト点滅補助
document.addEventListener('DOMContentLoaded', () => {
  const opScreen = document.getElementById('op-screen');
  const opStartText = document.getElementById('op-start-text');

  // JSによる点滅タイマー（CSSアニメーションがブラウザで無効化される場合への対策）
  let blinkTimer = null;
  if (opStartText) {
    let opacity = 1;
    let fadeOut = true;
    blinkTimer = setInterval(() => {
      if (fadeOut) {
        opacity -= 0.08;
        if (opacity <= 0.15) { opacity = 0.15; fadeOut = false; }
      } else {
        opacity += 0.08;
        if (opacity >= 1.0) { opacity = 1.0; fadeOut = true; }
      }
      opStartText.style.opacity = opacity.toFixed(2);
    }, 60);
  }
  
  if (opScreen) {
    opScreen.addEventListener('click', () => {
      if (blinkTimer) clearInterval(blinkTimer);
      // 1. ブラウザの音声自動再生制限を解除するためにBGM再生
      if (window.bgmManager) {
        window.bgmManager.play('title', true); // OP BGM1.mp3 再生
      }

      // 2. OP画面をフェードアウトして非表示化
      opScreen.style.transition = 'opacity 0.6s ease';
      opScreen.style.opacity = '0';
      
      setTimeout(() => {
        opScreen.style.display = 'none';
        
        // 3. タイトル／セーブデータ選択画面を表示
        if (typeof showTitleOrSaveSelectScene === 'function') {
          showTitleOrSaveSelectScene();
        } else {
          const titleScene = document.getElementById('title-scene') || document.getElementById('save-select-modal');
          if (titleScene) titleScene.style.display = 'flex';
          goScreen('title');
          renderTitleSaveSlots();
        }
      }, 600);
    }, { once: true }); // 1回タップで確定
  }
});

function init() {
  updateGameScale();
  // 初期読み込み時、すべてのモーダルを強制閉去
  if (typeof closeMonsterSelectModal === 'function') closeMonsterSelectModal();
  if (typeof closeLabDetailModal === 'function') closeLabDetailModal();
  if (typeof closeLabItemModal === 'function') closeLabItemModal();
  document.querySelectorAll('#monster-select-modal, #lab-item-modal, #lab-detail-modal, #facility-help-overlay, #save-slot-overlay').forEach(m => m.style.display = 'none');
  
  migrateOldSaveDataIfNeeded();
  // 起動時は常にタイトル・セーブ選択画面を表示（データはまだロードしない）
  renderTitleSaveSlots();
  goScreen('title');
}

// タイトル画面のセーブスロットカードを描画
function renderTitleSaveSlots() {
  const container = document.getElementById('title-save-slot-list');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 1; i <= 3; i++) {
    const data = getSlotData(i);
    const card = document.createElement('div');
    card.className = 'title-save-card' + (data ? '' : ' empty-slot');

    if (data && data.playerName) {
      const unlockedCount = Array.isArray(data.unlockedSkills) ? data.unlockedSkills.length : 0;
      const pct = Math.floor((unlockedCount / 30) * 100);
      const wins = (data.record && data.record.win) || 0;
      const loses = (data.record && data.record.lose) || 0;
      const stageStr = typeof data.stageIndex === 'number' ? (data.stageIndex + 1) : 1;

      card.innerHTML = `
        <div style="flex:1; min-width:0;">
          <div class="slot-label">SLOT ${i}</div>
          <div class="slot-player-name">${data.playerName}</div>
          <div class="slot-detail">⚔️ STAGE ${stageStr}　📜 スキル: ${unlockedCount}/30 (${pct}%)　🏆 ${wins}勝 ${loses}敗</div>
          <div class="slot-detail">最終保存: ${data.updatedAt || '不明'}</div>
        </div>
        <div class="slot-right">
          <div class="slot-badge-continue">▶ つづきから</div>
          <button class="slot-delete-btn" onclick="event.stopPropagation(); deleteTitleSlot(${i})">🗑️ 削除</button>
        </div>
      `;
      card.onclick = (e) => { e.stopPropagation(); selectTitleSlot(i, false); };
    } else {
      card.innerHTML = `
        <div style="flex:1;">
          <div class="slot-label">SLOT ${i}</div>
          <div style="font-size:14px; color:var(--text-dim);">— 空きスロット —</div>
        </div>
        <div class="slot-right">
          <div class="slot-badge-new">＋ はじめから</div>
        </div>
      `;
      card.onclick = (e) => { e.stopPropagation(); selectTitleSlot(i, true); };
    }
    container.appendChild(card);
  }
}

// タイトル画面からスロットを選択して開始
function selectTitleSlot(slotId, isNew) {
  if (isNew) {
    // 新規ゲーム開始
    startNewGameInSlot(slotId);
  } else {
    // 既存データをロードしてメインメニューへ
    loadSlot(slotId);
    prepareStage();
    updateRecord();
    goScreen('main-menu');
  }
}

// タイトル画面からスロット削除
async function deleteTitleSlot(slotId) {
  const result = await showConfirmModal(`SLOT ${slotId} のセーブデータを本当に削除しますか？\n(削除されたデータは二度と復元できません)`);
  if (result) {
    deleteSlotData(slotId);
    renderTitleSaveSlots();
  }
}

// ============================================================
//  P2P FREE BATTLE SYSTEM (PeerJS WebRTC)
// ============================================================

let p2pSelectedMonsters = []; // indices of selected monsters in labMonstersFree
let p2pPeer = null;
let p2pIsBotActive = false;
let p2pOppMonsters = [];
let p2pBoutState = null;
let p2pMatchingTimeoutTimer = null;
let p2pBotName = '';
let p2pBotRecord = '';

const BOT_NAMES = [
  'ゆうた', 'たくみ', 'ハルト', 'ソウタ', 'あおい', 'さくら',
  'Ken', 'Alex', 'David', 'ショウ', 'レン', 'マサト', 'ユウキ',
  'ひまり', 'ユア', 'つむぎ', 'みお', 'コウキ', 'ダイキ', 'リョウ',
  'カイと', 'アサト', 'ユウト', 'エリカ', 'ミウ', 'カノン', 'マイ'
];
const BOT_TITLES = [
  '新進気鋭の研究者', '闘技場の常連', 'ビルドバトラー', '流浪のトレーナー',
  'スキルマスター', 'タクティシャン', 'ブリーダー', '放浪の勝負師',
  'リーグAランカー', '異次元の求道者', '100pt愛好家'
];

function generateBotMonster() {
  const mTypes = Object.keys(MONSTER_TYPES).filter(k => !MONSTER_TYPES[k].hidden);
  const pickedType = mTypes[Math.floor(Math.random() * mTypes.length)];
  const typeInfo = MONSTER_TYPES[pickedType];
  const monsterClass = typeInfo.names[Math.floor(Math.random() * typeInfo.names.length)] || 'スライム';
  
  let hp = 1, attack = 1, defense = 1, speed = 1, luck = 1;
  let remaining = 98;
  const stats = [
    { name: 'hp', val: 1 },
    { name: 'attack', val: 1 },
    { name: 'defense', val: 1 },
    { name: 'speed', val: 1 },
    { name: 'luck', val: 1 }
  ];
  while (remaining > 0) {
    const pick = stats[Math.floor(Math.random() * stats.length)];
    if (pick.val < 99) {
      pick.val++;
      remaining--;
    }
  }
  
  const skillPool = Object.keys(SKILLS).filter(s => s !== 'none');
  const activeSkills = skillPool.filter(s => SKILLS[s].type === 'アクティブ');
  const passiveSkills = skillPool.filter(s => SKILLS[s].type === 'パッシブ');
  
  const activePick = activeSkills[Math.floor(Math.random() * activeSkills.length)] || 'none';
  const passivePick = passiveSkills[Math.floor(Math.random() * passiveSkills.length)] || 'none';

  return {
    name: monsterClass,
    systemType: typeInfo.label,
    monsterClass: monsterClass,
    stats: {
      hp: stats.find(s => s.name === 'hp').val,
      attack: stats.find(s => s.name === 'attack').val,
      defense: stats.find(s => s.name === 'defense').val,
      speed: stats.find(s => s.name === 'speed').val,
      luck: stats.find(s => s.name === 'luck').val,
    },
    skills: {
      active: [activePick],
      passive: [passivePick]
    }
  };
}

function triggerP2PBotMatch() {
  console.log('P2P Matchmaking timeout - switching to Bot match.');
  // P2P通信側をクリーンアップ
  destroyP2P();
  
  p2pIsBotActive = true;
  p2pIsHost = true; // Bot対戦時は自身をホスト扱いにする
  
  const delay = Math.random() * 3000; // 0〜3秒の追加のランダムウェイト
  setP2PStatus('ランダムマッチ検索中...', '対戦相手を確定中...');
  
  setTimeout(() => {
    if (!p2pIsBotActive) return;
    
    // Botプロフィール作成
    p2pBotName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    const title = BOT_TITLES[Math.floor(Math.random() * BOT_TITLES.length)];
    const win = 10 + Math.floor(Math.random() * 150);
    const lose = Math.max(10, win - 20 + Math.floor(Math.random() * 40));
    p2pBotRecord = `${title} (戦績: ${win}勝 ${lose}敗)`;
    
    if (p2pFormat === 'team') {
      p2pOppMonsters = [generateBotMonster(), generateBotMonster(), generateBotMonster()];
      p2pOppMonster = p2pOppMonsters[0];
    } else {
      p2pOppMonster = generateBotMonster();
      p2pOppMonsters = [p2pOppMonster];
    }
    
    // UIを接続確立状態へ移行
    setP2PStatus('接続確立！', 'モンスター情報を同期中...');
    setTimeout(() => {
      if (!p2pIsBotActive) return;
      showP2PStep(5);
      p2pMyReady = false;
      p2pOppReady = false;
      updateP2PReadyUI();
      
      const nameEl = document.getElementById('p2p-my-monster-name');
      const myIcon = document.getElementById('p2p-my-monster-preview');
      const activeLab = labMonstersFree;
      if (p2pFormat === 'team') {
        const myTeamData = p2pSelectedMonsters.map(idx => activeLab[idx]).filter(Boolean);
        if (nameEl) nameEl.textContent = myTeamData.map(m => m.name).join(' / ');
        if (myIcon) myIcon.innerHTML = myTeamData.map(m => getMonsterVisualHTML(m.monsterClass, m.systemType, '35px')).join('');
      } else {
        const myMonsterIdx = p2pSelectedMonsters[0] !== undefined ? p2pSelectedMonsters[0] : 0;
        const myMonster = activeLab[myMonsterIdx] || activeLab[0];
        if (myMonster && nameEl) nameEl.textContent = myMonster.name || 'モンスター';
        if (myMonster && myIcon) myIcon.innerHTML = getMonsterVisualHTML(myMonster.monsterClass, myMonster.systemType, '70px');
      }
      
      const oppName = document.getElementById('p2p-opp-monster-name');
      if (oppName) {
        oppName.textContent = p2pFormat === 'team'
          ? p2pOppMonsters.map(m => m.name).join(' / ')
          : (p2pOppMonster.name || '???');
      }
      const oppIcon = document.getElementById('p2p-opp-monster-preview');
      if (oppIcon) {
        if (p2pFormat === 'team') {
          oppIcon.innerHTML = p2pOppMonsters.map(m => getMonsterVisualHTML(m.monsterClass, m.systemType, '35px')).join('');
        } else if (p2pOppMonster) {
          oppIcon.innerHTML = getMonsterVisualHTML(p2pOppMonster.monsterClass, p2pOppMonster.systemType, '70px');
        }
      }
      
      // Botは1〜2.5秒後に準備完了にする
      setTimeout(() => {
        if (p2pIsBotActive) {
          p2pOppReady = true;
          updateP2PReadyUI();
          checkBothReady();
        }
      }, 1000 + Math.random() * 1500);
    }, 1000);
  }, delay);
}
let p2pConn = null;
let p2pFormat = 'single'; // 'single' or 'team'
let p2pIsHost = false;
let p2pMyReady = false;
let p2pOppReady = false;
let p2pOppMonster = null;
let p2pRoomCode = '';
let p2pBattleSeed = 0;
let p2pWaitingForCommand = false;
let p2pMyCommand = null;
let p2pOppCommand = null;
const P2P_PREFIX = '100pt-rpg-';

function showP2PStep(step) {
  // Hide all panels
  ['p2p-step-1', 'p2p-step-2-monster', 'p2p-step-3-room', 'p2p-step-3', 'p2p-step-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Show target panel
  let targetId = 'p2p-step-1';
  if (step === 1) targetId = 'p2p-step-1';
  else if (step === 2) targetId = 'p2p-step-2-monster';
  else if (step === 3) targetId = 'p2p-step-3-room';
  else if (step === 4) targetId = 'p2p-step-3'; // waiting matchmaking
  else if (step === 5) targetId = 'p2p-step-4'; // ready sync

  const targetEl = document.getElementById(targetId);
  if (targetEl) targetEl.style.display = 'block';

  // Update Progress Indicator
  ['p2p-prog-1', 'p2p-prog-2', 'p2p-prog-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.className = 'p2p-progress-step';
  });

  if (step === 1) {
    document.getElementById('p2p-prog-1').classList.add('active');
  } else if (step === 2) {
    document.getElementById('p2p-prog-1').classList.add('completed');
    document.getElementById('p2p-prog-2').classList.add('active');
  } else if (step >= 3) {
    document.getElementById('p2p-prog-1').classList.add('completed');
    document.getElementById('p2p-prog-2').classList.add('completed');
    document.getElementById('p2p-prog-3').classList.add('active');
  }
}

function selectP2PFormat(fmt) {
  p2pFormat = fmt;
  const label = fmt === 'single' ? 'シングルス (1vs1)' : 'チームス (3vs3)';
  const el = document.getElementById('p2p-selected-format-text');
  if (el) el.textContent = label;
  const mLabel = document.getElementById('p2p-monster-format-text');
  if (mLabel) mLabel.textContent = label;
  
  // Reset selected monsters
  p2pSelectedMonsters = [];
  
  // Go to step 2 (Monster selection)
  goP2PStep2Monster();
}

function goP2PStep2Monster() {
  showP2PStep(2);
  renderP2PMonsterSelection();
}

function renderP2PMonsterSelection() {
  const container = document.getElementById('p2p-monster-select-list');
  const nextBtn = document.getElementById('p2p-monster-select-next-btn');
  const hintEl = document.getElementById('p2p-monster-select-hint');
  
  if (!container) return;
  container.innerHTML = '';
  
  // Load free battle lab monsters
  const list = labMonstersFree;
  
  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: span 2; font-size:13px; color:var(--accent-gold); padding:20px 0; text-align:center;">
      フリー対戦用のモンスターが登録されていません。<br>
      ラボの「フリーバトル用ラボ」で作成してください。
    </div>`;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }
  
  if (p2pFormat === 'team' && list.length < 3) {
    container.innerHTML = `<div style="grid-column: span 2; font-size:13px; color:var(--accent-gold); padding:20px 0; text-align:center;">
      チーム戦（3vs3）にはモンスターが最低3体必要です。<br>
      フリーバトル用ラボで追加作成してください。<br>
      (現在: ${list.length}体)
    </div>`;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  if (p2pFormat === 'single') {
    if (hintEl) hintEl.textContent = '対戦に出す代表モンスターを 1体 選択してください。';
  } else {
    if (hintEl) hintEl.textContent = '対戦に出すメンバーを 3体 選択してください。';
  }

  list.forEach((m, idx) => {
    const card = document.createElement('div');
    card.className = 'p2p-monster-select-card';
    if (p2pSelectedMonsters.includes(idx)) {
      card.classList.add('selected');
    }
    
    // Visual HTML
    const visualHTML = getMonsterVisualHTML(m.monsterClass, m.systemType, '55px');
    
    const activeSk = (m.skills && m.skills.active && m.skills.active[0]) || 'none';
    const passiveSk = (m.skills && m.skills.passive && m.skills.passive[0]) || 'none';
    const activeName = SKILLS[activeSk] ? SKILLS[activeSk].name : 'なし';
    const passiveName = SKILLS[passiveSk] ? SKILLS[passiveSk].name : 'なし';

    // Show selection badge (with number if team mode)
    let badgeText = '選択中';
    if (p2pFormat === 'team') {
      const orderIdx = p2pSelectedMonsters.indexOf(idx);
      if (orderIdx !== -1) {
        badgeText = '#' + (orderIdx + 1);
      }
    }

    card.innerHTML = `
      <div class="select-badge">${badgeText}</div>
      <div style="height:55px; display:flex; align-items:center; justify-content:center; margin-bottom:4px;">${visualHTML}</div>
      <div style="font-weight:bold; font-size:13px; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${m.name}</div>
      <div style="font-size:10px; color:var(--text-dim); margin-top:2px;">${m.monsterClass}</div>
      <div style="font-size:10px; color:var(--accent-gold); margin-top:4px;">${activeName} / ${passiveName}</div>
    `;
    
    card.onclick = () => {
      if (p2pFormat === 'single') {
        p2pSelectedMonsters = [idx];
      } else {
        const existIdx = p2pSelectedMonsters.indexOf(idx);
        if (existIdx !== -1) {
          p2pSelectedMonsters.splice(existIdx, 1);
        } else {
          if (p2pSelectedMonsters.length < 3) {
            p2pSelectedMonsters.push(idx);
          } else {
            alert('チームメンバーは最大3体まで選択可能です。');
            return;
          }
        }
      }
      renderP2PMonsterSelection();
      updateP2PMonsterNextBtn();
    };
    
    container.appendChild(card);
  });
  
  updateP2PMonsterNextBtn();
}

function updateP2PMonsterNextBtn() {
  const nextBtn = document.getElementById('p2p-monster-select-next-btn');
  if (!nextBtn) return;
  
  const req = p2pFormat === 'single' ? 1 : 3;
  const isOk = p2pSelectedMonsters.length === req;
  
  nextBtn.disabled = !isOk;
}

function validateP2PMonsterSelection() {
  const req = p2pFormat === 'single' ? 1 : 3;
  if (!p2pSelectedMonsters || p2pSelectedMonsters.length !== req) {
    alert(`出撃モンスターが正しく選択されていません。\n${p2pFormat === 'single' ? '1体' : '3体'}選択してください。`);
    goP2PStep2Monster();
    return false;
  }
  return true;
}

function goP2PStep3Room() {
  if (!validateP2PMonsterSelection()) return;
  showP2PStep(3);
}


function backToP2PStep1() {
  destroyP2P();
  showP2PStep(1);
}

function exitP2PLobby() {
  destroyP2P();
  goScreen('main-menu');
}

function generateRoomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function destroyP2P() {
  if (p2pConn) { try { p2pConn.close(); } catch(e){} p2pConn = null; }
  if (p2pPeer) { try { p2pPeer.destroy(); } catch(e){} p2pPeer = null; }
  if (p2pMatchingTimeoutTimer) { clearTimeout(p2pMatchingTimeoutTimer); p2pMatchingTimeoutTimer = null; }
  p2pMyReady = false;
  p2pOppReady = false;
  p2pOppMonster = null;
  p2pMyCommand = null;
  p2pOppCommand = null;
  p2pWaitingForCommand = false;
  p2pIsBotActive = false;
}

function setP2PStatus(title, desc) {
  const t = document.getElementById('p2p-status-title');
  const d = document.getElementById('p2p-status-desc');
  if (t) t.textContent = title;
  if (d) d.textContent = desc;
}

// --- Create Private Room ---
function createP2PPrivateRoom() {
  if (!validateP2PMonsterSelection()) return;
  destroyP2P();
  p2pIsHost = true;
  p2pRoomCode = generateRoomCode();
  const peerId = P2P_PREFIX + p2pRoomCode;

  showP2PStep(4);
  setP2PStatus('部屋を作成中...', 'PeerID初期化中...');

  p2pPeer = new Peer(peerId);
  p2pPeer.on('open', (id) => {
    setP2PStatus('対戦相手の接続を待っています...', 'あいことばを相手に伝えてください');
    const box = document.getElementById('p2p-room-display-box');
    if (box) box.style.display = 'block';
    const idEl = document.getElementById('p2p-display-room-id');
    if (idEl) idEl.textContent = p2pRoomCode;
  });
  p2pPeer.on('connection', (conn) => {
    p2pConn = conn;
    setupP2PConnection();
  });
  p2pPeer.on('error', (err) => {
    setP2PStatus('接続エラー', err.type + ': ' + err.message);
  });
}

// --- Join Private Room ---
function joinP2PPrivateRoom() {
  const input = document.getElementById('p2p-room-code-input');
  const code = (input ? input.value : '').trim();
  if (!code || code.length < 4) {
    alert('あいことば（4〜6桁）を入力してください');
    return;
  }
  if (!validateP2PMonsterSelection()) return;
  destroyP2P();
  p2pIsHost = false;
  p2pRoomCode = code;
  const targetPeerId = P2P_PREFIX + code;

  showP2PStep(4);
  setP2PStatus('部屋に接続中...', 'あいことば: ' + code);
  document.getElementById('p2p-room-display-box').style.display = 'none';

  p2pPeer = new Peer();
  p2pPeer.on('open', () => {
    setP2PStatus('接続試行中...', 'Peer接続を確立中...');
    p2pConn = p2pPeer.connect(targetPeerId, { reliable: true });
    p2pConn.on('open', () => {
      setupP2PConnection();
    });
    p2pConn.on('error', (err) => {
      setP2PStatus('接続失敗', '部屋が見つかりません。あいことばを確認してください。');
    });
  });
  p2pPeer.on('error', (err) => {
    if (err.type === 'peer-unavailable') {
      setP2PStatus('部屋が見つかりません', 'あいことばが正しいか確認してください');
    } else {
      setP2PStatus('接続エラー', err.type);
    }
  });
}

// --- Random Match ---
function startP2PRandomMatch() {
  if (!validateP2PMonsterSelection()) return;
  destroyP2P();
  showP2PStep(4);
  document.getElementById('p2p-room-display-box').style.display = 'none';

  // 30秒後に対戦相手が見つからない場合は自動的にBot対戦へ移行
  p2pMatchingTimeoutTimer = setTimeout(() => {
    triggerP2PBotMatch();
  }, 30000);
  setP2PStatus('ランダムマッチ検索中...', '公開ルームを探しています...');

  // Try to connect to existing rooms (slots 1-20)
  const slotMax = 20;
  let slotTry = 0;
  let found = false;

  p2pPeer = new Peer();
  p2pPeer.on('open', () => {
    tryNextRandomSlot();
  });
  p2pPeer.on('error', (err) => {
    if (err.type === 'peer-unavailable' && !found) {
      slotTry++;
      tryNextRandomSlot();
    }
  });

  function tryNextRandomSlot() {
    if (found) return;
    if (!p2pPeer || p2pPeer.destroyed) return;
    if (slotTry >= slotMax) {
      // No room found → create one
      found = true;
      createRandomRoom();
      return;
    }
    const targetId = P2P_PREFIX + 'free-' + p2pFormat + '-' + slotTry;
    setP2PStatus('ランダムマッチ検索中...', 'ルーム #' + (slotTry + 1) + ' を確認中...');
    const conn = p2pPeer.connect(targetId, { reliable: true });
    const timeout = setTimeout(() => {
      if (!found) { slotTry++; tryNextRandomSlot(); }
    }, 2000);
    conn.on('open', () => {
      clearTimeout(timeout);
      if (!found) {
        found = true;
        p2pIsHost = false;
        p2pConn = conn;
        setupP2PConnection();
      }
    });
    conn.on('error', () => {
      clearTimeout(timeout);
      if (!found) { slotTry++; tryNextRandomSlot(); }
    });
  }

  function createRandomRoom() {
    // Find an available slot and host
    if (p2pPeer) { try { p2pPeer.destroy(); } catch(e){} }
    const slot = Math.floor(Math.random() * slotMax);
    const myId = P2P_PREFIX + 'free-' + p2pFormat + '-' + slot;
    p2pIsHost = true;
    p2pRoomCode = 'FREE-' + slot;

    p2pPeer = new Peer(myId);
    p2pPeer.on('open', () => {
      setP2PStatus('対戦相手を待機中...', 'フリールーム #' + (slot + 1) + ' で待機しています');
    });
    p2pPeer.on('connection', (conn) => {
      p2pConn = conn;
      setupP2PConnection();
    });
    p2pPeer.on('error', (err) => {
      setP2PStatus('ルーム作成エラー', err.type + ' - 再試行してください');
    });
  }
}

// --- P2P Connection Established ---
function setupP2PConnection() {
  if (p2pMatchingTimeoutTimer) { clearTimeout(p2pMatchingTimeoutTimer); p2pMatchingTimeoutTimer = null; }
  setP2PStatus('接続確立！', 'モンスター情報を同期中...');

  p2pConn.on('data', (data) => {
    handleP2PMessage(data);
  });
  p2pConn.on('close', () => {
    alert('対戦相手との接続が切断されました');
    destroyP2P();
    showP2PStep(3);
  });

  // Move to Step 5 (Ready screen)
  showP2PStep(5);
  p2pMyReady = false;
  p2pOppReady = false;
  updateP2PReadyUI();

  // Send my monster data
  const activeLab = labMonstersFree;
  const nameEl = document.getElementById('p2p-my-monster-name');
  const myIcon = document.getElementById('p2p-my-monster-preview');
  
  if (p2pFormat === 'team') {
    const myTeamData = p2pSelectedMonsters.map(idx => activeLab[idx]).filter(Boolean);
    if (nameEl) nameEl.textContent = myTeamData.map(m => m.name).join(' / ');
    if (myIcon) myIcon.innerHTML = myTeamData.map(m => getMonsterVisualHTML(m.monsterClass, m.systemType, '35px')).join('');
    p2pConn.send({ type: 'team-monsters', data: myTeamData });
  } else {
    const myMonsterIdx = p2pSelectedMonsters[0] !== undefined ? p2pSelectedMonsters[0] : 0;
    const myMonster = activeLab[myMonsterIdx] || activeLab[0];
    if (myMonster && nameEl) nameEl.textContent = myMonster.name || 'モンスター';
    if (myMonster && myIcon) myIcon.innerHTML = getMonsterVisualHTML(myMonster.monsterClass, myMonster.systemType, '70px');
    p2pConn.send({ type: 'monster', data: myMonster });
  }
}

function handleP2PMessage(msg) {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case 'monster':
      p2pOppMonster = msg.data;
      p2pOppMonsters = [msg.data];
      const oppName = document.getElementById('p2p-opp-monster-name');
      if (oppName) oppName.textContent = msg.data.name || '???';
      const oppIcon = document.getElementById('p2p-opp-monster-preview');
      if (oppIcon && msg.data) {
        oppIcon.innerHTML = getMonsterVisualHTML(msg.data.monsterClass, msg.data.systemType, '70px');
      }
      break;

    case 'team-monsters':
      p2pOppMonsters = msg.data;
      p2pOppMonster = msg.data[0];
      const oppTeamName = document.getElementById('p2p-opp-monster-name');
      if (oppTeamName) oppTeamName.textContent = msg.data.map(m => m.name).join(' / ');
      const oppTeamIcon = document.getElementById('p2p-opp-monster-preview');
      if (oppTeamIcon && Array.isArray(msg.data)) {
        oppTeamIcon.innerHTML = msg.data.map(m => getMonsterVisualHTML(m.monsterClass, m.systemType, '35px')).join('');
      }
      break;

    case 'ready':
      p2pOppReady = msg.value;
      updateP2PReadyUI();
      checkBothReady();
      break;

    case 'battle-command':
      p2pOppCommand = msg.command;
      if (p2pMyCommand !== null) {
        executeP2PBattleTurn();
      }
      break;

    case 'battle-seed':
      p2pBattleSeed = msg.seed;
      break;

    case 'rematch':
      alert('相手が再戦を希望しています！');
      break;
  }
}

function updateP2PReadyUI() {
  const myBtn = document.getElementById('p2p-my-ready-btn');
  if (myBtn) {
    myBtn.textContent = p2pMyReady ? '✅ 準備完了！' : '準備完了';
    myBtn.style.background = p2pMyReady ? 'var(--accent-green)' : '';
    myBtn.style.color = p2pMyReady ? '#000' : '';
  }
  const oppStatus = document.getElementById('p2p-opp-ready-status');
  if (oppStatus) {
    oppStatus.textContent = p2pOppReady ? '✅ 準備完了！' : '未準備';
    oppStatus.style.color = p2pOppReady ? 'var(--accent-green)' : 'var(--text-dim)';
    oppStatus.style.background = p2pOppReady ? 'rgba(16,185,129,0.1)' : 'rgba(0,0,0,0.2)';
  }
}

function toggleP2PMyReady() {
  p2pMyReady = !p2pMyReady;
  updateP2PReadyUI();
  if (p2pConn) {
    p2pConn.send({ type: 'ready', value: p2pMyReady });
  }
  checkBothReady();
}

function checkBothReady() {
  if (p2pMyReady && p2pOppReady) {
    // Both players ready → start P2P battle
    setTimeout(() => startP2PBattle(), 500);
  }
}

function startP2PBattle() {
  if (p2pFormat === 'team') {
    if (!p2pOppMonsters || p2pOppMonsters.length < 3) {
      alert('相手のチーム情報がまだ届いていません。少しお待ちください。');
      return;
    }
    p2pBoutState = {
      myTeam: [...p2pSelectedMonsters],
      oppTeam: [...p2pOppMonsters],
      boutIndex: 0,
      boutMyWins: 0,
      boutOppWins: 0
    };
    startP2PTeamBout(0);
  } else {
    if (!p2pOppMonster) {
      alert('相手のモンスター情報がまだ届いていません。少しお待ちください。');
      return;
    }
    p2pBoutState = null;
    currentLabMode = 'free';
    selBattle = p2pSelectedMonsters[0] !== undefined ? p2pSelectedMonsters[0] : 0;
    
    const opp = p2pOppMonster;
    const oppStats = opp.stats || { hp: 22, attack: 22, defense: 22, speed: 22, luck: 22 };
    const oppSkill = (opp.skills && opp.skills.active && opp.skills.active[0]) || 'none';
    currentEnemy = {
      name: p2pIsBotActive ? p2pBotName : (opp.name || '対戦相手'),
      monsterClass: opp.monsterClass || 'スライム',
      systemType: opp.systemType || 'ドラゴン系',
      type: Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === opp.systemType) || 'other',
      title: p2pIsBotActive ? p2pBotRecord : (opp.monsterClass || '対戦相手'),
      hp: Number(oppStats.hp) || 22,
      attack: Number(oppStats.attack) || 22,
      defense: Number(oppStats.defense) || 22,
      speed: Number(oppStats.speed) || 22,
      luck: Number(oppStats.luck) || 22,
      skill: oppSkill,
    };
    if (p2pIsHost) {
      p2pBattleSeed = Date.now();
      if (p2pConn) p2pConn.send({ type: 'battle-seed', seed: p2pBattleSeed });
    }
    currentGameMode = 'free';
    goScreen('battle');
  }
}

function startP2PTeamBout(boutIdx) {
  currentLabMode = 'free';
  const activeLab = labMonstersFree;
  selBattle = p2pBoutState.myTeam[boutIdx];
  const opp = p2pBoutState.oppTeam[boutIdx];
  const oppStats = opp.stats || { hp: 22, attack: 22, defense: 22, speed: 22, luck: 22 };
  const oppSkill = (opp.skills && opp.skills.active && opp.skills.active[0]) || 'none';
  const boutNames = ['先鋒戦', '中堅戦', '大将戦'];
  currentEnemy = {
    name: opp.name || '対戦相手',
    monsterClass: opp.monsterClass || 'スライム',
    systemType: opp.systemType || 'ドラゴン系',
    type: Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === opp.systemType) || 'other',
    title: 'フリー団体戦 - ' + boutNames[boutIdx],
    hp: Number(oppStats.hp) || 22,
    attack: Number(oppStats.attack) || 22,
    defense: Number(oppStats.defense) || 22,
    speed: Number(oppStats.speed) || 22,
    luck: Number(oppStats.luck) || 22,
    skill: oppSkill,
  };
  const badge = document.getElementById('stage-display');
  if (badge) badge.textContent = 'フリー団体戦 - ' + boutNames[boutIdx];
  if (p2pIsHost && p2pConn) {
    p2pBattleSeed = Date.now();
    p2pConn.send({ type: 'battle-seed', seed: p2pBattleSeed });
  }
  currentGameMode = 'free';
  goScreen('battle');
}

function cancelP2PMatchmaking() {
  destroyP2P();
  showP2PStep(3);
}

function disconnectP2P() {
  destroyP2P();
  showP2PStep(3);
}

function copyP2PRoomId() {
  const code = p2pRoomCode || '';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      alert('あいことば「' + code + '」をコピーしました！');
    });
  } else {
    alert('あいことば: ' + code);
  }
}

// --- P2P Battle Command Sync ---
function sendP2PCommand(cmd) {
  p2pMyCommand = cmd;
  
  if (p2pIsBotActive) {
    // 思考時間（1.5秒〜3.5秒のランダム遅延）を演出
    const thinkDelay = 1500 + Math.random() * 2000;
    
    // コマンドボタンを無効化し、相手の入力待ち演出をログに流す
    addLog('⌛ 相手がコマンドを選択しています...', 'log-info');
    
    setTimeout(() => {
      if (!p2pIsBotActive) return;
      p2pOppCommand = decideEnemyCommand();
      executeP2PBattleTurn();
    }, thinkDelay);
    
  } else {
    if (p2pConn) {
      p2pConn.send({ type: 'battle-command', command: cmd });
    }
    if (p2pOppCommand !== null) {
      executeP2PBattleTurn();
    }
  }
}

function executeP2PBattleTurn() {
  if (p2pMyCommand === null || p2pOppCommand === null) return;

  const myCmd = p2pMyCommand;
  const oppCmd = p2pOppCommand;
  p2pMyCommand = null;
  p2pOppCommand = null;

  // Use the existing battle engine with both commands
  const pSpd = getEffectiveSpeed(pState);
  const eSpd = getEffectiveSpeed(eState);
  let playerFirst = pSpd > eSpd || (pSpd === eSpd && pState.luck > eState.luck);

  executeTurnActions(myCmd, oppCmd, playerFirst);
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (err) {
    console.error('初期化エラー:', err);
  }
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
}
