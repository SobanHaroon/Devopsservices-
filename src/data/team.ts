import type { LanguageType } from "../context/LanguageContext";
export const CHARACTER_IDS = ["kael", "kai", "milo"] as const;
export type CharacterName = (typeof CHARACTER_IDS)[number];
export const CHARACTER_NAMES: Record<CharacterName, string> = {
  kael: "Kael Astra",
  kai: "Kai Ren",
  milo: "Milo",
};
type Profile = {
  role: string;
  line: string;
  bio: string;
  detail: string;
  focus: string[];
  quote: string;
};
type TeamCopy = {
  title: string;
  intro: string;
  teaser: string;
  visit: string;
  back: string;
  note: string;
  contact: string;
  contactTitle: string;
  contactText: string;
  portfolio: string;
  focus: string;
  pause: string;
  resume: string;
  off: string;
  profiles: Record<CharacterName, Profile>;
};
export const TEAM_COPY: Record<LanguageType, TeamCopy> = {
  EN: {
    title: "Meet our team.",
    intro: "One independent founder. A studio full of character.",
    teaser:
      "Meet Kael, the founder behind the work, and Kai and Milo—the characters who bring our studio’s personality to life.",
    visit: "Meet the team",
    back: "Back to home",
    note: "Kael Astra is Muhammad Soban’s creative identity. Kai and Milo are studio characters. Your projects are led and delivered by Soban.",
    contact: "Start a project",
    contactTitle: "Let’s build together.",
    contactText:
      "A new website, a tricky frontend, or a white-label partnership. Tell Soban what you have in mind.",
    portfolio: "Explore my portfolio",
    focus: "Focus",
    pause: "Pause motion",
    resume: "Resume motion",
    off: "Motion off",
    profiles: {
      kael: {
        role: "CEO & Founder",
        line: "The idea. The craft. The follow-through.",
        bio: "I’m Muhammad Soban—also known as Kael Astra. I founded DevOps Services to bring thoughtful design and dependable development into the same conversation. You work directly with me, from the first sketch to the final launch.",
        detail:
          "Based in Rawalpindi, Pakistan, I’ve been building for the web since 2022. My toolkit spans React, Next.js, TypeScript, UI/UX and motion design, supported by experience in customer service and digital marketing.",
        focus: [
          "Creative direction",
          "Frontend development",
          "Client partnerships",
        ],
        quote: "Same hoodie. Bigger vision.",
      },
      kai: {
        role: "Coder & sulking master",
        line: "Quiet face. Relentless attention.",
        bio: "Kai Ren is the coding personality of our studio: a little reserved, occasionally sulking, and completely absorbed in making things work. His world is clean components, responsive layouts and the bug that refuses to reproduce.",
        detail:
          "He represents the care behind every build—turning designs into usable interfaces, checking the awkward screen sizes, refining interactions and keeping the experience fast. The expression says ‘not again.’ The code says ‘fixed.’",
        focus: [
          "React & TypeScript",
          "Responsive interfaces",
          "Debugging & performance",
        ],
        quote: "Fine. I fixed it.",
      },
      milo: {
        role: "Operations & resources",
        line: "Somehow, already prepared.",
        bio: "Milo is our operations manager and resource-handler character. He’s the one with the notes, the toolkit, the backup cable and a backpack that probably contains an entire office.",
        detail:
          "He represents the order behind good delivery: organizing briefs and assets, keeping tools and timelines ready, tracking the little details and making handovers easy to follow. A little overwhelmed, always on your side.",
        focus: [
          "Briefs & project assets",
          "Tools & timelines",
          "Resources & handovers",
        ],
        quote: "Got it. Packed it. Probably.",
      },
    },
  },
  JP: {
    title: "私たちのチーム。",
    intro: "一人の創業者と、個性あふれるスタジオ。",
    teaser:
      "制作を率いるカエルと、スタジオの個性を表現するカイ、ミロをご紹介します。",
    visit: "チームを見る",
    back: "ホームへ戻る",
    note: "カエル・アストラはムハンマド・ソバンのクリエイティブ名です。カイとミロはスタジオのキャラクターで、実際の制作はソバンが担当します。",
    contact: "プロジェクトを相談",
    contactTitle: "一緒につくりましょう。",
    contactText:
      "新しいサイト、開発、ホワイトラベル提携。ご希望をソバンにお聞かせください。",
    portfolio: "ポートフォリオを見る",
    focus: "担当分野",
    pause: "動きを止める",
    resume: "動きを再開",
    off: "モーションなし",
    profiles: {
      kael: {
        role: "CEO・創業者",
        line: "発想、技術、最後まで。",
        bio: "ムハンマド・ソバン、クリエイティブ名はカエル・アストラです。丁寧なデザインと確かな開発をつなぐためにDevOps Servicesを始めました。最初のご相談から公開まで、私が直接担当します。",
        detail:
          "パキスタンのラーワルピンディーを拠点に、2022年からウェブ制作に取り組んでいます。React、Next.js、TypeScript、UI/UX、モーションに加え、顧客対応とデジタルマーケティングの経験を活かします。",
        focus: [
          "クリエイティブ方針",
          "フロントエンド開発",
          "クライアントとの連携",
        ],
        quote: "同じパーカー。もっと大きな夢。",
      },
      kai: {
        role: "コーダー・すね顔の達人",
        line: "静かな表情。細部への情熱。",
        bio: "カイ・レンはスタジオの開発への姿勢を表すキャラクター。少し無口で、ときどきすね顔。それでも、使いやすい部品、レスポンシブな画面、再現しづらいバグに真剣に向き合います。",
        detail:
          "デザインを使えるインターフェースに変え、さまざまな画面幅を確認し、操作感と速度を磨く。その丁寧な仕事をカイが体現します。",
        focus: ["React・TypeScript", "レスポンシブUI", "デバッグ・速度改善"],
        quote: "はいはい。直したよ。",
      },
      milo: {
        role: "運営・リソース管理",
        line: "なぜか、もう準備できてる。",
        bio: "ミロは運営とリソース管理を表すキャラクター。メモも工具も予備のケーブルも、全部リュックに。まるで小さなオフィスを背負っています。",
        detail:
          "要件と素材の整理、ツールやスケジュールの準備、細かな確認、わかりやすい引き継ぎ。少し慌てながらも、制作が進むように支える姿を表現しています。",
        focus: ["要件・素材の整理", "ツール・スケジュール", "準備・引き継ぎ"],
        quote: "了解！入れた！たぶん！",
      },
    },
  },
  FR: {
    title: "Notre équipe.",
    intro: "Un fondateur indépendant. Un studio plein de caractère.",
    teaser:
      "Découvrez Kael, le fondateur derrière les projets, et Kai et Milo, les personnages qui incarnent l’esprit du studio.",
    visit: "Rencontrer l’équipe",
    back: "Retour à l’accueil",
    note: "Kael Astra est l’identité créative de Muhammad Soban. Kai et Milo sont des personnages du studio. Vos projets sont dirigés et réalisés par Soban.",
    contact: "Parlons du projet",
    contactTitle: "Créons ensemble.",
    contactText:
      "Un site, un frontend exigeant ou un partenariat en marque blanche : parlez-en à Soban.",
    portfolio: "Mon portfolio",
    focus: "Spécialités",
    pause: "Pause des animations",
    resume: "Reprendre les animations",
    off: "Animations désactivées",
    profiles: {
      kael: {
        role: "CEO & fondateur",
        line: "L’idée, le soin, le suivi.",
        bio: "Je suis Muhammad Soban, aussi connu sous le nom de Kael Astra. J’ai créé DevOps Services pour réunir design réfléchi et développement fiable. Vous travaillez directement avec moi, du premier croquis à la mise en ligne.",
        detail:
          "Basé à Rawalpindi, au Pakistan, je développe pour le web depuis 2022 : React, Next.js, TypeScript, UI/UX et motion design, avec une expérience en service client et marketing digital.",
        focus: [
          "Direction créative",
          "Développement frontend",
          "Relations clients",
        ],
        quote: "Même sweat. Plus grande vision.",
      },
      kai: {
        role: "Codeur & maître de la bouderie",
        line: "Discret. Attentif à tout.",
        bio: "Kai Ren incarne le développement du studio : réservé, parfois boudeur, mais absorbé par le travail bien fait. Son univers : composants propres, interfaces responsives et bugs récalcitrants.",
        detail:
          "Il représente le soin apporté à chaque site : donner vie au design, vérifier les formats d’écran, affiner les interactions et préserver la rapidité. L’air contrarié, le code corrigé.",
        focus: [
          "React & TypeScript",
          "Interfaces responsives",
          "Débogage & performance",
        ],
        quote: "Bon. C’est corrigé.",
      },
      milo: {
        role: "Opérations & ressources",
        line: "Déjà prêt. On ne sait comment.",
        bio: "Milo est notre personnage chargé des opérations et des ressources. Notes, outils, câble de secours : son sac contient probablement tout un bureau.",
        detail:
          "Il incarne l’organisation des briefs et des fichiers, la préparation des outils, le suivi des délais et les transmissions claires. Un peu débordé, toujours de votre côté.",
        focus: [
          "Briefs & fichiers",
          "Outils & planning",
          "Ressources & transmission",
        ],
        quote: "Compris. Emballé. Enfin, je crois.",
      },
    },
  },
  DE: {
    title: "Unser Team.",
    intro: "Ein unabhängiger Gründer. Ein Studio mit Charakter.",
    teaser:
      "Lernen Sie Kael kennen, den Gründer hinter den Projekten, und Kai und Milo, die Figuren unseres Studios.",
    visit: "Team kennenlernen",
    back: "Zur Startseite",
    note: "Kael Astra ist die kreative Identität von Muhammad Soban. Kai und Milo sind Studiofiguren. Soban leitet und realisiert Ihre Projekte.",
    contact: "Projekt besprechen",
    contactTitle: "Gemeinsam entwickeln.",
    contactText:
      "Eine Website, ein anspruchsvolles Frontend oder eine White-Label-Partnerschaft? Sprechen Sie mit Soban.",
    portfolio: "Mein Portfolio",
    focus: "Schwerpunkte",
    pause: "Animation pausieren",
    resume: "Animation fortsetzen",
    off: "Animation aus",
    profiles: {
      kael: {
        role: "CEO & Gründer",
        line: "Idee. Handwerk. Dranbleiben.",
        bio: "Ich bin Muhammad Soban, auch bekannt als Kael Astra. Mit DevOps Services verbinde ich durchdachtes Design und zuverlässige Entwicklung. Vom ersten Entwurf bis zum Start arbeiten Sie direkt mit mir.",
        detail:
          "Ich lebe in Rawalpindi, Pakistan, und entwickle seit 2022 fürs Web. Mein Werkzeugkasten: React, Next.js, TypeScript, UI/UX und Motion Design, ergänzt durch Erfahrung im Kundenservice und digitalen Marketing.",
        focus: [
          "Kreative Leitung",
          "Frontend-Entwicklung",
          "Kundenbeziehungen",
        ],
        quote: "Gleicher Hoodie. Größere Vision.",
      },
      kai: {
        role: "Coder & Meister des Schmollens",
        line: "Still. Bis ins Detail wach.",
        bio: "Kai Ren verkörpert die Entwicklungsseite des Studios: zurückhaltend, manchmal schmollend und ganz auf gute Arbeit konzentriert. Seine Welt besteht aus sauberen Komponenten, responsiven Oberflächen und hartnäckigen Fehlern.",
        detail:
          "Er steht für die Sorgfalt in jedem Projekt: Designs umsetzen, ungewöhnliche Bildschirmgrößen prüfen, Interaktionen verfeinern und Ladezeiten kurz halten. Der Blick ist genervt. Der Fehler ist behoben.",
        focus: [
          "React & TypeScript",
          "Responsive Oberflächen",
          "Fehlersuche & Leistung",
        ],
        quote: "Na gut. Ist behoben.",
      },
      milo: {
        role: "Betrieb & Ressourcen",
        line: "Irgendwie schon vorbereitet.",
        bio: "Milo ist unsere Figur für Betriebsabläufe und Ressourcen. Notizen, Werkzeuge, Ersatzkabel: In seinem Rucksack steckt wahrscheinlich ein ganzes Büro.",
        detail:
          "Er steht für geordnete Briefings und Dateien, einsatzbereite Werkzeuge, Terminübersicht und verständliche Übergaben. Etwas überfordert, aber immer an Ihrer Seite.",
        focus: [
          "Briefings & Dateien",
          "Werkzeuge & Termine",
          "Ressourcen & Übergabe",
        ],
        quote: "Verstanden. Eingepackt. Vermutlich.",
      },
    },
  },
};
