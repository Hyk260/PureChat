import { ChatMessageError, ErrorResponse, ErrorType } from "@pure/types"

export const getMessageError = async (response: Response) => {
  let chatMessageError: ChatMessageError

  // try to get the biz error
  try {
    const data = (await response.json()) as ErrorResponse
    chatMessageError = {
      body: data.body,
      message: `response_${data.errorType}`,
      type: data.errorType,
    }
  } catch {
    // if not return, then it's a common error
    chatMessageError = {
      message: `response_${response.status}`,
      type: response.status as ErrorType,
    }
  }

  return chatMessageError
}
