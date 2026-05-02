import type { ProfileDefinition } from "../types";

const water: ProfileDefinition = {
  meta: {
    id: "water",
    name: "Water and Wastewater Treatment",
    subtitle: "Municipal, industrial pretreatment, reuse",
  },

  operationsInputs: [
    { key: "treatedVolume", label: "Annual Treated Volume", hint: "Total volume of water/wastewater treated per year", unit: "M gal/yr", defaultValue: 50, min: 1, max: 5000, step: 1 },
    { key: "chemicalCost", label: "Annual Chemical Costs", hint: "Total cost of treatment chemicals (coagulants, disinfectants, pH adjusters, etc.)", unit: "$K/yr", defaultValue: 500, min: 10, max: 10_000, step: 10 },
    { key: "energyCost", label: "Annual Energy Costs", hint: "Total electricity costs for pumping, aeration, and treatment", unit: "$K/yr", defaultValue: 1_000, min: 50, max: 20_000, step: 25 },
    { key: "violationsPerYear", label: "Compliance Violations Per Year", hint: "Number of NPDES permit exceedances or regulatory violations per year", unit: "violations/yr", defaultValue: 2, min: 0, max: 50, step: 1 },
    { key: "violationCost", label: "Average Cost Per Violation", hint: "Fine + remediation + reporting + legal costs per violation event", unit: "$", defaultValue: 25_000, min: 1_000, max: 500_000, step: 1_000, isCurrency: true },
  ],

  improvementSliders: [
    { key: "chemicalReduction", label: "Chemical Cost Reduction", hint: "Reduction through optimized dosing and real-time process adjustment", unit: "%", min: 0, max: 30, step: 1, conservative: 5, realistic: 12, aggressive: 20 },
    { key: "energyReduction", label: "Energy Cost Reduction", hint: "Reduction through optimized aeration, pumping, and process scheduling", unit: "%", min: 0, max: 20, step: 0.5, conservative: 3, realistic: 7, aggressive: 12 },
    { key: "violationReduction", label: "Violation Prevention", hint: "Reduction in compliance violations through predictive process control", unit: "%", min: 0, max: 90, step: 5, conservative: 30, realistic: 60, aggressive: 85 },
    { key: "processEfficiency", label: "Treatment Process Efficiency", hint: "Improved treatment effectiveness reducing retreatment and excess capacity needs", unit: "%", min: 0, max: 15, step: 0.5, conservative: 2, realistic: 5, aggressive: 8 },
  ],

  calculate(ops, impr) {
    const chemicalCost = ops.chemicalCost * 1_000;
    const chemicalSavings = chemicalCost * (impr.chemicalReduction / 100);

    const energyCost = ops.energyCost * 1_000;
    const energySavings = energyCost * (impr.energyReduction / 100);

    const violationCost = ops.violationsPerYear * ops.violationCost;
    const violationSavings = violationCost * (impr.violationReduction / 100);

    // Process efficiency: reduces retreatment, chemical waste, excess pumping
    const totalOpsCost = chemicalCost + energyCost;
    const processSavings = totalOpsCost * (impr.processEfficiency / 100);

    return [
      { key: "chemical", label: "Chemical Optimization", value: chemicalSavings, category: "efficiency" },
      { key: "energy", label: "Energy Efficiency", value: energySavings, category: "efficiency" },
      { key: "violation", label: "Violation Prevention", value: violationSavings, category: "direct" },
      { key: "process", label: "Process Efficiency", value: processSavings, category: "efficiency" },
    ];
  },

  urlParamKeys: ["treatedVolume", "chemicalCost", "energyCost", "violationsPerYear", "violationCost"],
};

export default water;
