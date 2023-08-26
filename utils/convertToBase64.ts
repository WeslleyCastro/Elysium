import { ChangeEvent } from "react"

export const imageToBase64 = async(e: ChangeEvent<HTMLInputElement>) => {
  const imageConvert = await convertToBase64(e.target.files![0])
  return imageConvert
}

interface convertToBase64 {
  function: (file: Blob) => Promise<string>
}

const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}