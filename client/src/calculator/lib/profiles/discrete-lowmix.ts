import type { ProfileDefinition } from "../types";

const discreteLowmix: ProfileDefinition = {
  meta: {
    id: "discrete-lowmix",
    name: "Discrete Manufacturing (Low-Mix High-Volume)",
    subtitle: "Automotive components, appliances, stamping",
  },

  operationsInputs: [
    { key: "annualUnits", label: "Annual Production Volume", hint: "Total units produced per year", unit: "units/yr", defaultValue: 5_000_000, min: 100_000, max: 100_000_000, step: 100_000 },
    { key: "unitValue", label: "Average Unit Value", hint: "Average selling price or cost per unit", unit: "$", defaultValue: 12, min: 0.1, max: 10_000, step: 0.5, isCurrency: true },
    { key: "firstPassYield", label: "First-Pass Yield", hint: "Percentage of units passing quality on first attempt (typically higher than high-mix)", unit: "%", defaultValue: 98, min: 85, max: 99.9, step: 0.1 },
    { key: "downtimeHours", label: "Annual Unplanned Downtime", hint: "Total hours of unplanned line stoppages per year", unit: "hrs/yr", defaultValue: 300, min: 10, max: 3000, step: 10 },
    { key: "downtimeCostPerHour", label: "Cost Per Downtime Hour", hint: "Lost production value + fixed cost absorption per hour", unit: "$/hr", defaultValue: 25_000, min: 1_000, max: 500_000, step: 1_000, isCurrency: true },
    { key: "changeoversPerYear", label: "Changeovers Per Year", hint: "Total product changeovers across all lines per year", unit: "changeovers/yr", defaultValue: 200, min: 10, max: 2000, step: 10 },
    { key: "avgChangeoverMinutes", label: "Average Changeover Time", hint: "Average duration of each changeover including validation", unit: "min", defaultValue: 60, min: 5, max: 480, step: 5 },
    { key: "lineHourlyCost", label: "Line Hourly Cost", hint: "Fully-loaded cost per production-hour for the line", unit: "$/hr", defaultValue: 5_000, min: 500, max: 100_000, step: 100, isCurrency: true },
  ],

  improvementSliders: [
    { key: "scrapReduction", label: "Scrap/Reject Reduction", hint: "Reduction in defective units through SPC and prescriptive control", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 20, aggressive: 35 },
    { key: "downtimeReduction", label: "Downtime Reduction", hint: "Reduction in unplanned stoppages through predictive maintenance", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 22, aggressive: 35 },
    { key: "oeeImprovement", label: "OEE Improvement", hint: "Percentage point improvement in overall equipment effectiveness", unit: "pp", min: 0, max: 10, step: 0.5, conservative: 2, realistic: 4, aggressive: 7 },
    { key: "changeoverReduction", label: "Changeover Time Reduction", hint: "Reduction in changeover duration through optimized sequencing", unit: "%", min: 0, max: 40, step: 1, conservative: 8, realistic: 15, aggressive: 25 },
  ],

  calculate(ops, impr) {
    const annualRevenue = ops.annualUnits * ops.unitValue;

    // Scrap: units lost × unit value
    const scrapValue = annualRevenue * ((100 - ops.firstPassYield) / 100);
    const scrapSavings = scrapValue * (impr.scrapReduction / 100);

    // Downtime
    const downtimeValue = ops.downtimeHours * ops.downtimeCostPerHour;
    const downtimeSavings = downtimeValue * (impr.downtimeReduction / 100);

    // OEE throughput: additional production value from OEE improvement
    // Each pp of OEE = ~1% more throughput × revenue
    const oeeSavings = annualRevenue * (impr.oeeImprovement / 100) * 0.3; // 30% margin on additional throughput

    // Changeover: freed production time
    const totalChangeoverHours = (ops.changeoversPerYear * ops.avgChangeoverMinutes) / 60;
    const changeoverCost = totalChangeoverHours * ops.lineHourlyCost;
    const changeoverSavings = changeoverCost * (impr.changeoverReduction / 100);

    return [
      { key: "scrap", label: "Scrap/Reject Reduction", value: scrapSavings, category: "direct" },
      { key: "downtime", label: "Downtime Reduction", value: downtimeSavings, category: "direct" },
      { key: "oee", label: "Throughput (OEE)", value: oeeSavings, category: "efficiency" },
      { key: "changeover", label: "Changeover Efficiency", value: changeoverSavings, category: "efficiency" },
    ];
  },

  urlParamKeys: ["annualUnits", "unitValue", "firstPassYield", "downtimeHours", "downtimeCostPerHour", "changeoversPerYear", "avgChangeoverMinutes", "lineHourlyCost"],
};

export default discreteLowmix;
