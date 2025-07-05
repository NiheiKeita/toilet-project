// WebPush通知を送信するためのAPI関数

export interface NotificationData {
  title?: string
  body?: string
  data?: Record<string, string>
}

export interface TopicNotificationData extends NotificationData {
  topic: string
}

export interface TokenNotificationData extends NotificationData {
  token: string
}

/**
 * 特定のFCMトークンにWebPush通知を送信
 */
export const sendNotificationToToken = async (
  data: TokenNotificationData
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send notification')
    }

    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('Error sending notification to token:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * トピックにWebPush通知を送信
 */
export const sendNotificationToTopic = async (
  data: TopicNotificationData
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const response = await fetch('/api/send-topic-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send topic notification')
    }

    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('Error sending topic notification:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * FCMトークンをトピックに登録
 */
export const subscribeToTopic = async (
  token: string,
  topic: string
): Promise<{ success: boolean; successCount?: number; error?: string }> => {
  try {
    const response = await fetch('/api/subscribe-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, topic }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to subscribe to topic')
    }

    return {
      success: true,
      successCount: result.successCount,
    }
  } catch (error) {
    console.error('Error subscribing to topic:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * テスト用：サンプル通知を送信
 */
export const sendTestNotification = async (
  token?: string,
  topic?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const testData = {
    title: 'テスト通知',
    body: 'これはテスト通知です',
    data: {
      type: 'test',
      timestamp: new Date().toISOString(),
    },
  }

  if (token) {
    return sendNotificationToToken({ ...testData, token })
  } else if (topic) {
    return sendNotificationToTopic({ ...testData, topic })
  } else {
    return {
      success: false,
      error: 'Either token or topic is required',
    }
  }
} 