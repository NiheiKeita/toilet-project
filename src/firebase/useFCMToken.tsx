
import { useEffect, useState } from "react"
import { getToken, isSupported } from "firebase/messaging"
import useNotificationPermissionStatus from "./useNotificationPermissionStatus"
import { messaging } from "./config"

const useFCMToken = () => {
  const permission = useNotificationPermissionStatus()
  const [fcmToken, setFcmToken] = useState<string | null>(null)

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window === "undefined") return
      if (!("serviceWorker" in navigator)) return
      if (permission !== "granted") return
      if (!messaging) return

      try {
        const isFCMSupported = await isSupported()
        if (!isFCMSupported) return

        // Service Workerの登録
        await navigator.serviceWorker.register('/web-push/firebase-messaging-sw.js', {
          scope: '/web-push/'
        })

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
        })
        setFcmToken(token)
      } catch (error) {
        console.error('FCMトークン取得エラー:', error)
      }
    }

    retrieveToken()
  }, [permission])

  return fcmToken
}

export default useFCMToken
