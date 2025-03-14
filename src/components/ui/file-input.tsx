import React from "react";
import { Input } from "./input";
import { FormLabel } from "./form";
import { CiFileOn } from "react-icons/ci";

// extend file input props
interface FileInputProps {
  handleFileUpload: (files: FileList | null) => void;
  resetAfterUpload?: boolean;
  fileName?: string;
  accept?: string;
  id?: string;
  multiple?: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ handleFileUpload, accept, resetAfterUpload, fileName, id = "uploadFile", multiple = false }, ref) => {
    return (
      <div
        className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Input
          type="file"
          className="hidden"
          id={id}
          onChange={(e) => {
            e.preventDefault();
            handleFileUpload(e.target.files);
            if (resetAfterUpload) {
              e.target.value = "";
            }
          }}
          accept={accept}
          ref={ref}
          multiple={multiple}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <CiFileOn className="size-16 text-gray-500" />
          <FormLabel htmlFor={id} className="cursor-pointer text-indigo-600 hover:underline">
            {fileName ? (
              fileName
            ) : (
              <>
                Drag & drop files or <span className="text-blue-500">Browse</span>
              </>
            )}
          </FormLabel>
          <p className="text-sm text-gray-500">Supported format: {accept?.split(",").join(", ")}</p>
        </div>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
