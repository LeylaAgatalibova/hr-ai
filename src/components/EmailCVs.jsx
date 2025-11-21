import React, { useState, useEffect } from 'react';
import { Mail, Download, Upload, RefreshCw, FileText, Calendar, User, Filter, Search, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { fetchEmailCVs, groupCVsByField, downloadCVAttachment } from '../services/emailService';
import { extractTextFromFile } from '../utils/fileParser';

export default function EmailCVs({ onImportToAnalyzer }) {
  const [cvs, setCvs] = useState([]);
  const [groupedCVs, setGroupedCVs] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedField, setSelectedField] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [importing, setImporting] = useState({});
  const [error, setError] = useState('');

  const emailAddress = 'agatalibovaleyla@gmail.com';

  const loadCVs = async () => {
    try {
      setError('');
      const result = await fetchEmailCVs();
      if (result.success) {
        setCvs(result.cvs);
        setGroupedCVs(groupCVsByField(result.cvs));
      } else {
        setError(result.error || 'Failed to fetch CVs from email');
      }
    } catch (err) {
      setError('Error loading CVs: ' + err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCVs();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCVs();
  };

  const handleImport = async (cv) => {
    try {
      setImporting(prev => ({ ...prev, [cv.id]: true }));
      
      // Download the CV file
      const blob = await downloadCVAttachment(cv.id);
      
      let fileToImport;
      
      if (blob) {
        // If we have a blob, convert it to a File object
        const file = new File(
          [blob],
          cv.fileName,
          { type: blob.type || 'application/pdf' }
        );
        
        // Extract text from file
        const textContent = await extractTextFromFile(file);
        
        fileToImport = {
          id: `email-${cv.id}-${Date.now()}`,
          name: cv.fileName,
          size: cv.fileSize || blob.size,
          file: file,
          textContent: textContent.substring(0, 500) + '...'
        };
      } else {
        // If no actual file, create a mock file from preview text
        const mockFile = new File(
          [cv.preview || 'CV content'],
          cv.fileName,
          { type: 'application/pdf' }
        );
        
        // Extract text from file
        const textContent = await extractTextFromFile(mockFile);
        
        fileToImport = {
          id: `email-${cv.id}-${Date.now()}`,
          name: cv.fileName,
          size: cv.fileSize,
          file: mockFile,
          textContent: textContent.substring(0, 500) + '...'
        };
      }
      
      // Call the import callback if provided
      if (onImportToAnalyzer) {
        onImportToAnalyzer(fileToImport);
      }
    } catch (err) {
      console.error('Error importing CV:', err);
      setError('Failed to import CV: ' + err.message);
    } finally {
      setImporting(prev => ({ ...prev, [cv.id]: false }));
    }
  };

  const handleDownload = async (cv) => {
    try {
      let blob = await downloadCVAttachment(cv.id);
      
      // If no blob is returned, create a fallback file with CV information
      if (!blob) {
        const cvContent = `
CV Information
==============

Subject: ${cv.subject}
Sender: ${cv.sender}
Date: ${formatDate(cv.date)}
Field: ${cv.field}
File Name: ${cv.fileName}
File Size: ${formatFileSize(cv.fileSize)}

${cv.preview ? `Preview:\n${cv.preview}` : 'No preview available'}

---
This file was generated from email: ${emailAddress}
Downloaded on: ${new Date().toLocaleString()}
        `.trim();
        
        blob = new Blob([cvContent], { type: 'text/plain' });
      }
      
      // Always download a file, even if it's the fallback
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Use original filename if available, otherwise create one
      const downloadFileName = cv.fileName || 
        `${cv.subject.replace(/[^a-z0-9]/gi, '_').substring(0, 50)}.txt`;
      a.download = downloadFileName;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading CV:', err);
      
      // Even on error, try to download a fallback file
      try {
        const fallbackContent = `
CV Information
==============

Subject: ${cv.subject}
Sender: ${cv.sender}
Date: ${formatDate(cv.date)}
Field: ${cv.field}
File Name: ${cv.fileName || 'Unknown'}

${cv.preview ? `Preview:\n${cv.preview}` : 'No preview available'}

Error: ${err.message}

---
This file was generated from email: ${emailAddress}
Downloaded on: ${new Date().toLocaleString()}
        `.trim();
        
        const fallbackBlob = new Blob([fallbackContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(fallbackBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${cv.subject.replace(/[^a-z0-9]/gi, '_').substring(0, 50)}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (fallbackErr) {
        setError('Failed to download CV: ' + err.message);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString();
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const fields = Object.keys(groupedCVs);
  const filteredCVs = selectedField === 'all' 
    ? cvs 
    : groupedCVs[selectedField] || [];

  const searchFilteredCVs = searchQuery
    ? filteredCVs.filter(cv => 
        cv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cv.field.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredCVs;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading CVs from email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Mail className="w-6 h-6 text-purple-600" />
              Email CVs
            </h1>
            <p className="text-gray-600 mt-1">
              CVs received at <span className="font-semibold text-purple-600">{emailAddress}</span>
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject, sender, or field..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>
                  {field} ({groupedCVs[field]?.length || 0})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* CVs by Field */}
      {fields.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">No CVs Found</h3>
          <p className="text-gray-600 mb-4">
            No CVs have been received at {emailAddress} yet.
          </p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Check Again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {(selectedField === 'all' ? fields : [selectedField]).map(field => {
            const fieldCVs = selectedField === 'all' 
              ? groupedCVs[field] 
              : searchFilteredCVs;
            
            if (selectedField !== 'all' && field !== selectedField) return null;
            if (selectedField === 'all' && searchQuery) {
              const filtered = fieldCVs.filter(cv => 
                cv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cv.field.toLowerCase().includes(searchQuery.toLowerCase())
              );
              if (filtered.length === 0) return null;
            }

            return (
              <div key={field} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-purple-100">
                  <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {field}
                    <span className="text-sm font-normal text-gray-600">
                      ({selectedField === 'all' ? groupedCVs[field].length : searchFilteredCVs.length} CVs)
                    </span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {(selectedField === 'all' && !searchQuery
                      ? groupedCVs[field]
                      : searchFilteredCVs.filter(cv => cv.field === field || selectedField !== 'all')
                    ).map(cv => (
                      <div
                        key={cv.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="bg-purple-100 p-2 rounded-lg">
                                <FileText className="w-5 h-5 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{cv.subject}</h3>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                                  <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {cv.sender}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(cv.date)}
                                  </span>
                                  <span className="text-gray-500">
                                    {formatFileSize(cv.fileSize)}
                                  </span>
                                </div>
                                {cv.preview && (
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                    {cv.preview}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleImport(cv)}
                              disabled={importing[cv.id]}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                              {importing[cv.id] ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin" />
                                  Importing...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4" />
                                  Import to Analyzer
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDownload(cv)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

