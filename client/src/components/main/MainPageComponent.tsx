export const MainPageComponent = () => {
    return (
        <div className='container'>
            <div className='upper'>
                <ProfileComponent />
                <PageHeader />
            </div>
            <div className='main'>
                <SideBar />
                <WorkingField />
            </div>
        </div>
    )
}