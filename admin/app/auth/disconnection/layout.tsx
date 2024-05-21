'use client'
import PathWrapper from "@/components/pageWrapper/pathWrapper";

const tradMetadata = {
    title: "Déconnexion",
    description: "Page de déconnexion pour le site étoile royale",
};

export default function DeconnectionLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <>
            <title>{tradMetadata.title}</title>
            <meta name="description" content={tradMetadata.description} />
            <section className="min-height-section">
                <PathWrapper>
                    {children}
                </PathWrapper>
            </section>
        </>
    );
}
