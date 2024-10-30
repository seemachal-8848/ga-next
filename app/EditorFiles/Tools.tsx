import Header from "@editorjs/header";
import Table from '@editorjs/table';
import Image from "@editorjs/image";
import Embed from '@editorjs/embed';
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { rejects } from "assert";

const uploadedImageUrl = async (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        } catch (error) {
            reject(error)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

export const Tools = {
    header: {
        class: Header,
        config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3
        }
    },
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadedImageUrl,
                async uploadByFile(file) {
                    // your own uploading logic here
                    const formData = new FormData();
                    formData.append("file", file);

                    // const response = await axios.post(
                    //   `http://localhost:4001/api/uploadImage/create`,
                    //   formData,
                    //   {
                    //     headers: {
                    //       "Content-Type": "multipart/form-data",
                    //     },
                    //     withCredentials: false,
                    //   }
                    // );

                    // if (response.data.success === 1) {
                    //   return response.data;
                    // }
                },
            }
        }
    },
    marker: Marker,
    table: Table,
    InlineCode: InlineCode
    
}










// import Header from "@editorjs/header";
// import Table from '@editorjs/table';
// import Image from "@editorjs/image";
// import Embed from '@editorjs/embed';
// import List from "@editorjs/list";
// import Marker from "@editorjs/marker";
// import InlineCode from "@editorjs/inline-code";
// import { rejects } from "assert";

// const uploadedImageUrl = async (e) => {
//     let link = new Promise((resolve, reject) => {
//         try {
//             resolve(e)
//         } catch (error) {
//             reject(error)
//         }
//     })

//     return link.then(url => {
//         return {
//             success: 1,
//             file: { url }
//         }
//     })
// }

// export const Tools = {
//     header: {
//         class: Header,
//         config: {
//             placeholder: 'Enter a header',
//             levels: [2, 3, 4],
//             defaultLevel: 3
//         }
//     },
//     embed: Embed,
//     list: {
//         class: List,
//         inlineToolbar: true
//     },
//     image: {
//         class: Image,
//         config: {
//             uploader: {
//                 uploadByUrl: uploadedImageUrl,
//                 async uploadByFile(file) {
//                     // your own uploading logic here
//                     const formData = new FormData();
//                     formData.append("file", file);

//                     // const response = await axios.post(
//                     //   `http://localhost:4001/api/uploadImage/create`,
//                     //   formData,
//                     //   {
//                     //     headers: {
//                     //       "Content-Type": "multipart/form-data",
//                     //     },
//                     //     withCredentials: false,
//                     //   }
//                     // );

//                     // if (response.data.success === 1) {
//                     //   return response.data;
//                     // }
//                 },
//             }
//         }
//     },
//     marker: Marker,
//     table: Table,
//     InlineCode: InlineCode
//     // image: {
//     //   class: ImageTool,
//     //   config: {
//     //     uploader: {
//     //       async uploadByFile(file) {
//     //         // your own uploading logic here
//     //         const formData = new FormData();
//     //         formData.append("file", file);

//     //         // const response = await axios.post(
//     //         //   `http://localhost:4001/api/uploadImage/create`,
//     //         //   formData,
//     //         //   {
//     //         //     headers: {
//     //         //       "Content-Type": "multipart/form-data",
//     //         //     },
//     //         //     withCredentials: false,
//     //         //   }
//     //         // );

//     //         if (response.data.success === 1) {
//     //           return response.data;
//     //         }
//     //       },
//     //       async uploadByUrl(url) {
//     //         const response = await axios.post(
//     //           `http://localhost:4001/api/uploadImage/createByUrl`,
//     //           {
//     //             url,
//     //           }
//     //         );

//     //         if (response.data.success === 1) {
//     //           return response.data;
//     //         }
//     //       },
//     //     },
//     //     inlineToolbar: true,
//     //   },
//     // },
// }