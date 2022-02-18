import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

@Injectable()

export class MessagesService {

    constructor() { }

    errorToast(text: string) {
        Swal.fire({
            icon: 'error',
            title: '...عفوا',
            text: text,
            confirmButtonText: 'تم',
            confirmButtonColor: '#FFC400',
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }

        })
    }

    successToast(text: string) {
        Swal.fire({
            icon: 'success',
            text: text,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }

        })
    }

    deleteSuccessToast(text:string) {

        Toast.fire({
            icon: 'success',
            title: text
        })
    }

    deleteFailureToast(text: string) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: text
        })
    }
}