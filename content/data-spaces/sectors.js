/* Data Spaces · Ullswater Investments
   1) Sector data: fill challenges/why/regs/sources per sector (EN/ES). Empty challenges => 'Analysis in preparation'.
   2) Small UI helpers: regulation filters, sector explorer, sources, mobile menu. No libraries. */
/* Data Spaces explorer · 50 sectors · generated 2026-11-22 from 04_FUENTES registries (S1–S6, B02, B03). */
window.SECTORS = [
 {
  "id": "SEC01",
  "group": "health",
  "name": {
   "en": "Hospitals and healthcare providers",
   "es": "Hospitales y proveedores sanitarios"
  },
  "tagline": {
   "en": "Sharing patient records between centres and with the public system without losing control of who sees what.",
   "es": "Compartir la historia del paciente entre centros y con el sistema público sin perder el control de quién accede."
  },
  "regs": [
   "GDPR",
   "EHDS",
   "NIS2"
  ],
  "challenges": {
   "en": [
    "The EHDS obliges providers to feed interoperable health records and open data for secondary use, phased in from March 2027.",
    "Hospitals suffer 42% of health-sector cyber incidents, and ransomware drives 54% of them; health was the sector hit hardest by significant NIS incidents in 2020–2023.",
    "Regulators fine missing basics: €500,000 to a French private hospital with no MFA or access detection.",
    "A Galician hospital was fined €40,000 for loading a private patient's data into the public shared record.",
    "Public centres in Spain get warnings rather than fines, but must correct the failings within a deadline."
   ],
   "es": [
    "El EHDS obliga a alimentar la historia clínica interoperable y a abrir datos para uso secundario, de forma escalonada desde marzo de 2027.",
    "Los hospitales sufren el 42 % de los ciberincidentes del sector salud y el ransomware supone el 54 %; la sanidad fue el sector más afectado por incidentes NIS graves en 2020–2023.",
    "Las autoridades multan la falta de medidas básicas: 500.000 € a un hospital privado francés sin MFA ni detección de accesos.",
    "Un hospital gallego recibió 40.000 € de multa por volcar los datos de una paciente privada en la historia compartida del servicio público.",
    "En España los centros públicos reciben apercibimiento en lugar de multa, pero deben corregir los fallos en plazo."
   ]
  },
  "why": {
   "en": [
    "Sharing data between centres needs purpose-based access control and full traceability — exactly what the AEPD and CNIL penalise when missing.",
    "Spain is investing €70m in its National Health Data Space plus €28m for the regions; health is the best-funded sector in the data spaces plan.",
    "Ullswater has hands-on experience here through Global Data Care, a federated health data space demonstrator."
   ],
   "es": [
    "Compartir datos entre centros exige control de acceso por finalidad y trazabilidad completa: justo lo que AEPD y CNIL sancionan cuando falta.",
    "España invierte 70 M€ en el Espacio Nacional de Datos de Salud y 28 M€ para las CCAA; la salud es el sector con más fondos del plan de espacios de datos.",
    "Ullswater tiene experiencia directa en este ámbito con Global Data Care, un demostrador de espacio de datos de salud federado."
   ]
  },
  "example": {
   "en": "CNIL fined Hôpital Privé de la Loire €500,000 in 2026 after a breach affecting 524,867 patients, with no MFA in place (F-0553).",
   "es": "La CNIL multó con 500.000 € al Hôpital Privé de la Loire en 2026 tras una brecha que afectó a 524.867 pacientes, sin MFA implantado (F-0553)."
  },
  "sources": [
   "F-0551",
   "F-0552",
   "F-0553",
   "F-0554",
   "F-0557",
   "F-0558",
   "F-0559"
  ]
 },
 {
  "id": "SEC02",
  "group": "health",
  "name": {
   "en": "Dentistry and dental clinics",
   "es": "Odontología y clínicas dentales"
  },
  "tagline": {
   "en": "Keeping dental records and images portable when clinics change hands or close.",
   "es": "Mantener la historia y las imágenes dentales portables cuando una clínica cambia de manos o cierra."
  },
  "regs": [
   "GDPR",
   "EHDS"
  ],
  "challenges": {
   "en": [
    "When dental chains close, patients struggle to recover their records; after iDental, FACUA reported a ‘widespread impossibility’ of access.",
    "In Madrid, the dentists' college and the regional health department had to digitise and hand over iDental records; the pattern repeated with Vivanta in 2026.",
    "Publishing before-and-after photos without specific consent is fined: €10,000 to an aesthetic clinic.",
    "The AEPD fined a dental clinic €30,000 for demanding a full copy of an ID card and bypassing its DPO.",
    "Images and treatment plans flow between clinic, dental lab and manufacturer in a highly digital market of intraoral scanners, 3D printing and aligners."
   ],
   "es": [
    "Cuando cierra una cadena dental, los pacientes no recuperan su historia: tras iDental, FACUA habló de «imposibilidad generalizada» de acceso.",
    "En Madrid, el COEM y la Consejería tuvieron que digitalizar y entregar los historiales de iDental; en 2026 se repitió con Vivanta.",
    "Publicar fotos de antes y después sin consentimiento específico se sanciona: 10.000 € a una clínica de medicina estética.",
    "La AEPD multó con 30.000 € a una clínica dental por exigir la copia íntegra del DNI y no remitir la reclamación al DPD.",
    "Imágenes y planes de tratamiento circulan entre clínica, laboratorio y fabricante en un mercado muy digital: escáner intraoral, impresión 3D y alineadores."
   ]
  },
  "why": {
   "en": [
    "A portable record held outside the clinic, with patient permissions and an access log, avoids rebuilding histories when a chain closes.",
    "Digital clinic–lab–manufacturer workflows need usage rules on scans and images, in a market of about €12.2bn of annual spending in Spain.",
    "Ullswater brings direct experience from Dental Data, an oral health data space, and from Global Data Care."
   ],
   "es": [
    "Un historial portable y custodiado fuera de la clínica, con permisos del paciente y registro de accesos, evita reconstruirlo cuando una cadena cierra.",
    "Los flujos digitales clínica–laboratorio–fabricante necesitan reglas de uso sobre escaneos e imágenes, en un mercado de unos 12.200 M€ de gasto anual en España.",
    "Ullswater aporta experiencia directa con Dental Data, un espacio de datos de salud bucal, y con Global Data Care."
   ]
  },
  "example": {
   "en": "In September 2026, at least 7 Vivanta clinics closed with treatments unfinished; OCU advised patients to request their records in writing (F-0577).",
   "es": "En septiembre de 2026 cerraron al menos 7 clínicas Vivanta con tratamientos a medias; la OCU aconsejó pedir el historial por escrito (F-0577)."
  },
  "sources": [
   "F-0561",
   "F-0575",
   "F-0576",
   "F-0577",
   "F-0578",
   "F-0579",
   "F-0580"
  ]
 },
 {
  "id": "SEC03",
  "group": "health",
  "name": {
   "en": "Pharmaceutical industry",
   "es": "Industria farmacéutica"
  },
  "tagline": {
   "en": "Accessing real-world health data for R&D under strict permits and secure environments.",
   "es": "Acceder a datos de salud del mundo real para I+D con permisos estrictos y entornos seguros."
  },
  "regs": [
   "EHDS",
   "GDPR",
   "CTR",
   "NIS2"
  ],
  "challenges": {
   "en": [
    "To use EHDS data, industry needs a permit from a health data access body, limited to approved purposes and secure environments.",
    "The Clinical Trials Regulation routes everything through CTIS and requires publication, except personal data and confidential commercial information.",
    "Pharma suffers 9% of health-sector cyber incidents, and 46% of the sector's incidents aim to steal or leak data.",
    "Industry is the main investor in clinical data in Spain: €1,003m on trials in 2024, 61% of its R&D.",
    "Retail pharmacies are fined too: €16,000 to one that kept customers' medication data in an unprotected spreadsheet."
   ],
   "es": [
    "Para usar datos del EHDS la industria necesita un permiso del organismo de acceso, limitado a fines aprobados y a entornos seguros.",
    "El Reglamento de ensayos clínicos lo canaliza todo por CTIS y obliga a publicar, salvo datos personales e información comercial confidencial.",
    "La farmacéutica sufre el 9 % de los ciberincidentes del sector salud, y el 46 % de ellos busca robar o filtrar datos.",
    "La industria es la gran inversora en datos clínicos en España: 1.003 M€ en ensayos en 2024, el 61 % de su I+D.",
    "También se sanciona a las farmacias: 16.000 € a una que registraba la medicación de sus clientes en un Excel sin proteger."
   ]
  },
  "why": {
   "en": [
    "DARWIN EU shows the model: a common data model and analyses run locally by each partner, without centralising data.",
    "The network now has 110 data partners in 18 countries, covering more than 280 million patients.",
    "A sector producing €23.2bn and exporting 76% must share data with hospitals, CROs and regulators across borders under verifiable rules."
   ],
   "es": [
    "DARWIN EU demuestra el modelo: un modelo común de datos y análisis ejecutados en local por cada socio, sin centralizar los datos.",
    "La red ya suma 110 socios de datos en 18 países, con datos de más de 280 millones de pacientes.",
    "Un sector que produce 23.211 M€ y exporta el 76 % necesita compartir datos con hospitales, CRO y reguladores de varios países con reglas verificables."
   ]
  },
  "example": {
   "en": "DARWIN EU grew from 40 to 110 data partners in 18 countries in 2026, reaching data on more than 280 million patients (F-0582).",
   "es": "DARWIN EU pasó de 40 a 110 socios de datos en 18 países en 2026, con acceso a datos de más de 280 millones de pacientes (F-0582)."
  },
  "sources": [
   "F-0563",
   "F-0564",
   "F-0565",
   "F-0581",
   "F-0582",
   "F-0583",
   "F-0585",
   "F-0602"
  ]
 },
 {
  "id": "SEC04",
  "group": "health",
  "name": {
   "en": "Health technology and medical devices",
   "es": "Tecnología sanitaria y dispositivos médicos"
  },
  "tagline": {
   "en": "Turning device makers into trusted nodes that exchange data continuously.",
   "es": "Convertir a los fabricantes en nodos de confianza que intercambian datos de forma continua."
  },
  "regs": [
   "MDR",
   "IVDR",
   "EHDS",
   "AI Act",
   "CRA",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "Makers of electronic health record systems must meet the European exchange format, pass testing and carry CE marking.",
    "EUDAMED has been mandatory since 28 May 2026 for four modules, including actors, UDI/devices and certificates.",
    "AI devices of class IIa or higher are high-risk under the AI Act and must prove governance of training, validation and test data; the AI Omnibus moved these Annex I duties to 2 August 2028.",
    "Pseudonymisation is not enough: CNIL fined a medical software publisher €800,000 for reusing re-identifiable health data without authorisation.",
    "With 933 companies in Spain, mostly SMEs, compliance costs weigh heavily."
   ],
   "es": [
    "Los fabricantes de sistemas de historia clínica deben cumplir el formato europeo de intercambio, superar las pruebas y llevar marcado CE.",
    "EUDAMED es obligatoria desde el 28/5/2026 en cuatro módulos, entre ellos actores, UDI/dispositivos y certificados.",
    "Los productos con IA de clase IIa o superior son de alto riesgo para el AI Act y deben acreditar la gobernanza de sus datos; el Omnibus de IA aplazó estas obligaciones del Anexo I al 2/8/2028.",
    "Seudonimizar no basta: la CNIL multó con 800.000 € a un editor de software médico por reutilizar datos de salud reidentificables sin autorización.",
    "Con 933 empresas en España, en su mayoría pymes, el coste de cumplimiento pesa mucho."
   ]
  },
  "why": {
   "en": [
    "Mandatory interoperability and the open-source HealthData@EU platform push makers towards connectors and standardised exchange.",
    "The representative datasets the AI Act demands come from many hospitals; a data space lets makers train and validate without moving source data.",
    "EUDAMED, interoperable records and post-market surveillance turn each manufacturer into a node that exchanges data continuously."
   ],
   "es": [
    "La interoperabilidad obligatoria y la plataforma abierta HealthData@EU empujan a los fabricantes hacia conectores e intercambio normalizado.",
    "Los datos representativos que pide el AI Act están en muchos hospitales; un espacio de datos permite entrenar y validar sin sacar los datos de origen.",
    "EUDAMED, la historia interoperable y la vigilancia poscomercialización convierten al fabricante en un nodo que intercambia datos de forma continua."
   ]
  },
  "example": {
   "en": "CNIL fined Cegedim Santé €800,000 in 2024 for processing pseudonymised, not anonymous, health data without authorisation (F-0590).",
   "es": "La CNIL multó a Cegedim Santé con 800.000 € en 2024 por tratar datos de salud seudonimizados, no anónimos, sin autorización (F-0590)."
  },
  "sources": [
   "F-0568",
   "F-0586",
   "F-0589",
   "F-0142",
   "F-0590",
   "F-0591"
  ]
 },
 {
  "id": "SEC05",
  "group": "health",
  "name": {
   "en": "Health insurance and mutuals",
   "es": "Seguros de salud y mutuas"
  },
  "tagline": {
   "en": "Using health data to serve members without sliding into exclusion or price discrimination.",
   "es": "Usar datos de salud para dar servicio sin caer en la exclusión ni en la discriminación de precios."
  },
  "regs": [
   "GDPR",
   "EHDS",
   "DORA"
  ],
  "challenges": {
   "en": [
    "The EHDS bans using health data to exclude people from insurance or to change their premiums.",
    "Insurers process health data under Article 9.2.h GDPR, and pricing models may fall under the Article 22 rules on automated decisions.",
    "The AEPD fined Ibermutua €600,000 for mistakenly sending data on some 3,400 people to over 300 companies.",
    "Occupational health services are liable too: €50,000 to Quirón Prevención for sending a non-anonymised report.",
    "The line is growing fast: over €13.5bn in premiums and 12.8 million insured in 2025, plus the €4.8bn Muface agreement for 2025–2027."
   ],
   "es": [
    "El EHDS prohíbe usar datos de salud para excluir a alguien de un seguro o para cambiar sus primas.",
    "Las aseguradoras tratan datos de salud con base en el art. 9.2.h RGPD, y sus modelos de tarificación pueden caer en el art. 22 sobre decisiones automatizadas.",
    "La AEPD multó a Ibermutua con 600.000 € por enviar por error datos de unas 3.400 personas a más de 300 empresas.",
    "Los servicios de prevención también responden: 50.000 € a Quirón Prevención por enviar un informe sin anonimizar.",
    "El ramo crece deprisa: más de 13.541 M€ y 12,8 M de asegurados en 2025, más el concierto Muface de 4.805 M€ para 2025–2027."
   ]
  },
  "why": {
   "en": [
    "Lawful use of health data requires purpose control through enforceable usage policies such as ODRL.",
    "Exchanges with providers, reinsurers and Muface must be purpose-bound and traced; data space policies make that enforceable.",
    "Querying data through connectors with per-recipient permissions, instead of sending files, prevents errors like Ibermutua's."
   ],
   "es": [
    "Usar datos de salud de forma legítima exige controlar la finalidad con políticas de uso exigibles, como ODRL.",
    "El intercambio con proveedores, reaseguradoras y Muface debe limitarse a la finalidad y quedar trazado; las políticas de un espacio de datos lo hacen exigible.",
    "Consultar los datos mediante conectores con permisos por destinatario, en lugar de enviar ficheros, evita errores como el de Ibermutua."
   ]
  },
  "example": {
   "en": "The AEPD fined Ibermutua €600,000 for sending data, including health data, on about 3,400 people to more than 300 companies (F-0594).",
   "es": "La AEPD sancionó a Ibermutua con 600.000 € por enviar datos, también de salud, de unas 3.400 personas a más de 300 empresas (F-0594)."
  },
  "sources": [
   "F-0569",
   "F-0570",
   "F-0592",
   "F-0594",
   "F-0595",
   "F-0596"
  ]
 },
 {
  "id": "SEC06",
  "group": "health",
  "name": {
   "en": "Clinical research, CROs and biobanks",
   "es": "Investigación clínica, CRO y biobancos"
  },
  "tagline": {
   "en": "Reusing trial, cohort and biobank data across borders while keeping consent and confidentiality intact.",
   "es": "Reutilizar datos de ensayos, cohortes y biobancos entre países sin romper el consentimiento ni la confidencialidad."
  },
  "regs": [
   "EHDS",
   "GDPR",
   "CTR"
  ],
  "challenges": {
   "en": [
    "Biobank data enter EHDS secondary use in 2029, and clinical trial and cohort data in 2031.",
    "Citizens can opt out of secondary use, which affects future requests but not data already released.",
    "Publishing in CTIS forces sponsors to prepare ‘for publication’ versions and anonymise documents themselves.",
    "The balance between transparency and confidentiality is still open: more registrations do not mean more transparency.",
    "Spanish biobanks may only release samples and data with an approved project, an ethics committee report and a written agreement."
   ],
   "es": [
    "Los datos de biobancos entran en el uso secundario del EHDS en 2029, y los de ensayos clínicos y cohortes en 2031.",
    "Los ciudadanos pueden oponerse al uso secundario, lo que afecta a solicitudes futuras pero no a los datos ya cedidos.",
    "Publicar en CTIS obliga a los promotores a preparar versiones «para publicación» y a anonimizar ellos mismos los documentos.",
    "El equilibrio entre transparencia y confidencialidad sigue abierto: más registros no equivalen a más transparencia.",
    "Los biobancos solo pueden ceder muestras y datos con proyecto aprobado, informe del comité de ética y acuerdo escrito."
   ]
  },
  "why": {
   "en": [
    "TEHDAS2 is defining common specifications for secure processing environments and for describing and finding datasets.",
    "A written, purpose-limited biobank agreement is exactly what an ODRL contract between connectors encodes.",
    "Spain authorised 962 trials in 2025 with around 170,000 patients a year; DARWIN EU shows that federated analysis works at scale."
   ],
   "es": [
    "TEHDAS2 define especificaciones comunes para entornos seguros de tratamiento y para describir y localizar conjuntos de datos.",
    "Un acuerdo escrito y con finalidad limitada es justo lo que codifica un contrato ODRL entre conectores.",
    "España autorizó 962 ensayos en 2025, con unos 170.000 pacientes al año; DARWIN EU demuestra que el análisis federado funciona a escala."
   ]
  },
  "example": {
   "en": "DARWIN EU runs standardised analyses locally at each partner on the OMOP common data model and has delivered 40 studies (F-0602).",
   "es": "DARWIN EU ejecuta análisis estandarizados en local en cada socio con el modelo común OMOP y ha entregado 40 estudios (F-0602)."
  },
  "sources": [
   "F-0571",
   "F-0572",
   "F-0597",
   "F-0598",
   "F-0599",
   "F-0600",
   "F-0601",
   "F-0602"
  ]
 },
 {
  "id": "SEC07",
  "group": "health",
  "name": {
   "en": "Diagnostic laboratories and genomics",
   "es": "Laboratorios de diagnóstico y genómica"
  },
  "tagline": {
   "en": "Sharing genomic and lab data for precision medicine without exposing the most sensitive data there is.",
   "es": "Compartir datos genómicos y de laboratorio para la medicina de precisión sin exponer los datos más sensibles que existen."
  },
  "regs": [
   "GDPR",
   "EHDS"
  ],
  "challenges": {
   "en": [
    "Clinical labs are controllers, not mere processors, because Spanish law requires them to manage the health record.",
    "Genomic data join EHDS secondary use in 2031, and Member States may restrict access further.",
    "A genetic data breach is costly: €2.4m to 23andMe for 2,642 people affected in Spain, with no two-factor authentication and late notification.",
    "Processing genetic data without a clear legal basis has been fined in Spain: €20,000 to MyHeritage.",
    "Labs must notify breaches within 72 hours and keep records for at least five years."
   ],
   "es": [
    "Los laboratorios clínicos son responsables del tratamiento, no meros encargados, porque la ley les obliga a gestionar la historia clínica.",
    "Los datos genómicos entran en el uso secundario del EHDS en 2031, y los Estados pueden limitar más su acceso.",
    "Una brecha genética sale cara: 2,4 M€ a 23andMe por 2.642 afectados en España, sin doble factor y notificando fuera de plazo.",
    "Tratar datos genéticos sin base jurídica clara ya se ha sancionado en España: 20.000 € a MyHeritage.",
    "Los laboratorios deben notificar las brechas en 72 horas y conservar la historia al menos cinco años."
   ]
  },
  "why": {
   "en": [
    "As controllers with breach duties, labs need to trace every release of results.",
    "GDI, the deployment of 1+MG, is building a federated, interoperable genomic data infrastructure in which Spain's IMPaCT takes part.",
    "Spain has invested over €150m in precision medicine; getting value from it requires reusing data under access control."
   ],
   "es": [
    "Como responsables con obligación de notificar brechas, los laboratorios necesitan trazar cada cesión de resultados.",
    "GDI, el despliegue de 1+MG, construye una infraestructura federada e interoperable de datos genómicos en la que participa IMPaCT.",
    "España ha invertido más de 150 M€ en medicina de precisión; rentabilizarlo exige reutilizar los datos con control de acceso."
   ]
  },
  "example": {
   "en": "The AEPD fined 23andMe €2.4m in 2026 for a genetic data breach affecting 2,642 people in Spain (F-0604).",
   "es": "La AEPD sancionó a 23andMe con 2,4 M€ en 2026 por una brecha de datos genéticos que afectó a 2.642 personas en España (F-0604)."
  },
  "sources": [
   "F-0566",
   "F-0571",
   "F-0573",
   "F-0604",
   "F-0605",
   "F-0606",
   "F-0607"
  ]
 },
 {
  "id": "SEC08",
  "group": "health",
  "name": {
   "en": "Social care and long-term care",
   "es": "Atención sociosanitaria y dependencia"
  },
  "tagline": {
   "en": "Joining up health and social care records for vulnerable people without fragmented files or open channels.",
   "es": "Unir la información sanitaria y social de personas vulnerables sin expedientes partidos ni canales abiertos."
  },
  "regs": [
   "GDPR"
  ],
  "challenges": {
   "en": [
    "AEPD inspections found care records split between paper and digital, generic user accounts, and health data sent by unencrypted fax or email.",
    "Improper access is fined when there is no traceability: €2,500 for 496 unauthorised accesses to records.",
    "Care homes have wrongly refused families access to deceased residents' records, and the AEPD sided with the families.",
    "Communication with families is a frequent breach: €1,000 to a care home for mass emails without blind copy.",
    "The system is growing fast: 1.72 million beneficiaries and 688,214 telecare services generating continuous data."
   ],
   "es": [
    "La inspección de la AEPD encontró historias partidas entre papel y digital, usuarios genéricos y datos de salud enviados por fax o email sin cifrar.",
    "Los accesos indebidos se sancionan si no hay trazabilidad: 2.500 € por 496 accesos indebidos a historias.",
    "Hay residencias que negaron a las familias el acceso a la historia de residentes fallecidos, y la AEPD dio la razón a las familias.",
    "La comunicación con las familias es un foco de infracciones: 1.000 € a una residencia por correos masivos sin copia oculta.",
    "El sistema crece deprisa: 1,72 M de beneficiarios y 688.214 servicios de teleasistencia que generan datos continuos."
   ]
  },
  "why": {
   "en": [
    "Continuity between health and social care needs access permissions tied to the care relationship, with an auditable log.",
    "The AEPD recommends minimum access profiles, encrypted channels and explicit consent before informing relatives — rules a data space applies automatically.",
    "Coordinating care homes, telecare, social services and healthcare for nearly 2 million people needs data exchange without duplicate files."
   ],
   "es": [
    "La continuidad entre lo sanitario y lo social requiere permisos ligados a la relación asistencial y un registro auditable.",
    "La AEPD recomienda perfiles de acceso mínimos, canales cifrados y consentimiento explícito para informar a familiares: reglas que un espacio de datos aplica de forma automática.",
    "Coordinar residencias, teleasistencia, servicios sociales y sanidad para casi 2 M de personas exige intercambiar datos sin duplicar expedientes."
   ]
  },
  "example": {
   "en": "At 31 July 2026, Spain's dependency system had 1.72 million beneficiaries and 137,870 people on the waiting list (F-0609).",
   "es": "A 31 de julio de 2026, el sistema de dependencia tenía 1,72 M de beneficiarios y 137.870 personas en lista de espera (F-0609)."
  },
  "sources": [
   "F-0574",
   "F-0608",
   "F-0609",
   "F-0610"
  ]
 },
 {
  "id": "SEC09",
  "group": "finance",
  "name": {
   "en": "Banking",
   "es": "Banca"
  },
  "tagline": {
   "en": "Opening customer data to AML partners and open finance while keeping sovereignty over where it lives.",
   "es": "Abrir datos de clientes al antiblanqueo y a las finanzas abiertas sin perder la soberanía sobre dónde se alojan."
  },
  "regs": [
   "GDPR",
   "DORA",
   "AMLR",
   "FiDA"
  ],
  "challenges": {
   "en": [
    "DORA and ECB cloud guidance require limits on data location, tested exit strategies and management of cloud concentration risk.",
    "New EBA guidelines demand contract clauses on data location, integrity, confidentiality, return and recovery, even for non-ICT services.",
    "The AEPD fines banks heavily: €6m to CaixaBank over information and consent, and €1.64m to BBVA (€1.18m with early payment) for security and privacy-by-design failures.",
    "The AMLR allows information-sharing partnerships between obliged entities from 10 July 2027, but only under safeguards the EDPB and AMLA are still defining.",
    "FiDA, still in negotiation, would make banks share loan, mortgage, savings and investment data through APIs and data-sharing schemes."
   ],
   "es": [
    "DORA y la guía del BCE sobre cloud exigen limitar la ubicación de los datos, probar estrategias de salida y gestionar la concentración en proveedores.",
    "Las nuevas directrices de la EBA piden cláusulas de ubicación, integridad, confidencialidad, devolución y recuperación de datos, también en servicios no TIC.",
    "La AEPD sanciona con dureza: 6 M€ a CaixaBank por información y consentimientos, y 1,64 M€ a BBVA (1,18 M€ con pronto pago) por fallos de seguridad y privacidad desde el diseño.",
    "El AMLR permite asociaciones para compartir información desde el 10/7/2027, pero solo con garantías que EDPB y AMLA aún están definiendo.",
    "FiDA, aún en tramitación, obligaría a compartir datos de préstamos, hipotecas, ahorro e inversión mediante API y esquemas de intercambio."
   ]
  },
  "why": {
   "en": [
    "Sharing AML data between banks, or with FiDA third parties, needs verifiable usage rules, traceability and control of customer permission — what connectors and ODRL policies provide.",
    "DORA's register of information for every ICT contract calls for standardised, reusable data exchange rather than ad hoc submissions."
   ],
   "es": [
    "Compartir datos AML entre bancos o con terceros FiDA exige reglas de uso verificables, trazabilidad y control del permiso del cliente: lo que aportan los conectores y las políticas ODRL.",
    "El registro de información de DORA para cada contrato TIC pide intercambiar datos estandarizados y reutilizables en lugar de envíos ad hoc."
   ]
  },
  "example": {
   "en": "The AEPD fined CaixaBank €6m: €2m for information failures and €4m for lacking a valid legal basis and consents (F-0625).",
   "es": "La AEPD multó a CaixaBank con 6 M€: 2 M€ por fallos de información y 4 M€ por falta de base jurídica y consentimientos válidos (F-0625)."
  },
  "sources": [
   "F-0623",
   "F-0624",
   "F-0625",
   "F-0626",
   "F-0629",
   "F-0630",
   "F-0631"
  ]
 },
 {
  "id": "SEC10",
  "group": "finance",
  "name": {
   "en": "Insurance (non-life and life)",
   "es": "Seguros (no vida y vida)"
  },
  "tagline": {
   "en": "Sharing policy and risk data under open finance without excluding vulnerable customers.",
   "es": "Compartir datos de pólizas y riesgos en las finanzas abiertas sin excluir a los clientes vulnerables."
  },
  "regs": [
   "FiDA",
   "DORA",
   "AI Act",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "FiDA covers non-life insurance and insurance-based investment products, but excludes health, sickness and other life cover.",
    "Sharing sensitive data could enable differential pricing that harms vulnerable customers.",
    "FiDA's proposed penalties, up to €500,000 a year or 2% of turnover, come on top of GDPR fines.",
    "The AI Act treats AI pricing in life and health insurance as high-risk; EIOPA asks for data governance, fairness and explainability in other uses.",
    "Breaches already cost millions: €4m to Generali in Spain for leaking former customers' data after a cyberattack."
   ],
   "es": [
    "FiDA incluye los seguros no vida y los productos de inversión basados en seguros, pero excluye salud, enfermedad y el resto de vida.",
    "Compartir datos sensibles permitiría precios diferenciados que perjudiquen a los clientes vulnerables.",
    "Las multas propuestas en FiDA, hasta 500.000 € al año o el 2 % de la facturación, se suman a las del RGPD.",
    "El AI Act considera de alto riesgo la IA de tarificación en vida y salud; EIOPA pide gobernanza de datos, equidad y explicabilidad en el resto.",
    "Las brechas ya cuestan millones: 4 M€ a Generali en España por la filtración de datos de exclientes tras un ciberataque."
   ]
  },
  "why": {
   "en": [
    "FiDA requires insurers and intermediaries to join schemes with common data standards, interfaces, contracts and a customer permission dashboard — data space governance in all but name.",
    "The Commission estimates €4.6–12.4bn of annual open finance benefits against €2.2–2.4bn of upfront cost; shared infrastructure lowers that cost.",
    "EIOPA's open insurance consultation called for common APIs, data formats and consent management."
   ],
   "es": [
    "FiDA obliga a aseguradoras y mediadores a unirse a esquemas con estándares, interfaces, contratos comunes y un panel de permisos del cliente: la gobernanza de un espacio de datos.",
    "La Comisión estima entre 4.600 y 12.400 M€ de beneficios anuales frente a 2.200–2.400 M€ de coste inicial; una infraestructura compartida lo reduce.",
    "La consulta de EIOPA sobre open insurance pidió API, formatos y gestión del consentimiento comunes."
   ]
  },
  "example": {
   "en": "The AEPD fined Generali España €4m (€5m before early payment) for a data leak after a 2022 cyberattack (F-0652).",
   "es": "La AEPD multó a Generali España con 4 M€ (5 M€ antes del pronto pago) por la filtración tras un ciberataque en 2022 (F-0652)."
  },
  "sources": [
   "F-0632",
   "F-0633",
   "F-0634",
   "F-0635",
   "F-0650",
   "F-0651",
   "F-0652"
  ]
 },
 {
  "id": "SEC11",
  "group": "finance",
  "name": {
   "en": "Asset management, investment and fintech",
   "es": "Gestión de activos, inversión y fintech"
  },
  "tagline": {
   "en": "Sharing investment data in near real time under open finance and crypto-asset rules.",
   "es": "Compartir datos de inversión casi en tiempo real con las reglas de las finanzas abiertas y los criptoactivos."
  },
  "regs": [
   "FiDA",
   "MiCA",
   "DORA",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "FiDA brings investment firms, fund managers, UCITS and crypto-asset providers in as data holders and users, with a mandatory permission dashboard.",
    "EBA third-party guidelines now extend to investment firms and MiCA token issuers, with a single register of providers.",
    "MiCA, DORA and the DLT pilot regime came from the 2020 digital finance package, alongside the European financial data space.",
    "Concerns persist over privacy, financial exclusion, interoperability and Big Tech market power."
   ],
   "es": [
    "FiDA incluye a empresas de inversión, gestoras, UCITS y proveedores de criptoactivos como titulares y usuarios de datos, con un panel de permisos obligatorio.",
    "Las directrices de la EBA sobre terceros se amplían a empresas de inversión y emisores de tokens de MiCA, con un registro único de proveedores.",
    "MiCA, DORA y el régimen piloto DLT nacen del paquete de finanzas digitales de 2020, junto al espacio europeo de datos financieros.",
    "Persisten dudas sobre privacidad, exclusión financiera, interoperabilidad y poder de mercado de las grandes tecnológicas."
   ]
  },
  "why": {
   "en": [
    "The supervisory data strategy aims for standardised data reused across supervisors, avoiding duplicate requests.",
    "The European Financial Data Space is one of the Commission's common data spaces, run with DG FISMA.",
    "data.europa.eu already lists some 111,000 public economic and financial datasets."
   ],
   "es": [
    "La estrategia de datos de supervisión busca datos estandarizados y reutilizados entre supervisores, sin peticiones duplicadas.",
    "El Espacio Europeo de Datos Financieros es uno de los espacios comunes de la Comisión, gestionado con la DG FISMA.",
    "data.europa.eu ya reúne unos 111.000 conjuntos de datos públicos de economía y finanzas."
   ]
  },
  "example": {
   "en": "Under FiDA, investment data would be shared in near real time, with schemes due 18 months and application 24 months after entry into force (F-0637).",
   "es": "Con FiDA, los datos de inversión se compartirían casi en tiempo real, con esquemas a los 18 meses y aplicación a los 24 meses de la entrada en vigor (F-0637)."
  },
  "sources": [
   "F-0637",
   "F-0638",
   "F-0639",
   "F-0640",
   "F-0641",
   "F-0642",
   "F-0643",
   "F-0644"
  ]
 },
 {
  "id": "SEC12",
  "group": "finance",
  "name": {
   "en": "Payments and e-money",
   "es": "Pagos y dinero electrónico"
  },
  "tagline": {
   "en": "Fighting payment fraud by sharing signals between providers without centralising customer data.",
   "es": "Combatir el fraude en pagos compartiendo señales entre proveedores sin centralizar los datos de clientes."
  },
  "regs": [
   "PSD3/PSR",
   "IPR",
   "AMLR",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "Payment fraud in the EEA rose to €4.2bn in 2024, and users bear 85% of credit-transfer losses.",
    "The PSR/PSD3 deal requires name–IBAN checks, makes providers refund bank-impersonation fraud and holds platforms liable for fraudulent content.",
    "Verification of payee has been mandatory in the euro area since 9 October 2025.",
    "The AMLR applies from 10 July 2027 and requires beneficial ownership discrepancies to be reported within 14 days.",
    "AMLA will run FIU.net and match FIU data on a hit/no-hit basis."
   ],
   "es": [
    "El fraude de pagos en el EEE subió a 4.200 M€ en 2024, y los usuarios soportan el 85 % de las pérdidas por transferencias.",
    "El acuerdo PSR/PSD3 exige verificar nombre e IBAN, obliga a reembolsar la suplantación del banco y responsabiliza a las plataformas del contenido fraudulento.",
    "La verificación del beneficiario es obligatoria en la zona euro desde el 9/10/2025.",
    "El AMLR se aplica desde el 10/7/2027 y obliga a comunicar discrepancias de titularidad real en 14 días.",
    "AMLA gestionará FIU.net y cruzará datos de las UIF en modo hit/no-hit."
   ]
  },
  "why": {
   "en": [
    "Anti-fraud sharing between payment providers and hit/no-hit matching between FIUs are textbook cases of sharing without centralising, under usage control.",
    "The Banco de España–Bizum agreement (aggregated data by sector and country, no personal data) shows purpose-limited sharing in practice.",
    "With 1,237 million Bizum transactions a year, fraud checks between banks, platforms and operators need near real-time exchange with usage rules."
   ],
   "es": [
    "El intercambio antifraude entre proveedores y el cruce hit/no-hit de las UIF son casos típicos de compartir sin centralizar, con control de uso.",
    "El convenio Banco de España–Bizum (datos agregados por sector y país, sin datos personales) muestra cómo se comparte con finalidad limitada.",
    "Con 1.237 M de operaciones Bizum al año, el cruce antifraude entre bancos, plataformas y operadores necesita intercambio casi en tiempo real con reglas de uso."
   ]
  },
  "example": {
   "en": "The EBA–ECB report puts EEA payment fraud at €4.2bn in 2024, up from €3.5bn in 2023 (F-0653).",
   "es": "El informe EBA–BCE cifra el fraude de pagos en el EEE en 4.200 M€ en 2024, frente a 3.500 M€ en 2023 (F-0653)."
  },
  "sources": [
   "F-0645",
   "F-0646",
   "F-0647",
   "F-0653",
   "F-0654",
   "F-0655",
   "F-0656",
   "F-0657"
  ]
 },
 {
  "id": "SEC13",
  "group": "finance",
  "name": {
   "en": "Professional services (law, audit, consulting)",
   "es": "Servicios profesionales (despachos, auditoría, consultoría)"
  },
  "tagline": {
   "en": "Exchanging confidential client files under professional secrecy and European jurisdiction.",
   "es": "Intercambiar expedientes confidenciales con secreto profesional y bajo jurisdicción europea."
  },
  "regs": [
   "GDPR",
   "AML",
   "CSRD",
   "AI Act"
  ],
  "challenges": {
   "en": [
    "Lawyers' professional secrecy cannot be waived, and the CCBE asks firms to check whether the server's country can force disclosure to non-EU authorities.",
    "Firms are fined for basic sharing failures: €4,000 to an agency that passed a client's files to another, and €10,000 to a law firm for an email without blind copy.",
    "60% of legal professionals already use AI, yet relying on cloud or AI platforms does not shift confidentiality responsibility.",
    "Auditors and advisers are AML obliged entities and now face CSRD reporting with digital tagging and assurance."
   ],
   "es": [
    "El secreto profesional del abogado no admite renuncia, y la CCBE pide comprobar si la ley del país del servidor obliga a entregar datos a autoridades no europeas.",
    "Se multan fallos básicos: 4.000 € a una gestoría por ceder documentación de un cliente a otra, y 10.000 € a un despacho por un email sin copia oculta.",
    "El 60 % de los profesionales jurídicos ya usa IA, pero delegar en la nube o en plataformas de IA no traslada la responsabilidad de confidencialidad.",
    "Auditores y asesores son sujetos obligados en blanqueo y entran en el reporting CSRD, con etiquetado digital y verificación."
   ]
  },
  "why": {
   "en": [
    "The CCBE and bar associations want files exchanged with clients, courts and auditors inside a controlled environment under European jurisdiction.",
    "ESAP and CSRD XBRL tagging turn reports into machine-readable data that auditors must verify and exchange."
   ],
   "es": [
    "La CCBE y los colegios piden intercambiar expedientes con clientes, tribunales y auditores en un entorno controlado y bajo jurisdicción europea.",
    "El ESAP y el etiquetado XBRL de la CSRD convierten los informes en datos legibles por máquina que los auditores deben verificar e intercambiar."
   ]
  },
  "example": {
   "en": "ESMA reviewed 2,423 ESEF reports and took action against 252 issuers, about 10% (F-0665).",
   "es": "ESMA revisó 2.423 informes ESEF y actuó contra 252 emisores, en torno al 10 % (F-0665)."
  },
  "sources": [
   "F-0658",
   "F-0659",
   "F-0660",
   "F-0661",
   "F-0662",
   "F-0663",
   "F-0664",
   "F-0665",
   "F-0666"
  ]
 },
 {
  "id": "SEC14",
  "group": "finance",
  "name": {
   "en": "Real estate and building management",
   "es": "Inmobiliario y gestión de edificios"
  },
  "tagline": {
   "en": "Building one trusted digital record per building from fragmented, incompatible sources.",
   "es": "Construir un registro digital fiable por edificio a partir de fuentes fragmentadas e incompatibles."
  },
  "regs": [
   "EPBD",
   "STR",
   "GDPR",
   "AML"
  ],
  "challenges": {
   "en": [
    "The recast EPBD creates renovation passports and digital building logbooks, and requires energy certificates to be loaded into national databases.",
    "At least 30 building logbook initiatives exist in the EU on incompatible technologies, with no clear rules on who uploads, validates and accesses data.",
    "Since 20 May 2026, short-term rental platforms must verify registration numbers and send data to authorities every month.",
    "The AEPD fines agencies and owners' associations: €2,000 for contacting owners taken from portal ads, €1,000 for a website without HTTPS.",
    "Developers and estate agents are AML obliged entities and must document their review of risky transactions."
   ],
   "es": [
    "La EPBD refundida crea el pasaporte de renovación y el libro digital del edificio, y obliga a volcar los certificados energéticos en bases nacionales.",
    "Hay al menos 30 iniciativas de libro del edificio en la UE con tecnologías incompatibles y sin reglas claras sobre quién sube, valida y accede a los datos.",
    "Desde el 20/5/2026, las plataformas de alquiler de corta duración deben verificar el registro y enviar datos cada mes a las autoridades.",
    "La AEPD multa a inmobiliarias y comunidades: 2.000 € por captar propietarios desde anuncios de un portal y 1.000 € por una web sin HTTPS.",
    "Promotores y agentes son sujetos obligados en blanqueo y deben documentar el examen de las operaciones de riesgo."
   ]
  },
  "why": {
   "en": [
    "The logbook only works with common identifiers and interoperable exchange linking energy certificates, BIM and construction product passports.",
    "Monthly rental data sent through a single digital entry point is a working case of standardised business-to-government sharing."
   ],
   "es": [
    "El libro digital solo funciona con identificadores comunes e intercambio interoperable entre certificado energético, BIM y pasaporte de producto.",
    "El envío mensual de datos de alquileres por un punto digital único es un caso real de compartición B2G estandarizada."
   ]
  },
  "example": {
   "en": "Buildings use 40% of the EU's energy, and the recast EPBD had to be transposed by 29 May 2026 (F-0668).",
   "es": "Los edificios consumen el 40 % de la energía de la UE, y la EPBD refundida debía transponerse antes del 29/5/2026 (F-0668)."
  },
  "sources": [
   "F-0667",
   "F-0668",
   "F-0669",
   "F-0670",
   "F-0671",
   "F-0672",
   "F-0673",
   "F-0675"
  ]
 },
 {
  "id": "SEC15",
  "group": "finance",
  "name": {
   "en": "Telecommunications",
   "es": "Telecomunicaciones"
  },
  "tagline": {
   "en": "Exposing network data to other sectors while protecting subscriber identity.",
   "es": "Abrir los datos de red a otros sectores sin poner en riesgo la identidad de los abonados."
  },
  "regs": [
   "GDPR",
   "ePrivacy",
   "NIS2",
   "DNA"
  ],
  "challenges": {
   "en": [
    "Telcos face some of the AEPD's largest fines: €8.15m to Vodafone, including €2m for international transfers and €4m over oversight of its processors.",
    "SIM-swap fraud led to fines from €200,000 to €3.94m on four operators for weak identity checks.",
    "Reported telecom security incidents rose to 188 in 2024, up 20.5% on 2023.",
    "Customer data were stolen at Telefónica and SFR, including IBAN and SIM data at SFR.",
    "The proposed Digital Networks Act (21 January 2026) would replace the European Electronic Communications Code and amend ePrivacy."
   ],
   "es": [
    "Las telecos acumulan algunas de las mayores multas de la AEPD: 8,15 M€ a Vodafone, con 2 M€ por transferencias internacionales y 4 M€ por el control de sus encargados.",
    "El fraude por duplicado de SIM acabó en multas de 200.000 € a 3,94 M€ a cuatro operadoras por verificar mal la identidad.",
    "Los incidentes de seguridad notificados subieron a 188 en 2024, un 20,5 % más que en 2023.",
    "Se robaron datos de clientes de Telefónica y SFR, en el caso de SFR con IBAN y datos de SIM.",
    "La propuesta de Digital Networks Act (21/1/2026) sustituiría al Código Europeo de Comunicaciones Electrónicas y modificaría ePrivacy."
   ]
  },
  "why": {
   "en": [
    "Network APIs already expose network data to third parties; doing so with verified identity and usage policies is how a data space works.",
    "With 64.2 million mobile lines and over 40.9 million M2M lines in Spain, network and device data feed mobility, energy and anti-fraud."
   ],
   "es": [
    "Las API de red ya exponen datos a terceros; hacerlo con identidad verificada y políticas de uso es la lógica de un espacio de datos.",
    "Con 64,2 M de líneas móviles y más de 40,9 M de líneas M2M en España, los datos de red y de dispositivos alimentan movilidad, energía y antifraude."
   ]
  },
  "example": {
   "en": "The AEPD fined Vodafone €8.15m in March 2021 after 191 complaints, including €2m for international transfers (F-0676).",
   "es": "La AEPD multó a Vodafone con 8,15 M€ en marzo de 2021 tras 191 reclamaciones, con 2 M€ por transferencias internacionales (F-0676)."
  },
  "sources": [
   "F-0676",
   "F-0678",
   "F-0679",
   "F-0680",
   "F-0681",
   "F-0683",
   "F-0684"
  ]
 },
 {
  "id": "SEC16",
  "group": "industry",
  "name": {
   "en": "Automotive",
   "es": "Automoción"
  },
  "tagline": {
   "en": "Sharing vehicle and supply-chain data without giving up control or trade secrets.",
   "es": "Compartir datos del vehículo y de la cadena de suministro sin ceder el control ni el secreto comercial."
  },
  "regs": [
   "Data Act",
   "GDPR",
   "ePrivacy",
   "UNECE R155/R156"
  ],
  "challenges": {
   "en": [
    "The Data Act gives connected-car users the right to access vehicle data and share it with repairers, insurers and fleets.",
    "Reading data stored in the car usually needs prior consent under ePrivacy as well as GDPR; location and biometrics need extra safeguards.",
    "Cybersecurity and software updates are type-approval requirements, so any data channel must fit the maker's cybersecurity management system.",
    "Volkswagen was fined €1.1m over test-car data; in the US, GM paid $12.75m for selling driving and location data without consent.",
    "Who controls the data — maker, supplier or aftermarket — is contested, which makes sharing without losing trade secrets harder."
   ],
   "es": [
    "El Data Act da al usuario del coche conectado derecho a acceder a sus datos y compartirlos con talleres, aseguradoras y flotas.",
    "Acceder a los datos del coche exige normalmente consentimiento previo (ePrivacy) además del RGPD; localización y biometría requieren salvaguardas reforzadas.",
    "La ciberseguridad y las actualizaciones son requisito de homologación, así que cualquier canal de datos debe encajar en el sistema de ciberseguridad del fabricante.",
    "Volkswagen recibió 1,1 M€ de multa por sus coches de pruebas; en EE. UU., GM pagó 12,75 M$ por vender datos de conducción y localización sin consentimiento.",
    "Quién controla el dato (fabricante, proveedor o posventa) está en disputa, y eso complica compartirlo sin perder secreto comercial."
   ]
  },
  "why": {
   "en": [
    "Catena-X already works as a federated data space: active participants rose from 182 to 1,069 between December 2025 and September 2026.",
    "Estimated savings are €150–220 per vehicle, and footprints calculated with real data came out 46% lower than sector averages.",
    "Spain has a Catena-X hub backed by SERNAUTO, ANFAC and Innovalia, giving local suppliers a direct way in."
   ],
   "es": [
    "Catena-X ya funciona como espacio de datos federado: pasó de 182 a 1.069 participantes activos entre diciembre de 2025 y septiembre de 2026.",
    "Se estiman ahorros de 150–220 € por vehículo, y la huella calculada con datos reales salió un 46 % más baja que con medias del sector.",
    "España tiene un hub de Catena-X impulsado por SERNAUTO, ANFAC e Innovalia, una vía directa para los proveedores españoles."
   ]
  },
  "example": {
   "en": "Catena-X grew from 182 to 1,069 active participants in nine months, with estimated savings of €150–220 per vehicle (F-0692).",
   "es": "Catena-X pasó de 182 a 1.069 participantes activos en nueve meses, con un ahorro estimado de 150–220 € por vehículo (F-0692)."
  },
  "sources": [
   "F-0686",
   "F-0687",
   "F-0688",
   "F-0689",
   "F-0690",
   "F-0691",
   "F-0692",
   "F-0693"
  ]
 },
 {
  "id": "SEC17",
  "group": "industry",
  "name": {
   "en": "Aerospace",
   "es": "Aeroespacial"
  },
  "tagline": {
   "en": "Bringing a 10,000-supplier chain into data sharing while technical data stays at source.",
   "es": "Incorporar una cadena de 10.000 proveedores al intercambio de datos sin que el dato técnico salga de origen."
  },
  "regs": [
   "Part-IS",
   "Dual-use",
   "ITAR"
  ],
  "challenges": {
   "en": [
    "Part-IS has applied in full since 22 February 2026: an information security system within safety management, incident reporting and supply-chain risk oversight.",
    "Aerospace technical data are often dual-use, and EU export controls also cover electronic transmission of technology and software.",
    "US ITAR rules reach technical data shared with subsidiaries or foreign staff: Boeing paid $51m in 2024.",
    "Makers share with 100–200 Tier 1 suppliers, but Airbus's full chain is about 10,000 — onboarding it is the bottleneck.",
    "Safety data are sensitive and shared only in voluntary programmes with their own governance, such as Data4Safety."
   ],
   "es": [
    "Part-IS se aplica por completo desde el 22/2/2026: SGSI integrado en la gestión de la seguridad, notificación de incidentes y vigilancia de la cadena de suministro.",
    "Los datos técnicos aeroespaciales suelen ser de doble uso, y el control de exportaciones de la UE cubre también su transmisión electrónica.",
    "La normativa ITAR de EE. UU. alcanza a los datos técnicos compartidos con filiales o empleados extranjeros: Boeing pagó 51 M$ en 2024.",
    "El fabricante comparte con 100–200 proveedores Tier 1, pero la cadena de Airbus llega a unos 10.000: incorporarla es el cuello de botella.",
    "Los datos de seguridad operacional son sensibles y solo se comparten en programas voluntarios con gobernanza propia, como Data4Safety."
   ]
  },
  "why": {
   "en": [
    "Airbus announced in 2024 it would move all its data sharing to a Gaia-X data space; Aerospace-X, led by Airbus with 14 partners, is building it.",
    "Skywise has connected nearly 12,000 aircraft, and digital and connectivity services will grow from $10bn to $27bn by 2045.",
    "Data4Safety, with 59 members in 2024, is the European precedent for pooling sensitive data between authorities and industry."
   ],
   "es": [
    "Airbus anunció en 2024 que llevaría todo su intercambio de datos a un espacio Gaia-X; Aerospace-X, liderado por Airbus con 14 socios, lo construye.",
    "Skywise ha conectado casi 12.000 aviones, y los servicios digitales y de conectividad pasarán de 10.000 a 27.000 M$ hasta 2045.",
    "Data4Safety, con 59 miembros en 2024, es el precedente europeo de puesta en común de datos sensibles entre autoridades e industria."
   ]
  },
  "example": {
   "en": "Airbus shares data with some 100–200 Tier 1 suppliers out of a chain of about 10,000, and plans a Gaia-X aerospace data space (F-0699).",
   "es": "Airbus comparte datos con unos 100–200 Tier 1 de una cadena de unos 10.000 proveedores, y prepara un espacio de datos Gaia-X (F-0699)."
  },
  "sources": [
   "F-0695",
   "F-0696",
   "F-0697",
   "F-0698",
   "F-0699",
   "F-0700",
   "F-0701",
   "F-0702",
   "F-0703"
  ]
 },
 {
  "id": "SEC18",
  "group": "industry",
  "name": {
   "en": "Defence",
   "es": "Defensa"
  },
  "tagline": {
   "en": "Federating sensitive defence data between states and industry with full sovereignty.",
   "es": "Federar datos sensibles de defensa entre Estados e industria con plena soberanía."
  },
  "regs": [
   "Dual-use",
   "ITAR",
   "EDF"
  ],
  "challenges": {
   "en": [
    "Sovereignty is central: the Commission and EDA are steering a federated defence AI data space (DAIDS), with full capability planned for 2030.",
    "Dual-use and military technology is export-controlled, and research bodies need internal compliance programmes.",
    "Penalties for sharing defence technical data without a licence are severe: RTX paid $200m in 2024.",
    "Cooperative programmes force data sharing between states and firms with different classification regimes."
   ],
   "es": [
    "La soberanía es el requisito central: Comisión y EDA impulsan un espacio federado de datos de IA para defensa (DAIDS), con plena capacidad en 2030.",
    "La tecnología de doble uso y militar está sujeta a control de exportaciones, y los centros de investigación necesitan programas internos de cumplimiento.",
    "Compartir datos técnicos de defensa sin licencia se paga caro: RTX abonó 200 M$ en 2024.",
    "Los programas cooperativos obligan a compartir datos entre Estados y empresas con regímenes de clasificación distintos."
   ]
  },
  "why": {
   "en": [
    "The EU model is already federated: DAIDS for data and AI, and a military space data mechanism agreed by 15 states for about €50m.",
    "The EDF allocates €1,065m in 2025 (€7.3bn for 2021–2027); consortia must share sensitive data with traceability and policy-based access."
   ],
   "es": [
    "El modelo de la UE ya es federado: DAIDS para datos e IA y un mecanismo de datos espaciales militares de 15 Estados por unos 50 M€.",
    "El EDF reparte 1.065 M€ en 2025 (7.300 M€ en 2021–2027); los consorcios deben compartir datos sensibles con trazabilidad y acceso por política."
   ]
  },
  "example": {
   "en": "On 25 September 2026, 15 EU countries, Spain included, agreed a military space data mechanism worth about €50m (F-0705).",
   "es": "El 25/9/2026, 15 Estados de la UE, España incluida, acordaron un mecanismo de datos espaciales militares de unos 50 M€ (F-0705)."
  },
  "sources": [
   "F-0704",
   "F-0705",
   "F-0706",
   "F-0707",
   "F-0708",
   "F-0709"
  ]
 },
 {
  "id": "SEC19",
  "group": "industry",
  "name": {
   "en": "Chemicals",
   "es": "Química"
  },
  "tagline": {
   "en": "Sharing safety and carbon data along the chain without exposing formulations.",
   "es": "Compartir datos de seguridad y de carbono en la cadena sin exponer las formulaciones."
  },
  "regs": [
   "REACH",
   "CLP",
   "CSRD"
  ],
  "challenges": {
   "en": [
    "The ‘one substance, one assessment’ package creates a common chemicals data platform run by ECHA, in force since 1 January 2026.",
    "The revised CLP adds new hazard classes and opens the way to digital labelling; classification data must flow intact along the chain.",
    "In 2,603 checks, about a third of substances in imported mixtures lacked REACH registration.",
    "Product carbon footprints are commercially sensitive and must be shared only with authorised parties under common verification."
   ],
   "es": [
    "El paquete «una sustancia, una evaluación» crea una plataforma común de datos químicos de la ECHA, en vigor desde el 1/1/2026.",
    "La revisión del CLP añade nuevas clases de peligro y abre el etiquetado digital; el dato de clasificación debe llegar íntegro a toda la cadena.",
    "En 2.603 controles, alrededor de un tercio de las sustancias en mezclas importadas no tenía registro REACH.",
    "La huella de carbono de producto es un dato sensible: solo debe compartirse con partes autorizadas y con verificación común."
   ]
  },
  "why": {
   "en": [
    "TfS, with over 50 chemical companies, already runs a restricted footprint exchange and agreed a verification framework with Catena-X.",
    "European chemicals sell €635bn but hold only 13% of the world market; sharing compliance data without exposing recipes is a competitive edge."
   ],
   "es": [
    "TfS, con más de 50 químicas, ya opera un intercambio restringido de huellas y acordó con Catena-X un marco de verificación.",
    "La química europea vende 635.000 M€ pero solo tiene el 13 % del mercado mundial; compartir datos de cumplimiento sin exponer recetas es una ventaja."
   ]
  },
  "example": {
   "en": "ECHA's Enforcement Forum ran 2,603 checks and found about a third of substances in imported mixtures were not REACH-registered (F-0714).",
   "es": "El Foro de la ECHA hizo 2.603 controles y vio que un tercio de las sustancias en mezclas importadas no tenía registro REACH (F-0714)."
  },
  "sources": [
   "F-0711",
   "F-0712",
   "F-0713",
   "F-0714",
   "F-0715",
   "F-0716",
   "F-0717"
  ]
 },
 {
  "id": "SEC20",
  "group": "industry",
  "name": {
   "en": "Steel and metals",
   "es": "Siderurgia y metal"
  },
  "tagline": {
   "en": "Proving verified emissions per batch to meet CBAM and green steel demand.",
   "es": "Demostrar emisiones verificadas por lote para cumplir el CBAM y la demanda de acero verde."
  },
  "regs": [
   "CBAM",
   "ESPR",
   "CSRD"
  ],
  "challenges": {
   "en": [
    "CBAM's definitive regime began on 1 January 2026: importers above 50 t a year need authorisation and verified actual emissions, with the first declaration due by 30 September 2027.",
    "Importers depend on emissions data from non-EU plants; penalties can be reduced if errors come from third-party data.",
    "Buyers lack consistent data: environmental product declarations rarely include scrap share or emissions intensity.",
    "Material properties and test data are trade secrets, yet are needed downstream for passports and carbon footprints."
   ],
   "es": [
    "El CBAM definitivo arrancó el 1/1/2026: los importadores de más de 50 t/año necesitan autorización y emisiones reales verificadas, y la primera declaración vence el 30/9/2027.",
    "El importador depende de datos de plantas de fuera de la UE; la sanción puede reducirse si el error viene de datos de terceros.",
    "Los compradores no reciben datos homogéneos: las EPD rara vez incluyen el porcentaje de chatarra o la intensidad de emisiones.",
    "Las propiedades del material y los ensayos son secreto industrial, pero se necesitan aguas abajo para el pasaporte y la huella de CO2."
   ]
  },
  "why": {
   "en": [
    "The PMD-X-MAPRO data space (Siemens, SHS–Stahl-Holding-Saar, Deutz) exchanges material data automatically across multi-stage steel parts, even before delivery.",
    "Green steel procurement tools show demand for reliable batch-level emissions data; verifiable credentials avoid re-sending questionnaires along the chain.",
    "CBAM also covers aluminium, cement, fertilisers, electricity and hydrogen, so shared data tools serve several sectors."
   ],
   "es": [
    "El espacio de datos PMD-X-MAPRO (Siemens, SHS–Stahl-Holding-Saar, Deutz) intercambia datos de material de piezas de acero de varias etapas, incluso antes de la entrega.",
    "Las herramientas de compra de acero verde muestran la demanda de datos fiables por lote; las credenciales verificables evitan reenviar cuestionarios.",
    "El CBAM cubre también aluminio, cemento, fertilizantes, electricidad e hidrógeno, así que las herramientas compartidas sirven a varios sectores."
   ]
  },
  "example": {
   "en": "CBAM's definitive regime started on 1 January 2026, with the first annual declaration due by 30 September 2027 (F-0718).",
   "es": "El régimen definitivo del CBAM empezó el 1/1/2026, y la primera declaración anual vence el 30/9/2027 (F-0718)."
  },
  "sources": [
   "F-0718",
   "F-0719",
   "F-0721",
   "F-0722",
   "F-0723"
  ]
 },
 {
  "id": "SEC21",
  "group": "industry",
  "name": {
   "en": "Machinery and capital goods",
   "es": "Maquinaria y bienes de equipo"
  },
  "tagline": {
   "en": "Opening machine data to users by design without exposing industrial secrets.",
   "es": "Abrir por diseño los datos de las máquinas a sus usuarios sin exponer el secreto industrial."
  },
  "regs": [
   "Data Act",
   "CRA",
   "Machinery Reg.",
   "AI Act"
  ],
  "challenges": {
   "en": [
    "From 12 September 2026, new connected machines must offer data access by design, free of charge and machine-readable.",
    "Makers fear exposing trade secrets; the Data Act allows protective measures and, exceptionally, refusal — but it must be justified.",
    "Since 11 September 2026 the CRA requires exploited vulnerabilities and severe incidents to be reported within 24 and 72 hours; fines reach €15m or 2.5% of global turnover.",
    "The new Machinery Regulation applies from 20 January 2027, with protection against corruption of safety functions; industry wants clarity on how it fits with the CRA."
   ],
   "es": [
    "Desde el 12/9/2026, las máquinas conectadas nuevas deben dar acceso a sus datos por diseño, gratis y en formato legible por máquina.",
    "El fabricante teme exponer secretos; el Data Act permite medidas de protección y, de forma excepcional, negarse, pero hay que justificarlo.",
    "Desde el 11/9/2026 el CRA obliga a notificar vulnerabilidades explotadas e incidentes graves en 24 y 72 horas; las multas llegan a 15 M€ o el 2,5 % de la facturación.",
    "El nuevo Reglamento de Máquinas se aplica desde el 20/1/2027 y protege las funciones de seguridad; la industria pide aclarar cómo encaja con el CRA."
   ]
  },
  "why": {
   "en": [
    "Factory-X (47 partners, led by SAP and Siemens) develops 11 use cases on a common core: maintenance, manufacturing-as-a-service, energy and circularity.",
    "VDMA and T-Systems showed the first Manufacturing-X solution on IDSA and OPC UA, calculating footprints in a data space with plants on four continents, including TRIMEK in Spain.",
    "A data space lets makers meet the Data Act, the CRA and passport duties without opening the machine's control system."
   ],
   "es": [
    "Factory-X (47 socios, liderado por SAP y Siemens) desarrolla 11 casos de uso sobre un núcleo común: mantenimiento, fabricación como servicio, energía y circularidad.",
    "VDMA y T-Systems mostraron la primera solución Manufacturing-X sobre IDSA y OPC UA, con cálculo de huella en un espacio de datos y plantas en cuatro continentes, entre ellas TRIMEK en España.",
    "Un espacio de datos permite cumplir el Data Act, el CRA y el pasaporte digital sin abrir el sistema de control de la máquina."
   ]
  },
  "example": {
   "en": "Factory-X brings together 47 partners and 10 associates, led by SAP and Siemens, across 11 use cases (F-0731).",
   "es": "Factory-X reúne a 47 socios y 10 asociados, liderados por SAP y Siemens, en 11 casos de uso (F-0731)."
  },
  "sources": [
   "F-0726",
   "F-0727",
   "F-0728",
   "F-0729",
   "F-0730",
   "F-0731",
   "F-0732"
  ]
 },
 {
  "id": "SEC22",
  "group": "industry",
  "name": {
   "en": "Electronics and semiconductors",
   "es": "Electrónica y semiconductores"
  },
  "tagline": {
   "en": "Sharing capacity and process data in a crisis without leaking the industry's crown jewels.",
   "es": "Compartir datos de capacidad y de proceso en una crisis sin filtrar el gran secreto del sector."
  },
  "regs": [
   "Chips Act",
   "Export controls",
   "Ecodesign"
  ],
  "challenges": {
   "en": [
    "The Chips Act lets the Commission request industry information in a crisis; the proposed Chips Act 2.0 makes replies mandatory, with fines up to €300,000.",
    "Chips Act 2.0 also requires firms to report third-country information requests and creates a B2B supply-chain platform.",
    "Export control penalties have hit records: $252.5m for Applied Materials in 2026 and $95m for Cadence.",
    "Process and production data are core trade secrets, shared only under machine-readable, technically enforced rules.",
    "Ecodesign rules for phones and tablets, in force since 20 June 2025, require repairability and durability data."
   ],
   "es": [
    "La Ley de Chips permite a la Comisión pedir información en una crisis; la propuesta Chips Act 2.0 hace obligatorias las respuestas, con multas de hasta 300.000 €.",
    "La Chips Act 2.0 obliga además a informar de las peticiones de terceros países y crea una plataforma B2B de la cadena de suministro.",
    "Las sanciones por control de exportaciones son récord: 252,5 M$ a Applied Materials en 2026 y 95 M$ a Cadence.",
    "Los datos de proceso y producción son el núcleo del secreto industrial y solo se comparten con reglas legibles por máquina y aplicadas técnicamente.",
    "El ecodiseño de móviles y tabletas, vigente desde el 20/6/2025, exige datos de reparabilidad y durabilidad."
   ]
  },
  "why": {
   "en": [
    "Semiconductor-X (Intel, Infineon, Siemens, SAP, Bosch) is building a data room with technically enforced usage rules.",
    "The planned B2B platform fits a federated data space: capacity data reach the authority only in a crisis and under policy."
   ],
   "es": [
    "Semiconductor-X (Intel, Infineon, Siemens, SAP, Bosch) construye un data room con reglas de uso aplicadas técnicamente.",
    "La plataforma B2B prevista encaja con un espacio federado: los datos de capacidad llegan a la autoridad solo en crisis y bajo política."
   ]
  },
  "example": {
   "en": "Applied Materials agreed a $252.5m settlement with BIS in February 2026 over 56 unlicensed re-exports to SMIC (F-0737).",
   "es": "Applied Materials pactó con el BIS 252,5 M$ en febrero de 2026 por 56 reexportaciones a SMIC sin licencia (F-0737)."
  },
  "sources": [
   "F-0734",
   "F-0735",
   "F-0736",
   "F-0737",
   "F-0738",
   "F-0739"
  ]
 },
 {
  "id": "SEC23",
  "group": "industry",
  "name": {
   "en": "Construction",
   "es": "Construcción"
  },
  "tagline": {
   "en": "Connecting BIM models, product passports and building logbooks across a fragmented sector.",
   "es": "Conectar modelos BIM, pasaportes de producto y libros del edificio en un sector muy fragmentado."
  },
  "regs": [
   "CPR",
   "EPBD",
   "BIM"
  ],
  "challenges": {
   "en": [
    "The new Construction Products Regulation brings digital product passports, phased in by product family under a 2026–2029 work plan.",
    "The EPBD requires energy certificate databases, renovation passports and access to building system data.",
    "Spain's BIM Plan brings BIM into public contracts step by step, so models circulate between administration, designers and builders.",
    "The sector is highly fragmented, and digital building records need a common framework to avoid silos."
   ],
   "es": [
    "El nuevo Reglamento de Productos de Construcción trae el pasaporte digital de producto, por familias y con un plan de trabajo 2026–2029.",
    "La EPBD exige bases de datos de certificados energéticos, pasaportes de renovación y acceso a los datos de los sistemas del edificio.",
    "El Plan BIM incorpora BIM a los contratos públicos de forma progresiva, y los modelos circulan entre administración, proyectistas y constructoras.",
    "El sector está muy fragmentado, y los registros digitales de edificios necesitan un marco común para no quedarse en silos."
   ]
  },
  "why": {
   "en": [
    "Digital TER-X (Dawex, Orange Business, Docaposte, Sopra Steria) became a Gaia-X Lighthouse in November 2025, designed around the Data Act, DGA and AI Act.",
    "With over €15bn and 4,670 public tenders using BIM in Spain, there is critical mass to connect models and passports through connectors and usage policies."
   ],
   "es": [
    "Digital TER-X (Dawex, Orange Business, Docaposte, Sopra Steria) es Gaia-X Lighthouse desde noviembre de 2025 y está diseñado para cumplir Data Act, DGA y AI Act.",
    "Con más de 15.000 M€ y 4.670 licitaciones con BIM en España, hay masa crítica para conectar modelos y pasaportes con conectores y políticas de uso."
   ]
  },
  "example": {
   "en": "Public BIM procurement in Spain exceeded €15bn across 4,670 tenders by April 2025 (F-0746).",
   "es": "La contratación pública con BIM en España superaba los 15.000 M€ y 4.670 licitaciones en abril de 2025 (F-0746)."
  },
  "sources": [
   "F-0740",
   "F-0741",
   "F-0742",
   "F-0743",
   "F-0744",
   "F-0745",
   "F-0746"
  ]
 },
 {
  "id": "SEC24",
  "group": "industry",
  "name": {
   "en": "Textiles and fashion",
   "es": "Textil y moda"
  },
  "tagline": {
   "en": "Tracing textiles batch by batch across long global chains to back up circularity claims.",
   "es": "Trazar el textil lote a lote en cadenas largas y globales para respaldar lo que se dice de circularidad."
  },
  "regs": [
   "ESPR",
   "WFD",
   "Green claims"
  ],
  "challenges": {
   "en": [
    "Since 19 July 2026 large firms may not destroy unsold clothes, accessories or shoes, and must report what they discard.",
    "The revised Waste Framework Directive makes producer responsibility for textiles mandatory, requiring data on what is sold and collected.",
    "Green claims are fined: Italy's competition authority fined Shein €1m in 2025 for misleading environmental claims.",
    "The textile digital passport will arrive under the ESPR, around 2030 according to pilots, requiring batch-level traceability beyond the EU."
   ],
   "es": [
    "Desde el 19/7/2026 las grandes empresas no pueden destruir ropa, complementos ni calzado sin vender, y deben informar de lo que descartan.",
    "La revisión de la Directiva marco de residuos hace obligatoria la RAP textil y exige datos de lo que se vende y se recoge.",
    "Las alegaciones ambientales se sancionan: la autoridad italiana de competencia multó a Shein con 1 M€ en 2025.",
    "El pasaporte digital textil llegará con el ESPR, hacia 2030 según los pilotos, y exigirá trazabilidad por lote también fuera de la UE."
   ]
  },
  "why": {
   "en": [
    "Passport pilots such as Trace4Value (with Kappahl and Marimekko) and the TRICK platform (€8.0m EU funding) show the challenge is sharing without centralising.",
    "The EU generated 12.6 Mt of textile waste in 2019, and only a fifth was collected separately."
   ],
   "es": [
    "Pilotos como Trace4Value (con Kappahl y Marimekko) y la plataforma TRICK (8,0 M€ de la UE) muestran que el reto es compartir sin centralizar.",
    "La UE generó 12,6 Mt de residuos textiles en 2019 y solo una quinta parte se recogió por separado."
   ]
  },
  "example": {
   "en": "Between 4% and 9% of unsold textiles in Europe are destroyed, around 5.6 Mt of CO2 (F-0747).",
   "es": "En Europa se destruye entre el 4 % y el 9 % del textil sin vender, unas 5,6 Mt de CO2 (F-0747)."
  },
  "sources": [
   "F-0747",
   "F-0748",
   "F-0749",
   "F-0750",
   "F-0751",
   "F-0752"
  ]
 },
 {
  "id": "SEC25",
  "group": "industry",
  "name": {
   "en": "Food and drink",
   "es": "Alimentación y bebidas"
  },
  "tagline": {
   "en": "Sharing traceability and waste data along the chain without the strongest link capturing the value.",
   "es": "Compartir datos de trazabilidad y desperdicio en la cadena sin que el eslabón fuerte se quede con el valor."
  },
  "regs": [
   "Food Waste Act",
   "Food Chain Act",
   "WFD"
  ],
  "challenges": {
   "en": [
    "Spain's food waste law requires prevention plans and prioritises donation, which means recording and reporting surplus data.",
    "Food supply contracts must be entered in a digital register; in 2025 AICA penalised 991 infringements, almost four times 2024, 51% for unregistered contracts.",
    "The revised Waste Framework Directive sets binding 2030 food waste reduction targets, measured and reported by Member States.",
    "Traceability in long chains (transport, cold chain, origin) means integrating sensor data from several operators."
   ],
   "es": [
    "La Ley 1/2025 obliga a tener planes de prevención y a priorizar la donación, lo que implica registrar y reportar datos de excedentes.",
    "Los contratos deben inscribirse en un registro digital; en 2025 la AICA sancionó 991 infracciones, casi el cuádruple que en 2024, el 51 % por no registrar contratos.",
    "La revisión de la Directiva marco de residuos fija objetivos vinculantes de reducción del desperdicio para 2030, con medición y reporte.",
    "La trazabilidad en cadenas largas (transporte, frío, origen) obliga a integrar datos de sensores de varios operadores."
   ]
  },
  "why": {
   "en": [
    "Food and drink is the EU's largest manufacturing sector (€1.5tn turnover, 4.8 million jobs) and is mostly SMEs.",
    "Interoperable traceability with IoT and data spaces, and the TRICK platform, show the way; a data space can also feed government reporting from the firm's own systems."
   ],
   "es": [
    "La alimentación es la mayor manufactura de la UE (1,5 billones de euros y 4,8 millones de empleos) y está formada sobre todo por pymes.",
    "La trazabilidad interoperable con IoT y espacio de datos, y la plataforma TRICK, marcan el camino; un espacio de datos también alimenta el reporte a la administración desde el propio sistema."
   ]
  },
  "example": {
   "en": "Spain's food chain agency AICA penalised 991 infringements in 2025, 51% for failing to register contracts (F-0756).",
   "es": "La AICA sancionó 991 infracciones en 2025, el 51 % por no inscribir contratos en el registro obligatorio (F-0756)."
  },
  "sources": [
   "F-0752",
   "F-0755",
   "F-0756",
   "F-0757",
   "F-0758",
   "F-0759"
  ]
 },
 {
  "id": "SEC26",
  "group": "industry",
  "name": {
   "en": "Batteries and storage",
   "es": "Baterías y almacenamiento"
  },
  "tagline": {
   "en": "Running the battery passport across miners, cell makers, carmakers and recyclers with role-based access.",
   "es": "Hacer funcionar el pasaporte de baterías entre minería, fabricantes, OEM y recicladores con acceso por roles."
  },
  "regs": [
   "Batteries Reg.",
   "ESPR"
  ],
  "challenges": {
   "en": [
    "The battery passport is mandatory from 18 February 2027 for EV, light transport and industrial batteries above 2 kWh; Commission guidance lists 71 data points.",
    "Attributes span composition, performance, mining labour conditions and carbon footprint; some are public, others only for legitimate parties or authorities.",
    "The carbon footprint declaration needs harmonised calculation rules and primary data from upstream suppliers, often outside the EU.",
    "New recycling efficiency rules require data from battery waste operators."
   ],
   "es": [
    "El pasaporte de baterías es obligatorio desde el 18/2/2027 para baterías de VE, transporte ligero e industriales de más de 2 kWh; la guía de la Comisión recoge 71 datos.",
    "Los atributos incluyen composición, rendimiento, condiciones laborales en la extracción y huella de carbono; unos son públicos y otros solo para interesados legítimos o autoridades.",
    "La declaración de huella de carbono necesita reglas de cálculo armonizadas y datos primarios de proveedores, a menudo de fuera de la UE.",
    "Las nuevas reglas de eficiencia de reciclado obligan a reportar datos de los gestores de residuos de baterías."
   ]
  },
  "why": {
   "en": [
    "DIN DKE SPEC 99100 and the Battery Pass guidance define the data model, but exchange across the life cycle needs federated infrastructure with identity and usage policies.",
    "EV battery demand reached about 1.2 TWh in 2025 and China holds over 80% of capacity; verifiable footprint and origin data help Europe stand out."
   ],
   "es": [
    "La DIN DKE SPEC 99100 y la guía Battery Pass definen el modelo de datos, pero el intercambio a lo largo del ciclo de vida necesita una infraestructura federada con identidad y políticas de uso.",
    "La demanda de baterías de VE llegó a unos 1,2 TWh en 2025 y China tiene más del 80 % de la capacidad; datos verificables de huella y origen diferencian a Europa."
   ]
  },
  "example": {
   "en": "Commission guidance of 21 August 2026 sets out 71 data points for the battery passport, mandatory from 18 February 2027 (F-0761).",
   "es": "La guía de la Comisión del 21/8/2026 fija 71 datos para el pasaporte de baterías, obligatorio desde el 18/2/2027 (F-0761)."
  },
  "sources": [
   "F-0761",
   "F-0762",
   "F-0763",
   "F-0765",
   "F-0766",
   "F-0767",
   "F-0768"
  ]
 },
 {
  "id": "SEC27",
  "group": "energy",
  "name": {
   "en": "Electricity (generation, grids, retail)",
   "es": "Electricidad (generación, redes, comercialización)"
  },
  "tagline": {
   "en": "Opening smart-meter and grid data to many players while keeping consumers in control.",
   "es": "Abrir los datos de contadores y redes a muchos actores manteniendo al consumidor al mando."
  },
  "regs": [
   "Electricity Dir.",
   "GDPR",
   "REMIT",
   "NIS2"
  ],
  "challenges": {
   "en": [
    "Data managers must give customers, suppliers and service providers non-discriminatory access to smart-meter data, while complying with GDPR.",
    "Since 5 January 2025 a mandatory reference model sets six standard procedures for access, permission and revocation.",
    "Sending one customer's data to another cost a last-resort supplier €500,000 for breaching data protection by design.",
    "Wholesale data fall under REMIT: Spain's CNMC imposed €6m and €1.5m in 2024 for algorithmic market manipulation.",
    "A dedicated network code on cybersecurity, aligned with NIS2, governs cross-border electricity flows."
   ],
   "es": [
    "Los gestores de datos deben dar acceso no discriminatorio a los datos de contadores a clientes, comercializadoras y proveedores, cumpliendo el RGPD.",
    "Desde el 5/1/2025 un modelo de referencia obligatorio fija seis procedimientos estándar de acceso, permiso y revocación.",
    "Enviar los datos de un cliente a otro le costó a una comercializadora de último recurso 500.000 € por infringir la protección de datos desde el diseño.",
    "Los datos mayoristas están sujetos a REMIT: la CNMC impuso 6 M€ y 1,5 M€ en 2024 por manipulación algorítmica.",
    "Un código de red de ciberseguridad propio, alineado con NIS2, regula los flujos eléctricos transfronterizos."
   ]
  },
  "why": {
   "en": [
    "The EU energy digitalisation plan targets data sovereignty and privacy and expects over €71bn a year in direct consumer savings.",
    "OMEGA-X, coordinated from Spain with 34 participants, demonstrated a federated, Gaia-X-ready energy data space.",
    "Datadis already covers about 29 million supply points in Spain — a natural base for connecting authorised third parties with ODRL permissions."
   ],
   "es": [
    "El plan de digitalización energética de la UE busca soberanía y privacidad del dato y calcula más de 71.000 M€ anuales de ahorro directo para los consumidores.",
    "OMEGA-X, coordinado desde España con 34 participantes, demostró un espacio de datos energético federado y preparado para Gaia-X.",
    "Datadis ya cubre unos 29 millones de suministros en España: la base natural para conectar a terceros autorizados con permisos ODRL."
   ]
  },
  "example": {
   "en": "The AEPD upheld a €500,000 fine on Curenergía, a last-resort supplier, for sending one customer's data to another (F-0789).",
   "es": "La AEPD confirmó 500.000 € de multa a Curenergía, comercializadora de último recurso, por enviar los datos de un cliente a otro (F-0789)."
  },
  "sources": [
   "F-0785",
   "F-0786",
   "F-0787",
   "F-0788",
   "F-0789",
   "F-0790",
   "F-0791",
   "F-0792"
  ]
 },
 {
  "id": "SEC28",
  "group": "energy",
  "name": {
   "en": "Gas, oil and hydrogen",
   "es": "Gas, petróleo e hidrógeno"
  },
  "tagline": {
   "en": "Proving origin and emissions across multi-actor, cross-border fuel chains.",
   "es": "Demostrar origen y emisiones en cadenas de combustible con muchos actores y varios países."
  },
  "regs": [
   "REMIT",
   "Methane Reg.",
   "RED III",
   "H2 package"
  ],
  "challenges": {
   "en": [
    "Gas trading data fall under REMIT: false market signals were fined €1m in Spain and €940,000 in Italy.",
    "Regulatory data volumes are huge: 11.6 billion transaction records and €122m in REMIT fines in 2024.",
    "The Methane Regulation will make importers prove equivalent monitoring of upstream emissions, which needs verifiable data from non-EU suppliers.",
    "Biomethane and renewable hydrogen must be traced consignment by consignment in the Union Database, from origin to market.",
    "The hydrogen and decarbonised gas package creates ENNOH and new transparency and network access duties."
   ],
   "es": [
    "Los datos de negociación de gas están sujetos a REMIT: las señales falsas se multaron con 1 M€ en España y 940.000 € en Italia.",
    "El volumen de datos regulatorios es enorme: 11.600 millones de registros y 122 M€ en multas REMIT en 2024.",
    "El Reglamento de metano obligará a los importadores a acreditar un seguimiento equivalente de las emisiones de origen, con datos verificables de proveedores de fuera de la UE.",
    "El biometano y el hidrógeno renovable deben trazarse consigna a consigna en la Union Database, desde el origen hasta el mercado.",
    "El paquete de hidrógeno y gas descarbonizado crea ENNOH y nuevas obligaciones de transparencia y acceso a redes."
   ]
  },
  "why": {
   "en": [
    "A data space lets firms report to regulators (REMIT, methane, Union Database) traceably, without exposing commercially sensitive data to third parties.",
    "Hydrogen and biomethane chains of custody are multi-actor and cross-border — a fit for connectors and verifiable credentials, not questionnaires and spreadsheets."
   ],
   "es": [
    "Un espacio de datos permite reportar a los reguladores (REMIT, metano, Union Database) de forma trazable sin exponer información sensible a terceros.",
    "Las cadenas de custodia del hidrógeno y el biometano son multiactor y transfronterizas: encajan con conectores y credenciales verificables, no con cuestionarios y hojas de cálculo."
   ]
  },
  "example": {
   "en": "In 2024 REMIT reporting reached 11.6 billion transaction records, over 19,000 registered participants and €122m in fines (F-0796).",
   "es": "En 2024 el reporte REMIT sumó 11.600 millones de registros, más de 19.000 participantes y 122 M€ en multas (F-0796)."
  },
  "sources": [
   "F-0794",
   "F-0795",
   "F-0796",
   "F-0797",
   "F-0799",
   "F-0801",
   "F-0802"
  ]
 },
 {
  "id": "SEC29",
  "group": "energy",
  "name": {
   "en": "Renewables and self-consumption",
   "es": "Energías renovables y autoconsumo"
  },
  "tagline": {
   "en": "Accessing data from millions of distributed assets without opening remote control to high-risk vendors.",
   "es": "Acceder a los datos de millones de activos distribuidos sin abrir el control remoto a fabricantes de alto riesgo."
  },
  "regs": [
   "RED III",
   "NIS2",
   "CRA"
  ],
  "challenges": {
   "en": [
    "RED III requires real-time access to basic battery data (state of health, charge, power) for owners and authorised third parties.",
    "Every Member State except Denmark missed the May 2025 transposition deadline, so data access rules still vary by country.",
    "Over 200 GW of European solar relies on Chinese inverters, and two vendors have remote access to 168 GW.",
    "The EU's Economic Security Doctrine (December 2025) lists solar inverters as a high-risk dependency."
   ],
   "es": [
    "La RED III exige dar acceso en tiempo real a datos básicos de las baterías (salud, carga, potencia) a propietarios y terceros autorizados.",
    "Todos los Estados salvo Dinamarca incumplieron el plazo de transposición de mayo de 2025, así que el acceso a datos varía según el país.",
    "Más de 200 GW de fotovoltaica europea dependen de inversores chinos, y dos fabricantes tienen acceso remoto a 168 GW.",
    "La Doctrina de Seguridad Económica de la UE (diciembre de 2025) califica los inversores de dependencia de alto riesgo."
   ]
  },
  "why": {
   "en": [
    "Spain has 9.3 GW of solar self-consumption, which generated about 12,387 GWh in 2025 — distributed assets whose data aggregators, grid operators and energy communities need.",
    "A data space delivers battery and inverter data with consent and ODRL policies, without opening remote control channels, and complements Datadis and OMEGA-X."
   ],
   "es": [
    "España tiene 9,3 GW de autoconsumo solar, que generaron unos 12.387 GWh en 2025: activos distribuidos cuyos datos necesitan agregadores, distribuidoras y comunidades energéticas.",
    "Un espacio de datos da acceso a datos de baterías e inversores con consentimiento y políticas ODRL, sin abrir canales de control remoto, y complementa Datadis y OMEGA-X."
   ]
  },
  "example": {
   "en": "Two inverter makers have remote access to 168 GW of European solar capacity (F-0806).",
   "es": "Dos fabricantes de inversores tienen acceso remoto a 168 GW de fotovoltaica europea (F-0806)."
  },
  "sources": [
   "F-0791",
   "F-0792",
   "F-0803",
   "F-0804",
   "F-0805",
   "F-0806",
   "F-0807",
   "F-0809",
   "F-0810"
  ]
 },
 {
  "id": "SEC30",
  "group": "energy",
  "name": {
   "en": "Water and sanitation",
   "es": "Agua y saneamiento"
  },
  "tagline": {
   "en": "Proving treatment compliance and sharing pollution-cost data between utilities and producers.",
   "es": "Demostrar el cumplimiento en depuración y compartir datos de coste de la contaminación entre operadores y productores."
  },
  "regs": [
   "UWWTD",
   "NIS2"
  ],
  "challenges": {
   "en": [
    "The new Urban Wastewater Directive widens monitoring and makes pharmaceutical and cosmetics producers pay, which requires shared load and cost data.",
    "Producer responsibility for advanced (quaternary) treatment is being challenged in court, so cost-attribution data will be decisive.",
    "Spain has paid €87m since 2018 for poor wastewater treatment and was condemned again in December 2025 over the Canary Islands.",
    "ENISA places drinking water and wastewater in the NIS2 ‘risk zone’: one in three operators has never carried out a risk analysis."
   ],
   "es": [
    "La nueva Directiva de aguas residuales amplía el seguimiento y crea la RAP para farmacéuticas y cosméticas, lo que exige compartir datos de carga y costes.",
    "La RAP del tratamiento cuaternario está recurrida en los tribunales, así que los datos de atribución de costes serán determinantes.",
    "España ha pagado 87 M€ desde 2018 por depurar mal y volvió a ser condenada en diciembre de 2025 por Canarias.",
    "ENISA sitúa el agua potable y residual en la «zona de riesgo» de NIS2: uno de cada tres operadores nunca ha hecho un análisis de riesgos."
   ]
  },
  "why": {
   "en": [
    "WATERVERSE (Horizon Europe, €4.5m EU funding) built a data management ecosystem to ease water utilities' entry into data spaces.",
    "A data space would connect operators, river basin authorities, health bodies and paying producers under usage rules, instead of spreadsheet reports."
   ],
   "es": [
    "WATERVERSE (Horizonte Europa, 4,5 M€ de la UE) desarrolló un ecosistema de gestión de datos para facilitar a las empresas del agua el acceso a espacios de datos.",
    "Un espacio de datos conectaría operadores, confederaciones, sanidad y productores sujetos a RAP con reglas de uso, en lugar de informes en hojas de cálculo."
   ]
  },
  "example": {
   "en": "Spain has paid €87m in EU penalties since 2018 for inadequate wastewater treatment (F-0816).",
   "es": "España acumula 87 M€ pagados desde 2018 por depuración deficiente de aguas residuales (F-0816)."
  },
  "sources": [
   "F-0812",
   "F-0813",
   "F-0814",
   "F-0815",
   "F-0816",
   "F-0818",
   "F-0819",
   "F-0820"
  ]
 },
 {
  "id": "SEC31",
  "group": "energy",
  "name": {
   "en": "Waste management and circular economy",
   "es": "Gestión de residuos y economía circular"
  },
  "tagline": {
   "en": "Tracking every waste shipment and recycled-content claim with interoperable data.",
   "es": "Seguir cada traslado de residuos y cada dato de contenido reciclado con información interoperable."
  },
  "regs": [
   "WSR",
   "PPWR",
   "Waste Act (ES)"
  ],
  "challenges": {
   "en": [
    "The new Waste Shipment Regulation applies from 21 May 2026: shipments needing prior consent go through DIWASS by electronic data exchange.",
    "From 21 November 2026, exporting plastic waste to non-OECD countries is banned.",
    "The Packaging Regulation applies from 12 August 2026, with recycled-content, recyclability and reuse targets that must be documented with data.",
    "Spain's Royal Decree 764/2026 creates a single shared waste register with electronic exchange; register IDs are mandatory on shipment documents.",
    "Spain's Waste Act 7/2022 tightens information and traceability duties."
   ],
   "es": [
    "El nuevo Reglamento de traslados se aplica desde el 21/5/2026: los traslados con notificación previa se tramitan en DIWASS por intercambio electrónico.",
    "Desde el 21/11/2026 se prohíbe exportar residuos plásticos a países no OCDE.",
    "El Reglamento de envases se aplica desde el 12/8/2026, con objetivos de contenido reciclado, reciclabilidad y reutilización que hay que documentar con datos.",
    "El RD 764/2026 crea un registro de residuos único y compartido con intercambio electrónico; sus identificadores son obligatorios en los documentos de traslado.",
    "La Ley 7/2022 de residuos endurece las obligaciones de información y trazabilidad."
   ]
  },
  "why": {
   "en": [
    "In 2024 about 26 Mt of notified waste and 50 Mt of green-list waste were shipped within the EU — a volume that needs interoperable data between operators, carriers and authorities.",
    "Onto-DESIDE (Horizon Europe) demonstrated decentralised industrial data sharing for the circular economy, with fine-grained access control and shared ontologies.",
    "Ullswater applies this approach in EcoDataNet, a circular economy data space demonstrator."
   ],
   "es": [
    "En 2024 se trasladaron en la UE unos 26 Mt de residuos con notificación previa y 50 Mt de lista verde: un volumen que exige datos interoperables entre gestores, transportistas y autoridades.",
    "Onto-DESIDE (Horizonte Europa) demostró el intercambio descentralizado de datos industriales para la economía circular, con control de acceso granular y ontologías comunes.",
    "Ullswater aplica este enfoque en EcoDataNet, un demostrador de espacio de datos de economía circular."
   ]
  },
  "example": {
   "en": "Since 21 May 2026 every EU waste shipment requiring prior consent goes through the DIWASS platform (F-0821).",
   "es": "Desde el 21/5/2026 todo traslado de residuos con consentimiento previo en la UE pasa por la plataforma DIWASS (F-0821)."
  },
  "sources": [
   "F-0821",
   "F-0823",
   "F-0825",
   "F-0827",
   "F-0828"
  ]
 },
 {
  "id": "SEC32",
  "group": "energy",
  "name": {
   "en": "Agriculture and livestock",
   "es": "Agricultura y ganadería"
  },
  "tagline": {
   "en": "Letting farmers reuse their own data for the CAP, traceability and carbon without losing control.",
   "es": "Que el agricultor reutilice sus propios datos para la PAC, la trazabilidad y el carbono sin perder el control."
  },
  "regs": [
   "CAP",
   "Data Act",
   "SIEX"
  ],
  "challenges": {
   "en": [
    "Spain's SIEX created the digital farm logbook; it became voluntary until the next CAP period, but plant protection, fertiliser and CAP records remain mandatory.",
    "Farmers fear losing control of data captured by machinery and platforms; the EU code of conduct relies on contracts and consent, and the Data Act now gives users of connected machines access to their data.",
    "Weak incentives and few use cases led to the liquidation of Agdatahub in late 2024.",
    "Interoperability between platforms and countries is still an obstacle."
   ],
   "es": [
    "El SIEX creó el cuaderno digital de explotación; ahora es voluntario hasta el próximo periodo de la PAC, pero los registros de fitosanitarios, fertilización y PAC siguen siendo obligatorios.",
    "El agricultor teme perder el control de los datos de maquinaria y plataformas; el código de conducta de la UE se basa en contratos y consentimiento, y el Data Act da ya al usuario acceso a los datos de sus máquinas conectadas.",
    "La falta de incentivos y de casos de uso llevó a liquidar Agdatahub a finales de 2024.",
    "La interoperabilidad entre plataformas y países sigue siendo un obstáculo."
   ]
  },
  "why": {
   "en": [
    "The EU is preparing a common European agricultural data space (CEADS), and Red.es funded agrifood data space demonstrators in Spain.",
    "Cross-border spaces and Gaia-X cases already exist; with the SIEX logbook, the same data could serve the CAP, food traceability and carbon footprint under revocable consent."
   ],
   "es": [
    "La UE prepara un espacio común europeo de datos agrarios (CEADS), y Red.es financió demostradores de espacios de datos agroalimentarios en España.",
    "Ya hay espacios transfronterizos y casos Gaia-X; con el cuaderno SIEX, el mismo dato serviría para la PAC, la trazabilidad y la huella de carbono con consentimiento revocable."
   ]
  },
  "example": {
   "en": "Agdatahub, coordinator of AgriDataSpace, was liquidated in late 2024 for lack of use cases and incentives (F-0833).",
   "es": "Agdatahub, coordinador de AgriDataSpace, se liquidó a finales de 2024 por falta de casos de uso e incentivos (F-0833)."
  },
  "sources": [
   "F-0728",
   "F-0830",
   "F-0831",
   "F-0832",
   "F-0833",
   "F-0834",
   "F-0835",
   "F-0836",
   "F-0837",
   "F-0838"
  ]
 },
 {
  "id": "SEC33",
  "group": "energy",
  "name": {
   "en": "Fisheries and aquaculture",
   "es": "Pesca y acuicultura"
  },
  "tagline": {
   "en": "Digital catch-to-shelf traceability for a market that imports most of its fish.",
   "es": "Trazabilidad digital de la captura al lineal en un mercado que importa la mayor parte de su pescado."
  },
  "regs": [
   "Control Reg.",
   "IUU Reg.",
   "CATCH"
  ],
  "challenges": {
   "en": [
    "The revised Control Regulation applies largely from 10 January 2026, with mandatory digital traceability for fresh and frozen products.",
    "Small vessels must track location and log catches electronically from 2028, and high-risk vessels over 18 m need cameras.",
    "Import catch certificates go through the digital CATCH system since 10 January 2026; 70% of fish consumed in the EU is imported.",
    "Vessel location data are held by authorities and barely shared; NGOs ask the EU to publish them, as Norway does."
   ],
   "es": [
    "El Reglamento de control revisado se aplica en su mayor parte desde el 10/1/2026, con trazabilidad digital obligatoria de productos frescos y congelados.",
    "La flota pequeña deberá registrar localización y capturas de forma electrónica desde 2028, y los buques de más de 18 m de alto riesgo, llevar cámaras.",
    "Desde el 10/1/2026 los certificados de captura de importación pasan por CATCH; el 70 % del pescado consumido en la UE es importado.",
    "Los datos de localización de buques los tienen las autoridades y apenas se comparten; las ONG piden publicarlos, como hace Noruega."
   ]
  },
  "why": {
   "en": [
    "Mandatory traceability from catch to shelf links vessels, auctions, processors, importers and authorities — a classic data space case.",
    "The EU market totals €62.8bn of consumer spending and €29.9bn of imports, with 38.1% self-sufficiency; reliable origin data beat illegal fishing."
   ],
   "es": [
    "La trazabilidad obligatoria de la captura al lineal une buques, lonjas, transformadores, importadores y autoridades: un caso típico de espacio de datos.",
    "El mercado de la UE mueve 62.800 M€ de gasto y 29.900 M€ de importaciones, con un autoabastecimiento del 38,1 %; los datos fiables de origen son la defensa frente a la pesca ilegal."
   ]
  },
  "example": {
   "en": "70% of fish consumed in the EU is imported, and 80% of those imports fall under the IUU Regulation (F-0841).",
   "es": "El 70 % del pescado consumido en la UE es importado, y el 80 % de esas importaciones está sujeto al Reglamento INDNR (F-0841)."
  },
  "sources": [
   "F-0839",
   "F-0840",
   "F-0841",
   "F-0843",
   "F-0845"
  ]
 },
 {
  "id": "SEC34",
  "group": "energy",
  "name": {
   "en": "Forestry, wood and paper",
   "es": "Forestal, madera y papel"
  },
  "tagline": {
   "en": "Proving deforestation-free origin without a common EU forest data law.",
   "es": "Demostrar un origen libre de deforestación sin una ley europea común de datos forestales."
  },
  "regs": [
   "EUDR",
   "LULUCF"
  ],
  "challenges": {
   "en": [
    "The EUDR requires geolocation proof that wood and paper are deforestation-free; application was postponed to 30 December 2026 for large and medium firms.",
    "The proposed Forest Monitoring Law, meant to create comparable forest data across the EU, was rejected by Parliament in October 2025.",
    "Without comparable data, forest health cannot be assessed: the EU forest carbon sink lost 30% of its capacity in a decade.",
    "Forest owners cite administrative burden and fear exposing data on their land, so owner-controlled sharing is key."
   ],
   "es": [
    "El EUDR exige demostrar con geolocalización que la madera y el papel no proceden de deforestación; su aplicación se retrasó al 30/12/2026 para grandes y medianas empresas.",
    "La propuesta de Ley de seguimiento forestal, que buscaba datos comparables en toda la UE, fue rechazada por el Parlamento en octubre de 2025.",
    "Sin datos comparables no se puede evaluar la salud de los bosques: el sumidero forestal de la UE ha perdido un 30 % de capacidad en una década.",
    "Los propietarios alegan carga administrativa y temen exponer datos de sus montes, así que compartir con control del titular es clave."
   ]
  },
  "why": {
   "en": [
    "Forest & Timber 4.0, a Gaia-X-based data room, traces carbon from tree to sawmill and recognises logs with AI for the EUDR; SINTETIC, coordinated by Catalonia's CTFC, traces trees, logs and boards.",
    "With no common forest data law, a voluntary data space between inventories, owners, industry and authorities is the practical route to EUDR and climate reporting."
   ],
   "es": [
    "Forest & Timber 4.0, un data room con principios Gaia-X, traza la huella del árbol al aserradero y reconoce troncos con IA para el EUDR; SINTETIC, coordinado por el CTFC, traza árboles, trozas y tablas.",
    "Sin una ley común de datos forestales, un espacio de datos voluntario entre inventarios, propietarios, industria y autoridades es la vía práctica para el EUDR y el reporte climático."
   ]
  },
  "example": {
   "en": "SINTETIC (Horizon Europe, €7.55m EU funding), coordinated by CTFC in Spain, builds ICT traceability for trees, logs and boards (F-0853).",
   "es": "SINTETIC (Horizonte Europa, 7,55 M€ de la UE), coordinado por el CTFC, desarrolla trazabilidad TIC de árboles, trozas y tablas (F-0853)."
  },
  "sources": [
   "F-0296",
   "F-0847",
   "F-0848",
   "F-0852",
   "F-0853"
  ]
 },
 {
  "id": "SEC35",
  "group": "mobility",
  "name": {
   "en": "Road transport and logistics",
   "es": "Transporte por carretera y logística"
  },
  "tagline": {
   "en": "Going paperless with authorities without sharing what competitors must never see.",
   "es": "Pasar al papel cero con las autoridades sin compartir lo que la competencia nunca debe ver."
  },
  "regs": [
   "eFTI",
   "Mobility Act (ES)",
   "Competition law"
  ],
  "challenges": {
   "en": [
    "Under eFTI, authorities must accept electronic freight information from 9 July 2027, via certified platforms.",
    "Authority access requires authentication for every query, national eFTI Gates holding only metadata, and access logs kept for at least two years.",
    "Fewer than 1% of EU freight operations are fully paperless.",
    "Sharing sensitive commercial data between competitors is heavily fined: the trucks cartel exchanged information electronically and received record fines.",
    "Spain's Sustainable Mobility Act creates the Integrated Mobility Data Space (EDIM); failing to send data, or sending it late, can be fined."
   ],
   "es": [
    "Con eFTI, las autoridades deben aceptar la información de transporte en formato electrónico desde el 9/7/2027, a través de plataformas certificadas.",
    "El acceso de las autoridades exige autenticación en cada consulta, pasarelas nacionales que solo guardan metadatos y registros de acceso de al menos dos años.",
    "Menos del 1 % de las operaciones de transporte de mercancías en la UE son totalmente sin papel.",
    "Compartir información comercial sensible entre competidores se castiga con dureza: el cártel de camiones la intercambiaba por vía electrónica y recibió multas récord.",
    "La Ley 9/2025 de Movilidad Sostenible crea el Espacio de Datos Integrado de Movilidad (EDIM); no enviar datos o enviarlos tarde puede sancionarse."
   ]
  },
  "why": {
   "en": [
    "The eFTI model — certified platforms, gateways and rights-based access — is in effect a federated data space with trust rules.",
    "Enforceable ODRL usage policies let firms share operational data without crossing competition law.",
    "eFTI could save the sector up to €1bn a year, and the EDIM makes connecting to a sector data space a legal duty in Spain."
   ],
   "es": [
    "El modelo eFTI (plataformas certificadas, pasarelas y acceso por derechos) es en la práctica un espacio de datos federado con reglas de confianza.",
    "Las políticas de uso ODRL aplicables permiten compartir datos operativos sin vulnerar el derecho de la competencia.",
    "eFTI podría ahorrar al sector hasta 1.000 M€ al año, y el EDIM convierte en obligación legal conectarse a un espacio de datos sectorial en España."
   ]
  },
  "example": {
   "en": "The Commission fined truck makers €2.93bn in 2016 for a cartel that exchanged sensitive information electronically from 2004 (F-0862).",
   "es": "La Comisión multó a los fabricantes de camiones con 2.930 M€ en 2016 por un cártel que intercambiaba información sensible por vía electrónica desde 2004 (F-0862)."
  },
  "sources": [
   "F-0857",
   "F-0858",
   "F-0859",
   "F-0860",
   "F-0861",
   "F-0862",
   "F-0863",
   "F-0873",
   "F-0874"
  ]
 },
 {
  "id": "SEC36",
  "group": "mobility",
  "name": {
   "en": "Ports and maritime transport",
   "es": "Puertos y transporte marítimo"
  },
  "tagline": {
   "en": "Reporting a ship call once and reusing the data across port, carrier and authorities.",
   "es": "Notificar una escala una sola vez y reutilizar el dato entre puerto, naviera y autoridades."
  },
  "regs": [
   "EMSWe",
   "IMO FAL",
   "FuelEU"
  ],
  "challenges": {
   "en": [
    "EMSWe has applied since 15 August 2025: one harmonised dataset per port call, submitted once through national single windows.",
    "IMO FAL amendments made maritime single windows mandatory worldwide from 1 January 2024.",
    "FuelEU Maritime has applied in full since 1 January 2025: carriers must share verified energy and emissions data for each ship.",
    "Cyber risk and dependency are real: NotPetya cost Maersk about $300m and halted terminals.",
    "The EU mobility data space aims to make port-call datasets reported the same way and reusable in every Member State."
   ],
   "es": [
    "La EMSWe se aplica desde el 15/8/2025: un único conjunto de datos armonizado por escala, enviado una sola vez por las ventanillas nacionales.",
    "Las enmiendas al Convenio FAL de la OMI hacen obligatoria la ventanilla única marítima en todo el mundo desde el 1/1/2024.",
    "FuelEU Maritime se aplica plenamente desde el 1/1/2025: las navieras deben compartir datos verificados de energía y emisiones de cada buque.",
    "El riesgo cibernético y de dependencia es real: NotPetya costó a Maersk unos 300 M$ y paralizó terminales.",
    "El espacio europeo de datos de movilidad busca que los datos de escala se notifiquen igual y se reutilicen en todos los Estados."
   ]
  },
  "why": {
   "en": [
    "Reusing call data between port, carrier, agent and authority needs common access and trust rules — the job of a data space.",
    "DataPorts (Valencia and Thessaloniki) demonstrated secure data exchange between ports; its AI tools for predicting calls are still in use in Valencia.",
    "EMSWe saves operators 2.2–2.5 million hours and €62–72m a year; Spain's state ports plan €7bn of investment to 2029, a chance to add federated connectors rather than silos."
   ],
   "es": [
    "Reutilizar los datos de escala entre puerto, naviera, consignatario y autoridad exige reglas comunes de acceso y confianza: la función de un espacio de datos.",
    "DataPorts (Valencia y Salónica) demostró el intercambio seguro de datos entre puertos; sus herramientas de IA para predecir escalas siguen en uso en Valencia.",
    "La EMSWe ahorra a los operadores 2,2–2,5 millones de horas y 62–72 M€ al año; Puertos del Estado prevé 7.000 M€ de inversión hasta 2029, una ocasión para conectores federados en lugar de silos."
   ]
  },
  "example": {
   "en": "The NotPetya attack of June 2017 cost Maersk an estimated $300m (F-0880).",
   "es": "El ataque NotPetya de junio de 2017 costó a Maersk unos 300 M$ (F-0880)."
  },
  "sources": [
   "F-0864",
   "F-0875",
   "F-0876",
   "F-0878",
   "F-0879",
   "F-0880",
   "F-0881",
   "F-0882"
  ]
 },
 {
  "id": "SEC37",
  "group": "mobility",
  "name": {
   "en": "Rail",
   "es": "Ferrocarril"
  },
  "tagline": {
   "en": "Opening real-time and capacity data to third parties while protecting commercial information.",
   "es": "Abrir datos en tiempo real y de capacidad a terceros sin exponer información comercial."
  },
  "regs": [
   "Rail PRR",
   "Rail Capacity Reg.",
   "TSI Telematics",
   "Competition law"
  ],
  "challenges": {
   "en": [
    "Since 7 June 2023, infrastructure managers and operators must give ticket vendors and tour operators real-time traffic information.",
    "Rail data models are heterogeneous: according to ERA, 70% of ERTMS engineering hours go into transforming data.",
    "The new capacity regulation requires up-to-date capacity and disruption data for all applicants, while confidential information must be protected.",
    "In the new telematics TSI talks, the sector had the duty to publish sensitive freight and military logistics data withdrawn.",
    "Brussels investigated Renfe for refusing real-time data to ticketing platforms; Renfe committed to give access indefinitely, under a monitoring trustee."
   ],
   "es": [
    "Desde el 7/6/2023, administradores de infraestructura y operadores deben dar información de tráfico en tiempo real a vendedores de billetes y operadores turísticos.",
    "Los modelos de datos ferroviarios son heterogéneos: según ERA, el 70 % de las horas de ingeniería ERTMS se dedica a transformar datos.",
    "El nuevo reglamento de capacidad exige compartir información actualizada de capacidad e incidencias, protegiendo a la vez la información confidencial.",
    "En la negociación de la nueva ETI de telemática, el sector logró retirar la obligación de publicar datos sensibles de mercancías y logística militar.",
    "Bruselas investigó a Renfe por negar datos en tiempo real a las plataformas de venta; Renfe se comprometió a dar acceso por tiempo indefinido y con supervisor."
   ]
  },
  "why": {
   "en": [
    "ERA's Knowledge Graph (over 36 million triples, 27 countries) shows the value of shared semantics, the basis of data space interoperability.",
    "ODRL usage policies and connector access control open operational data without exposing commercial information.",
    "The Renfe case shows that refusing data access can be abuse of dominance; fair, non-discriminatory and traceable access terms reduce that risk."
   ],
   "es": [
    "El Knowledge Graph de ERA (más de 36 millones de triples, 27 países) muestra el valor de una semántica común, base de la interoperabilidad.",
    "Las políticas ODRL y el control de acceso por conector abren los datos operativos sin exponer información comercial.",
    "El caso Renfe muestra que negar el acceso puede ser abuso de posición dominante; unas condiciones justas, no discriminatorias y trazables reducen ese riesgo."
   ]
  },
  "example": {
   "en": "ERA estimates that 70% of ERTMS engineering hours are spent transforming data (F-0865).",
   "es": "ERA estima que el 70 % de las horas de ingeniería del despliegue ERTMS se dedica a transformar datos (F-0865)."
  },
  "sources": [
   "F-0865",
   "F-0883",
   "F-0884",
   "F-0885",
   "F-0886",
   "F-0888",
   "F-0889",
   "F-0890"
  ]
 },
 {
  "id": "SEC38",
  "group": "mobility",
  "name": {
   "en": "Aviation and airports",
   "es": "Aviación y aeropuertos"
  },
  "tagline": {
   "en": "Reporting passenger, fuel and safety data to many authorities under different safeguards.",
   "es": "Reportar datos de pasajeros, combustible y seguridad a muchas autoridades con garantías distintas."
  },
  "regs": [
   "ReFuelEU",
   "API/PNR",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "ReFuelEU Aviation requires annual reports from fuel suppliers (by 14 February) and airlines (by 31 March), and refuelling of at least 90% in EU airports.",
    "Passenger API and PNR data must flow through a central eu-LISA router; repeated failure to send API data can cost up to 2% of global turnover.",
    "Passenger data are a high-value target: the ICO fined British Airways £20m over a breach affecting about 430,000 people.",
    "Safety data are sensitive; Data4Safety had to build its own trust framework to bring together 59 members."
   ],
   "es": [
    "ReFuelEU Aviation obliga a reportar cada año a proveedores (antes del 14 de febrero) y aerolíneas (antes del 31 de marzo), y a repostar al menos el 90 % en aeropuertos de la UE.",
    "Los datos API y PNR deben pasar por un router central de eu-LISA; no transferir los datos API de forma reiterada puede costar hasta el 2 % de la facturación mundial.",
    "Los datos de pasajeros son un objetivo valioso: la ICO multó a British Airways con 20 M£ por una brecha que afectó a unas 430.000 personas.",
    "Los datos de seguridad son sensibles; Data4Safety tuvo que crear un marco de confianza propio para reunir a 59 miembros."
   ]
  },
  "why": {
   "en": [
    "Data4Safety already works as a sector data space, with the first 8 airports joining in 2024 and an operational phase planned for 2026.",
    "Aena's Spanish network handled 321.6 million passengers in 2025, generating data reported to security, border and climate authorities.",
    "The EU mobility data space includes airports and operators reporting their emissions footprint as a use case."
   ],
   "es": [
    "Data4Safety ya funciona como espacio de datos sectorial: los primeros 8 aeropuertos se sumaron en 2024 y la fase operativa está prevista para 2026.",
    "La red española de Aena movió 321,6 millones de pasajeros en 2025, con datos que se reportan a autoridades de seguridad, fronteras y clima.",
    "El espacio europeo de datos de movilidad incluye entre sus casos de uso que aeropuertos y operadores comuniquen su huella de emisiones."
   ]
  },
  "example": {
   "en": "The ICO fined British Airways £20m in 2020, down from a proposed £183.39m, for a breach affecting 429,612 people (F-0891).",
   "es": "La ICO multó a British Airways con 20 M£ en 2020, frente a los 183,39 M£ propuestos, por una brecha que afectó a 429.612 personas (F-0891)."
  },
  "sources": [
   "F-0864",
   "F-0891",
   "F-0893",
   "F-0894",
   "F-0895",
   "F-0897",
   "F-0898"
  ]
 },
 {
  "id": "SEC39",
  "group": "mobility",
  "name": {
   "en": "Urban mobility and smart cities",
   "es": "Movilidad urbana y ciudades inteligentes"
  },
  "tagline": {
   "en": "Linking fragmented mobility ecosystems without building one central database.",
   "es": "Conectar ecosistemas de movilidad fragmentados sin construir una base de datos central."
  },
  "regs": [
   "ITS Dir.",
   "Data Act",
   "DGA"
  ],
  "challenges": {
   "en": [
    "The ITS framework organises access to essential transport data through National Access Points.",
    "The Data Act opens up services based on vehicle data, and the DGA regulates data intermediaries.",
    "Players hesitate to share over security, competition and trust concerns, and data are fragmented across modes and countries.",
    "EMDS governance and architecture are still open: the preparatory study proposed five possible approaches."
   ],
   "es": [
    "El marco ITS organiza el acceso a los datos de transporte esenciales a través de los Puntos de Acceso Nacionales.",
    "El Data Act abre el mercado de servicios con datos del vehículo, y la DGA regula a los intermediarios de datos.",
    "Los actores se resisten a compartir por seguridad, competencia y falta de confianza, y los datos están fragmentados entre modos y países.",
    "La gobernanza y la arquitectura del EMDS siguen abiertas: el estudio preparatorio propuso cinco enfoques posibles."
   ]
  },
  "why": {
   "en": [
    "The EMDS is not one database but an interconnection layer between ecosystems; deployEMDS has €8m to build it.",
    "Working models exist: Mobility Data Space (Gaia-X), Mobilithek on IDSA standards, iSHARE and MyData.",
    "In Mobility Data Space, data stay with the provider until a contract is signed — the core data space principle."
   ],
   "es": [
    "El EMDS no es una base de datos única, sino una capa de interconexión entre ecosistemas; deployEMDS cuenta con 8 M€ para desplegarlo.",
    "Ya hay modelos operativos: Mobility Data Space (Gaia-X), Mobilithek sobre estándares IDSA, iSHARE y MyData.",
    "En Mobility Data Space el dato se queda en el proveedor hasta que se firma el contrato: el principio básico de un espacio de datos."
   ]
  },
  "example": {
   "en": "PrepDSpace4Mobility reviewed 426 initiatives and mapped 272 mobility data ecosystems (F-0868).",
   "es": "PrepDSpace4Mobility revisó 426 iniciativas e inventarió 272 ecosistemas de datos de movilidad (F-0868)."
  },
  "sources": [
   "F-0864",
   "F-0865",
   "F-0866",
   "F-0867",
   "F-0868",
   "F-0869",
   "F-0870",
   "F-0871",
   "F-0872"
  ]
 },
 {
  "id": "SEC40",
  "group": "mobility",
  "name": {
   "en": "Retail and e-commerce",
   "es": "Comercio minorista y comercio electrónico"
  },
  "tagline": {
   "en": "Receiving and showing product data from the whole chain while protecting customer data.",
   "es": "Recibir y mostrar datos de producto de toda la cadena protegiendo los datos de los clientes."
  },
  "regs": [
   "ESPR",
   "DSA",
   "DMA",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "Since 19 July 2026 large firms may not destroy unsold clothes and shoes, and must publish what they discard.",
    "Digital product passports are coming: the EU registry is tested until early 2027 and the first product requirements start in 2027–2028.",
    "Marketplaces answer for third-party products: the Commission preliminarily found Temu in breach of the DSA.",
    "Combining personal data has limits: under the DMA, Meta was fined €200m for not offering a less data-intensive option.",
    "Hamburg's data protection authority fined H&M €35.3m for employee data violations at its service centre."
   ],
   "es": [
    "Desde el 19/7/2026 las grandes empresas no pueden destruir ropa y calzado sin vender, y deben publicar lo que desechan.",
    "Llega el pasaporte digital de producto: el registro de la UE se prueba hasta principios de 2027 y las primeras obligaciones empiezan en 2027–2028.",
    "Los marketplaces responden por los productos de terceros: la Comisión concluyó de forma preliminar que Temu incumple la DSA.",
    "Combinar datos personales tiene límites: con la DMA, Meta recibió 200 M€ de multa por no ofrecer una opción con menos datos personales.",
    "La autoridad de Hamburgo multó a H&M con 35,3 M€ por infracciones con datos de empleados en su centro de servicio."
   ]
  },
  "why": {
   "en": [
    "The digital product passport is in effect a product data space, shared with consumers, repairers and recyclers through role-based access; CIRPASS-2 pilots it in 13 cases.",
    "77.8% of EU internet users bought online in 2025; in Spain e-commerce reached €29.3bn in Q3 2025, 53.4% of it spent abroad.",
    "Meeting the DSA, ESPR and GDPR together means exchanging verifiable product and seller data without handing over customer data — what connectors with usage policies allow."
   ],
   "es": [
    "El pasaporte digital es en la práctica un espacio de datos de producto, compartido con consumidores, reparadores y recicladores por perfiles; CIRPASS-2 lo pilota en 13 casos.",
    "El 77,8 % de los internautas de la UE compró en línea en 2025; en España el comercio electrónico facturó 29.296 M€ en el 3T 2025, el 53,4 % en compras al extranjero.",
    "Cumplir a la vez DSA, ESPR y RGPD exige intercambiar datos verificables de producto y vendedor sin ceder datos de clientes: lo que permiten los conectores con políticas de uso."
   ]
  },
  "example": {
   "en": "Spanish e-commerce turnover reached €29,296m in Q3 2025, up 19.3%, with 53.4% spent abroad (F-0900).",
   "es": "El comercio electrónico en España facturó 29.296 M€ en el 3T 2025 (+19,3 %), con un 53,4 % de compras al extranjero (F-0900)."
  },
  "sources": [
   "F-0899",
   "F-0900",
   "F-0901",
   "F-0902",
   "F-0903",
   "F-0904",
   "F-0905",
   "F-0906"
  ]
 },
 {
  "id": "SEC41",
  "group": "public",
  "name": {
   "en": "Public administration",
   "es": "Administración pública"
  },
  "tagline": {
   "en": "Asking citizens and firms only once by sharing evidence between administrations.",
   "es": "Pedir los datos una sola vez a ciudadanos y empresas compartiendo pruebas entre administraciones."
  },
  "regs": [
   "IEA",
   "Data Act",
   "Open Data Dir.",
   "SDG Reg.",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "Under the Interoperable Europe Act, public bodies must assess interoperability before building or changing systems that exchange data across borders.",
    "High-value datasets must be published free of charge and via API since 9 June 2024, but adoption varies by Member State.",
    "The Data Act lets public bodies request business data in exceptional need, respecting trade secrets, with 5- or 30-working-day response windows.",
    "Connecting to the Once-Only Technical System (OOTS) is mandatory for authorities in its scope.",
    "In Spain, public bodies cannot be fined, but the AEPD declares infringements and orders binding corrective measures."
   ],
   "es": [
    "Con la Interoperable Europe Act, los organismos públicos deben evaluar la interoperabilidad antes de crear o cambiar sistemas que intercambien datos entre países.",
    "Los conjuntos de datos de alto valor deben publicarse gratis y por API desde el 9/6/2024, pero cada Estado va a un ritmo distinto.",
    "El Data Act permite pedir datos a las empresas en caso de necesidad excepcional, respetando el secreto comercial, con plazos de respuesta de 5 o 30 días hábiles.",
    "Conectarse al sistema técnico de «solo una vez» (OOTS) es obligatorio para las autoridades de su ámbito.",
    "En España no se puede multar a las administraciones, pero la AEPD declara la infracción y ordena medidas correctoras obligatorias."
   ]
  },
  "why": {
   "en": [
    "OOTS already works as a government-to-government data space: evidence is requested once from the authentic source through eDelivery.",
    "Data Act business-to-government requests need traceable, proportionate exchanges with usage and deletion policies — what connectors and ODRL provide.",
    "71.9% of people in the EU used e-government in 2025, but the range from 98% to 24% shows the need for common interoperability."
   ],
   "es": [
    "OOTS ya funciona como espacio de datos entre administraciones: la prueba se pide una sola vez a la fuente auténtica por eDelivery.",
    "Las peticiones B2G del Data Act requieren intercambios trazables y proporcionados, con políticas de uso y borrado: lo que aportan los conectores y ODRL.",
    "El 71,9 % de la población de la UE usó la administración electrónica en 2025, pero la horquilla del 98 % al 24 % muestra que falta interoperabilidad común."
   ]
  },
  "example": {
   "en": "OOTS common services have run since December 2023 and cover 25 key procedures across the EU (F-0916).",
   "es": "Los servicios comunes de OOTS funcionan desde diciembre de 2023 y abarcan 25 procedimientos clave en la UE (F-0916)."
  },
  "sources": [
   "F-0911",
   "F-0912",
   "F-0913",
   "F-0914",
   "F-0915",
   "F-0916",
   "F-0917",
   "F-0918",
   "F-0919"
  ]
 },
 {
  "id": "SEC42",
  "group": "public",
  "name": {
   "en": "Education",
   "es": "Educación"
  },
  "tagline": {
   "en": "Using cloud and AI tools with pupils' data without losing control of transfers or purpose.",
   "es": "Usar herramientas cloud e IA con datos de alumnos sin perder el control de las transferencias ni de la finalidad."
  },
  "regs": [
   "GDPR",
   "AI Act",
   "eIDAS"
  ],
  "challenges": {
   "en": [
    "Denmark's data protection authority halted Chromebooks and Google Workspace in Helsingør schools over the risk of pupil data transfers.",
    "The AEPD fined a private school €20,000 for using Google Workspace for Education without a legal basis or impact assessment.",
    "A Madrid school was fined €10,000 for creating an email account for a pupil without parental consent.",
    "The AI Act has banned emotion inference in schools since 2 February 2025; high-risk duties for admissions and assessment AI apply from 2 December 2027.",
    "Diplomas must be verifiable across borders; European Digital Credentials use eIDAS seals that break if anyone alters the content."
   ],
   "es": [
    "La autoridad danesa frenó el uso de Chromebooks y Google Workspace en los colegios de Helsingør por el riesgo de transferir datos de alumnos.",
    "La AEPD multó con 20.000 € a un colegio privado por usar Google Workspace for Education sin base jurídica ni evaluación de impacto.",
    "Un colegio de Madrid recibió 10.000 € de multa por crear un correo a una alumna sin consentimiento de los padres.",
    "El AI Act prohíbe inferir emociones en los centros desde el 2/2/2025; los requisitos de alto riesgo para la IA de admisión y evaluación se aplican desde el 2/12/2027.",
    "Los títulos deben poder verificarse entre países; las credenciales digitales europeas usan sellos eIDAS que se rompen si alguien altera el contenido."
   ]
  },
  "why": {
   "en": [
    "The EU is funding a skills data space: the DS4Skills preparatory action and a €3m deployment call.",
    "Digital credentials are the trust layer: learners control them and share them with employers or institutions.",
    "Lawful cloud use requires controlling who accesses what and for which purpose, with enforceable, traceable policies."
   ],
   "es": [
    "La UE financia un espacio de datos de capacidades: la acción preparatoria DS4Skills y una convocatoria de despliegue de 3 M€.",
    "Las credenciales digitales son la capa de confianza: el alumno las controla y las comparte con empleadores o centros.",
    "Usar la nube sin vulnerar el RGPD exige controlar quién accede a qué y con qué fin, con políticas aplicables y trazables."
   ]
  },
  "example": {
   "en": "The AEPD fined a private school €20,000 for deploying Google Workspace for Education without a legal basis or impact assessment (F-0921).",
   "es": "La AEPD sancionó con 20.000 € a un colegio privado por implantar Google Workspace for Education sin base jurídica ni evaluación de impacto (F-0921)."
  },
  "sources": [
   "F-0920",
   "F-0921",
   "F-0922",
   "F-0923",
   "F-0924",
   "F-0925",
   "F-0926"
  ]
 },
 {
  "id": "SEC43",
  "group": "public",
  "name": {
   "en": "Research and universities",
   "es": "Investigación y universidades"
  },
  "tagline": {
   "en": "Sharing research data ‘as open as possible, as closed as necessary’.",
   "es": "Compartir datos de investigación «tan abiertos como sea posible y tan cerrados como sea necesario»."
  },
  "regs": [
   "GDPR",
   "EHDS",
   "Horizon Europe"
  ],
  "challenges": {
   "en": [
    "The EDPB's draft Guidelines 1/2026 on scientific research set six indicators, accept broad consent with safeguards and require pseudonymisation or anonymisation.",
    "Open science is a legal obligation in Horizon Europe: data must be FAIR and open as far as possible, which clashes with personal data and partners' IP.",
    "Biometrics in online exams is risky: a Valencia university paid €160,000 after a proposed €200,000 fine.",
    "Universities are frequent targets: ransomware hit the Pontifical University of Salamanca in 2024, and TU Eindhoven had to disconnect its network in 2025."
   ],
   "es": [
    "El borrador de Directrices 1/2026 del EDPB sobre investigación propone seis indicios, acepta el consentimiento amplio con salvaguardas y exige seudonimizar o anonimizar.",
    "En Horizonte Europa la ciencia abierta es obligación legal: los datos deben ser FAIR y abiertos en lo posible, lo que choca con los datos personales y la propiedad industrial.",
    "La biometría en exámenes online es arriesgada: una universidad de Valencia pagó 160.000 € de una multa propuesta de 200.000 €.",
    "Las universidades son blanco frecuente: ransomware en la Universidad Pontificia de Salamanca en 2024, y la TU Eindhoven tuvo que desconectar su red en 2025."
   ]
  },
  "why": {
   "en": [
    "EOSC is the common European research data space; its EU Node (€30m) has been live since October 2024.",
    "The federation is growing: 14 new candidate nodes in 2026, 36 cross-node use cases and over 270 repositories.",
    "Connectors and usage policies let researchers apply Article 89 GDPR safeguards without moving sensitive data."
   ],
   "es": [
    "La EOSC es el espacio común europeo de datos de investigación; su EU Node (30 M€) funciona desde octubre de 2024.",
    "La federación crece: 14 nuevos nodos candidatos en 2026, 36 casos de uso entre nodos y más de 270 repositorios.",
    "Los conectores y las políticas de uso permiten aplicar las salvaguardas del art. 89 RGPD sin mover los datos sensibles."
   ]
  },
  "example": {
   "en": "Horizon Europe has invested €257m in EOSC since 2021, including €30m for the EU Node launched in October 2024 (F-0927).",
   "es": "Horizonte Europa ha invertido 257 M€ en la EOSC desde 2021, 30 M€ de ellos en el EU Node lanzado en octubre de 2024 (F-0927)."
  },
  "sources": [
   "F-0927",
   "F-0928",
   "F-0929",
   "F-0930",
   "F-0931",
   "F-0932",
   "F-0933",
   "F-0934"
  ]
 },
 {
  "id": "SEC44",
  "group": "public",
  "name": {
   "en": "Tourism",
   "es": "Turismo"
  },
  "tagline": {
   "en": "Reporting guest and rental data once to serve control, statistics and destination management.",
   "es": "Reportar una sola vez los datos de huéspedes y alquileres para control, estadística y gestión del destino."
  },
  "regs": [
   "STR Reg.",
   "GDPR",
   "RD 933/2021"
  ],
  "challenges": {
   "en": [
    "Since 20 May 2026, short-term rental platforms must verify registration numbers and send activity data monthly through a single digital entry point.",
    "Spain's RD 933/2021 makes hotels and rentals report far more traveller data to the Interior Ministry and keep it three years; serious breaches cost up to €30,000.",
    "This clashes with GDPR minimisation: the AEPD fined €75,000 for requiring an ID photo and a selfie.",
    "Large guest databases are a risk: the ICO fined Marriott £18.4m over a breach affecting up to 339 million guests."
   ],
   "es": [
    "Desde el 20/5/2026, las plataformas de alquiler de corta duración deben verificar el registro y enviar cada mes los datos de actividad por un punto único digital.",
    "El RD 933/2021 obliga a hoteles y alquileres a comunicar a Interior muchos más datos del viajero y a conservarlos 3 años; las faltas graves llegan a 30.000 €.",
    "Esto choca con la minimización del RGPD: la AEPD multó con 75.000 € pedir foto del DNI y un selfie.",
    "Las grandes bases de huéspedes son un riesgo: la ICO multó a Marriott con 18,4 M£ por una brecha que afectó hasta a 339 millones de clientes."
   ]
  },
  "why": {
   "en": [
    "The Commission backs a common European tourism data space because 99.9% of tourism firms are SMEs that cannot integrate data alone.",
    "DEPLOYTOUR (43 partners in 13 countries, coordinated from Spain) is deploying it.",
    "The same stay data serve control, statistics (951.6 million short-term rental nights in 2025) and destination management; sharing once with usage policies avoids duplicate submissions."
   ],
   "es": [
    "La Comisión impulsa un espacio común europeo de datos de turismo porque el 99,9 % de las empresas son pymes sin capacidad para integrar datos por su cuenta.",
    "DEPLOYTOUR (43 socios de 13 países, coordinado desde España) lo está desplegando.",
    "Los mismos datos de estancias sirven para control, estadística (951,6 millones de noches en 2025) y gestión del destino; compartirlos una vez con políticas de uso evita envíos duplicados."
   ]
  },
  "example": {
   "en": "Short-term rentals accounted for 951.6 million nights in the EU in 2025, about a quarter of tourist stays (F-0936).",
   "es": "Los alquileres de corta duración sumaron 951,6 millones de noches en la UE en 2025, en torno a una cuarta parte de las estancias (F-0936)."
  },
  "sources": [
   "F-0935",
   "F-0936",
   "F-0937",
   "F-0938",
   "F-0940",
   "F-0941"
  ]
 },
 {
  "id": "SEC45",
  "group": "public",
  "name": {
   "en": "Media and audiovisual",
   "es": "Medios y audiovisual"
  },
  "tagline": {
   "en": "Licensing content and audience data to AI and partners under machine-readable rules.",
   "es": "Licenciar contenidos y datos de audiencia a la IA y a socios con reglas legibles por máquina."
  },
  "regs": [
   "EMFA",
   "AI Act",
   "GDPR",
   "Copyright"
  ],
  "challenges": {
   "en": [
    "The European Media Freedom Act has applied in full since 8 August 2025, with a new European Board for Media Services.",
    "Since 2 August 2025, general-purpose AI providers must respect text-and-data-mining opt-outs and publish training data summaries; fines of up to 3% or €15m apply from August 2026.",
    "Rights holders want domains, URLs and collection dates without revealing ‘the recipe’ — transparency versus trade secrets.",
    "International transfers of user data are punished: Ireland's DPC fined TikTok €530m."
   ],
   "es": [
    "La Ley Europea de Libertad de los Medios se aplica por completo desde el 8/8/2025, con un nuevo Comité Europeo de Servicios de Medios.",
    "Desde el 2/8/2025 los proveedores de IA de uso general deben respetar las exclusiones de minería de datos y publicar un resumen del entrenamiento; las multas de hasta el 3 % o 15 M€ rigen desde agosto de 2026.",
    "Los titulares piden dominios, URL y fechas de recogida sin revelar «la receta»: transparencia frente a secreto comercial.",
    "Las transferencias internacionales de datos de usuarios se castigan: la DPC irlandesa multó a TikTok con 530 M€."
   ]
  },
  "why": {
   "en": [
    "TEMS, the Trusted European Media Data Space, brings together 43 organisations from 14 countries with €16.5m from Digital Europe.",
    "Its use cases (disinformation, audiences, production, AI) need sharing between competing media under enforceable licences.",
    "ODRL policies can express data-mining opt-outs and licences that machines read and enforce."
   ],
   "es": [
    "TEMS, el espacio de datos de medios de confianza, reúne a 43 organizaciones de 14 países con 16,5 M€ del Programa Europa Digital.",
    "Sus casos de uso (desinformación, audiencias, producción, IA) exigen compartir entre medios competidores con licencias aplicables.",
    "Las políticas ODRL pueden expresar exclusiones de minería y licencias que las máquinas leen y hacen cumplir."
   ]
  },
  "example": {
   "en": "Ireland's DPC fined TikTok €530m in May 2025 for data transfers to China and lack of transparency (F-0948).",
   "es": "La DPC irlandesa multó a TikTok con 530 M€ en mayo de 2025 por transferir datos a China y por falta de transparencia (F-0948)."
  },
  "sources": [
   "F-0943",
   "F-0944",
   "F-0945",
   "F-0946",
   "F-0947",
   "F-0948"
  ]
 },
 {
  "id": "SEC46",
  "group": "public",
  "name": {
   "en": "Cultural heritage",
   "es": "Patrimonio cultural"
  },
  "tagline": {
   "en": "Publishing digitised heritage with clear, machine-readable reuse conditions.",
   "es": "Publicar el patrimonio digitalizado con condiciones de reutilización claras y legibles por máquina."
  },
  "regs": [
   "Rec. 2021/1970",
   "DSM Copyright Dir."
  ],
  "challenges": {
   "en": [
    "Recommendation 2021/1970 asks for 3D digitisation of all at-risk monuments and half of the most visited by 2030.",
    "A 2025 EU report found the 2025 and 2030 targets ‘well out of reach’, with rights and licensing as key barriers.",
    "Article 14 of the Copyright Directive (public domain reproductions) was transposed unevenly; Spain did so narrowly and late.",
    "In Italy, image rights over cultural goods clash with this: a Florence court ordered GQ's publisher to pay €50,000 over Michelangelo's David."
   ],
   "es": [
    "La Recomendación 2021/1970 pide digitalizar en 3D antes de 2030 todos los monumentos en riesgo y la mitad de los más visitados.",
    "Un informe de la UE de 2025 concluye que los objetivos de 2025 y 2030 están «muy fuera de alcance», con derechos y licencias como barreras.",
    "El art. 14 de la Directiva de derechos de autor (dominio público en reproducciones) se transpuso de forma desigual; España, de forma estrecha y tarde.",
    "En Italia los derechos de imagen sobre bienes culturales chocan con ese régimen: un tribunal de Florencia condenó a la editora de GQ a pagar 50.000 € por el David."
   ]
  },
  "why": {
   "en": [
    "The heritage data space builds on Europeana: 52 million items, 45% reusable, but only 0.03% in 3D.",
    "Twin it! gathered 37 emblematic 3D pieces, showing the value of sharing 3D models under clear terms.",
    "With rights varying by country, ODRL policies publish reuse conditions clearly, commercial or not."
   ],
   "es": [
    "El espacio de datos del patrimonio se apoya en Europeana: 52 millones de recursos, el 45 % reutilizables, pero solo el 0,03 % en 3D.",
    "Twin it! reunió 37 piezas emblemáticas en 3D y demuestra el valor de compartir modelos con condiciones claras.",
    "Con derechos tan distintos entre países, las políticas ODRL publican las condiciones de reutilización con claridad, comercial o no."
   ]
  },
  "example": {
   "en": "Only 0.03% of Europeana's 52 million resources are in 3D (F-0950).",
   "es": "Solo el 0,03 % de los 52 millones de recursos de Europeana está en 3D (F-0950)."
  },
  "sources": [
   "F-0949",
   "F-0950",
   "F-0951",
   "F-0952",
   "F-0953",
   "F-0954"
  ]
 },
 {
  "id": "SEC47",
  "group": "public",
  "name": {
   "en": "Software, cloud and AI providers",
   "es": "Software, cloud y proveedores de IA"
  },
  "tagline": {
   "en": "Proving where data and models come from while customers gain the right to switch.",
   "es": "Demostrar de dónde vienen los datos y los modelos mientras el cliente gana el derecho a cambiar de proveedor."
  },
  "regs": [
   "AI Act",
   "Data Act",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "The AI Act sets risk-based duties, with fines of up to €35m or 7% of global turnover for prohibited practices.",
    "GDPR already applies to AI: Italy's Garante fined OpenAI €15m over training without a legal basis, transparency and age checks.",
    "Since 12 September 2025 cloud providers must allow switching (2-month notice, 30-day transition); switching and egress fees are banned from 12 January 2027.",
    "European providers hold only about 15% of Europe's €61bn cloud market, against 70% for Amazon, Microsoft and Google."
   ],
   "es": [
    "El AI Act impone obligaciones según el riesgo, con multas de hasta 35 M€ o el 7 % de la facturación mundial por prácticas prohibidas.",
    "El RGPD ya se aplica a la IA: el Garante italiano multó a OpenAI con 15 M€ por entrenar sin base jurídica y por fallos de transparencia y verificación de edad.",
    "Desde el 12/9/2025 los proveedores cloud deben permitir el cambio (preaviso de 2 meses, transición de 30 días); las tarifas de cambio y salida se prohíben desde el 12/1/2027.",
    "Los proveedores europeos solo tienen un 15 % del mercado cloud europeo (61.000 M€), frente al 70 % de Amazon, Microsoft y Google."
   ]
  },
  "why": {
   "en": [
    "The Commission is funding Simpl (€41m), open middleware for the common data spaces; procurement, health and EOSC are the first users.",
    "Switching and portability rights only work with open interfaces and interoperable formats — the technical base of data space connectors.",
    "AI providers must prove the origin and licences of training data, which needs traceability and usage policies, not only contracts."
   ],
   "es": [
    "La Comisión financia Simpl (41 M€), el middleware abierto de los espacios comunes; contratación pública, salud y EOSC serán los primeros en usarlo.",
    "Los derechos de cambio y portabilidad solo funcionan con interfaces abiertas y formatos interoperables: la base técnica de los conectores.",
    "Los proveedores de IA deben demostrar el origen y las licencias de sus datos de entrenamiento, y eso exige trazabilidad y políticas de uso, no solo contratos."
   ]
  },
  "example": {
   "en": "European cloud providers' share of their home market fell to about 15% in 2024, from 29% in 2017 (F-0958).",
   "es": "La cuota de los proveedores cloud europeos en su propio mercado cayó a un 15 % en 2024, desde el 29 % de 2017 (F-0958)."
  },
  "sources": [
   "F-0946",
   "F-0955",
   "F-0956",
   "F-0957",
   "F-0958",
   "F-0959",
   "F-0960",
   "F-0961"
  ]
 },
 {
  "id": "SEC48",
  "group": "public",
  "name": {
   "en": "Cybersecurity",
   "es": "Ciberseguridad"
  },
  "tagline": {
   "en": "Sharing threat and vulnerability data fast without exposing what attackers want.",
   "es": "Compartir rápido datos de amenazas y vulnerabilidades sin exponer lo que buscan los atacantes."
  },
  "regs": [
   "NIS2",
   "CRA"
  ],
  "challenges": {
   "en": [
    "NIS2 requires risk management and incident reporting, with fines of at least €10m or 2% for essential entities and €7m or 1.4% for important ones.",
    "Transposition lags: the deadline passed on 17 October 2024, and Spain was among 19 Member States that received a reasoned opinion in May 2025.",
    "Since 11 September 2026 the CRA requires makers to report exploited vulnerabilities and severe incidents: early warning in 24 hours, notification in 72.",
    "Reports go through ENISA's single platform to a coordinating CSIRT, and unpatched vulnerability data demand strict confidentiality.",
    "ENISA analysed 4,875 incidents in one year: 77% were DDoS, and public administration was the most targeted sector (38.2%)."
   ],
   "es": [
    "NIS2 obliga a gestionar riesgos y notificar incidentes, con multas mínimas de 10 M€ o el 2 % (esenciales) y 7 M€ o el 1,4 % (importantes).",
    "La transposición va con retraso: el plazo venció el 17/10/2024 y España fue uno de los 19 Estados que recibieron un dictamen motivado en mayo de 2025.",
    "Desde el 11/9/2026 el CRA obliga a notificar vulnerabilidades explotadas e incidentes graves: alerta en 24 horas y notificación en 72.",
    "La notificación pasa por la plataforma única de ENISA hasta un CSIRT coordinador, y los datos de vulnerabilidades sin parche exigen máxima confidencialidad.",
    "ENISA analizó 4.875 incidentes en un año: el 77 % fueron DDoS y la administración pública fue el sector más atacado (38,2 %)."
   ]
  },
  "why": {
   "en": [
    "Report once and redistribute to the CSIRTs concerned: a federated, access-controlled model that a data space can extend to threat indicators between firms.",
    "In public administration, 17.4% of incidents were data breaches; traceable sharing with usage policies reduces exposure compared with copying files."
   ],
   "es": [
    "Notificar una vez y redistribuir a los CSIRT afectados es un modelo federado con control de acceso que un espacio de datos puede extender a los indicadores de amenaza entre empresas.",
    "En la administración pública, el 17,4 % de los incidentes fueron brechas de datos; compartir con trazabilidad y políticas de uso reduce la exposición frente a copiar ficheros."
   ]
  },
  "example": {
   "en": "ENISA recorded 4,875 incidents between July 2024 and June 2025; phishing was behind about 60% of initial access (F-0967).",
   "es": "ENISA registró 4.875 incidentes entre julio de 2024 y junio de 2025; el phishing estuvo detrás de cerca del 60 % de los accesos iniciales (F-0967)."
  },
  "sources": [
   "F-0962",
   "F-0964",
   "F-0965",
   "F-0966",
   "F-0967",
   "F-0968"
  ]
 },
 {
  "id": "SEC49",
  "group": "public",
  "name": {
   "en": "Public procurement",
   "es": "Contratación pública"
  },
  "tagline": {
   "en": "Joining up procurement data across Europe to gain transparency and spot collusion.",
   "es": "Unir los datos de contratación de toda Europa para ganar transparencia y detectar la colusión."
  },
  "regs": [
   "eForms",
   "PPDS",
   "Competition law"
  ],
  "challenges": {
   "en": [
    "Public procurement moves about €2tn (13.6% of EU GDP) across 250,000 buyers, yet only around 20% of tenders were in one place before the PPDS.",
    "Data quality depends on eForms and on each Member State voluntarily connecting its national portal.",
    "Transparency clashes with competition law: Spain's CNMC fined seven distributors €3.14m for sharing out public food contracts and exchanging sensitive information.",
    "In December 2025 the CNMC fined four travel agencies €2.91m for rigging tenders and barred them from public contracts for 3–6 months."
   ],
   "es": [
    "La contratación pública mueve unos 2 billones de euros (13,6 % del PIB de la UE) en 250.000 compradores, pero antes del PPDS solo un 20 % de las licitaciones estaba en un mismo sitio.",
    "La calidad de los datos depende de los eForms y de que cada Estado conecte su portal nacional de forma voluntaria.",
    "La transparencia choca con la competencia: la CNMC sancionó con 3,14 M€ a siete distribuidores que se repartían contratos públicos de alimentos e intercambiaban información sensible.",
    "En diciembre de 2025 la CNMC multó con 2,91 M€ a cuatro agencias de viajes por amañar licitaciones y les prohibió contratar con el sector público de 3 a 6 meses."
   ]
  },
  "why": {
   "en": [
    "The Public Procurement Data Space, launched on 24 September 2024, links TED and national portals in four layers — a European data space already running.",
    "Analytics and AI can detect collusion patterns like those the CNMC fined, provided the data are structured and federated; Simpl-Live counts procurement among its first data spaces.",
    "Ullswater brings direct experience from PROCUREDATA, a federated procurement data space demonstrator."
   ],
   "es": [
    "El Public Procurement Data Space, lanzado el 24/9/2024, conecta TED con los portales nacionales en cuatro capas: un espacio de datos europeo ya en marcha.",
    "La analítica y la IA pueden detectar patrones de colusión como los sancionados por la CNMC si los datos están estructurados y federados; Simpl-Live incluye la contratación entre sus primeros espacios.",
    "Ullswater aporta experiencia directa con PROCUREDATA, un demostrador de espacio de datos federado de contratación."
   ]
  },
  "example": {
   "en": "The CNMC fined four travel agencies €2.91m in December 2025 for coordinating bids in Banco de España and Complutense University tenders (F-0974).",
   "es": "La CNMC multó con 2,91 M€ a cuatro agencias de viajes en diciembre de 2025 por coordinarse en licitaciones del Banco de España y la UCM (F-0974)."
  },
  "sources": [
   "F-0961",
   "F-0969",
   "F-0970",
   "F-0971",
   "F-0972",
   "F-0973",
   "F-0974"
  ]
 },
 {
  "id": "SEC50",
  "group": "public",
  "name": {
   "en": "Employment and HR",
   "es": "Empleo y RR. HH."
  },
  "tagline": {
   "en": "Using AI and worker data for hiring and management with transparency and minimisation.",
   "es": "Usar la IA y los datos de los trabajadores en selección y gestión con transparencia y minimización."
  },
  "regs": [
   "AI Act",
   "Platform Work Dir.",
   "GDPR"
  ],
  "challenges": {
   "en": [
    "The AI Act treats AI for recruitment, screening, promotion, dismissal or task allocation as high-risk from 2 December 2027, and bans emotion inference at work.",
    "The Platform Work Directive (transposition by 2 December 2026) bans processing emotional state, private conversations and off-duty data.",
    "Spain's Rider Law already requires informing worker representatives of algorithm parameters; the Directive adds prior consultation.",
    "Italy's Garante fined Foodinho (Glovo) €5m over excessive geolocation, automated decisions without human review and facial recognition of over 35,000 riders.",
    "Hamburg's authority fined H&M €35.3m over employee data violations."
   ],
   "es": [
    "El AI Act considera de alto riesgo, desde el 2/12/2027, la IA de selección, cribado, ascensos, despidos o reparto de tareas, y prohíbe inferir emociones en el trabajo.",
    "La Directiva de trabajo en plataformas (transposición antes del 2/12/2026) prohíbe tratar datos emocionales, conversaciones privadas y datos fuera del trabajo.",
    "La Ley Rider ya obliga a informar a la representación legal de los parámetros de los algoritmos; la Directiva añade la consulta previa.",
    "El Garante italiano multó a Foodinho (Glovo) con 5 M€ por geolocalización excesiva, decisiones automatizadas sin revisión humana y reconocimiento facial de más de 35.000 repartidores.",
    "La autoridad de Hamburgo multó a H&M con 35,3 M€ por infracciones con datos de empleados."
   ]
  },
  "why": {
   "en": [
    "The European skills data space (DS4Skills and its deployment) aims to share competence data between employers, training and employment services, with the worker at the centre.",
    "Algorithmic transparency and minimisation mean sharing only necessary data with representatives and authorities, traceably and for limited purposes — the role of ODRL policies."
   ],
   "es": [
    "El espacio europeo de datos de capacidades (DS4Skills y su despliegue) busca compartir datos de competencias entre empleadores, formación y servicios de empleo, con el trabajador en el centro.",
    "La transparencia algorítmica y la minimización exigen compartir con representantes y autoridades solo los datos necesarios, de forma trazable y con fines limitados: el papel de las políticas ODRL."
   ]
  },
  "example": {
   "en": "Italy's Garante fined Foodinho €5m in November 2024 and banned its facial recognition of riders (F-0978).",
   "es": "El Garante italiano multó a Foodinho con 5 M€ en noviembre de 2024 y prohibió su reconocimiento facial de repartidores (F-0978)."
  },
  "sources": [
   "F-0903",
   "F-0924",
   "F-0925",
   "F-0926",
   "F-0975",
   "F-0976",
   "F-0977",
   "F-0978",
   "F-0979",
   "F-0980"
  ]
 }
];

window.SOURCES_SECTORS = {
 "F-0142": {
  "t": "The AI Act Implementation Timeline: What Changes Under the AI Omnibus?",
  "u": "https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus"
 },
 "F-0296": {
  "t": "Retraso hasta diciembre de 2026 y otros avances en la aplicación del EUDR",
  "u": "https://trade.ec.europa.eu/access-to-markets/en/news/delay-until-december-2026-and-other-developments-implementation-eudr-regulation"
 },
 "F-0551": {
  "t": "Reglamento (UE) 2025/327 relativo al Espacio Europeo de Datos de Salud",
  "u": "https://eur-lex.europa.eu/eli/reg/2025/327/oj"
 },
 "F-0552": {
  "t": "ENISA Threat Landscape: Health Sector",
  "u": "https://www.enisa.europa.eu/publications/health-threat-landscape"
 },
 "F-0553": {
  "t": "Health data breach: the CNIL fined Hôpital Privé de la Loire EUR 500 000",
  "u": "https://www.edpb.europa.eu/node/766_en"
 },
 "F-0554": {
  "t": "40.000 euros de multa a un hospital por compartir datos personales",
  "u": "https://www.economistjurist.es/noticias-juridicas/40-000-euros-de-multa-a-un-hospital-por-compartir-datos-personales"
 },
 "F-0557": {
  "t": "Nota de prensa: presentación del Espacio Nacional de Datos de Salud (I Encuentro Nacional de Espacios de Datos)",
  "u": "https://digital.gob.es/content/dam/portal-mtdfp/comunicacion/comunicacion_ministro/2026/2025-01-29/NdPEspaciosdedatos.pdf"
 },
 "F-0558": {
  "t": "Aperciben al Servicio Canario de Salud por entregar a un paciente los datos personales de otro",
  "u": "https://www.economistjurist.es/?p=152928"
 },
 "F-0559": {
  "t": "Health — Cybersecurity of critical sectors",
  "u": "https://www.enisa.europa.eu/topics/cybersecurity-of-critical-sectors/health"
 },
 "F-0561": {
  "t": "Resolución de recurso de reposición, PS/00130/2024 (difusión de imágenes de una clínica)",
  "u": "https://elconfidencialdigital.com/media/elconfidencialdigital/files/2024/09/24/AEPD%20difusi%C3%B3n%20cl%C3%ADnica%20cirug%C3%ADa.pdf"
 },
 "F-0563": {
  "t": "ENISA Threat Landscape report: health sector (análisis)",
  "u": "https://securityaffairs.com/148207/reports/enisa-threat-landscape-report-health-sector.html"
 },
 "F-0564": {
  "t": "Multa de 16.000 euros a una farmacéutica que recopilaba datos de salud de los pacientes en un Excel",
  "u": "https://www.economistjurist.es/?p=226961"
 },
 "F-0565": {
  "t": "European Health Data Space Regulation",
  "u": "https://www.cuatrecasas.com/en/portugal/life-sciences-healthcare/art/european-health-data-space-regulation"
 },
 "F-0566": {
  "t": "Reglamento (UE) 2025/327, Espacio Europeo de Datos de Salud (presentación)",
  "u": "https://www.sanidad.gob.es/areas/saludDigital/espacioEuropeoDS/docs/EEDS_WEB.pdf"
 },
 "F-0568": {
  "t": "European Health Data Space (EEDS)",
  "u": "https://www.sanidad.gob.es/en/areas/saludDigital/espacioEuropeoDS/home.htm"
 },
 "F-0569": {
  "t": "European Health Data Space — resumen del acto final",
  "u": "https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1805726"
 },
 "F-0570": {
  "t": "Quirón, multada con 50.000 euros por no proteger los datos personales de los trabajadores",
  "u": "https://www.economistjurist.es/?p=214384"
 },
 "F-0571": {
  "t": "Frequently Asked Questions on the European Health Data Space Regulation (v1.1)",
  "u": "https://www.sanidad.gob.es/areas/saludDigital/espacioEuropeoDS/docs/ehealth_ehds_qa_en_20260326.pdf"
 },
 "F-0572": {
  "t": "TEHDAS2 — Second Joint Action Towards the European Health Data Space",
  "u": "https://tehdas.eu/project/"
 },
 "F-0573": {
  "t": "Guía para profesionales del sector sanitario",
  "u": "https://www.aepd.es/guias/guia-profesionales-sector-sanitario.pdf"
 },
 "F-0574": {
  "t": "Nota informativa: AEPD, principales reclamaciones en materia de salud",
  "u": "https://files.griddo.ecija.com/ecija-nota-informativa-aepd-principales-reclamaciones-en-materia-de-salud.pdf"
 },
 "F-0575": {
  "t": "Nota de prensa: el COEM y la Consejería de Sanidad entregarán las historias clínicas digitalizadas de los afectados por iDental",
  "u": "https://www.coem.org.es/media/page/prensa/NP-HistoriasCl%C3%ADnicasiDental_17102018.pdf"
 },
 "F-0576": {
  "t": "FACUA denuncia que los afectados de iDental no tienen acceso a su historial",
  "u": "https://www.redaccionmedica.com/profesionales/20180702/facua-denuncia-que-los-afectados-de-idental-no-tienen-acceso-su-historial/97500_0.html"
 },
 "F-0577": {
  "t": "Cierre de las clínicas dentales Vivanta (nota de prensa)",
  "u": "https://www.ocu.org/organizacion/prensa/notas-de-prensa/2026/cierreclinicavivanta110926"
 },
 "F-0578": {
  "t": "30.000 euros de multa a una clínica dental por pedir el DNI a su cliente",
  "u": "https://www.genbeta.com/actualidad/30-000-euros-multa-a-clinica-dental-pedir-dni-a-su-cliente-acusan-tratar-exceso-informacion"
 },
 "F-0579": {
  "t": "El gasto de los españoles en tratamientos dentales supera cifras récord",
  "u": "https://www.elespanol.com/invertia/observatorios/sanidad/20260311/gasto-espanoles-tratamientos-dentales-supera-cifras-record-millones-euros/1003744165900_0.amp.html"
 },
 "F-0580": {
  "t": "Informe Fenin 2026 sobre el sector dental (nota de prensa de Expodental)",
  "u": "https://www.ifema.es/expodental/notas-prensa/informe-fenin-2026"
 },
 "F-0581": {
  "t": "Información sobre CTIS y el Reglamento de ensayos clínicos UE 536/2014",
  "u": "https://www.aemps.gob.es/medicamentos-de-uso-humano/investigacion_medicamentos/ensayosclinicos/informacion-sobre-ctis-y-reglamento-de-ensayos-clinicos-ue-536-2014/"
 },
 "F-0582": {
  "t": "DARWIN EU infosheet (2026 update)",
  "u": "https://www.ema.europa.eu/system/files/documents/other/darwin-eu_infosheet_2026-update_en.pdf"
 },
 "F-0583": {
  "t": "Resultados de la Encuesta de I+D 2025",
  "u": "https://www.farmaindustria.es/web/wp-content/uploads/sites/2/2026/02/Resultados-Encuesta-ID-2025.pdf"
 },
 "F-0585": {
  "t": "El valor estratégico de la industria farmacéutica 2025",
  "u": "https://farmaindustria.es/web/wp-content/uploads/sites/2/2025/02/El-valor-estrategico-de-la-industria-farmaceutica_2025.pdf"
 },
 "F-0586": {
  "t": "EUDAMED — Overview",
  "u": "https://health.ec.europa.eu/medical-devices-eudamed/overview_en"
 },
 "F-0589": {
  "t": "MDCG published new guidance on the interplay between the MDR/IVDR and the AI Act",
  "u": "https://www.hlc.com/en/publications/mdcg-published-new-guidance-on-the-interplay-between-the-mdr-ivdr-and-the-ai-act"
 },
 "F-0590": {
  "t": "Commercial prospecting: French SA fined CEGEDIM SANTÉ EUR 800 000",
  "u": "https://www.edpb.europa.eu/news/national-news/2024/commercial-prospecting-french-sa-fined-cegedim-sante-eur-800-000_en"
 },
 "F-0591": {
  "t": "Foto de la tecnología sanitaria española: 362 empresas y 54.000 empleos",
  "u": "https://www.redaccionmedica.com/secciones/tecnologia/-foto-de-la-tecnologia-sanitaria-espanola-362-empresas-y-54-000-empleos-4606"
 },
 "F-0592": {
  "t": "SegurCaixa, Sanitas y Asisa lideran la facturación del sector y crecen frente a la media del ramo de salud",
  "u": "https://www.elespanol.com/invertia/observatorios/sanidad/20260724/segurcaixa-sanitas-asisa-lideran-facturacion-sector-crecen-frente-media-ramo-salud/1003744331450_0.html"
 },
 "F-0594": {
  "t": "Ibermutua, sancionada con 600.000 euros por filtrar datos personales de más de 3.000 personas por error",
  "u": "https://www.economistjurist.es/actualidad-juridica/ibermutua-sancionada-con-600-000-euros-por-filtrar-datos-personales-de-mas-de-3-000-personas-por-error/"
 },
 "F-0595": {
  "t": "RGPD en compañías de seguros",
  "u": "https://www.legiscope.com/blog/rgpd-companias-seguros.html"
 },
 "F-0596": {
  "t": "Las aseguradoras que dan cobertura a Muface disparan su facturación pero pierden asegurados",
  "u": "https://www.elespanol.com/invertia/observatorios/sanidad/20260313/aseguradoras-dan-cobertura-muface-disparan-facturacion-pierden-asegurados/1003744167365_0.html"
 },
 "F-0597": {
  "t": "Nuevas directrices de la EMA sobre la gestión de datos personales e información comercial confidencial en CTIS",
  "u": "https://www.uria.com/es/publicaciones/8967-nuevas-directrices-de-la-agencia-europea-del-medicamento-sobre-la-gestion-de-dat"
 },
 "F-0598": {
  "t": "Clinical Trial Data Transparency in the EU: Is the New Clinical Trials Regulation a Game-Changer?",
  "u": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10158712/"
 },
 "F-0599": {
  "t": "Registro y transparencia de los ensayos clínicos en Europa",
  "u": "https://www.elsevier.es/es-revista-medicina-clinica-2-articulo-registro-transparencia-ensayos-clinicos-europa-S0025775326001946"
 },
 "F-0600": {
  "t": "Gobierno, industria y sanitarios lanzan una plataforma para agilizar el acceso de pacientes a ensayos clínicos",
  "u": "https://www.elespanol.com/invertia/observatorios/sanidad/20260520/gobierno-industria-sanitarios-lanzan-plataforma-agilizar-acceso-pacientes-ensayos-clinicos/1003744251332_0.html"
 },
 "F-0601": {
  "t": "Real Decreto 1716/2011, requisitos básicos de autorización y funcionamiento de los biobancos",
  "u": "https://www.boe.es/eli/es/rd/2011/11/18/1716"
 },
 "F-0602": {
  "t": "DARWIN EU: making health data count",
  "u": "https://www.ema.europa.eu/en/documents/other/darwin-eu-making-health-data-count_en.pdf"
 },
 "F-0604": {
  "t": "La AEPD sanciona a 23andMe con 2,4 millones por la brecha de datos genéticos de 2.642 españoles",
  "u": "https://www.moncloa.com/2026/07/22/aepd-multa-23andme-brecha-datos-geneticos-3403788/"
 },
 "F-0605": {
  "t": "IMPaCT — International dimension",
  "u": "https://impact.isciii.es/en/?p=4642"
 },
 "F-0606": {
  "t": "Noticia: infraestructura IMPaCT financiada por el ISCIII",
  "u": "https://repisalud.isciii.es/bitstream/20.500.12105/16368/1/Noticia_InfraestructuraIMPaCTfinanciadaISCIII_2023.pdf"
 },
 "F-0607": {
  "t": "OCU denuncia a MyHeritage",
  "u": "https://www.ocu.org/organizacion/prensa/notas-de-prensa/2022/denunciamyheritage130122"
 },
 "F-0608": {
  "t": "Plan de inspección de oficio de la atención sociosanitaria",
  "u": "https://www.aepd.es/documento/plan-inspeccion-oficio-atencion-sociosanitaria.pdf"
 },
 "F-0609": {
  "t": "Estadística del SISAAD: evolución a 31 de julio de 2026",
  "u": "https://imserso.es/documents/20123/11151730/estsisaad_evolucion_20260731.pdf/76a27130-caef-fae0-40df-a391281637da"
 },
 "F-0610": {
  "t": "Sancionado un asilo de ancianos por el envío masivo de correos electrónicos a los familiares de los residentes",
  "u": "https://www.economistjurist.es/?p=221341"
 },
 "F-0623": {
  "t": "ECB issues new guidance on outsourcing cloud services",
  "u": "https://cms.law/en/aut/legal-updates/ecb-issues-new-guidance-on-outsourcing-cloud-services"
 },
 "F-0624": {
  "t": "Data clauses in DORA and EBA third-party risk guidelines",
  "u": "https://www.pinsentmasons.com/out-law/analysis/data-clauses-dora-eba-third-party-risk-guidelines"
 },
 "F-0625": {
  "t": "Resolución recurso de reposición PS/00477/2019 (CaixaBank)",
  "u": "https://www.aepd.es/documento/reposicion-ps-00477-2019.pdf"
 },
 "F-0626": {
  "t": "Sanción ejemplar de 1,18 millones a BBVA por infringir la normativa de protección de datos tras una suplantación de identidad",
  "u": "https://www.economistjurist.es/noticias-juridicas/sancion-ejemplar-de-118-millones-a-bbva-por-infringir-la-normativa-de-proteccion-de-datos-tras-una-suplantacion-de-identidad"
 },
 "F-0629": {
  "t": "EDPB and AMLA to develop Joint Guidelines on partnerships for information sharing",
  "u": "https://www.edpb.europa.eu/news/edpb-and-amla-to-develop-joint-guidelines-on-partnerships-for-information-sharing_it"
 },
 "F-0630": {
  "t": "Operational Resilience in the EU: Unlocking Synergies, Cutting Complexity",
  "u": "https://www.deutsche-boerse.com/resource/blob/4833984/c67dc1f4f0c60eddea021bddb591b345/data/Operational%20Resilience%20in%20the%20EU.pdf"
 },
 "F-0631": {
  "t": "Procedure 2023/0205/COD — Proposal for a Regulation on a framework for Financial Data Access (COM(2023) 360)",
  "u": "https://eur-lex.europa.eu/procedure/EN/2023_205"
 },
 "F-0632": {
  "t": "How will the European Commission's FiDA proposal for open finance impact the financial sector?",
  "u": "https://www.osborneclarke.com/node/23215"
 },
 "F-0633": {
  "t": "From open banking to open finance: FiDA",
  "u": "https://www.nortonrosefulbright.com/en/knowledge/publications/b029b764/from-open-banking-to-open-finance-fida"
 },
 "F-0634": {
  "t": "Progress report on the proposal for a Regulation on a framework for Financial Data Access (doc. 10949/24)",
  "u": "https://data.consilium.europa.eu/doc/document/ST-10949-2024-INIT/en/pdf"
 },
 "F-0635": {
  "t": "Financial Data Access — cepPolicyBrief No. 3/2024",
  "u": "https://www.cep.eu/fileadmin/user_upload/cep.eu/Studien/Les_Analyses_du_cep_Acces_aux_Donnees_financieres/Study_-_Financial_data_access.pdf"
 },
 "F-0637": {
  "t": "FiDA regulation: open finance in the EU",
  "u": "https://securities.cib.bnpparibas/fida-regulation-open-finance-eu/"
 },
 "F-0638": {
  "t": "From outsourcing to third-party arrangements: New EBA Guidelines for third-party risk management in relation to non-ICT services",
  "u": "https://www.dlapiper.com/insights/publications/law-in-tech/from-outsourcing-to-third-party-arrangements-new-eba-guidelines-for-third-party"
 },
 "F-0639": {
  "t": "Crypto Assets and Financial Data Space Regulation in the EU's Hybrid System of Hard and Soft Law",
  "u": "https://link.springer.com/chapter/10.1007/978-3-031-74889-9_4"
 },
 "F-0640": {
  "t": "European Commission Adopts Digital Finance Package",
  "u": "https://www.marketsmedia.com/european-commission-adopts-digital-finance-package"
 },
 "F-0641": {
  "t": "European Commission presents new digital strategy to modernise financial supervisory reporting",
  "u": "https://finextra.com/pressarticle/90780/european-commision-presents-new-digital-strategy-to-modernise-financial-supervisory-reporting"
 },
 "F-0642": {
  "t": "Register now for our webinar: Data spaces experience – European Financial Data Space",
  "u": "https://data.europa.eu/en/news-events/news/register-now-our-webinar-data-spaces-experience-european-financial-data-space"
 },
 "F-0643": {
  "t": "Digital Finance Strategy for the EU (COM(2020) 591) — ficha EPRS",
  "u": "https://documentacion.fundacionmapfre.org/documentacion/media/group/1117564.do"
 },
 "F-0644": {
  "t": "The value of open data in finance: The EU preparing for the digital financial transformation",
  "u": "https://data.europa.eu/de/news-events/news/value-open-data-finance-eu-preparing-digital-financial-transformation"
 },
 "F-0645": {
  "t": "Recuadro 8.1 «Modernising payment services and opening financial services data» (Memoria de Supervisión 2023)",
  "u": "https://www.bde.es/f/webbe/Secciones/Publicaciones/PublicacionesAnuales/MemoriaSupervisionBancaria/23/SupervisionReport2023_Chap8_Box8.1.pdf"
 },
 "F-0646": {
  "t": "Regulation (EU) 2024/1620 establishing the Authority for Anti-Money Laundering and Countering the Financing of Terrorism",
  "u": "https://www.sepblac.es/wp-content/uploads/2024/06/Regulation_EU_2024_1620_eng.pdf"
 },
 "F-0647": {
  "t": "EU AML package: what the AMLR means for Swiss financial institutions",
  "u": "https://www.forvismazars.com/ch/en/insights/reports-studies-and-surveys/eu-aml-package-and-amlr"
 },
 "F-0650": {
  "t": "EIOPA publishes Opinion on AI governance and risk management",
  "u": "https://www.eiopa.europa.eu/eiopa-publishes-opinion-ai-governance-and-risk-management-2025-08-06_en"
 },
 "F-0651": {
  "t": "Feedback statement on open insurance: accessing and sharing insurance-related data",
  "u": "https://www.eiopa.europa.eu/system/files/2022-06/feedback_statement_on_open_insurance_-_accessing_and_sharing_insurance-related_data.pdf"
 },
 "F-0652": {
  "t": "Protección de Datos multa con 5,6 millones a Generali e ING",
  "u": "https://forbes.es/economia/708541/proteccion-de-datos-multa-con-56-millones-a-generali-e-ing/"
 },
 "F-0653": {
  "t": "Joint EBA-ECB report on payment fraud: strong authentication remains effective but fraudsters are adapting",
  "u": "https://www.eba.europa.eu/publications-and-media/press-releases/joint-eba-ecb-report-payment-fraud-strong-authentication-remains-effective-fraudsters-are-adapting"
 },
 "F-0654": {
  "t": "Payment services deal: More protection from online fraud and hidden fees",
  "u": "https://www.europarl.europa.eu/news/en/press-room/20251121IPR31540/payment-services-deal-more-protection-from-online-fraud-and-hidden-fees"
 },
 "F-0655": {
  "t": "Instant Payments Regulation",
  "u": "https://www.ecb.europa.eu/paym/retail/instant_payments/html/instant_payments_regulation.ca.html"
 },
 "F-0656": {
  "t": "El volumen de operaciones con Bizum creció un 53 % en 2025 y se situó en 67.751 millones",
  "u": "https://www.infobae.com/espana/agencias/2026/01/19/el-volumen-de-operaciones-con-bizum-crecio-un-53-en-2025-y-se-situo-en-67751-millones/"
 },
 "F-0657": {
  "t": "El Banco de España no sabe cómo se mueve el dinero por Bizum. Un nuevo acuerdo va a despejarle las dudas",
  "u": "https://www.xatakamovil.com/movil-y-sociedad/banco-espana-quiere-saber-que-hacemos-bizum-ha-firmado-acuerdo-para-conseguirlo-cotillear-pagos-no-esta-sus-planes"
 },
 "F-0658": {
  "t": "Cloud computing and the challenges facing professional secrecy",
  "u": "https://www.ibanet.org/article/a2b6e994-b3db-4e8a-bc7b-2c899919d6a3"
 },
 "F-0659": {
  "t": "CCBE response to the call for evidence for the EU Cloud and AI Development Act",
  "u": "https://www.ccbe.eu/fileadmin/speciality_distribution/public/documents/IT_LAW/ITL_Position_papers/EN_ITL_20250701_CCBE-response-to-the-call-for-evidence-for-the-EU-Cloud-and-AI-Development-Act.pdf"
 },
 "F-0660": {
  "t": "Una gestoría es sancionada con 4.000 euros por compartir documentación de un cliente sin consentimiento",
  "u": "https://www.economistjurist.es/actualidad-juridica/jurisprudencia/una-gestoria-es-sancionada-con-4-000-euros-por-compartir-documentacion-de-un-cliente-sin-consentimiento"
 },
 "F-0661": {
  "t": "Un despacho de abogados es sancionado con 10.000 euros por enviar un email sin copia oculta",
  "u": "https://www.economistjurist.es/noticias-juridicas/un-despacho-de-abogados-es-sancionado-con-10-000-euros-por-enviar-un-email-sin-copia-oculta/"
 },
 "F-0662": {
  "t": "Abogacía presenta el Libro Blanco sobre el uso de la IA en la profesión",
  "u": "https://www.legaltoday.com/actualidad-juridica/noticias-de-derecho/abogacia-presenta-el-libro-blanco-sobre-el-uso-de-la-ia-en-la-profesion-el-60-de-los-profesionales-ya-utiliza-aplicaciones-con-inteligencia-artificial-2026-01-30/"
 },
 "F-0663": {
  "t": "El ICAM lanza la primera guía práctica para un uso responsable de la IA en la abogacía",
  "u": "https://web.icam.es/el-icam-lanza-la-primera-guia-practica-para-un-uso-responsable-de-la-ia-en-la-abogacia/"
 },
 "F-0664": {
  "t": "Commission Notice on the interpretation of certain legal provisions as regards sustainability reporting (C/2024/6792)",
  "u": "https://eur-lex.europa.eu/eli/C/2024/6792/oj/eng"
 },
 "F-0665": {
  "t": "Towards digital corporate reporting with CSRD (webinar)",
  "u": "https://accountancyeurope.eu/wp-content/uploads/2022/12/230516-Towards-digital-corporate-reporting-with-CSRD-complete-presentation.pdf"
 },
 "F-0666": {
  "t": "Sujetos obligados (art. 2 de la Ley 10/2010)",
  "u": "https://www.sepblac.es/wp-content/uploads/2024/10/sujetos_obligados_ley_10_2010.pdf"
 },
 "F-0667": {
  "t": "Directiva (UE) 2024/1275 relativa a la eficiencia energética de los edificios (refundición)",
  "u": "https://eur-lex.europa.eu/eli/dir/2024/1275"
 },
 "F-0668": {
  "t": "Energy Performance of Buildings Directive",
  "u": "https://energy.ec.europa.eu/topics/energy-efficiency/energy-performance-buildings/energy-performance-buildings-directive_en"
 },
 "F-0669": {
  "t": "Development of renovation passports — Policy guideline summary (EPBD.wise D4.3)",
  "u": "https://build-up.ec.europa.eu/system/files/2026-07/26-2026-10_Development%20of%20renovation%20passports%20Policy%20guideline%20summary.pdf"
 },
 "F-0670": {
  "t": "A framework for digital building logbooks: Drivers of affordable, circular and sustainable built environment",
  "u": "https://www.bpie.eu/wp-content/uploads/2026/08/A-framework-for-digital-building-logbooks-Drivers-of-affordable-circular-and-sustainable-built-environment.pdf"
 },
 "F-0671": {
  "t": "Short-term rentals: EU transparency rules now in force",
  "u": "https://transition-pathways.europa.eu/construction/news-publications/short-term-rentals-eu-transparency-rules-now-force"
 },
 "F-0672": {
  "t": "Multada una inmobiliaria por contactar propietarios con anuncios de alquiler para que se pasen al temporal",
  "u": "https://www.eldiario.es/tecnologia/multada-inmobiliaria-contactar-propietarios-anuncios-alquiler-pasen-temporal_1_11954951.html"
 },
 "F-0673": {
  "t": "Sancionada una comunidad de propietarios porque la web que usa la administración de fincas para subir datos de los vecinos carece de seguridad",
  "u": "https://www.economistjurist.es/actualidad-juridica/jurisprudencia/sancionada-una-comunidad-de-propietarios-porque-la-pagina-web-que-usa-la-administracion-de-fincas-para-subir-datos-personales-de-los-vecinos-carece-de-seguridad/"
 },
 "F-0675": {
  "t": "Catálogo ejemplificativo de operaciones de riesgo: promoción inmobiliaria e intermediación en la compraventa de inmuebles",
  "u": "https://www.sepblac.es/wp-content/uploads/2018/03/cor_sector_inmobiliario.pdf"
 },
 "F-0676": {
  "t": "Multa récord a Vodafone de la AEPD: 8,15 millones de euros por realizar comunicaciones comerciales indebidas",
  "u": "https://www.genbeta.com/actualidad/multa-record-a-vodafone-aepd-8-15-millones-euros-realizar-comunicaciones-comerciales-indebidas"
 },
 "F-0678": {
  "t": "España: el «SIM swapping» y el motivo por el que la AEPD está multando a empresas de telefonía",
  "u": "https://www.cuatrecasas.com/es/spain/propiedad-intelectual/art/espana-el-sim-swapping-y-el-motivo-por-el-que-la-aepd-esta-multando-a-empresas-de-telefonia"
 },
 "F-0679": {
  "t": "Telecom Security Incidents 2024",
  "u": "https://www.enisa.europa.eu/publications/telecom-security-incidents-2024"
 },
 "F-0680": {
  "t": "2024 Telco threat landscape",
  "u": "https://www.enisa.europa.eu/sites/default/files/2025-03/5-ENISA_2024%20Telco%20threat%20landscape_March%202025.pdf"
 },
 "F-0681": {
  "t": "Digital Networks Act (EU Legislation in Progress)",
  "u": "https://epthinktank.eu/2026/03/19/digital-networks-act-legislation-eu-legislation-in-progress/"
 },
 "F-0683": {
  "t": "What has the GSMA's Open Gateway programme achieved?",
  "u": "https://www.gsma.com/solutions-and-impact/gsma-open-gateway/?p=47817"
 },
 "F-0684": {
  "t": "Informe Económico Sectorial de Telecomunicaciones y Audiovisual 2025 (nota de prensa)",
  "u": "https://www.cnmc.es/prensa/inf-anual-telecos-20260622"
 },
 "F-0686": {
  "t": "Commission guidance on vehicle data, accompanying Regulation (EU) 2023/2854 (Data Act) — C/2025/5026",
  "u": "https://eur-lex.europa.eu/eli/C/2025/5026/oj"
 },
 "F-0687": {
  "t": "Guidelines 01/2020 on processing personal data in the context of connected vehicles and mobility related applications",
  "u": "https://edpb.europa.eu:443/sites/default/files/consultation/edpb_guidelines_202001_connectedvehicles.pdf"
 },
 "F-0688": {
  "t": "EDPB Guidelines on connected vehicles and mobility related applications — Guidelines at a glance",
  "u": "https://www.edpb.europa.eu/system/files/2026-11/edpb-guidelines-at-a-glance-connected-vehicles-mobility-data_en.pdf"
 },
 "F-0689": {
  "t": "New 2024 cybersecurity regulations for vehicles (UNECE R155 y R156)",
  "u": "https://www.incibe.es/en/incibe-cert/publications/guides-and-studies/guides/new-2024-cybersecurity-regulations-vehicles"
 },
 "F-0690": {
  "t": "Volkswagen fined EUR 1.1 million in Germany for test-car GDPR breaches",
  "u": "https://www.osborneclarke.com/insights/volkswagen-fined-eur-11-million-germany-test-cars-gdpr-breaches"
 },
 "F-0691": {
  "t": "California authorities announce largest CCPA fine to date (General Motors)",
  "u": "https://www.iapp.org/news/a/california-authorities-announce-largest-ccpa-fine-to-date"
 },
 "F-0692": {
  "t": "More than 1,000 OEMs and suppliers now exchanging data through Catena-X network",
  "u": "https://www.automotivelogistics.media/supply-chain/more-thannbsp1000-oems-and-suppliers-now-exchanging-data-through-catena-x-network/2746686"
 },
 "F-0693": {
  "t": "Catena-X announces Hub and Competence Center in Spain",
  "u": "https://catena-x.net/news/catena-x-announces-hub-and-competence-center-in-spain/"
 },
 "F-0695": {
  "t": "Part-IS is now fully applicable",
  "u": "https://www.easa.europa.eu/community/topics/part-now-fully-applicable"
 },
 "F-0696": {
  "t": "Civil Aviation Cybersecurity: EASA Part-IS Sets New Information Security Obligations",
  "u": "https://www.jonesday.com/en/insights/2026/02/civil-aviation-cybersecurity-easa-partis-sets-new-information-security-obligations"
 },
 "F-0697": {
  "t": "Additional Member States and first airports join EASA's award-winning Data4Safety programme",
  "u": "https://www.easa.europa.eu/en/newsroom-and-events/press-releases/additional-member-states-and-first-airports-join-easas-award"
 },
 "F-0698": {
  "t": "With Skywise, Airbus is re-imagining the digital sky",
  "u": "https://www.airbus.com/en/newsroom/stories/2026-04-with-skywise-airbus-is-re-imagining-the-digital-sky"
 },
 "F-0699": {
  "t": "Airbus to develop Gaia-X data space for all its data sharing",
  "u": "https://datacenterdynamics.com/en/news/airbus-to-develop-gaia-x-data-space-for-all-its-data-sharing"
 },
 "F-0700": {
  "t": "Aerospace-X",
  "u": "https://www.ipk.fraunhofer.de/en/references/aerospace-x.html"
 },
 "F-0701": {
  "t": "Sky High Penalty – Boeing Fined $51m By U.S. State Department For Export Control Violations",
  "u": "https://cliffordchance.com/content/dam/cliffordchance/briefings/2024/03/Sky-High%20Penalty%20-%20Boeing%20Fined%20$51m%20By%20U.S.%20State%20Department%20For%20Export%20Control%20Violations.pdf"
 },
 "F-0702": {
  "t": "Exporting dual-use items",
  "u": "https://policy.trade.ec.europa.eu/help-exporters-and-importers/exporting-dual-use-items_en"
 },
 "F-0703": {
  "t": "Digital connectivity to underpin Airbus Global Services Forecast",
  "u": "https://runwaygirlnetwork.com/2026/10/digital-connectivity-underpin-airbus-global-services-forecast/"
 },
 "F-0704": {
  "t": "Brussels Bets on Digital Sovereignty: DAIDS Project Aims to Secure EU Defense Data Without Foreign Reliance",
  "u": "https://www.defensemagazine.com/article/brussels-bets-on-digital-sovereignty-daids-project-aims-to-secure-eu-defense-data-without-foreign-reliance"
 },
 "F-0705": {
  "t": "European Defence Agency says 15 EU countries agree military space data mechanism worth around €50 million",
  "u": "https://defence-industry.eu/european-defence-agency-says-15-eu-countries-agree-military-space-data-mechanism-worth-around-e50-million-with-capability-targeted-for-2029/"
 },
 "F-0706": {
  "t": "European Defence Fund: over €1 billion to drive next-generation defence technologies and innovation",
  "u": "https://defence-industry-space.ec.europa.eu/european-defence-fund-over-eu1-billion-drive-next-generation-defence-technologies-and-innovation-2025-01-30_en"
 },
 "F-0707": {
  "t": "RTX fined $200M for exporting defense tech to China, Russia, Iran",
  "u": "https://defenseone.com/business/2024/08/rtx-fined-200m-exporting-defense-tech-china-russia-iran/399220"
 },
 "F-0708": {
  "t": "Dual-use export controls (resumen del Reglamento (UE) 2021/821)",
  "u": "https://eur-lex.europa.eu/EN/legal-content/summary/dual-use-export-controls.html"
 },
 "F-0709": {
  "t": "Recomendación (UE) 2021/1700 sobre programas internos de cumplimiento para controlar la investigación de doble uso",
  "u": "https://eur-lex.europa.eu/eli/reco/2021/1700/oj"
 },
 "F-0711": {
  "t": "EU reaches deal to streamline chemical assessments for health and environment",
  "u": "https://transition-pathways.europa.eu/chemicals/digital-transition/eu-reaches-deal-streamline-chemical-assessments-health-and"
 },
 "F-0712": {
  "t": "Establishing a common data platform on chemicals in Europe",
  "u": "https://transition-pathways.europa.eu/chemicals/digital-transition/establishing-common-data-platform-chemicals-europe"
 },
 "F-0713": {
  "t": "Revised chemical labelling regulation enters into force",
  "u": "https://environment.ec.europa.eu/news/revised-chemical-labelling-regulation-enters-force-2024-12-10_en"
 },
 "F-0714": {
  "t": "Enforcement Forum finds non-compliance in imported substances, mixtures and articles (REF-12)",
  "u": "https://transition-pathways.europa.eu/chemicals/news-articles/enforcement-forum-finds-non-compliance-imported-substances-mixtures-and"
 },
 "F-0715": {
  "t": "Unlocking the power of data exchange for decarbonisation in the chemical sector",
  "u": "https://www.tfs-initiative.com/news/unlocking-the-power-of-data-exchange-for-decarbonisation-in-the-chemical-sector"
 },
 "F-0716": {
  "t": "Catena-X and TfS launch PCF verification framework to enhance trust in PCF data",
  "u": "https://www.tfs-initiative.com/news/catena-x-and-ttfs-launch-pcf-verification-framework-to-enhance-trust-in-pcf-data"
 },
 "F-0717": {
  "t": "Cefic publishes its 2025 Facts & Figures report",
  "u": "https://transition-pathways.europa.eu/chemicals/news-articles/cefic-publishes-its-2025-facts-figures-report"
 },
 "F-0718": {
  "t": "Operationalisation and simplification of the EU CBAM",
  "u": "https://www.hsfkramer.com/notes/energy/2026-posts/operationalisation-and-simplification-of-the-eu-cbam"
 },
 "F-0719": {
  "t": "Carbon Border Adjustment Mechanism",
  "u": "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en"
 },
 "F-0721": {
  "t": "We can't decarbonise in the dark: Let's share data to drive green steel supply chains",
  "u": "https://www.theclimategroup.org/our-work/news/we-cant-decarbonise-dark-lets-share-data-drive-green-steel-supply-chains"
 },
 "F-0722": {
  "t": "Fraunhofer IESE and Fraunhofer IWM are working with companies to create a digital material data space",
  "u": "https://www.iese.fraunhofer.de/en/media/press/pm_2026_03_23_materialdatenraum.html"
 },
 "F-0723": {
  "t": "Thyssenkrupp and CarbonChain launch a tool for green steel procurement",
  "u": "https://gmk.center/en/news/thyssenkrupp-and-carbonchain-launch-a-tool-for-green-steel-procurement/amp/"
 },
 "F-0726": {
  "t": "EU Machinery Regulation from 20 January 2027",
  "u": "https://www.pilz.com/en-PL/support/law-standards-norms/manufacturer-machine-operators/machinery-regulation"
 },
 "F-0727": {
  "t": "Joint industry call on cybersecurity and the Machinery Regulation",
  "u": "https://cema-agri.org/publication/news/1118-joint-industry-call-on-cybersecurity-and-the-machinery-regulation"
 },
 "F-0728": {
  "t": "Digital compliance in mechanical engineering: Data Act, CRA and the AI Act in tandem",
  "u": "https://www.heuking.de/en/news-events/newsletter-articles/detail/digital-compliance-in-mechanical-engineering-data-act-cra-and-the-ai-act-in-tandem.html"
 },
 "F-0729": {
  "t": "CRA reporting obligations: is your organisation ready for 11 September?",
  "u": "https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/cra-reporting-obligations-is-your-organisation-ready-for-11-september/"
 },
 "F-0730": {
  "t": "European Union: Protecting trade secrets under the Data Act",
  "u": "https://www.bakermckenzie.com/en/insight/publications/2026/10/european-union-protecting-trade-secrets-under-the-data-act"
 },
 "F-0731": {
  "t": "Factory-X – a sovereign data room for mechanical and industrial engineering",
  "u": "https://www.iosb.fraunhofer.de/en/projects-and-products/factory-x.html"
 },
 "F-0732": {
  "t": "Data spaces: First implementation for small and medium-sized enterprises",
  "u": "https://www.telekom.com/en/newsroom/latest-updates/media-information/2025/3/data-spaces-first-implementation-for-small-and-medium-sized-ent"
 },
 "F-0734": {
  "t": "Reglamento (UE) 2023/1781 (Ley Europea de Chips)",
  "u": "https://eur-lex.europa.eu/eli/reg/2023/1781/oj/eng"
 },
 "F-0735": {
  "t": "When chips run short: the crisis regime of the Chips Act 2.0",
  "u": "https://www.freshfields.com/en/our-thinking/briefings/2026/08/when-chips-run-short-the-crisis-regime-of-the-chips-act-2.0"
 },
 "F-0736": {
  "t": "Strengthening Cybersecurity in Industrial Data Rooms (Semiconductor-X)",
  "u": "https://www.aisec.fraunhofer.de/en/media/press-releases/2026/semiconductor-x.html"
 },
 "F-0737": {
  "t": "BIS announces $252.5 million settlement with Applied Materials over alleged export violations",
  "u": "https://www.arnoldporter.com/en/perspectives/advisories/2026/03/bis-announces-252-5-million-settlement-with-applied-materials-over-alleged"
 },
 "F-0738": {
  "t": "Cadence Design Systems to pay $95 million penalty to BIS for unauthorized exports to Chinese entities",
  "u": "https://www.bis.gov/press-release/cadence-design-systems-pay-95-million-penalty-bis-unauthorized-exports-chinese-entities-tied-development"
 },
 "F-0739": {
  "t": "New EU rules for durable, energy-efficient and repairable smartphones and tablets start applying",
  "u": "https://single-market-economy.ec.europa.eu/news/new-eu-rules-durable-energy-efficient-and-repairable-smartphones-and-tablets-start-applying-2025-06-20_en"
 },
 "F-0740": {
  "t": "CPR 2024 revision",
  "u": "https://single-market-economy.ec.europa.eu/sectors/construction/construction-products-regulation-cpr/cpr-2024-revision_en"
 },
 "F-0741": {
  "t": "Digital Product Passports for Construction: what the EU's 2026–2029 CPR working plan means for stakeholders",
  "u": "https://cobuilder.com/en/digital-product-passport-dpp/digital-product-passports-for-construction-what-the-eus-2026-2029-cpr-working-plan-means-for-stakeholders/"
 },
 "F-0742": {
  "t": "Directiva (UE) 2024/1275 relativa a la eficiencia energética de los edificios (refundición)",
  "u": "https://eur-lex.europa.eu/eli/dir/2024/1275"
 },
 "F-0743": {
  "t": "A framework for digital building logbooks: drivers of affordable, circular and sustainable built environment",
  "u": "https://www.bpie.eu/wp-content/uploads/2026/08/A-framework-for-digital-building-logbooks-Drivers-of-affordable-circular-and-sustainable-built-environment.pdf"
 },
 "F-0744": {
  "t": "Data Space Technology Leaders Advance Data Interoperability in Construction and Real Estate at the Gaia-X Summit (Digital TER-X)",
  "u": "https://www.businesswire.com/news/home/20251119158245/en"
 },
 "F-0745": {
  "t": "Orden PCM/818/2023 por la que se aprueba el Plan de incorporación de la metodología BIM en la contratación pública",
  "u": "https://www.boe.es/boe/dias/2023/07/20/pdfs/BOE-A-2023-16784.pdf"
 },
 "F-0746": {
  "t": "La contratación pública BIM supone ya más de 15.000 millones de euros en infraestructuras y edificaciones",
  "u": "https://www.interempresas.net/Construccion/593818-contratacion-publica-BIM-supone-ya-mas-15000-millones-euros-infraestructuras-edificaciones.html"
 },
 "F-0747": {
  "t": "New EU rules to stop the destruction of unsold clothes and shoes",
  "u": "https://environment.ec.europa.eu/news/new-eu-rules-stop-destruction-unsold-clothes-and-shoes-2026-02-09_en"
 },
 "F-0748": {
  "t": "Revised Waste Framework Directive enters into force to boost circularity",
  "u": "https://transition-pathways.europa.eu/textiles/legislative-developments/revised-waste-framework-directive-enters-force-boost-circularity"
 },
 "F-0749": {
  "t": "EU Parliament approves new measures on textile waste: what manufacturers, retailers and e-commerce sellers need to know",
  "u": "https://cms.law/en/esp/legal-updates/eu-parliament-approves-new-measures-on-textile-waste-what-manufacturers-retailers-and-e-commerce-sellers-need-to-know"
 },
 "F-0750": {
  "t": "Comunicado de prensa PS12709 (Shein, green claims)",
  "u": "https://en.agcm.it/en/media/press-releases/2025/8/PS12709"
 },
 "F-0751": {
  "t": "Trace4Value: piloting digital product passports for textile value chains",
  "u": "https://www.edie.net/case-study/trace4value-piloting-for-digital-product-passports-dpps-for-textile-value-chains/"
 },
 "F-0752": {
  "t": "Digital platform improves circularity for textile industries (TRICK)",
  "u": "https://cordis.europa.eu/article/id/453727-digital-platform-improves-circularity-for-textile-industries"
 },
 "F-0755": {
  "t": "Ley 1/2025, de 1 de abril, de prevención de las pérdidas y el desperdicio alimentario",
  "u": "https://www.boe.es/boe/dias/2025/04/02/pdfs/BOE-A-2025-6597.pdf"
 },
 "F-0756": {
  "t": "AICA sanciones 2025: balance",
  "u": "https://www.agronewscastillayleon.com/aica-sanciones-2025-balance"
 },
 "F-0757": {
  "t": "New waste rules set to enhance circularity in the textile sector and reduce food waste",
  "u": "https://transition-pathways.europa.eu/textiles/news/new-waste-rules-set-enhance-circularity-textile-sector-and-reduce-food-waste"
 },
 "F-0758": {
  "t": "Data & Trends of the European Food and Drink Industry 2026",
  "u": "https://www.fooddrinkeurope.eu/resource/data-trends-of-the-european-food-and-drink-industry-2026/"
 },
 "F-0759": {
  "t": "Interoperable Traceability in Agrifood Supply Chains: Enhancing Transport Systems Through IoT Sensor Data, Blockchain, and DataSpace",
  "u": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12158375/"
 },
 "F-0761": {
  "t": "Guidance to support preparations for the digital batteries passport",
  "u": "https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en?prefLang=it"
 },
 "F-0762": {
  "t": "Path cleared for the battery passport (DIN DKE SPEC 99100)",
  "u": "https://din.de/en/din-and-our-partners/press/press-releases/path-cleared-for-the-battery-passport-1197480"
 },
 "F-0763": {
  "t": "Battery Passport Content Guidance",
  "u": "https://en.acatech.de/publication/battery-passport-content-guidance/"
 },
 "F-0765": {
  "t": "JRC study in support of developing Carbon Footprint rules of batteries",
  "u": "https://eplca.jrc.ec.europa.eu/EU_BatteryRegulation_Art7.html"
 },
 "F-0766": {
  "t": "New rules boost recycling efficiency of waste batteries",
  "u": "https://environment.ec.europa.eu/news/new-rules-boost-recycling-efficiency-waste-batteries-2025-07-04_en"
 },
 "F-0767": {
  "t": "Global EV Outlook 2026 – Electric vehicle batteries",
  "u": "https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-batteries"
 },
 "F-0768": {
  "t": "Battery Pass Consortium publishes technical guidance (nota de prensa)",
  "u": "https://www.ipk.fraunhofer.de/content/dam/ipk/IPK_Hauptseite/dokumente/medieninformationen/PM_EN_Press%20Release_Battery%20Pass%20Consortium%20Publishes%20Technical%20Guidance_fnl.pdf"
 },
 "F-0785": {
  "t": "Resumen: mercado interior de la electricidad (Directiva (UE) 2019/944)",
  "u": "https://eur-lex.europa.eu/EN/legal-content/summary/1_internal-market-for-electricity.html"
 },
 "F-0786": {
  "t": "Reglamento de Ejecución (UE) 2023/1162 sobre interoperabilidad y acceso a datos de medición y consumo",
  "u": "https://eur-lex.europa.eu/eli/reg_impl/2023/1162/oj"
 },
 "F-0787": {
  "t": "New network code on cybersecurity for the EU electricity sector (Reglamento Delegado (UE) 2024/1366)",
  "u": "https://energy.ec.europa.eu/news/new-network-code-cybersecurity-eu-electricity-sector-2024-03-11_en"
 },
 "F-0788": {
  "t": "REMIT breaches: Spanish energy regulator fines Gesternova SA €6 million and Axpo Iberia €1.5 million for electricity market manipulation",
  "u": "https://www.acer.europa.eu/news/remit-breaches-spanish-energy-regulator-fines-gesternova-sa-eu6-million-and-axpo-iberia-eu15-million-electricity-market-manipulation"
 },
 "F-0789": {
  "t": "Confirmada la sanción de 500.000 euros a una empresa del Grupo Iberdrola",
  "u": "https://www.economistjurist.es/noticias-juridicas/confirmada-la-sancion-de-500-000-euros-a-una-empresa-del-grupo-iberdrola/"
 },
 "F-0790": {
  "t": "Digitalisation of the energy system (EU Action Plan COM(2022) 552)",
  "u": "https://energy.ec.europa.eu/topics/eus-energy-system/digitalisation-energy-system_en"
 },
 "F-0791": {
  "t": "OMEGA-X: Orchestrating an interoperable sovereign federated multi-vector energy data space ready for Gaia-X",
  "u": "https://cordis.europa.eu/project/id/101069287"
 },
 "F-0792": {
  "t": "e.DSO success cases: i-DE, e-distribución, UFD, E-Redes — Datadis",
  "u": "https://www.edsoforsmartgrids.eu/content/uploads/2025/10/50.2025_e.dso-success-cases_i-de-e-distribucion-ufd-e-redes_datadis.pdf"
 },
 "F-0794": {
  "t": "REMIT breach: Spanish energy regulator fines Enérgya VM Gestión de Energía €1 million for gas market manipulation",
  "u": "https://acer.europa.eu/news/remit-breach-spanish-energy-regulator-fines-energya-vm-gestion-de-energia-eu1-million-gas-market-manipulation"
 },
 "F-0795": {
  "t": "REMIT breach: Italian energy regulator ARERA fines Enet Energy SA €940,000 for gas market manipulation",
  "u": "https://www.acer.europa.eu/news-and-events/news/remit-breach-italian-energy-regulator-arera-fines-enet-energy-sa-eu940000-gas-market-manipulation"
 },
 "F-0796": {
  "t": "REMIT Infographic 2024",
  "u": "https://www.acer.europa.eu/sites/default/files/documents/en/remit/Documents/Web_REMIT_Infographic_2024.pdf"
 },
 "F-0797": {
  "t": "Uncertain Times for the EU Methane Regulation",
  "u": "https://www.orrick.com/en/Insights/2026/06/Uncertain-times-for-the-EU-Methane-Regulation"
 },
 "F-0799": {
  "t": "Union Database for liquid and gaseous renewable and recycled carbon fuels",
  "u": "https://energy.ec.europa.eu/topics/renewable-energy/bioenergy/biofuels/union-database-liquid-and-gaseous-renewable-and-recycled-carbon-fuels_en"
 },
 "F-0801": {
  "t": "Hydrogen and decarbonised gas market package",
  "u": "https://energy.ec.europa.eu/topics/markets-and-consumers/market-legislation/hydrogen-and-decarbonised-gas-market-package_en"
 },
 "F-0802": {
  "t": "PC_2024_G_10 – Public consultation on draft statutory documents of the European Network of Network Operators for Hydrogen (ENNOH)",
  "u": "https://acer.europa.eu/public-consultation/pc2024g10-public-consultation-draft-statutory-documents-european-network-network-operators-hydrogen"
 },
 "F-0803": {
  "t": "Comunicación de la Comisión C/2025/3699 (orientaciones sobre el art. 20a de la Directiva (UE) 2018/2001 modificada: intercambio de datos de baterías)",
  "u": "https://eur-lex.europa.eu/eli/C/2025/3699/oj"
 },
 "F-0804": {
  "t": "Don't pull the plug on battery data: possible amendment of Article 20a(3) of the Renewable Energy Directive",
  "u": "https://www.chargeupeurope.eu/positions/dont-pull-the-plug-on-battery-data-possible-amendment-of-article-20a3-of-the-renewable-energy-directive"
 },
 "F-0805": {
  "t": "All EU MS except Denmark failed to transpose Renewable Directive (May 2025)",
  "u": "https://www.enerdata.net/publications/daily-energy-news/all-eu-ms-except-denmark-failed-transpose-renewable-directive-may-2025.html"
 },
 "F-0806": {
  "t": "Restrict remote access of PV inverters from high-risk vendors",
  "u": "https://esmc.solar/restrict-remote-access-of-pv-inverters-from-high-risk-vendors/"
 },
 "F-0807": {
  "t": "EU identifies solar inverters as 'high-risk' in new Security Doctrine",
  "u": "https://www.pv-tech.org/eu-identifies-solar-inverters-as-high-risk-in-new-security-doctrine/"
 },
 "F-0809": {
  "t": "Solar self-consumption in Spain reaches 9.3 GW of installed capacity",
  "u": "https://www.unef.es/en/comunicacion/comunicacion-post/solar-self-consumption-in-spain-reaches-93-gw-of-installed-capacity"
 },
 "F-0810": {
  "t": "El autoconsumo generó 12.387 GWh en 2025, aportando el 7,7 % de la producción renovable en España",
  "u": "https://forbes.es/economia/897152/el-autoconsumo-genero-12-387-gwh-en-2025-aportando-el-77-de-la-produccion-renovable-en-espana/"
 },
 "F-0812": {
  "t": "Directiva (UE) 2024/3019 sobre el tratamiento de las aguas residuales urbanas (refundición)",
  "u": "https://eur-lex.europa.eu/eli/dir/2024/3019/oj"
 },
 "F-0813": {
  "t": "Urban wastewater treatment from 2027 (resumen)",
  "u": "https://eur-lex.europa.eu/EN/legal-content/summary/urban-wastewater-treatment-from-2027.html"
 },
 "F-0814": {
  "t": "European Union: Extended Producer Responsibility for pharmaceutical and cosmetic companies",
  "u": "https://insightplus.bakermckenzie.com/bm/consumer-goods-retail_1/european-union-extended-producer-responsibility-for-pharmaceutical-and-cosmetic-companies"
 },
 "F-0815": {
  "t": "EU wastewater directive deadline nears as quaternary funding faces court challenge",
  "u": "https://smartwatermagazine.com/news/newsroom/eu-wastewater-directive-deadline-nears-as-quaternary-funding-faces-court-challenge"
 },
 "F-0816": {
  "t": "España lleva 87 millones de multa por depurar mal sus aguas residuales y tiene juicios pendientes",
  "u": "https://www.eldiario.es/sociedad/espana-lleva-87-millones-multa-depurar-mal-aguas-residuales-pendientes-juicios_1_11427516.html"
 },
 "F-0818": {
  "t": "El Tribunal europeo condena a España por incumplir con el tratamiento de las aguas residuales urbanas en Canarias",
  "u": "https://rtvc.es/tribunal-europeo-espana-tratamiento-aguas-residuales-urbanas-canarias-18-diciembre-2025/"
 },
 "F-0819": {
  "t": "WATERVERSE – Water Data Management Ecosystem for Water Data Spaces",
  "u": "https://cordis.europa.eu/project/id/101070262"
 },
 "F-0820": {
  "t": "ENISA NIS360 2026: progress across the board, but the sectors that matter most are still falling short",
  "u": "https://securityaffairs.com/193002/reports/enisa-nis360-2026-progress-across-the-board-but-the-sectors-that-matter-most-are-still-falling-short.html"
 },
 "F-0821": {
  "t": "New Waste Shipment Regulation and DIWASS platform go live",
  "u": "https://environment.ec.europa.eu/news/new-waste-shipment-regulation-and-diwass-platform-go-live-2026-05-21_en"
 },
 "F-0823": {
  "t": "The EU Packaging and Packaging Waste Regulation: when will it come into effect and what does it cover?",
  "u": "https://circulareconomy.europa.eu/platform/en/news-and-events/all-news/eu-packaging-and-packaging-waste-regulation-when-will-it-come-effect-and-what-does-it-cover"
 },
 "F-0825": {
  "t": "Real Decreto 764/2026, de 30 de septiembre, por el que se regula el Registro de producción y gestión de residuos",
  "u": "https://www.boe.es/boe/dias/2026/10/01/pdfs/BOE-A-2026-20388.pdf"
 },
 "F-0827": {
  "t": "Ley 7/2022, de 8 de abril, de residuos y suelos contaminados para una economía circular",
  "u": "https://www.boe.es/eli/es/l/2022/04/08/7"
 },
 "F-0828": {
  "t": "Onto-DESIDE – Ontology-based Decentralized Sharing of Industry Data in the European Circular Economy",
  "u": "https://cordis.europa.eu/project/id/101058682/reporting"
 },
 "F-0830": {
  "t": "Real Decreto 1054/2022, de 27 de diciembre, por el que se establece y regula el Sistema de información de explotaciones agrícolas y ganaderas (SIEX) y el cuaderno digital de explotación",
  "u": "https://boe.es/boe/dias/2022/12/29/pdfs/BOE-A-2022-23054.pdf"
 },
 "F-0831": {
  "t": "El Gobierno aprueba la norma que establece la voluntariedad del cuaderno digital de explotación",
  "u": "https://www.mapa.gob.es/va/prensa/ultimas-noticias/detalle_noticias/el-gobierno-aprueba-la-norma-que-establece-la-voluntariedad-del-cuaderno-digital-de-explotacion-/85e7decb-3fc6-4b0e-899c-22dfee522c37"
 },
 "F-0832": {
  "t": "EU Code of conduct on agricultural data sharing by contractual agreement",
  "u": "https://www.cema-agri.org/images/publications/brochures/EU_Code_of_conduct_on_agricultural_data_sharing_by_contractual_agreement_2020_ENGLISH.pdf"
 },
 "F-0833": {
  "t": "Sharing agricultural data from tractor to server: understanding the Agdatahub experience",
  "u": "https://gaia-x.eu/sharing-agricultural-data-from-tractor-to-server-understanding-the-agdatahub-experience/"
 },
 "F-0834": {
  "t": "Smart agriculture / Data exchange in agriculture (Gaia-X use cases)",
  "u": "https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Artikel/Digital-World/GAIA-X-Use-Cases/smart-agriculture-data-exchange-in-agriculture.html"
 },
 "F-0835": {
  "t": "ILVO kicks off the first transnational agrifood data space",
  "u": "https://ilvo.vlaanderen.be/en/news/first-transnational-agrifood-data-space"
 },
 "F-0836": {
  "t": "Common European Agricultural Data Space (CEADS)",
  "u": "https://www.ruokavirasto.fi/en/themes/scientific-research/scientific-projects/current/common-european-agricultural-data-space-ceads/"
 },
 "F-0837": {
  "t": "Agri-food Data Space Interoperability (buenas prácticas)",
  "u": "https://agrospai.udl.cat/ca/docs/good-practices/interoperability/"
 },
 "F-0838": {
  "t": "Convocatoria de ayudas para demostradores y casos de uso de espacios de datos – sector agroalimentario",
  "u": "https://portalayudas.digital.gob.es/Programa_Espacios_Datos_Sectoriales/Documents/Convocatoria-Agro.pdf"
 },
 "F-0839": {
  "t": "Control regulation",
  "u": "https://oceans-and-fisheries.ec.europa.eu/fisheries/rules/enforcing-rules/control-regulation_en"
 },
 "F-0840": {
  "t": "The EU fisheries control system gets a major revamp",
  "u": "https://blue-economy-observatory.ec.europa.eu/news/eu-fisheries-control-system-gets-major-revamp-2024-02-15_en"
 },
 "F-0841": {
  "t": "New digital certification system to tackle illegal fishing",
  "u": "https://oceans-and-fisheries.ec.europa.eu/news/new-digital-certification-system-tackle-illegal-fishing-2026-01-12_en"
 },
 "F-0843": {
  "t": "Global Fishing Watch calls for EU to follow Norway's lead in sharing VMS data",
  "u": "https://www.seafoodsource.com/news/environment-sustainability/global-fishing-watch-calls-for-eu-to-follow-norway-s-lead-in-sharing-vms-data"
 },
 "F-0845": {
  "t": "EU fish market report 2025 reflects challenging market conditions",
  "u": "https://oceans-and-fisheries.ec.europa.eu/news/eu-fish-market-report-2025-reflects-challenging-market-conditions-2025-12-01_en"
 },
 "F-0847": {
  "t": "After the EU rejection of the Forest Monitoring Law, European cooperation continues",
  "u": "https://www.slu.se/en/news/2025/11/after-the-eu-rejection-of-the-forest-monitoring-law--european-cooperation-continues/"
 },
 "F-0848": {
  "t": "Refusing to see the forest: Europe's data crisis threatens restoration goals",
  "u": "https://www.fern.org/publications-insight/article/refusing-to-see-the-forest-europes-data-crisis-threatens-restoration-goals/"
 },
 "F-0852": {
  "t": "Forest and Wood 4.0 data room: sustainability redefined through AI",
  "u": "https://www.materna.de/en/newshub/blog/sustainability/forest-and-wood-40-data-room-sustainability-redefined-through-ai/"
 },
 "F-0853": {
  "t": "SINTETIC – Single item identification for forest production, protection and management",
  "u": "https://cordis.europa.eu/project/id/101082051"
 },
 "F-0857": {
  "t": "Reglamento (UE) 2020/1056 sobre información electrónica relativa al transporte de mercancías (eFTI)",
  "u": "https://eur-lex.europa.eu/eli/reg/2020/1056/oj"
 },
 "F-0858": {
  "t": "eFTI Regulation (página temática)",
  "u": "https://transport.ec.europa.eu/transport-themes/logistics-and-multimodal-transport/efti-regulation_en"
 },
 "F-0859": {
  "t": "Reglamento de Ejecución (UE) 2024/1942: procedimientos de acceso de las autoridades a la información eFTI",
  "u": "https://eur-lex.europa.eu/eli/reg_impl/2024/1942/oj"
 },
 "F-0860": {
  "t": "Towards paperless freight transport: EU takes step forward on eFTI Regulation implementation",
  "u": "https://transport.ec.europa.eu/news-events/news/towards-paperless-freight-transport-eu-takes-step-forward-efti-regulation-implementation-2025-01-09_en"
 },
 "F-0861": {
  "t": "Electronic Freight Transport Information – eFTI Regulation (EU) 2020/1056 (presentación de L. Potec)",
  "u": "https://www.etp-logistics.eu/wp-content/uploads/2023/03/Electronic-Freight-Transport-Information-eFTI-Regulation-EU-20201056-Lia-Potec-24-March-2023.pdf"
 },
 "F-0862": {
  "t": "European Commission imposes record fines on truck producers after cartel settlement",
  "u": "https://cms.law/en/gbr/legal-updates/european-commission-imposes-record-fines-on-truck-producers-after-cartel-settlement"
 },
 "F-0863": {
  "t": "Statement on the decision to fine Scania in the trucks cartel (STATEMENT/17/3509)",
  "u": "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/statement_17_3509/STATEMENT_17_3509_EN.pdf"
 },
 "F-0864": {
  "t": "Comunicación COM(2023) 751 sobre la creación de un espacio común europeo de datos de movilidad",
  "u": "https://transport.ec.europa.eu/system/files/2023-11/COM_2023_751.pdf"
 },
 "F-0865": {
  "t": "Webinar sobre el espacio común europeo de datos de movilidad (EMDS): diapositivas",
  "u": "https://data.europa.eu/sites/default/files/course/Slides%20EMDS%20webinar.pdf"
 },
 "F-0866": {
  "t": "Creating a common European mobility data space",
  "u": "https://transport.ec.europa.eu/transport-themes/smart-mobility/creating-common-european-mobility-data-space_en"
 },
 "F-0867": {
  "t": "Completion of PrepDSpace4Mobility",
  "u": "https://digital-strategy.ec.europa.eu/en/news/completion-prepdspace4mobility"
 },
 "F-0868": {
  "t": "Presentación sobre el EMDS (F. Santiago, Comisión Europea) en evento de ERA",
  "u": "https://www.era.europa.eu/sites/default/files/agenda/presentations/7.%20slides%20speaker%20fidel%20santiago.pdf"
 },
 "F-0869": {
  "t": "Mobility data (política)",
  "u": "https://digital-strategy.ec.europa.eu/en/policies/mobility-data"
 },
 "F-0870": {
  "t": "Mobility Data Space",
  "u": "https://www.bmv.de/SharedDocs/EN/Articles/G/mobility-data-space.html"
 },
 "F-0871": {
  "t": "Mobilithek",
  "u": "https://www.bmv.de/SharedDocs/EN/Articles/G/mobilithek.html"
 },
 "F-0872": {
  "t": "Data drives mobility forward",
  "u": "https://www.telekom.com/en/newsroom/latest-updates/news/2021/10/data-drives-mobility-forward"
 },
 "F-0873": {
  "t": "Ley 9/2025, de 3 de diciembre, de Movilidad Sostenible",
  "u": "https://www.boe.es/eli/es/l/2025/12/03/9"
 },
 "F-0874": {
  "t": "Transportes avanza en la creación del Espacio de Datos Integrado de Movilidad (EDIM)",
  "u": "https://forbes.es/economia/901647/transportes-avanza-en-la-creacion-del-espacio-de-datos-integrado-de-movilidad-edim/"
 },
 "F-0875": {
  "t": "Reglamento (UE) 2019/1239 por el que se establece un entorno europeo de ventanilla única marítima (EMSWe)",
  "u": "https://eur-lex.europa.eu/eli/reg/2019/1239/oj"
 },
 "F-0876": {
  "t": "European Maritime Single Window environment",
  "u": "https://transport.ec.europa.eu/transport-modes/maritime/eu-wide-digital-maritime-system-and-services/european-maritime-single-window-environment_en"
 },
 "F-0878": {
  "t": "Single window for ship data exchange to become mandatory under FAL treaty amendments",
  "u": "https://www.porttechnology.org/news/smart-technologies-and-digitalisation/single-window-for-ship-data-exchange-to-become-mandatory-under-fal-treaty-amendments/"
 },
 "F-0879": {
  "t": "FuelEU Maritime: full application 1 January 2025",
  "u": "https://www.emsa.europa.eu/newsroom/latest-news/item/5385-fueleu-maritime-full-application-1-january-2025.html"
 },
 "F-0880": {
  "t": "NotPetya ransomware attack cost us $300m – shipping giant Maersk",
  "u": "https://www.theregister.co.uk/2017/08/16/notpetya_ransomware_attack_cost_us_300m_says_shipping_giant_maersk"
 },
 "F-0881": {
  "t": "Turning seaports into smart ports (DataPorts)",
  "u": "https://projects.research-and-innovation.ec.europa.eu/en/projects/success-stories/all/turning-seaports-smart-ports"
 },
 "F-0882": {
  "t": "Puente destaca el impulso inversor a los puertos del Estado, con 7.000 millones de euros hasta 2029",
  "u": "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/transportes-movilidad-sostenible/Paginas/2026/030326-puente-inversion-puertos-estado.aspx"
 },
 "F-0883": {
  "t": "Reglamento (UE) 2026/1184 sobre la utilización de la capacidad de infraestructura ferroviaria en el espacio ferroviario europeo único",
  "u": "https://eur-lex.europa.eu/eli/reg/2026/1184/oj"
 },
 "F-0884": {
  "t": "Commission welcomes political agreement on new rules to optimise the use of rail capacity",
  "u": "https://transport.ec.europa.eu/news-events/news/commission-welcomes-political-agreement-new-rules-optimise-use-rail-capacity-2025-11-19_en"
 },
 "F-0885": {
  "t": "Reglamento (UE) 2021/782 sobre los derechos y obligaciones de los viajeros de ferrocarril",
  "u": "https://eur-lex.europa.eu/eli/reg/2021/782/oj"
 },
 "F-0886": {
  "t": "Rail transport: passengers to enjoy better protection and smoother travel experience",
  "u": "https://transport.ec.europa.eu/news-events/news/rail-transport-passengers-enjoy-better-protection-and-smoother-travel-experience-2023-06-07_en"
 },
 "F-0888": {
  "t": "Revision of the TAP/TAF TSI to the new TSI Telematics: what next?",
  "u": "https://cit-rail.org/en/cit-news/article/205/revision-of-the-taptaf-tsi-to-the-new-tsi-telematics-what-next/"
 },
 "F-0889": {
  "t": "Renfe ofrece acceso a terceros a sus datos en tiempo real para evitar una multa de la Comisión Europea",
  "u": "https://www.cronista.com/espana/actualidad-es/renfe-ofrece-acceso-a-terceros-a-sus-datos-en-tiempo-real-para-evitar-una-multa-de-la-comision-europea"
 },
 "F-0890": {
  "t": "Defensa de la competència: la Comissió obre una investigació sobre possibles pràctiques contràries a la competència de Renfe",
  "u": "https://barcelona.spain.representation.ec.europa.eu/noticies-i-esdeveniments/noticies/defensa-de-la-competencia-la-comissio-obre-una-investigacio-sobre-possibles-practiques-contraries-la-2023-04-28-0_ca"
 },
 "F-0891": {
  "t": "Information Commissioner fines British Airways plc £20 million in relation to its 2018 data breach",
  "u": "https://www.twobirds.com/en/news/articles/2020/global/information-commissioner-fines-british-airways-plc-20-million-in-relation-to-its-2018-data-breach"
 },
 "F-0893": {
  "t": "FAQ ReFuelEU Aviation",
  "u": "https://transport.ec.europa.eu/transport-modes/air/environment/refueleu-aviation/faq-refueleu-aviation_en"
 },
 "F-0894": {
  "t": "Reglamento (UE) 2025/13 sobre la recogida y transferencia de información anticipada sobre pasajeros (API) para prevenir delitos de terrorismo y delitos graves",
  "u": "https://eur-lex.europa.eu/eli/reg/2025/13/oj"
 },
 "F-0895": {
  "t": "New legal framework on collection and transmission of advance passenger information for law enforcement purposes",
  "u": "https://eucrim.eu/news/new-legal-framework-on-collection-and-transmission-of-advance-passenger-information-for-law-enforcement-purposes/"
 },
 "F-0897": {
  "t": "Additional Member States and first airports join EASA's award-winning Data4Safety programme",
  "u": "https://www.easa.europa.eu/en/newsroom-and-events/press-releases/additional-member-states-and-first-airports-join-easas-award"
 },
 "F-0898": {
  "t": "Los aeropuertos del Grupo Aena superan los 384,8 millones de pasajeros en 2025",
  "u": "https://www.aena.es/es/prensa/los-aeropuertos-del-grupo-aena-superan-los-3848-millones-de-pasajeros---en-2025.html"
 },
 "F-0899": {
  "t": "78% of European internet users bought online in 2025",
  "u": "https://ecommercenews.eu/78-of-european-internet-users-bought-online-in-2025/"
 },
 "F-0900": {
  "t": "Datos de comercio electrónico del 3T 2025",
  "u": "https://cnmc.es/prensa/datos-comercio-electronico-3T-2025-20260424"
 },
 "F-0901": {
  "t": "Commission finds Apple and Meta in breach of the Digital Markets Act",
  "u": "https://digital-markets-act.ec.europa.eu/commission-finds-apple-and-meta-breach-digital-markets-act-2025-04-23_en?prefLang=it"
 },
 "F-0902": {
  "t": "Commission preliminarily finds Temu in breach of the Digital Services Act in relation to illegal products on its marketplace",
  "u": "https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-temu-breach-digital-services-act-relation-illegal-products-its"
 },
 "F-0903": {
  "t": "Hamburg Commissioner Fines H&M 35.3 Million Euro for Data Protection Violations in Service Centre",
  "u": "https://edpb.europa.eu/news/national-news/2020/hamburg-commissioner-fines-hm-353-million-euro-data-protection-violations_it"
 },
 "F-0904": {
  "t": "New rules to stop destruction of unsold clothes and shoes enter into application",
  "u": "https://transition-pathways.europa.eu/textiles/news/new-rules-stop-destruction-unsold-clothes-and-shoes-enter-application-fostering-eu"
 },
 "F-0905": {
  "t": "Sustainable Retail: Navigating the ESPR and Ban on Destruction of Unsold Consumer Goods",
  "u": "https://enterprise.gov.ie/en/publications/publication-files/sustainable-retail-navigating-the-espr.pdf"
 },
 "F-0906": {
  "t": "Digital Product Passports – CIRPASS-2",
  "u": "https://www.digitaleurope.org/projects/digital-product-passports-cirpass-2/"
 },
 "F-0911": {
  "t": "Reglamento (UE) 2024/903 sobre medidas para un alto nivel de interoperabilidad del sector público (Interoperable Europe Act)",
  "u": "https://eur-lex.europa.eu/eli/reg/2024/903/"
 },
 "F-0912": {
  "t": "Reglamento de Ejecución (UE) 2023/138: lista de conjuntos de datos de alto valor",
  "u": "https://eur-lex.europa.eu/eli/reg_impl/2023/138/oj"
 },
 "F-0913": {
  "t": "High-value datasets best practices in Europe",
  "u": "https://data.europa.eu/en/publications/reports/high-value-datasets-best-practices-europe"
 },
 "F-0914": {
  "t": "Data Act explained",
  "u": "https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained"
 },
 "F-0915": {
  "t": "Data access for public sector bodies (Data Act, Capítulo V)",
  "u": "https://bundesnetzagentur.de/EN/Areas/Digitalisation/DataAct/background/5-Access/start.html"
 },
 "F-0916": {
  "t": "About OOTS – Once-Only Technical System",
  "u": "https://ec.europa.eu/digital-building-blocks/wikis/display/OOTS/About+OOTS"
 },
 "F-0917": {
  "t": "Sancionado un ayuntamiento por la cesión a un tercero de un documento sin la seudonimización de los datos personales",
  "u": "https://derecholocal.es/criterio-novedoso/sancionado-un-ayuntamiento-por-la-cesion-a-un-tercero-de-un-documento-sin-la-seudonimizacion-de-los-datos-personales"
 },
 "F-0918": {
  "t": "La AEPD y las sanciones a administraciones públicas",
  "u": "https://www.legiscope.com/blog/aepd-sanciones-administraciones-publicas.html"
 },
 "F-0919": {
  "t": "E-government services used by 72% of people in the EU",
  "u": "https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260312-1"
 },
 "F-0920": {
  "t": "Denmark bans Chromebooks and Google Workspace in schools over data transfer risks",
  "u": "https://techcrunch.com/2022/07/18/denmark-bans-chromebooks-and-google-workspace-in-schools-over-gdpr/embed/"
 },
 "F-0921": {
  "t": "Sanción por el uso de Google Workspace for Education a un centro educativo",
  "u": "https://www.ecija.com/actualidad-insights/sancion-por-el-uso-de-google-workspace-for-education-a-un-centro-educativo/"
 },
 "F-0922": {
  "t": "Multan con 10.000 euros a un colegio de Madrid por crear un correo electrónico sin consentimiento",
  "u": "https://www.xatakandroid.com/sociedad/colegio-madrid-crea-correo-electronico-a-alumna-consentimiento-padres-le-ha-caido-multa-10-000-euros"
 },
 "F-0923": {
  "t": "European Digital Credentials for Learning",
  "u": "https://europass.europa.eu/en/european-digital-credentials-learning"
 },
 "F-0924": {
  "t": "Data Space for Skills kicked off to develop open and trusted ecosystem for skills data sharing",
  "u": "https://www.digitaleurope.org/news/data-space-for-skills-kicked-off-develop-open-and-trusted-ecosystem-for-skills-data-sharing/"
 },
 "F-0925": {
  "t": "Data Space for Skills (deployment)",
  "u": "https://pact-for-skills.ec.europa.eu/stakeholders-and-business/funding-opportunities/data-space-skills-deployment_en"
 },
 "F-0926": {
  "t": "Rules for trustworthy artificial intelligence in the EU (resumen del AI Act)",
  "u": "https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence-in-the-eu.html"
 },
 "F-0927": {
  "t": "EU Node: first digital gateway of the European Open Science Cloud goes live",
  "u": "https://digital-strategy.ec.europa.eu/en/news/eu-node-first-digital-gateway-european-open-science-cloud-goes-live"
 },
 "F-0928": {
  "t": "EOSC Federation scales up with endorsement of 14 new candidate nodes",
  "u": "https://eosc.eu/news/eosc-federation-scales-up-with-endorsement-of-14-new-candidate-nodes"
 },
 "F-0929": {
  "t": "Guidelines 1/2026 on processing of personal data for scientific research purposes",
  "u": "https://www.edpb.europa.eu/system/files/2026-04/edpb_guidelines_202601_scientificresearch_en.pdf"
 },
 "F-0930": {
  "t": "EDPB guidelines on processing personal data for scientific research: key takeaways",
  "u": "https://www.hoganlovells.com/en/publications/edpb-guidelines-on-processing-personal-data-for-scientific-research-key-takeaways"
 },
 "F-0931": {
  "t": "Horizon Europe open science requirements (Model Grant Agreement)",
  "u": "https://www.oecd.org/en/publications/access-to-public-research-data-toolkit_a12e8998-en/horizon-europe-open-science-requirements-model-grant-agreement_c0bb3832-en.html"
 },
 "F-0932": {
  "t": "Sanciones de la AEPD en el sector educativo",
  "u": "https://www.legiscope.com/blog/aepd-sanciones-educacion.html"
 },
 "F-0933": {
  "t": "Cyber-attack on the Pontifical University of Salamanca",
  "u": "https://incibe.es/en/incibe-cert/publications/cybersecurity-highlights/cyber-attack-pontifical-university-salamanca"
 },
 "F-0934": {
  "t": "TU/e hacker turns out to be one of the world's largest",
  "u": "https://www.cursor.tue.nl/en/news/2026/januari/week-3/tu-e-hacker-turns-out-to-be-one-of-the-worlds-largest"
 },
 "F-0935": {
  "t": "Reglamento (UE) 2024/1028 sobre la recogida y el intercambio de datos relativos a los servicios de alquiler de alojamientos de corta duración",
  "u": "https://eur-lex.europa.eu/eli/reg/2024/1028/oj"
 },
 "F-0936": {
  "t": "Short-term rentals: EU transparency rules now in force",
  "u": "https://transition-pathways.europa.eu/construction/news-publications/short-term-rentals-eu-transparency-rules-now-force"
 },
 "F-0937": {
  "t": "Comunicación «Towards a Common European Tourism Data Space» (2023/C 263/01)",
  "u": "https://transition-pathways.europa.eu/system/files/2024-09/Communication%20from%20the%20commission%20towards%20a%20common%20European%20Tourism%20Data%20Space.pdf"
 },
 "F-0938": {
  "t": "DEPLOYTOUR: new project for the future European tourism data space",
  "u": "https://data.europa.eu/en/news-events/news/deploytour-new-project-future-european-tourism-data"
 },
 "F-0940": {
  "t": "El registro de datos personales en establecimientos hoteleros",
  "u": "https://www.cuatrecasas.com/es/spain/propiedad-intelectual/art/registro-datos-personales-establecimientos-hoteleros"
 },
 "F-0941": {
  "t": "Marriott Hotels Fined £18.4m For Data Breach That Hit Millions",
  "u": "https://www.hospitalitynet.org/news/4101453.html"
 },
 "F-0943": {
  "t": "The European Media Freedom Act becomes applicable",
  "u": "https://merlin.obs.coe.int/article/10391"
 },
 "F-0944": {
  "t": "EBU and 42 organizations launch Trusted European Media Data Space (TEMS) consortium",
  "u": "https://www.tech.ebu.ch/news/2023/10/ebu-and-42-organizations-launch-trusted-european-data-space-tems-consortium"
 },
 "F-0945": {
  "t": "Trusted European Media Data Space (TEMS): our new project shaping the future of the media industry",
  "u": "https://www.capdigital.com/en/trusted-european-media-data-space-tems-our-new-project-shaping-the-future-of-the-media-industry/"
 },
 "F-0946": {
  "t": "Copyright compliance under the EU AI Act for GPAI model providers",
  "u": "https://www.cliffordchance.com/insights/resources/blogs/ip-insights/2025/10/copyright-compliance-under-the-eu-ai-act-for-gpai-model-providers.html"
 },
 "F-0947": {
  "t": "Rapport de la mission flash sur le modèle de résumé des données d'entraînement (versión inglesa)",
  "u": "https://www.culture.gouv.fr/Media/medias-creation-rapide/cspla_report_ia-template_english_dec._2024.pdf"
 },
 "F-0948": {
  "t": "Irish Data Protection Commission fines TikTok €530 million and orders corrective measures following inquiry into transfers of EEA user data to China",
  "u": "https://www.dataprotection.ie/news-media/latest-news/irish-data-protection-commission-fines-tiktok-eu530-million-and-orders-corrective-measures-following"
 },
 "F-0949": {
  "t": "Recomendación (UE) 2021/1970 relativa a un espacio común europeo de datos para el patrimonio cultural",
  "u": "https://eur-lex.europa.eu/eli/reco/2021/1970/oj/eng"
 },
 "F-0950": {
  "t": "European Commission proposes a common European data space for cultural heritage",
  "u": "https://ne-mo.org/news-events/article/european-commission-proposes-a-common-european-data-space-for-cultural-heritage"
 },
 "F-0951": {
  "t": "EU report calls on Member States to accelerate digitisation of cultural heritage",
  "u": "https://digital-strategy.ec.europa.eu/en/news/eu-report-calls-member-states-accelerate-digitisation-cultural-heritage"
 },
 "F-0952": {
  "t": "Twin it! Call to action: boosting 3D for Europe's culture by 2030",
  "u": "https://pro.europeana.eu/post/twin-it-call-to-action-boosting-3d-for-europe-s-culture-by-2030"
 },
 "F-0953": {
  "t": "Derecho de imagen sobre bienes culturales y acceso al dominio público",
  "u": "https://www.cuatrecasas.com/es/spain/propiedad-intelectual/art/derecho-imagen-sobre-bienes-culturales-acceso-dominio-publico"
 },
 "F-0954": {
  "t": "Article 14 and the public domain: the state of play across Europe",
  "u": "https://leuven2012.europeana.eu/post/article-14-and-the-public-domain-the-state-of-play-across-europe"
 },
 "F-0955": {
  "t": "Reglamento (UE) 2024/1689 de inteligencia artificial (AI Act)",
  "u": "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng/xhtml"
 },
 "F-0956": {
  "t": "Provvedimento del Garante nei confronti di OpenAI (ChatGPT), doc. web 10085432",
  "u": "https://www.garanteprivacy.it/home/docweb/-/docweb-display/print/10085432"
 },
 "F-0957": {
  "t": "OpenAI faces €15 million fine as the Italian Garante strikes again",
  "u": "https://www.lewissilkin.com/insights/2025/01/14/openai-faces-15-million-fine-as-the-italian-garante-strikes-again-102jtqc"
 },
 "F-0958": {
  "t": "European Cloud Providers' Local Market Share Now Holds Steady at 15%",
  "u": "https://srgresearch.com/articles/european-cloud-providers-local-market-share-now-holds-steady-at-15"
 },
 "F-0959": {
  "t": "PaaS, IaaS or SaaS? Be aware: new switching rules will become applicable in the EU",
  "u": "https://www.cooley.com/news/insight/2025/2025-09-08-paas-iaas-or-saas-be-aware-new-switching-rules-will-become-applicable-in-eu"
 },
 "F-0960": {
  "t": "Cloud exit under the EU Data Act",
  "u": "https://www.dlapiper.com/en/insights/publications/law-in-tech/2026/cloud-exit-under-the-eu-data-act"
 },
 "F-0961": {
  "t": "Commission awards €41 million contract to develop infrastructure for common European data spaces (Simpl)",
  "u": "https://digital-strategy.ec.europa.eu/fr/news/commission-awards-eu41-million-contract-develop-infrastructure-common-european-data-spaces"
 },
 "F-0962": {
  "t": "Commission calls on 19 Member States to fully transpose the NIS2 Directive",
  "u": "https://digital-strategy.ec.europa.eu/en/news/commission-calls-19-member-states-fully-transpose-nis2-directive"
 },
 "F-0964": {
  "t": "NIS2 en España: estado de la transposición",
  "u": "https://www.legiscope.com/blog/nis2-espana-transposicion.html"
 },
 "F-0965": {
  "t": "The CRA Single Reporting Platform is launched",
  "u": "https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched"
 },
 "F-0966": {
  "t": "CRA reporting obligations",
  "u": "https://digital-strategy.ec.europa.eu/en/policies/cra-reporting"
 },
 "F-0967": {
  "t": "ETL 2025: EU consistently targeted by diverse yet convergent threat groups",
  "u": "https://www.enisa.europa.eu/news/etl-2025-eu-consistently-targeted-by-diverse-yet-convergent-threat-groups"
 },
 "F-0968": {
  "t": "ENISA Threat Landscape: Public Administration 2024",
  "u": "https://www.enisa.europa.eu/sites/default/files/2025-11/ENISA%20Public%20Administration%20TL%202024.pdf"
 },
 "F-0969": {
  "t": "Public Procurement Data Space (PPDS)",
  "u": "https://single-market-economy.ec.europa.eu/single-market/public-procurement/digital-procurement/public-procurement-data-space-ppds_en"
 },
 "F-0970": {
  "t": "Communication on the Public Procurement Data Space (PPDS)",
  "u": "https://public-buyers-community.ec.europa.eu/resources/communication-public-procurement-data-space-ppds"
 },
 "F-0971": {
  "t": "Public Procurement Data Space (presentación en el taller de reutilizadores de TED)",
  "u": "https://op.europa.eu/documents/d/ted-reusers-workshops/public-procurement-data-space"
 },
 "F-0972": {
  "t": "Europe's public procurement data space: unlocking transparency and better spending",
  "u": "https://data.europa.eu/en/news-events/news/europes-public-procurement-data-space-unlocking-transparency-and-better-spending"
 },
 "F-0973": {
  "t": "La CNMC sanciona a siete empresas por repartirse contratos públicos de suministro de alimentos",
  "u": "https://cnmc.es/prensa/sancionador-suministro-alimentos-20240716"
 },
 "F-0974": {
  "t": "La CNMC multa a cuatro agencias de viajes por coordinarse en licitaciones públicas",
  "u": "https://cnmc.es/prensa/multa-agencias-viajes-20251229?back=news"
 },
 "F-0975": {
  "t": "EU Platform Work Directive: Which countries have implemented?",
  "u": "https://www.iuslaboris.com/insights/eu-platform-work-directive-which-countries-have-implemented/"
 },
 "F-0976": {
  "t": "From gig to guarantee: how the EU is transforming platform work",
  "u": "https://cms.law/en/int/legal-updates/from-gig-to-guarantee-how-the-eu-is-transforming-platform-work"
 },
 "F-0977": {
  "t": "EU regulates digital platform work: an Iberian perspective",
  "u": "https://www.cuatrecasas.com/en/global/labor-and-employment/art/eu-regulates-digital-platform-work-iberian-perspective"
 },
 "F-0978": {
  "t": "Rider, Garante privacy: no all'algoritmo incontestabile dai lavoratori",
  "u": "https://www.garanteprivacy.it/garante/doc.jsp?ID=10074840"
 },
 "F-0979": {
  "t": "Italy: privacy authority fines Foodinho 5 million euro for rider data breaches",
  "u": "https://apps.eurofound.europa.eu/platformeconomydb/italy-privacy-authority-fines-foodinho-5-million-euro-for-rider-data-breaches-110198"
 },
 "F-0980": {
  "t": "AI Act, Annex III: High-risk AI systems",
  "u": "https://artificialintelligenceact.eu/annex/3/"
 }
};

window.SECTOR_GROUPS = {"health": {"en": "Health", "es": "Salud"}, "finance": {"en": "Finance & services", "es": "Finanzas y servicios"}, "industry": {"en": "Industry", "es": "Industria"}, "energy": {"en": "Energy, environment & agri-food", "es": "Energía, medio ambiente y agro"}, "mobility": {"en": "Mobility, logistics & retail", "es": "Movilidad, logística y comercio"}, "public": {"en": "Public sector & digital", "es": "Sector público y digital"}};

(function () {
  var html = document.documentElement;
  function lang() { return html.getAttribute("data-lang") === "es" ? "es" : "en"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
  var TXT = {
    en: { search: "Search a sector…", prep: "Analysis in preparation", prepLong: "We are completing the regulatory analysis for this sector. Book a meeting if you need it now.", ch: "Regulatory challenges when sharing data", why: "Why it needs a data space", regs: "Regulations", src: "Sources", close: "Close", none: "No sector matches your search.", shown: " sectors shown", regShown: " regulations shown", book: "Book a meeting" },
    es: { search: "Buscar un sector…", prep: "Análisis en preparación", prepLong: "Estamos completando el análisis normativo de este sector. Reserve una reunión si lo necesita ya.", ch: "Retos normativos al compartir datos", why: "Por qué necesita un espacio de datos", regs: "Reglamentos", src: "Fuentes", close: "Cerrar", none: "Ningún sector coincide con su búsqueda.", shown: " sectores visibles", regShown: " reglamentos visibles", book: "Reservar reunión" }
  };
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  /* ---------- regulation filters ---------- */
  var regBtns = document.querySelectorAll("#regulations [data-filter]");
  function filterRegs(f) {
    var n = 0;
    document.querySelectorAll("#regulations .reg").forEach(function (c) {
      var show = f === "all" || (" " + c.dataset.cat + " ").indexOf(" " + f + " ") > -1;
      c.hidden = !show; if (show) n++;
    });
    regBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.filter === f ? "true" : "false"); });
    var live = document.getElementById("reg-count"); if (live) live.textContent = n + TXT[lang()].regShown;
  }
  regBtns.forEach(function (b) { b.addEventListener("click", function () { filterRegs(b.dataset.filter); }); });

  /* ---------- sector explorer ---------- */
  var S = window.SECTORS || [], G = window.SECTOR_GROUPS || {};
  var grid = document.getElementById("sec-grid"), panel = document.getElementById("sec-panel");
  var input = document.getElementById("sec-search");
  var state = { group: "all", q: "", open: null };
  function byId(id) { for (var i = 0; i < S.length; i++) if (S[i].id === id) return S[i]; return null; }

  function renderGrid() {
    if (!grid) return;
    if (panel && panel.parentNode !== grid.parentNode) grid.parentNode.insertBefore(panel, grid.nextSibling);
    var l = lang(), q = norm(state.q), out = [], n = 0;
    S.forEach(function (s) {
      var name = (s.name && s.name[l]) || "";
      var hay = norm(s.id + " " + s.name.en + " " + s.name.es + " " + (s.regs || []).join(" "));
      if (state.group !== "all" && s.group !== state.group) return;
      if (q && hay.indexOf(q) < 0) return;
      n++;
      var ready = s.challenges && s.challenges[l] && s.challenges[l].length;
      out.push('<li><button type="button" class="sec-card g-' + s.group + (state.open === s.id ? " is-open" : "") + '" data-id="' + s.id + '" aria-controls="sec-panel" aria-expanded="' + (state.open === s.id) + '">' +
        '<span class="sec-id">' + s.id + '</span><span class="sec-name">' + esc(name) + '</span>' +
        '<span class="sec-grp">' + esc((G[s.group] || {})[l] || "") + '</span>' +
        (ready ? "" : '<span class="sec-prep">' + TXT[l].prep + '</span>') + '</button></li>');
    });
    grid.innerHTML = out.length ? out.join("") : '<li class="sec-none">' + TXT[l].none + '</li>';
    var live = document.getElementById("sec-count"); if (live) live.textContent = n + TXT[l].shown;
  }
  function list(arr) { return "<ul class=\"checks sm\">" + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function renderPanel(focus) {
    if (!panel) return;
    var s = byId(state.open);
    if (!s) { panel.hidden = true; panel.innerHTML = ""; return; }
    var l = lang(), t = TXT[l];
    var ready = s.challenges && s.challenges[l] && s.challenges[l].length;
    var h = '<div class="sp-head"><div><span class="sec-id">' + s.id + ' · ' + esc((G[s.group] || {})[l] || "") + '</span><h3>' + esc(s.name[l]) + '</h3></div>' +
            '<button type="button" class="sp-close" aria-label="' + t.close + '">×</button></div>';
    if (s.tagline && s.tagline[l]) h += '<p class="sp-tagline">' + esc(s.tagline[l]) + '</p>';
    if (!ready) {
      h += '<div class="sp-prep"><span class="tag gold">' + t.prep + '</span><p>' + t.prepLong + '</p>' +
           '<a class="btn btn-navy" href="#contact">' + t.book + '</a></div>';
    } else {
      h += '<div class="sp-body"><div><h4>' + t.ch + '</h4>' + list(s.challenges[l]) + '</div>' +
           '<div><h4>' + t.why + '</h4>' + list((s.why && s.why[l]) || []) + '</div></div>';
      if (s.example && s.example[l]) h += '<div class="sp-example"><strong>' + (l === "es" ? "Caso o dato" : "Case or figure") + '</strong> ' + esc(s.example[l]) + '</div>';
      if (s.regs && s.regs.length) h += '<h4>' + t.regs + '</h4><p class="sp-tags">' + s.regs.map(function (r) { return '<span class="tag navy">' + esc(r) + '</span>'; }).join(" ") + '</p>';
      if (s.sources && s.sources.length) h += '<h4>' + t.src + '</h4><p class="sp-src">' + s.sources.map(function (f) { var x = (window.SOURCES_SECTORS || {})[f]; return x && x.u ? '<a class="fn-chip" href="' + esc(x.u) + '" target="_blank" rel="noopener" title="' + esc(x.t || "") + '">' + esc(f) + '</a>' : '<span class="fn-chip">' + esc(f) + '</span>'; }).join(" ") + '</p>';
    }
    panel.innerHTML = h; panel.hidden = false;
    /* place the panel right after the row of the selected card */
    var btn = grid.querySelector('[data-id="' + s.id + '"]');
    if (btn) {
      var li = btn.parentNode, top = li.offsetTop, last = li, n = li.nextElementSibling;
      while (n && n.offsetTop === top) { last = n; n = n.nextElementSibling; }
      var holder = document.createElement("li"); holder.className = "sec-panel-li";
      last.parentNode.insertBefore(holder, last.nextSibling); holder.appendChild(panel);
    }
    if (focus) { panel.focus({ preventScroll: true }); panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }
  if (grid) {
    grid.addEventListener("click", function (e) {
      var b = e.target.closest(".sec-card"); if (!b) return;
      state.open = state.open === b.dataset.id ? null : b.dataset.id;
      renderGrid(); renderPanel(!!state.open);
    });
    if (panel) panel.addEventListener("click", function (e) {
      if (e.target.closest(".sp-close")) {
        var id = state.open; state.open = null; renderGrid(); renderPanel(false);
        var b = grid.querySelector('[data-id="' + id + '"]'); if (b) b.focus();
      }
    });
    document.querySelectorAll("#sectors [data-group]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.group = b.dataset.group;
        document.querySelectorAll("#sectors [data-group]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        renderGrid();
      });
    });
    if (input) input.addEventListener("input", function () { state.q = input.value; renderGrid(); });
    renderGrid();
  }

  /* ---------- language changes ---------- */
  function onLang() {
    if (input) input.placeholder = TXT[lang()].search;
    renderGrid(); renderPanel(false);
  }
  new MutationObserver(onLang).observe(html, { attributes: true, attributeFilter: ["data-lang"] });
  onLang();

  /* ---------- sources: open the list when a note is followed ---------- */
  function openSrc(hash) {
    if (!hash || hash.indexOf("#src-") !== 0) return;
    var d = document.getElementById("src-details"), el = document.getElementById(hash.slice(1));
    if (d && el) { d.open = true; el.classList.add("hit"); setTimeout(function () { el.classList.remove("hit"); }, 2000); el.scrollIntoView({ block: "center" }); }
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#src-"]'); if (a) { setTimeout(function () { openSrc(a.getAttribute("href")); }, 0); }
    var m = e.target.closest(".mnav-list a"); if (m) { var d = m.closest("details"); if (d) d.open = false; }
  });
  window.addEventListener("hashchange", function () { openSrc(location.hash); });
  openSrc(location.hash);

  /* ---------- timeline scroll buttons ---------- */
  var tl = document.querySelector(".tl-scroll");
  document.querySelectorAll(".tl-btn").forEach(function (b) {
    b.addEventListener("click", function () { tl.scrollBy({ left: +b.dataset.dir * Math.round(tl.clientWidth * 0.8), behavior: "smooth" }); });
  });
})();
