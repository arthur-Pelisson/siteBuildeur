'use client'

const tradMetadata = {
    title: "Voir une édition",
    description: "Page de visualisation d'une édition pour le site étoile royale production event et édition panel admin",
};

export default function ViewEditionLayout({ children }: { children: React.ReactNode }) {
    
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
