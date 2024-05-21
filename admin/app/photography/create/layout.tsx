'use client'

const tradMetadata = {
    title: "Crée une séries de photo",
    description: "Crée une séries de photo",
};

export default function PhotographyPageLayout({ children }: { children: React.ReactNode }) {
    
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
