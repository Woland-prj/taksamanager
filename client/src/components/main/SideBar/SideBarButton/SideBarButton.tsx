import Image from "next/image"
import { FC } from "react"

type TSideBarButtonProps = {
    iconURL: string
    text: string
}

export const SideBarButton: FC<TSideBarButtonProps> = ({iconURL, text}) => {
    return (
        <div className="button">
            <Image className="image" src={iconURL} alt=''/>
            <div className="text">{text}</div>
        </div>
    )
}