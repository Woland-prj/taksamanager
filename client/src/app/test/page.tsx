'use client'
import { getAccessToken, refreshJWT } from "@/functions/jwt"
import { ChangeEvent, FormEvent, useState } from "react"

const testPage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

  const sendAvatar = async (file: File | null) => {
    if (!file) {
      console.log('no file')
      return
    }
    const token = getAccessToken()
    const base64Avatar = await toBase64(file)
    console.log(JSON.stringify({ avatar: base64Avatar }))
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/users`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + `${token}`
      },
      body: JSON.stringify({ avatar: base64Avatar })
    })
    console.log(response)
    if (response.ok) {
      console.log('success')
      setAvatar(base64Avatar as string)
    }
    if (response.status === 401) {
      await refreshJWT()
      sendAvatar(file)
      // sendAvatar(file)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log(e.target.files)
    if (e.target.files === null) return
    const file: File = e.target.files[0]
    setFile(file)
  }

  const handleSubmit = () => {
    // e.preventDefault()
    console.log(file)
    sendAvatar(file)
  }

  return (
    <form>
      <input type="file" onChange={e => handleChange(e)} />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default testPage
