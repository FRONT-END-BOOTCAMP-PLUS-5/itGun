import { TextDecoder, TextEncoder } from "util"
import { BroadcastChannel } from "worker_threads"
import { WritableStream, TransformStream } from "stream/web"

Object.assign(global, {
  TextDecoder,
  TextEncoder,
  BroadcastChannel,
  WritableStream,
  TransformStream,
})
