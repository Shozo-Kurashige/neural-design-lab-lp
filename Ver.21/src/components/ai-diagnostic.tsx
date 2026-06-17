import { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  ArrowRight,
  Download,
  CheckCircle2,
  X,
  Undo2,
} from "lucide-react";

type ChatMessage = {
  role: "ai" | "user";
  text: string;
};

// 1. 質問リスト（全10問）
const questions = [
  "Q1. 現場のホンネや困りごとが、経営層・管理職に正しく届いていないと感じることがありますか？",
  "Q2. 「あの人がいないと業務が回らない」という、属人化・ブラックボックス化した業務がありますか？",
  "Q3. ITツールやシステムを導入したものの、現場で使われず形骸化しているものがありますか？",
  "Q4. 経営層のビジョンと現場のKPIの間に、ズレや温度差を感じることがありますか？",
  "Q5. 業務マニュアルが存在しない、または最後に更新した時期が不明なものがありますか？",
  "Q6. 優秀な若手・中堅社員が、理由が不明確なまま突然退職することがありますか？",
  "Q7. 会議が長時間化しているにもかかわらず、何も決まらないまま終わることがよくありますか？",
  "Q8. 部門間の連携がうまくいかず、セクショナリズムの壁を感じることがありますか？",
  "Q9. 現場のリーダーや中間管理職が、部下のマネジメントよりも自分の作業に追われている状況がありますか？",
  "Q10. AIやDXという言葉に対して、現場から「仕事を奪われる」「面倒なことが増える」という声が上がることがありますか？",
];

const mainOptions = [
  { label: "とても当てはまる", score: 4 },
  { label: "当てはまる", score: 3 },
  { label: "やや当てはまる", score: 2 },
  { label: "あまり当てはまらない", score: 1 },
  { label: "まったく当てはまらない", score: 0 },
];

const actionOptions = [
  { label: "はい（すでに対策を打っている）", value: "yes" },
  { label: "いいえ（まだ何もできていない）", value: "no" },
];

// ▼ ボトルネック特定ロジック
const getBottleneck = (scores: number[]) => {
  // 各カテゴリの平均値を計算
  const A_avg = (scores[0] + scores[3] + scores[6]) / 3;
  const B_avg = (scores[1] + scores[4]) / 2;
  const C_avg = (scores[5] + scores[7] + scores[8]) / 3;
  const D_avg = (scores[2] + scores[9]) / 2;

  const categories = [
    { type: "A", name: "組織風土・コミュニケーション不全", avg: A_avg },
    { type: "B", name: "業務プロセス・属人化の限界", avg: B_avg },
    { type: "C", name: "マネジメント・人材崩壊リスク", avg: C_avg },
    { type: "D", name: "IT/DXアレルギー・形骸化", avg: D_avg },
  ];

  // 平均値が高い順にソートして一番重症なものを返す
  categories.sort((a, b) => b.avg - a.avg);
  return categories[0];
};

type AiDiagnosticProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AiDiagnostic({ isOpen, onClose }: AiDiagnosticProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "ai",
      text:
        "こんにちは！NDLのAIアシスタントです。あなたの組織の『隠れた課題』を診断します。\n設問は10問、所要時間は約90秒です。まずは最初の質問です。\n\n" +
        questions[0],
    },
  ]);
  const [scoreHistory, setScoreHistory] = useState<number[]>([]);
  const [isFullyFinished, setIsFullyFinished] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // ▼ 最終生成されるレポートテキストを保持するState
  const [reportContent, setReportContent] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
    return () => clearTimeout(timer);
  }, [chatHistory, isOpen]);

  const handleMainAnswer = (score: number, label: string) => {
    if (isTyping) return;
    setIsTyping(true);

    setChatHistory((prev) => [...prev, { role: "user", text: label }]);
    const newScoreHistory = [...scoreHistory, score];
    setScoreHistory(newScoreHistory);
    const currentTotalScore = newScoreHistory.reduce((a, b) => a + b, 0);

    const nextStep = currentStep + 1;

    setTimeout(() => {
      if (nextStep < questions.length) {
        setCurrentStep(nextStep);
        setChatHistory((prev) => [
          ...prev,
          {
            role: "ai",
            text: "なるほど、承知しました。\n\n" + questions[nextStep],
          },
        ]);
      } else {
        setCurrentStep(10);
        let dangerLevel = "";
        let zoneSummary = "";

        if (currentTotalScore >= 30) {
          dangerLevel = "🔴 危険度：高（レッドゾーン）";
          zoneSummary =
            "現場と経営の分断が深刻な状態です。組織が機能不全を起こし始めているサインが出ています。";
        } else if (currentTotalScore >= 16) {
          dangerLevel = "🟡 危険度：中（イエローゾーン）";
          zoneSummary =
            "組織の成長痛を抱えています。属人化や連携不足など、未病の段階の課題が散見されます。";
        } else {
          dangerLevel = "🟢 危険度：低（グリーンゾーン）";
          zoneSummary =
            "非常に健全な組織状態です。現場の風通しも良く、マネジメントが機能しています。";
        }

        setChatHistory((prev) => [
          ...prev,
          {
            role: "ai",
            text: `基本診断が完了しました！（スコア: ${currentTotalScore}/40）\n\n【現在地】\n${dangerLevel}\n${zoneSummary}\n\n最後にもう1つだけ教えてください。\nこれらの課題に対して、すでに何らかのアクション（対策）をとっていますか？`,
          },
        ]);
      }
      setIsTyping(false);
    }, 600);
  };

  const handleActionAnswer = (value: string, label: string) => {
    if (isTyping) return;
    setIsTyping(true);

    setChatHistory((prev) => [...prev, { role: "user", text: label }]);
    const finalTotalScore = scoreHistory.reduce((a, b) => a + b, 0);
    const bottleneck = getBottleneck(scoreHistory);

    setTimeout(() => {
      let finalPrescription = "";
      let reportIntro = "";

      // ▼ 1. 総評の生成
      if (finalTotalScore >= 30) {
        if (value === "yes") {
          finalPrescription =
            "【最終処方箋】\n対策が現場の実態とズレている可能性があります。ツールより先に、現場との「合意形成」をやり直すことが急務です。";
          reportIntro =
            "危機感を持ってすでに対策を打たれている姿勢は素晴らしいです。しかし、スコアが示す通り、その対策は現場の実態と「ズレている」可能性があります。ツールの見直しや制度変更の前に、まずは経営と現場の認識のズレを埋める「合意形成」をやり直すことが急がれます。";
        } else {
          finalPrescription =
            "【最終処方箋】\n業務のブラックボックス化が深刻になる前段、今がテコ入れのタイミングです。いきなり大きなDXではなく、身近だけど面倒な課題から着手しましょう。";
          reportIntro =
            "組織が機能不全を起こし始めている兆候が見られます。まずは課題の洗い出しを行いましょう。いきなり大きなDXや組織改革を狙うのではなく、一番課題のある現場のペイン（痛み）から手を打つタイミングです。「社内の声に、耳を傾けてください」";
        }
      } else if (finalTotalScore >= 16) {
        if (value === "yes") {
          finalPrescription =
            "【最終処方箋】\n変化の過渡期です。トップダウンだけではなく、現場が腹落ちする形での改善が必要なタイミングです。課題の合意形成を図りましょう。";
          reportIntro =
            "組織の「成長痛」に対し、すでに打たれている対策が少しずつ効いている、あるいは変化の過渡期です。この壁を越えるためには、現場の自発性（ボトムアップ）を引き出す、インセンティブなどの仕組みを作るタイミングです。「ヤル気を引き出す仕組みを作ってください」";
        } else {
          finalPrescription =
            "【最終処方箋】\n今が改善アクションのベストタイミングです。放置すれば危険なゾーンへ入りかねません。現状の業務フローを否定せず、半歩先の改善から着手しましょう。";
          reportIntro =
            "多くの企業が陥る「未病」の状態ですが、放置は危険です。今がアクションを起こすベストタイミングです。今の業務フローを全否定するのではなく、現場が無理なく続けられる「半歩先の改善」から早急に着手してください。「付箋だらけのマニュアルを認めるところから」";
        }
      } else {
        if (value === "yes") {
          finalPrescription =
            "【最終処方箋】\n現在のアクションが正しく機能しています。次は攻めのAI活用や、自社ノウハウの外部展開を検討するフェーズです。";
          reportIntro =
            "非常に素晴らしいマネジメント状態です！現在のアクションが組織の隅々まで正しく機能しています。現状のマイナスをゼロにするフェーズはすでに抜け出しています。次はAIを活用した「攻めのDX」や、自社ノウハウの外部展開など、新しいステージへの投資をご検討ください。「新たな投資に踏み出しましょう」";
        } else {
          finalPrescription =
            "【最終処方箋】\n組織の地力が高い証拠です。見えにくい属人化リスクだけ確認しつつ、次の成長ステージへ進みましょう。";
          reportIntro =
            "特別な対策なしにこの状態を維持できているのは、組織の地力と現場の風通しが極めて高い証拠です。隠れた属人化リスクが潜んでいないかだけを定期的に確認しつつ、自信を持って次の成長戦略へと進んでください。「強（つよさ）に靭（しなやかさ）を」";
        }
      }

      // ▼ 2. カテゴリ別の具体的三手の生成
      let actionSteps = "";
      if (bottleneck.type === "A") {
        actionSteps = `貴社の最大の課題は「現場と経営の分断（コミュニケーション不全）」です。
・一手目：経営層や幹部が、現場の会議に「発言権なしのオブザーバー」として参加し、リアルな空気だけを持ち帰る。
・二手目：直属の上司を通さない、完全匿名の「目安箱（デジタルアンケート等）」を設置し、ガス抜きの回路を作る。
・三手目：定例会議の目的を「報告」から「相談・決裁」のみに限定し、アジェンダのない会議は勇気を持って廃止する。`;
      } else if (bottleneck.type === "B") {
        actionSteps = `貴社の最大の課題は「業務のブラックボックス化（属人化の限界）」です。
・一手目：その業務の担当者が「明日から1週間休んだら、どこが止まるか」を洗い出し、リスクの大きさを可視化する。
・二手目：綺麗なマニュアルを作ろうとせず、まずは担当者が作業しているPC画面を「動画で録画するだけ」の運用を始める。
・三手目：部署内で「やらないこと（廃止しても影響が少ない慣習）」を月に1つ決める決議を行う。`;
      } else if (bottleneck.type === "C") {
        actionSteps = `貴社の最大の課題は「マネジメント不全と人材流出リスク」です。
・一手目：プレイングマネージャー化している中間管理職の「プレイヤーとしての業務量」を強制的に2割削減する。
・二手目：1on1ミーティングを「進捗報告の場」ではなく、本人のキャリアや悩みを聴く「雑談と壁打ちの場」に再定義する。
・三手目：退職の本当の理由を探るため、直属の上司ではなく、斜め上の関係者（他部署のマネージャー等）がヒアリングを行う。`;
      } else {
        actionSteps = `貴社の最大の課題は「IT/DXアレルギーとツールの形骸化」です。
・一手目：「他社がやっているから」という理由でのツール導入を止め、現場が一番「面倒くさい」と思っているアナログ作業を1つだけ特定する。
・二手目：現場の中で比較的ITに抵抗がない「キーマン」を1名見つけ、その人だけを先行して楽にさせる小さな成功体験（スモールウィン）を作る。
・三手目：新しいシステムを入れる際は、マニュアルを渡すだけでなく「なぜこれが必要か」の背景（Why）の説明に導入の大半の時間を使う。`;
      }

      // ▼ 3. レポート全文の組み立て（ノーセールス宣言含む）
      const fullReport = `=========================================
【Neural Design Lab】AI組織診断レポート
=========================================

■ 総合スコア: ${finalTotalScore} / 40 点

■ 総合総評
${reportIntro}

-----------------------------------------
■ 優先してメスを入れるべき最大のボトルネック
【 ${bottleneck.name} 】

${actionSteps}

-----------------------------------------
■ NDLからの大切なお約束（ノーセールス宣言）
最後までお読みいただき、ありがとうございます。
Neural Design Labは、本レポートをダウンロードいただいた貴社に対し、電話やメールでの営業（追客）を【一切行いません】。そもそも情報を収集していませんので、できるはずもありません。

私たちは「言葉ではなく、実物と技術で証明する」ことを信条とするコンサルティングファームです。このレポートの内容が少しでも貴社の課題解決につながり、「本気で現状を変えたい」「伴走してほしい」と感じていただけたその時にだけ、ぜひ私たちの扉を叩いてください。
いつでも、現場の横に立つ準備はできています。
=========================================`;

      setReportContent(fullReport);

      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text: `${finalPrescription}\n\n診断レポートの作成が完了しました。下部のボタンよりダウンロードいただけます。`,
        },
      ]);
      setIsFullyFinished(true);
      setIsTyping(false);
    }, 600);
  };

  const handleBack = () => {
    // セイの鋭い指摘がありましたが、10問目（アクション質問）を見ている時に戻る場合は
    // Q10の回答スコアを消去しなければならないため、`currentStep <= 10` が正解となります。
    if (isTyping || currentStep === 0) return;

    setChatHistory((prev) => prev.slice(0, -2));

    if (currentStep <= 10) {
      setScoreHistory((prev) => prev.slice(0, -1));
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ▼ ブラウザ上でテキストファイルを動的生成してダウンロードさせつつ、カウントする処理
  const handleDownloadReport = async () => {
    // ① テキストファイルのダウンロード処理
    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NDL_組織診断レポート.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // ② Firebase（Firestore）へのダウンロード数カウント処理
    if (isFirebaseConfigured && db) {
      try {
        const counterRef = doc(db, "stats", "downloads");
        const docSnap = await getDoc(counterRef);

        if (docSnap.exists()) {
          await updateDoc(counterRef, {
            count: increment(1)
          });
        } else {
          await setDoc(counterRef, {
            count: 1
          });
        }
        console.log("ダウンロード数をカウントしました！");
      } catch (error) {
        console.error("カウントエラー:", error);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6"
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] max-h-[800px]"
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Bot className="text-[#2C3E30]" size={20} />
                <span className="font-bold text-[#2C3E30] text-sm md:text-base font-['Noto_Serif_JP']">
                  AI簡易経営・組織診断
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* チャットUIエリア */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-[#F8F9FA]">
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-[#2C3E30] text-white" : "bg-[#D4AF37] text-white"}`}
                    >
                      {msg.role === "ai" ? (
                        <Bot size={16} />
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                    <div
                      className={`p-3 md:p-4 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
                        msg.role === "ai"
                          ? "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
                          : "bg-[#2C3E30] text-white rounded-tr-sm shadow-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* 回答ボタンエリア */}
            {!isFullyFinished && (
              <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-3">
                {currentStep < 10 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {mainOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleMainAnswer(opt.score, opt.label)}
                        disabled={isTyping}
                        className={`py-2.5 md:py-3 px-3 md:px-4 rounded-xl border border-gray-200 text-xs md:text-sm font-bold text-gray-700 transition-all duration-200 flex justify-between items-center group ${isTyping ? "opacity-50 cursor-not-allowed" : "hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]"}`}
                      >
                        {opt.label}
                        <ArrowRight
                          size={14}
                          className={`transition-colors ${isTyping ? "text-gray-300" : "text-gray-400 group-hover:text-[#D4AF37]"}`}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {actionOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionAnswer(opt.value, opt.label)}
                        disabled={isTyping}
                        className={`py-3 px-4 rounded-xl border-2 border-[#2C3E30] text-sm font-bold transition-all duration-300 flex justify-between items-center group ${isTyping ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-300" : "text-[#2C3E30] hover:bg-[#2C3E30] hover:text-white"}`}
                      >
                        {opt.label}
                        <ArrowRight
                          size={16}
                          className={`transition-colors ${isTyping ? "text-gray-300" : "text-[#2C3E30] group-hover:text-white"}`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {currentStep > 0 && (
                  <div className="flex justify-center mt-1">
                    <button
                      onClick={handleBack}
                      disabled={isTyping}
                      className={`flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-400 hover:text-[#2C3E30] transition-colors ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Undo2 size={14} />
                      1つ前の質問に戻る
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ノーセールス・レポートダウンロードエリア */}
            {isFullyFinished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-4 md:p-6 bg-gradient-to-br from-[#2C3E30] to-[#1A2530] text-white"
              >
                <h4 className="text-base md:text-lg font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="text-[#D4AF37]" size={20} />
                  あなた専用の処方箋が完成しました
                </h4>
                <p className="text-xs md:text-sm text-gray-300 mb-4 leading-relaxed">
                  個人情報の入力は不要です。ボタンを押すとすぐに診断レポート（.txt）がダウンロードされます。
                </p>

                <button
                  onClick={handleDownloadReport}
                  className="w-full py-3 md:py-4 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-white font-bold text-sm md:text-base text-center transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download size={18} />
                  診断レポートを受け取る（無料）
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}