export interface Ticket {
  id: number;
  title: string;
  type: 'VIP' | 'Premium' | 'Standard';
  price: number;
  isUsed: boolean;
  purchaseDate: string;
  eventDate: string;
  venue: string;
  artist: string;
  section: string;
  row: string;
  seat: string;
  description: string;
  features: string[];
  notes: {
    id: number;
    author: string;
    content: string;
    createdAt: string;
  }[];
}

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "DWP 2025 - VIP Access",
    type: "VIP",
    price: 299.99,
    isUsed: false,
    purchaseDate: "2025-07-15",
    eventDate: "2025-08-31T20:00:00Z",
    venue: "JIExpo Kemayoran, Jakarta",
    artist: "Various Artists",
    section: "A",
    row: "1",
    seat: "15",
    description: "VIP access to Djakarta Warehouse Project 2025 with exclusive viewing area and complimentary drinks.",
    features: ["Express Entry", "VIP Lounge", "Meet & Greet", "Free Drinks"],
    notes: [
      {
        id: 1,
        author: "System",
        content: "Ticket activated and ready for use",
        createdAt: "2025-07-15"
      }
    ]
  },
  {
    id: 2,
    title: "DWP 2025 - Premium Pass",
    type: "Premium",
    price: 199.99,
    isUsed: false,
    purchaseDate: "2025-07-20",
    eventDate: "2025-08-31T20:00:00Z",
    venue: "JIExpo Kemayoran, Jakarta",
    artist: "Various Artists",
    section: "B",
    row: "3",
    seat: "42",
    description: "Premium access to Djakarta Warehouse Project 2025 with priority entry and premium viewing areas.",
    features: ["Priority Entry", "Premium Area", "Merchandise Pack"],
    notes: []
  },
  {
    id: 3,
    title: "DWP 2025 - Standard Entry",
    type: "Standard",
    price: 99.99,
    isUsed: true,
    purchaseDate: "2025-07-25",
    eventDate: "2025-08-31T20:00:00Z",
    venue: "JIExpo Kemayoran, Jakarta",
    artist: "Various Artists",
    section: "C",
    row: "10",
    seat: "78",
    description: "Standard entry ticket to Djakarta Warehouse Project 2025.",
    features: ["General Admission"],
    notes: [
      {
        id: 1,
        author: "Staff",
        content: "Ticket has been scanned and used",
        createdAt: "2025-08-01"
      }
    ]
  },
  {
    id: 4,
    title: "Coldplay World Tour - VIP",
    type: "VIP",
    price: 350.00,
    isUsed: false,
    purchaseDate: "2025-06-10",
    eventDate: "2025-09-15T19:30:00Z",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    artist: "Coldplay",
    section: "Gold",
    row: "2",
    seat: "7",
    description: "VIP ticket for Coldplay's Music of the Spheres World Tour in Jakarta.",
    features: ["VIP Entry", "Merchandise Pack", "Early Access", "Premium Viewing"],
    notes: []
  },
  {
    id: 5,
    title: "Coldplay World Tour - Premium",
    type: "Premium",
    price: 250.00,
    isUsed: false,
    purchaseDate: "2025-06-15",
    eventDate: "2025-09-15T19:30:00Z",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    artist: "Coldplay",
    section: "Silver",
    row: "5",
    seat: "22",
    description: "Premium seating for Coldplay's Music of the Spheres World Tour in Jakarta.",
    features: ["Premium Seating", "Fast Track Entry"],
    notes: []
  },
  {
    id: 6,
    title: "Coldplay World Tour - Standard",
    type: "Standard",
    price: 150.00,
    isUsed: false,
    purchaseDate: "2025-06-20",
    eventDate: "2025-09-15T19:30:00Z",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    artist: "Coldplay",
    section: "Bronze",
    row: "15",
    seat: "45",
    description: "Standard admission to Coldplay's Music of the Spheres World Tour in Jakarta.",
    features: ["General Admission"],
    notes: []
  },
  {
    id: 7,
    title: "Taylor Swift Eras Tour - VIP",
    type: "VIP",
    price: 400.00,
    isUsed: false,
    purchaseDate: "2025-05-05",
    eventDate: "2025-10-20T19:00:00Z",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    artist: "Taylor Swift",
    section: "Diamond",
    row: "1",
    seat: "10",
    description: "VIP package for Taylor Swift's Eras Tour in Jakarta with exclusive merchandise and early entry.",
    features: ["VIP Package", "Early Entry", "Exclusive Merch", "Premium Viewing"],
    notes: []
  },
  {
    id: 8,
    title: "Taylor Swift Eras Tour - Premium",
    type: "Premium",
    price: 275.00,
    isUsed: false,
    purchaseDate: "2025-05-10",
    eventDate: "2025-10-20T19:00:00Z",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    artist: "Taylor Swift",
    section: "Platinum",
    row: "4",
    seat: "30",
    description: "Premium seating for Taylor Swift's Eras Tour in Jakarta.",
    features: ["Premium Seating", "Tour Program"],
    notes: []
  },
  {
    id: 9,
    title: "Taylor Swift Eras Tour - Standard",
    type: "Standard",
    price: 175.00,
    isUsed: true,
    purchaseDate: "2025-05-15",
    eventDate: "2025-10-20T19:00:00Z",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    artist: "Taylor Swift",
    section: "Gold",
    row: "20",
    seat: "55",
    description: "Standard admission to Taylor Swift's Eras Tour in Jakarta.",
    features: ["General Admission"],
    notes: [
      {
        id: 1,
        author: "System",
        content: "Ticket transferred from original purchaser",
        createdAt: "2025-07-01"
      }
    ]
  },
  {
    id: 10,
    title: "Ed Sheeran Mathematics Tour - VIP",
    type: "VIP",
    price: 300.00,
    isUsed: false,
    purchaseDate: "2025-04-20",
    eventDate: "2025-11-05T20:00:00Z",
    venue: "Sentul International Convention Center, Bogor",
    artist: "Ed Sheeran",
    section: "Front",
    row: "2",
    seat: "15",
    description: "VIP experience for Ed Sheeran's Mathematics Tour with soundcheck access and exclusive merchandise.",
    features: ["Soundcheck Access", "VIP Merchandise", "Priority Entry"],
    notes: []
  }
];

export function getTicketById(id: number): Ticket | undefined {
  return tickets.find(ticket => ticket.id === id);
}
