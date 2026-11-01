export interface Reel {
  slug: string;
  title: string;
  format: string;
  ratio: string;
  duration: string;
}
export interface Campaign {
  id: string;
  name: string;
  category: string;
  title: string;
  description: string;
  deliverables: string[];
  reels: Reel[];
  link: string;
  linkLabel: string;
}
export const CAMPAIGNS: Campaign[] = [
  {
    id: "babay-dee",
    name: "Babay Dee Atta Chakki",
    category: "Food & everyday essentials",
    title: "Everyday goods. A fresh perspective.",
    description:
      "A launch story and a product-led film that bring the store’s flour, pulses, spices and pantry essentials into the feed. Made to connect everyday shopping with the online store.",
    deliverables: [
      "Website launch film",
      "Product storytelling",
      "Motion & typography",
    ],
    link: "https://babaydeeattachakki.com/",
    linkLabel: "Explore the store",
    reels: [
      {
        slug: "babay-dee-product-story",
        title: "A single grain. A whole story.",
        format: "Product showcase",
        ratio: "4 / 5",
        duration: "25 sec",
      },
      {
        slug: "babay-dee-launch",
        title: "A little goodness. Now online.",
        format: "Website launch",
        ratio: "9 / 16",
        duration: "24 sec",
      },
    ],
  },
  {
    id: "cielo-noir",
    name: "Cielo Noir",
    category: "Fashion & culture",
    title: "From the collection to the feed.",
    description:
      "Three distinct fashion films: a product spotlight, a website launch and a graphic motion study. Each gives the clothing its own rhythm while keeping the brand recognisable.",
    deliverables: ["Product spotlight", "Launch campaign", "Graphic motion"],
    link: "https://cielonoir.com/",
    linkLabel: "Visit Cielo Noir",
    reels: [
      {
        slug: "cielo-noir-bomber",
        title: "The Bomber.",
        format: "Product spotlight",
        ratio: "9 / 16",
        duration: "24 sec",
      },
      {
        slug: "cielo-noir-launch",
        title: "A new destination.",
        format: "Collection launch",
        ratio: "9 / 16",
        duration: "24 sec",
      },
      {
        slug: "cielo-noir-motion",
        title: "Cut. Shape. Form.",
        format: "Brand motion",
        ratio: "4 / 5",
        duration: "24 sec",
      },
    ],
  },
  {
    id: "devops",
    name: "DevOps Services",
    category: "Studio & digital craft",
    title: "A studio, set in motion.",
    description:
      "Our own launch films turn development, interfaces and creative ideas into short visual stories. A look at how we introduce a digital service through movement.",
    deliverables: ["Studio launch", "Website teaser", "Interface animation"],
    link: "/case-studies/devops-services",
    linkLabel: "Read the case study",
    reels: [
      {
        slug: "devops-launch",
        title: "Good ideas. Unfair advantage.",
        format: "Studio launch",
        ratio: "9 / 16",
        duration: "24 sec",
      },
      {
        slug: "devops-websites-teaser",
        title: "Behind the next website.",
        format: "Website teaser",
        ratio: "4 / 5",
        duration: "20 sec",
      },
    ],
  },
  {
    id: "soban",
    name: "Muhammad Soban",
    category: "Personal brand",
    title: "Put a name to the work.",
    description:
      "A personal portfolio launch built around the developer, the projects and the craft. Editorial typography and interface sequences introduce the person behind DevOps Services.",
    deliverables: [
      "Personal brand film",
      "Portfolio launch",
      "Kinetic typography",
    ],
    link: "https://muhammadsoban.vercel.app/",
    linkLabel: "Visit the portfolio",
    reels: [
      {
        slug: "soban-launch",
        title: "Meet the maker.",
        format: "Portfolio launch",
        ratio: "9 / 16",
        duration: "24 sec",
      },
    ],
  },
];
