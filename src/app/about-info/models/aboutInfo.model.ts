export interface AboutInfo {
    id: number;
    name: string;
    descriptionAr: string;
    descriptionEn: string;
    aboutUsAr: string;
    aboutUsEn: string;
    twitter: string;
    facebook: string;
    instagram: string;
    website: string;
    logoUrl: string;
    address: string;
    mobileNumber: string;
    secondMobileNumber: string;
    isActive: string;
    images: any[];
}

export interface AboutInfoResponse{
    errors:any;
    status:number;
    data:any;
    message:string;
    isSuccess:boolean;

}