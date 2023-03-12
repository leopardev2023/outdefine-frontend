import { Accept } from "react-dropzone";

interface IDragDropFile {
  onUpload?: (file: File | undefined) => void;
  title?: string;
  defaultValue?: File;
  acceptedFormats?: Accept; // MIME type as keys, values as array of strings for each key
  preferredFormats?: Array[string];
}

export default IDragDropFile;
