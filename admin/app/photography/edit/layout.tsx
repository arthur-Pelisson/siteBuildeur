'use client'

const tradMetadata = {
    title: "Modifier un evenements",
    description: "Page de modification des evenements pour le site étoile royale production event et édition panel admin",
};

export default function EvenementEditLayout({ children }: { children: React.ReactNode }) {
    
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
