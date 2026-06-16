import { coursePageDetails } from '../../../page/CoursPage/modal';
import { teachersData } from '../../../page/TeachersPage/ui/modal/modal';

export function getTeacherCourseTags(teacherId: string): string[] {
    const teacher = teachersData.find((item) => item.id === teacherId);

    if (!teacher?.courseIds?.length) {
        return [];
    }

    const tags: string[] = [];
    const seenTags = new Set<string>();

    for (const courseId of teacher.courseIds) {
        const directionTag = coursePageDetails[courseId]?.hashtags[0];

        if (!directionTag || seenTags.has(directionTag)) {
            continue;
        }

        seenTags.add(directionTag);
        tags.push(directionTag);
    }

    return tags;
}
