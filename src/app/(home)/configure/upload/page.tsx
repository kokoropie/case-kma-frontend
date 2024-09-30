"use client";

import { Progress } from "@/components/ui/progress";
import { convertBase64 } from "@/lib/convertBase64";
import { cn } from "@/lib/utils";
import { Image as LucideImage, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();

  // const { startUpload, isUploading } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: ([data]) => {
  //     const configId = data.serverData.configId;
  //     startTransition(() => {
  //       router.push(`/configure/design?id=${configId}`);
  //     });
  //   },
  //   onUploadProgress(p) {
  //     setUploadProgress(p);
  //   },
  // });

  function getImageDimensions(base64Image: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        // Set up event handlers for loading and errors
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            resolve({ width, height });
        };

        img.onerror = (err) => {
            reject(new Error("Failed to load image"));
        };

        // Set the base64 image string as the source of the image
        img.src = base64Image;
    });
}

  const onDropRejected = () => {
    setIsDragOver(false);

    toast.error("File is not supported");
  };

  const onDropAccepted = async (acceptedFiles: File[]) => {
    setIsUploading(true);
    // startUpload(acceptedFiles, { configId: undefined });

    const base64 = (await convertBase64(acceptedFiles[0])) as string;
    localStorage.setItem("image", base64);

    getImageDimensions(base64)
    .then(dimensions => {
      localStorage.setItem("width", dimensions.width.toString());
      localStorage.setItem("height", dimensions.height.toString());
        // console.log(`Width: ${dimensions.width}, Height: ${dimensions.height}`);
    })
    .catch(err => console.error(err));

    startTransition(() => {
      router.push(`/configure/design`);
    });

    base64 && toast.success("File is accepted");

    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <LucideImage className="h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="hidden mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
