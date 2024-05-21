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
import Typography from "@mui/material/Typography";
import Loading from "@/components/loading";
import dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";
import useInfinitScroll from "@/components/useInfiniScroll";

const GridPhoto = ({tag, title, activeFilter, typePost}) => {

    const {
        response: responsePosts,
        Error: errorPosts,
        Loading: loadingPost,
        Success: successPosts,
        fetchRequest: photoFetch,
        params: photoParams,
    } = getPostByPagination(typePost);
    const { getTranslation } = useTranslation();
    const { language } = useLanguage();
    const [filteredPost, setFilteredPost] = useState<any>();
    const [post, setPost] = useState([]);
    const [nomorepost, setNomorepost] = useState<boolean>(false);
    const { loadMoreRef: photoRef, page, setPage } = useInfinitScroll({ initPage: 1, treshold: 0.4, rootMargin: "0px", stopPage: nomorepost });
    const [ready, setReady] = useState<boolean>(false);
    const [tagfetch, setTagFetch] = useState(tag);
    const [readyPost, setReadyPost] = useState<boolean[]>([]);

    useEffect(() => {
        console.log("post done usse efect", post);
        console.log("filteredPostDone usse efect", filteredPost);
    }, [post, filteredPost]);

    useEffect(() => {
        if (activeFilter) {
            setFilteredPost({});
        } else setFilteredPost([])
        if (page <= 1) {
            photoFetch({ url: photoParams.url + "/" + page + "/" + tag, method: photoParams.method });
        }
    }, []);

    
    useEffect(() => {
        setReady(false);
        if (nomorepost) return;
        if (page > 1) {
            photoFetch({ url: photoParams.url + "/" + page + "/" + tagfetch, method: photoParams.method });
        }
    }, [page]);

    useEffect(() => {
        if (tag.toLowerCase() === "terminer") return;
        if (responsePosts && successPosts) {
            if ((responsePosts as any []).length < 10) {
                setNomorepost(true);
            }
            setPost((prevPost) => [...prevPost, ...responsePosts]);
        }
    }, [responsePosts]);

    useEffect(() => {
        if (tag.toLowerCase() === "en cours") return;
        if (responsePosts && successPosts) {
            const oldPost = filteredPost?.[tagfetch]?.posts || [];
            const newPosts = responsePosts;
            let postState = {
                posts: [...oldPost, ...newPosts],
                page: page,
                noMorePost: nomorepost,
            }
            if ((responsePosts as any[]).length < 10)  {
                setNomorepost(true);
                postState.noMorePost = true;
            }
            setFilteredPost((prev) => {
                return { ...prev, [tagfetch]: postState };
            });
            setPost((prevPost) => [...prevPost, ...newPosts]);
            setReady(true);
        }
    }, [responsePosts]);


    const sortByDateStartBefore = (a, b) => {
        return dayjs(a.createdAt).isBefore(dayjs(b.createAt)) ? -1 : 1;
    };
    const sortByDateStartAfter = (a, b) => {
        return dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1;
    };

    const handleFilterPost = (filteredPostFromFilter, tag) => {
        if (!activeFilter) {
            setFilteredPost(filteredPostFromFilter);
            return;
        }
        let newTag = "";
        if (tag === "all") {
            newTag = "terminer";
        } else {
            tag.tag_translate.map((tag) => {
                if (tag.language === "fr") {
                    newTag = tag.name;
                }
            });
        }
        if (newTag !== tagfetch) {
            setTagFetch(newTag);
            const posts = filteredPost?.[newTag]?.posts || [];
            let page = filteredPost?.[newTag]?.page || 1
            setPost(posts);
            if ( posts?.length != 0 && (posts?.length % (page * 10)) != 0) {
                setNomorepost(true);
            } else {
                setNomorepost(false);
            }
            setPage(page);
            
            if ((posts.length / (page*10)) === page) return
            if (posts?.length != 0 && (posts?.length % (page * 10)) != 0) return;
            photoFetch({ url: photoParams.url + "/" + page + "/" + newTag, method: photoParams.method });
        }
    };

    console.log("filtererdpost aaaaaaaaa", filteredPost);
    return (    
        <div>
            <div className="min-h-[500px]">
                <div className="flex flex-col items-center justify-center m-4">
                    <h1 className="text-4xl font-bold text-white">{title[language]}</h1>
                    <Divider />
                </div>
                <GridPosts
                    loading={loadingPost}
                    error={errorPosts}
                    success={successPosts}
                    response={post}
                    activeFilter={activeFilter}
                    handleFilterPost={handleFilterPost}
                    typePost={"photography"}
                >
                    {((activeFilter && filteredPost?.[tagfetch]?.posts) || (!activeFilter && filteredPost) || []).map((post, index) => (
                        <ReorderGrid key={index} postId={post.id} post={post} classname={"flex flex-col items-center justify-center"}>
                            <Card
                                
                                sx={{ width: 250, height: 250 }}
                                className={` grid-item image-container flex flex-col items-center justify-center !m-4 ${
                                    !readyPost[index] ? "opacity-0" : "opacity-1"
                                } transition-opacity ease-in !duration-[750ms]`}
                               
                            >
                                <CardMedia
                                    component="img"
                                    // image={post.Photography_post.image}
                                    image={`https://picsum.photos/500/600/?random=${index}`}
                                    alt={post.Photography_post.image.split("/").pop()}
                                    sx={{ objectFit: "containe" }}
                                    onLoad={() => {
                                        setReadyPost((prev) => {
                                            return [...prev, (prev[index] = true)];
                                        });
                                    }}
                                />
                                <Link href={`/photography?slug=${post.slug.replace(/ /g, "-")}`}>
                                    <Typography gutterBottom variant="h5" className="content-container " component="div">
                                        {getTranslation(post.translations, "title", language)}
                                    </Typography>
                                </Link>
                            </Card>
                        </ReorderGrid>
                    ))}
                </GridPosts>
            </div>
            <div className="h-[250px] text-center m-auto" ref={photoRef}>
                { loadingPost && (
                    <div className="h-[250px] w-[250px] max-h-[250px] max-w-[250px]">
                        <Loading display={true} notInModal={true} />
                    </div>
                )}
            </div>
        </div>
    )
};

export default GridPhoto;