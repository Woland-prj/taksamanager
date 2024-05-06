'use client'

import redirectByJWT from "@/functions/redirectByJWT"

export default function Home() {
	redirectByJWT()
	return (
		<main>
			<div>Redirecting to another page</div>
		</main>
	)
}
