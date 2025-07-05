// firebase/admin.ts
import * as admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

if (!admin.apps.length) {
  var serviceAccount = require("../../../firebase_env.json")

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { token, title, body, data, topic } = req.body

    // トークンまたはトピックのいずれかが必要
    if (!token && !topic) {
      return res.status(400).json({
        error: 'Either token or topic is required'
      })
    }

    // メッセージの構築
    const message = {
      notification: {
        title: title || '新しいメッセージ',
        body: body || 'メッセージが届きました',
      },
      data: data || {},
      webpush: {
        notification: {
          title: title || '新しいメッセージ',
          body: body || 'メッセージが届きました',
          icon: '/vercel.svg', // アイコンのパス
          badge: '/vercel.svg',
          tag: 'default',
          requireInteraction: false,
        },
        fcmOptions: {
          link: '/spring', // クリック時の遷移先
        },
      },
    }

    let response: string

    if (token) {
      // 特定のトークンに送信
      response = await admin.messaging().send({
        ...message,
        token,
      })
    } else if (topic) {
      // トピックに送信
      response = await admin.messaging().send({
        ...message,
        topic,
      })
    } else {
      throw new Error('Invalid request')
    }

    console.log('Successfully sent message:', response)

    return res.status(200).json({
      success: true,
      messageId: response,
      message: 'Notification sent successfully'
    })

  } catch (error) {
    console.error('Error sending notification:', error)

    return res.status(500).json({
      error: 'Failed to send notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const adminMessaging = admin.messaging()
