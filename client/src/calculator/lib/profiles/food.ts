import type { ProfileDefinition } from "../types";

const food: ProfileDefinition = {
  meta: {
    id: "food",
    name: "Food Processing (Continuous)",
    subtitle: "Dairy, beverage, bakery, snack, protein",
  },

  operationsInputs: [
    { key: "annualUnits", label: "Annual Production Volume", hint: "Total units (cases, packages, pounds) produced per year", unit: "M units/yr", defaultValue: 50, min: 1, max: 5000, step: 1 },
    { key: "unitValue", label: "Average Unit Value", hint: "Average revenue per unit produced", unit: "$", defaultValue: 3.5, min: 0.1, max: 100, step: 0.1, isCurrency: true },
    { key: "rejectRate", label: "Quality Reject Rate", hint: "Percentage of product rejected for quality reasons (out-of-spec, contamination, etc.)", unit: "%", defaultValue: 2, min: 0.1, max: 15, step: 0.1 },
    { key: "downtimeHours", label: "Equipment Downtime Per Year", hint: "Total hours of unplanned line stoppages per year", unit: "hrs/yr", defaultValue: 300, min: 10, max: 3000, step: 10 },
    { key: "downtimeCostPerHour", label: "Cost Per Downtime Hour", hint: "Lost production + spoiled ingredients + labor idle cost per hour", unit: "$/hr", defaultValue: 8_000, min: 500, max: 100_000, step: 500, isCurrency: true },
    { key: "changeoversPerDay", label: "Changeovers Per Day", hint: "Average number of product changeovers per production day", unit: "/day", defaultValue: 3, min: 0.5, max: 20, step: 0.5 },
    { key: "avgChangeoverMinutes", label: "Average Changeover Time", hint: "Average duration per changeover including CIP and validation", unit: "min", defaultValue: 45, min: 5, max: 240, step: 5 },
    { key: "lineHourlyCost", label: "Line Hourly Cost", hint: "Fully-loaded cost per production-hour for the line", unit: "$/hr", defaultValue: 2_000, min: 200, max: 50_000, step: 100, isCurrency: true },
  ],

  improvementSliders: [
    { key: "rejectReduction", label: "Quality Reject Reduction", hint: "Reduction in product rejects through prescriptive process control", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 22, aggressive: 35 },
    { key: "downtimeReduction", label: "Downtime Reduction", hint: "Reduction in unplanned stoppages through predictive maintenance", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 22, aggressive: 35 },
    { key: "changeoverReduction", label: "Changeover Time Reduction", hint: "Reduction in changeover duration through optimized scheduling and CIP", unit: "%", min: 0, max: 40, step: 1, conservative: 8, realistic: 15, aggressive: 25 },
    { key: "throughputImprovement", label: "Throughput Improvement", hint: "Percentage increase in effective throughput through line speed optimization", unit: "%", min: 0, max: 15, step: 0.5, conservative: 2, realistic: 5, aggressive: 8 },
  ],

  calculate(ops, impr) {
    const annualRevenue = ops.annualUnits * 1_000_000 * ops.unitValue;

    // Quality rejects
    const rejectValue = annualRevenue * (ops.rejectRate / 100);
    const rejectSavings = rejectValue * (impr.rejectReduction / 100);

    // Downtime
    const downtimeValue = ops.downtimeHours * ops.downtimeCostPerHour;
    const downtimeSavings = downtimeValue * (impr.downtimeReduction / 100);

    // Changeover: freed production time
    const productionDaysPerYear = 300;
    const totalChangeoverHoursPerYear = (ops.changeoversPerDay * productionDaysPerYear * ops.avgChangeoverMinutes) / 60;
    const changeoverCost = totalChangeoverHoursPerYear * ops.lineHourlyCost;
    const changeoverSavings = changeoverCost * (impr.changeoverReduction / 100);

    // Throughput: additional revenue at margin
    const throughputSavings = annualRevenue * (impr.throughputImprovement / 100) * 0.25; // 25% contribution margin

    return [
      { key: "reject", label: "Quality Reject Reduction", value: rejectSavings, category: "direct" },
      { key: "downtime", label: "Downtime Reduction", value: downtimeSavings, category: "direct" },
      { key: "changeover", label: "Changeover Efficiency", value: changeoverSavings, category: "efficiency" },
      { key: "throughput", label: "Throughput Improvement", value: throughputSavings, category: "efficiency" },
    ];
  },

  urlParamKeys: ["annualUnits", "unitValue", "rejectRate", "downtimeHours", "downtimeCostPerHour", "changeoversPerDay", "avgChangeoverMinutes", "lineHourlyCost"],
};

export default food;
