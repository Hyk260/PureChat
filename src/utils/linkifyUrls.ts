const urlRegex = () =>
  /((?<!\+)https?:\/\/(?:www\.)?(?:[-\w.]+?[.@][a-zA-Z\d]{2,}|localhost)(?:[-\w.:%+~#*$!?&/=@]*?(?:,(?!\s))*?)*)/g

const linkify = (href: string, options: any) => {
  return `<a href="${href}" class="linkUrl" target="_blank">${href}</a>`
}

const isTruncated = (url: string, peek: string) => url.endsWith("...") || peek.startsWith("…")

const getAsString = (string: string, options: any) => {
  return string.replace(urlRegex(), (url, _, offset) => {
    return isTruncated(url, string.charAt(offset + url.length)) ? url : linkify(url, options)
  })
}

export default function linkifyUrls(string: string, options: any) {
  return getAsString(string, options)
}
