import type { ProfileDefinition } from "../types";

const discreteHighmix: ProfileDefinition = {
  meta: {
    id: "discrete-highmix",
    name: "Discrete Manufacturing (High-Mix Precision)",
    subtitle: "CNC machining, job shop, aerospace/medical parts",
  },

  operationsInputs: [
    { key: "firstPassYield", label: "First-Pass Yield", hint: "Percentage of parts that pass inspection on first attempt", unit: "%", defaultValue: 96, min: 70, max: 99.9, step: 0.1 },
    { key: "scrapRate", label: "Internal Scrap Rate (% of Sales)", hint: "Material and labor lost to scrap as a percentage of total sales", unit: "%", defaultValue: 0.5, min: 0.01, max: 10, step: 0.05 },
    { key: "changeoverHours", label: "Annual Changeover Hours Per Machine", hint: "Total setup/changeover hours per machine per year", unit: "hrs/machine/yr", defaultValue: 800, min: 50, max: 3000, step: 25 },
    { key: "scheduleAdherence", label: "Schedule Adherence", hint: "Percentage of jobs completed on or before the committed due date", unit: "%", defaultValue: 92, min: 60, max: 100, step: 0.5 },
    { key: "machines", label: "Number of CNC Machines", hint: "Total production machines in your facility", unit: "machines", defaultValue: 50, min: 1, max: 500, step: 1 },
    { key: "machineHourlyCost", label: "Average Machine Hourly Cost", hint: "Fully-loaded cost per machine-hour including labor, overhead, and consumables", unit: "$/hr", defaultValue: 150, min: 50, max: 1000, step: 5, isCurrency: true },
  ],

  improvementSliders: [
    { key: "scheduleImprovement", label: "Schedule Adherence Improvement", hint: "Percentage point improvement in on-time delivery through prescriptive scheduling", unit: "pp", min: 0, max: 15, step: 0.5, conservative: 3, realistic: 5, aggressive: 8 },
    { key: "yieldImprovement", label: "First-Pass Yield Improvement", hint: "Percentage point improvement in first-pass yield through process control", unit: "pp", min: 0, max: 5, step: 0.1, conservative: 1, realistic: 2, aggressive: 4 },
    { key: "changeoverReduction", label: "Changeover Time Reduction", hint: "Reduction in setup/changeover time through optimized sequencing", unit: "%", min: 0, max: 40, step: 1, conservative: 8, realistic: 15, aggressive: 25 },
    { key: "scrapReduction", label: "Scrap Reduction", hint: "Reduction in internal scrap rate through quality analytics", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 20, aggressive: 35 },
  ],

  calculate(ops, impr) {
    // Need annual revenue from company context; use a proxy from machine economics
    // Annual machine capacity value = machines × available hours × hourly cost
    const annualHoursPerMachine = 4000; // ~250 days × 16 hrs
    const annualCapacityValue = ops.machines * annualHoursPerMachine * ops.machineHourlyCost;

    // Schedule adherence: missed commitments cost premium freight, expediting, customer penalties
    // Commitment premium factor: 0.15 (15% of missed schedule value is actual cost)
    const commitmentPremiumFactor = 0.15;
    const scheduleMissValue = annualCapacityValue * ((100 - ops.scheduleAdherence) / 100) * commitmentPremiumFactor;
    const scheduleSavings = scheduleMissValue * (impr.scheduleImprovement / (100 - ops.scheduleAdherence));

    // Yield: each percentage point below 100% is rework/scrap cost
    const yieldLossValue = annualCapacityValue * ((100 - ops.firstPassYield) / 100);
    const yieldSavings = yieldLossValue * (impr.yieldImprovement / (100 - ops.firstPassYield));

    // Changeover: freed capacity value
    const totalChangeoverCost = ops.changeoverHours * ops.machines * ops.machineHourlyCost;
    const changeoverSavings = totalChangeoverCost * (impr.changeoverReduction / 100);

    // Scrap: direct material + labor loss
    const scrapValue = annualCapacityValue * (ops.scrapRate / 100);
    const scrapSavings = scrapValue * (impr.scrapReduction / 100);

    return [
      { key: "schedule", label: "Schedule Adherence", value: scheduleSavings, category: "direct" },
      { key: "yield", label: "First-Pass Yield", value: yieldSavings, category: "efficiency" },
      { key: "changeover", label: "Changeover Efficiency", value: changeoverSavings, category: "efficiency" },
      { key: "scrap", label: "Scrap Reduction", value: scrapSavings, category: "direct" },
    ];
  },

  urlParamKeys: ["firstPassYield", "scrapRate", "changeoverHours", "scheduleAdherence", "machines", "machineHourlyCost"],
};

export default discreteHighmix;
