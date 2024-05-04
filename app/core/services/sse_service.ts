import got from 'got'
import jws from 'jws'
import { MERCURE_URL } from '#core/constants/constants'
import * as querystring from 'node:querystring'

export class SseService {
  computeToken(payload: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      jws
        .createSign({
          payload,
          secret: process.env.MERCURE_JWT_SECRET,
          header: { alg: 'HS256' },
        })
        .on('error', reject)
        .on('done', resolve)
    })
  }

  update(topic: string, data: Record<string, string>, isPrivate: boolean = false) {
    return got.post(MERCURE_URL, {
      headers: {
        'Authorization': `Bearer ${process.env.MERCURE_SERVER_JWT!}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring
        .stringify({ topic: topic, data: JSON.stringify(data) })
        .concat(isPrivate ? '&private=on' : ''),
    })
  }
}
