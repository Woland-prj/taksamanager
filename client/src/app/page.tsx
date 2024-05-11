'use client'

import useRedirectByJWT from '@/functions/redirectByJWT'

export default function Home() {
	useRedirectByJWT()
	return (
		<main>
			<div>Redirecting to another page</div>
		</main>
	)
}
