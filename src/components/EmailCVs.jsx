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
      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-4">
        <div className="text-center">
          <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-purple-600 mx-auto mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-gray-600">Loading CVs from email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
              <span className="truncate">Email CVs</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">
              CVs received at <span className="font-semibold text-purple-600 break-all">{emailAddress}</span>
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 w-full sm:w-auto flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject, sender, or field..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-0"
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
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm sm:text-base text-red-700 break-words">{error}</p>
        </div>
      )}

      {/* CVs by Field */}
      {fields.length === 0 ? (
        <div className="bg-white rounded-xl p-6 sm:p-12 text-center shadow-sm">
          <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No CVs Found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 break-words px-4">
            No CVs have been received at <span className="font-semibold break-all">{emailAddress}</span> yet.
          </p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 text-sm sm:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-100">
                  <h2 className="text-base sm:text-lg font-bold text-purple-900 flex flex-wrap items-center gap-2">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="break-words">{field}</span>
                    <span className="text-xs sm:text-sm font-normal text-gray-600">
                      ({selectedField === 'all' ? groupedCVs[field].length : searchFilteredCVs.length} CVs)
                    </span>
                  </h2>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {(selectedField === 'all' && !searchQuery
                      ? groupedCVs[field]
                      : searchFilteredCVs.filter(cv => cv.field === field || selectedField !== 'all')
                    ).map(cv => (
                      <div
                        key={cv.id}
                        className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-purple-300 hover:shadow-md transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 sm:gap-3 mb-2">
                              <div className="bg-purple-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-base sm:text-lg mb-1 break-words">{cv.subject}</h3>
                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                  <span className="flex items-center gap-1 break-all">
                                    <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="truncate">{cv.sender}</span>
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    {formatDate(cv.date)}
                                  </span>
                                  <span className="text-gray-500">
                                    {formatFileSize(cv.fileSize)}
                                  </span>
                                </div>
                                {cv.preview && (
                                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3">
                                    {cv.preview}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-col gap-2 w-full sm:w-auto sm:flex-shrink-0">
                            <button
                              onClick={() => handleImport(cv)}
                              disabled={importing[cv.id]}
                              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                              {importing[cv.id] ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin" />
                                  <span>Importing...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4" />
                                  <span className="sm:hidden">Import</span>
                                  <span className="hidden sm:inline">Import to Analyzer</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDownload(cv)}
                              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
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

