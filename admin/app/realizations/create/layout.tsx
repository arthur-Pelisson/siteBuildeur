'use client'

const tradMetadata = {
    title: "Crée une realisation",
    description: "Page de création d'une réalisation sur le site de Margaux PELISSON",
};

export default function createRealizationLayout({ children }: { children: React.ReactNode }) {
    
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
