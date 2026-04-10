// AUTO-GENERATED — do not edit manually
// Source: /Users/edikan/Documents/Prototype_PrescOps/proforge/src/data/scenarios/

export interface DemoAction {
  description: string;
  parameter: string;
  from: string | number;
  to: string | number;
}

export interface DemoPrescriptiveOption {
  rank: 1 | 2 | 3;
  label: string;
  title: string;
  actions: DemoAction[];
  riskReduction: { from: number | string; to: number | string };
  costOfAction: number;
  costAvoided: number;
  netSavings: number;
  successProbability: number;
  tradeoff: string;
}

export interface DemoSensor {
  id: string;
  name: string;
  unit: string;
  normalValue: number | string;
  anomalyValue: number | string;
  icon?: string;
}

export interface DemoScenario {
  id: string;
  industry: string;
  scenarioName: string;
  description: string;
  annualCostRange: string;
  sensors: DemoSensor[];
  riskMetric: {
    name: string;
    unit: string;
    normalValue: number;
    warningThreshold: number;
    criticalThreshold: number;
    peakValue: number;
  };
  predictiveAlert: {
    title: string;
    message: string;
    riskPercent: number;
  };
  prescriptiveOptions: DemoPrescriptiveOption[];
  annualProjection: {
    incidentsPerYear: number;
    avgCostPerIncident: number;
    preventionRate: number;
    platformCost: number;
    netAnnualSavings: number;
  };
  shiftMetrics: {
    output: string;
    energy: string;
    efficiency: string;
  };
}

export const demoScenarios: DemoScenario[] = 
[
  {
    "id": "steel-1",
    "industry": "Steel Manufacturing",
    "scenarioName": "Reheat Furnace Energy Optimization",
    "description": "Reheat furnaces consume enormous amounts of natural gas. Operators routinely run furnaces 8–15% above thermally optimal temperatures as a safety buffer, wasting fuel on every slab. The interaction between slab pacing, zone temperatures, and discharge targets creates a complex optimization problem that operators solve by gut feel and conservative defaults.",
    "annualCostRange": "$5.6M–$8.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Soak Zone Temp",
        "unit": "°F",
        "normalValue": 2250,
        "anomalyValue": 2340,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Heating Zone Temp",
        "unit": "°F",
        "normalValue": 2100,
        "anomalyValue": 2195,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Fuel Flow Rate",
        "unit": "MMBtu/hr",
        "normalValue": 185,
        "anomalyValue": 212,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Discharge Temp",
        "unit": "°F",
        "normalValue": 2200,
        "anomalyValue": 2210,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Furnace Efficiency",
        "unit": "%",
        "normalValue": 68,
        "anomalyValue": 59,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Slab Pacing",
        "unit": "min/slab",
        "normalValue": 4.2,
        "anomalyValue": 4.2,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Waste Index",
      "unit": "%",
      "normalValue": 15,
      "warningThreshold": 20,
      "criticalThreshold": 25,
      "peakValue": 27
    },
    "predictiveAlert": {
      "title": "Excess Energy Consumption Detected",
      "message": "Furnace operating 27% above optimal energy consumption this shift. Estimated excess cost: $4,200/hr.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Zone Temperature Rebalance",
        "actions": [
          {
            "description": "Reduce soak zone temperature",
            "parameter": "Soak Zone Temp",
            "from": "2,340°F",
            "to": "2,295°F"
          },
          {
            "description": "Increase heating zone temperature",
            "parameter": "Heating Zone Temp",
            "from": "2,195°F",
            "to": "2,120°F"
          },
          {
            "description": "Adjust slab pacing",
            "parameter": "Slab Pacing",
            "from": "4.2 min/slab",
            "to": "4.0 min/slab"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 8
        },
        "costOfAction": 800,
        "costAvoided": 46500,
        "netSavings": 45700,
        "successProbability": 88,
        "tradeoff": "Requires 15-minute transition period during zone rebalance."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Thermal Optimization",
        "actions": [
          {
            "description": "Reduce all zones to minimum safe temps",
            "parameter": "All Zone Temps",
            "from": "Current",
            "to": "Min safe"
          },
          {
            "description": "Tighten discharge window",
            "parameter": "Discharge Window",
            "from": "±25°F",
            "to": "±10°F"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 4
        },
        "costOfAction": 1200,
        "costAvoided": 57000,
        "netSavings": 55800,
        "successProbability": 72,
        "tradeoff": "Tighter quality margin, higher operator attention needed."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Soak Zone Reduction Only",
        "actions": [
          {
            "description": "Reduce soak zone temperature only",
            "parameter": "Soak Zone Temp",
            "from": "2,340°F",
            "to": "2,315°F"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 19
        },
        "costOfAction": 200,
        "costAvoided": 21000,
        "netSavings": 20800,
        "successProbability": 95,
        "tradeoff": "Minimal disruption but limited improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 6000,
      "avgCostPerIncident": 2800,
      "preventionRate": 0.35,
      "platformCost": 250000,
      "netAnnualSavings": 5650000
    },
    "shiftMetrics": {
      "output": "342 tons",
      "energy": "$14,200",
      "efficiency": "68%"
    }
  },
  {
    "id": "steel-2",
    "industry": "Steel Manufacturing",
    "scenarioName": "Yield Loss Head/Tail Crop & Thickness Deviation",
    "description": "Every coil loses material at the head and tail ends (crop loss), and thickness deviations throughout the strip result in downgrades or scrap. Crop loss alone accounts for 1.5–3% of total production, and off-gauge material adds another 0.5–1.5%. Operators control this through speed profiles, roll gap settings, and AGC tuning but rarely optimally.",
    "annualCostRange": "$2.95M–$5M",
    "sensors": [
      {
        "id": "s1",
        "name": "Strip Thickness",
        "unit": "mm",
        "normalValue": 3.2,
        "anomalyValue": 3.38,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Thickness Deviation",
        "unit": "%",
        "normalValue": 0.8,
        "anomalyValue": 2.4,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Head Crop Length",
        "unit": "m",
        "normalValue": 12,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Tail Crop Length",
        "unit": "m",
        "normalValue": 8,
        "anomalyValue": 14,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Roll Gap Position",
        "unit": "mm",
        "normalValue": 3.15,
        "anomalyValue": 3.22,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "AGC Response Time",
        "unit": "ms",
        "normalValue": 45,
        "anomalyValue": 78,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Yield Loss Rate",
      "unit": "%",
      "normalValue": 2,
      "warningThreshold": 3,
      "criticalThreshold": 4,
      "peakValue": 4.2
    },
    "predictiveAlert": {
      "title": "Elevated Yield Loss Detected",
      "message": "Yield loss trending at 4.2% this shift. Current shift scrap projection: 38 tons ($22,800).",
      "riskPercent": 82
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "AGC Retune + Speed Profile",
        "actions": [
          {
            "description": "Tighten AGC gain",
            "parameter": "AGC Gain",
            "from": "Current",
            "to": "+15%"
          },
          {
            "description": "Adjust threading speed profile",
            "parameter": "Threading Speed",
            "from": "Default",
            "to": "Gauge-optimized"
          },
          {
            "description": "Recalibrate roll gap zero",
            "parameter": "Roll Gap Zero",
            "from": "3.22mm",
            "to": "3.15mm"
          }
        ],
        "riskReduction": {
          "from": 4.2,
          "to": 2.1
        },
        "costOfAction": 600,
        "costAvoided": 12600,
        "netSavings": 12000,
        "successProbability": 86,
        "tradeoff": "10-minute calibration pause between coils."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Pass Schedule Optimization",
        "actions": [
          {
            "description": "Recalculate entire pass schedule for current campaign",
            "parameter": "Pass Schedule",
            "from": "Current",
            "to": "Optimized"
          },
          {
            "description": "Optimize reduction distribution",
            "parameter": "Reduction Dist.",
            "from": "Default",
            "to": "Min-loss"
          }
        ],
        "riskReduction": {
          "from": 4.2,
          "to": 1.6
        },
        "costOfAction": 2100,
        "costAvoided": 15600,
        "netSavings": 13500,
        "successProbability": 74,
        "tradeoff": "Requires 25-minute setup, impacts throughput for 2 coils."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Crop Optimization Only",
        "actions": [
          {
            "description": "Adjust threading speed",
            "parameter": "Threading Speed",
            "from": "Default",
            "to": "Reduced"
          },
          {
            "description": "Adjust tail-out speed",
            "parameter": "Tail-out Speed",
            "from": "Default",
            "to": "Reduced"
          }
        ],
        "riskReduction": {
          "from": 4.2,
          "to": 3.1
        },
        "costOfAction": 200,
        "costAvoided": 6600,
        "netSavings": 6400,
        "successProbability": 94,
        "tradeoff": "Does not address thickness deviation."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 300,
      "avgCostPerIncident": 26667,
      "preventionRate": 0.4,
      "platformCost": 250000,
      "netAnnualSavings": 2950000
    },
    "shiftMetrics": {
      "output": "310 tons",
      "energy": "$11,800",
      "efficiency": "95.8%"
    }
  },
  {
    "id": "steel-3",
    "industry": "Steel Manufacturing",
    "scenarioName": "Grade Transition Sequencing",
    "description": "When a mill transitions between steel grades, the transition produces off-spec material that gets scrapped or downgraded. Poor sequencing of grade transitions amplifies this incompatible grades back-to-back means more scrap, more setup time, more energy waste. Most mills sequence by due date or gut feel rather than optimizing the transition path.",
    "annualCostRange": "$2.05M–$4.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Current Grade",
        "unit": "",
        "normalValue": "LC-1020",
        "anomalyValue": "LC-1020",
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Next Grade",
        "unit": "",
        "normalValue": "MC-340",
        "anomalyValue": "HS-590",
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Transition Scrap Est.",
        "unit": "tons",
        "normalValue": 2,
        "anomalyValue": 8,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Setup Time Required",
        "unit": "min",
        "normalValue": 15,
        "anomalyValue": 42,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Roll Wear Rate",
        "unit": "µm/km",
        "normalValue": 3.2,
        "anomalyValue": 5.8,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Campaign Remaining",
        "unit": "coils",
        "normalValue": 45,
        "anomalyValue": 12,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Transition Loss Index",
      "unit": "$",
      "normalValue": 1200,
      "warningThreshold": 3500,
      "criticalThreshold": 6000,
      "peakValue": 7200
    },
    "predictiveAlert": {
      "title": "High-Cost Grade Transition Approaching",
      "message": "Upcoming grade transition LC-1020 → HS-590 estimated at $7,200 in scrap and 42 minutes downtime. This is a high-incompatibility transition.",
      "riskPercent": 85
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Resequence Next 8 Orders",
        "actions": [
          {
            "description": "Insert intermediate grade MC-340 between LC-1020 and HS-590",
            "parameter": "Grade Sequence",
            "from": "LC-1020 → HS-590",
            "to": "LC-1020 → MC-340 → HS-590"
          }
        ],
        "riskReduction": {
          "from": 7200,
          "to": 3800
        },
        "costOfAction": 400,
        "costAvoided": 3400,
        "netSavings": 3000,
        "successProbability": 91,
        "tradeoff": "MC-340 order pulled forward by 4 hours (still within delivery window)."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Campaign Reoptimization",
        "actions": [
          {
            "description": "Resequence remaining 12 coils using minimum-cost transition path",
            "parameter": "Campaign Sequence",
            "from": "Due-date order",
            "to": "Min-cost path"
          }
        ],
        "riskReduction": {
          "from": 7200,
          "to": 1533
        },
        "costOfAction": 800,
        "costAvoided": 9300,
        "netSavings": 8500,
        "successProbability": 79,
        "tradeoff": "Some order delivery times shift by up to 8 hours."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Extend Current Grade Run",
        "actions": [
          {
            "description": "Add 3 more LC-1020 coils before transitioning",
            "parameter": "Grade Run Length",
            "from": "Current",
            "to": "+3 coils"
          }
        ],
        "riskReduction": {
          "from": 7200,
          "to": 5100
        },
        "costOfAction": 200,
        "costAvoided": 2100,
        "netSavings": 1900,
        "successProbability": 97,
        "tradeoff": "Tomorrow's schedule gets tighter."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1200,
      "avgCostPerIncident": 3500,
      "preventionRate": 0.55,
      "platformCost": 250000,
      "netAnnualSavings": 2050000
    },
    "shiftMetrics": {
      "output": "285 tons",
      "energy": "$10,900",
      "efficiency": "91.2%"
    }
  },
  {
    "id": "steel-4",
    "industry": "Steel Manufacturing",
    "scenarioName": "Surface Defect Prevention",
    "description": "Surface defects scale, scratches, roll marks, edge cracks cause coils to be downgraded from prime to secondary or scrapped entirely. The price difference between prime and secondary can be $50–150/ton. Defects result from complex interactions between roll surface condition, temperature uniformity, descaling pressure, and rolling speed.",
    "annualCostRange": "$2M–$4.5M",
    "sensors": [
      {
        "id": "s1",
        "name": "Descaling Pressure",
        "unit": "bar",
        "normalValue": 180,
        "anomalyValue": 142,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Roll Surface Roughness",
        "unit": "Ra µm",
        "normalValue": 1.2,
        "anomalyValue": 2.1,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Temp Uniformity",
        "unit": "°C spread",
        "normalValue": 15,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Rolling Speed",
        "unit": "m/s",
        "normalValue": 12.5,
        "anomalyValue": 12.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Coolant Flow Rate",
        "unit": "L/min",
        "normalValue": 850,
        "anomalyValue": 680,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Coils Since Roll Change",
        "unit": "coils",
        "normalValue": 120,
        "anomalyValue": 285,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Defect Probability",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 25,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "High Surface Defect Risk",
      "message": "Surface defect probability at 32% for next coil. Primary factors: roll surface degradation (285 coils since change, threshold 250) and descaling pressure drop.",
      "riskPercent": 80
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Targeted Intervention",
        "actions": [
          {
            "description": "Increase descaling pressure",
            "parameter": "Descaling Pressure",
            "from": "142 bar",
            "to": "175 bar"
          },
          {
            "description": "Reduce rolling speed for next 5 coils",
            "parameter": "Rolling Speed",
            "from": "12.5 m/s",
            "to": "11.75 m/s"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 8
        },
        "costOfAction": 950,
        "costAvoided": 14400,
        "netSavings": 13450,
        "successProbability": 84,
        "tradeoff": "6% throughput reduction for ~40 minutes."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Roll Change Now",
        "actions": [
          {
            "description": "Schedule immediate roll change",
            "parameter": "Roll Change",
            "from": "Deferred",
            "to": "Immediate (45 min)"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 3
        },
        "costOfAction": 9500,
        "costAvoided": 28000,
        "netSavings": 18500,
        "successProbability": 96,
        "tradeoff": "45 minutes lost production ($9,500 opportunity cost)."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Speed Reduction Only",
        "actions": [
          {
            "description": "Reduce rolling speed by 10%",
            "parameter": "Rolling Speed",
            "from": "12.5 m/s",
            "to": "11.25 m/s"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 18
        },
        "costOfAction": 300,
        "costAvoided": 6800,
        "netSavings": 6500,
        "successProbability": 92,
        "tradeoff": "Still elevated risk; buys time until scheduled roll change."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 450,
      "avgCostPerIncident": 10000,
      "preventionRate": 0.5,
      "platformCost": 250000,
      "netAnnualSavings": 2000000
    },
    "shiftMetrics": {
      "output": "298 tons",
      "energy": "$12,400",
      "efficiency": "89.4%"
    }
  },
  {
    "id": "steel-5",
    "industry": "Steel Manufacturing",
    "scenarioName": "Rolling Mill Roll Force Optimization",
    "description": "In hot rolling mills, the roll force applied at each stand must be precisely calibrated to achieve target thickness while avoiding cobbles (strip jams) and roll damage. Operators use conservative force set points that leave strip thicker than optimal, requiring additional passes or resulting in off-gauge product. Incorrect force distribution across stands causes uneven reduction, leading to shape defects (camber, edge wave) that downgrade product.",
    "annualCostRange": "$2.52M–$3.78M",
    "sensors": [
      {
        "id": "s1",
        "name": "Roll Force Stand 1",
        "unit": "kN",
        "normalValue": 8200,
        "anomalyValue": 9100,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Roll Force Stand 2",
        "unit": "kN",
        "normalValue": 7400,
        "anomalyValue": 8300,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Exit Thickness",
        "unit": "mm",
        "normalValue": 4.5,
        "anomalyValue": 4.9,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Strip Flatness Index",
        "unit": "",
        "normalValue": 95,
        "anomalyValue": 81,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Inter-stand Tension",
        "unit": "MPa",
        "normalValue": 45,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Pass Schedule Deviation",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Shape Defect Index",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 14,
      "peakValue": 17
    },
    "predictiveAlert": {
      "title": "Rolling Mill Shape Defect Index Elevated",
      "message": "Rolling mill shape defect index at 17%. Inter-stand tension imbalance causing edge wave formation. Exit thickness 0.4mm above target. Current pass: reject risk 34%.",
      "riskPercent": 80
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Force Redistribution",
        "actions": [
          {
            "description": "Reduce Stand 1 roll force",
            "parameter": "Roll Force Stand 1",
            "from": "9,100 kN",
            "to": "8,400 kN"
          },
          {
            "description": "Increase Stand 2 roll force",
            "parameter": "Roll Force Stand 2",
            "from": "8,300 kN",
            "to": "7,800 kN"
          },
          {
            "description": "Adjust inter-stand tension",
            "parameter": "Inter-stand Tension",
            "from": "38 MPa",
            "to": "42 MPa"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 5
        },
        "costOfAction": 1200,
        "costAvoided": 9400,
        "netSavings": 8200,
        "successProbability": 87,
        "tradeoff": "8-minute recalibration between coils."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Pass Schedule Recalculation",
        "actions": [
          {
            "description": "Recalculate all stand forces for current gauge campaign",
            "parameter": "Pass Schedule",
            "from": "Current",
            "to": "Fully optimized"
          },
          {
            "description": "Reset inter-stand tensions to optimal distribution",
            "parameter": "Inter-stand Tension",
            "from": "38 MPa",
            "to": "44 MPa"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 2
        },
        "costOfAction": 3000,
        "costAvoided": 17600,
        "netSavings": 14600,
        "successProbability": 73,
        "tradeoff": "20-minute setup affects 2 coils."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Tension Adjustment Only",
        "actions": [
          {
            "description": "Increase inter-stand tension to reduce shape defect",
            "parameter": "Inter-stand Tension",
            "from": "38 MPa",
            "to": "43 MPa"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 12
        },
        "costOfAction": 400,
        "costAvoided": 4200,
        "netSavings": 3800,
        "successProbability": 94,
        "tradeoff": "Partial improvement only; force imbalance not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 280,
      "avgCostPerIncident": 9000,
      "preventionRate": 0.45,
      "platformCost": 250000,
      "netAnnualSavings": 880000
    },
    "shiftMetrics": {
      "output": "312 tons",
      "energy": "$13,100",
      "efficiency": "86.5%"
    }
  },
  {
    "id": "cement-1",
    "industry": "Cement Manufacturing",
    "scenarioName": "Kiln Energy Optimization",
    "description": "Rotary kilns are the largest energy consumers in cement production, accounting for 40–60% of total plant energy. The interaction between feed rate, fuel mix, kiln speed, secondary air temperature, and raw material variability makes optimal operation a moving target. Most operators run conservative set points that waste 8–15% more fuel than necessary.",
    "annualCostRange": "$1.36M–$3.9M",
    "sensors": [
      {
        "id": "s1",
        "name": "Kiln Shell Temp",
        "unit": "°C",
        "normalValue": 285,
        "anomalyValue": 310,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Burning Zone Temp",
        "unit": "°C",
        "normalValue": 1450,
        "anomalyValue": 1510,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Feed Rate",
        "unit": "tons/hr",
        "normalValue": 160,
        "anomalyValue": 172,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Fuel Consumption",
        "unit": "GJ/ton",
        "normalValue": 3.4,
        "anomalyValue": 3.9,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Free Lime",
        "unit": "%",
        "normalValue": 1.2,
        "anomalyValue": 2.1,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Kiln Drive Power",
        "unit": "kW",
        "normalValue": 420,
        "anomalyValue": 465,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 10,
      "criticalThreshold": 15,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Kiln Over-Consuming Energy",
      "message": "Kiln operating 18% above optimal energy consumption. Current excess: $680/hr. Contributing factors: feed rate exceeds optimal for current fuel mix, burning zone temperature elevated.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Feed-Fuel Rebalance",
        "actions": [
          {
            "description": "Reduce feed rate",
            "parameter": "Feed Rate",
            "from": "172 t/hr",
            "to": "158 t/hr"
          },
          {
            "description": "Adjust fuel split: increase pet coke",
            "parameter": "Pet Coke %",
            "from": "Current",
            "to": "+5%"
          },
          {
            "description": "Reduce coal usage",
            "parameter": "Coal %",
            "from": "Current",
            "to": "-8%"
          },
          {
            "description": "Open secondary air damper",
            "parameter": "Air Damper",
            "from": "Current",
            "to": "+12°"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 4
        },
        "costOfAction": 600,
        "costAvoided": 7800,
        "netSavings": 7200,
        "successProbability": 87,
        "tradeoff": "Slight throughput reduction (~2%) for 6 hours."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Thermal Optimization",
        "actions": [
          {
            "description": "Reduce burning zone target",
            "parameter": "Burning Zone Temp",
            "from": "1,510°C",
            "to": "1,470°C"
          },
          {
            "description": "Reduce feed rate significantly",
            "parameter": "Feed Rate",
            "from": "172 t/hr",
            "to": "150 t/hr"
          },
          {
            "description": "Recalibrate fuel ratios",
            "parameter": "Fuel Ratios",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 2
        },
        "costOfAction": 1200,
        "costAvoided": 9600,
        "netSavings": 8400,
        "successProbability": 74,
        "tradeoff": "Must monitor free lime closely; 5% throughput reduction."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Fuel Mix Adjustment Only",
        "actions": [
          {
            "description": "Adjust coal/pet coke ratio only",
            "parameter": "Coal/Pet Coke Ratio",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 12
        },
        "costOfAction": 200,
        "costAvoided": 3600,
        "netSavings": 3400,
        "successProbability": 96,
        "tradeoff": "Minimal disruption but limited improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8200,
      "avgCostPerIncident": 480,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 1360000
    },
    "shiftMetrics": {
      "output": "1,280 tons",
      "energy": "$38,400",
      "efficiency": "82%"
    }
  },
  {
    "id": "cement-2",
    "industry": "Cement Manufacturing",
    "scenarioName": "Raw Mill Optimization",
    "description": "Raw mills grind limestone, clay, and corrective materials into raw meal. The fineness and composition of raw meal directly affect kiln performance and clinker quality. Over-grinding wastes energy (electricity); under-grinding causes kiln instability. Most plants target conservative fineness specs that waste 10–20% more grinding energy than necessary.",
    "annualCostRange": "$220K–$1.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Mill Outlet Temp",
        "unit": "°C",
        "normalValue": 95,
        "anomalyValue": 108,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Raw Meal Fineness",
        "unit": "% @90µm",
        "normalValue": 14,
        "anomalyValue": 19,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Mill Feed Rate",
        "unit": "tons/hr",
        "normalValue": 280,
        "anomalyValue": 310,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Separator Speed",
        "unit": "rpm",
        "normalValue": 750,
        "anomalyValue": 680,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Mill Power Draw",
        "unit": "kW",
        "normalValue": 3200,
        "anomalyValue": 3650,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Raw Meal LSF",
        "unit": "",
        "normalValue": 97,
        "anomalyValue": 93,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Mill Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 20,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Raw Mill Operating Inefficiently",
      "message": "Raw mill operating 22% above optimal energy. Fineness out of spec (19% vs. 14% target on 90µm). Feed rate too high for current separator setting.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Feed-Separator Balance",
        "actions": [
          {
            "description": "Reduce feed rate",
            "parameter": "Feed Rate",
            "from": "310 t/hr",
            "to": "275 t/hr"
          },
          {
            "description": "Increase separator speed",
            "parameter": "Separator Speed",
            "from": "680 rpm",
            "to": "770 rpm"
          },
          {
            "description": "Adjust dam ring height",
            "parameter": "Dam Ring",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 6
        },
        "costOfAction": 400,
        "costAvoided": 2700,
        "netSavings": 2300,
        "successProbability": 88,
        "tradeoff": "5 t/hr throughput reduction."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Recalibration",
        "actions": [
          {
            "description": "Stop mill for recalibration (20 min)",
            "parameter": "Mill Status",
            "from": "Running",
            "to": "Recalibrate"
          },
          {
            "description": "Reset separator and adjust grinding media charge",
            "parameter": "Media Charge",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 800,
        "costAvoided": 3600,
        "netSavings": 2800,
        "successProbability": 82,
        "tradeoff": "20-minute stoppage cost ($800)."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Separator Adjustment Only",
        "actions": [
          {
            "description": "Increase separator speed slightly",
            "parameter": "Separator Speed",
            "from": "680 rpm",
            "to": "730 rpm"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 16
        },
        "costOfAction": 100,
        "costAvoided": 1200,
        "netSavings": 1100,
        "successProbability": 97,
        "tradeoff": "Minimal improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 7500,
      "avgCostPerIncident": 160,
      "preventionRate": 0.35,
      "platformCost": 200000,
      "netAnnualSavings": 220000
    },
    "shiftMetrics": {
      "output": "2,240 tons",
      "energy": "$28,600",
      "efficiency": "78%"
    }
  },
  {
    "id": "cement-3",
    "industry": "Cement Manufacturing",
    "scenarioName": "Clinker Cooler Optimization",
    "description": "Clinker coolers recover heat from hot clinker (1,400+ degrees C) leaving the kiln. Recovered heat reduces fuel consumption in the kiln by pre-heating combustion air. Poor cooler operation (incorrect grate speed, uneven air distribution) wastes recoverable heat worth $200 to $600K per year and produces under-cooled clinker that degrades cement quality and damages downstream equipment.",
    "annualCostRange": "$696K–$1.4M",
    "sensors": [
      {
        "id": "s1",
        "name": "Clinker Inlet Temp",
        "unit": "°C",
        "normalValue": 1380,
        "anomalyValue": 1420,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Cooling Air Flow",
        "unit": "m3/hr",
        "normalValue": 85000,
        "anomalyValue": 72000,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Cooler Outlet Temp",
        "unit": "°C",
        "normalValue": 95,
        "anomalyValue": 135,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Secondary Air Temp",
        "unit": "°C",
        "normalValue": 950,
        "anomalyValue": 880,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Grate Speed",
        "unit": "mm/s",
        "normalValue": 80,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Heat Recovery Efficiency",
        "unit": "%",
        "normalValue": 72,
        "anomalyValue": 61,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Heat Recovery Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 23
    },
    "predictiveAlert": {
      "title": "Clinker Cooler Heat Recovery Below Target",
      "message": "Clinker cooler heat recovery at 61%, well below 72% target. Secondary air temperature low, increasing kiln fuel demand. Under-cooled clinker at 135°C risks conveyor damage (limit: 120°C).",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Grate Speed and Air Rebalance",
        "actions": [
          {
            "description": "Increase grate speed",
            "parameter": "Grate Speed",
            "from": "65 mm/s",
            "to": "78 mm/s"
          },
          {
            "description": "Redistribute cooling air to hot zones",
            "parameter": "Cooling Air Distribution",
            "from": "Uniform",
            "to": "Hot-zone weighted"
          }
        ],
        "riskReduction": {
          "from": 23,
          "to": 8
        },
        "costOfAction": 1200,
        "costAvoided": 7800,
        "netSavings": 6600,
        "successProbability": 86,
        "tradeoff": "20-minute adjustment period for grate and air rebalance."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Cooler Optimization",
        "actions": [
          {
            "description": "Set grate speed to optimal",
            "parameter": "Grate Speed",
            "from": "65 mm/s",
            "to": "82 mm/s"
          },
          {
            "description": "Full air redistribution across all zones",
            "parameter": "Air Distribution",
            "from": "Current",
            "to": "Fully optimized"
          },
          {
            "description": "Adjust clinker bed depth via feed rate",
            "parameter": "Clinker Bed Depth",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 23,
          "to": 4
        },
        "costOfAction": 2000,
        "costAvoided": 13600,
        "netSavings": 11600,
        "successProbability": 75,
        "tradeoff": "Requires cooler inspection after shift; full optimization is complex."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Air Flow Increase Only",
        "actions": [
          {
            "description": "Increase total cooling air supply by 10%",
            "parameter": "Cooling Air Flow",
            "from": "72,000 m3/hr",
            "to": "79,200 m3/hr"
          }
        ],
        "riskReduction": {
          "from": 23,
          "to": 15
        },
        "costOfAction": 600,
        "costAvoided": 4200,
        "netSavings": 3600,
        "successProbability": 94,
        "tradeoff": "Limited improvement; grate speed issue unresolved."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 280,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 696000
    },
    "shiftMetrics": {
      "output": "1,280 tons",
      "energy": "$41,200",
      "efficiency": "74%"
    }
  },
  {
    "id": "cement-4",
    "industry": "Cement Manufacturing",
    "scenarioName": "Coal Mill Fineness Optimization",
    "description": "Coal mills grind coal to fine powder for kiln burner injection. Coal fineness (particle size distribution) directly affects combustion efficiency and flame stability. Too coarse means incomplete combustion and high CO; too fine wastes grinding energy. Most mills grind 10 to 15% finer than necessary, wasting electricity while achieving no combustion benefit.",
    "annualCostRange": "$256K–$820K",
    "sensors": [
      {
        "id": "s1",
        "name": "Coal Fineness 90µm Residue",
        "unit": "%",
        "normalValue": 12,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Mill Power Draw",
        "unit": "kW",
        "normalValue": 680,
        "anomalyValue": 790,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Coal Feed Rate",
        "unit": "t/hr",
        "normalValue": 18,
        "anomalyValue": 20,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Mill Inlet Temp",
        "unit": "°C",
        "normalValue": 250,
        "anomalyValue": 280,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Burner CO Reading",
        "unit": "ppm",
        "normalValue": 45,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Mill Differential Pressure",
        "unit": "mbar",
        "normalValue": 85,
        "anomalyValue": 110,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Mill Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 16,
      "criticalThreshold": 22,
      "peakValue": 25
    },
    "predictiveAlert": {
      "title": "Coal Mill Operating Above Optimal Energy",
      "message": "Coal mill operating 25% above optimal energy. Fineness at 18% residue vs 12% target. Feed rate too high for current mill condition, causing overloading and coarser product.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Feed Rate and Temperature Balance",
        "actions": [
          {
            "description": "Reduce coal feed rate",
            "parameter": "Coal Feed Rate",
            "from": "20 t/hr",
            "to": "17 t/hr"
          },
          {
            "description": "Lower mill inlet temperature",
            "parameter": "Mill Inlet Temp",
            "from": "280°C",
            "to": "255°C"
          },
          {
            "description": "Adjust classifier speed for target fineness",
            "parameter": "Classifier Speed",
            "from": "Current",
            "to": "Increased"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 7
        },
        "costOfAction": 800,
        "costAvoided": 3760,
        "netSavings": 2960,
        "successProbability": 86,
        "tradeoff": "2 t/hr throughput reduction during optimization."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Mill Optimization",
        "actions": [
          {
            "description": "Reduce feed rate to optimal level",
            "parameter": "Coal Feed Rate",
            "from": "20 t/hr",
            "to": "16 t/hr"
          },
          {
            "description": "Recalibrate classifier for target fineness",
            "parameter": "Classifier",
            "from": "Current",
            "to": "Recalibrated"
          },
          {
            "description": "Adjust grinding pressure",
            "parameter": "Grinding Pressure",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 3
        },
        "costOfAction": 1500,
        "costAvoided": 6700,
        "netSavings": 5200,
        "successProbability": 75,
        "tradeoff": "10-minute stabilization period required after changes."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Classifier Adjustment Only",
        "actions": [
          {
            "description": "Increase classifier speed by 8%",
            "parameter": "Classifier Speed",
            "from": "Current",
            "to": "+8%"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 17
        },
        "costOfAction": 300,
        "costAvoided": 1820,
        "netSavings": 1520,
        "successProbability": 95,
        "tradeoff": "Minimal impact; feed rate and temperature issues unresolved."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 7500,
      "avgCostPerIncident": 160,
      "preventionRate": 0.38,
      "platformCost": 200000,
      "netAnnualSavings": 256000
    },
    "shiftMetrics": {
      "output": "144 tons coal",
      "energy": "$22,400",
      "efficiency": "75%"
    }
  },
  {
    "id": "cement-5",
    "industry": "Cement Manufacturing",
    "scenarioName": "Cement Finish Mill Optimization",
    "description": "Finish mills grind clinker, gypsum, and additives to produce cement. Cement quality (strength class, setting time) depends on fineness (Blaine surface area) and particle size distribution. Over-grinding produces finer cement than the specification requires, wasting 15 to 25% more electricity than necessary. Under-grinding produces weak cement that fails strength tests.",
    "annualCostRange": "$607K–$2.0M",
    "sensors": [
      {
        "id": "s1",
        "name": "Blaine Surface Area",
        "unit": "cm2/g",
        "normalValue": 3800,
        "anomalyValue": 4250,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Mill Power Draw",
        "unit": "kW",
        "normalValue": 2850,
        "anomalyValue": 3380,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Separator Efficiency",
        "unit": "%",
        "normalValue": 72,
        "anomalyValue": 61,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Cement Temperature",
        "unit": "°C",
        "normalValue": 105,
        "anomalyValue": 118,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Feed Rate",
        "unit": "t/hr",
        "normalValue": 120,
        "anomalyValue": 105,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "28-day Strength Forecast",
        "unit": "MPa",
        "normalValue": 48,
        "anomalyValue": 51,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Grinding Efficiency Gap",
      "unit": "%",
      "normalValue": 7,
      "warningThreshold": 14,
      "criticalThreshold": 21,
      "peakValue": 24
    },
    "predictiveAlert": {
      "title": "Cement Finish Mill Over-Grinding Product",
      "message": "Cement finish mill 24% above optimal energy. Blaine at 4,250 vs 3,800 target, grinding 12% finer than specification. 28-day strength forecast exceeds spec with no quality benefit.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Separator-Feed Balance",
        "actions": [
          {
            "description": "Increase feed rate",
            "parameter": "Feed Rate",
            "from": "105 t/hr",
            "to": "118 t/hr"
          },
          {
            "description": "Increase separator speed to reduce over-grinding",
            "parameter": "Separator Speed",
            "from": "Current",
            "to": "Increased"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 7
        },
        "costOfAction": 1200,
        "costAvoided": 8680,
        "netSavings": 7480,
        "successProbability": 85,
        "tradeoff": "Monitor 28-day strength forecast for 2 hours at new settings."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Recalibration",
        "actions": [
          {
            "description": "Increase feed to near-design rate",
            "parameter": "Feed Rate",
            "from": "105 t/hr",
            "to": "125 t/hr"
          },
          {
            "description": "Full separator reset to design point",
            "parameter": "Separator",
            "from": "Current",
            "to": "Full reset"
          },
          {
            "description": "Adjust grinding media classification",
            "parameter": "Media Classification",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 3
        },
        "costOfAction": 2000,
        "costAvoided": 13200,
        "netSavings": 11200,
        "successProbability": 75,
        "tradeoff": "15-minute setup with 3-hour quality monitoring period."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Feed Rate Increase Only",
        "actions": [
          {
            "description": "Increase feed rate moderately, no other changes",
            "parameter": "Feed Rate",
            "from": "105 t/hr",
            "to": "114 t/hr"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 16
        },
        "costOfAction": 500,
        "costAvoided": 4060,
        "netSavings": 3560,
        "successProbability": 94,
        "tradeoff": "Still over-grinding; separator issue unresolved."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 7200,
      "avgCostPerIncident": 280,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 607000
    },
    "shiftMetrics": {
      "output": "840 tons cement",
      "energy": "$62,400",
      "efficiency": "76%"
    }
  },
  {
    "id": "chemical-1",
    "industry": "Chemical Processing",
    "scenarioName": "Batch Cycle Time Optimization",
    "description": "In batch chemical manufacturing, each batch cycle involves charging, heating, reacting, cooling, and discharging. Operators set conservative temperature ramps, hold times, and mixing speeds to ensure quality specs are met. But these conservative settings often extend batch times by 15–25% beyond what is achievable with optimized profiles directly reducing plant throughput and revenue.",
    "annualCostRange": "$1.98M–$4.9M",
    "sensors": [
      {
        "id": "s1",
        "name": "Reactor Temperature",
        "unit": "°C",
        "normalValue": 165,
        "anomalyValue": 158,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Temp Ramp Rate",
        "unit": "°C/min",
        "normalValue": 2.5,
        "anomalyValue": 1.8,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Agitator Speed",
        "unit": "rpm",
        "normalValue": 180,
        "anomalyValue": 155,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Reaction Conversion",
        "unit": "%",
        "normalValue": 94,
        "anomalyValue": 87,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Batch Elapsed Time",
        "unit": "min",
        "normalValue": 240,
        "anomalyValue": 285,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Coolant Inlet Temp",
        "unit": "°C",
        "normalValue": 25,
        "anomalyValue": 31,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Time Overrun",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Batch Cycle Time Overrun",
      "message": "Current batch running 22% over optimal cycle time. Projected completion: 295 min vs. 240 min target. Conversion lagging at 87%.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Ramp and Mix Adjustment",
        "actions": [
          {
            "description": "Increase temperature ramp rate",
            "parameter": "Temp Ramp Rate",
            "from": "1.8°C/min",
            "to": "2.3°C/min"
          },
          {
            "description": "Increase agitator speed",
            "parameter": "Agitator Speed",
            "from": "155 rpm",
            "to": "175 rpm"
          },
          {
            "description": "Set reaction hold temperature",
            "parameter": "Reaction Temp",
            "from": "158°C",
            "to": "168°C"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 5
        },
        "costOfAction": 300,
        "costAvoided": 4200,
        "netSavings": 3900,
        "successProbability": 89,
        "tradeoff": "Slightly higher energy use per batch."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Accelerated Profile",
        "actions": [
          {
            "description": "Increase temp ramp rate to max",
            "parameter": "Temp Ramp Rate",
            "from": "1.8°C/min",
            "to": "2.8°C/min"
          },
          {
            "description": "Maximize agitator speed",
            "parameter": "Agitator Speed",
            "from": "155 rpm",
            "to": "190 rpm"
          },
          {
            "description": "Raise reaction temperature",
            "parameter": "Reaction Temp",
            "from": "158°C",
            "to": "170°C"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 0.8
        },
        "costOfAction": 600,
        "costAvoided": 5800,
        "netSavings": 5200,
        "successProbability": 76,
        "tradeoff": "Yield drops 1.2%; requires closer monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Extended Hold Only",
        "actions": [
          {
            "description": "Extend reaction hold time at current temperature",
            "parameter": "Hold Duration",
            "from": "Current",
            "to": "+10 min at 165°C"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 16
        },
        "costOfAction": 100,
        "costAvoided": 1100,
        "netSavings": 1000,
        "successProbability": 95,
        "tradeoff": "Longer cycle but better conversion guarantee."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1400,
      "avgCostPerIncident": 3500,
      "preventionRate": 0.45,
      "platformCost": 225000,
      "netAnnualSavings": 1980000
    },
    "shiftMetrics": {
      "output": "18 batches",
      "energy": "$8,600",
      "efficiency": "87%"
    }
  },
  {
    "id": "chemical-2",
    "industry": "Chemical Processing",
    "scenarioName": "Distillation Column Efficiency",
    "description": "Distillation columns separate chemical mixtures by boiling point. The key trade-off is between product purity, energy consumption (reboiler duty), and throughput. Over-refluxing to ensure purity spec is met wastes energy; under-refluxing risks off-spec product. Most operators run 10–20% above minimum reflux ratio as a safety margin.",
    "annualCostRange": "$855K–$2.7M",
    "sensors": [
      {
        "id": "s1",
        "name": "Reflux Ratio",
        "unit": "",
        "normalValue": 2.8,
        "anomalyValue": 3.5,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Reboiler Duty",
        "unit": "MW",
        "normalValue": 4.2,
        "anomalyValue": 5.1,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Top Product Purity",
        "unit": "%",
        "normalValue": 99.2,
        "anomalyValue": 99.6,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Bottom Product Purity",
        "unit": "%",
        "normalValue": 98.5,
        "anomalyValue": 98.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Column Pressure",
        "unit": "kPa",
        "normalValue": 165,
        "anomalyValue": 172,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Feed Rate",
        "unit": "m³/hr",
        "normalValue": 45,
        "anomalyValue": 42,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Overuse Index",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 25
    },
    "predictiveAlert": {
      "title": "Distillation Energy Waste Detected",
      "message": "Distillation column operating 25% above minimum energy. Reflux ratio 3.5 vs. optimal 2.9. Purity exceeding spec by 0.4% wasted energy for unnecessary quality margin.",
      "riskPercent": 70
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Reflux Optimization",
        "actions": [
          {
            "description": "Reduce reflux ratio",
            "parameter": "Reflux Ratio",
            "from": "3.5",
            "to": "2.95"
          },
          {
            "description": "Adjust reboiler setpoint",
            "parameter": "Reboiler Duty",
            "from": "5.1 MW",
            "to": "4.4 MW"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 6
        },
        "costOfAction": 400,
        "costAvoided": 5700,
        "netSavings": 5300,
        "successProbability": 90,
        "tradeoff": "Tighter quality margin (purity: 99.25%, spec: 99.0% min)."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Throughput Push",
        "actions": [
          {
            "description": "Reduce reflux ratio to minimum",
            "parameter": "Reflux Ratio",
            "from": "3.5",
            "to": "2.85"
          },
          {
            "description": "Increase feed rate",
            "parameter": "Feed Rate",
            "from": "42 m³/hr",
            "to": "47 m³/hr"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 3
        },
        "costOfAction": 800,
        "costAvoided": 7800,
        "netSavings": 7000,
        "successProbability": 73,
        "tradeoff": "Very tight on purity spec (99.05%); requires online analyzer monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Pressure Optimization Only",
        "actions": [
          {
            "description": "Reduce column pressure slightly",
            "parameter": "Column Pressure",
            "from": "172 kPa",
            "to": "162 kPa"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 17
        },
        "costOfAction": 200,
        "costAvoided": 2100,
        "netSavings": 1900,
        "successProbability": 96,
        "tradeoff": "Minimal risk, moderate improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 320,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 855000
    },
    "shiftMetrics": {
      "output": "336 m³",
      "energy": "$14,200",
      "efficiency": "84%"
    }
  },
  {
    "id": "chemical-3",
    "industry": "Chemical Processing",
    "scenarioName": "Reactor Temperature Profile Optimization",
    "description": "Continuous stirred-tank reactors (CSTRs) in specialty chemical production must maintain precise temperature profiles to achieve target conversion and selectivity. Cooling water flow and heat exchanger fouling affect temperature control. Operators compensate for fouling by raising coolant flow above necessary levels, wasting pumping energy and masking the root cause. Temperature excursions risk side reactions that reduce yield and produce off-spec impurities.",
    "annualCostRange": "$1.39M–$3.84M",
    "sensors": [
      {
        "id": "s1",
        "name": "Reactor Temperature",
        "unit": "°C",
        "normalValue": 145,
        "anomalyValue": 152,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Cooling Water Flow",
        "unit": "m3/hr",
        "normalValue": 42,
        "anomalyValue": 58,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "HX Fouling Factor",
        "unit": "",
        "normalValue": 0.0002,
        "anomalyValue": 0.0006,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Reactor Conversion",
        "unit": "%",
        "normalValue": 96,
        "anomalyValue": 91,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Selectivity",
        "unit": "%",
        "normalValue": 94,
        "anomalyValue": 89,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Jacket Inlet Temp",
        "unit": "°C",
        "normalValue": 22,
        "anomalyValue": 22,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Yield Loss Index",
      "unit": "%",
      "normalValue": 4,
      "warningThreshold": 9,
      "criticalThreshold": 15,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Reactor Yield Loss Index Elevated",
      "message": "Reactor yield loss index at 18%. Heat exchanger fouling (0.0006) causing temperature runaway compensated by excessive coolant flow. Conversion dropped to 91%, selectivity to 89%.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Coolant Profile Correction",
        "actions": [
          {
            "description": "Reduce cooling flow to optimized rate",
            "parameter": "Cooling Water Flow",
            "from": "58 m3/hr",
            "to": "48 m3/hr"
          },
          {
            "description": "Implement optimized temperature profile",
            "parameter": "Reactor Temp Profile",
            "from": "Conservative",
            "to": "Optimized"
          },
          {
            "description": "Schedule heat exchanger cleaning at next planned shutdown",
            "parameter": "HX Cleaning",
            "from": "Deferred",
            "to": "Scheduled"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 6
        },
        "costOfAction": 800,
        "costAvoided": 4600,
        "netSavings": 3800,
        "successProbability": 87,
        "tradeoff": "Must monitor closely until fouling is cleared at next shutdown."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Immediate Heat Exchanger Cleaning",
        "actions": [
          {
            "description": "Take heat exchanger offline for cleaning",
            "parameter": "HX Status",
            "from": "Online (fouled)",
            "to": "Offline for 4-hr cleaning"
          },
          {
            "description": "Post-cleaning coolant flow restoration",
            "parameter": "Cooling Water Flow",
            "from": "58 m3/hr",
            "to": "42 m3/hr"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 3
        },
        "costOfAction": 9200,
        "costAvoided": 14400,
        "netSavings": 5200,
        "successProbability": 75,
        "tradeoff": "4-hour production pause ($8,000 opportunity cost included in action cost)."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Set Point Adjustment",
        "actions": [
          {
            "description": "Lower reactor temperature target to reduce fouling impact",
            "parameter": "Reactor Temp",
            "from": "152°C",
            "to": "149°C"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 12
        },
        "costOfAction": 200,
        "costAvoided": 1800,
        "netSavings": 1600,
        "successProbability": 94,
        "tradeoff": "Does not address root cause; fouling will continue to worsen."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1200,
      "avgCostPerIncident": 3200,
      "preventionRate": 0.42,
      "platformCost": 225000,
      "netAnnualSavings": 1387000
    },
    "shiftMetrics": {
      "output": "24 batches",
      "energy": "$9,400",
      "efficiency": "83%"
    }
  },
  {
    "id": "chemical-4",
    "industry": "Chemical Processing",
    "scenarioName": "Solvent Recovery Optimization",
    "description": "Many chemical processes use solvents that must be recovered and recycled for both economic and environmental reasons. Distillation-based solvent recovery units consume significant energy and their performance degrades over time due to contamination, fouling, and suboptimal operating conditions. Most plants run recovery units at fixed conditions regardless of feed quality variation, resulting in 10 to 20% energy waste and suboptimal recovery rates.",
    "annualCostRange": "$1.02M–$2.48M",
    "sensors": [
      {
        "id": "s1",
        "name": "Recovery Rate",
        "unit": "%",
        "normalValue": 96.5,
        "anomalyValue": 93.1,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Reboiler Duty",
        "unit": "MW",
        "normalValue": 2.8,
        "anomalyValue": 3.4,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Solvent Purity",
        "unit": "%",
        "normalValue": 99.4,
        "anomalyValue": 98.7,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Feed Contamination",
        "unit": "ppm",
        "normalValue": 120,
        "anomalyValue": 380,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Column Differential Pressure",
        "unit": "kPa",
        "normalValue": 28,
        "anomalyValue": 42,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Condenser Duty",
        "unit": "MW",
        "normalValue": 2.6,
        "anomalyValue": 3.1,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Recovery Efficiency Gap",
      "unit": "%",
      "normalValue": 6,
      "warningThreshold": 14,
      "criticalThreshold": 20,
      "peakValue": 23
    },
    "predictiveAlert": {
      "title": "Solvent Recovery Below Optimal Efficiency",
      "message": "Solvent recovery 23% below optimal efficiency. Feed contamination at 380 ppm causing column flooding tendency. Recovery rate dropped to 93.1%, losing $2,400/day in unrecovered solvent.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Feed Rate Reduction and Purge",
        "actions": [
          {
            "description": "Reduce feed rate by 15%",
            "parameter": "Feed Rate",
            "from": "Current",
            "to": "-15%"
          },
          {
            "description": "Increase purge stream to remove contamination",
            "parameter": "Purge Stream",
            "from": "Current",
            "to": "Increased"
          },
          {
            "description": "Adjust reflux ratio for cleaner feed",
            "parameter": "Reflux Ratio",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 23,
          "to": 8
        },
        "costOfAction": 1200,
        "costAvoided": 7200,
        "netSavings": 6000,
        "successProbability": 86,
        "tradeoff": "12% throughput reduction for 6 hours while purging contamination."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Column Cleaning and Optimization",
        "actions": [
          {
            "description": "Schedule column inspection and packing cleaning",
            "parameter": "Column Status",
            "from": "Online (fouled)",
            "to": "Offline for 8-hr cleaning"
          },
          {
            "description": "Post-clean dose setpoint optimization",
            "parameter": "Operating Conditions",
            "from": "Current",
            "to": "Fully optimized"
          }
        ],
        "riskReduction": {
          "from": 23,
          "to": 3
        },
        "costOfAction": 14400,
        "costAvoided": 21200,
        "netSavings": 6800,
        "successProbability": 76,
        "tradeoff": "8-hour shutdown with $12,000 opportunity cost included in action cost."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Reflux Ratio Adjustment Only",
        "actions": [
          {
            "description": "Increase reflux ratio to 3.2",
            "parameter": "Reflux Ratio",
            "from": "Current",
            "to": "3.2"
          }
        ],
        "riskReduction": {
          "from": 23,
          "to": 15
        },
        "costOfAction": 400,
        "costAvoided": 3600,
        "netSavings": 3200,
        "successProbability": 93,
        "tradeoff": "Higher energy use; only partial improvement; contamination not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 340,
      "avgCostPerIncident": 1800,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 1020000
    },
    "shiftMetrics": {
      "output": "3 batches recovered",
      "energy": "$11,200",
      "efficiency": "81%"
    }
  },
  {
    "id": "chemical-5",
    "industry": "Chemical Processing",
    "scenarioName": "Compressor Train Efficiency",
    "description": "Industrial gas compressors in chemical plants (for process gases, instrument air, nitrogen, hydrogen) are significant energy consumers. Multi-stage compressors lose efficiency through inter-stage cooling degradation, seal leakage, and impeller wear. Most plants run compressors at fixed inlet guide vane positions regardless of actual demand variation, wasting 15 to 25% of compression energy during low-demand periods.",
    "annualCostRange": "$929K–$1.85M",
    "sensors": [
      {
        "id": "s1",
        "name": "Compressor Efficiency",
        "unit": "%",
        "normalValue": 82,
        "anomalyValue": 71,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Discharge Pressure",
        "unit": "bar",
        "normalValue": 12.5,
        "anomalyValue": 13.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Inter-stage Cooling Temp",
        "unit": "°C",
        "normalValue": 38,
        "anomalyValue": 52,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Shaft Power",
        "unit": "kW",
        "normalValue": 1850,
        "anomalyValue": 2280,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Gas Demand",
        "unit": "Nm3/hr",
        "normalValue": 8400,
        "anomalyValue": 7200,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Vibration Level",
        "unit": "mm/s",
        "normalValue": 2.1,
        "anomalyValue": 3.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 26
    },
    "predictiveAlert": {
      "title": "Compressor Train 26% Above Optimal Energy",
      "message": "Compressor train 26% above optimal energy. Inter-stage cooling degradation at 52°C (target 38°C) increasing compression work. Discharge pressure 0.7 bar above actual demand.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Cooling Restoration and Pressure Setpoint",
        "actions": [
          {
            "description": "Schedule inter-stage cooler cleaning in next maintenance window",
            "parameter": "Cooler Status",
            "from": "Fouled (52°C)",
            "to": "Cleaning scheduled"
          },
          {
            "description": "Reduce discharge pressure setpoint for current demand",
            "parameter": "Discharge Pressure",
            "from": "13.2 bar",
            "to": "12.0 bar"
          },
          {
            "description": "Monitor vibration during setpoint change",
            "parameter": "Vibration Monitoring",
            "from": "Periodic",
            "to": "Continuous"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 9
        },
        "costOfAction": 1600,
        "costAvoided": 8000,
        "netSavings": 6400,
        "successProbability": 85,
        "tradeoff": "Monitor vibration closely during pressure setpoint change."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Demand-Based Variable Speed Control",
        "actions": [
          {
            "description": "Implement VSD modulation to match exact gas demand",
            "parameter": "Control Mode",
            "from": "Fixed guide vanes",
            "to": "Demand-based VSD"
          },
          {
            "description": "Validate new control logic",
            "parameter": "VSD Program",
            "from": "Current",
            "to": "Demand-matched"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 4
        },
        "costOfAction": 2800,
        "costAvoided": 14600,
        "netSavings": 11800,
        "successProbability": 75,
        "tradeoff": "VSD programming change requires 2-hour validation window."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Pressure Reduction Only",
        "actions": [
          {
            "description": "Reduce discharge pressure setpoint modestly",
            "parameter": "Discharge Pressure",
            "from": "13.2 bar",
            "to": "12.2 bar"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 17
        },
        "costOfAction": 600,
        "costAvoided": 5400,
        "netSavings": 4800,
        "successProbability": 93,
        "tradeoff": "Cooling degradation remains; limited improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 350,
      "avgCostPerIncident": 1100,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 929000
    },
    "shiftMetrics": {
      "output": "7,200 Nm3/hr gas",
      "energy": "$16,800",
      "efficiency": "71%"
    }
  },
  {
    "id": "food-1",
    "industry": "Food & Beverage",
    "scenarioName": "Changeover & Cleaning Optimization",
    "description": "Food production lines must be cleaned and reconfigured between product runs. Poor sequencing of products means more changeovers, longer clean-in-place (CIP) cycles, and more wasted product at the head and tail of each run. Most plants sequence by demand date without optimizing for transition compatibility.",
    "annualCostRange": "$1.74M–$4.3M",
    "sensors": [
      {
        "id": "s1",
        "name": "Current Product",
        "unit": "",
        "normalValue": "Vanilla Yogurt",
        "anomalyValue": "Vanilla Yogurt",
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Next Scheduled",
        "unit": "",
        "normalValue": "Blueberry",
        "anomalyValue": "Strawberry (allergen)",
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "CIP Cycle Time",
        "unit": "min",
        "normalValue": 25,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Product Waste",
        "unit": "kg",
        "normalValue": 80,
        "anomalyValue": 220,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Line Downtime",
        "unit": "min",
        "normalValue": 35,
        "anomalyValue": 85,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Products Remaining",
        "unit": "today",
        "normalValue": 6,
        "anomalyValue": 6,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Changeover Cost Index",
      "unit": "$",
      "normalValue": 800,
      "warningThreshold": 2000,
      "criticalThreshold": 3500,
      "peakValue": 4200
    },
    "predictiveAlert": {
      "title": "Expensive Changeover Approaching",
      "message": "Next changeover (Vanilla → Strawberry allergen) requires full CIP cycle. Estimated cost: $4,200 (85 min downtime + 220 kg waste). This is the most expensive transition in today's schedule.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Resequence Next 3 Products",
        "actions": [
          {
            "description": "Move Blueberry (non-allergen) between Vanilla and Strawberry",
            "parameter": "Product Sequence",
            "from": "Vanilla → Strawberry",
            "to": "Vanilla → Blueberry → Strawberry"
          }
        ],
        "riskReduction": {
          "from": 4200,
          "to": 2000
        },
        "costOfAction": 200,
        "costAvoided": 2200,
        "netSavings": 2000,
        "successProbability": 93,
        "tradeoff": "Blueberry order ships 2 hours earlier than planned (still within window)."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Day Resequence",
        "actions": [
          {
            "description": "Optimize all 6 remaining products for minimum total changeover cost",
            "parameter": "Daily Schedule",
            "from": "Due-date order",
            "to": "Min-changeover path"
          }
        ],
        "riskReduction": {
          "from": 4200,
          "to": 800
        },
        "costOfAction": 500,
        "costAvoided": 4400,
        "netSavings": 3900,
        "successProbability": 85,
        "tradeoff": "Some orders shift by up to 4 hours."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Extended Flush Only",
        "actions": [
          {
            "description": "Add intermediate water flush before allergen product",
            "parameter": "CIP Cycle",
            "from": "65 min full CIP",
            "to": "45 min with pre-flush"
          }
        ],
        "riskReduction": {
          "from": 4200,
          "to": 3300
        },
        "costOfAction": 300,
        "costAvoided": 900,
        "netSavings": 600,
        "successProbability": 97,
        "tradeoff": "Uses more water; moderate improvement only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2400,
      "avgCostPerIncident": 1800,
      "preventionRate": 0.45,
      "platformCost": 200000,
      "netAnnualSavings": 1740000
    },
    "shiftMetrics": {
      "output": "8,400 kg",
      "energy": "$3,200",
      "efficiency": "76%"
    }
  },
  {
    "id": "food-2",
    "industry": "Food & Beverage",
    "scenarioName": "Pasteurization Process Optimization",
    "description": "Pasteurization and thermal processes must achieve exact time-temperature profiles to ensure food safety while maintaining product quality. Over-processing (too hot, too long) is safe but degrades quality, reduces shelf life, and wastes energy. Most plants set conservative thermal profiles that over-process by 10–20%.",
    "annualCostRange": "$630K–$830K",
    "sensors": [
      {
        "id": "s1",
        "name": "Product Temperature",
        "unit": "°C",
        "normalValue": 72,
        "anomalyValue": 76.5,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Hold Time",
        "unit": "sec",
        "normalValue": 15,
        "anomalyValue": 22,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Flow Rate",
        "unit": "L/min",
        "normalValue": 200,
        "anomalyValue": 185,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Heat Exchanger Eff.",
        "unit": "%",
        "normalValue": 92,
        "anomalyValue": 84,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Energy Consumption",
        "unit": "kW",
        "normalValue": 145,
        "anomalyValue": 172,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Product Quality Score",
        "unit": "",
        "normalValue": 94,
        "anomalyValue": 87,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Over-Processing Index",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 21
    },
    "predictiveAlert": {
      "title": "Pasteurization Over-Processing Detected",
      "message": "Pasteurization line over-processing by 21%. Temperature 4.5°C above minimum, hold time 7 seconds beyond required. Energy waste: $95/hr. Product quality score degraded to 87 (target: 94+).",
      "riskPercent": 68
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature-Flow Rebalance",
        "actions": [
          {
            "description": "Reduce product temperature",
            "parameter": "Product Temp",
            "from": "76.5°C",
            "to": "72.5°C"
          },
          {
            "description": "Increase flow rate",
            "parameter": "Flow Rate",
            "from": "185 L/min",
            "to": "195 L/min"
          },
          {
            "description": "Hold time adjusts automatically",
            "parameter": "Hold Time",
            "from": "22 sec",
            "to": "16 sec"
          }
        ],
        "riskReduction": {
          "from": 21,
          "to": 4
        },
        "costOfAction": 300,
        "costAvoided": 1170,
        "netSavings": 870,
        "successProbability": 91,
        "tradeoff": "Closer to minimum pasteurization threshold; validate with daily audit."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Thermal Optimization",
        "actions": [
          {
            "description": "Set temperature to minimum specification",
            "parameter": "Product Temp",
            "from": "76.5°C",
            "to": "72.0°C"
          },
          {
            "description": "Restore flow rate to design spec",
            "parameter": "Flow Rate",
            "from": "185 L/min",
            "to": "200 L/min"
          },
          {
            "description": "Set hold time to minimum",
            "parameter": "Hold Time",
            "from": "22 sec",
            "to": "15 sec"
          }
        ],
        "riskReduction": {
          "from": 21,
          "to": 0
        },
        "costOfAction": 400,
        "costAvoided": 1425,
        "netSavings": 1025,
        "successProbability": 82,
        "tradeoff": "Zero margin on food safety threshold; requires continuous monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Reduction Only",
        "actions": [
          {
            "description": "Reduce temperature moderately",
            "parameter": "Product Temp",
            "from": "76.5°C",
            "to": "74.0°C"
          }
        ],
        "riskReduction": {
          "from": 21,
          "to": 11
        },
        "costOfAction": 100,
        "costAvoided": 630,
        "netSavings": 530,
        "successProbability": 97,
        "tradeoff": "Modest improvement; still over-processing."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 6000,
      "avgCostPerIncident": 80,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 630000
    },
    "shiftMetrics": {
      "output": "24,000 L",
      "energy": "$4,600",
      "efficiency": "84%"
    }
  },
  {
    "id": "food-3",
    "industry": "Food & Beverage",
    "scenarioName": "Refrigeration System Optimization",
    "description": "Food manufacturing facilities use large refrigeration systems to maintain product temperatures throughout production and storage. Multi-compressor refrigeration racks are often controlled by simple on/off or basic PID controllers that do not optimize which compressor combination to run or at what suction pressure. Plants typically over-refrigerate by 10 to 20%, running more compressor capacity than load requires, and set suction pressures conservatively low.",
    "annualCostRange": "$421K–$780K",
    "sensors": [
      {
        "id": "s1",
        "name": "Suction Pressure",
        "unit": "bar",
        "normalValue": 2.4,
        "anomalyValue": 1.9,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Condensing Pressure",
        "unit": "bar",
        "normalValue": 14.2,
        "anomalyValue": 14.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Compressor Power Total",
        "unit": "kW",
        "normalValue": 285,
        "anomalyValue": 340,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Refrigerated Space Temp",
        "unit": "°C",
        "normalValue": -18.5,
        "anomalyValue": -21.2,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "System COP",
        "unit": "",
        "normalValue": 2.8,
        "anomalyValue": 2.2,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Compressors Running",
        "unit": "",
        "normalValue": 3,
        "anomalyValue": 4,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Refrigeration Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 16,
      "criticalThreshold": 24,
      "peakValue": 28
    },
    "predictiveAlert": {
      "title": "Refrigeration System Above Optimal Energy",
      "message": "Refrigeration system 28% above optimal energy. Suction pressure at 1.9 bar (optimal 2.4 bar for current load). 4 compressors running when load requires 3. System COP at 2.2 vs. target 2.8.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Suction Pressure Optimization",
        "actions": [
          {
            "description": "Raise suction pressure setpoint",
            "parameter": "Suction Pressure",
            "from": "1.9 bar",
            "to": "2.3 bar"
          },
          {
            "description": "Cycle one compressor offline",
            "parameter": "Compressors Running",
            "from": "4",
            "to": "3"
          },
          {
            "description": "Monitor refrigerated space temperatures",
            "parameter": "Space Temp Monitoring",
            "from": "Periodic",
            "to": "30-min intensive"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 10
        },
        "costOfAction": 500,
        "costAvoided": 3500,
        "netSavings": 3000,
        "successProbability": 88,
        "tradeoff": "Monitor refrigerated space temps for 30 minutes at new settings."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full System Optimization",
        "actions": [
          {
            "description": "Raise suction pressure to optimal",
            "parameter": "Suction Pressure",
            "from": "1.9 bar",
            "to": "2.4 bar"
          },
          {
            "description": "Optimize compressor sequencing",
            "parameter": "Compressor Sequence",
            "from": "Fixed",
            "to": "Load-optimized"
          },
          {
            "description": "Adjust defrost cycle timing to off-peak",
            "parameter": "Defrost Schedule",
            "from": "Current",
            "to": "Off-peak"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 5
        },
        "costOfAction": 800,
        "costAvoided": 5500,
        "netSavings": 4700,
        "successProbability": 77,
        "tradeoff": "Requires refrigeration technician to validate all changes."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Compressor Cycling Only",
        "actions": [
          {
            "description": "Cycle one compressor offline, no pressure change",
            "parameter": "Compressors Running",
            "from": "4",
            "to": "3"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 18
        },
        "costOfAction": 200,
        "costAvoided": 2200,
        "netSavings": 2000,
        "successProbability": 94,
        "tradeoff": "Partial improvement; suction pressure remains suboptimal."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 7800,
      "avgCostPerIncident": 120,
      "preventionRate": 0.45,
      "platformCost": 200000,
      "netAnnualSavings": 421000
    },
    "shiftMetrics": {
      "output": "18,000 kg product",
      "energy": "$8,200",
      "efficiency": "72%"
    }
  },
  {
    "id": "food-4",
    "industry": "Food & Beverage",
    "scenarioName": "Mixing and Blending Optimization",
    "description": "Food and beverage mixing operations (sauces, dressings, beverages, dairy) involve precise ingredient ratios, mixing times, and temperatures to achieve target product quality (viscosity, texture, pH, Brix). Operators typically run conservative mixing profiles with longer times and higher speeds than necessary to ensure uniformity, reducing batch throughput by 15 to 25% and increasing energy consumption.",
    "annualCostRange": "$1.19M–$2.64M",
    "sensors": [
      {
        "id": "s1",
        "name": "Mixer Speed",
        "unit": "rpm",
        "normalValue": 120,
        "anomalyValue": 95,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Batch Temperature",
        "unit": "°C",
        "normalValue": 68,
        "anomalyValue": 64,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Viscosity",
        "unit": "cP",
        "normalValue": 850,
        "anomalyValue": 1120,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "pH",
        "unit": "",
        "normalValue": 4.2,
        "anomalyValue": 4.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Batch Elapsed Time",
        "unit": "min",
        "normalValue": 35,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Ingredient Uniformity Index",
        "unit": "",
        "normalValue": 97,
        "anomalyValue": 91,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Time Overrun",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 25,
      "peakValue": 30
    },
    "predictiveAlert": {
      "title": "Mixing Batch 30% Over Target Cycle Time",
      "message": "Mixing batch 30% over target cycle time. Viscosity high at 1,120 cP (target 850 cP) indicating incomplete dispersion. Batch temperature 4°C below target reducing dispersion efficiency.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature and Speed Correction",
        "actions": [
          {
            "description": "Increase batch temperature",
            "parameter": "Batch Temperature",
            "from": "64°C",
            "to": "67°C"
          },
          {
            "description": "Increase mixer speed",
            "parameter": "Mixer Speed",
            "from": "95 rpm",
            "to": "115 rpm"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 9
        },
        "costOfAction": 600,
        "costAvoided": 5400,
        "netSavings": 4800,
        "successProbability": 87,
        "tradeoff": "Monitor pH closely at higher temperature and speed."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Accelerated Dispersion Profile",
        "actions": [
          {
            "description": "Increase batch temperature to upper range",
            "parameter": "Batch Temperature",
            "from": "64°C",
            "to": "69°C"
          },
          {
            "description": "Boost mixer speed for 5 minutes then reduce",
            "parameter": "Mixer Speed",
            "from": "95 rpm",
            "to": "130 rpm then 115 rpm"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 4
        },
        "costOfAction": 900,
        "costAvoided": 7300,
        "netSavings": 6400,
        "successProbability": 76,
        "tradeoff": "Closer to thermal degradation limit; requires close operator monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Speed Increase Only",
        "actions": [
          {
            "description": "Increase mixer speed, no temperature change",
            "parameter": "Mixer Speed",
            "from": "95 rpm",
            "to": "108 rpm"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 18
        },
        "costOfAction": 300,
        "costAvoided": 3600,
        "netSavings": 3300,
        "successProbability": 94,
        "tradeoff": "Moderate improvement; temperature deficit unresolved."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2200,
      "avgCostPerIncident": 1500,
      "preventionRate": 0.42,
      "platformCost": 200000,
      "netAnnualSavings": 1186000
    },
    "shiftMetrics": {
      "output": "28 batches",
      "energy": "$4,800",
      "efficiency": "70%"
    }
  },
  {
    "id": "food-5",
    "industry": "Food & Beverage",
    "scenarioName": "Filler Line Efficiency Optimization",
    "description": "High-speed filling lines (bottles, cartons, pouches) are often the bottleneck in food and beverage production. Changeovers between package sizes, product viscosity variations, and fill volume drift cause lines to run 10 to 20% below rated speed, with overfill giveaway (filling more than nominal volume to stay out of compliance risk) costing $0.5 to 2M per year in excess product. Operators run conservative fill targets to avoid underfill regulatory risk.",
    "annualCostRange": "$3.76M–$8.8M",
    "sensors": [
      {
        "id": "s1",
        "name": "Line Speed",
        "unit": "bottles/min",
        "normalValue": 420,
        "anomalyValue": 355,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Fill Volume",
        "unit": "ml",
        "normalValue": 502,
        "anomalyValue": 508,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Fill Volume Deviation",
        "unit": "ml",
        "normalValue": 1.2,
        "anomalyValue": 3.8,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Filler Bowl Level",
        "unit": "%",
        "normalValue": 72,
        "anomalyValue": 58,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Product Viscosity",
        "unit": "cP",
        "normalValue": 42,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Reject Rate",
        "unit": "%",
        "normalValue": 0.8,
        "anomalyValue": 2.4,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Line Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Filling Line 22% Below Optimal Efficiency",
      "message": "Filling line 22% below optimal. Fill volume at 508ml vs. 500ml nominal, 8ml overfill giveaway costing $2,100/hr. Line speed reduced due to fill volume instability at current viscosity.",
      "riskPercent": 80
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Fill Valve Recalibration",
        "actions": [
          {
            "description": "Recalibrate fill valves for current product viscosity",
            "parameter": "Fill Valve Calibration",
            "from": "Previous viscosity",
            "to": "Current viscosity (48 cP)"
          },
          {
            "description": "Adjust filler bowl level",
            "parameter": "Filler Bowl Level",
            "from": "58%",
            "to": "68%"
          },
          {
            "description": "Resume line speed after calibration",
            "parameter": "Line Speed",
            "from": "355 bottles/min",
            "to": "400 bottles/min"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 7
        },
        "costOfAction": 2800,
        "costAvoided": 33600,
        "netSavings": 30800,
        "successProbability": 88,
        "tradeoff": "12-minute calibration stop required."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Line Optimization",
        "actions": [
          {
            "description": "Recalibrate fill valves for current viscosity",
            "parameter": "Fill Valve Calibration",
            "from": "Previous viscosity",
            "to": "Current (48 cP)"
          },
          {
            "description": "Optimize line speed for current viscosity",
            "parameter": "Line Speed",
            "from": "355 bottles/min",
            "to": "415 bottles/min"
          },
          {
            "description": "Adjust infeed timing for new speed",
            "parameter": "Infeed Timing",
            "from": "Current",
            "to": "Speed-optimized"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 4000,
        "costAvoided": 44800,
        "netSavings": 40800,
        "successProbability": 77,
        "tradeoff": "20-minute setup with mandatory quality check at new speed."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Bowl Level Adjustment Only",
        "actions": [
          {
            "description": "Increase filler bowl level to improve fill stability",
            "parameter": "Filler Bowl Level",
            "from": "58%",
            "to": "66%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 15
        },
        "costOfAction": 600,
        "costAvoided": 11200,
        "netSavings": 10600,
        "successProbability": 94,
        "tradeoff": "Fill volume still elevated; line speed still reduced."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 5500,
      "avgCostPerIncident": 1600,
      "preventionRate": 0.45,
      "platformCost": 200000,
      "netAnnualSavings": 3760000
    },
    "shiftMetrics": {
      "output": "170,400 bottles",
      "energy": "$5,200",
      "efficiency": "78%"
    }
  },
  {
    "id": "aluminum-1",
    "industry": "Aluminum Processing",
    "scenarioName": "Extrusion Press Productivity Optimization",
    "description": "Aluminum extrusion presses are capital-intensive bottlenecks. Productivity is driven by billet temperature, ram speed, exit temperature, and die condition. Operators run conservative speeds to avoid surface tearing and die failure, but typically leave 10–20% of press capacity on the table. The optimal speed profile varies by alloy, die geometry, and billet temperature, a multi-variable optimization most operators solve by experience and habit.",
    "annualCostRange": "$810K–$2.24M",
    "sensors": [
      {
        "id": "s1",
        "name": "Ram Speed",
        "unit": "mm/s",
        "normalValue": 8.5,
        "anomalyValue": 6.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Billet Temperature",
        "unit": "°C",
        "normalValue": 480,
        "anomalyValue": 465,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Exit Temperature",
        "unit": "°C",
        "normalValue": 540,
        "anomalyValue": 555,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Press Pressure",
        "unit": "tons",
        "normalValue": 1850,
        "anomalyValue": 2150,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Die Temperature",
        "unit": "°C",
        "normalValue": 460,
        "anomalyValue": 490,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Surface Quality Score",
        "unit": "",
        "normalValue": 92,
        "anomalyValue": 78,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Productivity Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 27
    },
    "predictiveAlert": {
      "title": "Extrusion Press Below Optimal Productivity",
      "message": "Extrusion press running 27% below optimal productivity. Ram speed conservative for current alloy-die combination. Press pressure elevated due to low billet temperature.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Billet-Speed Optimization",
        "actions": [
          {
            "description": "Increase billet temperature",
            "parameter": "Billet Temp",
            "from": "465°C",
            "to": "485°C"
          },
          {
            "description": "Increase ram speed",
            "parameter": "Ram Speed",
            "from": "6.2 mm/s",
            "to": "7.8 mm/s"
          },
          {
            "description": "Monitor exit temperature",
            "parameter": "Exit Temp",
            "from": "Monitor",
            "to": "Target 540°C"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 10
        },
        "costOfAction": 400,
        "costAvoided": 3600,
        "netSavings": 3200,
        "successProbability": 87,
        "tradeoff": "5-minute billet heating adjustment before speed increase."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Press Optimization",
        "actions": [
          {
            "description": "Increase billet temperature to upper range",
            "parameter": "Billet Temp",
            "from": "465°C",
            "to": "490°C"
          },
          {
            "description": "Maximize ram speed for current alloy",
            "parameter": "Ram Speed",
            "from": "6.2 mm/s",
            "to": "8.2 mm/s"
          },
          {
            "description": "Adjust nitrogen cooling on die",
            "parameter": "Die Cooling",
            "from": "Standard",
            "to": "Increased"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 5
        },
        "costOfAction": 700,
        "costAvoided": 5100,
        "netSavings": 4400,
        "successProbability": 74,
        "tradeoff": "Closer to surface tear threshold; requires continuous monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Ram Speed Only",
        "actions": [
          {
            "description": "Increase ram speed slightly, no temperature change",
            "parameter": "Ram Speed",
            "from": "6.2 mm/s",
            "to": "7.0 mm/s"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 20
        },
        "costOfAction": 100,
        "costAvoided": 1800,
        "netSavings": 1700,
        "successProbability": 96,
        "tradeoff": "Still leaving significant capacity unused."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 700,
      "avgCostPerIncident": 3200,
      "preventionRate": 0.45,
      "platformCost": 200000,
      "netAnnualSavings": 810000
    },
    "shiftMetrics": {
      "output": "18.4 tons",
      "energy": "$4,200",
      "efficiency": "73%"
    }
  },
  {
    "id": "aluminum-2",
    "industry": "Aluminum Processing",
    "scenarioName": "Homogenization Furnace Energy Optimization",
    "description": "Homogenization furnaces heat aluminum billets to dissolve alloying elements uniformly. The process requires holding billets at precise temperatures for extended periods (8–24 hours). Most plants over-soak by 15–25% (longer hold times and higher temperatures than metallurgically necessary) as a quality safety margin, wasting energy on every batch.",
    "annualCostRange": "$220K–$420K",
    "sensors": [
      {
        "id": "s1",
        "name": "Furnace Temperature",
        "unit": "°C",
        "normalValue": 575,
        "anomalyValue": 595,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Billet Core Temp",
        "unit": "°C",
        "normalValue": 570,
        "anomalyValue": 568,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Hold Time Elapsed",
        "unit": "hrs",
        "normalValue": 12,
        "anomalyValue": 15.5,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Energy Consumption",
        "unit": "kWh/ton",
        "normalValue": 185,
        "anomalyValue": 228,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Uniformity Index",
        "unit": "",
        "normalValue": 96,
        "anomalyValue": 97,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Batch Size",
        "unit": "billets",
        "normalValue": 48,
        "anomalyValue": 48,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Overuse Index",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 25,
      "peakValue": 28
    },
    "predictiveAlert": {
      "title": "Homogenization Batch Over-Soaking",
      "message": "Homogenization batch over-soaking by 28%. Core temperature reached target 2.5 hours ago. Continued heating consuming $140/hr in excess energy with negligible metallurgical benefit.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Begin Controlled Cooling Now",
        "actions": [
          {
            "description": "Initiate cooling ramp immediately",
            "parameter": "Furnace State",
            "from": "Holding at 595°C",
            "to": "Controlled cool"
          },
          {
            "description": "Uniformity already exceeds spec",
            "parameter": "Uniformity Index",
            "from": "97%",
            "to": "Above 95% spec"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 8
        },
        "costOfAction": 0,
        "costAvoided": 350,
        "netSavings": 350,
        "successProbability": 98,
        "tradeoff": "None; metallurgical spec already exceeded."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Optimize Next Batch Profile",
        "actions": [
          {
            "description": "Reduce target temperature for this alloy",
            "parameter": "Target Temp",
            "from": "595°C",
            "to": "585°C"
          },
          {
            "description": "Reduce planned hold time",
            "parameter": "Hold Duration",
            "from": "15.5 hrs",
            "to": "12 hrs"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 3
        },
        "costOfAction": 200,
        "costAvoided": 520,
        "netSavings": 320,
        "successProbability": 82,
        "tradeoff": "Tighter quality margin; requires metallurgist sign-off."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Reduce Temperature Only",
        "actions": [
          {
            "description": "Lower furnace setpoint for remainder of hold",
            "parameter": "Furnace Temp",
            "from": "595°C",
            "to": "580°C"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 20
        },
        "costOfAction": 0,
        "costAvoided": 85,
        "netSavings": 85,
        "successProbability": 99,
        "tradeoff": "Minimal change, minimal savings."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 600,
      "avgCostPerIncident": 700,
      "preventionRate": 0.5,
      "platformCost": 200000,
      "netAnnualSavings": 220000
    },
    "shiftMetrics": {
      "output": "48 billets",
      "energy": "$8,400",
      "efficiency": "72%"
    }
  },
  {
    "id": "aluminum-3",
    "industry": "Aluminum Processing",
    "scenarioName": "Cold Rolling Mill Flatness Control",
    "description": "Aluminum cold rolling mills produce sheet and foil to precise thickness and flatness tolerances. Flatness defects (edge wave, center buckle, quarter buckle) result from uneven roll gap profile, thermal crown, and work roll bending. Off-gauge or non-flat material is downgraded or scrapped. Achieving tight flatness requires real-time adjustment of roll bending, tilting, and coolant distribution, adjustments most operators make reactively rather than predictively.",
    "annualCostRange": "$388K–$1.40M",
    "sensors": [
      {
        "id": "s1",
        "name": "Strip Flatness",
        "unit": "I-units",
        "normalValue": 5,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Roll Bending Force",
        "unit": "kN",
        "normalValue": 850,
        "anomalyValue": 720,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Thermal Crown",
        "unit": "µm",
        "normalValue": 45,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Exit Thickness Deviation",
        "unit": "%",
        "normalValue": 0.3,
        "anomalyValue": 1.1,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Coolant Flow Distribution",
        "unit": "%",
        "normalValue": 95,
        "anomalyValue": 78,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Roll Force Asymmetry",
        "unit": "%",
        "normalValue": 1.2,
        "anomalyValue": 4.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Flatness Defect Rate",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 14,
      "peakValue": 17
    },
    "predictiveAlert": {
      "title": "Strip Flatness Exceeding Limit",
      "message": "Strip flatness at 18 I-units (limit: 8). Roll thermal crown 68µm (optimal 45µm) causing center buckle tendency. Coolant distribution imbalance detected.",
      "riskPercent": 80
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Bending and Coolant Correction",
        "actions": [
          {
            "description": "Increase roll bending force",
            "parameter": "Roll Bending Force",
            "from": "720 kN",
            "to": "890 kN"
          },
          {
            "description": "Redistribute coolant to center zones",
            "parameter": "Coolant Distribution",
            "from": "Imbalanced (78%)",
            "to": "Center-weighted"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 9
        },
        "costOfAction": 800,
        "costAvoided": 13000,
        "netSavings": 12200,
        "successProbability": 86,
        "tradeoff": "10-minute thermal stabilization period at new settings."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Profile Control",
        "actions": [
          {
            "description": "Adjust roll bending and tilt together",
            "parameter": "Roll Bending",
            "from": "720 kN",
            "to": "900 kN with tilt correction"
          },
          {
            "description": "Redistribute coolant across all zones",
            "parameter": "Coolant Distribution",
            "from": "Imbalanced",
            "to": "Fully optimized"
          },
          {
            "description": "Reduce mill speed by 5% for thermal recovery",
            "parameter": "Mill Speed",
            "from": "Current",
            "to": "-5%"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 4
        },
        "costOfAction": 1800,
        "costAvoided": 21600,
        "netSavings": 19800,
        "successProbability": 75,
        "tradeoff": "Speed reduction reduces throughput during thermal recovery."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Coolant Redistribution Only",
        "actions": [
          {
            "description": "Redistribute coolant to center zones without bending change",
            "parameter": "Coolant Distribution",
            "from": "Imbalanced (78%)",
            "to": "Center-weighted"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 13
        },
        "costOfAction": 300,
        "costAvoided": 5300,
        "netSavings": 5000,
        "successProbability": 93,
        "tradeoff": "Partial improvement only; thermal crown not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 280,
      "avgCostPerIncident": 5000,
      "preventionRate": 0.42,
      "platformCost": 200000,
      "netAnnualSavings": 388000
    },
    "shiftMetrics": {
      "output": "24.2 tons sheet",
      "energy": "$5,800",
      "efficiency": "71%"
    }
  },
  {
    "id": "aluminum-4",
    "industry": "Aluminum Processing",
    "scenarioName": "Anodizing Process Optimization",
    "description": "Anodizing aluminum creates a protective oxide layer through an electrochemical process. The key variables are electrolyte temperature, current density, sulfuric acid concentration, and anodizing time, which together determine coating thickness, hardness, and appearance. Over-anodizing wastes electricity and time; under-anodizing produces substandard coatings. Most shops run conservative parameters that extend cycle times by 15 to 20% to ensure specification is met.",
    "annualCostRange": "$208K–$600K",
    "sensors": [
      {
        "id": "s1",
        "name": "Electrolyte Temp",
        "unit": "°C",
        "normalValue": 18,
        "anomalyValue": 22,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Current Density",
        "unit": "A/dm2",
        "normalValue": 1.5,
        "anomalyValue": 1.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Acid Concentration",
        "unit": "g/L",
        "normalValue": 180,
        "anomalyValue": 165,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Coating Thickness",
        "unit": "µm",
        "normalValue": 20,
        "anomalyValue": 17,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Cycle Elapsed Time",
        "unit": "min",
        "normalValue": 40,
        "anomalyValue": 52,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Rectifier Efficiency",
        "unit": "%",
        "normalValue": 94,
        "anomalyValue": 88,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 27
    },
    "predictiveAlert": {
      "title": "Anodizing Cycle 27% Over Optimal",
      "message": "Anodizing cycle 27% over optimal. Electrolyte temperature elevated to 22°C (target 18°C) reducing coating quality and requiring longer cycle times to achieve spec thickness.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature and Current Correction",
        "actions": [
          {
            "description": "Reduce electrolyte temperature toward target",
            "parameter": "Electrolyte Temp",
            "from": "22°C",
            "to": "19°C"
          },
          {
            "description": "Increase current density toward design point",
            "parameter": "Current Density",
            "from": "1.2 A/dm2",
            "to": "1.45 A/dm2"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 9
        },
        "costOfAction": 1200,
        "costAvoided": 5200,
        "netSavings": 4000,
        "successProbability": 86,
        "tradeoff": "Chiller load increase for 30 minutes while cooling electrolyte."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Parameter Optimization",
        "actions": [
          {
            "description": "Cool electrolyte to target temperature",
            "parameter": "Electrolyte Temp",
            "from": "22°C",
            "to": "18°C"
          },
          {
            "description": "Restore current density to design point",
            "parameter": "Current Density",
            "from": "1.2 A/dm2",
            "to": "1.5 A/dm2"
          },
          {
            "description": "Adjust acid concentration",
            "parameter": "Acid Concentration",
            "from": "165 g/L",
            "to": "178 g/L"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 4
        },
        "costOfAction": 1800,
        "costAvoided": 8400,
        "netSavings": 6600,
        "successProbability": 77,
        "tradeoff": "Full chiller capacity needed; monitor acid concentration closely."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Current Density Only",
        "actions": [
          {
            "description": "Increase current density, no temperature change",
            "parameter": "Current Density",
            "from": "1.2 A/dm2",
            "to": "1.35 A/dm2"
          }
        ],
        "riskReduction": {
          "from": 27,
          "to": 18
        },
        "costOfAction": 600,
        "costAvoided": 2700,
        "netSavings": 2100,
        "successProbability": 94,
        "tradeoff": "Temperature issue unresolved; limited improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1500,
      "avgCostPerIncident": 680,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 208000
    },
    "shiftMetrics": {
      "output": "18 batches",
      "energy": "$3,200",
      "efficiency": "73%"
    }
  },
  {
    "id": "aluminum-5",
    "industry": "Aluminum Processing",
    "scenarioName": "Cast House Melt Loss Optimization",
    "description": "Aluminum cast houses melt scrap and ingot to produce billets and slab. Metal losses during melting (oxidation, dross formation, absorption into furnace lining) are the primary cost driver, ranging from 1.5 to 4% of melt weight. Loss rates increase sharply when furnace temperature is too high, hold times are too long, or flux addition is suboptimal. Each 1% reduction in melt loss on a 10-ton heat saves approximately $1,200.",
    "annualCostRange": "$1.21M–$3.6M",
    "sensors": [
      {
        "id": "s1",
        "name": "Furnace Temperature",
        "unit": "°C",
        "normalValue": 735,
        "anomalyValue": 768,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Melt Loss Rate",
        "unit": "%",
        "normalValue": 1.8,
        "anomalyValue": 3.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Dross Layer Thickness",
        "unit": "mm",
        "normalValue": 15,
        "anomalyValue": 32,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Flux Addition",
        "unit": "kg/ton",
        "normalValue": 2.5,
        "anomalyValue": 2.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Hold Time",
        "unit": "min",
        "normalValue": 45,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Metal Purity",
        "unit": "%",
        "normalValue": 99.6,
        "anomalyValue": 99.2,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Melt Loss Index",
      "unit": "%",
      "normalValue": 1.8,
      "warningThreshold": 2.5,
      "criticalThreshold": 3.2,
      "peakValue": 3.5
    },
    "predictiveAlert": {
      "title": "Melt Loss Rate Above Target",
      "message": "Melt loss at 3.2%, well above 1.8% target. Furnace temperature 33°C above optimal for current charge mix. Excessive hold time increasing oxidation. Estimated excess metal loss this heat: $3,600.",
      "riskPercent": 82
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature and Timing Correction",
        "actions": [
          {
            "description": "Reduce furnace temperature",
            "parameter": "Furnace Temperature",
            "from": "768°C",
            "to": "742°C"
          },
          {
            "description": "Skim dross now and cast within 20 minutes",
            "parameter": "Casting Schedule",
            "from": "Holding",
            "to": "Cast within 20 min"
          }
        ],
        "riskReduction": {
          "from": 3.5,
          "to": 2
        },
        "costOfAction": 400,
        "costAvoided": 3200,
        "netSavings": 2800,
        "successProbability": 88,
        "tradeoff": "Casting must proceed on schedule to prevent re-oxidation."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Charge Practice Optimization",
        "actions": [
          {
            "description": "Reduce furnace temperature to optimal",
            "parameter": "Furnace Temperature",
            "from": "768°C",
            "to": "738°C"
          },
          {
            "description": "Optimize charge sequence for next heat",
            "parameter": "Charge Sequence",
            "from": "Current",
            "to": "Optimized"
          },
          {
            "description": "Increase flux for dross treatment",
            "parameter": "Flux Addition",
            "from": "2.5 kg/ton",
            "to": "3.0 kg/ton"
          }
        ],
        "riskReduction": {
          "from": 3.5,
          "to": 1.7
        },
        "costOfAction": 800,
        "costAvoided": 4200,
        "netSavings": 3400,
        "successProbability": 77,
        "tradeoff": "Requires metallurgist to approve revised charge practice."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Reduction Only",
        "actions": [
          {
            "description": "Reduce furnace temperature moderately",
            "parameter": "Furnace Temperature",
            "from": "768°C",
            "to": "748°C"
          }
        ],
        "riskReduction": {
          "from": 3.5,
          "to": 2.6
        },
        "costOfAction": 200,
        "costAvoided": 1600,
        "netSavings": 1400,
        "successProbability": 93,
        "tradeoff": "Still above target; hold time not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1200,
      "avgCostPerIncident": 2800,
      "preventionRate": 0.42,
      "platformCost": 200000,
      "netAnnualSavings": 1211200
    },
    "shiftMetrics": {
      "output": "10 ton heat",
      "energy": "$6,400",
      "efficiency": "68%"
    }
  },
  {
    "id": "pharma-1",
    "industry": "Pharmaceutical Manufacturing",
    "scenarioName": "Tablet Coating Process Optimization",
    "description": "Tablet coating applies a thin film to tablets for taste masking, controlled release, or protection. The process is governed by spray rate, inlet air temperature, pan speed, and atomization pressure. Too fast and tablets stick together or have rough coatings. Too slow and batch times balloon, reducing capacity. Most operators run conservative profiles that extend batch times by 20–35% to ensure uniform coating, directly limiting plant throughput.",
    "annualCostRange": "$639K–$2.16M",
    "sensors": [
      {
        "id": "s1",
        "name": "Inlet Air Temperature",
        "unit": "°C",
        "normalValue": 60,
        "anomalyValue": 55,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Exhaust Air Temperature",
        "unit": "°C",
        "normalValue": 42,
        "anomalyValue": 39,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Spray Rate",
        "unit": "g/min",
        "normalValue": 85,
        "anomalyValue": 62,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Pan Speed",
        "unit": "rpm",
        "normalValue": 8,
        "anomalyValue": 6,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Coating Weight Gain",
        "unit": "%",
        "normalValue": 3,
        "anomalyValue": 2.1,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Batch Elapsed Time",
        "unit": "min",
        "normalValue": 120,
        "anomalyValue": 145,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Time Overrun",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 25,
      "peakValue": 30
    },
    "predictiveAlert": {
      "title": "Coating Batch Cycle Time Overrun",
      "message": "Coating batch running 30% over optimal time. Spray rate conservative for current conditions. Projected batch completion: 165 min vs. 120 min target.",
      "riskPercent": 73
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Spray-Temperature Optimization",
        "actions": [
          {
            "description": "Increase spray rate",
            "parameter": "Spray Rate",
            "from": "62 g/min",
            "to": "78 g/min"
          },
          {
            "description": "Increase inlet air temperature",
            "parameter": "Inlet Air Temp",
            "from": "55°C",
            "to": "58°C"
          },
          {
            "description": "Increase pan speed",
            "parameter": "Pan Speed",
            "from": "6 rpm",
            "to": "7 rpm"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 10
        },
        "costOfAction": 200,
        "costAvoided": 1200,
        "netSavings": 1000,
        "successProbability": 88,
        "tradeoff": "Monitor exhaust temp closely; maintain bed temperature window."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Accelerated Profile",
        "actions": [
          {
            "description": "Maximize spray rate for current batch size",
            "parameter": "Spray Rate",
            "from": "62 g/min",
            "to": "82 g/min"
          },
          {
            "description": "Set inlet air to design temperature",
            "parameter": "Inlet Air Temp",
            "from": "55°C",
            "to": "60°C"
          },
          {
            "description": "Maximize pan speed",
            "parameter": "Pan Speed",
            "from": "6 rpm",
            "to": "8 rpm"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 1.7
        },
        "costOfAction": 300,
        "costAvoided": 1600,
        "netSavings": 1300,
        "successProbability": 76,
        "tradeoff": "Tighter process window; requires experienced operator monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Pan Speed Only",
        "actions": [
          {
            "description": "Increase pan speed, no other changes",
            "parameter": "Pan Speed",
            "from": "6 rpm",
            "to": "7 rpm"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 22
        },
        "costOfAction": 50,
        "costAvoided": 400,
        "netSavings": 350,
        "successProbability": 97,
        "tradeoff": "Minimal improvement; does not address root cause."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1800,
      "avgCostPerIncident": 1200,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 639000
    },
    "shiftMetrics": {
      "output": "6 batches",
      "energy": "$3,800",
      "efficiency": "70%"
    }
  },
  {
    "id": "pharma-2",
    "industry": "Pharmaceutical Manufacturing",
    "scenarioName": "Clean-in-Place (CIP) Optimization",
    "description": "Pharmaceutical equipment must be cleaned between batches to prevent cross-contamination. CIP cycles involve multiple rinse, wash, and sanitization steps at specified temperatures and chemical concentrations. Regulatory requirements mandate validated cleaning procedures, but most plants run CIP cycles 20–40% longer than necessary because validation was done on worst-case scenarios. Every minute of CIP is a minute the equipment is not producing.",
    "annualCostRange": "$349K–$1.22M",
    "sensors": [
      {
        "id": "s1",
        "name": "CIP Elapsed Time",
        "unit": "min",
        "normalValue": 45,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Rinse Conductivity",
        "unit": "µS/cm",
        "normalValue": 2,
        "anomalyValue": 1.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Wash Temperature",
        "unit": "°C",
        "normalValue": 80,
        "anomalyValue": 82,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Chemical Concentration",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 2.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Residue Swab Result",
        "unit": "ppm",
        "normalValue": 5,
        "anomalyValue": 3,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Equipment Idle Time",
        "unit": "min",
        "normalValue": 55,
        "anomalyValue": 78,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "CIP Overrun",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 25,
      "criticalThreshold": 40,
      "peakValue": 45
    },
    "predictiveAlert": {
      "title": "CIP Cycle Running Longer Than Necessary",
      "message": "CIP cycle 45% longer than optimal. Rinse conductivity reached acceptable levels 18 minutes ago. Equipment idle time costing $850/hr in lost production.",
      "riskPercent": 69
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Endpoint-Based CIP Termination",
        "actions": [
          {
            "description": "End rinse cycle based on conductivity endpoint",
            "parameter": "Rinse Endpoint",
            "from": "Time-based",
            "to": "Conductivity endpoint (1.2 µS/cm, well below 5.0 limit)"
          },
          {
            "description": "Proceed to final sanitization now",
            "parameter": "CIP Stage",
            "from": "Extended rinse",
            "to": "Sanitization"
          }
        ],
        "riskReduction": {
          "from": 45,
          "to": 10
        },
        "costOfAction": 0,
        "costAvoided": 425,
        "netSavings": 425,
        "successProbability": 98,
        "tradeoff": "None; all acceptance criteria already met."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full CIP Protocol Optimization",
        "actions": [
          {
            "description": "Apply conductivity-based endpoint",
            "parameter": "Rinse Endpoint",
            "from": "Time-based",
            "to": "Endpoint-based"
          },
          {
            "description": "Reduce chemical concentration",
            "parameter": "Chemical Conc.",
            "from": "2.5%",
            "to": "1.8%"
          },
          {
            "description": "Reduce wash temperature slightly",
            "parameter": "Wash Temp",
            "from": "82°C",
            "to": "78°C"
          }
        ],
        "riskReduction": {
          "from": 45,
          "to": 5
        },
        "costOfAction": 200,
        "costAvoided": 620,
        "netSavings": 420,
        "successProbability": 82,
        "tradeoff": "Closer to validated minimum; requires QA sign-off on parameter changes."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Complete Current Cycle",
        "actions": [
          {
            "description": "Let cycle complete as programmed",
            "parameter": "CIP Cycle",
            "from": "In progress",
            "to": "Complete as scheduled"
          }
        ],
        "riskReduction": {
          "from": 45,
          "to": 45
        },
        "costOfAction": 0,
        "costAvoided": 0,
        "netSavings": 0,
        "successProbability": 100,
        "tradeoff": "Guaranteed compliance but continued excess downtime ($850/hr lost production)."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 3200,
      "avgCostPerIncident": 380,
      "preventionRate": 0.45,
      "platformCost": 200000,
      "netAnnualSavings": 349000
    },
    "shiftMetrics": {
      "output": "8 batches",
      "energy": "$2,900",
      "efficiency": "65%"
    }
  },
  {
    "id": "pharma-3",
    "industry": "Pharmaceutical Manufacturing",
    "scenarioName": "Lyophilization Cycle Optimization",
    "description": "Lyophilization (freeze drying) is used for high-value pharmaceutical products (biologics, vaccines, injectables) to improve stability. The process involves three phases: freezing, primary drying (sublimation), and secondary drying. Primary drying is by far the most energy- and time-intensive step. Most processes use conservative shelf temperature ramp rates and chamber pressures that extend cycle times by 20 to 40%, directly limiting batch throughput on one of the most capital-intensive pieces of pharma equipment.",
    "annualCostRange": "$2.18M–$6.0M",
    "sensors": [
      {
        "id": "s1",
        "name": "Shelf Temperature",
        "unit": "°C",
        "normalValue": -25,
        "anomalyValue": -32,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Chamber Pressure",
        "unit": "mTorr",
        "normalValue": 100,
        "anomalyValue": 100,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Product Temperature",
        "unit": "°C",
        "normalValue": -24,
        "anomalyValue": -30,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Primary Drying Elapsed",
        "unit": "hr",
        "normalValue": 18,
        "anomalyValue": 24,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Sublimation Rate",
        "unit": "kg/hr",
        "normalValue": 2.8,
        "anomalyValue": 2.1,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Condenser Load",
        "unit": "kW",
        "normalValue": 45,
        "anomalyValue": 42,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Time Overrun",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 20,
      "criticalThreshold": 30,
      "peakValue": 36
    },
    "predictiveAlert": {
      "title": "Lyophilization Primary Drying 36% Over Optimal",
      "message": "Lyophilization primary drying 36% over optimal cycle time. Shelf temperature at -32°C more conservative than necessary for current product formulation. Sublimation rate 25% below achievable optimum.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Shelf Temperature Optimization",
        "actions": [
          {
            "description": "Increase shelf temperature within validated range",
            "parameter": "Shelf Temperature",
            "from": "-32°C",
            "to": "-27°C"
          },
          {
            "description": "Monitor product temperature against collapse limit",
            "parameter": "Product Temp Monitoring",
            "from": "Periodic",
            "to": "Continuous until stable"
          }
        ],
        "riskReduction": {
          "from": 36,
          "to": 12
        },
        "costOfAction": 1200,
        "costAvoided": 9600,
        "netSavings": 8400,
        "successProbability": 88,
        "tradeoff": "Must confirm product temperature stays below collapse temperature throughout."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Pressure-Temperature Optimization",
        "actions": [
          {
            "description": "Increase shelf temperature to near-optimal",
            "parameter": "Shelf Temperature",
            "from": "-32°C",
            "to": "-26°C"
          },
          {
            "description": "Reduce chamber pressure to increase sublimation driving force",
            "parameter": "Chamber Pressure",
            "from": "100 mTorr",
            "to": "80 mTorr"
          }
        ],
        "riskReduction": {
          "from": 36,
          "to": 5
        },
        "costOfAction": 1800,
        "costAvoided": 14400,
        "netSavings": 12600,
        "successProbability": 77,
        "tradeoff": "Closer to product collapse boundary; requires continuous PAT monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Small Temperature Increment Only",
        "actions": [
          {
            "description": "Increase shelf temperature modestly",
            "parameter": "Shelf Temperature",
            "from": "-32°C",
            "to": "-29°C"
          }
        ],
        "riskReduction": {
          "from": 36,
          "to": 22
        },
        "costOfAction": 600,
        "costAvoided": 4800,
        "netSavings": 4200,
        "successProbability": 95,
        "tradeoff": "Still below optimal; limited cycle time improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 600,
      "avgCostPerIncident": 10000,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 2175000
    },
    "shiftMetrics": {
      "output": "2 cycles/day",
      "energy": "$12,400",
      "efficiency": "64%"
    }
  },
  {
    "id": "pharma-4",
    "industry": "Pharmaceutical Manufacturing",
    "scenarioName": "Granulation End-Point Optimization",
    "description": "Wet granulation in pharmaceutical solid dosage manufacturing (tablets, capsules) requires precise control of granule moisture content and particle size distribution. Over-granulating produces dense granules with poor compressibility (tablets too hard, dissolution out of spec). Under-granulating produces friable granules. Operators run conservative end-points, extending batch times by 20 to 30%, to ensure granule quality, but this directly limits dryer and compaction capacity downstream.",
    "annualCostRange": "$1.25M–$3.52M",
    "sensors": [
      {
        "id": "s1",
        "name": "Granule Moisture",
        "unit": "%",
        "normalValue": 3.8,
        "anomalyValue": 5.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Granulator Power",
        "unit": "kW",
        "normalValue": 22,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Batch Temperature",
        "unit": "°C",
        "normalValue": 38,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Particle Size d50",
        "unit": "µm",
        "normalValue": 280,
        "anomalyValue": 210,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Binder Addition Rate",
        "unit": "g/min",
        "normalValue": 45,
        "anomalyValue": 45,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Cycle Elapsed Time",
        "unit": "min",
        "normalValue": 25,
        "anomalyValue": 34,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Time Overrun",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 24,
      "peakValue": 28
    },
    "predictiveAlert": {
      "title": "Granulation Batch 28% Over Optimal Cycle Time",
      "message": "Granulation batch 28% over optimal cycle time. Granule moisture at 5.2% (target 3.8%) indicating over-wetting. Batch temperature 3°C below target slowing drying and granule formation.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature and Binder Adjustment",
        "actions": [
          {
            "description": "Increase inlet air temperature",
            "parameter": "Inlet Air Temperature",
            "from": "38°C",
            "to": "41°C"
          },
          {
            "description": "Reduce binder addition rate",
            "parameter": "Binder Addition Rate",
            "from": "45 g/min",
            "to": "40 g/min"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 9
        },
        "costOfAction": 400,
        "costAvoided": 6400,
        "netSavings": 6000,
        "successProbability": 87,
        "tradeoff": "Monitor moisture at new conditions for 5 minutes before committing."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Accelerated Drying Profile",
        "actions": [
          {
            "description": "Increase inlet air temperature to upper range",
            "parameter": "Inlet Air Temperature",
            "from": "38°C",
            "to": "43°C"
          },
          {
            "description": "Reduce binder addition rate further",
            "parameter": "Binder Addition Rate",
            "from": "45 g/min",
            "to": "38 g/min"
          },
          {
            "description": "Increase chopper speed",
            "parameter": "Chopper Speed",
            "from": "Current",
            "to": "Increased"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 4
        },
        "costOfAction": 600,
        "costAvoided": 8600,
        "netSavings": 8000,
        "successProbability": 76,
        "tradeoff": "Tighter process window; requires development pharmacist approval."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Increase Only",
        "actions": [
          {
            "description": "Increase inlet air temperature modestly, no binder change",
            "parameter": "Inlet Air Temperature",
            "from": "38°C",
            "to": "40°C"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 16
        },
        "costOfAction": 200,
        "costAvoided": 3400,
        "netSavings": 3200,
        "successProbability": 94,
        "tradeoff": "Binder rate still excessive; partial improvement only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1600,
      "avgCostPerIncident": 2200,
      "preventionRate": 0.42,
      "platformCost": 225000,
      "netAnnualSavings": 1251000
    },
    "shiftMetrics": {
      "output": "12 batches",
      "energy": "$4,100",
      "efficiency": "72%"
    }
  },
  {
    "id": "pharma-5",
    "industry": "Pharmaceutical Manufacturing",
    "scenarioName": "Fermentation Process Optimization",
    "description": "Biopharmaceutical fermentation (for antibiotics, enzymes, biologics) involves growing microorganisms or cells under precise conditions of temperature, pH, dissolved oxygen, agitation, and feed rate. Suboptimal conditions during the exponential growth phase reduce product titer (concentration) and extend batch times. Most fermentations achieve only 70 to 85% of theoretical maximum titer due to conservative feeding strategies and DO control that prioritizes safety over productivity.",
    "annualCostRange": "$567K–$1.98M",
    "sensors": [
      {
        "id": "s1",
        "name": "Dissolved Oxygen",
        "unit": "%",
        "normalValue": 30,
        "anomalyValue": 22,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Agitator Speed",
        "unit": "rpm",
        "normalValue": 280,
        "anomalyValue": 240,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "pH",
        "unit": "",
        "normalValue": 7,
        "anomalyValue": 6.8,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Feeding Rate",
        "unit": "L/hr",
        "normalValue": 2.4,
        "anomalyValue": 1.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Titer",
        "unit": "g/L",
        "normalValue": 8.2,
        "anomalyValue": 6.8,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Batch Elapsed Time",
        "unit": "hr",
        "normalValue": 48,
        "anomalyValue": 48,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Titer Deficit",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 24
    },
    "predictiveAlert": {
      "title": "Fermentation Titer 24% Below Optimal Trajectory",
      "message": "Fermentation titer 24% below optimal trajectory. DO at 22% (target 30%) limiting cell growth rate. Feeding rate conservative at 1.8 L/hr. Current trajectory misses target titer by 1.8 g/L.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "DO and Feed Rate Optimization",
        "actions": [
          {
            "description": "Increase agitator speed to raise dissolved oxygen",
            "parameter": "Agitator Speed",
            "from": "240 rpm",
            "to": "265 rpm"
          },
          {
            "description": "Increase feeding rate",
            "parameter": "Feeding Rate",
            "from": "1.8 L/hr",
            "to": "2.2 L/hr"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 8
        },
        "costOfAction": 800,
        "costAvoided": 13200,
        "netSavings": 12400,
        "successProbability": 87,
        "tradeoff": "Monitor pH closely at increased feed rate; foam risk increases."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Fed-Batch Optimization",
        "actions": [
          {
            "description": "Increase agitator to near-maximum for this product",
            "parameter": "Agitator Speed",
            "from": "240 rpm",
            "to": "275 rpm"
          },
          {
            "description": "Increase feed to design rate",
            "parameter": "Feeding Rate",
            "from": "1.8 L/hr",
            "to": "2.4 L/hr"
          },
          {
            "description": "Tighten pH control band",
            "parameter": "pH Control Band",
            "from": "Current",
            "to": "Tightened"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 3
        },
        "costOfAction": 1200,
        "costAvoided": 17000,
        "netSavings": 15800,
        "successProbability": 77,
        "tradeoff": "Higher risk of DO overshoot and foam formation at maximum rates."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Agitator Speed Increase Only",
        "actions": [
          {
            "description": "Increase agitator speed modestly, no feed change",
            "parameter": "Agitator Speed",
            "from": "240 rpm",
            "to": "255 rpm"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 15
        },
        "costOfAction": 400,
        "costAvoided": 6000,
        "netSavings": 5600,
        "successProbability": 93,
        "tradeoff": "Feed rate still limiting growth; partial titer recovery only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 180,
      "avgCostPerIncident": 11000,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 567000
    },
    "shiftMetrics": {
      "output": "6.8 g/L titer",
      "energy": "$18,400",
      "efficiency": "71%"
    }
  },
  {
    "id": "oilgas-1",
    "industry": "Oil and Gas Refining",
    "scenarioName": "Crude Distillation Unit Optimization",
    "description": "CDU cut points are conservative, resulting in excessive overflash and wide product gaps. Diesel yield is below potential, costing significant yield value per hour.",
    "annualCostRange": "$10M - $14M",
    "sensors": [
      {
        "id": "s1",
        "name": "Flash Zone Temp",
        "unit": "°C",
        "normalValue": 365,
        "anomalyValue": 358,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Naphtha-Kerosene Cut",
        "unit": "°C",
        "normalValue": 165,
        "anomalyValue": 158,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Kerosene-Diesel Cut",
        "unit": "°C",
        "normalValue": 270,
        "anomalyValue": 262,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Overflash",
        "unit": "%",
        "normalValue": 3,
        "anomalyValue": 4.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Heater Duty",
        "unit": "MW",
        "normalValue": 85,
        "anomalyValue": 92,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Product Gap",
        "unit": "°C",
        "normalValue": 8,
        "anomalyValue": 15,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Yield Value Gap",
      "unit": "$/hr",
      "normalValue": 2000,
      "warningThreshold": 5000,
      "criticalThreshold": 8000,
      "peakValue": 10500
    },
    "predictiveAlert": {
      "title": "CDU Operating $10,500/hr Below Optimal Yield Value",
      "message": "Cut points conservative. Diesel yield below potential while overflash excessive. Product gaps wider than necessary.",
      "riskPercent": 88
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Cut Point Tightening",
        "actions": [
          {
            "description": "Raise naphtha-kerosene cut point",
            "parameter": "Naphtha-Kerosene Cut",
            "from": "158°C",
            "to": "162°C"
          },
          {
            "description": "Raise kerosene-diesel cut point",
            "parameter": "Kerosene-Diesel Cut",
            "from": "262°C",
            "to": "267°C"
          },
          {
            "description": "Reduce overflash to target",
            "parameter": "Overflash",
            "from": "4.8%",
            "to": "3.5%"
          }
        ],
        "riskReduction": {
          "from": 10500,
          "to": 3200
        },
        "costOfAction": 500,
        "costAvoided": 7200,
        "netSavings": 6700,
        "successProbability": 88,
        "tradeoff": "Tighter product specs; increased lab testing for 24 hours."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full CDU Optimization",
        "actions": [
          {
            "description": "Tighten all cuts to minimum quality gaps",
            "parameter": "All Cut Points",
            "from": "Current",
            "to": "Minimum Gap"
          },
          {
            "description": "Optimize flash zone temperature",
            "parameter": "Flash Zone Temp",
            "from": "358°C",
            "to": "365°C"
          },
          {
            "description": "Reconfigure pump-arounds",
            "parameter": "Pump-Around Rates",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 10500,
          "to": 1500
        },
        "costOfAction": 2000,
        "costAvoided": 9800,
        "netSavings": 7800,
        "successProbability": 74,
        "tradeoff": "Requires crude assay update and LP model run; 2-hour transition."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Kerosene Cut Only",
        "actions": [
          {
            "description": "Raise kerosene-diesel cut point",
            "parameter": "Kerosene-Diesel Cut",
            "from": "262°C",
            "to": "265°C"
          }
        ],
        "riskReduction": {
          "from": 10500,
          "to": 5500
        },
        "costOfAction": 200,
        "costAvoided": 3800,
        "netSavings": 3600,
        "successProbability": 96,
        "tradeoff": "Modest improvement; easy to implement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 7500,
      "preventionRate": 0.2,
      "platformCost": 500000,
      "netAnnualSavings": 12100000
    },
    "shiftMetrics": {
      "output": "280,000 bbl crude",
      "energy": "$85,000",
      "efficiency": "78%"
    }
  },
  {
    "id": "oilgas-2",
    "industry": "Oil and Gas Refining",
    "scenarioName": "FCC Yield Optimization",
    "description": "Catalyst circulation is below target and reactor temperature is depressed, resulting in conversion deficit and gasoline yield 3% below potential. Lost value is accumulating at $6,200/hr.",
    "annualCostRange": "$8M - $11M",
    "sensors": [
      {
        "id": "s1",
        "name": "Reactor Temperature",
        "unit": "°C",
        "normalValue": 525,
        "anomalyValue": 518,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Catalyst Circulation",
        "unit": "t/min",
        "normalValue": 22,
        "anomalyValue": 19,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Conversion",
        "unit": "%vol",
        "normalValue": 78,
        "anomalyValue": 74,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Gasoline Yield",
        "unit": "%vol",
        "normalValue": 48,
        "anomalyValue": 45,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Coke Yield",
        "unit": "%wt",
        "normalValue": 5.2,
        "anomalyValue": 5.8,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Regenerator Temp",
        "unit": "°C",
        "normalValue": 710,
        "anomalyValue": 725,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Conversion Gap",
      "unit": "%",
      "normalValue": 1,
      "warningThreshold": 3,
      "criticalThreshold": 5,
      "peakValue": 5.4
    },
    "predictiveAlert": {
      "title": "FCC Conversion 5.4% Below Optimal",
      "message": "Catalyst circulation low, reactor temperature below target. Gasoline yield 3% below potential. Lost value: $6,200/hr.",
      "riskPercent": 85
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Circulation Increase",
        "actions": [
          {
            "description": "Raise catalyst circulation rate",
            "parameter": "Catalyst Circulation",
            "from": "19 t/min",
            "to": "21 t/min"
          },
          {
            "description": "Increase reactor temperature",
            "parameter": "Reactor Temperature",
            "from": "518°C",
            "to": "522°C"
          }
        ],
        "riskReduction": {
          "from": 5.4,
          "to": 2
        },
        "costOfAction": 500,
        "costAvoided": 4400,
        "netSavings": 3900,
        "successProbability": 87,
        "tradeoff": "Monitor regenerator temperature; increase air blower."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full FCC Optimization",
        "actions": [
          {
            "description": "Raise circulation to design rate",
            "parameter": "Catalyst Circulation",
            "from": "19 t/min",
            "to": "22 t/min"
          },
          {
            "description": "Restore reactor to target temperature",
            "parameter": "Reactor Temperature",
            "from": "518°C",
            "to": "525°C"
          },
          {
            "description": "Adjust feed preheat temperature",
            "parameter": "Feed Preheat",
            "from": "Current",
            "to": "Optimized"
          },
          {
            "description": "Optimize slurry recycle rate",
            "parameter": "Slurry Recycle",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 5.4,
          "to": 0.8
        },
        "costOfAction": 1000,
        "costAvoided": 6100,
        "netSavings": 5100,
        "successProbability": 74,
        "tradeoff": "Regenerator approaches temperature limit; requires continuous monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Only",
        "actions": [
          {
            "description": "Raise reactor temperature modestly",
            "parameter": "Reactor Temperature",
            "from": "518°C",
            "to": "520°C"
          }
        ],
        "riskReduction": {
          "from": 5.4,
          "to": 3.2
        },
        "costOfAction": 200,
        "costAvoided": 2200,
        "netSavings": 2000,
        "successProbability": 96,
        "tradeoff": "Does not address circulation shortfall."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 4800,
      "preventionRate": 0.25,
      "platformCost": 450000,
      "netAnnualSavings": 9150000
    },
    "shiftMetrics": {
      "output": "95,000 bbl FO",
      "energy": "$62,000",
      "efficiency": "74%"
    }
  },
  {
    "id": "oilgas-3",
    "industry": "Oil and Gas Refining",
    "scenarioName": "Hydrogen Network Optimization",
    "description": "Reformer is producing 14,000 Nm3/hr above actual demand, with 2,800 Nm3/hr being vented. Excess natural gas consumption is driving unnecessary cost of $1,850/hr.",
    "annualCostRange": "$3M - $5M",
    "sensors": [
      {
        "id": "s1",
        "name": "H2 Production",
        "unit": "Nm3/hr",
        "normalValue": 45000,
        "anomalyValue": 52000,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "H2 Purity",
        "unit": "%",
        "normalValue": 92,
        "anomalyValue": 96,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "H2 Vent Rate",
        "unit": "Nm3/hr",
        "normalValue": 500,
        "anomalyValue": 2800,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Reformer NG",
        "unit": "GJ/hr",
        "normalValue": 180,
        "anomalyValue": 212,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Hydrotreater Demand",
        "unit": "Nm3/hr",
        "normalValue": 38000,
        "anomalyValue": 36000,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "H2 Cost",
        "unit": "$/1000 Nm3",
        "normalValue": 85,
        "anomalyValue": 98,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "H2 Network Waste",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Hydrogen Network 22% Above Optimal Cost",
      "message": "Excess production of 14,000 Nm3/hr above demand. Venting 2,800 Nm3/hr of valuable hydrogen. Reformer running at unnecessary rate. Excess cost: $1,850/hr.",
      "riskPercent": 82
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Production Rate Reduction",
        "actions": [
          {
            "description": "Reduce reformer production rate",
            "parameter": "H2 Production",
            "from": "52,000 Nm3/hr",
            "to": "42,000 Nm3/hr"
          },
          {
            "description": "Allow header purity to reduce to target",
            "parameter": "H2 Purity",
            "from": "96%",
            "to": "93%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 8
        },
        "costOfAction": 200,
        "costAvoided": 1380,
        "netSavings": 1180,
        "successProbability": 88,
        "tradeoff": "Less buffer in header; monitor demand changes."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Network Optimization",
        "actions": [
          {
            "description": "Reduce reformer to minimum required rate",
            "parameter": "H2 Production",
            "from": "52,000 Nm3/hr",
            "to": "39,000 Nm3/hr"
          },
          {
            "description": "Redirect PSA tail gas",
            "parameter": "PSA Tail Gas",
            "from": "Flare/Vent",
            "to": "Fuel Gas System"
          },
          {
            "description": "Optimize purge rates across units",
            "parameter": "Network Purge Rates",
            "from": "Current",
            "to": "Minimized"
          },
          {
            "description": "Adjust makeup gas distribution",
            "parameter": "Makeup Gas",
            "from": "Current Split",
            "to": "Demand-Based Split"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 4
        },
        "costOfAction": 500,
        "costAvoided": 1720,
        "netSavings": 1220,
        "successProbability": 76,
        "tradeoff": "Requires coordination across 4 units; 1-hour implementation."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Vent Reduction Only",
        "actions": [
          {
            "description": "Reroute vent gas to fuel gas system",
            "parameter": "H2 Vent Rate",
            "from": "2,800 Nm3/hr",
            "to": "500 Nm3/hr"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 14
        },
        "costOfAction": 100,
        "costAvoided": 620,
        "netSavings": 520,
        "successProbability": 96,
        "tradeoff": "Does not reduce reformer costs; may exceed fuel gas pressure."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 1400,
      "preventionRate": 0.35,
      "platformCost": 400000,
      "netAnnualSavings": 3730000
    },
    "shiftMetrics": {
      "output": "960,000 Nm3 H2",
      "energy": "$38,000",
      "efficiency": "78%"
    }
  },
  {
    "id": "oilgas-4",
    "industry": "Oil and Gas Refining",
    "scenarioName": "Energy Integration and Pinch Optimization",
    "description": "Heat exchangers E-105 and E-212 are severely fouled with approach temperatures above 40°C. Fired heating duty is 45 MW above the integrated minimum, costing $8,500/hr.",
    "annualCostRange": "$9M - $12M",
    "sensors": [
      {
        "id": "s1",
        "name": "Fired Heater Duty",
        "unit": "MW",
        "normalValue": 280,
        "anomalyValue": 325,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Cooling Water Duty",
        "unit": "MW",
        "normalValue": 220,
        "anomalyValue": 265,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "HX Approach Temp Avg",
        "unit": "°C",
        "normalValue": 18,
        "anomalyValue": 32,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Fouling Factor (worst HX)",
        "unit": "m2K/W",
        "normalValue": 0.002,
        "anomalyValue": 0.008,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Hot Utility Above Pinch",
        "unit": "MW",
        "normalValue": 15,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Energy Intensity",
        "unit": "GJ/ton",
        "normalValue": 3.2,
        "anomalyValue": 3.7,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Integration Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Refinery Energy 22% Above Integrated Minimum",
      "message": "Heat exchangers E-105 and E-212 severely fouled (approach temps above 40°C). Excess fired heating: 45 MW. Cost: $8,500/hr.",
      "riskPercent": 86
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Exchanger Bypass and Cleaning Schedule",
        "actions": [
          {
            "description": "Bypass E-105 to reduce fouling impact",
            "parameter": "E-105 Bypass Valve",
            "from": "Closed",
            "to": "Open (recover 12 MW)"
          },
          {
            "description": "Increase E-209 bypass to rebalance network",
            "parameter": "E-209 Bypass Valve",
            "from": "Current",
            "to": "Increased"
          },
          {
            "description": "Schedule E-105 online cleaning",
            "parameter": "Cleaning Schedule",
            "from": "Not Scheduled",
            "to": "Next Available Window"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 10
        },
        "costOfAction": 500,
        "costAvoided": 4200,
        "netSavings": 3700,
        "successProbability": 88,
        "tradeoff": "Slight increase in cooling water use until E-105 cleaned."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Network Reoptimization",
        "actions": [
          {
            "description": "Clean E-105 online",
            "parameter": "E-105 Fouling Factor",
            "from": "0.008",
            "to": "0.002"
          },
          {
            "description": "Clean E-212 online",
            "parameter": "E-212 Fouling Factor",
            "from": "0.007",
            "to": "0.002"
          },
          {
            "description": "Reoptimize all exchanger bypasses",
            "parameter": "Network Bypass Configuration",
            "from": "Current",
            "to": "Pinch Optimal"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 5
        },
        "costOfAction": 2000,
        "costAvoided": 6800,
        "netSavings": 4800,
        "successProbability": 74,
        "tradeoff": "Online cleaning takes 8 hours; temporary quality monitoring needed."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Heater Optimization Only",
        "actions": [
          {
            "description": "Optimize fired heater excess air",
            "parameter": "Excess Air",
            "from": "Current",
            "to": "Target 2%"
          },
          {
            "description": "Optimize stack temperature setpoint",
            "parameter": "Stack Temperature",
            "from": "Current",
            "to": "Minimum Safe"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 15
        },
        "costOfAction": 200,
        "costAvoided": 1800,
        "netSavings": 1600,
        "successProbability": 96,
        "tradeoff": "Does not address heat exchange degradation."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 6500,
      "preventionRate": 0.2,
      "platformCost": 500000,
      "netAnnualSavings": 10420000
    },
    "shiftMetrics": {
      "output": "280,000 bbl crude",
      "energy": "$72,000",
      "efficiency": "78%"
    }
  },
  {
    "id": "oilgas-5",
    "industry": "Oil and Gas Refining",
    "scenarioName": "Product Blending Optimization",
    "description": "Gasoline octane is 1.8 RON above specification, wasting high-octane reformate. Diesel sulfur is running at only 53% of the allowed limit. At 120,000 bbl/day, quality giveaway costs $102,000/day.",
    "annualCostRange": "$6M - $9M",
    "sensors": [
      {
        "id": "s1",
        "name": "Gasoline Octane",
        "unit": "RON",
        "normalValue": 91,
        "anomalyValue": 92.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Gasoline RVP",
        "unit": "kPa",
        "normalValue": 62,
        "anomalyValue": 56,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Diesel Sulfur",
        "unit": "ppm",
        "normalValue": 15,
        "anomalyValue": 8,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Diesel Cetane",
        "unit": "index",
        "normalValue": 45,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "High-Octane Component",
        "unit": "%",
        "normalValue": 35,
        "anomalyValue": 42,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Blend Cost vs Optimal",
        "unit": "$/bbl",
        "normalValue": 0.2,
        "anomalyValue": 0.85,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Quality Giveaway",
      "unit": "$/bbl",
      "normalValue": 0.2,
      "warningThreshold": 0.45,
      "criticalThreshold": 0.7,
      "peakValue": 0.85
    },
    "predictiveAlert": {
      "title": "Product Blending $0.85/bbl Above Optimal",
      "message": "Gasoline octane 1.8 RON above spec (wasting high-octane reformate). Diesel sulfur at 53% of limit. At 120,000 bbl/day: $102,000/day.",
      "riskPercent": 84
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Recipe Optimization",
        "actions": [
          {
            "description": "Reduce reformate fraction in gasoline blend",
            "parameter": "Reformate to Gasoline",
            "from": "42%",
            "to": "38%"
          },
          {
            "description": "Increase straight-run naphtha fraction",
            "parameter": "SR Naphtha Fraction",
            "from": "Current",
            "to": "Increased"
          },
          {
            "description": "Reduce hydrotreated diesel fraction",
            "parameter": "Hydrotreated Diesel",
            "from": "Current",
            "to": "-3%"
          }
        ],
        "riskReduction": {
          "from": 0.85,
          "to": 0.25
        },
        "costOfAction": 5000,
        "costAvoided": 74400,
        "netSavings": 69400,
        "successProbability": 88,
        "tradeoff": "Tighter on both specs; increase lab testing to hourly."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Multi-Product Optimization",
        "actions": [
          {
            "description": "Optimize all product recipes simultaneously via LP blend model",
            "parameter": "All Blend Recipes",
            "from": "Current",
            "to": "LP Optimal"
          },
          {
            "description": "Refresh all component assays",
            "parameter": "Component Assays",
            "from": "Stale",
            "to": "Current"
          }
        ],
        "riskReduction": {
          "from": 0.85,
          "to": 0.18
        },
        "costOfAction": 8000,
        "costAvoided": 93600,
        "netSavings": 85600,
        "successProbability": 76,
        "tradeoff": "Requires fresh component assays and 2-hour model run."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Gasoline Only",
        "actions": [
          {
            "description": "Reduce reformate to gasoline modestly",
            "parameter": "Reformate to Gasoline",
            "from": "42%",
            "to": "40%"
          }
        ],
        "riskReduction": {
          "from": 0.85,
          "to": 0.48
        },
        "costOfAction": 2000,
        "costAvoided": 33600,
        "netSavings": 31600,
        "successProbability": 96,
        "tradeoff": "Does not optimize diesel blend."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 365,
      "avgCostPerIncident": 68000,
      "preventionRate": 0.3,
      "platformCost": 500000,
      "netAnnualSavings": 6940000
    },
    "shiftMetrics": {
      "output": "360,000 bbl blended",
      "energy": "$58,000",
      "efficiency": "76%"
    }
  },
  {
    "id": "mining-1",
    "industry": "Mining and Mineral Processing",
    "scenarioName": "SAG/Ball Mill Grinding Optimization",
    "description": "Grinding circuit over-grinding product and running elevated circulating load, consuming excess energy per ton processed.",
    "annualCostRange": "$3.2M–$4.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Mill Power Draw",
        "unit": "MW",
        "normalValue": 8.2,
        "anomalyValue": 9.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Mill Feed Rate",
        "unit": "t/hr",
        "normalValue": 850,
        "anomalyValue": 920,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Product P80",
        "unit": "µm",
        "normalValue": 150,
        "anomalyValue": 125,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Mill Bearing Pressure",
        "unit": "kPa",
        "normalValue": 2800,
        "anomalyValue": 3200,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Circulating Load",
        "unit": "%",
        "normalValue": 250,
        "anomalyValue": 320,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Specific Energy",
        "unit": "kWh/ton",
        "normalValue": 12.5,
        "anomalyValue": 15.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Grinding Energy Overuse",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 26
    },
    "predictiveAlert": {
      "title": "Grinding Circuit 26% Above Optimal Energy",
      "message": "Product over-ground (P80 125 µm vs. 150 µm target). Circulating load elevated indicating inefficient classification. Excess cost: $1,850/hr.",
      "riskPercent": 26
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Feed-Classifier Balance",
        "actions": [
          {
            "description": "Reduce mill feed rate",
            "parameter": "Mill Feed Rate",
            "from": "920 t/hr",
            "to": "870 t/hr"
          },
          {
            "description": "Increase cyclone pressure",
            "parameter": "Cyclone Pressure",
            "from": "Nominal",
            "to": "+8 kPa"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 8
        },
        "costOfAction": 200,
        "costAvoided": 1280,
        "netSavings": 1080,
        "successProbability": 88,
        "tradeoff": "Slight throughput reduction offset by better downstream recovery."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Circuit Optimization",
        "actions": [
          {
            "description": "Reduce mill feed rate",
            "parameter": "Mill Feed Rate",
            "from": "920 t/hr",
            "to": "860 t/hr"
          },
          {
            "description": "Adjust ball charge composition",
            "parameter": "Ball Charge",
            "from": "Current mix",
            "to": "Optimized mix"
          },
          {
            "description": "Increase process water addition",
            "parameter": "Water Addition",
            "from": "Baseline",
            "to": "+5%"
          },
          {
            "description": "Reconfigure cyclone apex diameter",
            "parameter": "Cyclone Apex",
            "from": "Current",
            "to": "Reconfigured"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 4
        },
        "costOfAction": 500,
        "costAvoided": 1580,
        "netSavings": 1080,
        "successProbability": 74,
        "tradeoff": "20-min stabilization period; mill load monitoring critical."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Speed Reduction Only",
        "actions": [
          {
            "description": "Reduce mill rotational speed",
            "parameter": "Mill Speed",
            "from": "100%",
            "to": "97%"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 16
        },
        "costOfAction": 50,
        "costAvoided": 620,
        "netSavings": 570,
        "successProbability": 96,
        "tradeoff": "Modest improvement; does not address classification."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8200,
      "avgCostPerIncident": 1350,
      "preventionRate": 0.35,
      "platformCost": 300000,
      "netAnnualSavings": 3590000
    },
    "shiftMetrics": {
      "output": "7,200 tons",
      "energy": "$8,400",
      "efficiency": "74%"
    }
  },
  {
    "id": "mining-2",
    "industry": "Mining and Mineral Processing",
    "scenarioName": "Flotation Cell Recovery Optimization",
    "description": "Feed grade drop not reflected in reagent dosing or air flow adjustments, collapsing froth depth and reducing copper recovery.",
    "annualCostRange": "$3.2M–$4.4M",
    "sensors": [
      {
        "id": "s1",
        "name": "Copper Recovery",
        "unit": "%",
        "normalValue": 88,
        "anomalyValue": 83,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Feed Grade",
        "unit": "%",
        "normalValue": 0.8,
        "anomalyValue": 0.65,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Collector Dosage",
        "unit": "g/ton",
        "normalValue": 25,
        "anomalyValue": 25,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Frother Dosage",
        "unit": "g/ton",
        "normalValue": 12,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Air Flow",
        "unit": "m3/min",
        "normalValue": 18,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Froth Depth",
        "unit": "cm",
        "normalValue": 15,
        "anomalyValue": 8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Recovery Loss",
      "unit": "%",
      "normalValue": 1,
      "warningThreshold": 3,
      "criticalThreshold": 5,
      "peakValue": 6
    },
    "predictiveAlert": {
      "title": "Flotation Recovery 6% Below Target",
      "message": "Feed grade dropped from 0.8% to 0.65% but reagent dosing and air flow unchanged. Froth depth collapsed. Estimated lost revenue: $4,800/hr.",
      "riskPercent": 6
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Grade-Responsive Adjustment",
        "actions": [
          {
            "description": "Increase collector dosage",
            "parameter": "Collector Dosage",
            "from": "25 g/ton",
            "to": "30 g/ton"
          },
          {
            "description": "Increase air flow to cells",
            "parameter": "Air Flow",
            "from": "18 m3/min",
            "to": "22 m3/min"
          },
          {
            "description": "Raise cell level setpoint",
            "parameter": "Cell Level",
            "from": "Nominal",
            "to": "+3 cm"
          }
        ],
        "riskReduction": {
          "from": 6,
          "to": 2
        },
        "costOfAction": 180,
        "costAvoided": 3600,
        "netSavings": 3420,
        "successProbability": 88,
        "tradeoff": "Higher reagent consumption; monitor concentrate grade."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Flotation Optimization",
        "actions": [
          {
            "description": "Increase collector dosage",
            "parameter": "Collector Dosage",
            "from": "25 g/ton",
            "to": "32 g/ton"
          },
          {
            "description": "Increase frother dosage",
            "parameter": "Frother Dosage",
            "from": "12 g/ton",
            "to": "14 g/ton"
          },
          {
            "description": "Increase air flow",
            "parameter": "Air Flow",
            "from": "18 m3/min",
            "to": "24 m3/min"
          },
          {
            "description": "Add depressant to selectivity circuit",
            "parameter": "Depressant",
            "from": "None",
            "to": "Active"
          }
        ],
        "riskReduction": {
          "from": 6,
          "to": 1
        },
        "costOfAction": 280,
        "costAvoided": 4500,
        "netSavings": 4220,
        "successProbability": 78,
        "tradeoff": "Concentrate grade may dilute slightly; requires assay monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Air Only",
        "actions": [
          {
            "description": "Increase air flow moderately",
            "parameter": "Air Flow",
            "from": "18 m3/min",
            "to": "20 m3/min"
          }
        ],
        "riskReduction": {
          "from": 6,
          "to": 3
        },
        "costOfAction": 50,
        "costAvoided": 1800,
        "netSavings": 1750,
        "successProbability": 96,
        "tradeoff": "Does not address reagent-grade mismatch."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 1200,
      "preventionRate": 0.4,
      "platformCost": 300000,
      "netAnnualSavings": 3540000
    },
    "shiftMetrics": {
      "output": "1,840 tons Cu",
      "energy": "$3,200",
      "efficiency": "83%"
    }
  },
  {
    "id": "mining-3",
    "industry": "Mining and Mineral Processing",
    "scenarioName": "Primary Crusher Throughput Optimization",
    "description": "Oversized feed material causing bridging events, forcing feeder speed reduction and dropping crusher throughput 22% below rated capacity.",
    "annualCostRange": "$5.0M–$7.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Crusher Throughput",
        "unit": "t/hr",
        "normalValue": 2400,
        "anomalyValue": 2050,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Crusher Power",
        "unit": "kW",
        "normalValue": 750,
        "anomalyValue": 680,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "CSS Setting",
        "unit": "mm",
        "normalValue": 150,
        "anomalyValue": 165,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Feed Oversize",
        "unit": "%",
        "normalValue": 5,
        "anomalyValue": 14,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Cavity Level",
        "unit": "%",
        "normalValue": 65,
        "anomalyValue": 45,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Feeder Speed",
        "unit": "%",
        "normalValue": 85,
        "anomalyValue": 68,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Throughput Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Crusher Running 22% Below Rated Capacity",
      "message": "Oversized feed causing bridging events. Feeder reduced to prevent stalling. Lost throughput: 350 tons/hr at $5,250/hr.",
      "riskPercent": 22
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Feed Management",
        "actions": [
          {
            "description": "Direct loader to secondary rockbreaker for oversize material",
            "parameter": "Rockbreaker",
            "from": "Idle",
            "to": "Active"
          },
          {
            "description": "Increase feeder speed",
            "parameter": "Feeder Speed",
            "from": "68%",
            "to": "78%"
          },
          {
            "description": "Adjust CSS setting",
            "parameter": "CSS Setting",
            "from": "165 mm",
            "to": "160 mm"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 7
        },
        "costOfAction": 500,
        "costAvoided": 3000,
        "netSavings": 2500,
        "successProbability": 87,
        "tradeoff": "Slightly coarser product; downstream grinding handles it."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Optimization",
        "actions": [
          {
            "description": "Activate rockbreaker on oversized material",
            "parameter": "Rockbreaker",
            "from": "Idle",
            "to": "Active"
          },
          {
            "description": "Restore feeder to full speed",
            "parameter": "Feeder Speed",
            "from": "68%",
            "to": "85%"
          },
          {
            "description": "Optimize CSS on power draw feedback loop",
            "parameter": "CSS Setting",
            "from": "165 mm",
            "to": "Auto-optimized"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 800,
        "costAvoided": 4950,
        "netSavings": 4150,
        "successProbability": 76,
        "tradeoff": "Higher crusher wear; monitor power draw closely."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "CSS Widen Only",
        "actions": [
          {
            "description": "Widen closed side setting",
            "parameter": "CSS Setting",
            "from": "165 mm",
            "to": "170 mm"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 14
        },
        "costOfAction": 100,
        "costAvoided": 1500,
        "netSavings": 1400,
        "successProbability": 96,
        "tradeoff": "Coarser product increases grinding energy."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 6500,
      "avgCostPerIncident": 3800,
      "preventionRate": 0.25,
      "platformCost": 300000,
      "netAnnualSavings": 5880000
    },
    "shiftMetrics": {
      "output": "19,200 tons",
      "energy": "$6,800",
      "efficiency": "78%"
    }
  },
  {
    "id": "mining-4",
    "industry": "Mining and Mineral Processing",
    "scenarioName": "Tailings Thickener Optimization",
    "description": "Flocculant overdosing following a feed rate change has produced dilute underflow and poor overflow clarity, wasting 180 m3/hr of process water.",
    "annualCostRange": "$1.2M–$1.8M",
    "sensors": [
      {
        "id": "s1",
        "name": "Underflow Solids",
        "unit": "%w/w",
        "normalValue": 55,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Overflow Clarity",
        "unit": "NTU",
        "normalValue": 25,
        "anomalyValue": 45,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Flocculant Dose",
        "unit": "g/ton",
        "normalValue": 20,
        "anomalyValue": 32,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Bed Pressure",
        "unit": "kPa",
        "normalValue": 18,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Rake Torque",
        "unit": "%",
        "normalValue": 40,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Water Recovery",
        "unit": "%",
        "normalValue": 75,
        "anomalyValue": 65,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Thickener Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 35
    },
    "predictiveAlert": {
      "title": "Thickener 35% Below Optimal Efficiency",
      "message": "Flocculant overdosed by 60% yet underflow dilute (48% vs. 55% target). Feed rate change 2 hours ago not reflected in dosing. Water loss: 180 m3/hr.",
      "riskPercent": 35
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Dose-Feed Rebalance",
        "actions": [
          {
            "description": "Reduce flocculant dosage to match current feed rate",
            "parameter": "Flocculant Dose",
            "from": "32 g/ton",
            "to": "24 g/ton"
          },
          {
            "description": "Increase feedwell dilution water",
            "parameter": "Feedwell Dilution",
            "from": "Nominal",
            "to": "+5%"
          },
          {
            "description": "Raise bed level setpoint",
            "parameter": "Bed Level",
            "from": "Current",
            "to": "+Setpoint adjustment"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 12
        },
        "costOfAction": 100,
        "costAvoided": 480,
        "netSavings": 380,
        "successProbability": 88,
        "tradeoff": "45-min settling time to see full effect."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Thickener Optimization",
        "actions": [
          {
            "description": "Reduce flocculant dosage",
            "parameter": "Flocculant Dose",
            "from": "32 g/ton",
            "to": "22 g/ton"
          },
          {
            "description": "Optimize feedwell hydraulics",
            "parameter": "Feedwell",
            "from": "Current config",
            "to": "Optimized"
          },
          {
            "description": "Increase rake speed",
            "parameter": "Rake Speed",
            "from": "Nominal",
            "to": "+10%"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 6
        },
        "costOfAction": 200,
        "costAvoided": 680,
        "netSavings": 480,
        "successProbability": 78,
        "tradeoff": "Rake torque increase; monitor for overload."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Flocculant Reduction Only",
        "actions": [
          {
            "description": "Reduce flocculant dosage moderately",
            "parameter": "Flocculant Dose",
            "from": "32 g/ton",
            "to": "28 g/ton"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 25
        },
        "costOfAction": 50,
        "costAvoided": 180,
        "netSavings": 130,
        "successProbability": 96,
        "tradeoff": "Minimal improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 520,
      "preventionRate": 0.4,
      "platformCost": 275000,
      "netAnnualSavings": 1390000
    },
    "shiftMetrics": {
      "output": "48,000 tons tails",
      "energy": "$1,200",
      "efficiency": "65%"
    }
  },
  {
    "id": "mining-5",
    "industry": "Mining and Mineral Processing",
    "scenarioName": "Process Water Recovery and Recycling",
    "description": "Poor recycled water quality from an underperforming clarifier forcing excess fresh water makeup, with lime overdosing compounding operating cost.",
    "annualCostRange": "$1.8M–$2.4M",
    "sensors": [
      {
        "id": "s1",
        "name": "Fresh Water Makeup",
        "unit": "m3/hr",
        "normalValue": 120,
        "anomalyValue": 185,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Recycled Water Quality",
        "unit": "TSS mg/L",
        "normalValue": 150,
        "anomalyValue": 280,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Clarifier Underflow",
        "unit": "%",
        "normalValue": 35,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "pH",
        "unit": "",
        "normalValue": 7.5,
        "anomalyValue": 8.4,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Water Consumption",
        "unit": "m3/ton",
        "normalValue": 1.8,
        "anomalyValue": 2.5,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Lime Dosage",
        "unit": "kg/hr",
        "normalValue": 45,
        "anomalyValue": 72,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Water Waste Index",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 20,
      "criticalThreshold": 30,
      "peakValue": 38
    },
    "predictiveAlert": {
      "title": "Water Consumption 38% Above Target",
      "message": "Recycled water quality poor, forcing increased fresh water makeup. Clarifier underperforming, lime overdosed. Excess fresh water cost: $280/hr.",
      "riskPercent": 38
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Clarifier Optimization",
        "actions": [
          {
            "description": "Adjust clarifier rake speed",
            "parameter": "Rake Speed",
            "from": "Current",
            "to": "Optimized"
          },
          {
            "description": "Reduce lime dosage",
            "parameter": "Lime Dosage",
            "from": "72 kg/hr",
            "to": "52 kg/hr"
          },
          {
            "description": "Increase clarifier retention time by reducing feed rate",
            "parameter": "Clarifier Feed Rate",
            "from": "Nominal",
            "to": "-10%"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 15
        },
        "costOfAction": 100,
        "costAvoided": 195,
        "netSavings": 95,
        "successProbability": 88,
        "tradeoff": "Slight lag in processing rate."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Water Circuit Optimization",
        "actions": [
          {
            "description": "Adjust clarifier rake speed",
            "parameter": "Rake Speed",
            "from": "Current",
            "to": "Optimized"
          },
          {
            "description": "Reduce lime dosage",
            "parameter": "Lime Dosage",
            "from": "72 kg/hr",
            "to": "52 kg/hr"
          },
          {
            "description": "Redirect cleaner tailings to reclaim circuit",
            "parameter": "Cleaner Tailings",
            "from": "Standard route",
            "to": "Reclaim circuit"
          },
          {
            "description": "Optimize pH target",
            "parameter": "pH Setpoint",
            "from": "8.4",
            "to": "7.8"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 8
        },
        "costOfAction": 200,
        "costAvoided": 265,
        "netSavings": 65,
        "successProbability": 78,
        "tradeoff": "Requires operator attention to multiple circuits."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Lime Reduction Only",
        "actions": [
          {
            "description": "Reduce lime dosage moderately",
            "parameter": "Lime Dosage",
            "from": "72 kg/hr",
            "to": "60 kg/hr"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 28
        },
        "costOfAction": 50,
        "costAvoided": 65,
        "netSavings": 15,
        "successProbability": 96,
        "tradeoff": "Marginal improvement; water quality unchanged."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 280,
      "preventionRate": 0.4,
      "platformCost": 250000,
      "netAnnualSavings": 2010000
    },
    "shiftMetrics": {
      "output": "5,000 m3 recycled",
      "energy": "$1,800",
      "efficiency": "65%"
    }
  },
  {
    "id": "automotive-1",
    "industry": "Automotive Manufacturing",
    "scenarioName": "Paint Shop Booth Energy and Quality Optimization",
    "description": "Paint booth humidity and viscosity drift causing overspray, rework, and excess energy consumption per vehicle.",
    "annualCostRange": "$2.4M–$3.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Booth Temp",
        "unit": "°C",
        "normalValue": 23,
        "anomalyValue": 25.5,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Booth Humidity",
        "unit": "%RH",
        "normalValue": 65,
        "anomalyValue": 58,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Air Flow",
        "unit": "m/s",
        "normalValue": 0.3,
        "anomalyValue": 0.42,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Paint Viscosity",
        "unit": "sec",
        "normalValue": 22,
        "anomalyValue": 26,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "FTT Rate",
        "unit": "%",
        "normalValue": 94,
        "anomalyValue": 87,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Energy",
        "unit": "kWh/vehicle",
        "normalValue": 45,
        "anomalyValue": 58,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Combined Waste Index",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 28
    },
    "predictiveAlert": {
      "title": "Paint Booth 28% Above Optimal Efficiency",
      "message": "Humidity low causing viscosity increase and overspray. First-time-through rate dropped to 87%. Excess cost: $18/vehicle in energy plus $42/vehicle in rework.",
      "riskPercent": 28
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Humidity-Viscosity Correction",
        "actions": [
          {
            "description": "Increase humidifier setpoint",
            "parameter": "Booth Humidity",
            "from": "58 %RH",
            "to": "63 %RH"
          },
          {
            "description": "Reduce air flow velocity",
            "parameter": "Air Flow",
            "from": "0.42 m/s",
            "to": "0.33 m/s"
          },
          {
            "description": "Add thinner to paint mix",
            "parameter": "Thinner Ratio",
            "from": "0%",
            "to": "3%"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 8
        },
        "costOfAction": 4000,
        "costAvoided": 42000,
        "netSavings": 38000,
        "successProbability": 87,
        "tradeoff": "15-minute transition; monitor for sag on vertical panels."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Booth Optimization",
        "actions": [
          {
            "description": "Set humidity to target",
            "parameter": "Booth Humidity",
            "from": "58 %RH",
            "to": "65 %RH"
          },
          {
            "description": "Restore nominal air flow",
            "parameter": "Air Flow",
            "from": "0.42 m/s",
            "to": "0.30 m/s"
          },
          {
            "description": "Reformulate paint viscosity",
            "parameter": "Paint Viscosity",
            "from": "26 sec",
            "to": "22 sec"
          },
          {
            "description": "Adjust booth temperature",
            "parameter": "Booth Temp",
            "from": "25.5 °C",
            "to": "23.5 °C"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 4
        },
        "costOfAction": 9000,
        "costAvoided": 52000,
        "netSavings": 43000,
        "successProbability": 74,
        "tradeoff": "Requires paint lab viscosity check; 25-min adjustment period."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Air Flow Only",
        "actions": [
          {
            "description": "Reduce air flow moderately",
            "parameter": "Air Flow",
            "from": "0.42 m/s",
            "to": "0.36 m/s"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 18
        },
        "costOfAction": 500,
        "costAvoided": 15000,
        "netSavings": 14500,
        "successProbability": 96,
        "tradeoff": "Modest improvement; does not address root cause."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 200000,
      "avgCostPerIncident": 38,
      "preventionRate": 0.4,
      "platformCost": 300000,
      "netAnnualSavings": 2740000
    },
    "shiftMetrics": {
      "output": "82 vehicles",
      "energy": "$4,500",
      "efficiency": "74%"
    }
  },
  {
    "id": "automotive-2",
    "industry": "Automotive Manufacturing",
    "scenarioName": "Robotic Welding Line Quality Optimization",
    "description": "Worn electrode tips on Station 14-B driving defective weld rates above target, risking quality holds and rework.",
    "annualCostRange": "$1.0M–$1.6M",
    "sensors": [
      {
        "id": "s1",
        "name": "Weld Current",
        "unit": "kA",
        "normalValue": 11.5,
        "anomalyValue": 12.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Electrode Tip Dia",
        "unit": "mm",
        "normalValue": 6,
        "anomalyValue": 7.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Weld Nugget Dia",
        "unit": "mm",
        "normalValue": 5.8,
        "anomalyValue": 5.1,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Clamping Force",
        "unit": "kN",
        "normalValue": 3.5,
        "anomalyValue": 3.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Welds Since Change",
        "unit": "",
        "normalValue": 800,
        "anomalyValue": 1450,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Defective Weld Rate",
        "unit": "%",
        "normalValue": 0.5,
        "anomalyValue": 2.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Weld Quality Risk",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 15,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Weld Quality Risk at 18% on Station 14-B",
      "message": "Electrode tip worn at 1,450 welds (threshold 1,200). Current compensation maxed. Defective weld rate 2.8% vs. 0.5% target.",
      "riskPercent": 18
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Immediate Tip Change",
        "actions": [
          {
            "description": "Schedule tip change at next body gap",
            "parameter": "Electrode Tip",
            "from": "7.2 mm (worn)",
            "to": "New tip, 6.0 mm"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 3
        },
        "costOfAction": 500,
        "costAvoided": 4200,
        "netSavings": 3700,
        "successProbability": 94,
        "tradeoff": "3-minute production pause on one station."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Tip Change + Parameter Recalibration",
        "actions": [
          {
            "description": "Replace electrode tip",
            "parameter": "Electrode Tip",
            "from": "7.2 mm (worn)",
            "to": "New tip, 6.0 mm"
          },
          {
            "description": "Recalibrate weld current profile",
            "parameter": "Weld Current",
            "from": "12.8 kA",
            "to": "11.5 kA"
          },
          {
            "description": "Recalibrate clamping force profile",
            "parameter": "Clamping Force",
            "from": "Compensated",
            "to": "Nominal"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 2
        },
        "costOfAction": 800,
        "costAvoided": 5100,
        "netSavings": 4300,
        "successProbability": 88,
        "tradeoff": "8-minute station downtime."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Current Compensation",
        "actions": [
          {
            "description": "Increase weld time by 2 cycles",
            "parameter": "Weld Time",
            "from": "Nominal",
            "to": "+2 cycles"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 10
        },
        "costOfAction": 100,
        "costAvoided": 1800,
        "netSavings": 1700,
        "successProbability": 97,
        "tradeoff": "Temporary fix; tip will need change within 100 welds."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1000,
      "avgCostPerIncident": 3200,
      "preventionRate": 0.45,
      "platformCost": 275000,
      "netAnnualSavings": 1170000
    },
    "shiftMetrics": {
      "output": "410 bodies",
      "energy": "$3,200",
      "efficiency": "78%"
    }
  },
  {
    "id": "automotive-3",
    "industry": "Automotive Manufacturing",
    "scenarioName": "Stamping Press Efficiency Optimization",
    "description": "Stamping press running below optimal speed after a split event; die temperature elevated and lubrication excessive.",
    "annualCostRange": "$1.0M–$1.6M",
    "sensors": [
      {
        "id": "s1",
        "name": "Press Speed",
        "unit": "str/min",
        "normalValue": 12,
        "anomalyValue": 9,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Blank Holder Force",
        "unit": "tons",
        "normalValue": 180,
        "anomalyValue": 210,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Draw Depth",
        "unit": "mm",
        "normalValue": 85,
        "anomalyValue": 83.2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Lubrication",
        "unit": "mL/stroke",
        "normalValue": 15,
        "anomalyValue": 24,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Scrap Rate",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 4.5,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Die Temperature",
        "unit": "°C",
        "normalValue": 45,
        "anomalyValue": 62,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Press Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 25
    },
    "predictiveAlert": {
      "title": "Stamping Press 25% Below Optimal Efficiency",
      "message": "Speed reduced after split event 2 hours ago. Die temperature elevated, lubrication excessive. Lost production: 180 panels this shift.",
      "riskPercent": 25
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Parameter Recovery",
        "actions": [
          {
            "description": "Reduce blank holder force",
            "parameter": "Blank Holder Force",
            "from": "210 tons",
            "to": "190 tons"
          },
          {
            "description": "Reduce lubrication rate",
            "parameter": "Lubrication",
            "from": "24 mL/stroke",
            "to": "18 mL/stroke"
          },
          {
            "description": "Increase press speed",
            "parameter": "Press Speed",
            "from": "9 str/min",
            "to": "11 str/min"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 7
        },
        "costOfAction": 500,
        "costAvoided": 8400,
        "netSavings": 7900,
        "successProbability": 88,
        "tradeoff": "Monitor first 20 panels at new settings."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Speed + Die Cooling",
        "actions": [
          {
            "description": "Activate die cooling spray",
            "parameter": "Die Cooling",
            "from": "Off",
            "to": "On"
          },
          {
            "description": "Reduce blank holder force",
            "parameter": "Blank Holder Force",
            "from": "210 tons",
            "to": "185 tons"
          },
          {
            "description": "Restore full press speed",
            "parameter": "Press Speed",
            "from": "9 str/min",
            "to": "12 str/min"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 3
        },
        "costOfAction": 1200,
        "costAvoided": 12600,
        "netSavings": 11400,
        "successProbability": 76,
        "tradeoff": "Need to verify die cooling system is operational; 10-min setup."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Lubrication Only",
        "actions": [
          {
            "description": "Reduce lubrication moderately",
            "parameter": "Lubrication",
            "from": "24 mL/stroke",
            "to": "20 mL/stroke"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 18
        },
        "costOfAction": 100,
        "costAvoided": 2100,
        "netSavings": 2000,
        "successProbability": 97,
        "tradeoff": "Minimal improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 500,
      "avgCostPerIncident": 7200,
      "preventionRate": 0.4,
      "platformCost": 275000,
      "netAnnualSavings": 1170000
    },
    "shiftMetrics": {
      "output": "820 panels",
      "energy": "$2,800",
      "efficiency": "71%"
    }
  },
  {
    "id": "automotive-4",
    "industry": "Automotive Manufacturing",
    "scenarioName": "Assembly Line Takt Time Optimization",
    "description": "Station 12 overrunning takt time on high-option vehicle variants, causing line stops and throughput loss.",
    "annualCostRange": "$4.8M–$7.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Takt Time",
        "unit": "sec",
        "normalValue": 60,
        "anomalyValue": 60,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Station 12 Cycle",
        "unit": "sec",
        "normalValue": 57,
        "anomalyValue": 64,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Station 12 Overrun",
        "unit": "%",
        "normalValue": 5,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Station 8 Idle",
        "unit": "sec",
        "normalValue": 3,
        "anomalyValue": 11,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Line Stops (last 4hr)",
        "unit": "",
        "normalValue": 2,
        "anomalyValue": 7,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Throughput",
        "unit": "veh/hr",
        "normalValue": 58,
        "anomalyValue": 52,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Throughput Loss",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 12,
      "peakValue": 14
    },
    "predictiveAlert": {
      "title": "Assembly Line 14% Below Throughput Target",
      "message": "Station 12 overrunning takt on 28% of vehicles due to high-option variant mix. 7 line stops in last 4 hours traced to Station 12.",
      "riskPercent": 14
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Task Redistribution",
        "actions": [
          {
            "description": "Move sub-assembly task C from Station 12 to Station 8",
            "parameter": "Task Assignment",
            "from": "Station 12",
            "to": "Station 8"
          }
        ],
        "riskReduction": {
          "from": 14,
          "to": 4
        },
        "costOfAction": 2000,
        "costAvoided": 14000,
        "netSavings": 12000,
        "successProbability": 87,
        "tradeoff": "Station 8 operator needs 5-min briefing on task C."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Rebalance Stations 10-14",
        "actions": [
          {
            "description": "Redistribute tasks across Stations 10-14 to equalize cycle times",
            "parameter": "Line Balance",
            "from": "Unbalanced",
            "to": "Equalized"
          }
        ],
        "riskReduction": {
          "from": 14,
          "to": 1
        },
        "costOfAction": 5000,
        "costAvoided": 21000,
        "netSavings": 16000,
        "successProbability": 72,
        "tradeoff": "15-min line pause for team briefing; risk of quality issues during transition."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Overtime Buffer",
        "actions": [
          {
            "description": "Add relief operator to Station 12 for remainder of shift",
            "parameter": "Station 12 Staffing",
            "from": "1 operator",
            "to": "2 operators"
          }
        ],
        "riskReduction": {
          "from": 14,
          "to": 7
        },
        "costOfAction": 3000,
        "costAvoided": 8000,
        "netSavings": 5000,
        "successProbability": 94,
        "tradeoff": "Higher labor cost; does not fix root cause."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2000,
      "avgCostPerIncident": 12000,
      "preventionRate": 0.25,
      "platformCost": 350000,
      "netAnnualSavings": 5650000
    },
    "shiftMetrics": {
      "output": "416 vehicles",
      "energy": "$18,200",
      "efficiency": "86%"
    }
  },
  {
    "id": "automotive-5",
    "industry": "Automotive Manufacturing",
    "scenarioName": "Plant-Wide Energy Management",
    "description": "Compressed air leaks, HVAC overconsumption, and weak waste heat recovery pushing plant demand above peak charge threshold.",
    "annualCostRange": "$1.2M–$1.8M",
    "sensors": [
      {
        "id": "s1",
        "name": "Total Plant Demand",
        "unit": "MW",
        "normalValue": 18.5,
        "anomalyValue": 22.3,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Compressed Air Efficiency",
        "unit": "cfm/kW",
        "normalValue": 4.2,
        "anomalyValue": 3.1,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "HVAC Energy",
        "unit": "kWh/hr",
        "normalValue": 2800,
        "anomalyValue": 3650,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Waste Heat Recovery",
        "unit": "%",
        "normalValue": 45,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "kWh per Vehicle",
        "unit": "",
        "normalValue": 520,
        "anomalyValue": 645,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Demand Threshold",
        "unit": "MW",
        "normalValue": 20,
        "anomalyValue": 20,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Waste Index",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 15,
      "criticalThreshold": 22,
      "peakValue": 26
    },
    "predictiveAlert": {
      "title": "Plant Energy 26% Above Benchmark",
      "message": "Compressed air leak rate elevated, HVAC at full capacity despite mild weather, waste heat recovery underperforming. Demand charge exceeded by 2.3 MW. Monthly cost impact: $68,000.",
      "riskPercent": 26
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Multi-System Optimization",
        "actions": [
          {
            "description": "Take leaking compressor 3 offline",
            "parameter": "Compressor 3",
            "from": "Running (leaking)",
            "to": "Offline for maintenance"
          },
          {
            "description": "Reduce HVAC output",
            "parameter": "HVAC Setpoint",
            "from": "100%",
            "to": "70%"
          },
          {
            "description": "Restart waste heat recovery pump",
            "parameter": "WHR Pump",
            "from": "Off",
            "to": "On"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 8
        },
        "costOfAction": 1000,
        "costAvoided": 4200,
        "netSavings": 3200,
        "successProbability": 88,
        "tradeoff": "Compressor 3 needs maintenance within 48 hours."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Load Management",
        "actions": [
          {
            "description": "Take leaking compressor 3 offline",
            "parameter": "Compressor 3",
            "from": "Running (leaking)",
            "to": "Offline for maintenance"
          },
          {
            "description": "Reduce HVAC output",
            "parameter": "HVAC Setpoint",
            "from": "100%",
            "to": "70%"
          },
          {
            "description": "Restart waste heat recovery pump",
            "parameter": "WHR Pump",
            "from": "Off",
            "to": "On"
          },
          {
            "description": "Shift paint shop air handling to minimum flow during break",
            "parameter": "Paint Shop Air",
            "from": "Full flow",
            "to": "Min flow"
          },
          {
            "description": "Dim warehouse lighting",
            "parameter": "Warehouse Lighting",
            "from": "100%",
            "to": "60%"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 4
        },
        "costOfAction": 2000,
        "costAvoided": 5800,
        "netSavings": 3800,
        "successProbability": 78,
        "tradeoff": "Paint shop restart adds 8 min to break end."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "HVAC Only",
        "actions": [
          {
            "description": "Reduce HVAC output moderately",
            "parameter": "HVAC Setpoint",
            "from": "100%",
            "to": "80%"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 17
        },
        "costOfAction": 200,
        "costAvoided": 1400,
        "netSavings": 1200,
        "successProbability": 96,
        "tradeoff": "Still over demand charge threshold."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 365,
      "avgCostPerIncident": 4800,
      "preventionRate": 0.35,
      "platformCost": 300000,
      "netAnnualSavings": 1380000
    },
    "shiftMetrics": {
      "output": "N/A",
      "energy": "$5,800",
      "efficiency": "72%"
    }
  },
  {
    "id": "water-1",
    "industry": "Water and Wastewater",
    "scenarioName": "Aeration Energy Optimization",
    "description": "Aeration (blowing air into wastewater for biological treatment) is the largest energy consumer in wastewater treatment plants, accounting for 40–60% of total electricity. The oxygen demand varies with influent loading (time of day, weather, industrial discharges), but most plants run blowers at fixed speeds that do not optimize for energy cost. Operators over-aerate by 15–30% to maintain a comfort margin on treatment quality.",
    "annualCostRange": "$88K–$175K",
    "sensors": [
      {
        "id": "s1",
        "name": "Dissolved Oxygen",
        "unit": "mg/L",
        "normalValue": 2,
        "anomalyValue": 3.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Blower Power",
        "unit": "kW",
        "normalValue": 185,
        "anomalyValue": 245,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Influent Flow Rate",
        "unit": "m³/hr",
        "normalValue": 1200,
        "anomalyValue": 950,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Influent BOD",
        "unit": "mg/L",
        "normalValue": 220,
        "anomalyValue": 180,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Effluent Ammonia",
        "unit": "mg/L",
        "normalValue": 1.5,
        "anomalyValue": 0.8,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Air Flow Rate",
        "unit": "m³/min",
        "normalValue": 125,
        "anomalyValue": 162,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Aeration Overuse",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 20,
      "criticalThreshold": 30,
      "peakValue": 35
    },
    "predictiveAlert": {
      "title": "Aeration System Over-Delivering Oxygen",
      "message": "Aeration system over-delivering by 35%. DO at 3.2 mg/L (target 2.0). Influent loading below average. Excess electricity cost: $28/hr.",
      "riskPercent": 65
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Load-Based Blower Modulation",
        "actions": [
          {
            "description": "Reduce blower speed to target 2.1 mg/L DO",
            "parameter": "Blower Speed",
            "from": "Current (162 m³/min)",
            "to": "130 m³/min"
          },
          {
            "description": "Match air supply to current influent loading",
            "parameter": "Air Flow Target",
            "from": "Fixed rate",
            "to": "Loading-matched"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 10
        },
        "costOfAction": 100,
        "costAvoided": 330,
        "netSavings": 230,
        "successProbability": 94,
        "tradeoff": "None; treatment quality maintained above permit limits."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Predictive Loading Control",
        "actions": [
          {
            "description": "Modulate blower on 4-hour influent loading forecast",
            "parameter": "Control Mode",
            "from": "Reactive DO control",
            "to": "Predictive loading control"
          },
          {
            "description": "Pre-emptively reduce to 1.8 mg/L DO during low-load period",
            "parameter": "DO Setpoint",
            "from": "3.2 mg/L",
            "to": "1.8 mg/L"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 5
        },
        "costOfAction": 200,
        "costAvoided": 390,
        "netSavings": 190,
        "successProbability": 83,
        "tradeoff": "Tighter margin during brief load spikes; within permit but less buffer."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Fixed Speed Reduction",
        "actions": [
          {
            "description": "Reduce blower speed by 10%, monitor DO",
            "parameter": "Blower Speed",
            "from": "Current",
            "to": "-10%"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 22
        },
        "costOfAction": 50,
        "costAvoided": 180,
        "netSavings": 130,
        "successProbability": 97,
        "tradeoff": "May need manual adjustment if loading increases."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8760,
      "avgCostPerIncident": 20,
      "preventionRate": 0.5,
      "platformCost": 150000,
      "netAnnualSavings": 88000
    },
    "shiftMetrics": {
      "output": "28,800 m³",
      "energy": "$4,900",
      "efficiency": "65%"
    }
  },
  {
    "id": "water-2",
    "industry": "Water and Wastewater",
    "scenarioName": "Chemical Dosing Optimization",
    "description": "Water and wastewater plants use chemicals (coagulants, polymers, disinfectants, pH adjusters) to meet treatment targets. Dosing is often based on fixed rates or operator judgment, not real-time optimization. Over-dosing wastes chemicals and can create downstream problems (excess chlorine, sludge volume). Under-dosing risks permit violations. Mid-size plants typically spend $0.5–2M/year on chemicals with significant waste.",
    "annualCostRange": "$425K–$575K",
    "sensors": [
      {
        "id": "s1",
        "name": "Coagulant Dose",
        "unit": "mg/L",
        "normalValue": 35,
        "anomalyValue": 52,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Turbidity (Raw)",
        "unit": "NTU",
        "normalValue": 15,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Turbidity (Settled)",
        "unit": "NTU",
        "normalValue": 1,
        "anomalyValue": 0.6,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "pH",
        "unit": "",
        "normalValue": 7.2,
        "anomalyValue": 6.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Sludge Production",
        "unit": "kg/day",
        "normalValue": 2800,
        "anomalyValue": 3600,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Chemical Cost",
        "unit": "$/day",
        "normalValue": 3200,
        "anomalyValue": 4750,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Chemical Overuse",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 25,
      "criticalThreshold": 40,
      "peakValue": 48
    },
    "predictiveAlert": {
      "title": "Chemical Dosing 48% Above Optimal",
      "message": "Chemical dosing 48% above optimal. Raw water turbidity has decreased but coagulant dose not adjusted. Excess chemical cost: $1,550/day. Excess sludge generation: 800 kg/day.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Turbidity-Responsive Dosing",
        "actions": [
          {
            "description": "Reduce coagulant dose based on current raw water quality",
            "parameter": "Coagulant Dose",
            "from": "52 mg/L",
            "to": "38 mg/L"
          },
          {
            "description": "Settled turbidity will remain below 1.2 NTU (limit: 2.0 NTU)",
            "parameter": "Settled Turbidity",
            "from": "0.6 NTU",
            "to": "Est. 1.1 NTU"
          }
        ],
        "riskReduction": {
          "from": 48,
          "to": 12
        },
        "costOfAction": 100,
        "costAvoided": 1180,
        "netSavings": 1080,
        "successProbability": 92,
        "tradeoff": "Monitor settled water quality for 30 min after adjustment."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Dosing Optimization",
        "actions": [
          {
            "description": "Reduce coagulant to minimum effective dose",
            "parameter": "Coagulant Dose",
            "from": "52 mg/L",
            "to": "34 mg/L"
          },
          {
            "description": "Adjust pH correction chemical proportionally",
            "parameter": "pH Correction",
            "from": "Current",
            "to": "Proportional"
          },
          {
            "description": "Optimize polymer dose",
            "parameter": "Polymer Dose",
            "from": "Standard",
            "to": "Reduced"
          }
        ],
        "riskReduction": {
          "from": 48,
          "to": 5
        },
        "costOfAction": 200,
        "costAvoided": 1450,
        "netSavings": 1250,
        "successProbability": 79,
        "tradeoff": "Closer to turbidity limit; requires jar testing confirmation."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "15% Dose Reduction",
        "actions": [
          {
            "description": "Reduce coagulant by 15%",
            "parameter": "Coagulant Dose",
            "from": "52 mg/L",
            "to": "44 mg/L"
          }
        ],
        "riskReduction": {
          "from": 48,
          "to": 32
        },
        "costOfAction": 50,
        "costAvoided": 580,
        "netSavings": 530,
        "successProbability": 97,
        "tradeoff": "Still significantly over-dosing; lower risk approach."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 365,
      "avgCostPerIncident": 1550,
      "preventionRate": 0.45,
      "platformCost": 150000,
      "netAnnualSavings": 425000
    },
    "shiftMetrics": {
      "output": "28,800 m³",
      "energy": "$2,400",
      "efficiency": "52%"
    }
  },
  {
    "id": "water-3",
    "industry": "Water and Wastewater",
    "scenarioName": "Sludge Dewatering Optimization",
    "description": "Wastewater treatment plants dewater biological sludge using centrifuges, belt presses, or filter presses before disposal or land application. Polymer (flocculant) addition is the primary operating cost lever; too little produces wet cake that is expensive to transport and dispose, too much wastes expensive polymer with no quality improvement. Most operators overdose polymer by 20 to 40% as a safety margin against compliance risk.",
    "annualCostRange": "$385K–$535K",
    "sensors": [
      {
        "id": "s1",
        "name": "Polymer Dose",
        "unit": "g/ton DS",
        "normalValue": 8.5,
        "anomalyValue": 12.4,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Cake Solids Content",
        "unit": "%",
        "normalValue": 22,
        "anomalyValue": 23.5,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Centrate Clarity",
        "unit": "NTU",
        "normalValue": 180,
        "anomalyValue": 95,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Sludge Feed Rate",
        "unit": "m3/hr",
        "normalValue": 28,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Polymer Cost",
        "unit": "$/day",
        "normalValue": 840,
        "anomalyValue": 1240,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Disposal Cost",
        "unit": "$/day",
        "normalValue": 2200,
        "anomalyValue": 2150,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Polymer Overuse",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 25,
      "criticalThreshold": 38,
      "peakValue": 46
    },
    "predictiveAlert": {
      "title": "Polymer Dosing 46% Above Optimal",
      "message": "Polymer dosing 46% above optimal. Centrate clarity at 95 NTU (well below 300 NTU limit). Cake solids acceptable at 23.5%. Excess polymer cost: $400/day with no operational benefit.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Dose Reduction to Optimum",
        "actions": [
          {
            "description": "Reduce polymer dose",
            "parameter": "Polymer Dose",
            "from": "12.4 g/ton DS",
            "to": "9.5 g/ton DS"
          },
          {
            "description": "Monitor centrate clarity for 1 hour",
            "parameter": "Centrate Clarity",
            "from": "95 NTU",
            "to": "Target: under 200 NTU (limit: 300)"
          }
        ],
        "riskReduction": {
          "from": 46,
          "to": 12
        },
        "costOfAction": 50,
        "costAvoided": 390,
        "netSavings": 340,
        "successProbability": 92,
        "tradeoff": "Monitor centrate clarity for 1 hour after dose reduction."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Minimum Effective Dose",
        "actions": [
          {
            "description": "Reduce polymer to minimum effective dose",
            "parameter": "Polymer Dose",
            "from": "12.4 g/ton DS",
            "to": "8.8 g/ton DS"
          }
        ],
        "riskReduction": {
          "from": 46,
          "to": 5
        },
        "costOfAction": 50,
        "costAvoided": 450,
        "netSavings": 400,
        "successProbability": 79,
        "tradeoff": "Tighter margin on clarity limit; requires continuous operator monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "20% Dose Reduction",
        "actions": [
          {
            "description": "Reduce polymer dose by 20%",
            "parameter": "Polymer Dose",
            "from": "12.4 g/ton DS",
            "to": "10.5 g/ton DS"
          }
        ],
        "riskReduction": {
          "from": 46,
          "to": 28
        },
        "costOfAction": 50,
        "costAvoided": 290,
        "netSavings": 240,
        "successProbability": 96,
        "tradeoff": "Still overdosing significantly; conservative first step."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 340,
      "avgCostPerIncident": 350,
      "preventionRate": 0.45,
      "platformCost": 150000,
      "netAnnualSavings": 385000
    },
    "shiftMetrics": {
      "output": "672 m³ sludge",
      "energy": "$1,800",
      "efficiency": "54%"
    }
  },
  {
    "id": "water-4",
    "industry": "Water and Wastewater",
    "scenarioName": "UV Disinfection Optimization",
    "description": "UV disinfection systems are increasingly used in water and wastewater treatment as a chemical-free alternative to chlorination. UV lamp intensity degrades over time, and operators often maintain conservative UV dose targets (30 to 50% above minimum regulatory requirement) to compensate for lamp aging and fouling uncertainty. Modern UV systems can deliver minimum required dose with 20 to 30% less energy by optimizing lamp output and sleeve cleaning frequency.",
    "annualCostRange": "$390K–$540K",
    "sensors": [
      {
        "id": "s1",
        "name": "UV Transmittance",
        "unit": "%",
        "normalValue": 72,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "UV Dose Delivered",
        "unit": "mJ/cm2",
        "normalValue": 42,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Lamp Intensity",
        "unit": "%",
        "normalValue": 88,
        "anomalyValue": 76,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Energy per m3",
        "unit": "Wh/m3",
        "normalValue": 0.042,
        "anomalyValue": 0.058,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Sleeve Fouling Factor",
        "unit": "",
        "normalValue": 0.92,
        "anomalyValue": 0.81,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Flow Rate",
        "unit": "m3/hr",
        "normalValue": 1400,
        "anomalyValue": 1400,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Efficiency Gap",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 22,
      "criticalThreshold": 32,
      "peakValue": 38
    },
    "predictiveAlert": {
      "title": "UV System Energy 38% Above Optimal",
      "message": "UV system energy efficiency 38% above optimal. Lamp intensity degraded to 76% (sleeve fouling indicated). Energy consumption at 0.058 Wh/m3 vs. 0.042 target. UV dose still above regulatory minimum.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Sleeve Cleaning and Lamp Adjustment",
        "actions": [
          {
            "description": "Clean UV sleeves on Bank A (system stays online with Bank B)",
            "parameter": "UV Sleeve Condition",
            "from": "Fouled (0.81)",
            "to": "Cleaned"
          },
          {
            "description": "Adjust lamp output after cleaning",
            "parameter": "Lamp Intensity",
            "from": "76%",
            "to": "Est. 86% post-clean"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 14
        },
        "costOfAction": 400,
        "costAvoided": 1840,
        "netSavings": 1440,
        "successProbability": 88,
        "tradeoff": "2-hour maintenance procedure on one bank; redundant bank maintains treatment."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full System Optimization",
        "actions": [
          {
            "description": "Clean UV sleeves on both banks sequentially",
            "parameter": "UV Sleeve Condition",
            "from": "Fouled",
            "to": "Both banks cleaned"
          },
          {
            "description": "Optimize dose setpoint to minimum regulatory requirement plus 15% margin",
            "parameter": "UV Dose Target",
            "from": "42 mJ/cm2",
            "to": "28.75 mJ/cm2 (regulatory min + 15%)"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 5
        },
        "costOfAction": 600,
        "costAvoided": 2680,
        "netSavings": 2080,
        "successProbability": 78,
        "tradeoff": "Tighter dose margin; requires regulatory confirmation before setpoint change."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Dose Setpoint Reduction Only",
        "actions": [
          {
            "description": "Reduce UV dose target by 10%",
            "parameter": "UV Dose Target",
            "from": "42 mJ/cm2",
            "to": "37.8 mJ/cm2"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 26
        },
        "costOfAction": 100,
        "costAvoided": 740,
        "netSavings": 640,
        "successProbability": 93,
        "tradeoff": "Sleeve fouling not addressed; improvement is temporary."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 15,
      "preventionRate": 0.45,
      "platformCost": 150000,
      "netAnnualSavings": 390000
    },
    "shiftMetrics": {
      "output": "33,600 m³",
      "energy": "$3,100",
      "efficiency": "62%"
    }
  },
  {
    "id": "water-5",
    "industry": "Water and Wastewater",
    "scenarioName": "Nutrient Removal Process Optimization",
    "description": "Biological nutrient removal (BNR) processes in advanced wastewater treatment remove nitrogen and phosphorus through controlled alternating aerobic and anoxic zones. Optimizing internal recycle flow rates, aerobic zone dissolved oxygen, and carbon source dosing minimizes energy and chemical consumption while meeting discharge limits. Most plants use conservative, fixed operating conditions and over-recycle by 30 to 50%, wasting significant pumping energy.",
    "annualCostRange": "$767K–$1.53M",
    "sensors": [
      {
        "id": "s1",
        "name": "Internal Recycle Ratio",
        "unit": "",
        "normalValue": 3.5,
        "anomalyValue": 5.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Effluent Total Nitrogen",
        "unit": "mg/L",
        "normalValue": 6.2,
        "anomalyValue": 4.8,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Effluent Total Phosphorus",
        "unit": "mg/L",
        "normalValue": 0.4,
        "anomalyValue": 0.3,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Recycle Pump Power",
        "unit": "kW",
        "normalValue": 68,
        "anomalyValue": 98,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Carbon Source Dose",
        "unit": "mg/L",
        "normalValue": 28,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Anoxic Zone NOx",
        "unit": "mg/L",
        "normalValue": 3.8,
        "anomalyValue": 1.2,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Process Efficiency Gap",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 22,
      "criticalThreshold": 32,
      "peakValue": 38
    },
    "predictiveAlert": {
      "title": "BNR Process 38% Above Optimal Energy",
      "message": "BNR process efficiency 38% above optimal energy. Internal recycle ratio at 5.2 (optimal 3.5 for current loading). Effluent nitrogen and phosphorus well below permit limits, over-treating with no benefit. Recycle pump consuming excess $32/hr.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Recycle Ratio Reduction",
        "actions": [
          {
            "description": "Reduce internal recycle ratio",
            "parameter": "Internal Recycle Ratio",
            "from": "5.2",
            "to": "4.0"
          },
          {
            "description": "Monitor effluent nitrogen quality for 4 hours",
            "parameter": "Effluent TN Monitoring",
            "from": "Periodic",
            "to": "4-hr intensive monitoring"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 14
        },
        "costOfAction": 200,
        "costAvoided": 576,
        "netSavings": 376,
        "successProbability": 88,
        "tradeoff": "Monitor effluent quality for 4 hours at reduced recycle ratio."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full BNR Optimization",
        "actions": [
          {
            "description": "Reduce recycle ratio to optimal",
            "parameter": "Internal Recycle Ratio",
            "from": "5.2",
            "to": "3.5"
          },
          {
            "description": "Optimize DO in aerobic zones",
            "parameter": "Aerobic Zone DO",
            "from": "Current",
            "to": "Load-optimized"
          },
          {
            "description": "Reduce carbon source dosing",
            "parameter": "Carbon Source Dose",
            "from": "28 mg/L",
            "to": "24 mg/L"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 5
        },
        "costOfAction": 400,
        "costAvoided": 864,
        "netSavings": 464,
        "successProbability": 77,
        "tradeoff": "Closer to permit limits; requires process engineer approval."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Partial Recycle Reduction",
        "actions": [
          {
            "description": "Reduce internal recycle ratio by 20%",
            "parameter": "Internal Recycle Ratio",
            "from": "5.2",
            "to": "4.5"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 24
        },
        "costOfAction": 100,
        "costAvoided": 336,
        "netSavings": 236,
        "successProbability": 93,
        "tradeoff": "Still over-recycling; modest improvement only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 26,
      "preventionRate": 0.42,
      "platformCost": 150000,
      "netAnnualSavings": 767000
    },
    "shiftMetrics": {
      "output": "33,600 m³",
      "energy": "$5,600",
      "efficiency": "62%"
    }
  },
  {
    "id": "energy-1",
    "industry": "Energy and Utilities",
    "scenarioName": "Cogeneration Plant Heat-Power Optimization",
    "description": "Industrial cogeneration (combined heat and power, CHP) plants must simultaneously satisfy electrical demand and steam/heat demand. The optimal balance between electricity generation and heat recovery shifts constantly based on grid electricity prices, steam demand from production, ambient temperature, and equipment efficiency curves. Most plants follow fixed operating profiles that leave 10–20% of potential value on the table.",
    "annualCostRange": "$865K–$2.72M",
    "sensors": [
      {
        "id": "s1",
        "name": "Electrical Output",
        "unit": "MW",
        "normalValue": 12.5,
        "anomalyValue": 14.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Steam Production",
        "unit": "tons/hr",
        "normalValue": 45,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Grid Price",
        "unit": "$/MWh",
        "normalValue": 55,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Gas Consumption",
        "unit": "MMBtu/hr",
        "normalValue": 145,
        "anomalyValue": 158,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Heat Recovery Eff.",
        "unit": "%",
        "normalValue": 82,
        "anomalyValue": 71,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Steam Demand",
        "unit": "tons/hr",
        "normalValue": 42,
        "anomalyValue": 42,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Economic Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "CHP Operating Below Economic Optimum",
      "message": "CHP operating 22% below economic optimum. Currently maximizing electrical output during low grid prices ($35/MWh). Steam production below plant demand, forcing auxiliary boiler use ($18/ton more expensive).",
      "riskPercent": 71
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Load Shift to Steam",
        "actions": [
          {
            "description": "Reduce electrical output",
            "parameter": "Electrical Output",
            "from": "14.2 MW",
            "to": "11.0 MW"
          },
          {
            "description": "Increase steam production to meet plant demand",
            "parameter": "Steam Production",
            "from": "38 tons/hr",
            "to": "44 tons/hr"
          },
          {
            "description": "Eliminate auxiliary boiler operation",
            "parameter": "Aux. Boiler",
            "from": "Running",
            "to": "Shutdown"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 6
        },
        "costOfAction": 300,
        "costAvoided": 6300,
        "netSavings": 6000,
        "successProbability": 90,
        "tradeoff": "1.5 MW less electricity sold to grid at current low prices."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Economic Optimization",
        "actions": [
          {
            "description": "Shift to minimum electrical output",
            "parameter": "Electrical Output",
            "from": "14.2 MW",
            "to": "8.0 MW"
          },
          {
            "description": "Maximize steam production and pre-heat feedwater",
            "parameter": "Steam Mode",
            "from": "Standard",
            "to": "Maximum + pre-heat"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 2
        },
        "costOfAction": 500,
        "costAvoided": 8700,
        "netSavings": 8200,
        "successProbability": 76,
        "tradeoff": "Minimal grid revenue; relies on forecast that electricity prices stay low."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Partial Load Shift",
        "actions": [
          {
            "description": "Reduce electricity slightly, increase steam modestly",
            "parameter": "Electrical Output",
            "from": "14.2 MW",
            "to": "12.0 MW"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 14
        },
        "costOfAction": 150,
        "costAvoided": 2700,
        "netSavings": 2550,
        "successProbability": 95,
        "tradeoff": "Still using some auxiliary boiler capacity."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 340,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 865000
    },
    "shiftMetrics": {
      "output": "14.2 MW / 38 t/hr",
      "energy": "$31,600",
      "efficiency": "78%"
    }
  },
  {
    "id": "energy-2",
    "industry": "Energy and Utilities",
    "scenarioName": "Demand Response and Peak Shaving",
    "description": "Industrial facilities pay demand charges based on their peak electricity consumption in any 15-minute interval during the billing period. A single spike can set the demand charge for the entire month ($15–30/kW, potentially $50K–200K/month). Most plants do not actively manage peak demand. Real-time load shedding and scheduling of flexible loads (compressors, fans, chillers) can shave peaks without affecting production.",
    "annualCostRange": "$50K–$200K",
    "sensors": [
      {
        "id": "s1",
        "name": "Current Demand",
        "unit": "kW",
        "normalValue": 4200,
        "anomalyValue": 5350,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "15-min Rolling Avg",
        "unit": "kW",
        "normalValue": 4100,
        "anomalyValue": 5180,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Demand Limit",
        "unit": "kW",
        "normalValue": 4500,
        "anomalyValue": 4500,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Compressor Load",
        "unit": "kW",
        "normalValue": 800,
        "anomalyValue": 1200,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Chiller Load",
        "unit": "kW",
        "normalValue": 600,
        "anomalyValue": 850,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Production-Critical Load",
        "unit": "kW",
        "normalValue": 2800,
        "anomalyValue": 2800,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Peak Demand Overshoot",
      "unit": "%",
      "normalValue": 0,
      "warningThreshold": 5,
      "criticalThreshold": 12,
      "peakValue": 15
    },
    "predictiveAlert": {
      "title": "Demand 15% Above Monthly Limit, 6 Minutes Remaining",
      "message": "Demand 15% above monthly limit. If current 15-min interval closes at this level, demand charge increases by $12,750 for the entire month. 6 minutes remaining in current interval.",
      "riskPercent": 88
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Immediate Flexible Load Shed",
        "actions": [
          {
            "description": "Cycle compressor 2 offline",
            "parameter": "Compressor 2",
            "from": "Running (400 kW)",
            "to": "Offline"
          },
          {
            "description": "Reduce chiller setpoint by 2°C",
            "parameter": "Chiller Setpoint",
            "from": "Current",
            "to": "-2°C (saves 150 kW)"
          }
        ],
        "riskReduction": {
          "from": 15,
          "to": 7
        },
        "costOfAction": 200,
        "costAvoided": 8250,
        "netSavings": 8050,
        "successProbability": 91,
        "tradeoff": "Compressed air pressure drops slightly for 10 min; building temperature rises 1°C."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Curtailment",
        "actions": [
          {
            "description": "All flexible loads to minimum",
            "parameter": "Flexible Loads",
            "from": "Current (2,550 kW)",
            "to": "Minimum (1,600 kW)"
          },
          {
            "description": "Bring demand below monthly limit",
            "parameter": "Total Demand",
            "from": "5,350 kW",
            "to": "Under 4,500 kW"
          }
        ],
        "riskReduction": {
          "from": 15,
          "to": 0
        },
        "costOfAction": 400,
        "costAvoided": 12750,
        "netSavings": 12350,
        "successProbability": 95,
        "tradeoff": "Temporary comfort reduction; some non-critical systems interrupted for 15 min."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Single Compressor Cycle",
        "actions": [
          {
            "description": "Cycle one compressor offline only",
            "parameter": "Compressor 1",
            "from": "Running",
            "to": "Offline (400 kW saved)"
          }
        ],
        "riskReduction": {
          "from": 15,
          "to": 8
        },
        "costOfAction": 100,
        "costAvoided": 6000,
        "netSavings": 5900,
        "successProbability": 93,
        "tradeoff": "Still over demand limit; moderate improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8,
      "avgCostPerIncident": 25000,
      "preventionRate": 0.6,
      "platformCost": 150000,
      "netAnnualSavings": 50000
    },
    "shiftMetrics": {
      "output": "5,350 kW peak",
      "energy": "$28,400",
      "efficiency": "85%"
    }
  },
  {
    "id": "energy-3",
    "industry": "Energy and Utilities",
    "scenarioName": "Boiler Efficiency Optimization",
    "description": "Industrial boilers generating steam for process use are significant energy consumers. Combustion efficiency depends on excess air, stack gas temperature, fuel quality, and burner condition. Over time, burner tip wear, heat exchanger fouling, and control drift cause efficiency to degrade from 85 to 88% (ideal) to 78 to 82% without obvious alarms. A 1% improvement in boiler efficiency saves $50K to $200K per year depending on plant size and fuel cost.",
    "annualCostRange": "$1.02M–$2.72M",
    "sensors": [
      {
        "id": "s1",
        "name": "Stack Gas O2",
        "unit": "%",
        "normalValue": 3.5,
        "anomalyValue": 5.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Stack Temperature",
        "unit": "°C",
        "normalValue": 185,
        "anomalyValue": 218,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Boiler Efficiency",
        "unit": "%",
        "normalValue": 87,
        "anomalyValue": 81,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Steam Output",
        "unit": "t/hr",
        "normalValue": 42,
        "anomalyValue": 40,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Fuel Gas Consumption",
        "unit": "MMBtu/hr",
        "normalValue": 42,
        "anomalyValue": 46,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Blowdown Rate",
        "unit": "%",
        "normalValue": 3,
        "anomalyValue": 4.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Combustion Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Boiler Efficiency 22% Below Optimal",
      "message": "Boiler efficiency 22% below optimal. Stack O2 at 5.8% indicating 65% excess air (target 20%). Stack temperature 218°C (target 185°C) indicates heat exchanger fouling. Efficiency at 81% vs. 87% rated.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Air-Fuel Ratio Correction",
        "actions": [
          {
            "description": "Adjust combustion air registers to reduce excess air",
            "parameter": "Stack Gas O2",
            "from": "5.8%",
            "to": "3.8%"
          },
          {
            "description": "Monitor CO at new air setting for 30 minutes",
            "parameter": "CO Monitoring",
            "from": "Periodic",
            "to": "30-min continuous"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 8
        },
        "costOfAction": 400,
        "costAvoided": 14400,
        "netSavings": 14000,
        "successProbability": 88,
        "tradeoff": "Monitor CO closely for 30 minutes after air reduction."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Combustion Optimization",
        "actions": [
          {
            "description": "Trim air to minimum excess",
            "parameter": "Stack Gas O2",
            "from": "5.8%",
            "to": "3.5%"
          },
          {
            "description": "Clean air preheater during next maintenance window",
            "parameter": "Air Preheater",
            "from": "Fouled",
            "to": "Cleaning scheduled"
          },
          {
            "description": "Reduce blowdown to minimum effective rate",
            "parameter": "Blowdown Rate",
            "from": "4.8%",
            "to": "3.0%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 1300,
        "costAvoided": 25200,
        "netSavings": 23900,
        "successProbability": 77,
        "tradeoff": "Preheater cleaning requires 4-hour outage at next maintenance window."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Air Register Reduction Only",
        "actions": [
          {
            "description": "Reduce air registers by 15% to lower excess air",
            "parameter": "Stack Gas O2",
            "from": "5.8%",
            "to": "4.8%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 14
        },
        "costOfAction": 200,
        "costAvoided": 7200,
        "netSavings": 7000,
        "successProbability": 93,
        "tradeoff": "Still above optimal air level; partial improvement only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 340,
      "avgCostPerIncident": 1600,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 1016000
    },
    "shiftMetrics": {
      "output": "40 t/hr steam",
      "energy": "$29,400",
      "efficiency": "81%"
    }
  },
  {
    "id": "energy-4",
    "industry": "Energy and Utilities",
    "scenarioName": "Compressed Air System Optimization",
    "description": "Compressed air systems are among the most energy-inefficient utilities in industrial plants, typically 10 to 30% of all air produced is lost through leaks, and compressors run against artificially high header pressures set conservatively to ensure adequate pressure at the end-use point. Most plants run 0.5 to 1.0 bar higher than required. Each 0.1 bar reduction saves approximately 0.5% of compression energy. Combined with leak reduction and demand-side management, 20 to 35% energy savings are achievable.",
    "annualCostRange": "$222K–$982K",
    "sensors": [
      {
        "id": "s1",
        "name": "Header Pressure",
        "unit": "bar",
        "normalValue": 7.2,
        "anomalyValue": 7.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Compressor Power",
        "unit": "kW",
        "normalValue": 420,
        "anomalyValue": 485,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "System Pressure Drop",
        "unit": "bar",
        "normalValue": 0.4,
        "anomalyValue": 0.7,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Air Consumption",
        "unit": "Nm3/min",
        "normalValue": 68,
        "anomalyValue": 58,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Leak Rate",
        "unit": "Nm3/hr",
        "normalValue": 45,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Compressor Efficiency",
        "unit": "%",
        "normalValue": 82,
        "anomalyValue": 76,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "System Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 16,
      "criticalThreshold": 24,
      "peakValue": 28
    },
    "predictiveAlert": {
      "title": "Compressed Air System 28% Above Optimal Energy",
      "message": "Compressed air system 28% above optimal energy. Header pressure at 7.8 bar (optimal 7.2 for current demand). Leak rate elevated at 68 Nm3/hr (estimated 12% of production). Compressor efficiency degraded to 76%.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Pressure Setpoint Reduction",
        "actions": [
          {
            "description": "Reduce header pressure setpoint",
            "parameter": "Header Pressure",
            "from": "7.8 bar",
            "to": "7.3 bar"
          },
          {
            "description": "Schedule leak survey for next shift",
            "parameter": "Leak Survey",
            "from": "Not scheduled",
            "to": "Scheduled next shift"
          },
          {
            "description": "Verify adequate pressure at critical use points",
            "parameter": "Critical Point Pressure",
            "from": "Assumed adequate",
            "to": "Verified"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 12
        },
        "costOfAction": 600,
        "costAvoided": 9600,
        "netSavings": 9000,
        "successProbability": 87,
        "tradeoff": "Verify adequate pressure at all critical use points before reducing setpoint."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Pressure Reduction and Leak Repair",
        "actions": [
          {
            "description": "Reduce header pressure to optimal",
            "parameter": "Header Pressure",
            "from": "7.8 bar",
            "to": "7.2 bar"
          },
          {
            "description": "Repair highest-flow leaks identified by ultrasonic survey",
            "parameter": "Leak Rate",
            "from": "68 Nm3/hr",
            "to": "Est. 30 Nm3/hr"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 5
        },
        "costOfAction": 3200,
        "costAvoided": 19200,
        "netSavings": 16000,
        "successProbability": 76,
        "tradeoff": "Leak repairs require 2-day maintenance campaign for highest-priority leaks."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Modest Pressure Reduction Only",
        "actions": [
          {
            "description": "Reduce header pressure by 0.3 bar",
            "parameter": "Header Pressure",
            "from": "7.8 bar",
            "to": "7.5 bar"
          }
        ],
        "riskReduction": {
          "from": 28,
          "to": 20
        },
        "costOfAction": 200,
        "costAvoided": 4800,
        "netSavings": 4600,
        "successProbability": 93,
        "tradeoff": "Partial improvement; leaks not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 120,
      "preventionRate": 0.38,
      "platformCost": 200000,
      "netAnnualSavings": 182800
    },
    "shiftMetrics": {
      "output": "58 Nm3/min compressed air",
      "energy": "$27,400",
      "efficiency": "76%"
    }
  },
  {
    "id": "energy-5",
    "industry": "Energy and Utilities",
    "scenarioName": "Cooling Tower Optimization",
    "description": "Industrial cooling towers reject heat from chillers, compressors, and process equipment. Fan and pump energy in a cooling tower system represents 15 to 25% of facility cooling cost. Most plants operate cooling towers at fixed approach temperatures (the difference between leaving water and ambient wet bulb) that are conservative for current weather conditions, running fans at full speed when reduced speed would meet process requirements with 40 to 70% less fan energy due to fan affinity laws.",
    "annualCostRange": "$135K–$525K",
    "sensors": [
      {
        "id": "s1",
        "name": "Cooling Tower Approach Temp",
        "unit": "°C",
        "normalValue": 3.5,
        "anomalyValue": 5.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Fan Power Total",
        "unit": "kW",
        "normalValue": 180,
        "anomalyValue": 220,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Leaving Water Temp",
        "unit": "°C",
        "normalValue": 28.5,
        "anomalyValue": 31.2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Ambient Wet Bulb",
        "unit": "°C",
        "normalValue": 25,
        "anomalyValue": 25,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Drift Eliminator Efficiency",
        "unit": "%",
        "normalValue": 98,
        "anomalyValue": 95,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Cycles of Concentration",
        "unit": "",
        "normalValue": 4.8,
        "anomalyValue": 3.2,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cooling Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 26,
      "peakValue": 30
    },
    "predictiveAlert": {
      "title": "Cooling Tower 30% Above Optimal Energy",
      "message": "Cooling tower 30% above optimal energy. All fans running at full speed despite 5.8°C approach (optimal 3.5°C possible at current wet bulb). Variable speed drives underutilized. Leaving water 2.7°C above optimal.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Fan Speed Optimization",
        "actions": [
          {
            "description": "Reduce fans to 75% speed using VSD",
            "parameter": "Fan Speed",
            "from": "100%",
            "to": "75%"
          },
          {
            "description": "Stage fan operation based on approach temperature",
            "parameter": "Fan Staging",
            "from": "All fans fixed speed",
            "to": "Approach-temp staged"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 12
        },
        "costOfAction": 400,
        "costAvoided": 4000,
        "netSavings": 3600,
        "successProbability": 88,
        "tradeoff": "Monitor process supply temperatures for 30 minutes after speed reduction."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Tower Optimization",
        "actions": [
          {
            "description": "Fan speed modulation to approach target",
            "parameter": "Fan Speed",
            "from": "100%",
            "to": "Approach-controlled"
          },
          {
            "description": "Optimize cycles of concentration to reduce blowdown cost",
            "parameter": "Cycles of Concentration",
            "from": "3.2",
            "to": "5.5"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 6
        },
        "costOfAction": 600,
        "costAvoided": 5800,
        "netSavings": 5200,
        "successProbability": 77,
        "tradeoff": "Water chemistry requires increased monitoring at higher cycles of concentration."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Single Fan Cell Offline",
        "actions": [
          {
            "description": "Take one fan offline in lowest-load cell",
            "parameter": "Active Fan Cells",
            "from": "All cells running",
            "to": "1 cell offline"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 20
        },
        "costOfAction": 200,
        "costAvoided": 1920,
        "netSavings": 1720,
        "successProbability": 93,
        "tradeoff": "Minimal improvement; remaining fans still at full speed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 85,
      "preventionRate": 0.4,
      "platformCost": 150000,
      "netAnnualSavings": 135600
    },
    "shiftMetrics": {
      "output": "Full cooling capacity",
      "energy": "$12,600",
      "efficiency": "70%"
    }
  },
  {
    "id": "glass-1",
    "industry": "Glass Manufacturing",
    "scenarioName": "Float Glass Furnace Optimization",
    "description": "Float glass furnaces operate continuously at 1,500–1,600°C for 10–15 years without shutdown. Energy is the single largest cost (30–40% of total production cost). The balance between glass temperature, pull rate, tin bath conditions, and annealing lehr settings determines both quality and energy efficiency. Operators run conservative because furnace damage from incorrect settings can cost millions, but conservative operation wastes 8–12% more energy than optimal.",
    "annualCostRange": "$2.24M–$7.1M",
    "sensors": [
      {
        "id": "s1",
        "name": "Melting Zone Temp",
        "unit": "°C",
        "normalValue": 1560,
        "anomalyValue": 1595,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Pull Rate",
        "unit": "tons/day",
        "normalValue": 600,
        "anomalyValue": 580,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Glass Viscosity Index",
        "unit": "",
        "normalValue": 100,
        "anomalyValue": 108,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Tin Bath Temp",
        "unit": "°C",
        "normalValue": 1050,
        "anomalyValue": 1065,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Specific Energy",
        "unit": "GJ/ton",
        "normalValue": 7.2,
        "anomalyValue": 8.1,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Crown Temperature",
        "unit": "°C",
        "normalValue": 1580,
        "anomalyValue": 1610,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 10,
      "criticalThreshold": 15,
      "peakValue": 17
    },
    "predictiveAlert": {
      "title": "Float Line Above Optimal Energy Efficiency",
      "message": "Float line operating 17% above optimal energy efficiency. Melting zone temperature 35°C above necessary for current pull rate. Excess cost: $1,100/hr.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature-Pull Rebalance",
        "actions": [
          {
            "description": "Reduce melting zone temperature",
            "parameter": "Melting Zone Temp",
            "from": "1,595°C",
            "to": "1,575°C"
          },
          {
            "description": "Increase pull rate",
            "parameter": "Pull Rate",
            "from": "580 tons/day",
            "to": "595 tons/day"
          },
          {
            "description": "Adjust annealing lehr profile",
            "parameter": "Annealing Profile",
            "from": "Current",
            "to": "Adjusted"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 6
        },
        "costOfAction": 800,
        "costAvoided": 11700,
        "netSavings": 10900,
        "successProbability": 85,
        "tradeoff": "4-hour transition period; monitor glass quality closely during adjustment."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Furnace Optimization",
        "actions": [
          {
            "description": "Reduce all zones to minimum safe temps",
            "parameter": "All Zone Temps",
            "from": "Current",
            "to": "Min safe"
          },
          {
            "description": "Maximize pull rate",
            "parameter": "Pull Rate",
            "from": "580 tons/day",
            "to": "610 tons/day"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 3
        },
        "costOfAction": 1500,
        "costAvoided": 15300,
        "netSavings": 13800,
        "successProbability": 72,
        "tradeoff": "Higher risk of quality deviation during transition; requires continuous quality monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Crown Temperature Only",
        "actions": [
          {
            "description": "Reduce crown temperature only",
            "parameter": "Crown Temp",
            "from": "1,610°C",
            "to": "1,595°C"
          }
        ],
        "riskReduction": {
          "from": 17,
          "to": 12
        },
        "costOfAction": 300,
        "costAvoided": 5100,
        "netSavings": 4800,
        "successProbability": 94,
        "tradeoff": "Crown responds slowly; limited improvement for effort."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8600,
      "avgCostPerIncident": 820,
      "preventionRate": 0.35,
      "platformCost": 250000,
      "netAnnualSavings": 2240000
    },
    "shiftMetrics": {
      "output": "600 tons",
      "energy": "$52,800",
      "efficiency": "83%"
    }
  },
  {
    "id": "glass-2",
    "industry": "Glass Manufacturing",
    "scenarioName": "Container Glass Defect Reduction",
    "description": "Container glass (bottles, jars) production runs at high speeds (200–400 bottles/minute). Defects (stones, blisters, seeds, dimensional variations) cause rejection at inspection. Typical reject rates are 3–8%, and each rejected container means wasted energy, material, and capacity. The causes are multi-factorial: glass composition, gob temperature, forming machine timing, mold condition, and cooling profile.",
    "annualCostRange": "$1.7M–$4.8M",
    "sensors": [
      {
        "id": "s1",
        "name": "Gob Temperature",
        "unit": "°C",
        "normalValue": 1180,
        "anomalyValue": 1165,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Gob Weight Variation",
        "unit": "%",
        "normalValue": 0.3,
        "anomalyValue": 0.9,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Cycle Time",
        "unit": "s",
        "normalValue": 8.2,
        "anomalyValue": 8.2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Mold Temperature",
        "unit": "°C",
        "normalValue": 450,
        "anomalyValue": 475,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Inspection Reject Rate",
        "unit": "%",
        "normalValue": 3.5,
        "anomalyValue": 7.2,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Line Speed",
        "unit": "bottles/min",
        "normalValue": 320,
        "anomalyValue": 320,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Reject Rate",
      "unit": "%",
      "normalValue": 3.5,
      "warningThreshold": 5,
      "criticalThreshold": 7,
      "peakValue": 7.2
    },
    "predictiveAlert": {
      "title": "Container Reject Rate Double Target",
      "message": "Container reject rate at 7.2%, double the target. Primary contributors: gob temperature drop and mold temperature rise indicating mold wear.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Gob and Mold Correction",
        "actions": [
          {
            "description": "Increase forehearth temperature",
            "parameter": "Forehearth Temp",
            "from": "Current",
            "to": "+12°C"
          },
          {
            "description": "Switch to backup mold set on sections 3-4",
            "parameter": "Mold Set",
            "from": "Worn set",
            "to": "Backup set"
          }
        ],
        "riskReduction": {
          "from": 7.2,
          "to": 3.8
        },
        "costOfAction": 600,
        "costAvoided": 2400,
        "netSavings": 1800,
        "successProbability": 88,
        "tradeoff": "15-min section change; brief line speed reduction."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Line Optimization",
        "actions": [
          {
            "description": "Forehearth temperature adjustment",
            "parameter": "Forehearth Temp",
            "from": "Current",
            "to": "+12°C"
          },
          {
            "description": "Complete mold rotation",
            "parameter": "Mold Rotation",
            "from": "Partial",
            "to": "Full rotation"
          },
          {
            "description": "Reduce line speed temporarily",
            "parameter": "Line Speed",
            "from": "320 bottles/min",
            "to": "290 bottles/min"
          }
        ],
        "riskReduction": {
          "from": 7.2,
          "to": 2.5
        },
        "costOfAction": 1200,
        "costAvoided": 3200,
        "netSavings": 2000,
        "successProbability": 82,
        "tradeoff": "30 minutes of reduced throughput."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Forehearth Temperature Only",
        "actions": [
          {
            "description": "Increase forehearth temperature slightly",
            "parameter": "Forehearth Temp",
            "from": "Current",
            "to": "+8°C"
          }
        ],
        "riskReduction": {
          "from": 7.2,
          "to": 5.5
        },
        "costOfAction": 200,
        "costAvoided": 1200,
        "netSavings": 1000,
        "successProbability": 93,
        "tradeoff": "Does not address mold wear; rejects will climb again without further action."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 480,
      "avgCostPerIncident": 10000,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 1700000
    },
    "shiftMetrics": {
      "output": "138,240 bottles",
      "energy": "$6,800",
      "efficiency": "92.8%"
    }
  },
  {
    "id": "glass-3",
    "industry": "Glass Manufacturing",
    "scenarioName": "Annealing Lehr Optimization",
    "description": "After forming, glass products must be annealed (slowly cooled in a controlled temperature gradient) to relieve internal stresses. The annealing lehr is a long oven with multiple zones that must maintain precise temperature profiles. Running the lehr faster increases throughput but risks residual stress causing breakage downstream. Running slower wastes energy and limits output. Most plants run 8 to 12% slower than achievable, leaving throughput on the table.",
    "annualCostRange": "$345K–$1.43M",
    "sensors": [
      {
        "id": "s1",
        "name": "Lehr Belt Speed",
        "unit": "m/min",
        "normalValue": 5.8,
        "anomalyValue": 4.9,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Zone 1 Temp",
        "unit": "°C",
        "normalValue": 560,
        "anomalyValue": 555,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Zone 3 Temp",
        "unit": "°C",
        "normalValue": 480,
        "anomalyValue": 475,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Zone 5 Temp",
        "unit": "°C",
        "normalValue": 380,
        "anomalyValue": 382,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Residual Stress",
        "unit": "MPa",
        "normalValue": 2.8,
        "anomalyValue": 2.6,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Energy per Ton",
        "unit": "kWh/ton",
        "normalValue": 42,
        "anomalyValue": 52,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Throughput Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Annealing Lehr Running Below Optimal Throughput",
      "message": "Annealing lehr running 22% below optimal throughput. Belt speed conservative at 4.9 m/min. Energy per ton elevated at 52 kWh (target 42 kWh). Residual stress within specification, speed increase is safe.",
      "riskPercent": 72
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Belt Speed Increase",
        "actions": [
          {
            "description": "Increase belt speed",
            "parameter": "Lehr Belt Speed",
            "from": "4.9 m/min",
            "to": "5.4 m/min"
          },
          {
            "description": "Adjust zone temperatures proportionally",
            "parameter": "Zone Temps",
            "from": "Current profile",
            "to": "Speed-adjusted profile"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 8
        },
        "costOfAction": 600,
        "costAvoided": 10400,
        "netSavings": 9800,
        "successProbability": 87,
        "tradeoff": "Monitor residual stress at new speed for 1 hour."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Throughput Optimization",
        "actions": [
          {
            "description": "Increase belt speed to near-optimal",
            "parameter": "Lehr Belt Speed",
            "from": "4.9 m/min",
            "to": "5.7 m/min"
          },
          {
            "description": "Full zone profile recalculation for new speed",
            "parameter": "All Zone Temps",
            "from": "Current",
            "to": "Fully recalculated"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 1200,
        "costAvoided": 16500,
        "netSavings": 15300,
        "successProbability": 75,
        "tradeoff": "Residual stress closer to limit; requires in-line polarimetry monitoring."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Zone 1 Temperature Adjustment",
        "actions": [
          {
            "description": "Optimize Zone 1 entry temperature only",
            "parameter": "Zone 1 Temp",
            "from": "555°C",
            "to": "562°C"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 17
        },
        "costOfAction": 200,
        "costAvoided": 3800,
        "netSavings": 3600,
        "successProbability": 95,
        "tradeoff": "Minimal throughput improvement; speed remains conservative."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 340,
      "avgCostPerIncident": 4200,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 345000
    },
    "shiftMetrics": {
      "output": "94 tons",
      "energy": "$11,200",
      "efficiency": "78%"
    }
  },
  {
    "id": "glass-4",
    "industry": "Glass Manufacturing",
    "scenarioName": "Batch Composition and Cullet Optimization",
    "description": "Glass batch is a mixture of raw materials (silica sand, soda ash, limestone, dolomite) and recycled glass (cullet). Higher cullet ratios reduce melting energy because cullet melts at lower temperatures than raw batch, but cullet quality varies and too much contaminated cullet degrades product quality. Most plants use fixed cullet ratios regardless of real-time cullet quality and energy prices, missing 5 to 10% energy savings opportunities.",
    "annualCostRange": "$1.94M–$5.7M",
    "sensors": [
      {
        "id": "s1",
        "name": "Cullet Ratio",
        "unit": "%",
        "normalValue": 28,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Batch Moisture",
        "unit": "%",
        "normalValue": 2.5,
        "anomalyValue": 4.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Furnace Energy",
        "unit": "GJ/ton",
        "normalValue": 7.4,
        "anomalyValue": 8.3,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Glass Defect Rate",
        "unit": "ppm",
        "normalValue": 12,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Cullet Contamination",
        "unit": "ppm",
        "normalValue": 45,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Batch Homogeneity Index",
        "unit": "",
        "normalValue": 96,
        "anomalyValue": 88,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Efficiency Gap",
      "unit": "%",
      "normalValue": 6,
      "warningThreshold": 13,
      "criticalThreshold": 19,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Batch Energy 22% Above Optimal",
      "message": "Batch energy consumption 22% above optimal. Cullet ratio at 18% vs. 28% optimal due to inventory shortage. Batch moisture elevated at 4.2%, increasing furnace energy demand.",
      "riskPercent": 74
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Moisture Reduction and Cullet Sourcing",
        "actions": [
          {
            "description": "Activate batch dryer to reduce moisture",
            "parameter": "Batch Moisture",
            "from": "4.2%",
            "to": "2.8%"
          },
          {
            "description": "Source additional cullet from certified supplier",
            "parameter": "Cullet Ratio",
            "from": "18%",
            "to": "24% (partial recovery)"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 8
        },
        "costOfAction": 2040,
        "costAvoided": 8000,
        "netSavings": 5960,
        "successProbability": 85,
        "tradeoff": "Batch dryer energy cost of $85/hr included in action cost."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Batch Optimization",
        "actions": [
          {
            "description": "Dry batch to target moisture",
            "parameter": "Batch Moisture",
            "from": "4.2%",
            "to": "2.5%"
          },
          {
            "description": "Maximize available cullet",
            "parameter": "Cullet Ratio",
            "from": "18%",
            "to": "26%"
          },
          {
            "description": "Adjust raw material ratios for new cullet level",
            "parameter": "Batch Composition",
            "from": "Current",
            "to": "Recalibrated"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 5
        },
        "costOfAction": 3200,
        "costAvoided": 11200,
        "netSavings": 8000,
        "successProbability": 75,
        "tradeoff": "Batch house recalibration requires 2-hour transition period."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Batch Dryer Only",
        "actions": [
          {
            "description": "Partial dryer operation to reduce moisture moderately",
            "parameter": "Batch Moisture",
            "from": "4.2%",
            "to": "3.0%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 14
        },
        "costOfAction": 800,
        "costAvoided": 4120,
        "netSavings": 3320,
        "successProbability": 93,
        "tradeoff": "Cullet ratio remains suboptimal; partial improvement only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8400,
      "avgCostPerIncident": 680,
      "preventionRate": 0.38,
      "platformCost": 225000,
      "netAnnualSavings": 1943400
    },
    "shiftMetrics": {
      "output": "580 tons",
      "energy": "$48,400",
      "efficiency": "78%"
    }
  },
  {
    "id": "glass-5",
    "industry": "Glass Manufacturing",
    "scenarioName": "Tin Bath Defect Prevention",
    "description": "In float glass manufacturing, molten glass flows onto a bath of molten tin where it spreads to a uniform thickness. Contamination of the tin bath (oxygen ingress, sulfur deposition, dross formation) creates surface defects on the glass underside that are invisible until downstream inspection. Tin bath issues develop gradually and are difficult to detect early, but early intervention (tin replenishment, nitrogen purge adjustment) can prevent costly quality incidents.",
    "annualCostRange": "$2.56M–$7.68M",
    "sensors": [
      {
        "id": "s1",
        "name": "Tin Bath Oxygen Level",
        "unit": "ppm",
        "normalValue": 2,
        "anomalyValue": 8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Nitrogen Purge Flow",
        "unit": "m3/hr",
        "normalValue": 180,
        "anomalyValue": 155,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Tin Bath Temp at Exit",
        "unit": "°C",
        "normalValue": 600,
        "anomalyValue": 615,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Underside Defect Count",
        "unit": "per 100m2",
        "normalValue": 0.3,
        "anomalyValue": 2.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Ribbon Width Stability",
        "unit": "mm deviation",
        "normalValue": 2,
        "anomalyValue": 6,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Tin Dross Level",
        "unit": "mm",
        "normalValue": 4,
        "anomalyValue": 12,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Defect Rate Index",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 25,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Tin Bath Defect Index at 32%",
      "message": "Tin bath defect index at 32%. Oxygen ingress elevated (8 ppm vs. 2 ppm target) due to nitrogen purge reduction. Glass underside defect count at 2.8/100m2, approaching rejection threshold.",
      "riskPercent": 84
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Nitrogen Purge Restoration",
        "actions": [
          {
            "description": "Increase N2 purge flow rate",
            "parameter": "Nitrogen Purge Flow",
            "from": "155 m3/hr",
            "to": "175 m3/hr"
          },
          {
            "description": "Inspect and seal nitrogen delivery seals",
            "parameter": "N2 Delivery Seals",
            "from": "Degraded",
            "to": "Inspected and sealed"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 10
        },
        "costOfAction": 4800,
        "costAvoided": 57600,
        "netSavings": 52800,
        "successProbability": 86,
        "tradeoff": "2-hour maintenance window required for seal inspection."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Tin Bath Intervention",
        "actions": [
          {
            "description": "Increase N2 purge to design flow",
            "parameter": "Nitrogen Purge Flow",
            "from": "155 m3/hr",
            "to": "180 m3/hr"
          },
          {
            "description": "Skim dross from bath surface",
            "parameter": "Tin Dross Level",
            "from": "12 mm",
            "to": "Skimmed"
          },
          {
            "description": "Add tin supplement to affected zones",
            "parameter": "Tin Supplement",
            "from": "None",
            "to": "Added"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 4
        },
        "costOfAction": 7200,
        "costAvoided": 86400,
        "netSavings": 79200,
        "successProbability": 76,
        "tradeoff": "30-minute bath disturbance; glass quality dip during intervention."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Purge Flow Increase Only",
        "actions": [
          {
            "description": "Increase N2 purge to moderate level",
            "parameter": "Nitrogen Purge Flow",
            "from": "155 m3/hr",
            "to": "165 m3/hr"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 18
        },
        "costOfAction": 2400,
        "costAvoided": 25600,
        "netSavings": 23200,
        "successProbability": 93,
        "tradeoff": "Oxygen level will remain elevated; seal degradation not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 3200,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 2775000
    },
    "shiftMetrics": {
      "output": "600 tons float glass",
      "energy": "$54,000",
      "efficiency": "68%"
    }
  },
  {
    "id": "pulp-1",
    "industry": "Pulp and Paper",
    "scenarioName": "Paper Machine Speed and Quality Optimization",
    "description": "Paper machines are among the most complex continuous process systems in manufacturing. The interaction between stock consistency, headbox pressure, wire speed, pressing, and drying determines both paper quality (basis weight, moisture, caliper, smoothness) and machine speed. Running faster produces more tonnage but risks sheet breaks which cost $5K–$20K each in lost production and cleanup. Most operators run 5–15% below maximum achievable speed as insurance against breaks.",
    "annualCostRange": "$965K–$2.98M",
    "sensors": [
      {
        "id": "s1",
        "name": "Machine Speed",
        "unit": "m/min",
        "normalValue": 850,
        "anomalyValue": 780,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Basis Weight",
        "unit": "g/m²",
        "normalValue": 80,
        "anomalyValue": 81.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Moisture Content",
        "unit": "%",
        "normalValue": 5.5,
        "anomalyValue": 6.8,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Headbox Consistency",
        "unit": "%",
        "normalValue": 0.85,
        "anomalyValue": 0.92,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Dryer Steam Pressure",
        "unit": "bar",
        "normalValue": 3.8,
        "anomalyValue": 3.4,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Sheet Breaks (24hr)",
        "unit": "",
        "normalValue": 1,
        "anomalyValue": 4,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Speed Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 10,
      "criticalThreshold": 15,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Paper Machine Running Below Optimal Speed",
      "message": "Paper machine running 18% below optimal speed. 4 sheet breaks in last 24 hours have caused operator to reduce speed conservatively. Current moisture trending high due to low dryer steam.",
      "riskPercent": 71
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Dryer-Speed Recovery",
        "actions": [
          {
            "description": "Increase dryer steam pressure",
            "parameter": "Steam Pressure",
            "from": "3.4 bar",
            "to": "3.7 bar"
          },
          {
            "description": "Reduce headbox consistency",
            "parameter": "Headbox Consistency",
            "from": "0.92%",
            "to": "0.87%"
          },
          {
            "description": "Increase machine speed",
            "parameter": "Machine Speed",
            "from": "780 m/min",
            "to": "820 m/min"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 8
        },
        "costOfAction": 400,
        "costAvoided": 7200,
        "netSavings": 6800,
        "successProbability": 86,
        "tradeoff": "Monitor moisture at new speed for 30 minutes before further increase."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Optimization",
        "actions": [
          {
            "description": "Steam to design pressure",
            "parameter": "Steam Pressure",
            "from": "3.4 bar",
            "to": "3.9 bar"
          },
          {
            "description": "Optimize consistency and retention aid",
            "parameter": "Headbox Consistency",
            "from": "0.92%",
            "to": "0.85%"
          },
          {
            "description": "Increase speed toward maximum",
            "parameter": "Machine Speed",
            "from": "780 m/min",
            "to": "845 m/min"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 3
        },
        "costOfAction": 800,
        "costAvoided": 13200,
        "netSavings": 12400,
        "successProbability": 73,
        "tradeoff": "Higher break risk (est. 5% probability vs. 2% baseline)."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Dryer Pressure Only",
        "actions": [
          {
            "description": "Increase dryer steam, hold current speed",
            "parameter": "Steam Pressure",
            "from": "3.4 bar",
            "to": "3.6 bar"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 18
        },
        "costOfAction": 200,
        "costAvoided": 1800,
        "netSavings": 1600,
        "successProbability": 97,
        "tradeoff": "No speed recovery; reduces moisture-related downgrades only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 350,
      "avgCostPerIncident": 8500,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 965000
    },
    "shiftMetrics": {
      "output": "156 tons",
      "energy": "$18,400",
      "efficiency": "82%"
    }
  },
  {
    "id": "pulp-2",
    "industry": "Pulp and Paper",
    "scenarioName": "Pulp Digester Optimization",
    "description": "Kraft pulp digesters cook wood chips with chemicals (white liquor) at high temperature and pressure to separate cellulose fibers. The cook profile (temperature ramp, chemical charge, hold time) determines both pulp yield and quality (Kappa number). Over-cooking reduces yield, under-cooking produces stiff pulp requiring more bleaching. Most operators target conservative cook profiles that sacrifice 2–4% yield for quality safety margin.",
    "annualCostRange": "$1.27M–$3.3M",
    "sensors": [
      {
        "id": "s1",
        "name": "Digester Temperature",
        "unit": "°C",
        "normalValue": 168,
        "anomalyValue": 174,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "H-Factor",
        "unit": "",
        "normalValue": 1600,
        "anomalyValue": 1820,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Kappa Number",
        "unit": "",
        "normalValue": 28,
        "anomalyValue": 24,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Pulp Yield",
        "unit": "%",
        "normalValue": 46,
        "anomalyValue": 43.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Chemical Charge",
        "unit": "% on wood",
        "normalValue": 18,
        "anomalyValue": 20,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Blow Consistency",
        "unit": "%",
        "normalValue": 14,
        "anomalyValue": 12.5,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Yield Loss",
      "unit": "%",
      "normalValue": 1,
      "warningThreshold": 3,
      "criticalThreshold": 5,
      "peakValue": 5.5
    },
    "predictiveAlert": {
      "title": "Digester Over-Cooking Detected",
      "message": "Digester over-cooking. Kappa number 24 (target 28) indicating excess delignification. Pulp yield at 43.5% vs. 46% target. Estimated fiber loss: 12 tons this batch ($4,800).",
      "riskPercent": 80
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Early Blow + Chemical Adjustment",
        "actions": [
          {
            "description": "Initiate blow sequence now; H-factor sufficient",
            "parameter": "Blow Sequence",
            "from": "Holding",
            "to": "Blow now"
          },
          {
            "description": "Reduce chemical charge for next batch",
            "parameter": "Chemical Charge",
            "from": "20%",
            "to": "18.5%"
          },
          {
            "description": "Lower target temperature for next batch",
            "parameter": "Target Temp",
            "from": "174°C",
            "to": "170°C"
          }
        ],
        "riskReduction": {
          "from": 5.5,
          "to": 1.5
        },
        "costOfAction": 300,
        "costAvoided": 3600,
        "netSavings": 3300,
        "successProbability": 89,
        "tradeoff": "Kappa will be 27 (still within spec, but closer to limit)."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Cook Profile Optimization",
        "actions": [
          {
            "description": "Blow now, recalculate entire cook curve",
            "parameter": "Cook Profile",
            "from": "Standard",
            "to": "Chip-quality optimized"
          },
          {
            "description": "Target yield improvement",
            "parameter": "Yield Target",
            "from": "43.5%",
            "to": "46.5%"
          }
        ],
        "riskReduction": {
          "from": 5.5,
          "to": 0.5
        },
        "costOfAction": 800,
        "costAvoided": 4400,
        "netSavings": 3600,
        "successProbability": 77,
        "tradeoff": "Requires chip quality testing and 30-min profile recalculation."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Chemical Reduction Only",
        "actions": [
          {
            "description": "Reduce chemical charge for next batch only",
            "parameter": "Chemical Charge",
            "from": "20%",
            "to": "19%"
          }
        ],
        "riskReduction": {
          "from": 5.5,
          "to": 4
        },
        "costOfAction": 100,
        "costAvoided": 1600,
        "netSavings": 1500,
        "successProbability": 95,
        "tradeoff": "Modest improvement; does not address temperature profile."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1100,
      "avgCostPerIncident": 3000,
      "preventionRate": 0.45,
      "platformCost": 225000,
      "netAnnualSavings": 1270000
    },
    "shiftMetrics": {
      "output": "43.5% yield",
      "energy": "$14,200",
      "efficiency": "78%"
    }
  },
  {
    "id": "pulp-3",
    "industry": "Pulp and Paper",
    "scenarioName": "Bleaching Sequence Optimization",
    "description": "Kraft pulp bleaching uses a sequence of chemical stages (chlorine dioxide, peroxide, ozone, caustic) to reach target brightness. Each stage consumes expensive chemicals and generates effluent that must be treated. Operators target conservative brightness (often 2 to 4 ISO units above customer specification) as a safety margin, consuming 15 to 25% more chemicals than necessary. Chemical costs alone represent $50 to $150 per ton of pulp produced.",
    "annualCostRange": "$1.06M–$3.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Pulp Brightness",
        "unit": "ISO",
        "normalValue": 88,
        "anomalyValue": 91,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Chlorine Dioxide Dose",
        "unit": "kg/ton",
        "normalValue": 18,
        "anomalyValue": 24,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Peroxide Dose",
        "unit": "kg/ton",
        "normalValue": 8,
        "anomalyValue": 11,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Kappa Before Bleach",
        "unit": "",
        "normalValue": 14,
        "anomalyValue": 14,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Chemical Cost per Ton",
        "unit": "$",
        "normalValue": 68,
        "anomalyValue": 89,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Effluent Color",
        "unit": "Pt-Co",
        "normalValue": 280,
        "anomalyValue": 410,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Chemical Overuse Index",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Bleaching Chemical Consumption 32% Above Optimal",
      "message": "Bleaching chemical consumption 32% above optimal. Pulp brightness at 91 ISO vs. 88 target, over-bleaching by 3 units. Excess chemical cost: $21/ton. Effluent load also elevated.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Dose Reduction to Target Brightness",
        "actions": [
          {
            "description": "Reduce chlorine dioxide dose",
            "parameter": "ClO2 Dose",
            "from": "24 kg/ton",
            "to": "19.5 kg/ton"
          },
          {
            "description": "Reduce peroxide dose",
            "parameter": "Peroxide Dose",
            "from": "11 kg/ton",
            "to": "8.5 kg/ton"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 9
        },
        "costOfAction": 1800,
        "costAvoided": 5800,
        "netSavings": 4000,
        "successProbability": 87,
        "tradeoff": "Tighter brightness margin; monitor for 2 batches at new dose."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Sequence Optimization",
        "actions": [
          {
            "description": "Recalculate entire bleach sequence for current kappa",
            "parameter": "Bleach Sequence",
            "from": "Conservative",
            "to": "Kappa-optimized"
          },
          {
            "description": "Reduce ClO2 to sequence minimum",
            "parameter": "ClO2 Dose",
            "from": "24 kg/ton",
            "to": "18.5 kg/ton"
          },
          {
            "description": "Reduce peroxide to sequence minimum",
            "parameter": "Peroxide Dose",
            "from": "11 kg/ton",
            "to": "8.0 kg/ton"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 4
        },
        "costOfAction": 2400,
        "costAvoided": 7800,
        "netSavings": 5400,
        "successProbability": 76,
        "tradeoff": "Requires lab validation of new sequence before production application."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "ClO2 Reduction Only",
        "actions": [
          {
            "description": "Reduce chlorine dioxide dose modestly",
            "parameter": "ClO2 Dose",
            "from": "24 kg/ton",
            "to": "21 kg/ton"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 20
        },
        "costOfAction": 800,
        "costAvoided": 2800,
        "netSavings": 2000,
        "successProbability": 94,
        "tradeoff": "Still over-bleaching; peroxide dose not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 200000,
      "avgCostPerIncident": 16,
      "preventionRate": 0.4,
      "platformCost": 225000,
      "netAnnualSavings": 1055000
    },
    "shiftMetrics": {
      "output": "580 tons pulp",
      "energy": "$21,400",
      "efficiency": "80%"
    }
  },
  {
    "id": "pulp-4",
    "industry": "Pulp and Paper",
    "scenarioName": "Evaporator Energy Optimization",
    "description": "Black liquor evaporators concentrate the spent cooking chemicals from the pulp digester before burning in the recovery boiler. Multiple-effect evaporators are the largest steam consumers in the pulp mill after the digester. Operating with fouled heating surfaces, suboptimal liquor distribution, or incorrect steam side temperatures wastes 15 to 25% more steam than necessary. Each GJ of steam waste costs $12 to $18 in fuel.",
    "annualCostRange": "$994K–$2.98M",
    "sensors": [
      {
        "id": "s1",
        "name": "Black Liquor Concentration",
        "unit": "% DS",
        "normalValue": 68,
        "anomalyValue": 62,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Steam Consumption",
        "unit": "GJ/ton water evap.",
        "normalValue": 0.42,
        "anomalyValue": 0.54,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Evaporator Capacity",
        "unit": "%",
        "normalValue": 92,
        "anomalyValue": 78,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Liquor Temperature",
        "unit": "°C",
        "normalValue": 135,
        "anomalyValue": 128,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Fouling Resistance",
        "unit": "",
        "normalValue": 0.0003,
        "anomalyValue": 0.0009,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Dry Solids Flow",
        "unit": "t/hr",
        "normalValue": 85,
        "anomalyValue": 85,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Evaporator Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 26,
      "peakValue": 30
    },
    "predictiveAlert": {
      "title": "Evaporator Efficiency 30% Below Target",
      "message": "Evaporator efficiency 30% below target. Steam consumption elevated at 0.54 GJ/ton (target 0.42). Fouling resistance (0.0009) indicating significant heat transfer degradation. Concentration at 62% DS vs. 68% target.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Wash Cycle and Load Balancing",
        "actions": [
          {
            "description": "Schedule 4-hour evaporator wash during upcoming maintenance window",
            "parameter": "Evaporator Wash",
            "from": "Deferred",
            "to": "Scheduled next window"
          },
          {
            "description": "Redistribute liquor load across effects for interim improvement",
            "parameter": "Liquor Distribution",
            "from": "Current",
            "to": "Rebalanced"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 18
        },
        "costOfAction": 3600,
        "costAvoided": 21600,
        "netSavings": 18000,
        "successProbability": 86,
        "tradeoff": "4-hour reduced capacity during maintenance wash."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Immediate Partial Cleaning",
        "actions": [
          {
            "description": "Take effects 3-4 offline for wash cycle",
            "parameter": "Effects 3-4",
            "from": "Online (fouled)",
            "to": "Offline for 6-hr wash"
          },
          {
            "description": "Restore full system after cleaning",
            "parameter": "System Efficiency",
            "from": "70% of target",
            "to": "Near-full restored"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 8
        },
        "costOfAction": 6400,
        "costAvoided": 38400,
        "netSavings": 32000,
        "successProbability": 76,
        "tradeoff": "6-hour production constraint during partial cleaning."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Steam Pressure Optimization",
        "actions": [
          {
            "description": "Adjust steam header pressure to optimize temperature driving forces",
            "parameter": "Steam Pressure",
            "from": "Current",
            "to": "Optimized"
          }
        ],
        "riskReduction": {
          "from": 30,
          "to": 24
        },
        "costOfAction": 800,
        "costAvoided": 8800,
        "netSavings": 8000,
        "successProbability": 93,
        "tradeoff": "Does not address fouling root cause; limited improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 350,
      "avgCostPerIncident": 2400,
      "preventionRate": 0.38,
      "platformCost": 225000,
      "netAnnualSavings": 994800
    },
    "shiftMetrics": {
      "output": "85 t/hr DS flow",
      "energy": "$28,800",
      "efficiency": "78%"
    }
  },
  {
    "id": "pulp-5",
    "industry": "Pulp and Paper",
    "scenarioName": "Recovery Boiler Combustion Optimization",
    "description": "The recovery boiler burns black liquor to recover cooking chemicals and generate steam. It is the most critical piece of equipment in a kraft mill, shutdowns cost $1 to $5M per day. Combustion optimization (air distribution, liquor solids content, spray gun performance) affects both steam generation efficiency and smelt chemistry. Most mills run excess air 20 to 30% above stoichiometric minimum to ensure complete combustion, wasting fuel heating that excess air.",
    "annualCostRange": "$1.39M–$4.16M",
    "sensors": [
      {
        "id": "s1",
        "name": "Excess Air",
        "unit": "%",
        "normalValue": 18,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Steam Production",
        "unit": "t/hr",
        "normalValue": 185,
        "anomalyValue": 172,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Black Liquor Solids",
        "unit": "%",
        "normalValue": 68,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Flue Gas O2",
        "unit": "%",
        "normalValue": 3.2,
        "anomalyValue": 5.1,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Furnace Temperature",
        "unit": "°C",
        "normalValue": 1020,
        "anomalyValue": 985,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Carryover",
        "unit": "mg/Nm3",
        "normalValue": 850,
        "anomalyValue": 1240,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Combustion Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Recovery Boiler Combustion Efficiency 22% Below Optimal",
      "message": "Recovery boiler combustion efficiency 22% below optimal. Excess air at 28% causing heat loss in flue gas. Steam production 13 t/hr below capacity. Elevated carryover suggests poor combustion distribution.",
      "riskPercent": 76
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Air Register Optimization",
        "actions": [
          {
            "description": "Reduce excess air via primary/secondary air register adjustment",
            "parameter": "Excess Air",
            "from": "28%",
            "to": "20%"
          },
          {
            "description": "Monitor carryover closely after adjustment",
            "parameter": "Carryover Monitoring",
            "from": "Periodic",
            "to": "Continuous 2-hr"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 9
        },
        "costOfAction": 1200,
        "costAvoided": 22400,
        "netSavings": 21200,
        "successProbability": 86,
        "tradeoff": "Monitor carryover closely for 2 hours after adjustment."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Air Distribution Optimization",
        "actions": [
          {
            "description": "Reduce excess air to minimum safe level",
            "parameter": "Excess Air",
            "from": "28%",
            "to": "18%"
          },
          {
            "description": "Optimize air port distribution across furnace",
            "parameter": "Air Port Distribution",
            "from": "Current",
            "to": "Optimized"
          },
          {
            "description": "Clean 2 spray guns with deposits",
            "parameter": "Spray Gun Condition",
            "from": "Deposits on 2 guns",
            "to": "Cleaned"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 4
        },
        "costOfAction": 4800,
        "costAvoided": 36400,
        "netSavings": 31600,
        "successProbability": 76,
        "tradeoff": "Spray gun cleaning requires 2-hour maintenance window per gun."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "O2 Trim Adjustment Only",
        "actions": [
          {
            "description": "Reduce target flue gas O2 by 0.5%",
            "parameter": "Flue Gas O2 Target",
            "from": "5.1%",
            "to": "4.6%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 16
        },
        "costOfAction": 400,
        "costAvoided": 9200,
        "netSavings": 8800,
        "successProbability": 93,
        "tradeoff": "Excess air still elevated; limited improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 340,
      "avgCostPerIncident": 2800,
      "preventionRate": 0.38,
      "platformCost": 225000,
      "netAnnualSavings": 1387000
    },
    "shiftMetrics": {
      "output": "172 t/hr steam",
      "energy": "$32,400",
      "efficiency": "79%"
    }
  },
  {
    "id": "textile-1",
    "industry": "Textile Manufacturing",
    "scenarioName": "Dyeing Process Optimization",
    "description": "Dye bath conditions have drifted, causing poor dye exhaustion and color match failures. pH over-correction and temperature variation are driving rework and batch rejections.",
    "annualCostRange": "$500K - $1.2M",
    "sensors": [
      {
        "id": "s1",
        "name": "Dye Bath Temp",
        "unit": "°C",
        "normalValue": 95,
        "anomalyValue": 98,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Dye Bath pH",
        "unit": "",
        "normalValue": 11,
        "anomalyValue": 11.6,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Dye Concentration Remaining",
        "unit": "%",
        "normalValue": 8,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Color Match Delta-E",
        "unit": "",
        "normalValue": 0.6,
        "anomalyValue": 1.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Water Use",
        "unit": "L/kg fabric",
        "normalValue": 80,
        "anomalyValue": 120,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Batch RFT Rate",
        "unit": "%",
        "normalValue": 90,
        "anomalyValue": 78,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Dyeing Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Dyeing Efficiency 32% Below Optimal",
      "message": "Dye exhaustion poor (18% remaining vs. 8% target). pH over-corrected. Current batch likely to fail color match; delta-E at 1.8 vs. 1.0 max.",
      "riskPercent": 32
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "pH and Time Correction",
        "actions": [
          {
            "description": "Reduce pH to 11.2",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Extend hold 15 min at 95°C",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 10
        },
        "costOfAction": 50,
        "costAvoided": 850,
        "netSavings": 800,
        "successProbability": 88,
        "tradeoff": "15 min longer cycle."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Recipe Optimization",
        "actions": [
          {
            "description": "pH correction",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce dye charge 8%",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize temp profile",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 5
        },
        "costOfAction": 100,
        "costAvoided": 1030,
        "netSavings": 930,
        "successProbability": 76,
        "tradeoff": "Requires recipe modification approval."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Hold Only",
        "actions": [
          {
            "description": "Hold at 95°C for 10 more min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 22
        },
        "costOfAction": 20,
        "costAvoided": 300,
        "netSavings": 280,
        "successProbability": 96,
        "tradeoff": "May still fail color spec."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 3600,
      "avgCostPerIncident": 620,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 692000
    },
    "shiftMetrics": {
      "output": "8 batches",
      "energy": "$280",
      "efficiency": "78%"
    }
  },
  {
    "id": "textile-2",
    "industry": "Textile Manufacturing",
    "scenarioName": "Weaving Speed and Quality Optimization",
    "description": "Elevated warp break rates and tension issues are forcing speed reductions without addressing root cause, reducing loom efficiency and increasing defect rates.",
    "annualCostRange": "$3M - $7M",
    "sensors": [
      {
        "id": "s1",
        "name": "Loom Speed",
        "unit": "picks/min",
        "normalValue": 800,
        "anomalyValue": 650,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Warp Break Rate",
        "unit": "breaks/Mpicks",
        "normalValue": 0.8,
        "anomalyValue": 2.5,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Filling Stop Rate",
        "unit": "stops/100 picks",
        "normalValue": 0.3,
        "anomalyValue": 0.9,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Fabric Defect Rate",
        "unit": "/100m",
        "normalValue": 1.2,
        "anomalyValue": 3.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Loom Efficiency",
        "unit": "%",
        "normalValue": 92,
        "anomalyValue": 78,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Warp Tension",
        "unit": "N",
        "normalValue": 280,
        "anomalyValue": 320,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Loom Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Loom Efficiency 22% Below Optimal",
      "message": "Warp break rate 3x normal. Warp tension elevated for current yarn lot. Speed reduction not solving root cause.",
      "riskPercent": 22
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Tension Correction",
        "actions": [
          {
            "description": "Reduce warp tension to 290 N",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Increase shed timing 2°",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Speed recovers to 780 picks/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 7
        },
        "costOfAction": 200,
        "costAvoided": 680,
        "netSavings": 480,
        "successProbability": 88,
        "tradeoff": "5-min adjustment; monitor 500 picks."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Loom Optimization",
        "actions": [
          {
            "description": "Tension correction",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize filling insertion timing",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Adjust beat-up force",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Speed to 800 picks/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 500,
        "costAvoided": 840,
        "netSavings": 340,
        "successProbability": 76,
        "tradeoff": "Multiple adjustments; 15-min optimization period."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Speed Increase Only",
        "actions": [
          {
            "description": "Increase to 700 picks/min without tension fix",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 15
        },
        "costOfAction": 100,
        "costAvoided": 280,
        "netSavings": 180,
        "successProbability": 96,
        "tradeoff": "Break rate stays elevated."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 40000,
      "avgCostPerIncident": 260,
      "preventionRate": 0.525,
      "platformCost": 275000,
      "netAnnualSavings": 5185000
    },
    "shiftMetrics": {
      "output": "4,800 m fabric",
      "energy": "$620",
      "efficiency": "78%"
    }
  },
  {
    "id": "textile-3",
    "industry": "Textile Manufacturing",
    "scenarioName": "Drying and Stentering Energy Optimization",
    "description": "The stenter is operating with unchanged settings despite drier incoming fabric, causing over-drying and excess energy consumption at a cost of $42/hr above optimal.",
    "annualCostRange": "$150K - $400K",
    "sensors": [
      {
        "id": "s1",
        "name": "Chamber Temp",
        "unit": "°C",
        "normalValue": 165,
        "anomalyValue": 185,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Fabric Inlet Moisture",
        "unit": "%",
        "normalValue": 55,
        "anomalyValue": 42,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Fabric Outlet Moisture",
        "unit": "%",
        "normalValue": 4,
        "anomalyValue": 2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Line Speed",
        "unit": "m/min",
        "normalValue": 35,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Gas Consumption",
        "unit": "m3/hr",
        "normalValue": 85,
        "anomalyValue": 110,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Energy per kg",
        "unit": "MJ/kg",
        "normalValue": 4.5,
        "anomalyValue": 6.2,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Drying Energy Waste",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 35
    },
    "predictiveAlert": {
      "title": "Stenter Consuming 35% Above Optimal Energy",
      "message": "Fabric entering drier than usual (42% vs. 55% moisture) but settings unchanged. Over-drying to 2% moisture (4% target). Excess energy cost: $42/hr.",
      "riskPercent": 35
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Moisture-Responsive Speed Increase",
        "actions": [
          {
            "description": "Increase line to 33 m/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce chamber to 170°C",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 12
        },
        "costOfAction": 100,
        "costAvoided": 256,
        "netSavings": 156,
        "successProbability": 88,
        "tradeoff": "Verify fabric hand feel at new settings."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Stenter Optimization",
        "actions": [
          {
            "description": "Speed to 35 m/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Temp to 165°C",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize exhaust fan",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 5
        },
        "costOfAction": 200,
        "costAvoided": 304,
        "netSavings": 104,
        "successProbability": 76,
        "tradeoff": "May need to adjust downstream rolling tension."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Reduction Only",
        "actions": [
          {
            "description": "Reduce to 175°C",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 22
        },
        "costOfAction": 50,
        "costAvoided": 112,
        "netSavings": 62,
        "successProbability": 96,
        "tradeoff": "Modest improvement; does not capture throughput gain."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 5000,
      "avgCostPerIncident": 172,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 255000
    },
    "shiftMetrics": {
      "output": "1,680 m fabric",
      "energy": "$280",
      "efficiency": "65%"
    }
  },
  {
    "id": "textile-4",
    "industry": "Textile Manufacturing",
    "scenarioName": "Water Consumption and Effluent Optimization",
    "description": "Excessive rinse cycles and elevated rinse temperatures are driving water consumption 48% above optimal, adding $90/batch in water and effluent costs.",
    "annualCostRange": "$200K - $500K",
    "sensors": [
      {
        "id": "s1",
        "name": "Water Consumption",
        "unit": "L/kg",
        "normalValue": 100,
        "anomalyValue": 155,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Rinse Temp",
        "unit": "°C",
        "normalValue": 60,
        "anomalyValue": 75,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Rinse Conductivity",
        "unit": "µS/cm",
        "normalValue": 500,
        "anomalyValue": 280,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Rinse Cycles",
        "unit": "",
        "normalValue": 4,
        "anomalyValue": 7,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Effluent COD",
        "unit": "mg/L",
        "normalValue": 800,
        "anomalyValue": 1200,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Water Cost per Batch",
        "unit": "$",
        "normalValue": 120,
        "anomalyValue": 210,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Water Waste Index",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 25,
      "criticalThreshold": 40,
      "peakValue": 48
    },
    "predictiveAlert": {
      "title": "Water Consumption 48% Above Optimal",
      "message": "7 rinse cycles used (4 sufficient based on conductivity). Rinse water temperature excessive. Water and effluent cost: $90/batch above optimal.",
      "riskPercent": 48
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Conductivity-Based Rinsing",
        "actions": [
          {
            "description": "Switch to conductivity-controlled rinse endpoints (stop below 500 µS/cm)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduces to 4 rinses",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 48,
          "to": 14
        },
        "costOfAction": 20,
        "costAvoided": 68,
        "netSavings": 48,
        "successProbability": 94,
        "tradeoff": "No quality impact; excess rinsing adds no value."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Water Optimization",
        "actions": [
          {
            "description": "Conductivity endpoint rinse",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Counter-current flow reuse",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce rinse temp to 55°C",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 48,
          "to": 8
        },
        "costOfAction": 50,
        "costAvoided": 82,
        "netSavings": 32,
        "successProbability": 82,
        "tradeoff": "Requires plumbing modification for counter-current flow."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Reduce Rinse Count by 2",
        "actions": [
          {
            "description": "Drop from 7 to 5 rinses",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 48,
          "to": 28
        },
        "costOfAction": 10,
        "costAvoided": 35,
        "netSavings": 25,
        "successProbability": 96,
        "tradeoff": "Still over-rinsing slightly."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 3600,
      "avgCostPerIncident": 244,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 264000
    },
    "shiftMetrics": {
      "output": "12 batches",
      "energy": "$320",
      "efficiency": "68%"
    }
  },
  {
    "id": "textile-5",
    "industry": "Textile Manufacturing",
    "scenarioName": "Production Batch Scheduling Optimization",
    "description": "Suboptimal color sequencing is creating 6 dark-to-light transitions daily, leaving 3 machines idle during changeovers and generating $2,400/day in excess changeover costs.",
    "annualCostRange": "$250K - $600K",
    "sensors": [
      {
        "id": "s1",
        "name": "Machines In Use",
        "unit": "of 8",
        "normalValue": 7,
        "anomalyValue": 5,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Avg Changeover Time",
        "unit": "min",
        "normalValue": 35,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Dark-to-Light Transitions",
        "unit": "",
        "normalValue": 2,
        "anomalyValue": 6,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Machine Utilization",
        "unit": "%",
        "normalValue": 88,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Orders Overdue",
        "unit": "",
        "normalValue": 3,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Changeover Cost",
        "unit": "$",
        "normalValue": 1400,
        "anomalyValue": 3800,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Schedule Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Production Schedule 32% Suboptimal",
      "message": "6 dark-to-light transitions today (vs. 2 optimal). 3 machines idle waiting for changeover. 12 orders overdue. Excess changeover cost: $2,400/day.",
      "riskPercent": 32
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Color Sequence Reoptimization",
        "actions": [
          {
            "description": "Resequence remaining orders by color family",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 10
        },
        "costOfAction": 200,
        "costAvoided": 1600,
        "netSavings": 1400,
        "successProbability": 87,
        "tradeoff": "Some orders shift by 4 to 8 hours."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Week Reoptimization",
        "actions": [
          {
            "description": "Resequence all orders for remainder of week across 8 machines",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 4
        },
        "costOfAction": 500,
        "costAvoided": 8200,
        "netSavings": 7700,
        "successProbability": 74,
        "tradeoff": "Customer communication needed for shifted delivery dates."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Consolidate Dark Colors",
        "actions": [
          {
            "description": "Group dark batches on 2 dedicated machines",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 22
        },
        "costOfAction": 100,
        "costAvoided": 600,
        "netSavings": 500,
        "successProbability": 96,
        "tradeoff": "Underutilizes some machines; does not optimize light sequence."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 300,
      "avgCostPerIncident": 3600,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 365000
    },
    "shiftMetrics": {
      "output": "6 batches completed",
      "energy": "$480",
      "efficiency": "68%"
    }
  },
  {
    "id": "plastics-1",
    "industry": "Plastics and Rubber Manufacturing",
    "scenarioName": "Injection Molding Cycle Time Optimization",
    "description": "Cooling time is extended well beyond what part temperature requires. Parts are ejecting at 78°C, far below the 95°C maximum allowable, indicating the mold cooling circuit is underperforming and costing 180 parts/hr.",
    "annualCostRange": "$600K - $900K",
    "sensors": [
      {
        "id": "s1",
        "name": "Cycle Time",
        "unit": "sec",
        "normalValue": 28,
        "anomalyValue": 34,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Cooling Time",
        "unit": "sec",
        "normalValue": 18,
        "anomalyValue": 23,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Melt Temp",
        "unit": "°C",
        "normalValue": 230,
        "anomalyValue": 235,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Mold Temp",
        "unit": "°C",
        "normalValue": 45,
        "anomalyValue": 52,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Ejection Temp",
        "unit": "°C",
        "normalValue": 85,
        "anomalyValue": 78,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Scrap Rate",
        "unit": "%",
        "normalValue": 1.5,
        "anomalyValue": 3.2,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cycle Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Injection Molding 22% Above Optimal Cycle Time",
      "message": "Cooling time extended beyond necessary. Parts ejecting at 78°C (well below 95°C maximum). Lost production: 180 parts/hr at $540/hr.",
      "riskPercent": 83
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Cooling Optimization",
        "actions": [
          {
            "description": "Reduce cooling time to target",
            "parameter": "Cooling Time",
            "from": "23 sec",
            "to": "19 sec"
          },
          {
            "description": "Clean mold cooling circuit 3 to restore flow",
            "parameter": "Cooling Circuit 3 Flow",
            "from": "Restricted",
            "to": "Nominal"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 7
        },
        "costOfAction": 200,
        "costAvoided": 450,
        "netSavings": 250,
        "successProbability": 88,
        "tradeoff": "Monitor first 50 parts for dimensional stability."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Cycle Optimization",
        "actions": [
          {
            "description": "Reduce cooling time to minimum safe value",
            "parameter": "Cooling Time",
            "from": "23 sec",
            "to": "18 sec"
          },
          {
            "description": "Increase injection speed",
            "parameter": "Injection Speed",
            "from": "Current",
            "to": "+5%"
          },
          {
            "description": "Reduce packing hold time",
            "parameter": "Packing Hold",
            "from": "Current",
            "to": "-0.5 sec"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 500,
        "costAvoided": 540,
        "netSavings": 40,
        "successProbability": 74,
        "tradeoff": "Tighter quality window; dimensional check every 30 min."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Mold Temp Only",
        "actions": [
          {
            "description": "Reduce mold temperature setpoint",
            "parameter": "Mold Temp",
            "from": "52°C",
            "to": "48°C"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 15
        },
        "costOfAction": 50,
        "costAvoided": 180,
        "netSavings": 130,
        "successProbability": 96,
        "tradeoff": "Slow improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 6000,
      "avgCostPerIncident": 380,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 712000
    },
    "shiftMetrics": {
      "output": "6,400 parts",
      "energy": "$820",
      "efficiency": "78%"
    }
  },
  {
    "id": "plastics-2",
    "industry": "Plastics and Rubber Manufacturing",
    "scenarioName": "Extruder Throughput and Quality Optimization",
    "description": "A new material lot with higher viscosity has elevated melt pressure and forced a speed reduction. Barrel temperatures were not compensated, leaving the line 22% below optimal output and losing 65 kg/hr.",
    "annualCostRange": "$500K - $800K",
    "sensors": [
      {
        "id": "s1",
        "name": "Screw Speed",
        "unit": "rpm",
        "normalValue": 85,
        "anomalyValue": 70,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Melt Pressure",
        "unit": "bar",
        "normalValue": 180,
        "anomalyValue": 215,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Melt Temp",
        "unit": "°C",
        "normalValue": 210,
        "anomalyValue": 218,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Line Speed",
        "unit": "m/min",
        "normalValue": 12,
        "anomalyValue": 9.5,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Wall Thickness Variation",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 4.5,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Output Rate",
        "unit": "kg/hr",
        "normalValue": 320,
        "anomalyValue": 255,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Throughput Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Extruder 22% Below Optimal Output",
      "message": "Melt pressure elevated due to new material lot with higher viscosity. Speed reduced but barrel temperatures not compensated. Lost output: 65 kg/hr at $195/hr.",
      "riskPercent": 80
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature-Speed Rebalance",
        "actions": [
          {
            "description": "Increase barrel zone 3 temperature",
            "parameter": "Barrel Zone 3 Temp",
            "from": "Current",
            "to": "+5°C"
          },
          {
            "description": "Increase barrel zone 4 temperature",
            "parameter": "Barrel Zone 4 Temp",
            "from": "Current",
            "to": "+3°C"
          },
          {
            "description": "Raise screw speed to intermediate target",
            "parameter": "Screw Speed",
            "from": "70 rpm",
            "to": "80 rpm"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 7
        },
        "costOfAction": 100,
        "costAvoided": 135,
        "netSavings": 35,
        "successProbability": 88,
        "tradeoff": "Monitor melt quality for 15 minutes."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Profile Optimization",
        "actions": [
          {
            "description": "Apply full temperature profile adjustment across all barrel zones",
            "parameter": "Barrel Temperature Profile",
            "from": "Current",
            "to": "Viscosity-Compensated"
          },
          {
            "description": "Ramp screw speed to design rate",
            "parameter": "Screw Speed",
            "from": "70 rpm",
            "to": "85 rpm"
          },
          {
            "description": "Adjust die lip gap",
            "parameter": "Die Lip Gap",
            "from": "Current",
            "to": "+0.1 mm"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 3
        },
        "costOfAction": 300,
        "costAvoided": 320,
        "netSavings": 20,
        "successProbability": 74,
        "tradeoff": "Die adjustment requires line stop (5 min)."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Only",
        "actions": [
          {
            "description": "Increase barrel zone 3 temperature modestly",
            "parameter": "Barrel Zone 3 Temp",
            "from": "Current",
            "to": "+3°C"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 15
        },
        "costOfAction": 50,
        "costAvoided": 60,
        "netSavings": 10,
        "successProbability": 96,
        "tradeoff": "Modest improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 5500,
      "avgCostPerIncident": 300,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 650000
    },
    "shiftMetrics": {
      "output": "2,040 kg",
      "energy": "$680",
      "efficiency": "80%"
    }
  },
  {
    "id": "plastics-3",
    "industry": "Plastics and Rubber Manufacturing",
    "scenarioName": "Material Blending and Color Consistency",
    "description": "Regrind content has exceeded the 25% customer limit and color deviation has reached Delta-E 2.4, above the 1.5 maximum. Colorant is being overdosed to compensate, driving reject costs to $420/hr.",
    "annualCostRange": "$500K - $800K",
    "sensors": [
      {
        "id": "s1",
        "name": "Colorant Dosing",
        "unit": "%",
        "normalValue": 2.5,
        "anomalyValue": 3.1,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Regrind Content",
        "unit": "%",
        "normalValue": 20,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Melt Flow Index",
        "unit": "g/10min",
        "normalValue": 12,
        "anomalyValue": 10.2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Color Delta-E",
        "unit": "dE",
        "normalValue": 0.8,
        "anomalyValue": 2.4,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Additive Cost",
        "unit": "$/kg",
        "normalValue": 0.18,
        "anomalyValue": 0.26,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Customer Reject Rate",
        "unit": "%",
        "normalValue": 0.5,
        "anomalyValue": 2.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Blend Quality Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 24
    },
    "predictiveAlert": {
      "title": "Blend Quality 24% Below Target",
      "message": "Color deviation exceeding customer tolerance (Delta-E 2.4 vs. 1.5 max). Regrind above 25% limit. Colorant overdosed to compensate. Reject cost: $420/hr.",
      "riskPercent": 87
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Regrind and Color Correction",
        "actions": [
          {
            "description": "Reduce regrind content to safe level",
            "parameter": "Regrind Content",
            "from": "28%",
            "to": "22%"
          },
          {
            "description": "Reduce colorant dosing to corrected target",
            "parameter": "Colorant Dosing",
            "from": "3.1%",
            "to": "2.7%"
          },
          {
            "description": "Recalibrate gravimetric feeder",
            "parameter": "Gravimetric Feeder",
            "from": "Drifted",
            "to": "Calibrated"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 8
        },
        "costOfAction": 2700,
        "costAvoided": 24800,
        "netSavings": 22100,
        "successProbability": 87,
        "tradeoff": "Slight increase in virgin resin usage ($45/hr)."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Blend Optimization",
        "actions": [
          {
            "description": "Reduce regrind to design target",
            "parameter": "Regrind Content",
            "from": "28%",
            "to": "20%"
          },
          {
            "description": "Reset colorant to design dosing",
            "parameter": "Colorant Dosing",
            "from": "3.1%",
            "to": "2.5%"
          },
          {
            "description": "Add compatibilizer to stabilize blend",
            "parameter": "Compatibilizer",
            "from": "0%",
            "to": "0.3%"
          },
          {
            "description": "Recalibrate all gravimetric feeders",
            "parameter": "All Feeders",
            "from": "Drifted",
            "to": "Calibrated"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 3
        },
        "costOfAction": 3800,
        "costAvoided": 31200,
        "netSavings": 27400,
        "successProbability": 76,
        "tradeoff": "Compatibilizer cost $20/hr; feeder calibration takes 20 min."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Regrind Reduction Only",
        "actions": [
          {
            "description": "Reduce regrind content to near-limit value",
            "parameter": "Regrind Content",
            "from": "28%",
            "to": "24%"
          }
        ],
        "riskReduction": {
          "from": 24,
          "to": 14
        },
        "costOfAction": 500,
        "costAvoided": 11500,
        "netSavings": 11000,
        "successProbability": 96,
        "tradeoff": "Still at risk of customer rejects."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1800,
      "avgCostPerIncident": 900,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 635000
    },
    "shiftMetrics": {
      "output": "3,200 kg",
      "energy": "$540",
      "efficiency": "76%"
    }
  },
  {
    "id": "plastics-4",
    "industry": "Plastics and Rubber Manufacturing",
    "scenarioName": "Cooling System Efficiency",
    "description": "The chiller is overcooling to 10°C when only 12°C is required, and Machine 7 has restricted flow indicating a fouled cooling circuit. Combined excess energy cost is $18/hr with reduced cooling effectiveness.",
    "annualCostRange": "$30K - $60K",
    "sensors": [
      {
        "id": "s1",
        "name": "Chiller Power",
        "unit": "kW",
        "normalValue": 125,
        "anomalyValue": 168,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Supply Water Temp",
        "unit": "°C",
        "normalValue": 12,
        "anomalyValue": 10,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Return Water Temp",
        "unit": "°C",
        "normalValue": 18,
        "anomalyValue": 14,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Delta-T Across Molds",
        "unit": "°C",
        "normalValue": 6,
        "anomalyValue": 4,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Machine 7 Flow",
        "unit": "L/min",
        "normalValue": 25,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Cooling Energy",
        "unit": "Wh/kg",
        "normalValue": 35,
        "anomalyValue": 52,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Cooling Energy Waste",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 22,
      "criticalThreshold": 35,
      "peakValue": 42
    },
    "predictiveAlert": {
      "title": "Cooling System 42% Above Optimal Energy",
      "message": "Chiller overcooling (supply at 10°C vs. 12°C needed). Machine 7 restricted flow indicates fouled circuit. Excess cost: $18/hr in electricity.",
      "riskPercent": 78
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature Reset and Flow Restoration",
        "actions": [
          {
            "description": "Raise chiller supply temperature setpoint to target",
            "parameter": "Chiller Supply Setpoint",
            "from": "10°C",
            "to": "12°C"
          },
          {
            "description": "Schedule Machine 7 cooling circuit flush at next tool change",
            "parameter": "Machine 7 Circuit",
            "from": "Fouled (12 L/min)",
            "to": "Flushed (25 L/min)"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 14
        },
        "costOfAction": 150,
        "costAvoided": 650,
        "netSavings": 500,
        "successProbability": 94,
        "tradeoff": "Machine 7 flush takes 15 min at tool change."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full System Optimization",
        "actions": [
          {
            "description": "Raise chiller setpoint to target",
            "parameter": "Chiller Supply Setpoint",
            "from": "10°C",
            "to": "12°C"
          },
          {
            "description": "Flush all machine cooling circuits",
            "parameter": "All Cooling Circuits",
            "from": "Unverified",
            "to": "Flushed and Verified"
          },
          {
            "description": "Rebalance cooling water flow across all machines",
            "parameter": "Flow Distribution",
            "from": "Unbalanced",
            "to": "Balanced"
          },
          {
            "description": "Optimize chiller staging (enable free cooling where available)",
            "parameter": "Chiller Staging",
            "from": "Single Chiller",
            "to": "Staged with Free Cooling"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 6
        },
        "costOfAction": 800,
        "costAvoided": 1050,
        "netSavings": 250,
        "successProbability": 76,
        "tradeoff": "Full circuit flush requires 4-hour maintenance window."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Chiller Setpoint Only",
        "actions": [
          {
            "description": "Raise chiller supply temperature setpoint",
            "parameter": "Chiller Supply Setpoint",
            "from": "10°C",
            "to": "12°C"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 22
        },
        "costOfAction": 50,
        "costAvoided": 290,
        "netSavings": 240,
        "successProbability": 97,
        "tradeoff": "Does not address Machine 7 flow restriction; cooling effectiveness stays low on that machine."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 6000,
      "avgCostPerIncident": 14,
      "preventionRate": 0.5,
      "platformCost": 50000,
      "netAnnualSavings": 42000
    },
    "shiftMetrics": {
      "output": "5,800 parts",
      "energy": "$960",
      "efficiency": "74%"
    }
  },
  {
    "id": "plastics-5",
    "industry": "Plastics and Rubber Manufacturing",
    "scenarioName": "Scrap Reduction and Material Yield",
    "description": "Total scrap is at 11.2%, more than double the 5% target. Operators are over-purging at startup (22 kg vs. 8 kg target) and Machine 4 is generating short shots at 4.8% defect rate. Total scrap cost this shift: $1,840.",
    "annualCostRange": "$400K - $650K",
    "sensors": [
      {
        "id": "s1",
        "name": "Total Scrap Rate",
        "unit": "%",
        "normalValue": 5,
        "anomalyValue": 11.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Startup Waste",
        "unit": "kg/startup",
        "normalValue": 8,
        "anomalyValue": 22,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Runner Waste",
        "unit": "kg/hr",
        "normalValue": 4,
        "anomalyValue": 4,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Defect Scrap",
        "unit": "%",
        "normalValue": 1.5,
        "anomalyValue": 4.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Material Cost/Good Part",
        "unit": "$",
        "normalValue": 0.42,
        "anomalyValue": 0.51,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Regrind Generation",
        "unit": "kg/hr",
        "normalValue": 15,
        "anomalyValue": 38,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Scrap Index",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 8,
      "criticalThreshold": 11,
      "peakValue": 11.2
    },
    "predictiveAlert": {
      "title": "Scrap Rate at 11.2% -- More Than Double Target",
      "message": "Startup waste excessive (22 kg vs. 8 kg target; operator over-purging). Defect scrap at 4.8% driven by short shots on Machine 4. Total scrap cost this shift: $1,840.",
      "riskPercent": 86
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Startup and Defect Fix",
        "actions": [
          {
            "description": "Implement optimized purge sequence for all startups",
            "parameter": "Startup Purge Sequence",
            "from": "Operator Default (22 kg)",
            "to": "Optimized (8 kg)"
          },
          {
            "description": "Increase Machine 4 pack pressure",
            "parameter": "Machine 4 Pack Pressure",
            "from": "Current",
            "to": "+3%"
          },
          {
            "description": "Increase Machine 4 melt temperature",
            "parameter": "Machine 4 Melt Temp",
            "from": "Current",
            "to": "+2°C"
          }
        ],
        "riskReduction": {
          "from": 11.2,
          "to": 5.5
        },
        "costOfAction": 200,
        "costAvoided": 1180,
        "netSavings": 980,
        "successProbability": 88,
        "tradeoff": "New purge sequence takes 3 min longer per startup but saves 12 kg material."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Scrap Optimization",
        "actions": [
          {
            "description": "Implement optimized purge sequence",
            "parameter": "Startup Purge Sequence",
            "from": "Operator Default (22 kg)",
            "to": "Optimized (8 kg)"
          },
          {
            "description": "Install hot runner system on Tool 12 to eliminate runner waste",
            "parameter": "Tool 12 Runner System",
            "from": "Cold Runner",
            "to": "Hot Runner"
          },
          {
            "description": "Optimize process windows across all machines",
            "parameter": "All Machine Process Windows",
            "from": "Current",
            "to": "SPC-Optimized"
          }
        ],
        "riskReduction": {
          "from": 11.2,
          "to": 3
        },
        "costOfAction": 500,
        "costAvoided": 1520,
        "netSavings": 1020,
        "successProbability": 76,
        "tradeoff": "Hot runner installation requires scheduled downtime; process window changes need qualification runs."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Machine 4 Fix Only",
        "actions": [
          {
            "description": "Adjust Machine 4 pack pressure to reduce short shots",
            "parameter": "Machine 4 Pack Pressure",
            "from": "Current",
            "to": "+3%"
          }
        ],
        "riskReduction": {
          "from": 11.2,
          "to": 7.5
        },
        "costOfAction": 50,
        "costAvoided": 520,
        "netSavings": 470,
        "successProbability": 96,
        "tradeoff": "Does not address startup waste."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 600,
      "avgCostPerIncident": 2200,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 485000
    },
    "shiftMetrics": {
      "output": "14,200 good parts",
      "energy": "$1,100",
      "efficiency": "71%"
    }
  },
  {
    "id": "semiconductor-1",
    "industry": "Semiconductor and Electronics",
    "scenarioName": "Clean Room Yield Optimization",
    "description": "Elevated particle counts and degraded temperature uniformity in Bay 4 are threatening wafer yield, with 24 wafers currently at risk and potential loss of $72,000.",
    "annualCostRange": "$2M - $5M",
    "sensors": [
      {
        "id": "s1",
        "name": "Particle Count",
        "unit": "/m3",
        "normalValue": 10,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Die Yield",
        "unit": "%",
        "normalValue": 92,
        "anomalyValue": 86,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Defect Density",
        "unit": "/cm2",
        "normalValue": 0.15,
        "anomalyValue": 0.38,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "HEPA Filter DP",
        "unit": "Pa",
        "normalValue": 250,
        "anomalyValue": 310,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Temp Uniformity",
        "unit": "°C spread",
        "normalValue": 0.2,
        "anomalyValue": 0.8,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Wafers at Risk",
        "unit": "",
        "normalValue": 0,
        "anomalyValue": 24,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Yield Loss Risk",
      "unit": "%",
      "normalValue": 2,
      "warningThreshold": 5,
      "criticalThreshold": 8,
      "peakValue": 10
    },
    "predictiveAlert": {
      "title": "Yield Loss Risk at 10% in Bay 4",
      "message": "Particle count 3.5x normal. Filter differential pressure elevated. Temperature uniformity degraded. 24 wafers at risk; potential loss: $72,000.",
      "riskPercent": 10
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Immediate Containment",
        "actions": [
          {
            "description": "Increase air handler speed 15% in Bay 4",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Activate supplemental HEPA",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Delay lot start 30 min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 10,
          "to": 3
        },
        "costOfAction": 2000,
        "costAvoided": 52000,
        "netSavings": 50000,
        "successProbability": 88,
        "tradeoff": "30-min delay on current lot."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Clean Room Intervention",
        "actions": [
          {
            "description": "Increase air handler speed 15% in Bay 4",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Activate supplemental HEPA",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Emergency filter replacement on Unit 4-B",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Recalibrate temp zones",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 10,
          "to": 1.5
        },
        "costOfAction": 8000,
        "costAvoided": 62000,
        "netSavings": 54000,
        "successProbability": 76,
        "tradeoff": "2-hour maintenance; protects all subsequent lots too."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Monitor and Proceed",
        "actions": [
          {
            "description": "Continue with enhanced inspection",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 10,
          "to": 8
        },
        "costOfAction": 1000,
        "costAvoided": 18000,
        "netSavings": 17000,
        "successProbability": 96,
        "tradeoff": "Still producing defective wafers; reactive only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 300,
      "avgCostPerIncident": 40000,
      "preventionRate": 0.3,
      "platformCost": 400000,
      "netAnnualSavings": 3200000
    },
    "shiftMetrics": {
      "output": "180 wafers",
      "energy": "$4,200",
      "efficiency": "92%"
    }
  },
  {
    "id": "semiconductor-2",
    "industry": "Semiconductor and Electronics",
    "scenarioName": "Plasma Etching Process Control",
    "description": "Chamber condition has degraded after 380 wafer runs, causing etch rate and uniformity to drift out of spec, putting the next 20 wafers at risk of over-etch on edges.",
    "annualCostRange": "$1M - $3M",
    "sensors": [
      {
        "id": "s1",
        "name": "Etch Rate",
        "unit": "nm/min",
        "normalValue": 250,
        "anomalyValue": 228,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Etch Uniformity",
        "unit": "%range",
        "normalValue": 2,
        "anomalyValue": 4.5,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "RF Reflected Power",
        "unit": "W",
        "normalValue": 15,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Chamber Pressure",
        "unit": "mTorr",
        "normalValue": 50,
        "anomalyValue": 53,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Wafers Since Clean",
        "unit": "",
        "normalValue": 150,
        "anomalyValue": 380,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Endpoint Signal Strength",
        "unit": "",
        "normalValue": 0.85,
        "anomalyValue": 0.62,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Process Drift",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 14,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Etch Process Drifted 18% from Target",
      "message": "Chamber condition degraded (380 wafers since clean; threshold 400). Etch uniformity out of spec. Next 20 wafers at risk of over-etch on edges.",
      "riskPercent": 18
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Recipe Compensation",
        "actions": [
          {
            "description": "Increase RF power 5%",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce gas flow 3%",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Adjust pressure to 49 mTorr",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 5
        },
        "costOfAction": 1000,
        "costAvoided": 28000,
        "netSavings": 27000,
        "successProbability": 87,
        "tradeoff": "Temporary recipe; revert after next chamber clean."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Chamber Clean Now",
        "actions": [
          {
            "description": "Stop production",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Execute chamber clean (45 min)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 1
        },
        "costOfAction": 6000,
        "costAvoided": 42000,
        "netSavings": 36000,
        "successProbability": 94,
        "tradeoff": "45-min downtime; $6,000 lost production."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Reduced Lot Size",
        "actions": [
          {
            "description": "Process only 10 wafers before clean instead of 20",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 10
        },
        "costOfAction": 2000,
        "costAvoided": 14000,
        "netSavings": 12000,
        "successProbability": 96,
        "tradeoff": "More frequent monitoring; no process improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2000,
      "avgCostPerIncident": 2600,
      "preventionRate": 0.4,
      "platformCost": 350000,
      "netAnnualSavings": 1730000
    },
    "shiftMetrics": {
      "output": "120 wafers",
      "energy": "$2,800",
      "efficiency": "88%"
    }
  },
  {
    "id": "semiconductor-3",
    "industry": "Semiconductor and Electronics",
    "scenarioName": "Thermal Processing Profile Optimization",
    "description": "Suspected thermocouple drift has degraded temperature uniformity in the furnace, causing extended cycle times and oxide thickness variation that may impact device performance.",
    "annualCostRange": "$2M - $5M",
    "sensors": [
      {
        "id": "s1",
        "name": "Peak Temperature",
        "unit": "°C",
        "normalValue": 1050,
        "anomalyValue": 1058,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Temp Uniformity",
        "unit": "°C range",
        "normalValue": 1.5,
        "anomalyValue": 3.8,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Ramp Rate",
        "unit": "°C/min",
        "normalValue": 8,
        "anomalyValue": 7.2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Cycle Time",
        "unit": "min",
        "normalValue": 120,
        "anomalyValue": 138,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Energy per Batch",
        "unit": "kWh",
        "normalValue": 85,
        "anomalyValue": 102,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Oxide Thickness Uniformity",
        "unit": "%",
        "normalValue": 1,
        "anomalyValue": 2.8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Thermal Process Deviation",
      "unit": "%",
      "normalValue": 2,
      "warningThreshold": 6,
      "criticalThreshold": 10,
      "peakValue": 12
    },
    "predictiveAlert": {
      "title": "Thermal Process 12% Off-Target",
      "message": "Temperature uniformity degraded (thermocouple drift suspected). Cycle time extended by 18 min to compensate. Oxide thickness variation may impact device performance.",
      "riskPercent": 12
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "TC Offset Compensation",
        "actions": [
          {
            "description": "Apply calibration offset correction",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize ramp profile for current furnace condition",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 12,
          "to": 4
        },
        "costOfAction": 1000,
        "costAvoided": 4500,
        "netSavings": 3500,
        "successProbability": 88,
        "tradeoff": "Requires confirmation with test wafer."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Calibration + Profile Reoptimization",
        "actions": [
          {
            "description": "Replace TC",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Run full temperature mapping",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reoptimize recipe",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 12,
          "to": 1
        },
        "costOfAction": 5000,
        "costAvoided": 6200,
        "netSavings": 1200,
        "successProbability": 94,
        "tradeoff": "4-hour maintenance and recalibration."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Extended Soak",
        "actions": [
          {
            "description": "Add 5-min soak at peak temperature",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 12,
          "to": 8
        },
        "costOfAction": 200,
        "costAvoided": 1200,
        "netSavings": 1000,
        "successProbability": 96,
        "tradeoff": "Cycle time increases further."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2400,
      "avgCostPerIncident": 3500,
      "preventionRate": 0.4,
      "platformCost": 350000,
      "netAnnualSavings": 3010000
    },
    "shiftMetrics": {
      "output": "6 furnace batches",
      "energy": "$1,800",
      "efficiency": "87%"
    }
  },
  {
    "id": "semiconductor-4",
    "industry": "Semiconductor and Electronics",
    "scenarioName": "AOI Defect Excursion Response",
    "description": "A systematic defect excursion with 78% correlation to Litho Track 3 has already exposed 6 lots (144 wafers; $432,000 value), with pattern defects running 5.6x baseline.",
    "annualCostRange": "$2M - $6M",
    "sensors": [
      {
        "id": "s1",
        "name": "Total Defects Detected",
        "unit": "",
        "normalValue": 120,
        "anomalyValue": 340,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Critical Defects (killer)",
        "unit": "",
        "normalValue": 15,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Pattern Defects (systematic)",
        "unit": "",
        "normalValue": 5,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Random Defects",
        "unit": "",
        "normalValue": 110,
        "anomalyValue": 247,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Lots Exposed Since Onset",
        "unit": "",
        "normalValue": 0,
        "anomalyValue": 6,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Defect Excursion Risk",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 10,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Defect Excursion Severity",
      "unit": "%",
      "normalValue": 2,
      "warningThreshold": 5,
      "criticalThreshold": 8,
      "peakValue": 10
    },
    "predictiveAlert": {
      "title": "Defect Excursion: Pattern Defects 5.6x Baseline",
      "message": "Systematic source identified. Litho Track 3 is primary contributor (78% correlation). 6 lots (144 wafers; $432,000 value) already exposed since excursion onset.",
      "riskPercent": 10
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Tool Quarantine + Lot Hold",
        "actions": [
          {
            "description": "Take Litho Track 3 offline",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Hold 6 exposed lots for enhanced testing",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Redirect to Tracks 1 and 2",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 10,
          "to": 2
        },
        "costOfAction": 15000,
        "costAvoided": 720000,
        "netSavings": 705000,
        "successProbability": 88,
        "tradeoff": "Capacity reduction until Track 3 returns (est. 8 hours)."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Excursion Response",
        "actions": [
          {
            "description": "Quarantine Litho Track 3",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Hold all exposed lots",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Run emergency qualification on Track 3",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 10,
          "to": 1
        },
        "costOfAction": 20000,
        "costAvoided": 1008000,
        "netSavings": 988000,
        "successProbability": 82,
        "tradeoff": "12-hour Track 3 downtime; test wafer cost $3,000."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Enhanced Monitoring",
        "actions": [
          {
            "description": "Continue production with 100% inspection",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 10,
          "to": 9
        },
        "costOfAction": 5000,
        "costAvoided": 0,
        "netSavings": -5000,
        "successProbability": 90,
        "tradeoff": "Continues producing defective wafers; reactive only."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8,
      "avgCostPerIncident": 400000,
      "preventionRate": 0.5,
      "platformCost": 350000,
      "netAnnualSavings": 1250000
    },
    "shiftMetrics": {
      "output": "240 wafers",
      "energy": "$3,500",
      "efficiency": "86%"
    }
  },
  {
    "id": "semiconductor-5",
    "industry": "Semiconductor and Electronics",
    "scenarioName": "Chemical and Gas Usage Optimization",
    "description": "Photoresist over-dispensing, early etchant bath replacement, and excess N2 purge cycles are driving chemical consumption 32% above optimal, costing $3,300/day.",
    "annualCostRange": "$300K - $800K",
    "sensors": [
      {
        "id": "s1",
        "name": "Photoresist Dispense",
        "unit": "mL",
        "normalValue": 2.5,
        "anomalyValue": 3.2,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Photoresist Waste",
        "unit": "%",
        "normalValue": 15,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "CMP Slurry Flow",
        "unit": "mL/min",
        "normalValue": 200,
        "anomalyValue": 260,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Etchant Bath Life Remaining",
        "unit": "%",
        "normalValue": 20,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "N2 Purge Cycles per Load",
        "unit": "",
        "normalValue": 3,
        "anomalyValue": 6,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Chemical Cost per Layer",
        "unit": "$",
        "normalValue": 5.2,
        "anomalyValue": 6.85,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Chemical Waste",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Chemical Consumption 32% Above Optimal",
      "message": "Photoresist over-dispensing (3.2 mL vs. 2.5 mL needed). Etchant bath replaced early (35% capacity remaining). Excess N2 purge cycles. Cost: $3,300/day.",
      "riskPercent": 32
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Dispense and Bath Optimization",
        "actions": [
          {
            "description": "Reduce photoresist to 2.7 mL",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Extend etchant to 15% remaining",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce N2 to 4 cycles",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 10
        },
        "costOfAction": 500,
        "costAvoided": 2200,
        "netSavings": 1700,
        "successProbability": 88,
        "tradeoff": "Monitor resist coverage on first 5 wafers; check etch bath at 20%."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Chemical Optimization",
        "actions": [
          {
            "description": "Reduce photoresist to 2.7 mL",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Extend etchant to 15% remaining",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce N2 to 4 cycles",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "CMP slurry to 210 mL/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Recalibrate all dispensers",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 5
        },
        "costOfAction": 2000,
        "costAvoided": 2960,
        "netSavings": 960,
        "successProbability": 76,
        "tradeoff": "Requires process engineering review; 2-hour setup."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Dispense Only",
        "actions": [
          {
            "description": "Reduce photoresist to 2.9 mL",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 20
        },
        "costOfAction": 200,
        "costAvoided": 900,
        "netSavings": 700,
        "successProbability": 96,
        "tradeoff": "Modest improvement; does not address other chemical waste."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 350,
      "avgCostPerIncident": 5000,
      "preventionRate": 0.5,
      "platformCost": 300000,
      "netAnnualSavings": 575000
    },
    "shiftMetrics": {
      "output": "2,000 wafer layers",
      "energy": "$1,200",
      "efficiency": "82%"
    }
  },
  {
    "id": "battery-1",
    "industry": "Battery Manufacturing",
    "scenarioName": "Electrode Coating Uniformity",
    "description": "Coating weight variation and slurry viscosity drift are causing electrode quality to fall below specification, putting coated foil at risk of rejection.",
    "annualCostRange": "$1.5M - $2.2M",
    "sensors": [
      {
        "id": "coating-weight",
        "name": "Coating Weight",
        "unit": "mg/cm2",
        "normalValue": 15,
        "anomalyValue": 15.8,
        "icon": "icon"
      },
      {
        "id": "coating-weight-cv",
        "name": "Coating Weight CV",
        "unit": "%",
        "normalValue": 0.8,
        "anomalyValue": 2.1,
        "icon": "icon"
      },
      {
        "id": "line-speed",
        "name": "Line Speed",
        "unit": "m/min",
        "normalValue": 25,
        "anomalyValue": 20,
        "icon": "icon"
      },
      {
        "id": "slurry-viscosity",
        "name": "Slurry Viscosity",
        "unit": "Pa·s",
        "normalValue": 3500,
        "anomalyValue": 4200,
        "icon": "icon"
      },
      {
        "id": "die-gap",
        "name": "Die Gap",
        "unit": "µm",
        "normalValue": 200,
        "anomalyValue": 195,
        "icon": "icon"
      },
      {
        "id": "edge-coating-quality",
        "name": "Edge Coating Quality",
        "unit": "",
        "normalValue": 95,
        "anomalyValue": 82,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Coating Quality Gap",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 14,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Electrode Coating Quality 18% Below Target",
      "message": "Weight variation 2.1% (max spec 1.2%). Slurry viscosity increased. Edge coating degrading. 120 m of coated foil at risk of rejection ($18,000).",
      "riskPercent": 18
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Viscosity and Gap Correction",
        "actions": [
          {
            "description": "Add 0.8% solvent to slurry tank",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Increase die gap to 203 µm",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 5
        },
        "costOfAction": 2000,
        "costAvoided": 12000,
        "netSavings": 10000,
        "successProbability": 88,
        "tradeoff": "10-min viscosity adjustment; monitor first 20 m."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Line Optimization",
        "actions": [
          {
            "description": "Apply viscosity correction",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Increase line speed to 25 m/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Enable closed-loop coating weight control",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Recalibrate edge positioning",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 2
        },
        "costOfAction": 4000,
        "costAvoided": 16000,
        "netSavings": 12000,
        "successProbability": 76,
        "tradeoff": "25-min setup for closed-loop calibration."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Speed Reduction Only",
        "actions": [
          {
            "description": "Reduce line speed to 18 m/min",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 10
        },
        "costOfAction": 500,
        "costAvoided": 6000,
        "netSavings": 5500,
        "successProbability": 96,
        "tradeoff": "Further throughput loss."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1000,
      "avgCostPerIncident": 5200,
      "preventionRate": 0.4,
      "platformCost": 300000,
      "netAnnualSavings": 1780000
    },
    "shiftMetrics": {
      "output": "1,800 m electrode",
      "energy": "$2,400",
      "efficiency": "80%"
    }
  },
  {
    "id": "battery-2",
    "industry": "Battery Manufacturing",
    "scenarioName": "Formation Cycling Optimization",
    "description": "Formation cycling is running significantly past optimal time, wasting channel capacity without measurable benefit to cell quality.",
    "annualCostRange": "$1.1M - $1.8M",
    "sensors": [
      {
        "id": "formation-step",
        "name": "Formation Step",
        "unit": "",
        "normalValue": 1,
        "anomalyValue": 3,
        "icon": "icon"
      },
      {
        "id": "cell-voltage",
        "name": "Cell Voltage",
        "unit": "V",
        "normalValue": 3.65,
        "anomalyValue": 3.68,
        "icon": "icon"
      },
      {
        "id": "coulombic-efficiency",
        "name": "Coulombic Efficiency",
        "unit": "%",
        "normalValue": 99.2,
        "anomalyValue": 98.8,
        "icon": "icon"
      },
      {
        "id": "formation-time-elapsed",
        "name": "Formation Time Elapsed",
        "unit": "hrs",
        "normalValue": 36,
        "anomalyValue": 48,
        "icon": "icon"
      },
      {
        "id": "sei-stability",
        "name": "SEI Stability Indicator",
        "unit": "",
        "normalValue": 92,
        "anomalyValue": 88,
        "icon": "icon"
      },
      {
        "id": "channel-utilization",
        "name": "Channel Utilization",
        "unit": "%",
        "normalValue": 95,
        "anomalyValue": 95,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Formation Time Overrun",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 25,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Formation Running 32% Above Optimal Time",
      "message": "Cell voltage and coulombic efficiency indicate SEI formation is complete. Remaining 2 cycles adding minimal value. 48 hours elapsed vs. 36 needed. Channel capacity wasted: 12 hours.",
      "riskPercent": 32
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Early Termination",
        "actions": [
          {
            "description": "End formation after current cycle (CE above 99.0%; SEI stable)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Save 12 hours per cell",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 8
        },
        "costOfAction": 1000,
        "costAvoided": 1600,
        "netSavings": 600,
        "successProbability": 87,
        "tradeoff": "Requires verification of first 50 cells performance data."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Optimized Protocol",
        "actions": [
          {
            "description": "Apply early termination",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Increase C-rate on initial cycles 20% for next batch",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Target formation time of 30 hours",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 4
        },
        "costOfAction": 2000,
        "costAvoided": 2400,
        "netSavings": 400,
        "successProbability": 74,
        "tradeoff": "Slightly higher initial degradation risk; monitor cycle life data."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Skip Last Cycle Only",
        "actions": [
          {
            "description": "Terminate after cycle 4 of 5",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 18
        },
        "costOfAction": 500,
        "costAvoided": 1100,
        "netSavings": 600,
        "successProbability": 96,
        "tradeoff": "Modest improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1000,
      "avgCostPerIncident": 4800,
      "preventionRate": 0.35,
      "platformCost": 300000,
      "netAnnualSavings": 1380000
    },
    "shiftMetrics": {
      "output": "500 cells formed",
      "energy": "$3,200",
      "efficiency": "68%"
    }
  },
  {
    "id": "battery-3",
    "industry": "Battery Manufacturing",
    "scenarioName": "Electrolyte Filling Optimization",
    "description": "Vacuum seal degradation on Station 3 is causing overfilling, extended cycle times, and excess electrolyte waste per shift.",
    "annualCostRange": "$150K - $300K",
    "sensors": [
      {
        "id": "fill-volume",
        "name": "Fill Volume",
        "unit": "mL",
        "normalValue": 5.2,
        "anomalyValue": 5.8,
        "icon": "icon"
      },
      {
        "id": "fill-volume-variation",
        "name": "Fill Volume Variation",
        "unit": "%",
        "normalValue": 1.5,
        "anomalyValue": 4.2,
        "icon": "icon"
      },
      {
        "id": "vacuum-level",
        "name": "Vacuum Level",
        "unit": "kPa",
        "normalValue": -85,
        "anomalyValue": -78,
        "icon": "icon"
      },
      {
        "id": "wetting-time",
        "name": "Wetting Time",
        "unit": "min",
        "normalValue": 25,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "electrolyte-waste",
        "name": "Electrolyte Waste",
        "unit": "%",
        "normalValue": 3,
        "anomalyValue": 8,
        "icon": "icon"
      },
      {
        "id": "fill-cycle-time",
        "name": "Fill Cycle Time",
        "unit": "min",
        "normalValue": 35,
        "anomalyValue": 52,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Fill Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 25
    },
    "predictiveAlert": {
      "title": "Electrolyte Filling 25% Suboptimal",
      "message": "Overfilling by 11% (5.8 mL vs. 5.2 mL needed). Vacuum insufficient due to seal wear on Station 3. Cycle time extended to 52 min. Waste cost: $450/shift.",
      "riskPercent": 25
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Vacuum and Volume Correction",
        "actions": [
          {
            "description": "Replace seal on Station 3 vacuum (10-min swap)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Recalibrate fill volume to 5.3 mL",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 8
        },
        "costOfAction": 200,
        "costAvoided": 380,
        "netSavings": 180,
        "successProbability": 94,
        "tradeoff": "10-min station downtime for seal."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Process Optimization",
        "actions": [
          {
            "description": "Replace seal on Station 3 vacuum",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize vacuum-pressure-rest profile",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 3
        },
        "costOfAction": 500,
        "costAvoided": 430,
        "netSavings": -70,
        "successProbability": 82,
        "tradeoff": "30-min profile optimization and validation."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Volume Reduction Only",
        "actions": [
          {
            "description": "Reduce fill setpoint to 5.5 mL",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 16
        },
        "costOfAction": 50,
        "costAvoided": 180,
        "netSavings": 130,
        "successProbability": 96,
        "tradeoff": "Does not fix vacuum issue; cycle time unchanged."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 600,
      "avgCostPerIncident": 1367,
      "preventionRate": 0.5,
      "platformCost": 200000,
      "netAnnualSavings": 210100
    },
    "shiftMetrics": {
      "output": "1,000 cells filled",
      "energy": "$1,800",
      "efficiency": "67%"
    }
  },
  {
    "id": "battery-4",
    "industry": "Battery Manufacturing",
    "scenarioName": "Cell Assembly Yield Optimization",
    "description": "Tab welder electrode wear and elevated winding tension are driving scrap rates above target, causing material losses each shift.",
    "annualCostRange": "$600K - $900K",
    "sensors": [
      {
        "id": "tab-weld-resistance",
        "name": "Tab Weld Resistance",
        "unit": "mΩ",
        "normalValue": 0.5,
        "anomalyValue": 1.2,
        "icon": "icon"
      },
      {
        "id": "electrode-alignment",
        "name": "Electrode Alignment",
        "unit": "mm",
        "normalValue": 0.1,
        "anomalyValue": 0.4,
        "icon": "icon"
      },
      {
        "id": "winding-tension",
        "name": "Winding Tension",
        "unit": "N",
        "normalValue": 5,
        "anomalyValue": 6.8,
        "icon": "icon"
      },
      {
        "id": "seal-test-pass-rate",
        "name": "Seal Test Pass Rate",
        "unit": "%",
        "normalValue": 98,
        "anomalyValue": 91,
        "icon": "icon"
      },
      {
        "id": "assembly-scrap-rate",
        "name": "Assembly Scrap Rate",
        "unit": "%",
        "normalValue": 3.5,
        "anomalyValue": 7.2,
        "icon": "icon"
      },
      {
        "id": "particle-events",
        "name": "Particle Events",
        "unit": "/hr",
        "normalValue": 2,
        "anomalyValue": 8,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Assembly Yield Risk",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 6,
      "criticalThreshold": 9,
      "peakValue": 11
    },
    "predictiveAlert": {
      "title": "Assembly Yield Risk at 11%",
      "message": "Tab welder resistance 2.4x normal indicating electrode wear. Winding tension elevated causing electrode cracking. Scrap rate 7.2% this shift. Material loss: $5,400/shift.",
      "riskPercent": 11
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Tool Maintenance + Tension Adjustment",
        "actions": [
          {
            "description": "Replace tab welder electrode (5-min swap)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Reduce winding tension to 5.5 N",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 11,
          "to": 3.5
        },
        "costOfAction": 500,
        "costAvoided": 3800,
        "netSavings": 3300,
        "successProbability": 88,
        "tradeoff": "5-min welder downtime."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Assembly Optimization",
        "actions": [
          {
            "description": "Replace tab welder electrode",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Recalibrate electrode alignment",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Add in-line particle detection",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 11,
          "to": 2
        },
        "costOfAction": 2000,
        "costAvoided": 5200,
        "netSavings": 3200,
        "successProbability": 76,
        "tradeoff": "20-min optimization; requires QA validation."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Tension Only",
        "actions": [
          {
            "description": "Reduce winding tension to 5.8 N",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 11,
          "to": 5.5
        },
        "costOfAction": 100,
        "costAvoided": 1700,
        "netSavings": 1600,
        "successProbability": 96,
        "tradeoff": "Does not fix weld quality."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 600,
      "avgCostPerIncident": 4200,
      "preventionRate": 0.4,
      "platformCost": 275000,
      "netAnnualSavings": 735000
    },
    "shiftMetrics": {
      "output": "3,200 cells assembled",
      "energy": "$2,800",
      "efficiency": "74%"
    }
  },
  {
    "id": "battery-5",
    "industry": "Battery Manufacturing",
    "scenarioName": "Dry Room Energy Management",
    "description": "The dry room is over-drying at reduced production capacity, running dehumidification at full power and wasting significant energy per hour.",
    "annualCostRange": "$80K - $180K",
    "sensors": [
      {
        "id": "dry-room-humidity",
        "name": "Dry Room Humidity",
        "unit": "%RH",
        "normalValue": 0.5,
        "anomalyValue": 0.3,
        "icon": "icon"
      },
      {
        "id": "dew-point",
        "name": "Dew Point",
        "unit": "°C",
        "normalValue": -45,
        "anomalyValue": -52,
        "icon": "icon"
      },
      {
        "id": "dehumidifier-power",
        "name": "Dehumidifier Power",
        "unit": "kW",
        "normalValue": 280,
        "anomalyValue": 380,
        "icon": "icon"
      },
      {
        "id": "door-opening-freq",
        "name": "Door Opening Freq",
        "unit": "/hr",
        "normalValue": 12,
        "anomalyValue": 8,
        "icon": "icon"
      },
      {
        "id": "production-activity",
        "name": "Production Activity",
        "unit": "%",
        "normalValue": 85,
        "anomalyValue": 60,
        "icon": "icon"
      },
      {
        "id": "energy-per-cell",
        "name": "Energy per Cell",
        "unit": "Wh/cell",
        "normalValue": 1.8,
        "anomalyValue": 2.9,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Dry Room Energy Waste",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 30,
      "peakValue": 38
    },
    "predictiveAlert": {
      "title": "Dry Room Energy 38% Above Optimal",
      "message": "Humidity at 0.3% RH (target 0.5%; over-drying). Production at 60% capacity but dehumidifier at full power. Door openings below average. Excess cost: $32/hr.",
      "riskPercent": 38
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Load-Based Dehumidification",
        "actions": [
          {
            "description": "Reduce dehumidifier to 70% capacity",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Allow humidity to rise to 0.45% RH (within spec)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 12
        },
        "costOfAction": 200,
        "costAvoided": 192,
        "netSavings": -8,
        "successProbability": 94,
        "tradeoff": "Monitor humidity; increase capacity if production ramps up."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full HVAC Optimization",
        "actions": [
          {
            "description": "Reduce dehumidifier to 65% capacity",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize air recirculation",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Adjust makeup air for occupancy",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 6
        },
        "costOfAction": 400,
        "costAvoided": 224,
        "netSavings": -176,
        "successProbability": 82,
        "tradeoff": "Tighter humidity margin during shift changes."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "10% Reduction Only",
        "actions": [
          {
            "description": "Reduce dehumidifier to 90% capacity",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 28
        },
        "costOfAction": 50,
        "costAvoided": 80,
        "netSavings": 30,
        "successProbability": 96,
        "tradeoff": "Minimal improvement."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 44,
      "preventionRate": 0.5,
      "platformCost": 50000,
      "netAnnualSavings": 126000
    },
    "shiftMetrics": {
      "output": "4,000 cells",
      "energy": "$5,600",
      "efficiency": "60%"
    }
  },
  {
    "id": "paint-1",
    "industry": "Paint and Coatings Manufacturing",
    "scenarioName": "Dispersion Milling Optimization",
    "description": "Worn milling beads and elevated batch viscosity are causing fineness targets to be missed, extending mill run times and risking pigment degradation.",
    "annualCostRange": "$350K - $550K",
    "sensors": [
      {
        "id": "fineness-of-grind",
        "name": "Fineness of Grind",
        "unit": "Hegman",
        "normalValue": 7,
        "anomalyValue": 5.8,
        "icon": "icon"
      },
      {
        "id": "mill-power-draw",
        "name": "Mill Power Draw",
        "unit": "kW",
        "normalValue": 22,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "mill-temp",
        "name": "Mill Temp",
        "unit": "°C",
        "normalValue": 45,
        "anomalyValue": 58,
        "icon": "icon"
      },
      {
        "id": "milling-time",
        "name": "Milling Time",
        "unit": "min",
        "normalValue": 45,
        "anomalyValue": 62,
        "icon": "icon"
      },
      {
        "id": "bead-wear",
        "name": "Bead Wear",
        "unit": "%",
        "normalValue": 15,
        "anomalyValue": 42,
        "icon": "icon"
      },
      {
        "id": "batch-viscosity",
        "name": "Batch Viscosity",
        "unit": "KU",
        "normalValue": 85,
        "anomalyValue": 98,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Milling Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 35
    },
    "predictiveAlert": {
      "title": "Milling Running 35% Above Optimal",
      "message": "Fineness target not reached after 62 min (normal 45 min). Beads worn (42% life consumed). Temperature rising, may affect pigment stability.",
      "riskPercent": 35
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Bead Replacement + Viscosity Adjustment",
        "actions": [
          {
            "description": "Charge fresh beads (15-min swap)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Add 2% thinning solvent to reduce viscosity to 88 KU",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 10
        },
        "costOfAction": 150,
        "costAvoided": 280,
        "netSavings": 130,
        "successProbability": 88,
        "tradeoff": "15-min bead swap downtime."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Optimization",
        "actions": [
          {
            "description": "Charge fresh beads",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Increase mill speed 10%",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Optimize bead fill ratio",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 5
        },
        "costOfAction": 200,
        "costAvoided": 350,
        "netSavings": 150,
        "successProbability": 76,
        "tradeoff": "Higher temperature; add cooling capacity."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Continue Current Run",
        "actions": [
          {
            "description": "Add 20 more minutes of milling",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 28
        },
        "costOfAction": 80,
        "costAvoided": 0,
        "netSavings": -80,
        "successProbability": 65,
        "tradeoff": "May reach fineness target but high energy and pigment degradation risk."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2800,
      "avgCostPerIncident": 440,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 441000
    },
    "shiftMetrics": {
      "output": "8 batches milled",
      "energy": "$420",
      "efficiency": "65%"
    }
  },
  {
    "id": "paint-2",
    "industry": "Paint and Coatings Manufacturing",
    "scenarioName": "Color Matching and First-Shot Accuracy",
    "description": "A pigment lot with higher-than-expected tinting strength is causing lightness deviation, requiring repeated correction additions and significant batch time loss.",
    "annualCostRange": "$80K - $140K",
    "sensors": [
      {
        "id": "delta-e",
        "name": "Delta-E",
        "unit": "",
        "normalValue": 0.5,
        "anomalyValue": 2.2,
        "icon": "icon"
      },
      {
        "id": "delta-l",
        "name": "Delta-L",
        "unit": "",
        "normalValue": 0.2,
        "anomalyValue": 1.4,
        "icon": "icon"
      },
      {
        "id": "delta-a",
        "name": "Delta-a",
        "unit": "",
        "normalValue": 0.1,
        "anomalyValue": 0.5,
        "icon": "icon"
      },
      {
        "id": "delta-b",
        "name": "Delta-b",
        "unit": "",
        "normalValue": 0.2,
        "anomalyValue": 0.8,
        "icon": "icon"
      },
      {
        "id": "tinter-additions",
        "name": "Tinter Additions",
        "unit": "",
        "normalValue": 0,
        "anomalyValue": 3,
        "icon": "icon"
      },
      {
        "id": "batch-correction-time",
        "name": "Batch Correction Time",
        "unit": "min",
        "normalValue": 0,
        "anomalyValue": 35,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Color Accuracy Gap",
      "unit": "Delta-E",
      "normalValue": 0.5,
      "warningThreshold": 1,
      "criticalThreshold": 1.8,
      "peakValue": 2.2
    },
    "predictiveAlert": {
      "title": "Color Match Failed -- Delta-E at 2.2 (Spec Less Than 1.0)",
      "message": "Lightness too high (+1.4 delta-L). Primary pigment lot has higher tinting strength than database value. 3 correction additions made; still off-target.",
      "riskPercent": 2.2
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Compensated Addition",
        "actions": [
          {
            "description": "Add 4.2 g/L black tinter (calculated from spectral analysis)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Add 1.8 g/L blue tinter (calculated from spectral analysis)",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 2.2,
          "to": 0.6
        },
        "costOfAction": 50,
        "costAvoided": 85,
        "netSavings": 35,
        "successProbability": 88,
        "tradeoff": "Requires spectrophotometer measurement confirmation."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Database Update + Correction",
        "actions": [
          {
            "description": "Apply compensated tinter addition",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Update pigment lot tinting strength in database",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 2.2,
          "to": 0.4
        },
        "costOfAction": 80,
        "costAvoided": 2685,
        "netSavings": 2605,
        "successProbability": 82,
        "tradeoff": "Requires lab validation of new tinting strength values."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Manual Adjustment",
        "actions": [
          {
            "description": "Continue iterative additions by operator",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 2.2,
          "to": 0.9
        },
        "costOfAction": 120,
        "costAvoided": 0,
        "netSavings": -120,
        "successProbability": 75,
        "tradeoff": "Eventually reaches target but expensive; 25 more minutes."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 6000,
      "avgCostPerIncident": 95,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 110000
    },
    "shiftMetrics": {
      "output": "12 batches",
      "energy": "$180",
      "efficiency": "80%"
    }
  },
  {
    "id": "paint-3",
    "industry": "Paint and Coatings Manufacturing",
    "scenarioName": "Batch Viscosity Control",
    "description": "Imbalanced thixotropic profile with high low-shear viscosity and low high-shear viscosity will cause sagging on application if the batch is released as-is.",
    "annualCostRange": "$250K - $450K",
    "sensors": [
      {
        "id": "viscosity-low-shear",
        "name": "Viscosity Low Shear",
        "unit": "KU",
        "normalValue": 95,
        "anomalyValue": 108,
        "icon": "icon"
      },
      {
        "id": "viscosity-high-shear",
        "name": "Viscosity High Shear",
        "unit": "P",
        "normalValue": 1.2,
        "anomalyValue": 0.9,
        "icon": "icon"
      },
      {
        "id": "temperature",
        "name": "Temperature",
        "unit": "°C",
        "normalValue": 25,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "solvent-content",
        "name": "Solvent Content",
        "unit": "%",
        "normalValue": 38,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "thickener-level",
        "name": "Thickener Level",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 2.4,
        "icon": "icon"
      },
      {
        "id": "ici-viscosity",
        "name": "ICI Viscosity",
        "unit": "P",
        "normalValue": 1.4,
        "anomalyValue": 1,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Viscosity Deviation",
      "unit": "%",
      "normalValue": 3,
      "warningThreshold": 8,
      "criticalThreshold": 14,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Batch Viscosity 18% Out of Specification",
      "message": "Low-shear viscosity too high (108 KU vs. 95 target). High-shear viscosity too low (0.9 P vs. 1.2). Thixotropic profile imbalanced; will cause sagging when applied.",
      "riskPercent": 18
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Targeted Rheology Correction",
        "actions": [
          {
            "description": "Add 0.15% associative thickener",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Add 1.2% solvent",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 5
        },
        "costOfAction": 200,
        "costAvoided": 1200,
        "netSavings": 1000,
        "successProbability": 88,
        "tradeoff": "Verify application test before release."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Reformulation",
        "actions": [
          {
            "description": "Strip batch to base",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Add components per corrected formula",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 1
        },
        "costOfAction": 800,
        "costAvoided": 1200,
        "netSavings": 400,
        "successProbability": 96,
        "tradeoff": "Perfect profile guaranteed; 2-hour batch delay."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Solvent Addition Only",
        "actions": [
          {
            "description": "Add 2% solvent",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 12
        },
        "costOfAction": 80,
        "costAvoided": 400,
        "netSavings": 320,
        "successProbability": 78,
        "tradeoff": "Product borderline; may get customer complaints."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 1200,
      "avgCostPerIncident": 810,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 311000
    },
    "shiftMetrics": {
      "output": "10 batches",
      "energy": "$240",
      "efficiency": "78%"
    }
  },
  {
    "id": "paint-4",
    "industry": "Paint and Coatings Manufacturing",
    "scenarioName": "VOC Management and Compliance",
    "description": "An unplanned production rate increase has driven VOC emissions to 93% of the permit limit, with a regulatory violation projected within 45 minutes at the current rate.",
    "annualCostRange": "$350K - $600K",
    "sensors": [
      {
        "id": "voc-concentration",
        "name": "VOC Concentration",
        "unit": "ppm",
        "normalValue": 120,
        "anomalyValue": 185,
        "icon": "icon"
      },
      {
        "id": "voc-emission-rate",
        "name": "VOC Emission Rate",
        "unit": "kg/hr",
        "normalValue": 8,
        "anomalyValue": 14,
        "icon": "icon"
      },
      {
        "id": "ventilation-rate",
        "name": "Ventilation Rate",
        "unit": "m3/hr",
        "normalValue": 5000,
        "anomalyValue": 5000,
        "icon": "icon"
      },
      {
        "id": "permit-limit",
        "name": "Permit Limit",
        "unit": "kg/hr",
        "normalValue": 15,
        "anomalyValue": 15,
        "icon": "icon"
      },
      {
        "id": "production-rate",
        "name": "Production Rate",
        "unit": "batches/hr",
        "normalValue": 2,
        "anomalyValue": 3,
        "icon": "icon"
      },
      {
        "id": "distance-to-permit",
        "name": "Distance to Permit Limit",
        "unit": "%",
        "normalValue": 45,
        "anomalyValue": 7,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Compliance Risk",
      "unit": "%",
      "normalValue": 15,
      "warningThreshold": 40,
      "criticalThreshold": 75,
      "peakValue": 93
    },
    "predictiveAlert": {
      "title": "VOC Emissions at 93% of Permit Limit",
      "message": "Production rate increased this shift without ventilation adjustment. At current rate, will exceed limit within 45 minutes. Regulatory fine: $25,000 per violation.",
      "riskPercent": 93
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Ventilation Increase + Schedule Adjustment",
        "actions": [
          {
            "description": "Increase ventilation to 6,500 m3/hr",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Stagger high-VOC batches",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 93,
          "to": 35
        },
        "costOfAction": 12,
        "costAvoided": 25000,
        "netSavings": 24988,
        "successProbability": 94,
        "tradeoff": "Slightly longer production day."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Optimization",
        "actions": [
          {
            "description": "Increase ventilation to 6,500 m3/hr",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Shift 2 high-VOC batches to night shift",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 93,
          "to": 20
        },
        "costOfAction": 500,
        "costAvoided": 25850,
        "netSavings": 25350,
        "successProbability": 88,
        "tradeoff": "Night shift staffing; scheduling coordination."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Reduce Production Rate",
        "actions": [
          {
            "description": "Drop production rate back to 2 batches/hr",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 93,
          "to": 30
        },
        "costOfAction": 850,
        "costAvoided": 25000,
        "netSavings": 24150,
        "successProbability": 96,
        "tradeoff": "Lost throughput of $850/hr."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 250,
      "avgCostPerIncident": 5040,
      "preventionRate": 0.5,
      "platformCost": 175000,
      "netAnnualSavings": 455000
    },
    "shiftMetrics": {
      "output": "18 batches",
      "energy": "$360",
      "efficiency": "86%"
    }
  },
  {
    "id": "paint-5",
    "industry": "Paint and Coatings Manufacturing",
    "scenarioName": "Tank Changeover and Cleaning Scheduling",
    "description": "Unoptimized batch sequencing has created five dark-to-light color transitions today, tripling cleaning time and solvent usage versus the daily target.",
    "annualCostRange": "$80K - $140K",
    "sensors": [
      {
        "id": "tanks-in-cleaning",
        "name": "Tanks in Cleaning",
        "unit": "",
        "normalValue": 1,
        "anomalyValue": 3,
        "icon": "icon"
      },
      {
        "id": "total-cleaning-time",
        "name": "Total Cleaning Time",
        "unit": "hrs",
        "normalValue": 2,
        "anomalyValue": 6.5,
        "icon": "icon"
      },
      {
        "id": "solvent-used",
        "name": "Solvent Used",
        "unit": "L",
        "normalValue": 120,
        "anomalyValue": 380,
        "icon": "icon"
      },
      {
        "id": "tank-utilization",
        "name": "Tank Utilization",
        "unit": "%",
        "normalValue": 85,
        "anomalyValue": 62,
        "icon": "icon"
      },
      {
        "id": "products-waiting",
        "name": "Products Waiting",
        "unit": "",
        "normalValue": 0,
        "anomalyValue": 4,
        "icon": "icon"
      },
      {
        "id": "dark-to-light-sequences",
        "name": "Dark-to-Light Sequences",
        "unit": "",
        "normalValue": 1,
        "anomalyValue": 5,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Changeover Waste Index",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 22,
      "criticalThreshold": 35,
      "peakValue": 42
    },
    "predictiveAlert": {
      "title": "Tank Changeover Waste 42% Above Optimal",
      "message": "5 dark-to-light sequences today (optimal: 1). 3 tanks simultaneously in cleaning. 4 batches waiting. Excess cleaning cost: $1,200/day.",
      "riskPercent": 42
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Resequence Remaining Batches",
        "actions": [
          {
            "description": "Group light colors on Tank 1",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Group dark colors on Tank 2",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Eliminates 3 unnecessary transitions",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 14
        },
        "costOfAction": 200,
        "costAvoided": 680,
        "netSavings": 480,
        "successProbability": 88,
        "tradeoff": "Two orders ship 3 hours later."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Day Reoptimization + Tank Dedication",
        "actions": [
          {
            "description": "Assign dedicated light/dark tanks for remainder of week",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          },
          {
            "description": "Resequence all pending batches",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 6
        },
        "costOfAction": 500,
        "costAvoided": 3200,
        "netSavings": 2700,
        "successProbability": 76,
        "tradeoff": "Customer delivery date adjustments for 6 orders."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Prioritize Light Colors First",
        "actions": [
          {
            "description": "Run all remaining light batches before any dark batches",
            "parameter": "Process Parameter",
            "from": "current",
            "to": "adjusted"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 25
        },
        "costOfAction": 100,
        "costAvoided": 320,
        "netSavings": 220,
        "successProbability": 96,
        "tradeoff": "Dark color orders delayed to end of day."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 250,
      "avgCostPerIncident": 1240,
      "preventionRate": 0.5,
      "platformCost": 50000,
      "netAnnualSavings": 105000
    },
    "shiftMetrics": {
      "output": "14 batches",
      "energy": "$280",
      "efficiency": "62%"
    }
  },
  {
    "id": "fertilizer-1",
    "industry": "Fertilizer and Agrochemical",
    "scenarioName": "Ammonia Synthesis Loop Optimization",
    "description": "Haber-Bosch loop operating above optimal energy due to off-stoichiometric H2:N2 ratio and excessive purge rate.",
    "annualCostRange": "$1.9M–$2.5M",
    "sensors": [
      {
        "id": "s1",
        "name": "Reactor Inlet Temp",
        "unit": "°C",
        "normalValue": 420,
        "anomalyValue": 445,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Loop Pressure",
        "unit": "bar",
        "normalValue": 180,
        "anomalyValue": 190,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Conversion Per Pass",
        "unit": "%",
        "normalValue": 20,
        "anomalyValue": 17,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "H2:N2 Ratio",
        "unit": "",
        "normalValue": 3,
        "anomalyValue": 3.3,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Purge Rate",
        "unit": "%",
        "normalValue": 4,
        "anomalyValue": 6,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Energy per Ton NH3",
        "unit": "GJ/ton",
        "normalValue": 28,
        "anomalyValue": 32,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Energy Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 10,
      "criticalThreshold": 15,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Ammonia Synthesis 18% Above Optimal Energy",
      "message": "H2:N2 ratio off-stoichiometric at 3.3 (target 3.05). Purge rate excessive at 6% -- venting valuable hydrogen. Inlet temperature elevated. Excess energy cost: $1,200/hr.",
      "riskPercent": 18
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Ratio and Purge Optimization",
        "actions": [
          {
            "description": "Adjust hydrogen-to-nitrogen feed ratio",
            "parameter": "H2:N2 Ratio",
            "from": "3.3",
            "to": "3.05"
          },
          {
            "description": "Reduce purge rate",
            "parameter": "Purge Rate",
            "from": "6%",
            "to": "4.5%"
          },
          {
            "description": "Lower reactor inlet temperature",
            "parameter": "Reactor Inlet Temp",
            "from": "445 °C",
            "to": "430 °C"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 6
        },
        "costOfAction": 2000,
        "costAvoided": 88000,
        "netSavings": 86000,
        "successProbability": 84,
        "tradeoff": "Monitor catalyst bed temperatures closely after ratio adjustment."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Loop Optimization",
        "actions": [
          {
            "description": "Optimize H2:N2 ratio",
            "parameter": "H2:N2 Ratio",
            "from": "3.3",
            "to": "3.05"
          },
          {
            "description": "Reduce purge rate",
            "parameter": "Purge Rate",
            "from": "6%",
            "to": "4.5%"
          },
          {
            "description": "Increase feed rate 5%",
            "parameter": "Space Velocity",
            "from": "baseline",
            "to": "+5%"
          },
          {
            "description": "Adjust synthesis pressure to optimal",
            "parameter": "Loop Pressure",
            "from": "190 bar",
            "to": "182 bar"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 3
        },
        "costOfAction": 6000,
        "costAvoided": 108000,
        "netSavings": 102000,
        "successProbability": 72,
        "tradeoff": "Requires process engineering review and compressor adjustment before implementing."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Reduction Only",
        "actions": [
          {
            "description": "Reduce inlet temperature",
            "parameter": "Reactor Inlet Temp",
            "from": "445 °C",
            "to": "435 °C"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 13
        },
        "costOfAction": 500,
        "costAvoided": 33000,
        "netSavings": 32500,
        "successProbability": 96,
        "tradeoff": "Modest improvement only; does not address H2:N2 ratio or purge waste."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8200,
      "avgCostPerIncident": 780,
      "preventionRate": 0.35,
      "platformCost": 350000,
      "netAnnualSavings": 1890000
    },
    "shiftMetrics": {
      "output": "420 tons NH3",
      "energy": "$28,400",
      "efficiency": "82%"
    }
  },
  {
    "id": "fertilizer-2",
    "industry": "Fertilizer and Agrochemical",
    "scenarioName": "Granulation Process Optimization",
    "description": "Drum granulator producing oversized granules with high recycle ratio, cutting net throughput by 18%.",
    "annualCostRange": "$850K–$1.1M",
    "sensors": [
      {
        "id": "s1",
        "name": "Granule Median Size",
        "unit": "mm",
        "normalValue": 3,
        "anomalyValue": 3.8,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Size Distribution CV",
        "unit": "%",
        "normalValue": 15,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Recycle Ratio",
        "unit": "%",
        "normalValue": 1.5,
        "anomalyValue": 2.8,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Drum Speed",
        "unit": "rpm",
        "normalValue": 12,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Liquid Spray Rate",
        "unit": "L/min",
        "normalValue": 45,
        "anomalyValue": 52,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Product Moisture",
        "unit": "%",
        "normalValue": 1.5,
        "anomalyValue": 2.4,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Granulation Quality Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 25
    },
    "predictiveAlert": {
      "title": "Granulation 25% Off-Target -- Oversized Product",
      "message": "Granule median size at 3.8 mm (target 3.0 mm). Recycle ratio nearly doubled, reducing net throughput by 18%. Spray rate too high for current feed concentration.",
      "riskPercent": 25
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Spray and Speed Adjustment",
        "actions": [
          {
            "description": "Reduce liquid spray rate",
            "parameter": "Liquid Spray Rate",
            "from": "52 L/min",
            "to": "46 L/min"
          },
          {
            "description": "Increase drum speed for more tumbling",
            "parameter": "Drum Speed",
            "from": "12 rpm",
            "to": "13 rpm"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 8
        },
        "costOfAction": 1500,
        "costAvoided": 43000,
        "netSavings": 41500,
        "successProbability": 86,
        "tradeoff": "Monitor granule crush strength at new drum speed before full production run."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Granulation Optimization",
        "actions": [
          {
            "description": "Reduce spray rate to target",
            "parameter": "Liquid Spray Rate",
            "from": "52 L/min",
            "to": "44 L/min"
          },
          {
            "description": "Increase drum speed",
            "parameter": "Drum Speed",
            "from": "12 rpm",
            "to": "13 rpm"
          },
          {
            "description": "Return undersized fines as nucleation seeds",
            "parameter": "Fines Return",
            "from": "off",
            "to": "on"
          },
          {
            "description": "Adjust spray nozzle angle for coverage",
            "parameter": "Nozzle Angle",
            "from": "45 deg",
            "to": "52 deg"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 3
        },
        "costOfAction": 4500,
        "costAvoided": 59000,
        "netSavings": 54500,
        "successProbability": 74,
        "tradeoff": "15-minute nozzle adjustment required; verify with first-sample sieve analysis."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Spray Reduction Only",
        "actions": [
          {
            "description": "Reduce spray rate slightly",
            "parameter": "Liquid Spray Rate",
            "from": "52 L/min",
            "to": "48 L/min"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 15
        },
        "costOfAction": 500,
        "costAvoided": 18000,
        "netSavings": 17500,
        "successProbability": 95,
        "tradeoff": "Product still slightly oversized; recycle ratio remains elevated."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 7000,
      "avgCostPerIncident": 380,
      "preventionRate": 0.4,
      "platformCost": 250000,
      "netAnnualSavings": 810000
    },
    "shiftMetrics": {
      "output": "385 tons",
      "energy": "$8,200",
      "efficiency": "82%"
    }
  },
  {
    "id": "fertilizer-3",
    "industry": "Fertilizer and Agrochemical",
    "scenarioName": "Prilling Tower Efficiency Optimization",
    "description": "Urea prilling producing oversized, weak prills with dust approaching permit limits due to melt temp and spinner speed drift.",
    "annualCostRange": "$1.0M–$1.4M",
    "sensors": [
      {
        "id": "s1",
        "name": "Melt Temperature",
        "unit": "°C",
        "normalValue": 140,
        "anomalyValue": 148,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Spinner Speed",
        "unit": "rpm",
        "normalValue": 3500,
        "anomalyValue": 3200,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Tower Top Air Temp",
        "unit": "°C",
        "normalValue": 55,
        "anomalyValue": 62,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Prill Median Size",
        "unit": "mm",
        "normalValue": 1.8,
        "anomalyValue": 2.2,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Dust Emissions",
        "unit": "mg/Nm3",
        "normalValue": 30,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Prill Crush Strength",
        "unit": "N",
        "normalValue": 8,
        "anomalyValue": 5,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Prilling Quality Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 26
    },
    "predictiveAlert": {
      "title": "Prilling Tower 26% Below Optimal -- Quality and Compliance Risk",
      "message": "Prills oversized at 2.2 mm (target 1.8 mm). Crush strength 38% below spec. Dust emissions at 65 mg/Nm3 approaching permit limit of 80. Quality reject rate: 12%.",
      "riskPercent": 26
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Spinner and Temperature Correction",
        "actions": [
          {
            "description": "Increase spinner speed",
            "parameter": "Spinner Speed",
            "from": "3,200 rpm",
            "to": "3,450 rpm"
          },
          {
            "description": "Reduce melt temperature",
            "parameter": "Melt Temperature",
            "from": "148 °C",
            "to": "142 °C"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 7
        },
        "costOfAction": 2000,
        "costAvoided": 53000,
        "netSavings": 51000,
        "successProbability": 86,
        "tradeoff": "Slightly smaller prills at 1.9 mm -- still within spec range."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Tower Optimization",
        "actions": [
          {
            "description": "Restore spinner to target speed",
            "parameter": "Spinner Speed",
            "from": "3,200 rpm",
            "to": "3,500 rpm"
          },
          {
            "description": "Reduce melt temperature to optimum",
            "parameter": "Melt Temperature",
            "from": "148 °C",
            "to": "140 °C"
          },
          {
            "description": "Increase cooling air flow",
            "parameter": "Air Flow",
            "from": "baseline",
            "to": "+8%"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 2
        },
        "costOfAction": 5500,
        "costAvoided": 69000,
        "netSavings": 63500,
        "successProbability": 76,
        "tradeoff": "Air flow increase adds $40/hr energy cost; mist eliminator installation deferred to next shutdown."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Reduction Only",
        "actions": [
          {
            "description": "Reduce melt temperature",
            "parameter": "Melt Temperature",
            "from": "148 °C",
            "to": "145 °C"
          }
        ],
        "riskReduction": {
          "from": 26,
          "to": 16
        },
        "costOfAction": 500,
        "costAvoided": 22000,
        "netSavings": 21500,
        "successProbability": 95,
        "tradeoff": "Prill size improves to 2.0 mm but spinner remains suboptimal -- dust risk persists."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 7500,
      "avgCostPerIncident": 480,
      "preventionRate": 0.35,
      "platformCost": 250000,
      "netAnnualSavings": 1010000
    },
    "shiftMetrics": {
      "output": "310 tons prilled",
      "energy": "$9,600",
      "efficiency": "79%"
    }
  },
  {
    "id": "fertilizer-4",
    "industry": "Fertilizer and Agrochemical",
    "scenarioName": "Acid Plant Heat Recovery Optimization",
    "description": "Sulfuric acid plant heat exchangers fouled -- auxiliary boiler compensating at high gas cost for lost steam recovery.",
    "annualCostRange": "$640K–$940K",
    "sensors": [
      {
        "id": "s1",
        "name": "Acid Plant Steam",
        "unit": "tons/hr",
        "normalValue": 42,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Auxiliary Boiler Steam",
        "unit": "tons/hr",
        "normalValue": 5,
        "anomalyValue": 12,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Economizer Outlet Temp",
        "unit": "°C",
        "normalValue": 180,
        "anomalyValue": 210,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Acid Cooler Approach",
        "unit": "°C",
        "normalValue": 15,
        "anomalyValue": 32,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Heat Recovery Efficiency",
        "unit": "%",
        "normalValue": 88,
        "anomalyValue": 78,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Energy Cost Gap",
        "unit": "$/hr",
        "normalValue": 120,
        "anomalyValue": 380,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Heat Recovery Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 18,
      "peakValue": 22
    },
    "predictiveAlert": {
      "title": "Acid Plant Heat Recovery 22% Below Optimal",
      "message": "Economizer and acid coolers fouled -- approach temperatures elevated. Auxiliary boiler compensating with expensive natural gas steam at $12 ton/hr above normal. Excess cost: $380/hr.",
      "riskPercent": 22
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Bypass and Cleaning Schedule",
        "actions": [
          {
            "description": "Bypass most fouled acid cooler",
            "parameter": "Acid Cooler Bypass",
            "from": "off",
            "to": "on"
          },
          {
            "description": "Schedule chemical clean in 48 hours",
            "parameter": "Cleaning Schedule",
            "from": "deferred",
            "to": "48 hr"
          },
          {
            "description": "Optimize boiler feed water flow to economizer",
            "parameter": "BFW Flow",
            "from": "baseline",
            "to": "+12%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 9
        },
        "costOfAction": 4000,
        "costAvoided": 22000,
        "netSavings": 18000,
        "successProbability": 85,
        "tradeoff": "Slightly reduced SO3 cooling margin on bypassed unit -- monitor outlet temperature."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Online Chemical Clean",
        "actions": [
          {
            "description": "Initiate online acid circulation cleaning on both acid coolers",
            "parameter": "CIP Status",
            "from": "idle",
            "to": "active"
          },
          {
            "description": "Optimize acid concentration during clean",
            "parameter": "Acid Conc",
            "from": "baseline",
            "to": "target"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 4
        },
        "costOfAction": 8500,
        "costAvoided": 31000,
        "netSavings": 22500,
        "successProbability": 78,
        "tradeoff": "4-hour cleaning process; monitor acid concentration closely throughout."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Auxiliary Boiler Optimization Only",
        "actions": [
          {
            "description": "Optimize auxiliary boiler combustion efficiency",
            "parameter": "Boiler Efficiency",
            "from": "88%",
            "to": "91%"
          }
        ],
        "riskReduction": {
          "from": 22,
          "to": 17
        },
        "costOfAction": 1000,
        "costAvoided": 8000,
        "netSavings": 7000,
        "successProbability": 96,
        "tradeoff": "Does not address root cause; acid cooler fouling continues to worsen."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 8000,
      "avgCostPerIncident": 280,
      "preventionRate": 0.4,
      "platformCost": 250000,
      "netAnnualSavings": 646000
    },
    "shiftMetrics": {
      "output": "38 tons steam/hr",
      "energy": "$12,800",
      "efficiency": "78%"
    }
  },
  {
    "id": "fertilizer-5",
    "industry": "Fertilizer and Agrochemical",
    "scenarioName": "Product Storage Conditioning",
    "description": "High humidity and aged inventory causing fertilizer caking -- bag reject rate at 6x normal with reprocessing costs climbing.",
    "annualCostRange": "$380K–$560K",
    "sensors": [
      {
        "id": "s1",
        "name": "Storage Humidity",
        "unit": "%RH",
        "normalValue": 55,
        "anomalyValue": 72,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Moisture Gain Rate",
        "unit": "%/week",
        "normalValue": 0.1,
        "anomalyValue": 0.4,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Caking Strength",
        "unit": "N",
        "normalValue": 5,
        "anomalyValue": 18,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Coating Rate",
        "unit": "kg/ton",
        "normalValue": 2,
        "anomalyValue": 2,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Product Age in Storage",
        "unit": "days",
        "normalValue": 14,
        "anomalyValue": 32,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Bag Reject Rate",
        "unit": "%",
        "normalValue": 1,
        "anomalyValue": 6,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Storage Quality Risk",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 15,
      "criticalThreshold": 25,
      "peakValue": 32
    },
    "predictiveAlert": {
      "title": "Product Storage Quality Risk at 32%",
      "message": "Humidity 72% RH during rainy season. Product aging at 32 days (14 typical). Caking strength 3.6x acceptable. Bag reject rate 6x normal. Excess reprocessing cost: $1,800/day.",
      "riskPercent": 32
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Conditioning Increase and FIFO Dispatch",
        "actions": [
          {
            "description": "Increase coating application rate",
            "parameter": "Coating Rate",
            "from": "2.0 kg/ton",
            "to": "3.0 kg/ton"
          },
          {
            "description": "Activate dehumidifiers in Building 2",
            "parameter": "Dehumidifier",
            "from": "off",
            "to": "on"
          },
          {
            "description": "Prioritize oldest inventory for next dispatch (FIFO)",
            "parameter": "Ship Priority",
            "from": "LIFO",
            "to": "FIFO"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 10
        },
        "costOfAction": 3500,
        "costAvoided": 18000,
        "netSavings": 14500,
        "successProbability": 86,
        "tradeoff": "Coating cost increases $0.80/ton; FIFO dispatch may shift some customer lead times."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Storage Optimization",
        "actions": [
          {
            "description": "Increase coating rate",
            "parameter": "Coating Rate",
            "from": "2.0 kg/ton",
            "to": "3.0 kg/ton"
          },
          {
            "description": "Install supplemental dehumidification",
            "parameter": "Dehumidifier Capacity",
            "from": "standard",
            "to": "+40%"
          },
          {
            "description": "Reprocess oldest caked stock immediately",
            "parameter": "Reprocess Queue",
            "from": "idle",
            "to": "active"
          },
          {
            "description": "Reschedule production to reduce storage time",
            "parameter": "Production Lead",
            "from": "32 days",
            "to": "14 days"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 3
        },
        "costOfAction": 12000,
        "costAvoided": 24000,
        "netSavings": 12000,
        "successProbability": 74,
        "tradeoff": "Capital cost for supplemental dehumidifiers; scheduling disruption with customers."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Dehumidifier Activation Only",
        "actions": [
          {
            "description": "Activate existing dehumidifiers",
            "parameter": "Dehumidifier",
            "from": "off",
            "to": "on"
          }
        ],
        "riskReduction": {
          "from": 32,
          "to": 22
        },
        "costOfAction": 800,
        "costAvoided": 6000,
        "netSavings": 5200,
        "successProbability": 96,
        "tradeoff": "Humidity drops to 62% but aged caked stock is not addressed -- reprocessing continues."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 365,
      "avgCostPerIncident": 1425,
      "preventionRate": 0.4,
      "platformCost": 200000,
      "netAnnualSavings": 320000
    },
    "shiftMetrics": {
      "output": "280 tons dispatched",
      "energy": "$2,400",
      "efficiency": "76%"
    }
  },
  {
    "id": "brewing-1",
    "industry": "Brewing and Distilling",
    "scenarioName": "Fermentation Temperature Profiling",
    "description": "Fermenter running 2.5 degrees above Day 4 profile target -- diacetyl elevated at 85 ppb, batch at risk of extended cycle.",
    "annualCostRange": "$140K–$200K",
    "sensors": [
      {
        "id": "s1",
        "name": "Fermenter Temperature",
        "unit": "°C",
        "normalValue": 12,
        "anomalyValue": 14.5,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Specific Gravity",
        "unit": "degP",
        "normalValue": 8.5,
        "anomalyValue": 10.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Diacetyl Level",
        "unit": "ppb",
        "normalValue": 25,
        "anomalyValue": 85,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Fermentation Day",
        "unit": "of 7",
        "normalValue": 4,
        "anomalyValue": 4,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Yeast Cell Count",
        "unit": "M/mL",
        "normalValue": 45,
        "anomalyValue": 38,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "pH",
        "unit": "",
        "normalValue": 4.3,
        "anomalyValue": 4.6,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Fermentation Quality Risk",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 12,
      "criticalThreshold": 20,
      "peakValue": 25
    },
    "predictiveAlert": {
      "title": "Fermentation 25% Off-Profile -- Diacetyl Risk",
      "message": "Temperature 2.5 C above target for Day 4 (should be in diacetyl rest at 12 C, not primary at 14.5 C). Diacetyl at 85 ppb (packaging threshold: 30 ppb). Batch may need 2 extra days or diacetyl remediation.",
      "riskPercent": 25
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Temperature Correction and Extended Rest",
        "actions": [
          {
            "description": "Reduce fermenter temperature gradually over 6 hours",
            "parameter": "Fermenter Temperature",
            "from": "14.5 °C",
            "to": "12.0 °C"
          },
          {
            "description": "Add 2-day diacetyl rest phase after attenuation",
            "parameter": "Diacetyl Rest",
            "from": "not scheduled",
            "to": "14 °C for 2 days"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 5
        },
        "costOfAction": 1200,
        "costAvoided": 15000,
        "netSavings": 13800,
        "successProbability": 88,
        "tradeoff": "Batch extends to 9 days (vs. 7 planned) -- 2-day tank occupancy increase."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Krausening to Accelerate Recovery",
        "actions": [
          {
            "description": "Add 10% actively fermenting wort (krausening)",
            "parameter": "Krausen Addition",
            "from": "none",
            "to": "10% fresh wort"
          },
          {
            "description": "Drop temperature to diacetyl rest target",
            "parameter": "Fermenter Temperature",
            "from": "14.5 °C",
            "to": "12.0 °C"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 3
        },
        "costOfAction": 3500,
        "costAvoided": 18000,
        "netSavings": 14500,
        "successProbability": 76,
        "tradeoff": "Requires fresh wort availability; adds 1 day rather than 2 -- preferred when tanks are constrained."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Temperature Drop Only",
        "actions": [
          {
            "description": "Cool fermenter to target setpoint",
            "parameter": "Fermenter Temperature",
            "from": "14.5 °C",
            "to": "12.0 °C"
          }
        ],
        "riskReduction": {
          "from": 25,
          "to": 15
        },
        "costOfAction": 400,
        "costAvoided": 8000,
        "netSavings": 7600,
        "successProbability": 94,
        "tradeoff": "Diacetyl reduces slowly; batch likely needs 10 days total -- longest timeline."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 400,
      "avgCostPerIncident": 380,
      "preventionRate": 0.4,
      "platformCost": 175000,
      "netAnnualSavings": 152000
    },
    "shiftMetrics": {
      "output": "42 batches active",
      "energy": "$3,200",
      "efficiency": "79%"
    }
  },
  {
    "id": "brewing-2",
    "industry": "Brewing and Distilling",
    "scenarioName": "Mashing Efficiency Optimization",
    "description": "First wort gravity low at 16.2 deg P -- pH above enzymatic optimum causing 14% excess grain usage this batch.",
    "annualCostRange": "$150K–$220K",
    "sensors": [
      {
        "id": "s1",
        "name": "Mash Temperature",
        "unit": "°C",
        "normalValue": 65,
        "anomalyValue": 68,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "First Wort Gravity",
        "unit": "degP",
        "normalValue": 18.5,
        "anomalyValue": 16.2,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Extract Efficiency",
        "unit": "%",
        "normalValue": 80,
        "anomalyValue": 72,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Mash pH",
        "unit": "",
        "normalValue": 5.3,
        "anomalyValue": 5.6,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Lautering Time",
        "unit": "min",
        "normalValue": 45,
        "anomalyValue": 62,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Grain Usage",
        "unit": "kg/hL",
        "normalValue": 17,
        "anomalyValue": 19.5,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Mashing Efficiency Gap",
      "unit": "%",
      "normalValue": 5,
      "warningThreshold": 10,
      "criticalThreshold": 15,
      "peakValue": 18
    },
    "predictiveAlert": {
      "title": "Mash Efficiency 18% Below Target",
      "message": "First wort gravity 16.2 degP (target 18.5). pH at 5.6 -- above optimal for enzymatic activity. Current grain lot likely has different moisture. Will require 14% more grain to hit target gravity.",
      "riskPercent": 18
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "pH and Temperature Correction",
        "actions": [
          {
            "description": "Add acid addition to reduce mash pH",
            "parameter": "Mash pH",
            "from": "5.6",
            "to": "5.35"
          },
          {
            "description": "Hold at 63 C for 15 min to improve beta-amylase activity",
            "parameter": "Mash Temperature",
            "from": "68 °C",
            "to": "63 °C hold 15 min"
          },
          {
            "description": "Raise to 72 C for mash-out",
            "parameter": "Mash-Out Temp",
            "from": "skipped",
            "to": "72 °C"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 6
        },
        "costOfAction": 800,
        "costAvoided": 8500,
        "netSavings": 7700,
        "successProbability": 86,
        "tradeoff": "15 min additional mash time; total batch slightly longer."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full Mash Optimization",
        "actions": [
          {
            "description": "pH correction via acid addition",
            "parameter": "Mash pH",
            "from": "5.6",
            "to": "5.35"
          },
          {
            "description": "Add 5% more water to reduce mash thickness",
            "parameter": "Water:Grain Ratio",
            "from": "3.0 L/kg",
            "to": "3.15 L/kg"
          },
          {
            "description": "Recirculate mash for 10 min before lautering",
            "parameter": "Recirculation",
            "from": "off",
            "to": "10 min"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 3
        },
        "costOfAction": 1800,
        "costAvoided": 12000,
        "netSavings": 10200,
        "successProbability": 76,
        "tradeoff": "Slightly longer process; thinner wort may require adjusted boil time to hit original gravity."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Compensate with Additional Grain",
        "actions": [
          {
            "description": "Add 8% more grain to compensate for low extract",
            "parameter": "Grain Bill",
            "from": "17 kg/hL",
            "to": "18.4 kg/hL"
          }
        ],
        "riskReduction": {
          "from": 18,
          "to": 14
        },
        "costOfAction": 5500,
        "costAvoided": 5000,
        "netSavings": -500,
        "successProbability": 98,
        "tradeoff": "Adds $55/batch grain cost; does not fix underlying efficiency issue -- root cause persists."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2000,
      "avgCostPerIncident": 90,
      "preventionRate": 0.4,
      "platformCost": 150000,
      "netAnnualSavings": 30000
    },
    "shiftMetrics": {
      "output": "18 batches mashed",
      "energy": "$1,800",
      "efficiency": "72%"
    }
  },
  {
    "id": "brewing-3",
    "industry": "Brewing and Distilling",
    "scenarioName": "Boil Energy Optimization",
    "description": "Wort boiling at 10% evaporation rate -- DMS and isomerization already complete, continued vigorous boil wasting $42/batch.",
    "annualCostRange": "$90K–$120K",
    "sensors": [
      {
        "id": "s1",
        "name": "Boil Vigor",
        "unit": "% evap rate",
        "normalValue": 6,
        "anomalyValue": 10,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Boil Time Elapsed",
        "unit": "min",
        "normalValue": 45,
        "anomalyValue": 60,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "DMS Level",
        "unit": "ppb",
        "normalValue": 30,
        "anomalyValue": 15,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Isomerization",
        "unit": "%",
        "normalValue": 85,
        "anomalyValue": 92,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Energy",
        "unit": "kWh/hL wort",
        "normalValue": 22,
        "anomalyValue": 35,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Wort Volume Loss",
        "unit": "%",
        "normalValue": 6,
        "anomalyValue": 10,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Boil Energy Waste",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 30,
      "peakValue": 38
    },
    "predictiveAlert": {
      "title": "Boil Energy 38% Above Optimal",
      "message": "Evaporation rate at 10% (target 6%). DMS already below threshold at 15 ppb. Isomerization 92% complete. Continued vigorous boil wasting energy and concentrating wort excessively.",
      "riskPercent": 38
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Reduce Boil Vigor for Remainder",
        "actions": [
          {
            "description": "Reduce steam input to achieve 6% evaporation rate",
            "parameter": "Boil Vigor",
            "from": "10% evap",
            "to": "6% evap"
          },
          {
            "description": "Extend boil 5 min at lower vigor to complete isomerization",
            "parameter": "Boil Duration",
            "from": "60 min",
            "to": "65 min at low vigor"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 10
        },
        "costOfAction": 500,
        "costAvoided": 4200,
        "netSavings": 3700,
        "successProbability": 92,
        "tradeoff": "Verify hop utilization with IBU measurement at end of boil."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "End Boil Early -- Whirlpool Hop Stand",
        "actions": [
          {
            "description": "Stop vigorous boil now",
            "parameter": "Boil Vigor",
            "from": "10% evap",
            "to": "off"
          },
          {
            "description": "Transfer to whirlpool at 95 C for 15-min hop stand",
            "parameter": "Whirlpool Temp",
            "from": "n/a",
            "to": "95 °C, 15 min"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 5
        },
        "costOfAction": 800,
        "costAvoided": 5800,
        "netSavings": 5000,
        "successProbability": 82,
        "tradeoff": "Different hop character (more aroma, slightly less bitterness) -- may be desirable for certain styles."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Reduce Boil Vigor Slightly",
        "actions": [
          {
            "description": "Lower steam input to 8% evaporation rate",
            "parameter": "Boil Vigor",
            "from": "10% evap",
            "to": "8% evap"
          }
        ],
        "riskReduction": {
          "from": 38,
          "to": 24
        },
        "costOfAction": 200,
        "costAvoided": 1800,
        "netSavings": 1600,
        "successProbability": 97,
        "tradeoff": "Modest improvement only; significant energy waste continues."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 2000,
      "avgCostPerIncident": 52,
      "preventionRate": 0.4,
      "platformCost": 150000,
      "netAnnualSavings": 104000
    },
    "shiftMetrics": {
      "output": "22 brews boiled",
      "energy": "$4,200",
      "efficiency": "70%"
    }
  },
  {
    "id": "brewing-4",
    "industry": "Brewing and Distilling",
    "scenarioName": "Filtration Optimization",
    "description": "DE overdosed at 125 g/hL causing rapid pressure buildup -- filter run ending 5 hours early with beer loss at 3.8%.",
    "annualCostRange": "$85K–$110K",
    "sensors": [
      {
        "id": "s1",
        "name": "Filtration Rate",
        "unit": "hL/hr",
        "normalValue": 80,
        "anomalyValue": 55,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Outlet Turbidity",
        "unit": "EBC",
        "normalValue": 0.5,
        "anomalyValue": 0.8,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "DE Consumption",
        "unit": "g/hL",
        "normalValue": 80,
        "anomalyValue": 125,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "Beer Loss",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 3.8,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "Differential Pressure",
        "unit": "bar",
        "normalValue": 1.5,
        "anomalyValue": 2.4,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Filter Run Remaining",
        "unit": "hrs",
        "normalValue": 8,
        "anomalyValue": 3,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "Filtration Efficiency Gap",
      "unit": "%",
      "normalValue": 8,
      "warningThreshold": 18,
      "criticalThreshold": 28,
      "peakValue": 35
    },
    "predictiveAlert": {
      "title": "Filtration 35% Below Optimal -- DE Overdosed",
      "message": "DE overdosed at 125 g/hL (target 80). Rapid pressure buildup shortening filter run to 3 hrs (vs. 8 target). Beer loss at 3.8%. Total excess cost: $450/run.",
      "riskPercent": 35
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "DE and Rate Optimization",
        "actions": [
          {
            "description": "Reduce DE body feed dosing",
            "parameter": "DE Consumption",
            "from": "125 g/hL",
            "to": "85 g/hL"
          },
          {
            "description": "Increase filtration rate (pressure headroom available)",
            "parameter": "Filtration Rate",
            "from": "55 hL/hr",
            "to": "70 hL/hr"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 10
        },
        "costOfAction": 800,
        "costAvoided": 32000,
        "netSavings": 31200,
        "successProbability": 88,
        "tradeoff": "Monitor outlet turbidity every 30 min at new settings."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Switch to Crossflow Filtration",
        "actions": [
          {
            "description": "Transfer remainder of this brand to crossflow membrane unit",
            "parameter": "Filter Type",
            "from": "DE filter",
            "to": "crossflow"
          },
          {
            "description": "Set crossflow rate",
            "parameter": "Filtration Rate",
            "from": "55 hL/hr",
            "to": "65 hL/hr"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 4
        },
        "costOfAction": 2500,
        "costAvoided": 48000,
        "netSavings": 45500,
        "successProbability": 76,
        "tradeoff": "Slightly different mouthfeel (lighter body); equipment changeover takes 20 min."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "DE Reduction Only",
        "actions": [
          {
            "description": "Reduce DE dosing moderately",
            "parameter": "DE Consumption",
            "from": "125 g/hL",
            "to": "100 g/hL"
          }
        ],
        "riskReduction": {
          "from": 35,
          "to": 22
        },
        "costOfAction": 300,
        "costAvoided": 12000,
        "netSavings": 11700,
        "successProbability": 95,
        "tradeoff": "Modest improvement; filter still running suboptimally, run still shorter than target."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 250,
      "avgCostPerIncident": 380,
      "preventionRate": 0.4,
      "platformCost": 150000,
      "netAnnualSavings": 95000
    },
    "shiftMetrics": {
      "output": "6 filter runs",
      "energy": "$2,800",
      "efficiency": "68%"
    }
  },
  {
    "id": "brewing-5",
    "industry": "Brewing and Distilling",
    "scenarioName": "Brewery CIP Scheduling and Optimization",
    "description": "CIP running 42% above optimal -- final rinse turbidity already clean 15 min ago but cycle continues, wasting 1,600 L water per cycle.",
    "annualCostRange": "$55K–$80K",
    "sensors": [
      {
        "id": "s1",
        "name": "CIP Water per Cycle",
        "unit": "L/cycle",
        "normalValue": 2500,
        "anomalyValue": 4200,
        "icon": "icon"
      },
      {
        "id": "s2",
        "name": "Caustic Concentration",
        "unit": "%",
        "normalValue": 2,
        "anomalyValue": 2.5,
        "icon": "icon"
      },
      {
        "id": "s3",
        "name": "Rinse Turbidity",
        "unit": "NTU",
        "normalValue": 5,
        "anomalyValue": 2,
        "icon": "icon"
      },
      {
        "id": "s4",
        "name": "CIP Cycle Time",
        "unit": "min",
        "normalValue": 40,
        "anomalyValue": 65,
        "icon": "icon"
      },
      {
        "id": "s5",
        "name": "CIP Energy",
        "unit": "kWh/cycle",
        "normalValue": 15,
        "anomalyValue": 28,
        "icon": "icon"
      },
      {
        "id": "s6",
        "name": "Cycles Since Swab",
        "unit": "",
        "normalValue": 5,
        "anomalyValue": 5,
        "icon": "icon"
      }
    ],
    "riskMetric": {
      "name": "CIP Waste Index",
      "unit": "%",
      "normalValue": 10,
      "warningThreshold": 22,
      "criticalThreshold": 35,
      "peakValue": 42
    },
    "predictiveAlert": {
      "title": "CIP Running 42% Above Optimal -- Over-Rinsing Detected",
      "message": "Rinse turbidity at 2 NTU -- unit was clean 15 min ago. Caustic overdosed for current soil type. Water consumption 1,700 L above optimal. Total excess cost: $28/cycle.",
      "riskPercent": 42
    },
    "prescriptiveOptions": [
      {
        "rank": 1,
        "label": "Recommended",
        "title": "Turbidity-Based CIP Endpoint",
        "actions": [
          {
            "description": "Implement turbidity-based rinse endpoint (stop at <5 NTU)",
            "parameter": "Rinse Endpoint",
            "from": "fixed 25 min",
            "to": "turbidity <5 NTU"
          },
          {
            "description": "Reduce caustic to appropriate concentration for soil type",
            "parameter": "Caustic Concentration",
            "from": "2.5%",
            "to": "2.0%"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 10
        },
        "costOfAction": 500,
        "costAvoided": 2200,
        "netSavings": 1700,
        "successProbability": 92,
        "tradeoff": "None -- hygiene is verified by turbidity endpoint; no quality risk."
      },
      {
        "rank": 2,
        "label": "Aggressive",
        "title": "Full CIP Optimization",
        "actions": [
          {
            "description": "Turbidity-based rinse endpoint",
            "parameter": "Rinse Endpoint",
            "from": "fixed 25 min",
            "to": "turbidity <5 NTU"
          },
          {
            "description": "Reduce caustic temperature by 5 C (still effective)",
            "parameter": "Caustic Temp",
            "from": "80 °C",
            "to": "75 °C"
          },
          {
            "description": "Optimize pre-rinse based on product type",
            "parameter": "Pre-Rinse",
            "from": "fixed 10 min",
            "to": "product-specific recipe"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 5
        },
        "costOfAction": 1200,
        "costAvoided": 2600,
        "netSavings": 1400,
        "successProbability": 82,
        "tradeoff": "Requires product-specific CIP recipes to be programmed in controller -- one-time setup."
      },
      {
        "rank": 3,
        "label": "Conservative",
        "title": "Cut Final Rinse Duration",
        "actions": [
          {
            "description": "Reduce final rinse by 10 min (turbidity already acceptable)",
            "parameter": "Final Rinse Time",
            "from": "25 min",
            "to": "15 min"
          }
        ],
        "riskReduction": {
          "from": 42,
          "to": 28
        },
        "costOfAction": 100,
        "costAvoided": 1000,
        "netSavings": 900,
        "successProbability": 97,
        "tradeoff": "Modest improvement only; caustic overdosing not addressed."
      }
    ],
    "annualProjection": {
      "incidentsPerYear": 3000,
      "avgCostPerIncident": 20,
      "preventionRate": 0.4,
      "platformCost": 150000,
      "netAnnualSavings": 60000
    },
    "shiftMetrics": {
      "output": "28 CIP cycles",
      "energy": "$3,400",
      "efficiency": "72%"
    }
  }
]
;

export const industries = [...new Set(demoScenarios.map(s => s.industry))];

export function getScenariosByIndustry(industry: string): DemoScenario[] {
  return demoScenarios.filter(s => s.industry === industry);
}
