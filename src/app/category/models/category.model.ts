export interface Category {
    id: number;
    productCode: string;
    name: string;
    imagePath: string;
    photo: string;
    brandId: number;
}

export interface CategoryResponse {
    errors: any;
    status: number;
    data: any;
    message: string;
    isSuccess: boolean;
}