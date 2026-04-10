import type { DemoScenario } from "./demoTypes";
import type { IndustryConfig } from "./industryConfigs";

// ─── helpers ────────────────────────────────────────────────────────────────

function r(base: number, jitter = 0.08): number {
  return Math.round(base * (1 + (Math.random() - 0.5) * jitter) * 10) / 10;
}
function ri(base: number, jitter = 0.1): number {
  return Math.round(base * (1 + (Math.random() - 0.5) * jitter));
}
function money(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}
function costRange(base: number, m: number): string {
  const lo = Math.round(base * m * 0.7 / 100) * 100;
  const hi = Math.round(base * m * 1.4 / 100) * 100;
  return `${money(lo)}–${money(hi)}`;
}
function sensor(id: string, name: string, unit: string, norm: number, anom: number) {
  return { id, name, unit, normalValue: norm, anomalyValue: anom };
}
function opt(rank: 1|2|3, label: string, title: string,
  actions: {description:string,parameter:string,from:string|number,to:string|number}[],
  riskFrom: number|string, riskTo: number|string,
  costOfAction: number, costAvoided: number, prob: number, tradeoff: string) {
  return {
    rank, label, title, actions,
    riskReduction: { from: riskFrom, to: riskTo },
    costOfAction, costAvoided, netSavings: costAvoided - costOfAction,
    successProbability: prob, tradeoff,
  };
}
function proj(ind: IndustryConfig, baseCost: number, rate: number) {
  const inc = ri(8, 0.2);
  const avg = Math.round(baseCost * ind.costMult);
  const plat = Math.round(avg * inc * 0.06);
  return {
    incidentsPerYear: inc,
    avgCostPerIncident: avg,
    preventionRate: rate,
    platformCost: plat,
    netAnnualSavings: Math.round(avg * inc * rate - plat),
  };
}

// ─── 35 ARCHETYPE GENERATORS ──────────────────────────────────────────────

export type ArchetypeFn = (ind: IndustryConfig, idx: number) => DemoScenario;

const A: ArchetypeFn[] = [];

// 1 — Energy: Primary Heating Equipment
A.push((ind, i) => {
  const eq = ind.equipment[0];
  const base = ri(2_400_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${eq} Energy Optimization`,
    description: `The ${eq} operates 8–15% above thermally optimal setpoints as a conservative safety buffer. Operators default to high-energy profiles when pacing or quality uncertainty exists, wasting ${ind.energyUnit} on every production unit. Model-driven optimization could recover this margin safely.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Zone Temperature", ind.tempUnit||"°F", r(2250), r(2340)),
      sensor("s2", `${eq} Fuel Flow`, ind.energyUnit, r(185), r(212)),
      sensor("s3", "Thermal Efficiency", "%", r(72), r(61)),
      sensor("s4", "Exhaust O₂", "%", r(3.2), r(5.1)),
      sensor("s5", "Stack Temperature", ind.tempUnit||"°F", r(480), r(540)),
    ],
    riskMetric: { name: "Energy Intensity", unit: ind.energyUnit, normalValue: 100, warningThreshold: 115, criticalThreshold: 130, peakValue: 145 },
    predictiveAlert: { title: "Excess Energy Detected", message: `${eq} operating ${r(12,0.1)}% above optimal thermal profile. Cumulative waste trending to ${money(Math.round(base*ind.costMult/8760))} per hour.`, riskPercent: ri(74) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Model-Predictive Setpoint Trim",[
        {description:"Reduce zone temperature setpoint",parameter:"Zone Temp",from:r(2340),to:r(2265)},
        {description:"Trim fuel flow to match load",parameter:"Fuel Flow",from:r(212),to:r(188)},
      ], ri(74), ri(18), ri(42000), ri(Math.round(base*ind.costMult*0.28)), 0.88, "Minor production scheduling coordination required"),
      opt(2,"BALANCED","Combustion Air Ratio Tuning",[
        {description:"Adjust excess air coefficient",parameter:"Air/Fuel Ratio",from:r(1.18),to:r(1.08)},
      ], ri(74), ri(32), ri(18000), ri(Math.round(base*ind.costMult*0.18)), 0.82, "Requires combustion analyzer calibration"),
      opt(3,"CONSERVATIVE","Shift-Based Profile Scheduling",[
        {description:"Apply lighter energy profile during low-demand windows",parameter:"Profile",from:"Standard",to:"Optimized"},
      ], ri(74), ri(48), ri(8000), ri(Math.round(base*ind.costMult*0.10)), 0.94, "Savings depend on production scheduling consistency"),
    ],
    annualProjection: proj(ind, base, 0.74),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 2 — Predictive Maintenance: Rotating Equipment Bearing
A.push((ind, i) => {
  const eq = ind.equipment[1] || ind.equipment[0];
  const base = ri(1_800_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${eq} Bearing Failure Prevention`,
    description: `Bearing failures on the ${eq} cause unplanned stoppages averaging 18–36 hours. Vibration and temperature signatures precede failure by 72–120 hours but are rarely acted on systematically. Early intervention extends bearing life 3–5× and eliminates the unplanned downtime cost.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Bearing Vibration X", "mm/s", r(2.1), r(8.4)),
      sensor("s2", "Bearing Temperature", ind.tempUnit||"°F", r(145), r(194)),
      sensor("s3", "Lubrication Pressure", "psi", r(48), r(31)),
      sensor("s4", "Motor Current Draw", "A", r(142), r(168)),
      sensor("s5", "Shaft Runout", "μm", r(12), r(48)),
    ],
    riskMetric: { name: "Vibration Severity", unit: "mm/s", normalValue: 2.1, warningThreshold: 4.5, criticalThreshold: 7.1, peakValue: 11.2 },
    predictiveAlert: { title: "Bearing Degradation Detected", message: `${eq} drive-end bearing showing characteristic fault frequencies. Failure probability ${ri(82)}% within ${ri(96)} hours without intervention.`, riskPercent: ri(82) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Emergency Lubrication + Scheduled Swap",[
        {description:"Inject grease to bearing housing",parameter:"Lube Volume",from:"0 ml",to:`${ri(45)} ml`},
        {description:"Schedule bearing replacement at next opportunity",parameter:"Replacement Window",from:"unscheduled",to:"next shift change"},
      ], ri(82), ri(12), ri(28000), ri(Math.round(base*ind.costMult*0.32)), 0.91, "2-hour planned window required"),
      opt(2,"BALANCED","Vibration-Triggered Speed Reduction",[
        {description:"Reduce operating speed to limit progression",parameter:"Speed",from:`${ri(1480)} RPM`,to:`${ri(1200)} RPM`},
      ], ri(82), ri(38), ri(12000), ri(Math.round(base*ind.costMult*0.19)), 0.78, "Throughput reduced ~18% during intervention"),
      opt(3,"CONSERVATIVE","Continuous Monitoring Hold",[
        {description:"Increase sampling rate and alert threshold",parameter:"Sample Rate",from:"1 Hz","to":"10 Hz"},
      ], ri(82), ri(65), ri(2000), ri(Math.round(base*ind.costMult*0.08)), 0.62, "Does not prevent failure, only provides earlier warning"),
    ],
    annualProjection: proj(ind, base, 0.81),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 3 — Quality: Composition/Specification Drift
A.push((ind, i) => {
  const eq = ind.equipment[2] || ind.equipment[0];
  const base = ri(3_200_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${ind.product} Specification Drift`,
    description: `Gradual process drift causes ${ind.product} to approach specification limits undetected until lab results confirm out-of-spec product. By then, 2–6 hours of production must be quarantined or reworked. Real-time inferential modeling can predict out-of-spec conditions 45–90 minutes ahead.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Process Temperature", ind.tempUnit||"°F", r(185), r(194)),
      sensor("s2", "Feed Rate", ind.throughputUnit, r(100), r(112)),
      sensor("s3", "Key Parameter A", "%", r(98.2), r(96.1)),
      sensor("s4", "Key Parameter B", "ppm", r(42), r(78)),
      sensor("s5", "Product Density", "kg/m³", r(1042), r(1028)),
    ],
    riskMetric: { name: "Spec Deviation", unit: "%", normalValue: 0, warningThreshold: 60, criticalThreshold: 85, peakValue: 100 },
    predictiveAlert: { title: "Out-of-Spec Risk Detected", message: `Inferential model projects ${ind.product} will breach specification limits in ${ri(52)} minutes. Current batch at ${ri(78)}% spec deviation risk.`, riskPercent: ri(78) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL",`${eq} Parameter Correction`,[
        {description:"Adjust primary process variable",parameter:"Set Point A",from:r(185),to:r(179)},
        {description:"Trim secondary input",parameter:"Feed Rate",from:r(112),to:r(103)},
      ], ri(78), ri(14), ri(18000), ri(Math.round(base*ind.costMult*0.34)), 0.87, "15-minute stabilization window required"),
      opt(2,"BALANCED","Grade Hold + Blend Recovery",[
        {description:"Flag product for blending with prime batch",parameter:"Disposition",from:"Prime","to":"Hold/Blend"},
      ], ri(78), ri(42), ri(8000), ri(Math.round(base*ind.costMult*0.20)), 0.81, "Reduces effective yield by ~4%"),
      opt(3,"CONSERVATIVE","Increased Sampling Frequency",[
        {description:"Sample every 10 min instead of 30 min",parameter:"Sample Interval",from:"30 min","to":"10 min"},
      ], ri(78), ri(60), ri(3000), ri(Math.round(base*ind.costMult*0.09)), 0.72, "Does not correct drift, provides faster detection only"),
    ],
    annualProjection: proj(ind, base, 0.78),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 4 — Yield: Raw Material Recovery Optimization
A.push((ind, i) => {
  const chem = ind.chemicals[0];
  const base = ri(4_100_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${chem} Recovery Rate Optimization`,
    description: `${chem} recovery fluctuates 3–7% across shifts depending on operator decisions around feed rate, temperature, and retention time. Each 1% improvement in recovery translates directly to margin. Operators converge on conservative settings that sacrifice yield for stability.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Feed Rate", ind.throughputUnit, r(100), r(118)),
      sensor("s2", "Retention Time", "min", r(28), r(21)),
      sensor("s3", "Recovery Rate", "%", r(91.2), r(84.8)),
      sensor("s4", "Reject Stream", ind.throughputUnit, r(8.8), r(15.2)),
      sensor("s5", "pH / Reaction pH", "pH", r(7.2), r(6.4)),
    ],
    riskMetric: { name: "Recovery Loss", unit: "%", normalValue: 8.8, warningThreshold: 13, criticalThreshold: 17, peakValue: 22 },
    predictiveAlert: { title: "Recovery Rate Declining", message: `${chem} recovery at ${r(84.8)}% vs target ${r(91.5)}%. Current trajectory projects ${money(ri(Math.round(base*ind.costMult/2000)))} hourly loss.`, riskPercent: ri(71) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Retention Time + Feed Rate Rebalance",[
        {description:"Increase retention time",parameter:"Retention",from:`${ri(21)} min`,to:`${ri(27)} min`},
        {description:"Reduce feed rate to match capacity",parameter:"Feed Rate",from:r(118),to:r(103)},
      ], ri(71), ri(18), ri(24000), ri(Math.round(base*ind.costMult*0.38)), 0.86, "Throughput reduced 6% during optimization"),
      opt(2,"BALANCED","pH Correction",[
        {description:"Adjust reagent dosing to optimal pH",parameter:"pH Set Point",from:r(6.4),to:r(7.1)},
      ], ri(71), ri(35), ri(9000), ri(Math.round(base*ind.costMult*0.22)), 0.83, "Chemical cost increases ~2%"),
      opt(3,"CONSERVATIVE","Operator Advisory Only",[
        {description:"Display real-time recovery index on HMI",parameter:"Display Mode",from:"Off","to":"On"},
      ], ri(71), ri(55), ri(1500), ri(Math.round(base*ind.costMult*0.08)), 0.68, "Relies on operator action; inconsistent results"),
    ],
    annualProjection: proj(ind, base, 0.71),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 5 — Throughput: Bottleneck Identification
A.push((ind, i) => {
  const eq = ind.equipment[3] || ind.equipment[0];
  const base = ri(2_800_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${eq} Throughput Bottleneck`,
    description: `The ${eq} constrains overall line throughput, but its true capacity ceiling is unclear. Operators buffer upstream to avoid starving the bottleneck, creating WIP pileups. Constraint analysis shows the bottleneck could sustain 12–18% higher throughput with coordination changes upstream.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", `${eq} Utilization`, "%", r(94), r(98)),
      sensor("s2", "WIP Buffer Level", "%", r(35), r(88)),
      sensor("s3", "Upstream Rate", ind.throughputUnit, r(110), r(122)),
      sensor("s4", "Downstream Starvation", "events/hr", r(1.2), r(4.8)),
      sensor("s5", "Cycle Time", "sec", r(42), r(52)),
    ],
    riskMetric: { name: "Bottleneck Utilization", unit: "%", normalValue: 85, warningThreshold: 93, criticalThreshold: 97, peakValue: 100 },
    predictiveAlert: { title: "Constraint Near Saturation", message: `${eq} approaching 100% utilization. Queue depth ${ri(88)}%. System throughput will throttle within ${ri(22)} minutes.`, riskPercent: ri(85) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Upstream Pacing + Micro-Scheduling",[
        {description:"Throttle upstream to constraint rate",parameter:"Upstream Rate",from:r(122),to:r(108)},
        {description:"Implement CONWIP pull signal",parameter:"Control Mode",from:"Push","to":"Pull"},
      ], ri(85), ri(28), ri(35000), ri(Math.round(base*ind.costMult*0.29)), 0.84, "Requires upstream operator coordination"),
      opt(2,"BALANCED","Cycle Time Reduction on Bottleneck",[
        {description:"Optimize setup steps to reduce cycle",parameter:"Cycle Time",from:`${ri(52)} sec`,to:`${ri(44)} sec`},
      ], ri(85), ri(40), ri(18000), ri(Math.round(base*ind.costMult*0.18)), 0.79, "Requires process engineering review"),
      opt(3,"CONSERVATIVE","Buffer Re-Sizing",[
        {description:"Reduce WIP buffer limit to force pacing",parameter:"Buffer Limit",from:"88%","to":"50%"},
      ], ri(85), ri(60), ri(5000), ri(Math.round(base*ind.costMult*0.09)), 0.71, "May expose constraint to starve events"),
    ],
    annualProjection: proj(ind, base, 0.76),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 6 — Changeover Optimization
A.push((ind, i) => {
  const base = ri(1_900_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Product Changeover Time Reduction",
    description: `Changeovers between ${ind.product} grades take 45–120 minutes with high variability. The longest steps are not always on the critical path, and parallel execution opportunities exist. Every 10 minutes saved per changeover recovers significant capacity across a year of operations.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Changeover Duration", "min", r(68), r(98)),
      sensor("s2", "Purge Volume Used", ind.throughputUnit, r(42), r(78)),
      sensor("s3", "Time-to-Spec", "min", r(18), r(34)),
      sensor("s4", "First-Pass Yield Post-CO", "%", r(92), r(78)),
      sensor("s5", "Changeover Frequency", "CO/week", r(8.4), r(11.2)),
    ],
    riskMetric: { name: "Changeover Duration", unit: "min", normalValue: 45, warningThreshold: 70, criticalThreshold: 90, peakValue: 130 },
    predictiveAlert: { title: "Extended Changeover Detected", message: `Current changeover projected to reach ${ri(98)} min vs ${ri(58)} min target. ${money(ri(28000))} capacity cost accumulating.`, riskPercent: ri(72) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","SMED Parallel Execution",[
        {description:"Execute flush and mechanical setup in parallel",parameter:"Task Sequencing",from:"Serial","to":"Parallel"},
        {description:"Pre-stage grade B materials before grade A end",parameter:"Pre-staging",from:"None","to":"Active"},
      ], ri(72), ri(22), ri(28000), ri(Math.round(base*ind.costMult*0.31)), 0.83, "Requires SOP revision and training"),
      opt(2,"BALANCED","Purge Volume Optimization",[
        {description:"Reduce purge to lab-validated minimum",parameter:"Purge Vol",from:r(78),to:r(48)},
      ], ri(72), ri(40), ri(12000), ri(Math.round(base*ind.costMult*0.19)), 0.85, "Lab validation required before deployment"),
      opt(3,"CONSERVATIVE","Changeover Checklist Standardization",[
        {description:"Deploy digital checklist with time targets",parameter:"Checklist",from:"Paper","to":"Digital"},
      ], ri(72), ri(58), ri(4000), ri(Math.round(base*ind.costMult*0.08)), 0.78, "Behavioral change dependent; slower realization"),
    ],
    annualProjection: proj(ind, base, 0.72),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 7 — Compressed Air Leakage
A.push((ind, i) => {
  const base = ri(1_100_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Compressed Air System Leakage",
    description: `Compressed air leaks at fittings, hoses, and valves waste 20–35% of total air production in mature facilities. Compressors run harder to maintain header pressure, consuming excess electricity. Ultrasonic leak surveys and pressure-profiled repair scheduling can recover this silently.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Header Pressure", "psi", r(110), r(98)),
      sensor("s2", "Compressor Load", "%", r(68), r(88)),
      sensor("s3", "Leak Rate Estimate", "CFM", r(12), r(48)),
      sensor("s4", "Pressure Drop Rate", "psi/min", r(0.8), r(2.4)),
      sensor("s5", "Total Air Consumption", "CFM", r(840), r(1120)),
    ],
    riskMetric: { name: "Leakage Rate", unit: "%", normalValue: 8, warningThreshold: 18, criticalThreshold: 28, peakValue: 42 },
    predictiveAlert: { title: "Compressed Air Losses Elevated", message: `Estimated ${ri(28)}% of compressed air production lost to leaks. Compressor operating at ${ri(88)}% load to compensate. Annual waste: ${money(Math.round(base*ind.costMult*0.8))}.`, riskPercent: ri(68) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Ultrasonic Survey + Repair Campaign",[
        {description:"Deploy ultrasonic leak detector across all zones",parameter:"Survey Coverage",from:"0%","to":"100%"},
        {description:"Repair all leaks > 1 CFM this week",parameter:"Repair Threshold",from:"None","to":"1 CFM"},
      ], ri(68), ri(15), ri(22000), ri(Math.round(base*ind.costMult*0.68)), 0.91, "4-day survey + 2-day repair campaign required"),
      opt(2,"BALANCED","Zone Isolation + Priority Repair",[
        {description:"Isolate highest-loss zones during low-production windows",parameter:"Zone Valving",from:"Open","to":"Isolated"},
      ], ri(68), ri(35), ri(10000), ri(Math.round(base*ind.costMult*0.38)), 0.84, "Partial coverage only"),
      opt(3,"CONSERVATIVE","Compressor Pressure Set Point Reduction",[
        {description:"Reduce header pressure to minimum required",parameter:"Pressure SP",from:`${ri(110)} psi`,to:`${ri(95)} psi`},
      ], ri(68), ri(52), ri(2000), ri(Math.round(base*ind.costMult*0.14)), 0.88, "Does not fix leaks; reduces waste volume only"),
    ],
    annualProjection: proj(ind, base, 0.68),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 8 — Process Chemistry / Reagent Optimization
A.push((ind, i) => {
  const chem = ind.chemicals[1] || ind.chemicals[0];
  const base = ri(2_200_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${chem} Dosing Optimization`,
    description: `${chem} is dosed conservatively to guarantee process targets, resulting in systematic over-dosing of 15–25%. Operators increase dosing after any quality incident and rarely return to optimum. Model-based dosing could maintain targets with 18–22% less reagent spend.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", `${chem} Dose Rate`, "kg/hr", r(42), r(52)),
      sensor("s2", "Residual Concentration", "ppm", r(8.4), r(18.2)),
      sensor("s3", "Process Endpoint pH", "pH", r(7.4), r(8.1)),
      sensor("s4", "Consumption Index", "kg/ton", r(1.8), r(2.4)),
      sensor("s5", "Efficiency Ratio", "%", r(88), r(72)),
    ],
    riskMetric: { name: "Over-dose Index", unit: "%", normalValue: 0, warningThreshold: 15, criticalThreshold: 25, peakValue: 38 },
    predictiveAlert: { title: "Reagent Over-dose Detected", message: `${chem} dosed at ${ri(25)}% above model-optimal. Residual at ${r(18.2)} ppm vs target ${r(8.5)} ppm. Monthly overspend: ${money(ri(Math.round(base*ind.costMult/18)))}.`, riskPercent: ri(64) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Closed-Loop Model-Based Dosing",[
        {description:"Enable inferential controller for real-time dose adjustment",parameter:"Control Mode",from:"Manual","to":"Auto-MPC"},
        {description:"Set target residual band",parameter:"Residual Target",from:`${r(18.2)} ppm`,to:`${r(8.5)} ppm`},
      ], ri(64), ri(12), ri(32000), ri(Math.round(base*ind.costMult*0.42)), 0.86, "3-week commissioning period required"),
      opt(2,"BALANCED","Shift-Based Dose Reduction Protocol",[
        {description:"Reduce dose rate by 15% and monitor residual",parameter:"Dose Rate",from:`${r(52)} kg/hr`,to:`${r(44)} kg/hr`},
      ], ri(64), ri(30), ri(8000), ri(Math.round(base*ind.costMult*0.24)), 0.82, "Requires lab confirmation every 2 hours"),
      opt(3,"CONSERVATIVE","Operator Alert on Over-dose",[
        {description:"Alert when dose exceeds model optimal by >10%",parameter:"Alert Threshold",from:"Off","to":"10%"},
      ], ri(64), ri(48), ri(2000), ri(Math.round(base*ind.costMult*0.10)), 0.74, "Operator discipline required for consistent execution"),
    ],
    annualProjection: proj(ind, base, 0.64),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 9 — Pump Cavitation / Hydraulic
A.push((ind, i) => {
  const base = ri(1_400_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Process Pump Cavitation",
    description: `Transfer pumps cavitate intermittently when suction conditions deteriorate—hot liquids, high viscosity, or excessive flow draw. Operators notice noise but rarely intervene before damage occurs. Cavitation accelerates impeller wear 4–8× and can cause catastrophic seal failure within days.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Suction Pressure", "psia", r(18), r(9)),
      sensor("s2", "Pump Vibration", "mm/s", r(1.8), r(7.2)),
      sensor("s3", "Discharge Flow", ind.throughputUnit, r(100), r(78)),
      sensor("s4", "NPSH Available", "ft", r(22), r(8)),
      sensor("s5", "Motor Current", "A", r(88), r(104)),
    ],
    riskMetric: { name: "NPSH Margin", unit: "ft", normalValue: 22, warningThreshold: 12, criticalThreshold: 6, peakValue: 0 },
    predictiveAlert: { title: "Cavitation Risk — Pump P-101", message: `NPSH Available at ${r(8)} ft, approaching critical margin of 6 ft. Impeller damage risk ${ri(79)}% if unaddressed in next ${ri(4)} hours.`, riskPercent: ri(79) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Flow Reduction + Suction Head Increase",[
        {description:"Reduce pump speed to cut flow demand",parameter:"Pump Speed",from:`${ri(1780)} RPM`,to:`${ri(1450)} RPM`},
        {description:"Open suction header bypass",parameter:"Bypass Valve",from:"Closed","to":"20% Open"},
      ], ri(79), ri(18), ri(14000), ri(Math.round(base*ind.costMult*0.44)), 0.88, "Flow capacity reduced 18% for 4 hours"),
      opt(2,"BALANCED","Suction Strainer Inspection",[
        {description:"Check and clean suction strainer if fouled",parameter:"Strainer ΔP",from:`${r(4.2)} psi`,to:`${r(0.8)} psi`},
      ], ri(79), ri(42), ri(6000), ri(Math.round(base*ind.costMult*0.22)), 0.74, "Requires 45-min pump isolation"),
      opt(3,"CONSERVATIVE","Temperature Reduction to Reduce Vapor Pressure",[
        {description:"Drop feed temperature to lower vapor pressure",parameter:"Temp",from:`${ri(185)}°F`,to:`${ri(162)}°F`},
      ], ri(79), ri(55), ri(4000), ri(Math.round(base*ind.costMult*0.12)), 0.71, "Process quality impact must be assessed"),
    ],
    annualProjection: proj(ind, base, 0.79),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 10 — Cooling System Inefficiency
A.push((ind, i) => {
  const base = ri(1_600_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Cooling Water System Optimization",
    description: `Cooling towers and chillers operate below efficiency thresholds when approach temperatures drift or fouling develops. Condenser fouling of just 0.0002 ft²·hr·°F/Btu increases compressor energy by 8–15%. System-wide optimization of setpoints can recover this loss without any capital.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Cooling Tower Approach", "°F", r(8), r(18)),
      sensor("s2", "Condenser ΔT", "°F", r(10), r(18)),
      sensor("s3", "Chiller COP", "COP", r(4.8), r(3.2)),
      sensor("s4", "Cooling Water Temp", "°F", r(68), r(82)),
      sensor("s5", "Pump Energy", "kW", r(142), r(188)),
    ],
    riskMetric: { name: "System COP", unit: "COP", normalValue: 4.8, warningThreshold: 3.8, criticalThreshold: 3.0, peakValue: 2.2 },
    predictiveAlert: { title: "Cooling System Efficiency Low", message: `Chiller COP at ${r(3.2)} vs design ${r(4.8)}. Condenser fouling suspected. Excess energy cost ${money(ri(Math.round(base*ind.costMult/1800)))}/hour.`, riskPercent: ri(67) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Condenser Cleaning + Setpoint Reset",[
        {description:"Schedule online condenser brush cleaning",parameter:"Fouling Factor",from:"0.0003","to":"0.0001"},
        {description:"Optimize chilled water setpoint",parameter:"CHW Setpoint",from:`${ri(44)}°F`,to:`${ri(46)}°F`},
      ], ri(67), ri(14), ri(18000), ri(Math.round(base*ind.costMult*0.52)), 0.89, "4-hour condenser service required"),
      opt(2,"BALANCED","Cooling Tower Fan Speed Optimization",[
        {description:"Increase fan speed to reduce approach temp",parameter:"Fan Speed",from:"60%","to":"82%"},
      ], ri(67), ri(38), ri(8000), ri(Math.round(base*ind.costMult*0.28)), 0.84, "Fan energy offset partially reduces net savings"),
      opt(3,"CONSERVATIVE","Blow-Down Rate Increase",[
        {description:"Increase cycles of concentration reduction",parameter:"Blow-Down Rate",from:`${r(8)} gpm`,to:`${r(14)} gpm`},
      ], ri(67), ri(55), ri(3000), ri(Math.round(base*ind.costMult*0.11)), 0.82, "Water and treatment chemical cost increases"),
    ],
    annualProjection: proj(ind, base, 0.67),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 11 — Steam Trap / Steam System
A.push((ind, i) => {
  const base = ri(1_800_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Steam System Trap Failure",
    description: `Failed steam traps (stuck open) continuously vent live steam to condensate return, wasting 10–30 lbs of steam per trap per hour. A facility with 400 traps may have 15–25% failure rate. Systematic surveys and predictive trap monitoring eliminate silent losses that most plants never quantify.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Steam Header Pressure", "psig", r(150), r(132)),
      sensor("s2", "Condensate Return Rate", "%", r(82), r(61)),
      sensor("s3", "Trap Failure Count", "traps", r(12), r(48)),
      sensor("s4", "Boiler Load", "%", r(72), r(88)),
      sensor("s5", "Make-up Water Rate", "gpm", r(42), r(98)),
    ],
    riskMetric: { name: "Trap Failure Rate", unit: "%", normalValue: 5, warningThreshold: 15, criticalThreshold: 25, peakValue: 38 },
    predictiveAlert: { title: "Steam Loss Elevated", message: `${ri(48)} traps showing continuous-blow signatures. Estimated live steam loss ${r(4200)} lbs/hr. Boiler fuel overspend ${money(ri(Math.round(base*ind.costMult/3200)))}/hr.`, riskPercent: ri(72) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Trap Survey + Same-Day Replacement",[
        {description:"Infrared + ultrasonic survey all traps",parameter:"Survey",from:"0%","to":"100%"},
        {description:"Replace all failed-open traps within 48 hours",parameter:"Repair Timeline",from:"Deferred","to":"48 hrs"},
      ], ri(72), ri(12), ri(32000), ri(Math.round(base*ind.costMult*0.64)), 0.92, "Access required to all trap locations"),
      opt(2,"BALANCED","High-Loss Zone Priority",[
        {description:"Repair top 20 highest-loss traps first",parameter:"Priority",from:"None","to":"Loss-Ranked"},
      ], ri(72), ri(32), ri(14000), ri(Math.round(base*ind.costMult*0.38)), 0.86, "Partial recovery; remaining traps still losing"),
      opt(3,"CONSERVATIVE","Boiler Efficiency Compensation",[
        {description:"Reduce boiler firing rate to match load",parameter:"Boiler Load",from:"88%","to":"74%"},
      ], ri(72), ri(58), ri(3000), ri(Math.round(base*ind.costMult*0.12)), 0.79, "Masks problem; does not address trap losses"),
    ],
    annualProjection: proj(ind, base, 0.72),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 12 — Startup Optimization
A.push((ind, i) => {
  const eq = ind.equipment[0];
  const base = ri(2_100_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${eq} Startup Time Reduction`,
    description: `${eq} startups after planned or unplanned outages take 60–180 minutes to reach stable operating conditions. The warm-up trajectory is operator-dependent and often far from optimal. A prescriptive startup sequence could safely reduce time-to-production by 25–40%.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", `${eq} Temperature`, ind.tempUnit||"°F", r(400), r(1200)),
      sensor("s2", "Ramp Rate", `${ind.tempUnit||"°F"}/min`, r(8), r(4)),
      sensor("s3", "Time to Stable", "min", r(95), r(145)),
      sensor("s4", "Off-Spec Production", ind.throughputUnit, r(8), r(28)),
      sensor("s5", "Energy During Startup", ind.energyUnit, r(142), r(218)),
    ],
    riskMetric: { name: "Startup Duration", unit: "min", normalValue: 60, warningThreshold: 90, criticalThreshold: 120, peakValue: 180 },
    predictiveAlert: { title: "Extended Startup in Progress", message: `${eq} startup at ${ri(88)} min with ${ri(32)} min remaining at current ramp rate. Off-spec product accumulating: ${money(ri(Math.round(base*ind.costMult/4200)))}/min loss.`, riskPercent: ri(69) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Model-Optimized Ramp Trajectory",[
        {description:"Follow prescriptive ramp curve",parameter:"Ramp Profile",from:"Conservative","to":"Optimized"},
        {description:"Pre-heat ancillary systems in parallel",parameter:"Pre-heat",from:"Sequential","to":"Parallel"},
      ], ri(69), ri(18), ri(28000), ri(Math.round(base*ind.costMult*0.36)), 0.84, "Requires SOP change and operator certification"),
      opt(2,"BALANCED","Checklist-Driven Parallel Steps",[
        {description:"Execute 4 startup steps concurrently vs serially",parameter:"Step Sequencing",from:"Serial","to":"Parallel"},
      ], ri(69), ri(38), ri(12000), ri(Math.round(base*ind.costMult*0.20)), 0.81, "Coordination complexity increases slightly"),
      opt(3,"CONSERVATIVE","Pre-Warm Retention Protocol",[
        {description:"Keep equipment at minimum temp between jobs",parameter:"Hold Temp",from:"Ambient","to":"Warm-Hold"},
      ], ri(69), ri(50), ri(8000), ri(Math.round(base*ind.costMult*0.12)), 0.88, "Idle energy cost partially offsets savings"),
    ],
    annualProjection: proj(ind, base, 0.69),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 13 — Compliance: Emissions Limit Approach
A.push((ind, i) => {
  const base = ri(3_800_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Emissions Compliance Risk Management",
    description: `Stack emissions approach permitted limits during peak production or when auxiliary equipment activates simultaneously. Current practice relies on manual monitoring and reactive shutdowns. A predictive emissions model can provide 30–60 minutes warning, enabling process adjustments before any exceedance occurs.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Stack NOₓ", "ppm", r(82), r(148)),
      sensor("s2", "Stack Particulate", "mg/Nm³", r(18), r(42)),
      sensor("s3", "SO₂ Emission Rate", "kg/hr", r(12), r(28)),
      sensor("s4", "Combustion Temperature", ind.tempUnit||"°F", r(1850), r(2020)),
      sensor("s5", "O₂ Stack Content", "%", r(3.8), r(2.1)),
    ],
    riskMetric: { name: "Permit Utilization", unit: "%", normalValue: 55, warningThreshold: 75, criticalThreshold: 90, peakValue: 100 },
    predictiveAlert: { title: "Emissions Exceedance Risk", message: `NOₓ at ${ri(82)}% of permit limit. Current trajectory projects exceedance in ${ri(38)} minutes. Regulatory fine risk: ${money(ri(Math.round(base*ind.costMult*0.4)))}.`, riskPercent: ri(84) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Combustion Trim + Load Reduction",[
        {description:"Adjust air/fuel ratio to minimize NOₓ",parameter:"Excess Air",from:`${r(2.1)}%`,to:`${r(4.2)}%`},
        {description:"Reduce load to drop below 80% permit",parameter:"Production Rate",from:"100%","to":"88%"},
      ], ri(84), ri(18), ri(18000), ri(Math.round(base*ind.costMult*0.48)), 0.94, "2% throughput reduction for 2 hours"),
      opt(2,"BALANCED","SCR Injection Increase",[
        {description:"Increase urea injection rate",parameter:"Urea Rate",from:`${r(42)} L/hr`,to:`${r(68)} L/hr`},
      ], ri(84), ri(32), ri(8000), ri(Math.round(base*ind.costMult*0.28)), 0.88, "Chemical cost increases; catalyst monitoring required"),
      opt(3,"CONSERVATIVE","Production Rate Hold",[
        {description:"Hold at current rate and monitor continuously",parameter:"Rate",from:"Increasing","to":"Hold"},
      ], ri(84), ri(64), ri(2000), ri(Math.round(base*ind.costMult*0.12)), 0.72, "Does not reduce emissions; relies on conditions improving"),
    ],
    annualProjection: proj(ind, base, 0.84),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 14 — Vibration / Motor Drive
A.push((ind, i) => {
  const base = ri(1_500_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Drive Motor Electrical Fault Detection",
    description: `VFD-driven motors develop winding insulation faults and bearing defects that manifest in current signature analysis months before failure. Undetected faults cause unplanned motor replacements and 12–48 hour downtime events. Continuous motor current analysis detects these faults at an actionable stage.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Motor Winding Temp", "°F", r(175), r(218)),
      sensor("s2", "Phase Imbalance", "%", r(1.2), r(5.8)),
      sensor("s3", "THD Current", "%", r(4.2), r(12.4)),
      sensor("s4", "Insulation Resistance", "MΩ", r(480), r(82)),
      sensor("s5", "Motor Vibration", "mm/s", r(1.4), r(6.2)),
    ],
    riskMetric: { name: "Motor Fault Index", unit: "%", normalValue: 5, warningThreshold: 35, criticalThreshold: 65, peakValue: 95 },
    predictiveAlert: { title: "Motor Electrical Fault Progressing", message: `Motor M-208 showing winding insulation degradation (${ri(82)} MΩ, down from ${ri(480)} MΩ). Fault index at ${ri(68)}%. Failure within ${ri(14)} days without action.`, riskPercent: ri(76) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Scheduled Rewind + Replacement",[
        {description:"Book motor rewind during planned outage",parameter:"Maintenance Window",from:"Unscheduled","to":"Next Shutdown"},
        {description:"Stage spare motor for hot-swap",parameter:"Spare",from:"Not staged","to":"Staged"},
      ], ri(76), ri(12), ri(24000), ri(Math.round(base*ind.costMult*0.52)), 0.91, "Outage window required for swap"),
      opt(2,"BALANCED","Thermal Derating",[
        {description:"Reduce motor load to limit temperature",parameter:"Load Limit",from:"100%","to":"75%"},
      ], ri(76), ri(38), ri(8000), ri(Math.round(base*ind.costMult*0.26)), 0.76, "Throughput impact; does not fix fault"),
      opt(3,"CONSERVATIVE","Enhanced Monitoring Mode",[
        {description:"Increase measurement frequency to every 5 min",parameter:"Monitor Rate",from:"1 hr","to":"5 min"},
      ], ri(76), ri(60), ri(1500), ri(Math.round(base*ind.costMult*0.09)), 0.62, "Provides advance warning only"),
    ],
    annualProjection: proj(ind, base, 0.76),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 15 — Batch Failure Prevention
A.push((ind, i) => {
  const eq = ind.equipment[0];
  const base = ri(4_800_000, 0.35);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Batch Failure Risk Reduction",
    description: `Failed batches represent the highest single-event cost in ${ind.name.toLowerCase()}. Failures occur when process deviations in temperature, time, or composition go undetected until end-of-batch testing. Mid-batch inferential models can predict failure 30–90 minutes before it's certain, enabling corrective action within the batch.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", `${eq} Temperature`, ind.tempUnit||"°F", r(185), r(196)),
      sensor("s2", "Reaction pH", "pH", r(6.8), r(7.8)),
      sensor("s3", "Batch Progress", "%", r(65), r(65)),
      sensor("s4", "Endpoint Predictor", "%", r(92), r(71)),
      sensor("s5", "Agitation Speed", "RPM", r(180), r(148)),
    ],
    riskMetric: { name: "Batch Failure Risk", unit: "%", normalValue: 5, warningThreshold: 30, criticalThreshold: 60, peakValue: 95 },
    predictiveAlert: { title: "Batch Failure Probability High", message: `Batch ${`B-${ri(4812)}`} shows ${ri(71)}% failure probability based on current trajectory. ${ri(35)} min remain to intervene before no-recovery point.`, riskPercent: ri(71) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","In-Batch Corrective Action",[
        {description:"Adjust temperature to bring back to optimal curve",parameter:"Temp Set Point",from:r(196),to:r(184)},
        {description:"Add correction dose of reagent",parameter:"Correction Dose",from:"0","to":`${r(4.2)} kg`},
      ], ri(71), ri(18), ri(48000), ri(Math.round(base*ind.costMult*0.42)), 0.79, "Must execute within next 35 minutes"),
      opt(2,"BALANCED","Extended Batch Time",[
        {description:"Extend batch time to compensate for slow progression",parameter:"Batch Time",from:`${ri(8)} hr`,to:`${ri(10)} hr`},
      ], ri(71), ri(40), ri(12000), ri(Math.round(base*ind.costMult*0.22)), 0.72, "Reduces throughput by one batch cycle"),
      opt(3,"CONSERVATIVE","Controlled Batch Termination",[
        {description:"End batch at current stage and recover materials",parameter:"Disposition",from:"Continue","to":"Controlled End"},
      ], ri(71), ri(58), ri(8000), ri(Math.round(base*ind.costMult*0.35)), 0.88, "Recovers ~60% of material value vs total loss"),
    ],
    annualProjection: proj(ind, base, 0.71),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 16 — Heat Exchanger Fouling
A.push((ind, i) => {
  const base = ri(1_700_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Heat Exchanger Fouling Management",
    description: `Heat exchanger fouling increases thermal resistance over time, requiring higher utilities to maintain process temperatures or causing product quality degradation. Most facilities clean on fixed schedules rather than condition, cleaning too early (wasting downtime) or too late (accumulating excess energy cost).`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "HX Hot Side Inlet Temp", "°F", r(320), r(320)),
      sensor("s2", "HX Hot Side Outlet Temp", "°F", r(185), r(212)),
      sensor("s3", "HX Cold Side Outlet Temp", "°F", r(145), r(128)),
      sensor("s4", "Overall U Value", "BTU/hr·ft²·°F", r(280), r(168)),
      sensor("s5", "Fouling Resistance", "ft²·hr·°F/BTU", r(0.0001), r(0.0004)),
    ],
    riskMetric: { name: "Fouling Factor", unit: "×10⁻⁴", normalValue: 1.0, warningThreshold: 2.5, criticalThreshold: 4.0, peakValue: 6.0 },
    predictiveAlert: { title: "Heat Exchanger Fouling Critical", message: `HX E-204 fouling factor at ${r(0.0004)} ft²·hr·°F/BTU. U-value reduced ${ri(40)}%. Energy penalty ${money(ri(Math.round(base*ind.costMult/2800)))}/hr.`, riskPercent: ri(73) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Predictive CIP Cleaning",[
        {description:"Schedule CIP during next planned downtime",parameter:"Clean Schedule",from:"Fixed 90-day","to":"Condition-Based"},
        {description:"Pre-heat cleaning circuit",parameter:"CIP Temp",from:"Ambient","to":` ${ri(175)}°F`},
      ], ri(73), ri(12), ri(22000), ri(Math.round(base*ind.costMult*0.58)), 0.91, "6-hour CIP cycle required"),
      opt(2,"BALANCED","Utility Compensation",[
        {description:"Increase hot utility temperature to maintain duty",parameter:"Utility Temp",from:`${ri(320)}°F`,to:`${ri(340)}°F`},
      ], ri(73), ri(40), ri(8000), ri(Math.round(base*ind.costMult*0.28)), 0.88, "Higher energy cost partially offsets savings"),
      opt(3,"CONSERVATIVE","Velocity Increase",[
        {description:"Increase tube-side velocity to shear fouling deposits",parameter:"Flow Rate",from:"100%","to":"130%"},
      ], ri(73), ri(55), ri(4000), ri(Math.round(base*ind.costMult*0.12)), 0.72, "Pump energy increases; limited effect on established fouling"),
    ],
    annualProjection: proj(ind, base, 0.73),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 17 — Product Mix / Grade Transition
A.push((ind, i) => {
  const base = ri(2_600_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Product Mix & Grade Sequencing",
    description: `Sub-optimal grade sequencing forces unnecessary transitions, creates excess rework between incompatible products, and leaves high-margin orders waiting while lower-margin grades run. Optimization of the production sequence can increase margin per shift by 8–18% with no capital investment.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Schedule Adherence", "%", r(78), r(58)),
      sensor("s2", "Transition Waste", ind.throughputUnit, r(12), r(38)),
      sensor("s3", "Grade A Production", "%", r(42), r(24)),
      sensor("s4", "Order Backlog", "days", r(3.2), r(7.8)),
      sensor("s5", "Margin/Shift", "$/shift", r(48000), r(32000)),
    ],
    riskMetric: { name: "Margin Capture", unit: "%", normalValue: 100, warningThreshold: 82, criticalThreshold: 68, peakValue: 50 },
    predictiveAlert: { title: "Sub-Optimal Production Sequence", message: `Current grade sequence generating ${ri(32)}% margin shortfall vs optimized schedule. ${money(ri(Math.round(base*ind.costMult/52/5)))} weekly shortfall being realized.`, riskPercent: ri(68) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Algorithm-Optimized Grade Sequence",[
        {description:"Re-sequence next 8 grades by margin × compatibility",parameter:"Sequence",from:"Manual","to":"Optimized"},
        {description:"Pull forward high-margin Grade A orders",parameter:"Grade A Priority",from:"FIFO","to":"Margin-Priority"},
      ], ri(68), ri(18), ri(28000), ri(Math.round(base*ind.costMult*0.31)), 0.83, "Customer delivery date commitments must be respected"),
      opt(2,"BALANCED","Compatible Grade Grouping",[
        {description:"Group chemically compatible grades to eliminate flush",parameter:"Grouping",from:"None","to":"Compatibility-Based"},
      ], ri(68), ri(36), ri(12000), ri(Math.round(base*ind.costMult*0.18)), 0.86, "Partial optimization; some constraints remain"),
      opt(3,"CONSERVATIVE","Manual Sequence Review",[
        {description:"Planner reviews and adjusts sequence with advisory tool",parameter:"Planner Mode",from:"Unaided","to":"Assisted"},
      ], ri(68), ri(52), ri(4000), ri(Math.round(base*ind.costMult*0.09)), 0.74, "Relies on planner judgment; variable results"),
    ],
    annualProjection: proj(ind, base, 0.68),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 18 — Water / Wastewater
A.push((ind, i) => {
  const base = ri(1_200_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Process Water Consumption Reduction",
    description: `Process water is consumed well above the theoretical minimum in rinse, CIP, and cooling applications. Operators use high-volume water as a quality safety buffer. A systematic water pinch analysis and real-time flow control can reduce consumption 20–35% while maintaining all quality specifications.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Total Water Use", "gal/hr", r(48000), r(68000)),
      sensor("s2", "CIP Water Volume", "gal/cycle", r(2800), r(4200)),
      sensor("s3", "Rinse Conductivity", "µS/cm", r(28), r(8)),
      sensor("s4", "Water Use Intensity", "gal/unit", r(12.4), r(18.8)),
      sensor("s5", "Effluent Volume", "gal/hr", r(38000), r(58000)),
    ],
    riskMetric: { name: "Water Intensity", unit: "gal/unit", normalValue: 12.4, warningThreshold: 16, criticalThreshold: 20, peakValue: 26 },
    predictiveAlert: { title: "Water Usage Above Target", message: `Water intensity at ${r(18.8)} gal/unit vs target ${r(12.4)}. Monthly cost overrun: ${money(ri(Math.round(base*ind.costMult/18)))}.`, riskPercent: ri(62) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","CIP Optimization + Rinse Endpoint",[
        {description:"Switch to conductivity-based rinse endpoint",parameter:"Rinse Control",from:"Time-Based","to":"Conductivity"},
        {description:"Reduce CIP water volume by 25%",parameter:"CIP Volume",from:`${ri(4200)} gal`,to:`${ri(3100)} gal`},
      ], ri(62), ri(18), ri(18000), ri(Math.round(base*ind.costMult*0.44)), 0.86, "Lab validation of cleaning efficacy required"),
      opt(2,"BALANCED","Water Recirculation on Cooling",[
        {description:"Recirculate non-contact cooling water",parameter:"Cooling Mode",from:"Once-Through","to":"Recirculate"},
      ], ri(62), ri(35), ri(12000), ri(Math.round(base*ind.costMult*0.26)), 0.88, "Fouling management required"),
      opt(3,"CONSERVATIVE","Flow Meter Audit",[
        {description:"Audit all meters for accuracy and unauthorized draw",parameter:"Audit",from:"None","to":"Full Audit"},
      ], ri(62), ri(52), ri(4000), ri(Math.round(base*ind.costMult*0.10)), 0.82, "One-time benefit; no ongoing optimization"),
    ],
    annualProjection: proj(ind, base, 0.62),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 19 — Safety Incident Prevention
A.push((ind, i) => {
  const base = ri(5_200_000, 0.4);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "High-Risk Process Condition Prevention",
    description: `Dangerous process conditions—overpressure, thermal runaway, or hazardous concentration buildup—develop along predictable trajectories. Operators currently rely on fixed alarms that trigger reactively. Predictive safety models can detect precursor patterns 15–45 minutes before conditions become dangerous.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Vessel Pressure", "psig", r(142), r(198)),
      sensor("s2", "Temperature Rate-of-Rise", "°F/min", r(2.1), r(8.8)),
      sensor("s3", "Gas Detector Zone A", "% LEL", r(4), r(28)),
      sensor("s4", "Relief Valve Status", "events/hr", r(0), r(3)),
      sensor("s5", "Pressure Safety Margin", "%", r(65), r(22)),
    ],
    riskMetric: { name: "Safety Margin", unit: "%", normalValue: 65, warningThreshold: 40, criticalThreshold: 22, peakValue: 5 },
    predictiveAlert: { title: "Safety Precursor Pattern Detected", message: `Combined pressure and temperature trajectory matches ${ri(89)}% similarity to 3 prior incident precursors. Safety margin at ${ri(22)}%. Recommended action window: ${ri(18)} min.`, riskPercent: ri(89) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Controlled Rate Reduction",[
        {description:"Reduce feed rate to drop heat generation",parameter:"Feed Rate",from:"100%","to":"65%"},
        {description:"Increase cooling duty",parameter:"Cooling Flow",from:`${r(280)} gpm`,to:`${r(420)} gpm`},
      ], ri(89), ri(12), ri(28000), ri(Math.round(base*ind.costMult*0.48)), 0.96, "18% production loss for ~2 hours"),
      opt(2,"BALANCED","Staged Depressurization",[
        {description:"Vent to flare at controlled rate",parameter:"Vent Rate",from:"0","to":`${r(2400)} scfh`},
      ], ri(89), ri(28), ri(18000), ri(Math.round(base*ind.costMult*0.28)), 0.91, "Flare gas cost; environmental release"),
      opt(3,"CONSERVATIVE","Manual Monitoring + Standby",[
        {description:"Place process on manual control with operator watch",parameter:"Control Mode",from:"Auto","to":"Manual"},
      ], ri(89), ri(55), ri(4000), ri(Math.round(base*ind.costMult*0.14)), 0.72, "Human vigilance required; lower reliability than automated response"),
    ],
    annualProjection: proj(ind, base, 0.89),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 20 — Lubrication Management
A.push((ind, i) => {
  const eq = ind.equipment[1] || ind.equipment[0];
  const base = ri(1_100_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${eq} Lubrication Optimization`,
    description: `Over-lubrication and under-lubrication both cause failures: excess grease overheats bearings, insufficient grease allows metal-to-metal contact. Fixed-interval lubrication ignores actual operating conditions. Condition-based lubrication programs extend bearing life 2–4× while reducing lubricant consumption 30–50%.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Bearing Temp Trend", "°F/hr", r(0.8), r(4.2)),
      sensor("s2", "Lubricant Pressure", "psi", r(42), r(28)),
      sensor("s3", "Oil Particle Count", "particles/mL", r(800), r(4800)),
      sensor("s4", "Grease Gun Events", "per shift", r(3.2), r(8.8)),
      sensor("s5", "Oil Viscosity Index", "cSt", r(68), r(52)),
    ],
    riskMetric: { name: "Lube Condition Index", unit: "%", normalValue: 90, warningThreshold: 65, criticalThreshold: 45, peakValue: 20 },
    predictiveAlert: { title: "Lubrication Anomaly Detected", message: `${eq} bearing lube condition at ${ri(45)}%. Oil particle count elevated ${ri(6)}×. Wear rate accelerating — estimated failure in ${ri(18)} days without re-lube.`, riskPercent: ri(66) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Condition-Based Re-lube + Oil Analysis",[
        {description:"Re-lubricate bearing with specified grease volume",parameter:"Grease Volume",from:"0 ml","to":`${ri(38)} ml`},
        {description:"Submit oil sample for laboratory analysis",parameter:"Oil Analysis",from:"None","to":"Submitted"},
      ], ri(66), ri(15), ri(8000), ri(Math.round(base*ind.costMult*0.48)), 0.88, "Bearing must be accessible; 20-min procedure"),
      opt(2,"BALANCED","Centralized Auto-lube Activation",[
        {description:"Enable auto-lube system for affected bearing",parameter:"Auto-lube",from:"Off","to":"On"},
      ], ri(66), ri(35), ri(4000), ri(Math.round(base*ind.costMult*0.28)), 0.82, "Auto-lube system must be charged and calibrated"),
      opt(3,"CONSERVATIVE","Speed Reduction to Limit Wear",[
        {description:"Reduce equipment speed to lower frictional heat",parameter:"Speed",from:`${ri(1480)} RPM`,to:`${ri(1200)} RPM`},
      ], ri(66), ri(52), ri(2000), ri(Math.round(base*ind.costMult*0.12)), 0.74, "Throughput impact; does not address root cause"),
    ],
    annualProjection: proj(ind, base, 0.66),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 21 — Valve & Actuator Degradation
A.push((ind, i) => {
  const base = ri(1_300_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Control Valve Performance Degradation",
    description: `Control valve stiction and hysteresis cause oscillating process control loops, forcing setpoint hunting and producing output variability. A valve with 3–5% deadband can cause PID loops to cycle continuously, wasting energy and degrading quality. Valve diagnostics identify degraded assets before they destabilize process control.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Valve Position Error", "%", r(0.8), r(4.8)),
      sensor("s2", "Loop Oscillation Period", "min", r(0), r(8.4)),
      sensor("s3", "Process Variable StdDev", "%", r(0.4), r(2.8)),
      sensor("s4", "Actuator Air Consumption", "scfm", r(2.4), r(8.8)),
      sensor("s5", "Valve Travel", "%/hr", r(180), r(480)),
    ],
    riskMetric: { name: "Valve Deadband", unit: "%", normalValue: 0.5, warningThreshold: 2.0, criticalThreshold: 4.0, peakValue: 8.0 },
    predictiveAlert: { title: "Control Loop Oscillation Detected", message: `Flow control loop FC-204 oscillating with ${r(8.4)}-min period. Valve CV-204 shows ${r(4.8)}% stiction. Process variability ${ri(7)}× above target.`, riskPercent: ri(69) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Valve Replacement During Next Outage",[
        {description:"Stage replacement valve and schedule during next window",parameter:"Replacement",from:"Deferred","to":"Scheduled"},
        {description:"Apply valve positioner diagnostic mode",parameter:"Positioner Mode",from:"Normal","to":"Diagnostic"},
      ], ri(69), ri(14), ri(22000), ri(Math.round(base*ind.costMult*0.44)), 0.89, "6-hour outage window required for replacement"),
      opt(2,"BALANCED","Positioner Recalibration",[
        {description:"Recalibrate valve positioner zero and span",parameter:"Calibration",from:"As-Found","to":"Recalibrated"},
      ], ri(69), ri(38), ri(6000), ri(Math.round(base*ind.costMult*0.24)), 0.78, "Temporary improvement only; valve still degraded"),
      opt(3,"CONSERVATIVE","Loop Detuning",[
        {description:"Reduce PID gain to minimize oscillation amplitude",parameter:"Gain",from:r(1.8),to:r(0.9)},
      ], ri(69), ri(55), ri(2000), ri(Math.round(base*ind.costMult*0.10)), 0.82, "Slower response to disturbances; stability tradeoff"),
    ],
    annualProjection: proj(ind, base, 0.69),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 22 — Energy Peak Demand Management
A.push((ind, i) => {
  const base = ri(2_000_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Electrical Peak Demand Reduction",
    description: `Demand charges can represent 30–50% of industrial electricity bills. Simultaneous startup of multiple large motors or equipment creates peak demand spikes that set monthly billing peaks from a single 15-minute interval. Load scheduling and stagger-start controls can cut demand charges 15–25%.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Peak Demand", "kW", r(4200), r(6800)),
      sensor("s2", "15-min Demand Interval", "kW", r(3800), r(6200)),
      sensor("s3", "Large Motor Coincidence", "count", r(2), r(6)),
      sensor("s4", "Power Factor", "PF", r(0.94), r(0.81)),
      sensor("s5", "Demand Charge Rate", "$/kW", r(18), r(18)),
    ],
    riskMetric: { name: "Demand Spike Risk", unit: "kW", normalValue: 4200, warningThreshold: 5500, criticalThreshold: 6500, peakValue: 8000 },
    predictiveAlert: { title: "Demand Spike Imminent", message: `${ri(4)} large loads scheduled to start simultaneously in ${ri(8)} min. Predicted demand: ${ri(6800)} kW. Monthly bill impact: ${money(ri(Math.round(base*ind.costMult*0.18)))}.`, riskPercent: ri(77) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Automated Stagger-Start Sequencing",[
        {description:"Stagger motor starts by 90-second intervals",parameter:"Start Sequence",from:"Simultaneous","to":"Staggered 90s"},
        {description:"Pre-cool high-thermal loads before peak window",parameter:"Pre-cooling",from:"None","to":"Active"},
      ], ri(77), ri(22), ri(24000), ri(Math.round(base*ind.costMult*0.38)), 0.88, "Some production timing adjustments required"),
      opt(2,"BALANCED","Large Load Deferral",[
        {description:"Defer non-critical loads outside demand window",parameter:"Deferral List",from:"None","to":"4 loads"},
      ], ri(77), ri(38), ri(8000), ri(Math.round(base*ind.costMult*0.22)), 0.84, "Operational flexibility required from production team"),
      opt(3,"CONSERVATIVE","Power Factor Correction",[
        {description:"Switch in capacitor bank to improve power factor",parameter:"PF",from:"0.81","to":"0.95"},
      ], ri(77), ri(58), ri(4000), ri(Math.round(base*ind.costMult*0.09)), 0.91, "Addresses reactive charge only; does not cut demand peaks"),
    ],
    annualProjection: proj(ind, base, 0.77),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 23 — Conveyor / Material Handling
A.push((ind, i) => {
  const base = ri(1_400_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Conveyor System Reliability",
    description: `Conveyor belt failures and misalignment cause line stoppages that propagate through connected processes. Belt tracking failures, splice failures, and idler seizures account for 35–55% of unplanned downtime in material-intensive facilities. Predictive tension and alignment monitoring prevents these events.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Belt Tension", "kN", r(42), r(68)),
      sensor("s2", "Belt Tracking Error", "mm", r(8), r(42)),
      sensor("s3", "Idler Temperature", "°F", r(105), r(168)),
      sensor("s4", "Drive Torque", "Nm", r(1840), r(2480)),
      sensor("s5", "Slip Detection", "%", r(0.2), r(3.8)),
    ],
    riskMetric: { name: "Belt Failure Risk", unit: "%", normalValue: 8, warningThreshold: 35, criticalThreshold: 65, peakValue: 95 },
    predictiveAlert: { title: "Belt Failure Precursor Detected", message: `Conveyor C-8 tracking at ${ri(42)} mm off-center. Idler temperature elevated at ${ri(168)}°F. Estimated time to stoppage: ${ri(4)} hours.`, riskPercent: ri(74) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Alignment Correction + Idler Replacement",[
        {description:"Adjust tracking assembly to re-center belt",parameter:"Tracking",from:`${ri(42)} mm off`,to:"<5 mm"},
        {description:"Replace hot idlers during next brief stop",parameter:"Idlers",from:"Seized","to":"Replaced"},
      ], ri(74), ri(14), ri(16000), ri(Math.round(base*ind.costMult*0.52)), 0.89, "2-hour maintenance window required"),
      opt(2,"BALANCED","Speed Reduction + Monitoring",[
        {description:"Reduce belt speed to cut tension and thermal load",parameter:"Speed",from:"100%","to":"78%"},
      ], ri(74), ri(38), ri(6000), ri(Math.round(base*ind.costMult*0.26)), 0.78, "Throughput reduced; does not fix alignment"),
      opt(3,"CONSERVATIVE","Enhanced Monitoring + Alert",[
        {description:"Increase polling to 1-minute intervals",parameter:"Monitor Rate",from:"15 min","to":"1 min"},
      ], ri(74), ri(60), ri(1500), ri(Math.round(base*ind.costMult*0.08)), 0.62, "Provides earlier warning only"),
    ],
    annualProjection: proj(ind, base, 0.74),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 24 — Supply Chain / Raw Material Variability
A.push((ind, i) => {
  const chem = ind.chemicals[0];
  const base = ri(2_800_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${chem} Feed Variability Management`,
    description: `Incoming ${chem} varies in composition, moisture, and key properties from batch to batch. Operators use conservative process settings to accommodate worst-case feed, leaving significant efficiency on the table when feed quality is good. Real-time feed characterization enables adaptive process control.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", `${chem} Moisture`, "%", r(8.4), r(14.2)),
      sensor("s2", `${chem} Key Property`, "%", r(92), r(84)),
      sensor("s3", "Feed Consistency Index", "%", r(88), r(62)),
      sensor("s4", "Process Adjustment Freq", "times/hr", r(2.1), r(8.4)),
      sensor("s5", "Yield Impact", "%", r(0), r(-4.8)),
    ],
    riskMetric: { name: "Feed Variability Index", unit: "%", normalValue: 5, warningThreshold: 15, criticalThreshold: 25, peakValue: 40 },
    predictiveAlert: { title: "Feed Quality Deviation", message: `${chem} lot ${`L-${ri(4821)}`} showing ${ri(22)}% property deviation from spec. Process running conservative settings — yield penalty ${r(4.8)}% accumulating.`, riskPercent: ri(66) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Adaptive Process Recipe Update",[
        {description:"Adjust process recipe based on real-time feed NIR analysis",parameter:"Recipe",from:"Standard","to":"Feed-Adaptive"},
        {description:"Update dosing ratios for current feed quality",parameter:"Dose Ratios",from:"Fixed","to":"Variable"},
      ], ri(66), ri(18), ri(32000), ri(Math.round(base*ind.costMult*0.36)), 0.84, "NIR sensor calibration must be maintained"),
      opt(2,"BALANCED","Feed Blending",[
        {description:"Blend current lot with higher-quality inventory",parameter:"Blend Ratio",from:"100% current","to":"60/40 blend"},
      ], ri(66), ri(36), ri(14000), ri(Math.round(base*ind.costMult*0.20)), 0.88, "Inventory consumption accelerated"),
      opt(3,"CONSERVATIVE","Supplier Notification",[
        {description:"Flag lot for supplier quality review",parameter:"QA Action",from:"None","to":"Supplier NCR"},
      ], ri(66), ri(58), ri(2000), ri(Math.round(base*ind.costMult*0.06)), 0.76, "No immediate process benefit; future prevention only"),
    ],
    annualProjection: proj(ind, base, 0.66),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 25 — Motor Speed Drive Optimization
A.push((ind, i) => {
  const base = ri(1_500_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Variable Frequency Drive Optimization",
    description: `VFD-equipped motors often run at fixed speeds due to operator preference for simplicity. Affinity laws mean a 10% speed reduction cuts power by 27%. Systematic VFD optimization across fans, pumps, and conveyors can recover 15–30% of motor energy cost with zero throughput impact.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Motor Speed", "Hz", r(60), r(60)),
      sensor("s2", "System Pressure", "psi", r(82), r(110)),
      sensor("s3", "Flow Demand vs Actual", "%", r(100), r(78)),
      sensor("s4", "VFD Output Power", "kW", r(280), r(380)),
      sensor("s5", "System Efficiency", "%", r(82), r(62)),
    ],
    riskMetric: { name: "Energy Waste Index", unit: "%", normalValue: 5, warningThreshold: 20, criticalThreshold: 35, peakValue: 50 },
    predictiveAlert: { title: "VFD Running at Fixed Max Speed", message: `${ri(8)} VFDs identified running at 60 Hz regardless of demand. System flow ${ri(22)}% above requirement. Energy waste ${money(ri(Math.round(base*ind.costMult/6000)))}/hr.`, riskPercent: ri(64) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Demand-Based Speed Control Activation",[
        {description:"Enable PID-closed-loop speed control on all affected VFDs",parameter:"Control Mode",from:"Fixed Hz","to":"Demand-Tracking"},
        {description:"Set system pressure target for pump optimization",parameter:"Pressure SP",from:`${ri(110)} psi`,to:`${ri(82)} psi`},
      ], ri(64), ri(14), ri(18000), ri(Math.round(base*ind.costMult*0.52)), 0.88, "System pressure survey required before activation"),
      opt(2,"BALANCED","Fan/Pump Speed Reduction Trial",[
        {description:"Manually reduce fan speeds to match measured demand",parameter:"Speed",from:"60 Hz","to":"48 Hz"},
      ], ri(64), ri(30), ri(6000), ri(Math.round(base*ind.costMult*0.32)), 0.84, "Manual adjustment; must verify no process impact"),
      opt(3,"CONSERVATIVE","High-Consumption Motor Audit",[
        {description:"Identify and audit top 5 highest-energy motors",parameter:"Audit Scope",from:"None","to":"Top 5"},
      ], ri(64), ri(50), ri(3000), ri(Math.round(base*ind.costMult*0.12)), 0.88, "Audit only; implementation follows separately"),
    ],
    annualProjection: proj(ind, base, 0.64),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 26 — Contamination Detection
A.push((ind, i) => {
  const chem = ind.chemicals[2] || ind.chemicals[0];
  const base = ri(3_600_000, 0.35);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Cross-Contamination Early Detection",
    description: `Cross-contamination between product grades or introduction of foreign materials causes expensive product disposals, cleaning campaigns, and in regulated industries, regulatory notifications. Current detection relies on endpoint testing. In-process spectroscopic or sensor-based detection can identify contamination 40–80 minutes earlier.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "In-Line NIR Signal", "AU", r(0.82), r(1.48)),
      sensor("s2", `${chem} Tracer Level`, "ppm", r(0.4), r(4.8)),
      sensor("s3", "Product Color Index", "AU", r(100), r(88)),
      sensor("s4", "Turbidity", "NTU", r(0.8), r(12.4)),
      sensor("s5", "Cross-Talk Probability", "%", r(2), r(42)),
    ],
    riskMetric: { name: "Contamination Risk", unit: "%", normalValue: 2, warningThreshold: 20, criticalThreshold: 45, peakValue: 90 },
    predictiveAlert: { title: "Contamination Precursor Detected", message: `${chem} tracer at ${r(4.8)} ppm vs limit ${r(1.0)} ppm. Batch ${`P-${ri(2184)}`} at ${ri(42)}% contamination risk. Early intervention can prevent full-batch loss.`, riskPercent: ri(72) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Immediate Divert + Flush Sequence",[
        {description:"Divert current production to quarantine tank",parameter:"Divert Valve",from:"Process","to":"Quarantine"},
        {description:"Execute short flush sequence before resuming",parameter:"Flush Volume",from:"0","to":`${ri(850)} gal`},
      ], ri(72), ri(12), ri(28000), ri(Math.round(base*ind.costMult*0.54)), 0.88, "30 min flush + 15 min verification required"),
      opt(2,"BALANCED","Sample Hold + Lab Confirmation",[
        {description:"Hold suspect product and accelerate lab analysis",parameter:"Hold",from:"Running","to":"Sampled Hold"},
      ], ri(72), ri(36), ri(12000), ri(Math.round(base*ind.costMult*0.28)), 0.82, "30 min lab turnaround; contamination may progress"),
      opt(3,"CONSERVATIVE","Reduce Throughput + Increase Sampling",[
        {description:"Cut rate 50% and sample every 10 minutes",parameter:"Rate",from:"100%","to":"50%"},
      ], ri(72), ri(54), ri(5000), ri(Math.round(base*ind.costMult*0.12)), 0.74, "Slows progression but does not stop it"),
    ],
    annualProjection: proj(ind, base, 0.72),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 27 — Predictive Maintenance: Seal / Gasket
A.push((ind, i) => {
  const base = ri(1_200_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Mechanical Seal Failure Prevention",
    description: `Mechanical seal failures on pumps and mixers cause unplanned process isolations, product spills, and environmental incidents. Seal degradation is detectable through seal flush flow changes, bearing temperature trends, and vibration signatures 72–200 hours before failure.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Seal Flush Flow", "gpm", r(2.8), r(0.9)),
      sensor("s2", "Seal Pot Level", "in", r(12), r(8.2)),
      sensor("s3", "Seal Chamber Pressure", "psi", r(42), r(28)),
      sensor("s4", "Equipment Vibration", "mm/s", r(1.6), r(5.8)),
      sensor("s5", "Process Leak Detection", "ppm", r(0), r(18)),
    ],
    riskMetric: { name: "Seal Failure Probability", unit: "%", normalValue: 5, warningThreshold: 35, criticalThreshold: 65, peakValue: 95 },
    predictiveAlert: { title: "Seal Degradation Detected", message: `Pump P-312 seal flush flow dropped to ${r(0.9)} gpm (min: 2.0 gpm). Seal pot level falling. Failure probability ${ri(72)}% within ${ri(36)} hours.`, riskPercent: ri(72) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Planned Seal Replacement",[
        {description:"Stage seal kit and schedule replacement at next low-load window",parameter:"Replacement",from:"Reactive","to":"Planned"},
        {description:"Top up seal pot to restore flush circulation",parameter:"Seal Pot",from:`${r(8.2)} in`,to:`${r(12.0)} in`},
      ], ri(72), ri(14), ri(18000), ri(Math.round(base*ind.costMult*0.44)), 0.91, "3-hour pump isolation required"),
      opt(2,"BALANCED","Process Isolation + Emergency Replacement",[
        {description:"Isolate pump and replace seal today",parameter:"Timeline",from:"Scheduled","to":"Today"},
      ], ri(72), ri(28), ri(32000), ri(Math.round(base*ind.costMult*0.38)), 0.86, "Unplanned 3-hour outage; may affect production target"),
      opt(3,"CONSERVATIVE","Switch to Standby Pump",[
        {description:"Start standby pump P-312B and isolate degraded unit",parameter:"Active Pump",from:"P-312A","to":"P-312B"},
      ], ri(72), ri(20), ri(4000), ri(Math.round(base*ind.costMult*0.32)), 0.94, "Only viable if standby pump is available and certified"),
    ],
    annualProjection: proj(ind, base, 0.72),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 28 — Scheduling / OEE
A.push((ind, i) => {
  const base = ri(2_400_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "OEE Improvement — Minor Stops Elimination",
    description: `Minor stoppages under 5 minutes each individually seem insignificant but collectively consume 8–18% of available production time. They are rarely captured in downtime logs and thus escape management attention. Real-time micro-stoppage tracking and pattern analysis reveals systemic causes that targeted fixes can eliminate.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Line OEE", "%", r(74), r(62)),
      sensor("s2", "Minor Stops/Shift", "events", r(18), r(42)),
      sensor("s3", "Avg Stop Duration", "min", r(1.8), r(3.4)),
      sensor("s4", "Available Time Lost", "%", r(6), r(18)),
      sensor("s5", "Throughput vs Plan", "%", r(98), r(82)),
    ],
    riskMetric: { name: "OEE Loss", unit: "%", normalValue: 5, warningThreshold: 15, criticalThreshold: 25, peakValue: 40 },
    predictiveAlert: { title: "OEE Declining — Minor Stop Pattern", message: `${ri(42)} minor stops logged this shift. Pattern analysis links ${ri(68)}% to ${ind.equipment[2]||ind.equipment[0]} infeed jams. OEE at ${ri(62)}%, cost ${money(ri(Math.round(base*ind.costMult/52/5)))} behind plan this shift.`, riskPercent: ri(68) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Root Cause Elimination",[
        {description:"Adjust infeed guide rails to spec",parameter:"Guide Rail Gap",from:`${r(4.8)} mm`,to:`${r(3.1)} mm`},
        {description:"Replace worn feed rollers",parameter:"Roller Condition",from:"Worn","to":"New"},
      ], ri(68), ri(15), ri(22000), ri(Math.round(base*ind.costMult*0.42)), 0.86, "2-hour maintenance required; results visible next shift"),
      opt(2,"BALANCED","Operator Micro-Stop Response Protocol",[
        {description:"Issue operators with structured stop-response card",parameter:"Response",from:"Ad-hoc","to":"Structured"},
      ], ri(68), ri(38), ri(6000), ri(Math.round(base*ind.costMult*0.20)), 0.78, "Training required; behavioral change takes time"),
      opt(3,"CONSERVATIVE","Enhanced Stoppage Logging",[
        {description:"Enable auto-categorization of all stops in MES",parameter:"Logging",from:"Manual","to":"Auto"},
      ], ri(68), ri(58), ri(3000), ri(Math.round(base*ind.costMult*0.07)), 0.88, "Improves visibility only; no immediate throughput gain"),
    ],
    annualProjection: proj(ind, base, 0.68),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 29 — Waste Minimization
A.push((ind, i) => {
  const base = ri(1_800_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Solid Waste & Scrap Minimization",
    description: `Scrap generation in ${ind.name.toLowerCase()} operations runs 3–8% of input material above theoretical minimums. Off-spec product, trim waste, and startup scrap all represent lost material cost plus disposal expense. Tighter process control and defect prediction can cut scrap by 40–60%.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Scrap Rate", "%", r(3.2), r(7.8)),
      sensor("s2", "Dimensional Deviation", "mm", r(0.08), r(0.28)),
      sensor("s3", "Scrap per Shift", ind.throughputUnit, r(4.8), r(14.2)),
      sensor("s4", "Rework Rate", "%", r(1.2), r(4.8)),
      sensor("s5", "Material Yield", "%", r(96.8), r(92.2)),
    ],
    riskMetric: { name: "Scrap Rate", unit: "%", normalValue: 3.2, warningThreshold: 5.5, criticalThreshold: 7.5, peakValue: 12 },
    predictiveAlert: { title: "Scrap Rate Elevated", message: `Scrap at ${r(7.8)}% vs target ${r(3.2)}%. Dimensional deviation trending up. Shift scrap cost: ${money(ri(Math.round(base*ind.costMult/52/5)))}.`, riskPercent: ri(69) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Process Set Point Correction",[
        {description:"Correct die/tool temperature to reduce dimensional error",parameter:"Tool Temp",from:`${ri(388)}°F`,to:`${ri(372)}°F`},
        {description:"Adjust speed to reduce vibration-induced deviation",parameter:"Speed",from:`${ri(220)} RPM`,to:`${ri(195)} RPM`},
      ], ri(69), ri(18), ri(18000), ri(Math.round(base*ind.costMult*0.46)), 0.84, "15-min process stabilization required"),
      opt(2,"BALANCED","Inspection Frequency Increase",[
        {description:"Switch to 100% in-line inspection vs sampling",parameter:"Inspection",from:"10% sample","to":"100% in-line"},
      ], ri(69), ri(38), ri(12000), ri(Math.round(base*ind.costMult*0.22)), 0.88, "Catches defects; does not prevent them"),
      opt(3,"CONSERVATIVE","Operator Alert on Deviation Trend",[
        {description:"Alert when 3 consecutive measurements exceed ±0.15 mm",parameter:"Alert Rule",from:"None","to":"Active"},
      ], ri(69), ri(55), ri(3000), ri(Math.round(base*ind.costMult*0.08)), 0.78, "Relies on operator intervention speed"),
    ],
    annualProjection: proj(ind, base, 0.69),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 30 — Gearbox / Drivetrain
A.push((ind, i) => {
  const eq = ind.equipment[1] || ind.equipment[0];
  const base = ri(1_600_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${eq} Gearbox Condition Monitoring`,
    description: `Gearbox failures on heavy industrial equipment cause 24–72 hour unplanned stoppages. Gear tooth wear, oil degradation, and bearing failures inside the gearbox generate characteristic vibration and debris signatures weeks before catastrophic failure. Oil analysis and vibration spectral analysis are complementary detection methods.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Gearbox Vibration", "g", r(0.8), r(4.8)),
      sensor("s2", "Oil Particle Count (>4µm)", "particles/mL", r(1200), r(8400)),
      sensor("s3", "Oil Temperature", "°F", r(148), r(188)),
      sensor("s4", "Gear Mesh Frequency", "dB", r(82), r(108)),
      sensor("s5", "Oil Viscosity Change", "%", r(0), r(18)),
    ],
    riskMetric: { name: "Gearbox Fault Index", unit: "%", normalValue: 8, warningThreshold: 35, criticalThreshold: 65, peakValue: 95 },
    predictiveAlert: { title: "Gearbox Degradation Detected", message: `${eq} gearbox oil particle count at ${ri(8400)} particles/mL (alarm: 5000). Gear mesh amplitude elevated ${ri(26)} dB. Estimated ${ri(21)}-day failure window.`, riskPercent: ri(77) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Oil Change + Vibration Measurement Campaign",[
        {description:"Drain and refill gearbox oil immediately",parameter:"Oil",from:"Degraded","to":"Fresh"},
        {description:"Collect full vibration spectrum for analysis",parameter:"Spectrum",from:"None","to":"Full spectrum"},
      ], ri(77), ri(22), ri(22000), ri(Math.round(base*ind.costMult*0.42)), 0.84, "4-hour gearbox service; production hold required"),
      opt(2,"BALANCED","Load Reduction + Monitoring",[
        {description:"Reduce drive torque to limit gear wear progression",parameter:"Load",from:"100%","to":"75%"},
        {description:"Sample oil weekly for particle trend",parameter:"Oil Sampling",from:"Monthly","to":"Weekly"},
      ], ri(77), ri(42), ri(8000), ri(Math.round(base*ind.costMult*0.22)), 0.78, "Throughput impact; buys time for planned repair"),
      opt(3,"CONSERVATIVE","Continuous Vibration Monitoring",[
        {description:"Enable continuous gear mesh frequency tracking",parameter:"Monitoring",from:"Off","to":"Continuous"},
      ], ri(77), ri(62), ri(2000), ri(Math.round(base*ind.costMult*0.09)), 0.68, "Provides detection only; fault continues to progress"),
    ],
    annualProjection: proj(ind, base, 0.77),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 31 — Drying / Moisture Control
A.push((ind, i) => {
  const base = ri(2_000_000, 0.28);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Dryer Energy & Moisture Optimization",
    description: `Dryers are among the most energy-intensive unit operations, and over-drying is common because operators fear under-spec moisture. Each percentage point of over-drying wastes dryer energy and can degrade product quality. Closed-loop moisture control with real-time sensors can maintain spec consistently with 15–25% less energy.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Product Moisture Out", "%", r(0.8), r(3.2)),
      sensor("s2", "Dryer Inlet Temp", "°F", r(320), r(360)),
      sensor("s3", "Exhaust Moisture", "% RH", r(28), r(18)),
      sensor("s4", "Dryer Energy Rate", ind.energyUnit, r(100), r(128)),
      sensor("s5", "Throughput Rate", ind.throughputUnit, r(100), r(88)),
    ],
    riskMetric: { name: "Over-dry Index", unit: "%", normalValue: 0, warningThreshold: 15, criticalThreshold: 28, peakValue: 45 },
    predictiveAlert: { title: "Dryer Operating Over-Spec", message: `Outlet moisture at ${r(0.8)}% vs minimum acceptable ${r(1.8)}%. Over-drying by ${r(1.0)} points. Energy waste ${money(ri(Math.round(base*ind.costMult/4400)))}/hr.`, riskPercent: ri(63) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Closed-Loop Moisture Control",[
        {description:"Enable NIR moisture sensor feedback to dryer temperature controller",parameter:"Control Mode",from:"Open-loop","to":"Closed-loop"},
        {description:"Set moisture target band",parameter:"Moisture SP",from:`${r(0.8)}%`,to:`${r(1.8)}%`},
      ], ri(63), ri(15), ri(28000), ri(Math.round(base*ind.costMult*0.42)), 0.87, "NIR sensor commissioning required"),
      opt(2,"BALANCED","Inlet Temperature Step-Down",[
        {description:"Reduce dryer inlet temperature by 25°F",parameter:"Inlet Temp",from:`${ri(360)}°F`,to:`${ri(335)}°F`},
      ], ri(63), ri(32), ri(8000), ri(Math.round(base*ind.costMult*0.24)), 0.84, "Manual moisture verification required hourly"),
      opt(3,"CONSERVATIVE","Moisture Alarm Adjustment",[
        {description:"Set low-moisture alarm at 1.5% to catch over-drying",parameter:"Low Alarm",from:"None","to":"1.5%"},
      ], ri(63), ri(50), ri(1500), ri(Math.round(base*ind.costMult*0.08)), 0.82, "Operator must act on alarm; variable response"),
    ],
    annualProjection: proj(ind, base, 0.63),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 32 — Catalyst / Consumable Optimization
A.push((ind, i) => {
  const chem = ind.chemicals[1] || ind.chemicals[0];
  const base = ri(3_400_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: `${chem} Life Extension & Optimization`,
    description: `${chem} deactivation is an inevitable but manageable process. Operators often accelerate deactivation through non-optimal temperature excursions and poisoning contaminants. Real-time deactivation tracking enables operating strategies that extend ${chem} life 20–40% and optimize the replacement timing decision.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", `${chem} Activity Index`, "%", r(88), r(62)),
      sensor("s2", "Temperature Hot Spot", "°F", r(480), r(620)),
      sensor("s3", "Pressure Drop Trend", "psi/day", r(0.4), r(2.8)),
      sensor("s4", "Selectivity", "%", r(92), r(78)),
      sensor("s5", "Contaminant Level", "ppm", r(0.8), r(4.2)),
    ],
    riskMetric: { name: "Deactivation Rate", unit: "%/day", normalValue: 0.1, warningThreshold: 0.4, criticalThreshold: 0.8, peakValue: 1.5 },
    predictiveAlert: { title: `${chem} Deactivating Rapidly`, message: `Deactivation rate ${r(0.8)}%/day vs normal ${r(0.1)}%/day. Hot spot at ${ri(620)}°F. Estimated remaining life cut from ${ri(180)} to ${ri(60)} days.`, riskPercent: ri(74) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Temperature Profile Correction + Contaminant Guard",[
        {description:"Reduce hot zone temperature to slow sintering",parameter:"Zone Temp",from:`${ri(620)}°F`,to:`${ri(510)}°F`},
        {description:"Increase contaminant guard bed regeneration frequency",parameter:"Guard Regen",from:"Weekly","to":"Daily"},
      ], ri(74), ri(22), ri(38000), ri(Math.round(base*ind.costMult*0.44)), 0.82, "Yield may drop 3% at lower temperature; validate with lab"),
      opt(2,"BALANCED","Severity Reduction",[
        {description:"Reduce feed rate to lower thermal load on catalyst",parameter:"Feed Rate",from:"100%","to":"82%"},
      ], ri(74), ri(40), ri(14000), ri(Math.round(base*ind.costMult*0.24)), 0.79, "Throughput impact; extends life but does not reverse damage"),
      opt(3,"CONSERVATIVE","Accelerated Replacement Planning",[
        {description:"Advance catalyst replacement from scheduled date",parameter:"Replacement",from:`Day ${ri(180)}`,to:`Day ${ri(70)}`},
      ], ri(74), ri(55), ri(8000), ri(Math.round(base*ind.costMult*0.18)), 0.92, "Catalyst cost incurred earlier; avoids catastrophic failure"),
    ],
    annualProjection: proj(ind, base, 0.74),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 33 — Packaging Line Efficiency
A.push((ind, i) => {
  const base = ri(1_400_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Packaging Line Fill Accuracy",
    description: `Overfill on packaging lines is legally required in most jurisdictions but is typically set far above the minimum needed. A 2g overfill on a 500g product costs 0.4% of material on every unit. Across millions of packages, precise fill control to the legal minimum (±0.5g vs typical ±3g) recovers significant product cost.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Fill Weight Mean", "g", r(504), r(508)),
      sensor("s2", "Fill Weight StdDev", "g", r(0.8), r(2.8)),
      sensor("s3", "Under-fills Detected", "ppm", r(2), r(48)),
      sensor("s4", "Filler Speed", "units/min", r(280), r(248)),
      sensor("s5", "Overfill Cost/hr", "$/hr", r(180), r(420)),
    ],
    riskMetric: { name: "Mean Overfill", unit: "g", normalValue: 2.0, warningThreshold: 5.0, criticalThreshold: 8.0, peakValue: 15.0 },
    predictiveAlert: { title: "Fill Target Drifting High", message: `Mean fill at ${r(508)} g vs target ${r(500)} g. Overfill ${r(8)} g per unit. At current production rate, material waste ${money(ri(Math.round(base*ind.costMult/4200)))}/hr.`, riskPercent: ri(64) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Closed-Loop Fill Weight Control",[
        {description:"Enable feedback control from checkweigher to filler",parameter:"Control Loop",from:"Open","to":"Closed"},
        {description:"Tighten target to 501g with ±0.5g tolerance",parameter:"Target",from:`${r(508)} g`,to:"501 g"},
      ], ri(64), ri(14), ri(24000), ri(Math.round(base*ind.costMult*0.48)), 0.87, "Checkweigher must be calibrated and communication established"),
      opt(2,"BALANCED","Manual Target Reduction",[
        {description:"Reduce filler set point to 502g",parameter:"Set Point",from:`${r(508)} g`,to:"502 g"},
      ], ri(64), ri(30), ri(4000), ri(Math.round(base*ind.costMult*0.28)), 0.84, "Requires increased QA sampling to guard under-fills"),
      opt(3,"CONSERVATIVE","Increased Checkweigher Sampling",[
        {description:"Sample every 5th unit instead of every 20th",parameter:"Sample Rate",from:"5%","to":"20%"},
      ], ri(64), ri(52), ri(2000), ri(Math.round(base*ind.costMult*0.07)), 0.88, "Improves visibility; does not correct overfill"),
    ],
    annualProjection: proj(ind, base, 0.64),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 34 — Predictive Quality: Surface Defects
A.push((ind, i) => {
  const base = ri(2_800_000, 0.3);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Surface Defect Prediction & Prevention",
    description: `Surface defects on ${ind.product} are discovered at final inspection after significant value has been added. Root causes—contamination, tool wear, temperature excursions—occur much earlier in the process. Upstream process signatures can predict surface defect occurrence 30–60 minutes before the defect-generating step.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Surface Defect Rate", "ppm", r(280), r(1840)),
      sensor("s2", "Tool Wear Index", "%", r(42), r(82)),
      sensor("s3", "Process Temperature Variance", "°F", r(2.1), r(8.4)),
      sensor("s4", "Feed Contamination", "ppm", r(4), r(28)),
      sensor("s5", "Inspection Reject Rate", "%", r(0.28), r(1.84)),
    ],
    riskMetric: { name: "Defect Rate", unit: "ppm", normalValue: 280, warningThreshold: 800, criticalThreshold: 1500, peakValue: 3000 },
    predictiveAlert: { title: "Defect Rate Increasing", message: `Defect predictor model shows ${ri(84)}% probability of surface defect event in next ${ri(45)} min. Tool wear at ${ri(82)}% of replacement threshold.`, riskPercent: ri(78) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Tool Change + Process Parameter Correction",[
        {description:"Replace worn tool/die immediately",parameter:"Tool",from:`${ri(82)}% worn`,to:"New"},
        {description:"Correct temperature to reduce thermal stress",parameter:"Process Temp",from:`${r(218)}°F`,to:`${r(198)}°F`},
      ], ri(78), ri(14), ri(28000), ri(Math.round(base*ind.costMult*0.44)), 0.88, "45-min changeover required for tool replacement"),
      opt(2,"BALANCED","Feed Filtration Increase",[
        {description:"Switch to finer filter element to reduce contamination",parameter:"Filter Micron",from:"25 µm","to":"5 µm"},
      ], ri(78), ri(36), ri(10000), ri(Math.round(base*ind.costMult*0.22)), 0.78, "Reduced flow rate may require pressure compensation"),
      opt(3,"CONSERVATIVE","100% Vision Inspection Activation",[
        {description:"Enable all vision cameras on defect-sensitive zones",parameter:"Vision Coverage",from:"60%","to":"100%"},
      ], ri(78), ri(55), ri(4000), ri(Math.round(base*ind.costMult*0.10)), 0.88, "Catches defects after creation; does not prevent them"),
    ],
    annualProjection: proj(ind, base, 0.78),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// 35 — Labor Productivity / Shift Handover
A.push((ind, i) => {
  const base = ri(1_600_000, 0.25);
  return {
    id: `${ind.slug}-${i}`,
    industry: ind.name,
    scenarioName: "Shift Handover Efficiency",
    description: `Production slowdowns during shift handovers occur as incoming operators ramp up process understanding. The typical 20–40 minute sub-optimal period after handover represents 2–3% of shift production. Structured handover intelligence—showing the incoming operator exactly what is drifting and what actions are needed—cuts this window to under 5 minutes.`,
    annualCostRange: costRange(base, 1),
    sensors: [
      sensor("s1", "Post-Handover OEE", "%", r(88), r(68)),
      sensor("s2", "Handover Duration", "min", r(8), r(28)),
      sensor("s3", "Alarm Rate Post-HO", "alarms/hr", r(3.2), r(12.4)),
      sensor("s4", "Setpoint Changes Post-HO", "changes/hr", r(4.8), r(18.2)),
      sensor("s5", "Production Rate Recovery", "min", r(12), r(38)),
    ],
    riskMetric: { name: "Handover Loss", unit: "min", normalValue: 8, warningThreshold: 18, criticalThreshold: 28, peakValue: 45 },
    predictiveAlert: { title: "Prolonged Shift Transition", message: `Current shift handover at ${ri(28)} min. OEE at ${ri(68)}% for first ${ri(35)} min of new shift. Cost: ${money(ri(Math.round(base*ind.costMult/52/3*0.3)))} this handover event.`, riskPercent: ri(65) },
    prescriptiveOptions: [
      opt(1,"OPTIMAL","Prescriptive Handover Briefing System",[
        {description:"Deploy automated handover report with top 5 actions needed",parameter:"Handover Mode",from:"Verbal","to":"Prescriptive Report"},
        {description:"Show incoming operator current drift and recommended corrections",parameter:"Situational Awareness",from:"None","to":"Full"},
      ], ri(65), ri(12), ri(28000), ri(Math.round(base*ind.costMult*0.38)), 0.86, "System integration with historian and HMI required"),
      opt(2,"BALANCED","Standardized Handover Checklist",[
        {description:"Implement 10-point digital handover checklist",parameter:"Checklist",from:"Informal","to":"Structured 10-pt"},
      ], ri(65), ri(30), ri(8000), ri(Math.round(base*ind.costMult*0.22)), 0.82, "Cultural change required; takes 4–8 weeks to embed"),
      opt(3,"CONSERVATIVE","Handover Duration Timer",[
        {description:"Visible timer in control room to motivate faster handovers",parameter:"Timer",from:"None","to":"Active"},
      ], ri(65), ri(50), ri(1500), ri(Math.round(base*ind.costMult*0.07)), 0.72, "Gamification effect; may not address root quality of handover"),
    ],
    annualProjection: proj(ind, base, 0.65),
    shiftMetrics: { output: ind.baseOutput, energy: ind.baseEnergy, efficiency: ind.baseEff },
  };
});

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function generateScenariosForIndustry(ind: IndustryConfig): DemoScenario[] {
  return A.map((fn, i) => fn(ind, i + 1));
}
