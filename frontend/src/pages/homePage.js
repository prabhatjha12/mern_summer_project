import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";

const HomePage = () => {
    const [newFolder, setNewFolder] = useState("");
    const inputRef = useRef(null);
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const { createFolder } = useCreateFolder();
    const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Cloud Home" }]);
    const { getFileFolders, fileFolders } = useGetFileFolders();
    const { isUploadAllowed, uploadFile } = useUploadFile();

    const parentFolder = folderStructure[folderStructure.length - 1];

    const handleDoubleClick = (elem) => {
        if (elem.type === "folder") {
            setFolderStructure([...folderStructure, elem]);
        } else {
            window.open(elem.link);
        }
    };

    const handleAllowCreateFolder = () => {
        setShowCreateFolder(true);
    };

    const handleCreateFolder = async () => {
        if (newFolder.length > 0) {
            await createFolder({
                name: newFolder,
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
            setShowCreateFolder(false);
        }
    };

    useEffect(() => {
        getFileFolders(parentFolder._id);
    }, [folderStructure]);

    const handleBackClick = (clickIdx) => {
        const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
        setFolderStructure(newFolderStructure);
    };

    const handleFileUpload = async (e) => {
        if (isUploadAllowed) {
            const file = e.target.files;
            await uploadFile({
                file: file[0],
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
        } else {
            alert("Uploading is already in progress. Please wait...");
        }
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.mainContainer}>
                <h3 style={styles.heading}>Welcome to Cloud Home</h3>
                <button style={styles.button} onClick={handleAllowCreateFolder}>Create Folder</button>
                <input
                    style={styles.fileUploadInput}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileUpload}
                />
                <ul style={styles.folderList}>
                    {folderStructure.map((elem, idx) => (
                        <li
                            key={idx}
                            style={styles.breadcrumbItem}
                            onClick={() => handleBackClick(idx)}
                        >
                            {elem.name}
                        </li>
                    ))}
                </ul>
                {showCreateFolder && (
                    <div style={styles.createFolderContainer}>
                        <input
                            style={styles.input}
                            value={newFolder}
                            onChange={(e) => setNewFolder(e.target.value)}
                        />
                        <button style={styles.button} onClick={handleCreateFolder}>Create</button>
                        <button style={styles.button} onClick={() => setShowCreateFolder(false)}>Cancel</button>
                    </div>
                )}
                <div style={styles.fileList}>
                    {fileFolders.map((elem) => (
                        <div
                            key={elem._id}
                            style={elem.type === "folder" ? styles.folderItem : styles.fileItem}
                            onDoubleClick={() => handleDoubleClick(elem)}
                        >
                            <p>{elem.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        background: '#f4f7f6',
    },
    mainContainer: {
        backgroundImage: 'url("https://example.com/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '1200px',
        margin: '40px auto',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    button: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: '#fff',
        padding: '12px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '10px 0',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    input: {
        width: '100%',
        maxWidth: '400px',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    fileUploadInput: {
        width: '100%',
        maxWidth: '400px',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #ddd',
        transition: 'border-color 0.3s',
    },
    folderList: {
        listStyleType: 'none',
        padding: '0',
        margin: '20px 0',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
    },
    breadcrumbItem: {
        cursor: 'pointer',
        padding: '8px 16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
    },
    createFolderContainer: {
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
    },
    fileList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    folderItem: {
        backgroundColor: '#f0f8ff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    fileItem: {
        backgroundColor: '#fff3e0',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default HomePage;
