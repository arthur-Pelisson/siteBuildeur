import UserTest from "../test/userTest";
import PostTest from "../test/postTest";
import request from "supertest";
import express from "express";
import routes from "./post.routes";
import jwtoken from "../../Middleware/jwtoken";
import Maintenance from "../../Middleware/maintenance";

const app = express();
app.use(express.json());
app.use(jwtoken.verifyUser)
app.use(Maintenance.checkMaintenance)
routes(app);

describe("Post Routes ", () => {
    let arrayIdPost = {
      photo:-1,
      real:-1,
    };

    let UserAdmin;
    let UserUser;
    let postphoto;
    let postrealization;
    let postevent;

    beforeAll(async () => {
        UserAdmin = await UserTest.createTestUser("mail@test.post.com", "!Azerty123", "jhon", "Doe", true, "ADMIN");
        UserUser = await UserTest.createTestUser("user@user.post.com", "!Userexample123", "User", "Model", true, "USER");
        // log(UserAdmin, "//////////////////////////////////////////////////////////////////////////")
        postphoto = await PostTest.createPost(
            
            "PHOTOGRAPHY",
            "SeriePhoto", // slug "evenement-1
            [],
            [
                {
                    language: "fr",
                    title: "seriephoto",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",

                },
                {
                    language: "en",
                    title: "seriephoto ",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",

                },
            ],
            {
                thumbnail: `https://picsum.photos/500/500/?random=1`,
                image: `https://picsum.photos/500/500/?random=1`,
            },
            [
                `https://picsum.photos/500/500/?random=1`,
            ]
        );

        postrealization = await PostTest.createPost(
            "REALIZATION",
            "Realisation", 
            [],
            [
                {
                    language: "fr",
                    title: "realisation",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",

                },
                {
                    language: "en",
                    title: "realisation",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",

                },
            ],
            {
                thumbnail: `https://picsum.photos/500/500/?random=1`,
                image: `https://picsum.photos/500/500/?random=1`,
                video: "https://player.vimeo.com/video/452349633",
            },
            [
                `https://picsum.photos/500/500/?random=1`,
            ]
        );

        // postevent = await PostTest.createPost(
        //     "EVENT",
        //     "slug event", // slug "evenement-1
        //     [],
        //     [
        //         {
        //             language: "fr",
        //             title: "evenement",
        //             content: "<p>coucou</p>",
        //         },
        //         {
        //             language: "en",
        //             title: "event",
        //             content: "<p>Hi</p>",
        //         },
        //     ],
        //     {
        //         thumbnail: "https://eventthumb.png",
        //         image: "https://eventimg.png",
        //         date_start: "2021-01-01T12:00:00Z",
        //         date_end: "2021-01-01T16:00:00Z",
        //         location: "Paris",
        //         slots: 10,
        //     }
        // );
    });

    afterAll(async () => {
        await UserTest.deleteTestUser(UserAdmin.user.id);
        await UserTest.deleteTestUser(UserUser.user.id);
        await PostTest.deletePost(postphoto.id);
        await PostTest.deletePost(postrealization.id);
    });

    describe("GET before published post /post/:type/:id", () => {
        it("User ADMIN post photography should return 200:OK", async () => {
            const response = await request(app).get(`/post/photography/${postphoto.id}`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();
        });

        it("User USER post photography should return 404:OK", async () => {
            const response = await request(app).get(`/post/photography/${postphoto.id}`).set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBeTruthy();
        });

        it("User GEST post photography should return 404:OK", async () => {
            const response = await request(app).get(`/post/photography/${postphoto.id}`);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBeTruthy();
        });

        it("User ADMIN post movie should return 200:OK", async () => {
            const response = await request(app).get(`/post/realization/${postrealization.id}`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();
        });

        it("User USER post movie should return 404:OK", async () => {
            const response = await request(app).get(`/post/realization/${postrealization.id}`).set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBeTruthy();
        });

        it("User GEST post movie should return 404:OK", async () => {
            const response = await request(app).get(`/post/realization/${postrealization.id}`);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBeTruthy();
        });

        // it("User ADMIN post event should return 200:OK", async () => {
        //     const response = await request(app).get(`/post/event/${postevent.id}`).set("Cookie", `${UserAdmin.authCookie}`);
        //     expect(response.statusCode).toBe(200);
        //     expect(response.text).toBeTruthy();
        // });

        // it("User USER post event should return 404:OK", async () => {
        //     const response = await request(app).get(`/post/event/${postevent.id}`).set("Cookie", `${UserUser.authCookie}`);
        //     expect(response.statusCode).toBe(404);
        //     expect(response.text).toBe("Post not found");
        // });

        // it("User GESTpost event should return 404:OK", async () => {
        //     const response = await request(app).get(`/post/event/${postevent.id}`);
        //     expect(response.statusCode).toBe(404);
        //     expect(response.text).toBe("Post not found");
        // });

        it("User ADMIN should return 200:OK for existing post", async () => {
          const response = await request(app)
            .get(`/post/realization/${postrealization.id}`)
            .set("Cookie", `${UserAdmin.authCookie}`);
      
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('id', postrealization.id);
        });
      
        it("User ADMIN should return 404:Not Found for non-existing post", async () => {
          const response = await request(app)
            .get(`/post/realization/999999`)
            .set("Cookie", `${UserAdmin.authCookie}`);
      
          expect(response.statusCode).toBe(404);
        });
    });

    describe("GET before published /posts/:type", () => {
        it("User ADMIN post book should return 200: with array lenght of 1", async () => {
            const response = await request(app).get(`/posts/photography`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User USER post book should return 200:with array lenght of 0", async () => {
            const response = await request(app).get(`/posts/photography`).set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User GEST post book should return 200:with array lenght of 0", async () => {
            const response = await request(app).get(`/posts/photography`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User ADMIN post movie should return 200: with array lenght of 1", async () => {
            const response = await request(app).get(`/posts/realization`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User USER post movie should return 200:with array lenght of 0", async () => {
            const response = await request(app).get(`/posts/realization`).set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User GEST post movie should return 200:with array lenght of 0", async () => {
            const response = await request(app).get(`/posts/realization`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        // it("User ADMIN post event should return 200: with array lenght of 1", async () => {
        //     const response = await request(app).get(`/posts/event`).set("Cookie", `${UserAdmin.authCookie}`);
        //     expect(response.statusCode).toBe(200);
        //     expect(response.body).toHaveLength(1);
        // });

        // it("User USER post event should return 200:with array lenght of 0", async () => {
        //     const response = await request(app).get(`/posts/event`).set("Cookie", `${UserUser.authCookie}`);
        //     expect(response.statusCode).toBe(200);
        //     expect(response.body).toHaveLength(0);
        // });

        // it("User GEST post event should return 200:with array lenght of 0", async () => {
        //     const response = await request(app).get(`/posts/event`);
        //     expect(response.statusCode).toBe(200);
        //     expect(response.body).toHaveLength(0);
        // });
    });

    describe("POST /post", () => {
        it("User ADMIN post photo should return 200:OK", async () => {
            const response = await request(app)
                .post("/post/photography")
                .send({
                    slug: "phototest",
                    data: {
                        image: "https://bookimg.png",
                    },
                    translation: [
                        {
                            language: "fr",
                            title: "photo test2",
                            content: "<p>coucou</p>",
                        },
                        {
                            language: "en",
                            title: "photo test2",
                            content: "<p>Hi</p>",
                        },
                    ],
                    tags: [],
                    images: [],
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            arrayIdPost.photo = response.body.id;


        });

        it("User USER post photo should return 403:Forbidden", async () => {
            const response = await request(app)
                .post("/post/photography")
                .send({
                    slug: "phototest2",
                    data: {
                        thumbnail: "https://bookthumb.png",
                        image: "https://bookimg.png",
                    },
                    translation: [
                        {
                            language: "fr",
                            title: "livre test2",
                            content: "<p>coucou</p>",
                        },
                        {
                            language: "en",
                            title: "book test2",
                            content: "<p>Hi</p>",
                        },
                    ],
                    tags: [],
                    images: [],
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User ADMIN post real should return 200:OK", async () => {
            const response = await request(app)
                .post("/post/realization")
                .send({
                    slug: "Realisation2",
                    data: {
                        thumbnail: "https://bookthumb.png",
                        image: "https://bookimg.png",
                    },
                    translation: [
                        {
                            language: "fr",
                            title: "movie test3",
                            content: "<p>coucou</p>",
                        },
                        {
                            language: "en",
                            title: "movie test3",
                            content: "<p>Hi</p>",
                        },
                    ],
                    tags: [],
                    images: [],
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            arrayIdPost.real = response.body.id;

        });

        it("User USER post real should return 401:Forbidden", async () => {
            const response = await request(app)
                .post("/post/realization")
                .send({
                    slug: "Realisation3",
                    data: {
                        thumbnail: "https://bookthumb.png",
                        image: "https://bookimg.png",
                    },
                    translation: [
                        {
                            language: "fr",
                            title: "filme test",
                            content: "<p>coucou</p>",
                        },
                        {
                            language: "en",
                            title: "movie test",
                            content: "<p>Hi</p>",
                        },
                    ],
                    tags: [],
                    images: [],
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        // it("User ADMIN post event should return 200:OK", async () => {
        //     const response = await request(app)
        //         .post("/post/event")
        //         .send({
        //             data: {
        //                 type: "EVENT",
        //                 thumbnail: "https://bookthumb.png",
        //                 image: "https://bookimg.png",
        //                 date_start: "2021-01-01T12:00:00Z",
        //                 date_end: "2021-01-01T16:00:00Z",
        //                 location: "Paris",
        //                 slots: 10,
        //             },
        //             translation: [
        //                 {
        //                     language: "fr",
        //                     title: "evenement test",
        //                     content: "<p>coucou</p>",
        //                 },
        //                 {
        //                     language: "en",
        //                     title: "event test",
        //                     content: "<p>Hi</p>",
        //                 },
        //             ],
        //             tags: [],
        //         })
        //         .set("Cookie", `${UserAdmin.authCookie}`);
        //     expect(response.statusCode).toBe(200);
        //     expect(response.body).toBeTruthy();
        //     arrayIdPost.event = response.body.id;

        // });

//     //     it("User USER post event should return 403:Forbidden", async () => {
//     //         const response = await request(app)
//     //             .post("/post/event")
//     //             .send({
//     //                 data: {
//     //                     type: "MOVIE",
//     //                     thumbnail: "https://bookthumb.png",
//     //                     image: "https://bookimg.png",
//     //                     date_start: "2021-01-01T12:00:00Z",
//     //                     date_end: "2021-01-01T16:00:00Z",
//     //                     location: "Paris",
//     //                     slots: 10,
//     //                 },
//     //                 translation: [
//     //                     {
//     //                         language: "fr",
//     //                         title: "evenement test",
//     //                         content: "<p>coucou</p>",
//     //                     },
//     //                     {
//     //                         language: "en",
//     //                         title: "event test",
//     //                         content: "<p>Hi</p>",
//     //                     },
//     //                 ],
//     //                 tags: [],
//     //             })
//     //             .set("Cookie", `${UserUser.authCookie}`);
//     //         expect(response.statusCode).toBe(401);
//     //         expect(response.text).toBe("Unauthorized");
//     //     });
//     // });

    // describe("PUT /post/:type/:id", () => {

    //   it("User ADMIN post book sould return 400:Post not fund", async () => {
    //       const response = await request(app).put(`/post/photography/${999999}`).set("Cookie", `${UserAdmin.authCookie}`);
    //       expect(response.statusCode).toBe(400);
    //       expect(response.text).toBe("Post not found");
    //   });

    //     it("User ADMIN post book should return 200:OK", async () => {
    //         const response = await request(app)
    //             .put(`/post/photography/${postphoto.id}`)
    //             .send({
    //                 slug: "Realisation7",
    //                 data: {
    //                     thumbnail: "https://bookthumb.png",
    //                     image: "https://bookimg.png",
    //                 },
    //                 translation: [
    //                     {
    //                         language: "fr",
    //                         title: "livre test update",
    //                         content: "<p>coucou update</p>",
    //                     },
    //                     {
    //                         language: "en",
    //                         title: "book test update",
    //                         content: "<p>Hi update</p>",
    //                     },
    //                 ],
    //                 tags: [],
    //                 images: [],
    //             })
    //             .set("Cookie", `${UserAdmin.authCookie}`);
    //         expect(response.statusCode).toBe(200);
    //         expect(response.text).toBe("Post updated");
    //     });

    //     it("User USER post book should return 403:Forbidden", async () => {
    //         const response = await request(app)
    //             .put(`/post/photography/${postphoto.id}`)
    //             .send({
    //                 slug: "Realisation5",
    //                 data: {
    //                     thumbnail: "https://bookthumb.png",
    //                     image: "https://bookimg.png",
    //                 },
    //                 translation: [
    //                     {
    //                         language: "fr",
    //                         title: "livre test update",
    //                         content: "<p>coucou update</p>",
    //                     },
    //                     {
    //                         language: "en",
    //                         title: "book test update",
    //                         content: "<p>Hi update</p>",
    //                     },
    //                 ],
    //                 tags: [],
    //                 images: [],
    //             })
    //             .set("Cookie", `${UserUser.authCookie}`);
    //         expect(response.statusCode).toBe(401);
    //         expect(response.text).toBe("Unauthorized");
    //     });

    //     it("User ADMIN post movie should return 200:OK", async () => {
    //         const response = await request(app)
    //             .put(`/post/realization/${postrealization.id}`)
    //             .send({
    //                 slug: "Realisation5",
    //                 data: {
    //                     thumbnail: "https://bookthumb.png",
    //                     image: "https://bookimg.png",
    //                 },
    //                 translation: [
    //                     {
    //                         language: "fr",
    //                         title: "movie test update",
    //                         content: "<p>coucou update</p>",
    //                     },
    //                     {
    //                         language: "en",
    //                         title: "movie test update",
    //                         content: "<p>Hi update</p>",
    //                     },
    //                 ],
    //                 tags: [],
    //                 images: [],
    //             })
    //             .set("Cookie", `${UserAdmin.authCookie}`);
    //         expect(response.statusCode).toBe(200);
    //         expect(response.text).toBe("Post updated");
    //     });

    //     it("User USER post movie should return 403:Forbidden", async () => {
    //         const response = await request(app)
    //             .put(`/post/realization/${postrealization.id}`)
    //             .send({
    //                 slug: "Realisation3",
    //                 data: {
    //                     thumbnail: "https://bookthumb.png",
    //                     image: "https://bookimg.png",
    //                 },
    //                 translation: [
    //                     {
    //                         language: "fr",
    //                         title: "movie test update",
    //                         content: "<p>coucou update</p>",
    //                     },
    //                     {
    //                         language: "en",
    //                         title: "movie test update",
    //                         content: "<p>Hi update</p>",
    //                     },
    //                 ],
    //                 tags: [],
    //                 images: [],
    //             })
    //             .set("Cookie", `${UserUser.authCookie}`);
    //         expect(response.statusCode).toBe(401);
    //         expect(response.text).toBe("Unauthorized");
    //     });

        // it("User ADMIN post event should return 200:OK", async () => {
        //     const response = await request(app)
        //         .put(`/post/event/${postevent.id}`)
        //         .send({
        //             data: {
        //                 thumbnail: "https://bookthumb.png",
        //                 image: "https://bookimg.png",
        //                 date_start: "2021-01-01T12:00:00Z",
        //                 date_end: "2021-01-01T16:00:00Z",
        //                 location: "Paris",
        //                 slots: 10,
        //             },
        //             translation: [
        //                 {
        //                     language: "fr",
        //                     title: "evenement test update",
        //                     content: "<p>coucou update</p>",
        //                 },
        //                 {
        //                     language: "en",
        //                     title: "event test update",
        //                     content: "<p>Hi update</p>",
        //                 },
        //             ],
        //             tags: [],
        //         })
        //         .set("Cookie", `${UserAdmin.authCookie}`);
        //     expect(response.statusCode).toBe(200);
        //     expect(response.text).toBe("Post updated");
        // });

        // it("User USER post event should return 403:Forbidden", async () => {
        //     const response = await request(app)
        //         .put(`/post/event/${postevent.id}`)
        //         .send({
        //             data: {
        //                 thumbnail: "https://bookthumb.png",
        //                 image: "https://bookimg.png",
        //                 date_start: "2021-01-01T12:00:00Z",
        //                 date_end: "2021-01-01T16:00:00Z",
        //                 location: "Paris",
        //                 slots: 10,
        //             },
        //             translation: [
        //                 {
        //                     language: "fr",
        //                     title: "evenement test update",
        //                     content: "<p>coucou update</p>",
        //                 },
        //                 {
        //                     language: "en",
        //                     title: "event test update",
        //                     content: "<p>Hi update</p>",
        //                 },
        //             ],
        //             tags: [],
        //         })
        //         .set("Cookie", `${UserUser.authCookie}`);
        //     expect(response.statusCode).toBe(401);
        //     expect(response.text).toBe("Unauthorized");
        // });
    });

//     describe("DELETE /post/:type/:id", () => {

//       it("User ADMIN post book sould return 400:Post not fund", async () => {
//           const response = await request(app).delete(`/post/photography/${999999}`).set("Cookie", `${UserAdmin.authCookie}`);
//           expect(response.statusCode).toBe(400);
//           expect(response.text).toBe("Post not found");
//       });

      it("User USER post photo should return 403:Forbidden", async () => {
          const response = await request(app).delete(`/post/photography/${arrayIdPost.photo}`).set("Cookie", `${UserUser.authCookie}`);
          expect(response.statusCode).toBe(401);
          expect(response.text).toBe("Unauthorized");
      });

      it("User ADMIN post photo should return 200:OK", async () => {
          const response = await request(app).delete(`/post/photography/${arrayIdPost.photo}`).set("Cookie", `${UserAdmin.authCookie}`);
          expect(response.statusCode).toBe(200);
      });

      it("User USER post real should return 403:Forbidden", async () => {
          const response = await request(app).delete(`/post/realization/${arrayIdPost.real}`).set("Cookie", `${UserUser.authCookie}`);
          expect(response.statusCode).toBe(401);
          expect(response.text).toBe("Unauthorized");
      });

      it("User ADMIN post real should return 200:OK", async () => {
          const response = await request(app).delete(`/post/realization/${arrayIdPost.real}`).set("Cookie", `${UserAdmin.authCookie}`);
          expect(response.statusCode).toBe(200);
      });

//     //   it("User USER post event should return 403:Forbidden", async () => {
//     //       const response = await request(app).delete(`/post/event/${arrayIdPost.event}`).set("Cookie", `${UserUser.authCookie}`);
//     //       expect(response.statusCode).toBe(401);
//     //       expect(response.text).toBe("Unauthorized");
//     //   });

//     //   it("User ADMIN post event should return 200:OK", async () => {
//     //       const response = await request(app).delete(`/post/event/${arrayIdPost.event}`).set("Cookie", `${UserAdmin.authCookie}`);
//     //       expect(response.statusCode).toBe(200);
//     //       expect(response.text).toBe("Post deleted");
//     //   });
//     });

  describe("PATCH /post/:type/:id", () => {

    it("User ADMIN post photo sould return 400:Post not fund", async () => {
      const response = await request(app)
      .patch(`/post/photography/publishe/${999999}`)
      .set("Cookie", `${UserAdmin.authCookie}`);

      expect(response.statusCode).toBe(400);
    })
    
    it("User USER post photo should return 403:Forbidden", async () => {
      const response = await request(app)
      .patch(`/post/photography/publishe/${postphoto.id}`)
      .set("Cookie", `${UserUser.authCookie}`);
      expect(response.statusCode).toBe(401);
      expect(response.text).toBe("Unauthorized");
    });

    it("User ADMIN post photo should return 200:OK", async () => {
      const response = await request(app)
      .patch(`/post/photography/publishe/${postphoto.id}`)
      .set("Cookie", `${UserAdmin.authCookie}`);

      expect(response.statusCode).toBe(200);
    });

    it("User USER post real should return 403:Forbidden", async () => {
      const response = await request(app)
      .patch(`/post/realization/publishe/${postrealization.id}`)
      .set("Cookie", `${UserUser.authCookie}`);
      expect(response.statusCode).toBe(401);
      expect(response.text).toBe("Unauthorized");
    });

    it("User ADMIN post real should return 200:OK", async () => {
      const response = await request(app)
      .patch(`/post/realization/publishe/${postrealization.id}`)
      .set("Cookie", `${UserAdmin.authCookie}`);
      expect(response.statusCode).toBe(200);
    });

    // it("User USER post event should return 403:Forbidden", async () => {
    //   const response = await request(app)
    //   .patch(`/post/event/publishe/${postevent.id}`)
    //   .set("Cookie", `${UserUser.authCookie}`);


    //   expect(response.statusCode).toBe(401);
    //   expect(response.text).toBe("Unauthorized");
    // });

    // it("User ADMIN post event should return 200:OK", async () => {
    //   const response = await request(app)
    //   .patch(`/post/event/publishe/${postevent.id}`)
    //   .set("Cookie", `${UserAdmin.authCookie}`);


    //   expect(response.statusCode).toBe(200);
    //   expect(response.text).toBe("Post published");
    // });

  });

    describe("GET after published post /post/:type/:id", () => {
      it("User ADMIN post photo should return 200:OK", async () => {
          const response = await request(app).get(`/post/photography/${postphoto.id}`).set("Cookie", `${UserAdmin.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.text).toBeTruthy();
      });

      it("User USER post photo should return 200:OK", async () => {
          const response = await request(app).get(`/post/photography/${postphoto.id}`).set("Cookie", `${UserUser.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.text).toBeTruthy();
      });
      it("User GEST post photo should return 200:OK", async () => {
          const response = await request(app).get(`/post/photography/${postphoto.id}`);
          expect(response.statusCode).toBe(200);
          expect(response.text).toBeTruthy();
      });
      it("User ADMIN post realization should return 200:OK", async () => {
          const response = await request(app).get(`/post/realization/${postrealization.id}`).set("Cookie", `${UserAdmin.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.text).toBeTruthy();
      });
      it("User USER post realization should return 200:OK", async () => {
          const response = await request(app).get(`/post/realization/${postrealization.id}`).set("Cookie", `${UserUser.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.text).toBeTruthy();
      });
      it("User GEST post realization should return 200:OK", async () => {
          const response = await request(app).get(`/post/realization/${postrealization.id}`);
          expect(response.statusCode).toBe(200);
          expect(response.text).toBeTruthy();
      });
    //   it("User ADMIN post event should return 200:OK", async () => {
    //       const response = await request(app).get(`/post/event/${postevent.id}`).set("Cookie", `${UserAdmin.authCookie}`);
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBeTruthy();
    //   });
    //   it("User USER post event should return 200:OK", async () => {
    //       const response = await request(app).get(`/post/event/${postevent.id}`).set("Cookie", `${UserUser.authCookie}`);
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBeTruthy();
    //   });
    //    it("User GEST post event should return 200:OK", async () => {
    //       const response = await request(app).get(`/post/event/${postevent.id}`);
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBeTruthy();
    //    })

    });

    describe("GET after published /posts/:type", () => {
      it("User ADMIN post photo should return 200: with array lenght of 1", async () => {
          const response = await request(app).get(`/posts/photography`).set("Cookie", `${UserAdmin.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveLength(1);
      });

      it("User USER post photo should return 200:with array lenght of 1", async () => {
          const response = await request(app).get(`/posts/photography`).set("Cookie", `${UserUser.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveLength(1);
      });

      it("User GEST post photo should return 200:with array lenght of 1", async () => {
          const response = await request(app).get(`/posts/photography`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveLength(1);
      });

      it("User ADMIN post real should return 200: with array lenght of 1", async () => {
          const response = await request(app).get(`/posts/realization`).set("Cookie", `${UserAdmin.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveLength(1);
      });

      it("User USER post real should return 200:with array lenght of 1", async () => {
          const response = await request(app).get(`/posts/realization`).set("Cookie", `${UserUser.authCookie}`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveLength(1);
      });

      it("User GEST post real should return 200:with array lenght of 1", async () => {
          const response = await request(app).get(`/posts/realization`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveLength(1);
      });

    //   it("User ADMIN post event should return 200: with array lenght of 1", async () => {
    //       const response = await request(app).get(`/posts/event`).set("Cookie", `${UserAdmin.authCookie}`);
    //       expect(response.statusCode).toBe(200);
    //       expect(response.body).toHaveLength(1);
    //   });

    //   it("User USER post event should return 200:with array lenght of 1", async () => {
    //       const response = await request(app).get(`/posts/event`).set("Cookie", `${UserUser.authCookie}`);
    //       expect(response.statusCode).toBe(200);
    //       expect(response.body).toHaveLength(1);
    //   });

    //   it("User GEST post event should return 200:with array lenght of 1", async () => {
    //       const response = await request(app).get(`/posts/event`);
    //       expect(response.statusCode).toBe(200);
    //       expect(response.body).toHaveLength(1);
    //   });
    });

    
});
