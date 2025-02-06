import {useEffect} from 'react'

// External libs
import {useRouter} from 'next/router.js'

export default function Index() {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div></div>
}