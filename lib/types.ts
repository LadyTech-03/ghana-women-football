export interface User {
  id: string
  email: string
  name: string
  role: "club_admin" | "gfa_reviewer" | "caf_official"
  clubId?: string
  createdAt: Date
}

export interface Club {
  id: string
  name: string
  zone: "Northern" | "Southern"
  region: string
  founded?: number
  description?: string
  logo?: string
  stadium?: string
  coach?: string
  achievements?: string[],
  previousPosition?: number,
  theme?: string
}

export interface Player {
  id: string
  name: string
  dateOfBirth: Date
  nationality: string
  passportId?: string
  nationalId?: string
  position?: string
  currentClubId?: string
  jerseyNumber?: number
  height?: string
  weight?: string
  image?: string
}

export interface Transfer {
  id: string
  playerId: string
  player: Player
  fromClubId?: string
  fromClub?: Club
  toClubId: string
  toClub: Club
  type: "permanent" | "loan" | "free_agent"
  transferFee?: number
  paymentTerms?: string
  bonuses?: string
  status: "submitted" | "under_review" | "approved" | "rejected"
  submittedAt: Date
  reviewedAt?: Date
  approvedAt?: Date
  submittedBy: string
  reviewedBy?: string
  documents: TransferDocument[]
  comments: TransferComment[]
}

export interface TransferDocument {
  id: string
  transferId: string
  type: "contract" | "id" | "medical" | "itc" | "work_permit" | "other"
  fileName: string
  fileUrl: string
  uploadedAt: Date
  uploadedBy: string
}

export interface TransferComment {
  id: string
  transferId: string
  message: string
  createdAt: Date
  createdBy: string
  author: User
}

export interface TransferFormData {
  player: {
    name: string
    dateOfBirth: string
    nationality: string
    passportId?: string
    nationalId?: string
    position?: string
  }
  fromClubId?: string
  toClubId: string
  type: "permanent" | "loan" | "free_agent"
  transferFee?: number
  paymentTerms?: string
  bonuses?: string
  documents: File[]
}
