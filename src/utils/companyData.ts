// Iowa Tech Companies with career page links
export interface Company {
  name: string;
  careerUrl: string;
  category: string;
}

export const IOWA_COMPANIES_WITH_LINKS: Company[] = [
  // Software & Tech Companies
  { name: 'Workiva', careerUrl: 'https://www.workiva.com/careers', category: 'Software' },
  { name: 'National Information Solutions Cooperative (NISC)', careerUrl: 'https://www.nisc.coop/careers', category: 'Software' },
  { name: 'Source Allies', careerUrl: 'https://sourceallies.com/careers', category: 'Software' },
  { name: 'P3 Uplift', careerUrl: 'https://www.p3uplift.com/careers', category: 'Software' },
  { name: 'Lean Techniques', careerUrl: 'https://www.leantechniques.com/careers', category: 'Software' },
  { name: 'Dwolla', careerUrl: 'https://www.dwolla.com/careers', category: 'Software' },
  { name: 'Roboflow', careerUrl: 'https://roboflow.com/careers', category: 'Software' },
  { name: 'Perficient', careerUrl: 'https://www.perficient.com/careers', category: 'Software' },
  { name: 'Buildertrend', careerUrl: 'https://buildertrend.com/careers', category: 'Software' },
  { name: 'Zirous', careerUrl: 'https://www.zirous.com/careers', category: 'Software' },
  { name: 'ProCircular', careerUrl: 'https://www.procircular.com/careers', category: 'Software' },
  { name: 'Pratum', careerUrl: 'https://www.intrust-it.com/careers', category: 'Software' },
  { name: 'Aureon', careerUrl: 'https://www.aureon.com/careers', category: 'Software' },

  // Aerospace & Defense
  { name: 'Collins Aerospace', careerUrl: 'https://careers.rtx.com/global/en/collins-aerospace', category: 'Aerospace' },
  { name: 'BAE Systems', careerUrl: 'https://jobs.baesystems.com', category: 'Aerospace' },

  // Agriculture & Manufacturing
  { name: 'John Deere', careerUrl: 'https://www.deere.com/en/our-company/john-deere-careers', category: 'Agriculture' },
  { name: 'Corteva Agriscience', careerUrl: 'https://careers.corteva.com', category: 'Agriculture' },
  { name: 'Kinze Manufacturing', careerUrl: 'https://www.kinze.com/careers', category: 'Agriculture' },
  { name: 'Vermeer Corporation', careerUrl: 'https://www.vermeer.com/na/careers', category: 'Agriculture' },

  // Financial Services & Insurance
  { name: 'Principal Financial Group', careerUrl: 'https://www.principal.com/about-us/careers', category: 'Financial' },
  { name: 'Wellmark', careerUrl: 'https://www.wellmark.com/about/careers', category: 'Financial' },
  { name: 'American Equity', careerUrl: 'https://www.american-equity.com/careers', category: 'Financial' },
  { name: 'EMC Insurance', careerUrl: 'https://www.emcins.com/careers', category: 'Financial' },
  { name: 'Grinnell Mutual', careerUrl: 'https://www.grinnellmutual.com/careers', category: 'Financial' },
  { name: 'Farm Bureau Financial Services', careerUrl: 'https://www.fbfs.com/careers', category: 'Financial' },
  { name: 'GuideOne Insurance', careerUrl: 'https://www.guideone.com/careers', category: 'Financial' },
  { name: 'Delta Dental of Iowa', careerUrl: 'https://www.deltadentalia.com/careers', category: 'Financial' },
  { name: 'SHAZAM', careerUrl: 'https://www.shazam.net/careers', category: 'Financial' },

  // Retail & Consumer
  { name: "Casey's General Stores", careerUrl: 'https://www.caseys.com/careers', category: 'Retail' },
  { name: 'Hy-Vee', careerUrl: 'https://www.hy-vee.com/careers', category: 'Retail' },
  { name: 'Kum & Go', careerUrl: 'https://www.kumandgo.com/careers', category: 'Retail' },
  { name: 'Pella Corporation', careerUrl: 'https://www.pella.com/careers', category: 'Retail' },

  // Healthcare
  { name: 'UnityPoint Health', careerUrl: 'https://www.unitypoint.org/careers', category: 'Healthcare' },
  { name: 'MercyOne', careerUrl: 'https://www.mercyone.org/careers', category: 'Healthcare' },

  // Energy & Utilities
  { name: 'MidAmerican Energy', careerUrl: 'https://www.midamericanenergy.com/careers', category: 'Energy' },
  { name: 'Alliant Energy', careerUrl: 'https://www.alliantenergy.com/careers', category: 'Energy' },

  // Consulting & Enterprise
  { name: 'Accenture', careerUrl: 'https://www.accenture.com/us-en/careers', category: 'Consulting' },
  { name: 'Deloitte', careerUrl: 'https://www2.deloitte.com/us/en/careers.html', category: 'Consulting' },
];

// Group companies by category
export function getCompaniesByCategory(): Record<string, Company[]> {
  const grouped: Record<string, Company[]> = {};

  for (const company of IOWA_COMPANIES_WITH_LINKS) {
    if (!grouped[company.category]) {
      grouped[company.category] = [];
    }
    grouped[company.category].push(company);
  }

  return grouped;
}
