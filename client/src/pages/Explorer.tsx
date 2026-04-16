import { useState, useMemo } from "react";
import { Link } from "wouter";
import atlasData from "@/data/atlas-data.json";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProcessStage {
  id: string;
  name: string;
  archetypeCount: number;
  slug: string;
}

interface Archetype {
  archetypeId: string;
  title: string;
  processStage: string;
  processStageId: string;
  operatorDescription: string;
  acceptedLoss: string;
  acceptedLossMin: number;
  acceptedLossMax: number;
  timeToValue: string;
  classificationTags: string[];
  mathematicalDescription: string;
  dataRequirements: string[];
  crossIndustryAnalogs: string[];
  equipmentVariants: string[];
}

interface InfraCombo {
  id: string;
  name: string;
  historian: string;
  erp: string;
  database: string;
  protocols: string[];
  frequency: string;
  deploymentWeeks: string;
  industryFit: string[];
}

const processStages = atlasData.processStages as ProcessStage[];
const archetypes = atlasData.archetypes as Archetype[];
const infraCombinations = atlasData.infrastructureCombinations as InfraCombo[];

// ─── Constants ───────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { id: "steel", name: "Steel Manufacturing", available: true },
  { id: "oil-gas", name: "Oil & Gas Refining", available: false },
  { id: "cement", name: "Cement", available: false },
  { id: "pharma", name: "Pharmaceutical", available: false },
  { id: "automotive", name: "Automotive", available: false },
  { id: "mining", name: "Mining & Minerals", available: false },
  { id: "chemical", name: "Chemical Processing", available: false },
  { id: "semiconductor", name: "Semiconductor", available: false },
  { id: "food", name: "Food & Beverage", available: false },
  { id: "aluminum", name: "Aluminum", available: false },
];

const MILL_TYPES = [
  { id: "eaf-long", name: "EAF Long-Product Mini-Mill", stages: ["L1-01", "L1-02", "L1-04", "L1-05", "L1-06", "L1-09", "L1-10", "L1-11", "L1-12", "L1-13", "L1-14", "L1-15", "L1-16"] },
  { id: "eaf-flat", name: "EAF Flat-Product Mill", stages: ["L1-01", "L1-02", "L1-04", "L1-05", "L1-06", "L1-07", "L1-08", "L1-09", "L1-10", "L1-11", "L1-12", "L1-13", "L1-14", "L1-15", "L1-16"] },
  { id: "integrated", name: "Integrated BOF Mill", stages: ["L1-01", "L1-03", "L1-04", "L1-05", "L1-06", "L1-07", "L1-08", "L1-09", "L1-10", "L1-11", "L1-12", "L1-13", "L1-14", "L1-15", "L1-16"] },
  { id: "specialty", name: "Specialty / Stainless Steel", stages: ["L1-01", "L1-02", "L1-04", "L1-05", "L1-06", "L1-07", "L1-08", "L1-09", "L1-10", "L1-11", "L1-12", "L1-13", "L1-14", "L1-15", "L1-16"] },
  { id: "all", name: "Show All Process Stages", stages: processStages.map(s => s.id) },
];

const HISTORIANS = ["Any / Not Sure", "OSIsoft PI System", "AVEVA Historian (Wonderware)", "GE Proficy Historian", "iba PDA / ibaAnalyzer", "Inductive Automation Ignition", "Honeywell PHD", "AspenTech IP.21", "Yokogawa Exaquantum", "AVEVA PI (Cloud)"];
const ERPS = ["Any / Not Sure", "SAP ECC / S/4HANA", "Oracle EBS / Cloud", "Microsoft Dynamics 365", "Infor CloudSuite", "IFS Applications", "Epicor Kinetic", "Custom / In-House"];
const DATABASES = ["Any / Not Sure", "Microsoft SQL Server", "Oracle Database", "PostgreSQL", "MySQL / MariaDB", "SAP HANA", "MongoDB", "InfluxDB / TimescaleDB"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatLossRange(min: number, max: number): string {
  const fmt = (n: number) => n >= 1 ? `$${n}M` : `$${Math.round(n * 1000)}K`;
  return `${fmt(min)} – ${fmt(max)}/yr`;
}

function totalLoss(filtered: Archetype[]): string {
  const min = filtered.reduce((s, a) => s + a.acceptedLossMin, 0);
  const max = filtered.reduce((s, a) => s + a.acceptedLossMax, 0);
  return `$${min.toFixed(0)}M – $${max.toFixed(0)}M`;
}

// ─── Components ──────────────────────────────────────────────────────────────

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono-data transition-all"
        style={{
          background: done ? "#FF4D00" : active ? "rgba(255,77,0,0.2)" : "rgba(255,255,255,0.05)",
          color: done ? "#0A0A0A" : active ? "#FF4D00" : "#4B5563",
          border: active ? "1px solid #FF4D00" : "1px solid transparent",
        }}
      >
        {done ? "✓" : step}
      </div>
    </div>
  );
}

function ArchetypeCard({ archetype, infra, expanded, onToggle }: {
  archetype: Archetype;
  infra: { historian: string; erp: string; database: string };
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="rounded-lg border transition-colors overflow-hidden"
      style={{
        borderColor: expanded ? "rgba(255,77,0,0.45)" : "#2A2A2A",
        background: "#141414",
      }}
    >
      <button onClick={onToggle} className="w-full text-left block p-5 cursor-pointer">
        {/*
          Mobile: stacked single column.
          Desktop (lg, ≥1024px): 3-column grid — ID/stage/title (220px) | description+tags (1fr) | pricing (180px).
          min-w-0 on each track so 1fr can shrink properly and titles wrap on
          word boundaries instead of collapsing into character-wide columns.
        */}
        <div className="grid gap-5 lg:gap-6 items-start grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_180px]">
          {/* LEFT — archetype ID, process stage, title */}
          <div className="min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block text-[10px] font-mono-data px-2 py-0.5 rounded tracking-wider"
                  style={{
                    color: "#00D4FF",
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.25)",
                  }}
                >
                  {archetype.archetypeId}
                </span>
              </div>
              <div
                className="text-[10px] font-mono-data tracking-wider uppercase"
                style={{ color: "#A0A0A0" }}
              >
                {archetype.processStage}
              </div>
              <h3
                className="text-sm md:text-[15px] font-semibold leading-snug"
                style={{
                  color: "#F5F5F5",
                  fontFamily: "Space Grotesk, sans-serif",
                  // Critical: never break inside a word, always wrap on whitespace
                  wordBreak: "normal",
                  overflowWrap: "break-word",
                  hyphens: "none",
                }}
              >
                {archetype.title}
              </h3>
            </div>

            {/* MIDDLE — description + tag pills (constrained to its column) */}
            <div className="min-w-0 flex flex-col gap-3">
              <p
                className="text-xs leading-relaxed line-clamp-3"
                style={{
                  color: "#A0A0A0",
                  fontFamily: "Space Grotesk, sans-serif",
                  overflowWrap: "break-word",
                }}
              >
                {archetype.operatorDescription}
              </p>
              {archetype.classificationTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {archetype.classificationTags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono-data px-2 py-0.5 rounded"
                      style={{
                        color: "#8A8A8A",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — pricing / time to value (right-aligned on desktop) */}
            <div className="min-w-0 flex flex-col gap-1.5 lg:items-end lg:text-right">
              <div
                className="text-[10px] font-mono-data tracking-wider uppercase"
                style={{ color: "#6B7280" }}
              >
                Accepted Loss
              </div>
              <div
                className="text-sm md:text-base font-bold font-mono-data leading-tight whitespace-nowrap"
                style={{ color: "#FF4D00" }}
              >
                {archetype.acceptedLoss}
              </div>
              <div
                className="text-[10px] font-mono-data tracking-wide mt-1"
                style={{ color: "#6B7280" }}
              >
                {archetype.timeToValue}
              </div>
            </div>
          </div>
      </button>

      {expanded && (
        <div
          className="px-5 pb-5 border-t"
          style={{ borderColor: "#2A2A2A" }}
        >
          {/* Operator description */}
          <div className="mt-4 mb-5">
            <div className="text-[10px] font-mono-data text-gray-500 tracking-wider mb-2">OPERATOR DESCRIPTION</div>
            <p className="text-xs text-gray-300 leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {archetype.operatorDescription}
            </p>
          </div>

          {/* Mathematical description */}
          {archetype.mathematicalDescription && (
            <div className="mb-5">
              <div className="text-[10px] font-mono-data text-gray-500 tracking-wider mb-2">MATHEMATICAL FORMULATION</div>
              <p className="text-xs leading-relaxed p-3 rounded" style={{ color: "#00D4FF", background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)", fontFamily: "JetBrains Mono, monospace" }}>
                {archetype.mathematicalDescription}
              </p>
            </div>
          )}

          {/* Data requirements mapped to infrastructure */}
          {archetype.dataRequirements.length > 0 && (
            <div className="mb-5">
              <div className="text-[10px] font-mono-data text-gray-500 tracking-wider mb-2">
                DATA REQUIREMENTS
                {infra.historian !== "Any / Not Sure" && (
                  <span style={{ color: "#00D4FF" }}> — mapped to {infra.historian}</span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {archetype.dataRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-400 py-1 px-2 rounded" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "#00D4FF" }} className="shrink-0 mt-0.5">→</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment variants */}
          {archetype.equipmentVariants.length > 0 && (
            <div className="mb-5">
              <div className="text-[10px] font-mono-data text-gray-500 tracking-wider mb-2">CONFIGURATION VARIANTS</div>
              <div className="flex flex-wrap gap-1.5">
                {archetype.equipmentVariants.map((v, i) => (
                  <span key={i} className="text-[10px] font-mono-data px-2 py-1 rounded" style={{ color: "#FF4D00", background: "rgba(255,77,0,0.08)", border: "1px solid rgba(255,77,0,0.15)" }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cross-industry analogs */}
          {archetype.crossIndustryAnalogs.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-data text-gray-500 tracking-wider mb-2">CROSS-INDUSTRY ANALOGS</div>
              <div className="flex flex-wrap gap-1.5">
                {archetype.crossIndustryAnalogs.map((a, i) => (
                  <span key={i} className="text-[10px] font-mono-data px-2 py-1 rounded" style={{ color: "#8A8A8A", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// ─── Main Explorer Page ──────────────────────────────────────────────────────

export default function Explorer() {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("steel");
  const [selectedMill, setSelectedMill] = useState("");
  const [historian, setHistorian] = useState("Any / Not Sure");
  const [erp, setErp] = useState("Any / Not Sure");
  const [database, setDatabase] = useState("Any / Not Sure");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const millConfig = MILL_TYPES.find(m => m.id === selectedMill);

  const filteredArchetypes = useMemo(() => {
    let result = archetypes;

    // Filter by mill type stages
    if (millConfig) {
      result = result.filter(a => millConfig.stages.includes(a.processStageId));
    }

    // Filter by process stage
    if (stageFilter !== "all") {
      result = result.filter(a => a.processStageId === stageFilter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.operatorDescription.toLowerCase().includes(q) ||
        a.archetypeId.toLowerCase().includes(q) ||
        a.classificationTags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort by max accepted loss (highest ROI first)
    return [...result].sort((a, b) => b.acceptedLossMax - a.acceptedLossMax);
  }, [millConfig, stageFilter, searchQuery]);

  const matchingInfra = useMemo(() => {
    if (historian === "Any / Not Sure" && erp === "Any / Not Sure") return null;
    return infraCombinations.find(c => {
      const hMatch = historian === "Any / Not Sure" || c.historian.toLowerCase().includes(historian.split(" ")[0].toLowerCase());
      const eMatch = erp === "Any / Not Sure" || c.erp.toLowerCase().includes(erp.split(" ")[0].toLowerCase());
      return hMatch && eMatch;
    });
  }, [historian, erp]);

  const relevantStages = millConfig
    ? processStages.filter(s => millConfig.stages.includes(s.id))
    : processStages;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A", color: "#FFFFFF" }}>
      {/* Header */}
      <header className="border-b px-4 md:px-6 py-3 flex items-center justify-between shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-base font-bold tracking-tight text-white group-hover:text-[#FF4D00] transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            GAINTROPY
          </span>
          <span className="text-gray-600 text-sm">/ Problem Library</span>
        </Link>
        <Link
          href="/#access"
          className="text-xs font-mono-data px-4 py-1.5 rounded border transition-all"
          style={{ borderColor: "#FF4D00", color: "#FF4D00" }}
        >
          REQUEST ACCESS
        </Link>
      </header>

      {/* Title */}
      <div className="px-4 md:px-6 py-5 border-b shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <h1 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Problem Library Explorer
        </h1>
        <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          {archetypes.length} pre-built prescriptive solutions across {processStages.length} process stages — configure your plant to see what applies.
        </p>
      </div>

      {/* Step indicator bar */}
      <div className="px-4 md:px-6 py-3 border-b flex items-center gap-4 shrink-0 overflow-x-auto" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {[
          { n: 1, label: "Industry" },
          { n: 2, label: "Plant Config" },
          { n: 3, label: "Data Infrastructure" },
          { n: 4, label: "Problem Library" },
        ].map(({ n, label }) => (
          <button
            key={n}
            onClick={() => { if (n <= step || (n === 4 && selectedMill)) setStep(n); }}
            className="flex items-center gap-2 shrink-0"
          >
            <StepIndicator step={n} current={step} />
            <span
              className="text-[11px] font-mono-data tracking-wider whitespace-nowrap"
              style={{ color: step === n ? "#FFFFFF" : step > n ? "#FF4D00" : "#4B5563" }}
            >
              {label}
            </span>
            {n < 4 && <div className="w-6 md:w-10 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Step 1: Industry */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
            <div className="text-[10px] font-mono-data tracking-wider text-gray-500 mb-4">SELECT INDUSTRY</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {INDUSTRIES.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => {
                    if (ind.available) {
                      setSelectedIndustry(ind.id);
                      setStep(2);
                    }
                  }}
                  disabled={!ind.available}
                  className="text-left p-4 rounded border transition-all"
                  style={{
                    borderColor: selectedIndustry === ind.id ? "#FF4D00" : ind.available ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                    background: selectedIndustry === ind.id ? "rgba(255,77,0,0.08)" : "rgba(255,255,255,0.02)",
                    opacity: ind.available ? 1 : 0.4,
                    cursor: ind.available ? "pointer" : "not-allowed",
                  }}
                >
                  <div className="text-sm font-semibold mb-1" style={{ color: selectedIndustry === ind.id ? "#FF4D00" : "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                    {ind.name}
                  </div>
                  {!ind.available && (
                    <div className="text-[10px] font-mono-data text-gray-600">Coming Soon</div>
                  )}
                  {ind.available && ind.id === "steel" && (
                    <div className="text-[10px] font-mono-data" style={{ color: "#00D4FF" }}>
                      {archetypes.length} solutions ready
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Plant Configuration */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
            <div className="text-[10px] font-mono-data tracking-wider text-gray-500 mb-4">SELECT MILL TYPE</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {MILL_TYPES.map(mill => (
                <button
                  key={mill.id}
                  onClick={() => {
                    setSelectedMill(mill.id);
                    setStep(3);
                  }}
                  className="text-left p-4 rounded border transition-all"
                  style={{
                    borderColor: selectedMill === mill.id ? "#FF4D00" : "rgba(255,255,255,0.08)",
                    background: selectedMill === mill.id ? "rgba(255,77,0,0.08)" : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {mill.name}
                  </div>
                  <div className="text-[10px] font-mono-data" style={{ color: "#00D4FF" }}>
                    {mill.stages.length} process stages — {archetypes.filter(a => mill.stages.includes(a.processStageId)).length} solutions
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Data Infrastructure */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
            <div className="text-[10px] font-mono-data tracking-wider text-gray-500 mb-4">DATA INFRASTRUCTURE</div>
            <p className="text-xs text-gray-400 mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Tell us what systems your plant runs. This helps us map data requirements to your actual infrastructure.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { label: "PROCESS HISTORIAN", value: historian, setter: setHistorian, options: HISTORIANS },
                { label: "ERP SYSTEM", value: erp, setter: setErp, options: ERPS },
                { label: "PRIMARY DATABASE", value: database, setter: setDatabase, options: DATABASES },
              ].map(({ label, value, setter, options }) => (
                <div key={label}>
                  <div className="text-[10px] font-mono-data text-gray-500 tracking-wider mb-1.5">{label}</div>
                  <select
                    value={value}
                    onChange={e => setter(e.target.value)}
                    className="w-full md:w-96 px-3 py-2.5 text-sm rounded outline-none appearance-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#FFFFFF",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {options.map(o => (
                      <option key={o} value={o} style={{ background: "#111" }}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {matchingInfra && (
              <div className="p-4 rounded mb-6" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <div className="text-[10px] font-mono-data tracking-wider mb-2" style={{ color: "#00D4FF" }}>
                  MATCHED INTEGRATION PROFILE: {matchingInfra.name}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-gray-500 font-mono-data text-[9px]">FREQUENCY</div>
                    <div className="text-white font-mono-data">{matchingInfra.frequency}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-mono-data text-[9px]">DEPLOYMENT</div>
                    <div className="text-white font-mono-data">{matchingInfra.deploymentWeeks} weeks</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-mono-data text-[9px]">PROTOCOLS</div>
                    <div className="text-white font-mono-data">{matchingInfra.protocols.slice(0, 2).join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-mono-data text-[9px]">DATABASE</div>
                    <div className="text-white font-mono-data truncate">{matchingInfra.database.split(",")[0]}</div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(4)}
              className="px-6 py-3 text-sm font-semibold rounded transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
            >
              View Problem Library →
            </button>
          </div>
        )}

        {/* Step 4: Problem Library */}
        {step === 4 && (
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
            {/* Summary bar */}
            <div className="p-4 rounded mb-6" style={{ background: "rgba(255,77,0,0.05)", border: "1px solid rgba(255,77,0,0.15)" }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="text-lg md:text-xl font-bold" style={{ color: "#FF4D00", fontFamily: "Space Grotesk, sans-serif" }}>
                    {filteredArchetypes.length} pre-built prescriptive solutions
                  </div>
                  <div className="text-xs text-gray-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    for your {millConfig?.name ?? "steel mill"} configuration
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono-data text-gray-500">TOTAL ADDRESSABLE LOSS</div>
                  <div className="text-lg font-bold font-mono-data" style={{ color: "#FF4D00" }}>
                    {totalLoss(filteredArchetypes)}/yr
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              {/* Search */}
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              />
              {/* Stage filter */}
              <select
                value={stageFilter}
                onChange={e => setStageFilter(e.target.value)}
                className="px-3 py-2 text-sm rounded outline-none appearance-none md:w-72"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                <option value="all" style={{ background: "#111" }}>All Process Stages</option>
                {relevantStages.map(s => (
                  <option key={s.id} value={s.id} style={{ background: "#111" }}>
                    {s.name} ({archetypes.filter(a => a.processStageId === s.id).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Process stage pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              <button
                onClick={() => setStageFilter("all")}
                className="text-[10px] font-mono-data px-2.5 py-1 rounded border transition-all"
                style={{
                  borderColor: stageFilter === "all" ? "#FF4D00" : "rgba(255,255,255,0.08)",
                  color: stageFilter === "all" ? "#FF4D00" : "#6B7280",
                  background: stageFilter === "all" ? "rgba(255,77,0,0.1)" : "transparent",
                }}
              >
                ALL ({filteredArchetypes.length})
              </button>
              {relevantStages.map(s => {
                const count = archetypes.filter(a => a.processStageId === s.id && (millConfig ? millConfig.stages.includes(a.processStageId) : true)).length;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStageFilter(s.id === stageFilter ? "all" : s.id)}
                    className="text-[10px] font-mono-data px-2.5 py-1 rounded border transition-all"
                    style={{
                      borderColor: stageFilter === s.id ? "#FF4D00" : "rgba(255,255,255,0.08)",
                      color: stageFilter === s.id ? "#FF4D00" : "#6B7280",
                      background: stageFilter === s.id ? "rgba(255,77,0,0.1)" : "transparent",
                    }}
                  >
                    {s.name.replace("and ", "& ").split(" ").slice(0, 2).join(" ")} ({count})
                  </button>
                );
              })}
            </div>

            {/* Archetype cards */}
            <div className="space-y-3 max-w-[1320px]">
              {filteredArchetypes.map(a => (
                <ArchetypeCard
                  key={a.archetypeId}
                  archetype={a}
                  infra={{ historian, erp, database }}
                  expanded={expandedId === a.archetypeId}
                  onToggle={() => setExpandedId(expandedId === a.archetypeId ? null : a.archetypeId)}
                />
              ))}
            </div>

            {filteredArchetypes.length === 0 && (
              <div className="text-center py-16">
                <div className="text-sm text-gray-500" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  No problems match your current filters.
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 p-6 rounded text-center" style={{ background: "rgba(255,77,0,0.05)", border: "1px solid rgba(255,77,0,0.15)" }}>
              <p className="text-sm text-gray-300 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                These {filteredArchetypes.length} solutions are ready to deploy on your infrastructure.
                <br />
                Each one ships with pre-built data connectors, calibration procedures, and proven mathematical models.
              </p>
              <button
                onClick={() => {
                  window.location.href = "/#access";
                }}
                className="px-7 py-3 text-sm font-semibold rounded transition-all hover:opacity-90 active:scale-95"
                style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Request Access
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
