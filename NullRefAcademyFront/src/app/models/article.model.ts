export interface Article{
    id: number;
    title: string;
    description: string;
    text: string;
    rating: number;
    ratingQty: number;
    videoUrl: string;
    createdDate: string;
    teacherID: number;
    adminID: number;
    studentsIDs: string;
    teachersIDs: string;
    usersStudentsRateIDs: string;
    usersTeachersRateIDs: string;
}