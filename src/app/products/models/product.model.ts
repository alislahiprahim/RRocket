export interface Product {
    id: number;
    nameAr: string;
    nameEn: string;
    description: string;
    directCommissionPercentage: number;
    originalPrice: number;
    discountPrice: number;
    clothSize: number;
    clothGender: number;
    images: string[];
    categoryId: number;
}

export interface ProductResponse {
    errors: any;
    status: number;
    data: any;
    message: string;
    isSuccess: boolean;

}

export const closthSizes = [
    { id: 0, name: 'x-small' },
    { id: 1, name: 'small' },
    { id: 2, name: 'medium' },
    { id: 3, name: 'x-large' },
    { id: 4, name: 'xx-large' },
]