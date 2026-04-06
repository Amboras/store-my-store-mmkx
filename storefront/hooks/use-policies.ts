'use client'

import { useQuery } from '@tanstack/react-query'

export interface StorePolicies {
  privacy_policy?: string | null
  terms_of_service?: string | null
  refund_policy?: string | null
  shipping_policy?: string | null
  cookie_policy?: string | null
  contact_email?: string | null
  contact_phone?: string | null
  contact_address?: string | null
  updated_at?: string | null
  store_name?: string | null
}

interface PoliciesResponse {
  policies: StorePolicies
}

export function usePolicies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['store-policies'],
    queryFn: async () => {
      // Fetch policies from public /store/policies endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/policies`,
        {
          headers: {
            'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
            'X-Store-Environment-ID': process.env.NEXT_PUBLIC_STORE_ID || '',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch policies')
      }

      const data: PoliciesResponse = await response.json()
      return data.policies
    },
    staleTime: 1000 * 60 * 60, // 1 hour — policies rarely change (matches backend cache)
  })

  return {
    policies: data,
    isLoading,
    error,
    // Helper to check if any policies are set
    hasPolicies: !!(
      data?.privacy_policy ||
      data?.terms_of_service ||
      data?.refund_policy ||
      data?.shipping_policy ||
      data?.cookie_policy
    ),
  }
}
