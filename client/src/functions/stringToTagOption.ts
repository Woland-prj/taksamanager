import { TagOption, TaskStatus, TaskType } from '@/types/tasks'
export const stringToTagOption = (text: string | null): TagOption => {
	switch (text) {
		case TaskStatus.MODIFIED:
			return TagOption.MODIFIED
		case TaskStatus.WAITCONSENT:
			return TagOption.WAIT_CONSENT
		case TaskStatus.INWORK:
			return TagOption.IN_WORK
		case TaskStatus.COMPLETED:
			return TagOption.COMPLETED
		case TaskStatus.VERIFYCOMPLETED:
			return TagOption.VERIFY_COMPLETED
		case TaskStatus.REJECTED:
			return TagOption.REJECTED
		case TaskStatus.VERIFYREJECTED:
			return TagOption.REJECTED_BY_ADMIN
		case TaskStatus.EXPIRED:
			return TagOption.EXPIRED

		case TaskType.PHOTO:
			return TagOption.PHOTO
		case TaskType.MONTAGE:
			return TagOption.MONTAGE
		case TaskType.VIDEO:
			return TagOption.VIDEO
		case TaskType.DESIGN:
			return TagOption.DESIGN
		case TaskType.POST:
			return TagOption.POST
		case TaskType.ANIMATION:
			return TagOption.ANIMATION

		default:
			return TagOption.UNDEFINED
	}
}
