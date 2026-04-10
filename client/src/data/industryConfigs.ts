export interface IndustryConfig {
  slug: string;
  name: string;
  throughputUnit: string;
  energyUnit: string;
  costMult: number;
  equipment: string[];
  chemicals: string[];
  product: string;
  baseOutput: string;
  baseEnergy: string;
  baseEff: string;
  tempUnit?: string;
  flowUnit?: string;
}

export const INDUSTRY_CONFIGS: IndustryConfig[] = [
  { slug:"steel", name:"Steel Manufacturing", throughputUnit:"tons/hr", energyUnit:"MMBtu/hr", costMult:1.4,
    equipment:["reheat furnace","rolling mill","ladle","continuous caster","blast furnace"],
    chemicals:["oxygen","natural gas","limestone","alloy additives"], product:"steel coil",
    baseOutput:"142 tons", baseEnergy:"185 MMBtu/hr", baseEff:"73%", tempUnit:"°F" },

  { slug:"automotive", name:"Automotive Assembly", throughputUnit:"units/hr", energyUnit:"kWh/unit", costMult:1.1,
    equipment:["stamping press","robotic welder","paint booth","assembly line","conveyor"],
    chemicals:["paint","coolant","lubricant","adhesive"], product:"vehicle",
    baseOutput:"52 units/hr", baseEnergy:"287 kWh/unit", baseEff:"88%" },

  { slug:"semiconductor", name:"Semiconductor Manufacturing", throughputUnit:"wafers/hr", energyUnit:"kWh/wafer", costMult:2.8,
    equipment:["CVD reactor","lithography tool","CMP system","diffusion furnace","ion implanter"],
    chemicals:["silane","nitrogen","HF","photoresist","CMP slurry"], product:"wafer",
    baseOutput:"48 wafers/hr", baseEnergy:"12.4 kWh/wafer", baseEff:"91%" },

  { slug:"food-beverage", name:"Food & Beverage", throughputUnit:"kg/hr", energyUnit:"kWh/ton", costMult:0.8,
    equipment:["pasteurizer","filler","CIP system","cooler","mixer"],
    chemicals:["caustic","acid","sanitizer","CO2"], product:"finished goods",
    baseOutput:"8,400 kg/hr", baseEnergy:"142 kWh/ton", baseEff:"82%", tempUnit:"°F" },

  { slug:"pharmaceutical", name:"Pharmaceutical Manufacturing", throughputUnit:"kg/batch", energyUnit:"kWh/batch", costMult:3.2,
    equipment:["bioreactor","lyophilizer","granulator","tablet press","autoclave"],
    chemicals:["API","excipients","WFI","nitrogen","steam"], product:"drug product",
    baseOutput:"450 kg/batch", baseEnergy:"1,840 kWh/batch", baseEff:"94%" },

  { slug:"oil-gas", name:"Oil & Gas Refining", throughputUnit:"bbl/day", energyUnit:"MMBtu/bbl", costMult:1.6,
    equipment:["distillation column","catalytic cracker","hydrotreater","reformer","compressor"],
    chemicals:["catalyst","hydrogen","caustic","amine","inhibitor"], product:"refined product",
    baseOutput:"82,000 bbl/day", baseEnergy:"0.38 MMBtu/bbl", baseEff:"78%" },

  { slug:"cement", name:"Cement Manufacturing", throughputUnit:"tons/hr", energyUnit:"MMBtu/ton", costMult:0.9,
    equipment:["rotary kiln","preheater","ball mill","cooler","raw mill"],
    chemicals:["limestone","clay","iron ore","gypsum","clinker"], product:"cement",
    baseOutput:"210 tons/hr", baseEnergy:"3.1 MMBtu/ton", baseEff:"71%", tempUnit:"°F" },

  { slug:"paper-pulp", name:"Paper & Pulp", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:0.85,
    equipment:["digester","washer","bleach tower","paper machine","recovery boiler"],
    chemicals:["caustic","chlorine dioxide","resin","starch","anthraquinone"], product:"paper",
    baseOutput:"1,200 tons/day", baseEnergy:"8.4 MMBtu/ton", baseEff:"76%" },

  { slug:"textile", name:"Textile Manufacturing", throughputUnit:"kg/hr", energyUnit:"kWh/kg", costMult:0.6,
    equipment:["spinning machine","loom","dyeing machine","finishing line","heat setter"],
    chemicals:["dye","auxiliary","softener","fixative","bleach"], product:"fabric",
    baseOutput:"2,800 kg/hr", baseEnergy:"4.2 kWh/kg", baseEff:"79%", tempUnit:"°C" },

  { slug:"chemical", name:"Chemical Manufacturing", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:1.2,
    equipment:["reactor","distillation column","heat exchanger","compressor","crystallizer"],
    chemicals:["feedstock","catalyst","solvent","inhibitor","byproduct"], product:"chemical product",
    baseOutput:"380 tons/day", baseEnergy:"5.8 MMBtu/ton", baseEff:"82%" },

  { slug:"aluminum", name:"Aluminum Smelting", throughputUnit:"tons/day", energyUnit:"kWh/kg", costMult:1.3,
    equipment:["electrolytic cell","anode baking furnace","casting machine","holding furnace","rectifier"],
    chemicals:["alumina","cryolite","anode paste","fluoride","alloy"], product:"aluminum",
    baseOutput:"840 tons/day", baseEnergy:"13.2 kWh/kg", baseEff:"88%" },

  { slug:"glass", name:"Glass Manufacturing", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:0.95,
    equipment:["melting furnace","forming machine","annealing lehr","batch charger","refiner"],
    chemicals:["silica sand","soda ash","limestone","cullet","colorant"], product:"glass",
    baseOutput:"520 tons/day", baseEnergy:"5.2 MMBtu/ton", baseEff:"68%", tempUnit:"°F" },

  { slug:"battery", name:"Battery Manufacturing", throughputUnit:"MWh/day", energyUnit:"kWh/kWh", costMult:2.1,
    equipment:["electrode coater","calendering machine","winding machine","formation cycler","vacuum dryer"],
    chemicals:["cathode powder","anode graphite","electrolyte","binder","separator"], product:"battery cell",
    baseOutput:"28 MWh/day", baseEnergy:"0.18 kWh/kWh", baseEff:"92%" },

  { slug:"mining", name:"Mining Operations", throughputUnit:"tons/hr", energyUnit:"kWh/ton", costMult:1.0,
    equipment:["SAG mill","ball mill","flotation cell","crusher","conveyor"],
    chemicals:["xanthate","frother","lime","cyanide","flocculant"], product:"ore concentrate",
    baseOutput:"1,850 tons/hr", baseEnergy:"18.4 kWh/ton", baseEff:"74%" },

  { slug:"water-treatment", name:"Water Treatment", throughputUnit:"MGD", energyUnit:"kWh/kgal", costMult:0.5,
    equipment:["membrane filtration","UV disinfection","aerator","clarifier","chemical dosing"],
    chemicals:["chlorine","coagulant","antiscalant","pH adjuster","polymer"], product:"treated water",
    baseOutput:"42 MGD", baseEnergy:"1.8 kWh/kgal", baseEff:"85%" },

  { slug:"plastics", name:"Plastics Manufacturing", throughputUnit:"kg/hr", energyUnit:"kWh/kg", costMult:0.9,
    equipment:["extruder","injection molder","blow molder","pelletizer","dryer"],
    chemicals:["resin","colorant","additive","stabilizer","filler"], product:"plastic part",
    baseOutput:"3,200 kg/hr", baseEnergy:"1.4 kWh/kg", baseEff:"86%" },

  { slug:"tire-rubber", name:"Tire & Rubber", throughputUnit:"tires/hr", energyUnit:"kWh/tire", costMult:0.85,
    equipment:["banbury mixer","calender","tire builder","autoclave curer","extrusion line"],
    chemicals:["natural rubber","carbon black","sulfur","accelerator","antioxidant"], product:"tire",
    baseOutput:"680 tires/hr", baseEnergy:"12.4 kWh/tire", baseEff:"81%" },

  { slug:"paint-coatings", name:"Paint & Coatings", throughputUnit:"gallons/hr", energyUnit:"kWh/kgal", costMult:0.75,
    equipment:["high-speed disperser","bead mill","filling line","batch mixer","filter press"],
    chemicals:["resin","pigment","solvent","additive","crosslinker"], product:"paint",
    baseOutput:"4,800 gal/hr", baseEnergy:"28 kWh/kgal", baseEff:"84%" },

  { slug:"electronics", name:"Electronics Assembly", throughputUnit:"PCBs/hr", energyUnit:"kWh/unit", costMult:1.4,
    equipment:["SMT line","reflow oven","wave solder","AOI system","ICT tester"],
    chemicals:["solder paste","flux","cleaning agent","conformal coating","adhesive"], product:"PCB assembly",
    baseOutput:"2,400 PCBs/hr", baseEnergy:"0.14 kWh/unit", baseEff:"97%" },

  { slug:"agricultural", name:"Agricultural Processing", throughputUnit:"tons/hr", energyUnit:"kWh/ton", costMult:0.7,
    equipment:["grain dryer","cleaner","elevator","mill","storage silo"],
    chemicals:["fumigant","dust suppressant","drying agent","preservative","lubricant"], product:"processed grain",
    baseOutput:"220 tons/hr", baseEnergy:"32 kWh/ton", baseEff:"78%" },

  { slug:"aerospace", name:"Aerospace Manufacturing", throughputUnit:"components/day", energyUnit:"kWh/part", costMult:4.5,
    equipment:["autoclave","CNC machining center","NDT system","clean room","heat treat furnace"],
    chemicals:["titanium alloy","composite prepreg","sealant","surface treatment","lubricant"], product:"aerospace component",
    baseOutput:"84 components/day", baseEnergy:"48 kWh/part", baseEff:"96%" },

  { slug:"medical-devices", name:"Medical Device Manufacturing", throughputUnit:"units/hr", energyUnit:"kWh/unit", costMult:3.8,
    equipment:["clean room line","EO sterilizer","laser welder","vision inspection","cleanroom HVAC"],
    chemicals:["ethylene oxide","IPA","endotoxin rinse","lubricant","adhesive"], product:"medical device",
    baseOutput:"1,800 units/hr", baseEnergy:"0.08 kWh/unit", baseEff:"99.2%" },

  { slug:"dairy", name:"Dairy Processing", throughputUnit:"L/hr", energyUnit:"kWh/kL", costMult:0.65,
    equipment:["pasteurizer","homogenizer","separator","evaporator","CIP system"],
    chemicals:["caustic","nitric acid","chlorine","peracetic acid","CO2"], product:"dairy product",
    baseOutput:"85,000 L/hr", baseEnergy:"120 kWh/kL", baseEff:"86%", tempUnit:"°F" },

  { slug:"meat-poultry", name:"Meat & Poultry Processing", throughputUnit:"kg/hr", energyUnit:"kWh/ton", costMult:0.7,
    equipment:["slaughter line","chiller","deboning station","packaging line","blast freezer"],
    chemicals:["chlorine","peracetic acid","lactic acid","CO2","nitrogen"], product:"processed meat",
    baseOutput:"18,000 kg/hr", baseEnergy:"285 kWh/ton", baseEff:"83%", tempUnit:"°F" },

  { slug:"sugar", name:"Sugar Refining", throughputUnit:"tons/hr", energyUnit:"MMBtu/ton", costMult:0.8,
    equipment:["diffuser","evaporator","crystallizer","centrifuge","dryer"],
    chemicals:["lime","CO2","sulfur dioxide","phosphoric acid","flocculant"], product:"refined sugar",
    baseOutput:"145 tons/hr", baseEnergy:"1.8 MMBtu/ton", baseEff:"77%" },

  { slug:"specialty-chemicals", name:"Specialty Chemicals", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:1.8,
    equipment:["multi-purpose reactor","distillation train","dryer","crystallizer","blending tank"],
    chemicals:["specialty feedstock","catalyst","solvent","reagent","stabilizer"], product:"specialty chemical",
    baseOutput:"85 tons/day", baseEnergy:"7.2 MMBtu/ton", baseEff:"88%" },

  { slug:"petrochemical", name:"Petrochemicals", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:1.5,
    equipment:["cracker","quench tower","fractionator","compressor train","polymerization reactor"],
    chemicals:["naphtha","ethylene","propylene","catalyst","inhibitor"], product:"petrochemical",
    baseOutput:"2,200 tons/day", baseEnergy:"4.8 MMBtu/ton", baseEff:"81%" },

  { slug:"hydrogen", name:"Hydrogen Production", throughputUnit:"kg/hr", energyUnit:"kWh/kg", costMult:1.6,
    equipment:["electrolyzer stack","SMR reformer","PSA unit","compressor","dryer"],
    chemicals:["water","natural gas","catalyst","amine","desiccant"], product:"hydrogen",
    baseOutput:"4,200 kg/hr", baseEnergy:"48 kWh/kg", baseEff:"72%" },

  { slug:"solar-panel", name:"Solar Panel Manufacturing", throughputUnit:"MW/day", energyUnit:"kWh/W", costMult:1.9,
    equipment:["PECVD chamber","screen printer","firing furnace","stringer","laminator"],
    chemicals:["silane","phosphine","silver paste","EVA","backsheet"], product:"solar panel",
    baseOutput:"12 MW/day", baseEnergy:"0.28 kWh/W", baseEff:"93%" },

  { slug:"wind-turbine", name:"Wind Turbine Manufacturing", throughputUnit:"MW/week", energyUnit:"kWh/ton", costMult:2.2,
    equipment:["blade mold","infusion system","CNC router","paint booth","nacelle assembly"],
    chemicals:["epoxy resin","hardener","gelcoat","adhesive","carbon fiber"], product:"turbine component",
    baseOutput:"8 MW/week", baseEnergy:"180 kWh/ton", baseEff:"89%" },

  { slug:"carbon-fiber", name:"Carbon Fiber Composites", throughputUnit:"tons/day", energyUnit:"kWh/kg", costMult:2.4,
    equipment:["oxidation oven","carbonization furnace","surface treatment","sizing applicator","winding machine"],
    chemicals:["PAN precursor","sizing agent","oxidizing gas","surface treatment","binder"], product:"carbon fiber",
    baseOutput:"18 tons/day", baseEnergy:"22 kWh/kg", baseEff:"87%" },

  { slug:"copper", name:"Copper Smelting", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:1.1,
    equipment:["flash smelter","converter","anode furnace","electrolytic refinery","slag handler"],
    chemicals:["concentrate","flux","oxygen","sulfuric acid","electrolyte"], product:"copper cathode",
    baseOutput:"650 tons/day", baseEnergy:"8.4 MMBtu/ton", baseEff:"96%" },

  { slug:"ceramics", name:"Ceramics Manufacturing", throughputUnit:"tons/day", energyUnit:"MMBtu/ton", costMult:0.85,
    equipment:["ball mill","spray dryer","press","kiln","glazing line"],
    chemicals:["alumina","silica","zirconia","binder","glaze"], product:"ceramic product",
    baseOutput:"240 tons/day", baseEnergy:"4.2 MMBtu/ton", baseEff:"79%", tempUnit:"°F" },

  { slug:"concrete", name:"Concrete Products", throughputUnit:"m³/hr", energyUnit:"kWh/m³", costMult:0.6,
    equipment:["batch plant","mixer","precast form","curing chamber","conveyor"],
    chemicals:["cement","aggregate","admixture","fly ash","silica fume"], product:"concrete product",
    baseOutput:"180 m³/hr", baseEnergy:"12 kWh/m³", baseEff:"82%" },

  { slug:"wood-lumber", name:"Wood & Lumber Processing", throughputUnit:"MBF/hr", energyUnit:"kWh/MBF", costMult:0.6,
    equipment:["band saw","edger","planer","kiln dryer","trimmer"],
    chemicals:["preservative","stain","adhesive","fire retardant","lubricant"], product:"lumber",
    baseOutput:"48 MBF/hr", baseEnergy:"820 kWh/MBF", baseEff:"76%" },

  { slug:"printing-packaging", name:"Printing & Packaging", throughputUnit:"units/hr", energyUnit:"kWh/1000u", costMult:0.7,
    equipment:["offset press","flexo press","die cutter","laminator","folder-gluer"],
    chemicals:["ink","varnish","adhesive","solvent","fountain solution"], product:"printed package",
    baseOutput:"28,000 units/hr", baseEnergy:"42 kWh/1000u", baseEff:"87%" },

  { slug:"rubber", name:"Rubber Processing", throughputUnit:"kg/hr", energyUnit:"kWh/kg", costMult:0.8,
    equipment:["internal mixer","mill","extruder","injection molder","vulcanizer"],
    chemicals:["natural rubber","SBR","carbon black","sulfur","accelerator"], product:"rubber product",
    baseOutput:"4,200 kg/hr", baseEnergy:"1.8 kWh/kg", baseEff:"82%" },

  { slug:"adhesives", name:"Adhesives & Sealants", throughputUnit:"tons/day", energyUnit:"kWh/ton", costMult:0.9,
    equipment:["high-shear mixer","reaction vessel","dispersion mill","filling line","test station"],
    chemicals:["polymer base","crosslinker","solvent","filler","tackifier"], product:"adhesive/sealant",
    baseOutput:"85 tons/day", baseEnergy:"185 kWh/ton", baseEff:"91%" },

  { slug:"cosmetics", name:"Cosmetics Manufacturing", throughputUnit:"kg/batch", energyUnit:"kWh/batch", costMult:1.1,
    equipment:["vacuum emulsifier","homogenizer","filling line","labeler","clean room"],
    chemicals:["emollient","emulsifier","preservative","fragrance","colorant"], product:"cosmetic product",
    baseOutput:"2,800 kg/batch", baseEnergy:"420 kWh/batch", baseEff:"93%" },

  { slug:"animal-feed", name:"Animal Feed Manufacturing", throughputUnit:"tons/hr", energyUnit:"kWh/ton", costMult:0.55,
    equipment:["hammer mill","mixer","pellet press","cooler","sifter"],
    chemicals:["premix","molasses","fat","enzyme","mold inhibitor"], product:"animal feed",
    baseOutput:"85 tons/hr", baseEnergy:"38 kWh/ton", baseEff:"80%" },

  { slug:"coffee-tea", name:"Coffee & Tea Processing", throughputUnit:"kg/hr", energyUnit:"kWh/ton", costMult:0.75,
    equipment:["roaster","grinder","extractor","spray dryer","packing line"],
    chemicals:["CO2","nitrogen","water","steam","cleaning agent"], product:"coffee/tea product",
    baseOutput:"3,800 kg/hr", baseEnergy:"480 kWh/ton", baseEff:"84%", tempUnit:"°F" },

  { slug:"beverages", name:"Non-Alcoholic Beverages", throughputUnit:"L/hr", energyUnit:"kWh/kL", costMult:0.7,
    equipment:["syrup room","carbonator","filler","pasteurizer","CIP system"],
    chemicals:["CO2","caustic","acid","sanitizer","chlorine"], product:"beverage",
    baseOutput:"72,000 L/hr", baseEnergy:"95 kWh/kL", baseEff:"88%", tempUnit:"°F" },

  { slug:"wine-spirits", name:"Wine & Spirits Production", throughputUnit:"L/hr", energyUnit:"kWh/kL", costMult:0.85,
    equipment:["fermenter","still","barrel warehouse","filter","bottling line"],
    chemicals:["yeast","SO2","fining agent","tartaric acid","nitrogen"], product:"wine/spirit",
    baseOutput:"22,000 L/hr", baseEnergy:"145 kWh/kL", baseEff:"88%", tempUnit:"°F" },

  { slug:"specialty-gases", name:"Specialty Gases", throughputUnit:"tons/day", energyUnit:"kWh/ton", costMult:1.4,
    equipment:["air separation unit","purifier","compressor","liquefier","cylinder fill station"],
    chemicals:["air","feedstock gas","adsorbent","molecular sieve","refrigerant"], product:"specialty gas",
    baseOutput:"480 tons/day", baseEnergy:"380 kWh/ton", baseEff:"91%" },

  { slug:"shipbuilding", name:"Shipbuilding", throughputUnit:"tons/week", energyUnit:"kWh/ton", costMult:1.8,
    equipment:["plasma cutter","welding station","blasting booth","painting system","crane"],
    chemicals:["welding wire","blasting media","paint","primer","solvent"], product:"ship section",
    baseOutput:"1,800 tons/week", baseEnergy:"145 kWh/ton", baseEff:"78%" },

  { slug:"rail-equipment", name:"Rail Equipment Manufacturing", throughputUnit:"units/week", energyUnit:"kWh/unit", costMult:1.6,
    equipment:["heavy press","CNC machining","paint line","assembly line","test facility"],
    chemicals:["lubricant","paint","sealant","cleaning agent","adhesive"], product:"rail vehicle",
    baseOutput:"12 units/week", baseEnergy:"2,400 kWh/unit", baseEff:"84%" },

  { slug:"biofuels", name:"Biofuels Production", throughputUnit:"gal/day", energyUnit:"MMBtu/gal", costMult:0.9,
    equipment:["transesterification reactor","methanol recovery","glycerin separator","dryer","biodiesel polisher"],
    chemicals:["vegetable oil","methanol","NaOH","HCl","water"], product:"biofuel",
    baseOutput:"48,000 gal/day", baseEnergy:"0.042 MMBtu/gal", baseEff:"84%" },

  { slug:"wastewater", name:"Wastewater Resource Recovery", throughputUnit:"MGD", energyUnit:"kWh/kgal", costMult:0.55,
    equipment:["anaerobic digester","membrane bioreactor","UV disinfection","centrifuge","biogas generator"],
    chemicals:["polymer","ferric chloride","caustic","acid","methanol"], product:"reclaimed water",
    baseOutput:"28 MGD", baseEnergy:"2.4 kWh/kgal", baseEff:"88%" },

  { slug:"aquaculture", name:"Aquaculture", throughputUnit:"kg/day", energyUnit:"kWh/kg", costMult:0.75,
    equipment:["RAS tank","aerator","UV sterilizer","biofilter","feed system"],
    chemicals:["salt","oxygen","probiotics","vitamin mix","disinfectant"], product:"fish/shrimp",
    baseOutput:"4,200 kg/day", baseEnergy:"4.8 kWh/kg", baseEff:"82%" },

  { slug:"precision-machining", name:"Precision Machining", throughputUnit:"parts/hr", energyUnit:"kWh/part", costMult:1.5,
    equipment:["5-axis CNC","EDM","grinding center","CMM","coolant system"],
    chemicals:["cutting fluid","coolant","lubricant","cleaning agent","rust inhibitor"], product:"precision part",
    baseOutput:"180 parts/hr", baseEnergy:"0.85 kWh/part", baseEff:"94%" },
];

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
  return INDUSTRY_CONFIGS.find(i => i.slug === slug);
}
