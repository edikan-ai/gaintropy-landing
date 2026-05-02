import type { ProfileDefinition } from "../types";

const chemical: ProfileDefinition = {
  meta: {
    id: "chemical",
    name: "Chemical Processing (Continuous Batch)",
    subtitle: "Specialty chemicals, polymers, intermediates",
  },

  operationsInputs: [
    { key: "annualBatches", label: "Annual Batch Count", hint: "Total number of batches produced per year", unit: "batches/yr", defaultValue: 2_000, min: 50, max: 50_000, step: 50 },
    { key: "avgBatchValue", label: "Average Batch Value", hint: "Average revenue value per batch", unit: "$", defaultValue: 15_000, min: 500, max: 500_000, step: 500, isCurrency: true },
    { key: "yieldRate", label: "Current Yield Rate", hint: "Percentage of theoretical yield achieved on average", unit: "%", defaultValue: 92, min: 60, max: 99.5, step: 0.5 },
    { key: "batchFailureRate", label: "Batch Failure Rate", hint: "Percentage of batches that fail to meet specification", unit: "%", defaultValue: 3, min: 0.1, max: 20, step: 0.1 },
    { key: "batchFailureCost", label: "Average Batch Failure Cost", hint: "Rework, reprocessing, disposal, and investigation costs per failed batch", unit: "$", defaultValue: 75_000, min: 5_000, max: 1_000_000, step: 1_000, isCurrency: true },
    { key: "energyCost", label: "Annual Energy Costs", hint: "Total energy costs for heating, cooling, mixing, and utilities", unit: "$M/yr", defaultValue: 5, min: 0.1, max: 100, step: 0.1 },
  ],

  improvementSliders: [
    { key: "yieldImprovement", label: "Yield Improvement", hint: "Percentage point improvement in yield through optimized reaction parameters", unit: "pp", min: 0, max: 5, step: 0.1, conservative: 0.5, realistic: 1.5, aggressive: 3 },
    { key: "failureReduction", label: "Batch Failure Reduction", hint: "Reduction in batch failures through prescriptive process control", unit: "%", min: 0, max: 70, step: 1, conservative: 15, realistic: 35, aggressive: 55 },
    { key: "energyReduction", label: "Energy Efficiency Improvement", hint: "Reduction in energy costs through optimized heating/cooling profiles", unit: "%", min: 0, max: 15, step: 0.5, conservative: 2, realistic: 5, aggressive: 8 },
    { key: "qualityConsistency", label: "Quality Consistency Improvement", hint: "Reduction in off-spec product that requires regrading or blending", unit: "%", min: 0, max: 40, step: 1, conservative: 5, realistic: 15, aggressive: 25 },
  ],

  calculate(ops, impr) {
    const annualRevenue = ops.annualBatches * ops.avgBatchValue;

    // Yield: each pp of yield = more product from same feedstock
    const yieldLossValue = annualRevenue * ((100 - ops.yieldRate) / 100);
    const yieldSavings = yieldLossValue * (impr.yieldImprovement / (100 - ops.yieldRate));

    // Batch failures
    const annualFailures = ops.annualBatches * (ops.batchFailureRate / 100);
    const failureValue = annualFailures * ops.batchFailureCost;
    const failureSavings = failureValue * (impr.failureReduction / 100);

    // Energy
    const energyCost = ops.energyCost * 1_000_000;
    const energySavings = energyCost * (impr.energyReduction / 100);

    // Quality consistency: off-spec regrading value (est. 5% of batches need regrading, losing ~20% value)
    const regradingLoss = annualRevenue * 0.05 * 0.20;
    const qualitySavings = regradingLoss * (impr.qualityConsistency / 100);

    return [
      { key: "yield", label: "Yield Improvement", value: yieldSavings, category: "efficiency" },
      { key: "failure", label: "Batch Failure Reduction", value: failureSavings, category: "direct" },
      { key: "energy", label: "Energy Efficiency", value: energySavings, category: "efficiency" },
      { key: "quality", label: "Quality Consistency", value: qualitySavings, category: "direct" },
    ];
  },

  urlParamKeys: ["annualBatches", "avgBatchValue", "yieldRate", "batchFailureRate", "batchFailureCost", "energyCost"],
};

export default chemical;
