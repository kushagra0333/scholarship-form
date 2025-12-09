// FILE: src/components/DocumentsStep.jsx
import { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext';

const DocumentsStep = () => {
  const { formData, updateFormData } = useForm();
  const [documents, setDocuments] = useState(formData.documents || []);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const [currentDocType, setCurrentDocType] = useState(null);

  useEffect(() => {
    updateFormData({ documents });
  }, [documents, updateFormData]);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

  const documentTypes = [
    { id: 'photo', label: 'Passport Size Photo', required: true },
    { id: 'aadhaar', label: 'Aadhaar Card', required: true },
    { id: 'marksheet', label: 'Previous Year Marksheet', required: true },
    { id: 'income', label: 'Income Certificate', required: true },
    { id: 'bank', label: 'Bank Passbook', required: true },
    { id: 'category', label: 'Category Certificate', required: false },
    { id: 'bonafide', label: 'Bonafide Certificate', required: false },
  ];

  const openFileUpload = (docTypeId) => {
    setCurrentDocType(docTypeId);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !currentDocType) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File exceeds 5MB limit");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("File must be JPEG, PNG or PDF");
      return;
    }

    const extension = file.name.split('.').pop();
    const finalName = `name_${currentDocType}.${extension}`;

    const reader = new FileReader();

    reader.onloadstart = () => {
      setUploadProgress(prev => ({ ...prev, [finalName]: 0 }));
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(prev => ({ ...prev, [finalName]: progress }));
      }
    };

    reader.onload = () => {
      const newDoc = {
        id: currentDocType,
        name: finalName,
        type: file.type,
        size: file.size,
        data: reader.result,
        uploadDate: new Date().toISOString(),
      };

      setDocuments(prev => {
        const filtered = prev.filter(d => d.id !== currentDocType);
        return [...filtered, newDoc];
      });

      setUploadProgress(prev => {
        const x = { ...prev };
        delete x[finalName];
        return x;
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const getFileIcon = (type) => {
    if (type.includes("image")) return "🖼️";
    if (type.includes("pdf")) return "📄";
    return "📎";
  };

  const getStatusBadge = (uploaded, required) => {
    if (uploaded)
      return <span className="badge bg-success">Uploaded ✓</span>;

    return (
      <span className={`badge ${required ? "bg-danger" : "bg-secondary"}`}>
        {required ? "Required" : "Optional"}
      </span>
    );
  };

  return (
    <div className="documents-step container fade-in">

      <h2 className="text-center mb-4">Upload Required Documents</h2>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileSelect}
      />

      <div className="alert alert-info mb-4">
        Upload all documents clearly. Maximum size: <strong>5MB</strong>.<br />
        Accepted formats: <strong>JPG, PNG, PDF</strong>.
      </div>

      {/* Modern Card Layout */}
      <div className="row g-3">
        {documentTypes.map((doc) => {
          const uploaded = documents.find(d => d.id === doc.id);

          return (
            <div className="col-12" key={doc.id}>
              <div className="card shadow-sm p-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                
                {/* Left side */}
                <div className="d-flex flex-column">
                  <span className="fw-bold mb-1">{doc.label}</span>
                  <div className="d-flex align-items-center gap-2 ">
                    {getStatusBadge(uploaded, doc.required)}

                    {uploaded && (
                      <span className="text-red small">
                        {getFileIcon(uploaded.type)} {uploaded.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side */}
                <button
                  className={`btn ${uploaded ? "btn-outline-primary" : "btn-primary"} btn-sm mt-3 mt-md-0`}
                  onClick={() => openFileUpload(doc.id)}
                >
                  {uploaded ? "Re-upload" : "Upload Document"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload progress card */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="card shadow-sm mt-4 p-3">
          <h5 className="mb-2">Uploading...</h5>
          {Object.entries(uploadProgress).map(([name, progress]) => (
            <div key={name} className="mb-3">
              <div className="d-flex justify-content-between">
                <span>{name}</span>
                <span>{progress}%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default DocumentsStep;
