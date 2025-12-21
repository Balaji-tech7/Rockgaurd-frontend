import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage utility functions for mining data files
export const uploadFile = async (bucketName, filePath, file, options = {}) => {
  try {
    const { data, error } = await supabase?.storage?.from(bucketName)?.upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        ...options
      })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const getSignedUrl = async (bucketName, filePath, expiresIn = 3600) => {
  try {
    const { data, error } = await supabase?.storage?.from(bucketName)?.createSignedUrl(filePath, expiresIn)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const deleteFile = async (bucketName, filePath) => {
  try {
    const { data, error } = await supabase?.storage?.from(bucketName)?.remove([filePath])

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const listFiles = async (bucketName, folderPath = '', options = {}) => {
  try {
    const { data, error } = await supabase?.storage?.from(bucketName)?.list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
        ...options
      })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Mining data specific storage functions
export const uploadMiningData = async (dataType, file, userId = 'anonymous') => {
  const bucketMap = {
    'Drone Imagery': 'mining-drone-data',
    'DEM Data': 'mining-dem-data', 
    'Sensor Data': 'mining-sensor-data',
    'Environmental': 'mining-environmental-data'
  }

  const bucket = bucketMap?.[dataType] || 'mining-general-data'
  const timestamp = new Date()?.toISOString()?.replace(/[:.]/g, '-')
  const filePath = `${userId}/${timestamp}-${file?.name}`

  return await uploadFile(bucket, filePath, file)
}

export default supabase