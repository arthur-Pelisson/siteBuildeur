import { ISlider, ISliderContent, ISliderTranslation } from './slider.interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSliderById = async (id: number): Promise<ISlider | null> => {
    try {
        const slider = await prisma.slider.findUnique({
            where: {
                id: id,
            },
            include: {
                slider_content: {
                    include: {
                        slider_translation: true,
                    },
                },
            },
        });

        return slider || null;
    } catch (error) {
        console.error(`Error fetching slider by ID ${id}:`, error);
        throw error;
    }
};

export const getSliderByName = async (name: string): Promise<ISlider | null> => {
    try {
        const slider = await prisma.slider.findFirst({
            where: {
                name: name,
            },
            include: {
                slider_content: {
                    include: {
                        slider_translation: true,
                    },
                },
            },
        });

        return slider || null;
    } catch (error) {
        console.error(`Error fetching slider by name ${name}:`, error);
        throw error;
    }
};


export const getSliders = async () => {
    try {
        const sliders = await prisma.slider.findMany({
            include: {
                slider_content: {
                    include: {
                        slider_translation: true,
                    },
                },
            },
        });

        return sliders;
    } catch (error) {
        console.error('Error fetching sliders:', error);
        throw error;
    }
};

export const createSlider = async (slider: ISlider): Promise<ISlider | null> => {
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
        return newSlider;
    } catch (error) {
        console.error('Error creating slider:', error);
        throw error;
    }
};

export const updateSlider = async (slider: ISlider) => {
    const { id, slider_content, ...sliderDataWithoutId } = slider;

    try {
        const updatedSlider = await prisma.slider.update({
            where: {
                id: slider.id,
            },
            data: {
                ...sliderDataWithoutId,
                slider_content: {
                    update: slider_content.map((content) => {
                        const { id: contentId, slider_translation, ...contentDataWithoutId } = content;

                        return {
                            where: {
                                id: contentId,
                            },
                            data: {
                                ...contentDataWithoutId,
                                slider_translation: {
                                    updateMany: slider_translation.map((translation) => ({
                                        where: {
                                            id: translation.id,
                                        },
                                        data: {
                                            ...translation,
                                        },
                                    })),
                                },
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

        return updatedSlider;
    } catch (error) {
        console.error('Error updating slider:', error);
        throw error;
    }
};


export const deleteSliderByID = async (id: number): Promise<boolean> => {
    try {
        const slider = await prisma.slider.delete({
            where: {
                id: id,
            },
        });
        if (slider) return true;
        return false;
    } catch (error) {
        console.error('Error creating slider:', error);
        throw error;
    }
    
};
