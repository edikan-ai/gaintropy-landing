import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  type ProfileId,
  type CompanyContext,
  type ScenarioPreset,
  type CalculationResult,
  type ValueDriverResult,
  PRICING_BRACKETS,
  ERP_OPTIONS,
} from "./lib/types";
import { PROFILES, PROFILE_LIST, getProfile } from "./lib/profiles";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDollar(n: number, compact = false): string {
  if (compact) {
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtNum(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function getPricingBracket(revenue: number) {
  return PRICING_BRACKETS.find(b => revenue < b.maxRevenue) ?? PRICING_BRACKETS[PRICING_BRACKETS.length - 1];
}

// ─── URL Params ──────────────────────────────────────────────────────────────

function readUrlParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((v, k) => { result[k] = v; });
  return result;
}

function writeUrlParams(params: Record<string, string | number>) {
  const url = new URL(window.location.href);
  url.search = "";
  Object.entries(params).forEach(([k, v]) => {
    if (v !== "" && v !== undefined) url.searchParams.set(k, String(v));
  });
  window.history.replaceState(null, "", url.toString());
}

// ─── Number Input Component ──────────────────────────────────────────────────

function NumberInput({ label, hint, value, unit, onChange, min, max, step, isCurrency }: {
  label: string; hint: string; value: number; unit: string;
  onChange: (v: number) => void; min: number; max: number; step: number; isCurrency?: boolean;
}) {
  const [raw, setRaw] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setRaw(isCurrency ? fmtNum(value) : String(value));
    }
  }, [value, isCurrency]);

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold mb-1" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
        {label}
        <span className="ml-2 text-[10px] font-normal" style={{ color: "#8A8A8A", fontFamily: "JetBrains Mono, monospace" }}>{unit}</span>
      </label>
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={raw}
        onChange={e => {
          const cleaned = e.target.value.replace(/[^0-9.,\-]/g, "");
          setRaw(cleaned);
          const num = parseFloat(cleaned.replace(/,/g, ""));
          if (!isNaN(num) && num >= min && num <= max) onChange(num);
        }}
        onBlur={() => {
          const num = parseFloat(raw.replace(/,/g, ""));
          if (!isNaN(num)) {
            const clamped = Math.min(max, Math.max(min, num));
            onChange(clamped);
            setRaw(isCurrency ? fmtNum(clamped) : String(clamped));
          } else {
            setRaw(isCurrency ? fmtNum(value) : String(value));
          }
        }}
        className="w-full px-3 py-2.5 rounded text-sm outline-none transition-colors"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#FFFFFF",
          fontFamily: "JetBrains Mono, monospace",
        }}
      />
      <p className="text-[10px] mt-1" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>{hint}</p>
    </div>
  );
}

// ─── Slider Component ────────────────────────────────────────────────────────

function ImprovementSlider({ label, hint, value, unit, onChange, min, max, step }: {
  label: string; hint: string; value: number; unit: string;
  onChange: (v: number) => void; min: number; max: number; step: number;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-semibold" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>{label}</label>
        <span className="text-sm font-bold" style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#FF4D00] h-1.5 rounded-full cursor-pointer"
        style={{ background: `linear-gradient(to right, #FF4D00 ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) ${((value - min) / (max - min)) * 100}%)` }}
      />
      <p className="text-[10px] mt-1" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>{hint}</p>
    </div>
  );
}

// ─── Value Driver Bar Chart ──────────────────────────────────────────────────

function ValueDriverChart({ drivers }: { drivers: ValueDriverResult[] }) {
  const maxVal = Math.max(...drivers.map(d => d.value), 1);

  return (
    <div className="space-y-3">
      {drivers.map(d => (
        <div key={d.key}>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>{d.label}</span>
            <span className="text-xs font-bold" style={{ color: d.category === "direct" ? "#FF4D00" : "#00D4FF", fontFamily: "JetBrains Mono, monospace" }}>
              {fmtDollar(d.value, true)}
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.max((d.value / maxVal) * 100, 1)}%`,
                background: d.category === "direct" ? "#FF4D00" : "#00D4FF",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Scenario Card ───────────────────────────────────────────────────────────

function ScenarioCard({ label, result, active, onClick, color }: {
  label: string; result: CalculationResult; active: boolean; onClick: () => void; color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 p-4 rounded-lg border text-left transition-all"
      style={{
        borderColor: active ? color : "rgba(255,255,255,0.06)",
        background: active ? `${color}08` : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="text-[10px] font-bold tracking-wider mb-2" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
        {label.toUpperCase()}
      </div>
      <div className="text-lg font-bold mb-1" style={{ color: "#FFFFFF", fontFamily: "JetBrains Mono, monospace" }}>
        {fmtDollar(result.totalAnnualSavings, true)}<span className="text-[10px] text-gray-500">/yr</span>
      </div>
      <div className="text-[10px]" style={{ color: "#8A8A8A", fontFamily: "JetBrains Mono, monospace" }}>
        {result.paybackMonths < 1 ? "<1" : result.paybackMonths.toFixed(1)} mo payback
      </div>
    </button>
  );
}

// ─── Main Calculator ─────────────────────────────────────────────────────────

export default function CalculatorPage() {
  // ── State ────────────────────────────────────────────────────────────────
  const urlParams = useMemo(readUrlParams, []);

  const [profileId, setProfileId] = useState<ProfileId>(
    (urlParams.profile as ProfileId) || "steel-long"
  );
  const profile = getProfile(profileId);

  // Company context
  const [company, setCompany] = useState<CompanyContext>({
    annualRevenue: Number(urlParams.revenue) || 150,
    employees: Number(urlParams.employees) || 300,
    sites: Number(urlParams.sites) || 1,
    erp: urlParams.erp || "SAP",
    existingOptimization: (urlParams.optTools as CompanyContext["existingOptimization"]) || "some",
  });

  // Operations inputs (keyed by field key, reset when profile changes)
  const [opsInputs, setOpsInputs] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    profile.operationsInputs.forEach(f => {
      defaults[f.key] = Number(urlParams[f.key]) || f.defaultValue;
    });
    return defaults;
  });

  // Improvement values
  const [scenario, setScenario] = useState<ScenarioPreset>(
    (urlParams.scenario as ScenarioPreset) || "realistic"
  );
  const [improvements, setImprovements] = useState<Record<string, number>>(() => {
    const vals: Record<string, number> = {};
    profile.improvementSliders.forEach(s => {
      vals[s.key] = Number(urlParams[s.key]) || s.realistic;
    });
    return vals;
  });

  // Platform investment
  const bracket = getPricingBracket(company.annualRevenue);
  const [platformCost, setPlatformCost] = useState(Number(urlParams.platformCost) || bracket.representative);

  // Copied state for share button
  const [copied, setCopied] = useState(false);

  // ── Profile change handler ───────────────────────────────────────────────
  const handleProfileChange = useCallback((id: ProfileId) => {
    setProfileId(id);
    const p = getProfile(id);
    const defaults: Record<string, number> = {};
    p.operationsInputs.forEach(f => { defaults[f.key] = f.defaultValue; });
    setOpsInputs(defaults);
    const impDefaults: Record<string, number> = {};
    p.improvementSliders.forEach(s => { impDefaults[s.key] = s.realistic; });
    setImprovements(impDefaults);
    setScenario("realistic");
  }, []);

  // ── Scenario preset handler ──────────────────────────────────────────────
  const applyScenario = useCallback((preset: ScenarioPreset) => {
    setScenario(preset);
    const vals: Record<string, number> = {};
    profile.improvementSliders.forEach(s => { vals[s.key] = s[preset]; });
    setImprovements(vals);
  }, [profile]);

  // ── Calculation ──────────────────────────────────────────────────────────
  const computeResult = useCallback(
    (impr: Record<string, number>, cost: number): CalculationResult => {
      const drivers = profile.calculate(opsInputs, impr);
      const total = drivers.reduce((s, d) => s + d.value, 0);
      const payback = total > 0 ? (cost / total) * 12 : Infinity;
      return {
        valueDrivers: drivers,
        totalAnnualSavings: total,
        platformInvestment: cost,
        paybackMonths: payback,
        threeYearValue: total * 3 - cost * 3,
      };
    },
    [profile, opsInputs]
  );

  const currentResult = useMemo(() => computeResult(improvements, platformCost), [computeResult, improvements, platformCost]);

  const scenarioResults = useMemo(() => {
    const make = (preset: ScenarioPreset) => {
      const vals: Record<string, number> = {};
      profile.improvementSliders.forEach(s => { vals[s.key] = s[preset]; });
      return computeResult(vals, platformCost);
    };
    return {
      conservative: make("conservative"),
      realistic: make("realistic"),
      aggressive: make("aggressive"),
    };
  }, [profile, computeResult, platformCost]);

  // ── URL sync ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const params: Record<string, string | number> = { profile: profileId };
    params.revenue = company.annualRevenue;
    params.employees = company.employees;
    params.sites = company.sites;
    params.erp = company.erp;
    params.optTools = company.existingOptimization;
    params.scenario = scenario;
    params.platformCost = platformCost;
    Object.entries(opsInputs).forEach(([k, v]) => { params[k] = v; });
    Object.entries(improvements).forEach(([k, v]) => { params[k] = v; });
    writeUrlParams(params);
  }, [profileId, company, opsInputs, improvements, scenario, platformCost]);

  // ── Share handler ────────────────────────────────────────────────────────
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Validity check ───────────────────────────────────────────────────────
  const isValid = currentResult.totalAnnualSavings > 0 && isFinite(currentResult.paybackMonths);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* Print-only header */}
      <div className="hidden print:block mb-6">
        <div className="text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Gaintropy ROI Calculator Results</div>
        <div className="text-sm text-gray-500">Generated {new Date().toLocaleDateString()} | Profile: {profile.meta.name}</div>
      </div>

      {/* Header */}
      <header className="border-b px-4 md:px-8 py-3 flex items-center justify-between print:hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-256.png" alt="Gaintropy" className="w-7 h-7 object-contain" />
          <span className="text-base font-bold tracking-tight text-white group-hover:text-[#FF4D00] transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            GAINTROPY
          </span>
        </Link>
        <Link href="/#access" className="text-xs px-4 py-1.5 rounded border transition-all" style={{ borderColor: "#FF4D00", color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>
          REQUEST ACCESS
        </Link>
      </header>

      {/* Title */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-6 print:hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Prescriptive Operations ROI Calculator
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "#8A8A8A", fontFamily: "Space Grotesk, sans-serif" }}>
          Understand the value Gaintropy can produce for your specific operation. Select your industry profile, enter your operational metrics, and see a realistic estimate of annual savings.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16 space-y-8">

        {/* ─── Step 1: Profile Selection ─────────────────────────────────── */}
        <section className="print:hidden">
          <SectionHeader step={1} title="Operation Profile" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROFILE_LIST.map(p => (
              <button
                key={p.meta.id}
                onClick={() => handleProfileChange(p.meta.id)}
                className="text-left p-3.5 rounded-lg border transition-all"
                style={{
                  borderColor: profileId === p.meta.id ? "#FF4D00" : "rgba(255,255,255,0.06)",
                  background: profileId === p.meta.id ? "rgba(255,77,0,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="text-sm font-semibold" style={{ color: profileId === p.meta.id ? "#FF4D00" : "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                  {p.meta.name}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "#6B7280", fontFamily: "JetBrains Mono, monospace" }}>
                  {p.meta.subtitle}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ─── Step 2: Company Context ───────────────────────────────────── */}
        <section className="print:hidden">
          <SectionHeader step={2} title="Company Context" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <NumberInput
              label="Annual Revenue" hint="Total company revenue in millions USD" unit="$M"
              value={company.annualRevenue} min={0.5} max={50_000} step={1}
              onChange={v => { setCompany(c => ({ ...c, annualRevenue: v })); setPlatformCost(getPricingBracket(v).representative); }}
            />
            <NumberInput
              label="Number of Employees" hint="Total headcount across production operations" unit="people"
              value={company.employees} min={5} max={100_000} step={5}
              onChange={v => setCompany(c => ({ ...c, employees: v }))}
            />
            <NumberInput
              label="Production Sites" hint="Number of manufacturing or processing facilities" unit="sites"
              value={company.sites} min={1} max={200} step={1}
              onChange={v => setCompany(c => ({ ...c, sites: v }))}
            />
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                Current ERP System
              </label>
              <select
                value={company.erp}
                onChange={e => setCompany(c => ({ ...c, erp: e.target.value }))}
                className="w-full px-3 py-2.5 rounded text-sm outline-none appearance-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontFamily: "JetBrains Mono, monospace" }}
              >
                {ERP_OPTIONS.map(o => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                Existing Optimization Tools
              </label>
              <div className="flex gap-2">
                {(["no", "some", "yes"] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setCompany(c => ({ ...c, existingOptimization: v }))}
                    className="flex-1 py-2 text-xs rounded border transition-all capitalize"
                    style={{
                      borderColor: company.existingOptimization === v ? "#FF4D00" : "rgba(255,255,255,0.08)",
                      color: company.existingOptimization === v ? "#FF4D00" : "#8A8A8A",
                      background: company.existingOptimization === v ? "rgba(255,77,0,0.08)" : "transparent",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <p className="text-[10px] mt-1" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>
                Do you currently use any process optimization or analytics software?
              </p>
            </div>
          </div>
        </section>

        {/* ─── Step 3: Operations Metrics ─────────────────────────────────── */}
        <section className="print:hidden">
          <SectionHeader step={3} title={`${profile.meta.name} — Operational Metrics`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {profile.operationsInputs.map(f => (
              <NumberInput
                key={f.key}
                label={f.label}
                hint={f.hint}
                unit={f.unit}
                value={opsInputs[f.key] ?? f.defaultValue}
                min={f.min}
                max={f.max}
                step={f.step}
                isCurrency={f.isCurrency}
                onChange={v => setOpsInputs(prev => ({ ...prev, [f.key]: v }))}
              />
            ))}
          </div>
        </section>

        {/* ─── Step 4: Improvement Assumptions ────────────────────────────── */}
        <section className="print:hidden">
          <SectionHeader step={4} title="Improvement Assumptions" />
          <div className="flex gap-2 mb-6">
            {(["conservative", "realistic", "aggressive"] as const).map(s => (
              <button
                key={s}
                onClick={() => applyScenario(s)}
                className="flex-1 py-2 text-xs font-bold rounded border transition-all capitalize tracking-wider"
                style={{
                  borderColor: scenario === s ? "#FF4D00" : "rgba(255,255,255,0.08)",
                  color: scenario === s ? "#FF4D00" : "#8A8A8A",
                  background: scenario === s ? "rgba(255,77,0,0.08)" : "transparent",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {profile.improvementSliders.map(s => (
              <ImprovementSlider
                key={s.key}
                label={s.label}
                hint={s.hint}
                unit={s.unit}
                value={improvements[s.key] ?? s.realistic}
                min={s.min}
                max={s.max}
                step={s.step}
                onChange={v => {
                  setImprovements(prev => ({ ...prev, [s.key]: v }));
                  setScenario("realistic"); // mark as custom-ish
                }}
              />
            ))}
          </div>
        </section>

        {/* ─── Step 5: Platform Investment ─────────────────────────────────── */}
        <section className="print:hidden">
          <SectionHeader step={5} title="Platform Investment Estimate" />
          <div className="p-4 rounded-lg border mb-3" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs" style={{ color: "#8A8A8A", fontFamily: "JetBrains Mono, monospace" }}>{bracket.label}</span>
              <span className="text-base font-bold" style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>{fmtDollar(platformCost)}/yr</span>
            </div>
            <input
              type="range"
              min={bracket.min}
              max={bracket.max}
              step={5_000}
              value={platformCost}
              onChange={e => setPlatformCost(Number(e.target.value))}
              className="w-full accent-[#FF4D00] h-1.5 rounded-full cursor-pointer"
              style={{ background: `linear-gradient(to right, #FF4D00 ${((platformCost - bracket.min) / (bracket.max - bracket.min)) * 100}%, rgba(255,255,255,0.08) ${((platformCost - bracket.min) / (bracket.max - bracket.min)) * 100}%)` }}
            />
            <div className="flex justify-between text-[10px] mt-1" style={{ color: "#6B7280", fontFamily: "JetBrains Mono, monospace" }}>
              <span>{fmtDollar(bracket.min)}</span>
              <span>{fmtDollar(bracket.max)}</span>
            </div>
          </div>
          <p className="text-[10px] leading-relaxed" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>
            Platform investment includes solver licensing, deployment, and customer success support. Implementation costs are typically 1–2x the annual platform investment in year one. Final pricing depends on your specific situation.
          </p>
        </section>

        {/* ─── Step 6: Results ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader step={6} title="Results" />

          {isValid ? (
            <>
              {/* Headline metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <MetricCard label="Annual Savings" value={fmtDollar(currentResult.totalAnnualSavings, true)} sub="/year" accent="#FF4D00" />
                <MetricCard label="Platform Investment" value={fmtDollar(platformCost, true)} sub="/year" accent="#8A8A8A" />
                <MetricCard label="Payback Period" value={currentResult.paybackMonths < 1 ? "<1" : currentResult.paybackMonths.toFixed(1)} sub="months" accent="#00D4FF" />
                <MetricCard label="3-Year Net Value" value={fmtDollar(currentResult.threeYearValue, true)} sub="cumulative" accent="#FF4D00" />
              </div>

              {/* Value driver breakdown */}
              <div className="p-5 rounded-lg border mb-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div className="text-[10px] font-bold tracking-wider mb-4" style={{ color: "#8A8A8A", fontFamily: "JetBrains Mono, monospace" }}>
                  VALUE DRIVER BREAKDOWN
                </div>
                <ValueDriverChart drivers={currentResult.valueDrivers} />
                <div className="flex items-baseline justify-between mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-xs font-semibold" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>Total Annual Savings</span>
                  <span className="text-lg font-bold" style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>{fmtDollar(currentResult.totalAnnualSavings, true)}</span>
                </div>
              </div>

              {/* Three-scenario comparison */}
              <div className="flex gap-2 mb-6">
                <ScenarioCard label="Conservative" result={scenarioResults.conservative} active={scenario === "conservative"} onClick={() => applyScenario("conservative")} color="#8A8A8A" />
                <ScenarioCard label="Realistic" result={scenarioResults.realistic} active={scenario === "realistic"} onClick={() => applyScenario("realistic")} color="#FF4D00" />
                <ScenarioCard label="Aggressive" result={scenarioResults.aggressive} active={scenario === "aggressive"} onClick={() => applyScenario("aggressive")} color="#00D4FF" />
              </div>

              {/* Methodology */}
              <details className="group rounded-lg border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <summary className="cursor-pointer px-5 py-3 text-xs font-semibold" style={{ color: "#8A8A8A", fontFamily: "Space Grotesk, sans-serif" }}>
                  How is this calculated?
                </summary>
                <div className="px-5 pb-4 text-[11px] leading-relaxed space-y-2" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>
                  <p>The platform produces value through specific operational improvements — each relevant to your {profile.meta.name.toLowerCase()} operations.</p>
                  <p>Each improvement metric is multiplied by your operational scale to produce dollar value. The realistic scenario reflects typical results seen in similar deployments.</p>
                  <p>Conservative and aggressive scenarios bound the realistic estimate. Platform investment includes solver licensing and customer success support. Implementation costs are separate and typically 1–2x platform cost in year one.</p>
                </div>
              </details>

              {/* Disclaimer */}
              <p className="text-[10px] mt-4 italic leading-relaxed" style={{ color: "#4B5563", fontFamily: "Space Grotesk, sans-serif" }}>
                These are estimates based on typical results in similar operations. Your actual results may vary based on operational specifics, data quality, and implementation factors.
              </p>
            </>
          ) : (
            <div className="p-8 rounded-lg border text-center" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-sm" style={{ color: "#8A8A8A", fontFamily: "Space Grotesk, sans-serif" }}>
                Please review your inputs above. The current values produce results outside a reasonable range.
              </p>
            </div>
          )}
        </section>

        {/* ─── Step 7: Next Steps ──────────────────────────────────────────── */}
        <section className="print:hidden">
          <SectionHeader step={7} title="Next Steps" />
          <div className="p-5 rounded-lg border text-center" style={{ borderColor: "rgba(255,77,0,0.15)", background: "rgba(255,77,0,0.03)" }}>
            <p className="text-sm mb-5" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
              Ready to see what Gaintropy can do for your operation?
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <a
                href="/#access"
                className="px-6 py-3 text-sm font-semibold rounded transition-all hover:opacity-90 active:scale-95 inline-block"
                style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Discuss Your Situation
              </a>
              <button
                onClick={handleShare}
                className="px-5 py-3 text-sm rounded border transition-all hover:opacity-80"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "JetBrains Mono, monospace" }}
              >
                {copied ? "Copied!" : "Share These Results"}
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-3 text-sm rounded border transition-all hover:opacity-80"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "#8A8A8A", fontFamily: "JetBrains Mono, monospace" }}
              >
                Print / Save PDF
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[11px]">
              <a href="/" className="transition-colors hover:text-white" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>Learn more about Gaintropy</a>
              <a href="/demo" className="transition-colors hover:text-white" style={{ color: "#6B7280", fontFamily: "Space Grotesk, sans-serif" }}>See the platform in action</a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center print:block" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-[11px]" style={{ color: "#4B5563", fontFamily: "Space Grotesk, sans-serif" }}>
          Powered by Gaintropy. We turn industrial entropy into operational gain.
        </p>
      </footer>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          * { color: black !important; border-color: #ddd !important; background: white !important; }
          [style*="color: #FF4D00"] { color: #c43d00 !important; }
          [style*="color: #00D4FF"] { color: #0088aa !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Shared sub-components ───────────────────────────────────────────────────

function SectionHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
        style={{ background: "rgba(255,77,0,0.15)", color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>
        {step}
      </div>
      <h2 className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>{title}</h2>
    </div>
  );
}

function MetricCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  return (
    <div className="p-3 rounded-lg border" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
      <div className="text-[10px] tracking-wider mb-1" style={{ color: "#6B7280", fontFamily: "JetBrains Mono, monospace" }}>
        {label.toUpperCase()}
      </div>
      <div className="text-lg md:text-xl font-bold" style={{ color: accent, fontFamily: "JetBrains Mono, monospace" }}>
        {value}
      </div>
      <div className="text-[10px]" style={{ color: "#4B5563", fontFamily: "JetBrains Mono, monospace" }}>{sub}</div>
    </div>
  );
}
