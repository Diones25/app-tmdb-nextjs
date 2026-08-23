
export interface Channel {
  success: boolean
  data: Data[]
  total: number
}

export interface Data {
  id: string
  name: string
  description: string
  logo_url: string
  preview_url: string
  embed_url: string
  category: string
  is_active: boolean
}
