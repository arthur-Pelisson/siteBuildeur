'use client'

const tradMetadata = {
    title: "Blog",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <>
            <title>{tradMetadata.title}</title>
            <meta name="description" content={tradMetadata.description} />
            <section className="h-[100%]">
                    {children}
            </section>
        </>
    );
}
