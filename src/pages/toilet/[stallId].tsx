import { useRouter } from 'next/router'
import ToiletStallView from '../../views/ToiletStallView'

export default function ToiletStallPage() {
  const router = useRouter()
  const { stallId } = router.query

  if (!stallId || typeof stallId !== 'string') {
    return <div>Loading...</div>
  }

  return <ToiletStallView stallId={stallId} />
} 