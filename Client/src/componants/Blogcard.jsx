import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Blogcard() {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { title } = useParams();
  const ref = collection(firestore, title);

  useEffect(() => {
    const getBlogData = async () => {
      setIsLoading(true);
    
      const q = query(ref, orderBy("uploadDate", "desc"));

      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogData(fetchedData);
      setIsLoading(false);
    };

    getBlogData();
  }, [title]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";   
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4 w-3/5">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        blogData.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col items-start gap-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-6xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full"
          >
            <img
              className="object-cover w-56 rounded-t-lg h-72  md:rounded-none md:rounded-s-lg flex p-2 items-center justify-center"
              src={blog.coverImageUrl}
              alt={blog.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blog.description}
              </p>
              <div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Uploaded date: {blog.uploadedDate}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDownload(blog.documentUrl)}
                  className="inline-flex font-medium items-center text-blue-600 hover:underline"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Blogcard;
