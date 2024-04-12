'use server'

import { RedirectType, redirect } from "next/navigation"

export const redirectToPage = (url: string, type?: RedirectType | undefined) => {
    redirect(url, type)
    console.log('redirecting to' + url)
}
