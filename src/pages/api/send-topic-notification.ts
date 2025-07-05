import { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin'

// Firebase Admin SDKの初期化
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
    const { topic, title, body, data } = req.body

    if (!topic) {
      return res.status(400).json({
        error: 'Topic is required'
      })
    }

    // トピックにメッセージを送信
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
          icon: '/vercel.svg',
          badge: '/vercel.svg',
          tag: 'default',
          requireInteraction: false,
        },
        fcmOptions: {
          link: '/spring',
        },
      },
      topic: topic,
    }

    const response = await admin.messaging().send(message)

    console.log('Successfully sent topic message:', response)

    return res.status(200).json({
      success: true,
      messageId: response,
      topic: topic,
      message: 'Topic notification sent successfully'
    })

  } catch (error) {
    console.error('Error sending topic notification:', error)

    return res.status(500).json({
      error: 'Failed to send topic notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 