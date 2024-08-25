import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setiSLoading] = useState(true);
  const [Category, setSelectedCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [documentFilePreview, setDocumentFilePreview] = useState(null);

  const navigate = useNavigate();

  const ref = collection(firestore, "blogPosts");

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
    setDocumentFilePreview(file.name);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !documentFile) {
      alert("Please select both a cover image and a document to upload.");
      return;
    }

    if (!Category) {
      alert("Please select a category.");
      return;
    }

    try {
      const coverImageRef = storageRef(
        storage,
        `cover-image/${Date.now()}-${coverImage.name}`
      );
      const documentRef = storageRef(
        storage,
        `blog-pdf/${Date.now()}-${documentFile.name}`
      );

      // Upload Cover Image
      const coverUploadTask = uploadBytesResumable(coverImageRef, coverImage);
      coverUploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress handling (optional)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Cover image upload progress: ${Math.round(progress)}%`);
        },
        (error) => {
          console.error("Error uploading cover image:", error);
        },
        async () => {
          const coverDownloadURL = await getDownloadURL(
            coverUploadTask.snapshot.ref
          );
          console.log("Cover image URL:", coverDownloadURL);

          // Upload Document
          const documentUploadTask = uploadBytesResumable(
            documentRef,
            documentFile
          );
          documentUploadTask.on(
            "state_changed",
            (snapshot) => {
              // Progress handling (optional)
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Document upload progress: ${Math.round(progress)}%`);
            },
            (error) => {
              console.error("Error uploading document:", error);
            },
            async () => {
              const documentDownloadURL = await getDownloadURL(
                documentUploadTask.snapshot.ref
              );
              console.log("Document URL:", documentDownloadURL);

              // Save data with URLs to Firestore
              const data = {
                title,
                description,
                category: Category,
                coverImageUrl: coverDownloadURL,
                documentUrl: documentDownloadURL,
                uploadDate: new Date(),
              };

              try {
                await addDoc(collection(firestore, Category), data);
                const q = query(ref, orderBy("uploadDate", "desc"));
                // await addDoc(q, data);
                console.log("Document successfully written!");

                setTitle("");
                setDescription("");
                setSelectedCategory("");
                setCoverImage(null);
                setDocumentFile(null);
                setCoverImagePreview(null);
                setDocumentFilePreview(null);
              } catch (error) {
                console.error("Error saving data to Firestore:", error);
              }
            }
          );
        }
      );
    } catch (error) {
      console.error("Error during the submission process:", error);
    }
  };

  useEffect(() => {
    const getBlogData = async () => {
      setiSLoading(true);
      // const q = query(ref);
      const q = query(
        collection(firestore, Category),
        orderBy("uploadDate", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogData(fetchedData);
      setiSLoading(false);
    };

    getBlogData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully signed out");
      navigate("/");
      // Optionally redirect to a login page or clear user-specific data
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle potential errors (e.g., display an error message to the user)
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="bg-black h-20 text-white flex items-center justify-between px-4">
        <h1 className="text-center flex-grow">
          Hi Sasuni aranya, Welcome back to your Wisdompedia blog site...
        </h1>
        <button
          type="button"
          className="text-white hover:text-white border border-gray-400 hover:bg-blue-950 focus:ring-1 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm w-44 px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <h1 className="font-normal text-4xl mb-10">Upload your new blog</h1>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <form className="ml-10 mr-10" onSubmit={handleSubmit}>
            <div>
              <form class="max-w-sm mx-auto">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select blog category
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={Category}
                  onChange={handleCategoryChange}
                >
                  <option selected>Choose a blog category</option>
                  <option value="Buddhist-Psychology">
                    Buddhist Psychology
                  </option>
                  <option value="Applied-Buddhism">Applied Buddhism</option>
                  <option value="Indexed-Journals">Indexed Journals</option>
                  <option value="Research-Paper">Research Paper</option>
                </select>
              </form>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Blog Title :
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter the blog title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="flex gap-10">
              <div className="items-center justify-center w-full mb-5 flex-row">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Cover Image :
                </label>
                <label
                  htmlFor="dropzone-file-cover"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 w-72">
                    {coverImagePreview ? (
                      <img
                        src={coverImagePreview}
                        alt="Cover Preview"
                        className="mb-2"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file-cover"
                    type="file"
                    className="hidden"
                    onChange={handleCoverImageChange}
                  />
                </label>
              </div>

              <div className="flex-row items-center justify-center w-full mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Document :
                </label>
                <label
                  htmlFor="dropzone-file-document"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 w-72">
                    {documentFilePreview ? (
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {documentFilePreview}
                      </p>
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file-document"
                    type="file"
                    className="hidden"
                    onChange={handleDocumentChange}
                  />
                </label>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Little description about your blog post :
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-56"
                placeholder="Write your thoughts here..."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>

            <div>
              <h2>Fetched Blog Data</h2>
              {isLoading ? (
                <p>Loading data...</p>
              ) : blogData.length > 0 ? (
                blogData.map((item) => (
                  <div key={item.id}>
                    <h3>Title: {item.title}</h3>
                    <p>Description: {item.description}</p>
                  </div>
                ))
              ) : (
                <p>No blog data found.</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Admin;
