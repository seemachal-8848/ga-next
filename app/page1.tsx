// 'use client'
// import React, { useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from '@editorjs/header'; 
// import Table from '@editorjs/table';
// import ImageTool from '@editorjs/image';

// const DEFAULT_INITIAL_DATA =  {
//       "time": new Date().getTime(),
//       "blocks": [
//         {
//           "type": "header",
//           "data": {
//             "text": "This is my awesome editor!",
//             "level": 1
//           }
//         },
//       ]
//   }

// const EditorComponent = () => {
//   const ejInstance = useRef();

//     const initEditor = () => {
//        const editor = new EditorJS({
//           holder: 'editorjs',
//           onReady: () => {
//             ejInstance.current = editor;
//           },
//           autofocus: true,
//           data: DEFAULT_INITIAL_DATA,
//           onChange: async () => {
//             let content = await editor.saver.save();

//             console.log("editor.js",content);
//           },
//           tools: { 
//             header: Header, 
//             table: Table,
//           },
          
//         });
//       };

//       // This will run only once
//   useEffect(() => {
//     if (ejInstance.current === null) {
//       initEditor();
//     }

//     return () => {
//       ejInstance?.current?.destroy();
//       ejInstance.current = null;
//     };
//   }, []);

//     return  <><div id='editorjs'></div></>;
// }

// export default EditorComponent;
'use client'
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from '@editorjs/table';
import ImageTool from "@editorjs/image";
import axios from "axios";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        level: 1,
        text: "My name is Lakhan",
      },
    },
  ],
};

const EditorComponent = () => {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(">>>",content);
      },
      tools: {
        header: Header,
        table: Table,
        image: {
          class: ImageTool,
          config: {
            uploader: {
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

                if (response.data.success === 1) {
                  return response.data;
                }
              },
              async uploadByUrl(url) {
                const response = await axios.post(
                  `http://localhost:4001/api/uploadImage/createByUrl`,
                  {
                    url,
                  }
                );

                if (response.data.success === 1) {
                  return response.data;
                }
              },
            },
            inlineToolbar: true,
          },
        },
      },
      data: DEFAULT_INITIAL_DATA,
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
};

export default EditorComponent;