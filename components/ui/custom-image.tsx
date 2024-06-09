import { default as Image, ImageProps } from "next/image"
import { useState } from "react"

interface Props extends ImageProps { }

export default function CustomImage(props: Props) {
  const [url, setUrl] = useState(props.src)
  return <Image {...props} src={url} onError={() => setUrl("/placeholder-bottle.svg")} />
}
