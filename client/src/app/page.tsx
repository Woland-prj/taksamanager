'use client'
import { checkJWTAndRedirect } from "@/functions/checkJWTAndRedirect"
import { getAccessToken } from "@/functions/jwt"
import { useEffect } from "react"



export default function Home() {
	useEffect(() => {
		checkJWTAndRedirect(getAccessToken())
	}, [])
	return (
		<main>
			<div>Redirecting to another page</div>
		</main>
	)
}
