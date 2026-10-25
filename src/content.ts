export type Lang = "en" | "hi";

type Row = { whole: string; part: string; caption: string };
type City = { id: string; name: string; venue: string; date: string };

export type Copy = {
  nav: { links: { href: string; label: string }[]; toggle: string; toggleLabel: string };
  hero: { first: string; last: string; sub: string; cta: string; portraitAlt: string };
  statement: { h: [string, string]; quote: string; quoteRest: string; cite: string; portraitAlt: string };
  record: { h: [string, string]; rows: Row[] };
  before: { h: [string, string]; lead: string; body: string; rest: string; facts: string[]; portraitAlt: string };
  circuit: {
    h: [string, string];
    opener: string;
    cities: City[];
    outcome: string;
    mapLabel: string;
    home: string;
  };
  alliances: {
    h: [string, string];
    blocks: {
      title: [string, string];
      body: string;
      alt: string;
      figure?: { value: string; caption: string };
      seats?: { caption: string };
      picture?: { src: string; alt: string; caption: string };
    }[];
  };
  parliament: { first: string; last: string; stages: string[]; alt: string };
  contact: { h: string; email: string; places: string; social: string };
  close: { h: [string, string]; cta: string; credits: string; rights: string };
};

const cities = {
  en: [
    { id: "arrah", name: "Arrah", venue: "Veer Kunwar Singh Stadium", date: "8 June 2025" },
    { id: "rajgir", name: "Rajgir", venue: "Nalanda district", date: "29 June 2025" },
    { id: "chhapra", name: "Chhapra", venue: "Rajendra Stadium", date: "6 July 2025" },
    { id: "munger", name: "Munger", venue: "Polo Ground", date: "20 July 2025" },
    { id: "gaya", name: "Gaya", venue: "Gandhi Maidan, 26 constituencies", date: "26 July 2025" },
    { id: "muzaffarpur", name: "Muzaffarpur", venue: "MIT Ground", date: "4 September 2025" },
    { id: "purnia", name: "Purnia", venue: "Seemanchal", date: "2025" },
  ],
  hi: [
    { id: "arrah", name: "आरा", venue: "वीर कुंवर सिंह स्टेडियम", date: "8 जून 2025" },
    { id: "rajgir", name: "राजगीर", venue: "नालंदा ज़िला", date: "29 जून 2025" },
    { id: "chhapra", name: "छपरा", venue: "राजेंद्र स्टेडियम", date: "6 जुलाई 2025" },
    { id: "munger", name: "मुंगेर", venue: "पोलो ग्राउंड", date: "20 जुलाई 2025" },
    { id: "gaya", name: "गया", venue: "गांधी मैदान, 26 विधानसभा क्षेत्र", date: "26 जुलाई 2025" },
    { id: "muzaffarpur", name: "मुज़फ़्फ़रपुर", venue: "एमआईटी ग्राउंड", date: "4 सितंबर 2025" },
    { id: "purnia", name: "पूर्णिया", venue: "सीमांचल", date: "2025" },
  ],
};

export const copy: Record<Lang, Copy> = {
  en: {
    nav: {
      links: [
        { href: "#record", label: "Record" },
        { href: "#before", label: "Before Parliament" },
        { href: "#bihar", label: "Bihar 2025" },
        { href: "#parliament", label: "Parliament" },
        { href: "#contact", label: "Contact" },
      ],
      toggle: "हिंदी",
      toggleLabel: "हिंदी में पढ़ें",
    },
    hero: {
      first: "Arun",
      last: "Bharti",
      sub: "Member of Parliament for Jamui, Bihar, and Chief Whip of the Lok Janshakti Party (Ram Vilas).",
      cta: "See the record",
      portraitAlt: "Arun Bharti, smiling, in a black bandhgala",
    },
    statement: {
      h: ["Execution", "over intent."],
      quote:
        "Most governance failures aren’t failures of intent. They’re failures of execution.",
      quoteRest: "That conviction shapes everything about how I work.",
      cite: "Arun Bharti · MP, Jamui · SRCC · Strathclyde MBA",
      portraitAlt: "Arun Bharti standing in a black bandhgala",
    },
    record: {
      h: ["The record,", "in numbers."],
      rows: [
        { whole: "15", part: "+", caption: "years in banking, capital markets and infrastructure" },
        { whole: "19", part: "/29", caption: "Bihar seats won by LJP(RV) in 2025, of the 29 it contested" },
        { whole: "65", part: ".5", caption: "per cent strike rate, mostly in tough seats" },
        { whole: "7", part: "", caption: "Nav Sankalp Mahasabhas organised across Bihar" },
        { whole: "3", part: "", caption: "states handled as party incharge" },
        { whole: "3", part: "", caption: "Parliamentary committees, Finance among them" },
      ],
    },
    before: {
      h: ["Governance,", "learned first."],
      lead: "Arun Bharti",
      body:
        " came to Parliament the long way. Oak Grove School, Birla Pilani and SRCC, then an MBA in finance at Strathclyde. Fifteen years in the private sector followed: investment advisory at Uniglobal Securities, relationship banking at Standard Chartered, telecom, fibre and solar as CEO of Conflux Business Ventures, and a Tata Motors rural dealership that taught him the last mile.",
      rest:
        "Capital markets, then infrastructure, then rural India, then Parliament. His seat on the Finance Committee is not a coincidence. It is continuity.",
      facts: ["Jamui, Bihar", "Lok Sabha, since 2024", "Chief Whip, LJP(RV)"],
      portraitAlt: "Portrait of Arun Bharti in a white kurta",
    },
    circuit: {
      h: ["Seven cities.", "One outcome."],
      opener: "The Nav Sankalp Mahasabha circuit:",
      cities: cities.en,
      outcome: "29 seats negotiated. Every candidate finalised. 19 won.",
      mapLabel: "Map of Bihar with the seven Mahasabha cities and the route between them",
      home: "Jamui",
    },
    alliances: {
      h: ["Alliances,", "built to win."],
      blocks: [
        {
          title: ["Jharkhand,", "in sixty days."],
          body:
            "Built the NDA alliance in Jharkhand from scratch in sixty days. Chose Chatra, fielded the candidate and carried it after the longest roadshow in the party’s history, on 11 November 2024.",
          alt: "Arun Bharti, full length, in a black Nehru jacket",
          figure: { value: "18,401", caption: "votes: the winning margin in Chatra" },
        },
        {
          title: ["Twenty-nine seats,", "nineteen won."],
          body:
            "Appointed Bihar election incharge on day one. Negotiated 29 seats with the BJP, finalised every candidate and won 19 of them, mostly in tough seats.",
          alt: "Arun Bharti, full length, in a white kurta",
          seats: { caption: "Each square is a seat LJP(RV) contested in Bihar 2025" },
        },
        {
          title: ["Jamui,", "on the record."],
          body:
            "Roads, irrigation, water, rail, schools and health, tracked through DISHA reviews and the MPLAD fund. Every project logged by block and village, so any voter can see what has been done.",
          alt: "Arun Bharti in a black Nehru jacket, hands folded",
          picture: {
            src: "/img/jhajha-railway-station-in-the-jamui-district.webp",
            alt: "The red station building and platform at Jhajha",
            caption: "Jhajha station, Jamui district",
          },
        },
      ],
    },
    parliament: {
      first: "Three committees.",
      last: "One whip.",
      stages: [
        "Standing Committee on Finance: financial legislation and regulatory design.",
        "Committee on the Welfare of Scheduled Castes and Scheduled Tribes.",
        "Consultative Committee on Skill Development and Entrepreneurship. And Chief Whip of LJP(RV) in the Lok Sabha.",
      ],
      alt: "Sansad Bhavan, the Parliament House in New Delhi",
    },
    contact: {
      h: "Grievances, invitations, press: write to the office.",
      email: "office@arunbharti.in",
      places: "Jamui · New Delhi",
      social: "Follow",
    },
    close: {
      h: ["Bihar first.", "Bihari first."],
      cta: "Submit a grievance",
      credits: "Photographs of Bihar and Delhi",
      rights: "© 2026 Arun Bharti",
    },
  },
  hi: {
    nav: {
      links: [
        { href: "#record", label: "रिकॉर्ड" },
        { href: "#before", label: "संसद से पहले" },
        { href: "#bihar", label: "बिहार 2025" },
        { href: "#parliament", label: "संसद" },
        { href: "#contact", label: "संपर्क" },
      ],
      toggle: "English",
      toggleLabel: "Read in English",
    },
    hero: {
      first: "अरुण",
      last: "भारती",
      sub: "जमुई, बिहार से सांसद और लोक जनशक्ति पार्टी (रामविलास) के मुख्य सचेतक।",
      cta: "रिकॉर्ड देखें",
      portraitAlt: "काले बंदगले में मुस्कुराते हुए अरुण भारती",
    },
    statement: {
      h: ["इरादे से आगे,", "अमल।"],
      quote:
        "शासन की ज़्यादातर विफलताएँ इरादे की नहीं, अमल की होती हैं।",
      quoteRest: "यही विश्वास मेरे हर काम की दिशा तय करता है।",
      cite: "अरुण भारती · सांसद, जमुई · एसआरसीसी · स्ट्रैथक्लाइड एमबीए",
      portraitAlt: "काले बंदगले में खड़े अरुण भारती",
    },
    record: {
      h: ["रिकॉर्ड,", "आँकड़ों में।"],
      rows: [
        { whole: "15", part: "+", caption: "वर्ष बैंकिंग, पूँजी बाज़ार और इंफ्रास्ट्रक्चर में" },
        { whole: "19", part: "/29", caption: "2025 में बिहार की लड़ी गई 29 सीटों में से लोजपा (रा) की जीत" },
        { whole: "65", part: ".5", caption: "प्रतिशत स्ट्राइक रेट, ज़्यादातर कठिन सीटों पर" },
        { whole: "7", part: "", caption: "नव संकल्प महासभाएँ, पूरे बिहार में" },
        { whole: "3", part: "", caption: "राज्यों में पार्टी प्रभारी" },
        { whole: "3", part: "", caption: "संसदीय समितियाँ, वित्त समिति सहित" },
      ],
    },
    before: {
      h: ["शासन,", "पहले सीखा।"],
      lead: "अरुण भारती",
      body:
        " लंबा रास्ता तय करके संसद पहुँचे। ओक ग्रोव स्कूल, बिड़ला पिलानी और एसआरसीसी, फिर स्ट्रैथक्लाइड से फ़ाइनेंस में एमबीए। इसके बाद निजी क्षेत्र में पंद्रह साल: यूनिग्लोबल सिक्योरिटीज़ में निवेश सलाह, स्टैंडर्ड चार्टर्ड में रिलेशनशिप बैंकिंग, कॉन्फ़्लक्स बिज़नेस वेंचर्स के सीईओ के रूप में टेलीकॉम, फ़ाइबर और सोलर, और टाटा मोटर्स की ग्रामीण डीलरशिप, जिसने उन्हें आख़िरी छोर तक पहुँचना सिखाया।",
      rest:
        "पूँजी बाज़ार, फिर इंफ्रास्ट्रक्चर, फिर ग्रामीण भारत, फिर संसद। वित्त समिति में उनकी जगह संयोग नहीं है, यह निरंतरता है।",
      facts: ["जमुई, बिहार", "लोकसभा, 2024 से", "मुख्य सचेतक, लोजपा (रा)"],
      portraitAlt: "सफ़ेद कुर्ते में अरुण भारती का चित्र",
    },
    circuit: {
      h: ["सात शहर।", "एक नतीजा।"],
      opener: "नव संकल्प महासभा का सफ़र:",
      cities: cities.hi,
      outcome: "29 सीटों पर समझौता। हर उम्मीदवार तय। 19 पर जीत।",
      mapLabel: "बिहार का नक्शा, सात महासभा शहरों और उनके बीच के रास्ते के साथ",
      home: "जमुई",
    },
    alliances: {
      h: ["गठबंधन,", "जीत के लिए।"],
      blocks: [
        {
          title: ["झारखंड,", "साठ दिनों में।"],
          body:
            "झारखंड में एनडीए गठबंधन साठ दिनों में शून्य से खड़ा किया। चतरा सीट चुनी, उम्मीदवार उतारा और 11 नवंबर 2024 को पार्टी इतिहास के सबसे लंबे रोड शो के बाद उसे जीता।",
          alt: "काली नेहरू जैकेट में अरुण भारती, पूरी लंबाई",
          figure: { value: "18,401", caption: "वोट: चतरा में जीत का अंतर" },
        },
        {
          title: ["उनतीस सीटें,", "उन्नीस जीत।"],
          body:
            "पहले ही दिन बिहार चुनाव प्रभारी नियुक्त। भाजपा के साथ 29 सीटों पर समझौता, हर उम्मीदवार तय, और 19 सीटों पर जीत, ज़्यादातर कठिन सीटों पर।",
          alt: "सफ़ेद कुर्ते में अरुण भारती, पूरी लंबाई",
          seats: { caption: "हर खाना बिहार 2025 में लोजपा (रा) की लड़ी एक सीट है" },
        },
        {
          title: ["जमुई,", "रिकॉर्ड पर।"],
          body:
            "सड़क, सिंचाई, पानी, रेल, स्कूल और स्वास्थ्य: दिशा समीक्षा और एमपीलैड निधि के ज़रिए निगरानी। हर परियोजना प्रखंड और गाँव के हिसाब से दर्ज, ताकि हर मतदाता देख सके कि क्या हुआ है।",
          alt: "हाथ जोड़े, काली नेहरू जैकेट में अरुण भारती",
          picture: {
            src: "/img/jhajha-railway-station-in-the-jamui-district.webp",
            alt: "झाझा स्टेशन की लाल इमारत और प्लेटफ़ॉर्म",
            caption: "झाझा स्टेशन, जमुई ज़िला",
          },
        },
      ],
    },
    parliament: {
      first: "तीन समितियाँ।",
      last: "एक सचेतक।",
      stages: [
        "वित्त पर स्थायी समिति: वित्तीय विधान और नियामक ढाँचा।",
        "अनुसूचित जाति और अनुसूचित जनजाति कल्याण समिति।",
        "कौशल विकास और उद्यमिता पर परामर्शदात्री समिति। और लोकसभा में लोजपा (रा) के मुख्य सचेतक।",
      ],
      alt: "नई दिल्ली में संसद भवन",
    },
    contact: {
      h: "शिकायत, निमंत्रण, प्रेस: कार्यालय को लिखें।",
      email: "office@arunbharti.in",
      places: "जमुई · नई दिल्ली",
      social: "फ़ॉलो करें",
    },
    close: {
      h: ["बिहार फ़र्स्ट,", "बिहारी फ़र्स्ट।"],
      cta: "शिकायत दर्ज करें",
      credits: "बिहार और दिल्ली की तस्वीरें",
      rights: "© 2026 अरुण भारती",
    },
  },
};
