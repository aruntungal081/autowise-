# 🚗 AutoWise AI — Intelligent Vehicle Identification, Diagnostics & Price Comparison

AutoWise AI is a complete, production-oriented automotive web application built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

The platform helps users:
1. **Identify Vehicles**: Decode 17-digit VINs (via official NHTSA vPIC Government API), Indian registration numbers, model codes, or visual uploads with video-frame extraction.
2. **Troubleshoot Problems**: Guided diagnostic reasoning for mechanical, electrical, and OBD-II faults with strict automotive safety guardrails (Immediate **Stop-Driving** alerts for brake loss, steering disconnect, fire/smoke, or severe overheating).
3. **Verify Spare Parts Compatibility**: Check OEM numbers, parts catalogs, and compatibility records (never guessing fitment solely based on visual appearance).
4. **Compare Multi-Store Prices**: Compare live prices across Boodmo (India), Amazon.in, and eBay with normalized INR total costs (including shipping fees).

---

## 🔑 WHERE TO PASTE API KEYS & HOW TO GET THEM

All API keys are configured securely on the server via the root environment file:

```text
C:\Users\student\Documents\autowise ai\.env
```

Open `.env` in any text editor and fill in the corresponding variables:

| External Service | Environment Variable | Where to Get Your API Key (Direct Links) | Cost / Requirements |
| :--- | :--- | :--- | :--- |
| **OpenAI (GPT-4o Vision)** | `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Pay-as-you-go OpenAI developer account |
| **NVIDIA NIM Microservices** | `NVIDIA_NIM_API_KEY` | [build.nvidia.com](https://build.nvidia.com/) | Free developer credits upon signing in |
| **Google Gemini Multimodal** | `GEMINI_API_KEY` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) | Free tier available via Google AI Studio |
| **Anthropic Claude 3.5** | `ANTHROPIC_API_KEY` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) | Anthropic console account |
| **NHTSA vPIC Global VIN** | `ENABLE_NHTSA_VPIC="true"` | [vpic.nhtsa.dot.gov/api](https://vpic.nhtsa.dot.gov/api/) | **100% FREE PUBLIC GOV API** (Zero keys needed!) |
| **eBay Browse API** | `EBAY_CLIENT_ID`<br>`EBAY_CLIENT_SECRET` | [developer.ebay.com](https://developer.ebay.com/) | Free eBay developer account -> Create App |
| **Amazon PA-API v5 (India)**| `AMAZON_PAAPI_ACCESS_KEY`<br>`AMAZON_PAAPI_SECRET_KEY` | [affiliate-program.amazon.in](https://affiliate-program.amazon.in/) | Amazon Associates Account with approved PA-API |
| **Google Custom Search (Boodmo)**| `GOOGLE_SEARCH_API_KEY`<br>`GOOGLE_SEARCH_ENGINE_ID` | [developers.google.com/custom-search](https://developers.google.com/custom-search/v1/overview) | Google Cloud Console & Programmable Search Engine |

> 💡 **Notice on Zero-Friction Out-of-the-Box Operation**:
> Even before you add paid external API keys, AutoWise AI **runs completely out of the box**! It features:
> - Built-in expert automotive diagnostic rule engine
> - Live NHTSA Government VIN decoder (active by default)
> - Verified automotive specification database (Maruti Swift, Hyundai Creta, Tata Nexon, Toyota Fortuner, Royal Enfield Classic 350)
> - Seeded genuine OEM parts catalog with verified Boodmo, Amazon, and eBay pricing

---

## 🛠️ QUICK START & INSTALLATION

### 1. Requirements
- Node.js 18+ (tested on Node.js 24)
- npm 10+

### 2. Database Synchronization & Seeding
AutoWise AI uses Prisma with a local SQLite database (`prisma/dev.db`), requiring zero database server installation:

```bash
# Push schema to database
npx prisma db push

# Populate demonstration vehicles, OBD codes, parts, and prices
npm run db:seed
```

### 3. Run Automated Acceptance Tests
Run the automated test runner to verify all 15 acceptance criteria:

```bash
npm test
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📱 CORE PAGES & ROUTES

| URL Route | Purpose & Specifications |
| :--- | :--- |
| `/` | **Home Dashboard**: 3 primary actions (Identify Vehicle, Troubleshoot, Compare Parts) + Quick Scenarios |
| `/identify` | **Vehicle ID Wizard**: 4 tabs (Manual specs, 17-digit VIN, Photo upload, Video keyframe analysis) |
| `/vehicles/[id]` | **Vehicle Profile**: Verified factory technical specifications & guaranteed fitment parts list |
| `/troubleshoot` | **Guided Troubleshooter**: Symptoms in natural language, OBD-II codes, warning lights, quick presets |
| `/reports/[id]` | **Diagnostic Report**: Safety level alert (Stop-Driving, Urgent, Caution), ranked root causes, INR repair cost |
| `/parts` | **Spare Parts Finder**: Search by OEM part number or component with strict fitment validation |
| `/compare` | **Price Comparison**: Filter by lowest cost, retailer (Boodmo, Amazon, eBay), genuine vs aftermarket |
| `/saved` | **My Garage**: View registered personal vehicles and historical diagnostic reports |
| `/admin/integrations` | **API Dashboard**: Live connectivity status, test pings, and direct credential links |
| `/safety` | **Automotive Safety Protocols**: Emergency triggers, airbag & emissions prohibitions, disclaimer |
| `/settings` | **Settings & Privacy**: Currency (INR/USD), metric units, upload cache purge |
| `/auth` | **Account Management**: 1-click Demo Account switcher (Rahul Sharma / Administrator) |

---

## 🛡️ SAFETY & ETHICAL RULES
- **Immediate Stop-Driving Classification**: Hydraulic brake failure, steering detachment, active smoke/fire, or severe overheating trigger an unmistakable emergency banner.
- **Airbag & SRS Protection**: The AI strictly refuses to instruct unqualified users to dismantle airbags or seatbelt pretensioners.
- **Emissions System Integrity**: Recommendations to bypass or remove catalytic converters, DPF, or EGR valves are blocked.
- **No Fabricated Data**: If an external API is not configured or an unknown model is queried, AutoWise AI returns an honest explanation with a direct search link rather than hallucinated prices or specs.
