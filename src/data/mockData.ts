export interface Hospital {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  acceptedInsurance: string[];
  image: string;
  distance?: string;
  departments: string[];
  doctors: Doctor[];
  description: string;
  phone: string;
  email: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  available: boolean;
  image: string;
}

export interface InsurancePlan {
  id: string;
  provider: string;
  planName: string;
  coverage: string;
  premium: string;
  benefits: string[];
  ageRange: string;
  logo: string;
  rating: number;
  popular?: boolean;
}

export const hospitals: Hospital[] = [
  {
    id: "1",
    name: "Apollo Multispeciality Hospital",
    location: "Jubilee Hills, Hyderabad",
    rating: 4.8,
    reviewCount: 1247,
    specializations: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
    acceptedInsurance: ["Star Health", "HDFC Ergo", "ICICI Lombard", "Max Bupa"],
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop",
    distance: "2.5 km",
    departments: ["Emergency", "Cardiology", "Neurology", "Orthopedics", "Oncology", "Pediatrics", "Dermatology"],
    description: "A premier multispecialty hospital offering world-class healthcare services with state-of-the-art infrastructure and internationally trained doctors.",
    phone: "+91 40 2345 6789",
    email: "info@apollohospital.com",
    doctors: [
      { id: "d1", name: "Dr. Priya Sharma", specialization: "Cardiologist", experience: "18 years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" },
      { id: "d2", name: "Dr. Rajesh Kumar", specialization: "Neurologist", experience: "15 years", rating: 4.7, available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face" },
      { id: "d3", name: "Dr. Anita Desai", specialization: "Orthopedic", experience: "12 years", rating: 4.8, available: false, image: "https://images.unsplash.com/photo-1594824476967-48c8b964f79e?w=150&h=150&fit=crop&crop=face" },
    ],
  },
  {
    id: "2",
    name: "Fortis Memorial Research Institute",
    location: "Gurgaon, Delhi NCR",
    rating: 4.7,
    reviewCount: 983,
    specializations: ["Oncology", "Cardiac Surgery", "Nephrology", "Gastroenterology"],
    acceptedInsurance: ["Star Health", "Bajaj Allianz", "New India Assurance", "HDFC Ergo"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    distance: "5.1 km",
    departments: ["Emergency", "Oncology", "Cardiac Surgery", "Nephrology", "Gastroenterology", "Urology"],
    description: "Recognized as one of the best hospitals in India, providing comprehensive healthcare with cutting-edge technology.",
    phone: "+91 124 4962 200",
    email: "info@fortishospital.com",
    doctors: [
      { id: "d4", name: "Dr. Vikram Patel", specialization: "Oncologist", experience: "20 years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face" },
      { id: "d5", name: "Dr. Meera Nair", specialization: "Nephrologist", experience: "14 years", rating: 4.6, available: true, image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&h=150&fit=crop&crop=face" },
    ],
  },
  {
    id: "3",
    name: "Medanta - The Medicity",
    location: "Sector 38, Gurgaon",
    rating: 4.6,
    reviewCount: 756,
    specializations: ["Heart Institute", "Bone & Joint", "Liver Transplant", "Robotics Surgery"],
    acceptedInsurance: ["ICICI Lombard", "Max Bupa", "Religare", "Star Health"],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
    distance: "8.3 km",
    departments: ["Heart Institute", "Bone & Joint", "Liver Transplant", "Robotics Surgery", "Neuroscience"],
    description: "An institution driven by the vision to provide world-class treatment at affordable costs, with emphasis on research and education.",
    phone: "+91 124 4141 414",
    email: "info@medanta.org",
    doctors: [
      { id: "d6", name: "Dr. Suresh Rao", specialization: "Cardiac Surgeon", experience: "25 years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face" },
      { id: "d7", name: "Dr. Kavita Singh", specialization: "Hepatologist", experience: "16 years", rating: 4.7, available: false, image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&h=150&fit=crop&crop=face" },
    ],
  },
  {
    id: "4",
    name: "Max Super Speciality Hospital",
    location: "Saket, New Delhi",
    rating: 4.5,
    reviewCount: 621,
    specializations: ["Spine Surgery", "IVF", "Bariatric Surgery", "Pulmonology"],
    acceptedInsurance: ["Max Bupa", "Star Health", "HDFC Ergo", "Bajaj Allianz"],
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
    distance: "3.7 km",
    departments: ["Spine Surgery", "IVF", "Bariatric Surgery", "Pulmonology", "Emergency", "Diagnostics"],
    description: "Committed to providing comprehensive, personalized and international quality healthcare.",
    phone: "+91 11 2651 5050",
    email: "info@maxhealthcare.com",
    doctors: [
      { id: "d8", name: "Dr. Amit Chandra", specialization: "Spine Surgeon", experience: "22 years", rating: 4.8, available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face" },
    ],
  },
];

export const insurancePlans: InsurancePlan[] = [
  {
    id: "i1",
    provider: "Star Health",
    planName: "Family Health Optima",
    coverage: "₹10 Lakh",
    premium: "₹12,500/year",
    benefits: ["Cashless at 14,000+ hospitals", "No co-payment", "Free annual health checkup", "Day care procedures covered"],
    ageRange: "18-65 years",
    logo: "⭐",
    rating: 4.5,
    popular: true,
  },
  {
    id: "i2",
    provider: "HDFC Ergo",
    planName: "Optima Secure",
    coverage: "₹15 Lakh",
    premium: "₹15,800/year",
    benefits: ["Restore benefit", "No room rent capping", "Organ donor expenses", "AYUSH treatment covered"],
    ageRange: "18-65 years",
    logo: "🏦",
    rating: 4.3,
  },
  {
    id: "i3",
    provider: "ICICI Lombard",
    planName: "Complete Health Insurance",
    coverage: "₹25 Lakh",
    premium: "₹18,200/year",
    benefits: ["Unlimited restore", "Global coverage", "Mental illness covered", "Air ambulance included"],
    ageRange: "18-70 years",
    logo: "🔷",
    rating: 4.6,
    popular: true,
  },
  {
    id: "i4",
    provider: "Max Bupa",
    planName: "Health Companion",
    coverage: "₹5 Lakh",
    premium: "₹8,500/year",
    benefits: ["Pre-existing disease cover after 3 years", "Maternity cover", "New-born baby cover", "Preventive health checkup"],
    ageRange: "18-60 years",
    logo: "💚",
    rating: 4.2,
  },
  {
    id: "i5",
    provider: "Bajaj Allianz",
    planName: "Health Guard",
    coverage: "₹20 Lakh",
    premium: "₹14,000/year",
    benefits: ["Cumulative bonus up to 100%", "Road ambulance cover", "Domiciliary hospitalization", "Automatic recharge"],
    ageRange: "18-65 years",
    logo: "🛡",
    rating: 4.4,
  },
  {
    id: "i6",
    provider: "New India Assurance",
    planName: "Arogya Sanjeevani",
    coverage: "₹5 Lakh",
    premium: "₹6,200/year",
    benefits: ["Government-backed", "Standard product across insurers", "Cataract treatment", "AYUSH treatment"],
    ageRange: "18-65 years",
    logo: "🇮🇳",
    rating: 4.0,
  },
];
