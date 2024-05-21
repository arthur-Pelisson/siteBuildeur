"useClient";
import Loading from "@/components/loading";
import { Reorder, motion } from "framer-motion";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getTags, getTagsByType } from "@/app/request/requestTag";
import Filter from "./filters";
import { getTagsFromPost } from "@/utils/getTagsFromPost";
import { useLanguage } from "@/contextProvider/languageProvider";
import centerGrid from "../layoutComp/centerGrid";
import { ClassNames } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';
type Tag = {
    id: number;
    tag_translate: [
        {
            name: string;
            language: string;
        }
    ];
};

const GridPosts = ({
    children,
    loading: loadingChildren,
    error: errorChildren,
    success: successChildren,
    response: responseChildren,
    activeFilter = false,
    handleFilterPost,
    typePost,
    useCenterGrid = true,
    useCenterFlex = false,
}) => {
    console.log("responseChildren", responseChildren);
    const mainDiv = useRef<HTMLElement>(null);
    const { language } = useLanguage();
    const { response: responseTags, Error: errorTags, Success: successTags, Loading: loadingTags, fetchRequest, params } = getTagsByType(typePost);
    const [filters, setFilters] = useState<Tag[]>([]);
    const [filter, setFilter] = useState("all");
    const [ ready, setReady ] = useState<boolean[]>([]);
    let centerFlex = "";
    if (useCenterFlex) {
        centerFlex = "justify-center";
    }
    const [filterComp, setFilterComp] = useState({
        success: false,
        error: false,
        loading: true,
        response: null,
    });

    useLayoutEffect(() => {
        console.log("useCenterGrid", useCenterGrid);
        if (useCenterGrid === false) return;
        if (mainDiv.current) {
            window.addEventListener("resize", (event) => {
                centerGrid(mainDiv, setReady);
            });
            centerGrid(mainDiv, setReady);
        }
        return () => {
            if (mainDiv.current) {
                window.removeEventListener("resize", (event) => {
                    centerGrid(mainDiv, setReady);
                });
            }
        };
    }, [mainDiv.current, responseChildren, handleFilterPost]);

    useEffect(() => {
        if (activeFilter == true && responseTags === null) {
            fetchRequest(params);
        }
        console.log("responseTags", responseTags);
        setFilterComp({
            success: successTags,
            error: errorTags,
            loading: loadingTags,
            response: responseTags,
        });
    }, [filter, responseTags]);

    useEffect(() => {
        if (filterComp.response && successChildren) {
            const tagsArray = getTagsFromPost(responseChildren);
            createFilterWithValue(tagsArray);
        }
    }, [filterComp.response, responseChildren]);

    useEffect(() => {
        if (successChildren && responseChildren) {
            handleFilterPost(filteredPosts(), filter);
        }
    }, [filter, filterComp.response, responseChildren]);

    const createFilterWithValue = (arrayTagsID) => {
        const filters: Tag[] = [];
        if (filterComp.response === undefined || filterComp.response == null) return;
        for (let i = 0; i < (filterComp.response as Tag[]).length; i++) {
            // if (arrayTagsID.includes((filterComp.response as any)[i].id)) {
                const tagName = (filterComp.response as Tag)[i].tag_translate[0].name
                // console.log("filterComp.response[i]", tagName === "Terminer" || tagName === "Done" );
                if (tagName.toLowerCase() === "terminer" || tagName.toLowerCase() === "done" || tagName.toLowerCase() === "en cours" || tagName.toLowerCase() === "in progress" || tagName.toLowerCase() === "wedding" || tagName.toLowerCase() === "mariage") continue;
                filters.push({
                    id: (filterComp.response as Tag)[i].id,
                    tag_translate: (filterComp.response as Tag)[i].tag_translate,
                });
            // }
        }

        setFilters(filters);
    };

    const filteredPosts = () => {
        console.log("responseChildren function filter post: ", responseChildren);
        return responseChildren;
        if (filter === "all") return responseChildren;
        const response = (responseChildren as any).filter((post) => {
            const postTagIds = post.post_tags.map((tag) => tag.tag_id);
            // console.log("postTagIds", postTagIds);
            // console.log("filterrrrrrr", filter);
            return postTagIds.includes(parseInt(filter));
        });
        // console.log("response", response);
        return response;
    };

    // if (loadingChildren) return <Loading display={true} />;

    // if (errorChildren) return <div>Error</div>;

    const displayComponentFilters = () => {
        if (filterComp.loading || loadingChildren) {
            // return <Loading display={true} />;
        }

        return <Filter filters={filters} setFilter={setFilter} />;
    };

    return (
        <>
            {activeFilter && <div>{displayComponentFilters()}</div>}
            <div className="flex justify-center flex-wrap m-0">
                <Reorder.Group values={filters}  onReorder={setFilters} as="div" className="w-[100%] h-[100%]">
                    <div ref={mainDiv}  className={`flex flex-wrap m-auto ${centerFlex} `}>
                        {children}
                    </div>
                </Reorder.Group>
            </div>
        </>
    );
};

const ImgGrid = ({ src, alt }) => {
    // const [imageLoaded, setImageLoaded] = useState<boolean | undefined>(undefined);
    // const handleImageLoad = () => {
    //     setImageLoaded(true);
    // };
    // return (
    //     <>
    //         {!imageLoaded && (
    //             <div className="w-[15rem] h-[15rem]">
    //                 <Loading display={true} notInModal={true} />
    //             </div>
    //         )}
    //         <motion.img
    //             src={src}
    //             alt={alt}
    //             onLoad={() => handleImageLoad()}
    //             style={{ display: imageLoaded ? "block" : "none" }}
    //             // initial={{ opacity: 0 }}
    //             // animate={{ opacity: 1 }}
    //             // exit={{ opacity: 0 }}
    //             // transition={{ type: "keyframes", ease: "easeInOut", duration: 1 }}
    //         ></motion.img>
    //     </>
    // );
};

const ContentGrid = ({ children, classname }) => {
    return <div className={classname}>{children}</div>;
};

const ReorderGrid = ({ children, postId, post, classname }) => {
    return (
        <Reorder.Item
            as="div"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "keyframes", ease: "easeInOut", duration: 1 }}
            key={postId}
            id={postId}
            value={post}
            drag={false}
            className={classname}
        >
            {children}
        </Reorder.Item>
    )
};

export { GridPosts, ImgGrid, ContentGrid, ReorderGrid };
