"use client";

import axios from "axios";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";
import { useEffect, useState } from "react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const [fileType, setFileType] = useState<string | null>(null);

    const getFileType = async (fileUrl: string): Promise<string | null> => {
        try {
            const response = await axios.head(fileUrl);
            return response.headers["content-type"];
        } catch (error) {
            console.error("Error fetching file metadata:", error);
            return null;
        }
    };

    useEffect(() => {
        if (value) {
            (async () => {
                const type = await getFileType(value);
                setFileType(type);
            })();
        }
    }, [value]);

    if (value) {
        if (fileType?.startsWith("image")) {
            return (
                <div className="relative h-20 w-20">
                    <Image 
                        fill
                        src={value}
                        alt="Upload"
                        className="rounded-full"
                    />
                    <button
                        onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                    >
                        <X 
                            className="h-4 w-4"
                        />
                    </button>
                </div>
            )
        }
        else if (fileType === "application/pdf") {
            return (
                <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                    <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline break-all">
                        {value}
                    </a>
                    <button
                        onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                    >
                        <X 
                            className="h-4 w-4"
                        />
                    </button>
                </div>
            )
        }
    }

    return (
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}