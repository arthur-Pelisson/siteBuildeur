import { set } from "immutable";
import { useState, useRef, useEffect, useCallback } from "react";

interface IuseInfinitScroll {
    initPage?: number;
    treshold?: number;
    rootMargin?: string;
    stopPage?: boolean;

}

const useInfinitScroll = ({initPage = 1, treshold = 1, rootMargin = "0px", stopPage = false}: IuseInfinitScroll = {}) => {
    const [page, setPage] = useState(initPage);
    // const [nomorePage, setNomorePage] = useState<boolean | null>(null);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        console.log("nomorepage ingfinityscroll : ", stopPage);
    }, [stopPage]);

    const handleObserver = (entries: any) => {
        console.log("entries : ", entries);
        console.log("nomorePage in hook : ", stopPage);
        const [target] = entries;
        if (stopPage) return;
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: rootMargin,
            threshold: treshold,
        };

        const observer = new IntersectionObserver(handleObserver, option);
        console.log("loadMoreRef.current : ", loadMoreRef.current);
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [handleObserver, loadMoreRef.current]);

    return { loadMoreRef, page, setPage};
};

export default useInfinitScroll;
