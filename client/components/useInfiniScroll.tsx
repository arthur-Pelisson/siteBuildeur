import { useState, useRef, useEffect, useCallback } from "react";

interface IuseInfinitScroll {
    initPage?: number;
    treshold?: number;
    rootMargin?: string;
    stopPage?: boolean;

}

const useInfinitScroll = ({initPage = 1, treshold = 1, rootMargin = "0px", stopPage}: IuseInfinitScroll = {}) => {
    const [page, setPage] = useState(initPage);
    const loadMoreRef = useRef(null);

    const handleObserver = useCallback((entries) => {
        console.log("entries : ", entries);
        const [target] = entries;
        if (target.isIntersecting && !stopPage) {
            setPage((prev) => prev + 1);
        }
    }, []);

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

    return { loadMoreRef, page, setPage };
};

export default useInfinitScroll;
