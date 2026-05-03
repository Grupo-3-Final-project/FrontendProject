import { useCallback, useEffect, useState } from 'react'
import { getAttractions } from '../api/attractionApi'

function useAttractionsCatalog() {
  const [attractions, setAttractions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadAttractions = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const attractionsResponse = await getAttractions()
      setAttractions(attractionsResponse)
    } catch {
      setError('No se ha podido cargar el mapa del parque.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadAttractions()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [loadAttractions])

  return {
    attractions,
    isLoading,
    error,
    reload: loadAttractions,
  }
}

export default useAttractionsCatalog
