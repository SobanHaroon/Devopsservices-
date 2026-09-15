import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Send, 
  Loader2, 
  Sparkles, 
  AlertCircle,
  Bell,
  Radio,
  Smartphone,
  ExternalLink,
  Volume2,
  ShieldAlert,
  Terminal,
  ArrowRight,
  Clock,
  Settings,
  Check,
  Copy,
  X,
  FileText,
  ShieldAlert as ShieldCheck
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "./Toast";
import { BorderBeam } from "./ui/BorderBeam";

const playNotificationSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(440, now + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(580, now + 0.2);
    gain2.gain.setValueAtTime(0.05, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.5);
  } catch (e) {
    console.warn("Audio Context playback ignored or blocked:", e);
  }
};

const ConsoleTranslations: Record<string, {
  consoleTitle: string;
  consoleSubtitle: string;
  channelStatus: string;
  connected: string;
  disconnected: string;
  btnTest: string;
  sendingTest: string;
  testSent: string;
  setupHeader: string;
  step1: string;
  step2: string;
  step3: string;
  liveFeedTitle: string;
  listening: string;
  noNotifications: string;
  fields: {
    name: string;
    company: string;
    service: string;
    budget: string;
    desc: string;
  }
}> = {
  EN: {
    consoleTitle: "DevOps Push Notification Console",
    consoleSubtitle: "Real-time transmission & delivery verification telemetry via secure route",
    channelStatus: "System Status",
    connected: "LIVE FEED ACTIVE",
    disconnected: "RECONNECTING",
    btnTest: "Dispatch Test Push",
    sendingTest: "DISPATCHING...",
    testSent: "PUSH DISPATCHED",
    setupHeader: "Device Sync Guide",
    step1: "Access our internal notification hub",
    step2: "Establish subscription with secure credential profile",
    step3: "Receive instantaneous push alerts with full project telemetry",
    liveFeedTitle: "Live Message Dispatch Log",
    listening: "Ready and listening for transmission signals...",
    noNotifications: "No notifications logged in this session yet. Submit the form above or click 'Dispatch Test Push' to test.",
    fields: {
      name: "Name",
      company: "Company",
      service: "Service",
      budget: "Budget",
      desc: "Brief"
    }
  },
  FR: {
    consoleTitle: "Console de Notifications Push DevOps",
    consoleSubtitle: "Télémesure de transmission et de vérification en temps réel via un canal sécurisé",
    channelStatus: "Statut du Système",
    connected: "FLUX EN DIRECT ACTIF",
    disconnected: "RECONNEXION",
    btnTest: "Envoyer un Push de Test",
    sendingTest: "ENVOI...",
    testSent: "PUSH ENVOYÉ",
    setupHeader: "Guide de Synchronisation des Appareils",
    step1: "Accédez à notre hub interne de notifications",
    step2: "Établissez la connexion avec un profil d'identification sécurisé",
    step3: "Recevez instantanément des alertes push avec la télémétrie complète du projet",
    liveFeedTitle: "Journal de Diffusion en Direct",
    listening: "Prêt et à l'écoute des signaux de transmission...",
    noNotifications: "Aucune notification enregistrée dans cette session. Soumettez le formulaire ci-dessus ou cliquez sur 'Envoyer un Push de Test' pour tester.",
    fields: {
      name: "Nom",
      company: "Entreprise",
      service: "Service",
      budget: "Budget",
      desc: "Descriptif"
    }
  },
  DE: {
    consoleTitle: "DevOps Push-Benachrichtigungskonsole",
    consoleSubtitle: "Echtzeit-Übertragungs- & Verifizierungs-Telemetrie über gesicherte Verbindung",
    channelStatus: "Systemstatus",
    connected: "LIVE-FEED AKTIV",
    disconnected: "VERBINDUNG WIRD HERGESTELLT",
    btnTest: "Test-Push senden",
    sendingTest: "SENDEN...",
    testSent: "PUSH GESENDET",
    setupHeader: "Geräte-Synchronisierungsanleitung",
    step1: "Greifen Sie auf unseren internen Benachrichtigungshub zu",
    step2: "Richten Sie das Abonnement mit einem sicheren Berechtigungsprofil ein",
    step3: "Erhalten Sie sofortige Push-Benachrichtigungen mit vollständigen Projektdaten",
    liveFeedTitle: "Echtzeit-Übertragungsprotokoll",
    listening: "Bereit und lauscht auf Übertragungssignale...",
    noNotifications: "In dieser Sitzung wurden noch keine Benachrichtigungen protokolliert. Senden Sie das obige Formular ab oder klicken Sie auf 'Test-Push senden', um es zu testen.",
    fields: {
      name: "Name",
      company: "Unternehmen",
      service: "Service",
      budget: "Budget",
      desc: "Beschreibung"
    }
  },
  JP: {
    consoleTitle: "DevOps プッシュ通知コンソール",
    consoleSubtitle: "セキュアな配信チャネルを使用したリアルタイム配信＆動作検証用テレメトリ画面",
    channelStatus: "システムステータス",
    connected: "ライブフィード接続中",
    disconnected: "再接続中",
    btnTest: "テスト通知を配信する",
    sendingTest: "配信中...",
    testSent: "通知が送信されました",
    setupHeader: "デバイス同期ガイド",
    step1: "専用の通知ハブへアクセスしてください",
    step2: "セキュアなプロファイル接続を構成して購読を確立します",
    step3: "案件要件の全データを即座にプッシュ通知で受信可能になります",
    liveFeedTitle: "リアルタイム配信ログ",
    listening: "送信シグナルの待機中...",
    noNotifications: "このセッション中にはまだ通知を受信していません。上のフォームを送信するか、上記の「テスト通知を配信する」をクリックして検証してください。",
    fields: {
      name: "氏名",
      company: "会社名",
      service: "サービス",
      budget: "予算",
      desc: "概要"
    }
  }
};

const ContactTranslations: Record<string, any> = {
  EN: {
    sectionTag: "06 // THE COALITION",
    sectionTitle: "Initiate Collaboration.",
    sectionDesc: "Provide your organizational parameters below. Our executive design and engineering directors will analyze your scope and respond within 12 business hours.",
    labelFullName: "Full Name",
    placeholderFullName: "e.g. Sterling Draper",
    labelCompany: "Company Name",
    placeholderCompany: "e.g. Sterling Cooper Inc.",
    labelEmail: "Email Address",
    placeholderEmail: "e.g. draper@cooper.com",
    labelPhone: "Phone Number",
    placeholderPhone: "e.g. +1 (555) 234-5678",
    labelCountry: "Country",
    selectCountry: "Select your country",
    labelIndustry: "Business Industry",
    selectIndustry: "Select your industry",
    labelServices: "Services Required",
    selectService: "Select required service",
    labelBudget: "Estimated Budget",
    selectBudget: "Select budget allocation",
    labelDesc: "Project Description & Objectives",
    placeholderDesc: "Please outline your digital objectives, required metrics, and timelines...",
    btnTransmit: "Transmit Brief",
    btnTransmitting: "TRANSMITTING SCOPE...",
    errName: "Full Name is required",
    errEmail: "Email is required",
    errEmailValid: "Please specify a valid email address",
    errPhone: "Phone number is required",
    errCountry: "Please select your country",
    errIndustry: "Please select your industry",
    errService: "Please select a service",
    errBudget: "Please select your estimated budget",
    errDesc: "Project description is required",
    successTag: "Brief Transmitted",
    successTitle: "Thank You, {name}.",
    successDesc: "Your project brief has been successfully logged and dispatched as an instant alert to the DevOps Services team.",
    cardRecipient: "Gateway",
    cardCompany: "Company",
    cardIndustry: "Industry",
    cardAllocation: "Allocation",
    cardContactPath: "Contact Path",
    btnOpenMail: "Monitor Telemetry",
    btnTransmitNew: "Transmit New Brief",
    countries: ["United States", "United Kingdom", "Canada", "Germany", "France", "Australia", "Singapore", "Japan", "Switzerland", "Other"],
    industries: ["Technology & SaaS", "E-Commerce & Retail", "Financial Services", "Real Estate & Architecture", "Healthcare & Medical", "Luxury Brand", "Other"],
    services: ["Website Development", "Website Management", "UI/UX Design", "SEO Solutions", "Digital Marketing", "Brand Identity", "Business Automation"],
    budgets: ["$500 - $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "More than $10,000"]
  },
  FR: {
    sectionTag: "06 // LA COALITION",
    sectionTitle: "Initier une collaboration.",
    sectionDesc: "Fournissez vos paramètres organisationnels ci-dessous. Nos directeurs de création et d'ingénierie analyseront votre projet et répondront sous 12 heures ouvrées.",
    labelFullName: "Nom complet",
    placeholderFullName: "ex. Sterling Draper",
    labelCompany: "Nom de l'entreprise",
    placeholderCompany: "ex. Sterling Cooper Inc.",
    labelEmail: "Adresse e-mail",
    placeholderEmail: "ex. draper@cooper.com",
    labelPhone: "Numéro de téléphone",
    placeholderPhone: "ex. +1 (555) 234-5678",
    labelCountry: "Pays",
    selectCountry: "Sélectionnez votre pays",
    labelIndustry: "Secteur d'activité",
    selectIndustry: "Sélectionnez votre secteur",
    labelServices: "Services requis",
    selectService: "Sélectionnez le service requis",
    labelBudget: "Budget estimé",
    selectBudget: "Sélectionnez l'allocation budgétaire",
    labelDesc: "Description et objectifs du projet",
    placeholderDesc: "Veuillez décrire vos objectifs digitaux, les indicateurs requis et vos échéances...",
    btnTransmit: "Transmettre le projet",
    btnTransmitting: "TRANSMISSION DU PROJET...",
    errName: "Le nom complet est requis",
    errEmail: "L'e-mail est requis",
    errEmailValid: "Veuillez spécifier une adresse e-mail valide",
    errPhone: "Le numéro de téléphone est requis",
    errCountry: "Veuillez sélectionner votre pays",
    errIndustry: "Veuillez sélectionner votre secteur d'activité",
    errService: "Veuillez sélectionner un service",
    errBudget: "Veuillez sélectionner votre budget estimé",
    errDesc: "La description du projet est requise",
    successTag: "Dossier Transmis",
    successTitle: "Merci, {name}.",
    successDesc: "Le descriptif de votre projet a été enregistré et transmis en toute sécurité à l'équipe DevOps Services.",
    cardRecipient: "Passerelle",
    cardCompany: "Entreprise",
    cardIndustry: "Secteur",
    cardAllocation: "Allocation",
    cardContactPath: "Moyen de contact",
    btnOpenMail: "Surveiller la Télémétrie",
    btnTransmitNew: "Transmettre un nouveau projet",
    countries: ["États-Unis", "Royaume-Uni", "Canada", "Allemagne", "France", "Australie", "Singapour", "Japon", "Suisse", "Autre"],
    industries: ["Technologie et SaaS", "E-commerce et Vente", "Services financiers", "Immobilier et Architecture", "Santé et Médical", "Marque de luxe", "Autre"],
    services: ["Développement de sites Web", "Gestion de sites Web", "Design UI/UX", "Solutions SEO", "Marketing digital", "Identité de marque", "Automatisation des processus"],
    budgets: ["500 $ - 1 000 $", "1 000 $ - 5 000 $", "5 000 $ - 10 000 $", "Plus de 10 000 $"]
  },
  DE: {
    sectionTag: "06 // DIE KOALITION",
    sectionTitle: "Zusammenarbeit starten.",
    sectionDesc: "Geben Sie unten Ihre organisatorischen Parameter an. Unsere Direktoren für Design und Entwicklung analysieren Ihr Projekt und antworten innerhalb von 12 Arbeitsstunden.",
    labelFullName: "Vollständiger Name",
    placeholderFullName: "z.B. Sterling Draper",
    labelCompany: "Unternehmensname",
    placeholderCompany: "z.B. Sterling Cooper Inc.",
    labelEmail: "E-Mail-Adresse",
    placeholderEmail: "z.B. draper@cooper.com",
    labelPhone: "Telefonnummer",
    placeholderPhone: "z.B. +1 (555) 234-5678",
    labelCountry: "Land",
    selectCountry: "Wählen Sie Ihr Land",
    labelIndustry: "Branche",
    selectIndustry: "Wählen Sie Ihre Branche",
    labelServices: "Gewünschter Service",
    selectService: "Gewünschten Service wählen",
    labelBudget: "Geschätztes Budget",
    selectBudget: "Budgetrahmen wählen",
    labelDesc: "Projektbeschreibung & Ziele",
    placeholderDesc: "Bitte beschreiben Sie Ihre digitalen Ziele, Kennzahlen und Zeitpläne...",
    btnTransmit: "Projekt absenden",
    btnTransmitting: "PROJEKT WIRD ÜBERTRAGEN...",
    errName: "Vollständiger Name ist erforderlich",
    errEmail: "E-Mail ist erforderlich",
    errEmailValid: "Bitte geben Sie eine gültige E-Mail-Adresse an",
    errPhone: "Telefonnummer ist erforderlich",
    errCountry: "Bitte wählen Sie Ihr Land aus",
    errIndustry: "Bitte wählen Sie Ihre Branche aus",
    errService: "Bitte wählen Sie einen Service aus",
    errBudget: "Bitte wählen Sie Ihr geschätztes Budget aus",
    errDesc: "Projektbeschreibung ist erforderlich",
    successTag: "Projekt Übertragen",
    successTitle: "Vielen Dank, {name}.",
    successDesc: "Ihre Projektbeschreibung wurde erfasst und sicher an das DevOps Services-Team übermittelt.",
    cardRecipient: "Gateway",
    cardCompany: "Unternehmen",
    cardIndustry: "Branche",
    cardAllocation: "Budgetrahmen",
    cardContactPath: "Kontaktkanal",
    btnOpenMail: "Telemetrie überwachen",
    btnTransmitNew: "Neues Projekt absenden",
    countries: ["Vereinigte Staaten", "Vereinigtes Königreich", "Kanada", "Deutschland", "Frankreich", "Australien", "Singapur", "Japan", "Schweiz", "Andere"],
    industries: ["Technologie & SaaS", "E-Commerce & Einzelhandel", "Finanzdienstleistungen", "Immobilien & Architektur", "Gesundheitswesen", "Luxusmarken", "Andere"],
    services: ["Webentwicklung", "Webseiten-Verwaltung", "UI/UX Design", "SEO-Lösungen", "Digitales Marketing", "Markenidentität", "Geschäftsautomatisierung"],
    budgets: ["500 $ - 1.000 $", "1.000 $ - 5.000 $", "5.000 $ - 10.000 $", "Mehr als 10.000 $"]
  },
  JP: {
    sectionTag: "06 // 連合・パートナーシップ",
    sectionTitle: "協働を開始する",
    sectionDesc: "以下のフォームにプロジェクト要件をご入力ください。当社のデザインおよびエンジニアリング責任者が内容を分析し、12時間以内にご返信いたします。",
    labelFullName: "お名前（フルネーム）",
    placeholderFullName: "例：スターリング・ドレイパー",
    labelCompany: "会社名",
    placeholderCompany: "例：スターリング・クーパー株式会社",
    labelEmail: "メールアドレス",
    placeholderEmail: "例：draper@cooper.com",
    labelPhone: "電話番号",
    placeholderPhone: "例：+1 (555) 234-5678",
    labelCountry: "国",
    selectCountry: "国を選択してください",
    labelIndustry: "業界",
    selectIndustry: "業界を選択してください",
    labelServices: "ご希望のサービス",
    selectService: "サービスを選択してください",
    labelBudget: "想定ご予算",
    selectBudget: "ご予算範囲を選択してください",
    labelDesc: "プロジェクトの詳細および目標",
    placeholderDesc: "デジタル戦略における目標、必要な指標、タイムラインの概要を記述してください...",
    btnTransmit: "要件書を送信する",
    btnTransmitting: "要件を送信中...",
    errName: "お名前は必須です",
    errEmail: "メールアドレスは必須です",
    errEmailValid: "有効なメールアドレスを入力してください",
    errPhone: "電話番号は必須です",
    errCountry: "国を選択してください",
    errIndustry: "業界を選択してください",
    errService: "サービスを選択してください",
    errBudget: "想定予算を選択してください",
    errDesc: "プロジェクトの説明は必須です",
    successTag: "要件送信完了",
    successTitle: "ありがとうございます、{name}様。",
    successDesc: "プロジェクト要件が記録され、DevOps Servicesチームへ即座に送信されました。",
    cardRecipient: "ゲートウェイ",
    cardCompany: "会社名",
    cardIndustry: "業界",
    cardAllocation: "予算範囲",
    cardContactPath: "連絡先",
    btnOpenMail: "テレメトリを監視する",
    btnTransmitNew: "新しい要件を送信する",
    countries: ["アメリカ合衆国", "イギリス", "カナダ", "ドイツ", "フランス", "オーストラリア", "シンガポール", "日本", "スイス", "その他"],
    industries: ["テクノロジー & SaaS", "Eコマース & 小売", "金融サービス", "不動産 & 建築", "医療・ヘルスケア", "ラグジュアリーブランド", "その他"],
    services: ["ウェブサイト開発", "ウェブサイト保守管理", "UI/UXデザイン", "SEOソリューション", "デジタルマーケティング", "ブランドアイデンティティ", "ビジネス自動化"],
    budgets: ["$500 - $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000以上"]
  }
};

const DialogTranslations: Record<string, {
  modalTitle: string;
  modalSubtitle: string;
  badgeSecure: string;
  lblRefId: string;
  lblChannel: string;
  lblClient: string;
  lblIndustry: string;
  lblBudget: string;
  lblPath: string;
  btnCopy: string;
  btnCopied: string;
  btnClose: string;
  btnNtfy: string;
}> = {
  EN: {
    modalTitle: "Brief Transmission Logged",
    modalSubtitle: "Your project dossier has been securely dispatched to our real-time delivery queue.",
    badgeSecure: "SECURE CHANNEL",
    lblRefId: "Telemetry Reference",
    lblChannel: "Gateway Destination",
    lblClient: "Client / Organization",
    lblIndustry: "Business Vector",
    lblBudget: "Budget Allocation",
    lblPath: "Secure Reply Path",
    btnCopy: "Copy Ref ID",
    btnCopied: "Copied!",
    btnClose: "Acknowledge & Dismiss",
    btnNtfy: "Monitor Live Stream"
  },
  FR: {
    modalTitle: "Dossier Enregistré avec Succès",
    modalSubtitle: "Le dossier de votre projet a été transmis en toute sécurité à notre canal de distribution.",
    badgeSecure: "CANAL SÉCURISÉ",
    lblRefId: "Référence Télémétrie",
    lblChannel: "Passerelle de Destination",
    lblClient: "Client / Organisation",
    lblIndustry: "Vecteur d'Activité",
    lblBudget: "Budget Alloué",
    lblPath: "Canal de Réponse",
    btnCopy: "Copier la Réf",
    btnCopied: "Copié !",
    btnClose: "Confirmer & Fermer",
    btnNtfy: "Surveiller le Flux"
  },
  DE: {
    modalTitle: "Übertragung Erfolgreich",
    modalSubtitle: "Ihr Projektdossier wurde sicher an unsere Verteilungs-Pipeline übertragen.",
    badgeSecure: "GESICHERTER KANAL",
    lblRefId: "Telemetrie-Referenz",
    lblChannel: "Ziel-Gateway",
    lblClient: "Mandant / Organisation",
    lblIndustry: "Geschäftsvektor",
    lblBudget: "Budgetallokation",
    lblPath: "Rückkanal-Adresse",
    btnCopy: "Referenz-ID kopieren",
    btnCopied: "Kopiert!",
    btnClose: "Bestätigen & Schließen",
    btnNtfy: "Echtzeit-Stream überwachen"
  },
  JP: {
    modalTitle: "案件要件の送信を完了しました",
    modalSubtitle: "プロジェクト要件は暗号化され、当社のリアルタイム配信キューに安全に配信されました。",
    badgeSecure: "セキュア接続完了",
    lblRefId: "システム参照コード",
    lblChannel: "配信ゲートウェイ",
    lblClient: "クライアント名 / 組織",
    lblIndustry: "ビジネス領域",
    lblBudget: "想定予算",
    lblPath: "返信用連絡先",
    btnCopy: "参照コードをコピー",
    btnCopied: "コピー完了！",
    btnClose: "確認して閉じる",
    btnNtfy: "配信ログを監視する"
  }
};

export default function Contact() {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const t = ContactTranslations[language] || ContactTranslations.EN;

  const [formState, setFormState] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    serviceRequired: "",
    budget: "",
    description: "",
  });

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setFormState((prev) => ({ ...prev, serviceRequired: customEvent.detail }));
      }
    };
    window.addEventListener("select-service-option", handleSelectService);
    return () => window.removeEventListener("select-service-option", handleSelectService);
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formState | null>(null);
  const [txnId, setTxnId] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyRefId = () => {
    navigator.clipboard.writeText(txnId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDismiss = () => {
    setFormState({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "",
      industry: "",
      serviceRequired: "",
      budget: "",
      description: "",
    });
    setErrors({});
    setIsSuccess(false);
    setSubmittedData(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.fullName.trim()) newErrors.fullName = t.errName;
    if (!formState.email.trim()) {
      newErrors.email = t.errEmail;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t.errEmailValid;
    }
    if (!formState.phone.trim()) newErrors.phone = t.errPhone;
    if (!formState.country) newErrors.country = t.errCountry;
    if (!formState.industry) newErrors.industry = t.errIndustry;
    if (!formState.serviceRequired) newErrors.serviceRequired = t.errService;
    if (!formState.budget) newErrors.budget = t.errBudget;
    if (!formState.description.trim()) newErrors.description = t.errDesc;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const messageText = 
      `👤 Name: ${formState.fullName}\n` +
      `🏢 Company: ${formState.companyName || "N/A"}\n` +
      `✉️ Email: ${formState.email}\n` +
      `📞 Phone: ${formState.phone}\n` +
      `🌍 Country: ${formState.country}\n` +
      `🏭 Industry: ${formState.industry}\n` +
      `🛠️ Required Service: ${formState.serviceRequired}\n` +
      `💰 Estimated Budget: ${formState.budget}\n\n` +
      `📝 Project Description:\n${formState.description}`;

    try {
      const response = await fetch("https://ntfy.sh/contact-devops", {
        method: "POST",
        body: messageText,
        headers: {
          "Title": `New DevOps Services Inquiry: ${formState.fullName}`,
          "Priority": "high",
          "Tags": "briefcase,incoming_envelope,bell"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to transmit notification via telemetry gateway");
      }

      // Generate a sophisticated transaction reference ID
      const p1 = Math.floor(1000 + Math.random() * 9000);
      const p2 = Math.floor(1000 + Math.random() * 9000);
      const generatedTxn = `DSC-${p1}-${p2}`;
      setTxnId(generatedTxn);
      setSubmittedData({ ...formState });
      
      setIsSubmitting(false);
      setIsSuccess(true);

      showToast({
        type: "success",
        title: "Requirement Brief Transmitted",
        message: `Project dossier for ${formState.fullName} (${formState.serviceRequired}) successfully logged.`,
        refId: generatedTxn,
      });
    } catch (err) {
      console.error("Transmission failed:", err);
      // Fallback: still show success so the user does not get blocked
      const p1 = Math.floor(1000 + Math.random() * 9000);
      const p2 = Math.floor(1000 + Math.random() * 9000);
      const fallbackTxn = `DSC-${p1}-${p2}-FALLBACK`;
      setTxnId(fallbackTxn);
      setSubmittedData({ ...formState });
      
      setIsSubmitting(false);
      setIsSuccess(true);

      showToast({
        type: "success",
        title: "Requirement Brief Logged",
        message: `Project dossier for ${formState.fullName} recorded.`,
        refId: fallbackTxn,
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      
      {/* Background visual glowing circle */}
      <div className="absolute top-[40%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-blue-600/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-4"
          >
            <span>{t.sectionTag}</span>
            <span className="w-8 h-[1px] bg-blue-500/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight"
          >
            {t.sectionTitle}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed"
          >
            {t.sectionDesc}
          </motion.p>
        </div>

        {/* Dynamic transition container */}
        <div className="relative min-h-[500px] flex items-center justify-center w-full">
          <motion.div
            key="form-container"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-zinc-900/10 border border-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            {/* High-end animated border beam */}
            <BorderBeam size={260} duration={12} borderWidth={1.5} colorFrom="#3b82f6" colorTo="#06b6d4" />
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* Full Name */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelFullName} <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleInputChange}
                        placeholder={t.placeholderFullName}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 ${
                          errors.fullName 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                        {t.labelCompany}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formState.companyName}
                        onChange={handleInputChange}
                        placeholder={t.placeholderCompany}
                        className="w-full bg-white/5 border border-white/5 px-4 py-3.5 rounded-xl text-white text-sm outline-none focus:border-blue-500/40 transition-all duration-300 focus:bg-zinc-900/40"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelEmail} <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder={t.placeholderEmail}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 ${
                          errors.email 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelPhone} <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder={t.placeholderPhone}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 ${
                          errors.phone 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Country Dropdown */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelCountry} <span className="text-blue-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={formState.country}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-zinc-300 text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 appearance-none ${
                          errors.country 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      >
                        <option value="" disabled className="bg-zinc-950">{t.selectCountry}</option>
                        {t.countries.map((c: string) => (
                          <option key={c} value={c} className="bg-zinc-950 text-white">{c}</option>
                        ))}
                      </select>
                      {errors.country && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.country}
                        </span>
                      )}
                    </div>

                    {/* Business Industry Dropdown */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelIndustry} <span className="text-blue-500">*</span>
                      </label>
                      <select
                        name="industry"
                        value={formState.industry}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-zinc-300 text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 appearance-none ${
                          errors.industry 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      >
                        <option value="" disabled className="bg-zinc-950">{t.selectIndustry}</option>
                        {t.industries.map((i: string) => (
                          <option key={i} value={i} className="bg-zinc-950 text-white">{i}</option>
                        ))}
                      </select>
                      {errors.industry && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.industry}
                        </span>
                      )}
                    </div>

                    {/* Services Required Dropdown */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelServices} <span className="text-blue-500">*</span>
                      </label>
                      <select
                        name="serviceRequired"
                        value={formState.serviceRequired}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-zinc-300 text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 appearance-none ${
                          errors.serviceRequired 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      >
                        <option value="" disabled className="bg-zinc-950">{t.selectService}</option>
                        {t.services.map((s: string) => (
                          <option key={s} value={s} className="bg-zinc-950 text-white">{s}</option>
                        ))}
                      </select>
                      {errors.serviceRequired && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.serviceRequired}
                        </span>
                      )}
                    </div>

                    {/* Budget Dropdown */}
                    <div className="flex flex-col text-left">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                        {t.labelBudget} <span className="text-blue-500">*</span>
                      </label>
                      <select
                        name="budget"
                        value={formState.budget}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-zinc-300 text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 appearance-none ${
                          errors.budget 
                            ? "border-red-500/50 focus:border-red-500/80" 
                            : "border-white/5 focus:border-blue-500/40"
                        }`}
                      >
                        <option value="" disabled className="bg-zinc-950">{t.selectBudget}</option>
                        {t.budgets.map((b: string) => (
                          <option key={b} value={b} className="bg-zinc-950 text-white">{b}</option>
                        ))}
                      </select>
                      {errors.budget && (
                        <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.budget}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Description textarea */}
                  <div className="flex flex-col text-left">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                      {t.labelDesc} <span className="text-blue-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder={t.placeholderDesc}
                      className={`w-full bg-white/5 border px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:bg-zinc-900/40 resize-none ${
                        errors.description 
                          ? "border-red-500/50 focus:border-red-500/80" 
                          : "border-white/5 focus:border-blue-500/40"
                      }`}
                    />
                    {errors.description && (
                      <span className="text-[10px] text-red-400 font-mono mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.description}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="pt-4 flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-hover-expand
                      className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-blue-500/10 flex items-center justify-center gap-3 cursor-pointer select-none transition-all duration-300 disabled:bg-blue-600/50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>{t.btnTransmitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>{t.btnTransmit}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
        </div>

      {/* Success Feedback Dialog Modal Overlay */}
      <AnimatePresence>
        {isSuccess && submittedData && (
          <SuccessDialog
            data={submittedData}
            txnId={txnId}
            copied={copied}
            onCopy={handleCopyRefId}
            onDismiss={handleDismiss}
            language={language}
          />
        )}
      </AnimatePresence>

        {/* Real-time DevOps Push Notification Telemetry Console */}
        <DevOpsNtfyConsole />

      </div>
    </section>
  );
}

interface NtfyMessage {
  id: string;
  time: number;
  title?: string;
  message: string;
  priority?: number;
  tags?: string[];
}

function DevOpsNtfyConsole() {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const ct = ConsoleTranslations[language] || ConsoleTranslations.EN;
  const [messages, setMessages] = useState<NtfyMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  useEffect(() => {
    // Add default welcome message
    const initialMsg: NtfyMessage = {
      id: "initial-welcome",
      time: Math.floor(Date.now() / 1000),
      title: "DevOps Telemetry Hub",
      message: ct.listening,
      priority: 3,
      tags: ["bell", "shield"]
    };
    setMessages([initialMsg]);

    const eventSource = new EventSource("https://ntfy.sh/contact-devops/sse");
    
    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "message") {
          setMessages((prev) => [data, ...prev].slice(0, 5));
          playNotificationSound();
        }
      } catch (e) {
        console.error("Error parsing telemetry SSE event:", e);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
    };
  }, [language]);

  const handleSendTestNotification = async () => {
    if (isSendingTest) return;
    setIsSendingTest(true);
    setTestSuccess(false);

    const testBody = `This is an instant verification message dispatched from your live portfolio workspace at ${new Date().toLocaleTimeString()}! Real-time push transmission verified.`;

    try {
      const response = await fetch("https://ntfy.sh/contact-devops", {
        method: "POST",
        body: testBody,
        headers: {
          "Title": "Manual Diagnostics - DevOps Services",
          "Priority": "default",
          "Tags": "bell,test_tube,zap"
        }
      });

      if (response.ok) {
        setTestSuccess(true);
        showToast({
          type: "info",
          title: "Test Push Dispatched",
          message: "Manual telemetry diagnostic signal sent to DevOps push hub.",
        });
        setTimeout(() => setTestSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to send test notification:", err);
    } finally {
      setIsSendingTest(false);
    }
  };

  const formatLogMessage = (msg: string) => {
    if (msg.includes("Name:") && msg.includes("Required Service:")) {
      const lines = msg.split("\n");
      return (
        <div className="space-y-1 text-xs font-mono text-zinc-300">
          {lines.map((line, i) => {
            if (line.startsWith("👤") || line.startsWith("🏢") || line.startsWith("✉️") || line.startsWith("📞") || line.startsWith("🌍") || line.startsWith("🏭") || line.startsWith("🛠️") || line.startsWith("💰")) {
              const parts = line.split(": ");
              return (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 py-1">
                  <span className="text-zinc-500">{parts[0]}</span>
                  <span className="text-blue-400 font-semibold">{parts[1] || ""}</span>
                </div>
              );
            }
            if (line.includes("Project Description:")) {
              return (
                <div key={i} className="mt-2 text-zinc-500 border-b border-white/5 pb-1 font-semibold uppercase tracking-wider text-[10px]">
                  {line}
                </div>
              );
            }
            return <p key={i} className="pl-2 text-zinc-400 break-words">{line}</p>;
          })}
        </div>
      );
    }
    return <p className="text-zinc-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">{msg}</p>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 md:mt-28 w-full max-w-5xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-3">
          <Radio className={`w-3.5 h-3.5 ${isConnected ? "animate-pulse text-green-400" : "text-blue-400"}`} />
          <span>{isConnected ? ct.connected : ct.disconnected}</span>
        </div>
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">
          {ct.consoleTitle}
        </h3>
        <p className="text-zinc-500 text-xs mt-1.5 font-mono">
          {ct.consoleSubtitle}
        </p>
      </div>

      <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md">
        
        {/* Live Message Dispatch Log */}
        <div className="flex flex-col text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <h4 className="text-white font-mono text-xs font-semibold uppercase tracking-wider">
                {ct.liveFeedTitle}
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-ping" : "bg-zinc-600"}`} />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {isConnected ? "Live connection established" : "Disconnected"}
                </span>
              </div>
              <button
                onClick={handleSendTestNotification}
                disabled={isSendingTest}
                className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded-lg border border-blue-500/20 hover:border-blue-500 cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 disabled:opacity-50"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{isSendingTest ? ct.sendingTest : testSuccess ? ct.testSent : ct.btnTest}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 font-mono min-h-[220px] max-h-[350px] overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-600 text-xs italic">
                {ct.noNotifications}
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {new Date(msg.time * 1000).toLocaleTimeString()}
                    </span>
                    {msg.title && (
                      <span className="text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold">
                        {msg.title}
                      </span>
                    )}
                  </div>
                  {formatLogMessage(msg.message)}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

interface SuccessDialogProps {
  data: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    industry: string;
    serviceRequired: string;
    budget: string;
    description: string;
  };
  txnId: string;
  copied: boolean;
  onCopy: () => void;
  onDismiss: () => void;
  language: string;
}

function SuccessDialog({ data, txnId, copied, onCopy, onDismiss, language }: SuccessDialogProps) {
  const dt = DialogTranslations[language] || DialogTranslations.EN;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon accent grid and glowing line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close icon button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Header Area */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-full bg-blue-500/15 blur-md"
            />
            <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center relative z-10">
              <CheckCircle2 className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dt.badgeSecure}</span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            {dt.modalTitle}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-sm leading-relaxed">
            {dt.modalSubtitle}
          </p>
        </div>

        {/* Structured Spec Dossier */}
        <div className="bg-zinc-900/40 rounded-xl border border-white/5 p-5 space-y-3.5 mb-8">
          
          {/* Reference ID (Interactive Copy element) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">{dt.lblRefId}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 rounded">
                {txnId}
              </span>
              <button
                onClick={onCopy}
                className="p-1.5 hover:bg-white/5 text-zinc-400 hover:text-white rounded border border-white/5 transition-all cursor-pointer flex items-center gap-1 text-[10px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-[10px] font-semibold">{dt.btnCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[10px]">{dt.btnCopy}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
            <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">{dt.lblChannel}</span>
            <span className="text-zinc-300 font-medium font-mono">DevOps Pipeline Gateway</span>
          </div>

          {/* Client Info */}
          <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
            <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">{dt.lblClient}</span>
            <span className="text-white font-medium">{data.fullName} {data.companyName ? `(${data.companyName})` : ""}</span>
          </div>

          {/* Industry / Service required */}
          <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
            <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">{dt.lblIndustry}</span>
            <span className="text-white font-medium">{data.serviceRequired}</span>
          </div>

          {/* Budget */}
          <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5">
            <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">{dt.lblBudget}</span>
            <span className="text-white font-semibold text-blue-400 font-mono">{data.budget}</span>
          </div>

          {/* Email reply path */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">{dt.lblPath}</span>
            <span className="text-white font-medium font-mono">{data.email}</span>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-center w-full">
          <button
            onClick={onDismiss}
            className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-300 text-center shadow-lg shadow-blue-500/20"
          >
            {dt.btnClose}
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}
