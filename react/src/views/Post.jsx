import axios from "axios";
import axiosclinet from "../axios-clinet";
import { v4 } from "uuid";
import ImageViewer from 'react-simple-image-viewer';
import { useCallback, useEffect, useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { useStateContext } from "../contexts/ContextProvider";

const Post = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);


    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const { user, token } = useStateContext();
    const [forminput, setForminput] = useState({
        productname: '',
        productprice: '',
        categories: '',
        name: user.name,
    })
    const handlforminput = (e) => {
        setForminput({ ...forminput, [e.target.name]: e.target.value })
    }
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const submitpost = async (e) => {
        //     e.preventDefault();
        //     //  we need to submit the meta data to laravel/mysql  checked,
        //     // we need to send the images to firebase cloud storage
        //     const laravel_mysql = {
        //         // user_id:user.id,
        //         price: forminput.productprice,
        //         productName: forminput.productname
        //     }
        //     const formData = new FormData();
        //     formData.append("file", file);

        //     const response = await fetch("gs://mypromosphere-test.appspot.com", {
        //         method: "POST",
        //         mode: 'no-cors',
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //         body: formData,
        //     });

        //     if (response.status === 200) {
        //         // The file was uploaded successfully.
        //         alert("file uploaded successfully")
        //     } else {
        //         // The file upload failed.
        //     }
        //     // axiosclinet.post(`/api/images/${user.id}`, laravel_mysql, {
        //     //     headers: {
        //     //         'Accept': 'application/vnd.api+json',
        //     //         'Authorization': `Bearer ${token}`
        //     //     },
        //     // }).then((res) => {

        //     // }).catch((err) => console.log('error', err.message))
        // }
    }
    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + ' ' + user.email + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                // const laravel_mysql = {
                //     user_id: user.id,
                //     titleImageUrl:url,
                //     price: forminput.productprice,
                //     productName: forminput.productname
                // }
                // axiosclinet.post(`/api/images/${user.id}`, laravel_mysql, {
                //     headers: {
                //         'Accept': 'application/vnd.api+json',
                //         'Authorization': `Bearer ${token}`
                //     },
                // }).then((res) => {

                // }).catch((err) => console.log('error', err.message))
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    const [uploadProgress, setUploadProgress] = useState([]);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const handleChange = (event) => {
        const files = event.target.files;

        setFiles(files);
    };


    const posting = async (e) => {
        e.preventDefault()
        // const uploadPromises = [];
        // for (const file of files) {
        //     uploadPromises.push(
        //         uploadBytes(ref(storage, `${file.name + ' ' + user.name + v4()}`), file).then((snapshot) => {
        //             getDownloadURL(snapshot.ref).then((url) => {
        //                 const laravel_mysql = {
        //                     // muitpleimages: url,
        //                     user_id: user.id,
        //                     username:user.name,
        //                     categories: forminput.categories,
        //                     titleImageUrl:url,
        //                     price: forminput.productprice,
        //                     productName: forminput.productname
        //                 }
        //                 console.log(url[0])

        //                 axiosclinet.post(`/api/images/${user.id}`, laravel_mysql, {
        //                     headers: {
        //                         'Accept': 'application/vnd.api+json',
        //                         'Authorization': `Bearer ${token}`
        //                     },
        //                 }).then((res) => {
        //                     if (res.data.status === 200) {
        //                         // alert('successfully!!!!!')
        //                         const mutipleimages_mysql = {
        //                              muitpleimages: url,
        //                         }
        //                         axiosclinet.post(`/api/mutipleimages/${user.id}`, mutipleimages_mysql, {
        //                             headers: {
        //                                 'Accept': 'application/vnd.api+json',
        //                                 'Authorization': `Bearer ${token}`
        //                             },
        //                         }).then((res) => {
        //                             if (res.data.status === 200) {
        //                                 // alert('successfully added images!!!!!')
        //                             }
        //                         }).catch((err) => console.log('error', err.message))
        //                     } else if (res.status.data === 404) {
        //                         alert("not successfully")
        //                     }
        //                 }).catch((err) => console.log('error', err.message))
        //             })
        //         })
        //     );
        //     console.log(file)
        // }
        // Define a flag to keep track of whether the code has run
        let hasRun = false;

        // Check if the code has already run
        if (!hasRun) {
            hasRun = true; // Set the flag to true to prevent further executions

            const uploadPromises = [];
            console.log('Code is running...'); // Add a debugging log

            for (const file of files) {
                uploadPromises.push(
                    uploadBytes(ref(storage, `${file.name + ' ' + user.name + v4()}`), file).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            const laravel_mysql = {
                                user_id: user.id,
                                username: user.name,
                                categories: forminput.categories,
                                titleImageUrl: url,
                                price: forminput.productprice,
                                productName: forminput.productname
                            }
                            console.log(url[0])

                            axiosclinet.post(`/api/images/${user.id}`, laravel_mysql, {
                                headers: {
                                    'Accept': 'application/vnd.api+json',
                                    'Authorization': `Bearer ${token}`
                                },
                            }).then((res) => {
                                if (res.data.status === 200) {
                                    const mutipleimages_mysql = {
                                        muitpleimages: url,
                                    }
                                    axiosclinet.post(`/api/mutipleimages/${user.id}`, mutipleimages_mysql, {
                                        headers: {
                                            'Accept': 'application/vnd.api+json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                    }).then((res) => {
                                        if (res.data.status === 200) {
                                            // alert('successfully added images!!!!!')
                                        }
                                    }).catch((err) => console.log('error', err.message))
                                } else if (res.status.data === 404) {
                                    alert("not successful")
                                }
                            }).catch((err) => console.log('error', err.message))
                        })
                    })
                );
                console.log(file)
            }
        } else {
            console.log('Code has already run.'); // Add a debugging log
        }

        try {
            await Promise.all(uploadPromises);
        } catch (error) {
            setError(error);
        }

        if (!error) {
            // Display a success message or redirect to another page.
        } else {
            // Display an error message to the user.
        }
    }

    return (
        <div style={{ marginTop: '59px' }}>
            {forminput.name}
            {user.name}
            {user.id}
            <form onSubmit={posting}>
                <input type="file" multiple onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }} placeholder="file upload magor" /> <br />  <br />
                <input name="productname" value={forminput.productname} onChange={handlforminput} type="text" placeholder="productname" /> <br />  <br />


                <input name="productprice" type="text" value={forminput.productprice} onChange={handlforminput} placeholder="productprice" /> <br />  <br />


                <input name="categories" type="text" value={forminput.categories} onChange={handlforminput} placeholder="categories" />

                <button type="submit">save</button>
                <input type="file" multiple onChange={handleChange} />
            </form>


        </div>
    )
}



export default Post;