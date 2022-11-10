import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url)
        setData(res)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [url])

  const reFetch = async () => {
    try {
      const res = await axios.get(url)
      setData(res)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return {data, loading, error, reFetch}
}


export default useFetch