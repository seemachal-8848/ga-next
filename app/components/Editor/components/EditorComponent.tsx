import React, { useEffect, useRef, useState } from 'react';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from '@editorjs/table';
import Image from "@editorjs/image";
import Embed from '@editorjs/embed';
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ChildTemplate from './ChildTemplate';
// import Columns from './Columns';
import Columns from "@calumk/editorjs-columns";


// const column_tools = {
//     header: Header,
//     paragraph: {
//       class: require("@editorjs/paragraph"),
//       inlineToolbar: true
//     },
//     list: List
//   };

export const Tools = {
    header: {
        class: Header,
        config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4],
            defaultLevel: 1
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
                uploadByUrl: async (url) => {
                    // Logic for uploading from URL, return the uploaded file's URL
                    return {
                        success: 1,
                        file: { url }
                    };
                },
                // async uploadByFile(file) {
                //     const formData = new FormData();
                //     formData.append("file", file);

                //     // Replace this with your actual upload URL
                //     const response = await axios.post('YOUR_UPLOAD_URL', formData, {
                //         headers: {
                //             "Content-Type": "multipart/form-data",
                //         }
                //     });

                //     if (response.data.success) {
                //         return {
                //             success: 1,
                //             file: { url: response.data.url } // Assume the response contains the image URL
                //         };
                //     } else {
                //         return {
                //             success: 0,
                //             message: 'Upload failed'
                //         };
                //     }
                // }

                async uploadByFile(file) {
                    const reader = new FileReader();

                    return new Promise((resolve, reject) => {
                        reader.onloadend = () => {
                            const base64URL = reader.result;

                            // Save the image to local storage (optional)
                            localStorage.setItem('uploadedImage', base64URL);

                            resolve({
                                success: 1,
                                file: { url: base64URL }
                            });
                        };

                        reader.onerror = () => {
                            reject("Failed to read file");
                        };

                        reader.readAsDataURL(file); // Convert file to base64
                    });
                }
            }
        }
    },
    marker: Marker,
    table: Table,
    InlineCode: InlineCode,
    // columns: {
    //     class: Columns,
    //     config: {
    //       EditorJsLibrary: EditorJS, // Pass EditorJS instance here
    //       tools: column_tools, // Pass the column tools here
    //       layouts: [2, 3] // Define possible column layouts (2 and 3 column layout)
    //     }
    //   }
};

// Define the "agriculture" template with initial placeholder content
const agricultureTemplate = {
    blocks: [
        {
            type: "header",
            data: {
                text: "Agriculture",
                level: 1
            }
        },
        {
            type: "paragraph",
            data: {
                text: "Enter a description of agriculture here."
            }
        },
        {
            type: "image",
            data: {
                file: { url: "https://placehold.it/600x200" },
                caption: "Agriculture Banner",
                withBorder: false,
                withBackground: false,
                stretched: true
            }
        },
        {
            type: "list",
            data: {
                style: "unordered",
                items: ["Point 1", "Point 2", "Point 3"]
            }
        },

    ]
};


// Define the "technology" template with initial placeholder content
const technologyTemplate = {
    blocks: [
        {
            type: "header",
            data: {
                text: "Technology Blog Title",
                level: 1
            }
        },
        {
            type: "image",
            data: {
                file: { url: "https://placehold.it/800x400" },
                caption: "Technology Banner Image",
                withBorder: false,
                withBackground: false,
                stretched: true
            }
        },
        // {
        //     type: "columns",
        //     data: {
        //         items: [
        //             {
        //                 content: [
        //                     { type: "image", data: { file: { url: "https://placehold.it/150x150" }, caption: "Image 1" } },
        //                     { type: "paragraph", data: { text: "Description for Image 1" } }
        //                 ]
        //             },
        //             {
        //                 content: [
        //                     { type: "image", data: { file: { url: "https://placehold.it/150x150" }, caption: "Image 2" } },
        //                     { type: "paragraph", data: { text: "Description for Image 2" } }
        //                 ]
        //             },
        //             {
        //                 content: [
        //                     { type: "image", data: { file: { url: "https://placehold.it/150x150" }, caption: "Image 3" } },
        //                     { type: "paragraph", data: { text: "Description for Image 3" } }
        //                 ]
        //             }
        //         ]
        //     }
        // },
        {
            type: "row",
            data: {
               text: "bbbb",
            }
         },
         {
            type: "column",
            data: {
               text: "Some text"
            }
         },
         {
            type: "column",
            data: {
               text: "Some text",
            }
         },

        {
            type: "list",
            data: {
                style: "unordered",
                items: ["Key Point 1", "Key Point 2", "Key Point 3"]
            }
        }
    ]
};




const EditorComponent = ({ textEditor, setTextEditor, blogData }) => {
    const editorRef = useRef(null); // Store the EditorJS instance
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const initEditor = () => {
        if (editorRef.current && typeof editorRef.current.destroy === 'function') {
            editorRef.current.destroy(); // Destroy the previous instance if it exists
        }

        editorRef.current = new EditorJS({
            holder: "textEditor",
            onReady: () => {
                setTextEditor(editorRef.current); // Set the editor instance
            },
            data: selectedTemplate || blogData.content,
            placeholder: 'Start typing...',
            tools: Tools
        });
    };

    useEffect(() => {
        initEditor();

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                editorRef.current.destroy(); // Cleanup editor instance on unmount
                editorRef.current = null;
            }
        };
    }, [selectedTemplate]);

    const handleTemplateSelection = (template) => {
        if (template === "agriculture") {
            setSelectedTemplate(agricultureTemplate);
        } else if (template === "technology") {
            setSelectedTemplate(technologyTemplate);
        }
        else {
            setSelectedTemplate(null); // Reset to default if no template is selected
        }
    };

    return (
        <div>
            <div>
                <label>Select Template: </label>
                <select onChange={(e) => handleTemplateSelection(e.target.value)}>
                    <option value="">None</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="technology">Technology</option>
                </select>
            </div>
            <div id="textEditor"></div>
        </div>
    );
};

export default EditorComponent;








