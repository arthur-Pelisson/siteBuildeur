'use client'

const tradMetadata = {
    title: "Modifier une realisation",
    description: "Page de modification d'une réalisation sur le site de Margaux PELISSON",
};

export default function EditRealizationLayout({ children }: { children: React.ReactNode }) {
    
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
