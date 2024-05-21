'use client'

const tradMetadata = {
    title: "Tags",
    description: "Page de tags pour le site étoile royale production event et édition panel admin",
};

export default function ConnectionLayout({ children }: { children: React.ReactNode }) {
    
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
