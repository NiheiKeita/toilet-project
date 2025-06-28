import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

// 環境変数の読み込みを改善
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

// デバッグ用：設定値をコンソールに出力
console.log('Environment Variables Debug:', {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
})

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
          .then((registration) => {
            console.log('Service Worker登録成功:', registration)
          })
          .catch((error) => {
            console.error('Service Worker登録エラー:', error)
          })
      }
    } catch (error) {
      console.error('Firebase Messaging初期化エラー:', error)
    }
  }
}

export { messaging }