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
    const { title, body, data, topic = 'all_devices' } = req.body

    if (!title && !body) {
      return res.status(400).json({
        error: 'Title or body is required'
      })
    }

    // 全デバイスにメッセージを送信
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
          tag: 'all-devices',
          requireInteraction: false,
        },
        fcmOptions: {
          link: '/spring',
        },
      },
      topic: topic,
    }

    const response = await admin.messaging().send(message)

    console.log('Successfully sent message to all devices:', response)

    return res.status(200).json({
      success: true,
      messageId: response,
      topic: topic,
      message: 'Message sent to all devices successfully'
    })

  } catch (error) {
    console.error('Error sending message to all devices:', error)

    return res.status(500).json({
      error: 'Failed to send message to all devices',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 