import express from 'express';
import jwtoken from '../../Middleware/jwtoken';
import sliderController from './slider.controller';
import SecurityController from '../../Middleware/securityController';

const routes = (app: express.Express) => {
    app.get("/slider/byname/:name",  SecurityController.checkAuthorization, sliderController.getSliderByName);
    app.get("/slider/:id",  SecurityController.checkAuthorization, sliderController.getSlider);
    app.get("/sliders",  SecurityController.checkAuthorization, sliderController.getSliders);
    app.post("/slider",  SecurityController.checkAuthorization, sliderController.createSlider);
    app.put("/slider/:id",  SecurityController.checkAuthorization, sliderController.updateSlider);
    app.delete("/slider/:id",  SecurityController.checkAuthorization, sliderController.deleteSlider);
}

export default routes;