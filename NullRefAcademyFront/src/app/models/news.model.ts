export interface News{
    id: number;
    title: string;
    description: string;
    text: string;
    rating: number;
    ratingQty: number;
    videoUrl: string;
    createdDate: string;
    adminID: number;
    studentsIDs: string;
    teachersIDs: string;
    usersStudentsRateIDs: string;
    usersTeachersRateIDs: string;
}