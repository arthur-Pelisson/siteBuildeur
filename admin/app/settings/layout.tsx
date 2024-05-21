'use client'

const tradMetadata = {
    title: "Paramètres",
    description: "Page de paramètres pour le site étoile royale production event et édition panel admin",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    
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
