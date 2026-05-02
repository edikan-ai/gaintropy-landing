#!/usr/bin/env python3
"""
Extract data from ProForge Steel Atlas into a single JSON file.
Parses 148 L2 archetype entries, 16 L1 process stages, and 28 infrastructure combinations.
"""

import os
import re
import json
import glob


ATLAS_DIR = "/Users/edikan/Documents/Gaintropy/proforge-atlas/atlas/component_1_steel_atlas"
COMBOS_FILE = "/Users/edikan/Documents/Gaintropy/proforge-atlas/atlas/component_4_data_infrastructure/common_combinations.md"
OUTPUT_FILE = "/Users/edikan/Documents/Gaintropy/gaintropy-landing/client/src/data/atlas-data.json"


def slugify(name):
    """Convert a name to a URL-friendly slug."""
    s = name.lower().strip()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')


def parse_dollar_value(amount_str, suffix):
    """Parse a dollar amount string with K/M/B suffix into millions."""
    val = float(amount_str)
    suffix = suffix.upper() if suffix else ''
    if suffix == 'K':
        return val / 1000.0
    elif suffix == 'B':
        return val * 1000.0
    else:  # M or no suffix but contextually M
        return val


def extract_dollar_range(text):
    """Extract dollar range string like $3M-10M/year and min/max values."""
    # Universal pattern: $X[K/M]-[/$]Y[K/M]/year (or per year)
    # Handles: $3M-10M/year, $0.5-2.0M/year, $500K-2M/year, etc.
    dollar_range_pat = r'\$(\d+(?:\.\d+)?)([KkMmBb]?)[\s]*[-–][\s]*\$?(\d+(?:\.\d+)?)([KkMmBb]?)(?:/year|\s+per\s+year|\s*/\s*year)'

    # First try "Combined" or "Total" summary lines
    combined_keywords = [
        r'[Cc]ombined\s+(?:accepted[- ]?loss\s+)?estimate',
        r'[Tt]otal\s+(?:addressable\s+)?(?:accepted[- ])?loss',
        r'[Tt]otal\s+estimated',
        r'[Oo]verall\s+accepted[- ]?loss',
        r'[Cc]ombined',
        r'[Tt]otal',
    ]

    for keyword_pat in combined_keywords:
        # Find the keyword line, then find the dollar range near it
        for km in re.finditer(keyword_pat, text):
            # Look in the 200 chars after the keyword
            snippet = text[km.start():km.start()+300]
            dm = re.search(dollar_range_pat, snippet)
            if dm:
                lo_str, lo_suf, hi_str, hi_suf = dm.group(1), dm.group(2), dm.group(3), dm.group(4)
                # If low has no suffix but high does, assume same suffix
                if not lo_suf and hi_suf:
                    lo_suf = hi_suf
                lo = parse_dollar_value(lo_str, lo_suf)
                hi = parse_dollar_value(hi_str, hi_suf)
                lo_label = f"{lo_str}{lo_suf.upper()}" if lo_suf else f"{lo_str}M"
                hi_label = f"{hi_str}{hi_suf.upper()}" if hi_suf else f"{hi_str}M"
                return f"${lo_label}-{hi_label}/year", lo, hi

    # Fallback: find all dollar ranges in text and take the last one
    all_matches = []
    for dm in re.finditer(dollar_range_pat, text):
        lo_str, lo_suf, hi_str, hi_suf = dm.group(1), dm.group(2), dm.group(3), dm.group(4)
        if not lo_suf and hi_suf:
            lo_suf = hi_suf
        lo = parse_dollar_value(lo_str, lo_suf)
        hi = parse_dollar_value(hi_str, hi_suf)
        lo_label = f"{lo_str}{lo_suf.upper()}" if lo_suf else f"{lo_str}M"
        hi_label = f"{hi_str}{hi_suf.upper()}" if hi_suf else f"{hi_str}M"
        all_matches.append((f"${lo_label}-{hi_label}/year", lo, hi))

    if all_matches:
        return all_matches[-1]

    return None, None, None


def extract_time_to_value(text):
    """Extract deployment timeline from Section K."""
    section_k = extract_section(text, "Section K")
    if not section_k:
        return None

    # Look for shadow mode duration as time-to-value indicator
    # e.g. "Shadow mode: recommendations logged but not applied for first 4-6 weeks"
    m = re.search(r'[Ss]hadow\s+mode.*?(\d+[-–]\d+\s+weeks)', section_k)
    if m:
        shadow = m.group(1).replace('–', '-')
    else:
        shadow = None

    # Look for total deployment time or any week/month references
    lines = section_k.split('\n')
    timeline_parts = []
    for line in lines:
        if re.search(r'(week|month|day|hour)', line, re.IGNORECASE):
            timeline_parts.append(line.strip().lstrip('- *'))

    if shadow:
        return f"Shadow mode {shadow}, then production deployment"
    if timeline_parts:
        # Return the first meaningful timeline reference
        return timeline_parts[0][:200]

    return "See Section K for deployment details"


def extract_section(text, section_name):
    """Extract content of a named section (e.g., 'Section K')."""
    pattern = rf'##\s+{re.escape(section_name)}[:\s].*?\n(.*?)(?=\n##\s|\Z)'
    m = re.search(pattern, text, re.DOTALL)
    if m:
        return m.group(1).strip()
    return None


def extract_classification_tags(text):
    """Extract classification tags from Section A."""
    tags = []
    # Look for the classification tags section
    tag_section = re.search(
        r'Problem Classification Tags\s*\n(.*?)(?=\n###|\n##|\Z)',
        text, re.DOTALL
    )
    if tag_section:
        content = tag_section.group(1)
        # Extract bold key-value pairs
        for m in re.finditer(r'\*\*([^*]+)\*\*:\s*(.+)', content):
            key = m.group(1).strip()
            value = m.group(2).strip()
            tags.append(f"{key}: {value}")
    return tags


def extract_operator_description(text):
    """Extract first 2-3 sentences of the operator-language description."""
    section = re.search(
        r'Operator-Language Description\s*\n\n?(.*?)(?=\n###|\n##)',
        text, re.DOTALL
    )
    if not section:
        return ""

    content = section.group(1).strip()
    # Split into sentences and take first 2-3
    sentences = re.split(r'(?<=[.!?])\s+', content)
    result = ' '.join(sentences[:3])
    return result


def extract_math_description(text):
    """Extract 1-2 sentence summary of mathematical formulation."""
    section = re.search(
        r'Mathematical-Language Description\s*\n\n?(.*?)(?=\n###|\n##)',
        text, re.DOTALL
    )
    if not section:
        return ""

    content = section.group(1).strip()
    sentences = re.split(r'(?<=[.!?])\s+', content)
    return ' '.join(sentences[:2])


def extract_data_requirements(text):
    """Extract key data items from Section E."""
    section_e = extract_section(text, "Section E")
    if not section_e:
        return []

    items = []
    # Parse table rows - extract only the first column (data item name)
    for line in section_e.split('\n'):
        line = line.strip()
        if not line.startswith('|'):
            continue
        cells = [c.strip() for c in line.split('|')]
        # cells[0] is empty (before first |), cells[1] is first column
        if len(cells) >= 3:
            first_col = cells[1].strip()
            # Skip header row, separator row
            if (first_col and
                first_col != '---' and
                not first_col.startswith('--') and
                first_col not in ('Data Item', 'Symbol', 'Metric')):
                items.append(first_col)

    # Deduplicate and take first 8
    seen = set()
    unique_items = []
    for item in items:
        if item not in seen and len(item) > 2:
            seen.add(item)
            unique_items.append(item)

    return unique_items[:8]


def extract_cross_industry_analogs(text):
    """Extract industry names from Section J."""
    section_j = extract_section(text, "Section J")
    if not section_j:
        return []

    analogs = []

    # Format 1: "1. **Name (details)**:" or "1. **Name**:"
    for m in re.finditer(r'\d+\.\s+\*\*([^*]+)\*\*', section_j):
        name = m.group(1).strip().rstrip(':')
        analogs.append(name)

    if analogs:
        return analogs

    # Format 2: "### J.1 Name" or "### J1: Name" or "### J1 - Name"
    for m in re.finditer(r'###\s+(?:J\.?\d+|Analog\s+\d+)[:\s\-–]+(.+)', section_j):
        name = m.group(1).strip().rstrip(':')
        analogs.append(name)

    if analogs:
        return analogs

    # Format 3: "### Name (Industry)" -- bare heading under Section J
    for m in re.finditer(r'###\s+(.+)', section_j):
        name = m.group(1).strip().rstrip(':')
        # Skip if it looks like a sub-section of Section J itself
        if name.startswith('J.') or name.startswith('J '):
            continue
        analogs.append(name)

    if analogs:
        return analogs

    # Format 4: "**1. Name**" (bold numbered)
    for m in re.finditer(r'\*\*\d+\.\s+(.+?)\*\*', section_j):
        name = m.group(1).strip().rstrip(':')
        analogs.append(name)

    return analogs


def extract_equipment_variants(text):
    """Extract equipment/configuration types from Section G."""
    section_g = extract_section(text, "Section G")
    if not section_g:
        return []

    variants = []
    # Format 1: "### Configuration N: Name"
    for m in re.finditer(r'###\s+Configuration\s+\d+:\s*(.+)', section_g):
        variants.append(m.group(1).strip())

    if variants:
        return variants

    # Format 2: "Configuration N: Name" without ###
    for m in re.finditer(r'Configuration\s+\d+:\s*(.+)', section_g):
        variants.append(m.group(1).strip())

    if variants:
        return variants

    # Format 3: Any ### subheadings in section G
    for m in re.finditer(r'###\s+(.+)', section_g):
        name = m.group(1).strip()
        if name and not name.startswith('Section'):
            variants.append(name)

    return variants


def extract_accepted_loss_section(text):
    """Get the accepted loss section text."""
    section = re.search(
        r'Accepted-Loss Estimate\s*\n\n?(.*?)(?=\n##)',
        text, re.DOTALL
    )
    if section:
        return section.group(1).strip()
    return text  # fallback to full text


def parse_archetype(filepath):
    """Parse a single archetype .md file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Extract archetype ID
    m = re.search(r'\*\*Archetype ID\*\*:\s*(L2-\d+-\d+)', text)
    archetype_id = m.group(1) if m else None

    # Extract title
    m = re.search(r'\*\*Problem Title\*\*:\s*(.+)', text)
    title = m.group(1).strip() if m else None
    if not title:
        m = re.search(r'^#\s+L2-\d+-\d+:\s*(.+)', text, re.MULTILINE)
        title = m.group(1).strip() if m else os.path.basename(filepath)

    # Extract process stage
    m = re.search(r'\*\*Process Stage\*\*:\s*(L1-\d+)\s+(.*)', text)
    process_stage_id = m.group(1).strip() if m else None
    process_stage = m.group(2).strip() if m else None

    # Accepted loss
    loss_text = extract_accepted_loss_section(text)
    accepted_loss, loss_min, loss_max = extract_dollar_range(loss_text)

    # Operator description
    operator_desc = extract_operator_description(text)

    # Math description
    math_desc = extract_math_description(text)

    # Classification tags
    tags = extract_classification_tags(text)

    # Data requirements
    data_reqs = extract_data_requirements(text)

    # Cross-industry analogs
    analogs = extract_cross_industry_analogs(text)

    # Equipment variants
    variants = extract_equipment_variants(text)

    # Time to value
    ttv = extract_time_to_value(text)

    return {
        "archetypeId": archetype_id,
        "title": title,
        "processStage": process_stage,
        "processStageId": process_stage_id,
        "operatorDescription": operator_desc,
        "acceptedLoss": accepted_loss,
        "acceptedLossMin": loss_min,
        "acceptedLossMax": loss_max,
        "timeToValue": ttv,
        "classificationTags": tags,
        "mathematicalDescription": math_desc,
        "dataRequirements": data_reqs,
        "crossIndustryAnalogs": analogs,
        "equipmentVariants": variants,
    }


def parse_combinations(filepath):
    """Parse infrastructure combinations from common_combinations.md."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Split by combination headers
    combo_blocks = re.split(r'(?=^### C-\d+:)', text, flags=re.MULTILINE)

    combinations = []
    for block in combo_blocks:
        m = re.match(r'### (C-\d+):\s*(.+)', block)
        if not m:
            continue

        combo_id = m.group(1)
        combo_name = m.group(2).strip()

        # Historian
        hist_m = re.search(r'Historian:\s*(.+)', block)
        historian = hist_m.group(1).strip() if hist_m else None

        # ERP
        erp_m = re.search(r'ERP:\s*(.+)', block)
        erp = erp_m.group(1).strip() if erp_m else None

        # Database
        db_m = re.search(r'Database\(s\):\s*(.+)', block)
        database = db_m.group(1).strip() if db_m else None

        # Protocols
        proto_m = re.search(r'Primary Protocols?:\s*(.+)', block)
        protocols = []
        if proto_m:
            proto_text = proto_m.group(1).strip()
            protocols = [p.strip() for p in re.split(r',\s*', proto_text)]

        # Frequency
        freq_m = re.search(r'\*\*Frequency\*\*:\s*(.+)', block)
        frequency = freq_m.group(1).strip().rstrip('.') if freq_m else None
        # Clean up to just the percentage
        if frequency:
            pct_m = re.search(r'(~?\d+%)', frequency)
            frequency = pct_m.group(1) if pct_m else frequency

        # Deployment weeks
        deploy_m = re.search(r'\*\*Total:\s*(\d+[-–]\d+)\s*weeks\*\*', block)
        deployment_weeks = deploy_m.group(1).replace('–', '-') if deploy_m else None

        # Industries
        industries_m = re.search(r'\*\*Industries\*\*:\s*(.+)', block)
        industry_fit = []
        if industries_m:
            ind_text = industries_m.group(1).strip().rstrip('.')
            industry_fit = [i.strip() for i in re.split(r',\s*', ind_text)]

        combinations.append({
            "id": combo_id,
            "name": combo_name,
            "historian": historian,
            "erp": erp,
            "database": database,
            "protocols": protocols,
            "frequency": frequency,
            "deploymentWeeks": deployment_weeks,
            "industryFit": industry_fit,
        })

    return combinations


def main():
    # Find all L1 directories
    l1_dirs = sorted(glob.glob(os.path.join(ATLAS_DIR, "L1-*")))

    process_stages = []
    archetypes = []

    for l1_dir in l1_dirs:
        if not os.path.isdir(l1_dir):
            continue

        dirname = os.path.basename(l1_dir)
        # Extract L1 id and name
        m = re.match(r'(L1-\d+)_(.*)', dirname)
        if not m:
            continue

        l1_id = m.group(1)
        l1_slug = m.group(2)
        l1_name_parts = l1_slug.replace('_', ' ').title()

        # Find all L2 .md files in this directory
        md_files = sorted(glob.glob(os.path.join(l1_dir, "L2-*.md")))

        # Get human-readable name from first entry's process stage field
        l1_human_name = l1_name_parts

        stage_archetypes = []
        for md_file in md_files:
            entry = parse_archetype(md_file)
            if entry["archetypeId"]:
                stage_archetypes.append(entry)
                # Use the process stage name from the entry if available
                if entry["processStage"] and l1_human_name == l1_name_parts:
                    l1_human_name = entry["processStage"]

        process_stages.append({
            "id": l1_id,
            "name": l1_human_name,
            "archetypeCount": len(stage_archetypes),
            "slug": l1_slug,
        })

        archetypes.extend(stage_archetypes)

    # Parse infrastructure combinations
    combinations = parse_combinations(COMBOS_FILE)

    # Build final JSON
    output = {
        "processStages": process_stages,
        "archetypes": archetypes,
        "infrastructureCombinations": combinations,
    }

    # Write output
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    # Summary
    print(f"=== Extraction Summary ===")
    print(f"Process Stages (L1): {len(process_stages)}")
    for ps in process_stages:
        print(f"  {ps['id']}: {ps['name']} ({ps['archetypeCount']} archetypes)")
    print(f"\nTotal Archetypes (L2): {len(archetypes)}")

    # Check for missing fields
    missing_loss = sum(1 for a in archetypes if a['acceptedLoss'] is None)
    missing_ttv = sum(1 for a in archetypes if a['timeToValue'] is None)
    missing_tags = sum(1 for a in archetypes if not a['classificationTags'])
    missing_data = sum(1 for a in archetypes if not a['dataRequirements'])
    missing_analogs = sum(1 for a in archetypes if not a['crossIndustryAnalogs'])
    missing_variants = sum(1 for a in archetypes if not a['equipmentVariants'])

    print(f"\nField coverage:")
    print(f"  acceptedLoss:         {len(archetypes) - missing_loss}/{len(archetypes)}")
    print(f"  timeToValue:          {len(archetypes) - missing_ttv}/{len(archetypes)}")
    print(f"  classificationTags:   {len(archetypes) - missing_tags}/{len(archetypes)}")
    print(f"  dataRequirements:     {len(archetypes) - missing_data}/{len(archetypes)}")
    print(f"  crossIndustryAnalogs: {len(archetypes) - missing_analogs}/{len(archetypes)}")
    print(f"  equipmentVariants:    {len(archetypes) - missing_variants}/{len(archetypes)}")

    print(f"\nInfrastructure Combinations: {len(combinations)}")
    for c in combinations:
        print(f"  {c['id']}: {c['name']}")

    print(f"\nOutput written to: {OUTPUT_FILE}")
    print(f"File size: {os.path.getsize(OUTPUT_FILE):,} bytes")

    # Validate JSON
    with open(OUTPUT_FILE, 'r') as f:
        validated = json.load(f)
    print(f"JSON validation: OK ({len(validated['archetypes'])} archetypes)")


if __name__ == '__main__':
    main()
