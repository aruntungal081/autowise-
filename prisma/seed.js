const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting AutoWise AI database seeding...');

  // 1. Seed Users
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@autowise.ai' },
    update: {},
    create: {
      email: 'admin@autowise.ai',
      name: 'AutoWise Administrator',
      passwordHash,
      role: 'admin',
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: 'user@autowise.ai' },
    update: {},
    create: {
      email: 'user@autowise.ai',
      name: 'Rahul Sharma',
      passwordHash,
      role: 'user',
    },
  });

  console.log('✓ Users created');

  // 2. Seed Verified Vehicles
  const vehiclesData = [
    {
      id: 'veh_swift_2022',
      make: 'Maruti Suzuki',
      model: 'Swift',
      variant: 'ZXi 1.2L DualJet',
      yearStart: 2021,
      yearEnd: 2024,
      bodyType: 'Hatchback',
      fuelType: 'Petrol',
      engineSizeCc: 1197,
      transmission: 'Manual 5-Speed',
      horsepower: 89,
      torqueNm: 113,
      drivetrain: 'FWD',
      modelCode: 'SWIFT-K12N',
      vinPrefix: 'MA3F',
      marketRegion: 'India',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      specSource: 'Maruti Suzuki OEM Factory Specs',
    },
    {
      id: 'veh_creta_2023',
      make: 'Hyundai',
      model: 'Creta',
      variant: 'SX(O) 1.5L CRDi',
      yearStart: 2020,
      yearEnd: 2024,
      bodyType: 'SUV',
      fuelType: 'Diesel',
      engineSizeCc: 1493,
      transmission: 'Automatic 6-Speed',
      horsepower: 113,
      torqueNm: 250,
      drivetrain: 'FWD',
      modelCode: 'SU2i-DSL',
      vinPrefix: 'MALC',
      marketRegion: 'India & APAC',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      specSource: 'Hyundai Motor India Technical Manual',
    },
    {
      id: 'veh_city_2022',
      make: 'Honda',
      model: 'City',
      variant: 'ZX 1.5L i-VTEC (5th Gen)',
      yearStart: 2020,
      yearEnd: 2024,
      bodyType: 'Sedan',
      fuelType: 'Petrol',
      engineSizeCc: 1498,
      transmission: 'CVT with Paddle Shift',
      horsepower: 119,
      torqueNm: 145,
      drivetrain: 'FWD',
      modelCode: 'GN2-iVTEC',
      vinPrefix: 'MAK',
      marketRegion: 'India & ASEAN',
      imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      specSource: 'Honda Cars Technical Library',
    },
    {
      id: 'veh_nexon_ev_2023',
      make: 'Tata',
      model: 'Nexon EV',
      variant: 'Empowered Plus Long Range',
      yearStart: 2023,
      yearEnd: 2025,
      bodyType: 'SUV',
      fuelType: 'Electric',
      engineSizeCc: 0,
      transmission: 'Single Speed Automatic',
      horsepower: 143,
      torqueNm: 215,
      drivetrain: 'FWD',
      modelCode: 'NEXON-EV-LR',
      vinPrefix: 'MAT6',
      marketRegion: 'India',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      specSource: 'Tata Motors EV Division',
    },
    {
      id: 'veh_re_classic350_2022',
      make: 'Royal Enfield',
      model: 'Classic 350',
      variant: 'Halcyon Series Dual-Channel ABS',
      yearStart: 2021,
      yearEnd: 2025,
      bodyType: 'Motorcycle',
      fuelType: 'Petrol',
      engineSizeCc: 349,
      transmission: 'Manual 5-Speed',
      horsepower: 20,
      torqueNm: 27,
      drivetrain: 'RWD Chain Drive',
      modelCode: 'J-PLATFORM-350',
      vinPrefix: 'ME3',
      marketRegion: 'India & Global',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      specSource: 'Royal Enfield Engineering Specs',
    },
    {
      id: 'veh_fortuner_2023',
      make: 'Toyota',
      model: 'Fortuner',
      variant: '2.8L 4x4 AT',
      yearStart: 2021,
      yearEnd: 2024,
      bodyType: 'SUV',
      fuelType: 'Diesel',
      engineSizeCc: 2755,
      transmission: 'Automatic 6-Speed',
      horsepower: 201,
      torqueNm: 500,
      drivetrain: 'AWD 4x4',
      modelCode: 'GUN156',
      vinPrefix: 'MBJ',
      marketRegion: 'Global & India',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      specSource: 'Toyota Motor Technical Data',
    }
  ];

  for (const v of vehiclesData) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: v,
      create: v,
    });
  }
  console.log(`✓ ${vehiclesData.length} Vehicles seeded`);

  // 3. Seed Spare Parts
  const partsData = [
    {
      id: 'part_front_brake_pads_swift',
      partNumber: '55810M68P00',
      name: 'Front Disc Brake Pad Set',
      category: 'Braking System',
      description: 'High-friction ceramic-metallic compound brake pads engineered for low brake dust and fade resistance.',
      oemNumber: '55810M68P00',
      oemBrand: 'Maruti Suzuki Genuine Parts (MSGP)',
      imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'part_oil_filter_swift',
      partNumber: '16510M68K00',
      name: 'Engine Spin-on Oil Filter',
      category: 'Filtration',
      description: 'Synthetic blend media filter trapping particulates down to 20 microns. Anti-drainback silicone valve.',
      oemNumber: '16510M68K00',
      oemBrand: 'Maruti Suzuki Genuine Parts',
      imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'part_spark_plug_iridium_swift',
      partNumber: 'SILKR6F11',
      name: 'NGK Laser Iridium Spark Plug (Set of 4)',
      category: 'Ignition & Electrical',
      description: '0.6mm laser-welded iridium center electrode providing superior ignitability and 100,000 km service life.',
      oemNumber: '09482-00647',
      oemBrand: 'NGK Spark Plugs / Suzuki',
      imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'part_o2_sensor_creta',
      partNumber: '39210-2B100',
      name: 'Heated Upstream Oxygen (O2) Sensor',
      category: 'Exhaust & Emissions',
      description: 'Zirconia electrolyte sensing element measuring stoichiometric exhaust air-fuel ratio for ECM fuel trim.',
      oemNumber: '39210-2B100',
      oemBrand: 'Hyundai Genuine Parts / Bosch',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'part_chain_sprocket_re350',
      partNumber: 'RAM00057/A',
      name: 'Chain and Sprocket Drive Kit (O-Ring)',
      category: 'Transmission & Drive',
      description: 'Heavy duty 525 pitch gold O-ring chain with induction hardened 16T front and 42T rear sprockets.',
      oemNumber: 'RAM00057/A',
      oemBrand: 'Royal Enfield Genuine Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'part_brake_rotors_creta',
      partNumber: '51712-A0000',
      name: 'Front Ventilated Brake Disc Rotors (Pair)',
      category: 'Braking System',
      description: 'High-carbon cast iron rotors with anti-corrosion geomet coating and directional cooling vanes.',
      oemNumber: '51712-A0000',
      oemBrand: 'Hyundai Genuine Parts',
      imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    }
  ];

  for (const p of partsData) {
    await prisma.sparePart.upsert({
      where: { partNumber: p.partNumber },
      update: p,
      create: p,
    });
  }
  console.log(`✓ ${partsData.length} Spare parts seeded`);

  // 4. Seed Compatibilities
  const compatibilities = [
    {
      partId: 'part_front_brake_pads_swift',
      vehicleId: 'veh_swift_2022',
      confidence: 1.0,
      evidenceSource: 'MSGP Catalog Bulletin #BRK-2022-4',
      notes: 'Direct 100% bolt-on fitment for 3rd & 4th Gen Swift (2018-2024).'
    },
    {
      partId: 'part_oil_filter_swift',
      vehicleId: 'veh_swift_2022',
      confidence: 1.0,
      evidenceSource: 'Suzuki Global Parts EPC',
      notes: 'Fits all K-Series 1.2L DualJet petrol engines.'
    },
    {
      partId: 'part_spark_plug_iridium_swift',
      vehicleId: 'veh_swift_2022',
      confidence: 1.0,
      evidenceSource: 'NGK Application Catalog 2024',
      notes: 'OEM specified heat range 6 with 1.1mm pre-gapped electrode.'
    },
    {
      partId: 'part_o2_sensor_creta',
      vehicleId: 'veh_creta_2023',
      confidence: 0.98,
      evidenceSource: 'Mobis Hyundai EPC',
      notes: 'Upstream sensor 1 before catalytic converter.'
    },
    {
      partId: 'part_brake_rotors_creta',
      vehicleId: 'veh_creta_2023',
      confidence: 1.0,
      evidenceSource: 'Hyundai Workshop Manual Group 58',
      notes: 'Fits Creta SX/SX(O) 280mm rotor diameter.'
    },
    {
      partId: 'part_chain_sprocket_re350',
      vehicleId: 'veh_re_classic350_2022',
      confidence: 1.0,
      evidenceSource: 'Royal Enfield J-Platform Technical Spec',
      notes: 'Designed specifically for J-Series engine output and frame swingarm length.'
    }
  ];

  for (const c of compatibilities) {
    await prisma.partCompatibility.upsert({
      where: {
        partId_vehicleId: {
          partId: c.partId,
          vehicleId: c.vehicleId,
        }
      },
      update: c,
      create: c,
    });
  }
  console.log('✓ Compatibilities seeded');

  // 5. Seed Retailer Listings (Demonstration verified marketplace prices)
  const listingsData = [
    // Brake Pads Swift
    {
      id: 'list_boodmo_swift_brake',
      partId: 'part_front_brake_pads_swift',
      retailerName: 'Boodmo (India)',
      retailerUrl: 'https://boodmo.com/catalog/part-brake_pad_set-55810M68P00/',
      productTitle: 'Maruti Genuine Front Brake Pad Kit 55810M68P00',
      price: 1240.0,
      shippingCost: 80.0,
      totalCost: 1320.0,
      currency: 'INR',
      condition: 'genuine',
      inStock: true,
      deliveryEstimate: '2-4 business days (Delhi NCR & Metros)',
      warrantyMonths: 6,
      sellerName: 'Smart Parts Online Private Limited',
      sellerRating: 4.6,
      sourceAttribution: 'Verified Automotive Marketplace Feed',
    },
    {
      id: 'list_amazon_swift_brake',
      partId: 'part_front_brake_pads_swift',
      retailerName: 'Amazon India',
      retailerUrl: 'https://www.amazon.in/dp/B08V3J7B8X?tag=autowise-21',
      productTitle: 'Bosch Front Disc Brake Pad Set for Maruti Swift (Ceramic Low Dust)',
      price: 1399.0,
      shippingCost: 0.0,
      totalCost: 1399.0,
      currency: 'INR',
      condition: 'aftermarket',
      inStock: true,
      deliveryEstimate: 'Prime 1-day delivery',
      warrantyMonths: 12,
      sellerName: 'Cloudtail Automotive / Appario',
      sellerRating: 4.4,
      sourceAttribution: 'Amazon PA-API / Merchant Verified',
    },
    {
      id: 'list_ebay_swift_brake',
      partId: 'part_front_brake_pads_swift',
      retailerName: 'eBay Global',
      retailerUrl: 'https://www.ebay.com/itm/Brembo-P-79-029-Front-Brake-Pad-Set-Suzuki-Swift',
      productTitle: 'Brembo Premium Ceramic Front Brake Pads P 79 029 for Suzuki Swift',
      price: 2450.0,
      shippingCost: 450.0,
      totalCost: 2900.0,
      currency: 'INR',
      condition: 'aftermarket',
      inStock: true,
      deliveryEstimate: '7-12 days international priority',
      warrantyMonths: 24,
      sellerName: 'AutoPartsEurope UK Top Rated Plus',
      sellerRating: 4.9,
      sourceAttribution: 'eBay Browse API Direct Feed',
    },

    // Oil filter Swift
    {
      id: 'list_boodmo_swift_oil',
      partId: 'part_oil_filter_swift',
      retailerName: 'Boodmo (India)',
      retailerUrl: 'https://boodmo.com/catalog/part-oil_filter-16510M68K00/',
      productTitle: 'Maruti Suzuki Genuine Engine Oil Filter 16510M68K00',
      price: 110.0,
      shippingCost: 50.0,
      totalCost: 160.0,
      currency: 'INR',
      condition: 'genuine',
      inStock: true,
      deliveryEstimate: '1-3 business days',
      warrantyMonths: 3,
      sellerName: 'MSIL Authorized Distributor',
      sellerRating: 4.8,
      sourceAttribution: 'Boodmo Marketplace Feed',
    },
    {
      id: 'list_amazon_swift_oil',
      partId: 'part_oil_filter_swift',
      retailerName: 'Amazon India',
      retailerUrl: 'https://www.amazon.in/dp/B07XYZ999?tag=autowise-21',
      productTitle: 'Purolator / Mahle Premium Oil Filter for Maruti Swift Petrol',
      price: 145.0,
      shippingCost: 40.0,
      totalCost: 185.0,
      currency: 'INR',
      condition: 'aftermarket',
      inStock: true,
      deliveryEstimate: '2 business days',
      warrantyMonths: 6,
      sellerName: 'AutoDirect Express',
      sellerRating: 4.3,
      sourceAttribution: 'Amazon PA-API',
    },

    // Spark Plugs Swift
    {
      id: 'list_boodmo_spark_plug',
      partId: 'part_spark_plug_iridium_swift',
      retailerName: 'Boodmo (India)',
      retailerUrl: 'https://boodmo.com/catalog/part-spark_plug_iridium-SILKR6F11/',
      productTitle: 'NGK Laser Iridium Long-Life Spark Plug (SILKR6F11) Pack of 4',
      price: 2600.0,
      shippingCost: 0.0,
      totalCost: 2600.0,
      currency: 'INR',
      condition: 'genuine',
      inStock: true,
      deliveryEstimate: '3-4 business days',
      warrantyMonths: 12,
      sellerName: 'NGK Spark Plugs India Authorized',
      sellerRating: 4.9,
      sourceAttribution: 'Boodmo Verified Dealer',
    },
    {
      id: 'list_amazon_spark_plug',
      partId: 'part_spark_plug_iridium_swift',
      retailerName: 'Amazon India',
      retailerUrl: 'https://www.amazon.in/dp/B08NGK1234?tag=autowise-21',
      productTitle: 'NGK Laser Iridium Spark Plug SILKR6F11 - Set of 4',
      price: 2750.0,
      shippingCost: 0.0,
      totalCost: 2750.0,
      currency: 'INR',
      condition: 'genuine',
      inStock: true,
      deliveryEstimate: '1-day Prime',
      warrantyMonths: 12,
      sellerName: 'Speedway Autocare',
      sellerRating: 4.7,
      sourceAttribution: 'Amazon PA-API Feed',
    },

    // O2 Sensor Creta
    {
      id: 'list_boodmo_o2_creta',
      partId: 'part_o2_sensor_creta',
      retailerName: 'Boodmo (India)',
      retailerUrl: 'https://boodmo.com/catalog/part-oxygen_sensor-392102B100/',
      productTitle: 'Hyundai Mobis Genuine Heated O2 Sensor 39210-2B100',
      price: 3850.0,
      shippingCost: 0.0,
      totalCost: 3850.0,
      currency: 'INR',
      condition: 'genuine',
      inStock: true,
      deliveryEstimate: '2-4 business days',
      warrantyMonths: 12,
      sellerName: 'Mobis South Asia Parts Hub',
      sellerRating: 4.9,
      sourceAttribution: 'Verified Mobis EPC',
    },
    {
      id: 'list_ebay_o2_creta',
      partId: 'part_o2_sensor_creta',
      retailerName: 'eBay Global',
      retailerUrl: 'https://www.ebay.com/itm/Bosch-Upstream-O2-Sensor-Hyundai-Creta-1-5',
      productTitle: 'Bosch Original Equipment Direct Fit Lambda Oxygen Sensor',
      price: 3200.0,
      shippingCost: 550.0,
      totalCost: 3750.0,
      currency: 'INR',
      condition: 'aftermarket',
      inStock: true,
      deliveryEstimate: '8-14 business days',
      warrantyMonths: 12,
      sellerName: 'Global Bosch Partner DE',
      sellerRating: 4.8,
      sourceAttribution: 'eBay Browse API',
    }
  ];

  for (const l of listingsData) {
    await prisma.retailerListing.upsert({
      where: { id: l.id },
      update: l,
      create: l,
    });
  }
  console.log(`✓ ${listingsData.length} Retailer listings seeded`);

  // 6. Seed API Provider Configurations
  const providerConfigs = [
    {
      id: 'prov_openai',
      providerKey: 'openai',
      displayName: 'OpenAI (GPT-4o Vision & Reasoning)',
      category: 'ai',
      isEnabled: Boolean(process.env.OPENAI_API_KEY),
      status: process.env.OPENAI_API_KEY ? 'connected' : 'missing_credentials',
      statusReason: process.env.OPENAI_API_KEY ? 'API key detected in environment' : 'OPENAI_API_KEY is not set in .env',
    },
    {
      id: 'prov_nvidia_nim',
      providerKey: 'nvidia_nim',
      displayName: 'NVIDIA NIM (Automotive AI Microservices)',
      category: 'ai',
      isEnabled: Boolean(process.env.NVIDIA_NIM_API_KEY),
      status: process.env.NVIDIA_NIM_API_KEY ? 'connected' : 'missing_credentials',
      statusReason: process.env.NVIDIA_NIM_API_KEY ? 'NVIDIA NIM endpoint configured' : 'NVIDIA_NIM_API_KEY is not set in .env',
    },
    {
      id: 'prov_gemini',
      providerKey: 'gemini',
      displayName: 'Google Gemini (Multimodal Vision & Video)',
      category: 'ai',
      isEnabled: Boolean(process.env.GEMINI_API_KEY),
      status: process.env.GEMINI_API_KEY ? 'connected' : 'missing_credentials',
      statusReason: process.env.GEMINI_API_KEY ? 'Gemini API key loaded' : 'GEMINI_API_KEY is not set in .env',
    },
    {
      id: 'prov_nhtsa_vin',
      providerKey: 'nhtsa_vin',
      displayName: 'NHTSA vPIC Global VIN Decoder',
      category: 'vehicle_data',
      isEnabled: true,
      status: 'connected',
      statusReason: 'Free Public Government API (Active, zero credentials needed)',
    },
    {
      id: 'prov_ebay_browse',
      providerKey: 'ebay_browse',
      displayName: 'eBay Browse API (Automotive Marketplace)',
      category: 'marketplace',
      isEnabled: Boolean(process.env.EBAY_CLIENT_ID),
      status: process.env.EBAY_CLIENT_ID ? 'configured_untested' : 'missing_credentials',
      statusReason: process.env.EBAY_CLIENT_ID ? 'Client ID configured' : 'EBAY_CLIENT_ID and EBAY_CLIENT_SECRET not set in .env',
    },
    {
      id: 'prov_amazon_paapi',
      providerKey: 'amazon_paapi',
      displayName: 'Amazon Product Advertising API (PA-API v5)',
      category: 'marketplace',
      isEnabled: Boolean(process.env.AMAZON_PAAPI_ACCESS_KEY),
      status: process.env.AMAZON_PAAPI_ACCESS_KEY ? 'configured_untested' : 'missing_credentials',
      statusReason: process.env.AMAZON_PAAPI_ACCESS_KEY ? 'Associate tag configured' : 'AMAZON_PAAPI credentials not set in .env',
    },
    {
      id: 'prov_boodmo',
      providerKey: 'boodmo',
      displayName: 'Boodmo India Automotive Parts Catalog',
      category: 'marketplace',
      isEnabled: true,
      status: 'connected',
      statusReason: 'Connected via direct part number catalog URL integration & verified listings',
    }
  ];

  for (const prov of providerConfigs) {
    await prisma.apiProviderConfig.upsert({
      where: { providerKey: prov.providerKey },
      update: prov,
      create: prov,
    });
  }
  console.log(`✓ ${providerConfigs.length} API Provider configurations seeded`);

  // 7. Seed Sample Diagnostic Report
  const sampleReport = await prisma.diagnosticReport.upsert({
    where: { id: 'rep_demo_misfire_swift' },
    update: {},
    create: {
      id: 'rep_demo_misfire_swift',
      userId: demoUser.id,
      vehicleId: 'veh_swift_2022',
      summary: 'Engine shudder and Check Engine light blinking under acceleration with trouble code P0300 (Random Cylinder Misfire).',
      safetyLevel: 'urgent',
      safetyWarning: 'A blinking Check Engine Light indicates raw unburned fuel is entering the exhaust stream, which can rapidly overheat and destroy the catalytic converter. Minimize driving and avoid heavy engine load.',
      mostLikelyCauses: JSON.stringify([
        {
          cause: 'Worn or fouled spark plug electrodes or carbon buildup',
          probability: '72%',
          evidence: 'Code P0300 on high mileage K-Series engine with misfire under load. Plug gap exceeding 1.3mm.'
        },
        {
          cause: 'Failing ignition coil on cylinder 2 or 3',
          probability: '18%',
          evidence: 'Secondary insulation breakdown causing spark arc-over under cylinder compression.'
        },
        {
          cause: 'Clogged fuel injector or low fuel pressure',
          probability: '10%',
          evidence: 'Lean air-fuel mixture causing incomplete flame propagation.'
        }
      ]),
      alternativeCauses: JSON.stringify([
        'Intake manifold vacuum leak downstream of throttle body',
        'Clogged engine air filter causing rich bog',
        'Contaminated fuel containing water or ethanol phase separation'
      ]),
      preliminaryChecks: JSON.stringify([
        'Verify if Check Engine Light is solid or actively blinking.',
        'Visually inspect ignition coil wiring harness for rodent chew or loose connectors.',
        'Check engine oil level and condition on dipstick.',
        'Listen for hissing sound indicating cracked intake vacuum hose.'
      ]),
      recommendedTests: JSON.stringify([
        'Read live freeze-frame data using OBD-II scanner to identify which cylinder registered highest misfire count.',
        'Remove spark plugs and inspect insulator tip coloration (tan = normal, black = carbon fouled, white = lean).',
        'Swap ignition coil between Cylinder 1 and Cylinder 2 to observe if misfire code follows the coil (e.g., P0301 to P0302).'
      ]),
      requiredTools: JSON.stringify([
        '16mm (5/8 inch) Magnetic Spark Plug Socket',
        '3/8 inch Ratchet and 6 inch Extension Bar',
        'Spark Plug Gap Gauge (Feeler gauge)',
        'Basic OBD-II Scan Tool or ELM327 Bluetooth Adapter',
        'Dielectric Grease'
      ]),
      repairDifficulty: 'Moderate (DIY-friendly with standard hand tools)',
      costEstimateMin: 1200,
      costEstimateMax: 4500,
      currency: 'INR',
      mechanicRecommended: false,
      recommendedParts: JSON.stringify([
        'NGK Laser Iridium Spark Plugs (Part #SILKR6F11)',
        'Maruti OEM Ignition Coil Assembly'
      ]),
      referenceLinks: JSON.stringify([
        { title: 'Maruti Suzuki K12N Workshop Service Bulletin on Ignition Servicing', url: 'https://marutisuzuki.com' },
        { title: 'OBD-II Code P0300 Technical Diagnostic Procedure', url: 'https://www.obd-codes.com/p0300' }
      ])
    }
  });

  console.log('✓ Demonstration diagnostic report seeded');

  // Also seed a SavedVehicle for Rahul Sharma
  await prisma.savedVehicle.upsert({
    where: { id: 'saved_rahul_swift' },
    update: {},
    create: {
      id: 'saved_rahul_swift',
      userId: demoUser.id,
      vehicleId: 'veh_swift_2022',
      nickname: 'Daily Commute Swift',
      licenseNo: 'DL 08 CA 4921',
    }
  });

  console.log('✅ Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
