import redirectByJWT from "@/functions/redirectByJWT"

export default function TeamPage() {
    redirectByJWT()
    return(
        <TeamContainer/>
    )
}