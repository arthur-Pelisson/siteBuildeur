import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const slider = {
        name: "home",
        slider_content: [
            {
                link: "sample-link-1",
                image: "mononok%C3%A9.png",
                slider_translation: [
                    {
                        title: "Title 1",
                        content: "Content 1",
                        language: "en",
                    },
                    {
                        title: "Title 2",
                        content: "Content 2",
                        language: "fr",
                    },
                ],
            },
            {
                link: "sample-link-2",
                image: "mononok%C3%A9.png",
                slider_translation: [
                    {
                        title: "Title 3",
                        content: "Content 3",
                        language: "en",
                    },
                    {
                        title: "Title 4",
                        content: "Content 4",
                        language: "fr",
                    },
                ],
            },
        ],
    };

    const { slider_content, ...sliderData } = slider;
    try {
        const newSlider = await prisma.slider.create({
            data: {
                ...sliderData,
                slider_content: {
                    create: slider_content.map((content) => {
                        const { slider_translation, ...contentData } = content;
                        return {
                            ...contentData,
                            slider_translation: {
                                create: slider_translation.map((translation) => {
                                    return {
                                        ...translation,
                                    };
                                }),
                            },
                        };
                    }),
                },
            },
            include: {
                slider_content: {
                    include: {
                        slider_translation: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error creating slider:", error);
    }
}

export default main;