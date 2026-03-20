import React, { useRef, useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface PhotoUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  acceptedFormats?: string[];
}

export default function PhotoUploader({
  onFilesSelected,
  maxFiles = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const newUploadedFiles: UploadedFile[] = [];

    // Check total files count
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed. You can upload ${maxFiles - uploadedFiles.length} more files.`);
      return;
    }

    fileArray.forEach((file) => {
      // Validate file type
      if (!acceptedFormats.includes(file.type)) {
        console.warn(`File ${file.name} is not a supported image format`);
        return;
      }

      // Validate file size (max 10MB per file)
      if (file.size > 10 * 1024 * 1024) {
        console.warn(`File ${file.name} is too large (max 10MB)`);
        return;
      }

      validFiles.push(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: e.target?.result as string,
          status: 'pending'
        };
        setUploadedFiles((prev) => [...prev, uploadedFile]);
      };
      reader.readAsDataURL(file);
    });

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? 'border-gold bg-gold/10'
            : 'border-maroon/30 bg-cream hover:border-gold hover:bg-gold/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <motion.div
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <Upload className="w-12 h-12 text-gold" />
          <div>
            <p className="font-heading text-lg font-bold text-maroon mb-1">
              Click to upload or drag and drop
            </p>
            <p className="font-paragraph text-sm text-maroon/60">
              PNG, JPG, GIF, WebP up to 10MB each
            </p>
            <p className="font-paragraph text-xs text-maroon/50 mt-2">
              Maximum {maxFiles} files • {maxFiles - uploadedFiles.length} remaining
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Uploaded Files Preview */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg font-bold text-maroon">
                Selected Files ({uploadedFiles.length})
              </h3>
              {uploadedFiles.length > 0 && (
                <button
                  onClick={clearAll}
                  className="font-paragraph text-sm text-maroon/60 hover:text-maroon transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedFiles.map((uploadedFile, index) => (
                <motion.div
                  key={uploadedFile.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-maroon/20 bg-gray-100">
                    <Image src={uploadedFile.preview} alt={uploadedFile.file.name} className="w-full h-full object-cover" />

                    {/* Status Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      {uploadedFile.status === 'success' && (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFile(uploadedFile.id)}
                      className="absolute top-2 right-2 bg-maroon text-cream rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-maroon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* File Name */}
                  <p className="font-paragraph text-xs text-maroon/70 mt-2 truncate">
                    {uploadedFile.file.name}
                  </p>

                  {/* File Size */}
                  <p className="font-paragraph text-xs text-maroon/50">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Upload Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg"
            >
              <p className="font-paragraph text-sm text-maroon/80">
                <span className="font-bold text-maroon">{uploadedFiles.length}</span> file{uploadedFiles.length !== 1 ? 's' : ''} selected
                {uploadedFiles.length > 0 && (
                  <span className="text-maroon/60">
                    {' '}• Total size: {(uploadedFiles.reduce((sum, f) => sum + f.file.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
