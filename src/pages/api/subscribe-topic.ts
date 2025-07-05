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
    const { token, topic } = req.body

    if (!token || !topic) {
      return res.status(400).json({
        error: 'Both token and topic are required'
      })
    }

    // トークンをトピックに登録
    const response = await admin.messaging().subscribeToTopic([token], topic)

    console.log('Successfully subscribed to topic:', response)

    return res.status(200).json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      errors: response.errors,
      message: 'Successfully subscribed to topic'
    })

  } catch (error) {
    console.error('Error subscribing to topic:', error)

    return res.status(500).json({
      error: 'Failed to subscribe to topic',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 