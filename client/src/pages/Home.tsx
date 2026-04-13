/**
 * GAINTROPY LANDING PAGE - Production Build
 * Philosophy: A door, not a pitch deck. Mystery + recognition + desire.
 * Colors: Obsidian #0A0A0A · Forge Orange #FF4D00 · Algorithmic Cyan #00D4FF · White · Titanium #8A8A8A
 * Type: Space Grotesk (all text) · JetBrains Mono (data only)
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Menu, X, ChevronDown } from "lucide-react";

// ─── ASSETS ───────────────────────────────────────────────────────────────────

const LOGO_URL = "/logo-256.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Steel Manufacturing",
  "Oil & Gas Refining",
  "Cement",
  "Pharmaceutical",
  "Automotive",
  "Mining & Minerals",
  "Chemical Processing",
  "Semiconductor",
  "Food & Beverage",
  "Battery Manufacturing",
  "Glass",
  "Pulp & Paper",
  "Aluminum",
  "Water & Wastewater",
  "Fertilizer & Agrochemical",
  "Textile Manufacturing",
  "Energy & Utilities",
  "Plastics & Rubber",
  "Paint & Coatings",
  "Brewing & Distilling",
  "Copper Smelting",
  "Zinc & Lead Refining",
  "Titanium Processing",
  "Forging & Casting",
  "Wire & Cable Manufacturing",
  "Nuclear Power Generation",
  "Hydrogen Production",
  "Carbon Capture & Storage",
  "LNG Processing",
  "Solar Panel Manufacturing",
  "Specialty Chemicals",
  "Petrochemicals",
  "Adhesives & Sealants",
  "Industrial Gases",
  "Explosives & Propellants",
  "Medical Device Manufacturing",
  "Biorefinery & Biofuels",
  "Aerospace & Defense",
  "Tire & Rubber",
  "Printed Circuit Board Mfg.",
  "Data Center Operations",
  "Cold Chain & Refrigeration",
  "Shipbuilding & Marine",
  "Rail & Transit Operations",
  "Port & Terminal Operations",
  "Grain Milling & Processing",
  "Sugar Refining",
  "Aquaculture",
  "Waste-to-Energy",
  "Desalination",
];

// Industry recovery stats for ticker tooltips
const INDUSTRY_RECOVERY: Record<string, string> = {
  "Steel Manufacturing": "$2.3M",
  "Oil & Gas Refining": "$4.8M",
  "Cement": "$1.8M",
  "Pharmaceutical": "$4.1M",
  "Automotive": "$3.2M",
  "Mining & Minerals": "$2.9M",
  "Chemical Processing": "$3.5M",
  "Semiconductor": "$5.0M",
  "Food & Beverage": "$1.2M",
  "Battery Manufacturing": "$3.8M",
  "Glass": "$1.4M",
  "Pulp & Paper": "$1.6M",
  "Aluminum": "$2.1M",
  "Water & Wastewater": "$0.9M",
  "Fertilizer & Agrochemical": "$2.4M",
  "Textile Manufacturing": "$0.8M",
  "Energy & Utilities": "$4.2M",
  "Plastics & Rubber": "$1.3M",
  "Paint & Coatings": "$1.1M",
  "Brewing & Distilling": "$1.0M",
  "Copper Smelting": "$2.7M",
  "Zinc & Lead Refining": "$2.0M",
  "Titanium Processing": "$3.3M",
  "Forging & Casting": "$1.7M",
  "Wire & Cable Manufacturing": "$1.2M",
  "Nuclear Power Generation": "$4.5M",
  "Hydrogen Production": "$2.8M",
  "Carbon Capture & Storage": "$1.9M",
  "LNG Processing": "$4.3M",
  "Solar Panel Manufacturing": "$2.2M",
  "Specialty Chemicals": "$3.1M",
  "Petrochemicals": "$4.6M",
  "Adhesives & Sealants": "$0.9M",
  "Industrial Gases": "$1.5M",
  "Explosives & Propellants": "$2.0M",
  "Medical Device Manufacturing": "$2.6M",
  "Biorefinery & Biofuels": "$1.8M",
  "Aerospace & Defense": "$3.7M",
  "Tire & Rubber": "$1.9M",
  "Printed Circuit Board Mfg.": "$2.5M",
  "Data Center Operations": "$3.0M",
  "Cold Chain & Refrigeration": "$1.1M",
  "Shipbuilding & Marine": "$2.3M",
  "Rail & Transit Operations": "$1.6M",
  "Port & Terminal Operations": "$1.4M",
  "Grain Milling & Processing": "$0.9M",
  "Sugar Refining": "$1.2M",
  "Aquaculture": "$0.8M",
  "Waste-to-Energy": "$1.3M",
  "Desalination": "$1.7M",
};

// Industry demo scenarios for InteractiveDemo
type Sensor = { name: string; value: string; unit: string; alert?: boolean };
type Prescription = { rank: string; badge: string; badgeColor: string; name: string; savings: string; prob: string };
type IndustryScenario = {
  sensors: Sensor[];
  alertText: string;
  confidence: number;
  prescriptions: Prescription[];
};

const INDUSTRY_SCENARIOS: Record<string, IndustryScenario> = {
  "Steel Manufacturing": {
    sensors: [
      { name: "Zone 3 Temp", value: "1,287", unit: "°C" },
      { name: "Zone 4 Temp", value: "1,341", unit: "°C", alert: true },
      { name: "Slab Speed", value: "4.2", unit: "m/min" },
      { name: "Fuel Flow", value: "892", unit: "Nm³/h", alert: true },
    ],
    alertText: "Reheat furnace Zone 4 temperature deviation. Cobble risk predicted within next 2 hours.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Zone Temperature Rebalance", savings: "+$45,700 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full Thermal Optimization", savings: "+$55,800 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Soak Zone Reduction Only", savings: "+$20,800 / shift", prob: "96%" },
    ],
  },
  "Cement": {
    sensors: [
      { name: "Kiln Shell Temp", value: "312", unit: "°C", alert: true },
      { name: "Feed Rate", value: "148", unit: "t/h" },
      { name: "Rotation Speed", value: "3.6", unit: "rpm" },
      { name: "Clinker Quality", value: "94.1", unit: "LSF", alert: true },
    ],
    alertText: "Kiln shell hot spot detected. Clinker quality deviation predicted within 90 minutes.",
    confidence: 91,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Rotation Speed Optimization", savings: "+$28,400 / shift", prob: "91%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Feed Rate + Speed Rebalance", savings: "+$38,200 / shift", prob: "74%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Cooling Air Increase Only", savings: "+$15,600 / shift", prob: "97%" },
    ],
  },
  "Oil & Gas Refining": {
    sensors: [
      { name: "Column Pressure", value: "2.14", unit: "bar", alert: true },
      { name: "Crude Feed Rate", value: "42,800", unit: "bbl/day" },
      { name: "HEX Fouling Index", value: "0.78", unit: "m²K/W", alert: true },
      { name: "Cut Point Temp", value: "368", unit: "°C" },
    ],
    alertText: "Heat exchanger fouling accelerating. Distillation efficiency loss predicted within 4 hours.",
    confidence: 83,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Feed Rate Rebalance", savings: "+$52,300 / shift", prob: "85%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Emergency HEX Bypass + Cutpoint Adjust", savings: "+$61,700 / shift", prob: "70%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Pressure Hold + Monitor", savings: "+$18,400 / shift", prob: "94%" },
    ],
  },
  "Pharmaceutical": {
    sensors: [
      { name: "Dissolved O₂", value: "42.3", unit: "%sat", alert: true },
      { name: "pH Level", value: "7.18", unit: "pH" },
      { name: "Agitation Speed", value: "180", unit: "rpm" },
      { name: "Temperature", value: "37.1", unit: "°C" },
    ],
    alertText: "Bioreactor dissolved oxygen trending below spec. Contamination risk in next 3 hours.",
    confidence: 94,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Agitation Profile Optimization", savings: "+$41,200 / shift", prob: "93%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "O₂ Sparge + Agitation Increase", savings: "+$47,800 / shift", prob: "78%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Sparge Rate Increase Only", savings: "+$22,500 / shift", prob: "97%" },
    ],
  },
  "Automotive": {
    sensors: [
      { name: "Weld Current", value: "8,420", unit: "A" },
      { name: "Cycle Time", value: "54.8", unit: "sec", alert: true },
      { name: "Paint Oven Temp", value: "182", unit: "°C", alert: true },
      { name: "Line OEE", value: "78.3", unit: "%" },
    ],
    alertText: "Paint oven zone 3 temperature creep detected. Surface adhesion failure predicted within 3 hours.",
    confidence: 86,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Oven Profile Rebalance", savings: "+$27,400 / shift", prob: "87%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Line Speed + Oven Adjustment", savings: "+$35,100 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Zone 3 Setpoint Correction Only", savings: "+$14,200 / shift", prob: "95%" },
    ],
  },
  "Chemical Processing": {
    sensors: [
      { name: "Reactor Temp", value: "184", unit: "°C", alert: true },
      { name: "Cooling Flow", value: "2,840", unit: "L/h" },
      { name: "Catalyst Activity", value: "0.71", unit: "index", alert: true },
      { name: "Conversion Rate", value: "89.3", unit: "%" },
    ],
    alertText: "Reactor exotherm detected. Runaway risk if cooling system unresponsive within 2 hours.",
    confidence: 89,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Catalyst Flow Redistribution", savings: "+$38,900 / shift", prob: "90%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full Cooling + Feed Adjustment", savings: "+$49,100 / shift", prob: "73%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Cooling Rate Increase Only", savings: "+$19,700 / shift", prob: "96%" },
    ],
  },
  "Semiconductor": {
    sensors: [
      { name: "Chamber Pressure", value: "4.2", unit: "mTorr", alert: true },
      { name: "RF Power", value: "1,840", unit: "W" },
      { name: "Etch Rate", value: "312", unit: "nm/min", alert: true },
      { name: "Wafer Temp", value: "28.4", unit: "°C" },
    ],
    alertText: "Etch chamber pressure drift detected. Uniformity failure across 12-inch wafer predicted within 90 minutes.",
    confidence: 93,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Chamber Pressure Rebalance", savings: "+$58,200 / shift", prob: "92%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "RF Power + Pressure Optimization", savings: "+$71,400 / shift", prob: "76%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Pressure Setpoint Correction Only", savings: "+$31,800 / shift", prob: "97%" },
    ],
  },
  "Food & Beverage": {
    sensors: [
      { name: "Pasteurizer Temp", value: "71.2", unit: "°C", alert: true },
      { name: "Flow Rate", value: "18,400", unit: "L/h" },
      { name: "Hold Time", value: "14.8", unit: "sec" },
      { name: "CIP Cycle", value: "4.2", unit: "h since" },
    ],
    alertText: "Pasteurizer temperature deviation detected. Batch quality risk predicted within 45 minutes.",
    confidence: 92,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Heating Curve Optimization", savings: "+$18,700 / shift", prob: "93%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Flow Rate + Temp Rebalance", savings: "+$24,100 / shift", prob: "77%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Flow Reduction Only", savings: "+$11,300 / shift", prob: "97%" },
    ],
  },
  "Battery Manufacturing": {
    sensors: [
      { name: "Electrode Coating", value: "142", unit: "µm", alert: true },
      { name: "Drying Temp", value: "118", unit: "°C" },
      { name: "Calendering Gap", value: "0.182", unit: "mm", alert: true },
      { name: "Moisture Content", value: "48", unit: "ppm" },
    ],
    alertText: "Electrode coating thickness deviation. Cell capacity loss of 4.2% predicted in next production lot.",
    confidence: 90,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Calendering Gap Correction", savings: "+$43,600 / shift", prob: "91%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Coating Weight + Gap Rebalance", savings: "+$54,200 / shift", prob: "74%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Drying Temp Adjustment Only", savings: "+$22,400 / shift", prob: "96%" },
    ],
  },
  "Glass": {
    sensors: [
      { name: "Crown Temp", value: "1,489", unit: "°C", alert: true },
      { name: "Pull Rate", value: "312", unit: "t/day" },
      { name: "Redox Index", value: "0.23", unit: "index" },
      { name: "Batch Moisture", value: "3.8", unit: "%", alert: true },
    ],
    alertText: "Furnace crown temperature variance. Glass cord defect risk predicted within 3 hours.",
    confidence: 84,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Pull Rate Optimization", savings: "+$29,600 / shift", prob: "85%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full Crown + Pull Rebalance", savings: "+$37,200 / shift", prob: "70%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Batch Moisture Correction Only", savings: "+$15,800 / shift", prob: "95%" },
    ],
  },
  "Pulp & Paper": {
    sensors: [
      { name: "Kappa Number", value: "28.4", unit: "κ", alert: true },
      { name: "Digester Pressure", value: "7.8", unit: "bar" },
      { name: "Cook Time", value: "142", unit: "min" },
      { name: "Liquor Ratio", value: "4.1", unit: "L/kg" },
    ],
    alertText: "Digester Kappa number drifting. Bleach chemical overconsumption predicted within 2 hours.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Wash Ratio Optimization", savings: "+$22,900 / shift", prob: "89%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Cook Time + Chemical Rebalance", savings: "+$31,500 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Liquor Ratio Adjustment Only", savings: "+$13,800 / shift", prob: "96%" },
    ],
  },
  "Aluminum": {
    sensors: [
      { name: "Pot Cell Voltage", value: "4.31", unit: "V", alert: true },
      { name: "Current Efficiency", value: "92.4", unit: "%" },
      { name: "Bath Temperature", value: "961", unit: "°C" },
      { name: "AlF₃ Conc.", value: "10.2", unit: "%" },
    ],
    alertText: "Anode effect predicted in pot cell 14B. Voltage instability developing over next 90 minutes.",
    confidence: 86,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Amperage Rebalance", savings: "+$31,400 / shift", prob: "87%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Amperage + AlF₃ Adjustment", savings: "+$39,800 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Beam Raise Only", savings: "+$16,200 / shift", prob: "95%" },
    ],
  },
  "Water & Wastewater": {
    sensors: [
      { name: "Influent Flow", value: "48,200", unit: "m³/day" },
      { name: "DO Level", value: "1.4", unit: "mg/L", alert: true },
      { name: "Aeration Energy", value: "3.8", unit: "kWh/m³", alert: true },
      { name: "Effluent BOD", value: "8.2", unit: "mg/L" },
    ],
    alertText: "Aeration basin dissolved oxygen deficit. Effluent compliance breach predicted within 4 hours.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Blower Duty Cycle Optimization", savings: "+$12,400 / shift", prob: "90%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "DO Setpoint + Flow Rebalance", savings: "+$16,800 / shift", prob: "74%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Aeration Rate Increase Only", savings: "+$7,200 / shift", prob: "97%" },
    ],
  },
  "Fertilizer & Agrochemical": {
    sensors: [
      { name: "Reactor Pressure", value: "218", unit: "bar", alert: true },
      { name: "Synthesis Temp", value: "487", unit: "°C" },
      { name: "H₂/N₂ Ratio", value: "2.84", unit: "mol/mol", alert: true },
      { name: "Conversion Rate", value: "14.2", unit: "%" },
    ],
    alertText: "Ammonia synthesis loop pressure deviation. Catalyst bed efficiency loss predicted within 3 hours.",
    confidence: 85,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Feed Ratio Optimization", savings: "+$29,800 / shift", prob: "86%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Pressure + Ratio Rebalance", savings: "+$38,400 / shift", prob: "70%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "H₂ Feed Rate Correction Only", savings: "+$16,100 / shift", prob: "95%" },
    ],
  },
  "Textile Manufacturing": {
    sensors: [
      { name: "Dyebath Temp", value: "94.6", unit: "°C", alert: true },
      { name: "Tension", value: "142", unit: "cN/tex" },
      { name: "pH Level", value: "5.2", unit: "pH", alert: true },
      { name: "Liquor Ratio", value: "1:8.4", unit: "ratio" },
    ],
    alertText: "Dyebath temperature uniformity failure. Shade variation across lot predicted within 2 hours.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Heating Profile Correction", savings: "+$14,200 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + pH Simultaneous Rebalance", savings: "+$19,400 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Ramp Rate Reduction Only", savings: "+$8,600 / shift", prob: "96%" },
    ],
  },
  "Energy & Utilities": {
    sensors: [
      { name: "Steam Pressure", value: "168", unit: "bar", alert: true },
      { name: "Turbine Speed", value: "3,008", unit: "rpm" },
      { name: "Heat Rate", value: "9,840", unit: "BTU/kWh", alert: true },
      { name: "Condenser Vac.", value: "28.4", unit: "inHg" },
    ],
    alertText: "Boiler heat rate deviation detected. Fuel efficiency loss of 3.2% predicted within 2 hours.",
    confidence: 90,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Combustion Optimization", savings: "+$38,700 / shift", prob: "91%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Steam Pressure + Air/Fuel Rebalance", savings: "+$49,200 / shift", prob: "73%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Excess Air Reduction Only", savings: "+$21,400 / shift", prob: "96%" },
    ],
  },
  "Plastics & Rubber": {
    sensors: [
      { name: "Melt Temp", value: "228", unit: "°C", alert: true },
      { name: "Screw Speed", value: "84", unit: "rpm" },
      { name: "Back Pressure", value: "62", unit: "bar", alert: true },
      { name: "Cycle Time", value: "38.4", unit: "sec" },
    ],
    alertText: "Extruder melt temperature instability. Dimensional tolerance breach predicted within 90 minutes.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Melt Zone Profile Rebalance", savings: "+$18,400 / shift", prob: "89%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Screw Speed + Back Pressure Optimization", savings: "+$24,700 / shift", prob: "73%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Zone 3 Temp Correction Only", savings: "+$10,800 / shift", prob: "96%" },
    ],
  },
  "Paint & Coatings": {
    sensors: [
      { name: "Dispersion Temp", value: "48.2", unit: "°C", alert: true },
      { name: "Viscosity", value: "4,820", unit: "cP", alert: true },
      { name: "Grind Fineness", value: "18", unit: "µm" },
      { name: "Pigment Load", value: "42.8", unit: "%" },
    ],
    alertText: "Batch viscosity drift detected. Color strength deviation in final product predicted within 2 hours.",
    confidence: 85,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Dispersion Profile Optimization", savings: "+$11,800 / shift", prob: "86%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Pigment Ratio Rebalance", savings: "+$15,600 / shift", prob: "70%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Viscosity Correction Only", savings: "+$7,200 / shift", prob: "95%" },
    ],
  },
  "Brewing & Distilling": {
    sensors: [
      { name: "Fermentation Temp", value: "18.8", unit: "°C", alert: true },
      { name: "CO₂ Evolution", value: "2.4", unit: "g/L/h", alert: true },
      { name: "Gravity", value: "1.042", unit: "SG" },
      { name: "pH Level", value: "4.18", unit: "pH" },
    ],
    alertText: "Fermentation temperature excursion detected. Off-flavor compound formation predicted within 4 hours.",
    confidence: 91,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Cooling Jacket Profile Adjustment", savings: "+$16,200 / shift", prob: "92%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Yeast Pitch Correction", savings: "+$21,400 / shift", prob: "75%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Coolant Flow Rate Increase Only", savings: "+$9,800 / shift", prob: "97%" },
    ],
  },
  "Copper Smelting": {
    sensors: [
      { name: "Converter Temp", value: "1,218", unit: "°C", alert: true },
      { name: "Blister Cu Purity", value: "98.4", unit: "%" },
      { name: "O₂ Enrichment", value: "34.2", unit: "%", alert: true },
      { name: "Slag Temp", value: "1,142", unit: "°C" },
    ],
    alertText: "Converter oxygen enrichment deviation. Blister copper purity loss predicted within next blow cycle.",
    confidence: 84,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "O₂ Enrichment Rebalance", savings: "+$34,200 / shift", prob: "85%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Blow Rate + Enrichment Optimization", savings: "+$43,800 / shift", prob: "69%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Flux Addition Adjustment Only", savings: "+$18,600 / shift", prob: "94%" },
    ],
  },
  "Zinc & Lead Refining": {
    sensors: [
      { name: "Electrolyte Temp", value: "38.4", unit: "°C", alert: true },
      { name: "Current Density", value: "482", unit: "A/m²" },
      { name: "Acid Conc.", value: "142", unit: "g/L", alert: true },
      { name: "Cell Voltage", value: "3.42", unit: "V" },
    ],
    alertText: "Electrolyte temperature rise in tank house section C. Cathode efficiency loss predicted within 3 hours.",
    confidence: 86,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Cooling Circuit Rebalance", savings: "+$22,400 / shift", prob: "87%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Current Density + Acid Optimization", savings: "+$29,800 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Electrolyte Flow Rate Increase Only", savings: "+$12,600 / shift", prob: "95%" },
    ],
  },
  "Titanium Processing": {
    sensors: [
      { name: "Reduction Temp", value: "862", unit: "°C", alert: true },
      { name: "Mg Feed Rate", value: "4.82", unit: "kg/min" },
      { name: "Inert Gas Flow", value: "142", unit: "L/min", alert: true },
      { name: "Sponge Purity", value: "99.4", unit: "%" },
    ],
    alertText: "Kroll reactor temperature deviation. Sponge oxygen contamination predicted if uncorrected within 2 hours.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Argon Purge Profile Optimization", savings: "+$48,200 / shift", prob: "89%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Mg Feed Rebalance", savings: "+$61,400 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Inert Gas Flow Increase Only", savings: "+$26,800 / shift", prob: "96%" },
    ],
  },
  "Forging & Casting": {
    sensors: [
      { name: "Furnace Temp", value: "1,184", unit: "°C", alert: true },
      { name: "Soak Time", value: "48", unit: "min" },
      { name: "Press Tonnage", value: "8,200", unit: "t", alert: true },
      { name: "Die Temp", value: "284", unit: "°C" },
    ],
    alertText: "Billet soak temperature nonuniformity. Grain structure defect in forged part predicted in next 3 heats.",
    confidence: 83,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Furnace Zone Equalization", savings: "+$24,800 / shift", prob: "84%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Soak Time + Press Force Rebalance", savings: "+$32,400 / shift", prob: "68%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Extended Soak Only", savings: "+$13,400 / shift", prob: "93%" },
    ],
  },
  "Wire & Cable Manufacturing": {
    sensors: [
      { name: "Draw Speed", value: "18.4", unit: "m/s" },
      { name: "Die Temp", value: "84", unit: "°C", alert: true },
      { name: "Tension", value: "284", unit: "N", alert: true },
      { name: "Diameter Variance", value: "±0.018", unit: "mm" },
    ],
    alertText: "Drawing die thermal buildup detected. Wire diameter tolerance breach predicted within 2 hours.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Draw Speed + Cooling Optimization", savings: "+$16,800 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full Pass Schedule Rebalance", savings: "+$22,400 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Coolant Flow Rate Increase Only", savings: "+$9,400 / shift", prob: "96%" },
    ],
  },
  "Nuclear Power Generation": {
    sensors: [
      { name: "Core Temp", value: "318", unit: "°C" },
      { name: "Neutron Flux", value: "3.42e13", unit: "n/cm²/s", alert: true },
      { name: "Coolant Flow", value: "42,800", unit: "kg/s" },
      { name: "Steam Generator dT", value: "4.8", unit: "°C", alert: true },
    ],
    alertText: "Steam generator delta-T asymmetry detected. Secondary loop efficiency loss predicted within 6 hours.",
    confidence: 92,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Feedwater Flow Rebalance", savings: "+$64,200 / shift", prob: "93%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Power Level + Coolant Optimization", savings: "+$78,400 / shift", prob: "76%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Secondary Pump Speed Correction Only", savings: "+$34,800 / shift", prob: "98%" },
    ],
  },
  "Hydrogen Production": {
    sensors: [
      { name: "Reformer Temp", value: "842", unit: "°C", alert: true },
      { name: "Steam/Carbon Ratio", value: "2.84", unit: "mol/mol", alert: true },
      { name: "H₂ Purity", value: "99.2", unit: "%" },
      { name: "Pressure Drop", value: "1.84", unit: "bar" },
    ],
    alertText: "Steam methane reformer coking risk. Catalyst deactivation predicted within 4 hours if uncorrected.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Steam/Carbon Ratio Correction", savings: "+$31,400 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Feed Ratio Rebalance", savings: "+$40,200 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Steam Flow Increase Only", savings: "+$17,600 / shift", prob: "95%" },
    ],
  },
  "Carbon Capture & Storage": {
    sensors: [
      { name: "Absorber Temp", value: "48.4", unit: "°C", alert: true },
      { name: "Amine Loading", value: "0.48", unit: "mol CO₂/mol" },
      { name: "Stripper Pressure", value: "1.84", unit: "bar", alert: true },
      { name: "Capture Rate", value: "87.2", unit: "%" },
    ],
    alertText: "Absorber temperature rise detected. Amine degradation accelerating, capture rate loss predicted within 6 hours.",
    confidence: 83,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Lean Amine Flow Optimization", savings: "+$18,400 / shift", prob: "84%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Stripper + Absorber Rebalance", savings: "+$24,800 / shift", prob: "69%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Cooling Water Rate Increase Only", savings: "+$10,200 / shift", prob: "94%" },
    ],
  },
  "LNG Processing": {
    sensors: [
      { name: "Main HEX Temp", value: "-158", unit: "°C", alert: true },
      { name: "Compressor Load", value: "94.8", unit: "%", alert: true },
      { name: "Feed Gas Flow", value: "184,200", unit: "Sm³/h" },
      { name: "LNG Density", value: "442", unit: "kg/m³" },
    ],
    alertText: "Main cryogenic heat exchanger warm end approach narrowing. Compressor surge risk within 3 hours.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Refrigerant Circuit Rebalance", savings: "+$58,400 / shift", prob: "89%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Feed Throughput + HEX Optimization", savings: "+$74,200 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Compressor Load Reduction Only", savings: "+$31,600 / shift", prob: "96%" },
    ],
  },
  "Solar Panel Manufacturing": {
    sensors: [
      { name: "Furnace Temp", value: "842", unit: "°C", alert: true },
      { name: "Deposition Rate", value: "18.4", unit: "nm/s" },
      { name: "Carrier Gas Flow", value: "4,820", unit: "sccm", alert: true },
      { name: "Cell Efficiency", value: "21.4", unit: "%" },
    ],
    alertText: "PECVD chamber deposition rate drift. Anti-reflection coating non-uniformity predicted in next 200 wafers.",
    confidence: 89,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Gas Flow Profile Rebalance", savings: "+$24,800 / shift", prob: "90%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "RF Power + Gas Ratio Optimization", savings: "+$32,400 / shift", prob: "74%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Carrier Gas Flow Correction Only", savings: "+$14,200 / shift", prob: "96%" },
    ],
  },
  "Specialty Chemicals": {
    sensors: [
      { name: "Batch Temp", value: "142", unit: "°C", alert: true },
      { name: "Reflux Ratio", value: "3.84", unit: "ratio" },
      { name: "Reaction Yield", value: "87.4", unit: "%", alert: true },
      { name: "Impurity Level", value: "0.48", unit: "%" },
    ],
    alertText: "Batch reaction yield deviation detected. Impurity spec breach predicted in current production run.",
    confidence: 86,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Temperature Profile Optimization", savings: "+$34,200 / shift", prob: "87%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Reflux + Temp Simultaneous Rebalance", savings: "+$44,800 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Reflux Ratio Increase Only", savings: "+$18,600 / shift", prob: "95%" },
    ],
  },
  "Petrochemicals": {
    sensors: [
      { name: "Cracker Temp", value: "848", unit: "°C", alert: true },
      { name: "Steam Dilution", value: "0.42", unit: "kg/kg", alert: true },
      { name: "Ethylene Yield", value: "28.4", unit: "wt%" },
      { name: "Coil Outlet Pres.", value: "1.84", unit: "bar g" },
    ],
    alertText: "Ethylene cracker coil fouling accelerating. Ethylene yield loss of 2.1% predicted within 4 hours.",
    confidence: 85,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Steam Dilution Ratio Optimization", savings: "+$48,200 / shift", prob: "86%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Coil Temp + Dilution Rebalance", savings: "+$61,400 / shift", prob: "70%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Decoking Cycle Advance Only", savings: "+$26,800 / shift", prob: "94%" },
    ],
  },
  "Adhesives & Sealants": {
    sensors: [
      { name: "Reactor Temp", value: "84.2", unit: "°C", alert: true },
      { name: "Viscosity", value: "28,400", unit: "cP", alert: true },
      { name: "Initiator Feed", value: "0.84", unit: "wt%" },
      { name: "Monomer Conv.", value: "92.4", unit: "%" },
    ],
    alertText: "Polymerization reactor viscosity runaway detected. Gel formation predicted within 90 minutes.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Cooling + Initiator Feed Correction", savings: "+$14,200 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Chain Transfer Rebalance", savings: "+$19,400 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Reactor Temp Reduction Only", savings: "+$8,600 / shift", prob: "96%" },
    ],
  },
  "Industrial Gases": {
    sensors: [
      { name: "Column Pressure", value: "5.84", unit: "bar", alert: true },
      { name: "O₂ Purity", value: "99.4", unit: "%" },
      { name: "Compressor kW", value: "4,820", unit: "kW", alert: true },
      { name: "N₂ Recovery", value: "94.2", unit: "%" },
    ],
    alertText: "Air separation unit column pressure deviation. O₂ purity drop below spec predicted within 2 hours.",
    confidence: 90,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Column Reflux Optimization", savings: "+$22,400 / shift", prob: "91%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Pressure + Reflux Simultaneous Rebalance", savings: "+$29,800 / shift", prob: "74%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Feed Air Flow Reduction Only", savings: "+$12,600 / shift", prob: "97%" },
    ],
  },
  "Explosives & Propellants": {
    sensors: [
      { name: "Mix Temp", value: "28.4", unit: "°C", alert: true },
      { name: "Batch Density", value: "1.642", unit: "g/cm³", alert: true },
      { name: "Cure Time", value: "184", unit: "min" },
      { name: "Moisture", value: "0.18", unit: "wt%" },
    ],
    alertText: "Propellant mix temperature excursion detected. Batch density variance outside acceptance limits predicted.",
    confidence: 92,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Mixer Cooling Profile Correction", savings: "+$18,400 / shift", prob: "93%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Binder Ratio Rebalance", savings: "+$24,200 / shift", prob: "77%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Mix Speed Reduction Only", savings: "+$10,800 / shift", prob: "98%" },
    ],
  },
  "Medical Device Manufacturing": {
    sensors: [
      { name: "Clean Room dP", value: "12.4", unit: "Pa", alert: true },
      { name: "Particle Count", value: "2,840", unit: "/m³ ≥0.5µm", alert: true },
      { name: "Humidity", value: "48.2", unit: "%" },
      { name: "Sterilizer Temp", value: "121.4", unit: "°C" },
    ],
    alertText: "Clean room differential pressure drop detected. ISO Class 7 breach predicted within 90 minutes.",
    confidence: 94,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "HEPA Filter Bypass Correction", savings: "+$28,400 / shift", prob: "95%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "HVAC + dP Simultaneous Rebalance", savings: "+$36,800 / shift", prob: "79%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Supply Air Volume Increase Only", savings: "+$16,200 / shift", prob: "98%" },
    ],
  },
  "Biorefinery & Biofuels": {
    sensors: [
      { name: "Hydrolysis Temp", value: "48.4", unit: "°C", alert: true },
      { name: "Enzyme Loading", value: "18.4", unit: "mg/g biomass", alert: true },
      { name: "Glucose Conc.", value: "48.2", unit: "g/L" },
      { name: "Ethanol Yield", value: "84.2", unit: "% theoretical" },
    ],
    alertText: "Enzymatic hydrolysis rate declining. Glucose yield loss of 8.4% predicted within 4 hours.",
    confidence: 84,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "pH + Enzyme Loading Optimization", savings: "+$18,200 / shift", prob: "85%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Enzyme + Retention Rebalance", savings: "+$24,600 / shift", prob: "69%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Temperature Setpoint Correction Only", savings: "+$10,400 / shift", prob: "93%" },
    ],
  },
  "Aerospace & Defense": {
    sensors: [
      { name: "Autoclave Temp", value: "182", unit: "°C", alert: true },
      { name: "Cure Pressure", value: "6.84", unit: "bar", alert: true },
      { name: "Vacuum Level", value: "28.4", unit: "inHg" },
      { name: "Lay-up Thickness", value: "4.82", unit: "mm" },
    ],
    alertText: "Composite autoclave cure temperature nonuniformity. Void content above spec predicted in this cure cycle.",
    confidence: 91,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Cure Cycle Profile Correction", savings: "+$48,400 / shift", prob: "92%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Pressure Ramp Rebalance", savings: "+$62,800 / shift", prob: "75%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Dwell Time Extension Only", savings: "+$26,400 / shift", prob: "97%" },
    ],
  },
  "Tire & Rubber": {
    sensors: [
      { name: "Mixer Temp", value: "164", unit: "°C", alert: true },
      { name: "Dump Temp", value: "142", unit: "°C" },
      { name: "Rotor Speed", value: "48", unit: "rpm", alert: true },
      { name: "Energy Input", value: "0.42", unit: "kWh/kg" },
    ],
    alertText: "Banbury mixer temperature overshoot detected. Compound scorch predicted before end of mixing cycle.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Rotor Speed Profile Rebalance", savings: "+$21,400 / shift", prob: "89%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Speed + Ram Pressure Optimization", savings: "+$28,600 / shift", prob: "73%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Dump Temp Reduction Only", savings: "+$12,200 / shift", prob: "96%" },
    ],
  },
  "Printed Circuit Board Mfg.": {
    sensors: [
      { name: "Reflow Peak Temp", value: "248", unit: "°C", alert: true },
      { name: "Conveyor Speed", value: "0.84", unit: "m/min" },
      { name: "O₂ Level", value: "842", unit: "ppm", alert: true },
      { name: "Solder Joint Yield", value: "99.2", unit: "%" },
    ],
    alertText: "Reflow oven peak temperature deviation. Solder joint voiding above IPC Class 3 limit predicted.",
    confidence: 90,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Zone Temperature Profile Correction", savings: "+$18,400 / shift", prob: "91%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Speed + N₂ Atmosphere Rebalance", savings: "+$24,200 / shift", prob: "75%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Peak Zone Setpoint Reduction Only", savings: "+$10,800 / shift", prob: "97%" },
    ],
  },
  "Data Center Operations": {
    sensors: [
      { name: "PUE", value: "1.48", unit: "ratio", alert: true },
      { name: "CRAC Outlet Temp", value: "18.4", unit: "°C", alert: true },
      { name: "Hot Aisle Temp", value: "38.2", unit: "°C" },
      { name: "Server Inlet Temp", value: "24.8", unit: "°C" },
    ],
    alertText: "PUE efficiency degradation detected. Cooling system recirculation failure predicted within 2 hours.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "CRAC Airflow Rebalance", savings: "+$14,800 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Hot/Cold Aisle Containment + Fan Optimization", savings: "+$20,400 / shift", prob: "73%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Supply Temp Setpoint Correction Only", savings: "+$8,600 / shift", prob: "95%" },
    ],
  },
  "Cold Chain & Refrigeration": {
    sensors: [
      { name: "Storage Temp", value: "-18.4", unit: "°C", alert: true },
      { name: "Compressor kW", value: "284", unit: "kW", alert: true },
      { name: "Suction Pressure", value: "2.84", unit: "bar g" },
      { name: "Discharge Temp", value: "84.2", unit: "°C" },
    ],
    alertText: "Cold storage temperature creep detected. Product integrity breach threshold predicted within 3 hours.",
    confidence: 92,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Compressor Cycling Optimization", savings: "+$12,400 / shift", prob: "93%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Refrigerant Charge + Cycle Rebalance", savings: "+$16,800 / shift", prob: "77%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Setpoint Correction Only", savings: "+$7,200 / shift", prob: "97%" },
    ],
  },
  "Shipbuilding & Marine": {
    sensors: [
      { name: "Weld Heat Input", value: "1,842", unit: "J/mm", alert: true },
      { name: "Preheat Temp", value: "84", unit: "°C", alert: true },
      { name: "Interpass Temp", value: "248", unit: "°C" },
      { name: "NDT Reject Rate", value: "2.8", unit: "%" },
    ],
    alertText: "Weld heat input deviation on hull plate section 7. Hydrogen cracking risk predicted in next 12 hours.",
    confidence: 83,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Preheat + Travel Speed Rebalance", savings: "+$28,400 / shift", prob: "84%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full WPS Parameter Optimization", savings: "+$37,200 / shift", prob: "68%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Preheat Temperature Increase Only", savings: "+$15,600 / shift", prob: "93%" },
    ],
  },
  "Rail & Transit Operations": {
    sensors: [
      { name: "Traction Motor Temp", value: "142", unit: "°C", alert: true },
      { name: "Wheel Slip", value: "4.8", unit: "%", alert: true },
      { name: "Brake Disc Temp", value: "284", unit: "°C" },
      { name: "Energy/km", value: "18.4", unit: "kWh/km" },
    ],
    alertText: "Traction motor thermal buildup on unit 4B. Wheel flat risk predicted before end of service cycle.",
    confidence: 86,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Traction Control Profile Adjustment", savings: "+$18,400 / shift", prob: "87%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Speed + Regenerative Braking Rebalance", savings: "+$24,800 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Motor Load Reduction Only", savings: "+$10,200 / shift", prob: "95%" },
    ],
  },
  "Port & Terminal Operations": {
    sensors: [
      { name: "Crane Cycle Time", value: "84", unit: "sec", alert: true },
      { name: "Berth Utilization", value: "94.2", unit: "%", alert: true },
      { name: "Fuel Consumption", value: "48.4", unit: "L/hr" },
      { name: "Moves/hr", value: "24", unit: "TEU/hr" },
    ],
    alertText: "Berth utilization bottleneck developing. Vessel turnaround time breach predicted within 4 hours.",
    confidence: 82,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Crane Sequencing Rebalance", savings: "+$18,400 / shift", prob: "83%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full Yard + Crane Schedule Optimization", savings: "+$24,800 / shift", prob: "67%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Vessel Priority Adjustment Only", savings: "+$10,200 / shift", prob: "93%" },
    ],
  },
  "Grain Milling & Processing": {
    sensors: [
      { name: "Roller Gap", value: "0.284", unit: "mm", alert: true },
      { name: "Flour Moisture", value: "14.8", unit: "%", alert: true },
      { name: "Extraction Rate", value: "74.2", unit: "%" },
      { name: "Ash Content", value: "0.48", unit: "%" },
    ],
    alertText: "Roller mill gap drift detected. Flour ash content above grade specification predicted within 2 hours.",
    confidence: 88,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Roller Gap Profile Correction", savings: "+$12,400 / shift", prob: "89%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Moisture + Gap Simultaneous Rebalance", savings: "+$16,800 / shift", prob: "73%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Feed Moisture Conditioning Only", savings: "+$7,200 / shift", prob: "96%" },
    ],
  },
  "Sugar Refining": {
    sensors: [
      { name: "Evaporator Temp", value: "74.2", unit: "°C", alert: true },
      { name: "Brix Level", value: "64.8", unit: "°Bx", alert: true },
      { name: "Crystal Size", value: "0.84", unit: "mm" },
      { name: "Centrifuge Speed", value: "1,840", unit: "rpm" },
    ],
    alertText: "Evaporator Brix deviation detected. Crystal size distribution outside spec predicted in next strike.",
    confidence: 87,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Evaporation Rate Optimization", savings: "+$14,200 / shift", prob: "88%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Temp + Massecuite Seeding Rebalance", savings: "+$19,600 / shift", prob: "72%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Brix Setpoint Correction Only", savings: "+$8,400 / shift", prob: "96%" },
    ],
  },
  "Aquaculture": {
    sensors: [
      { name: "Dissolved O₂", value: "6.2", unit: "mg/L", alert: true },
      { name: "Water Temp", value: "18.4", unit: "°C" },
      { name: "NH₃ Level", value: "0.042", unit: "mg/L", alert: true },
      { name: "Feed Conv. Ratio", value: "1.48", unit: "FCR" },
    ],
    alertText: "Dissolved oxygen deficit in tank 6 detected. Mass mortality event risk predicted within 2 hours.",
    confidence: 91,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Aeration + Stocking Density Rebalance", savings: "+$18,400 / shift", prob: "92%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "O₂ Injection + Water Exchange", savings: "+$24,200 / shift", prob: "77%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Aeration Rate Increase Only", savings: "+$10,800 / shift", prob: "97%" },
    ],
  },
  "Waste-to-Energy": {
    sensors: [
      { name: "Combustion Temp", value: "848", unit: "°C", alert: true },
      { name: "Steam Output", value: "42.8", unit: "t/h" },
      { name: "O₂ in Flue Gas", value: "8.4", unit: "%", alert: true },
      { name: "NOx Emissions", value: "184", unit: "mg/Nm³" },
    ],
    alertText: "Combustion chamber temperature drop detected. CO breakthrough and NOx limit breach predicted within 3 hours.",
    confidence: 85,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Primary Air Distribution Rebalance", savings: "+$16,800 / shift", prob: "86%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Grate Speed + Air Ratio Optimization", savings: "+$22,400 / shift", prob: "70%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Secondary Air Increase Only", savings: "+$9,600 / shift", prob: "94%" },
    ],
  },
  "Desalination": {
    sensors: [
      { name: "Feed Pressure", value: "68.4", unit: "bar", alert: true },
      { name: "Permeate Flow", value: "4,820", unit: "m³/day" },
      { name: "Salt Rejection", value: "99.4", unit: "%" },
      { name: "SEC", value: "3.84", unit: "kWh/m³", alert: true },
    ],
    alertText: "RO membrane feed pressure rise detected. Biofouling reducing permeability, energy spike predicted within 6 hours.",
    confidence: 86,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Chemical Dosing Profile Optimization", savings: "+$12,400 / shift", prob: "87%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "CIP + Pressure Rebalance", savings: "+$17,200 / shift", prob: "71%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Antiscalant Dose Increase Only", savings: "+$7,400 / shift", prob: "95%" },
    ],
  },
  "Mining & Minerals": {
    sensors: [
      { name: "SAG Mill Power", value: "14,280", unit: "kW", alert: true },
      { name: "Feed Rate", value: "2,840", unit: "t/h" },
      { name: "Mill Speed", value: "74.2", unit: "% critical" },
      { name: "Liner Wear Index", value: "0.68", unit: "index", alert: true },
    ],
    alertText: "SAG mill power draw anomaly. Liner wear accelerating, throughput loss predicted within 4 hours.",
    confidence: 82,
    prescriptions: [
      { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Feed Rate Optimization", savings: "+$34,800 / shift", prob: "83%" },
      { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Speed + Feed Rebalance", savings: "+$43,200 / shift", prob: "68%" },
      { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Mill Speed Reduction Only", savings: "+$18,400 / shift", prob: "94%" },
    ],
  },
};

const GENERIC_SCENARIO: IndustryScenario = {
  sensors: [
    { name: "Process Temperature", value: "428", unit: "°F", alert: true },
    { name: "Flow Rate", value: "142", unit: "gpm" },
    { name: "Pressure", value: "87", unit: "psi", alert: true },
    { name: "Energy Rate", value: "2.4", unit: "MMBtu/hr" },
  ],
  alertText: "Process deviation detected. Model predicts 84% probability of quality event within 2 hours.",
  confidence: 84,
  prescriptions: [
    { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Parameter Correction", savings: "+$28,000 / shift", prob: "86%" },
    { rank: "02", badge: "Balanced", badgeColor: "#FF9500", name: "Load Reduction", savings: "+$18,000 / shift", prob: "79%" },
    { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Enhanced Monitoring", savings: "+$8,000 / shift", prob: "94%" },
  ],
};

// ─── MONEY COUNTER ────────────────────────────────────────────────────────────

function MoneyCounter() {
  const [amount, setAmount] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem("moneyCounterDismissed") === "true"; } catch { return false; }
  });
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (dismissed) return;
    const rate = 13.889; // $50,000/hr across facilities = $13.889/sec
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      setAmount(elapsed * rate);
    }, 80);
    return () => clearInterval(interval);
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem("moneyCounterDismissed", "true"); } catch {}
  };

  if (dismissed) return null;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 px-4 py-1.5"
      style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <p
        className="text-xs text-center"
        style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Space Grotesk, sans-serif" }}
      >
        Since you opened this page, the average mid-market plant has wasted{" "}
        <span
          style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace", fontWeight: 500 }}
        >
          {formatted}
        </span>{" "}
        in unoptimized operations.
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="ml-2 flex-shrink-0 transition-opacity hover:opacity-100"
        style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-500"
      style={{
        top: "28px", // offset for money counter bar
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src={LOGO_URL}
            alt="Gaintropy"
            width={32}
            height={32}
            className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className="font-display font-bold text-base tracking-tight"
            style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Gaintropy
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => document.getElementById("access")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Space Grotesk, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            Request a walkthrough
          </button>
          <button
            onClick={() => document.getElementById("access")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Request Access
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: "rgba(255,255,255,0.7)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-5 flex flex-col gap-4"
            style={{ background: "rgba(10,10,10,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              className="text-sm py-2 text-left"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif" }}
              onClick={() => {
                setMobileOpen(false);
                document.getElementById("access")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request a walkthrough
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                document.getElementById("access")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="py-3 text-sm font-semibold rounded-sm"
              style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Request Access
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background hero video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.95 }}
      >
        <source src={isMobile ? "/hero-mobile.mp4" : "/hero-desktop.mp4"} type="video/mp4" />
      </video>

      {/* Subtle gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.15) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2 mb-10"
        >
          <div className="w-1 h-1 rounded-full" style={{ background: "#FF4D00" }} />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Prescriptive Operations Intelligence
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display font-black leading-[0.95] mb-8"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
          }}
        >
          We turn
          <br />
          industrial{" "}
          <span style={{ color: "#FF4D00" }}>entropy</span>
          <br />
          into operational
          <br />
          <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.6)", color: "transparent" }}>
            gain.
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-lg max-w-lg leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Space Grotesk, sans-serif" }}
        >
          Every industrial plant is burning money it cannot see.
          <br />
          <span style={{ color: "rgba(255,255,255,0.75)" }}>
            Gaintropy shows you exactly where. And exactly what to do about it.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => document.getElementById("access")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Request Access <ArrowRight size={15} />
          </button>
          <button
            onClick={() => document.getElementById("access")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Space Grotesk, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            Request a live walkthrough
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

// ─── THE MOMENT ───────────────────────────────────────────────────────────────

function TheMoment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-40"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
          >
            The difference
          </p>
          <h2
            className="font-display font-black leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontFamily: "Space Grotesk, sans-serif",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            This is where every other
            <br />
            platform{" "}
            <span style={{ color: "rgba(255,255,255,0.25)" }}>stops.</span>
          </h2>
        </motion.div>

        {/* Two-panel story */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {/* Panel 1: Every other platform */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-10 flex flex-col"
            style={{ background: "#0A0A0A" }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Every other platform
            </div>

            <div
              className="p-5 rounded-sm mb-6 flex-1"
              style={{ background: "rgba(255,77,0,0.06)", border: "1px solid rgba(255,77,0,0.2)" }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span style={{ color: "#FF4D00", fontSize: "16px", marginTop: "2px" }}>⚠</span>
                <div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: "#FF4D00", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Excess Energy Consumption Detected
                  </div>
                  <div
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Furnace operating 27% above optimal. Estimated excess cost:{" "}
                    <span
                      className="font-bold"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "#FF4D00" }}
                    >
                      $4,200/hr
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="text-xs italic" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}>
                  . . .
                </div>
                <div className="text-xs mt-2 italic" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}>
                  No recommended action.
                </div>
              </div>
            </div>

            <div
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk, sans-serif" }}
            >
              The operator sees the number. The clock runs. The decision, made under pressure, without guidance, is where the money is lost.
            </div>
          </motion.div>

          {/* Panel 2: Gaintropy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="p-10 flex flex-col"
            style={{ background: "#0D0D0D" }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-6 flex items-center gap-2"
              style={{ color: "#FF4D00", fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF4D00", display: "inline-block" }} />
              Gaintropy
            </div>

            <div className="space-y-3 flex-1">
              {[
                { rank: "01", badge: "Recommended", badgeColor: "#00D4FF", name: "Zone Temperature Rebalance", savings: "+$45,700 / shift", prob: "88%", delay: 0.5 },
                { rank: "02", badge: "Aggressive", badgeColor: "#FF9500", name: "Full Thermal Optimization", savings: "+$55,800 / shift", prob: "72%", delay: 0.65 },
                { rank: "03", badge: "Conservative", badgeColor: "#666", name: "Soak Zone Reduction Only", savings: "+$20,800 / shift", prob: "96%", delay: 0.8 },
              ].map((p) => (
                <motion.div
                  key={p.rank}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: p.delay }}
                  className="p-4 rounded-sm flex items-center justify-between gap-4"
                  style={{
                    background: p.rank === "01" ? "rgba(0,212,255,0.04)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${p.rank === "01" ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)"}`,
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" }}>
                      {p.rank}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold mb-0.5 truncate" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                        {p.name}
                      </div>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-sm"
                        style={{ background: p.badgeColor + "18", color: p.badgeColor, fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {p.badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold" style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>
                      {p.savings}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk, sans-serif" }}>
                      {p.prob} success
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-6 flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full" style={{ background: "#00D4FF" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}>
                3 options generated in 1.2s
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── INTERACTIVE DEMO ─────────────────────────────────────────────────────────

function InteractiveDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [demoStage, setDemoStage] = useState<"idle" | "observe" | "predict" | "prescribe">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = selectedIndustry
    ? (INDUSTRY_SCENARIOS[selectedIndustry] ?? GENERIC_SCENARIO)
    : null;

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!selectedIndustry) { setDemoStage("idle"); return; }
    setDemoStage("observe");
    timerRef.current = setTimeout(() => {
      setDemoStage("predict");
      timerRef.current = setTimeout(() => {
        setDemoStage("prescribe");
      }, 1500);
    }, 1500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [selectedIndustry]);

  return (
    <section
      ref={ref}
      className="py-32"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Live scenario
          </p>
          <h2
            className="font-display font-black leading-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontFamily: "Space Grotesk, sans-serif",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            See it. Pick your industry.
          </h2>

          {/* Industry selector */}
          <div className="relative max-w-sm">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-3.5 text-sm rounded-sm outline-none appearance-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: selectedIndustry ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                fontFamily: "Space Grotesk, sans-serif",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,77,0,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            >
              <option value="" disabled style={{ background: "#111" }}>Select your industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind} style={{ background: "#111", color: "#FFF" }}>{ind}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
          </div>
        </motion.div>

        {/* Demo panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-sm overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0D0D0D" }}
        >
          {!selectedIndustry ? (
            <div className="flex items-center justify-center py-24">
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.15)", fontFamily: "Space Grotesk, sans-serif", fontStyle: "italic" }}
              >
                Select your industry to see Gaintropy in action.
              </p>
            </div>
          ) : (
            <div className="p-8">
              {/* Stage indicator */}
              <div className="flex items-center gap-6 mb-8">
                {(["observe", "predict", "prescribe"] as const).map((stage, i) => {
                  const stages = ["observe", "predict", "prescribe"];
                  const currentIdx = stages.indexOf(demoStage);
                  const stageIdx = stages.indexOf(stage);
                  const isPast = currentIdx > stageIdx;
                  const isCurrent = currentIdx === stageIdx;
                  return (
                    <div key={stage} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full transition-all duration-500"
                        style={{
                          background: isCurrent ? "#FF4D00" : isPast ? "#00D4FF" : "rgba(255,255,255,0.1)",
                        }}
                      />
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{
                          color: isCurrent ? "#FFFFFF" : isPast ? "rgba(0,212,255,0.7)" : "rgba(255,255,255,0.2)",
                          fontFamily: "Space Grotesk, sans-serif",
                        }}
                      >
                        {stage}
                      </span>
                      {i < 2 && (
                        <div className="w-8 h-px ml-1" style={{ background: isPast ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)" }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sensor readings */}
              {scenario && (demoStage === "observe" || demoStage === "predict" || demoStage === "prescribe") && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {scenario.sensors.map((sensor, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="p-3 rounded-sm"
                      style={{
                        background: sensor.alert && (demoStage === "predict" || demoStage === "prescribe")
                          ? "rgba(255,77,0,0.06)"
                          : "rgba(255,255,255,0.03)",
                        border: `1px solid ${sensor.alert && (demoStage === "predict" || demoStage === "prescribe") ? "rgba(255,77,0,0.25)" : "rgba(255,255,255,0.06)"}`,
                        transition: "all 0.5s ease",
                      }}
                    >
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {sensor.name}
                      </div>
                      <div
                        className="text-lg font-medium"
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          color: sensor.alert && (demoStage === "predict" || demoStage === "prescribe")
                            ? "#FF4D00"
                            : "#FFFFFF",
                          transition: "color 0.5s ease",
                        }}
                      >
                        {sensor.value}
                        <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace" }}>
                          {sensor.unit}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Prediction card */}
              <AnimatePresence>
                {scenario && (demoStage === "predict" || demoStage === "prescribe") && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-sm mb-6"
                    style={{ background: "rgba(255,77,0,0.06)", border: "1px solid rgba(255,77,0,0.2)" }}
                  >
                    <div className="flex items-start gap-3">
                      <span style={{ color: "#FF4D00", marginTop: "1px" }}>⚠</span>
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: "#FF4D00", fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {scenario.alertText}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Space Grotesk, sans-serif" }}>
                            Confidence:{" "}
                          </span>
                          <span style={{ color: "#00D4FF", fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}>
                            {scenario.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Prescription cards */}
              <AnimatePresence>
                {scenario && demoStage === "prescribe" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{ color: "#FF4D00", fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Ranked prescriptions
                    </div>
                    {scenario.prescriptions.map((p, i) => (
                      <motion.div
                        key={p.rank}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.12 }}
                        className="p-4 rounded-sm flex items-center justify-between gap-4"
                        style={{
                          background: p.rank === "01" ? "rgba(0,212,255,0.04)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${p.rank === "01" ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)"}`,
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" }}>
                            {p.rank}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold mb-0.5 truncate" style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}>
                              {p.name}
                            </div>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-sm"
                              style={{ background: p.badgeColor + "18", color: p.badgeColor, fontFamily: "Space Grotesk, sans-serif" }}
                            >
                              {p.badge}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold" style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>
                            {p.savings}
                          </div>
                          <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk, sans-serif" }}>
                            {p.prob} success
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        <p
          className="mt-4 text-xs italic text-center"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "Space Grotesk, sans-serif" }}
        >
          Simulated scenario. Actual recommendations are generated from your live plant data.
        </p>
      </div>
    </section>
  );
}

// ─── INDUSTRY TICKER ──────────────────────────────────────────────────────────

function IndustryTicker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const mid = Math.ceil(INDUSTRIES.length / 2);
  const row1Source = INDUSTRIES.slice(0, mid);
  const row2Source = INDUSTRIES.slice(mid);
  const row1 = [...row1Source, ...row1Source];
  const row2 = [...row2Source, ...row2Source];

  const handleMouseEnter = (name: string, e: React.MouseEvent) => {
    setHoveredIndustry(name);
    setPaused(true);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredIndustry(null);
    setPaused(false);
  };

  const tickerSpeed = isMobile ? "12s" : "18s";
  const tickerSpeedRow2 = isMobile ? "15s" : "22s";

  const renderRow = (items: string[]) =>
    items.map((name, i) => (
      <div key={i} className="flex items-center gap-0 flex-shrink-0 relative">
        <span
          className="px-8 text-sm font-medium transition-colors duration-200"
          style={{
            color: hoveredIndustry === name ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "0.02em",
            cursor: "default",
          }}
          onMouseEnter={(e) => handleMouseEnter(name, e)}
          onMouseLeave={handleMouseLeave}
        >
          {name}
        </span>
        <span style={{ color: "#FF4D00", fontSize: "6px", opacity: 0.6 }}>●</span>
      </div>
    ));

  return (
    <section
      ref={ref}
      className="py-24 overflow-hidden"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
        >
          50 industries. Every one of them.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative space-y-4"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }}
        />

        {/* Row 1 — scrolls left */}
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: `ticker ${tickerSpeed} linear infinite`, animationPlayState: paused ? "paused" : "running" }}
        >
          {renderRow(row1)}
        </div>

        {/* Row 2 — scrolls right */}
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: `tickerReverse ${tickerSpeedRow2} linear infinite`, animationPlayState: paused ? "paused" : "running" }}
        >
          {renderRow(row2)}
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredIndustry && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none px-3 py-2 rounded-sm"
            style={{
              left: tooltipPos.x + 12,
              top: tooltipPos.y - 40,
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap" }}>
              Avg. recovered:{" "}
              <span style={{ color: "#FF4D00", fontFamily: "JetBrains Mono, monospace" }}>
                {INDUSTRY_RECOVERY[hoveredIndustry] ?? "$1.5M"}/year
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── KNOWLEDGE DRAIN ──────────────────────────────────────────────────────────

function KnowledgeDrain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-40"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
          >
            The real crisis
          </p>
          <h2
            className="font-display font-black leading-tight mb-8"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontFamily: "Space Grotesk, sans-serif",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Your best operators are retiring.
          </h2>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Space Grotesk, sans-serif" }}
          >
            30 years of intuition. The exact feel for when Furnace 3 is about to drift. The instinct that saves a $200,000 heat. When Dave walks out the door, that knowledge walks with him.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Gaintropy encodes operational expertise into mathematics. It doesn't forget. It doesn't have bad shifts. It gets better every day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CREDIBILITY ──────────────────────────────────────────────────────────────

function Credibility() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const blocks = [
    {
      icon: "◈",
      headline: "Built on research deployed at Fortune 500 steel operations",
      body: "Not a demo environment. Production systems, real plants, real money.",
    },
    {
      icon: "◆",
      headline: "PhD-led. Factory-tested.",
      body: "Founded by an operations researcher. The math was proven before the product was built.",
    },
    {
      icon: "◇",
      headline: "Mathematical optimization, not pattern matching",
      body: "We solve for optimal. Most systems stop at probable. There is a difference.",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-32"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-8"
              style={{ background: "#0A0A0A" }}
            >
              <div
                className="text-lg mb-5"
                style={{ color: "#FF4D00" }}
              >
                {block.icon}
              </div>
              <h3
                className="font-semibold text-sm leading-snug mb-3"
                style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}
              >
                {block.headline}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Space Grotesk, sans-serif" }}
              >
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NAME PHILOSOPHY ──────────────────────────────────────────────────────────

function NamePhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const lines = [
    { text: <><strong>Entropy</strong>: the tendency of every system toward disorder.</>, delay: 0 },
    { text: <><strong>Gain</strong>: the corrective signal that restores control.</>, delay: 0.3 },
    {
      text: (
        <>
          <span style={{ color: "#FF4D00" }}>Gaintropy</span>: the platform that converts one into the other.
        </>
      ),
      delay: 0.6,
    },
  ];

  return (
    <section
      ref={ref}
      className="py-40"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: line.delay, ease: "easeOut" }}
            className="text-xl leading-relaxed mb-6"
            style={{
              color: "#FFFFFF",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

// ─── ACCESS ───────────────────────────────────────────────────────────────────

function Access() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", company: "", industry: "", requestType: "early-access" });

  // TODO: Replace with real Formspree form ID from https://formspree.io
  const FORMSPREE_URL = "https://formspree.io/f/xyzgaintropy";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Try again or email hello@gaintropy.com");
      }
    } catch {
      setError("Something went wrong. Try again or email hello@gaintropy.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="access"
      ref={ref}
      className="py-40"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Early Access
            </p>
            <h2
              className="font-display font-black leading-tight mb-4"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                fontFamily: "Space Grotesk, sans-serif",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Your plant is losing money
              <br />
              <span style={{ color: "#FF4D00" }}>right now.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-12"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Space Grotesk, sans-serif" }}
            >
              We are working with a small number of manufacturers to deploy Gaintropy and prove the numbers. If you want to know what your plant is leaving on the table, let's talk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-12">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,77,0,0.12)", border: "1px solid rgba(255,77,0,0.25)" }}
                >
                  <span style={{ color: "#FF4D00" }}>✓</span>
                </div>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  We'll be in touch.
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Space Grotesk, sans-serif" }}>
                  Within 48 hours. No sequences, no spam.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "email", label: "WORK EMAIL", type: "email", placeholder: "you@company.com" },
                  { key: "company", label: "COMPANY", type: "text", placeholder: "Your company" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={`field-${field.key}`}
                      className="block text-xs font-semibold mb-2 tracking-widest"
                      style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={`field-${field.key}`}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm rounded-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#FFFFFF",
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(255,77,0,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="field-industry"
                    className="block text-xs font-semibold mb-2 tracking-widest"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    INDUSTRY
                  </label>
                  <select
                    id="field-industry"
                    required
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full px-4 py-3.5 text-sm rounded-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: form.industry ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,77,0,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  >
                    <option value="" disabled style={{ background: "#111" }}>Select your industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind} style={{ background: "#111", color: "#FFF" }}>{ind}</option>
                    ))}
                    <option value="Other" style={{ background: "#111", color: "#FFF" }}>Other</option>
                  </select>
                </div>

                {/* Request type toggle */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-2 tracking-widest"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    I WANT TO
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "early-access", label: "Join the waitlist" },
                      { value: "live-walkthrough", label: "Request a live walkthrough" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm({ ...form, requestType: opt.value })}
                        className="py-2.5 px-3 text-xs font-semibold rounded-sm transition-all duration-200"
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          background: form.requestType === opt.value ? "rgba(255,77,0,0.12)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${form.requestType === opt.value ? "rgba(255,77,0,0.5)" : "rgba(255,255,255,0.08)"}`,
                          color: form.requestType === opt.value ? "#FF4D00" : "rgba(255,255,255,0.35)",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-xs" style={{ color: "#FF4D00", fontFamily: "Space Grotesk, sans-serif" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm font-semibold rounded-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99] mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {loading ? "Submitting..." : (
                    <>
                      <span>
                        {form.requestType === "live-walkthrough" ? "Request Live Walkthrough" : "Request Early Access"}
                      </span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p
                  className="text-xs text-center pt-1"
                  style={{ color: "rgba(255,255,255,0.18)", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  We respond within 48 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="py-10"
      style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src={LOGO_URL} alt="Gaintropy" width={28} height={28} className="w-7 h-7 object-contain opacity-70" loading="lazy" />
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Space Grotesk, sans-serif" }}>
            © 2026 Gaintropy
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:hello@gaintropy.com"
            className="text-xs transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            hello@gaintropy.com
          </a>
          <button
            onClick={() => document.getElementById("access")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            Request a walkthrough
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const globalStyles = `
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes tickerReverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`;

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <style>{globalStyles}</style>
      <MoneyCounter />
      <Navbar />
      <Hero />
      <TheMoment />
      <InteractiveDemo />
      <IndustryTicker />
      <KnowledgeDrain />
      <Credibility />
      <NamePhilosophy />
      <Access />
      <Footer />
    </div>
  );
}
