'use client'

const tradMetadata = {
    title: "Création de paragraphe",
    description: "Page de création de paragraphe pour le site étoile royale production event et édition panel admin",
};

export default function ParagrapheLayout({ children }: { children: React.ReactNode }) {
    
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
