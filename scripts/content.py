"""Editorial content of www.ullswaterinvestments.com (migrated from Google Sites, revised in English).
Edit the texts here; build.py turns them into pages."""

BOOK = "https://calendar.google.com/calendar/embed?src=7a3bd11cf6e17f080e9d1a55ed62c5c1d079b85adca160751fc60cc917432da2@group.calendar.google.com"
EMAIL = "eufunding@ullswaterinvestments.com"
CALLS = "https://calls.ullswaterinvestments.com"
NEWS = "https://news.ullswaterinvestments.com"
EVENTS = "https://events.ullswaterinvestments.com"

MISSION = ("Our mission is to empower European innovation and sustainable growth by demystifying and unlocking public finance. "
           "Groundbreaking projects and ambitious companies are the engine of Europe's future, and we help them secure the financial resources they need to thrive.")

TEAM = ("Our team of senior consultants brings together backgrounds in public finance, grant writing, venture capital and European policy. "
        "We understand not just the written rules of each call for proposals, but also the priorities and logic of the institutions behind it.")

PARTNER_QUOTE = ("We work not as transactional consultants but as embedded strategic partners. EU funding demands clear communication and well-defined roles "
                 "among partners, so we join your team to co-develop the funding strategy from the ground up. We manage the whole process: identifying the right call, "
                 "building the consortium, writing the proposal and handling communication after submission. The result is a coherent, powerful application, "
                 "while your team stays focused on what it does best: innovation and execution.")

HOW_FUNDING = ("EU funding is not a single source but an ecosystem with its own logic, priorities and mechanisms: grants managed directly by the European Commission, "
               "funds managed by national and regional authorities, loans from the European Investment Bank and venture capital backed by the European Investment Fund. "
               "Understanding how these pieces fit together is the first step towards a successful funding strategy.")

EXPLORE = [
    ("Horizon Europe", "The EU's main research and innovation programme, from frontier science to market uptake.",
     "https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en", "🔬"),
    ("European Green Deal", "Funding for climate, environment and sustainability projects.",
     "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal/finance-and-green-deal_en", "🌱"),
    ("REPowerEU", "Funding for clean energy, energy savings and energy security.",
     "https://commission.europa.eu/topics/energy/repowereu_en", "⚡"),
    ("Defence", "Funding for defence, security and dual-use capabilities: EDF, EDIP and more.",
     "https://commission.europa.eu/topics/defence/future-european-defence_en", "🛡️"),
    ("European Investment Fund", "Europe's leading provider of risk finance for entrepreneurship and innovation, investing through VC funds.",
     "https://www.eif.org/index.htm", "📈"),
    ("InvestEU", "A single EU guarantee that mobilises over €372 billion of public and private investment.",
     "https://investeu.europa.eu/index_en", "🏦"),
]

EIF_TEXT = [
    "The EIF, part of the European Investment Bank Group, is Europe's leading developer of risk financing for entrepreneurship and innovation. "
    "It does not invest directly in companies: it acts as a cornerstone investor in the European venture capital ecosystem, filling market gaps where "
    "high-risk, high-impact innovation struggles to attract purely private capital.",
    "EIF-backed funds bring \"smart money\" and expertise, and invest in the most promising high-tech companies in sectors such as life sciences, cleantech and ICT. "
    "Being investment ready therefore means being prepared to pass the rigorous due diligence of these professional, market-driven investors.",
]

INVESTEU_TEXT = ("The InvestEU programme is the EU's single investment support mechanism. It gives an EU budget guarantee to implementing partners such as the EIB and the EIF, "
                 "so they can take on higher-risk projects. It is organised in four policy windows: sustainable infrastructure; research, innovation and digitisation; "
                 "SMEs; and social investment and skills.")

SERVICES = [
    ("investment-readiness", "Investment Readiness",
     "Prepare your company and your proposal to meet the standards of EU evaluators, the EIB and EIF-backed investors."),
    ("eu-fund-matching", "EU Fund Matching",
     "Find the grant, loan or equity instrument, and the exact call, with the highest probability of success for your project."),
    ("strategic-positioning", "Strategic Positioning",
     "Become a visible, credible partner for the European Commission, the EIB and EU consortia, and turn that position into funded projects."),
]

TOOLS = [
    ("Open EU calls", "Every open and forthcoming call, updated daily from the EU portal.", CALLS + "/"),
    ("Fund Finder", "Describe your project and get a ranked shortlist of matching calls.", CALLS + "/finder/"),
    ("AI pre-check", "Test your idea against a call: fit, indicative scores and gaps.", CALLS + "/review/"),
    ("Partner board", "Find consortium partners or offer to join one.", CALLS + "/partners/"),
    ("Spain", "National and regional R&D and industry calls from the BDNS.", CALLS + "/spain/"),
    ("Email alerts", "A free weekly email with new calls for your keywords.", CALLS + "/alerts/"),
]

# ---------- Investment Readiness ----------
IR_INTRO = [
    "Securing European funding, whether a grant, a loan or an equity investment, takes more than a brilliant idea. It is a highly competitive process in which your project "
    "is judged on its intrinsic merit and also on its presentation, strategic alignment and professional credibility.",
    "European institutions such as the Commission's Directorates-General, the European Investment Bank (EIB) and the European Investment Fund (EIF) are stewards of public capital. "
    "They need to see a project that is innovative, viable, well managed and closely aligned with their objectives.",
    "Presenting your project the right way is not about appearances. It is about showing a deep understanding of the funding landscape and presenting your project with the clarity "
    "and professionalism that inspire confidence. A poorly structured proposal, a misaligned business case or a missed formality can sink even a groundbreaking project. "
    "Our advisory services make sure your company is ready to meet these standards from the very first interaction.",
]
IR_NEED = ("A robust, bankable project with a well-developed business plan. The EIB and its financial intermediaries need to be convinced of your project's long-term financial "
           "sustainability and of its fit with strategic priorities such as the green and digital transitions. An EIB-backed loan often has a signalling effect that makes it "
           "easier to attract other private investors.")
IR_PITFALLS = [
    "A vague problem definition or a weak business case.",
    "No real-world validation or market traction.",
    "No clear path to profitability and scale.",
    "Poorly prepared investor documents and a weak pitch.",
]
IR_QUOTE = ("Falling short in any of these areas signals risk to the funding body. Our role is to help you reduce that risk by building a compelling, professional case "
            "tailored to the type of funding you are seeking.")
PILLARS = [
    ("Strategic alignment", "Does your project directly contribute to the stated policy goals of the funding programme?"),
    ("Project viability", "Is your plan realistic, your budget coherent and your business model sound?"),
    ("Professional execution", "Is the application flawless, compliant with every rule and presented with absolute clarity?"),
]
PHASES = [
    ("Phase 1", "Strategic preparation", "Before you write, lay the foundations.", [
        ("Internal analysis", "Assess your strengths, resources and innovation capacity."),
        ("Opportunity watch", "Monitor the official portals and shortlist the calls that best match your strategy."),
        ("Consortium building", "Find reliable, complementary partners when the call requires a consortium. The Enterprise Europe Network (EEN) can help."),
    ]),
    ("Phase 2", "The three pillars of evaluation", "Evaluators look for clarity and coherence: strategic alignment, viability and professional execution.", []),
    ("Phase 3", "Execution and submission", "The quality of the submission is the evaluators' first impression.", [
        ("Clear writing", "Use clear, concise and persuasive language, free of jargon and errors."),
        ("External review", "Ask experts for feedback. National Contact Points (NCPs) offer free guidance; in Spain, see the official Horizon Europe portal."),
        ("Current framework", "Calls for 2026–2027 follow the Horizon Europe Work Programme 2026–2027. Horizon Europe ends in 2027 and its successor, FP10 (2028–2034), "
                              "is still being negotiated, so plan multi-year funding roadmaps with both in mind."),
        ("Timely submission", "Submit through the EU Funding & Tenders Portal well before the deadline. Horizon Europe calls close at 17:00 Brussels time and late proposals are not accepted."),
    ]),
]
IR_LINKS = [
    ("Enterprise Europe Network", "https://een.ec.europa.eu/"),
    ("National Contact Points", "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/ncp"),
    ("Horizon Europe in Spain (official portal)", "https://www.horizonteeuropa.es/"),
    ("EU Funding & Tenders Portal", "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home"),
]
VC_DOMAINS = [
    ("👥", "Compelling team", "Show expertise and the capacity to execute."),
    ("📈", "Scalable business model", "Show a clear path to significant market share."),
    ("💡", "Protected IP", "Secure your technology or innovation."),
    ("💶", "Robust financials", "Present clear projections and metrics."),
]

# ---------- EU Fund Matching ----------
FM_INTRO = ("We analyse your project's objectives, sector and scope to navigate the EU funding matrix. We identify the most suitable programme, whether Horizon Europe, "
            "Digital Europe or a national fund, and pinpoint the call that gives you the highest probability of success.")
FM_PILLARS = [
    ("Grants", "Non-repayable funding for projects aligned with EU policy.",
     [("The challenge", "Hundreds of programmes (Horizon Europe, LIFE, Digital Europe…) with specific, competitive calls, managed either directly by the Commission or by national authorities."),
      ("Our expertise", "We identify the programme and the exact call with the highest probability of success for your project.")]),
    ("Loans", "Favourable debt financing backed by the European Investment Bank (EIB).",
     [("The challenge", "The EIB lends to SMEs through local partner banks: you apply to a bank in your country, not to the EIB."),
      ("Our expertise", "We match your needs with local lenders that have active EIB credit lines.")]),
    ("Capital", "Venture capital through funds backed by the European Investment Fund (EIF).",
     [("The challenge", "The EIF invests in VC funds, not directly in start-ups: you need to raise from an EIF-backed fund."),
      ("Our expertise", "We get you investment ready and introduce you to the right EIF-backed investors.")]),
]
FM_DIRECT = [
    ("Horizon Europe", "The EU's key programme for research and innovation, from fundamental science to market uptake.", "Researchers, companies, SMEs",
     "https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en"),
    ("Digital Europe Programme", "Digital transformation of Europe's economy and society: AI, HPC, cybersecurity, skills.", "SMEs, public sector",
     "https://digital-strategy.ec.europa.eu/en/activities/digital-programme"),
    ("InvestEU", "Mobilises private investment for strategic, sustainable and innovative projects through budget guarantees.", "Companies of all sizes, investors",
     "https://investeu.europa.eu/index_en"),
    ("LIFE Programme", "The EU's instrument for the environment, nature conservation and climate action.", "Companies, NGOs, public sector",
     "https://cinea.ec.europa.eu/programmes/life_en"),
    ("Creative Europe", "Supports the cultural, creative and audiovisual sectors.", "Cultural organisations, audiovisual sector",
     "https://culture.ec.europa.eu/creative-europe"),
    ("Erasmus+", "Mobility and cooperation in education, training, youth and sport.", "Education, youth, sport",
     "https://erasmus-plus.ec.europa.eu/"),
]
FM_SHARED = [
    ("Cohesion funds (ERDF, ESF+)", "Reduce disparities between EU regions by funding infrastructure, jobs and SME competitiveness.", "Public authorities, SMEs, NGOs",
     "https://ec.europa.eu/regional_policy/funding_en"),
    ("Common Agricultural Policy", "Supports farmers, food security and sustainable rural development.", "Farmers, rural associations",
     "https://agriculture.ec.europa.eu/common-agricultural-policy_en"),
    ("NextGenerationEU (RRF)", "The temporary recovery plan focused on the green and digital transitions.", "Public sector, companies, R&D&I",
     "https://next-generation-eu.europa.eu/index_en"),
]
FM_GATEWAYS = [
    ("EU Funding & Tenders Portal", "The European Commission's single gateway for finding and managing EU grants and procurement contracts.",
     "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home"),
    ("EIB-backed loans", "Find the EIB's partner institutions in your country on the EIB website, then apply to that bank, mentioning your interest in an EIB-backed loan.",
     "https://www.eib.org/en/projects/loans/index.htm"),
    ("InvestEU guarantee", "Works like an insurance policy: it absorbs part of the risk of strategic or higher-risk projects so that the EIB and other partners can lend.",
     "https://investeu.europa.eu/index_en"),
]

# ---------- Strategic Positioning ----------
SP_INTRO = "Success in EU funding is not only about innovation. It is about becoming a visible, credible and influential part of the European ecosystem."
SP_BUDGET = ("The EU budget is one of the largest investment pools in the world: around €2 trillion combining the 2021–2027 Multiannual Financial Framework and NextGenerationEU.")
SP_PROCESS = [("🔍", "Ecosystem mapping", "Identify the key institutions and opportunities."),
              ("📍", "Strategic positioning", "Build visibility and credibility."),
              ("📝", "Proposal crafting", "Develop a compelling, aligned narrative."),
              ("🏆", "Funding secured", "Navigate the evaluation and win support.")]
SP_WHY = [("Mastering complexity", "Deep working knowledge of the EU framework, its institutions and evolving policies, to find your precise opportunities."),
          ("Overcoming fierce competition", "High-impact proposals that match the call objectives and speak the evaluators' language."),
          ("Insider knowledge", "Context, established networks and an understanding of the unwritten rules that are hard to see from the outside.")]
SP_VALUE = [("Influence policy", "Take part in stakeholder consultations and help shape future frameworks and funding priorities for your sector."),
            ("Credibility and trust", "An application from a known organisation carries credibility in any funding or partnership negotiation."),
            ("Early intelligence", "Learn about upcoming calls and policy shifts early, and gain time to prepare winning strategies.")]
SP_HOW = [("Strategic ecosystem mapping", "A roadmap of the institutions, policymakers and platforms that matter most to your business."),
          ("Network access", "The right introductions, so your voice reaches the people who matter."),
          ("Your policy narrative", "We translate your commercial objectives into the language of EU policy, positioning you as a partner in the EU's strategic goals."),
          ("Tailored intelligence", "Curated, actionable intelligence so you can anticipate change and seize opportunities.")]

# ---------- About ----------
ABOUT_INTRO = ("Ullswater Investments is a European funding advisory and venture-building firm with offices in Madrid and Brussels. We help SMEs, start-ups, technology centres and consortia secure and "
               "manage EU and Spanish public funding, including Horizon Europe, the EIC, Digital Europe, CDTI, ENISA and Red.es, with particular expertise in data spaces, "
               "health data and sovereign AI.")
ABOUT_SECTIONS = [
    ("What we do", "We identify the EU and Spanish funding instruments that fit each project, match it with the right calls, write and coordinate proposals and consortia, and "
                   "support grant management and reporting after the award. We also prepare companies for investment from venture capital funds backed by the European Investment Fund (EIF)."),
    ("Who we work with", "SMEs, start-ups and scale-ups, technology centres, research consortia and public bodies in Spain and across the EU."),
    ("Specialisms", "Federated data spaces (Gaia-X and IDSA architectures), health data and the European Health Data Space, sovereign AI, and procurement and circular-economy data. "
                    "We have advised three federated data space demonstrators funded under Spain's data space programme: Global Data Care (health), PROCUREDATA (public procurement) "
                    "and EcoDataNet (circular economy and waste)."),
]
FACTS = [
    ("Legal name", "Ullswater Investments S.L."),
    ("Tax ID (CIF)", "B10740942"),
    ("Headquarters", "Calle Ramírez de Arellano 17, 28043 Madrid, Spain"),
    ("Brussels office", "Square de Meeûs 37, 1000 Brussels, Belgium (European Quarter)"),
    ("Managing Partner", "Emilio Mulet"),
    ("Programmes", "Horizon Europe, EIC (Pathfinder, Transition, Accelerator), Digital Europe, InvestEU and EIF, LIFE, Innovation Fund, CDTI, ENISA, Red.es"),
    ("Languages", "English, Spanish"),
]

# ---------- Courses ----------
COURSE_TITLE = "Executive Programme in EU Funding Management for Defence and Dual-Use"
COURSE_SUB = "Strategy, financing and delivery of technological sovereignty projects"
COURSE_FOR = "Six modules for companies, research centres and public bodies working in defence, security and dual-use technologies."
MODULES = [
    ("The European defence ecosystem and strategic framework", [
        ("Strategic autonomy and the Strategic Compass", "Europe's independence in defence and the objectives set out in the Strategic Compass."),
        ("Institutional architecture: DG DEFIS, EDA and Member States", "The roles of the Directorate-General for Defence Industry and Space, the European Defence Agency and the Member States."),
        ("The dual-use concept", "Technologies that serve civil and military markets, maximising the impact of investment."),
        ("PESCO and its impact", "Permanent Structured Cooperation: collaborative defence projects between EU countries.")]),
    ("The European Defence Fund (EDF)", [
        ("Research vs. development", "The difference between research actions and the development of operational capabilities."),
        ("Action categories and work programmes", "Types of calls by technology readiness level (TRL) and annual priorities."),
        ("Financial rules and bonuses", "Funding rates, cross-border bonuses and SME participation in consortia."),
        ("Consortia, eligibility and ownership", "Participant requirements by country, leadership and intellectual property."),
        ("SMEs and EUDIS", "Opportunities for small companies through the EU Defence Innovation Scheme.")]),
    ("Synergies and other financial instruments", [
        ("Action Plan on Synergies", "The Commission's strategy to coordinate civil and defence funds."),
        ("Horizon Europe Cluster 3 (Civil Security)", "Dual-use opportunities in the EU research and innovation programme."),
        ("Military mobility and CEF", "Dual-use transport infrastructure under the Connecting Europe Facility."),
        ("Space programmes and Digital Europe", "Galileo, Copernicus, secure connectivity, and cybersecurity and AI projects applied to defence."),
        ("Structural funds (ERDF) in defence", "Using cohesion funds to strengthen the defence industrial base in European regions.")]),
    ("Preparing winning proposals (pre-award)", [
        ("Strategic reading of the call topic", "Implicit priorities, expected KPIs and the evaluation criteria."),
        ("Consortium building and teaming", "Balanced teams with strong technical and geographic complementarity."),
        ("Technical excellence and methodology", "Showing innovation, feasibility and a robust methodology."),
        ("Security and ethics self-assessment", "Export risks, dual use and compliance with European ethical principles."),
        ("Budget and value for money", "A coherent, justified budget that shows cost-effectiveness.")]),
    ("Managing defence projects (post-award)", [
        ("Grant Agreement vs. Consortium Agreement", "The contract with the EU versus the internal agreement between partners."),
        ("EU classified information (EUCI)", "Security protocols for RESTREINT, CONFIDENTIEL and SECRET information."),
        ("Intellectual property in defence", "Background and results, access rights, licences and protection of strategic innovations."),
        ("Technical and financial reporting", "Periodic deliverables, cost audits and milestones."),
        ("Exploitation and export control", "Bringing results to market while complying with EU and national export-control regimes.")]),
    ("Technology trends and the future", [
        ("Disruptive technologies", "AI, quantum computing for cryptography and biotechnology in defence."),
        ("Space and cyber defence", "Observation satellites, secure space communications and protection against cyberattacks."),
        ("Sustainability and energy in defence", "Lower emissions, renewable energy at military bases and greener logistics."),
        ("Resilient supply chains", "Reducing dependencies, diversifying suppliers and strategic European production."),
        ("EDIP and joint procurement", "The European Defence Industry Programme and collaborative procurement between Member States.")]),
]

# ---------- Offices ----------
OFFICES = [
    {"city": "Madrid", "role": "Headquarters", "street": "Calle Ramírez de Arellano 17", "postcode": "28043", "locality": "Madrid", "country": "Spain", "cc": "ES",
     "note": "Our headquarters, working with SMEs, technology centres and public bodies across Spain.",
     "img": "/assets/img/office-madrid.jpg", "alt": "Madrid skyline, Cuatro Torres business area",
     "credit": "Photo: Madrid, Cuatro Torres Business Area · Wikimedia Commons (CC0)",
     "map": "https://www.google.com/maps/search/?api=1&query=Calle+Ram%C3%ADrez+de+Arellano+17%2C+28043+Madrid"},
    {"city": "Brussels", "role": "European Quarter office", "street": "Square de Meeûs 37", "postcode": "1000", "locality": "Brussels", "country": "Belgium", "cc": "BE",
     "note": "In the heart of the European Quarter, near Place du Luxembourg, a few minutes' walk from the European Parliament and Bruxelles-Luxembourg station.",
     "img": "/assets/img/office-brussels.jpg", "alt": "Square de Meeûs park in Brussels with its gilded winged statue",
     "credit": "Photo: Square de Meeûs, Brussels · Romaine, Wikimedia Commons (CC0)",
     "map": "https://www.google.com/maps/search/?api=1&query=Square+de+Mee%C3%BBs+37%2C+1000+Brussels"},
]

# ---------- European projects (home section + /projects/ + /data/projects.json) ----------
# One entry per project. Facts come from each project's landing page; keep them in step.
# group: lead | partner | advisor   status: proposal | funded   live: True once the subdomain is deployed
PROJECTS_INTRO = ("We do not only advise on European funding. We sit inside the consortia: leading projects, coordinating national teams "
                  "and building the technology with industry, hospitals and research centres.")
PROJECTS_STATS = [("6", "European R&D projects"), ("14+", "countries in our consortia"), ("3", "leadership roles")]
PROJECTS_FEATURED = "proactedge"
PROJECTS = [
    {"slug": "proactedge", "acronym": "ProAct-Edge", "title": "Trusted Industrial Edge Intelligence Platform",
     "programme": "ITEA 4 · Call 2026 · 26018", "challenge": "Smart Industry · Edge AI", "status": "proposal", "group": "lead", "live": True,
     "role": "Proxy project leader",
     "pitch": "Edge AI that warns weeks before a machine fails, explains every alert in plain language and keeps all industrial data inside the plant.",
     "contribution": "Proxy project leader of the whole consortium, with ACD (Türkiye). We lead the elevator-manufacturing pilot in Spain (UC-ES1), edge AI and MES/AGV integration.",
     "facts": [("22", "partners"), ("8", "countries"), ("6", "industrial pilots"), ("2027–30", "planned period")]},
    {"slug": "hoskit", "acronym": "HOSKIT", "title": "Holistic Sovereignty Kit for Digital Systems",
     "programme": "ITEA 4 · Call 2026 · 26013", "challenge": "Safety & Security · Digital sovereignty", "status": "proposal", "group": "lead", "live": True,
     "role": "Spanish national coordinator",
     "pitch": "Use the best cloud, AI and software services without losing the power to leave: see your dependencies, cost an exit and switch when conditions change.",
     "contribution": "Through Software in a Box, our technology company: coordination of the Spanish consortium, the AI layer and the on-premise AI substitution option.",
     "facts": [("25", "partners"), ("7", "countries"), ("4", "sovereignty dimensions"), ("2027–30", "planned period")]},
    {"slug": "samba", "acronym": "SAMBA", "title": "Small language models for supervised industrial agentic AI",
     "programme": "ITEA · Call 2026 · 26039", "challenge": "Smart Industry · Agentic AI", "status": "proposal", "group": "lead", "live": True,
     "role": "Spanish use-case owner · TI1 lead",
     "pitch": "On-premise agents that read plant data, investigate events and propose responses in existing factories and warehouses. People with authority decide.",
     "contribution": "We own the Spanish industrial use case and lead innovation TI1: MCP servers and the edge small-language-model platform.",
     "facts": [("23", "organisations"), ("9", "countries"), ("6+1", "pilots and testbed"), ("2028–30", "planned period")]},
    {"slug": "cognigene", "acronym": "CogniGENE", "title": "Early detection of cognitive and neuropsychiatric change",
     "programme": "ITEA 4 · Call 2026 · 26008", "challenge": "Smart Health", "status": "proposal", "group": "partner", "live": True,
     "role": "Partner · data-space integration (WP5)",
     "pitch": "One shared timeline from home to hospital that follows each person against their own baseline, so clinicians spot sustained change earlier.",
     "contribution": "Data-space connectors, usage policies, consent and audit, and on-premise sovereign AI (Global Data Care, COGNITIV).",
     "facts": [("22", "partners"), ("8", "countries"), ("6", "pilots and studies"), ("2028–30", "planned period")]},
    {"slug": "ehdsjungle", "acronym": "EHDS-JUNGLE", "title": "Clinical intelligence for the European Health Data Space",
     "programme": "ITEA · Call 2026 · 26041", "challenge": "Smart Health · EHDS", "status": "proposal", "group": "advisor", "live": True,
     "role": "Funding advisor · project portal",
     "pitch": "Interprets multilingual health records and reconciles conflicting care pathways for patients with several chronic conditions, under auditable policies.",
     "contribution": "Funding strategy and project portal, with Accuro Technology as Spanish national coordinator.",
     "facts": [("3", "use cases: Finland, Spain, Türkiye"), ("5", "core innovations"), ("2028–30", "planned period")]},
    {"slug": "drmbank", "acronym": "DR-MBANK", "title": "Disaster Resilient Mobile Bank Branch",
     "programme": "Eureka · CDTI INNOGLOBAL 2025", "challenge": "FinTech · Resilience", "status": "funded", "group": "advisor", "live": True,
     "role": "Funding advisor · project portal",
     "pitch": "A modular, offline-first mobile bank branch with a multilingual voice and vision AI agent, for disaster-affected and underserved areas.",
     "contribution": "Funding strategy for the Eureka (Türkiye–Spain) and CDTI INNOGLOBAL lines, and project portal.",
     "facts": [("2", "countries: Türkiye, Spain"), ("2", "funding lines"), ("5", "core innovations")]},
]
PROJECT_GROUPS = [("all", "All projects"), ("lead", "Leading & coordinating"), ("partner", "Partner"), ("advisor", "Funding advisor")]
PROJECT_WAYS = [
    ("Leading and coordinating", "Project leadership, national coordination and ownership of use cases and innovations."),
    ("Building the technology", "Federated data spaces, usage policies, edge AI and on-premise sovereign AI from Software in a Box."),
    ("Securing the funding", "Funding strategy for the international and national lines, and a public portal for every project."),
]
