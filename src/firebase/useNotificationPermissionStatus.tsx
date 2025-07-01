
import { useEffect, useState } from "react"

type NotificationPermission = "default" | "granted" | "denied"
// type PermissionName = "notifications"

const useNotificationPermissionStatus = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("Notification" in window)) return

    const handler = () => setPermission(Notification.permission)
    handler()

    try {
      Notification.requestPermission().then(handler)
      navigator.permissions
        .query({ name: "notifications" })
        .then((notificationPerm) => {
          notificationPerm.onchange = handler
        })
        .catch((error) => {
          console.error('通知許可状態の取得エラー:', error)
        })
    } catch (error) {
      console.error('通知許可のリクエストエラー:', error)
    }
  }, [])

  return permission
}

export default useNotificationPermissionStatus
