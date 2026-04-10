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
