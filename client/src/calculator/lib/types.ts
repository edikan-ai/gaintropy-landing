// ─── Core Types ──────────────────────────────────────────────────────────────

export type ProfileId =
  | "steel-long"
  | "steel-flat"
  | "discrete-highmix"
  | "discrete-lowmix"
  | "water"
  | "energy"
  | "chemical"
  | "food";

export interface ProfileMeta {
  id: ProfileId;
  name: string;
  subtitle: string;
}

// ─── Input Field Definitions ─────────────────────────────────────────────────

export interface InputFieldDef {
  key: string;
  label: string;
  hint: string;
  unit: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  /** Format as currency when displaying */
  isCurrency?: boolean;
}

// ─── Value Driver ────────────────────────────────────────────────────────────

export interface ValueDriverResult {
  key: string;
  label: string;
  value: number;
  /** "direct" for cost savings, "efficiency" for efficiency improvements */
  category: "direct" | "efficiency";
}

// ─── Improvement Scenario ────────────────────────────────────────────────────

export interface ImprovementSliderDef {
  key: string;
  label: string;
  hint: string;
  /** Unit label shown next to value, e.g., "%" or "pp" */
  unit: string;
  min: number;
  max: number;
  step: number;
  conservative: number;
  realistic: number;
  aggressive: number;
}

export type ScenarioPreset = "conservative" | "realistic" | "aggressive";

// ─── Profile Definition ─────────────────────────────────────────────────────

export interface ProfileDefinition {
  meta: ProfileMeta;
  operationsInputs: InputFieldDef[];
  improvementSliders: ImprovementSliderDef[];
  /** Compute value drivers from operations inputs + improvement values */
  calculate: (
    ops: Record<string, number>,
    improvements: Record<string, number>,
  ) => ValueDriverResult[];
  /** Keys to include in URL params beyond the standard company context ones */
  urlParamKeys: string[];
}

// ─── Company Context ─────────────────────────────────────────────────────────

export interface CompanyContext {
  annualRevenue: number; // in millions USD
  employees: number;
  sites: number;
  erp: string;
  existingOptimization: "yes" | "no" | "some";
}

// ─── Calculation Output ──────────────────────────────────────────────────────

export interface CalculationResult {
  valueDrivers: ValueDriverResult[];
  totalAnnualSavings: number;
  platformInvestment: number;
  paybackMonths: number;
  threeYearValue: number;
}

// ─── Pricing Bracket ─────────────────────────────────────────────────────────

export interface PricingBracket {
  maxRevenue: number; // upper bound in millions; Infinity for "custom"
  label: string;
  min: number;
  max: number;
  representative: number;
}

export const PRICING_BRACKETS: PricingBracket[] = [
  { maxRevenue: 10, label: "Under $10M revenue", min: 50_000, max: 75_000, representative: 60_000 },
  { maxRevenue: 50, label: "$10M–$50M revenue", min: 75_000, max: 150_000, representative: 110_000 },
  { maxRevenue: 200, label: "$50M–$200M revenue", min: 150_000, max: 350_000, representative: 250_000 },
  { maxRevenue: 1000, label: "$200M–$1B revenue", min: 350_000, max: 750_000, representative: 500_000 },
  { maxRevenue: Infinity, label: "Over $1B revenue", min: 750_000, max: 1_500_000, representative: 1_000_000 },
];

export const ERP_OPTIONS = [
  "SAP",
  "Oracle",
  "Epicor",
  "Microsoft Dynamics",
  "IFS",
  "Other",
  "Don't know",
] as const;
