'use strict';

/* ============================================================
 * South Georgia Friday Night Scoreboard
 * https://friday.riktom.com
 * ============================================================ */

// ---- SCHOOL DATABASE (~45 South Georgia high school football programs) ----
const SCHOOLS = [
  // ===== BIG 3/4 =====
  {
    id: 'valdosta-wildcats', name: 'Valdosta High School', mascot: 'Wildcats',
    city: 'Valdosta', county: 'Lowndes', group: 'big4', ghsaClass: '6A', helmet: '🐱',
    colors: { primary: '#000000', secondary: '#bf953f' },
    stadium: 'Bazemore-Hyder Stadium', stadiumAddress: '1900 Williams St, Valdosta, GA 31602',
    stadiumLat: 30.8404, stadiumLon: -83.2861,
    scorestream: 'https://scorestream.com/search?q=Valdosta%20Wildcats',
    radioName: 'Talk 92.1 FM (WJYL)', radioUrl: 'https://www.iheart.com/live/talk-921-3461/'
  },
  {
    id: 'lowndes-vikings', name: 'Lowndes High School', mascot: 'Vikings',
    city: 'Hahira', county: 'Lowndes', group: 'big4', ghsaClass: '7A', helmet: '⚔️',
    colors: { primary: '#000000', secondary: '#c8102e' },
    stadium: 'Martin Stadium', stadiumAddress: '1606 Norman Dr, Valdosta, GA 31601',
    stadiumLat: 30.8721, stadiumLon: -83.3127,
    scorestream: 'https://scorestream.com/search?q=Lowndes%20Vikings',
    radioName: 'Rock 105.9 FM', radioUrl: 'https://www.iheart.com/live/rock-1059-3463/'
  },
  {
    id: 'colquitt-packers', name: 'Colquitt County High School', mascot: 'Packers',
    city: 'Moultrie', county: 'Colquitt', group: 'big4', ghsaClass: '7A', helmet: '🐺',
    colors: { primary: '#5d2e8c', secondary: '#fdb515' },
    stadium: 'Mack Tharpe Stadium', stadiumAddress: '1800 Park Ave, Moultrie, GA 31768',
    stadiumLat: 31.1799, stadiumLon: -83.7793,
    scorestream: 'https://scorestream.com/search?q=Colquitt%20County%20Packers',
    radioName: 'WMTM 93.9 FM', radioUrl: 'https://www.iheart.com/live/wmtm-939-3470/'
  },
  {
    id: 'camden-wildcats', name: 'Camden County High School', mascot: 'Wildcats',
    city: 'Kingsland', county: 'Camden', group: 'big4', ghsaClass: '7A', helmet: '🐯',
    colors: { primary: '#c8102e', secondary: '#000000' },
    stadium: 'Chris Gilman Stadium', stadiumAddress: '6300 Laurel Island Pkwy, Kingsland, GA 31548',
    stadiumLat: 30.8358, stadiumLon: -81.6537,
    scorestream: 'https://scorestream.com/search?q=Camden%20County%20Wildcats',
    radioName: 'WSTI 105.5 FM', radioUrl: 'https://www.iheart.com/live/wsti-1055-3464/'
  },
  {
    id: 'tift-blue-devils', name: 'Tift County High School', mascot: 'Blue Devils',
    city: 'Tifton', county: 'Tift', group: 'big4', ghsaClass: '6A', helmet: '😈',
    colors: { primary: '#003594', secondary: '#ffffff' },
    stadium: 'Brodie Field', stadiumAddress: '1245 Eighth St, Tifton, GA 31794',
    stadiumLat: 31.4499, stadiumLon: -83.5085,
    scorestream: 'https://scorestream.com/search?q=Tift%20County%20Blue%20Devils',
    radioName: 'WTIF 107.5 FM', radioUrl: 'https://www.iheart.com/live/wtif-1075-3465/'
  },

  // ===== REGION 1-AA / 1-A =====
  {
    id: 'cook-hornets', name: 'Cook High School', mascot: 'Hornets',
    city: 'Adel', county: 'Cook', group: 'region1aa', ghsaClass: '2A', helmet: '🐝',
    colors: { primary: '#fdb515', secondary: '#000000' },
    stadium: 'Hornet Stadium', stadiumAddress: '1109 N Parrish Ave, Adel, GA 31620',
    stadiumLat: 31.1382, stadiumLon: -83.4254,
    scorestream: 'https://scorestream.com/search?q=Cook%20Hornets',
    radioName: null, radioUrl: null
  },
  {
    id: 'brooks-trojans', name: 'Brooks County High School', mascot: 'Trojans',
    city: 'Quitman', county: 'Brooks', group: 'region1aa', ghsaClass: '1A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'McCall Field', stadiumAddress: '801 W Screven St, Quitman, GA 31643',
    stadiumLat: 30.7857, stadiumLon: -83.5610,
    scorestream: 'https://scorestream.com/search?q=Brooks%20County%20Trojans',
    radioName: null, radioUrl: null
  },
  {
    id: 'berrien-rebels', name: 'Berrien High School', mascot: 'Rebels',
    city: 'Nashville', county: 'Berrien', group: 'region1aa', ghsaClass: '2A', helmet: '🎖️',
    colors: { primary: '#c8102e', secondary: '#003594' },
    stadium: 'Rebel Field', stadiumAddress: '601 W Pine St, Nashville, GA 31639',
    stadiumLat: 31.2065, stadiumLon: -83.2502,
    scorestream: 'https://scorestream.com/search?q=Berrien%20Rebels',
    radioName: null, radioUrl: null
  },
  {
    id: 'fitzgerald-hurricanes', name: 'Fitzgerald High School', mascot: 'Purple Hurricanes',
    city: 'Fitzgerald', county: 'Ben Hill', group: 'region1aa', ghsaClass: '2A', helmet: '🌀',
    colors: { primary: '#5d2e8c', secondary: '#ffffff' },
    stadium: 'Hank Aaron Stadium', stadiumAddress: '1000 Magnolia St, Fitzgerald, GA 31750',
    stadiumLat: 31.7148, stadiumLon: -83.2563,
    scorestream: 'https://scorestream.com/search?q=Fitzgerald%20Purple%20Hurricanes',
    radioName: null, radioUrl: null
  },
  {
    id: 'irwin-indians', name: 'Irwin County High School', mascot: 'Indians',
    city: 'Ocilla', county: 'Irwin', group: 'region1aa', ghsaClass: '1A', helmet: '🪶',
    colors: { primary: '#c8102e', secondary: '#ffffff' },
    stadium: 'Indian Field', stadiumAddress: '155 Chieftain Cir, Ocilla, GA 31774',
    stadiumLat: 31.5933, stadiumLon: -83.2521,
    scorestream: 'https://scorestream.com/search?q=Irwin%20County%20Indians',
    radioName: null, radioUrl: null
  },
  {
    id: 'thomasville-bulldogs', name: 'Thomasville High School', mascot: 'Bulldogs',
    city: 'Thomasville', county: 'Thomas', group: 'region1aa', ghsaClass: '2A', helmet: '🐶',
    colors: { primary: '#000000', secondary: '#fdb515' },
    stadium: 'Veterans Memorial Stadium', stadiumAddress: '1010 N Madison St, Thomasville, GA 31792',
    stadiumLat: 30.8443, stadiumLon: -83.9788,
    scorestream: 'https://scorestream.com/search?q=Thomasville%20Bulldogs',
    radioName: null, radioUrl: null
  },
  {
    id: 'thomas-central-yellowjackets', name: 'Thomas County Central High School', mascot: 'Yellow Jackets',
    city: 'Thomasville', county: 'Thomas', group: 'region1aa', ghsaClass: '5A', helmet: '🐝',
    colors: { primary: '#fdb515', secondary: '#000000' },
    stadium: 'Yellow Jacket Stadium', stadiumAddress: '4686 US-84, Thomasville, GA 31792',
    stadiumLat: 30.8665, stadiumLon: -83.8888,
    scorestream: 'https://scorestream.com/search?q=Thomas%20County%20Central%20Yellow%20Jackets',
    radioName: null, radioUrl: null
  },
  {
    id: 'bainbridge-bearcats', name: 'Bainbridge High School', mascot: 'Bearcats',
    city: 'Bainbridge', county: 'Decatur', group: 'region1aa', ghsaClass: '5A', helmet: '🐻',
    colors: { primary: '#fdb515', secondary: '#000000' },
    stadium: 'Centennial Field', stadiumAddress: '1101 Wheat Ave, Bainbridge, GA 39817',
    stadiumLat: 30.9089, stadiumLon: -84.5783,
    scorestream: 'https://scorestream.com/search?q=Bainbridge%20Bearcats',
    radioName: null, radioUrl: null
  },
  {
    id: 'clinch-panthers', name: 'Clinch County High School', mascot: 'Panthers',
    city: 'Homerville', county: 'Clinch', group: 'region1aa', ghsaClass: '1A', helmet: '🐆',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Panther Field', stadiumAddress: '155 N Church St, Homerville, GA 31634',
    stadiumLat: 31.0388, stadiumLon: -82.7551,
    scorestream: 'https://scorestream.com/search?q=Clinch%20County%20Panthers',
    radioName: null, radioUrl: null
  },
  {
    id: 'lanier-bulldogs', name: 'Lanier County High School', mascot: 'Bulldogs',
    city: 'Lakeland', county: 'Lanier', group: 'region1aa', ghsaClass: '1A', helmet: '🐶',
    colors: { primary: '#c8102e', secondary: '#ffffff' },
    stadium: 'Bulldog Field', stadiumAddress: '100 Bulldog Dr, Lakeland, GA 31635',
    stadiumLat: 31.0388, stadiumLon: -83.0743,
    scorestream: 'https://scorestream.com/search?q=Lanier%20County%20Bulldogs',
    radioName: null, radioUrl: null
  },
  {
    id: 'charlton-indians', name: 'Charlton County High School', mascot: 'Indians',
    city: 'Folkston', county: 'Charlton', group: 'region1aa', ghsaClass: '1A', helmet: '🪶',
    colors: { primary: '#c8102e', secondary: '#fdb515' },
    stadium: 'Indian Stadium', stadiumAddress: '1001 S 2nd St, Folkston, GA 31537',
    stadiumLat: 30.8330, stadiumLon: -82.0107,
    scorestream: 'https://scorestream.com/search?q=Charlton%20County%20Indians',
    radioName: null, radioUrl: null
  },
  {
    id: 'atkinson-rebels', name: 'Atkinson County High School', mascot: 'Rebels',
    city: 'Pearson', county: 'Atkinson', group: 'region1aa', ghsaClass: '1A', helmet: '🎖️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Rebel Stadium', stadiumAddress: '49 W Roosevelt Ave, Pearson, GA 31642',
    stadiumLat: 31.2982, stadiumLon: -82.8546,
    scorestream: 'https://scorestream.com/search?q=Atkinson%20County%20Rebels',
    radioName: null, radioUrl: null
  },
  {
    id: 'echols-wildcats', name: 'Echols County High School', mascot: 'Wildcats',
    city: 'Statenville', county: 'Echols', group: 'region1aa', ghsaClass: '1A', helmet: '🐱',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Echols County Stadium', stadiumAddress: '13586 GA-94, Statenville, GA 31648',
    stadiumLat: 30.7035, stadiumLon: -83.0335,
    scorestream: 'https://scorestream.com/search?q=Echols%20County%20Wildcats',
    radioName: null, radioUrl: null
  },
  {
    id: 'pelham-hornets', name: 'Pelham High School', mascot: 'Hornets',
    city: 'Pelham', county: 'Mitchell', group: 'region1aa', ghsaClass: '1A', helmet: '🐝',
    colors: { primary: '#fdb515', secondary: '#000000' },
    stadium: 'Hornet Stadium', stadiumAddress: '108 Mathewson Ave NW, Pelham, GA 31779',
    stadiumLat: 31.1296, stadiumLon: -84.1530,
    scorestream: 'https://scorestream.com/search?q=Pelham%20Hornets',
    radioName: null, radioUrl: null
  },
  {
    id: 'cairo-syrupmakers', name: 'Cairo High School', mascot: 'Syrupmakers',
    city: 'Cairo', county: 'Grady', group: 'region1aa', ghsaClass: '5A', helmet: '🍯',
    colors: { primary: '#5d2e8c', secondary: '#fdb515' },
    stadium: 'Hardy Hill Stadium', stadiumAddress: '350 Eighth Ave SE, Cairo, GA 39828',
    stadiumLat: 30.8744, stadiumLon: -84.2024,
    scorestream: 'https://scorestream.com/search?q=Cairo%20Syrupmakers',
    radioName: null, radioUrl: null
  },

  // ===== INLAND / ALBANY =====
  {
    id: 'westover-patriots', name: 'Westover High School', mascot: 'Patriots',
    city: 'Albany', county: 'Dougherty', group: 'inland', ghsaClass: '4A', helmet: '🦅',
    colors: { primary: '#c8102e', secondary: '#003594' },
    stadium: 'Hugh Mills Stadium', stadiumAddress: '2400 Gillionville Rd, Albany, GA 31707',
    stadiumLat: 31.5755, stadiumLon: -84.1965,
    scorestream: 'https://scorestream.com/search?q=Westover%20Patriots',
    radioName: null, radioUrl: null
  },
  {
    id: 'monroe-tornadoes', name: 'Monroe High School', mascot: 'Golden Tornadoes',
    city: 'Albany', county: 'Dougherty', group: 'inland', ghsaClass: '3A', helmet: '🌪️',
    colors: { primary: '#fdb515', secondary: '#003594' },
    stadium: 'Hugh Mills Stadium', stadiumAddress: '2400 Gillionville Rd, Albany, GA 31707',
    stadiumLat: 31.5755, stadiumLon: -84.1965,
    scorestream: 'https://scorestream.com/search?q=Monroe%20Tornadoes%20Albany',
    radioName: null, radioUrl: null
  },
  {
    id: 'dougherty-trojans', name: 'Dougherty Comprehensive High School', mascot: 'Trojans',
    city: 'Albany', county: 'Dougherty', group: 'inland', ghsaClass: '3A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Hugh Mills Stadium', stadiumAddress: '2400 Gillionville Rd, Albany, GA 31707',
    stadiumLat: 31.5755, stadiumLon: -84.1965,
    scorestream: 'https://scorestream.com/search?q=Dougherty%20Trojans',
    radioName: null, radioUrl: null
  },
  {
    id: 'albany-indians', name: 'Albany High School', mascot: 'Indians',
    city: 'Albany', county: 'Dougherty', group: 'inland', ghsaClass: '3A', helmet: '🪶',
    colors: { primary: '#c8102e', secondary: '#ffffff' },
    stadium: 'Hugh Mills Stadium', stadiumAddress: '2400 Gillionville Rd, Albany, GA 31707',
    stadiumLat: 31.5755, stadiumLon: -84.1965,
    scorestream: 'https://scorestream.com/search?q=Albany%20Indians',
    radioName: null, radioUrl: null
  },
  {
    id: 'worth-rams', name: 'Worth County High School', mascot: 'Rams',
    city: 'Sylvester', county: 'Worth', group: 'inland', ghsaClass: '3A', helmet: '🐏',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Ram Stadium', stadiumAddress: '402 N Isabella St, Sylvester, GA 31791',
    stadiumLat: 31.5341, stadiumLon: -83.8366,
    scorestream: 'https://scorestream.com/search?q=Worth%20County%20Rams',
    radioName: null, radioUrl: null
  },
  {
    id: 'crisp-cougars', name: 'Crisp County High School', mascot: 'Cougars',
    city: 'Cordele', county: 'Crisp', group: 'inland', ghsaClass: '4A', helmet: '🐆',
    colors: { primary: '#c8102e', secondary: '#fdb515' },
    stadium: 'Tiger Stadium', stadiumAddress: '720 GA-300, Cordele, GA 31015',
    stadiumLat: 31.9457, stadiumLon: -83.7821,
    scorestream: 'https://scorestream.com/search?q=Crisp%20County%20Cougars',
    radioName: null, radioUrl: null
  },
  {
    id: 'lee-trojans', name: 'Lee County High School', mascot: 'Trojans',
    city: 'Leesburg', county: 'Lee', group: 'inland', ghsaClass: '6A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Trojan Field', stadiumAddress: '101 Trojan Way, Leesburg, GA 31763',
    stadiumLat: 31.7335, stadiumLon: -84.1888,
    scorestream: 'https://scorestream.com/search?q=Lee%20County%20Trojans',
    radioName: null, radioUrl: null
  },
  {
    id: 'mitchell-eagles', name: 'Mitchell County High School', mascot: 'Eagles',
    city: 'Camilla', county: 'Mitchell', group: 'inland', ghsaClass: '1A', helmet: '🦅',
    colors: { primary: '#fdb515', secondary: '#003594' },
    stadium: 'Eagle Stadium', stadiumAddress: '230 S Harney St, Camilla, GA 31730',
    stadiumLat: 31.2310, stadiumLon: -84.2102,
    scorestream: 'https://scorestream.com/search?q=Mitchell%20County%20Eagles',
    radioName: null, radioUrl: null
  },

  // ===== COASTAL / SE GEORGIA =====
  {
    id: 'ware-gators', name: 'Ware County High School', mascot: 'Gators',
    city: 'Waycross', county: 'Ware', group: 'coastal', ghsaClass: '5A', helmet: '🐊',
    colors: { primary: '#fdb515', secondary: '#003594' },
    stadium: 'Memorial Stadium', stadiumAddress: '2301 Knight Ave, Waycross, GA 31503',
    stadiumLat: 31.2074, stadiumLon: -82.3540,
    scorestream: 'https://scorestream.com/search?q=Ware%20County%20Gators',
    radioName: null, radioUrl: null
  },
  {
    id: 'pierce-bears', name: 'Pierce County High School', mascot: 'Bears',
    city: 'Blackshear', county: 'Pierce', group: 'coastal', ghsaClass: '3A', helmet: '🐻',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Bear Stadium', stadiumAddress: '305 College St, Blackshear, GA 31516',
    stadiumLat: 31.3046, stadiumLon: -82.2421,
    scorestream: 'https://scorestream.com/search?q=Pierce%20County%20Bears',
    radioName: null, radioUrl: null
  },
  {
    id: 'wayne-yellowjackets', name: 'Wayne County High School', mascot: 'Yellow Jackets',
    city: 'Jesup', county: 'Wayne', group: 'coastal', ghsaClass: '5A', helmet: '🐝',
    colors: { primary: '#000000', secondary: '#fdb515' },
    stadium: 'Yellow Jacket Stadium', stadiumAddress: '1188 N Macon St, Jesup, GA 31545',
    stadiumLat: 31.6068, stadiumLon: -81.8853,
    scorestream: 'https://scorestream.com/search?q=Wayne%20County%20Yellow%20Jackets',
    radioName: null, radioUrl: null
  },
  {
    id: 'appling-pirates', name: 'Appling County High School', mascot: 'Pirates',
    city: 'Baxley', county: 'Appling', group: 'coastal', ghsaClass: '3A', helmet: '🏴‍☠️',
    colors: { primary: '#000000', secondary: '#fdb515' },
    stadium: 'Pirate Stadium', stadiumAddress: '500 Blackshear Hwy, Baxley, GA 31513',
    stadiumLat: 31.7791, stadiumLon: -82.3621,
    scorestream: 'https://scorestream.com/search?q=Appling%20County%20Pirates',
    radioName: null, radioUrl: null
  },
  {
    id: 'brantley-herons', name: 'Brantley County High School', mascot: 'Herons',
    city: 'Nahunta', county: 'Brantley', group: 'coastal', ghsaClass: '2A', helmet: '🦩',
    colors: { primary: '#003594', secondary: '#ffffff' },
    stadium: 'Heron Stadium', stadiumAddress: '550 Herrin Ave, Nahunta, GA 31553',
    stadiumLat: 31.2002, stadiumLon: -81.9810,
    scorestream: 'https://scorestream.com/search?q=Brantley%20County%20Herons',
    radioName: null, radioUrl: null
  },
  {
    id: 'glynn-red-terrors', name: 'Glynn Academy', mascot: 'Red Terrors',
    city: 'Brunswick', county: 'Glynn', group: 'coastal', ghsaClass: '6A', helmet: '👹',
    colors: { primary: '#c8102e', secondary: '#ffffff' },
    stadium: 'Glynn County Stadium', stadiumAddress: '1500 Mansfield St, Brunswick, GA 31520',
    stadiumLat: 31.1499, stadiumLon: -81.4915,
    scorestream: 'https://scorestream.com/search?q=Glynn%20Academy%20Red%20Terrors',
    radioName: null, radioUrl: null
  },
  {
    id: 'brunswick-pirates', name: 'Brunswick High School', mascot: 'Pirates',
    city: 'Brunswick', county: 'Glynn', group: 'coastal', ghsaClass: '6A', helmet: '🏴‍☠️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Glynn County Stadium', stadiumAddress: '1500 Mansfield St, Brunswick, GA 31520',
    stadiumLat: 31.1499, stadiumLon: -81.4915,
    scorestream: 'https://scorestream.com/search?q=Brunswick%20Pirates',
    radioName: null, radioUrl: null
  },

  // ===== NEIGHBORING / DOUGLAS =====
  {
    id: 'coffee-trojans', name: 'Coffee High School', mascot: 'Trojans',
    city: 'Douglas', county: 'Coffee', group: 'neighboring', ghsaClass: '5A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Jardine Stadium', stadiumAddress: '142 Trojan Way, Douglas, GA 31533',
    stadiumLat: 31.5226, stadiumLon: -82.8499,
    scorestream: 'https://scorestream.com/search?q=Coffee%20Trojans',
    radioName: null, radioUrl: null
  },
  {
    id: 'bacon-raiders', name: 'Bacon County High School', mascot: 'Raiders',
    city: 'Alma', county: 'Bacon', group: 'neighboring', ghsaClass: '1A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#ffffff' },
    stadium: 'Raider Stadium', stadiumAddress: '801 South Pierce St, Alma, GA 31510',
    stadiumLat: 31.5400, stadiumLon: -82.4632,
    scorestream: 'https://scorestream.com/search?q=Bacon%20County%20Raiders',
    radioName: null, radioUrl: null
  },
  {
    id: 'jeffdavis-yellowjackets', name: 'Jeff Davis High School', mascot: 'Yellow Jackets',
    city: 'Hazlehurst', county: 'Jeff Davis', group: 'neighboring', ghsaClass: '3A', helmet: '🐝',
    colors: { primary: '#fdb515', secondary: '#000000' },
    stadium: 'Jacket Stadium', stadiumAddress: '146 Jacket Dr, Hazlehurst, GA 31539',
    stadiumLat: 31.8732, stadiumLon: -82.5946,
    scorestream: 'https://scorestream.com/search?q=Jeff%20Davis%20Yellow%20Jackets',
    radioName: null, radioUrl: null
  },
  {
    id: 'telfair-trojans', name: 'Telfair County High School', mascot: 'Trojans',
    city: 'McRae', county: 'Telfair', group: 'neighboring', ghsaClass: '1A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#fdb515' },
    stadium: 'Trojan Field', stadiumAddress: '230 College St, McRae-Helena, GA 31055',
    stadiumLat: 32.0682, stadiumLon: -82.8987,
    scorestream: 'https://scorestream.com/search?q=Telfair%20County%20Trojans',
    radioName: null, radioUrl: null
  },
  {
    id: 'wilcox-patriots', name: 'Wilcox County High School', mascot: 'Patriots',
    city: 'Rochelle', county: 'Wilcox', group: 'neighboring', ghsaClass: '1A', helmet: '🦅',
    colors: { primary: '#c8102e', secondary: '#003594' },
    stadium: 'Patriot Stadium', stadiumAddress: '60 Patriot Way, Rochelle, GA 31079',
    stadiumLat: 31.9482, stadiumLon: -83.4541,
    scorestream: 'https://scorestream.com/search?q=Wilcox%20County%20Patriots',
    radioName: null, radioUrl: null
  },
  {
    id: 'turner-titans', name: 'Turner County High School', mascot: 'Titans',
    city: 'Ashburn', county: 'Turner', group: 'neighboring', ghsaClass: '1A', helmet: '⚔️',
    colors: { primary: '#003594', secondary: '#c0c0c0' },
    stadium: 'Titan Stadium', stadiumAddress: '825 Pine Tree Dr, Ashburn, GA 31714',
    stadiumLat: 31.7080, stadiumLon: -83.6582,
    scorestream: 'https://scorestream.com/search?q=Turner%20County%20Titans',
    radioName: null, radioUrl: null
  }
];

// ---- MOCK SCHEDULE (Week 7, Friday Oct 17, 2026) ----
// In production this would come from a GHSA schedule API.
const SCHEDULE = [
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'lowndes-vikings',          awayId: 'valdosta-wildcats' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'lee-trojans',              awayId: 'colquitt-packers' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'tift-blue-devils',         awayId: 'camden-wildcats' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'cook-hornets',             awayId: 'brooks-trojans' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'berrien-rebels',           awayId: 'fitzgerald-hurricanes' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'irwin-indians',            awayId: 'clinch-panthers' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'thomas-central-yellowjackets', awayId: 'thomasville-bulldogs' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'bainbridge-bearcats',      awayId: 'cairo-syrupmakers' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'lanier-bulldogs',          awayId: 'atkinson-rebels' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'echols-wildcats',          awayId: 'charlton-indians' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'pelham-hornets',           awayId: 'mitchell-eagles' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'westover-patriots',        awayId: 'monroe-tornadoes' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'dougherty-trojans',        awayId: 'albany-indians' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'worth-rams',               awayId: 'crisp-cougars' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'ware-gators',              awayId: 'coffee-trojans' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'pierce-bears',             awayId: 'appling-pirates' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'wayne-yellowjackets',      awayId: 'brantley-herons' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'glynn-red-terrors',        awayId: 'brunswick-pirates' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'jeffdavis-yellowjackets',  awayId: 'bacon-raiders' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'telfair-trojans',          awayId: 'wilcox-patriots' },
  { week: 7, fridayDate: '2026-10-17', kickoff: '19:30', homeId: 'turner-titans',            awayId: 'fitzgerald-hurricanes' }
];

// ---- APP STATE ----
const state = {
  group: 'all',
  query: '',
  userLat: null,
  userLon: null,
  viewMode: 'list',
  weatherCache: {},      // zone code -> { alerts, fetchedAt }
  pointsCache: {},       // "lat,lon" -> zone code
  leafletMap: null,
  groupColors: {
    big4:        '#fdb515',
    region1aa:   '#c8102e',
    inland:      '#3b82f6',
    coastal:     '#14b8a6',
    neighboring: '#22c55e'
  }
};

const NWS_UA = 'riktom.com Friday Night Scoreboard (hello@riktom.com)';

// ---- UTIL ----
function $(id) { return document.getElementById(id); }
function escHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function schoolById(id) { return SCHOOLS.find(s => s.id === id); }
function distanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function formatKickoff(timeStr) {
  // "19:30" -> "7:30 PM"
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}
function formatFridayDate() {
  const today = new Date();
  const dow = today.getDay(); // Fri = 5
  const daysToFri = (5 - dow + 7) % 7;
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysToFri);
  return friday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// ---- NWS WEATHER ----
async function fetchZoneForPoint(lat, lon) {
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  if (state.pointsCache[key]) return state.pointsCache[key];
  try {
    const res = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
      headers: { 'User-Agent': NWS_UA, 'Accept': 'application/geo+json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const zoneUrl = data && data.properties && data.properties.forecastZone;
    if (!zoneUrl) return null;
    const zone = zoneUrl.split('/').pop();
    state.pointsCache[key] = zone;
    return zone;
  } catch (e) { return null; }
}

async function fetchAlertsForZone(zone) {
  if (!zone) return [];
  const cached = state.weatherCache[zone];
  if (cached && (Date.now() - cached.fetchedAt < 10 * 60 * 1000)) {
    return cached.alerts;
  }
  try {
    const res = await fetch(`https://api.weather.gov/alerts/active?zone=${zone}`, {
      headers: { 'User-Agent': NWS_UA, 'Accept': 'application/geo+json' }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const alerts = (data.features || []).map(f => ({
      event: f.properties.event,
      headline: f.properties.headline,
      url: f.properties.uri || (f.id) || '#'
    }));
    state.weatherCache[zone] = { alerts, fetchedAt: Date.now() };
    return alerts;
  } catch (e) { return []; }
}

function isStormAlert(a) {
  const e = (a.event || '').toLowerCase();
  return e.includes('thunderstorm') || e.includes('tornado') || e.includes('lightning') || e.includes('severe');
}

async function updateWeatherForCard(card, school) {
  const pill = card.querySelector('.weather-pill');
  if (!pill) return;
  const zone = await fetchZoneForPoint(school.stadiumLat, school.stadiumLon);
  if (!zone) return;
  const alerts = await fetchAlertsForZone(zone);
  const storm = alerts.find(isStormAlert);
  if (storm) {
    pill.className = 'weather-pill alert';
    pill.tagName === 'A' || pill.setAttribute('role', 'link');
    pill.innerHTML = `⚠ ${escHtml(storm.event)}`;
    if (pill.tagName === 'A') pill.setAttribute('href', storm.url);
  } else {
    pill.className = 'weather-pill';
    pill.innerHTML = '🌤 Clear · No active alerts';
  }
}

// ---- RENDERING ----
function gameMatchesFilter(game) {
  const home = schoolById(game.homeId);
  const away = schoolById(game.awayId);
  if (!home || !away) return false;

  if (state.group !== 'all' && home.group !== state.group && away.group !== state.group) return false;

  if (state.query) {
    const q = state.query.toLowerCase();
    const blob = `${home.name} ${home.mascot} ${home.city} ${away.name} ${away.mascot} ${away.city}`.toLowerCase();
    if (!blob.includes(q)) return false;
  }
  return true;
}

function buildGameCard(game, opts = {}) {
  const home = schoolById(game.homeId);
  const away = schoolById(game.awayId);
  if (!home || !away) return null;

  const kickoffStr = `Fri ${formatKickoff(game.kickoff)}`;
  let distanceHtml = '';
  if (opts.distance != null) {
    distanceHtml = `<span class="distance">📍 ${opts.distance.toFixed(1)} mi away</span>`;
  }

  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(home.stadiumAddress)}`;
  const radioBtn = home.radioUrl
    ? `<a class="action" href="${escHtml(home.radioUrl)}" target="_blank" rel="noopener">📻 ${escHtml(home.radioName)}</a>`
    : '';

  // Build the game_id that matches the backend format
  const gameId = `${away.id}-vs-${home.id}-${game.fridayDate}`;

  const card = document.createElement('div');
  card.className = 'game-card';
  card.style.borderTopColor = home.colors.primary || 'var(--accent)';
  card.dataset.homeId = home.id;
  card.dataset.awayId = away.id;
  card.dataset.gameId = gameId;

  card.innerHTML = `
    <div class="matchup">
      <div class="teams">
        <span class="helmet">${escHtml(away.helmet)}</span>${escHtml(away.mascot)}
        <span class="at">@</span>
        ${escHtml(home.mascot)}<span class="helmet">${escHtml(home.helmet)}</span>
      </div>
      <span class="status-badge js-status-badge">${escHtml(kickoffStr)}</span>
    </div>
    <div class="score-row js-score-row" hidden>
      <div class="score-line">
        <span class="team-short">${escHtml(away.mascot)}</span>
        <span class="score js-away-score">—</span>
      </div>
      <div class="score-line">
        <span class="team-short">${escHtml(home.mascot)}</span>
        <span class="score js-home-score">—</span>
      </div>
      <div class="game-progress js-game-progress"></div>
    </div>
    <div class="stadium">📍 ${escHtml(home.stadium)} · ${escHtml(home.city)}, GA</div>
    ${distanceHtml}
    <a class="weather-pill" href="#" target="_blank" rel="noopener">🌤 Checking weather…</a>
    <div class="actions">
      <a class="action" href="${escHtml(dirUrl)}" target="_blank" rel="noopener">📍 Directions</a>
      ${radioBtn}
    </div>
  `;

  // Lazy-load weather for this card
  updateWeatherForCard(card, home);

  return card;
}

function renderGameList() {
  const grid = $('game-grid');
  grid.innerHTML = '';

  const games = SCHEDULE.filter(gameMatchesFilter);
  if (games.length === 0) {
    $('empty-state').hidden = false;
  } else {
    $('empty-state').hidden = true;
    for (const g of games) {
      const card = buildGameCard(g);
      if (card) grid.appendChild(card);
    }
  }
}

function renderClosest() {
  const section = $('closest-section');
  const grid = $('closest-grid');
  if (state.userLat == null) {
    section.hidden = true;
    return;
  }
  // Find games whose home stadium is closest; dedupe by stadium location
  const games = SCHEDULE
    .filter(gameMatchesFilter)
    .map(g => {
      const home = schoolById(g.homeId);
      const d = distanceMiles(state.userLat, state.userLon, home.stadiumLat, home.stadiumLon);
      return { game: g, distance: d };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  grid.innerHTML = '';
  for (const { game, distance } of games) {
    const card = buildGameCard(game, { distance });
    if (card) grid.appendChild(card);
  }
  section.hidden = games.length === 0;
}

function renderAll() {
  renderClosest();
  renderGameList();
  // After re-rendering cards, re-apply latest scores so filter changes don't wipe live data
  if (typeof fetchScores === 'function') fetchScores();
}

// ---- VIEW SWITCHING ----
function switchView(mode) {
  state.viewMode = mode;
  $('list-view').classList.toggle('active', mode === 'list');
  $('map-view').classList.toggle('active', mode === 'map');
  document.querySelectorAll('.view-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === mode);
  });
  if (mode === 'map') {
    void $('map-view').offsetHeight;  // force synchronous layout
    renderMap();
  }
}

function renderMap() {
  if (typeof L === 'undefined') return;
  const container = $('map-container');
  if (!state.leafletMap) {
    state.leafletMap = L.map(container).setView([31.2, -83.2], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18
    }).addTo(state.leafletMap);
  } else {
    state.leafletMap.invalidateSize();
  }

  // Clear existing markers
  state.leafletMap.eachLayer(layer => {
    if (layer instanceof L.CircleMarker) state.leafletMap.removeLayer(layer);
  });

  for (const school of SCHOOLS) {
    if (state.group !== 'all' && school.group !== state.group) continue;
    const color = state.groupColors[school.group] || '#fdb515';
    const marker = L.circleMarker([school.stadiumLat, school.stadiumLon], {
      radius: 8,
      fillColor: color,
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(state.leafletMap);
    marker.bindPopup(
      `<strong>${escHtml(school.helmet)} ${escHtml(school.name)}</strong><br>` +
      `${escHtml(school.stadium)}<br>` +
      `${escHtml(school.city)}, GA<br>` +
      `<a href="${escHtml(school.scorestream)}" target="_blank" rel="noopener">📊 Live Score</a>`
    );
  }
}

// ---- GEOLOCATION ----
function locateUser() {
  const btn = $('locate-btn');
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser.');
    return;
  }
  btn.textContent = '📡 Locating…';
  btn.disabled = true;
  navigator.geolocation.getCurrentPosition(
    pos => {
      state.userLat = pos.coords.latitude;
      state.userLon = pos.coords.longitude;
      btn.textContent = '📍 Location set';
      btn.disabled = false;
      renderAll();
    },
    err => {
      btn.textContent = '📍 Find My Location';
      btn.disabled = false;
      alert('Could not get your location: ' + err.message);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
  );
}

// ---- EVENT WIRING ----
function setupEvents() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.group = chip.dataset.group;
      renderAll();
      if (state.viewMode === 'map') renderMap();
    });
  });

  $('search').addEventListener('input', e => {
    state.query = e.target.value.trim();
    renderAll();
  });

  $('locate-btn').addEventListener('click', locateUser);

  document.querySelectorAll('.view-btn').forEach(b => {
    b.addEventListener('click', () => switchView(b.dataset.view));
  });

  // Periodic weather refresh (10 min) — re-renders weather pills for visible cards
  setInterval(() => {
    document.querySelectorAll('.game-card').forEach(card => {
      const home = schoolById(card.dataset.homeId);
      if (home) {
        // Bust zone cache age so refresh hits the API
        updateWeatherForCard(card, home);
      }
    });
  }, 10 * 60 * 1000);
}

/* ═══════════════════════════════════════════════════
   LIVE SCORES — poll backend /api/scores every 30s
═══════════════════════════════════════════════════ */
async function fetchScores() {
  try {
    const res = await fetch('/api/scores', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    applyScores(data.games || []);
  } catch (err) {
    // Silent failure — keep showing whatever was last rendered
    console.warn('Score fetch failed:', err.message);
  }
}

function applyScores(games) {
  for (const g of games) {
    const card = document.querySelector(`.game-card[data-game-id="${g.game_id}"]`);
    if (!card) continue;

    const statusBadge = card.querySelector('.js-status-badge');
    const scoreRow    = card.querySelector('.js-score-row');
    const awayScoreEl = card.querySelector('.js-away-score');
    const homeScoreEl = card.querySelector('.js-home-score');
    const progressEl  = card.querySelector('.js-game-progress');

    // If there's no score data at all, leave the kickoff badge
    if (g.away_score == null && g.home_score == null && g.status === 'pre') {
      scoreRow.hidden = true;
      continue;
    }

    scoreRow.hidden = false;
    awayScoreEl.textContent = g.away_score != null ? g.away_score : '—';
    homeScoreEl.textContent = g.home_score != null ? g.home_score : '—';

    // Highlight whoever is winning
    awayScoreEl.classList.toggle('winning', g.away_score != null && g.home_score != null && g.away_score > g.home_score);
    homeScoreEl.classList.toggle('winning', g.away_score != null && g.home_score != null && g.home_score > g.away_score);

    // Status badge + progress text
    if (g.status === 'final') {
      statusBadge.textContent = 'FINAL';
      statusBadge.className = 'status-badge js-status-badge status-final';
      progressEl.textContent = '';
    } else if (g.status === 'in') {
      const parts = [];
      if (g.period) parts.push(g.period);
      if (g.clock) parts.push(g.clock);
      statusBadge.textContent = '🔴 LIVE';
      statusBadge.className = 'status-badge js-status-badge status-live';
      progressEl.textContent = parts.join(' · ');
    } else if (g.status === 'postponed') {
      statusBadge.textContent = 'PPD';
      statusBadge.className = 'status-badge js-status-badge status-ppd';
      progressEl.textContent = 'Postponed';
    } else {
      // pre but with scores set somehow — leave alone
    }
  }
}

let scoreTimer = null;
function startScorePolling() {
  fetchScores();
  if (scoreTimer) clearInterval(scoreTimer);
  scoreTimer = setInterval(fetchScores, 30 * 1000); // 30s
}

// ---- INIT ----
function init() {
  $('week-banner').textContent = `Week 7 — Friday, ${formatFridayDate()}`;
  setupEvents();
  renderAll();
  startScorePolling();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
