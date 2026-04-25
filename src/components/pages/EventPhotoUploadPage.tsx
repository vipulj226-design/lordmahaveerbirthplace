import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import PhotoUploader from '@/components/PhotoUploader';
import { BaseCrudService } from '@/integrations';

export default function EventPhotoUploadPage() {
  const [eventName, setEventName] = useState('');
  const [eventYear, setEventYear] = useState(new Date().getFullYear());
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setUploadStatus('idle');
  };

  const handleUpload = async () => {
    if (!eventName.trim()) {
      setUploadStatus('error');
      setUploadMessage('Please enter an event name');
      return;
    }

    if (selectedFiles.length === 0) {
      setUploadStatus('error');
      setUploadMessage('Please select at least one photo');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Upload each file to Wix Media
      const uploadedUrls: string[] = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        // Upload to Wix Media Manager
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      // Create gallery items in the database
      for (let i = 0; i < uploadedUrls.length; i++) {
        const imageUrl = uploadedUrls[i];
        const fileName = selectedFiles[i].name;

        await BaseCrudService.create('gallery', {
          _id: `${Date.now()}-${i}`,
          image: imageUrl,
          caption: fileName.replace(/\.[^/.]+$/, ''), // Remove file extension
          pastEvent: eventName,
          year: eventYear,
          displayOrder: i,
          description: `Uploaded on ${new Date().toLocaleDateString()}`
        });
      }

      setUploadStatus('success');
      setUploadMessage(`Successfully uploaded ${uploadedUrls.length} photo${uploadedUrls.length !== 1 ? 's' : ''} to the gallery!`);
      setSelectedFiles([]);
      setEventName('');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setUploadMessage(error instanceof Error ? error.message : 'Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-cream text-maroon">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-12 md:py-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-black text-maroon mb-4 uppercase tracking-tight">
            Upload Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold2">Photos</span>
          </h1>
          <p className="font-paragraph text-lg text-maroon/70 max-w-2xl">
            Add multiple photos to the gallery for a specific event. You can upload up to 10 photos at once.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border-2 border-maroon p-8 rounded-lg">
              {/* Event Details */}
              <div className="mb-8 space-y-6">
                <div>
                  <label className="block font-heading text-sm font-bold text-maroon uppercase tracking-wide mb-3">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g., Mahavir Jayanti Celebration"
                    className="w-full px-4 py-3 border-2 border-maroon/20 rounded-lg font-paragraph text-maroon placeholder:text-maroon/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-heading text-sm font-bold text-maroon uppercase tracking-wide mb-3">
                    Event Year *
                  </label>
                  <select
                    value={eventYear}
                    onChange={(e) => setEventYear(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-maroon/20 rounded-lg font-paragraph text-maroon focus:outline-none focus:border-gold transition-colors"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Uploader */}
              <div className="mb-8">
                <label className="block font-heading text-sm font-bold text-maroon uppercase tracking-wide mb-4">
                  Select Photos *
                </label>
                <PhotoUploader
                  onFilesSelected={handleFilesSelected}
                  maxFiles={10}
                  acceptedFormats={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
                />
              </div>

              {/* Status Messages */}
              {uploadStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <p className="font-paragraph text-green-800">{uploadMessage}</p>
                </motion.div>
              )}

              {uploadStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex gap-3"
                >
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <p className="font-paragraph text-red-800">{uploadMessage}</p>
                </motion.div>
              )}

              {/* Upload Button */}
              <motion.button
                onClick={handleUpload}
                disabled={isUploading || selectedFiles.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-heading font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  isUploading || selectedFiles.length === 0
                    ? 'bg-maroon/40 text-cream/60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gold to-gold2 text-maroon hover:shadow-lg'
                }`}
              >
                <Upload className="w-5 h-5" />
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`}
              </motion.button>
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {/* Tips Card */}
              <div className="bg-gold/10 border-l-4 border-gold p-6 rounded-lg">
                <h3 className="font-heading text-lg font-bold text-maroon mb-4 uppercase tracking-wide">
                  📸 Upload Tips
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">•</span>
                    <p className="font-paragraph text-sm text-maroon/80">
                      Select multiple photos at once (up to 10)
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">•</span>
                    <p className="font-paragraph text-sm text-maroon/80">
                      Supported formats: JPG, PNG, GIF, WebP
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">•</span>
                    <p className="font-paragraph text-sm text-maroon/80">
                      Maximum 10MB per photo
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">•</span>
                    <p className="font-paragraph text-sm text-maroon/80">
                      Drag and drop or click to browse
                    </p>
                  </li>
                </ul>
              </div>

              {/* Requirements Card */}
              <div className="bg-white border-2 border-maroon p-6 rounded-lg">
                <h3 className="font-heading text-lg font-bold text-maroon mb-4 uppercase tracking-wide">
                  ✓ Requirements
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${eventName ? 'bg-green-500' : 'bg-maroon/20'}`} />
                    <p className="font-paragraph text-sm text-maroon/80">Event name</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${eventYear ? 'bg-green-500' : 'bg-maroon/20'}`} />
                    <p className="font-paragraph text-sm text-maroon/80">Event year</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${selectedFiles.length > 0 ? 'bg-green-500' : 'bg-maroon/20'}`} />
                    <p className="font-paragraph text-sm text-maroon/80">At least 1 photo</p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-maroon text-cream p-6 rounded-lg border-2 border-gold">
                <h3 className="font-heading text-lg font-bold mb-3 uppercase tracking-wide">
                  ℹ️ Info
                </h3>
                <p className="font-paragraph text-sm text-cream/90 leading-relaxed">
                  Photos will be automatically added to the gallery and organized by event name and year. They'll appear in the Gallery page and on the homepage.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-maroon via-[#1A0306] to-maroon text-cream py-12 mt-20">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <p className="font-paragraph text-cream/80">
            © 2026 Bhagwan Mahavir Smarak Samiti. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
