import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

// 環境変数の読み込みを改善
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

let messaging: ReturnType<typeof getMessaging> | null = null

// 設定値が不完全な場合はFirebaseを初期化しない
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.warn('Firebase設定が不完全です。.envファイルを確認してください。')
} else {
  const app = initializeApp(firebaseConfig)

  if (typeof window !== 'undefined') {
    try {
      messaging = getMessaging(app)

      // Service Workerの登録を確認
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then(() => {
            console.log('Service Worker登録成功')
          })
          .catch(() => {
            console.error('Service Worker登録エラー')
          })
      }
    } catch (error) {
      console.error('Firebase Messaging初期化エラー')
    }
  }
}

export { messaging }