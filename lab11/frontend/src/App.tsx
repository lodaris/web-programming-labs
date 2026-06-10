import { useState, useRef, useCallback } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

interface FileMetadata {
  filename: string
  originalname: string
  size: number
  mimetype: string
  url: string
}

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<FileMetadata | null>(null)
  const [allFiles, setAllFiles] = useState<FileMetadata[]>([])
  const [error, setError] = useState<string | null>(null)
  const [clientError, setClientError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadAllFiles = useCallback(async () => {
    const res = await axios.get<FileMetadata[]>(`${API_URL}/files`)
    setAllFiles(res.data)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (!ALLOWED_TYPES.includes(file.type)) {
      setClientError('Дозволені лише зображення формату JPEG, PNG або WebP')
      setSelectedFile(null)
      setPreviewUrl(null)
      return
    }
    if (file.size > MAX_SIZE) {
      setClientError('Файл перевищує максимальний розмір 5 МБ')
      setSelectedFile(null)
      setPreviewUrl(null)
      return
    }
    setClientError(null)
    setError(null)
    setUploadedFile(null)
    setProgress(0)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    const formData = new FormData()
    formData.append('file', selectedFile)
    setUploading(true)
    setError(null)
    setProgress(0)
    try {
      const res = await axios.post<FileMetadata>(`${API_URL}/files`, formData, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100))
        },
      })
      setUploadedFile(res.data)
      setSelectedFile(null)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
      if (inputRef.current) inputRef.current.value = ''
      loadAllFiles()
    } catch (err: any) {
      const status = err?.response?.status
      const msg = err?.response?.data?.message
      if (status === 422 || status === 400) {
        setError(msg || 'Файл не пройшов валідацію: невірний тип або розмір')
      } else {
        setError('Помилка сервера при завантаженні файлу')
      }
    } finally {
      setUploading(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Завантаження зображень</h1>
      <div style={{ border: '2px dashed #ccc', borderRadius: 8, padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          style={{ display: 'block', margin: '0 auto 1rem' }}
        />
        <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>JPEG, PNG або WebP, до 5 МБ</p>
      </div>
      {clientError && <p style={{ color: 'red', marginBottom: '1rem' }}>{clientError}</p>}
      {previewUrl && selectedFile && (
        <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
          <p style={{ fontWeight: 'bold', marginTop: 0 }}>Попередній перегляд:</p>
          <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 4 }} />
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#555' }}>
            {selectedFile.name} — {formatSize(selectedFile.size)} — {selectedFile.type}
          </p>
        </div>
      )}
      {selectedFile && !clientError && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', cursor: uploading ? 'not-allowed' : 'pointer', marginBottom: '1rem' }}
        >
          {uploading ? 'Завантаження...' : 'Завантажити'}
        </button>
      )}
      {uploading && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ background: '#eee', borderRadius: 4, overflow: 'hidden', height: 24 }}>
            <div style={{ width: progress + '%', background: '#4caf50', height: '100%', transition: 'width 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>
              {progress}%
            </div>
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      {uploadedFile && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #4caf50', borderRadius: 8, background: '#f1fff1' }}>
          <p style={{ color: '#2e7d32', fontWeight: 'bold', marginTop: 0 }}>Файл успішно завантажено!</p>
          <img src={uploadedFile.url} alt={uploadedFile.originalname} style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 4, display: 'block', marginBottom: '0.5rem' }} />
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>
            {uploadedFile.originalname} — {formatSize(uploadedFile.size)} — {uploadedFile.mimetype}
          </p>
        </div>
      )}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{ margin: 0 }}>Завантажені файли</h2>
          <button onClick={loadAllFiles} style={{ padding: '0.25rem 0.75rem' }}>Оновити</button>
        </div>
        {allFiles.length === 0 ? (
          <p style={{ color: '#888' }}>Немає завантажених файлів</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {allFiles.map(f => (
              <div key={f.filename} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
                <img src={f.url} alt={f.originalname} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#555' }}>
                  <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.originalname}</p>
                  <p style={{ margin: 0 }}>{formatSize(f.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}