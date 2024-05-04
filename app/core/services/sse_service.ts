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
          secret: 'Change',
          header: { alg: 'HS256' },
        })
        .on('error', reject)
        .on('done', resolve)
    })
  }

  update(topic: string, data: Record<string, string>, isPrivate: boolean = false) {
    return got.post(MERCURE_URL, {
      headers: {
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.AB41HncCySxtaC7Af_z754a1buI8dwtvvc7XK7x3BSQ',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring
        .stringify({ topic: topic, data: JSON.stringify(data) })
        .concat(isPrivate ? '&private=on' : ''),
    })
  }
}
