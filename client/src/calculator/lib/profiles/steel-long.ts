import type { ProfileDefinition } from "../types";

const steelLong: ProfileDefinition = {
  meta: {
    id: "steel-long",
    name: "Continuous Process Steel (Long Products)",
    subtitle: "Mini-mill, rebar, merchant bar, SBQ",
  },

  operationsInputs: [
    { key: "tonnage", label: "Annual Production Tonnage", hint: "Total tons produced per year across all product lines", unit: "tons/yr", defaultValue: 1_500_000, min: 100_000, max: 10_000_000, step: 50_000 },
    { key: "scrapRate", label: "Current Scrap Rate", hint: "Percentage of production lost to scrap (excluding cobbles)", unit: "%", defaultValue: 1.5, min: 0.1, max: 10, step: 0.1 },
    { key: "cobblesPerYear", label: "Cobbles Per Year", hint: "Total cobble events across all strands/mills per year", unit: "events/yr", defaultValue: 160, min: 0, max: 1000, step: 5 },
    { key: "cobbleCost", label: "Average Cost Per Cobble", hint: "Includes lost production, cleanup, strand damage, and delay costs", unit: "$", defaultValue: 40_000, min: 5_000, max: 200_000, step: 1_000, isCurrency: true },
    { key: "energyCost", label: "Annual Energy Cost", hint: "Total electricity + natural gas costs for the facility", unit: "$M/yr", defaultValue: 25, min: 1, max: 200, step: 0.5 },
    { key: "downtimeHours", label: "Annual Unplanned Downtime", hint: "Total hours of unplanned production stops per year", unit: "hrs/yr", defaultValue: 200, min: 10, max: 2000, step: 10 },
    { key: "downtimeCost", label: "Cost Per Downtime Hour", hint: "Revenue loss + fixed cost absorption per hour of unplanned stoppage", unit: "$/hr", defaultValue: 50_000, min: 5_000, max: 500_000, step: 1_000, isCurrency: true },
  ],

  improvementSliders: [
    { key: "scrapReduction", label: "Scrap Reduction", hint: "Reduction in scrap rate through prescriptive process control", unit: "%", min: 0, max: 50, step: 1, conservative: 8, realistic: 18, aggressive: 30 },
    { key: "cobbleReduction", label: "Cobble Reduction", hint: "Reduction in cobble events through predictive casting control", unit: "%", min: 0, max: 60, step: 1, conservative: 10, realistic: 20, aggressive: 35 },
    { key: "downtimeReduction", label: "Downtime Reduction", hint: "Reduction in unplanned downtime through predictive maintenance", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 22, aggressive: 35 },
    { key: "energyEfficiency", label: "Energy Efficiency Improvement", hint: "Reduction in energy cost through process optimization", unit: "%", min: 0, max: 15, step: 0.5, conservative: 2, realistic: 5, aggressive: 8 },
  ],

  calculate(ops, impr) {
    // Scrap value: tonnage × scrap rate × estimated margin per ton (~$200 for long products)
    const marginPerTon = 200;
    const annualScrapValue = ops.tonnage * (ops.scrapRate / 100) * marginPerTon;
    const scrapSavings = annualScrapValue * (impr.scrapReduction / 100);

    const annualCobbleValue = ops.cobblesPerYear * ops.cobbleCost;
    const cobbleSavings = annualCobbleValue * (impr.cobbleReduction / 100);

    const annualDowntimeValue = ops.downtimeHours * ops.downtimeCost;
    const downtimeSavings = annualDowntimeValue * (impr.downtimeReduction / 100);

    const annualEnergyCost = ops.energyCost * 1_000_000;
    const energySavings = annualEnergyCost * (impr.energyEfficiency / 100);

    return [
      { key: "scrap", label: "Scrap Reduction", value: scrapSavings, category: "direct" },
      { key: "cobble", label: "Cobble Reduction", value: cobbleSavings, category: "direct" },
      { key: "downtime", label: "Downtime Reduction", value: downtimeSavings, category: "direct" },
      { key: "energy", label: "Energy Efficiency", value: energySavings, category: "efficiency" },
    ];
  },

  urlParamKeys: ["tonnage", "scrapRate", "cobblesPerYear", "cobbleCost", "energyCost", "downtimeHours", "downtimeCost"],
};

export default steelLong;
