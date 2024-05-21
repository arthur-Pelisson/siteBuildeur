'use client'

const tradMetadata = {
    title: "Création d'article d'images",
    description: "Page de création d'article d'images",
};

export default function FrameLayout({ children }: { children: React.ReactNode }) {
    
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
