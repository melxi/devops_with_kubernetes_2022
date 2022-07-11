import axios from 'axios'
import { connect, StringCodec } from 'nats'

const { NATS_URL, PAYLOAD_URL } = process.env
const sc = StringCodec()
const nc = await connect({
  servers: NATS_URL || 'demo.nats.io:4222'
})

const sub = nc.subscribe('todos.*');

(async () => {
  for await (const m of sub) {
    const subject = m.subject
    const todo = JSON.parse(sc.decode(m.data))

    const payload = { subject, todo }

    await axios.post(PAYLOAD_URL, { payload })
  }
})();