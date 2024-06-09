'use client'
import { default as Image, ImageProps } from "next/image"
import { useCallback, useState } from "react"

interface Props extends ImageProps {
  placeholderSrc?: string
}

export default function CustomImage({ placeholderSrc, ...props }: Props) {
  const [url, setUrl] = useState(props.src)
  const setPlaceholder = useCallback(() => {
    if (placeholderSrc) {
      setUrl(placeholderSrc)
    }
  }, [placeholderSrc])
  return <Image {...props} src={url} onError={setPlaceholder} />
}
