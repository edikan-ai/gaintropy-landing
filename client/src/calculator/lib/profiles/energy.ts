import type { ProfileDefinition } from "../types";

const energy: ProfileDefinition = {
  meta: {
    id: "energy",
    name: "Energy Operations (Power Generation)",
    subtitle: "Gas turbine, combined cycle, cogeneration",
  },

  operationsInputs: [
    { key: "capacityUtilization", label: "Capacity Utilization", hint: "Current annual capacity factor as a percentage of nameplate", unit: "%", defaultValue: 75, min: 30, max: 98, step: 0.5 },
    { key: "forcedOutageHours", label: "Forced Outage Hours Per Year", hint: "Total hours of unplanned generation loss per year", unit: "hrs/yr", defaultValue: 100, min: 0, max: 2000, step: 10 },
    { key: "heatRateInefficiency", label: "Heat Rate Inefficiency Above Optimal", hint: "Percentage above design heat rate due to operational inefficiency", unit: "%", defaultValue: 5, min: 0, max: 20, step: 0.5 },
    { key: "fuelCost", label: "Annual Fuel Costs", hint: "Total cost of fuel (natural gas, coal, etc.) per year", unit: "$M/yr", defaultValue: 40, min: 1, max: 500, step: 1 },
    { key: "revenuePerMWh", label: "Average Revenue Per MWh", hint: "Average wholesale or PPA revenue per megawatt-hour generated", unit: "$/MWh", defaultValue: 45, min: 10, max: 200, step: 1, isCurrency: true },
    { key: "capacityMW", label: "Plant Capacity", hint: "Nameplate generation capacity", unit: "MW", defaultValue: 500, min: 10, max: 5000, step: 10 },
  ],

  improvementSliders: [
    { key: "utilizationImprovement", label: "Capacity Utilization Improvement", hint: "Percentage point improvement in capacity factor through optimized dispatch", unit: "pp", min: 0, max: 8, step: 0.5, conservative: 1, realistic: 2.5, aggressive: 5 },
    { key: "outageReduction", label: "Forced Outage Reduction", hint: "Reduction in unplanned outage hours through predictive maintenance", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 22, aggressive: 35 },
    { key: "heatRateImprovement", label: "Heat Rate Improvement", hint: "Reduction in heat rate inefficiency through combustion optimization", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 25, aggressive: 40 },
    { key: "fuelEfficiency", label: "Fuel Efficiency Improvement", hint: "Direct fuel cost reduction through optimized operations", unit: "%", min: 0, max: 10, step: 0.5, conservative: 1, realistic: 3, aggressive: 5 },
  ],

  calculate(ops, impr) {
    // Utilization: additional MWh generated × revenue/MWh
    const annualHours = 8760;
    const additionalMWh = ops.capacityMW * annualHours * (impr.utilizationImprovement / 100);
    const utilizationSavings = additionalMWh * ops.revenuePerMWh;

    // Forced outage: recovered hours × capacity × revenue
    const outageRecoveredHours = ops.forcedOutageHours * (impr.outageReduction / 100);
    const outageSavings = outageRecoveredHours * ops.capacityMW * ops.revenuePerMWh;

    // Heat rate: reducing fuel needed per MWh
    const fuelCost = ops.fuelCost * 1_000_000;
    const heatRateWaste = fuelCost * (ops.heatRateInefficiency / 100);
    const heatRateSavings = heatRateWaste * (impr.heatRateImprovement / 100);

    // Direct fuel efficiency
    const fuelSavings = fuelCost * (impr.fuelEfficiency / 100);

    return [
      { key: "utilization", label: "Capacity Utilization", value: utilizationSavings, category: "efficiency" },
      { key: "outage", label: "Forced Outage Reduction", value: outageSavings, category: "direct" },
      { key: "heatRate", label: "Heat Rate Efficiency", value: heatRateSavings, category: "efficiency" },
      { key: "fuel", label: "Fuel Efficiency", value: fuelSavings, category: "efficiency" },
    ];
  },

  urlParamKeys: ["capacityUtilization", "forcedOutageHours", "heatRateInefficiency", "fuelCost", "revenuePerMWh", "capacityMW"],
};

export default energy;
