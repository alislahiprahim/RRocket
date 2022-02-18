export interface Teams {
    id: number;
    name: string;
    teamCode: string;
    imageUrl: string;
    photo: string;
}

export interface TeamsResponse {
    errors: any;
    status: number;
    data: any;
    message: string;
    isSuccess: boolean;

}