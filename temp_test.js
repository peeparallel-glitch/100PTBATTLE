

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
  none: { name: '縺ｪ縺�', icon: '窶�', desc: '繧ｹ繧ｭ繝ｫ繧定｣�ｙ縺励↑縺��', type: '繝代ャ繧ｷ繝�', cat: '縺昴�莉�', badge: 'none', isInitial: true },
  
  // 縲仙�譛溯ｧ｣謾ｾ繧ｹ繧ｭ繝ｫ��16蛟具ｼ峨�
  shuriken: { name: '鬲泌鴨縺ｮ謇玖｣丞殴', icon: '�劇', desc: '閾ｪ霄ｫ縺ｮ謾ｻ謦�鴨縺ｮ75%逶ｸ蠖薙�螽∝鴨縺ｧ縲∫嶌謇九�髦ｲ蠕｡縺ｮ讒九∴繧貞ｮ悟�縺ｫ辟｡隕悶＠縺ｦ繝繧､繝ｬ繧ｯ繝医↓遯√″遶九※繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', isInitial: true },
  midare: { name: '縺ｿ縺�繧後≧縺｡', icon: '�昌', desc: '閾ｪ霄ｫ縺ｮ驕句多蜉帙↓蠢懊§縺溽｢ｺ邇�〒縲∫岼縺ｫ繧ら蕗縺ｾ繧峨〓2騾｣謦�ｒ郢ｰ繧雁�縺吶�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', isInitial: true },
  weakmaker: { name: '繧ｦ繧｣繝ｼ繧ｯ繝｡繝ｼ繧ｫ繝ｼ', icon: '�悼', desc: '逞帷ヨ縺ｪ荳謦�ｒ隕玖�縺�→蜷梧凾縺ｫ縲∫嶌謇九�譛繧らｧ縺ｧ縺溯�蜉帙ｒ謨ｰ繧ｿ繝ｼ繝ｳ縺ｮ髢灘炎縺手誠縺ｨ縺吶�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', isInitial: true },
  heal: { name: '繝偵�繝ｫ', icon: '�猪', desc: '讓呎ｺ也噪縺ｪ豐ｻ逋帝ｭ碑｡薙り�霄ｫ縺ｮ譛螟ｧ逕溷多蜉帙�30%繧貞屓蠕ｩ縺吶ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '蝗槫ｾｩ邉ｻ', badge: 'heal', isInitial: true },
  regen: { name: '繝ｪ繧ｸ繧ｧ繝阪Ξ繝ｼ繝�', icon: '�挑', desc: '3繧ｿ繝ｼ繝ｳ縺ｮ髢薙√ち繝ｼ繝ｳ髢句ｧ区凾縺ｫ閾ｪ霄ｫ縺ｮ譛螟ｧ逕溷多蜉帙�8%縺壹▽蜀咲函縺礼ｶ壹￠繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '蝗槫ｾｩ邉ｻ', badge: 'heal', isInitial: true },
  soulshare: { name: '繧ｽ繧ｦ繝ｫ繧ｷ繧ｧ繧｢', icon: '�ｧｪ', desc: '逶ｸ謇九�逕溷多蜉帙′蟾ｱ繧剃ｸ雁屓繧区凾縲√◎縺ｮ蝗�譫懊�邉ｸ繧呈焔郢ｰ繧雁ｯ�○縺ｦ逕溷多蜉帙ｒ10螂ｪ縺�叙繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '蝗槫ｾｩ邉ｻ', badge: 'heal', isInitial: true },
  teppeki: { name: '驩�｣√�讒九∴', icon: '�ｧｱ', desc: '謨ｰ繧ｿ繝ｼ繝ｳ縺ｮ髢薙∬ｺｫ讒九∴繧九％縺ｨ縺ｧ閾ｪ霄ｫ縺ｮ髦ｲ蠕｡閭ｽ蜉帙ｒ蛟榊刈縺輔○繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', isInitial: true },
  enmaku: { name: '辣吝ｹ�', icon: '�賢��', desc: '隕也阜繧帝�繧狗�繧貞ｷｻ縺肴淵繧峨＠縲∵焚繧ｿ繝ｼ繝ｳ縺ｮ髢薙∫嶌謇九�謾ｻ謦�ｄ閾ｴ蜻ｽ縺ｮ荳謦��蜻ｽ荳ｭ邇�ｒ蜊頑ｸ帙＆縺帙ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', isInitial: true },
  paperarmor: { name: '邏呵｣�抜縺ｮ蜻ｪ縺�', icon: '�糖', desc: '荳榊翠縺ｪ蜻ｪ險縲よ焚繧ｿ繝ｼ繝ｳ縺ｮ髢薙∫嶌謇九�霄ｫ縺ｫ郤上≧螳医ｊ縺ｮ蜉帙ｒ蜊雁�縺ｫ菴惹ｸ九＆縺帙ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '陬懷勧邉ｻ', badge: 'support', isInitial: true },
  strengthen: { name: '遲句鴨蠑ｷ蛹�', icon: '�潮', desc: '閧我ｽ薙�繝ｪ繝溘ャ繧ｿ繝ｼ繧剃ｸ譎ら噪縺ｫ隗｣髯､縺励∵焚繧ｿ繝ｼ繝ｳ縺ｮ髢薙∬�霄ｫ縺ｮ謾ｻ謦�ｨ∝鴨繧�1.5蛟阪↓縺吶ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '陬懷勧邉ｻ', badge: 'support', isInitial: true },
  slownurse: { name: '驤崎ｶｳ縺ｮ蜻ｪ縺�', icon: '竢ｳ', desc: '螟ｧ豌励�譫ｷ縲よ焚繧ｿ繝ｼ繝ｳ縺ｮ髢薙∫嶌謇九�霄ｫ縺ｮ縺薙↑縺暦ｼ育ｴ�譌ｩ縺包ｼ峨ｒ螟ｧ縺阪￥蠑輔″荳九￡繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '陬懷勧邉ｻ', badge: 'support', isInitial: true },
  draw: { name: '繝峨Ο繝ｼ繧､繝ｳ繧ｰ', icon: '�耳', desc: '謌ｦ蝣ｴ縺ｮ譎る俣繧剃ｸ譎ら噪縺ｫ蜃咲ｵ舌＆縺帙√％縺ｮ繧ｿ繝ｼ繝ｳ縺ｯ縺贋ｺ偵＞縺ｫ荳蛻��蟷ｲ貂会ｼ医ム繝｡繝ｼ繧ｸ�峨ｒ辟｡蜉ｹ蛹悶☆繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '縺昴�莉�', badge: 'special', isInitial: true },
  toge: { name: '繝医ご繝医ご縺ｮ逕ｲ鄒�', icon: '�厳', desc: '�郁�蜍慕匱蜍包ｼ芽｡晄茶繧貞女縺代◆髫帙√◎縺ｮ蜿榊虚縺ｧ荳蠎ｦ縺�縺醍嶌謇九�雜ｳ逡吶ａ�育ｴ�譌ｩ縺墓ｸ幄｡ｰ�峨ｒ陦後≧縲�', type: '繝代ャ繧ｷ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', isInitial: true },
  secondwind: { name: '繧ｻ繧ｫ繝ｳ繝蛾｢ｨ', icon: '�軒��', desc: '�郁�蜍慕匱蜍包ｼ臥函蜻ｽ蜉帙′谿九ｊ4蛻��1莉･荳九↓縺ｪ縺｣縺溷飴驍｣縲�亟陦帶悽閭ｽ縺悟ロ縺咲函蜻ｽ蜉帙ｒ10蝗槫ｾｩ縺吶ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '蝗槫ｾｩ邉ｻ', badge: 'heal', isInitial: true },
  firstwind: { name: '譛騾溘�鬚ｨ', icon: '�鴻', desc: '�郁�蜍慕匱蜍包ｼ芽ｿｽ縺�｢ｨ繧堤ｺ上＞縲∵怙蛻昴�2繧ｿ繝ｼ繝ｳ縺ｮ髢薙�縺ｿ鬩夂焚逧�↑蜈亥宛蛻､螳夲ｼ育ｴ�譌ｩ縺�+100�峨ｒ蠕励ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '陬懷勧邉ｻ', badge: 'support', isInitial: true },
  shuffle: { name: '繧ｹ繝��繧ｿ繧ｹ繝ｻ繧ｷ繝｣繝�ヵ繝ｫ', icon: '�楳', desc: '�郁�蜍慕匱蜍包ｼ牙�謇九�縺ｿ逋ｺ蜍輔ょ屏譫懊ｒ豁ｪ繧√√％縺ｮ謌ｦ髣倅ｸｭ縺贋ｺ偵＞縺ｮ縲檎ｴ�譌ｩ縺輔阪�謨ｰ蛟､繧貞ｮ悟�縺ｫ繧ｹ繝医ャ繝暦ｼ亥�繧梧崛縺茨ｼ峨☆繧九�', type: '繝代ャ繧ｷ繝�', cat: '縺昴�莉�', badge: 'special', isInitial: true },

  // 縲舌Μ繝ｼ繧ｰ蜆ｪ蜍晄勹蜩√せ繧ｭ繝ｫ��21蛟具ｼ壹Α繧ｹ繝�Μ繝ｼ譫��峨�
  // 窶ｻ 遘倅ｼ晄嶌蟇ｾ蠢懷ｱ樊ｧ��
  //   - 謾ｻ謦��遘倅ｼ晄嶌 (attack): 6蛟�
  //   - 髦ｲ蠕｡縺ｮ遘倅ｼ晄嶌 (defense): 7蛟�
  //   - 迚ｹ谿翫�遘倅ｼ晄嶌 (special): 8蛟�
  gigabreak: { name: '繧ｮ繧ｬ繝悶Ξ繧､繧ｯ', icon: '笞｡', desc: '閾ｪ霄ｫ縺ｮ迚ｩ逅�判謦�鴨縺ｫ縲∫ｧ倥ａ繧峨ｌ縺溘朱°縲上�蠑ｷ縺輔ｒ荳贋ｹ励○縺励※蜿ｩ縺崎ｾｼ繧邨ｶ蟇ｾ遐ｴ譁ｭ縺ｮ荳謦��', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  moroha: { name: '隲ｸ蛻��蜑｣', icon: '�ｩｸ', desc: '閾ｪ霄ｫ縺ｮ謾ｻ謦�鴨繧�2蛟阪↓縺励※謾ｾ縺､蜃�ｵｶ縺ｪ荳謦�ゅ◆縺�縺励∝渚蜍輔→縺励※蟾ｱ縺ｮ譛螟ｧ逕溷多蜉帙�3蜑ｲ繧貞､ｱ縺��', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  sutemi: { name: '謐ｨ縺ｦ霄ｫ縺ｮ遯∵茶', icon: '�徴', desc: '谺｡繧ｿ繝ｼ繝ｳ縺ｮ陦悟虚繧呈怙蜆ｪ蜈茨ｼ育ｵｶ蟇ｾ蜈域焔�峨↓縺励∝ｮ医ｊ辟｡隕悶�逞帶茶繧呈叛縺､縲ゅ◆縺�縺嶺ｻ｣蜆溘→縺励※縺昴�繧ｿ繝ｼ繝ｳ縺ｯ辟｡髦ｲ蛯呻ｼ磯亟蠕｡0�峨→縺ｪ繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  ichigeki: { name: '荳謦�ｿ�ｮｺ', icon: '�識', desc: '蜻ｽ荳ｭ邇��讌ｵ繧√※菴弱＞縺後∝ｮｿ繧後�逶ｸ謇九�蜻ｽ繧貞聖縺埼｣帙�縺吶°縲√≠繧九＞縺ｯ轢墓ｭｻ�域ｮ九ｊHP1�峨↓霑ｽ縺�ｾｼ繧繝ｭ繝槭Φ縺ｮ讌ｵ縺ｿ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  charge: { name: '繝上う繝代�繝√Ε繝ｼ繧ｸ', icon: '�萩', desc: '1繧ｿ繝ｼ繝ｳ邊ｾ逾槭ｒ邨ｱ荳縺励※陦悟虚繧偵ヱ繧ｹ縺吶ｋ莉｣繧上ｊ縺ｫ縲∵ｬ｡繧ｿ繝ｼ繝ｳ縺ｮ謾ｻ謦�ｨ∝鴨繧�3蛟阪↓閹ｨ繧御ｸ翫′繧峨○繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  overclock: { name: '繧ｪ繝ｼ繝舌�繧ｯ繝ｭ繝�け', icon: '笞呻ｸ�', desc: '2繧ｿ繝ｼ繝ｳ縺ｮ髢薙∬�霄ｫ縺ｮ霄ｫ縺ｮ縺薙↑縺暦ｼ育ｴ�譌ｩ縺包ｼ峨ｒ2蛟阪↓霍ｳ縺ｭ荳翫￡繧九ゅ◆縺�縺励�℃雋�闕ｷ縺ｫ繧医ｊ蜉ｹ譫懃ｵゆｺ�凾縺ｫ逕溷多蜉帙′5貂帛ｰ代☆繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '陬懷勧邉ｻ', badge: 'support', scrollType: 'special' },
  shadowstep: { name: '繧ｷ繝｣繝峨�繧ｹ繝�ャ繝�', icon: '�促', desc: '謨ｰ繧ｿ繝ｼ繝ｳ縺ｮ髢薙∬�霄ｫ縺ｮ谿句ワ繧呈ｮ九☆縺薙→縺ｧ縲∫嶌謇九�謾ｻ謦�ｒ鬮倡｢ｺ邇�〒蝗樣∩縺吶ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '陬懷勧邉ｻ', badge: 'support', scrollType: 'special' },
  swap: { name: '遲我ｾ｡莠､謠�', icon: '笞厄ｸ�', desc: '遖∝ｿ後→縺輔ｌ繧狗函蜻ｽ縺ｮ螟ｩ遘､縲ゅ♀莠偵＞縺ｮ迴ｾ蝨ｨ逕溷多蜉帙ｒ縺昴�縺ｾ縺ｾ蜈･繧梧崛縺医ｋ縲りｵｷ豁ｻ蝗樒函縺ｮ蜈峨→縺ｪ繧九°縲∬�貊��髣�→縺ｪ繧九°縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '縺昴�莉�', badge: 'special', scrollType: 'special' },
  jackpot: { name: '繧ｸ繝｣繝�け繝昴ャ繝�', icon: '�鴫', desc: '逶ｸ謇九ｈ繧翫朱°縲上′蜍昴▲縺ｦ縺�ｋ蝣ｴ蜷医√％縺ｮ繧ｿ繝ｼ繝ｳ縺ｮ閾ｪ霄ｫ縺ｮ謾ｻ蜍｢繧偵☆縺ｹ縺ｦ遒ｺ螳壹�閾ｴ蜻ｽ�医け繝ｪ繝�ぅ繧ｫ繝ｫ�峨∈縺ｨ螟峨∴繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '縺昴�莉�', badge: 'special', scrollType: 'special' },
  copy: { name: '繧ｳ繝斐�繧ｭ繝｣繝�ヨ', icon: '�棲', desc: '髀｡縺ｮ螯ゅ″讌ｭ縲ら嶌謇九′逶ｴ蜑阪�繧ｿ繝ｼ繝ｳ縺ｫ逋ｺ蜍輔＠縺溘せ繧ｭ繝ｫ繧偵√◎縺ｮ縺ｾ縺ｾ閾ｪ蛻��閭ｽ蜉帙→縺励※讓｡蛟｣縺礼匱蜍輔☆繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '縺昴�莉�', badge: 'special', scrollType: 'special' },
  amanajaku: { name: '螟ｩ驍ｪ鬯ｼ', icon: '�鹿', desc: '縺薙�繧ｿ繝ｼ繝ｳ縺ｮ縺ｿ謌ｦ蝣ｴ縺ｮ逅�ｒ蜿崎ｻ｢縺輔○繧九り�霄ｫ縺ｮ蜉帙′蠑ｱ縺�⊇縺ｩ縲∫嶌謇九�螳医ｊ縺悟��＞縺ｻ縺ｩ縲∫函縺倥ｋ陦晄茶縺ｯ閧･螟ｧ蛹悶☆繧九�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '縺昴�莉�', badge: 'special', scrollType: 'special' },
  reverse: { name: '繝ｪ繝舌�繧ｹ繝ｫ繝ｼ繝�', icon: '�劇', desc: '3繧ｿ繝ｼ繝ｳ縺ｮ髢薙∵凾遨ｺ繧呈ｭｪ繧√※縲瑚ｺｫ縺ｮ縺薙↑縺励′驕�＞閠�阪°繧牙�縺ｫ陦悟虚縺ｧ縺阪ｋ繧医≧縺ｫ縺ｪ繧句･�ｦ吶↑遨ｺ髢薙ｒ螻暮幕縺吶ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '縺昴�莉�', badge: 'special', scrollType: 'special' },
  parry: { name: '繝代Μ繧｣', icon: '笞費ｸ�', desc: '�郁�蜍慕匱蜍包ｼ臥嶌謇九′閾ｪ蛻�ｈ繧贋ｿ頑撫縺ｧ縺ゅｋ蝣ｴ蜷医√◎縺ｮ蛻晄茶��1逋ｺ逶ｮ�峨�縺ｿ100%縺ｮ遒ｺ邇�〒螳悟�縺ｫ蜿励￠豬√＠縺ｦ辟｡蜉ｹ蛹悶☆繧九�', type: '繝代ャ繧ｷ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', scrollType: 'special' },
  fortress: { name: '譛蠕後�遐ｦ', icon: '�床', desc: '�郁�蜍慕匱蜍包ｼ芽�霄ｫ縺ｮ逕溷多蜉帙′2蜑ｲ莉･荳九↓髯･縺｣縺溽椪髢薙∬�蜍輔〒1繧ｿ繝ｼ繝ｳ縺ｮ縺ｿ縺ゅｉ繧�ｋ謳榊ｮｳ繧堤┌蜉ｹ蛹悶☆繧狗┌謨ｵ迥ｶ諷九→蛹悶☆縲�', type: '繝代ャ繧ｷ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', scrollType: 'special' },
  recycle: { name: '繝ｪ繧ｵ繧､繧ｯ繝ｫ', icon: '笙ｻ��', desc: '�郁�蜍慕匱蜍包ｼ臥嶌謇九′繧ｹ繧ｭ繝ｫ繧呈叛縺｣縺溽峩蠕後↓繝医Μ繧ｬ繝ｼ縲ゅ◎縺ｮ繧ｹ繧ｭ繝ｫ縺ｫ繧医▲縺ｦ閾ｪ蛻�′蜿励￠縺滓錐螳ｳ縺ｮ蜊雁�繧貞叉蠎ｧ縺ｫ菫ｮ蠕ｩ�亥屓蠕ｩ�峨☆繧九�', type: '繝代ャ繧ｷ繝�', cat: '蝗槫ｾｩ邉ｻ', badge: 'heal', scrollType: 'special' },
  fdice: { name: '繝輔か繝ｼ繝√Η繝ｳ繝繧､繧ｹ', icon: '�軸', desc: '�郁�蜍慕匱蜍包ｼ画姶髣倬幕蟋区凾縺ｫ驕句多縺ｮ繝繧､繧ｹ繧呈険繧九り�霄ｫ縺ｮ縲朱°縲上�謨ｰ蛟､縺後Λ繝ｳ繝繝�縺ｧ螟ｧ縺阪￥荳贋ｸ九↓螟牙虚縺吶ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '陬懷勧邉ｻ', badge: 'support', scrollType: 'special' },
  pressure: { name: '繝励Ξ繝�す繝｣繝ｼ', icon: '�早��', desc: '�郁�蜍慕匱蜍包ｼ画姶髣倬幕蟋区凾縲∫嶌謇九�縲朱°縲上′閾ｪ蛻�ｈ繧贋ｽ弱＞蝣ｴ蜷医∝悸蛟堤噪縺ｪ隕�ｰ励〒逶ｸ謇九�蛻晄焔縺ｮ陦悟虚繧貞ｼｷ蛻ｶ逧�↓繝代せ�域ｯ縺茨ｼ峨＆縺帙ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '陬懷勧邉ｻ', badge: 'support', scrollType: 'special' },

  // --- 霑ｽ蜉�縺輔ｌ縺溷ｾｮ螯吶�繝上ぜ繝ｬ蟇�ｊ9繧ｹ繧ｭ繝ｫ ---
  intimidate: { name: '螽∝嚊縺ｮ繝昴�繧ｺ', icon: '�ｦ�', desc: '�郁�蜍慕匱蜍包ｼ画姶髣倬幕蟋区凾縲�10%縺ｮ遒ｺ邇�〒逶ｸ謇九�謾ｻ謦�鴨繧�1貂帛ｰ代＆縺帙ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '陬懷勧邉ｻ', badge: 'support', scrollType: 'attack' },
  playdead: { name: '豁ｻ繧薙□縺ｵ繧�', icon: '�彫', desc: '�郁�蜍慕匱蜍包ｼ芽�霄ｫ縺ｮ逕溷多蜉帙′10%莉･荳九↓縺ｪ縺｣縺滄圀縲∵ｬ｡縺ｮ1繧ｿ繝ｼ繝ｳ縺贋ｺ偵＞繧定｡悟虚荳崎�縺ｫ縺吶ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '縺昴�莉�', badge: 'special', scrollType: 'defense' },
  particularity: { name: '辟｡鬧�↑縺薙□繧上ｊ', icon: '�盗', desc: '�郁�蜍慕匱蜍包ｼ芽�霄ｫ縺ｮ縺�★繧後°縺ｮ繧ｹ繝��繧ｿ繧ｹ縺悟�謨ｰ縺ｮ譎ゅ�縺ｿ縲∫嶌謇九↓荳弱∴繧九ム繝｡繝ｼ繧ｸ縺�5%蠅怜刈縺吶ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'special' },
  poorcounter: { name: '譛ｪ辭溘↑繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ', icon: '�煤', desc: '�郁�蜍慕匱蜍包ｼ芽｢ｫ蠑ｾ譎ゅ�5%縺ｮ遒ｺ邇�〒蜿励￠縺溘ム繝｡繝ｼ繧ｸ縺ｮ10%繧貞渚蟆�☆繧九�', type: '繝代ャ繧ｷ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', scrollType: 'defense' },
  heavyatk: { name: '螟ｧ謖ｯ繧�', icon: '�潮', desc: '�郁�蜍慕匱蜍包ｼ画姶髣倬幕蟋区凾縲∬�霄ｫ縺ｮ謾ｻ謦�鴨縺�15%蠅怜刈縺吶ｋ縺後∽ｻ｣繧上ｊ縺ｫ邏�譌ｩ縺輔′30%貂帛ｰ代☆繧九�', type: '繝代ャ繧ｷ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  luckstrike: { name: '驕矩�ｼ縺ｿ縺ｮ縺ｲ縺ｨ遯√″', icon: '�軸', desc: '閾ｪ霄ｫ縺ｮ謾ｻ謦�鴨縺ｫ縲∬�霄ｫ縺ｮ縲碁°縲阪�謨ｰ蛟､繧偵◎縺ｮ縺ｾ縺ｾ蝗ｺ螳壹�霑ｽ蜉�繝繝｡繝ｼ繧ｸ縺ｨ縺励※荳贋ｹ励○縺励※遯√￥縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '謾ｻ謦�ｳｻ', badge: 'attack', scrollType: 'attack' },
  selfsatisfaction: { name: '閾ｪ蟾ｱ貅雜ｳ', icon: '笨ｨ', desc: '�郁�蜍慕匱蜍包ｼ画雰繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧呈茶遐ｴ縺励◆迸ｬ髢薙↓縲∬�霄ｫ縺ｮ逕溷多蜉帙ｒ1縺�縺大屓蠕ｩ縺吶ｋ縲�', type: '繝代ャ繧ｷ繝�', cat: '蝗槫ｾｩ邉ｻ', badge: 'heal', scrollType: 'special' },
  blankshot: { name: '遨ｺ遐ｲ', icon: '�暢', desc: '1繧ｿ繝ｼ繝ｳ逶ｮ縺ｮ謾ｻ謦�凾縺ｮ縺ｿ逋ｺ蜍募庄閭ｽ縲ゅム繝｡繝ｼ繧ｸ繧剃ｸ弱∴縺ｪ縺�ｻ｣繧上ｊ縺ｫ縲∫嶌謇九�髦ｲ蠕｡蜉帙ｒ5%菴惹ｸ九＆縺帙ｋ縲�', type: '繧｢繧ｯ繝�ぅ繝�', cat: '陬懷勧邉ｻ', badge: 'support', scrollType: 'special' },
  glassshield: { name: '繧ｬ繝ｩ繧ｹ縺ｮ逶ｾ', icon: '�孱��', desc: '�郁�蜍慕匱蜍包ｼ画姶髣倬幕蟋区凾縺ｫ螻暮幕縲よ怙蛻昴�1蝗樒岼縺ｮ陲ｫ蠑ｾ縺ｮ縺ｿ髦ｲ蠕｡蜉帙′1.2蛟阪↓縺ｪ繧九′縲∽ｻ･髯阪�髦ｲ蠕｡蜉帙′10%菴惹ｸ九☆繧九�', type: '繝代ャ繧ｷ繝�', cat: '髦ｲ蠕｡邉ｻ', badge: 'defense', scrollType: 'defense' },
};

const STAT_COLORS = { hp:'#10b981', attack:'#ef4444', defense:'#3d9be9', speed:'#f59e0b', luck:'#a855f7' };
const STAT_LABELS = { hp:'笶､�� HP', attack:'笞費ｸ� 謾ｻ謦�', defense:'�孱�� 髦ｲ蠕｡', speed:'�暢 邏�譌ｩ', luck:'箝� 驕�' };
const STAT_MINS   = { hp:1, attack:1, defense:0, speed:0, luck:0 };
const STAT_MAXS   = { hp:97, attack:97, defense:98, speed:98, luck:98 };
const STAT_KEYS   = ['hp','attack','defense','speed','luck'];
const MONSTER_ICONS = ['�洶','�洫','�洸','�洙','�衍','筮�','�鳩','�閥','�泯','笞ｪ'];

// ============================================================
//  MONSTER TYPES & BONUS (9邉ｻ邨ｱ)
// ============================================================
const MONSTER_TYPES = {
  dragon: { label:'繝峨Λ繧ｴ繝ｳ邉ｻ', icon:'�翠', color:'#ef4444',
    bonus:{ hp:0, attack:10, defense:0, speed:0, luck:0 },
    base:{ hp:1, attack:11, defense:0, speed:0, luck:0 },
    names:['繧｢繝ｫ繝輔ぃ繝峨Λ繧ｴ繝ｳ','繧､繝ｳ繝輔ぉ繝ｫ繝弱せ','繧ｪ繝｡繧ｬ繧ｫ繧､繧ｶ繝ｼ'] },
  golem: { label:'繧ｴ繝ｼ繝ｬ繝�邉ｻ', icon:'�料', color:'#3d9be9',
    bonus:{ hp:0, attack:0, defense:10, speed:0, luck:0 },
    base:{ hp:1, attack:1, defense:10, speed:0, luck:0 },
    names:['繧ｹ繝医�繝ｳ繧ｳ繝ｳ繧ｰ','繧ｸ繧ｧ繧､繝峨ぎ繝ｼ繝�ぅ繧｢繝ｳ','繧ｮ繧ｬ繧ｹ繝医�繝ｳ'] },
  bird: { label:'魑･繝ｻ鬟帷ｩｺ邉ｻ', icon:'�ｦ�', color:'#00d4ff',
    bonus:{ hp:0, attack:5, defense:0, speed:5, luck:0 },
    base:{ hp:1, attack:6, defense:0, speed:5, luck:0 },
    names:['繝上�繝斐ぅ繧ｯ繧､繝ｼ繝ｳ','繧ｬ繝ｫ繝ｼ繝','繧ｰ繝ｪ繝輔か繝九け繧ｹ'] },
  beast: { label:'迯｣�磯ｭ皮坤�臥ｳｻ', icon:'�ｦ�', color:'#f59e0b',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:10 },
    base:{ hp:1, attack:1, defense:0, speed:0, luck:10 },
    names:['繧ｵ繝ｼ繝吶Ν繧ｿ繧､繧ｬ繝ｼ','繧ｭ繝槭う繝ｩ繝ｭ繝ｼ繝�','繝輔ぉ繝ｳ繝ｪ繝ｫ'] },
  undead: { label:'繧｢繝ｳ繝�ャ繝臥ｳｻ', icon:'�逐', color:'#a855f7',
    bonus:{ hp:10, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:11, attack:1, defense:0, speed:0, luck:0 },
    names:['繝槭Α繝ｼ繧ｹ繝溘せ','繝輔ぃ繝ｳ繝医Β繝翫う繝�','繝�せ繧ｵ繧､繧ｺ'] },
  slime: { label:'繧ｹ繝ｩ繧､繝�邉ｻ', icon:'�泙', color:'#22c55e',
    bonus:{ hp:5, attack:0, defense:5, speed:0, luck:0 },
    base:{ hp:6, attack:1, defense:5, speed:0, luck:0 },
    names:['繧ｹ繝ｩ繧､繝�','繧ｭ繝ｳ繧ｰ繧ｹ繝ｩ繧､繝�','繧ｴ繝�ラ繧ｼ繝ｪ繝ｼ'] },
  devil: { label:'謔ｪ鬲費ｼ医ョ繝薙Ν�臥ｳｻ', icon:'��', color:'#ec4899',
    bonus:{ hp:0, attack:5, defense:5, speed:0, luck:0 },
    base:{ hp:1, attack:6, defense:5, speed:0, luck:0 },
    names:['繝励メ繝�ン繝ｫ','繧ｵ繧ｭ繝･繝舌せ','繝吶Ν繧ｼ繝舌ヶ'] },
  plant: { label:'讀咲黄�郁�辟ｶ�臥ｳｻ', icon:'�諺', color:'#84cc16',
    bonus:{ hp:0, attack:0, defense:5, speed:0, luck:5 },
    base:{ hp:1, attack:1, defense:5, speed:0, luck:5 },
    names:['繝槭Φ繝峨Λ繧ｴ繝ｩ','繧｢繝ｫ繝ｩ繧ｦ繝�','荳也阜讓ｹ縺ｮ逵ｷ螻�'] },
  metal: { label:'繝｡繧ｿ繝ｫ�域ｩ滓｢ｰ�臥ｳｻ', icon:'笞呻ｸ�', color:'#64748b',
    bonus:{ hp:0, attack:0, defense:0, speed:10, luck:0 },
    base:{ hp:1, attack:1, defense:0, speed:10, luck:0 },
    names:['繧｢繧､繧｢繝ｳ繧ｮ繧ｬ','繝｡繧ｿ繝ｫ繝薙ャ繝�','繧ｸ繧ｧ繝弱し繧､繝繝ｼ'] },
  // === 霑ｽ蜉�5邉ｻ邨ｱ�域ｭｦ闊槫床繧ｷ繝ｧ繝��隗｣謾ｾ譫��� ===
  robo: { label:'繝ｭ繝懃ｳｻ', icon:'�､�', color:'#60a5fa', series:'robo',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    names:['繧ｻ繧､繝舌�繝ｻ繝悶Ν繝ｼ','繧｢繧､繧｢繝ｳ繝ｻ繝医Ν繝ｼ繝代�','繧｢繝ｼ繧ｯ繝ｻ繧ｪ繝ｼ繝ｭ繝ｩ'] },
  god: { label:'逾樒ｳｻ', icon:'笞｡', color:'#fbbf24', series:'shin',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    names:['繧｢繝�リ','繧ｼ繧ｦ繧ｹ','繧｢繝後ン繧ｹ'] },
  dinosaur: { label:'諱千ｫ懃ｳｻ', icon:'�ｦ�', color:'#dc2626', series:'dinosaur',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    names:['繝�ぅ繝ｩ繝弱せ','繝医Μ繧ｱ繝ｩ繝医Φ','繝励ユ繝ｩ繝弱ラ繝ｳ'] },
  toy: { label:'縺ｬ縺�＄繧九∩邉ｻ', icon:'�ｧｸ', color:'#f472b6', series:'toy',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    names:['繧ｯ繝槭＆繧薙ヱ繝壹ャ繝�','蜻ｪ縺��繧ｦ繧ｵ繧ｮ','繝阪さ縺ｬ縺舌ｋ縺ｿ'] },
  ghost: { label:'螯匁ｪ邉ｻ', icon:'�ｦ�', color:'#c084fc', series:'ghost',
    bonus:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    base:{ hp:0, attack:0, defense:0, speed:0, luck:0 },
    names:['荵晏ｰｾ縺ｮ迢�','驟貞荘遶･蟄�','縺ｬ繧峨ｊ縺ｲ繧�ｓ'] },
  other: { label:'縺昴�莉�', icon:'箝�', color:'#94a3b8',
    bonus:{ hp:2, attack:2, defense:2, speed:2, luck:2 },
    base:{ hp:3, attack:3, defense:2, speed:2, luck:2 },
    names:[], hidden:true },
};

// ============================================================
//  ADDITIONAL MONSTERS & IMAGE MAPPINGS (IMG3)
// ============================================================
const ADDITIONAL_MONSTER_IMAGES = {
  // 繝ｭ繝懊す繝ｪ繝ｼ繧ｺ
  '繧ｻ繧､繝舌�繝ｻ繝悶Ν繝ｼ': 'IMG3/01seiva.png',
  '繧｢繧､繧｢繝ｳ繝ｻ繝医Ν繝ｼ繝代�': 'IMG3/02aian.png',
  '繧｢繝ｼ繧ｯ繝ｻ繧ｪ繝ｼ繝ｭ繝ｩ': 'IMG3/03a-ku.png',
  // 逾槭す繝ｪ繝ｼ繧ｺ
  '繧｢繝�リ': 'IMG3/04atena.jpg',
  '繧ｼ繧ｦ繧ｹ': 'IMG3/05zeus.jpg',
  '繧｢繝後ン繧ｹ': 'IMG3/06erumes.jpg',
  // 諱千ｫ懊す繝ｪ繝ｼ繧ｺ
  '繝�ぅ繝ｩ繝弱せ': 'IMG3/07thirano.jpg',
  '繝医Μ繧ｱ繝ｩ繝医Φ': 'IMG3/08torikeran.jpg',
  '繝励ユ繝ｩ繝弱ラ繝ｳ': 'IMG3/09putera.jpg',
  // 縺ｬ縺�＄繧九∩繧ｷ繝ｪ繝ｼ繧ｺ
  '繧ｯ繝槭＆繧薙ヱ繝壹ャ繝�': 'IMG3/10kumapape.jpg',
  '蜻ｪ縺��繧ｦ繧ｵ繧ｮ': 'IMG3/11usagi.jpg',
  '繝阪さ縺ｬ縺舌ｋ縺ｿ': 'IMG3/12neko.jpg',
  // 螯匁ｪ繧ｷ繝ｪ繝ｼ繧ｺ
  '荵晏ｰｾ縺ｮ迢�': 'IMG3/13kyuubi.jpg',
  '驟貞荘遶･蟄�': 'IMG3/14syutenn.jpg',
  '縺ｬ繧峨ｊ縺ｲ繧�ｓ': 'IMG3/15nurai.jpg'
};

const additionalMonsters = [
  // 繝ｭ繝懊す繝ｪ繝ｼ繧ｺ
  { id: 'm_robo_01', name: '繧ｻ繧､繝舌�繝ｻ繝悶Ν繝ｼ', category: '繝ｭ繝�', systemType: '繝ｭ繝懃ｳｻ', monsterClass: '繧ｻ繧､繝舌�繝ｻ繝悶Ν繝ｼ', image: 'IMG3/01seiva.png' },
  { id: 'm_robo_02', name: '繧｢繧､繧｢繝ｳ繝ｻ繝医Ν繝ｼ繝代�', category: '繝ｭ繝�', systemType: '繝ｭ繝懃ｳｻ', monsterClass: '繧｢繧､繧｢繝ｳ繝ｻ繝医Ν繝ｼ繝代�', image: 'IMG3/02aian.png' },
  { id: 'm_robo_03', name: '繧｢繝ｼ繧ｯ繝ｻ繧ｪ繝ｼ繝ｭ繝ｩ', category: '繝ｭ繝�', systemType: '繝ｭ繝懃ｳｻ', monsterClass: '繧｢繝ｼ繧ｯ繝ｻ繧ｪ繝ｼ繝ｭ繝ｩ', image: 'IMG3/03a-ku.png' },
  // 逾槭す繝ｪ繝ｼ繧ｺ
  { id: 'm_god_01', name: '繧｢繝�リ', category: '逾�', systemType: '逾樒ｳｻ', monsterClass: '繧｢繝�リ', image: 'IMG3/04atena.jpg' },
  { id: 'm_god_02', name: '繧ｼ繧ｦ繧ｹ', category: '逾�', systemType: '逾樒ｳｻ', monsterClass: '繧ｼ繧ｦ繧ｹ', image: 'IMG3/05zeus.jpg' },
  { id: 'm_god_03', name: '繧｢繝後ン繧ｹ', category: '逾�', systemType: '逾樒ｳｻ', monsterClass: '繧｢繝後ン繧ｹ', image: 'IMG3/06erumes.jpg' },
  // 諱千ｫ懊す繝ｪ繝ｼ繧ｺ
  { id: 'm_dino_01', name: '繝�ぅ繝ｩ繝弱せ', category: '諱千ｫ�', systemType: '諱千ｫ懃ｳｻ', monsterClass: '繝�ぅ繝ｩ繝弱せ', image: 'IMG3/07thirano.jpg' },
  { id: 'm_dino_02', name: '繝医Μ繧ｱ繝ｩ繝医Φ', category: '諱千ｫ�', systemType: '諱千ｫ懃ｳｻ', monsterClass: '繝医Μ繧ｱ繝ｩ繝医Φ', image: 'IMG3/08torikeran.jpg' },
  { id: 'm_dino_03', name: '繝励ユ繝ｩ繝弱ラ繝ｳ', category: '諱千ｫ�', systemType: '諱千ｫ懃ｳｻ', monsterClass: '繝励ユ繝ｩ繝弱ラ繝ｳ', image: 'IMG3/09putera.jpg' },
  // 縺ｬ縺�＄繧九∩繧ｷ繝ｪ繝ｼ繧ｺ
  { id: 'm_plush_01', name: '繧ｯ繝槭＆繧薙ヱ繝壹ャ繝�', category: '縺ｬ縺�＄繧九∩', systemType: '縺ｬ縺�＄繧九∩邉ｻ', monsterClass: '繧ｯ繝槭＆繧薙ヱ繝壹ャ繝�', image: 'IMG3/10kumapape.jpg' },
  { id: 'm_plush_02', name: '蜻ｪ縺��繧ｦ繧ｵ繧ｮ', category: '縺ｬ縺�＄繧九∩', systemType: '縺ｬ縺�＄繧九∩邉ｻ', monsterClass: '蜻ｪ縺��繧ｦ繧ｵ繧ｮ', image: 'IMG3/11usagi.jpg' },
  { id: 'm_plush_03', name: '繝阪さ縺ｬ縺舌ｋ縺ｿ', category: '縺ｬ縺�＄繧九∩', systemType: '縺ｬ縺�＄繧九∩邉ｻ', monsterClass: '繝阪さ縺ｬ縺舌ｋ縺ｿ', image: 'IMG3/12neko.jpg' },
  // 螯匁ｪ繧ｷ繝ｪ繝ｼ繧ｺ
  { id: 'm_yokai_01', name: '荵晏ｰｾ縺ｮ迢�', category: '螯匁ｪ', systemType: '螯匁ｪ邉ｻ', monsterClass: '荵晏ｰｾ縺ｮ迢�', image: 'IMG3/13kyuubi.jpg' },
  { id: 'm_yokai_02', name: '驟貞荘遶･蟄�', category: '螯匁ｪ', systemType: '螯匁ｪ邉ｻ', monsterClass: '驟貞荘遶･蟄�', image: 'IMG3/14syutenn.jpg' },
  { id: 'm_yokai_03', name: '縺ｬ繧峨ｊ縺ｲ繧�ｓ', category: '螯匁ｪ', systemType: '螯匁ｪ邉ｻ', monsterClass: '縺ｬ繧峨ｊ縺ｲ繧�ｓ', image: 'IMG3/15nurai.jpg' }
];



function isNewSeriesCategory(sysId, className) {
  const newSysKeys = ['robo', 'god', 'dinosaur', 'toy', 'ghost', 'yokai'];
  if (newSysKeys.includes(sysId)) return true;
  if (typeof additionalMonsters !== 'undefined') {
    return additionalMonsters.some(m => m.monsterClass === className || m.name === className);
  }
  return false;
}

function getBaseStatus(type) {
  var t = MONSTER_TYPES[type] || MONSTER_TYPES.other;
  return { hp:t.base.hp, attack:t.base.attack, defense:t.base.defense, speed:t.base.speed, luck:t.base.luck };
}

const STAGE_ENEMIES = [
  {
    name:'繧ｴ繝悶Μ繝ｳ繝√�繝�', title:'蟆剰ｳ｢縺励＞逡･螂ｪ閠�', icon:'�村',
    rumor:'縲悟ｼｱ縺�→諤昴▲縺ｦ豐ｹ譁ｭ縺吶ｋ縺ｪ縲ゅ≠縺�▽縺ｯ縺昴％縺昴％繝舌Λ繝ｳ繧ｹ縺悟叙繧後※縺�※縲∝�蠢��叫繧翫�蟶ｸ鄙堤官縺�縲�',
    hp:20, attack:25, defense:20, speed:25, luck:20, skill:'none', type:'other',
  },
  {
    name:'繝繝ｼ繧ｯ繝悶Ξ繝ｼ繝�', title:'逾樣溘�證玲ｮｺ閠�', icon:'�裡��',
    rumor:'縲後≠縺�▽縺ｮ蜍輔″縺ｯ隕九∴縺ｪ縺�よｰ励▼縺�◆縺ｨ縺阪↓縺ｯ邨ゅｏ縺｣縺ｦ繧九咲ｴ�譌ｩ縺輔↓蜈ｨ縺ｦ繧定ｳｭ縺代◆蛻ｺ螳｢縺ｨ蝎ゅ＆繧後ｋ縲�',
    hp:5, attack:10, defense:5, speed:82, luck:8, skill:'firstwind', type:'other',
  },
  {
    name:'繧｢繧､繧｢繝ｳ繧ｴ繝ｼ繝ｬ繝�', title:'驩�｣√�螳郁ｭｷ閠�', icon:'�孱��',
    rumor:'縲後←繧薙↑謾ｻ謦�ｂ騾壹ｉ縺ｪ縺�ｉ縺励＞縲ょｮ医ｊ繧堤ｪ√″遐ｴ繧区焔谿ｵ繧定�∴繧阪埼亟蠕｡縺ｫ逡ｰ蟶ｸ縺ｪ繝昴う繝ｳ繝医ｒ蜑ｲ縺�※縺�ｋ縺ｨ縺ｮ諠��ｱ縲�',
    hp:15, attack:10, defense:76, speed:5, luck:4, skill:'none', type:'golem',
  },
  {
    name:'繝｡繧ｬ繝峨Λ繧ｴ繝ｳ', title:'螟ｧ轣ｫ蜉帙�遐ｴ螢願�', icon:'�翠',
    rumor:'縲御ｸ謦�′縺ｨ縺ｫ縺九￥繝､繝舌＞縲ゅぎ繝ｼ繝峨＠縺ｦ繧よэ蜻ｳ縺ｪ縺�ょ�謇九ｒ蜿悶ｋ縺矩�￡蝗槭ｋ縺励°縺ｪ縺�阪→謌ｦ螢ｫ縺碁怫縺医↑縺後ｉ隱槭▲縺溘�',
    hp:15, attack:80, defense:5, speed:5, luck:5, skill:'haisui', type:'dragon',
  },
  {
    name:'繝ｩ繝�く繝ｼ繧ｹ繧ｿ繝ｼ', title:'繝ｩ繝�く繝ｼ繧ｮ繝｣繝ｳ繝悶Λ繝ｼ', icon:'箝�',
    rumor:'縲碁°縺ｧ縺ｩ縺�↓縺九＠縺ｦ繧九□縺代□繧坂ｦ窶ｦ縺ｨ諤昴▲縺ｦ縺溘ｉ蜈ｨ蜩｡繧�ｉ繧後◆縲ゅ≠縺�▽縺ｮ"驕�"縺ｯ譛ｬ迚ｩ縺九ｂ縺励ｌ縺ｪ縺��',
    hp:15, attack:10, defense:5, speed:10, luck:70, skill:'shuriken', type:'bird',
  },
  {
    name:'繝繝ｼ繧ｯ繝槭リ', title:'鬲泌鴨縺ｮ證ｴ襍ｰ菴�', icon:'�醗',
    rumor:'縲悟･ｴ縺ｮ蜻ｨ繧翫�鬲泌鴨縺梧ｸｦ蟾ｻ縺�※縺�ｋ縲よ焔陬丞殴縺ｮ繧医≧縺ｪ鬲泌ｼｾ繧堤ｵｶ縺磯俣縺ｪ縺城｣帙�縺励※縺上ｋ縺槭�',
    hp:15, attack:40, defense:5, speed:20, luck:30, skill:'shuriken', type:'bird',
  },
  {
    name:'繧ｹ繝斐�繝峨せ繧ｿ繝ｼ', title:'逍ｾ鬚ｨ of 蟷ｻ蠖ｱ', icon:'�ｦ�',
    rumor:'縲碁溘☆縺弱※谿句ワ縺吶ｉ隕九∴縺ｪ縺�よ怙蛻昴�繧ｿ繝ｼ繝ｳ縺ｮ騾溘＆縺ｯ蟆句ｸｸ縺倥ｃ縺ｪ縺��',
    hp:15, attack:20, defense:15, speed:50, luck:10, skill:'firstwind', type:'bird',
  },
  {
    name:'繝ｪ繝薙Φ繧ｰ繧｢繝ｼ繝槭�', title:'蜻ｪ繧上ｌ縺鈴㍾陬�抜', icon:'�孱��',
    rumor:'縲悟商縺�而縺悟享謇九↓蜍輔＞縺ｦ縺�ｋ縲る撼蟶ｸ縺ｫ遑ｬ縺�′縲∝虚縺阪�讌ｵ繧√※驕�＞縲�',
    hp:25, attack:15, defense:60, speed:5, luck:5, skill:'none', type:'golem',
  },
  {
    name:'繝舌�繧ｵ繝ｼ繧ｫ繝ｼ', title:'迢ゆｹｱ縺ｮ謌ｦ螢ｫ', icon:'�ｪ�',
    rumor:'縲悟す縺､縺上⊇縺ｩ縺ｫ迢よ垓縺輔ｒ蠅励☆縲ゆｽ灘鴨縺梧ｸ帙▲縺溷ｽｼ縺ｮ謾ｻ謦�↓縺ｯ邨ｶ蟇ｾ縺ｫ蠖薙◆繧九↑縲�',
    hp:35, attack:45, defense:10, speed:10, luck:10, skill:'haisui', type:'other',
  },
  {
    name:'繧ｮ繝｣繝ｳ繝悶Λ繝ｼ', title:'蜻ｽ繧定ｳｭ縺代ｋ譖ｲ闃ｸ蟶ｫ', icon:'�ワ',
    rumor:'縲後☆縺ｹ縺ｦ繧帝°縺ｫ莉ｻ縺帙※縺�ｋ縲ょｽｼ縺ｮ繧ｵ繧､繧ｳ繝ｭ縺�6繧堤､ｺ縺励◆縺ｨ縺阪∵＄繧阪＠縺�･�ｷ｡縺瑚ｵｷ縺阪ｋ縲�',
    hp:15, attack:15, defense:10, speed:10, luck:60, skill:'shuriken', type:'other',
  },
  {
    name:'繧｢繧ｵ繧ｷ繝ｳ繝繧ｬ繝ｼ', title:'貍�ｻ� of 證玲ｮｺ閠�', icon:'�裡��',
    rumor:'縲御ｸ迸ｬ縺ｮ髫吶ｂ隕矩�＆縺ｪ縺�る幕蟷輔�螂�･ｲ繧貞㈹縺弱″繧後ｋ縺九←縺�°縺悟享雋�縺ｮ蛻�°繧檎岼縺�縲�',
    hp:15, attack:35, defense:10, speed:40, luck:10, skill:'firstwind', type:'other',
  },
  {
    name:'繝槭え繝ｳ繝�Φ繧ｳ繝ｳ繧ｰ', title:'螟ｧ螻ｱ閼医�隕�視', icon:'�ｦ�',
    rumor:'縲後◎縺ｮ蟾ｨ菴薙°繧臥ｹｰ繧雁�縺輔ｌ繧区教縺ｯ蟯ｩ繧偵ｂ遐輔￥縲ゅち繝輔〒蜉帛ｼｷ縺�′縲∫ｴ�譌ｩ縺輔�逧�┌縺�縲�',
    hp:45, attack:40, defense:15, speed:5, luck:5, skill:'none', type:'beast',
  },
  {
    name:'繝ｴ繧｡繝ｳ繝代う繧｢', title:'髣�､懊�蜷ｸ陦鬯ｼ', icon:'�ｧ�',
    rumor:'縲瑚ｿｽ縺�ｩｰ繧√ｉ繧後ｋ縺ｨ逵溘�蜉帙ｒ逋ｺ謠ｮ縺吶ｋ縲ょｽｼ縺ｮ迚吶′襍､縺丞�繧九→縺阪∵姶諷��荳謦�′謾ｾ縺溘ｌ繧九�',
    hp:30, attack:35, defense:15, speed:15, luck:15, skill:'haisui', type:'undead',
  },
  {
    name:'繝溘Λ繝ｼ繧ｸ繝･繧ｴ繝ｼ繧ｹ繝�', title:'髴ｧ縺ｫ豸医∴繧句ｹｻ蠖ｱ', icon:'�遜',
    rumor:'縲梧判謦�′陌夂ｩｺ繧貞�繧願｣ゅ￥縺�縺代るｩ夂焚逧�↑蝗樣∩閭ｽ蜉帙→鬲泌鴨縺ｮ鬟帙�驕灘�繧呈戟縺､縲�',
    hp:10, attack:25, defense:5, speed:45, luck:25, skill:'shuriken', type:'bird',
  },
  {
    name:'繧ｹ繝医�繝ｳ繝翫う繝�', title:'鬆大ｼｷ縺ｪ繧狗浹蜒丞�', icon:'�料',
    rumor:'縲梧э蠢励ｒ謖√◆縺ｬ遏ｳ縺ｮ蜈ｵ螢ｫ縲ゆｸｦ螟ｧ謚ｵ縺ｮ謾ｻ謦�〒縺ｯ蛯ｷ荳縺､縺､縺代ｉ繧後↑縺�｡ｬ蠎ｦ繧定ｪ�ｋ縲�',
    hp:20, attack:20, defense:65, speed:2, luck:3, skill:'none', type:'golem',
  },
  {
    name:'繝阪け繝ｭ繝槭Φ繧ｵ繝ｼ', title:'豁ｻ髴翫ｒ謫阪ｋ蟆主ｸｫ', icon:'�逐',
    rumor:'縲梧ｪ縺励￡縺ｪ蜻ｪ陦薙〒縺薙■繧峨�髦ｲ蠕｡繧堤┌隕悶＠縺溘ム繝｡繝ｼ繧ｸ繧剃ｸ弱∴縺ｦ縺上ｋ縲よ掠繧√↓豎ｺ逹繧偵▽縺代ｋ縺ｮ縺�縲�',
    hp:20, attack:30, defense:10, speed:20, luck:30, skill:'shuriken', type:'undead',
  },
  {
    name:'繝ｩ繧､繝医ル繝ｳ繧ｰ繝舌�繝�', title:'髮ｷ魑ｴ縺ｮ諤ｪ魑･', icon:'笞｡',
    rumor:'縲碁峭蜈峨�螯ゅ″騾溷ｺｦ縺ｧ鬟帙�莠､縺�よ怙蛻昴�繧ｿ繝ｼ繝ｳ縺ｧ蜈域焔繧貞叙繧九�縺ｯ邨ｶ譛帷噪縺�縲�',
    hp:15, attack:25, defense:10, speed:55, luck:5, skill:'firstwind', type:'bird',
  },
  {
    name:'繧ｪ繝ｼ繧ｯ繧ｦ繧ｩ繝ｼ繝ｪ繧｢', title:'蜑幄�縺ｮ謌ｦ螢ｫ', icon:'�雛',
    rumor:'縲梧判螳医�繝舌Λ繝ｳ繧ｹ縺碁撼蟶ｸ縺ｫ繧医￥蜿悶ｌ縺ｦ縺�ｋ縲ょ渕譛ｬ縺ｫ蠢�螳溘〒縲�囮縺後↑縺�ｼｷ謨ｵ縺�縲�',
    hp:35, attack:35, defense:20, speed:10, luck:10, skill:'none', type:'beast',
  },
  {
    name:'繝�せ繧ｹ繧ｳ繝ｼ繝斐が繝ｳ', title:'遐よｼ�縺ｮ豈帝�', icon:'�ｦ�',
    rumor:'縲御ｽ灘鴨縺瑚｡ｰ縺医◆縺昴�迸ｬ髢薙∽ｸ謦�ｿ�ｮｺ縺ｮ豈帝�縺檎佐迚ｩ縺ｮ諱ｯ縺ｮ譬ｹ繧呈ｭ｢繧√ｋ縺�繧阪≧縲�',
    hp:25, attack:40, defense:15, speed:20, luck:10, skill:'haisui', type:'beast',
  },
  {
    name:'繝輔ぉ繧｢繝ｪ繝ｼ繝励Μ繝ｳ繧ｻ繧ｹ', title:'蟷ｸ驕九ｒ繧ゅ◆繧峨☆螯也ｲｾ', icon:'�ｧ�',
    rumor:'縲悟ｽｼ螂ｳ縺ｮ蜻ｨ繧翫↓縺ｯ蟷ｸ驕九�蜈峨′貅縺｡縺ｦ縺�ｋ縲ょ･�ｷ｡逧�↑繧ｯ繝ｪ繝�ぅ繧ｫ繝ｫ繧帝｣逋ｺ縺励※縺上ｋ縺槭�',
    hp:15, attack:20, defense:5, speed:20, luck:50, skill:'shuriken', type:'bird',
  },
  {
    name:'繝代Λ繝�ぅ繝ｳ', title:'閨悶↑繧句ｮ郁ｭｷ鬨主｣ｫ', icon:'�孱��',
    rumor:'縲檎崟繧呈軸縺偵∫ｵｶ蟇ｾ縺ｫ蟠ｩ繧後↑縺�ｧ九∴繧偵→繧九る聞譛滓姶繧定ｦ壽ぁ縺励↑縺代ｌ縺ｰ縺ｪ繧峨↑縺��',
    hp:40, attack:20, defense:40, speed:5, luck:5, skill:'none', type:'other',
  },
  {
    name:'繝輔ぃ繝ｳ繝医Β繧ｷ繝ｼ繝�', title:'逾槫�鬯ｼ豐｡縺ｮ諤ｪ逶�', icon:'�自',
    rumor:'縲檎ｴ�譌ｩ縺�ｺｫ縺ｮ縺薙↑縺励〒謾ｻ謦�ｒ縺九ｏ縺励∫�蟷輔�螯ゅ″謇玖｣丞殴縺ｧ遒ｺ螳溘↓霑ｽ縺�ｩｰ繧√※縺上ｋ縲�',
    hp:20, attack:25, defense:10, speed:35, luck:20, skill:'shuriken', type:'other',
  },
  {
    name:'繝輔ぉ繝ｳ繧ｵ繝ｼ', title:'闖ｯ鮗励↑繧句殴螢ｫ', icon:'�､ｺ',
    rumor:'縲梧姶縺��蠎冗乢縺ｫ譛繧る強縺�殴謚繧定ｦ九○繧九よ怙蛻昴�繧ｿ繝ｼ繝ｳ縺ｫ蜷ｹ縺冗ｪ�｢ｨ縺ｮ繧医≧縺ｪ騾｣謦�↓閠舌∴繧峨ｌ繧九°縲�',
    hp:25, attack:30, defense:15, speed:30, luck:10, skill:'firstwind', type:'other',
  },
  {
    name:'繧ｭ繝槭う繝ｩ', title:'蜷域�鬲皮坤', icon:'�ｦ�',
    rumor:'縲瑚､�焚縺ｮ迯｣縺ｮ蜉帙ｒ謖√■縲∵焔雋�縺�↓縺ｪ縺｣縺溘→縺阪�蜃ｶ證ｴ諤ｧ縺ｯ險医ｊ遏･繧後↑縺��',
    hp:30, attack:40, defense:20, speed:10, luck:10, skill:'haisui', type:'beast',
  },
  {
    name:'繝ｭ繧､繝､繝ｫ繧ｬ繝ｼ繝�', title:'邇矩� of 霑題｡帛�髟ｷ', icon:'�荘',
    rumor:'縲後≠繧峨ｆ繧玖�蜉帙′鬮俶ｰｴ貅悶よ怙蠕後�螢√→縺励※縲√≠縺ｪ縺溘�謌ｦ逡･縺ｮ縺吶∋縺ｦ縺瑚ｩｦ縺輔ｌ繧九□繧阪≧縲�',
    hp:29, attack:29, defense:27, speed:15, luck:10, skill:'none', type:'other',
  },
];

const DEFAULT_MONSTERS = () => [
  { name:'繧ｹ繝ｩ繧､繝�',         type:'slime',  hp:26, attack:11, defense:25, speed:20, luck:18, skill:'none' },
  { name:'繧｢繝ｫ繝輔ぃ繝峨Λ繧ｴ繝ｳ', type:'dragon', hp:15, attack:41, defense:10, speed:20, luck:14, skill:'none' },
  { name:'繧ｹ繝医�繝ｳ繧ｳ繝ｳ繧ｰ',   type:'golem',  hp:20, attack:11, defense:40, speed:15, luck:14, skill:'none' },
  { name:'繝上�繝斐ぅ繧ｯ繧､繝ｼ繝ｳ', type:'bird',   hp:11, attack:21, defense:10, speed:35, luck:23, skill:'firstwind' },
  { name:'繧ｵ繝ｼ繝吶Ν繧ｿ繧､繧ｬ繝ｼ', type:'beast',  hp:21, attack:21, defense:10, speed:20, luck:28, skill:'haisui' },
  { name:'繝槭Α繝ｼ繧ｹ繝溘せ',     type:'undead', hp:41, attack:16, defense:20, speed:10, luck:13, skill:'none' },
  { name:'繝励メ繝�ン繝ｫ',       type:'devil',  hp:16, attack:26, defense:20, speed:20, luck:18, skill:'shuriken' },
  { name:'繝槭Φ繝峨Λ繧ｴ繝ｩ',     type:'plant',  hp:21, attack:16, defense:25, speed:15, luck:23, skill:'none' },
  { name:'繧｢繧､繧｢繝ｳ繧ｮ繧ｬ',     type:'metal',  hp:15, attack:11, defense:20, speed:40, luck:14, skill:'firstwind' },
  { name:'繧ｭ繝ｳ繧ｰ繧ｹ繝ｩ繧､繝�',   type:'slime',  hp:36, attack:11, defense:25, speed:10, luck:18, skill:'haisui' },
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
let autoStrategy = 'gangan'; // 'gangan' (繧ｬ繝ｳ繧ｬ繝ｳ), 'inochi' (縺��縺｡螟ｧ莠九↓), 'batchiri' (繝舌ャ繝√Μ)
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
    bossRevengeUnlocked: false, // 蛻晄悄迥ｶ諷九〒縺ｯ繝ｭ繝�け
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
  if (winEl) winEl.textContent = `�醇 ${record.win || 0}`;
  if (loseEl) loseEl.textContent = `�逐 ${record.lose || 0}`;
  if (drawEl) drawEl.textContent = `�､� ${record.draw || 0}`;
}

// ============================================================
//  BGM MANAGEMENT SYSTEM (SoundManager)
// ============================================================
class BGMManager {
  constructor() {
    this.currentBGM = null;
    this.currentKey = null;
    this.bgmVolume = 0.5; // BGM髻ｳ驥� (0.0��1.0)
    this.seVolume = 0.5;  // SE髻ｳ驥� (0.0��1.0)
    
    // localStorage縺九ｉ髻ｳ驥剰ｨｭ螳壹ｒ蠕ｩ蜈�
    const savedBgm = localStorage.getItem('100pt_bgm_volume');
    const savedSe = localStorage.getItem('100pt_se_volume');
    if (savedBgm !== null) this.bgmVolume = parseFloat(savedBgm);
    if (savedSe !== null) this.seVolume = parseFloat(savedSe);
    
    // BGM繝輔ぃ繧､繝ｫ繝代せ螳夂ｾｩ�育嶌蟇ｾ繝代せ謖�ｮ壹�BGM1繝輔か繝ｫ繝蜀��螳溘ヵ繧｡繧､繝ｫ縺ｫ蟇ｾ蠢懶ｼ�
    this.bgmList = {
      title: './BGM1/OP BGM1.mp3',        // 繧ｿ繧､繝医Ν繝ｻ繝槭ャ繝礼判髱｢
      map: './BGM1/OP BGM1.mp3',          // 繝槭ャ繝礼判髱｢
      lab: './BGM1/raboBGM1.mp3',         // 繝ｩ繝懃判髱｢繝ｻ菴懈�逕ｻ髱｢
      normalBattle: './BGM1/battle��.mp3', // 騾壼ｸｸ繝舌ヨ繝ｫ�医Μ繝ｼ繧ｰ繝ｻ繝輔Μ繝ｼ繝ｻ蜍昴■謚懊″繝ｻ豁ｦ闊槫床��
      bossBattle: './BGM1/BOSSbattle��.mp3', // 隕�視繝懊せ謌ｦ繝ｻ繝√Η繝ｼ繝医Μ繧｢繝ｫ繝ｻ蜀肴姶繝懊せ
      victory: './BGM1/Victory.mp3',      // 蜍晏茜譎�
      lose: './BGM1/lose.mp3',             // 謨怜圏譎�
      
      towerSelect: './BGM1/Tower.mp3',       // 隧ｦ邱ｴ縺ｮ蝪� 繝｢繝ｳ繧ｹ繧ｿ繝ｼ驕ｸ蜃ｺ繝ｻ貅門ｙ逕ｻ髱｢
      colosseumSelect: './BGM1/Colosseum.mp3',// 繧ｳ繝ｭ繝�す繧｢繝� 繝｢繝ｳ繧ｹ繧ｿ繝ｼ驕ｸ蜃ｺ繝ｻ貅門ｙ逕ｻ髱｢

      bubutai: './BGM1/bubutai.mp3',         // 豁ｦ闊槫床
      p2pShrine: './BGM1/P2PBGM.mp3',        // 逡ｰ谺｡蜈��逾�

      haouPrep: './BGM1/haou.mp3',           // 隕�視繝舌ヨ繝ｫ貅門ｙ逕ｻ髱｢
      shop: './BGM1/syouten.mp3'             // 蝠�ｺ礼判髱｢
    };
  }

  // BGM縺ｮ蜀咲函�亥酔縺俶峇縺梧ｵ√ｌ縺ｦ縺�ｋ蝣ｴ蜷医�邯咏ｶ壼�逕滂ｼ�
  play(key, isLoop = true) {
    if (this.currentKey === key && this.currentBGM && !this.currentBGM.paused) {
      return; // 縺吶〒縺ｫ蜷後§譖ｲ縺悟�逕滉ｸｭ縺ｪ繧我ｽ輔ｂ縺励↑縺�
    }

    // 迴ｾ蝨ｨ蜀咲函荳ｭ縺ｮBGM繧貞●豁｢
    this.stop();

    const filePath = this.bgmList[key];
    if (!filePath) {
      console.warn(`BGM Key "${key}" に対応する音源が見つかりません。`);
      return;
    }

    this.currentBGM = new Audio(filePath);
    this.currentBGM.loop = true; // 蜈ｨ縺ｦ縺ｮBGM繧貞ｸｸ縺ｫ繝ｫ繝ｼ繝怜�逕�
    this.currentBGM.volume = this.bgmVolume;
    
    this.currentBGM.play().catch(err => {
      // 繝ｦ繝ｼ繧ｶ繝ｼ縺檎判髱｢謫堺ｽ懊☆繧句燕縺ｮ閾ｪ蜍募�逕溘ヶ繝ｭ繝�け�医ヶ繝ｩ繧ｦ繧ｶ莉墓ｧ假ｼ牙ｯｾ遲�
      console.log("繝ｦ繝ｼ繧ｶ繝ｼ謫堺ｽ懊ｒ蠕�ｩ滉ｸｭ: " + err);
    });

    this.currentKey = key;
  }

  // BGM縺ｮ蛛懈ｭ｢
  stop() {
    if (this.currentBGM) {
      this.currentBGM.pause();
      this.currentBGM.currentTime = 0;
      this.currentBGM = null;
    }
    this.currentKey = null;
  }

  // BGM縺ｮ荳譎ょ●豁｢�医ヰ繝�け繧ｰ繝ｩ繧ｦ繝ｳ繝臥ｧｻ陦梧凾逕ｨ��
  pause() {
    if (this.currentBGM && !this.currentBGM.paused) {
      this.currentBGM.pause();
    }
  }

  // BGM縺ｮ蜀咲函蜀埼幕�医ヵ繧ｩ繧｢繧ｰ繝ｩ繧ｦ繝ｳ繝牙ｾｩ蟶ｰ譎ら畑��
  resume() {
    if (this.currentBGM && this.currentBGM.paused && this.currentKey) {
      this.currentBGM.play().catch(() => {});
    }
  }

  // BGM髻ｳ驥上�險ｭ螳�
  setBgmVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.currentBGM) {
      this.currentBGM.volume = this.bgmVolume;
    }
    localStorage.setItem('100pt_bgm_volume', this.bgmVolume.toString());
  }

  // SE髻ｳ驥上�險ｭ螳�
  setSeVolume(vol) {
    this.seVolume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('100pt_se_volume', this.seVolume.toString());
  }

  // SE蜀咲函逕ｨ繝倥Ν繝代�
  playSE(filePath) {
    const se = new Audio(filePath);
    se.volume = this.seVolume;
    se.play().catch(() => {});
  }
}

// 繧ｰ繝ｭ繝ｼ繝舌Ν繧､繝ｳ繧ｹ繧ｿ繝ｳ繧ｹ蛹�
window.bgmManager = new BGMManager();

// 蛻晏屓繧ｯ繝ｪ繝�け/繧ｿ繝��譎ゅ↓繝悶Λ繧ｦ繧ｶ縺ｮ髻ｳ螢ｰ閾ｪ蜍募�逕溘ヶ繝ｭ繝�け繧定ｧ｣髯､
document.addEventListener('click', () => {
  if (window.bgmManager && window.bgmManager.currentBGM && window.bgmManager.currentBGM.paused && window.bgmManager.currentKey) {
    window.bgmManager.currentBGM.play().catch(() => {});
  }
}, { once: false });

// 繝舌ャ繧ｯ繧ｰ繝ｩ繧ｦ繝ｳ繝牙�繧頑崛縺茨ｼ医ち繝也ｧｻ蜍輔�繧｢繝励Μ髱槭い繧ｯ繝�ぅ繝厄ｼ画凾縺ｮ閾ｪ蜍穂ｸ譎ょ●豁｢ / 蠕ｩ蟶ｰ蛻ｶ蠕｡
let isGamePausedByVisibility = false;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 1. 繝舌ャ繧ｯ繧ｰ繝ｩ繧ｦ繝ｳ繝臥ｧｻ蜍墓凾: BGM繧剃ｸ譎ょ●豁｢
    if (window.bgmManager) {
      window.bgmManager.pause();
    }
    // 2. 繝舌ヨ繝ｫ縺ｮ諤晁�ち繧､繝槭��医き繧ｦ繝ｳ繝医ム繧ｦ繝ｳ�峨�荳譎ょ●豁｢
    if (typeof battleTimerInterval !== 'undefined' && battleTimerInterval) {
      clearInterval(battleTimerInterval);
      battleTimerInterval = null;
      isGamePausedByVisibility = true;
    }
  } else {
    // 3. 繝輔か繧｢繧ｰ繝ｩ繧ｦ繝ｳ繝牙ｾｩ蟶ｰ譎�: BGM蜀咲函縺ｮ蜀埼幕
    if (window.bgmManager) {
      window.bgmManager.resume();
    }
    // 4. 諤晁�ち繧､繝槭�縺御ｸ譎ょ●豁｢荳ｭ縺ｧ縺ゅｌ縺ｰ蜀埼幕
    if (isGamePausedByVisibility) {
      isGamePausedByVisibility = false;
      if (typeof startThinkingTimer === 'function' && typeof isPlayerTurn !== 'undefined' && isPlayerTurn) {
        startThinkingTimer();
      }
    }
  }
});

// ============================================================
//  SETTINGS MODAL (髻ｳ驥剰ｨｭ螳�)
// ============================================================
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  // 繧ｹ繝ｩ繧､繝繝ｼ縺ｮ蛟､繧堤樟蝨ｨ縺ｮ髻ｳ驥上↓蜷梧悄
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

// 縲�1縲題ｩｦ邱ｴ縺ｮ蝪斐�繝｢繝ｳ繧ｹ繧ｿ繝ｼ驕ｸ蜃ｺ逕ｻ髱｢繧定｡ｨ遉ｺ縺励◆譎�
function showTowerMonsterSelectScene() {
  if (window.bgmManager) {
    window.bgmManager.play('towerSelect', true); // Tower.mp3 繧偵Ν繝ｼ繝怜�逕�
  }
}

// 縲�2縲代さ繝ｭ繧ｷ繧｢繝�縺ｮ繝｢繝ｳ繧ｹ繧ｿ繝ｼ驕ｸ蜃ｺ逕ｻ髱｢繧定｡ｨ遉ｺ縺励◆譎�
function showColosseumMonsterSelectScene() {
  if (window.bgmManager) {
    window.bgmManager.play('colosseumSelect', true); // Colosseum.mp3 繧偵Ν繝ｼ繝怜�逕�
  }
}

// 縲�3縲第ｭｦ闊槫床逕ｻ髱｢�上せ繝��繧ｸ繧定｡ｨ遉ｺ縺励◆譎�
function showBubutaiScene() {
  if (window.bgmManager) {
    window.bgmManager.play('bubutai', true); // bubutai.mp3 繧偵Ν繝ｼ繝怜�逕�
  }
}

// 縲�4縲醍焚谺｡蜈��逾�逕ｻ髱｢�上せ繝��繧ｸ繧定｡ｨ遉ｺ縺励◆譎�
function showP2PShrineScene() {
  if (window.bgmManager) {
    window.bgmManager.play('p2pShrine', true); // P2PBGM.mp3 繧偵Ν繝ｼ繝怜�逕�
  }
}

// 縲�5縲題ｦ�視繝舌ヨ繝ｫ縺ｮ貅門ｙ�磯∈蜃ｺ�臥判髱｢繧定｡ｨ遉ｺ縺励◆譎�
function showHaouPrepScene() {
  if (window.bgmManager) {
    window.bgmManager.play('haouPrep', true); // haou.mp3 繧偵Ν繝ｼ繝怜�逕�
  }
}

// 縲�6縲大膚蠎礼判髱｢繧定｡ｨ遉ｺ縺励◆譎�
function showShopScene() {
  if (window.bgmManager) {
    window.bgmManager.play('shop', true); // syouten.mp3 繧偵Ν繝ｼ繝怜�逕�
  }
}

//  NEW LAB & CREATOR SYSTEM (V3 Schema)
// ============================================================

let playerName = '';
let labMonstersSolo = []; // Max 6, for league and survival
let labMonstersFree = []; // Max 6, for free battle
let creatorReturnToScouting = false; // Flag to redirect after manual creation

let currentLabMode = 'story'; // 'story' (繧ｹ繝医�繝ｪ繝ｼ逕ｨ), 'free' (繝輔Μ繝ｼ繝舌ヨ繝ｫ逕ｨ)

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
      labCount.textContent = '�箔 隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ: 30 / 30 (繝輔Μ繝ｼ蟇ｾ謌ｦ�壼�隗｣謾ｾ)';
      labCount.style.color = 'var(--accent-cyan)';
    } else {
      const sp = getSkillProgress();
      labCount.textContent = '�箔 隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ: ' + sp.count + ' / ' + sp.total;
      labCount.style.color = 'var(--accent-gold)';
    }
  }
  
  const monstersCount = document.getElementById('lab-monsters-count');
  if (monstersCount) {
    monstersCount.textContent = '逋ｻ骭ｲ謨ｰ: ' + getActiveLab().length + ' / 6';
  }
}

let creatorStep = 1;

let currentGameMode = 'league'; // 'league', 'survival', 'free'
let unlockedSkills = []; // IDs of unlocked prize skills
let survivalWins = 0;
let survivalBestRecord = 0;

// Tutorial & Story Progression
let gameProgress = {
  tutorialStep: 0,   // 0:譁ｰ隕� 1:OP螳御ｺ��繝ｩ繝懆ｪ伜ｰ� 2:蛻昜ｻ｣菴懈�螳御ｺ��繝懊せ隱伜ｰ� 3:蛻晄風蛹冷�蜀堺ｽ懈� 4:螳御ｺ�
  bossRevengeUnlocked: false,
  bossDefeated: false,
};

const TUTORIAL_BOSS = {
  name: '隕�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ',
  title: '髣俶橿蝣ｴ縺ｮ隕�視',
  icon: '�損',
  rumor: '髣俶橿蝣ｴ縺ｧ謨ｰ螟壹�謖第姶閠�ｒ騾縺代※縺阪◆譛蠑ｷ縺ｮ蟄伜惠縲よ悴遏･縺ｮ繧ｹ繧ｭ繝ｫ繧剃ｽｿ縺�→縺�≧蝎ゅｂ窶ｦ',
  hp: 99, attack: 80, defense: 60, speed: 50, luck: 50,
  skill: 'gigabreak', type: 'other'
};

const HAOU_REVENGE_BOSS = {
  name: '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ',
  title: '髣俶橿蝣ｴ縺ｮ隕�視 (繝ｪ繝吶Φ繧ｸ)',
  icon: '�損',
  rumor: '縺吶∋縺ｦ縺ｮ繧ｹ繧ｭ繝ｫ繧呈･ｵ繧√＠遐皮ｩｶ閠�→蟇ｾ蟲吶☆繧玖ｦ�視縺ｮ蜈ｨ蜉帙りｶ�ｫ倡↓蜉帙�邏呵蝉ｹ��讌ｵ髯舌ン繝ｫ繝会ｼ�',
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
  editingLabIndex: null  // 繝ｪ繧ｻ繝�ヨ阮ｬ邨檎罰縺ｮ蜀埼�蛻�凾縺ｫ蟇ｾ雎｡繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｮ繧､繝ｳ繝�ャ繧ｯ繧ｹ繧剃ｿ晄戟
};

// V3 Schemas and default configurations
// (Old save/load removed - using V3 split lab version below)

// Custom screen navigation overrides

function updateCreatorPreview() {
  if (!creatorTemp) return;
  const pName = creatorTemp.name || '縺ｪ縺ｪ縺励�繝｢繝ｳ繧ｹ繧ｿ繝ｼ';
  const pClass = creatorTemp.monsterClass || '譛ｪ驕ｸ謚�';
  const pSys = creatorTemp.systemType || '繝峨Λ繧ｴ繝ｳ邉ｻ';
  
  // 1. Name & details
  const nameEl = document.getElementById('cr-preview-name');
  const classEl = document.getElementById('cr-preview-class');
  if (nameEl) nameEl.textContent = pName;
  if (classEl) classEl.textContent = `${pSys} / ${pClass}`;
  
  // 2. Monster visual
  const visualEl = document.getElementById('cr-preview-visual');
  if (visualEl) {
    const sysKey = Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === pSys) || 'other';
    const defaultIcon = MONSTER_TYPES[sysKey] ? MONSTER_TYPES[sysKey].icon : '�栖';
    
    if (typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined' && ADDITIONAL_MONSTER_IMAGES[pClass]) {
      visualEl.innerHTML = `<img src="${ADDITIONAL_MONSTER_IMAGES[pClass]}" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧｢繝ｫ繝輔ぃ繝峨Λ繧ｴ繝ｳ') {
      visualEl.innerHTML = `<img src="IMG/dragon�羨.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧､繝ｳ繝輔ぉ繝ｫ繝弱せ') {
      visualEl.innerHTML = `<img src="IMG/dragon�但.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｪ繝｡繧ｬ繧ｫ繧､繧ｶ繝ｼ') {
      visualEl.innerHTML = `<img src="IMG/dragon�鄭.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｹ繝医�繝ｳ繧ｳ繝ｳ繧ｰ') {
      visualEl.innerHTML = `<img src="IMG/go-remu1A_.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｸ繧ｧ繧､繝峨ぎ繝ｼ繝�ぅ繧｢繝ｳ') {
      visualEl.innerHTML = `<img src="IMG/go-remu2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｮ繧ｬ繧ｹ繝医�繝ｳ') {
      visualEl.innerHTML = `<img src="IMG/go-remu3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝上�繝斐ぅ繧ｯ繧､繝ｼ繝ｳ') {
      visualEl.innerHTML = `<img src="IMG/tori1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｬ繝ｫ繝ｼ繝') {
      visualEl.innerHTML = `<img src="IMG/tori2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｰ繝ｪ繝輔か繝九け繧ｹ') {
      visualEl.innerHTML = `<img src="IMG/tori3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｵ繝ｼ繝吶Ν繧ｿ繧､繧ｬ繝ｼ') {
      visualEl.innerHTML = `<img src="IMG/kemono1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｭ繝槭う繝ｩ繝ｭ繝ｼ繝�') {
      visualEl.innerHTML = `<img src="IMG/kemono2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝輔ぉ繝ｳ繝ｪ繝ｫ') {
      visualEl.innerHTML = `<img src="IMG/kemono3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝槭Α繝ｼ繧ｹ繝溘せ') {
      visualEl.innerHTML = `<img src="IMG/anded1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝輔ぃ繝ｳ繝医Β繝翫う繝�') {
      visualEl.innerHTML = `<img src="IMG/anded2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝�せ繧ｵ繧､繧ｺ') {
      visualEl.innerHTML = `<img src="IMG/anded3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｹ繝ｩ繧､繝�') {
      visualEl.innerHTML = `<img src="IMG/suraim1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｭ繝ｳ繧ｰ繧ｹ繝ｩ繧､繝�') {
      visualEl.innerHTML = `<img src="IMG/suraim2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｴ繝�ラ繧ｼ繝ｪ繝ｼ') {
      visualEl.innerHTML = `<img src="IMG/suraim3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝励メ繝�ン繝ｫ') {
      visualEl.innerHTML = `<img src="IMG/devil1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｵ繧ｭ繝･繝舌せ') {
      visualEl.innerHTML = `<img src="IMG/devil2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝吶Ν繧ｼ繝舌ヶ') {
      visualEl.innerHTML = `<img src="IMG/devil3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝槭Φ繝峨Λ繧ｴ繝ｩ') {
      visualEl.innerHTML = `<img src="IMG/natu1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧｢繝ｫ繝ｩ繧ｦ繝�') {
      visualEl.innerHTML = `<img src="IMG/natu2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '荳也阜讓ｹ縺ｮ逵ｷ螻�') {
      visualEl.innerHTML = `<img src="IMG/natu3A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧｢繧､繧｢繝ｳ繧ｮ繧ｬ') {
      visualEl.innerHTML = `<img src="IMG/metar1A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繝｡繧ｿ繝ｫ繝薙ャ繝�') {
      visualEl.innerHTML = `<img src="IMG/metar2A.png" style="height: 100px; width: auto; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35));">`;
    } else if (pClass === '繧ｸ繧ｧ繝弱し繧､繝繝ｼ') {
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
    if (skillNameEl) skillNameEl.textContent = `笞｡ ${actSk.name} (MP: 8)`;
    if (skillDescEl) skillDescEl.textContent = `縲先判謦�せ繧ｭ繝ｫ縲�${actSk.desc}`;
  } else if (pasSk && pasSk.id !== 'none') {
    if (skillNameEl) skillNameEl.textContent = `�孱�� ${pasSk.name} (MP 8縺ｧ閾ｪ蜍慕匱蜍�)`;
    if (skillDescEl) skillDescEl.textContent = `縲舌ヱ繝�す繝悶せ繧ｭ繝ｫ縲�${pasSk.desc}`;
  } else {
    if (skillNameEl) skillNameEl.textContent = '縺ｪ縺�';
    if (skillDescEl) skillDescEl.textContent = '繧ｹ繧ｭ繝ｫ縺碁∈謚槭＆繧後※縺�∪縺帙ｓ縲�';
  }
}

function goScreen(name) {
  // Clear battle timers and logs if transitioning screens
  battleTimers.forEach(t => clearTimeout(t));
  battleTimers = [];
  if (typeof clearLog === 'function') clearLog();

  // BGM蜀咲函蛻ｶ蠕｡
  if (window.bgmManager) {
    if (name === 'lab' || name === 'creator') {
      window.bgmManager.play('lab', true);
    } else if (name === 'scouting') {
      if (currentGameMode === 'survival') {
        window.bgmManager.play('towerSelect', true);     // Tower.mp3
      } else if (currentGameMode === 'boss-revenge') {
        window.bgmManager.play('haouPrep', true);        // haou.mp3 (隕�視繝舌ヨ繝ｫ貅門ｙ逕ｻ髱｢)
      } else {
        window.bgmManager.play('colosseumSelect', true); // Colosseum.mp3
      }
    } else if (name === 'reward-shop') {
      window.bgmManager.play('shop', true);              // syouten.mp3 (蝠�ｺ礼判髱｢)
    } else if (name === 'free-battle-lobby') {
      window.bgmManager.play('p2pShrine', true);          // P2PBGM.mp3 (逡ｰ谺｡蜈��逾�)
    } else if (name === 'team-arena-menu' || name === 'ta-party' || name === 'ta-progress') {
      window.bgmManager.play('bubutai', true);            // bubutai.mp3 (豁ｦ闊槫床)
    } else if (name === 'battle') {
      const isBoss = (currentEnemy && (currentEnemy.name === '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ' || currentEnemy.name === '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ(蜀肴姶)')) || currentGameMode === 'boss-revenge';
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
      } else if (currentGameMode === 'free') {
        battleWrapper.style.backgroundImage = "url('IMGTITLE/taijinp2p.jpg')";
        battleWrapper.style.backgroundSize = "cover";
        battleWrapper.style.backgroundPosition = "center bottom";
        battleWrapper.style.backgroundRepeat = "no-repeat";
      } else if (currentGameMode === 'team-arena') {
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
    if (nameEl) nameEl.textContent = '遐皮ｩｶ閠�: ' + playerName;
  }

  if (name === 'lab') {
    document.getElementById('tab-lab').classList.add('active');
    switchLabMode('story');
    triggerFirstTimeHelp('lab');

    // Tutorial Phase 2: Auto-create first monster
    // Tutorial Phase 2: Auto-create first monster & transition to Colosseum
    if (gameProgress.tutorialStep === 1) {
      // 繝｡繝�そ繝ｼ繧ｸ1�医Λ繝懷芦驕疲凾��
      showStoryDialog([
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後％繧後′邇矩�縺ｮ繝ｩ繝懊°縲√＆縺吶′縺�縺ｪ縲ゅｈ縺励∵焔蟋九ａ縺ｫ閾ｪ諷｢縺ｮ繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧剃ｽ懊ｍ縺�ｼ√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      ], () => {
        // 繝｢繝ｳ繧ｹ繧ｿ繝ｼ逕滓�貍泌� & 繝昴メ閾ｪ蜍慕函謌�
        if (window.soundManager && typeof window.soundManager.playSE === 'function') {
          try { window.soundManager.playSE('create'); } catch(e) {}
        }
        
        const starterMonster = {
          name: '繝昴メ',
          systemType: '繧ｹ繝ｩ繧､繝�邉ｻ',
          monsterClass: '繧ｹ繝ｩ繧､繝�',
          stats: { hp: 20, attack: 20, defense: 20, speed: 20, luck: 20 },
          skills: { active: ['none'], passive: ['none'] }
        };
        labMonstersSolo.push(starterMonster);
        gameProgress.tutorialStep = 2;
        save();
        renderLabGrid();

        // 繝｡繝�そ繝ｼ繧ｸ2�医�繝∬ｪ慕函蠕鯉ｼ�
        showStoryDialog([
          { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後ｈ縺励〒縺阪◆�∫視驛ｽ繝｢繝ｳ繧ｹ繧ｿ繝ｼ�大捷縺ｮ繝昴メ縺��√さ繧､繝�→蜈ｱ縺ｫ縺薙�蝗ｽ縺ｧ荳逡ｪ蠑ｷ縺�･ｴ縺ｫ謖第姶縺励※縲∽ｸ豌励↓蜷榊燕繧貞｣ｲ縺｣縺ｦ繧�ｋ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        ], () => {
          // 繝｡繝�そ繝ｼ繧ｸ2縺ｮ繧ｿ繝��蠕後√さ繝ｭ繧ｷ繧｢繝�縺ｸ縺ｮ閾ｪ蜍慕ｧｻ蜍墓ｼ泌�
          onPochiCreatedStoryEnd();
        });
      });
    }

    // Tutorial Phase 3: Return after defeat
    if (gameProgress.tutorialStep === 3) {
      showStoryDialog([
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後￥縺｣縺昴懊懶ｼ� 險縺�◆縺�叛鬘瑚ｨ縺�ｄ縺後▲縺ｦ窶ｦ窶ｦ�� 縺ｧ繧ゅ∵ｔ縺励＞縺代←縺ゅ＞縺､縺ｮ險縺�壹ｊ縺�縲よ焔繧りｶｳ繧ょ�縺ｪ縺九▲縺溪ｦ窶ｦ縲ゅ�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後弱せ繝��繧ｿ繧ｹ縺ｮ蜑ｲ繧頑険繧翫上→縲弱せ繧ｭ繝ｫ縲上°窶ｦ窶ｦ縲ゅｈ縺暦ｼ� 譁ｰ縺励＞繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧堤函謌舌＠縺ｦ縲∽ｻ雁ｺｦ縺ｯ縺｡繧�ｓ縺ｨ閠�∴縺ｦ繝昴う繝ｳ繝茨ｼ�100pt�峨ｒ謖ｯ繧雁�縺代※繧�ｋ�―n\nHP繧貞｢励ｄ縺励※荳謦�ｭｻ繧帝亟縺舌°縲∵判謦�↓蜈ｨ謖ｯ繧翫＠縺ｦ螟ｧ謚繧貞娼縺崎ｾｼ繧縺銀ｦ窶ｦ蠕�▲縺ｦ繧阪ｈ繝ｴ繧｣繧ｯ繧ｿ繝ｼ�� 谺｡縺ｫ莨壹▲縺滓凾縺ｯ縲√�縺｣縺上ｊ縺輔○縺ｦ繧�ｋ縺九ｉ縺ｪ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      ], null);
    }
  } else if (name === 'scouting') {
    document.getElementById('tab-scouting').classList.add('active');
    
    // 笘� 繧ｲ繝ｼ繝�繝｢繝ｼ繝峨↓蠢懊§縺ｦ繝代�繝�ぅ邱ｨ謌舌ョ繝ｼ繧ｿ繧貞ｼｷ蛻ｶ蛻�崛�医Λ繝懊�繧ｿ繝也憾諷九↓萓晏ｭ倥＠縺ｪ縺�ｼ�
    if (currentGameMode === 'free') {
      currentLabMode = 'free';  // 繝輔Μ繝ｼ繝舌ヨ繝ｫ 竊� 繝輔Μ繝ｼ逕ｨ邱ｨ謌�
    } else {
      currentLabMode = 'story'; // 隧ｦ邱ｴ縺ｮ蝪斐�繝ｪ繝ｼ繧ｰ謌ｦ繝ｻ豁ｦ闊槫床繝ｻ隕�視繝ｪ繝吶Φ繧ｸ 竊� 繧ｹ繝医�繝ｪ繝ｼ逕ｨ邱ｨ謌�
    }
    
    // 繧ｲ繝ｼ繝�繝｢繝ｼ繝峨↓蠢懊§縺ｦ繝舌ヨ繝ｫ蜑咲｢ｺ隱咲判髱｢縺ｮ閭梧勹繧貞虚逧��繧頑崛縺�
    const scoutScreen = document.getElementById('scouting-screen');
    if (scoutScreen) {
      if (currentGameMode === 'survival') {
        scoutScreen.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('IMGTITLE/sirenn1F.png')";
      } else {
        // 騾壼ｸｸ縺ｮ繝ｪ繝ｼ繧ｰ謌ｦ遲峨�謗ｧ縺亥ｮ､閭梧勹
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
    // 繝√Η繝ｼ繝医Μ繧｢繝ｫ�郁ｦ�視謌ｦ蜑搾ｼ我ｼ夊ｩｱ繧､繝吶Φ繝�
    if (gameProgress.tutorialStep === 2) {
      const startBtn = document.getElementById('btn-battle') || document.querySelector('.battle-start-btn');
      if (startBtn) {
        startBtn.disabled = true;
        startBtn.classList.remove('active');
        startBtn.style.opacity = '0.5';
        startBtn.style.pointerEvents = 'none';
      }
      showStoryDialog([
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後％縲√％繧後′隕�視縺九ゅ→繧薙〒繧ゅ↑縺�喧縺醍黄縺�縲ゅｈ縺暦ｼ√ｄ縺｣縺ｦ繧�ｋ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後♀縺�ｼ� 縺ゅｓ縺溘′縺薙�蝗ｽ縺ｧ荳逡ｪ蠑ｷ縺�▲縺ｦ縺�≧縲手ｦ�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ縲上□縺ｪ�� 繧ｪ繝ｬ縺ｨ繝舌ヨ繝ｫ縺励ｍ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: '隕�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '縲娯ｦ窶ｦ縺ｻ縺�りｦ区�繧後〓霄ｫ縺ｪ繧翫√◎縺励※豢礼ｷｴ縺輔ｌ縺ｦ縺�↑縺�｡斐▽縺坂ｦ窶ｦ迚�伐闊弱°繧牙�縺ｦ縺阪◆縺ｰ縺九ｊ縺ｮ譁ｰ邀ｳ縺九ゅ＞縺�□繧阪≧縲∫嶌謇九↓縺ｪ縺｣縺ｦ繧�ｋ縲らｧ√↓謖代�諢壹°縺輔↓縲√＞縺､豌励▼縺上°隕九ｂ縺ｮ縺�縺ｪ縲ゅ�', color: '#ef4444', speakerTextColor: '#fff' },
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
        tabScouting.textContent = '�両 隧ｦ邱ｴ縺ｮ蝪�';
      } else {
        tabScouting.textContent = '�醇 繝ｪ繝ｼ繧ｰ謌ｦ';
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
        stageDisplay.textContent = `隧ｦ邱ｴ縺ｮ蝪�: ${survivalWins}螻､`;
      }
    }
  }
}

// 1. Title -> Name input

// 蜈ｨ菴薙�譛蛻昴�繧ｯ繝ｪ繝�け縺ｧ閾ｪ蜍慕噪縺ｫ譛驕ｩ繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ蛹悶☆繧九げ繝ｭ繝ｼ繝舌Ν繝ｪ繧ｹ繝翫�
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

// 繝�ヰ繧､繧ｹ繝ｻOS閾ｪ蜍募愛螳壼ｯｾ蠢懊ヵ繝ｫ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ隕∵ｱ�
function requestDeviceFullscreen() {
  const el = document.documentElement;
  const ua = navigator.userAgent.toLowerCase();
  
  // 繝�ヰ繧､繧ｹ縺ｮ邁｡譏灘愛蛻･
  const isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/.test(ua);
  const isMobile = isIOS || isAndroid || /mobi|mini|fennec|iemobile|opera mobi/i.test(ua);

  // 讓呎ｺ悶♀繧医�蜷��繝ｳ繝繝ｼ縺ｮ繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳAPI
  const requestFS = el.requestFullscreen || 
                    el.webkitRequestFullscreen || 
                    el.mozRequestFullScreen || 
                    el.msRequestFullscreen;

  if (requestFS) {
    requestFS.call(el).then(() => {
      // 繝｢繝舌う繝ｫ遶ｯ譛ｫ縺ｧ逕ｻ髱｢蜷代″繝ｭ繝�け縺悟茜逕ｨ蜿ｯ閭ｽ縺ｪ蝣ｴ蜷医�縲√ご繝ｼ繝�蜷代″縺ｮ讓ｪ逕ｻ髱｢(landscape)縺ｫ繝ｭ繝�け
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
    // API髱槫ｯｾ蠢懊ョ繝舌う繧ｹ�井ｸｻ縺ｫiPhone Safari�峨�莉ｮ諠ｳ繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ縺ｫ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ
    fallbackVirtualFullscreen();
  }
}

// 莉ｮ諠ｳ繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ��SS縺ｧ逕ｻ髱｢譛螟ｧ蛹厄ｼ�
function fallbackVirtualFullscreen() {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  if (isIOS) {
    // iOS Safari逕ｨ繧｢繝峨Ξ繧ｹ繝舌�閾ｪ蜍暮撼陦ｨ遉ｺ蛹悶ワ繝�け
    window.scrollTo(0, 1);
  }
  
  document.body.classList.add('virtual-fullscreen');
  
  // 繝｡繧ｿ繧ｿ繧ｰ縺ｮviewport繧偵ヴ繝ｳ繝√ぜ繝ｼ繝�辟｡蜉ｹ繝ｻ逕ｻ髱｢蟷�怙螟ｧ縺ｫ譖ｴ譁ｰ
  let viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover");
  }
}

// 繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ隗｣髯､
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
  // 閾ｪ蜍募愛蛻･繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ
  requestDeviceFullscreen();
}

function showNameDialog() {
  // 繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ繧､繝ｳ繧ｿ繝ｩ繧ｯ繧ｷ繝ｧ繝ｳ螂第ｩ溘〒譛驕ｩ繝輔Ν繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧定ｵｷ蜍�
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
    // 蜷榊燕蜈･蜉帷判髱｢繧帝哩縺倥※繝槭ャ繝礼判髱｢繧定｡ｨ遉ｺ縺励√◎縺ｮ荳翫〒繧ｪ繝ｼ繝励ル繝ｳ繧ｰ繝｡繝�そ繝ｼ繧ｸ繧定｡ｨ遉ｺ
    goScreen("main-menu");
    showStoryDialog([
      { speaker: playerName, text: "縺吶▲縺偵∴窶ｦ窶ｦ�� 縺薙ｌ縺檎視驛ｽ縺具ｼ� 莠ｺ繧り｡励ｂ隕九◆縺薙→縺ｪ縺�ョ繧ｫ縺輔□��", color: "var(--accent-cyan)", speakerTextColor: "#000" },
      { speaker: "繝翫Ξ繝ｼ繧ｷ繝ｧ繝ｳ", text: "迚�伐闊弱�譚代°繧芽�蛻��蜉帙ｒ隧ｦ縺励◆縺上※邇矩�縺ｫ蜃ｺ縺ｦ縺阪◆荳ｻ莠ｺ蜈ｬ縲�n縺薙�邇矩�縺ｧ譛蠑ｷ縺ｮ繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧剃ｽ懊ｊ蜷阪ｒ螢ｲ繧阪≧縺ｨ驥主ｿ�ｒ辯�ｄ縺吶�n縺薙�邇矩�縺ｫ縺ｯ蠑ｷ螟ｧ縺ｪ繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧堤紫縺�ｋ迪幄�◆縺｡縺碁寔縺�さ繝ｭ繧ｷ繧｢繝�縺後≠繧九�n縺ｾ縺壹�遐皮ｩｶ謇縺ｧ閾ｪ蛻�□縺代�繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧堤函縺ｿ蜃ｺ縺昴≧��", color: "var(--accent-gold)" },
      { speaker: playerName, text: "縺ｾ縺壹�繝ｩ繝懊□�√Δ繝ｳ繧ｹ繧ｿ繝ｼ繧剃ｽ懊▲縺ｦ菫ｺ縺ｮ繝�ン繝･繝ｼ謌ｦ縺���", color: "var(--accent-cyan)", speakerTextColor: "#000" },
    ], () => {
      onOpeningStoryEnd();
    });
  } else {
    goScreen("main-menu");
  }
}
function onOpeningStoryEnd() {
  // 1. 繝�く繧ｹ繝医え繧｣繝ｳ繝峨え繧帝哩縺倥ｋ
  const overlay = document.getElementById("story-dialog-overlay");
  if (overlay) overlay.style.display = "none";

  // 繝√Η繝ｼ繝医Μ繧｢繝ｫ繧ｹ繝�ャ繝玲峩譁ｰ縺ｨ繧ｻ繝ｼ繝� (Step 1: 繝励Ξ繧､繝､繝ｼ縺ｮ繝ｩ繝懊ち繝��蠕�■)
  gameProgress.tutorialStep = 1;
  save();

  // 2. 繝槭ャ繝礼判髱｢繧定｡ｨ遉ｺ�郁レ譎ｯ�夂視驛ｽ繝槭ャ繝暦ｼ�
  goScreen("main-menu");

  // 3. 繝槭ャ繝嶺ｸ翫�縲後Λ繝懶ｼ育�皮ｩｶ謇�峨阪い繧､繧ｳ繝ｳ繧貞ｼｷ隱ｿ繝上う繝ｩ繧､繝茨ｼ医ち繝��隱伜ｰ趣ｼ�
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
  countDisplay.textContent = `逋ｻ骭ｲ謨ｰ: ${activeLab.length} / ${maxMonsterSlots}`;
  
  // 1繝壹繧ｸ縺ゅ◆繧6譫陦ｨ遉ｺ縺ｮ蛻ｶ蠕｡域怙螟ｧ繧ｹ繝ｭ繝ヨ謨ｰ蝓ｺ貅悶〒繝壹繧ｸ繧呈ｱｺ螳夲ｼ
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
        <div onclick="selectLabMonster(${globalIndex}, false)" style="width: 100%; text-align: center; cursor: pointer;" title="繧ｯ繝ｪ繝�け縺ｧ驕ｸ謚�">
          <div style="font-weight:bold; font-size:18px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.name}</div>
          <div style="font-size:12px; color:var(--text-dim); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.monsterClass}</div>
        </div>
        
        <!-- Clickable Visual Area to open modal detail window -->
        <div onclick="selectLabMonster(${globalIndex}, true)" style="height: 75px; display:flex; align-items:center; justify-content:center; cursor:pointer; width:100%; background:transparent; border-radius:6px; border: 1px dashed rgba(255,255,255,0.12);" title="逕ｻ蜒上け繝ｪ繝�け縺ｧ隧ｳ邏ｰ陦ｨ遉ｺ">
          ${getMonsterVisualHTML(m.monsterClass, m.systemType, '60px')}
        </div>
        
        <!-- Inline controls directly in card slot -->
        <div style="width: 100%;">
          <div style="display:flex; gap:4px; margin-bottom:4px; width:100%;">
            <button class="btn-secondary" style="padding:2px 4px; font-size:13px; flex:1;" onclick="moveMonster(${globalIndex}, -1)" ${globalIndex === 0 ? 'disabled' : ''}>笳</button>
            <button class="btn-secondary" style="padding:2px 4px; font-size:13px; flex:1;" onclick="moveMonster(${globalIndex}, 1)" ${globalIndex === activeLab.length - 1 ? 'disabled' : ''}>笆ｶ</button>
          </div>
          <div style="display:flex; gap:4px; width:100%;">
            <button class="btn-secondary" style="border-color:rgba(245,158,11,0.3); color:var(--accent-gold); padding:2px 4px; font-size:13px; flex:1.2; display:flex; align-items:center; justify-content:center; gap:2px;" onclick="renameMonster(${globalIndex})">笨擾ｸ� 謾ｹ蜷�</button>
            <button class="btn-secondary" style="border-color:rgba(239,68,68,0.4); color:var(--accent-red); padding:2px 4px; font-size:13px; flex:1;" onclick="deleteMonster(${globalIndex})">�逃 蛻･繧�</button>
          </div>
        </div>
      `;
    } else if (globalIndex < maxMonsterSlots) {
      // Unlocked empty slot
      card.className = 'monster-card-6 empty';
      card.style.height = '230px';
      card.style.minHeight = '230px';
      card.innerHTML = `
        <button class="empty-create-btn" onclick="startManualCreate()">�� 隱ｿ蜷�</button>
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
        <div style="font-size:24px; color:rgba(255,255,255,0.15); margin-bottom: 4px;">�白</div>
        <div style="font-size:11px; color:rgba(255,255,255,0.25);">繧ｱ繝ｼ繧ｸ譛ｪ髢区叛<br>(繧｢繧､繝�Β縺ｧ諡｡蠑ｵ)</div>
      `;
    }
    grid.appendChild(card);
  }

  // 繝壹�繧ｸ繝阪�繧ｷ繝ｧ繝ｳUI縺ｮ譖ｴ譁ｰ
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
    name: '�抽 繧ｹ繝��繧ｿ繧ｹ繝ｪ繧ｻ繝�ヨ阮ｬ',
    desc: '蟇ｾ雎｡繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｮ繧ｹ繝��繧ｿ繧ｹ驟榊�繧貞�譛溷喧縺励�100pt繧貞�驟榊�縺ｧ縺阪∪縺吶�',
    icon: '�抽'
  },
  changeSkill: {
    name: '�糖 繧ｹ繧ｭ繝ｫ蜀肴ｧ区�阮ｬ',
    desc: '蟇ｾ雎｡繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｮ繧｢繧ｯ繝�ぅ繝悶せ繧ｭ繝ｫ繧偵Λ繝ｳ繝繝�縺ｫ螟画峩縺励∪縺吶�',
    icon: '�糖'
  },
  expandSlot2: {
    name: '�匠 繝｢繝ｳ繧ｹ繧ｿ繝ｼ譫�諡｡蠑ｵ (+2)',
    desc: '繝｢繝ｳ繧ｹ繧ｿ繝ｼ菫晉ｮ｡譫�繧� +2 諡｡蠑ｵ縺励∪縺吶�',
    icon: '�匠'
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
        <div style="font-size:13px; color:var(--accent-gold); margin-top:4px;">謇謖∵焚: <strong>${count}</strong></div>
      </div>
      <div style="margin-left:12px;">
        <button class="title-btn" style="padding:8px 16px; font-size:13px; ${!canUse ? 'opacity:0.4; cursor:not-allowed; background:#475569; color:#cbd5e1; box-shadow:none;' : ''}" 
          ${!canUse ? 'disabled' : ''} onclick="useLabItem('${itemId}')">菴ｿ逕ｨ</button>
      </div>
    `;
    container.appendChild(card);
  });

  if (!hasAny) {
    container.innerHTML = '<div style="text-align:center; color:var(--text-dim); padding:20px;">謇謖√い繧､繝�Β縺後≠繧翫∪縺帙ｓ縲�<br>繝舌ヨ繝ｫ蝣ｱ驟ｬ繧�す繝ｧ繝��縺ｧ蜈･謇九〒縺阪∪縺吶�</div>';
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
        // 蜈医↓resolve繧貞叙蠕励�螳溯｡後＠縺ｦ縺九ｉ繝｢繝ｼ繝繝ｫ繧帝哩縺倥ｋ
        // (closeMonsterSelectModal蜀�〒-1縺ｫresolve縺輔ｌ繧九�繧帝亟縺�)
        const r = _monsterSelectResolve;
        _monsterSelectResolve = null;
        // 繝｢繝ｼ繝繝ｫ繧定ｦ冶ｦ夂噪縺ｫ髢峨§繧�
        const md = document.getElementById('monster-select-modal');
        if (md) { md.classList.remove('active'); md.style.display = 'none'; }
        // 驕ｸ謚槭＆繧後◆繧､繝ｳ繝�ャ繧ｯ繧ｹ縺ｧresolve
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

  // 邉ｻ邨ｱ繝吶�繧ｹ蛟､縺ｮ險育ｮ�
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

  const statLabels = { hp: '笶､�� HP', attack: '笞費ｸ� 謾ｻ謦�', defense: '�孱�� 髦ｲ蠕｡', speed: '�暢 邏�譌ｩ', luck: '箝� 驕�' };

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

  // 繝｢繝ｳ繧ｹ繧ｿ繝ｼ蜷阪→迴ｾ蝨ｨ繧ｹ繧ｭ繝ｫ繧定｡ｨ遉ｺ
  document.getElementById('skill-popup-monster-name').textContent = monster.name;
  const curSkillId = (monster.skills && monster.skills.active && monster.skills.active[0]) || 'none';
  const curSkillInfo = SKILLS[curSkillId] || SKILLS.none;
  document.getElementById('skill-popup-current').textContent = `${curSkillInfo.icon || ''} ${curSkillInfo.name}`;

  // 隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ荳隕ｧ繧貞叙蠕�
  const availableSkills = Object.keys(SKILLS).filter(id => {
    if (id === 'none') return false;
    const sk = SKILLS[id];
    return sk.isInitial || unlockedSkills.includes(id);
  });

  const listEl = document.getElementById('skill-popup-list');
  listEl.innerHTML = '';

  if (availableSkills.length === 0) {
    listEl.innerHTML = '<div style="text-align:center; color:var(--text-dim); padding:20px;">隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ縺後≠繧翫∪縺帙ｓ縲�</div>';
  } else {
    // 繧ｫ繝�ざ繝ｪ蛻･縺ｫ蛻�｡�
    const categories = {};
    availableSkills.forEach(id => {
      const sk = SKILLS[id];
      const cat = sk.cat || '縺昴�莉�';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(id);
    });

    Object.entries(categories).forEach(([catName, skillIds]) => {
      // 繧ｫ繝�ざ繝ｪ繝倥ャ繝繝ｼ
      const catHeader = document.createElement('div');
      catHeader.style = 'font-size:12px; font-weight:bold; color:var(--accent-gold); margin-top:6px; padding:2px 4px; border-bottom:1px solid rgba(245,158,11,0.2);';
      catHeader.textContent = `笏笏 ${catName} 笏笏`;
      listEl.appendChild(catHeader);

      skillIds.forEach(id => {
        const sk = SKILLS[id];
        const isCurrent = (id === curSkillId);
        const btn = document.createElement('button');
        btn.style = `width:100%; text-align:left; padding:8px 12px; border-radius:8px; cursor:pointer; font-size:13px; border:1px solid ${isCurrent ? 'rgba(0,210,255,0.5)' : 'rgba(255,255,255,0.08)'}; background:${isCurrent ? 'rgba(0,210,255,0.12)' : 'rgba(255,255,255,0.03)'}; color:#fff; transition:background 0.2s, border-color 0.2s; display:flex; flex-direction:column; gap:2px;`;
        btn.innerHTML = `
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:16px;">${sk.icon || '笞｡'}</span>
            <span style="font-weight:bold; font-size:14px;">${sk.name}</span>
            <span style="font-size:11px; color:var(--text-dim); margin-left:auto;">${sk.type}</span>
            ${isCurrent ? '<span style="font-size:11px; color:var(--accent-cyan);">縲占｣�ｙ荳ｭ縲�</span>' : ''}
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
  showSystemModal(`「${m.name}」のスキルを変更しました！\n「${oldSkillName}」 → 「${(SKILLS[skillId] || SKILLS.none).name}」`);
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
        'ステータスリセット - 対象を選択',
        activeLab,
        (m, i) => `<span>${m.name}</span><span class="msc-sub">${m.systemType || ''}</span>`
      );
      if (idx < 0) return;
      const target = activeLab[idx];

      // 縺吶∋縺ｦ縺ｮ驕ｸ謚槭Δ繝ｼ繝繝ｫ繧呈ｶ亥悉
      if (typeof closeLabDetailModal === 'function') closeLabDetailModal();
      if (typeof closeLabItemModal === 'function') closeLabItemModal();
      if (typeof closeMonsterSelectModal === 'function') closeMonsterSelectModal();
      document.querySelectorAll('#monster-select-modal, #lab-item-modal, #lab-detail-modal').forEach(m => {
        m.style.display = 'none';
        m.classList.remove('active');
      });

      ownedItems.resetStats--;
      save();

      // 繝昴ャ繝励い繝��繝繧､繧｢繝ｭ繧ｰ蠖｢蠑上〒繧ｹ繝��繧ｿ繧ｹ蜀榊�驟攻I繧定｡ｨ遉ｺ
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
        'スキル再構成 - 対象を選択',
        activeLab,
        (m, i) => {
          const sk = m.skills && m.skills.active ? m.skills.active.map(s => (SKILLS[s] || SKILLS.none).name).join(', ') : 'なし';
          return `<span>${m.name}</span><span class="msc-sub">現在: ${sk}</span>`;
        }
      );
      if (idx < 0) return;
      const target = activeLab[idx];

      // 隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ縺ｮ蟄伜惠繝√ぉ繝�け
      const availableSkills = Object.keys(SKILLS).filter(id => {
        if (id === 'none') return false;
        const sk = SKILLS[id];
        return sk.isInitial || unlockedSkills.includes(id);
      });
      if (availableSkills.length === 0) {
        alert('隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ縺後≠繧翫∪縺帙ｓ縲�');
        return;
      }

      // 縺吶∋縺ｦ縺ｮ驕ｸ謚槭Δ繝ｼ繝繝ｫ繧呈ｶ亥悉
      if (typeof closeLabDetailModal === 'function') closeLabDetailModal();
      if (typeof closeLabItemModal === 'function') closeLabItemModal();
      document.querySelectorAll('#monster-select-modal, #lab-item-modal, #lab-detail-modal').forEach(m => {
        m.style.display = 'none';
        m.classList.remove('active');
      });

      // 繧ｹ繧ｭ繝ｫ驕ｸ謚槭�繝��繧｢繝��繧定｡ｨ遉ｺ�医い繧､繝�Β豸郁ｲｻ縺ｯ驕ｸ謚樒｢ｺ螳壽凾縺ｫ螳溯｡鯉ｼ�
      showSkillSelectPopup(target, idx);
      break;
    }
    case 'expandSlot2': {
      const ok = await showConfirmModal('繝｢繝ｳ繧ｹ繧ｿ繝ｼ譫�諡｡蠑ｵ (+2) 繧剃ｽｿ逕ｨ縺励∪縺吶°�歃n繝｢繝ｳ繧ｹ繧ｿ繝ｼ菫晉ｮ｡譫�縺� +2 諡｡蠑ｵ縺輔ｌ縺ｾ縺吶�');
      if (!ok) return;
      ownedItems.expandSlot2--;
      maxMonsterSlots += 2;
      save();
      closeLabItemModal();
      // 蜊ｳ蠎ｧ縺ｫDOM隕∫ｴ�繧堤峩謗･譖ｴ譁ｰ
      const countEl = document.getElementById('lab-monsters-count');
      if (countEl) countEl.textContent = `逋ｻ骭ｲ謨ｰ: ${getActiveLab().length} / ${maxMonsterSlots}`;
      const maxPg = Math.max(1, Math.ceil(maxMonsterSlots / ITEMS_PER_PAGE));
      const pgText = document.getElementById('lab-page-text');
      if (pgText) pgText.textContent = `${currentLabPage} / ${maxPg}`;
      const nextBtn = document.getElementById('lab-next-btn');
      if (nextBtn) nextBtn.disabled = (currentLabPage >= maxPg);
      // 繝｡繝�そ繝ｼ繧ｸ繧帝哩縺倥◆蠕後↓繝ｩ繝懷�菴薙ｒ蜀肴緒逕ｻ
      showSystemModal(`菫晉ｮ｡譫�縺梧僑蠑ｵ縺輔ｌ縺ｾ縺励◆�� 迴ｾ蝨ｨ縺ｮ譛螟ｧ譫�: ${maxMonsterSlots}`, function() {
        renderLabGrid();
      });
      return;
    }
  }
  closeLabItemModal();
  } catch (err) {
    console.error('繧｢繧､繝�Β菴ｿ逕ｨ蜃ｦ逅�〒繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆:', err);
  }
}


function openSkillsLibrary() {
  const overlay = document.getElementById('skills-library-overlay');
  const content = document.getElementById('skills-library-content');
  if (!overlay || !content) return;

  content.innerHTML = '';
  
  // Sort category order
  const catOrder = ['謾ｻ謦�ｳｻ', '髦ｲ蠕｡邉ｻ', '蝗槫ｾｩ邉ｻ', '陬懷勧邉ｻ', '縺昴�莉�'];
  const categories = {};
  catOrder.forEach(c => categories[c] = []);
  
  // Group skills by category
  Object.entries(SKILLS).forEach(([id, sk]) => {
    if (id === 'none') return;
    const catKey = sk.cat || '縺昴�莉�';
    if (!categories[catKey]) categories[catKey] = [];
    categories[catKey].push({ id, ...sk });
  });

  // Render categories and their skills
  catOrder.forEach(catName => {
    const list = categories[catName];
    if (!list || list.length === 0) return;
    
    const catHeader = document.createElement('div');
    catHeader.style = 'font-weight:bold; color:var(--accent-gold); font-size:13px; margin-top:10px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;';
    catHeader.textContent = '縲�' + catName + '縲�';
    content.appendChild(catHeader);

    list.forEach(sk => {
      // Check if unlocked (either initial or unlocked by scrolls)
      const isUnlocked = sk.isInitial || unlockedSkills.includes(sk.id);
      
      const item = document.createElement('div');
      item.style = 'display:flex; align-items:flex-start; gap:10px; padding:8px; border-bottom:1px solid rgba(255,255,255,0.03); background:rgba(255,255,255,0.01); border-radius:6px;';
      
      const badgeColor = sk.type === '繧｢繧ｯ繝�ぅ繝�' ? 'var(--accent-red)' : 'var(--accent-green)';
      
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
        let itemHtml = '<div style="font-size:24px; min-width:32px; text-align:center; color:var(--text-dim);">🔒</div>';
        itemHtml += '<div style="flex:1;">';
        itemHtml += '<div style="font-weight:bold; font-size:16px; color:var(--text-dim);">？？？？';
        itemHtml += '<span style="font-size:12px; background:rgba(255,255,255,0.04); color:var(--text-dim); border:1px solid var(--text-dim); padding:0px 3px; border-radius:3px; margin-left:4px; font-weight:normal;">' + sk.type + '</span>';
        itemHtml += '</div>';
        itemHtml += '<div style="font-size:14px; color:var(--text-dim); margin-top:2px;">（秘伝の書から解放すると表示されます）</div>';
        itemHtml += '</div>';
        item.innerHTML = itemHtml;
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
  
  // 迴ｾ蝨ｨ縺ｮ繝｢繝ｳ繧ｹ繧ｿ繝ｼ蜷阪ｒ蛻晄悄蛟､縺ｨ縺励※險ｭ螳�
  input.value = m.name;
  overlay.classList.add('active'); // 繧ｯ繝ｩ繧ｹ繝吶�繧ｹ縺ｧ縺ｮ陦ｨ遉ｺ蛻ｶ蠕｡
  
  // 繝輔か繝ｼ繧ｫ繧ｹ繧貞粋繧上○繧�
  setTimeout(() => input.focus(), 50);
  
  // 蜿､縺�う繝吶Φ繝医Μ繧ｹ繝翫�縺ｮ闢�ｩ阪ｒ髦ｲ縺舌◆繧∵ｱｺ螳壹�繧ｿ繝ｳ繧定､�｣ｽ繝ｻ鄂ｮ謠�
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  
  newConfirmBtn.addEventListener('click', () => {
    const trimmed = input.value.trim();
    if (trimmed === '') {
      alert('蜷榊燕繧堤ｩｺ谺�↓縺吶ｋ縺薙→縺ｯ縺ｧ縺阪∪縺帙ｓ縲�');
      return;
    }
    m.name = trimmed;
    save();
    renderLabGrid();
    closeRenameModal();
  });

  // Enter繧ｭ繝ｼ縺ｧ縺ｮ豎ｺ螳壹ｂ繧ｵ繝昴�繝�
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      newConfirmBtn.click();
    }
  };
}

function closeRenameModal() {
  const overlay = document.getElementById('rename-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active'); // 繧ｯ繝ｩ繧ｹ繝吶�繧ｹ縺ｧ縺ｮ髱櫁｡ｨ遉ｺ蛻ｶ蠕｡
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
  const defaultIcon = MONSTER_TYPES[sysKey] ? MONSTER_TYPES[sysKey].icon : '�栖';
  
  if (monsterClass === '繧｢繝ｫ繝輔ぃ繝峨Λ繧ｴ繝ｳ') {
    return `<img src="IMG/dragon�羨.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧､繝ｳ繝輔ぉ繝ｫ繝弱せ') {
    return `<img src="IMG/dragon�但.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｪ繝｡繧ｬ繧ｫ繧､繧ｶ繝ｼ') {
    return `<img src="IMG/dragon�鄭.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｹ繝医�繝ｳ繧ｳ繝ｳ繧ｰ') {
    return `<img src="IMG/go-remu1A_.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｸ繧ｧ繧､繝峨ぎ繝ｼ繝�ぅ繧｢繝ｳ') {
    return `<img src="IMG/go-remu2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｮ繧ｬ繧ｹ繝医�繝ｳ') {
    return `<img src="IMG/go-remu3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝上�繝斐ぅ繧ｯ繧､繝ｼ繝ｳ') {
    return `<img src="IMG/tori1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｬ繝ｫ繝ｼ繝') {
    return `<img src="IMG/tori2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｰ繝ｪ繝輔か繝九け繧ｹ') {
    return `<img src="IMG/tori3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｵ繝ｼ繝吶Ν繧ｿ繧､繧ｬ繝ｼ') {
    return `<img src="IMG/kemono1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｭ繝槭う繝ｩ繝ｭ繝ｼ繝�') {
    return `<img src="IMG/kemono2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝輔ぉ繝ｳ繝ｪ繝ｫ') {
    return `<img src="IMG/kemono3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝槭Α繝ｼ繧ｹ繝溘せ') {
    return `<img src="IMG/anded1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝輔ぃ繝ｳ繝医Β繝翫う繝�') {
    return `<img src="IMG/anded2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝�せ繧ｵ繧､繧ｺ') {
    return `<img src="IMG/anded3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｹ繝ｩ繧､繝�') {
    return `<img src="IMG/suraim1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｭ繝ｳ繧ｰ繧ｹ繝ｩ繧､繝�') {
    return `<img src="IMG/suraim2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｴ繝�ラ繧ｼ繝ｪ繝ｼ') {
    return `<img src="IMG/suraim3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝励メ繝�ン繝ｫ') {
    return `<img src="IMG/devil1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｵ繧ｭ繝･繝舌せ') {
    return `<img src="IMG/devil2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝吶Ν繧ｼ繝舌ヶ') {
    return `<img src="IMG/devil3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝槭Φ繝峨Λ繧ｴ繝ｩ') {
    return `<img src="IMG/natu1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧｢繝ｫ繝ｩ繧ｦ繝�') {
    return `<img src="IMG/natu2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '荳也阜讓ｹ縺ｮ逵ｷ螻�') {
    return `<img src="IMG/natu3A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧｢繧､繧｢繝ｳ繧ｮ繧ｬ') {
    return `<img src="IMG/metar1A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繝｡繧ｿ繝ｫ繝薙ャ繝�') {
    return `<img src="IMG/metar2A.png" style="height: ${height}; width: auto; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.3));">`;
  } else if (monsterClass === '繧ｸ繧ｧ繝弱し繧､繝繝ｼ') {
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
        <div style="font-size: 16px; font-weight: bold; color: var(--accent-cyan); text-align: center; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">�ｧｬ 繝｢繝ｳ繧ｹ繧ｿ繝ｼ隧ｳ邏ｰ</div>
        
        <!-- Preview Header -->
        <div style="text-align: center; margin-bottom: 6px;">
          <div style="font-size: 22px; font-weight: 900; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.name}</div>
          <div style="font-size: 13px; color: var(--text-dim); margin-top: 1px;">${m.monsterClass} (${m.systemType})</div>
        </div>
        
        <!-- Visual Display -->
        <div onclick="zoomMonsterVisual('${m.monsterClass}', '${m.systemType}')" style="height: 90px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 8px; position: relative; overflow: hidden; cursor: pointer;" title="繧ｯ繝ｪ繝�け縺ｧ諡｡螟ｧ陦ｨ遉ｺ">
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
          <div style="font-size: 12px; color: var(--accent-cyan); font-weight: bold;">笞｡ 陬�ｙ繧ｹ繧ｭ繝ｫ: <span style="color: #fff; font-size: 13px; margin-left: 6px;">${mainSkill.name}</span></div>
          <div style="font-size: 11px; color: var(--text-dim); line-height: 1.3;">${mainSkill.desc}</div>
        </div>
      </div>
      
      <!-- Modal Close Trigger (Bottom) -->
      <button class="title-btn" onclick="closeLabDetailModal()" style="margin-top: 10px; padding: 5px 0; font-size: 16px; width: 100%;">髢峨§繧�</button>
    </div>
  `;

  if (autoOpen) {
    modal.style.display = 'flex';
  }
}



async function deleteMonster(idx) {
  if (selectedLabIndex === idx) { selectedLabIndex = Math.max(0, idx - 1); }
  closeLabDetailModal();
  const result = await showConfirmModal('縺薙�繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｨ譛ｬ蠖薙↓縺雁挨繧後＠縺ｾ縺吶°�歃n(莠悟ｺｦ縺ｨ謌ｻ縺｣縺ｦ縺阪∪縺帙ｓ)');
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
    alert('繝ｩ繝懊�逋ｻ骭ｲ譫�縺後＞縺｣縺ｱ縺�〒縺呻ｼ�');
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
  
  // 蝓ｺ譛ｬ邉ｻ邨ｱ繧ｰ繝ｫ繝ｼ繝暦ｼ亥�譛溯ｧ｣謾ｾ��
  const baseGroup = document.createElement('optgroup');
  baseGroup.label = '笏笏 蝓ｺ譛ｬ邉ｻ邨ｱ�亥�譛溯ｧ｣謾ｾ�� 笏笏';
  
  // 霑ｽ蜉�邉ｻ邨ｱ繧ｰ繝ｫ繝ｼ繝暦ｼ郁ｦ∬ｧ｣謾ｾ��
  const extraGroup = document.createElement('optgroup');
  extraGroup.label = '笏笏 豁ｦ闊槫床隗｣謾ｾ邉ｻ邨ｱ 笏笏';
  
  Object.entries(MONSTER_TYPES).forEach(([id, t]) => {
    if (t.hidden) return;
    
    const opt = document.createElement('option');
    opt.value = id;
    
    if (t.series) {
      // 霑ｽ蜉�5邉ｻ邨ｱ�壹す繝ｪ繝ｼ繧ｺ隗｣謾ｾ縺悟ｿ�ｦ�
      const isLocked = !isSeriesUnlocked(t.series);
      const seriesNames = { robo:'繝ｭ繝懊す繝ｪ繝ｼ繧ｺ', shin:'逾槭す繝ｪ繝ｼ繧ｺ', dinosaur:'諱千ｫ懊す繝ｪ繝ｼ繧ｺ', toy:'縺ｬ縺�＄繧九∩繧ｷ繝ｪ繝ｼ繧ｺ', ghost:'螯匁ｪ繧ｷ繝ｪ繝ｼ繧ｺ' };
      if (isLocked) {
        opt.textContent = `${t.icon} ${t.label} (�白 ${seriesNames[t.series] || t.series}隗｣謾ｾ縺悟ｿ�ｦ�)`;
        opt.disabled = true;
      } else {
        opt.textContent = `${t.icon} ${t.label}`;
      }
      extraGroup.appendChild(opt);
    } else {
      // 蝓ｺ譛ｬ邉ｻ邨ｱ�壼ｸｸ縺ｫ驕ｸ謚槫庄閭ｽ
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
    nextBtn.textContent = '豎ｺ螳�';
  } else {
    nextBtn.textContent = '谺｡縺ｸ';
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
    // 繝ｪ繧ｻ繝�ヨ阮ｬ邨檎罰縺ｮ邱ｨ髮�Δ繝ｼ繝会ｼ壹せ繝�ャ繝�1縺ｫ縺ｯ謌ｻ繧峨★繝ｩ繝懊↓謌ｻ繧�
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
      alert('繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｮ蜷榊燕繧貞�蜉帙＠縺ｦ縺上□縺輔＞��');
      return;
    }
    creatorTemp.name = nameInput;
    
    // Copy the selected system type's base status and add basic minimum
    const sysId = document.getElementById('creator-system-select').value;
    const className = creatorTemp.monsterClass || '';
    const isNew = isNewSeriesCategory(sysId, className);
    const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
    
    let minHp, minAtk, minDef, minSpd, minLck, totalPool;
    if (isNew) {
      // 譁ｰ繧ｭ繝｣繝ｩ繧ｷ繝ｪ繝ｼ繧ｺ15菴�: 蛻晄悄繧ｹ繝��繧ｿ繧ｹ縺吶∋縺ｦ0縲∝粋險�110pt繧定�逕ｱ縺ｫ謖ｯ繧後ｋ
      minHp = 0; minAtk = 0; minDef = 0; minSpd = 0; minLck = 0;
      totalPool = 110;
    } else {
      minHp = Math.max(1, Number(typeInfo.base.hp) || 0);
      minAtk = Math.max(1, Number(typeInfo.base.attack) || 0);
      minDef = Math.max(0, Number(typeInfo.base.defense) || 0);
      minSpd = Math.max(0, Number(typeInfo.base.speed) || 0);
      minLck = Math.max(0, Number(typeInfo.base.luck) || 0);
      totalPool = 98;
    }

    creatorTemp.stats = {
      hp: minHp,
      attack: minAtk,
      defense: minDef,
      speed: minSpd,
      luck: minLck
    };
    creatorTemp.bonusLeft = totalPool;
    
    // Set up step 2 UI
    buildCreatorStatAllocator();
    showStep(2);
  } else if (creatorStep === 2) {
    // Check remaining points
    if (creatorTemp.bonusLeft !== 0) {
      alert(`ボーナスポイントが ${creatorTemp.bonusLeft}pt 残っています。すべて(残り0ptになるまで)割り振ってください！`);
      return;
    }
    
    // 繝ｪ繧ｻ繝ヨ阮ｬ邨檎罰縺ｮ蜀埼蛻Δ繝ｼ繝会ｼ壹せ繝繧ｿ繧ｹ縺ｮ縺ｿ譖ｴ譁ｰ縺励※繧ｹ繧ｭ繝ｫ驕ｸ謚槭繧ｹ繧ｭ繝
    if (creatorTemp.editingLabIndex !== null && creatorTemp.editingLabIndex !== undefined) {
      const activeLab = getActiveLab();
      const editIdx = creatorTemp.editingLabIndex;
      if (editIdx >= 0 && editIdx < activeLab.length) {
        // 繧ｹ繝繧ｿ繧ｹ縺ｮ縺ｿ荳頑嶌縺搾ｼ医せ繧ｭ繝ｫ縺ｯ蜈縺ｾ縺ｾ菫晄戟
        activeLab[editIdx].stats = { ...creatorTemp.stats };
        save();
        alert(`「${activeLab[editIdx].name}」のステータスを再配分しました！`);
        creatorTemp.editingLabIndex = null;
        goScreen('lab');
        return;
      }
    }

    // 譁ｰ隕丈ｽ懈�繝｢繝ｼ繝会ｼ壹せ繝�ャ繝�3�医せ繧ｭ繝ｫ驕ｸ謚橸ｼ峨∈
    buildCreatorSkillSelector();
    showStep(3);
  } else if (creatorStep === 3) {
    // Finalize save
    const totalChosen = creatorTemp.skills.active.length + creatorTemp.skills.passive.length;
    if (totalChosen < 1) {
      alert('繧ｹ繧ｭ繝ｫ繧�1縺､驕ｸ謚槭＠縺ｦ縺上□縺輔＞��');
      return;
    }
    
    const activeLab = getActiveLab();
    // 譁ｰ隕丈ｽ懈�繝｢繝ｼ繝�
    // Save to lab
    if (activeLab.length >= maxMonsterSlots) {
      alert('繝ｩ繝懊�逋ｻ骭ｲ譫�縺後＞縺｣縺ｱ縺�〒縺呻ｼ�');
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
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後ｈ縺励√〒縺阪◆縺橸ｼ� 繧ｳ繧､繝�′菫ｺ縺ｮ閠�∴謚懊＞縺溘取怙鬮倥�繝薙Ν繝峨Δ繝ｳ繧ｹ繧ｿ繝ｼ縲上□�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
        { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後∪縺壹�繧ｳ繧､繝�〒髣俶橿蝣ｴ繧貞享縺｡騾ｲ繧薙〒縲√ｂ縺｣縺ｨ蠑ｷ蜉帙↑繧ｹ繧ｭ繝ｫ繧呈焔縺ｫ蜈･繧後ｋ縺橸ｼ� 蠕�▲縺ｦ繧阪ｈ繝ｴ繧｣繧ｯ繧ｿ繝ｼ縲√☆縺舌↓霑ｽ縺�▽縺�※繧�ｋ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      ], () => {
        onFirstBuildCompleteStoryEnd();
      });
      return; // 繝√Η繝ｼ繝医Μ繧｢繝ｫ荳ｭ縺ｯ繝繧､繧｢繝ｭ繧ｰ螳御ｺ�ｾ後↓驕ｷ遘ｻ
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
  const labels = { hp: '笶､�� HP', attack: '笞費ｸ� 謾ｻ謦�', defense: '�孱�� 髦ｲ蠕｡', speed: '�暢 邏�譌ｩ', luck: '箝� 驕�' };
  
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
    minusBtn.textContent = '��';
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
    plusBtn.textContent = '��';
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
  const isNew = isNewSeriesCategory(sysId, creatorTemp.monsterClass || '');
  const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
  const totalPool = isNew ? 110 : 98;
  
  // Calculate allocated bonus points based on (currentVal - minVal)
  let allocatedPoints = 0;
  statKeys.forEach(k => {
    const basicMin = isNew ? 0 : ((k === 'hp' || k === 'attack') ? 1 : 0);
    const minVal = isNew ? 0 : Math.max(basicMin, Number(typeInfo.base[k]) || 0);
    const currentVal = Number(creatorTemp.stats[k]);
    allocatedPoints += Math.max(0, currentVal - minVal);
  });
  
  const remaining = Math.max(0, totalPool - allocatedPoints);
  creatorTemp.bonusLeft = remaining;
  
  const bonusPtsDisplay = document.getElementById('creator-bonus-pts');
  if (bonusPtsDisplay) {
    bonusPtsDisplay.textContent = remaining;
  }
  
  statKeys.forEach(statKey => {
    const basicMin = isNew ? 0 : ((statKey === 'hp' || statKey === 'attack') ? 1 : 0);
    const minVal = isNew ? 0 : Math.max(basicMin, Number(typeInfo.base[statKey]) || 0);
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
  const catOrder = ['謾ｻ謦�ｳｻ', '髦ｲ蠕｡邉ｻ', '蝗槫ｾｩ邉ｻ', '陬懷勧邉ｻ', '縺昴�莉�'];
  catOrder.forEach(c => categories[c] = []);
  
  Object.entries(SKILLS).forEach(([id, sk]) => {
    if (id === 'none') return;
    if (!availableIds.includes(id)) return;
    const catKey = sk.cat || '縺昴�莉�';
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
    header.textContent = '縲�' + catName + '縲�';
    container.appendChild(header);

    list.forEach(sk => {
      const item = document.createElement('label');
      item.style = 'display:flex; align-items:flex-start; gap:8px; padding:6px; cursor:pointer; font-size:16px; border-bottom:1px solid rgba(255,255,255,0.03);';
      
      const rad = document.createElement('input');
      rad.type = 'radio';
      rad.name = 'creator-skill-choice';
      rad.value = sk.id;
      rad.style = 'margin-top:2px;';
      
      const isSelected = (sk.type === '繧｢繧ｯ繝�ぅ繝�' && creatorTemp.skills.active.includes(sk.id)) ||
                         (sk.type === '繝代ャ繧ｷ繝�' && creatorTemp.skills.passive.includes(sk.id));
      rad.checked = isSelected;
      
      rad.onchange = () => {
        if (rad.checked) {
          if (sk.type === '繧｢繧ｯ繝�ぅ繝�') {
            creatorTemp.skills = { active: [sk.id], passive: [] };
          } else {
            creatorTemp.skills = { active: [], passive: [sk.id] };
          }
        }
        updateCreatorPreview();
      };
      
      item.appendChild(rad);
      
      const descDiv = document.createElement('div');
      const badgeColor = sk.type === '繧｢繧ｯ繝�ぅ繝�' ? 'var(--accent-red)' : 'var(--accent-green)';
      const typeLabel = sk.type === '繧｢繧ｯ繝�ぅ繝�' ? `${sk.type} (MP: 8)` : `${sk.type} (MP 8縺ｧ閾ｪ蜍慕匱蜍�)`;
      descDiv.innerHTML = '<strong>' + sk.icon + ' ' + sk.name + '</strong> <span style="font-size:12px; background:rgba(255,255,255,0.06); color:' + badgeColor + '; border:1px solid ' + badgeColor + '; padding:0px 3px; border-radius:3px; margin-left:4px;">' + typeLabel + '</span><br><span style="font-size:14px; color:var(--text-dim);">' + sk.desc + '</span>';
      item.appendChild(descDiv);
      container.appendChild(item);
    });
  });
}

// 4. Random Create Logic
function executeRandomCreate() {
  if (getActiveLab().length >= maxMonsterSlots) {
    alert('繝ｩ繝懊�逋ｻ骭ｲ譫�縺後＞縺｣縺ｱ縺�〒縺呻ｼ�');
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
  if (chosenSkill.type === '繧｢繧ｯ繝�ぅ繝�') {
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
      { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後ｈ縺励√〒縺阪◆縺橸ｼ� 繧ｳ繧､繝�′菫ｺ縺ｮ閠�∴謚懊＞縺溘取怙鬮倥�繝薙Ν繝峨Δ繝ｳ繧ｹ繧ｿ繝ｼ縲上□�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      { speaker: playerName || '荳ｻ莠ｺ蜈ｬ', text: '縲後∪縺壹�繧ｳ繧､繝�〒髣俶橿蝣ｴ繧貞享縺｡騾ｲ繧薙〒縲√ｂ縺｣縺ｨ蠑ｷ蜉帙↑繧ｹ繧ｭ繝ｫ繧呈焔縺ｫ蜈･繧後ｋ縺橸ｼ� 蠕�▲縺ｦ繧阪ｈ繝ｴ繧｣繧ｯ繧ｿ繝ｼ縲√☆縺舌↓霑ｽ縺�▽縺�※繧�ｋ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    ], () => {
      onFirstBuildCompleteStoryEnd();
    });
    return; // 繝√Η繝ｼ繝医Μ繧｢繝ｫ荳ｭ縺ｯ繝€繧､繧｢繝ｭ繧ｰ螳御ｺｾ後↓驕ｷ遘ｻ
  }
  renderLabGrid();
  
  addLogMessageToBattleScreen(`🎲 「${className}」がランダム作成されました！`);
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

    let dHtml = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">';
    dHtml += '<span style="font-weight:bold; color:var(--accent-gold); font-size:16px;">' + m.name + '</span>';
    dHtml += '<span style="font-size:14px; color:var(--text-dim);">' + m.monsterClass + ' (' + m.systemType + ')</span>';
    dHtml += '</div>';
    dHtml += '<div style="font-size:14px; color:var(--text-main); margin-bottom:4px;">';
    dHtml += 'HP:' + m.stats.hp + ' ATK:' + m.stats.attack + ' DEF:' + m.stats.defense + ' SPD:' + m.stats.speed + ' LCK:' + m.stats.luck;
    dHtml += '</div>';
    dHtml += '<div style="font-size:13px; color:var(--text-dim);">';
    dHtml += '✨ スキル: ' + (actSkills || pasSkill || 'なし');
    dHtml += '</div>';

    d.innerHTML = dHtml;
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
    const modeName = mode === 'free' ? '繝輔Μ繝ｼ蟇ｾ謌ｦ' : (mode === 'league' ? '繝ｪ繝ｼ繧ｰ謌ｦ' : '蜍昴■謚懊″謌ｦ');
    alert(`「${modeName}」を開始するにはモンスターが必要です。モンスター作成画面に移行します。`);
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
    resultText.innerHTML = '縺薙�遘倅ｼ晄嶌縺ｮ謚縺ｯ縺吶∋縺ｦ菫ｮ蠕玲ｸ医∩縺ｧ縺呻ｼ�<br>縺翫ａ縺ｧ縺ｨ縺�＃縺悶＞縺ｾ縺呻ｼ�';
    result.style.display = 'block';
    return;
  }
  
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  unlockedSkills.push(chosen.id);
  save();
  updateSkillProgressUI();
  checkSkillMilestones();
  
  cards.style.display = 'none';
  resultText.innerHTML = chosen.icon + ' <span style="color:var(--accent-gold);">縲�' + chosen.name + '縲�</span> 縺ｮ繧ｹ繧ｭ繝ｫ繧呈眠縺溘↓菫ｮ蠕励＠縺滂ｼ�<br><span style="font-size:15px; color:var(--text-dim); margin-top:8px; display:inline-block;">' + chosen.desc + '</span>';
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
      title: `隧ｦ邱ｴ縺ｮ蝪� (髫主ｱ､: ${survivalWins + 1}髫�)`,
      icon: baseEnemy.icon,
      rumor: `蝪斐�髢逡ｪ縺ｨ縺励※遶九■縺ｵ縺輔′繧具ｼ� 迴ｾ蝨ｨ縺ｮ蛻ｰ驕秘嚴螻､: ${survivalWins}髫餐,
      hp: Math.max(1, Math.round(baseEnemy.hp * scale)),
      attack: Math.max(1, Math.round(baseEnemy.attack * scale)),
      defense: Math.max(1, Math.round(baseEnemy.defense * scale)),
      speed: Math.max(1, Math.round(baseEnemy.speed * scale)),
      luck: Math.max(1, Math.round(baseEnemy.luck * scale)),
      skill: baseEnemy.skill,
      type: baseEnemy.type
    };
    badge.textContent = '試練の塔: ' + (survivalWins + 1) + '階 (BEST: ' + survivalBestRecord + '階)';
  } else {
    // Free Battle: Pick a random enemy from list
    const baseEnemy = STAGE_ENEMIES[Math.floor(Math.random() * STAGE_ENEMIES.length)];
    currentEnemy = { ...baseEnemy };
    badge.textContent = 'フリー対戦';
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
  if (eObj && typeof eObj === "object") {
    const customImgFromSprite = eObj.sprite || eObj.image;
    const customImgFromAdditional = (!customImgFromSprite && typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined') ? (ADDITIONAL_MONSTER_IMAGES[eObj.monsterClass || eObj.name] || ADDITIONAL_MONSTER_IMAGES[eObj.name]) : null;
    if (customImgFromSprite) {
      return '<img src="' + customImgFromSprite + '" class="' + imgClass + '">';
    }
    if (customImgFromAdditional) {
      return '<img src="' + customImgFromAdditional + '" class="' + imgClass + ' img3-enemy">';
    }
    if (eObj.name && eObj.name.includes("覇王")) {
      return '<img src="./IMG2/haou.jpg" class="' + imgClass + '">';
    }
  }
  if (typeof eObj === "string" && eObj.includes("覇王")) {
    return '<img src="./IMG2/haou.jpg" class="' + imgClass + '">';
  }


  // 1. 繝ｪ繝ｼ繧ｰ謌ｦPU繝ｪ繝ｼ繧ｰ峨蝣ｴ蜷医蠕捺擂騾壹ｊ繧ｹ繝繧ｸ逕ｻ蜒上ｒ菴ｿ逕ｨ
  if (typeof stageIndex !== 'undefined' && currentGameMode === 'league' && STAGE_IMAGES_LIST[stageIndex]) {
    return '<img src="' + STAGE_IMAGES_LIST[stageIndex] + '" class="' + imgClass + '">';
  }

  // 遞ｮ譌丞錐繝ｻ蜷榊燕縺ｮ讀懃ｴ｢逕ｨ繧ｭ繝ｼ繧貞叙蠕�
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

  // 2. 譌｢蟄倥STAGE_ENEMIES鬆ｬ｡繝槭ャ繝ｼ医Μ繝ｼ繧ｰ謌ｦ遲会ｼ
  if (typeof STAGE_ENEMIES !== 'undefined') {
    const idx = STAGE_ENEMIES.findIndex(x => x.name === eName || x.name === mClass);
    if (idx !== -1 && STAGE_IMAGES_LIST[idx]) {
      return '<img src="' + STAGE_IMAGES_LIST[idx] + '" class="' + imgClass + '">';
    }
  }

  // 3. 繝励Ξ繧､繝､繝ｼ蛻ｩ逕ｨ蜿ｯ閭ｽ蜈ｨ27遞ｮ譌上謨ｵ逕ｨ繧ｰ繝ｩ繝輔ぅ繝け逕ｻ蜒 (B.png 繧ｷ繝ｪ繝ｼ繧ｺ)
  const getImg = (src) => '<img src="' + src + '" class="' + imgClass + '">';
  if (mClass === 'アルファドラゴン' || eName === 'アルファドラゴン') return getImg("IMG/dragon1B.png");
  if (mClass === 'インフェルノス' || eName === 'インフェルノス') return getImg("IMG/dragon2B.png");
  if (mClass === 'オメガカイザー' || eName === 'オメガカイザー') return getImg("IMG/dragon3B.png");
  if (mClass === 'ストーンコング' || eName === 'ストーンコング') return getImg("IMG/go-remu1B.png");
  if (mClass === 'ジェイドガーディアン' || eName === 'ジェイドガーディアン') return getImg("IMG/go-remu2B.png");
  if (mClass === 'ギガストーン' || eName === 'ギガストーン') return getImg("IMG/go-remu3B.png");
  if (mClass === 'ハーピークイーン' || eName === 'ハーピークイーン') return getImg("IMG/tori1B.png");
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
  if (mClass === 'メタルビッツ' || eName === 'メタルビッツ') return getImg("IMG/metar2B.png");
  if (mClass === 'ジェノサイダー' || eName === 'ジェノサイダー') return getImg("IMG/metar3B.png");

  // 3.5 霑ｽ蜉繝｢繝ｳ繧ｹ繧ｿ繝ｼ (IMG3) 縺ｮ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ逕ｻ蜒
  if (typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined') {
    const addImg = ADDITIONAL_MONSTER_IMAGES[mClass] || ADDITIONAL_MONSTER_IMAGES[eName];
    if (addImg) return '<img src="' + addImg + '" class="' + imgClass + ' img3-enemy">';
  }

  // 4. 邉ｻ邨ｱ蜷阪↓繧医ｋ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ逕ｻ蜒剰ｨｭ螳
  if (sysType.includes('ドラゴン')) return getImg("IMG/dragon1B.png");
  if (sysType.includes('岩石') || sysType.includes('ゴーレム')) return getImg("IMG/go-remu1B.png");
  if (sysType.includes('鳥')) return getImg("IMG/tori1B.png");
  if (sysType.includes('獣')) return getImg("IMG/kemono1B.png");
  if (sysType.includes('アンデッド') || sysType.includes('不死')) return getImg("IMG/anded1B.png");
  if (sysType.includes('スライム')) return getImg("IMG/suraim1B.png");
  if (sysType.includes('悪魔') || sysType.includes('デビル')) return getImg("IMG/devil1B.png");
  if (sysType.includes('植物') || sysType.includes('自然')) return getImg("IMG/natu1B.png");
  if (sysType.includes('メタル') || sysType.includes('機械')) return getImg("IMG/metar1B.png");

  return '<span style="font-size: 65px; display: inline-block;">👾</span>';
}

function renderEnemyInfo() {
  const panel = document.getElementById('scout-enemy-panel');
  if (!panel) return;
  
  if (!currentEnemy) {
    panel.innerHTML = '<div style="color:var(--text-dim); text-align:center; padding:20px;">蟇ｾ謌ｦ逶ｸ謇九ｒ貅門ｙ荳ｭ...</div>';
    return;
  }
  
  const e = currentEnemy;
  const isTutorialBoss = (gameProgress.tutorialStep === 2);
  
  let badgeLabel;
  if (currentGameMode === 'boss-revenge') {
    badgeLabel = '👑 覇王リベンジマッチ';
  } else if (currentGameMode === 'league') {
    badgeLabel = '🏆 STAGE ' + (stageIndex + 1);
  } else {
    badgeLabel = '🔥 試練の塔: ' + (survivalWins + 1) + '階';
  }
  
  const dispHP = isTutorialBoss ? '???' : e.hp;
  const dispATK = isTutorialBoss ? '???' : e.attack;
  const dispDEF = isTutorialBoss ? '???' : e.defense;
  const dispSPD = isTutorialBoss ? '???' : e.speed;
  const dispLUK = isTutorialBoss ? '???' : e.luck;
  const gaugeHP = isTutorialBoss ? 0 : Math.min(100, (e.hp / 110) * 100);
  const gaugeATK = isTutorialBoss ? 0 : Math.min(100, (e.attack / 110) * 100);
  const gaugeDEF = isTutorialBoss ? 0 : Math.min(100, (e.defense / 110) * 100);
  const gaugeSPD = isTutorialBoss ? 0 : Math.min(100, (e.speed / 110) * 100);
  const gaugeLUK = isTutorialBoss ? 0 : Math.min(100, (e.luck / 110) * 100);
  panel.innerHTML = 
    '<div class="enemy-rank-badge" style="margin-top:0px;">' + badgeLabel + '</div>' +
    '<div class="enemy-icon" style="height: 70px; display: flex; align-items: center; justify-content: center; margin: 2px 0;">' + getEnemyImageHTML(e) + '</div>' +
    '<div class="enemy-name-display" style="color:var(--accent-red); font-weight:bold; font-size:16px;">' + e.name + '</div>' +
    '<div class="enemy-title-display" style="font-size:11px; margin-bottom:4px;">' + (e.title || '謎の対戦相手') + '</div>' +
    '<div class="rumor-box">' +
      '<div class="rumor-label">🗣 噂の情報</div>' +
      '<div class="rumor-text" style="font-size:12px; line-height:1.3;">' + (isTutorialBoss ? '未知の強敵。ステータスは一切不明……' : (e.rumor || '敵に関する情報は十分に掴めていない…')) + '</div>' +
    '</div>' +
    '<div class="enemy-stats-preview" style="margin-top:6px; display:grid; grid-template-columns:repeat(2, 1fr); gap:4px 10px; background:transparent !important; border:2px solid rgba(255,255,255,0.6) !important; border-radius:8px; padding:6px; font-size:12px; text-align:left;">' +
      '<div>HP: <strong style="color:var(--text-primary);">' + dispHP + '</strong><div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-hp" style="width: ' + gaugeHP + '%;"></div></div></div>' +
      '<div>攻撃: <strong style="color:var(--text-primary);">' + dispATK + '</strong><div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-atk" style="width: ' + gaugeATK + '%;"></div></div></div>' +
      '<div>防御: <strong style="color:var(--text-primary);">' + dispDEF + '</strong><div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-def" style="width: ' + gaugeDEF + '%;"></div></div></div>' +
      '<div>素早さ: <strong style="color:var(--text-primary);">' + dispSPD + '</strong><div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-spd" style="width: ' + gaugeSPD + '%;"></div></div></div>' +
      '<div style="grid-column: span 2;">運: <strong style="color:var(--text-primary);">' + dispLUK + '</strong><div class="mini-gauge-container" style="margin-bottom:0; height:4px; background:rgba(255,255,255,0.1);"><div class="mini-gauge-fill fill-luk" style="width: ' + gaugeLUK + '%;"></div></div></div>' +
    '</div>';
}

function initBattle() {
  console.log('initBattle started');
  
  // 1. Clear old timers and logs
  battleTimers.forEach(t => clearTimeout(t));
  battleTimers = [];
  activeTimers.forEach(t => clearTimeout(t));
  activeTimers = [];
  clearLog();

  // 笘� 繧ｲ繝ｼ繝�繝｢繝ｼ繝峨↓蠢懊§縺ｦ繝代�繝�ぅ邱ｨ謌舌ョ繝ｼ繧ｿ繧貞ｼｷ蛻ｶ蛻�崛�井ｺ碁㍾螳牙�遲厄ｼ�
  if (currentGameMode === 'free') {
    currentLabMode = 'free';
  } else {
    currentLabMode = 'story';
  }

  // 2. Fetch monster and enemy parameters (pre-requisites)
  const activeLab = getActiveLab();
  
  // 笘 繝代繝ぅ縺檎ｩｺ縺ｮ蝣ｴ蜷医蜃ｺ謦お繝ｩ繝ｼ隴ｦ蜻
  if (activeLab.length === 0) {
    const modeLabel = currentGameMode === 'free' ? 'フリーバトル用' : 'ストーリー用';
    alert(modeLabel + 'の編成にモンスターが登録されていません。\nラボで' + modeLabel + '編成にモンスターを登録してください。');
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
        name: '繝繝溘�繝峨Λ繧ｴ繝ｳ',
        systemType: '繝峨Λ繧ｴ繝ｳ邉ｻ',
        monsterClass: '繧｢繝ｫ繝輔ぃ繝峨Λ繧ｴ繝ｳ',
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
    name: pm.name || '縺ｪ縺ｪ縺励�繝｢繝ｳ繧ｹ繧ｿ繝ｼ',
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
    drawingTurns: 0,
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
    name: '繧ｴ繝悶Μ繝ｳ繝√�繝�',
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
    name: em.name || '隰弱�謨ｵ',
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
    drawingTurns: 0,
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
      if (usageInfo) usageInfo.textContent = '1謌ｦ1蝗樣剞繧�';
    }

    // Set header labels for System and Classes
    const playerSysLabel = document.getElementById('player-sys-label');
    const playerClassLabel = document.getElementById('player-class-label');
    const enemySysLabel = document.getElementById('enemy-sys-label');
    const enemyClassLabel = document.getElementById('enemy-class-label');
    
    if (playerSysLabel) playerSysLabel.textContent = '[SYSTEM: ' + pm.systemType + ']';
    if (playerClassLabel) playerClassLabel.textContent = pm.monsterClass;
    if (enemySysLabel) enemySysLabel.textContent = '[SYSTEM: ' + (MONSTER_TYPES[em.type] ? MONSTER_TYPES[em.type].label : '�滂ｼ滂ｼ�') + ']';
    if (enemyClassLabel) enemyClassLabel.textContent = em.title || '繧ｨ繝阪Α繝ｼ';

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
    
    document.getElementById('stat-val-e-hp').textContent = isTutorialMode ? '�滂ｼ滂ｼ�' : eHp;
    document.getElementById('stat-val-e-attack').textContent = isTutorialMode ? '�滂ｼ滂ｼ�' : eAtk;
    document.getElementById('stat-bar-e-attack').style.width = isTutorialMode ? '0%' : Math.min(100, (eAtk / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-e-defense').textContent = isTutorialMode ? '�滂ｼ滂ｼ�' : eDef;
    document.getElementById('stat-bar-e-defense').style.width = isTutorialMode ? '0%' : Math.min(100, (eDef / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-e-speed').textContent = isTutorialMode ? '�滂ｼ滂ｼ�' : eSpd;
    document.getElementById('stat-bar-e-speed').style.width = isTutorialMode ? '0%' : Math.min(100, (eSpd / maxVal) * 100) + '%';
    
    document.getElementById('stat-val-e-luck').textContent = isTutorialMode ? '�滂ｼ滂ｼ�' : eLck;
    document.getElementById('stat-bar-e-luck').style.width = isTutorialMode ? '0%' : Math.min(100, (eLck / maxVal) * 100) + '%';

    // Render Skills board
    const mySkill = pm.skills.active[0] || 'none';
    document.getElementById('player-skill-name').textContent = (SKILLS[mySkill] || SKILLS.none).name;
    document.getElementById('player-skill-desc').textContent = (SKILLS[mySkill] || SKILLS.none).desc;

    // Secret Enemy skill setup
    const enemySkillNameEl = document.getElementById('enemy-skill-name');
    if (enemySkillNameEl) {
      enemySkillNameEl.textContent = '[ �滂ｼ滂ｼ滂ｼ滂ｼ滂ｼ� ]';
      enemySkillNameEl.setAttribute('data-text', '[ �滂ｼ滂ｼ滂ｼ滂ｼ滂ｼ� ]');
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
    const makePlayerImg = (path) => '<img src="' + path + '" style="max-height: 95px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0,212,255,0.35)); vertical-align: middle;">';
    if (pNameForImage === 'アルファドラゴン') {
      playerIconEl.innerHTML = makePlayerImg("IMG/dragon1A.png");
    } else if (pNameForImage === 'インフェルノス') {
      playerIconEl.innerHTML = makePlayerImg("IMG/dragon2A.png");
    } else if (pNameForImage === 'オメガカイザー') {
      playerIconEl.innerHTML = makePlayerImg("IMG/dragon3A.png");
    } else if (pNameForImage === 'ストーンコング') {
      playerIconEl.innerHTML = makePlayerImg("IMG/go-remu1A_.png");
    } else if (pNameForImage === 'ジェイドガーディアン') {
      playerIconEl.innerHTML = makePlayerImg("IMG/go-remu2A.png");
    } else if (pNameForImage === 'ギガストーン') {
      playerIconEl.innerHTML = makePlayerImg("IMG/go-remu3A.png");
    } else if (pNameForImage === 'ハーピークイーン') {
      playerIconEl.innerHTML = makePlayerImg("IMG/tori1A.png");
    } else if (pNameForImage === 'ガルーダ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/tori2A.png");
    } else if (pNameForImage === 'グリフォニクス') {
      playerIconEl.innerHTML = makePlayerImg("IMG/tori3A.png");
    } else if (pNameForImage === 'サーベルタイガー') {
      playerIconEl.innerHTML = makePlayerImg("IMG/kemono1A.png");
    } else if (pNameForImage === 'キマイラロード') {
      playerIconEl.innerHTML = makePlayerImg("IMG/kemono2A.png");
    } else if (pNameForImage === 'フェンリル') {
      playerIconEl.innerHTML = makePlayerImg("IMG/kemono3A.png");
    } else if (pNameForImage === 'マミースミス') {
      playerIconEl.innerHTML = makePlayerImg("IMG/anded1A.png");
    } else if (pNameForImage === 'ファントムナイト') {
      playerIconEl.innerHTML = makePlayerImg("IMG/anded2A.png");
    } else if (pNameForImage === 'デスサイズ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/anded3A.png");
    } else if (pNameForImage === 'スライム') {
      playerIconEl.innerHTML = makePlayerImg("IMG/suraim1A.png");
    } else if (pNameForImage === 'キングスライム') {
      playerIconEl.innerHTML = makePlayerImg("IMG/suraim2A.png");
    } else if (pNameForImage === 'ゴッドゼリー') {
      playerIconEl.innerHTML = makePlayerImg("IMG/suraim3A.png");
    } else if (pNameForImage === 'プチデビル') {
      playerIconEl.innerHTML = makePlayerImg("IMG/devil1A.png");
    } else if (pNameForImage === 'サキュバス') {
      playerIconEl.innerHTML = makePlayerImg("IMG/devil2A.png");
    } else if (pNameForImage === 'ベルゼバブ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/devil3A.png");
    } else if (pNameForImage === 'マンドラゴラ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/natu1A.png");
    } else if (pNameForImage === 'アルラウネ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/natu2A.png");
    } else if (pNameForImage === '世界樹の眷属') {
      playerIconEl.innerHTML = makePlayerImg("IMG/natu3A.png");
    } else if (pNameForImage === 'アイアンギガ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/metar1A.png");
    } else if (pNameForImage === 'メタルビッツ') {
      playerIconEl.innerHTML = makePlayerImg("IMG/metar2A.png");
    } else if (pNameForImage === 'ジェノサイダー') {
      playerIconEl.innerHTML = makePlayerImg("IMG/metar3A.png");
    } else if (typeof ADDITIONAL_MONSTER_IMAGES !== 'undefined' && ADDITIONAL_MONSTER_IMAGES[pNameForImage]) {
      playerIconEl.innerHTML = makePlayerImg(ADDITIONAL_MONSTER_IMAGES[pNameForImage]);
    } else {
      playerIconEl.innerHTML = MONSTER_TYPES[sysKey] ? MONSTER_TYPES[sysKey].icon : '👾';
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
    if (pState.skill === 'none' || userSk.type === '繝代ャ繧ｷ繝�') {
      skillBtn.disabled = true;
      skillBtn.style.opacity = '0.5';
      skillBtn.textContent = '笞｡ 繧ｹ繧ｭ繝ｫ縺ｪ縺� (MP: 8)';
    } else {
      const canUseSkill = (pState.mp >= 8);
      skillBtn.disabled = !canUseSkill;
      skillBtn.style.opacity = canUseSkill ? '1.0' : '0.5';
      skillBtn.textContent = '笞｡ ' + userSk.name + ' (MP: 8)';
    }
    
    skillBtn.onclick = () => {
      if (pState.mp < 8) {
        alert('MP縺瑚ｶｳ繧翫∪縺帙ｓ��ｼ亥ｿ�ｦ｀P: 8��');
        return;
      }
      selectCommand('skill');
    };

    // 繧､繝吶Φ繝域姶繝ｻ繝ｩ繧ｹ繝懊せ隕�視謌ｦ縺ｧ縺ｮ謦､騾蛻ｶ蠕｡
    const escapeBtn = document.getElementById('escape-btn');
    if (escapeBtn) {
      const isBossFight = (eState && (eState.name === '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ' || eState.isBoss));
      const isBossFight = (eState && (eState.name === '隕視繝ｴ繧｣繧ｯ繧ｿ繝ｼ' || eState.isBoss));
      escapeBtn.disabled = isBossFight;
      escapeBtn.style.opacity = isBossFight ? '0.4' : '1.0';
      escapeBtn.style.cursor = isBossFight ? 'not-allowed' : 'pointer';
    }

    currentTurn = 0;
    addLog('⚔️ バトル開始！ 「' + pState.name + '」 vs 「' + eState.name + '」', 'log-info');
    
    const ptInfo = MONSTER_TYPES[pState.type] || MONSTER_TYPES.other;
    const etInfo = MONSTER_TYPES[eState.type] || MONSTER_TYPES.other;
    addLog(ptInfo.icon+' '+pState.name+'壹€'+ptInfo.label+'縲', 'log-info');
    addLog(etInfo.icon+' '+eState.name+'壹€'+etInfo.label+'縲', 'log-info');

    // TRIGGER BATTLE START PASSIVES
    [pState, eState].forEach((actor, idx) => {
      const opp = idx === 0 ? eState : pState;
      const sk = actor.skill;
      const passives = (actor.skillsList && Array.isArray(actor.skillsList.passive)) ? actor.skillsList.passive : [];
      
      // フォーチュンダイス
      if (sk === 'fdice' || passives.includes('fdice')) {
        const roll = Math.floor(Math.random() * 41) - 10;
        actor.luck = Math.max(0, actor.luck + roll);
        addLog('🎲 ' + actor.name + ' の「フォーチュンダイス」！ 運が ' + (roll >= 0 ? '+' + roll : roll) + ' 変動し、運:' + actor.luck + ' になった！', 'log-skill');
      }
      
      // プレッシャー
      if (sk === 'pressure' || passives.includes('pressure')) {
        if (actor.luck > opp.luck) {
          opp.scared = true;
          addLog('⚡ ' + actor.name + ' の「プレッシャー」！ ' + opp.name + ' は怯えて動けない！', 'log-skill');
        }
      }
      
      // ステータス・シャッフル
      if (sk === 'shuffle' || passives.includes('shuffle')) {
        const tmpSpd = actor.speed;
        actor.speed = opp.speed;
        opp.speed = tmpSpd;
        addLog('🔀 ' + actor.name + ' の「ステータス・シャッフル」！ お互いの素早さ(' + actor.speed + ' ⇄ ' + opp.speed + ')が入れ替わった！', 'log-skill');
      }

      // 大振り
      if (sk === 'heavyatk' || passives.includes('heavyatk')) {
        actor.attack = Math.floor(actor.attack * 1.15);
        actor.speed = Math.floor(actor.speed * 0.7);
        addLog('🪓 ' + actor.name + ' の「大振り」！ 攻撃力+15%、素早さ-30%に変動した！ (攻撃:' + actor.attack + ' / 素早さ:' + actor.speed + ')', 'log-skill');
      }

      // 威嚇のポーズ
      if (sk === 'intimidate' || passives.includes('intimidate')) {
        opp.attack = Math.max(1, opp.attack - 1);
        addLog('🦁 ' + actor.name + ' の「威嚇のポーズ」！ ' + opp.name + ' の攻撃力を 1 減少させた！ (攻撃:' + opp.attack + ')', 'log-skill');
      }

      // ガラスの盾
      if (sk === 'glassshield' || passives.includes('glassshield')) {
        actor.glassShieldActive = true;
        addLog('🛡️ ' + actor.name + ' は「ガラスの盾」を構えた！ 初撃の防御力1.2倍、以降10%低下！', 'log-skill');
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
  addLog('<span class="log-turn">❖ ターン ' + currentTurn + ' ❖</span>', 'log-turn');

  // MP auto-recovery per turn (+1)
  [pState, eState].forEach((actor, i) => {
    if (actor.cur <= 0) return;
    actor.mp = Math.min(actor.maxMp || 10, (actor.mp || 0) + 1);
    setMp(i === 0 ? 'p' : 'e', actor);
    
    // MP縺�8莉･荳翫◆縺ｾ繧頑ｬ｡隨ｬ縲√ヱ繝�す繝悶せ繧ｭ繝ｫ繧偵ち繝ｼ繝ｳ鬆ｭ縺ｧ閾ｪ蜍慕匱蜍�
    const opp = i === 0 ? eState : pState;
    checkAutoPassiveTrigger(i === 0 ? 'p' : 'e', actor, i === 0 ? 'e' : 'p', opp);

    // Regen passive
    if (actor.regenTurns > 0) {
      const healAmt = Math.min(actor.max - actor.cur, Math.max(1, Math.floor(actor.max * 0.08)));
      actor.cur = Math.min(actor.max, actor.cur + healAmt);
      setHp(i === 0 ? 'p' : 'e', actor);
      addLog('💖 ' + actor.name + ' のリジェネレートで最大HPの8%(' + healAmt + ')回復！ (残HP: ' + actor.cur + ')', 'log-info');
      actor.regenTurns--;
      if (actor.regenTurns === 0) addLog('💖 ' + actor.name + ' のリジェネレートが切れた。', 'log-info');
    }

    // Buff turn countdowns
    if (actor.daibogyoTurns > 0) {
      actor.daibogyoTurns--;
      if (actor.daibogyoTurns === 0) {
        actor.daibogyoActive = false;
        addLog('🛡️ ' + actor.name + ' の大防御の効果が切れた。', 'log-info');
      }
    }
    if (actor.teppekiTurns > 0) {
      actor.teppekiTurns--;
      if (actor.teppekiTurns === 0) addLog('🏰 ' + actor.name + ' の鉄壁の構えが切れた。', 'log-info');
    }
    if (actor.strengthenTurns > 0) {
      actor.strengthenTurns--;
      if (actor.strengthenTurns === 0) addLog('💪 ' + actor.name + ' の筋力強化が切れた。', 'log-info');
    }
    if (actor.paperarmorTurns > 0) {
      actor.paperarmorTurns--;
      if (actor.paperarmorTurns === 0) addLog('📜 ' + actor.name + ' の紙装束の呪いが切れた。', 'log-info');
    }
    if (actor.slownurseTurns > 0) {
      actor.slownurseTurns--;
      if (actor.slownurseTurns === 0) addLog('🐢 ' + actor.name + ' の鈍足の呪いが切れた。', 'log-info');
    }
    if (actor.overclockTurns > 0) {
      actor.overclockTurns--;
      if (actor.overclockTurns === 0) {
        actor.cur = Math.max(1, actor.cur - 5);
        addLog('⚡ ' + actor.name + ' のオーバークロック終了！ 反動でHPが 5 減少した！', 'log-info');
        setHp(i === 0 ? 'p' : 'e', actor);
      }
    }
    if (actor.shadowstepTurns > 0) {
      actor.shadowstepTurns--;
      if (actor.shadowstepTurns === 0) addLog('👤 ' + actor.name + ' のシャドーステップが切れた。', 'log-info');
    }
    if (actor.reverseTurns > 0) {
      actor.reverseTurns--;
      if (actor.reverseTurns === 0) addLog('🔄 ' + actor.name + ' のリバースルーム空間が消滅した。', 'log-info');
    }
    if (actor.fortressTurns > 0) {
      actor.fortressTurns--;
      if (actor.fortressTurns === 0) addLog('🏰 ' + actor.name + ' の最後の砦（無敵効果）が切れた。', 'log-info');
    }
    if (actor.drawingTurns > 0) {
      actor.drawingTurns--;
      if (actor.drawingTurns === 0) addLog('🎨 ' + actor.name + ' のドローイング効果が切れた。', 'log-info');
    }

    // 隕丞ｮ壹ち繝ｼ繝ｳ邨碁℃縺ｮ繝舌ヵ隗｣髯､せ繝繧ｿ繧ｹ蠕ｩ蜈峩譁ｰ
    updateMonsterBuffs(actor, i === 0 ? 'p' : 'e');
  });

  updateBuffsUI('p', pState);
  updateBuffsUI('e', eState);

  // 恐れ(pressure) の処理
  if (pState.scared) {
    pState.scared = false;
    addLog('😨 ' + pState.name + ' は怯えてこのターン動けない！', 'log-miss');
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
    addLog('😨 ' + eState.name + ' は怯えてこのターン動けない！', 'log-miss');
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

  // 蝓ｺ譛ｬ險育ｮ�: 髦ｲ蠕｡蛛ｴSPD + 髦ｲ蠕｡蛛ｴLUKﾃ�0.5 - 謾ｻ謦��LUKﾃ�0.5
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
      addLog('💎 ' + state.name + ' の「ガラスの盾」発動！ 初撃を耐えるため防御力1.2倍！', 'log-skill');
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
        addLog('🏃 ' + pState.name + ' は戦闘から撤退した！', 'log-miss');
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
      alert('MP縺瑚ｶｳ繧翫∪縺帙ｓ��ｼ亥ｿ�ｦ｀P: 8��');
      return;
    }
  }

  isPlayerTurn = false;
  enableCommandButtons(false);

  // If in active P2P session (and not bot match), route through P2P command sync
  if (currentGameMode === 'free' && p2pConn && !p2pIsBotActive) {
    addLog('竚� 縺ゅ↑縺溘�繧ｳ繝槭Φ繝峨ｒ驕ｸ謚槭＠縺滂ｼ� 逶ｸ謇九�蜈･蜉帛ｾ�■...', 'log-info');
    sendP2PCommand(playerCmd);
    return;
  }

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

  // Reverse room condition (邏�譌ｩ縺輔′菴弱＞譁ｹ縺梧掠縺�)
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
  if (sk !== 'none' && pMpAuto >= 8 && userSk.type === '繧｢繧ｯ繝�ぅ繝�') {
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

  // MP 8莉･荳翫〒繧ｹ繧ｭ繝ｫ繧剃ｽｿ逕ｨ蜿ｯ閭ｽ
  if (sk !== 'none' && enemySk.type === '繧｢繧ｯ繝�ぅ繝�' && eMp >= 8) {
    if (['heal', 'pray', 'soulshare', 'fukutsu'].includes(sk)) {
      if (sk === 'fukutsu' && eState.cur === 1) return 'skill';
      if (hpPct <= 0.4) return 'skill';
    }
    if (sk === 'blankshot' && currentTurn === 1) return 'skill';
    if (Math.random() < 0.6) return 'skill';
  }

  // MP縺御ｸ崎ｶｳ縺励※縺�ｋ髫帙√メ繝｣繝ｼ繧ｸ繧�ぎ繝ｼ繝峨〒蜉ｹ邇�ｈ縺舟P繧定ｲｯ繧√ｋ
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
    addLog('😨 ' + actor.name + ' は動けない状態になっている！', 'log-miss');
    onComplete();
    return;
  }

  // Clear defend unless they defended this turn
  if (cmd !== 'defend') actor.defending = false;

  const isCharged = actor.charged;
  const isDefending = target.defending;

  // Pre-action passive: Parry (繝代Μ繧｣ - Initial fast dodge)
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
    addLog('⚔️ ' + actor.name + ' の攻撃！', 'log-normal');
    
    // Parry activation check
    if (parried) {
      const t = setTimeout(() => {
        addLog('⚔️ ' + target.name + ' はパッシブ「パリィ」を発動！ 初回攻撃を完全回避！', 'log-skill');
        actor.charged = false;
        actor.chargeMultiplier = null;
        updateBuffsUI(actorSide, actor);
        onComplete();
      }, delay(300));
      activeTimers.push(t);
      return;
    }

    // 回避率計算
    let evasion = calculateEvasionRate(actor, target);

    if (Math.random() * 100 < evasion) {
      const t = setTimeout(() => {
        target.evasionStreak = (target.evasionStreak || 0) + 1;
        addLog('💨 ' + target.name + ' は攻撃をかわした！（回避率:' + Math.round(evasion) + '%）', 'log-miss');
        actor.charged = false;
        actor.chargeMultiplier = null;
        updateBuffsUI(actorSide, actor);
        onComplete();
      }, delay(300));
      activeTimers.push(t);
      return;
    }

    target.evasionStreak = 0; // 蜻ｽ荳ｭ縺励◆縺ｮ縺ｧ繧ｹ繝医Μ繝ｼ繧ｯ繝ｪ繧ｻ繝�ヨ
    target.evasionStreak = 0; // 蜻ｽ荳ｭ縺励◆縺ｮ縺ｧ繧ｹ繝医Μ繝ｼ繧ｯ繝ｪ繧ｻ繝ヨ
    // Critical check
    let critChance = actor.luck;
    if (actor.enmakuTurns > 0) critChance *= 0.5; // enmaku halves crit
    let isCrit = Math.random() * 100 < critChance;
    
    // Fortress (無敵) check
    if (target.fortressTurns > 0) {
      const t = setTimeout(() => {
        addLog('🏰 ' + target.name + ' は無敵状態！ ダメージを全く受けない！', 'log-miss');
        actor.charged = false;
        actor.chargeMultiplier = null;
        updateBuffsUI(actorSide, actor);
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
    addLog('⚡ ' + actor.name + ' は力をためている！（MP +2 回復 / MP:' + actor.mp + '）', 'log-info');
    checkAutoPassiveTrigger(actorSide, actor, targetSide, target);
    updateBuffsUI(actorSide, actor);
    const t = setTimeout(() => onComplete(), delay(400));
    activeTimers.push(t);

  } else if (cmd === 'defend') {
    actor.defending = true;
    actor.mp = Math.min(actor.maxMp || 10, (actor.mp || 0) + 1);
    setMp(actorSide, actor);
    addLog('🛡️ ' + actor.name + ' は身を守っている！（MP +1 回復 / MP:' + actor.mp + '）', 'log-info');
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
      addLog('💡 ' + actor.name + ' の隠された技が判明！ ➔ ' + SKILLS[sk].icon + ' 『' + SKILLS[sk].name + '』', 'log-crit');
    }

    oppLastActiveSkill(target, sk); // Store last skill for copycat
    addLog('✨ ' + actor.name + ' の『' + ((SKILLS[sk]||SKILLS.none).name) + '』！（MP -8 / MP:' + actor.mp + '）', 'log-skill');

    // 攻撃スキルの命中率・回避判定（通常攻撃と同等の回避率・パリィ・無敵判定）
    const attackSkills = ['gigabreak', 'moroha', 'sutemi', 'shuriken', 'midare', 'ichigeki', 'weakmaker', 'haisui', 'vampire', 'jackpot'];
    if (attackSkills.includes(sk)) {
      // 1. パリィ判定
      if (parried) {
        const t = setTimeout(() => {
          addLog('⚔️ ' + target.name + ' はパッシブ「パリィ」を発動！ スキルを完全回避！', 'log-skill');
          actor.charged = false;
          actor.chargeMultiplier = null;
          updateBuffsUI(actorSide, actor);
          onComplete();
        }, delay(300));
        activeTimers.push(t);
        return;
      }

      // 2. 回避率判定
      let evasion = calculateEvasionRate(actor, target);

      if (Math.random() * 100 < evasion) {
        const t = setTimeout(() => {
          addLog('💨 ' + target.name + ' はスキルの攻撃をかわした！（回避率:' + Math.round(evasion) + '%）', 'log-miss');
          actor.charged = false;
          actor.chargeMultiplier = null;
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
          addLog('🏰 ' + target.name + ' は無敵状態！ スキルダメージを全く受けない！', 'log-miss');
          actor.charged = false;
          actor.chargeMultiplier = null;
          updateBuffsUI(actorSide, actor);
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
        addLog('💥 反動！ ' + actor.name + ' は ' + recoil + ' の反動ダメージを受けた！', 'log-miss');
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
      addLog('🛡️ ' + actor.name + ' はカウンターの構えをとった！', 'log-info');
      // Wait for next hits
      onComplete();

    } else if (sk === 'midare') {
      if (Math.random() * 100 < actor.luck) {
        addLog('🎲 運気上昇！ 2回みだれうち攻撃！', 'log-skill');
        let dmg1 = Math.max(1, actor.attack - getGlassShieldDefense(target));
        let dmg2 = Math.max(1, actor.attack - getGlassShieldDefense(target));
        target.cur = Math.max(0, target.cur - dmg1);
        setHp(targetSide, target);
        addLog('🎲 1回目：' + target.name + ' に ' + dmg1 + ' のダメージ！', targetSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
        
        const t = setTimeout(() => {
          target.cur = Math.max(0, target.cur - dmg2);
          setHp(targetSide, target);
          addLog('🎲 2回目：' + target.name + ' に ' + dmg2 + ' のダメージ！', targetSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
          onComplete();
        }, delay(400));
        activeTimers.push(t);
      } else {
        addLog('🎲 みだれうちは不発に終わった…通常の攻撃！', 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'ichigeki') {
      if (Math.random() < 0.2) {
        let dmg = target.cur - 1; // Reduces target HP to 1
        if (dmg <= 0) dmg = 1;
        target.cur = 1;
        flashHit(targetSide);
        showDmgFloat(targetSide, dmg, '#ef4444');
        addLog('⚡ クリーンヒット！！！ ' + target.name + ' のHPを1にした！', 'log-crit');
        setHp(targetSide, target);
        onComplete();
      } else {
        addLog('⚡ 一撃必殺は外れた！', 'log-miss');
        actor.charged = false;
        actor.chargeMultiplier = null;
        updateBuffsUI(actorSide, actor);
        onComplete();
      }

    } else if (sk === 'charge') {
      actor.charged = true;
      actor.chargeMultiplier = 3; // 3x next turn
      addLog('⚡ 限界チャージ！ 次のターンの威力が3倍になる！', 'log-info');
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
      addLog('📉 ウィークメーカー！ ' + target.name + ' の最大能力【' + highestStat.toUpperCase() + '】を 20 減少させた！', 'log-skill');
      
      let dmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, onComplete);

    } else if (sk === 'haisui') {
      if (actor.cur <= actor.max / 2) {
        let dmg = actor.attack * 1.5;
        dmg = Math.floor(dmg);
        // Guaranteed Critical
        processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);
      } else {
        addLog('⚠️ 発動条件（HP半分以下）を満たしていない！通常の攻撃！', 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'daibogyo') {
      actor.defending = true;
      actor.daibogyoActive = true;
      actor.daibogyoTurns = 2;
      addLog('🛡️ ' + actor.name + ' は大防御の構え！ 2ターンの間、受けるダメージの80%をカット！', 'log-info');
      onComplete();
    } else if (sk === 'teppeki') {
      actor.teppekiTurns = 3;
      addLog('🧱 鉄壁の構え！ 3ターンの間、自身の防御力が2倍になる！', 'log-info');
      onComplete();

    } else if (sk === 'fudo') {
      actor.fudoActive = true;
      addLog('🧘 不動の構え！ これ以降クリティカルを受けない！', 'log-info');
      onComplete();

    } else if (sk === 'enmaku') {
      target.enmakuTurns = 2;
      addLog('💨 煙幕を撒いた！ 2ターンの間、' + target.name + ' の命中率が半減する！', 'log-info');
      onComplete();

    } else if (sk === 'shield') {
      actor.barrier = actor.luck;
      addLog('🛡️ エネルギーシールド！ 運数値(' + actor.luck + ')分のバリアを展開！', 'log-info');
      updateBuffsUI(actorSide, actor);
      onComplete();

    } else if (sk === 'heal') {
      const healAmt = Math.min(actor.max - actor.cur, Math.max(1, Math.floor(actor.max * 0.3)));
      actor.cur += healAmt;
      addLog('💖 ヒール！ 最大HPの30%(' + healAmt + ')回復した！', 'log-skill');
      setHp(actorSide, actor);
      onComplete();

    } else if (sk === 'regen') {
      actor.regenTurns = 3;
      addLog('💖 リジェネレート！ 3ターンの間、継続回復状態に入る！', 'log-info');
      onComplete();

    } else if (sk === 'vampire' || sk === '吸血') {
      let dmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, () => {
        const healAmt = Math.floor(dmg * 0.5);
        if (healAmt > 0) {
          actor.cur = Math.min(actor.max, actor.cur + healAmt);
          addLog('🦇 吸血の牙！ 与えたダメージの半分(' + healAmt + ')、自身のHPを回復した！', 'log-skill');
          setHp(actorSide, actor);
        }
        onComplete();
      });

    } else if (sk === 'pray') {
      const restore = Math.min(actor.max - actor.cur, actor.luck);
      actor.cur += restore;
      addLog('🙏 幸運の祈り！ 運の数値分 HPが ' + restore + ' 回復した！', 'log-skill');
      setHp(actorSide, actor);
      onComplete();

    } else if (sk === 'soulshare') {
      if (target.cur > actor.cur) {
        target.cur = Math.max(1, target.cur - 10);
        actor.cur = Math.min(actor.max, actor.cur + 10);
        addLog('👻 ソウルシェア！ ' + target.name + ' のHPを 10 奪い取った！', 'log-skill');
        setHp(actorSide, actor);
        setHp(targetSide, target);
      } else {
        addLog('👻 相手の方がHPが低いため、不発に終わった…', 'log-miss');
      }
      onComplete();

    } else if (sk === 'luckstrike') {
      let baseDmg = Math.max(1, actor.attack - getGlassShieldDefense(target));
      let dmg = baseDmg + actor.luck;
      addLog('🎯 ' + actor.name + ' の「頼みの一突き」！ 運の数値(' + actor.luck + ')を追加ダメージとして与える！', 'log-skill');
      processDamage(actorSide, actor, targetSide, target, dmg, false, false, onComplete);

    } else if (sk === 'blankshot') {
      if (currentTurn === 1) {
        const defReduction = Math.floor(target.defense * 0.05);
        applyBuff(target, { id: 'blankshot', name: '空砲', type: 'defense', val: -defReduction, duration: 3 });
        addLog('🎯 ' + actor.name + ' の「空砲」！ ' + target.name + ' の防御力を5%低下させた！（防御:' + target.defense + '）', 'log-skill');
        processDamage(actorSide, actor, targetSide, target, 0, false, false, onComplete);
      } else {
        addLog('🎯 空砲は1ターン目のみ有効…通常の攻撃！', 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'fukutsu') {
      if (actor.cur === 1) {
        const healAmt = Math.floor(actor.max * 0.8);
        actor.cur = Math.min(actor.max, actor.cur + healAmt);
        actor.strengthenTurns = 2;
        actor.attackMultiplier = 0.5; // Next turn attack halved (handled in processDamage)
        addLog('🔥 不屈の闘志！ 最大HPの80%(' + healAmt + ')回復したが、次ターン攻撃力半減！', 'log-skill');
        setHp(actorSide, actor);
      } else {
        addLog('🔥 残りHPが 1 の状態でのみ使用可能…通常の攻撃！', 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'paperarmor') {
      target.paperarmorTurns = 3;
      addLog('📜 紙装束の呪い！ 3ターンの間、' + target.name + ' の防御力を半分にする！', 'log-info');
      onComplete();

    } else if (sk === 'strengthen') {
      actor.strengthenTurns = 2;
      addLog('💪 筋力強化！ 2ターンの間、自身の攻撃力が1.5倍になる！', 'log-info');
      onComplete();

    } else if (sk === 'slownurse') {
      target.slownurseTurns = 3;
      addLog('🐢 鈍足の呪い！ 3ターンの間、' + target.name + ' の素早さを -20 する！', 'log-info');
      onComplete();

    } else if (sk === 'weightdown') {
      const reduction = target.defense;
      applyBuff(target, { id: 'weightdown', name: 'ウェイトダウン', type: 'speed', val: -reduction, duration: 3 });
      addLog('⚖️ ウェイトダウン！ ' + target.name + ' の素早さを防御力分(-' + reduction + ')引き下げた！', 'log-info');
      onComplete();

    } else if (sk === 'overclock') {
      actor.overclockTurns = 2;
      addLog('⚡ オーバークロック！ 2ターンの間、素早さが2倍になるが、終了時にHP5減少！', 'log-info');
      onComplete();

    } else if (sk === 'shadowstep') {
      actor.shadowstepTurns = 3;
      addLog('👤 シャドーステップ！ 3ターンの間、自身の回避率が20%増加！', 'log-info');
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
          addLog('🔄 等価交換！ お互いの現在HPを入れ替えた！', 'log-skill');
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
        addLog('🔄 等価交換！ お互いの現在HPを入れ替えた！', 'log-skill');
        setHp(actorSide, actor);
        setHp(targetSide, target);
        onComplete();
      }

    } else if (sk === 'draw') {
      actor.drawingTurns = 1;
      target.drawingTurns = 1;
      addLog('🎨 ドローイング！ このターンのダメージは無効化される！', 'log-info');
      onComplete();

    } else if (sk === 'jackpot') {
      if (actor.luck > target.luck) {
        actor.jackpotActive = true;
        addLog('🎰 ジャックポット！ 運が相手より高いため、このターン確定クリティカル！', 'log-skill');
        let dmg = actor.attack;
        dmg = Math.floor(dmg);
        processDamage(actorSide, actor, targetSide, target, dmg, true, false, onComplete);
      } else {
        addLog('🎰 運が相手以下であるため、不発…通常の攻撃！', 'log-miss');
        executeSingleAction(actorSide, 'attack', targetSide, targetCmd, onComplete);
      }

    } else if (sk === 'copy') {
      const copied = target.lastOpponentSkill;
      if (copied && copied !== 'none' && copied !== 'copy') {
        addLog('🐱 コピーキャット！ 相手が最後に使ったスキル『' + ((SKILLS[copied]||SKILLS.none).name) + '』をコピー！', 'log-skill');
        actor.skill = copied;
        executeSingleAction(actorSide, 'skill', targetSide, targetCmd, () => {
          actor.skill = 'copy'; // Restore copycat
          onComplete();
        });
      } else {
        addLog('🐱 コピーできるスキルがありません…通常の攻撃！', 'log-miss');
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
      addLog('🔄 リバースルーム！ 3ターンの間、素早さが遅い方が先手を取る空間を展開！', 'log-info');
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
    addLog('🎨 ドローイングの効果により、ダメージが無効化された！', 'log-miss');
    actor.charged = false;
    actor.chargeMultiplier = null;
    updateBuffsUI(actorSide, actor);
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
    addLog('🛡️ ' + target.name + ' は大防御の構え！ 大半を防いだが ' + penDmg + ' ダメージ貫通！', 'log-miss');
    if (actor.charged) actor.charged = false;
    // target.daibogyoActive persists for daibogyoTurns duration
    if (target.cur <= 0) {
      // 自己満足 (撃破時回復)
      const actorPassives = (actor.skillsList && Array.isArray(actor.skillsList.passive)) ? actor.skillsList.passive : [];
      if (actor.skill === 'selfsatisfaction' || actorPassives.includes('selfsatisfaction')) {
        actor.cur = Math.min(actor.max, actor.cur + 1);
        addLog('✨ ' + actor.name + ' の「自己満足」！ 敵を撃破したためHPが 1 回復した！', 'log-skill');
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

  // Handle fukutsu debuff (攻撃力半減)
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
    addLog('🛡️ エネルギーシールドが ' + absorb + ' ダメージを吸収！ バリア残り:' + target.barrier, 'log-info');
  }

  // Apply final damage to HP
  target.cur = Math.max(0, target.cur - finalDmg);

  // 自己満足 (撃破時回復)
  if (target.cur <= 0) {
    if (actor.skill === 'selfsatisfaction' || actorPassives.includes('selfsatisfaction')) {
      actor.cur = Math.min(actor.max, actor.cur + 1);
      addLog('✨ ' + actor.name + ' の「自己満足」！ 敵を撃破したためHPが 1 回復した！', 'log-skill');
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
      addLog('💥 会心の一撃！ ' + target.name + ' に ' + finalDmg + ' の大ダメージ！', 'log-crit');
    } else if (isScrap) {
      addLog('⚔️ かすり傷！ ' + target.name + ' に 1 のダメージ！', isPlayerTarget ? 'log-dmg-p' : 'log-dmg-e');
    } else {
      addLog('⚔️ ' + target.name + ' に ' + finalDmg + ' のダメージ！', isPlayerTarget ? 'log-dmg-p' : 'log-dmg-e');
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
        addLog('🛡️ ' + target.name + ' の「カウンターブロー」発動！ ダメージの1.5倍を打ち返す！', 'log-skill');
        
        actor.cur = Math.max(0, actor.cur - counterDmg);
        setHp(actorSide, actor);
        flashHit(actorSide);
        showDmgFloat(actorSide, counterDmg, '#ef4444');
        addLog('🛡️ カウンター直撃！ ' + actor.name + ' に ' + counterDmg + ' のダメージ！', actorSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
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
      addLog('🛡️ ' + target.name + ' の「未熟なカウンター」！ ダメージの10%(' + reflectDmg + ')を反射した！', 'log-skill');
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
    addLog('😨 ' + target.name + ' の「死んだふり」！ 次の1ターンお互い行動不能になる！', 'log-skill');
  }

  // 1. Toge (トゲトゲの甲羅)
  if (hasPassive(target, 'toge') && !target.togeTriggered && target.cur > 0) {
    target.togeTriggered = true;
    actor.speed = Math.max(0, actor.speed - 10);
    addLog('🌵 ' + target.name + ' の「トゲトゲの甲羅」！ ' + actor.name + ' の素早さを 10 減少させた！', 'log-skill');
  }

  // 2. Second wind (セカンド風 - HP25%以下で10回復)
  if (hasPassive(target, 'secondwind') && hpPct <= 0.25 && target.cur > 0 && !target.secondwindTriggered) {
    target.secondwindTriggered = true;
    const restore = Math.min(target.max - target.cur, 10);
    target.cur += restore;
    addLog('🍃 ' + target.name + ' の「セカンド風」！ HPが ' + restore + ' 自動回復した！', 'log-skill');
    setHp(targetSide, target);
  }

  // 3. Recycle (リサイクル - 相手のアクティブ使用に被ダメ半分回復)
  if (hasPassive(target, 'recycle') && actor.skillUsed && target.recycleHeal > 0 && target.cur > 0) {
    const restore = Math.min(target.max - target.cur, target.recycleHeal);
    target.cur += restore;
    addLog('♻️ ' + target.name + ' の「リサイクル」！ 相手のアクティブスキルダメージの半分(' + restore + ')を回復した！', 'log-skill');
    target.recycleHeal = 0; // consume
    setHp(targetSide, target);
  }

  // 4. Fortress (最後の砦 - HP20%以下で無敵1ターン)
  if (hasPassive(target, 'fortress') && hpPct <= 0.20 && target.cur > 0 && !target.fortressTriggered) {
    target.fortressTriggered = true;
    target.fortressTurns = 1;
    addLog('🏰 ' + target.name + ' の「最後の砦」発動！ 1ターンの間無敵になる！', 'log-skill');
  }

  // 5. Migawari (身代わり人形 - 致死回避)
  if (target.cur === 0 && hasPassive(target, 'migawari') && !target.migawariTriggered) {
    target.migawariTriggered = true;
    target.cur = 1;
    addLog('🪆 ' + target.name + ' の「身代わり人形」発動！ HP 1 で踏みとどまった！', 'log-skill');
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
    addLog('✨ ' + monster.name + ' の『' + newBuff.name + '』の効果時間がリセットされた！（残り ' + newBuff.duration + ' ターン）', 'log-skill');
  } else {
    // 新規付与：ステータス変化を適用して配列に保持
    if (newBuff.val && newBuff.type) {
      monster[newBuff.type] = (monster[newBuff.type] || 0) + newBuff.val;
      if (monster[newBuff.type] < 0) monster[newBuff.type] = 0;
    }
    monster.activeBuffs.push(newBuff);
    const sign = newBuff.val >= 0 ? '+' : '';
    if (newBuff.val && newBuff.type) {
      addLog('✨ ' + monster.name + ' の ' + newBuff.type.toUpperCase() + ' が ' + sign + newBuff.val + '！（' + newBuff.duration + 'ターン）', 'log-skill');
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
      addLog('🐢 ' + monster.name + ' のスキル効果『' + buff.name + '』が切れた。', 'log-info');

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
  if (state.charged) buffs.push('<span style="background:rgba(245,158,11,0.15); color:var(--accent-gold); border:1px solid rgba(245,158,11,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">⚡ ため</span>');
  if (state.defending) buffs.push('<span style="background:rgba(61,155,233,0.15); color:var(--accent-blue); border:1px solid rgba(61,155,233,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🛡️ 防御</span>');
  if (state.barrier > 0) buffs.push('<span style="background:rgba(168,85,247,0.15); color:var(--accent-purple); border:1px solid rgba(168,85,247,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🛡️ バリア(' + state.barrier + ')</span>');
  if (state.regenTurns > 0) buffs.push('<span style="background:rgba(16,185,129,0.15); color:var(--accent-green); border:1px solid rgba(16,185,129,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">💖 リジェネ(' + state.regenTurns + ')</span>');
  if (state.teppekiTurns > 0) buffs.push('<span style="background:rgba(61,155,233,0.15); color:var(--accent-blue); border:1px solid rgba(61,155,233,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🧱 防御x2(' + state.teppekiTurns + ')</span>');
  if (state.strengthenTurns > 0) buffs.push('<span style="background:rgba(239,68,68,0.15); color:var(--accent-red); border:1px solid rgba(239,68,68,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">💪 攻撃1.5倍</span>');
  if (state.shadowstepTurns > 0) buffs.push('<span style="background:rgba(245,158,11,0.15); color:var(--accent-gold); border:1px solid rgba(245,158,11,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">👤 回避率+20%</span>');
  if (state.reverseTurns > 0) buffs.push('<span style="background:rgba(168,85,247,0.15); color:var(--accent-purple); border:1px solid rgba(168,85,247,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🔄 リバース</span>');
  if (state.fortressTurns > 0) buffs.push('<span style="background:rgba(16,185,129,0.15); color:var(--accent-green); border:1px solid rgba(16,185,129,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">🏰 無敵</span>');

  if (state.activeBuffs && state.activeBuffs.length > 0) {
    state.activeBuffs.forEach(b => {
      buffs.push('<span style="background:rgba(0,212,255,0.15); color:var(--accent-cyan); border:1px solid rgba(0,212,255,0.3); padding:1px 4px; border-radius:3px; font-size:13px;">✨ ' + b.name + '(' + b.duration + ')</span>');
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
  // 譛荳企Κ荳ｭ螟ｮ縺ｫ陦ｨ遉ｺ縺吶ｋ縺溘ａ縺ｮ譁ｰ隕上Ο繧ｰ繧ｳ繝ｳ繝�リ繧貞虚逧�↓逕滓�
  let log = document.getElementById('battle-top-log');
  if (!log) {
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) {
      log = document.createElement('div');
      log.id = 'battle-top-log';
      log.style.cssText = 'position: absolute !important; top: 45px !important; left: 50% !important; transform: translateX(-50%) !important; width: 44% !important; height: 200px !important; background: rgba(0, 0, 0, 0.75) !important; border: 1px solid rgba(255, 255, 255, 0.3) !important; border-radius: 6px !important; z-index: 999 !important; padding: 8px 12px !important; box-sizing: border-box !important; overflow-y: auto !important; color: #ffffff !important; font-family: inherit !important; display: block !important; pointer-events: auto !important;';
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

  // 譛荳企Κ荳ｭ螟ｮ縺ｮ繝槭�繧ｭ繝ｼ陦ｨ遉ｺ繧ｨ繝ｪ繧｢�医ち繝ｼ繝ｳ謨ｰ蟆ら畑�峨�騾｣蜍募�逅�
  const marquee = document.getElementById('battle-marquee-log');
  if (marquee && msg.includes('繧ｿ繝ｼ繝ｳ')) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = msg;
    const rawText = tempDiv.textContent || tempDiv.innerText || msg;
    // 縲娯螺 繧ｿ繝ｼ繝ｳ 1 笳�阪�繧医≧縺ｪ陦ｨ險倥°繧峨後ち繝ｼ繝ｳ 1縲阪ｒ蛻�ｊ蜃ｺ縺励※邯ｺ鮗励↓陦ｨ遉ｺ
    const cleanTurn = rawText.match(/繧ｿ繝ｼ繝ｳ\s*\d+/);
    if (cleanTurn) {
      marquee.textContent = cleanTurn[0];
    } else {
      marquee.textContent = rawText.replace(/[笳�s]/g, '');
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
    txt.textContent = 'HP �滂ｼ滂ｼ� / �滂ｼ滂ｼ�';
  } else {
    txt.textContent = 'HP ' + state.cur + ' / ' + state.max;
  }
}

// 繝代ャ繧ｷ繝悶せ繧ｭ繝ｫ蛻､螳壹�繝ｫ繝代��嘖kill 縺ｾ縺溘� passiveSkill 縺ｫ謖�ｮ唔D縺悟性縺ｾ繧後※縺�ｋ縺狗｢ｺ隱�
function hasPassive(actor, skillId) {
  if (!actor) return false;
  if (actor.passiveSkill === skillId) return true;
  if (actor.skill === skillId) return true;
  return false;
}

// 繝代ャ繧ｷ繝悶せ繧ｭ繝ｫ縺ｮ閾ｪ蜍筆P豸郁ｲｻ逋ｺ蜍輔す繧ｹ繝�Β (MP 8莉･荳翫〒閾ｪ蜍慕匱蜍輔＠縲｀P 8繧呈ｶ郁ｲｻ縺励※蠑ｷ蜉帙↑蜉ｹ譫懊ｒ驕ｩ逕ｨ)
function checkAutoPassiveTrigger(actorSide, actor, targetSide, target) {
  if (!actor || actor.cur <= 0) return;
  const psk = actor.passiveSkill || (actor.skillsList && actor.skillsList.passive && actor.skillsList.passive[0]) || 'none';
  if (psk === 'none') return;
  
  const skInfo = SKILLS[psk];
  if (!skInfo || skInfo.type !== '繝代ャ繧ｷ繝�') return;

  // MP縺�8莉･荳翫≠繧九°繝√ぉ繝�け
  const curMp = (actor.mp !== undefined) ? actor.mp : 10;
  if (curMp < 8) return;

  // MP 8 を消費
  actor.mp = Math.max(0, curMp - 8);
  setMp(actorSide, actor);

  addLog('✨ ' + actor.name + ' のパッシブスキル『' + skInfo.name + '』が自動発動！（MP 8消費 / 残MP:' + actor.mp + '）', 'log-crit');

  // スキルごとのパッシブ効果を発動
  if (psk === 'secondwind') {
    const heal = Math.min(actor.max - actor.cur, Math.floor(actor.max * 0.4) || 25);
    actor.cur += heal;
    setHp(actorSide, actor);
    addLog('🍃 『' + skInfo.name + '』 活力がみなぎり、生命力が ' + heal + ' 回復した！', actorSide === 'p' ? 'log-dmg-p' : 'log-dmg-e');
  } else if (psk === 'fortress') {
    actor.fortressTurns = 1;
    addLog('🏰 『' + skInfo.name + '』 鉄壁の結界を展開！ 1ターンの間無敵状態となった！', 'log-skill');
  } else if (psk === 'heavyatk') {
    actor.strengthenTurns = 2;
    addLog('💪 『' + skInfo.name + '』 剛力解放！ 2ターンの間、攻撃威力が1.5倍に上昇！', 'log-skill');
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
    addLog('🛡️ 『' + skInfo.name + '』 守護のオーラ！ 2ターンの間、防御力が2倍に上昇！', 'log-skill');
  } else if (psk === 'recycle' || psk === 'selfsatisfaction') {
    actor.regenTurns = 3;
    addLog('💖 『' + skInfo.name + '』 生命の循環！ 3ターンの間リジェネレート(毎ターン継続回復)が付与された！', 'log-skill');
  } else if (psk === 'fdice' || psk === 'pressure') {
    applyBuff(actor, { id: 'psk_luck_boost', name: skInfo.name, type: 'luck', val: 15, duration: 2 });
    if (target) target.scared = true;
  } else if (psk === 'migawari' || psk === 'playdead') {
    actor.barrier = (actor.barrier || 0) + 20;
    addLog('🪆 『' + skInfo.name + '』 身代わりの防護壁！ ダメージを20肩代わりするバリアを展開した！', 'log-skill');
  } else {
    // 汎用パッシブ（particularityなど）：攻防ブースト
    actor.strengthenTurns = 2;
    actor.teppekiTurns = 2;
    addLog('✨ 『' + skInfo.name + '』 潜在能力が極限覚醒！ 2ターンの間、攻撃1.5倍＆防御2倍！', 'log-skill');
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
      if (cur < 8 || state.skill === 'none' || userSk.type === '繝代ャ繧ｷ繝�') {
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

  // 陲ｫ蠑ｾ繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｮ逕ｻ蜒丈ｸ翫↓縲悟�繧区万繧∵脈謦�お繝輔ぉ繧ｯ繝医阪ｒ蜍慕噪逕滓�縺励※荳髢�＆縺帙ｋ
  const slash = document.createElement('div');
  slash.className = 'slash-effect';
  if (icon.parentNode) {
    icon.parentNode.appendChild(slash);
    // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ螳御ｺ�ｾ後↓隕∫ｴ�繧定�蜍輔け繝ｪ繝ｼ繝ｳ繧｢繝��
    setTimeout(() => {
      slash.remove();
    }, 300);
  }

  // 騾｣邯壹ヲ繝�ヨ譎ゅ�蜑阪�繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ繧偵く繝｣繝ｳ繧ｻ繝ｫ
  if (icon._hitAnim) { try { icon._hitAnim.cancel(); } catch(e){} icon._hitAnim = null; }

  // 繝吶�繧ｹtransform繧剃ｿ晄戟�域雰:scaleX(-1) / 蜻ｳ譁ｹ:縺ｪ縺暦ｼ�
  // 繝吶繧ｹtransform繧剃ｿ晄戟域雰:scaleX(-1) / 蜻ｳ譁ｹ:縺ｪ縺暦ｼ
  const base = isEnemy ? 'scaleX(-1) scale(1.5)' : 'scale(1.5)';
  const baseFilter = isEnemy
    ? 'drop-shadow(0 20px 8px rgba(0,0,0,0.55)) drop-shadow(0 0 15px rgba(239,68,68,0.3))'
    : 'drop-shadow(0 20px 8px rgba(0,0,0,0.55)) drop-shadow(0 0 15px rgba(0,212,255,0.3))';

  // Web Animations APIでマイルドな被弾演出
  icon._hitAnim = icon.animate([
    { transform: base + ' translate(0, 0)', filter: 'brightness(1)', offset: 0 },
    { transform: base + ' translate(-4px, -3px)', filter: 'brightness(1.6) drop-shadow(0 0 10px rgba(255,255,255,0.4))', offset: 0.15 },
    { transform: base + ' translate(4px, 1px)', filter: 'brightness(1.3)', offset: 0.3 },
    { transform: base + ' translate(-2px, 0)', filter: 'brightness(1)', offset: 0.5 },
    { transform: base + ' translate(2px, 0)', filter: 'brightness(1)', offset: 0.7 },
    { transform: base + ' translate(0, 0)', filter: baseFilter, offset: 1 }
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
  const d = 'M ' + startX + ' ' + startY + ' Q ' + ((startX + endX) / 2) + ' ' + controlY + ' ' + endX + ' ' + endY;
  
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
    advice = '⚡ [TARGET ELIMINATION]: 相手の残りHPは1です！確実に先制できるスキル、または通常攻撃で仕留めましょう。';
  } else if (pState.cur < pState.max * 0.3) {
    advice = '⚠️ [CRITICAL HEALTH]: 自身のHPが大幅に低下しています！防御を固めるか、回復スキルで凌いでください。';
  } else if (eState.speed > pState.speed) {
    advice = '🏃 [SPEED DISADVANTAGE]: 相手のSPD(' + eState.speed + ')はこちらのSPD(' + pState.speed + ')を上回っています。先制攻撃に備えてください。';
  } else if (pState.speed > eState.speed) {
    advice = '⚔️ [INITIATIVE ADVANTAGE]: こちらのSPD(' + pState.speed + ')が勝っています。相手より早く行動可能です。攻勢に出ましょう！';
  } else {
    advice = '🎯 [TACTICAL INFO]: お互いの実力は拮抗しています。敵の出方を見極めてコマンドを決定してください。';
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
    addLog('笞厄ｸ� 逶ｸ謇薙■�∝ｼ輔″蛻�￠��', 'log-miss');
    const t = setTimeout(() => showResult(), delay(600));
    activeTimers.push(t);
  } else if (eState.cur <= 0) {
    addLog('�脂 ' + pState.name + ' 縺ｮ蜍晏茜��', 'log-crit');
    const t = setTimeout(() => showResult(), delay(600));
    activeTimers.push(t);
  } else if (pState.cur <= 0) {
    addLog('�逐 ' + pState.name + ' 縺ｯ蛟偵ｌ縺溪ｦ', 'log-miss');
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

  // 繝�ヵ繧ｩ繝ｫ繝医〒縺ｯ荳｡譁ｹ縺ｮ繝懊ち繝ｳ繧定｡ｨ遉ｺ
  if (nextBtn) nextBtn.style.display = 'block';
  if (labBtn) labBtn.style.display = 'block';

  // 蜍晄風豎ｺ螳壽凾縺ｮBGM蜀咲函�医Ν繝ｼ繝怜�逕滂ｼ�
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
      sub.textContent = pState.name + ' が ' + eState.name + ' を撃破した！';
      record.win++;
      nextBtn.textContent = '👉 次へ';
    } else {
      banner.textContent = 'DEFEAT...';
      banner.style.color = 'var(--accent-red)';
      banner.style.textShadow = '0 0 10px rgba(239,68,68,0.5)';
      if (panel) panel.style.borderColor = 'var(--accent-red)';
      sub.textContent = pState.name + ' は ' + eState.name + ' に敗れた…';
      record.lose++;
      nextBtn.textContent = '👉 次へ';
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
    sub.textContent = pState.name + ' が ' + eState.name + ' を撃破した！';
    record.win++;

    // 繝ｩ繧ｹ繝懊せ隕視謌ｦ蜍晏茜譎: 縲後Λ繝懊∈縲阪繧ｿ繝ｳ繧帝國縺励€√繧ｿ繝ｳ驕ｸ謚櫁い繧偵€交泓ｺ乗ｬ｡縺ｸ縲阪1縺､縺ｫ縺吶ｋ
    if (currentGameMode === 'boss-revenge') {
      if (labBtn) labBtn.style.display = 'none';
      nextBtn.textContent = '👉 次へ';
      save();
      updateRecord();
      const modal = document.getElementById('battle-result-modal');
      if (modal) modal.style.display = 'flex';
      return;
    }

    if (currentGameMode === 'league') {
      stageIndex++;
      if (stageIndex >= STAGE_ENEMIES.length) {
        sub.textContent = pState.name + ' が ' + eState.name + ' を撃破した！ 🎉 リーグ全ステージクリア！ おめでとう！';
        nextBtn.textContent = '🔄 最初から挑戦';
        // Win reward trigger
        setTimeout(() => showScrollReward(), 1500);
      } else {
        nextBtn.textContent = '👉 次のステージへ';
      }
    } else if (currentGameMode === 'survival') {
      survivalWins++;
      if (survivalWins > survivalBestRecord) {
        survivalBestRecord = survivalWins;
      }
      sub.textContent += ' 🎉 ' + survivalWins + '連勝達成！ (BEST: ' + survivalBestRecord + ')';
      nextBtn.textContent = '⚔️ 次の対戦へ (' + survivalWins + '連勝中)';
    } else {
      nextBtn.textContent = '👉 もう一度対戦';
    }

  } else if (eState.cur > 0 && pState.cur <= 0) {
    banner.textContent = 'DEFEAT...';
    banner.style.color = 'var(--accent-red)';
    banner.style.textShadow = '0 0 10px rgba(239,68,68,0.5)';
    if (panel) panel.style.borderColor = 'var(--accent-red)';
    sub.textContent = pState.name + ' は ' + eState.name + ' に敗れた…';
    record.lose++;

    // Tutorial boss defeat event
    if (gameProgress.tutorialStep === 2 && currentEnemy && (currentEnemy.name.includes('視察'))) {
      record.lose--; // Don't count tutorial defeat in stats
      save();
      updateRecord();
      
      const modal = document.getElementById('battle-result-modal');
      const labBtn = document.getElementById('battle-result-lab') || document.querySelector('.result-btn.secondary');
      
      if (labBtn) labBtn.style.display = 'none';
      if (nextBtn) {
        nextBtn.style.display = 'inline-block';
        nextBtn.textContent = '👉 次へ';
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

    // ラストボス視察戦敗北時: 「次へ」ボタンを隠し、ボタン選択肢を「🔬 ラボへ」の1つにする
    if (currentGameMode === 'boss-revenge') {
      if (nextBtn) nextBtn.style.display = 'none';
      save();
      updateRecord();
      const modal = document.getElementById('battle-result-modal');
      if (modal) modal.style.display = 'flex';
      return;
    }

    if (currentGameMode === 'survival') {
      sub.textContent += ' 💔 連勝記録は ' + survivalWins + ' でストップしました。(BEST: ' + survivalBestRecord + ')';
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
        alert('繝輔Μ繝ｼ蝗｣菴捺姶邨ゆｺ�ｼ―n\n縲仙ｯｾ謌ｦ邨先棡縲曾n縺ゅ↑縺滂ｼ�' + w + '蜍拿n縺ゅ＞縺ｦ��' + l + '蜍拿n\n' + (w > l ? '�脂 隕倶ｺ句享縺｡雜翫＠縺ｾ縺励◆�√♀繧√〒縺ｨ縺�ｼ�' : '�逐 諠懊＠縺上ｂ雋�縺代※縺励∪縺�∪縺励◆縲ゆｿｮ陦後＠逶ｴ縺励∪縺励ｇ縺�ｼ�'));
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
    // 繝輔Μ繝ｼ蟇ｾ謌ｦ邨ゆｺ�ｾ後↓繝ｩ繝懊↓謌ｻ繧区凾縺ｯ縲√ヵ繝ｪ繝ｼ繝舌ヨ繝ｫ逕ｨ繝ｩ繝懊ち繝悶ｒ閾ｪ蜍慕噪縺ｫ驕ｸ謚�
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

      let html = '<div class="slot-card-header">';
      html += '<div style="display:flex; align-items:center; gap:8px;">';
      html += '<span style="font-weight:bold; font-size:16px; color:var(--accent-gold);">SLOT ' + i + '</span>';
      if (isActive) html += '<span style="font-size:11px; background:var(--accent-gold); color:#000; font-weight:bold; padding:1px 6px; border-radius:3px;">選択中</span>';
      html += '</div>';
      html += '<span class="slot-badge in-use">プレイ中</span>';
      html += '</div>';
      html += '<div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:2px;">';
      html += '<div style="font-size:18px; font-weight:bold; color:var(--text-primary);">' + data.playerName + '</div>';
      html += '<div style="font-size:12px; color:var(--text-dim);">最終保存: ' + (data.updatedAt || '不明') + '</div>';
      html += '</div>';
      html += '<div style="font-size:13px; color:var(--text-secondary); display:flex; gap:12px; flex-wrap:wrap; margin-top:2px;">';
      html += '<span>⚔️ STAGE ' + stageStr + '</span>';
      html += '<span>📜 スキル解明: ' + unlockedCount + '/30 (' + pct + '%)</span>';
      html += '<span>🏆 戦績: ' + wins + '勝 ' + loses + '敗</span>';
      html += '</div>';
      html += '<div class="slot-actions">';
      html += '<button class="btn-secondary" style="padding:4px 12px; font-size:13px; border-color:var(--accent-cyan); color:var(--accent-cyan);" onclick="loadGameFromSlot(' + i + ')">▶ つづきから</button>';
      html += '<button class="btn-secondary" style="padding:4px 12px; font-size:13px; border-color:rgba(245,158,11,0.4); color:var(--accent-gold);" onclick="manualSaveToSlot(' + i + ')">💾 上書き保存</button>';
      html += '<button class="btn-secondary" style="padding:4px 10px; font-size:13px; border-color:rgba(239,68,68,0.4); color:var(--accent-red);" onclick="deleteSlotConfirm(' + i + ')">🗑️ 削除</button>';
      html += '</div>';

      card.innerHTML = html;
    } else {
      let html = '<div class="slot-card-header">';
      html += '<span style="font-weight:bold; font-size:16px; color:var(--text-dim);">SLOT ' + i + '</span>';
      html += '<span class="slot-badge empty">新規データ (Empty)</span>';
      html += '</div>';
      html += '<div style="font-size:14px; color:var(--text-dim); padding:8px 0;">セーブデータがありません</div>';
      html += '<div class="slot-actions">';
      html += '<button class="title-btn" style="padding:4px 16px; font-size:14px;" onclick="startNewGameInSlot(' + i + ')">✨ はじめから</button>';
      html += '</div>';

      card.innerHTML = html;
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
  alert('SLOT ' + slotId + ' に保存しました！');
}

function startNewGameInSlot(slotId) {
  activeSlotId = slotId;
  deleteSlotData(slotId);
  resetMemoryState();
  closeSaveSlotModal();
  showNameDialog();
}

async function deleteSlotConfirm(slotId) {
  const result = await showConfirmModal('SLOT ' + slotId + ' のセーブデータを本当に削除しますか？\n(削除されたデータは二度と復元できません)');
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
  const pName = playerName || '荳ｻ莠ｺ蜈ｬ';
  showStoryDialog([
    { speaker: pName, text: '縲後↑縲√↑繧薙□繧医％繧娯ｦ窶ｦ�� 縺薙ｓ縺ｪ縺ｫ縺ゅ▲縺輔ｊ蛟偵＆繧後ｋ縺ｪ繧薙※窶ｦ窶ｦ縺昴ｓ縺ｪ縺ｮ縺ゅｊ縺九ｈ��ｼ溘�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '隕�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '縲娯ｦ窶ｦ繧ｬ繝�き繝ｪ縺輔○縺ｪ縺�〒縺上ｌ縲ょ鴨閾ｪ諷｢縺ｮ逕ｰ闊手�′縲√◆縺�謨ｰ蛟､繧帝←蠖薙↓蜑ｲ繧頑険縺｣縺溘□縺代�縲弱ざ繝溘け繧ｺ縲上ｒ蠑輔″騾｣繧後※縺上ｋ縺ｨ縺ｯ縺ｪ縲ゅ�', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: pName, text: '縲後ざ繝溘け繧ｺ縺�縺ｨ窶ｦ窶ｦ��ｼ� 繧ｪ繝ｬ縺ｮ逶ｸ譽偵ｒ繝舌き縺ｫ縺吶ｋ縺ｪ�√�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '隕�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '縲御ｺ句ｮ溘ｒ險縺｣縺ｦ縺�ｋ縺ｮ縺�縲ゅ％縺ｮ荳也阜縺ｫ縺翫＞縺ｦ縲√せ繝��繧ｿ繧ｹ縺ｮ謨ｰ蛟､繧偵←縺��蛻�☆繧九°窶ｦ窶ｦ縺昴＠縺ｦ縺ｩ繧薙↑繧ｹ繧ｭ繝ｫ繧�1縺､繧ｻ繝�ヨ縺吶ｋ縺九√◎縺ｮ縲弱ン繝ｫ繝峨上↓縺薙◎逵溘�蠑ｷ縺輔′螳ｿ繧九�n\n縺雁燕縺ｮ繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺ｫ縺ｯ菴輔�謌ｦ逡･繧ゅ∝ｰ悶▲縺溷ｼｷ縺包ｼ医ン繝ｫ繝会ｼ峨ｂ蟄伜惠縺励↑縺�ゅ％繧後〒縺ｯ謌ｦ縺�ｻ･蜑阪�蝠城｡後□縲ゅ�', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: pName, text: '縲後�繝ｻ繝ｻ繝ｻ繝ｻ繝ｻ縲�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '隕�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '縲檎┌遏･縺ｪ闍･閠�ｈ縲∬｡励�繝ｩ繝懊∈謌ｻ繧九′縺�＞縲ゅΔ繝ｳ繧ｹ繧ｿ繝ｼ繧剃ｽ懊ｊ逶ｴ縺励�100縺ｨ縺�≧髯舌ｉ繧後◆繝昴う繝ｳ繝医ｒ遐斐℃貔�∪縺帙ゅせ繧ｭ繝ｫ縺ｮ繧ｷ繝翫ず繝ｼ繧堤炊隗｣縺励∫悄縺ｫ蠑ｷ縺�ン繝ｫ繝峨ｒ邨�∩荳翫￡縺溘↑繧俄ｦ窶ｦ縺ｾ縺溽ｧ√↓謖第姶縺吶ｋ縺後＞縺�ゅヵ繝上ワ繝擾ｼ√�', color: '#ef4444', speakerTextColor: '#fff' },
  ], () => {
    gameProgress.tutorialStep = 3;
    save();
    goScreen('lab');
  });
}

function onColosseumPreBattleStoryEnd() {
  // 1. 繝�く繧ｹ繝医え繧｣繝ｳ繝峨え繧帝哩縺倥ｋ
  // 2. 縲後ヰ繝医Ν髢句ｧ具ｼ√阪�繧ｿ繝ｳ繧呈ｴｻ諤ｧ蛹厄ｼ医け繝ｪ繝�け蜿ｯ閭ｽ迥ｶ諷九↓��
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
  // 1. 繝�く繧ｹ繝医え繧｣繝ｳ繝峨え繧帝哩縺倥ｋ
  // 2. 繝槭ャ繝礼判髱｢縺ｸ驕ｷ遘ｻ縺励√�繝ｬ繧､繝､繝ｼ縺後ち繝��縺ｧ遘ｻ蜍輔〒縺阪ｋ繧医≧縺ｫ繧ｳ繝ｭ繧ｷ繧｢繝��磯利謚蝣ｴ�峨�繧｢繧､繧ｳ繝ｳ繧偵ワ繧､繝ｩ繧､繝域ｼ泌�
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
  speakerEl.textContent = item.speaker || '繝翫Ξ繝ｼ繧ｷ繝ｧ繝ｳ';
  speakerEl.style.background = item.color || 'var(--accent-gold)';
  speakerEl.style.color = item.speakerTextColor || '#000';
  textEl.textContent = item.text;
  overlay.style.display = 'flex';
}

// ============================================================
//  TUTORIAL PROGRESSION SYSTEM
// ============================================================

const REWARD_SHOP_ITEMS = [
  { id: 'robo', name: '�､� 繝ｭ繝懊す繝ｪ繝ｼ繧ｺ', sub: '繝｡繧ｫ繝九き繝ｫ蟆城嚏', desc: '繝｡繧ｿ繝ｫ繝ｻ讖滓｢ｰ邉ｻ縺ｮ菴懈�讓ｩ繧偵い繝ｳ繝ｭ繝�け', system: 'metal', price: 500 },
  { id: 'shin', name: '笞｡ 逾槭す繝ｪ繝ｼ繧ｺ', sub: '逾櫁ｩｱ縺ｮ閨夜利螢ｫ', desc: '謔ｪ鬲費ｼ医ョ繝薙Ν�臥ｳｻ縺ｮ菴懈�讓ｩ繧偵い繝ｳ繝ｭ繝�け', system: 'devil', price: 500 },
  { id: 'dinosaur', name: '�ｦ� 諱千ｫ懊す繝ｪ繝ｼ繧ｺ', sub: '螟ｪ蜿､ of 隕��', desc: '繝峨Λ繧ｴ繝ｳ邉ｻ縺ｮ菴懈�讓ｩ繧偵い繝ｳ繝ｭ繝�け', system: 'dragon', price: 500 },
  { id: 'toy', name: '�ｧｸ 縺ｬ縺�＄繧九∩繧ｷ繝ｪ繝ｼ繧ｺ', sub: '繝代ャ繝√Ρ繝ｼ繧ｯ', desc: '讀咲黄�郁�辟ｶ�臥ｳｻ縺ｮ菴懈�讓ｩ繧偵い繝ｳ繝ｭ繝�け', system: 'plant', price: 500 },
  { id: 'ghost', name: '�ｦ� 螯匁ｪ繧ｷ繝ｪ繝ｼ繧ｺ', sub: '逋ｾ鬯ｼ螟懆｡�', desc: '繧｢繝ｳ繝�ャ繝峨�螯匁ｪ邉ｻ縺ｮ菴懈�讓ｩ繧偵い繝ｳ繝ｭ繝�け', system: 'undead', price: 500 },
  
  // 閧ｲ謌舌�諡｡蠑ｵ繧｢繧､繝�Β
  { id: 'item_expand_slot_2', name: '�匠 繝｢繝ｳ繧ｹ繧ｿ繝ｼ譫�諡｡蠑ｵ (+2)', sub: '繝ｩ繝懊こ繝ｼ繧ｸ諡｡蠑ｵ', desc: '繝｢繝ｳ繧ｹ繧ｿ繝ｼ菫晉ｮ｡譫�繧呈怙螟ｧ+2譫�諡｡蠑ｵ縺励∪縺呻ｼ亥叉譎ょ渚譏��峨�', isItem: true, price: 500 },
  { id: 'item_reset_stats', name: '�抽 繧ｹ繝��繧ｿ繧ｹ繝ｪ繧ｻ繝�ヨ阮ｬ', sub: '閧ｲ謌舌Μ繧ｻ繝�ヨ', desc: '繝｢繝ｳ繧ｹ繧ｿ繝ｼ1菴薙�閭ｽ蜉幃�蛻�ｒ蛻晄悄蛹悶＠100pt繧貞�驟榊�縺ｧ縺阪∪縺吶�', isItem: true, price: 300 },
  { id: 'item_change_skill', name: '�糖 繧ｹ繧ｭ繝ｫ蜀肴ｧ区�阮ｬ', sub: '繧ｹ繧ｭ繝ｫ蜀肴歓驕ｸ', desc: '繝｢繝ｳ繧ｹ繧ｿ繝ｼ1菴薙�繧｢繧ｯ繝�ぅ繝悶せ繧ｭ繝ｫ繧偵Λ繝ｳ繝繝�縺ｫ螟画峩縺励∪縺吶�', isItem: true, price: 300 }
];


function showSeriesPreview(seriesId) {
  const item = REWARD_SHOP_ITEMS.find(i => i.id === seriesId);
  if (!item) return;
  
  // 繧ｷ繝ｪ繝ｼ繧ｺ縺ｫ蟇ｾ蠢懊☆繧九Δ繝ｳ繧ｹ繧ｿ繝ｼ遞ｮ譌丞錐縺ｾ縺溘�繧ｫ繝�ざ繝ｪ蜷阪〒繝輔ぅ繝ｫ繧ｿ繝ｼ
  let monsters = [];
  if (typeof additionalMonsters !== 'undefined') {
    if (seriesId === 'robo') monsters = additionalMonsters.filter(m => m.category === '繝ｭ繝�');
    else if (seriesId === 'shin') monsters = additionalMonsters.filter(m => m.category === '逾�');
    else if (seriesId === 'dinosaur') monsters = additionalMonsters.filter(m => m.category === '諱千ｫ�');
    else if (seriesId === 'toy') monsters = additionalMonsters.filter(m => m.category === '縺ｬ縺�＄繧九∩');
    else if (seriesId === 'ghost') monsters = additionalMonsters.filter(m => m.category === '螯匁ｪ');
  }
  
  const modal = document.getElementById('series-preview-modal');
  const titleEl = document.getElementById('preview-modal-title');
  const subEl = document.getElementById('preview-modal-sub');
  const gridEl = document.getElementById('preview-modal-grid');
  
  if (!modal || !gridEl) return;
  
  titleEl.textContent = item.name + ' - 収録モンスター一覧';
  subEl.textContent = '『' + item.sub + '』 解放後に作成可能となるモンスタービジュアル';
  
  gridEl.innerHTML = '';
  monsters.forEach(m => {
    const card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:14px 10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;';
    
    let html = '<img src="' + m.image + '" style="height:90px; width:auto; object-fit:contain; filter:drop-shadow(0 0 10px rgba(0,212,255,0.4));">';
    html += '<div style="font-weight:bold; font-size:14px; color:var(--text-primary); margin-top:4px;">' + m.name + '</div>';
    html += '<div style="font-size:11px; color:var(--accent-cyan);">種族: ' + m.category + '</div>';
    card.innerHTML = html;
    gridEl.appendChild(card);
  });
  
  modal.style.display = 'flex';
}

function closeSeriesPreview() {
  const modal = document.getElementById('series-preview-modal');
  if (modal) modal.style.display = 'none';
}

function renderRewardShop() {
  const shopBp = document.getElementById('shop-bp-display');
  const activeBp = (typeof debugMode !== 'undefined' && debugMode) ? 9999 : bp;
  if (shopBp) shopBp.textContent = activeBp + ' BP';
  
  const container = document.getElementById('shop-items-list');
  if (!container) return;
  container.innerHTML = '';
  
  REWARD_SHOP_ITEMS.forEach(item => {
    const isUnlocked = !item.isItem && isSeriesUnlocked(item.id);
    const card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; transition:all 0.2s;';
    
    let buttonHtml = '';
    if (isUnlocked) {
      buttonHtml = '<button class="btn-secondary" style="border-color:var(--accent-green); color:var(--accent-green); cursor:default; font-weight:bold;" disabled>✓ 解放済み</button>';
    } else {
      const activeBp = (typeof debugMode !== 'undefined' && debugMode) ? 9999 : bp;
      const price = item.price || 500;
      const canBuy = activeBp >= price;
      buttonHtml = '<button class="title-btn" style="padding:8px 16px; font-size:13px; ' + (!canBuy ? 'opacity:0.5; cursor:not-allowed; background:#475569; color:#cbd5e1; box-shadow:none;' : '') + '" ' + (!canBuy ? 'disabled' : '') + ' onclick="buyShopItem(\'' + item.id + '\')">' + price + ' BPで購入</button>';
    }
    
    const previewBtnHtml = !item.isItem ? '<button class="btn-secondary" style="padding:6px 12px; font-size:12px; margin-right:8px; color:var(--accent-cyan); border-color:rgba(0,212,255,0.4);" onclick="showSeriesPreview(\'' + item.id + '\')">👁️ プレビュー</button>' : '';

    let cardHtml = '<div style="text-align:left;">';
    cardHtml += '<div style="font-weight:bold; font-size:16px; color:var(--text-primary);">' + item.name + '</div>';
    cardHtml += '<div style="font-size:12px; color:var(--accent-gold); margin-top:2px;">『' + item.sub + '』</div>';
    cardHtml += '<div style="font-size:13px; color:var(--text-dim); margin-top:4px;">' + item.desc + '</div>';
    cardHtml += '</div>';
    cardHtml += '<div style="display:flex; align-items:center;">';
    cardHtml += previewBtnHtml;
    cardHtml += buttonHtml;
    cardHtml += '</div>';

    card.innerHTML = cardHtml;
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
  if (labCount) labCount.textContent = '�箔 隗｣謾ｾ貂医∩繧ｹ繧ｭ繝ｫ: ' + sp.count + ' / ' + sp.total;
  const meterFill = document.getElementById('skill-meter-fill');
  if (meterFill) meterFill.style.width = sp.pct + '%';
  const meterText = document.getElementById('skill-meter-text');
  if (meterText) meterText.textContent = '�糖 繧ｹ繧ｭ繝ｫ隗｣譏主ｺｦ: ' + sp.count + '/' + sp.total + ' (' + sp.pct + '%)';
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
  
  // 繧ｹ繧ｭ繝ｫ隗｣譏取焚縺�30�亥�隗｣謾ｾ�峨↓驕斐＠縺ｦ縺�ｋ縺九メ繧ｧ繝�け縺励※隕�視繝ｪ繝吶Φ繧ｸ縺ｮ繝輔Λ繧ｰ繧呈峩譁ｰ
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
      if (tooltipEl) tooltipEl.innerHTML = '🛡️ 武舞台（団体戦）<br><span style="font-size:10px; color:#aaa;">3vs3トーナメント (所持BP: ' + bp + ' BP)</span>';
    } else {
      mapTeam.classList.add('locked');
      if (lockEl) lockEl.style.display = 'block';
      if (tooltipEl) tooltipEl.innerHTML = '🛡️ 武舞台（団体戦）<br><span style="font-size:10px; color:#ef4444; font-weight:bold;">🔒 スキル解明度50%で解放</span>';
    }
  }
  if (mapTower) {
    const lockEl = document.getElementById('map-lock-tower');
    const tooltipEl = mapTower.querySelector('.map-area-tooltip');
    if (sp.pct >= 50) {
      mapTower.classList.remove('locked');
      if (lockEl) lockEl.style.display = 'none';
      if (tooltipEl) tooltipEl.innerHTML = '🗼 試練のタワー<br><span style="font-size:10px; color:#aaa;">サバイバル勝ち抜き戦</span>';
    } else {
      mapTower.classList.add('locked');
      if (lockEl) lockEl.style.display = 'block';
      if (tooltipEl) tooltipEl.innerHTML = '🗼 試練のタワー<br><span style="font-size:10px; color:#ef4444; font-weight:bold;">🔒 スキル解明度50%で解放</span>';
    }
  }
  if (mapRevenge) {
    const lockEl = document.getElementById('map-lock-boss-revenge');
    const tooltipEl = document.getElementById('boss-revenge-tooltip');
    
    // 蟶ｸ譎 flex 陦ｨ遉ｺ
    mapRevenge.style.display = 'flex';
    
    if (gameProgress.bossRevengeUnlocked) {
      mapRevenge.classList.remove('locked');
      if (lockEl) lockEl.style.display = 'none';
      if (tooltipEl) tooltipEl.innerHTML = '👑 視察リベンジマッチ<br><span style="font-size:10px; color:#fff;">闘技場の視察へリベンジ</span>';
    } else {
      mapRevenge.classList.add('locked');
      if (lockEl) lockEl.style.display = 'block';
      if (tooltipEl) tooltipEl.innerHTML = '👑 視察リベンジマッチ<br><span style="font-size:10px; color:#ef4444; font-weight:bold;">🔒 スキル30個全解放でアンロック</span>';
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
  
  // 笘� 繝√Η繝ｼ繝医Μ繧｢繝ｫ荳ｭ縺ｮ繝槭ャ繝苓｡悟虚蛻ｶ髯�
  if (gameProgress.tutorialStep === 1) {
    if (facility !== 'lab') {
      alert('縲舌メ繝･繝ｼ繝医Μ繧｢繝ｫ荳ｭ縲代∪縺壹�繝｢繝ｳ繧ｹ繧ｿ繝ｼ遐皮ｩｶ謇�医Λ繝懶ｼ峨∈蜷代°縺�∪縺励ｇ縺�ｼ�');
      return;
    }
  } else if (gameProgress.tutorialStep === 2) {
    if (facility !== 'league') {
      alert('縲舌メ繝･繝ｼ繝医Μ繧｢繝ｫ荳ｭ縲代�繝√→蜈ｱ縺ｫ繧ｳ繝ｭ繧ｷ繧｢繝��磯利謚蝣ｴ�峨∈蜷代°縺�∬ｦ�視 繝ｴ繧｣繧ｯ繧ｿ繝ｼ縺ｫ謖第姶縺励∪縺励ｇ縺�ｼ�');
      return;
    }
  } else if (gameProgress.tutorialStep === 3) {
    const activeLab = getActiveLab ? getActiveLab() : [];
    if (activeLab.length < 2 && facility !== 'lab') {
      alert('縲舌メ繝･繝ｼ繝医Μ繧｢繝ｫ荳ｭ縲代∪縺壹�繝ｩ繝懊〒譁ｰ縺励＞繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧堤函縺ｿ蜃ｺ縺励∪縺励ｇ縺�ｼ�');
      return;
    }
  }

  if (facility === 'team-arena') {
    if (sp.pct < 50) {
      alert('縲先ｭｦ闊槫床�亥屮菴捺姶�峨代�繧ｹ繧ｭ繝ｫ隗｣譏主ｺｦ縺�50%莉･荳翫↓縺ｪ繧九→隗｣謾ｾ縺輔ｌ縺ｾ縺吶ら樟蝨ｨ: ' + sp.pct + '%');
      return;
    }
    openTeamArenaMenu();
  } else if (facility === 'tower') {
    if (sp.pct < 50) {
      alert('縲占ｩｦ邱ｴ縺ｮ繧ｿ繝ｯ繝ｼ�亥享縺｡謚懊″謌ｦ�峨代�繧ｹ繧ｭ繝ｫ隗｣譏主ｺｦ縺�50%莉･荳翫↓縺ｪ繧九→隗｣謾ｾ縺輔ｌ縺ｾ縺吶ら樟蝨ｨ: ' + sp.pct + '%');
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
      { speaker: '繝翫Ξ繝ｼ繧ｷ繝ｧ繝ｳ', text: '繧ｹ繧ｭ繝ｫ縺ｮ隗｣譏弱′螟ｧ縺阪￥騾ｲ繧薙〒縺阪◆�� 鬥夜�縺ｮ縲取ｭｦ闊槫床�亥屮菴捺姶�峨上→縲手ｩｦ邱ｴ縺ｮ繧ｿ繝ｯ繝ｼ縲上∈縺ｮ謖第姶讓ｩ縺悟ｾ励ｉ繧後◆��', color: 'var(--accent-gold)' },
      { speaker: playerName, text: '繧�▲縺滂ｼ� 譁ｰ縺溘↑謌ｦ縺��蝣ｴ縺碁幕縺九ｌ縺溘◇�� 繧ゅ▲縺ｨ繧ｹ繧ｭ繝ｫ繧帝寔繧√※縲√≠縺ｮ隕�視縺ｫ繝ｪ繝吶Φ繧ｸ縺���', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
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
      { speaker: '繝翫Ξ繝ｼ繧ｷ繝ｧ繝ｳ', text: '縺吶∋縺ｦ縺ｮ繧ｹ繧ｭ繝ｫ繧定ｧ｣譏弱＠縺滂ｼ� 縺薙ｌ縺梧怙鬮伜ｳｰ of 繝｢繝ｳ繧ｹ繧ｿ繝ｼ遐皮ｩｶ縺ｮ謌先棡縺���', color: 'var(--accent-gold)' },
      { speaker: playerName, text: '縺､縺�↓蜈ｨ縺ｦ縺ｮ繧ｹ繧ｭ繝ｫ繧呈焔縺ｫ蜈･繧後◆窶ｦ�� 縺薙ｌ縺悟ヵ縺溘■縺ｮ譛鬮倥�繝薙Ν繝峨□�� 蜀阪�縺ゅ�隕�視縺ｫ謖代♀縺�ｼ�', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
      { speaker: '繝翫Ξ繝ｼ繧ｷ繝ｧ繝ｳ', text: '髣俶橿蝣ｴ縺ｫ縲酒汨� 隕�視繝ｪ繝吶Φ繧ｸ繝槭ャ繝√上′隗｣謾ｾ縺輔ｌ縺ｾ縺励◆��', color: 'var(--accent-gold)' },
    ], () => {
      updateMenuFacilities();
      goScreen('main-menu');
    });
  }
}

function startBossRevenge() {
  if (gameProgress.tutorialStep < 4) {
    alert('縲舌メ繝･繝ｼ繝医Μ繧｢繝ｫ荳ｭ縲第欠螳壹�蝣ｴ謇莉･螟悶∈縺ｯ遘ｻ蜍輔〒縺阪∪縺帙ｓ縲�');
    return;
  }
  if (!gameProgress.bossRevengeUnlocked) {
    alert('縲舌Ο繝�け荳ｭ縲代せ繧ｭ繝ｫ繧貞�隗｣謾ｾ��30/30�峨☆繧九→隕�視繝ｪ繝吶Φ繧ｸ繝槭ャ繝√↓謖第姶縺ｧ縺阪∪縺呻ｼ�');
    return;
  }
  
  const activeLab = getActiveLab();
  if (activeLab.length === 0) {
    alert('繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺悟ｿ�ｦ√〒縺吶ゅΛ繝懊〒菴懈�縺励※縺上□縺輔＞縲�');
    return;
  }

  // 謌ｦ髣伜燕莨夊ｩｱ繧ｹ繝医�繝ｪ繝ｼ
  showStoryDialog([
    { speaker: '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '縺ｻ縺�√≠縺ｮ縺ｨ縺阪�逕ｰ闊手��闍･騾�縺九ゅ☆縺ｹ縺ｦ縺ｮ繧ｹ繧ｭ繝ｫ繧定ｧ｣譏弱＠縺ｦ闊槭＞謌ｻ縺｣縺ｦ縺上ｋ縺ｨ縺ｯ縺ｪ縲�', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: playerName, text: '縺ゅ�譎ゅ�雋�縺代ｒ霑斐＠縺ｫ譚･縺滂ｼ√％繧後′蜒輔◆縺｡縺ｮ髮�､ｧ謌舌�繝代�繝�ぅ縺���', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '繝上ワ繝上ャ�∬憶縺�擇讒九∴縺�縲ゅ↑繧峨�蜈ｨ蜉帙〒逶ｸ謇九ｒ縺励※繧�ｍ縺�ｼ√＞縺上◇��', color: '#ef4444', speakerTextColor: '#fff' }
  ], () => {
    // 繧ｹ繝医�繝ｪ繝ｼ隱ｭ莠�ｾ後↓蟆ら畑繝舌ヨ繝ｫ蜑咲｢ｺ隱咲判髱｢縺ｸ驕ｷ遘ｻ
    currentGameMode = 'boss-revenge';
    currentEnemy = { ...HAOU_REVENGE_BOSS };
    goScreen('scouting');
  });
}

function handleBossRevengeVictory() {
  gameProgress.bossDefeated = true;
  save();
  showStoryDialog([
    { speaker: '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '繝絶ｦ繝舌き縺ｪ窶ｦ�� 縺ゅ�譎ゅ�逕ｰ闊手�′縺薙％縺ｾ縺ｧ窶ｦ��', color: '#ef4444', speakerTextColor: '#fff' },
    { speaker: playerName || '遐皮ｩｶ蜩｡', text: '縺ゅ�譌･縺ｮ蛟溘ｊ縺ｯ霑斐＠縺溘ｈ縲ょヵ縺溘■縺ｯ譛鬮倥�繝√�繝�縺���', color: 'var(--accent-cyan)', speakerTextColor: '#000' },
    { speaker: '隕�視繝ｴ繧｣繧ｯ繧ｿ繝ｼ', text: '100pt縺ｨ縺�≧蛻ｶ髯舌�荳ｭ縺ｧ縲√％繧後⊇縺ｩ縺ｮ鬆伜沺縺ｫ驕斐☆繧九→縺ｯ窶ｦ縺�縺瑚ｦ壹∴縺ｦ縺翫￠縲∽ｸ也阜縺ｫ縺ｯ縺ｾ縺�隕九〓蠑ｷ雎ｪ�医ン繝ｫ繝会ｼ峨′縺斐∪繧薙→縺�ｋ縺薙→繧停ｦ��', color: '#ef4444', speakerTextColor: '#fff' }
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
    nameEl.textContent = pName.endsWith('遐皮ｩｶ蜩｡') ? pName : (pName + '遐皮ｩｶ蜩｡');
  }

  if (window.bgmManager) {
    window.bgmManager.play('victory', true); // Victory.mp3 繧偵Ν繝ｼ繝怜�逕�
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
      // 1. 繧ｨ繝ｳ繝�ぅ繝ｳ繧ｰ逕ｻ髱｢繧帝哩縺倥ｋ
      if (endingScreen) endingScreen.style.display = 'none';

      // 2. 繧ｯ繝ｪ繧｢貂医∩繝輔Λ繧ｰ縺ｮ菫晏ｭ�
      localStorage.setItem('game_cleared', 'true');
      gameProgress.bossDefeated = true;
      save();

      // 3. 繝槭ャ繝礼判髱｢縺ｸ驕ｷ遘ｻ
      goScreen('main-menu');

      // 4. BGM繧偵�繝��逕ｨ��P BGM1�峨∈蠕ｩ蟶ｰ
      if (window.bgmManager) {
        window.bgmManager.play('map', true);
      }

      // 5. 繧ｯ繝ｪ繧｢蠕後Γ繝�そ繝ｼ繧ｸ縺ｮ陦ｨ遉ｺ
      alert("逾昴�隕�視謦��ｴ�―n隧ｦ邱ｴ縺ｮ蝪斐ｄ繧ｳ繝ｭ繧ｷ繧｢繝�縺ｧ蠑輔″邯壹″繝｢繝ｳ繧ｹ繧ｿ繝ｼ閧ｲ謌舌→繝舌ヨ繝ｫ繧偵♀讌ｽ縺励∩縺上□縺輔＞��");
    };
  }
}

// ============================================================
//  TEAM ARENA (豁ｦ闊槫床) & SHOP SYSTEM
// ============================================================

function openTeamArenaMenu() {
  const bpDisplay = document.getElementById('team-arena-bp-display');
  if (bpDisplay) bpDisplay.textContent = bp + ' BP';
  goScreen('team-arena-menu');
  triggerFirstTimeHelp('team-arena');
}

function startTeamArenaBattle() {
  // 笘� 豁ｦ闊槫床縺ｯ繧ｹ繝医�繝ｪ繝ｼ逕ｨ邱ｨ謌舌ｒ蠑ｷ蛻ｶ蜿ら�
  currentLabMode = 'story';
  let activeLab = getActiveLab();
  if (activeLab.length < 3) {
    if (typeof debugMode !== 'undefined' && debugMode) {
      const dummyNames = ['繝�ヰ繝�げ蜈磯拠', '繝�ヰ繝�げ荳ｭ蝣�', '繝�ヰ繝�げ螟ｧ蟆�'];
      while (activeLab.length < 3) {
        const m = {
          id: String(Date.now() + activeLab.length),
          name: dummyNames[activeLab.length] || '繝�ヰ繝�げ蜈ｵ',
          systemType: '繧ｹ繝ｩ繧､繝�邉ｻ',
          monsterClass: '繧ｹ繝ｩ繧､繝�',
          stats: { hp: 50, attack: 40, defense: 40, speed: 40, luck: 40 },
          skills: { active: ['none'], passive: [] }
        };
        activeLab.push(m);
      }
      save();
      renderLabGrid();
      alert('�屏�� 繝�ヰ繝�げ讖溯��壹Δ繝ｳ繧ｹ繧ｿ繝ｼ縺御ｸ崎ｶｳ縺励※縺�◆縺溘ａ縲√ユ繧ｹ繝育畑繝｢繝ｳ繧ｹ繧ｿ繝ｼ繧定�蜍慕函謌舌＠縺ｾ縺励◆��');
    } else {
      alert('豁ｦ闊槫床�亥屮菴捺姶�峨↓謖第姶縺吶ｋ縺ｫ縺ｯ縲√Λ繝懊↓繝｢繝ｳ繧ｹ繧ｿ繝ｼ縺悟ｰ代↑縺上→繧�3菴鍋匳骭ｲ縺輔ｌ縺ｦ縺�ｋ蠢�ｦ√′縺ゅｊ縺ｾ縺吶�');
      return;
    }
  }
  
  // Initialize team arena state
  taState = {
    myTeam: [null, null, null], // indices into activeLab
    round: 0,        // 0-4 (5 rounds total)
    roundWins: 0,     // how many rounds won
    boutIndex: 0,     // 0=蜈磯拠, 1=荳ｭ蝣�, 2=螟ｧ蟆�
    boutMyWins: 0,    // wins in current match
    boutEnemyWins: 0, // enemy wins in current match
    boutResults: [null, null, null], // [0]=蜈磯拠, [1]=荳ｭ蝣�, [2]=螟ｧ蟆� 縺ｮ蜍晄風 ('win'|'lose'|null)
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
const TA_ROUND_NAMES = ['1蝗樊姶', '2蝗樊姶', '貅悶�ｱｺ蜍�', '貅匁ｱｺ蜍�', '豎ｺ蜍�'];
const TA_BOUT_NAMES = ['蜈磯拠謌ｦ', '荳ｭ蝣�姶', '螟ｧ蟆�姶'];
const TA_SLOT_LABELS = ['蜈磯拠', '荳ｭ蝣�', '螟ｧ蟆�'];
const TA_RANK_REWARDS = [0, 0, 0, 40, 80, 120]; // 鬆�ｽ榊�ｱ驟ｬ: index = roundWins
const TA_PARTICIPATION_REWARD = 10; // 蜿ょ刈雉�


// ---- Enemy Team Generation ----
function taGenerateAllEnemyTeams() {
  const teams = [];
  
  // 邉ｻ邨ｱ繧ｭ繝ｼ縺ｮ荳€隕ｧ
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
    p2pConn = p2pPeer.connect(targetPeerId);
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
    const conn = p2pPeer.connect(targetId);
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

// Render party selection UI and enemy preview
function taRenderPartySelect() {
  const round = taState ? taState.round : 0;
  const results = taState ? taState.boutResults : [null, null, null];
  
  // My team preview
  const myPreview = document.getElementById('ta-my-team-preview');
  const activeLab = getActiveLab();
  if (myPreview) {
    myPreview.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const idx = taState.myTeam[i];
      const m = idx !== null ? activeLab[idx] : null;
      
      const div = document.createElement('div');
      div.className = 'ta-slot-box' + (taState.activeSlotIdx === i ? ' active' : '');
      div.onclick = () => { taState.activeSlotIdx = i; taRenderPartySelect(); };
      
      if (!m) {
        div.innerHTML = '<div style="color:var(--text-dim); text-align:center; padding:12px;">' + TA_SLOT_LABELS[i] + ': モンスター未選択</div>';
        myPreview.appendChild(div);
        continue;
      }
      
      const mType = MONSTER_TYPES[m.systemType] || MONSTER_TYPES[m.type] || { icon: '👾' };
      const mIcon = mType.icon || '👾';
      
      const mySkillsText = [];
      if (m.skills && m.skills.active && m.skills.active[0] && m.skills.active[0] !== 'none') {
        const sk = SKILLS[m.skills.active[0]];
        if (sk) mySkillsText.push(sk.icon + sk.name);
      }
      if (m.skills && m.skills.passive && m.skills.passive[0] && m.skills.passive[0] !== 'none') {
        const sk = SKILLS[m.skills.passive[0]];
        if (sk) mySkillsText.push(sk.icon + sk.name);
      }
      const mySkillStr = mySkillsText.length > 0 ? mySkillsText.join(' / ') : 'なし';
      
      let overlayMarkHtml = '';
      if (results[i] === 'win') {
        overlayMarkHtml = '<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(34,197,94,0.15); border-radius:8px; pointer-events:none; z-index:5;"><span style="font-size:42px; font-weight:900; color:#22c55e; text-shadow:0 0 12px rgba(34,197,94,0.9), 0 0 4px #000; line-height:1;">⭕</span></div>';
      } else if (results[i] === 'lose') {
        overlayMarkHtml = '<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(239,68,68,0.15); border-radius:8px; pointer-events:none; z-index:5;"><span style="font-size:42px; font-weight:900; color:#ef4444; text-shadow:0 0 12px rgba(239,68,68,0.9), 0 0 4px #000; line-height:1;">❌</span></div>';
      }

      let divHtml = overlayMarkHtml;
      divHtml += '<div style="display: flex; justify-content: space-between; align-items: center;">';
      divHtml += '<span style="color:var(--accent-gold); font-weight:bold;">' + TA_SLOT_LABELS[i] + '</span>';
      divHtml += '<span style="color:#fff; font-weight: bold;">' + mIcon + ' ' + m.name + '</span>';
      divHtml += '</div>';
      divHtml += '<div style="font-size:11px; color:var(--text-dim); margin-top: 4px;">';
      divHtml += 'HP:' + m.stats.hp + ' A:' + m.stats.attack + ' D:' + m.stats.defense + ' S:' + m.stats.speed + ' L:' + m.stats.luck;
      divHtml += '</div>';
      divHtml += '<div style="font-size:11px; color:var(--accent-cyan); margin-top: 2px; font-weight: bold;">';
      divHtml += '✨ スキル: ' + mySkillStr;
      divHtml += '</div>';

      div.innerHTML = divHtml;
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

      let enemyOverlayMarkHtml = '';
      if (results[i] === 'lose') {
        enemyOverlayMarkHtml = '<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(34,197,94,0.15); border-radius:8px; pointer-events:none; z-index:5;"><span style="font-size:42px; font-weight:900; color:#22c55e; text-shadow:0 0 12px rgba(34,197,94,0.9), 0 0 4px #000; line-height:1;">⭕</span></div>';
      } else if (results[i] === 'win') {
        enemyOverlayMarkHtml = '<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(239,68,68,0.15); border-radius:8px; pointer-events:none; z-index:5;"><span style="font-size:42px; font-weight:900; color:#ef4444; text-shadow:0 0 12px rgba(239,68,68,0.9), 0 0 4px #000; line-height:1;">❌</span></div>';
      }

      const div = document.createElement('div');
      div.style = 'padding:8px 12px; border-radius:8px; background:rgba(255,0,0,0.08); border: 1px solid rgba(255,0,0,0.2); margin-bottom: 8px; line-height: 1.4; text-align: left; position:relative; overflow:hidden;';
      
      let enemyHtml = enemyOverlayMarkHtml;
      enemyHtml += '<div style="display: flex; justify-content: space-between; align-items: center;">';
      enemyHtml += '<span style="color:#fff; font-weight: bold;">' + e.icon + ' ' + e.name + '</span>';
      enemyHtml += '<span style="color:var(--accent-gold); font-weight:bold;">' + TA_SLOT_LABELS[i] + '</span>';
      enemyHtml += '</div>';
      enemyHtml += '<div style="font-size:11px; color:var(--text-dim); margin-top: 4px;">';
      enemyHtml += 'HP:' + e.stats.hp + ' A:' + e.stats.attack + ' D:' + e.stats.defense + ' S:' + e.stats.speed + ' L:' + e.stats.luck;
      enemyHtml += '</div>';
      enemyHtml += '<div style="font-size:11px; color:var(--accent-cyan); margin-top: 2px; font-weight: bold;">';
      enemyHtml += '✨ スキル: ' + skillStr;
      enemyHtml += '</div>';

      div.innerHTML = enemyHtml;
      enemyPreview.appendChild(div);
    }
  }
}


// ---- Start Next Bout (1v1 Battle) ----
function taStartNextBout() {
  currentLabMode = 'story';
  const activeLab = getActiveLab();
  const round = taState.round;
  const bout = taState.boutIndex;
  
  currentGameMode = 'team-arena';
  
  const myMonsterIdx = taState.myTeam[bout];
  selBattle = myMonsterIdx;
  
  const enemyData = taState.enemyTeams[round][bout];
  
  let chosenSkill = 'none';
  if (enemyData.skills.active[0] && enemyData.skills.active[0] !== 'none') {
    chosenSkill = enemyData.skills.active[0];
  } else if (enemyData.skills.passive[0] && enemyData.skills.passive[0] !== 'none') {
    chosenSkill = enemyData.skills.passive[0];
  }
  if (enemyData.skills.active[0] && enemyData.skills.active[0] !== 'none' &&
      enemyData.skills.passive[0] && enemyData.skills.passive[0] !== 'none') {
    chosenSkill = Math.random() < 0.5 ? enemyData.skills.active[0] : enemyData.skills.passive[0];
  }

  const skObj = SKILLS[chosenSkill] || SKILLS.none;

  currentEnemy = {
    name: enemyData.name,
    title: TA_ROUND_NAMES[round] + ' - ' + TA_BOUT_NAMES[bout],
    icon: enemyData.icon,
    rumor: '武舞台' + TA_ROUND_NAMES[round] + 'の' + TA_BOUT_NAMES[bout] + '。装備スキル：' + skObj.icon + skObj.name,
    hp: enemyData.stats.hp,
    attack: enemyData.stats.attack,
    defense: enemyData.stats.defense,
    speed: enemyData.stats.speed,
    luck: enemyData.stats.luck,
    skill: chosenSkill,
    type: enemyData.type
  };
  
  const badge = document.getElementById('stage-display');
  if (badge) badge.textContent = '武舞台 ' + TA_ROUND_NAMES[round] + ' - ' + TA_BOUT_NAMES[bout];
  
  goScreen('battle');
}

// ---- Handle Team Arena Battle Result (called from showResult) ----
function taHandleBoutResult(playerWon) {
  if (!taState) return;
  
  if (playerWon) {
    taState.boutMyWins++;
    if (taState.boutResults) taState.boutResults[taState.boutIndex] = 'win';
  } else {
    taState.boutEnemyWins++;
    if (taState.boutResults) taState.boutResults[taState.boutIndex] = 'lose';
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
      // 次のラウンドに進むのでリセット
      taState.boutIndex = 0;
      taState.boutMyWins = 0;
      taState.boutEnemyWins = 0;
      taState.boutResults = [null, null, null];
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
  taShowProgressScreen();
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
    rankText = '優勝！（5勝0敗）';
  } else {
    const wins = taState.roundWins;
    if (wins === 4) {
      rankText = '準優勝！（4勝1敗）';
    } else if (wins === 3) {
      rankText = '3位！（3勝1敗）';
    } else {
      const matchName = TA_ROUND_NAMES[taState.round] || ((taState.round + 1) + '回戦');
      rankText = matchName + '敗退（' + wins + '勝1敗）';
    }
  }

  // モーダルのDOMを更新
  const rankTextEl = document.getElementById('ta-res-rank-text');
  const rankBpEl = document.getElementById('ta-res-rank-bp');
  const partBpEl = document.getElementById('ta-res-part-bp');
  const totalBpEl = document.getElementById('ta-res-total-bp');
  const currentBpEl = document.getElementById('ta-res-current-bp');
  
  if (rankTextEl) rankTextEl.textContent = rankText;
  if (rankBpEl) rankBpEl.textContent = rankBp + ' BP';
  if (partBpEl) partBpEl.textContent = partBp + ' BP';
  if (totalBpEl) totalBpEl.textContent = totalEarned + ' BP';
  if (currentBpEl) currentBpEl.textContent = String(bp);
  
  // 試合結果モーダルの非表示
  const battleResultModal = document.getElementById('battle-result-modal');
  if (battleResultModal) battleResultModal.style.display = 'none';
  
  // 蝗｣菴捺姶繝ｪ繧ｶ繝ｫ繝医Δ繝ｼ繝繝ｫ繧定｡ｨ遉ｺ
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
      btn.textContent = '�屏�� 繝�ヰ繝�げ: ON';
      btn.style.background = 'linear-gradient(135deg, #e63946, #fca311)';
      btn.style.color = '#fff';
      btn.style.borderColor = '#fca311';
      btn.style.boxShadow = '0 0 12px rgba(252,163,17,0.5)';
    }
    bp = 9999;
    alert('�屏�� 繝�ヰ繝�げ繝｢繝ｼ繝� ON\n\n繝ｻ蜈ｨ譁ｽ險ｭ繝ｻ蜈ｨ繝｢繝ｼ繝峨�繝ｭ繝�け隗｣髯､\n繝ｻ蜈ｨ繧ｹ繧ｭ繝ｫ隗｣謾ｾ迥ｶ諷九→縺励※隱ｿ蜷亥庄閭ｽ\n繝ｻBP 9999迥ｶ諷九〒繧ｷ繝ｧ繝��雉ｼ蜈･蜿ｯ閭ｽ\n繝ｻ蜈ｨ繧ｷ繝ｪ繝ｼ繧ｺ隗｣謾ｾ迥ｶ諷九〒隱ｿ蜷亥庄閭ｽ');
  } else {
    // Reset button style
    if (btn) {
      btn.textContent = '�屏�� 繝�ヰ繝�げ: OFF';
      btn.style.background = 'rgba(0,0,0,0.3)';
      btn.style.color = '#94a3b8';
      btn.style.borderColor = 'rgba(255,255,255,0.15)';
      btn.style.boxShadow = 'none';
    }
    
    alert('�屏�� 繝�ヰ繝�げ繝｢繝ｼ繝� OFF\n\n騾壼ｸｸ縺ｮ繧ｲ繝ｼ繝�騾ｲ陦檎憾豕√↓蠕ｩ蜈�＠縺ｾ縺励◆縲�');
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
  
  // 繧｢繧ｹ繝壹け繝域ｯ斐ｒ邯ｭ謖√＠縺ｦ逕ｻ髱｢蜀↓蜿弱ａ繧九せ繧ｱ繝ｼ繝ｫ蛟､繧定ｨ育ｮ
  const scale = Math.min(winW / baseW, winH / baseH);
  vp.style.transformOrigin = 'center center';
  vp.style.transform = 'scale(' + scale + ')';
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
    text: '【モンスター研究所の役割】\n・所持スキルと100ポイントの割り振りを行い、独自のモンスターを調合・作成できます。\n・「ストーリー用」と「フリー対戦用」のモンスターは別に保存されます。'
  },
  league: {
    title: '🏆 コロシアム（リーグ戦）',
    icon: '🏆',
    text: '【コロシアム（リーグ戦）の役割】\n・最強の研究者を目指すメインストーリーモードです。\n・CPUトレーナー達と1vs1的バトルを行い、勝利することでリーグ制覇を目指します。\n・勝利時の報酬「秘伝の書」から新たなスキルを獲得し、解放できます。'
  },
  tower: {
    title: '�両 隧ｦ邱ｴ縺ｮ繧ｿ繝ｯ繝ｼ',
    icon: '�両',
    text: '縲占ｩｦ邱ｴ縺ｮ繧ｿ繝ｯ繝ｼ縺ｮ蠖ｹ蜑ｲ縲曾n繝ｻ閾ｪ霆阪�髯千阜縺ｫ謖代�縲後し繝舌う繝舌Ν蜍昴■謚懊″謌ｦ縲阪〒縺吶�n繝ｻ騾｣蜍昴☆繧九＃縺ｨ縺ｫ謨ｵ縺ｮ蠑ｷ縺輔′蠅励＠縺ｦ縺�″縺ｾ縺吶�n繝ｻ縺ｩ縺薙∪縺ｧ菴暮｣蜍昴�險倬鹸繧剃ｼｸ縺ｰ縺帙ｋ縺区倦謌ｦ縺吶ｋ繧�ｊ霎ｼ縺ｿ繝｢繝ｼ繝峨〒縺吶�'
  },
  'team-arena': {
    title: '�孱�� 豁ｦ闊槫床�亥屮菴捺姶��',
    icon: '�孱��',
    text: '縲先ｭｦ闊槫床�亥屮菴捺姶�峨�蠖ｹ蜑ｲ縲曾n繝ｻ3蟇ｾ3縺ｮ繝√�繝�繝舌ヨ繝ｫ縺ｧ蜍昴■雜翫＠謨ｰ繧堤ｫｶ縺�屮菴捺姶縺ｧ縺吶�n繝ｻ縲悟�驪呈姶縲阪御ｸｭ蝣�姶縲阪悟､ｧ蟆�姶縲阪ｒ陦後＞縲∝�縺ｫ2蜍昴＠縺溘メ繝ｼ繝�縺悟享蛻ｩ縺ｨ縺ｪ繧翫∪縺吶�n繝ｻ蜍晏茜縺励※BP繧堤佐蠕励＠縲�剞螳壹Δ繝ｳ繧ｹ繧ｿ繝ｼ縺ｪ縺ｩ繧定ｧ｣謾ｾ縺励∪縺励ｇ縺�ｼ�'
  },
  free: {
    title: '�劇 逡ｰ谺｡蜈��逾��医ヵ繝ｪ繝ｼ蟇ｾ謌ｦ��',
    icon: '�劇',
    text: '縲千焚谺｡蜈��逾��医ヵ繝ｪ繝ｼ蟇ｾ謌ｦ�峨�蠖ｹ蜑ｲ縲曾n繝ｻ莉悶�繝励Ξ繧､繝､繝ｼ縺ｾ縺溘�邱ｴ鄙堤畑Bot縺ｨ繝ｪ繧｢繝ｫ繧ｿ繧､繝�縺ｫ蟇ｾ謌ｦ縺ｧ縺阪∪縺吶�n繝ｻ縺吶∋縺ｦ縺ｮ繧ｹ繧ｭ繝ｫ縺瑚ｧ｣謾ｾ縺輔ｌ縺溘ヵ繝ｩ繝�ヨ縺ｪ迺ｰ蠅�〒讒狗ｯ峨�蠑ｷ縺輔ｒ遶ｶ縺�∪縺吶�n繝ｻ縲後す繝ｳ繧ｰ繝ｫ繧ｹ(1vs1)縲阪∪縺溘�縲後メ繝ｼ繝�繧ｹ(3vs3蝗｣菴捺姶)縲阪′驕翫∋縺ｾ縺吶�'
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

// OP逕ｻ髱｢繧ｿ繝��譎ゅ�繧､繝吶Φ繝育匳骭ｲ��せ繧ｿ繝ｼ繝医ユ繧ｭ繧ｹ繝育せ貊�｣懷勧
document.addEventListener('DOMContentLoaded', () => {
  const opScreen = document.getElementById('op-screen');
  const opStartText = document.getElementById('op-start-text');

  // JS縺ｫ繧医ｋ轤ｹ貊�ち繧､繝槭���SS繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ縺後ヶ繝ｩ繧ｦ繧ｶ縺ｧ辟｡蜉ｹ蛹悶＆繧後ｋ蝣ｴ蜷医∈縺ｮ蟇ｾ遲厄ｼ�
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
      // 1. 繝悶Λ繧ｦ繧ｶ縺ｮ髻ｳ螢ｰ閾ｪ蜍募�逕溷宛髯舌ｒ隗｣髯､縺吶ｋ縺溘ａ縺ｫBGM蜀咲函
      if (window.bgmManager) {
        window.bgmManager.play('title', true); // OP BGM1.mp3 蜀咲函
      }

      // 2. OP逕ｻ髱｢繧偵ヵ繧ｧ繝ｼ繝峨い繧ｦ繝医＠縺ｦ髱櫁｡ｨ遉ｺ蛹�
      opScreen.style.transition = 'opacity 0.6s ease';
      opScreen.style.opacity = '0';
      
      setTimeout(() => {
        opScreen.style.display = 'none';
        
        // 3. 繧ｿ繧､繝医Ν�上そ繝ｼ繝悶ョ繝ｼ繧ｿ驕ｸ謚樒判髱｢繧定｡ｨ遉ｺ
        if (typeof showTitleOrSaveSelectScene === 'function') {
          showTitleOrSaveSelectScene();
        } else {
          const titleScene = document.getElementById('title-scene') || document.getElementById('save-select-modal');
          if (titleScene) titleScene.style.display = 'flex';
          goScreen('title');
          renderTitleSaveSlots();
        }
      }, 600);
    }, { once: true }); // 1蝗槭ち繝��縺ｧ遒ｺ螳�
  }
});

function init() {
  updateGameScale();
  // 蛻晄悄隱ｭ縺ｿ霎ｼ縺ｿ譎ゅ√☆縺ｹ縺ｦ縺ｮ繝｢繝ｼ繝繝ｫ繧貞ｼｷ蛻ｶ髢牙悉
  if (typeof closeMonsterSelectModal === 'function') closeMonsterSelectModal();
  if (typeof closeLabDetailModal === 'function') closeLabDetailModal();
  if (typeof closeLabItemModal === 'function') closeLabItemModal();
  document.querySelectorAll('#monster-select-modal, #lab-item-modal, #lab-detail-modal, #facility-help-overlay, #save-slot-overlay').forEach(m => m.style.display = 'none');
  
  migrateOldSaveDataIfNeeded();
  // 襍ｷ蜍墓凾縺ｯ蟶ｸ縺ｫ繧ｿ繧､繝医Ν繝ｻ繧ｻ繝ｼ繝夜∈謚樒判髱｢繧定｡ｨ遉ｺ�医ョ繝ｼ繧ｿ縺ｯ縺ｾ縺�繝ｭ繝ｼ繝峨＠縺ｪ縺�ｼ�
  renderTitleSaveSlots();
  goScreen('title');
}

// 繧ｿ繧､繝医Ν逕ｻ髱｢縺ｮ繧ｻ繝ｼ繝悶せ繝ｭ繝�ヨ繧ｫ繝ｼ繝峨ｒ謠冗判
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

      let html = '<div style="flex:1; min-width:0;">';
      html += '<div class="slot-label">SLOT ' + i + '</div>';
      html += '<div class="slot-player-name">' + data.playerName + '</div>';
      html += '<div class="slot-detail">⚔️ STAGE ' + stageStr + '　📜 スキル: ' + unlockedCount + '/30 (' + pct + '%)　🏆 ' + wins + '勝 ' + loses + '敗</div>';
      html += '<div class="slot-detail">最終保存: ' + (data.updatedAt || '不明') + '</div>';
      html += '</div>';
      html += '<div class="slot-right">';
      html += '<div class="slot-badge-continue">▶ つづきから</div>';
      html += '<button class="slot-delete-btn" onclick="event.stopPropagation(); deleteTitleSlot(' + i + ')">🗑️ 削除</button>';
      html += '</div>';

      card.innerHTML = html;
      card.onclick = (e) => { e.stopPropagation(); selectTitleSlot(i, false); };
    } else {
      let html = '<div style="flex:1;">';
      html += '<div class="slot-label">SLOT ' + i + '</div>';
      html += '<div style="font-size:14px; color:var(--text-dim);">― 空きスロット ―</div>';
      html += '</div>';
      html += '<div class="slot-right">';
      html += '<div class="slot-badge-new">✨ はじめから</div>';
      html += '</div>';

      card.innerHTML = html;
      card.onclick = (e) => { e.stopPropagation(); selectTitleSlot(i, true); };
    }
    container.appendChild(card);
  }
}

// 繧ｿ繧､繝医Ν逕ｻ髱｢縺九ｉ繧ｹ繝ｭ繝�ヨ繧帝∈謚槭＠縺ｦ髢句ｧ�
function selectTitleSlot(slotId, isNew) {
  if (isNew) {
    // 譁ｰ隕上ご繝ｼ繝�髢句ｧ�
    startNewGameInSlot(slotId);
  } else {
    // 譌｢蟄倥ョ繝ｼ繧ｿ繧偵Ο繝ｼ繝峨＠縺ｦ繝｡繧､繝ｳ繝｡繝九Η繝ｼ縺ｸ
    loadSlot(slotId);
    prepareStage();
    updateRecord();
    goScreen('main-menu');
  }
}

// タイトル画面からスロット削除
async function deleteTitleSlot(slotId) {
  const result = await showConfirmModal('SLOT ' + slotId + ' のセーブデータを本当に削除しますか？\n(削除されたデータは二度と復元できません)');
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
  '繧�≧縺�', '縺溘￥縺ｿ', '繝上Ν繝�', '繧ｽ繧ｦ繧ｿ', '縺ゅ♀縺�', '縺輔￥繧�',
  'Ken', 'Alex', 'David', '繧ｷ繝ｧ繧ｦ', '繝ｬ繝ｳ', '繝槭し繝�', '繝ｦ繧ｦ繧ｭ',
  '縺ｲ縺ｾ繧�', '繝ｦ繧｢', '縺､繧縺�', '縺ｿ縺�', '繧ｳ繧ｦ繧ｭ', '繝繧､繧ｭ', '繝ｪ繝ｧ繧ｦ',
  '繧ｫ繧､縺ｨ', '繧｢繧ｵ繝�', '繝ｦ繧ｦ繝�', '繧ｨ繝ｪ繧ｫ', '繝溘え', '繧ｫ繝弱Φ', '繝槭う'
];
const BOT_TITLES = [
  '譁ｰ騾ｲ豌鈴強縺ｮ遐皮ｩｶ閠�', '髣俶橿蝣ｴ縺ｮ蟶ｸ騾｣', '繝薙Ν繝峨ヰ繝医Λ繝ｼ', '豬∵ｵｪ縺ｮ繝医Ξ繝ｼ繝翫�',
  '繧ｹ繧ｭ繝ｫ繝槭せ繧ｿ繝ｼ', '繧ｿ繧ｯ繝�ぅ繧ｷ繝｣繝ｳ', '繝悶Μ繝ｼ繝繝ｼ', '謾ｾ豬ｪ縺ｮ蜍晁ｲ�蟶ｫ',
  '繝ｪ繝ｼ繧ｰA繝ｩ繝ｳ繧ｫ繝ｼ', '逡ｰ谺｡蜈��豎る％閠�', '100pt諢帛･ｽ螳ｶ'
];

function generateBotMonster() {
  const mTypes = Object.keys(MONSTER_TYPES).filter(k => !MONSTER_TYPES[k].hidden);
  const pickedType = mTypes[Math.floor(Math.random() * mTypes.length)];
  const typeInfo = MONSTER_TYPES[pickedType];
  const monsterClass = typeInfo.names[Math.floor(Math.random() * typeInfo.names.length)] || '繧ｹ繝ｩ繧､繝�';
  
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
  const activeSkills = skillPool.filter(s => SKILLS[s].type === '繧｢繧ｯ繝�ぅ繝�');
  const passiveSkills = skillPool.filter(s => SKILLS[s].type === '繝代ャ繧ｷ繝�');
  
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
  // P2P騾壻ｿ｡蛛ｴ繧偵け繝ｪ繝ｼ繝ｳ繧｢繝��
  destroyP2P();
  
  p2pIsBotActive = true;
  p2pIsHost = true; // Bot蟇ｾ謌ｦ譎ゅ�閾ｪ霄ｫ繧偵�繧ｹ繝域桶縺�↓縺吶ｋ
  
  const delay = Math.random() * 3000; // 0縲�3遘偵�霑ｽ蜉�縺ｮ繝ｩ繝ｳ繝繝�繧ｦ繧ｧ繧､繝�
  setP2PStatus('繝ｩ繝ｳ繝繝�繝槭ャ繝∵､懃ｴ｢荳ｭ...', '蟇ｾ謌ｦ逶ｸ謇九ｒ遒ｺ螳壻ｸｭ...');
  
  setTimeout(() => {
    if (!p2pIsBotActive) return;
    
    // Bot繝励Ο繝輔ぅ繝ｼ繝ｫ菴懈
    p2pBotName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    const title = BOT_TITLES[Math.floor(Math.random() * BOT_TITLES.length)];
    const win = 10 + Math.floor(Math.random() * 150);
    const lose = Math.max(10, win - 20 + Math.floor(Math.random() * 40));
    p2pBotRecord = title + ' (戦績: ' + win + '勝 ' + lose + '敗)';
    
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
    container.innerHTML = '<div style="grid-column: span 2; font-size:13px; color:var(--accent-gold); padding:20px 0; text-align:center;">フリー対戦用のモンスターが登録されていません。<br>ラボの「フリーバトル用ラボ」で作成してください。</div>';
    if (nextBtn) nextBtn.disabled = true;
    return;
  }
  
  if (p2pFormat === 'team' && list.length < 3) {
    container.innerHTML = '<div style="grid-column: span 2; font-size:13px; color:var(--accent-gold); padding:20px 0; text-align:center;">チーム戦（3vs3）にはモンスターが最低3体必要です。<br>フリーバトル用ラボで追加作成してください。<br>(現在: ' + list.length + '体)</div>';
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

    let cardHtml = '<div class="select-badge">' + badgeText + '</div>';
    cardHtml += '<div style="height:55px; display:flex; align-items:center; justify-content:center; margin-bottom:4px;">' + visualHTML + '</div>';
    cardHtml += '<div style="font-weight:bold; font-size:13px; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + m.name + '</div>';
    cardHtml += '<div style="font-size:10px; color:var(--text-dim); margin-top:2px;">' + m.monsterClass + '</div>';
    cardHtml += '<div style="font-size:10px; color:var(--accent-gold); margin-top:4px;">' + activeName + ' / ' + passiveName + '</div>';

    card.innerHTML = cardHtml;
    
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
    alert('出撃モンスターが正しく選択されていません。\n' + (p2pFormat === 'single' ? '1体' : '3体') + '選択してください。');
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
  return String(Math.floor(1000 + Math.random() * 9000));
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
  setP2PStatus('驛ｨ螻九ｒ菴懈�荳ｭ...', 'PeerID蛻晄悄蛹紋ｸｭ...');

  p2pPeer = new Peer(peerId);
  p2pPeer.on('open', (id) => {
    setP2PStatus('蟇ｾ謌ｦ逶ｸ謇九�謗･邯壹ｒ蠕�▲縺ｦ縺�∪縺�...', '縺ゅ＞縺薙→縺ｰ繧堤嶌謇九↓莨昴∴縺ｦ縺上□縺輔＞');
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
    setP2PStatus('謗･邯壹お繝ｩ繝ｼ', err.type + ': ' + err.message);
  });
}

// --- Join Private Room ---
function joinP2PPrivateRoom() {
  const input = document.getElementById('p2p-room-code-input');
  const code = (input ? input.value : '').trim();
  if (!code || code.length < 4) {
    alert('縺ゅ＞縺薙→縺ｰ��4譯�ｼ峨ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞');
    return;
  }
  if (!validateP2PMonsterSelection()) return;
  destroyP2P();
  p2pIsHost = false;
  p2pRoomCode = code;
  const targetPeerId = P2P_PREFIX + code;

  showP2PStep(4);
  setP2PStatus('驛ｨ螻九↓謗･邯壻ｸｭ...', '縺ゅ＞縺薙→縺ｰ: ' + code);
  document.getElementById('p2p-room-display-box').style.display = 'none';

  p2pPeer = new Peer();
  p2pPeer.on('open', () => {
    setP2PStatus('謗･邯夊ｩｦ陦御ｸｭ...', 'Peer謗･邯壹ｒ遒ｺ遶倶ｸｭ...');
    p2pConn = p2pPeer.connect(targetPeerId);
    setupP2PConnection();
  });
  p2pPeer.on('error', (err) => {
    if (err.type === 'peer-unavailable') {
      setP2PStatus('驛ｨ螻九′隕九▽縺九ｊ縺ｾ縺帙ｓ', '縺ゅ＞縺薙→縺ｰ縺梧ｭ｣縺励＞縺狗｢ｺ隱阪＠縺ｦ縺上□縺輔＞');
    } else {
      setP2PStatus('謗･邯壹お繝ｩ繝ｼ', err.type);
    }
  });
}

// --- Random Match ---
function startP2PRandomMatch() {
  if (!validateP2PMonsterSelection()) return;
  destroyP2P();
  showP2PStep(4);
  document.getElementById('p2p-room-display-box').style.display = 'none';

  // 30遘貞ｾ後↓蟇ｾ謌ｦ逶ｸ謇九′隕九▽縺九ｉ縺ｪ縺��ｴ蜷医�閾ｪ蜍慕噪縺ｫBot蟇ｾ謌ｦ縺ｸ遘ｻ陦�
  p2pMatchingTimeoutTimer = setTimeout(() => {
    triggerP2PBotMatch();
  }, 30000);
  setP2PStatus('繝ｩ繝ｳ繝繝�繝槭ャ繝∵､懃ｴ｢荳ｭ...', '蜈ｬ髢九Ν繝ｼ繝�繧呈爾縺励※縺�∪縺�...');

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
      // No room found 竊� create one
      found = true;
      createRandomRoom();
      return;
    }
    const targetId = P2P_PREFIX + 'free-' + p2pFormat + '-' + slotTry;
    setP2PStatus('繝ｩ繝ｳ繝繝�繝槭ャ繝∵､懃ｴ｢荳ｭ...', '繝ｫ繝ｼ繝� #' + (slotTry + 1) + ' 繧堤｢ｺ隱堺ｸｭ...');
    const conn = p2pPeer.connect(targetId);
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
      setP2PStatus('蟇ｾ謌ｦ逶ｸ謇九ｒ蠕�ｩ滉ｸｭ...', '繝輔Μ繝ｼ繝ｫ繝ｼ繝� #' + (slot + 1) + ' 縺ｧ蠕�ｩ溘＠縺ｦ縺�∪縺�');
    });
    p2pPeer.on('connection', (conn) => {
      p2pConn = conn;
      setupP2PConnection();
    });
    p2pPeer.on('error', (err) => {
      setP2PStatus('繝ｫ繝ｼ繝�菴懈�繧ｨ繝ｩ繝ｼ', err.type + ' - 蜀崎ｩｦ陦後＠縺ｦ縺上□縺輔＞');
    });
  }
}

// --- P2P Connection Established ---
function setupP2PConnection() {
  if (p2pMatchingTimeoutTimer) { clearTimeout(p2pMatchingTimeoutTimer); p2pMatchingTimeoutTimer = null; }
  setP2PStatus('謗･邯夂｢ｺ遶具ｼ�', '繝｢繝ｳ繧ｹ繧ｿ繝ｼ諠��ｱ繧貞酔譛滉ｸｭ...');

  if (!p2pConn) return;

  p2pConn.on('data', (data) => {
    handleP2PMessage(data);
  });
  p2pConn.on('close', () => {
    alert('蟇ｾ謌ｦ逶ｸ謇九→縺ｮ謗･邯壹′蛻�妙縺輔ｌ縺ｾ縺励◆');
    destroyP2P();
    showP2PStep(3);
  });

  // Move to Step 5 (Ready screen)
  showP2PStep(5);
  p2pMyReady = false;
  p2pOppReady = false;
  updateP2PReadyUI();

  // Render MY monster UI immediately
  const activeLab = labMonstersFree;
  const nameEl = document.getElementById('p2p-my-monster-name');
  const myIcon = document.getElementById('p2p-my-monster-preview');
  
  let payload = null;
  if (p2pFormat === 'team') {
    const myTeamData = p2pSelectedMonsters.map(idx => activeLab[idx]).filter(Boolean);
    if (nameEl) nameEl.textContent = myTeamData.map(m => m.name).join(' / ');
    if (myIcon) myIcon.innerHTML = myTeamData.map(m => getMonsterVisualHTML(m.monsterClass, m.systemType, '35px')).join('');
    payload = { type: 'team-monsters', data: myTeamData };
  } else {
    const myMonsterIdx = p2pSelectedMonsters[0] !== undefined ? p2pSelectedMonsters[0] : 0;
    const myMonster = activeLab[myMonsterIdx] || activeLab[0];
    if (myMonster && nameEl) nameEl.textContent = myMonster.name || '繝｢繝ｳ繧ｹ繧ｿ繝ｼ';
    if (myMonster && myIcon) myIcon.innerHTML = getMonsterVisualHTML(myMonster.monsterClass, myMonster.systemType, '70px');
    payload = { type: 'monster', data: myMonster };
  }

  const sendPayload = () => {
    if (p2pConn && payload) {
      try {
        p2pConn.send(payload);
        p2pConn.send({ type: 'request-monster' });
      } catch(e) {}
    }
  };

  // Immediate send attempt
  sendPayload();

  // Handle open event if connection wasn't fully open yet
  p2pConn.on('open', () => {
    sendPayload();
  });

  // Periodic fallback retry (stops when opp monster received or p2p destroyed)
  const syncTimer = setInterval(() => {
    if (p2pOppMonster || !p2pConn) {
      clearInterval(syncTimer);
      return;
    }
    sendPayload();
  }, 350);
}

function handleP2PMessage(msg) {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case 'request-monster':
      const activeLab = labMonstersFree;
      if (p2pFormat === 'team') {
        const myTeamData = p2pSelectedMonsters.map(idx => activeLab[idx]).filter(Boolean);
        if (p2pConn && p2pConn.open) p2pConn.send({ type: 'team-monsters', data: myTeamData });
      } else {
        const myMonsterIdx = p2pSelectedMonsters[0] !== undefined ? p2pSelectedMonsters[0] : 0;
        const myMonster = activeLab[myMonsterIdx] || activeLab[0];
        if (p2pConn && p2pConn.open) p2pConn.send({ type: 'monster', data: myMonster });
      }
      break;

    case 'monster':
      p2pOppMonster = msg.data;
      p2pOppMonsters = [msg.data];
      const oppName = document.getElementById('p2p-opp-monster-name');
      if (oppName) oppName.textContent = msg.data.name || '???';
      const oppIcon = document.getElementById('p2p-opp-monster-preview');
      if (oppIcon && msg.data) {
        oppIcon.innerHTML = getMonsterVisualHTML(msg.data.monsterClass, msg.data.systemType, '70px');
      }
      updateP2PReadyUI();
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
      updateP2PReadyUI();
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
      alert('逶ｸ謇九′蜀肴姶繧貞ｸ梧悍縺励※縺�∪縺呻ｼ�');
      break;
  }
}

function updateP2PReadyUI() {
  const myBtn = document.getElementById('p2p-my-ready-btn');
  if (myBtn) {
    myBtn.textContent = p2pMyReady ? '笨� 貅門ｙ螳御ｺ�ｼ�' : '貅門ｙ螳御ｺ�';
    myBtn.style.background = p2pMyReady ? 'var(--accent-green)' : '';
    myBtn.style.color = p2pMyReady ? '#000' : '';
  }
  const oppStatus = document.getElementById('p2p-opp-ready-status');
  if (oppStatus) {
    oppStatus.textContent = p2pOppReady ? '笨� 貅門ｙ螳御ｺ�ｼ�' : '譛ｪ貅門ｙ';
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
    // Both players ready 竊� start P2P battle
    setTimeout(() => startP2PBattle(), 500);
  }
}

function startP2PBattle() {
  if (p2pFormat === 'team') {
    if (!p2pOppMonsters || p2pOppMonsters.length < 3) {
      alert('逶ｸ謇九�繝√�繝�諠��ｱ縺後∪縺�螻翫＞縺ｦ縺�∪縺帙ｓ縲ょｰ代＠縺雁ｾ�■縺上□縺輔＞縲�');
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
      alert('逶ｸ謇九�繝｢繝ｳ繧ｹ繧ｿ繝ｼ諠��ｱ縺後∪縺�螻翫＞縺ｦ縺�∪縺帙ｓ縲ょｰ代＠縺雁ｾ�■縺上□縺輔＞縲�');
      return;
    }
    p2pBoutState = null;
    currentLabMode = 'free';
    selBattle = p2pSelectedMonsters[0] !== undefined ? p2pSelectedMonsters[0] : 0;
    
    const opp = p2pOppMonster;
    const oppStats = opp.stats || { hp: 22, attack: 22, defense: 22, speed: 22, luck: 22 };
    const oppSkill = (opp.skills && opp.skills.active && opp.skills.active[0]) || 'none';
    currentEnemy = {
      name: p2pIsBotActive ? p2pBotName : (opp.name || '蟇ｾ謌ｦ逶ｸ謇�'),
      monsterClass: opp.monsterClass || '繧ｹ繝ｩ繧､繝�',
      systemType: opp.systemType || '繝峨Λ繧ｴ繝ｳ邉ｻ',
      type: Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === opp.systemType) || 'other',
      title: p2pIsBotActive ? p2pBotRecord : (opp.monsterClass || '蟇ｾ謌ｦ逶ｸ謇�'),
      hp: Number(oppStats.hp) || 22,
      attack: Number(oppStats.attack) || 22,
      defense: Number(oppStats.defense) || 22,
      speed: Number(oppStats.speed) || 22,
      luck: Number(oppStats.luck) || 22,
      skill: oppSkill,
      sprite: opp.sprite || opp.image || null,
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
  const boutNames = ['蜈磯拠謌ｦ', '荳ｭ蝣�姶', '螟ｧ蟆�姶'];
  currentEnemy = {
    name: opp.name || '蟇ｾ謌ｦ逶ｸ謇�',
    monsterClass: opp.monsterClass || '繧ｹ繝ｩ繧､繝�',
    systemType: opp.systemType || '繝峨Λ繧ｴ繝ｳ邉ｻ',
    type: Object.keys(MONSTER_TYPES).find(k => MONSTER_TYPES[k].label === opp.systemType) || 'other',
    title: '繝輔Μ繝ｼ蝗｣菴捺姶 - ' + boutNames[boutIdx],
    hp: Number(oppStats.hp) || 22,
    attack: Number(oppStats.attack) || 22,
    defense: Number(oppStats.defense) || 22,
    speed: Number(oppStats.speed) || 22,
    luck: Number(oppStats.luck) || 22,
    skill: oppSkill,
    sprite: opp.sprite || opp.image || null,
  };
  const badge = document.getElementById('stage-display');
  if (badge) badge.textContent = '繝輔Μ繝ｼ蝗｣菴捺姶 - ' + boutNames[boutIdx];
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
      alert('縺ゅ＞縺薙→縺ｰ縲�' + code + '縲阪ｒ繧ｳ繝斐�縺励∪縺励◆��');
    });
  } else {
    alert('縺ゅ＞縺薙→縺ｰ: ' + code);
  }
}

// --- P2P Battle Command Sync ---
function sendP2PCommand(cmd) {
  p2pMyCommand = cmd;
  
  if (p2pIsBotActive) {
    // 諤晁�凾髢難ｼ�1.5遘偵�3.5遘偵�繝ｩ繝ｳ繝繝�驕�ｻｶ�峨ｒ貍泌�
    const thinkDelay = 1500 + Math.random() * 2000;
    
    // 繧ｳ繝槭Φ繝峨�繧ｿ繝ｳ繧堤┌蜉ｹ蛹悶＠縲∫嶌謇九�蜈･蜉帛ｾ�■貍泌�繧偵Ο繧ｰ縺ｫ豬√☆
    addLog('竚� 逶ｸ謇九′繧ｳ繝槭Φ繝峨ｒ驕ｸ謚槭＠縺ｦ縺�∪縺�...', 'log-info');
    
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
    console.error('蛻晄悄蛹悶お繝ｩ繝ｼ:', err);
  }
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
}
