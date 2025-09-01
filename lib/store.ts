import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { User, Club, Transfer, Player, SupportRequest } from "./types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

interface TransferState {
  transfers: Transfer[]
  currentTransfer: Transfer | null
  loading: boolean
  error: string | null
  fetchTransfers: () => Promise<void>
  createTransfer: (transferData: any) => Promise<void>
  updateTransferStatus: (transferId: string, status: Transfer["status"], comment?: string) => Promise<void>
  setCurrentTransfer: (transfer: Transfer | null) => void
}

interface ClubState {
  clubs: Club[]
  currentClub: Club | null
  fetchClubs: () => Promise<void>
  setCurrentClub: (club: Club | null) => void
}

interface PlayerState {
  players: Player[]
  fetchPlayers: () => Promise<void>
  getPlayersByClub: (clubId: string) => Player[]
  addPlayer: (player: Omit<Player, "id">) => Promise<void>
}

interface PlayerSupportState {
  supportRequests: SupportRequest[]
  resources: any[]
  feedback: any[]
  loading: boolean
  error: string | null
  createSupportRequest: (request: Omit<SupportRequest, "id" | "submittedAt" | "updatedAt" | "status">) => Promise<void>
  updateSupportRequest: (id: string, updates: Partial<SupportRequest>) => Promise<void>
  fetchSupportRequests: () => Promise<void>
  submitFeedback: (feedback: any) => Promise<void>
}

// Mock data
const mockClubs: Club[] = [
  {
    id: "1",
    name: "Ampem Darkoa Ladies F.C.",
    zone: "Northern",
    region: "Bono East",
    founded: 2009,
    description:
      "One of Ghana's most successful women's football clubs, known for developing young talent and competing at the highest level.",
    stadium: "Techiman Park",
    coach: "Joe Nana Adarkwa",
    achievements: ["Ghana Women's Premier League Champions 2021", "WAFU Zone B Champions 2022"],
  },
  {
    id: "2",
    name: "Hasaacas Ladies",
    zone: "Southern",
    region: "Western",
    founded: 2003,
    description:
      "The most decorated women's football club in Ghana with multiple league titles and continental success.",
    stadium: "Gyandu Park",
    coach: "Yusif Basigi",
    achievements: ["CAF Women's Champions League Runners-up 2021", "Multiple Ghana Premier League titles"],
  },
  {
    id: "3",
    name: "Faith Ladies F.C.",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2021,
    description: "A rising force in Ghana women's football, focused on youth development and modern training methods.",
    stadium: "McDan La Town Park",
    coach: "Samuel Boadu",
    achievements: ["Ghana Women's FA Cup Finalists 2023"],
  },
  {
    id: "4",
    name: "Pearl Pia Ladies F.C.",
    zone: "Northern",
    region: "Northern",
    founded: 2015,
    description: "A club with a strong community presence and competitive spirit.",
    stadium: "Pia Stadium",
    coach: "Jane Doe",
    achievements: ["Ghana Women's Premier League Runner-up 2022"],
  },
  {
    id: "5",
    name: "Thunder Queens F.C.",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2010,
    description: "A club known for its aggressive playing style and passionate fans.",
    stadium: "Thunder Park",
    coach: "John Smith",
    achievements: ["WAFU Zone A Champions 2020"],
  },
  {
    id: "6",
    name: "Dreamz Ladies F.C.",
    zone: "Northern",
    region: "Ashanti",
    founded: 2020,
    description: "A club that emphasizes creativity and skill in its approach to football.",
    stadium: "Dreamz Stadium",
    coach: "Emily Johnson",
    achievements: ["Ghana Women's Premier League Finalists 2021"],
  },
  {
    id: "7",
    name: "Soccer Intellectuals Ladies F.C.",
    zone: "Southern",
    region: "Central",
    founded: 2012,
    description: "A club that values education and sportsmanship alongside football.",
    stadium: "Intellectuals Park",
    coach: "Michael Brown",
    achievements: ["Ghana Women's FA Cup Winners 2019"],
  },
  {
    id: "8",
    name: "Berry Ladies F.C.",
    zone: "Southern",
    region: "Greater Accra",
    founded: 2018,
    description: "A club that has been steadily improving and gaining recognition.",
    stadium: "Berry Park",
    coach: "Sarah White",
    achievements: ["Ghana Women's Premier League Semi-Finalists 2022"],
  },
]

const testAccounts = {
  clubAdmin: {
    id: "1",
    email: "admin@ampemdarkoaladies.com",
    name: "Ampem Darkoa Admin",
    role: "club_admin" as const,
    clubId: "1",
    createdAt: new Date(),
  },
  gfaReviewer: {
    id: "2",
    email: "reviewer@gfa.gov.gh",
    name: "GFA Reviewer",
    role: "gfa_reviewer" as const,
    clubId: null,
    createdAt: new Date(),
  },
  cafOfficial: {
    id: "3",
    email: "official@cafonline.com",
    name: "CAF Official",
    role: "caf_official" as const,
    clubId: null,
    createdAt: new Date(),
  },
  player: {
    id: "4",
    email: "comfort.yeboah@ampemdarkoaladies.com",
    name: "Comfort Yeboah",
    role: "player" as const,
    clubId: "1",
    playerId: "1",
    createdAt: new Date(),
  },
}

const mockUser: User = testAccounts.clubAdmin

const mockTransfers: Transfer[] = [
  {
    id: "1",
    playerId: "1",
    player: {
      id: "1",
      name: "Abena Serwaa",
      dateOfBirth: new Date("1995-03-15"),
      nationality: "Ghanaian",
      position: "Forward",
      currentClubId: "2",
    },
    fromClubId: "2",
    fromClub: mockClubs[1],
    toClubId: "1",
    toClub: mockClubs[0],
    type: "permanent",
    transferFee: 5000,
    status: "submitted",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    submittedBy: "1",
    documents: [],
    comments: [],
  },
  {
    id: "2",
    playerId: "2",
    player: {
      id: "2",
      name: "Akosua Mensah",
      dateOfBirth: new Date("1997-07-22"),
      nationality: "Ghanaian",
      position: "Midfielder",
      currentClubId: "3",
    },
    fromClubId: "3",
    fromClub: mockClubs[2],
    toClubId: "2",
    toClub: mockClubs[1],
    type: "loan",
    transferFee: 0,
    status: "under_review",
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    submittedBy: "3",
    documents: [],
    comments: [{ id: "1", text: "Please provide medical clearance", author: "GFA Reviewer", createdAt: new Date() }],
  },
  {
    id: "3",
    playerId: "3",
    player: {
      id: "3",
      name: "Efua Boateng",
      dateOfBirth: new Date("1999-11-08"),
      nationality: "Ghanaian",
      position: "Defender",
      currentClubId: "4",
    },
    fromClubId: "4",
    fromClub: mockClubs[3],
    toClubId: "5",
    toClub: mockClubs[4],
    type: "permanent",
    transferFee: 8000,
    status: "approved",
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    approvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    submittedBy: "4",
    documents: [],
    comments: [],
  },
]

const mockPlayers: Player[] = [
  // Ampem Darkoa Ladies players
  {
    id: "1",
    name: "Comfort Yeboah",
    dateOfBirth: new Date("1995-03-15"),
    nationality: "Ghanaian",
    position: "Forward",
    currentClubId: "1",
    jerseyNumber: 10,
    height: "165cm",
    weight: "58kg",
    passportId: "G1234567",
    image: "/female-footballer-portrait.png",
  },
  {
    id: "2",
    name: "Tracey Twum",
    dateOfBirth: new Date("1997-07-22"),
    nationality: "Ghanaian",
    position: "Midfielder",
    currentClubId: "1",
    jerseyNumber: 8,
    height: "162cm",
    weight: "55kg",
    passportId: "G2345678",
    image: "/female-footballer-midfielder.png",
  },
  {
    id: "3",
    name: "Ophelia Serwaa Amponsah",
    dateOfBirth: new Date("1999-11-08"),
    nationality: "Ghanaian",
    position: "Defender",
    currentClubId: "1",
    jerseyNumber: 4,
    height: "168cm",
    weight: "60kg",
    passportId: "G3456789",
    image: "/female-footballer-defender.png",
  },
  // Hasaacas Ladies players
  {
    id: "4",
    name: "Evelyn Badu",
    dateOfBirth: new Date("1996-05-12"),
    nationality: "Ghanaian",
    position: "Midfielder",
    currentClubId: "2",
    jerseyNumber: 6,
    height: "160cm",
    weight: "54kg",
    passportId: "G4567890",
    image: "/female-footballer-captain.png",
  },
  {
    id: "5",
    name: "Doris Boaduwaa",
    dateOfBirth: new Date("1998-09-18"),
    nationality: "Ghanaian",
    position: "Forward",
    currentClubId: "2",
    jerseyNumber: 9,
    height: "163cm",
    weight: "57kg",
    passportId: "G5678901",
    image: "/female-footballer-striker.png",
  },
  // Faith Ladies players
  {
    id: "6",
    name: "Janet Egyir",
    dateOfBirth: new Date("2000-01-25"),
    nationality: "Ghanaian",
    position: "Goalkeeper",
    currentClubId: "3",
    jerseyNumber: 1,
    height: "170cm",
    weight: "62kg",
    passportId: "G6789012",
    image: "/female-goalkeeper.png",
  },
]

const mockSupportRequests: SupportRequest[] = [
  {
    id: "1",
    playerId: "1",
    type: "medical",
    description: "Need medical clearance for upcoming match",
    status: "pending",
    priority: "high",
    preferredContact: ["doctor"],
    submittedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    playerId: "2",
    type: "supplies",
    description: "Request for new training gear",
    status: "in_progress",
    priority: "medium",
    preferredContact: ["welfare_officer"],
    submittedAt: new Date(),
    updatedAt: new Date(),
  },
]

// Auth Store
export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: mockUser,
      isAuthenticated: true,
      login: async (email: string, password: string) => {
        let user = testAccounts.clubAdmin
        if (email.includes("reviewer")) user = testAccounts.gfaReviewer
        if (email.includes("caf")) user = testAccounts.cafOfficial
        if (email.includes("comfort") || email.includes("player")) user = testAccounts.player

        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },
    }),
    { name: "auth-store" },
  ),
)

// Transfer Store
export const useTransferStore = create<TransferState>()(
  devtools(
    (set, get) => ({
      transfers: [],
      currentTransfer: null,
      loading: false,
      error: null,
      fetchTransfers: async () => {
        set({ loading: true })
        setTimeout(() => {
          set({
            transfers: mockTransfers,
            loading: false,
          })
        }, 500)
      },
      createTransfer: async (transferData: any) => {
        set({ loading: true })
        setTimeout(() => {
          set({ loading: false })
        }, 1000)
      },
      updateTransferStatus: async (transferId: string, status: Transfer["status"], comment?: string) => {
        const transfers = get().transfers
        const updatedTransfers = transfers.map((transfer) =>
          transfer.id === transferId ? { ...transfer, status, reviewedAt: new Date() } : transfer,
        )
        set({ transfers: updatedTransfers })
      },
      setCurrentTransfer: (transfer: Transfer | null) => {
        set({ currentTransfer: transfer })
      },
    }),
    { name: "transfer-store" },
  ),
)

// Club Store
export const useClubStore = create<ClubState>()(
  devtools(
    (set) => ({
      clubs: mockClubs,
      currentClub: mockClubs[0],
      fetchClubs: async () => {
        set({ clubs: mockClubs })
      },
      setCurrentClub: (club: Club | null) => {
        set({ currentClub: club })
      },
    }),
    { name: "club-store" },
  ),
)

// Player Store
export const usePlayerStore = create<PlayerState>()(
  devtools(
    (set, get) => ({
      players: mockPlayers,
      fetchPlayers: async () => {
        set({ players: mockPlayers })
      },
      getPlayersByClub: (clubId: string) => {
        return get().players.filter((player) => player.currentClubId === clubId)
      },
      addPlayer: async (player: Omit<Player, "id">) => {
        const newPlayer = { ...player, id: Date.now().toString() }
        set({ players: [...get().players, newPlayer] })
      },
    }),
    { name: "player-store" },
  ),
)

// Player Support Store
export const usePlayerSupportStore = create<PlayerSupportState>()(
  devtools(
    (set, get) => ({
      supportRequests: mockSupportRequests,
      resources: [
        {
          id: "1",
          title: "Managing Menstrual Health During Training",
          type: "article",
          category: "menstrual_health",
          content: "Comprehensive guide on managing periods during intensive training...",
          author: "Dr. Akosua Mensah",
          publishedAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          title: "Nutrition for Female Athletes",
          type: "video",
          category: "nutrition",
          url: "https://example.com/nutrition-video",
          duration: "15 minutes",
          publishedAt: new Date("2024-02-01"),
        },
      ],
      feedback: [],
      loading: false,
      error: null,
      createSupportRequest: async (requestData) => {
        set({ loading: true })
        const newRequest: SupportRequest = {
          ...requestData,
          id: Date.now().toString(),
          status: "pending",
          submittedAt: new Date(),
          updatedAt: new Date(),
        }
        setTimeout(() => {
          set({
            supportRequests: [...get().supportRequests, newRequest],
            loading: false,
          })
        }, 500)
      },
      updateSupportRequest: async (id, updates) => {
        const requests = get().supportRequests
        const updatedRequests = requests.map((req) =>
          req.id === id ? { ...req, ...updates, updatedAt: new Date() } : req,
        )
        set({ supportRequests: updatedRequests })
      },
      fetchSupportRequests: async () => {
        set({ loading: true })
        setTimeout(() => {
          set({ loading: false })
        }, 500)
      },
      submitFeedback: async (feedback) => {
        set({ loading: true })
        setTimeout(() => {
          set({
            feedback: [...get().feedback, { ...feedback, id: Date.now().toString(), submittedAt: new Date() }],
            loading: false,
          })
        }, 500)
      },
    }),
    { name: "player-support-store" },
  ),
)
