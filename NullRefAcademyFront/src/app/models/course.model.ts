export interface Course{
    id: number;
    title: string;
    description: string;
    points: number;
    rating: number;
    ratingQty: number;
    videoUrl: string;
    createdDate: string;
    categoryID: number;
    teacherID: number;
    adminID: number;
    studentsIDs: string;
    usersStudentsRateIDs: string;
    usersTeachersRateIDs: string;
}