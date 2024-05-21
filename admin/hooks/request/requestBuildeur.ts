'use client'
import 'dotenv/config';

const requestBuildeur = async ({ url, data, method, image = false, onProgress }: any) => {
    const host = process.env.NEXT_PUBLIC_API_APIHOST;
    if (host === undefined) throw new Error("APIHOST is undefined");
    let file = undefined;
    const headers = new Headers();
    if (image) {
        // For image data, use FormData
        const formData = new FormData();
        console.log("data.image", data.image);
        for (let i = 0; i< data.image.length; i++) {
            formData.append("image", data.image[i]);
        }
        // headers.append("Content-Type", "application/x-www-form-urlencoded");
        file = data.image; 
        data = formData;
    } else {
        // For JSON data, stringify it
        console.log("data before stringify", data);
        data = JSON.stringify(data);
        headers.append("Content-Type", "application/json");
        console.log("data", data);
        // headers.append('Access-Control-Allow-Credentials', 'true');
    }

    const config = {
        method: method,
        headers: headers,
        body: data,
        credentials: "include" as RequestCredentials
    };

    //add json function to prototype of XMLHttpRequest
    XMLHttpRequest.prototype.json = function() {
        return JSON.parse(this.responseText);
    };
    
    try {
        if (image) {
            console.log("data.image", data.image);
            // const response = await readFiler(file, url , config, host, onProgress);
            let xhr = new XMLHttpRequest();
            const response = await new Promise((resolve, reject) => {
                xhr.open(method, host + url, true);
                xhr.withCredentials = true;

                xhr.upload.onprogress = (e) => {
                    let calc = e.loaded;
                    let calcAllFileSize = 0;
                    for (let i = 0; i < file.length; i++) {
                        calcAllFileSize += file[i].size;
                    }
                    let uploadprogress = Math.round(100 * calc / calcAllFileSize);
                    onProgress(uploadprogress);
                };
                xhr.onload = () => {
                        resolve(xhr);
                };
                xhr.onerror = () => {
                    reject(xhr);
                };
                xhr.send(data);
            });
            // console.log("response try catche", response);
            return response;
        } else {
            const request = new Request(host + url, config);
            const response = await fetch(request, { signal: new AbortController().signal });
            return response;
        }
    } catch (error) {
        console.log("error request buildeur : ", error);
        throw new Error("Error: Internal server error");
    }
};

const readFiler = async (file, url, config, host, onProgress) => {
    let uploadreader = new FileReader();
    let uploadprogress = 0;
    let uploadstart = 0;
    let done = false;

    return new Promise((resolve, reject) => {
        uploadreader.onprogress = (e) => {
            let calc = uploadstart + e.loaded;
            uploadprogress = Math.round(100 * calc / file.size);
            onProgress(uploadprogress);
            // console.log("uploadprogress", uploadprogress);
            // console.log("loaded onprogress", e.loaded);
            // console.log("total onprogress", e.total);
            // console.log("uploadstart onprogress: ", uploadstart);
            // console.log("file size onprogress: ", file.size)
        };

        uploadreader.onloadend = (e) => {
            let text = uploadreader.result;
            // console.log("text", text);
            // console.log("loaded onloadend", e.loaded);
            // console.log("total onloadend", e.total);
            // console.log("uploadstart onloadend: ", uploadstart);
            // console.log("file size onloadend: ", file.size);

            uploadstart += e.loaded;

            if (done == false) {
                done = true;
                fetch(host + url, config)
                    .then((response) => {
                        console.log("response", response);
                        onProgress(100);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                    nextChunk(uploadstart);
            } else {
                nextChunk(uploadstart);
            }
        };

        const nextChunk = (uploadstart) => {
            if (uploadstart >= file.size) {
                return;
            }
            let max = 256 * 1024;
            if (uploadstart + max > file.size)
                max = file.size - uploadstart;
            let uploadchunk = file.slice(uploadstart, uploadstart + max);
            // console.log("next chunk size:", uploadchunk.size);
            uploadreader.readAsDataURL(uploadchunk);
        };
        
        nextChunk(uploadstart);
    });


};



export default requestBuildeur;
