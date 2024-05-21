"use client";
import { getPostByPagination, getPostByType } from "../request/requestPost";
import { GridPosts, ImgGrid, ContentGrid, ReorderGrid } from "@/components/posts/grids";
import { useState, useEffect, useRef, Suspense, useLayoutEffect, use } from "react";
import useTranslation from "@/hooks/translation/useTranslation";
import { useLanguage } from "@/contextProvider/languageProvider";
import "@/app/css/hover.css";
import "dotenv/config";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import Details from "./details";
import Loading from "@/components/loading";
import dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";
import { CircularProgress, Tooltip     } from "@mui/material";
import useInfinitScroll from "@/components/useInfiniScroll";

const RouteHandlerReal = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    console.log("slug", slug);
    if (slug) {
        return <Details slug={slug} />;
    } else {
        return <RealPage />;
    }
};

const RealPage = () => {

    const textTrad = {
        upcoming: {
            fr: "En cours",
            en: "In progress",
        },
        past: {
            fr: "Realisation enterieure",
            en: "Past realizations",
        },
    };
    const {
        response: responsePosts,
        Error: errorPosts,
        Loading: loadingPost,
        Success: successPosts,
        fetchRequest: photoFetch,
        params: photoParams,
    } = getPostByPagination("realization");
    const {
        response: responsePostsDone,
        Error: errorPostsDone,
        Loading: loadingPostDone,
        Success: successPostsDone,
        fetchRequest: photoFetchDone,
        params: photoParamsDone,
    } = getPostByPagination("realization");
    const { getTranslation } = useTranslation();
    const { language } = useLanguage();
    const [filteredPostProg, setFilteredPostProg] = useState([]);
    const [filteredPostDone, setFilteredPostDone] = useState<any>({});
    const [postDone, setPostDone] = useState([]);
    const [postInprogresse, setPostInprogresse] = useState([]);
    const [nomorepostInProgress, setNomorepostInProgress] = useState(false);
    const [nomorepostInDone, setNomorepostInDone] = useState<boolean>(false);
    const { loadMoreRef: realRefProg, page: pageProgress } = useInfinitScroll();
    const { loadMoreRef: realRefDone, page: pageDone, setPage: setPageDone } = useInfinitScroll({ initPage: 1, treshold: 0.4, rootMargin: "0px", stopPage: nomorepostInDone });
    const [ready, setReady] = useState<boolean>(false);
    const [tagfetchDone, setTagFetchDone] = useState("Terminer");
    const [readyPostDone, setReadyPostDone] = useState<boolean[]>([]);

    useEffect(() => {
        console.log("post done usse efect", postDone);
        console.log("filteredPostDone usse efect", filteredPostDone);
    }, [postDone, filteredPostDone]);

    useEffect(() => {
        if (pageProgress <= 1) {
            photoFetch({ url: photoParams.url + "/" + pageProgress + "/" + "En cours", method: photoParams.method });
        }
        if (pageDone <= 1) {
            console.log("tagfetchDone tagftch use effect init: ", tagfetchDone);
            photoFetchDone({ url: photoParamsDone.url + "/" + pageDone + "/" + tagfetchDone, method: photoParamsDone.method });
        }
    }, []);

    useEffect(() => {
        console.log("nomorepostInProgress", nomorepostInProgress);
        if (nomorepostInProgress) return;
        if (pageProgress > 1) {
            photoFetch({ url: photoParams.url + "/" + pageProgress + "/" + "En cours", method: photoParams.method });
        }
    }, [pageProgress]);

    useEffect(() => {
        setReady(false);
        console.log("nomorepostInDone 55", nomorepostInDone);
        if (nomorepostInDone) return;
        if (pageDone > 1) {
            photoFetchDone({ url: photoParamsDone.url + "/" + pageDone + "/" + tagfetchDone, method: photoParamsDone.method });
        }
    }, [pageDone]);

    useEffect(() => {
        if (responsePosts && successPosts) {
            console.log("responsePosts", responsePosts);
            if (responsePosts.length < 10) {
                setNomorepostInProgress(true);
            }
            setPostInprogresse((prevPost) => [...prevPost, ...responsePosts]);
            
        }
    }, [responsePosts]);

    useEffect(() => {
        if (responsePostsDone && successPostsDone) {
            let page = pageDone
            console.log("totototo", filteredPostDone?.[tagfetchDone]?.posts)
            const oldPost = filteredPostDone?.[tagfetchDone]?.posts || [];
            const newPosts = responsePostsDone;
            let postdone = {
                posts: [...oldPost, ...newPosts],
                page: page,
                noMorePost: nomorepostInDone,
            }
            
            console.log("responsePostsDone", responsePostsDone);
            if (responsePostsDone.length < 10) {
                setNomorepostInDone(true);
                postdone.noMorePost = true;
            }
            setFilteredPostDone((prev) => {
                return { ...prev, [tagfetchDone]: postdone };
            });
            setPostDone((prevPost) => [...prevPost, ...newPosts]);
            setReady(true);
        }
    }, [responsePostsDone]);


    const sortByDateStartBefore = (a, b) => {
        return dayjs(a.createdAt).isBefore(dayjs(b.createAt)) ? -1 : 1;
    };
    const sortByDateStartAfter = (a, b) => {
        return dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1;
    };

    const handleFilterPostProgress = (filteredPost) => {
        console.log("filteredpostProg: ", filteredPost);
        // filteredPost.sort(sortByDateStartBefore);
        setFilteredPostProg(filteredPost);
    };
    const handleFilterPostDone = (filteredPost, tag) => {
        console.log("filteredpostDone: ", filteredPost);
        console.log("tag", tag);
        let newTag = "";
        if (tag === "all") {
            newTag = "Terminer";
        } else {
            tag.tag_translate.map((tag) => {
                if (tag.language === "fr") {
                    newTag = tag.name;
                }
            });
        }
        if (newTag !== tagfetchDone) {
            setTagFetchDone(newTag);
            const posts = filteredPostDone?.[newTag]?.posts || [];
            let page = filteredPostDone?.[newTag]?.page || 1
            let stopPost = filteredPostDone?.[newTag]?.noMorePost || false;
            console.log("newTag tagftch use effect: ", newTag);
            console.log("filteredPostDone", posts);
            setPostDone(posts);
            // setReadyPostDone([])
            console.log("page", page)
            console.log((posts?.length % (page * 10)));
            console.log(posts?.length != 0 && (posts?.length % (page * 10)) != 0)
            if ( posts?.length != 0 && (posts?.length % (page * 10)) != 0) {
                console.log("nomorepostInDone true");
                setNomorepostInDone(true);
            } else {
                setNomorepostInDone(false);
            }
            setPageDone(page);
            
            console.log("paaaagggggeeeee : " , page);
            console.log("fecthpost filter : ", posts.length /( page*10))
            if ((posts.length / (page*10)) === page) return
            if (posts?.length != 0 && (posts?.length % (page * 10)) != 0) return;
            photoFetchDone({ url: photoParamsDone.url + "/" + page + "/" + newTag, method: photoParamsDone.method });
        }
    };

    const displayComponentGridInProgress = () => {
        const [ready, setReady] = useState<boolean[]>([]);
        // console.log("postProg", post)
        const Title = () => {
            return (
                <div className="flex flex-col items-center justify-center m-4">
                    <h1 className="text-4xl  text-white font-bold">{textTrad.upcoming[language]}</h1>
                    <Divider />
                </div>
            );
        };

        // if (!readyProg && postInprogresse.length == 0) {
        //     return (
        //         <div className="flex flex-col items-center justify-center">
        //             <h1 className="text-4xl font-bold">{textTrad.upcoming[language]}</h1>
        //             <Divider />
        //             <h1 className="text-2xl font-bold">Aucun post pour le moment</h1>
        //         </div>
        //     );
        // }

        return (
            <>
            <div className="min-h-[500px]">

                <Title />
                <GridPosts
                    loading={loadingPost}
                    error={errorPosts}
                    success={successPosts}
                    response={postInprogresse}
                    activeFilter={false}
                    handleFilterPost={handleFilterPostProgress}
                    typePost={"realization"}
                >
                    {((filteredPostProg as any) || []).map((post, index) => (
                        // <ReorderGrid key={post.id} postId={post.id} post={post} classname={"flex flex-col items-center justify-center"}>
                            <Card
                            key={index}
                                sx={{ width: 250, height: 250 }}
                                className={` grid-item image-container flex flex-col items-center justify-center !m-4 ${
                                    !ready[index] ? "opacity-0" : "opacity-1"
                                } transition-opacity ease-in !duration-[750ms]`}
                                ref={realRefProg}
                            >
                                <CardMedia
                                    component="img"
                                    // image={post.Realization_post.image}
                                    image={`https://picsum.photos/500/600/?random=${index}`}
                                    alt={post.Realization_post.image.split("/").pop()}
                                    sx={{ objectFit: "containe" }}
                                    onLoad={() => { 
                                        setReady((prev) => {
                                            return [...prev, (prev[index] = true)];
                                        });
                                    }}
                                />
                                <Link href={`/realizations?slug=${post.slug.replace(/ /g, "-")}`}>
                                    <Typography gutterBottom variant="h5" className="content-container " component="div">
                                        {getTranslation(post.translations, "title", language)}
                                    </Typography>
                                </Link>
                            </Card>
                        // </ReorderGrid>
                    ))}
                </GridPosts>
            </div>
                <div ref={realRefProg}></div>
            </>
        );
    };

    const displayComponentGridDone = () => {
        
        // console.log("postDone",post)
        // console.log("tag fetch done" , tagfetchDone)
        const Title = () => {
            return (
                <div className="flex flex-col items-center justify-center m-4">
                    <h1 className="text-4xl text-white font-bold">{textTrad.past[language]}</h1>
                    <Divider />
                </div>
            );
        };


        // if (!readyDone && postDone.length == 0) {
        //     return (
        //         <div className="flex flex-col items-center justify-center">
        //             <h1 className="text-4xl font-bold">{textTrad.past[language]}</h1>
        //             <Divider />
        //             <h1 className="text-2xl font-bold">Aucun post pour le moment</h1>
        //         </div>
        //     );
        // }
        console.log("postDone", postDone);
        console.log(ready)
        return (
            <>
            <div className="min-h-[500px]">

                <Title />
                <GridPosts
                    loading={loadingPost}
                    error={errorPostsDone}
                    success={successPostsDone}
                    response={postDone}
                    activeFilter={true}
                    handleFilterPost={handleFilterPostDone}
                    typePost={"realization"}
                >
                    {((filteredPostDone?.[tagfetchDone]?.posts as any) || []).map((post, index) => (
                        <ReorderGrid key={index} postId={post.id} post={post} classname={"flex flex-col items-center justify-center"}>
                            <Card
                                sx={{ width: 250, height: 250 }}
                                className={` grid-item image-container flex flex-col items-center justify-center !m-4 ${
                                    !readyPostDone[index] ? "opacity-0" : "opacity-1"
                                } transition-opacity ease-in !duration-[750ms]`}
                               
                            >
                                <CardMedia
                                    component="img"
                                    // image={post.Realization_post.image}
                                    image={`https://picsum.photos/500/600/?random=${index}`}
                                    alt={post.Realization_post.image.split("/").pop()}
                                    sx={{ objectFit: "containe" }}
                                    onLoad={() => {
                                        setReadyPostDone((prev) => {
                                            return [...prev, (prev[index] = true)];
                                        });
                                    }}
                                />
                                <Link href={`/realizations?slug=${post.slug.replace(/ /g, "-")}`}>
                                    <Typography gutterBottom variant="h5" className="content-container " component="div">
                                        {getTranslation(post.translations, "title", language)}
                                    </Typography>
                                </Link>
                            </Card>
                        </ReorderGrid>
                    ))}
                </GridPosts>
            </div>
            <div className="h-[250px] text-center m-auto" ref={realRefDone}>
                { loadingPostDone && (
                    <div className="h-[250px] w-[250px] max-h-[250px] max-w-[250px]">
                        <Loading display={true} notInModal={true} />
                    </div>
                )}
            </div>
            </>
        );
    };

    // if (errorPosts) return <Loading display={true} />;
    // if (!readyProg && !readyDone) {
    //     return <Loading display={true} />;
    // }

    return (
        <>
            <div className="flex items-center justify-center flex-col">
                <div className="container flex flex-col ">{displayComponentGridInProgress()}</div>
                <div className="container flex flex-col ">{displayComponentGridDone()}</div>
            </div>
        </>
    );
};
export default RouteHandlerReal;
