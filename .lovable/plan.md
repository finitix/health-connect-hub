

# Add All Indian State Districts to Search Filter

## Overview
Add complete district lists for all 28 states and 1 union territory (Delhi) to the `stateDistricts` map in `src/pages/SearchPage.tsx`. Currently only Andhra Pradesh has districts defined.

## Why a separate data file?
The district data for all states is very large (700+ districts). Putting it directly in `SearchPage.tsx` would make the file unwieldy. Instead, we'll create a dedicated data file.

## Implementation

### Step 1: Create `src/data/indianDistricts.ts`
A new file exporting a `Record<string, string[]>` containing districts for all 29 states/UTs listed in `indianStates`:

- Andhra Pradesh (26 districts - already done)
- Arunachal Pradesh (26 districts)
- Assam (35 districts)
- Bihar (38 districts)
- Chhattisgarh (33 districts)
- Goa (2 districts)
- Gujarat (33 districts)
- Haryana (22 districts)
- Himachal Pradesh (12 districts)
- Jharkhand (24 districts)
- Karnataka (31 districts)
- Kerala (14 districts)
- Madhya Pradesh (55 districts)
- Maharashtra (36 districts)
- Manipur (16 districts)
- Meghalaya (12 districts)
- Mizoram (11 districts)
- Nagaland (16 districts)
- Odisha (30 districts)
- Punjab (23 districts)
- Rajasthan (50 districts)
- Sikkim (6 districts)
- Tamil Nadu (38 districts)
- Telangana (33 districts)
- Tripura (8 districts)
- Uttar Pradesh (75 districts)
- Uttarakhand (13 districts)
- West Bengal (23 districts)
- Delhi (11 districts)

### Step 2: Update `src/pages/SearchPage.tsx`
- Remove the inline `stateDistricts` constant (lines 11-13)
- Import from the new data file: `import { stateDistricts } from "@/data/indianDistricts"`
- Everything else (filter logic, FilterPanel) remains unchanged

## Result
When a user selects any Indian state in the search filter, they will see the correct list of districts for that state. If no state is selected, it falls back to showing districts from the database as before.

