'use client'

const tradMetadata = {
    title: "Editions",
    description: "Page de editions pour le site étoile royale production event et édition panel admin",
};

export default function EdictionLayout({ children }: { children: React.ReactNode }) {
    
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
