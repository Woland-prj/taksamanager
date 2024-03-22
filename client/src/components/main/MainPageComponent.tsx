import { PageHeader } from './PageHeader/PageHeader'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import { SideBar } from './SideBar/SideBar'
import { WorkingField } from './WorkingField/WorkingField'

export const MainPageComponent = () => {
	return (
		<div className='container'>
			<div className='upper'>
				<ProfileComponent />
				<PageHeader
					sectionTitle='123'
					buttonText='123'
					buttonAction={() => {}}
				/>
			</div>
			<div className='main'>
				<SideBar />
				<WorkingField />
			</div>
		</div>
	)
}
