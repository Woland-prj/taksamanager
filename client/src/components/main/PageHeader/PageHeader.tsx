import Button, { ButtonType } from "@/components/form/button/button"

export const PageHeader = () => {
    const sectionTitle = ''
    const buttonText = ''
    const someAction = () => {}
    return (
        <div className='header'>
            <h1>{sectionTitle}</h1>
            <Button type={ButtonType.COLORED} text={buttonText} action={someAction}/>
        </div>
    )
}