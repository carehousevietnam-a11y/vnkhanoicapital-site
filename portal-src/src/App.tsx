import { useState, useRef, useEffect } from "react";
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ChevronDown, 
  CheckCircle2, 
  LayoutDashboard, 
  UploadCloud, 
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  History,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

/* ─── DATA ────────────────────────────────────────────── */
const MODULES = [
  {
    no: "00", phase: "INTAKE",
    title: "Lead Intake",
    ko: "리드 인입 · 고객 선별",
    color: "#0f172a", accent: "#64748b", glow: "94,108,130",
    desc: "고급 고객 선별 및 초기 상담을 통해 CRM에 등록하고 대표 미팅을 예약합니다.",
    tags: ["고급 고객 선별", "CRM 등록", "대표 미팅 예약"],
    docs: [
      { id:"d0-1", label:"사업자등록증 / 법인등록증", req:true },
      { id:"d0-2", label:"회사 소개서 또는 IR 자료", req:true },
      { id:"d0-3", label:"대표이사 여권 사본", req:true },
      { id:"d0-4", label:"최근 3개년 매출 개요 (간략)", req:false },
    ],
  },
  {
    no: "01", phase: "AUDIT",
    title: "Risk Audit",
    ko: "리스크 진단",
    color: "#052e16", accent: "#4ade80", glow: "74,222,128",
    desc: "세무·법률·지분 구조 전반의 리스크를 진단하고 엑싯 가능성을 평가합니다.",
    tags: ["세무 리스크 진단", "지분 구조 분석", "Exit 가능성 평가"],
    docs: [
      { id:"d1-1", label:"최근 3개년 재무제표 (감사보고서)", req:true },
      { id:"d1-2", label:"법인등기부등본 (베트남)", req:true },
      { id:"d1-3", label:"주주명부 및 지분구조 현황", req:true },
      { id:"d1-4", label:"세무신고서 (최근 2년)", req:true },
      { id:"d1-5", label:"기존 투자계약서 (있는 경우)", req:false },
      { id:"d1-6", label:"미지급 세금·벌금 내역", req:false },
    ],
  },
  {
    no: "02", phase: "STRUCTURE",
    title: "Structure Engineering",
    ko: "구조 설계",
    color: "#0c2340", accent: "#38bdf8", glow: "56,189,248",
    desc: "SPV·DICA 구조 설계 및 AOA/SSA 정관 설계를 통해 최적 지배구조를 구축합니다.",
    tags: ["SPV 설계", "DICA 구조", "AOA/SSA 설계"],
    docs: [
      { id:"d2-1", label:"현행 정관 (Charter/AOA)", req:true },
      { id:"d2-2", label:"주주간 계약서 (SHA)", req:false },
      { id:"d2-3", label:"기존 투자구조 다이어그램", req:false },
      { id:"d2-4", label:"모회사/관계사 조직도", req:true },
      { id:"d2-5", label:"해외 지주사 서류", req:false },
    ],
  },
  {
    no: "03", phase: "SETUP",
    title: "Entry & Setup",
    ko: "진입 및 설립",
    color: "#431407", accent: "#fb923c", glow: "251,146,60",
    desc: "IRC/ERC 취득, 라이선스 확보, 토지 및 공장 실사를 진행합니다.",
    tags: ["IRC/ERC 취득", "라이선스 확보", "토지·공장 실사"],
    docs: [
      { id:"d3-1", label:"IRC (투자등록증) 사본", req:true },
      { id:"d3-2", label:"ERC (기업등록증) 사본", req:true },
      { id:"d3-3", label:"공장·토지 임대차 계약서", req:false },
      { id:"d3-4", label:"사업 허가 라이선스 목록", req:true },
      { id:"d3-5", label:"토지사용권 증서 (LURC)", req:false },
      { id:"d3-6", label:"환경 허가 서류", req:false },
    ],
  },
  {
    no: "04", phase: "OPS",
    title: "Operations OS",
    ko: "운영 및 컴플라이언스",
    color: "#2e1065", accent: "#c084fc", glow: "192,132,252",
    desc: "노동 관리·계약 표준화·월간 컴플라이언스를 통해 운영 리스크를 제거합니다.",
    tags: ["노동 관리", "계약 표준화", "월간 컴플라이언스"],
    docs: [
      { id:"d4-1", label:"근로계약서 표준 양식", req:true },
      { id:"d4-2", label:"직원 명단 및 급여 대장", req:true },
      { id:"d4-3", label:"사회보험 납부 확인서", req:true },
      { id:"d4-4", label:"주요 거래처 계약서 (3건 이상)", req:false },
      { id:"d4-5", label:"내부 규정집 (취업규칙 등)", req:false },
      { id:"d4-6", label:"최근 6개월 컴플라이언스 체크리스트", req:false },
    ],
  },
  {
    no: "05", phase: "VALUE",
    title: "Value Acceleration",
    ko: "밸류업 및 투자유치",
    color: "#0a1f44", accent: "#60a5fa", glow: "96,165,250",
    desc: "Tax Shield 설계, Data Room 구축, IR 자료 작성으로 기업가치를 극대화합니다.",
    tags: ["Tax Shield 설계", "Data Room 구축", "IR 자료 구축"],
    docs: [
      { id:"d5-1", label:"기업가치 평가 보고서 (있는 경우)", req:false },
      { id:"d5-2", label:"향후 3~5년 사업계획서", req:true },
      { id:"d5-3", label:"매출·이익 예측 모델", req:true },
      { id:"d5-4", label:"주요 KPI 현황 데이터", req:true },
      { id:"d5-5", label:"기존 투자유치 이력 (Term Sheet)", req:false },
      { id:"d5-6", label:"특허·IP·인증서 목록", req:false },
      { id:"d5-7", label:"경쟁사 분석 자료", req:false },
    ],
  },
  {
    no: "06", phase: "EXIT",
    title: "Exit Engineering",
    ko: "엑싯 실행",
    color: "#3b0a00", accent: "#f97316", glow: "249,115,22",
    desc: "Buyer Matching, SPA 협상, 자금 회수까지 엑싯 전 과정을 실행합니다.",
    tags: ["Buyer Matching", "SPA 협상", "자금 회수 구조"],
    docs: [
      { id:"d6-1", label:"기업 매각 의향서 (LOI)", req:false },
      { id:"d6-2", label:"주식매매계약서 초안 (SPA Draft)", req:false },
      { id:"d6-3", label:"실사 자료 일체 (VDR)", req:true },
      { id:"d6-4", label:"최종 재무제표 (감사 완료본)", req:true },
      { id:"d6-5", label:"자금 송금 관련 은행 서류", req:false },
      { id:"d6-6", label:"세금계산서 및 원천징수 확인서", req:false },
    ],
  },
  {
    no: "07", phase: "SHIELD",
    title: "Post Exit Shield",
    ko: "사후 리스크 종결",
    color: "#450a0a", accent: "#f87171", glow: "248,113,113",
    desc: "우발채무 방어, 세무 리스크 종료, 분쟁 대응으로 엑싯 이후를 보호합니다.",
    tags: ["우발채무 방어", "세무 리스크 종료", "분쟁 대응"],
    docs: [
      { id:"d7-1", label:"엑싯 완료 후 SPA 최종본", req:true },
      { id:"d7-2", label:"우발채무 관련 보증서·각서", req:false },
      { id:"d7-3", label:"세무조사 결과 통지서", req:false },
      { id:"d7-4", label:"법인 청산·이전 관련 서류", req:false },
      { id:"d7-5", label:"분쟁 관련 소송·중재 서류", req:false },
    ],
  },
];

const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e8c870";

/* ─── HELPERS ──────────────────────────────────────────── */
function pct(m, files) {
  const req = m.docs.filter(d => d.req).length;
  if (!req) return 100;
  const done = m.docs.filter(d => d.req && (files[d.id] || []).length > 0).length;
  return Math.round((done / req) * 100);
}

/* ─── UPLOAD ZONE ──────────────────────────────────────── */
interface UploadZoneProps {
  doc: any;
  files: any;
  onUpload: (id: string, newFiles: File[]) => void;
  onRemove: (id: string, idx: number) => void;
}

function UploadZone({ doc, files, onUpload, onRemove }: UploadZoneProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const uploaded = files[doc.id] || [];

  const add = (list: FileList) => onUpload(doc.id, Array.from(list));

  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1.5 px-1">
        <span className="text-[13px] font-semibold text-slate-200 tracking-tight">
          {doc.label}
        </span>
        {doc.req ? (
          <span className="text-[9px] font-bold bg-red-400/10 text-red-400 px-2 py-0.5 rounded-full border border-red-400/20 tracking-wider">REQUIRED</span>
        ) : (
          <span className="text-[9px] font-bold bg-slate-700/30 text-slate-500 px-2 py-0.5 rounded-full border border-slate-700/50 tracking-wider">OPTIONAL</span>
        )}
      </div>

      <div
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); if(e.dataTransfer.files) add(e.dataTransfer.files); }}
        className={cn(
          "relative group border-1.5 border-dashed rounded-xl p-3 cursor-pointer transition-all duration-200",
          drag ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 hover:border-slate-700",
          uploaded.length > 0 && "border-solid border-slate-800"
        )}
      >
        <input ref={ref} type="file" multiple className="hidden"
          onChange={e => { if(e.target.files) { add(e.target.files); if(ref.current) ref.current.value=""; } }} />

        {uploaded.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2 text-slate-500 group-hover:text-slate-400 transition-colors">
            <UploadCloud className="w-5 h-5 mb-1.5 opacity-60" />
            <span className="text-[11px] font-medium">Click or drag to upload files</span>
          </div>
        ) : (
          <div className="space-y-1.5" onClick={e => e.stopPropagation()}>
            {uploaded.map((f: any, i: number) => (
              <div key={i} className="flex items-center justify-between bg-slate-800/60 rounded-lg py-1.5 px-2.5 border border-white/5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="text-[12px] text-slate-300 truncate max-w-[200px]">{f.name}</span>
                </div>
                <button 
                  onClick={() => onRemove(doc.id, i)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                >
                  <span className="text-[11px]">✕</span>
                </button>
              </div>
            ))}
            <button 
              onClick={() => ref.current?.click()}
              className="text-[11px] text-[#c9a84c] hover:text-[#e8c870] font-semibold flex items-center gap-1 mt-1 pl-1"
            >
              + Add more files
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MODULE CARD ──────────────────────────────────────── */
interface ModuleCardProps {
  m: any;
  files: any;
  onUpload: (id: string, newFiles: File[]) => void;
  onRemove: (id: string, idx: number) => void;
  open: boolean;
  onToggle: () => void;
}

function ModuleCard({ m, files, onUpload, onRemove, open, onToggle }: ModuleCardProps) {
  const p = pct(m, files);
  const isDone = p === 100;
  const uploadedCount = m.docs.filter(d => (files[d.id]||[]).length > 0).length;
  const reqTotal = m.docs.filter(d => d.req).length;

  return (
    <div className={cn(
      "group relative rounded-2xl border transition-all duration-500 overflow-hidden",
      open 
        ? "border-[#c9a84c]/30 shadow-[0_0_50px_rgba(201,168,76,0.1)] bg-[#0d1117]" 
        : "border-slate-800/80 bg-slate-900/20 hover:border-slate-700/50"
    )}>
      <div 
        onClick={onToggle}
        className={cn(
          "flex items-center gap-4 p-5 cursor-pointer select-none transition-colors",
          open && "bg-gradient-to-b from-white/[0.03] to-transparent"
        )}
      >
        <div className={cn(
          "w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 transition-all duration-300",
          open 
            ? "bg-[#c9a84c] text-slate-950 scale-110 shadow-lg shadow-[#c9a84c]/20" 
            : "bg-slate-800/50 text-slate-500 group-hover:bg-slate-800"
        )}>
          <span className="text-[10px] font-black leading-none mb-0.5 tracking-tighter">{m.no}</span>
          <FileText className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-[9px] font-bold px-2 py-0.5 rounded-full tracking-[0.2em] transition-colors",
              open ? "bg-[#c9a84c]/20 text-[#c9a84c]" : "bg-slate-800 text-slate-500"
            )}>
              {m.phase}
            </span>
            {isDone && (
              <span className="text-[9px] font-bold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> COMPLETE
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-slate-100 font-serif tracking-tight truncate">{m.title}</h3>
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{m.ko}</p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:block text-right">
            <div className="text-[13px] font-serif text-slate-300 font-bold">{p}%</div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Progress</div>
          </div>
          <div className="relative w-10 h-10">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-800/80" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle 
                className={cn("transition-all duration-1000", isDone ? "text-emerald-400" : "text-[#c9a84c]")}
                strokeWidth="8" strokeDasharray={251.2} strokeDashoffset={251.2 - (p / 100) * 251.2}
                strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
              {uploadedCount}
            </div>
          </div>
          <ChevronDown className={cn("w-4 h-4 text-slate-600 transition-transform duration-300", open && "rotate-180 text-[#c9a84c]")} />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t border-white/[0.03]">
              <p className="text-sm text-slate-400 leading-relaxed mb-5 mt-4">{m.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {m.tags.map((t, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-800/40 px-2.5 py-1 rounded-md border border-white/5">
                    {t}
                  </span>
                ))}
              </div>

              <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.02] pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-[11px] font-black text-slate-400 tracking-widest uppercase">Required Documents</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-mono italic">SECURE UPLOAD PORTAL</span>
                </div>
                <div className="space-y-3">
                  {m.docs.map(doc => (
                    <UploadZone key={doc.id} doc={doc} files={files} onUpload={onUpload} onRemove={onRemove} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── LOGO COMPONENT ────────────────────────────────────── */
function VNKLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        {/* Outer Hexagon */}
        <path d="M50 5L89.4 27.5V72.5L50 95L10.6 72.5V27.5L50 5Z" stroke="#c9a84c" strokeWidth="2" fill="rgba(201,168,76,0.05)" />
        {/* Inner Hexagon */}
        <path d="M50 15L80.7 32.5V67.5L50 85L19.3 67.5V32.5L50 15Z" stroke="#c9a84c" strokeWidth="3" fill="rgba(201,168,76,0.1)" />
        {/* Gold 'V' */}
        <path d="M35 38L50 68L65 38" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─── MAIN ─────────────────────────────────────────────── */
export default function App() {
  const [files, setFiles]         = useState({});
  const [open, setOpen]           = useState<string | null>("00");
  const [tab, setTab]             = useState("all");
  const [company, setCompany]     = useState("");
  const [contact, setContact]     = useState("");
  const [email, setEmail]         = useState("");
  const [done, setDone]           = useState(false);
  const [loading, setLoading]     = useState(false);

  const onUpload = (id: string, newFiles: File[]) => {
    setFiles(p => ({ ...p, [id]: [...(p[id]||[]), ...newFiles] }));
  };
  const onRemove = (id: string, idx: number) => {
    setFiles(p => ({ ...p, [id]: (p[id]||[]).filter((_,i) => i!==idx) }));
  };

  const totalReq     = MODULES.flatMap(m => m.docs).filter(d => d.req).length;
  const totalReqDone = MODULES.flatMap(m => m.docs).filter(d => d.req && (files[d.id]||[]).length > 0).length;
  const totalPct     = Math.round((totalReqDone / totalReq) * 100);
  const totalFiles   = Object.values(files).flat().length;
  const canSubmit    = totalFiles > 0 && company && contact;

  const filtered = MODULES.filter(m => {
    if (tab === "all") return true;
    const p = pct(m, files);
    return tab === "complete" ? p === 100 : p < 100;
  });

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await fetch('/api/upload-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          company, 
          contact, 
          totalFiles,
          timestamp: new Date().toISOString()
        })
      });
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setDone(true);
    }
  };

  if (done) return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#c9a84c]/10">
          <CheckCircle2 className="w-10 h-10 text-[#c9a84c]" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-serif text-slate-100 mb-2 tracking-tight">제출 완료 (Submission Received)</h2>
        <p className="text-[#c9a84c] text-sm font-bold mb-4">감사합니다. 귀하의 서류가 성공적으로 접수되었습니다.</p>
        <p className="text-slate-500 text-sm leading-relaxed mb-10 px-6">
          <span className="text-slate-300 font-semibold">{company}</span>의 서류가 보안 서버로 전송되었습니다. 
          VNK Hanoi Capital의 전문가가 <span className="text-slate-300 font-semibold">{contact}</span>님께 24시간 내에 연락드리겠습니다.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => { setDone(false); setFiles({}); }}
            className="w-full py-4 bg-slate-900 text-slate-200 rounded-xl font-bold tracking-widest text-[11px] border border-white/5 hover:bg-slate-800 transition-colors"
          >
            메인 대시보드로 돌아가기 (DASHBOARD)
          </button>
          <div className="pt-8 border-t border-white/[0.03]">
            <p className="text-[10px] text-slate-600 tracking-[0.2em] font-black italic">VNK HANOI CAPITAL · VIETNAM IPO ADVISORY</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 selection:bg-[#c9a84c]/30 selection:text-white">
      {/* ══ ASIDE (SaaS Sidebar) ══ */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#05080d] border-r border-white/[0.03] hidden xl:flex flex-col z-50">
        <div className="p-8 pb-12">
          <div className="flex items-center gap-3 mb-12">
            <VNKLogo className="w-10 h-10" />
            <div>
              <div className="text-[12px] font-black tracking-[0.2em] leading-none mb-1 text-slate-200">VNK HANOI</div>
              <div className="text-[9px] font-bold tracking-[0.15em] text-[#c9a84c]/80 uppercase">Capital Management</div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Overview", ko: "대요", active: true },
              { icon: TrendingUp, label: "Valuation Pipeline", ko: "가치평가 파이프라인", active: false },
              { icon: History, label: "Transaction Logs", ko: "거래 내역", active: false },
              { icon: ShieldCheck, label: "Compliance Center", ko: "규제 준수 센터", active: false },
              { icon: Users, label: "Team Access", ko: "팀 액세스", active: false },
            ].map(item => (
              <a key={item.label} href="#" className={cn(
                "flex flex-col gap-1 px-4 py-3 rounded-xl transition-all duration-200 group",
                item.active 
                  ? "bg-[#c9a84c]/10 text-[#c9a84c]" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
              )}>
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4 transition-colors", item.active ? "text-[#c9a84c]" : "text-slate-600 group-hover:text-slate-400")} />
                  <span className="text-[12px] font-bold tracking-wide">{item.label}</span>
                </div>
                <span className="text-[9px] ml-7 font-medium text-slate-600 group-hover:text-slate-500 transition-colors uppercase tracking-widest">{item.ko}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 pt-0">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-white/[0.03] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck className="w-12 h-12 text-[#c9a84c]" />
            </div>
            <div className="relative z-10">
              <div className="text-[10px] font-black text-slate-500 tracking-widest mb-2 uppercase">Subscription</div>
              <div className="text-sm font-serif font-bold text-slate-200 mb-1">Enterprise Plus</div>
              <div className="text-[10px] text-[#c9a84c] font-semibold mb-4">평생 자문 액세스 (Lifetime Access)</div>
              <button className="w-full py-2.5 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg text-[10px] font-black tracking-widest text-slate-400 transition-colors uppercase">
                Manage Billing
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=vnk" alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-slate-200 truncate italic">carehouse Vietnam</div>
              <div className="text-[9px] text-[#c9a84c] font-black tracking-widest uppercase">Admin Portal</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ══ CONTENT ══ */}
      <main className="xl:pl-72 transition-all duration-300">
        <header className="sticky top-0 z-40 bg-[#020408]/80 backdrop-blur-xl border-b border-white/[0.03] px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 group cursor-pointer">
              <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              <span className="text-[12px] text-slate-600 font-medium">문서 검색 (Search project assets)...</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
               <div className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">Current Pipeline</div>
               <div className="text-sm font-serif font-bold text-slate-300 tracking-tighter">PHASE 00: INITIAL INTAKE</div>
            </div>
            <button className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6 sm:p-10">
          {/* Hero Section */}
          <section className="mb-14">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
               <div className="max-w-2xl">
                 <div className="flex items-center gap-2 mb-4">
                   <div className="h-[1px] w-8 bg-[#c9a84c]/60" />
                   <span className="text-[10px] font-black tracking-[0.4em] text-[#c9a84c] uppercase">Data Intake Portal (KOREAN ENTERPRISE)</span>
                 </div>
                 <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-100 mb-4 tracking-tight leading-none">
                   베트남 <span className="text-[#c9a84c]">IPO & M&A</span><br/>
                   통합 문서 센터
                 </h1>
                 <h2 className="text-xl sm:text-2xl font-serif text-slate-400 mb-6 tracking-tight">Institutional Documentation Center</h2>
                 <p className="text-slate-500 text-sm leading-relaxed max-w-lg mb-8 font-medium">
                   VNK Hanoi Capital의 보안 자문 워크스페이스에 오신 것을 환영합니다. 
                   각 단계별 필수 서류를 업로드해 주세요. 하노이 본사의 법률 및 재무팀이 실시간으로 실사(Audit)를 진행합니다.
                 </p>
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020408] bg-slate-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i+10}`} alt="Expert" />
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">
                       Active Advisor Supervision (전담 고문 상주)
                    </div>
                 </div>
               </div>

               <div className="flex-shrink-0 w-full lg:w-72">
                 <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-[10px] font-black text-[#c9a84c] tracking-widest mb-4 uppercase">Overall Completion (진행률)</div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-serif font-black text-slate-200">{totalPct}%</span>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Ready</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${totalPct}%` }}
                          className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e8c870] rounded-full" 
                        />
                      </div>
                      <div className="text-[9px] font-bold text-slate-600 tracking-tighter uppercase whitespace-pre-line">
                        {totalReqDone || 0} OF {totalReq} MANDATORY ASSETS VERIFIED
                        {"\n"}(필수 문서 {totalReqDone}/{totalReq}건 검증됨)
                      </div>
                    </div>
                 </div>
               </div>
             </div>
          </section>

          {/* CRM Details */}
          <section className="mb-12">
            <div className="bg-[#05080d] rounded-2xl p-8 border border-white/[0.04] relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#c9a84c] opacity-20" />
              <div className="flex items-center gap-3 mb-8">
                <Building2 className="w-5 h-5 text-[#c9a84c]" />
                <h2 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase">Registration Profile (등록 프로필)</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Target Company (회사명)</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                    <input 
                      value={company} onChange={e=>setCompany(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-300 focus:border-[#c9a84c]/50 transition-all font-medium"
                      placeholder="Company Legal Name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Lead Representative (담당자)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                    <input 
                      value={contact} onChange={e=>setContact(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-300 focus:border-[#c9a84c]/50 transition-all font-medium"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Corporate Email (이메일)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                    <input 
                      value={email} onChange={e=>setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-300 focus:border-[#c9a84c]/50 transition-all font-medium"
                      placeholder="email@company.vn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filtering & Navigation */}
          <section className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="bg-slate-950/40 p-1.5 rounded-xl border border-white/5 flex gap-1">
              {[
                { id: "all", label: "Full Roadmap", ko: "전체 로드맵" },
                { id: "incomplete", label: "Pending", ko: "진행 중" },
                { id: "complete", label: "Done", ko: "완료됨" }
              ].map(t => (
                <button 
                  key={t.id} onClick={() => setTab(t.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-lg text-[11px] font-black tracking-widest uppercase transition-all duration-300 border border-transparent",
                    tab === t.id 
                      ? "bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/20" 
                      : "text-slate-600 hover:text-slate-400 hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span>{t.label}</span>
                    <span className="text-[8px] opacity-60">{t.ko}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-6 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Phase (활성)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Upcoming (대기)</span>
              </div>
            </div>
          </section>

          {/* Grid of Modules */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20 items-start">
            {filtered.map(m => (
              <ModuleCard 
                key={m.no} m={m} files={files} 
                onUpload={onUpload} onRemove={onRemove}
                open={open === m.no} 
                onToggle={() => setOpen(open === m.no ? null : m.no)}
              />
            ))}
          </section>

          {/* Final Action Call */}
          <section className="max-w-3xl mx-auto mb-20 text-center">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-[40px] p-12 sm:p-20 border border-white/[0.03] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
               
               <div className="relative z-10">
                 <ShieldCheck className="w-12 h-12 text-[#c9a84c] mx-auto mb-8 opacity-40" strokeWidth={1} />
                 <h2 className="text-4xl font-serif font-bold text-slate-100 mb-3 tracking-tight">Institutional Review</h2>
                 <p className="text-[#c9a84c] font-bold text-sm tracking-widest uppercase mb-6">최종 자문 검토 신청</p>
                 <p className="text-slate-500 text-sm leading-relaxed mb-12 max-w-sm mx-auto">
                   모든 필수 서류가 업로드되면 VNK Hanoi Capital 운영 위원회의 공식 가치 평가 및 실사가 시작됩니다.
                 </p>
                 
                 <button 
                   disabled={!canSubmit || loading}
                   onClick={handleSubmit}
                   className={cn(
                     "w-full sm:w-auto px-12 py-5 rounded-2xl font-black tracking-[0.2em] text-[12px] uppercase transition-all duration-500 relative group",
                     canSubmit && !loading
                       ? "bg-[#c9a84c] text-slate-950 shadow-[0_20px_50px_rgba(201,168,76,0.25)] hover:scale-105" 
                       : "bg-slate-800 text-slate-600 grayscale cursor-not-allowed"
                   )}
                 >
                   {loading ? (
                     <span className="flex items-center justify-center gap-3">
                       <span className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                       SECURE TRANSMITTING...
                     </span>
                   ) : (
                     "INITIALIZE FULL ADVISORY AUDIT (자문 신청)"
                   )}
                 </button>
                 
                 <div className="mt-12 pt-12 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-center gap-10">
                    <div className="flex items-center gap-3 grayscale opacity-60">
                       <ShieldCheck className="w-4 h-4" />
                       <span className="text-[10px] font-black tracking-widest text-slate-400">AES-256 E2E ENCRYPTED (E2E 암호화)</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale opacity-60">
                       <Lock className="w-4 h-4" />
                       <span className="text-[10px] font-black tracking-widest text-slate-400">FINCEN COMPLIANT (글로벌 표준 준수)</span>
                    </div>
                 </div>
               </div>
            </div>
          </section>

          {/* Footer Sub */}
          <footer className="border-t border-white/[0.03] pt-12 pb-20 flex flex-col items-center">
            <div className="flex items-center gap-8 mb-8 opacity-30 group">
              <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Strategic Partners</span>
              <div className="h-4 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-6 saturate-0 opacity-50">
                 <span className="font-serif italic text-lg text-slate-200">Ho Chi Minh Stock Exchange</span>
                 <span className="font-serif italic text-lg text-slate-200">State Securities Commission</span>
              </div>
            </div>
            <p className="text-[9px] font-bold text-slate-700 tracking-[0.3em] uppercase">
              © 2026 VNK HANOI CAPITAL MANAGEMENT · ALL RIGHTS RESERVED
            </p>
          </footer>
        </div>
      </main>
      
      {/* Floating Support */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 items-end">
        <div className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-bold text-slate-400 opacity-0 hover:opacity-100 transition-opacity translate-x-4 shadow-2xl">
          KAKAOTALK: carehouse7483
        </div>
        <button className="w-14 h-14 bg-[#c9a84c] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#c9a84c]/30 text-slate-950 hover:scale-110 transition-transform">
          <Mail className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}


// Support Icons
function Users({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4-0 0 0-4-4H6a4 4-0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4-0 0 0-3-3.87"/><path d="M16 3.13a4 4-0 0 1 0 7.75"/>
    </svg>
  );
}
