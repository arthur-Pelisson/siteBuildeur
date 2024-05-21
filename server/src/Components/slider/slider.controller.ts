import { Request, Response } from 'express';
import { ISlider, ISliderContent, ISliderTranslation } from './slider.interface';
import { getSliderById, getSliders, createSlider, updateSlider, deleteSliderByID, getSliderByName } from './slider.service';


export default {

    getSlider: async (req: Request , res: Response): Promise<Response> => {
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send("Id is not a number");

        const slider: ISlider | null = await getSliderById(id);
        
        if (slider === null) return res.status(404).send("Slider not found");
        return res.status(200).send(slider);
    },

    getSliders: async (req: Request , res: Response): Promise<Response> => {
        const sliders: ISlider[] = await getSliders();
        return res.status(200).send(sliders);
    },

    createSlider: async (req: Request , res: Response): Promise<Response> => {
        const slide: ISlider = req.body;
        if (!slide) return res.status(400).send("Missing properties");
        const newslider = await createSlider(slide);
        if (newslider === null) return res.status(400).send("Error creating slider");
        return res.status(200).send(newslider);
    },

    updateSlider: async (req: Request , res: Response): Promise<Response> => {
        const slide: ISlider = req.body;
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send("Id is not a number");
        if (!slide) return res.status(400).send("Missing properties");
        const findSlider = await getSliderById(id);
        if (findSlider === null) return res.status(404).send("Slider not found");
        slide.id = id;
        const newslider = await updateSlider(slide);
        if (newslider === null) return res.status(400).send("Error updating slider");
        return res.status(200).send(newslider);

    },

    deleteSlider: async(req: Request , res: Response): Promise<Response> => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send("Id is not a number");
        const findSlider = await getSliderById(id);
        if (findSlider === null) return res.status(404).send("Slider not found");
        const deleteSlider = await deleteSliderByID(id);
        if (deleteSlider === false) return res.status(400).send("Error deleting slider"); 
        return res.status(200).send("Slider deleted");
    },

    getSliderByName: async (req: Request , res: Response): Promise<Response> => {
        let name: string = req.params.name;
        if (!name) return res.status(400).send("Missing name");
        name = name.toLowerCase();
        console.log(name);
        const slider: ISlider | null = await getSliderByName(name);
        
        if (slider === null) return res.status(404).send("Slider not found");
        return res.status(200).send(slider);
    },

    getHomeSlider: async (req: Request , res: Response): Promise<Response> => {
        const slider: ISlider | null = await getSliderByName("Home");
        
        if (slider === null) return res.status(404).send("Slider not found");
        return res.status(200).send(slider);
    },

};