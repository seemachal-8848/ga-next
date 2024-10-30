"use client"
import React, { useEffect, useRef } from 'react'
import EditorJS from "@editorjs/editorjs";
import { Tools } from './Tools';

const EditorComponent = ({ textEditor, setTextEditor, blogData }) => {
    const ejInstance = useRef();
    const initEditor = () => {
        setTextEditor(new EditorJS({
            holder: "textEditor",
            onReady: () => {
                ejInstance.current = textEditor;
            },
            data: blogData.content,
            placeholder: 'Editor',
            tools: Tools
        })
        )
    }

    useEffect(() => {
        initEditor();
    }, [])
    return (
        <div>
            <div id="textEditor"></div>
        </div>
    )
}

export default EditorComponent
