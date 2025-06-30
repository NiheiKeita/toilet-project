import { useEffect, useState } from "react"
import { MessagePayload, onMessage } from "firebase/messaging"
import useFCMToken from "./useFCMToken"
import { messaging } from "./config"

export const useFCM = () => {
  const fcmToken = useFCMToken()
  const [messages, setMessages] = useState<MessagePayload[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!("serviceWorker" in navigator)) return
    if (!messaging) return

    try {
      const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
        console.log('FCMメッセージを受信しました:', payload)
        setMessages((messages) => [...messages, payload])
      })

      return () => unsubscribe()
    } catch (error) {
      console.error('FCM初期化エラー:', error)
    }
  }, [fcmToken])

  return { fcmToken, messages }
}

