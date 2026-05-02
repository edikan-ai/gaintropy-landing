import type { ProfileDefinition } from "../types";

const steelFlat: ProfileDefinition = {
  meta: {
    id: "steel-flat",
    name: "Continuous Process Steel (Flat Products)",
    subtitle: "Integrated mill, hot/cold strip, plate",
  },

  operationsInputs: [
    { key: "tonnage", label: "Annual Production Tonnage", hint: "Total tons produced per year across all product lines", unit: "tons/yr", defaultValue: 3_000_000, min: 500_000, max: 20_000_000, step: 100_000 },
    { key: "scrapRate", label: "Current Scrap Rate", hint: "Percentage of production lost to scrap (excluding cobbles)", unit: "%", defaultValue: 1.2, min: 0.1, max: 10, step: 0.1 },
    { key: "cobblesPerYear", label: "Cobbles Per Year", hint: "Total cobble events across all casters and mills per year", unit: "events/yr", defaultValue: 200, min: 0, max: 1500, step: 5 },
    { key: "cobbleCost", label: "Average Cost Per Cobble", hint: "Includes lost production, strand damage, cleanup, and downstream delay costs", unit: "$", defaultValue: 50_000, min: 10_000, max: 300_000, step: 1_000, isCurrency: true },
    { key: "energyCost", label: "Annual Energy Cost", hint: "Total electricity + natural gas costs for the facility", unit: "$M/yr", defaultValue: 40, min: 5, max: 500, step: 1 },
    { key: "downtimeHours", label: "Annual Unplanned Downtime", hint: "Total hours of unplanned production stops per year", unit: "hrs/yr", defaultValue: 250, min: 10, max: 3000, step: 10 },
    { key: "downtimeCost", label: "Cost Per Downtime Hour", hint: "Revenue loss + fixed cost absorption per hour of unplanned stoppage", unit: "$/hr", defaultValue: 75_000, min: 10_000, max: 750_000, step: 1_000, isCurrency: true },
  ],

  improvementSliders: [
    { key: "scrapReduction", label: "Scrap Reduction", hint: "Reduction in scrap rate through prescriptive process control", unit: "%", min: 0, max: 50, step: 1, conservative: 8, realistic: 18, aggressive: 30 },
    { key: "cobbleReduction", label: "Cobble Reduction", hint: "Reduction in cobble events through predictive casting and rolling control", unit: "%", min: 0, max: 60, step: 1, conservative: 10, realistic: 20, aggressive: 35 },
    { key: "downtimeReduction", label: "Downtime Reduction", hint: "Reduction in unplanned downtime through predictive maintenance", unit: "%", min: 0, max: 50, step: 1, conservative: 10, realistic: 22, aggressive: 35 },
    { key: "energyEfficiency", label: "Energy Efficiency Improvement", hint: "Reduction in energy cost through furnace and rolling optimization", unit: "%", min: 0, max: 15, step: 0.5, conservative: 2, realistic: 5, aggressive: 8 },
  ],

  calculate(ops, impr) {
    const marginPerTon = 250;
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

export default steelFlat;
