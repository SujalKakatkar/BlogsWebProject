/** @format */
//real time text editor
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";


export default function RTE({ name, control, label,textColor="text-black", defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className={`inline-block mb-1 pl-1 ${textColor}`}>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            tinymceScriptSrc={'/tinymce/js/tinymce/tinymce.min.js'}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              
              skin: 'tinymce-5-dark',
              skin_url:'/tinymce/js/tinymce/skins/ui/tinymce-5-dark',
              height: 400,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { background-color:#101829; color:white; font-family:Helvetica,Arial,sans-serif; font-size:24px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
