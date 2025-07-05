
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
        await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/'
        })

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
        })
        setFcmToken(token)

        // 全デバイストピックに自動登録
        if (token) {
          try {
            await fetch('/api/subscribe-topic/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: token,
                topic: 'all_devices'
              }),
            })
            console.log('全デバイストピックに登録しました')
          } catch (error) {
            console.error('全デバイストピック登録エラー:', error)
          }
        }
      } catch (error) {
        console.error('FCMトークン取得エラー:', error)
      }
    }

    retrieveToken()
  }, [permission])

  return fcmToken
}

export default useFCMToken
