import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { type DemoScenario, type DemoPrescriptiveOption } from "@/data/demoTypes";
import { INDUSTRY_CONFIGS, type IndustryConfig } from "@/data/industryConfigs";
import { generateScenariosForIndustry } from "@/data/scenarioEngine";

// ─── constants ────────────────────────────────────────────────────────────────
const PHASE_LABELS = [
  { left: "OBSERVE: Live Process Data", right: "PREDICT: Baseline Normal" },
  { left: "OBSERVE: Anomaly Detected", right: "PREDICT: Alert Issued" },
  { left: "OBSERVE: Current State", right: "PRESCRIBE: Gaintropy Recommendations" },
  { left: "OBSERVE: Recovery Confirmed", right: "PRESCRIBE: Outcome Verified" },
];

const INDUSTRY_ICONS: Record<string, string> = {
  "Steel Manufacturing": "⚙",
  "Automotive Assembly": "🚗",
  "Semiconductor Manufacturing": "💻",
  "Food & Beverage": "🍶",
  "Pharmaceutical Manufacturing": "💊",
  "Oil & Gas Refining": "🛢",
  "Cement Manufacturing": "🏗",
  "Paper & Pulp": "📄",
  "Textile Manufacturing": "🧵",
  "Chemical Manufacturing": "⚗",
  "Aluminum Smelting": "🔩",
  "Glass Manufacturing": "🔬",
  "Battery Manufacturing": "🔋",
  "Mining Operations": "⛏",
  "Water Treatment": "💧",
  "Plastics Manufacturing": "🔧",
  "Tire & Rubber": "⭕",
  "Paint & Coatings": "🎨",
  "Electronics Assembly": "🖥",
  "Agricultural Processing": "🌾",
  "Aerospace Manufacturing": "✈",
  "Medical Device Manufacturing": "🏥",
  "Dairy Processing": "🥛",
  "Meat & Poultry Processing": "🥩",
  "Sugar Refining": "🍬",
  "Specialty Chemicals": "🧪",
  "Petrochemicals": "🏭",
  "Hydrogen Production": "⚡",
  "Solar Panel Manufacturing": "☀",
  "Wind Turbine Manufacturing": "🌬",
  "Carbon Fiber Composites": "🪢",
  "Copper Smelting": "🔴",
  "Ceramics Manufacturing": "🏺",
  "Concrete Products": "🧱",
  "Wood & Lumber Processing": "🪵",
  "Printing & Packaging": "📦",
  "Rubber Processing": "🔵",
  "Adhesives & Sealants": "🧴",
  "Cosmetics Manufacturing": "💄",
  "Animal Feed Manufacturing": "🌿",
  "Coffee & Tea Processing": "☕",
  "Non-Alcoholic Beverages": "🥤",
  "Wine & Spirits Production": "🍷",
  "Specialty Gases": "💨",
  "Shipbuilding": "🚢",
  "Rail Equipment Manufacturing": "🚂",
  "Biofuels Production": "🌱",
  "Wastewater Resource Recovery": "♻",
  "Aquaculture": "🐟",
  "Precision Machining": "🔩",
};

// ─── Risk Bar ─────────────────────────────────────────────────────────────────
function fmt(v: number, unit: string) {
  const isDollar = unit.includes("$") || unit === "$/hr";
  const big = v >= 1000;
  if (isDollar) return `$${big ? v.toLocaleString() : v}`;
  return `${big ? v.toLocaleString() : v}${unit ? " " + unit : ""}`;
}

function RiskBar({ value, max, warning, critical, unit }: {
  value: number; max: number; warning: number; critical: number; unit: string;
}) {
  const clamp = (n: number) => Math.min(Math.max(n, 0), 100);
  const pct   = clamp((value   / max) * 100);
  const wPct  = clamp((warning / max) * 100);
  const cPct  = clamp((critical / max) * 100);
  const color = value >= critical ? "#FF4D00" : value >= warning ? "#F59E0B" : "#10B981";

  return (
    <div className="space-y-2">
      {/* Current value */}
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] text-gray-500 font-mono-data uppercase tracking-wider">Current</span>
        <span className="text-base font-bold font-mono-data" style={{ color }}>
          {fmt(value, unit)}
        </span>
      </div>

      {/* Bar track */}
      <div className="relative h-2.5 rounded-full overflow-hidden bg-white/5">
        {/* Green zone */}
        <div
          className="absolute inset-y-0 left-0 rounded-l-full"
          style={{ width: `${wPct}%`, background: "rgba(16,185,129,0.35)" }}
        />
        {/* Amber zone */}
        <div
          className="absolute inset-y-0"
          style={{ left: `${wPct}%`, width: `${cPct - wPct}%`, background: "rgba(245,158,11,0.35)" }}
        />
        {/* Red zone */}
        <div
          className="absolute inset-y-0 right-0 rounded-r-full"
          style={{ left: `${cPct}%`, background: "rgba(255,77,0,0.35)" }}
        />
        {/* Value marker */}
        <div
          className="absolute inset-y-0 w-0.5 rounded-full transition-all duration-500"
          style={{ left: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}` }}
        />
      </div>

      {/* Threshold labels */}
      <div className="relative h-3">
        <span
          className="absolute text-[9px] font-mono-data text-emerald-600 -translate-x-1/2"
          style={{ left: `${wPct}%` }}
        >
          {fmt(warning, unit)}
        </span>
        <span
          className="absolute text-[9px] font-mono-data text-amber-600 -translate-x-1/2"
          style={{ left: `${cPct}%` }}
        >
          {fmt(critical, unit)}
        </span>
      </div>
    </div>
  );
}

// ─── Sensor Row ───────────────────────────────────────────────────────────────
function SensorRow({ sensor, phase }: { sensor: DemoScenario["sensors"][0]; phase: number }) {
  const isAnomaly = phase >= 1;
  const val = isAnomaly ? sensor.anomalyValue : sensor.normalValue;
  const normal = sensor.normalValue;
  const anomaly = sensor.anomalyValue;
  const changed = String(val) !== String(normal);

  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded border ${changed && isAnomaly ? "border-amber-500/40 bg-amber-500/5" : "border-white/5 bg-white/3"}`}>
      <span className="text-xs text-gray-400 font-mono-data truncate max-w-[45%]">{sensor.name}</span>
      <div className="flex items-center gap-2">
        {isAnomaly && String(anomaly) !== String(normal) && (
          <span className="text-xs text-gray-600 line-through font-mono-data">{normal}{sensor.unit}</span>
        )}
        <span className={`text-sm font-bold font-mono-data ${changed && isAnomaly ? "text-amber-400" : "text-emerald-400"}`}>
          {val}{sensor.unit}
        </span>
      </div>
    </div>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────
function OptionCard({ opt, selected, onSelect }: { opt: DemoPrescriptiveOption; selected: boolean; onSelect: () => void }) {
  const rankColor = opt.rank === 1 ? "#FF4D00" : opt.rank === 2 ? "#F59E0B" : "#6B7280";
  const rankLabel = opt.rank === 1 ? "RECOMMENDED" : opt.rank === 2 ? "AGGRESSIVE" : "CONSERVATIVE";

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 rounded border transition-all ${
        selected
          ? "border-[#FF4D00] bg-[#FF4D00]/8"
          : "border-white/10 bg-white/3 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded font-mono-data"
          style={{ color: rankColor, border: `1px solid ${rankColor}40`, background: `${rankColor}15` }}
        >
          {rankLabel}
        </span>
        <span className="text-sm font-semibold text-white">{opt.title}</span>
      </div>

      <div className="space-y-1 mb-2">
        {opt.actions.slice(0, 3).map((a, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
            <span className="text-[#FF4D00] mt-0.5 shrink-0">→</span>
            <span>
              <span className="text-gray-300">{a.description}</span>
              {a.from && a.to && String(a.from) !== "current" && (
                <span className="text-gray-500 ml-1">({String(a.from)} → {String(a.to)})</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1 mt-2 pt-2 border-t border-white/5">
        <div className="text-center">
          <div className="text-[10px] text-gray-500">Risk</div>
          <div className="text-xs font-mono-data text-emerald-400">{opt.riskReduction.from}→{opt.riskReduction.to}%</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-500">Net Save</div>
          <div className="text-xs font-mono-data text-[#FF4D00]">${opt.netSavings.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-500">Confidence</div>
          <div className="text-xs font-mono-data text-amber-400">{opt.successProbability}%</div>
        </div>
      </div>
    </button>
  );
}

// ─── Phase Panel ──────────────────────────────────────────────────────────────
function LeftPanel({ scenario, phase }: { scenario: DemoScenario; phase: number }) {
  const labels = PHASE_LABELS[phase];
  const phaseColor = phase === 0 ? "#10B981" : phase === 1 ? "#F59E0B" : "#10B981";
  const borderColor = phase === 1 ? "border-amber-500/30" : "border-emerald-500/20";

  return (
    <div className={`h-full flex flex-col md:border-r border-white/8`}>
      {/* Header */}
      <div className={`px-4 py-2 border-b border-white/8`}>
        <span className="text-[10px] font-mono-data font-bold tracking-wider" style={{ color: phaseColor }}>
          {labels.left}
        </span>
      </div>

      {/* Shift Metrics */}
      <div className="grid grid-cols-3 gap-0 border-b border-white/8">
        {[
          { label: "OUTPUT", value: scenario.shiftMetrics.output },
          { label: "ENERGY", value: scenario.shiftMetrics.energy },
          { label: "EFFICIENCY", value: scenario.shiftMetrics.efficiency },
        ].map(({ label, value }) => (
          <div key={label} className="px-3 py-2 border-r border-white/8 last:border-r-0">
            <div className="text-[9px] text-gray-500 font-mono-data">{label}</div>
            <div className="text-xs font-bold text-white font-mono-data">{value}</div>
          </div>
        ))}
      </div>

      {/* Risk Bar */}
      <div className="px-4 py-3 border-b border-white/8">
        <div className="text-[10px] text-gray-500 font-mono-data mb-2">{scenario.riskMetric.name}</div>
        <RiskBar
          value={phase >= 1 ? scenario.riskMetric.peakValue : scenario.riskMetric.normalValue}
          max={scenario.riskMetric.peakValue * 1.15}
          warning={scenario.riskMetric.warningThreshold}
          critical={scenario.riskMetric.criticalThreshold}
          unit={scenario.riskMetric.unit}
        />
      </div>

      {/* Sensors */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {scenario.sensors.map((s) => (
          <SensorRow key={s.id} sensor={s} phase={phase} />
        ))}
      </div>
    </div>
  );
}

function RightPanel({ scenario, phase, selectedOpt, onSelectOpt }: {
  scenario: DemoScenario;
  phase: number;
  selectedOpt: number;
  onSelectOpt: (i: number) => void;
}) {
  const labels = PHASE_LABELS[phase];
  const rightColor = phase === 2 || phase === 3 ? "#FF4D00" : phase === 1 ? "#F59E0B" : "#6B7280";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 border-b border-white/8">
        <span className="text-[10px] font-mono-data font-bold tracking-wider" style={{ color: rightColor }}>
          {labels.right}
        </span>
      </div>

      {/* Content by phase */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {phase === 0 && (
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-gray-500 font-mono-data mb-1">SCENARIO</div>
              <div className="text-sm font-semibold text-white">{scenario.scenarioName}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-mono-data mb-1">CONTEXT</div>
              <div className="text-xs text-gray-400 leading-relaxed">{scenario.description.slice(0, 220)}...</div>
            </div>
            <div className="p-3 rounded border border-emerald-500/20 bg-emerald-500/5">
              <div className="text-[10px] text-emerald-400 font-mono-data mb-2">BASELINE NORMAL</div>
              <div className="text-xs text-gray-300">
                All process parameters within specification. {scenario.riskMetric.name} at{" "}
                <span className="text-emerald-400 font-mono-data">{scenario.riskMetric.normalValue}{scenario.riskMetric.unit}</span>{" "}
                (threshold: {scenario.riskMetric.warningThreshold}{scenario.riskMetric.unit}).
              </div>
            </div>
            <div className="p-3 rounded border border-white/10 bg-white/3">
              <div className="text-[10px] text-gray-500 font-mono-data mb-1">ANNUAL COST AT RISK</div>
              <div className="text-lg font-bold text-[#FF4D00]">{scenario.annualCostRange}</div>
            </div>
          </div>
        )}

        {phase === 1 && (
          <div className="space-y-4">
            <div className="p-3 rounded border border-amber-500/40 bg-amber-500/8">
              <div className="text-[10px] text-amber-400 font-mono-data mb-1">⚠ PREDICTIVE ALERT</div>
              <div className="text-sm font-semibold text-white mb-1">{scenario.predictiveAlert.title}</div>
              <div className="text-xs text-gray-300">{scenario.predictiveAlert.message}</div>
            </div>
            <div className="p-3 rounded border border-white/10 bg-white/3">
              <div className="text-[10px] text-gray-500 font-mono-data mb-1">PREDICTIVE vs PRESCRIPTIVE</div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex gap-2">
                  <span className="text-amber-400 shrink-0">⚠</span>
                  <span><strong className="text-white">Predictive (current state):</strong> Tells you something is wrong. No action guidance.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#FF4D00] shrink-0">→</span>
                  <span><strong className="text-white">Prescriptive (Gaintropy):</strong> Tells you exactly what to do, when, and the expected outcome.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === 2 && (
          <div className="space-y-3">
            <div className="text-[10px] text-gray-500 font-mono-data">SELECT AN ACTION PATH</div>
            {scenario.prescriptiveOptions.map((opt, i) => (
              <OptionCard key={opt.rank} opt={opt} selected={selectedOpt === i} onSelect={() => onSelectOpt(i)} />
            ))}
          </div>
        )}

        {phase === 3 && (
          <div className="space-y-4">
            {(() => {
              const opt = scenario.prescriptiveOptions[selectedOpt];
              const proj = scenario.annualProjection;
              return (
                <>
                  <div className="p-3 rounded border border-emerald-500/30 bg-emerald-500/5">
                    <div className="text-[10px] text-emerald-400 font-mono-data mb-1">✓ ACTION APPLIED: {opt.title}</div>
                    <div className="text-xs text-gray-300">
                      Risk reduced from <span className="text-amber-400 font-mono-data">{opt.riskReduction.from}%</span> to{" "}
                      <span className="text-emerald-400 font-mono-data">{opt.riskReduction.to}%</span>.
                      Net shift savings: <span className="text-[#FF4D00] font-mono-data">${opt.netSavings.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono-data mb-2">ANNUAL PROJECTION</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Incidents/yr", value: proj.incidentsPerYear.toLocaleString() },
                        { label: "Avg Cost/Incident", value: `$${proj.avgCostPerIncident.toLocaleString()}` },
                        { label: "Prevention Rate", value: `${Math.round(proj.preventionRate * 100)}%` },
                        { label: "Platform Cost", value: `$${(proj.platformCost / 1000).toFixed(0)}K/yr` },
                      ].map(({ label, value }) => (
                        <div key={label} className="p-2 rounded border border-white/8 bg-white/3">
                          <div className="text-[9px] text-gray-500 font-mono-data">{label}</div>
                          <div className="text-sm font-bold text-white font-mono-data">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded border border-[#FF4D00]/30 bg-[#FF4D00]/8">
                    <div className="text-[10px] text-gray-500 font-mono-data mb-1">NET ANNUAL SAVINGS</div>
                    <div className="text-2xl font-bold text-[#FF4D00]">
                      ${(proj.netAnnualSavings / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      {scenario.annualCostRange} annual cost at risk
                    </div>
                  </div>
                  <div className="p-2 rounded border border-white/8 bg-white/3 text-xs text-gray-400">
                    <span className="text-gray-500">Tradeoff: </span>{opt.tradeoff}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Demo Engine ──────────────────────────────────────────────────────────────
function DemoEngine({ scenario }: { scenario: DemoScenario }) {
  const [phase, setPhase] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(0);
  const [mobileTab, setMobileTab] = useState<"observe" | "predict">("observe");

  useEffect(() => { setPhase(0); setSelectedOpt(0); }, [scenario.id]);

  const next = useCallback(() => setPhase((p) => Math.min(p + 1, 3)), []);
  const prev = useCallback(() => setPhase((p) => Math.max(p - 1, 0)), []);

  const phaseNames = ["MONITOR", "ANOMALY", "PRESCRIBE", "PROVE"];
  const phaseColors = ["#10B981", "#F59E0B", "#FF4D00", "#10B981"];

  return (
    <div className="flex flex-col h-full">
      {/* Phase stepper */}
      <div className="flex items-center gap-0 border-b border-white/8 shrink-0">
        {phaseNames.map((name, i) => (
          <button
            key={name}
            onClick={() => setPhase(i)}
            className={`flex-1 py-3 md:py-2.5 text-[11px] md:text-[10px] font-mono-data font-bold tracking-widest transition-all border-r border-white/8 last:border-r-0 ${
              i === phase ? "bg-white/5" : "hover:bg-white/3"
            }`}
            style={{ color: i === phase ? phaseColors[i] : "#4B5563" }}
          >
            <span className="block text-center">
              <span className="mr-1" style={{ color: i === phase ? phaseColors[i] : "#374151" }}>
                {i < phase ? "✓" : i === phase ? "●" : "○"}
              </span>
              {name}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile tab toggle (observe / predict panels) */}
      <div className="flex md:hidden border-b border-white/8 shrink-0">
        <button
          onClick={() => setMobileTab("observe")}
          className={`flex-1 py-2.5 text-[10px] font-mono-data font-bold tracking-wider text-center transition-all ${
            mobileTab === "observe" ? "bg-white/5 text-white" : "text-gray-500"
          }`}
        >
          OBSERVE
        </button>
        <button
          onClick={() => setMobileTab("predict")}
          className={`flex-1 py-2.5 text-[10px] font-mono-data font-bold tracking-wider text-center transition-all border-l border-white/8 ${
            mobileTab === "predict" ? "bg-white/5 text-white" : "text-gray-500"
          }`}
        >
          {phase >= 2 ? "PRESCRIBE" : "PREDICT"}
        </button>
      </div>

      {/* Split panel — side by side on desktop, tabbed on mobile */}
      <div className="flex-1 hidden md:grid grid-cols-5 min-h-0">
        <div className="col-span-3 min-h-0 overflow-hidden">
          <LeftPanel scenario={scenario} phase={phase} />
        </div>
        <div className="col-span-2 min-h-0 overflow-hidden">
          <RightPanel scenario={scenario} phase={phase} selectedOpt={selectedOpt} onSelectOpt={setSelectedOpt} />
        </div>
      </div>
      <div className="flex-1 md:hidden min-h-0 overflow-y-auto">
        {mobileTab === "observe" ? (
          <LeftPanel scenario={scenario} phase={phase} />
        ) : (
          <RightPanel scenario={scenario} phase={phase} selectedOpt={selectedOpt} onSelectOpt={setSelectedOpt} />
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-3 md:py-3 border-t border-white/8 shrink-0">
        <button
          onClick={prev}
          disabled={phase === 0}
          className="text-xs font-mono-data text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors py-1 px-2"
        >
          ← PREV
        </button>
        <div className="text-[10px] text-gray-600 font-mono-data">
          Phase {phase + 1} / 4 — {phaseNames[phase]}
        </div>
        <button
          onClick={next}
          disabled={phase === 3}
          className="text-xs font-mono-data px-3 py-2 md:py-1 rounded border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            color: phase === 3 ? "#6B7280" : "#FF4D00",
            borderColor: phase === 3 ? "#374151" : "#FF4D00",
          }}
        >
          {phase === 3 ? "DONE" : "NEXT →"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Demo Page ───────────────────────────────────────────────────────────
export default function Demo() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryConfig>(INDUSTRY_CONFIGS[0]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("");

  const scenariosForIndustry = generateScenariosForIndustry(selectedIndustry);
  const activeScenario: DemoScenario =
    scenariosForIndustry.find((s) => s.id === selectedScenarioId) || scenariosForIndustry[0];

  useEffect(() => {
    setSelectedScenarioId(scenariosForIndustry[0]?.id ?? "");
  }, [selectedIndustry]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <header className="border-b border-white/8 px-6 py-3 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-base font-bold tracking-tight text-white group-hover:text-[#FF4D00] transition-colors">
            GAINTROPY
          </span>
          <span className="text-gray-600 text-sm">/ Interactive Demo</span>
        </Link>
        <Link
          href="/#waitlist"
          className="text-xs font-mono-data px-4 py-1.5 rounded border border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-all"
        >
          REQUEST ACCESS
        </Link>
      </header>

      {/* Title bar */}
      <div className="px-6 py-4 border-b border-white/8 shrink-0">
        <h1 className="text-xl font-bold text-white">
          Prescriptive Operations Intelligence
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {INDUSTRY_CONFIGS.length * 35} live scenarios across {INDUSTRY_CONFIGS.length} industries — select any to explore
        </p>
      </div>

      {/* Industry Grid */}
      <div className="px-6 py-3 border-b border-white/8 shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {INDUSTRY_CONFIGS.map((ind) => (
            <button
              key={ind.slug}
              onClick={() => setSelectedIndustry(ind)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-data transition-all border ${
                ind.slug === selectedIndustry.slug
                  ? "border-[#FF4D00] bg-[#FF4D00]/10 text-[#FF4D00]"
                  : "border-white/10 text-gray-400 hover:border-white/25 hover:text-gray-200"
              }`}
            >
              <span>{INDUSTRY_ICONS[ind.name] ?? "🏭"}</span>
              <span className="hidden sm:inline">{ind.name.replace(" Manufacturing", "").replace(" and ", " & ")}</span>
              <span className="sm:hidden">{ind.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile scenario selector (horizontal scroll) */}
      <div className="md:hidden px-4 py-2 border-b border-white/8 shrink-0 overflow-x-auto">
        <div className="text-[10px] text-gray-500 font-mono-data tracking-wider mb-2">SCENARIOS</div>
        <div className="flex gap-2">
          {scenariosForIndustry.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`shrink-0 text-left px-3 py-2 rounded border transition-all ${
                s.id === activeScenario.id
                  ? "border-[#FF4D00] bg-[#FF4D00]/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="text-[10px] text-gray-600 font-mono-data">#{i + 1}</div>
              <div className="text-xs text-gray-300 leading-tight mt-0.5 whitespace-nowrap">{s.scenarioName}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario selector + demo panel */}
      <div className="flex-1 flex min-h-0">
        {/* Scenario list (desktop only) */}
        <div className="hidden md:flex w-64 shrink-0 border-r border-white/8 flex-col min-h-0">
          <div className="px-3 py-2 border-b border-white/8">
            <div className="text-[10px] text-gray-500 font-mono-data tracking-wider">SCENARIOS</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {scenariosForIndustry.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenarioId(s.id)}
                className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-all ${
                  s.id === activeScenario.id
                    ? "bg-white/5 border-l-2 border-l-[#FF4D00]"
                    : "hover:bg-white/3"
                }`}
              >
                <div className="text-[10px] text-gray-600 font-mono-data">#{i + 1}</div>
                <div className="text-xs text-gray-300 leading-tight mt-0.5">{s.scenarioName}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">{s.annualCostRange}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Demo engine */}
        <div className="flex-1 min-h-0 min-w-0">
          <DemoEngine scenario={activeScenario} />
        </div>
      </div>
    </div>
  );
}
