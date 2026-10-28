/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  TrendingUp, 
  PieChart, 
  FileText, 
  Users, 
  Handshake, 
  ShieldCheck, 
  Globe, 
  ChevronRight, 
  Phone, 
  Mail, 
  MessageSquare,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '상장 여정', href: '#journey' },
    { name: '서비스', href: '#services' },
    { name: '거래소', href: '#markets' },
    { name: '전문가', href: '#team' },
    { name: '프로세스', href: '#process' },
    { name: '서류제출', href: 'https://portal.vnkhanoicapital.com', isExternal: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled ? 'bg-navy/90 backdrop-blur-xl py-3 border-b border-gold/15' : 'bg-transparent py-6 border-b border-transparent'
    }`}>
      <div className="fluid-px max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-serif text-lg md:text-xl font-semibold text-navy [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
            V
          </div>
          <div>
            <div className="font-serif text-[16px] md:text-xl font-semibold tracking-[0.1em] text-white leading-none uppercase">VNK HANOI CAPITAL</div>
            <div className="text-[6px] md:text-[8px] tracking-[2px] md:tracking-[3px] text-gold uppercase mt-1 opacity-80">Vietnam IPO Advisory</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          <ul className="flex items-center gap-6 xl:gap-10 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-[11px] tracking-[0.15em] text-gray-light hover:text-gold transition-all duration-300 font-medium uppercase relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="bg-gradient-to-br from-gold to-gold-light text-navy px-7 py-2.5 rounded-sm font-bold text-[11px] tracking-[0.15em] uppercase hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">
            무료 상담
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy border-b border-gold/10 p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-4 list-none">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="text-sm tracking-wider text-gray-light block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact" 
                  className="bg-gold text-navy block text-center py-3 rounded-sm font-semibold text-xs tracking-widest mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  무료 상담
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-24 lg:pt-0 overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(201,168,76,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(17,34,64,0.9)_0%,transparent_60%),linear-gradient(160deg,#0A1628_0%,#112240_50%,#0D1F3C_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      
      <div className="flex-1 flex flex-col justify-center items-start fluid-px max-w-[1440px] mx-auto w-full relative z-10 py-20 lg:pt-40 lg:pb-52">
        <div className="absolute right-[-15%] lg:right-[-10%] top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] lg:w-[600px] h-full opacity-[0.05] pointer-events-none mix-blend-screen" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 400'%3E%3Cpath d='M120,10 C140,15 160,20 165,40 C170,55 155,70 160,90 C165,108 180,115 178,135 C176,150 162,155 158,170 C153,188 165,200 160,218 C155,235 138,240 135,258 C130,278 142,290 138,310 C134,328 118,335 112,355 C107,372 115,385 108,395 L95,390 C100,380 92,368 88,352 C84,335 96,325 92,308 C88,290 74,285 70,268 C66,250 78,240 74,222 C70,204 55,198 52,180 C48,162 60,150 58,132 C56,114 42,108 40,90 C38,72 52,58 50,42 C47,25 35,18 38,8 L55,5 C52,15 62,22 68,38 C74,52 68,65 72,78 C78,95 92,100 98,115 C104,130 98,145 105,158 C112,170 128,172 132,185 C136,198 126,210 130,225 C134,240 148,245 150,262 C152,278 140,288 142,305 C144,320 158,328 158,345 C158,355 150,362 148,372 L155,375 C158,362 168,355 170,342 C172,328 162,318 162,304 C162,288 174,280 172,265 C170,250 158,244 155,230 C152,215 162,204 158,190 C154,175 140,170 138,156 C135,142 145,130 140,116 C136,102 122,96 120,82 C116,68 125,55 122,40 C119,28 108,20 110,10 Z' fill='%23C9A84C'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
        </div>

        <div className="relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-gold text-[9px] md:text-[11px] tracking-[0.3em] uppercase mb-6 md:mb-8"
          >
            <div className="w-10 md:w-12 h-[1px] bg-gold"></div>
            베트남 주식상장 원스탑 솔루션
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1.2] md:leading-[1.05] tracking-tight text-balance"
          >
            인큐베이팅에서<br />
            <span className="italic text-gold-light md:ml-12 lg:ml-24">엑싯까지</span>,<br />
            우리가 함께합니다
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-10 text-[14px] md:text-lg text-gray-light/90 font-light leading-relaxed max-w-xl text-balance"
          >
            VNK HANOI CAPITAL은 한국·중국 기업의 베트남 주식시장 상장을 전문적으로 완결합니다. 
            법률·회계·IR·M&A를 단일 창구로 통합하여 최고의 효율성을 제공합니다.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-14 flex flex-wrap gap-4 md:gap-6 items-center"
          >
            <a href="#contact" className="bg-gradient-to-br from-gold to-gold-light text-navy px-8 md:px-12 py-4 md:py-4.5 font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold/10 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]">
              무료 적격성 진단 →
            </a>
            <a href="#journey" className="group flex items-center gap-3 text-gold-light px-2 py-1 text-[11px] md:text-[12px] tracking-[0.15em] font-medium transition-all uppercase relative">
              상장 여정 보기
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-gold/30 group-hover:bg-gold transition-colors"></span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Ticker (Desktop only) */}
      <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-8 opacity-60 z-10">
        {[
          { label: 'Hanoi Exchange', val: 'HNX' },
          { label: 'Ho Chi Minh', val: 'HOSE' },
          { label: 'Unlisted Market', val: 'UPCoM' }
        ].map((item, i) => (
          <div key={item.val} className="text-right animate-ticker-float" style={{ animationDelay: `${i * 2}s` }}>
            <div className="font-serif text-3xl text-gold font-light">{item.val}</div>
            <div className="text-[9px] tracking-widest text-gray uppercase mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex absolute bottom-[180px] left-6 md:left-12 flex-col items-center gap-2 z-10 animate-fade-up">
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse"></div>
        <div className="text-[9px] tracking-[3px] text-gray uppercase [writing-mode:vertical-rl]">Scroll</div>
      </div>

      {/* Bottom Stats Grid - Switched to relative to prevent overlap */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 grid grid-cols-2 lg:grid-cols-4 border-t border-gold/15 bg-navy/90 backdrop-blur-xl mt-auto"
      >
        {[
          { num: '200+', label: '상장 자문 사례' },
          { num: '20년', label: '베트남 경험' },
          { num: '$4.2B', label: '누적 시가총액' },
          { num: '3개', label: '거래소 상장 트랙' }
        ].map((stat) => (
          <div key={stat.label} className="p-6 md:p-10 border-r border-gold/10 relative group">
            <div className="absolute top-0 left-6 md:left-10 w-8 h-[2px] bg-gold"></div>
            <div className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-gold-light leading-none">{stat.num}</div>
            <div className="text-[9px] md:text-[10px] tracking-widest text-gray uppercase mt-2 opacity-80">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function Journey() {
  const steps = [
    {
      num: '01',
      phase: 'INCUBATING',
      title: '기업 인큐베이팅 & 적격성 진단',
      desc: '베트남 진출 초기 단계부터 상장 목표를 설정합니다. 업종 분석, 법인 구조 설계, 재무 요건 갭 분석을 통해 최적 상장 경로를 수립합니다.',
      tags: ['법인 설립', '적격성 진단', '구조 설계'],
      align: 'left'
    },
    {
      num: '02',
      phase: 'RESTRUCTURING',
      title: '재무·지배구조 리스트럭처링',
      desc: '베트남 증권법·회계기준(VAS/IFRS)에 부합하는 재무제표를 구축하고, 지분 구조를 상장 요건에 맞게 재편합니다. 실적 정비 포함.',
      tags: ['회계 정비', '세무 최적화', '지분 재편'],
      align: 'right'
    },
    {
      num: '03',
      phase: 'REGULATORY',
      title: '규제 승인 & 법률 실사',
      desc: 'SSC(국가증권위원회) 등록, 거래소 심사 대응, 법률 실사(Legal DD) 전 과정을 전담합니다. 베트남 당국과의 네트워크 활용.',
      tags: ['SSC 등록', 'Legal DD', '규제 대응'],
      align: 'left'
    },
    {
      num: '04',
      phase: 'IPO EXECUTION',
      title: '공모·상장 실행',
      desc: '투자설명서(Prospectus) 작성, 주간사 선정, 기관투자자 로드쇼, 공모가 산정, 청약·배정까지 IPO 전 과정을 원스탑으로 실행합니다.',
      tags: ['Prospectus', 'Roadshow', '공모 실행'],
      align: 'right'
    },
    {
      num: '05',
      phase: 'POST-LISTING',
      title: '상장 후 IR & 주가 관리',
      desc: '상장 후 공시 의무, 기관투자자 IR, 애널리스트 커버리지 확보 등 상장사의 시장 신뢰도를 지속 제고합니다.',
      tags: ['공시 관리', 'IR 운영', '애널리스트 IR'],
      align: 'left'
    },
    {
      num: '06',
      phase: 'EXIT',
      title: '전략적 엑싯 & M&A 자문',
      desc: '블록딜, 교환사채(EB), 전략적 M&A, 2차 공모 등 최적 엑싯 전략을 설계하고 실행합니다. 가치 극대화.',
      tags: ['블록딜', 'M&A 자문', '엑싯 최적화'],
      align: 'right'
    }
  ];

  return (
    <section id="journey" className="py-24 md:py-32 bg-navy px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase mb-4">
          <div className="w-8 h-[1px] bg-gold"></div>
          END-TO-END SOLUTION
        </div>
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light break-keep">
          인큐베이팅부터 <span className="italic text-gold-light whitespace-nowrap">엑싯</span>까지 전 과정
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold via-gold/50 to-gold/10 -translate-x-1/2"></div>
        
        <div className="flex flex-col gap-0">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] items-center gap-0 py-8 md:py-12 border-b border-gold/10 last:border-0`}
            >
              {/* Left Side Content */}
              <div className={`px-4 md:px-12 ${step.align === 'right' ? 'hidden lg:block' : ''}`}>
                {step.align === 'left' && (
                  <div>
                    <div className="font-serif text-5xl md:text-7xl font-light text-gold/10 leading-none -mb-2 md: -mb-3">{step.num}</div>
                    <div className="text-[9px] md:text-[10px] tracking-[0.3em] text-gold uppercase mb-2 md:mb-3">{step.phase}</div>
                    <h3 className="font-serif text-xl md:text-3xl font-normal mb-3 md:mb-4">{step.title}</h3>
                    <p className="text-gray-light text-[13px] md:text-sm font-light leading-relaxed">{step.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-[10px] tracking-wider px-3 py-1.5 border border-gold/25 text-gold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Node */}
              <div className="flex justify-center items-center py-8 lg:py-0 relative z-10">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center font-serif text-lg font-bold relative bg-navy text-gold">
                  <div className="absolute inset-1 rounded-full bg-gold/10"></div>
                  <span className="relative z-10">{step.num}</span>
                </div>
              </div>

              {/* Right Side Content */}
              <div className={`px-4 md:px-12 text-left lg:text-right ${step.align === 'left' ? 'hidden lg:block' : ''}`}>
                {step.align === 'right' && (
                  <div>
                    <div className="font-serif text-5xl md:text-7xl font-light text-gold/10 leading-none -mb-2 md: -mb-3 lg:text-right">{step.num}</div>
                    <div className="text-[9px] md:text-[10px] tracking-[0.3em] text-gold uppercase mb-2 md:mb-3 lg:text-right">{step.phase}</div>
                    <h3 className="font-serif text-xl md:text-3xl font-normal mb-3 md:mb-4 lg:text-right">{step.title}</h3>
                    <p className="text-gray-light text-[13px] md:text-sm font-light leading-relaxed lg:text-right">{step.desc}</p>
                    <div className="flex flex-wrap lg:justify-end gap-2 mt-4 md:mt-6">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-[10px] tracking-wider px-3 py-1.5 border border-gold/25 text-gold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const serviceList = [
    { num: '01', icon: <Building2 className="w-10 h-10" />, title: '법률 자문', desc: '베트남 투자법, 증권법 기반의 구조 설계. 계약서 작성, 규제 대응, 분쟁 예방까지 전담.' },
    { num: '02', icon: <TrendingUp className="w-10 h-10" />, title: '재무 실사 (FDD)', desc: 'VAS·IFRS 기반 재무 실사, 3개년 재무제표 정비, 상장 요건 충족을 위한 회계 구조 최적화.' },
    { num: '03', icon: <PieChart className="w-10 h-10" />, title: '기업 가치 평가', desc: 'DCF, PER/PBR 분석을 통한 적정 공모가 산정 및 정밀한 밸류에이션 전략 수립.' },
    { num: '04', icon: <ShieldCheck className="w-10 h-10" />, title: '규제 심사 승인', desc: '국가증권위원회(SSC) 등록, 거래소 심사 대응, 법률 실사 등 상장 승인 전 과정 대리.' },
    { num: '05', icon: <FileText className="w-10 h-10" />, title: 'IR · 로드쇼', desc: '기관투자자 대상 Deck 제작, 국내외 로드쇼 기부 운영, 전략적 미디어 릴레이션 구축.' },
    { num: '06', icon: <Handshake className="w-10 h-10" />, title: 'M&A · 제휴', desc: '인수합병, 주식교환, 전략 파트너십 설계. 한국·중국·베트남 크로스보더 딜 전문.' },
    { num: '07', icon: <Globe className="w-10 h-10" />, title: '세무 최적화', desc: '조세 협약을 활용한 본사·지국 구조 설계, 수익 송금 최적화, 잠재 세무 리스크 선제적 제거.' },
    { num: '08', icon: <Users className="w-10 h-10" />, title: '엑싯 전략 설계', desc: '블록딜, EB 발행, 2차 공모, 전략적 매각 등 창업주와 PE 투자자의 수익을 극대화 합니다.' }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-navy-mid relative overflow-hidden px-6 md:px-12">
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-32 h-fit"
        >
          <div className="flex items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase mb-4">
            <div className="w-8 h-[1px] bg-gold"></div>
            CORE SERVICES
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-light mb-8 break-keep">
            8대 전문 <span className="italic text-gold-light md:text-5xl whitespace-nowrap">서비스</span>
          </h2>
          <p className="text-gray-light text-base font-light leading-relaxed">
            법률·회계·금융·IR·M&A의 모든 기능을 단일 창구에서 제공합니다. 외부 기관 조율의 비효율을 제거하고, 고도의 전문성을 바탕으로 책임 있는 원스탑 실행을 보장합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gold/10">
          {serviceList.map((svc) => (
            <motion.div 
              key={svc.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-navy p-10 relative group overflow-hidden border border-gold/5"
            >
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500"></div>
              <div className="absolute top-5 right-8 font-serif text-6xl font-light text-gold/5 group-hover:text-gold/10 transition-colors leading-none">{svc.num}</div>
              
              <div className="text-gold mb-8 transform group-hover:-translate-y-1 transition-transform duration-300">
                {svc.icon}
              </div>
              <h3 className="font-serif text-2xl font-light mb-3">{svc.title}</h3>
              <p className="text-gray text-[13px] font-light leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Markets() {
  const exchanges = [
    { name: 'HOSE — 호치민증권거래소', desc: '베트남 최대 주식시장 · 대형주 · 외국인 비중 높음', badge: '프리미엄' },
    { name: 'HNX — 하노이증권거래소', desc: '중견기업 상장 · 채권 시장 연계 · 유연한 요건', badge: '권장' },
    { name: 'UPCoM — 비상장 공개시장', desc: '스타트업·중소기업 진입 · 이전 상장 발판', badge: '진입 단계' },
    { name: 'SGX — 싱가포르거래소', desc: '동남아 투자자 접근 · 이중 상장 전략 설계 가능', badge: '전략적 선택' }
  ];

  return (
    <section id="markets" className="py-24 md:py-32 bg-navy px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase mb-4">
            <div className="w-8 h-[1px] bg-gold"></div>
            LISTING VENUES
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light mb-8 break-keep">
            3개 거래소 <span className="italic text-gold-light whitespace-nowrap">전략적 선택</span>
          </h2>
          <p className="text-gray-light text-sm md:text-base font-light leading-relaxed mb-6">
            기업 규모, 업종, 투자자 타깃에 따라 최적의 거래소를 제안합니다. HOSE 직상장이 어렵다면 UPCoM 진입 후 이전 상장 전략을 통해 시장 신뢰를 먼저 확보할 수 있습니다.
          </p>
          <p className="text-gray-light text-sm md:text-base font-light leading-relaxed mb-10">
            VNK HANOI CAPITAL은 3개 거래소 모두에서 실제 딜을 완수한 압도적 경험을 보유하고 있습니다.
          </p>

          <div className="grid grid-cols-2 gap-5">
            {[
              { num: '400+', label: 'HOSE 상장사' },
              { num: '350+', label: 'HNX 상장사' },
              { num: '900+', label: 'UPCoM 기업' },
              { num: '$280B+', label: '전체 시가총액' }
            ].map(stat => (
              <div key={stat.label} className="p-5 border-l-2 border-gold bg-navy-mid/40">
                <div className="font-serif text-3xl font-light text-gold-light">{stat.num}</div>
                <div className="text-[10px] text-gray uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {exchanges.map((ex) => (
            <div key={ex.name} className="flex items-center gap-6 p-6 md:p-8 bg-navy-mid/50 border border-gold/10 hover:border-gold/30 transition-all group">
              <div className="text-2xl w-12 h-8 bg-navy flex items-center justify-center rounded-sm">🇻🇳</div>
              <div className="flex-1">
                <h4 className="font-serif text-xl font-normal group-hover:text-gold transition-colors">{ex.name}</h4>
                <p className="text-[11px] text-gray mt-1 leading-relaxed">{ex.desc}</p>
              </div>
              <div className="hidden sm:block text-[9px] tracking-widest text-gold border border-gold px-3 py-1.5 uppercase shrink-0">
                {ex.badge}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Team() {
  const members = [
    { initials: 'AK', name: 'ACE KANG', role: 'CEO & MANAGING DIRECTOR', tags: ['총괄 대표'], langs: ['한국어', '영어', '중국어'], image: '/acekang.jpg', zoom: 'scale-100' },
    { initials: 'LK', name: 'LINDA KANG', role: 'MANAGING PARTNER - 수석 법률 자문', tags: ['법률회사 대표'], langs: ['베트남어', '한국어', '영어'], image: '/linda.png', zoom: 'scale-125' },
    { initials: 'NT', name: 'Nguyen Thanh', role: 'Director · SSC Relations', tags: ['규제 전문가'], langs: ['베트남어', '영어'] }
  ];

  return (
    <section id="team" className="py-24 md:py-32 bg-navy px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase mb-4">
            <div className="w-8 h-[1px] bg-gold"></div>
            ADVISORY TEAM
          </div>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light break-keep">
            현지 사정을 가장 잘 아는 <span className="italic text-gold-light whitespace-nowrap">전문가들</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-gold/10">
          {members.map((member) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-navy border border-gold/5 overflow-hidden group"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-navy-light to-navy-mid flex items-end p-6 md:p-8 relative overflow-hidden">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={`absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105 ${member.zoom || 'scale-100'}`} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const sibling = (e.target as HTMLImageElement).nextElementSibling;
                      if (sibling) (sibling as HTMLElement).style.display = 'block';
                    }}
                  />
                ) : null}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-serif text-[80px] md:text-[120px] font-light text-gold/5 group-hover:text-gold/10 transition-colors pointer-events-none leading-none"
                  style={{ display: member.image ? 'none' : 'block' }}
                >
                  {member.initials}
                </div>
                <div className="relative z-10">
                  <span className="text-[8px] md:text-[9px] tracking-[2px] md:tracking-[3px] text-gold border border-gold/40 px-3 md:px-4 py-1.5 md:py-2 bg-navy/80 backdrop-blur-md uppercase">
                    {member.tags[0]}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h4 className="font-serif text-2xl md:text-3xl font-light mb-1">{member.name}</h4>
                <div className="text-[10px] md:text-[11px] text-gray tracking-widest uppercase mb-4 md:mb-6">{member.role}</div>
                <div className="flex gap-2">
                  {member.langs.map(lang => (
                    <span key={lang} className="text-[10px] px-2.5 py-1 bg-gold/10 text-gold-light tracking-wide">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState<'idle' | 'success' | 'loading'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-br from-navy via-navy-light/20 to-navy text-center px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase mb-4">
            GET STARTED
          </div>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light mb-6 break-keep">
            상장 가능성을 <span className="italic text-gold-light whitespace-nowrap">무료로 확인</span>하세요
          </h2>
          <p className="text-gray-light text-base md:text-lg font-light leading-relaxed mb-12">
            베트남 주식 상장이 우리 회사에 맞는 전략인지, 어떤 경로가 최적인지 — 30분 무료 진단 상담으로 명확한 가이드를 드립니다.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <a href="tel:+84934690086" className="bg-gradient-to-br from-gold to-gold-light text-navy px-10 py-4 font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]">
              <Phone size={16} /> 지금 전화 상담
            </a>
            <a href="mailto:vnkhanoi@gmail.com" className="border border-gold/40 text-gold-light px-10 py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/10 transition-all">
              <Mail size={16} /> 이메일 문의
            </a>
            <a 
              href="https://portal.vnkhanoicapital.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-navy-mid border border-gold/40 text-gold-light px-10 py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/10 transition-all font-semibold"
            >
              <FileText size={16} /> 서류제출
            </a>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-0 border border-gold/20 shadow-2l bg-navy-mid/30">
            <input 
              required
              className="bg-transparent border-b md:border-b-0 md:border-r border-gold/20 text-white p-5 text-sm md:text-base outline-none focus:bg-white/5 transition-all placeholder:text-gray/50" 
              placeholder="회사명 또는 성함" 
            />
            <input 
              required
              className="bg-transparent border-b md:border-b-0 md:border-r border-gold/20 text-white p-5 text-sm md:text-base outline-none focus:bg-white/5 transition-all placeholder:text-gray/50" 
              placeholder="연락처 (KakaoTalk / WeChat / Phone)" 
            />
            <button 
              type="submit"
              disabled={formState === 'success'}
              className={`p-5 px-10 font-semibold text-xs md:text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                formState === 'success' ? 'bg-green-600 text-white' : 'bg-gradient-to-br from-gold to-gold-light text-navy hover:opacity-90'
              }`}
            >
              {formState === 'loading' ? '접수 중...' : formState === 'success' ? '✓ 접수 완료' : '무료 진단 신청 ➔'}
            </button>
          </form>
          {formState === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm mt-4">
              접수되었습니다. 24시간 내에 전문 자문역이 연락드립니다.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#070F1C] border-t border-gold/10 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[380px_1fr_1fr_1fr] gap-12 lg:gap-20 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-serif text-xl font-semibold text-navy [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">V</div>
            <div>
              <div className="font-serif text-xl font-semibold tracking-widest text-white">VNK HANOI CAPITAL</div>
              <div className="text-[8px] tracking-[3px] text-gold uppercase mt-0.5">Vietnam IPO Advisory</div>
            </div>
          </div>
          <p className="text-gray text-xs md:text-sm font-light leading-relaxed max-w-xs">
            베트남 주식 상장 분야의 한국·중국 기업 전문 원스탑 자문사. 하노이 본사 운영 및 3개국 전문가 상주.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[3px] text-gold uppercase font-semibold">서비스</h4>
          <ul className="space-y-3 list-none p-0 m-0">
            {['법률 자문', '재무 실사', 'IPO 실행', 'M&A 자문', '엑싯 전략'].map(item => (
              <li key={item}><a href="#" className="text-gray text-xs hover:text-gold-light transition-colors">{item}</a></li>
            ))}
            <li><a href="https://portal.vnkhanoicapital.com" target="_blank" rel="noopener noreferrer" className="text-gold text-xs hover:text-gold-light transition-colors">서류제출</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[3px] text-gold uppercase font-semibold">거래소</h4>
          <ul className="space-y-3 list-none p-0 m-0">
            {['HOSE 상장', 'HNX 상장', 'UPCoM 등록', '이중 상장 전략'].map(item => (
              <li key={item}><a href="#" className="text-gray text-xs hover:text-gold-light transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[3px] text-gold uppercase font-semibold">연락처</h4>
          <ul className="space-y-3 list-none p-0 m-0">
            <li className="text-gray text-xs flex gap-2">📍 <span className="flex-1">TM1-4 Toà 903, Chung cư Starlake, Khu đô thị Tây Hồ Tây, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội, Việt Nam</span></li>
            <li className="text-gray text-xs flex gap-2">📞 <span className="flex-1">+84 93 469 0086</span></li>
            <li className="text-gray text-xs flex gap-2">✉️ <span className="flex-1">vnkhanoi@gmail.com</span></li>
            <li className="text-gray text-xs flex gap-2">💬 <span className="flex-1">KakaoTalk: carehouse7483</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[11px] text-gray">© 2025 VNK HANOI CAPITAL. All rights reserved.</div>
        <div className="text-[10px] text-gray/50 max-w-md text-center md:text-right">
          본 웹사이트의 내용은 일반적인 정보 제공 목적이며, 개별적인 법률·금융 자문을 구성하지 않습니다. 구체적인 사안에 대해서는 반드시 VNK HANOI CAPITAL 전문가와 직접 상담하시기 바랍니다.
        </div>
      </div>
    </footer>
  );
}

function Reasons() {
  const reasons = [
    { title: '한·중·베 현지 전문가', desc: '한국어·중국어·베트남어·영어를 완벽히 구사하는 팀. 언어 장벽 없이 현지 당국과 원활하게 소통하며 고도의 법률·금융 자문을 제공합니다.' },
    { title: '단일 창구 통합 실행', desc: '법률,회계,금융,IR을 VNK HANOI CAPITAL 팀에서 창구를 일원화 합니다. 커뮤니케이션을 한곳에서 하여 실행속도를 극대화 합니다' },
    { title: '베트남 당국 깊은 네트워크', desc: 'SSC, HOSE, HNX와 20년 이상 쌓아온 신뢰 관계를 통해 베트남의 복잡한 규제 환경에서 최단기 승인을 이끌어냅니다.' }
  ];

  return (
    <section className="py-24 md:py-32 bg-navy fluid-px overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 text-gold text-[10px] tracking-[0.4em] uppercase mb-5">
            <div className="w-10 h-[1px] bg-gold"></div>
            WHY VNK HANOI CAPITAL
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight">
            우리가 다른 <span className="italic text-gold-light">3가지 이유</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason, i) => (
            <motion.div 
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-gradient-to-br from-navy-mid/40 to-navy/40 border border-gold/10 relative group hover:border-gold/30 hover:bg-navy-mid/60 transition-all duration-500"
            >
              <div className="w-10 h-[2px] bg-gold mb-10 group-hover:w-16 transition-all duration-500"></div>
              <h3 className="font-serif text-xl lg:text-2xl font-light mb-5 whitespace-nowrap">{reason.title}</h3>
              <p className="text-gray-light/80 text-[14px] leading-relaxed font-light">{reason.desc}</p>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-gold/5 group-hover:border-gold/20 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { num: '1', title: '적격성 진단', desc: '재무·법률 요건 분석 및 최적의 상장 경로 리포트 제출', weeks: '2~4주' },
    { num: '2', title: '기업 정비', desc: '법인 구조 재편, 회계 투명성 확보, 이사회 구성', weeks: '3~6개월' },
    { num: '3', title: '규제 심사', desc: 'SSC 등록, 거래소 심사, 법률 실사 보고서 확정', weeks: '4~8개월' },
    { num: '4', title: '상장 실행', desc: '투자설명서 확정, 로드쇼, 공모가 산정 및 상장', weeks: '2~4개월' },
    { num: '5', title: '지속 관리', desc: '상장 후 공시 의무, IR 및 추가 자본 확충 자문', weeks: '12개월+' }
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-navy-mid fluid-px relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="flex justify-center items-center gap-4 text-gold text-[10px] tracking-[0.4em] uppercase mb-5">
            TIMELINE
          </div>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-tight">
            상장까지 <span className="italic text-gold-light">5단계 로드맵</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 sm:gap-y-16 gap-x-8">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group flex flex-col items-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold/30 flex items-center justify-center mb-6 md:mb-8 bg-navy-mid font-serif text-2xl md:text-3xl text-gold font-light transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] relative z-10">
                  <div className="absolute inset-1 rounded-full border border-gold/10 group-hover:border-navy/20"></div>
                  {step.num}
                </div>
                <h3 className="font-serif text-[15px] md:text-lg lg:text-xl font-light mb-3 md:mb-4 whitespace-nowrap">{step.title}</h3>
                <p className="text-gray/80 text-[11px] md:text-[13px] font-light leading-relaxed mb-4 md:mb-5 max-w-[200px]">{step.desc}</p>
                <div className="mt-auto inline-block px-4 py-1.5 border border-gold/20 text-gold text-[10px] tracking-[0.2em] font-medium uppercase group-hover:border-gold/50 transition-colors">
                  {step.weeks}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="py-24 md:py-32 bg-[#070F1C] relative overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-12 h-[2px] bg-gold mb-10"
          ></motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.3] text-white break-keep mb-12"
          >
            지금 구조로<br />
            <span className="italic text-gold-light">EXIT이 가능한지</span><br />
            객관적으로<br />
            점검해보셔야 합니다
          </motion.h2>

        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="selection:bg-gold selection:text-navy scroll-smooth notranslate bg-navy relative overflow-x-hidden w-full">
      <Nav />
      <main>
        <Hero />
        <Journey />
        <Services />
        <Reasons />
        <Markets />
        <Team />
        <Quote />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
