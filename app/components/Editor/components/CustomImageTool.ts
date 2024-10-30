// // CustomImageTool.js
// import React, { useRef } from 'react';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.css';

// class CustomImageTool {
//     constructor({ data, config }) {
//         this.data = data;
//         this.config = config;
//         this.imageElement = document.createElement('img');
//         this.cropper = null;
//         this.input = document.createElement('input');
//     }

//     render() {
//         this.input.type = 'file';
//         this.input.accept = 'image/*';

//         this.input.onchange = (event) => {
//             const file = event.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                     this.imageElement.src = e.target.result;

//                     // Initialize Cropper.js
//                     this.cropper = new Cropper(this.imageElement, {
//                         aspectRatio: 16 / 9,
//                         viewMode: 1,
//                         autoCropArea: 1,
//                         ready: () => {
//                             this.cropper.getCroppedCanvas().toBlob((blob) => {
//                                 const newFile = new File([blob], file.name, {
//                                     type: file.type,
//                                     lastModified: Date.now(),
//                                 });
//                                 this.saveImage(newFile);
//                             });
//                         },
//                     });
//                 };
//                 reader.readAsDataURL(file);
//             }
//         };

//         const container = document.createElement('div');
//         container.appendChild(this.input);
//         container.appendChild(this.imageElement);
//         return container;
//     }

//     saveImage(file) {
//         // Implement the logic to save the cropped image
//         // For example, upload to your server or save in local storage
//         const reader = new FileReader();
//         reader.onload = () => {
//             this.data.file = {
//                 url: reader.result, // Save base64 URL
//             };
//             // Trigger Editor.js save
//             this.toolApi.saver.save();
//         };
//         reader.readAsDataURL(file);
//     }

//     static get toolbox() {
//         return {
//             title: 'Image',
//             icon: '<svg>...</svg>', // Use appropriate icon here
//         };
//     }
// }

// export default CustomImageTool;
