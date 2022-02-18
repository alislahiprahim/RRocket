export interface Brand {
    id: string;
    name: string;
    imagePath: string;
    photo: string;
}

export interface BrandsResponse {
    errors: any;
    status: number;
    data: any;
    message: string;
    isSuccess: boolean;

}