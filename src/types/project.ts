export interface ProjectFormData {
  // Required fields
  id: string
  title: string
  description: string
  status: string
  lastUpdated: string

  // Optional fields
  longDescription?: string
  url?: string
  github?: string
  isOpenSource?: boolean
  icon?: string
  screenshotUrl?: string
  screenshots?: string[]
  tech?: string[]
  features?: string[]
  challenges?: string[]
  content?: ContentSection[]
  galleryFolder?: string

  // Configuration flags
  hideVisualSection?: boolean
  hideProjectInfo?: boolean
  hideTechStack?: boolean
  hideOverview?: boolean

  // ProjectsPage.tsx specific fields
  color: string
  featured: boolean
  special?: boolean // Add the new special tag
}

export interface ContentSection {
  title: string
  text: string | string[]
  type?: 'paragraph' | 'paragraphs' | 'list'
}

export const STATUS_OPTIONS = [
  'Live',
  'Active',
  'Private',
  'InDev',
  'Paused',
  'Experimental'
] as const

export const GRADIENT_OPTIONS = [
  'from-blue-400 to-cyan-500',
  'from-purple-400 to-pink-500',
  'from-green-400 to-emerald-500',
  'from-yellow-400 to-orange-500',
  'from-red-400 to-pink-500',
  'from-indigo-400 to-purple-500',
  'from-teal-400 to-blue-500',
  'from-orange-400 to-red-500',
  'from-emerald-400 to-teal-500',
  'from-pink-400 to-rose-500'
] as const

export const CONTENT_TYPES = [
  { value: 'paragraph', label: 'Single Paragraph' },
  { value: 'paragraphs', label: 'Multiple Paragraphs' },
  { value: 'list', label: 'Bulleted List' }
] as const
