'use client'

const tradMetadata = {
    title: "Paragraph",
    description: "Page de paragraph pour le site de margaux pelisson production event et édition panel admin",
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
