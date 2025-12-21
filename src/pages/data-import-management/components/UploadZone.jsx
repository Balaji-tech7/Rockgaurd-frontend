import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { uploadMiningData } from '../../../utils/supabase';

const UploadZone = ({ 
  title, 
  description, 
  acceptedFormats, 
  maxSize, 
  onFileSelect,
  isUploading: externalIsUploading = false,
  uploadProgress: externalUploadProgress = 0,
  dataType
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [internalUploadProgress, setInternalUploadProgress] = useState(0);
  const [internalIsUploading, setInternalIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadErrors, setUploadErrors] = useState([]);
  const fileInputRef = useRef(null);

  const isUploading = externalIsUploading || internalIsUploading;
  const uploadProgress = externalUploadProgress || internalUploadProgress;

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files || []);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files || []);
    handleFileUpload(files);
  };

  const handleFileUpload = async (files) => {
    if (files?.length === 0) return;

    setInternalIsUploading(true);
    setInternalUploadProgress(0);
    setUploadErrors([]);
    
    const results = [];
    const errors = [];

    for (let i = 0; i < files?.length; i++) {
      const file = files?.[i];
      const progress = ((i + 1) / files?.length) * 100;
      
      try {
        // Validate file size
        const maxSizeBytes = parseInt(maxSize?.replace(/\D/g, '')) * 1024 * 1024; // Convert to bytes
        if (file?.size > maxSizeBytes) {
          throw new Error(`File ${file.name} exceeds maximum size of ${maxSize}`);
        }

        // Validate file type
        const fileExtension = `.${file?.name?.split('.')?.pop()?.toLowerCase()}`;
        const allowedFormats = acceptedFormats?.split(',')?.map(format => format?.trim()?.toLowerCase());
        if (allowedFormats && !allowedFormats?.includes(fileExtension)) {
          throw new Error(`File ${file.name} has unsupported format. Accepted: ${acceptedFormats}`);
        }

        const { data, error } = await uploadMiningData(dataType, file);
        
        if (error) {
          throw error;
        }

        results?.push({
          name: file?.name,
          size: `${(file?.size / (1024 * 1024))?.toFixed(2)} MB`,
          path: data?.path,
          uploadedAt: new Date()?.toISOString(),
          status: 'success'
        });

        setInternalUploadProgress(progress);
        
      } catch (error) {
        console.error(`Upload error for ${file?.name}:`, error);
        errors?.push({
          fileName: file?.name,
          error: error?.message || 'Upload failed'
        });
      }
    }

    setUploadedFiles(prev => [...prev, ...results]);
    setUploadErrors(errors);
    setInternalIsUploading(false);
    setInternalUploadProgress(0);

    // Call parent callback with results
    onFileSelect?.(results, dataType);
  };

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const clearUploaded = () => {
    setUploadedFiles([]);
    setUploadErrors([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {title}
        </h3>
        {uploadedFiles?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearUploaded}
            iconName="X"
            iconSize={16}
          >
            Clear
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {description}
      </p>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="space-y-4">
            <Icon name="Upload" size={48} className="mx-auto text-primary animate-pulse" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Uploading... {Math.round(uploadProgress)}%
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Accepted formats: {acceptedFormats}
              </p>
              <p className="text-xs text-muted-foreground">
                Maximum file size: {maxSize}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          onClick={handleClick}
          disabled={isUploading}
          iconName="FolderOpen"
          iconPosition="left"
        >
          Select Files
        </Button>
      </div>

      {/* Upload Results */}
      {uploadedFiles?.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-foreground">Successfully Uploaded:</h4>
          <div className="bg-muted/20 rounded-lg p-3 space-y-1">
            {uploadedFiles?.map((file, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{file?.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{file?.size}</span>
                  <Icon name="CheckCircle" size={14} className="text-success" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Errors */}
      {uploadErrors?.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-error">Upload Errors:</h4>
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 space-y-1">
            {uploadErrors?.map((error, index) => (
              <div key={index} className="text-xs">
                <span className="font-medium text-error">{error?.fileName}:</span>
                <span className="text-error/80 ml-1">{error?.error}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;