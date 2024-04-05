import Image from "next/image"
export const ProfileComponent = () => {
    const imageSrc = '@/public/taksa.svg'
    const username = ''
    return (
        <div>
            <Image src={imageSrc} alt='@/public/taksa.svg'/>
            <h2>{username}</h2>
        </div>
    )
}