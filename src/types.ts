export interface ResumeData {
  profile: {
    name: string;
    title: string;
    avatar: string;
    contact: Array<{ icon: string; label: string }>;
  };
  nav: Array<{ id: string; label: string }>;
  personal: {
    characteristics: string[];
    traits: string[];
  };
  education: Array<{
    school: string;
    period: string;
    degree: string;
    items: string[];
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  academic: {
    title: string;
    items: string[];
  };
  certificates: Array<{
    title: string;
    items: string[];
  }>;
  campus: Array<{
    title: string;
    period: string;
    position: string;
    items: string[];
  }>;
  experience: Array<{
    title: string;
    period: string;
    position: string;
    items: string[];
  }>;
  footer: {
    copyright: string;
    social: Array<{ icon: string; url: string; label: string }>;
  };
}
