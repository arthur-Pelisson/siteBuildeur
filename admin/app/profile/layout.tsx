
'use client';
const tradMetadata = {
    title: "Profile",
    description: "Page de profile personnel pour le site étoile royale",
};

const ProfileLayout = ({ children }) => {

    return (
        <>
            <title>{tradMetadata.title}</title>
            <meta name="description" content={tradMetadata.description} />
            <section className="min-height-section">
                    {children}
            </section>
        </>
    );
};
export default ProfileLayout;