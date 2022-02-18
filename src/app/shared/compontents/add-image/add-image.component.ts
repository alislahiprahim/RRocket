import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit, OnChanges {

  @Output() imageEmitter = new EventEmitter<any>();
  @Input() multiple: boolean = false;
  @Input() clear: number = 0;

  noImageFlag: boolean = false;
  noImageSizeMatch: boolean = false;
  imageFileList: any[] = [];
  imageList: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    !this.clear  ? [ this.imageList = [], this.imageFileList = []] : null;
  }

  uploadImage(files: any) {
    this.noImageFlag = false
    this.noImageSizeMatch = false
    this.imageList = [];
    this.imageFileList = [];
    let filesList = [...files]
    if (filesList.length > 3) { return }

    filesList.forEach((element: any) => { if (!element.type.includes('image')) { this.noImageFlag = true; return } })
    if (this.noImageFlag) { return }
    filesList.forEach((element => { if (element.size > 3000000) { this.noImageSizeMatch = true; return } }))
    if (this.noImageSizeMatch) { return }

    filesList.forEach((element: any) => {
      this.imageFileList.push(element)
      var reader = new FileReader();
      reader.onload = (_event) => {

        // ------------------------------------------ image dimension calculation ------------------------------------------ 

        // const img = new Image();
        // img.src = reader.result as string;
        // img.onload = () => {
        //   const height = img.naturalHeight;
        //   const width = img.naturalWidth;
        //   

        //   switch (this.type) {

        //     case 'logo':
        //       {
        //         if (height > 300 || width > 300) {

        //           console.log('Width and Height', width, height);

        //         } else {
        //           this.imageList.push(reader.result)

        //         }
        //         break;
        //       }
        //     case 'fluid':
        //       {
        //         if (height < 300 || width < 400) {

        //           console.log('Width and Height', width, height);

        //         } else {
        //           this.imageList.push(reader.result)

        //         }
        //         break;
        //       }
        //     default:
        //       break;
        //   }

        // };
        this.imageList.push(reader.result)

      }
      reader.readAsDataURL(element);
    });
    // convert image to base64

    this.confirmImages()

  }

  removeImage(image: any) {

    this.imageList.forEach((element, index) => {
      if (element == image) {
        this.imageFileList.splice(index, 1)
        this.imageList.splice(index, 1)
      }
    })
    this.imageEmitter.emit(this.imageFileList)
  }

  confirmImages() {
    this.imageEmitter.emit(this.imageFileList)
  }



}
