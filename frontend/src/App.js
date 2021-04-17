import "./App.css"
import Dropzone from "react-dropzone"
import axios from "axios"

function App() {
  const onDrop = (files) => {
    const [uploadedFile] = files
    setFile(uploadedFile)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result)
    }
    fileReader.readAsDataURL(uploadedFile)
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png|pdf|json)$/))
  }

  return (
    <div className="upload-section">
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
            <input {...getInputProps()} />
            <p>Drag and drop a file OR click here to select a file</p>
            {file && (
              <div>
                <strong>Selected file:</strong> {file.name}
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {previewSrc ? (
        isPreviewAvailable ? (
          <div className="image-preview">
            <img className="preview-image" src={previewSrc} alt="Preview" />
          </div>
        ) : (
          <div className="preview-message">
            <p>No preview available for this file</p>
          </div>
        )
      ) : (
        <div className="preview-message">
          <p>Image preview will be shown here after selection</p>
        </div>
      )}
    </div>
  )
}

export default App
