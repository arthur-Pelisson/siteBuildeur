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
import { CardContent, CircularProgress, Tooltip } from "@mui/material";
import useInfinitScroll from "@/components/useInfiniScroll";
import formateDate from "@/utils/formateDate";
const RouteHandlerBlog = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    if (slug) {
        return <Details slug={slug} />;
    } else {
        return <BlogPage />;
    }
};

const BlogPage = () => {
    const textTrad = {
        readMore : {
            fr: "En lire plus",
            en: "Read more"
        }
    };
    const {
        response: responsePosts,
        Error: errorPosts,
        Loading: loadingPost,
        Success: successPosts,
        fetchRequest: blogFetch,
        params: blogParams,
    } = getPostByPagination("blog");
    const { getTranslation } = useTranslation();
    const { language } = useLanguage();
    const [filteredPostProg, setFilteredPostProg] = useState([]);
    const [postInprogresse, setPostInprogresse] = useState([]);
    const [nomorepostInProgress, setNomorepostInProgress] = useState(false);
    const { loadMoreRef: frameRefProg, page: pageProgress } = useInfinitScroll();
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (pageProgress <= 1) {
            blogFetch({ url: blogParams.url + "/" + pageProgress, method: blogParams.method });
        }
    }, []);

    useEffect(() => {
        console.log("nomorepostInProgress", nomorepostInProgress);
        if (nomorepostInProgress) return;
        if (pageProgress > 1) {
            blogFetch({ url: blogParams.url + "/" + pageProgress, method: blogParams.method });
        }
    }, [pageProgress]);

    useEffect(() => {
        if (responsePosts && successPosts) {
            console.log("responsePosts", responsePosts);
            if (responsePosts.length < 10) {
                setNomorepostInProgress(true);
            }
            setPostInprogresse((prevPost) => [...prevPost, ...responsePosts]);
        }
    }, [responsePosts]);

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

    const displayComponentGridInProgress = () => {
        const [ready, setReady] = useState<boolean[]>([]);
        // console.log("postProg", post)
        const Title = () => {
            return (
                <div className="flex flex-col items-center justify-center m-4">
                    {/* <h1 className="text-4xl text-white font-bold">{textTrad.upcoming[language]}</h1> */}
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
                <div className="min-h-[500px] w-[90%] flex flex-col justify-center">
                    <Title />
                    <GridPosts
                        loading={loadingPost}
                        error={errorPosts}
                        success={successPosts}
                        response={postInprogresse}
                        activeFilter={false}
                        handleFilterPost={handleFilterPostProgress}
                        typePost={"blog"}
                        useCenterGrid={false}
                        useCenterFlex={true}
                    >
                        {((filteredPostProg as any) || []).map((post, index) => (
                            <Card
                                key={index}
                                className={` bg-white w-[100%] lg:w-[80%] min-w-[350px] h-[500px] lg:h-[300px] grid-item flex flex-col lg:flex-row  items-center justify-center !m-4 mb-5 ${
                                    !ready[index] ? "opacity-0" : "opacity-1"
                                } transition-opacity ease-in !duration-[750ms]`}
                                ref={frameRefProg}

                            >
                                <CardMedia
                                    component="img"
                                    className="w-[100%] max-h-[48%] lg:max-w-[50%] lg:max-h-[100%]" 
                                    // image={post.blog_post.image}
                                    image={`https://picsum.photos/1000/1000/?random=${index}`}
                                    alt={post.blog_post.image.split("/").pop()}
                                    sx={{ objectFit: "cover"}}
                                    onLoad={() => {
                                        setReady((prev) => {
                                            return [...prev, (prev[index] = true)];
                                        });
                                    }}
                                />
                                <CardContent className="w-[100%] lg:w-[50%] lg:max-h-[100%]">
                                        <Tooltip title={getTranslation(post.translations, "title", language)}>
                                            <Typography gutterBottom variant="h5" className="text-ellipsis-2rows min-h-[4rem]" component="div">
                                                {getTranslation(post.translations, "title", language)}
                                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a leo finibus, tempor ante sit amet, mollis sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia  */}
                                            </Typography>
                                        </Tooltip>
                                        <Typography gutterBottom className="!text-sm text-slate-500 text-left mb-1" component="div">
                                            {formateDate(post.createdAt, language, "ymdw")}
                                        </Typography>
                                        <p
                                            className="text-black text-base text-left text-ellipsis-6rows  !lg:!text-ellipsis-7rows"
                                            dangerouslySetInnerHTML={{
                                                __html: getTranslation(post.translations, "content", language),
                                            }}
                                        ></p>
                                        <Link href={`/blog?slug=${post.slug.replace(/ /g, "-")}`}>
                                            <p className="!text-blue-600 mt-2">
                                                {textTrad.readMore[language]}
                                            </p>
                                        </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </GridPosts>
                </div>
                <div ref={frameRefProg}></div>
            </>
        );
    };

    return (
        <>
            <div className="flex items-center justify-center flex-col">
                <div className="container flex flex-col items-center">{displayComponentGridInProgress()}</div>
            </div>
        </>
    );
};
export default RouteHandlerBlog;
