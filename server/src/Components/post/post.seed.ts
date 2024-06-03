import PostTest from "../test/postTest";

async function main() {
    // for (let i = 10; i < 20; i++) {
    //     let tags = [];
    //     if (i % 2 === 0) {
    //         tags = [1,2]
    //      } else {
    //         tags = [3,4]
    //     }
    //     await PostTest.createPost(
    //         "BOOK",
    //         "livre " + i, // slug "livre-1
    //         tags,
    //         [
    //             {
    //                 language: "fr",
    //                 title: "livre " + i,
    //                 content: `<h1>Salut</h1>
    //                 <p>Je suis un livre</p>
    //                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    //             },
    //             {
    //                 language: "en",
    //                 title: "book " + i,
    //                 content: `<p>Hi</p>
    //                 <p>I'm a book</p>
    //                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    //             },
    //         ],
    //         {
    //             thumbnail: "https://via.placeholder.com/600x900",
    //             image: "https://via.placeholder.com/600x900",
    //         }
    //     );
    // }
   
    for (let i = 0; i < 20; i++) {
        let width = Math.floor(Math.random() * 1000) + 500;
        let height = Math.floor(Math.random() * 1000) + 500;
        let tags = [];
        // if (i % 2 === 0) {
        //     tags = [7,9]
        //  } else {
        //     tags = [5,10]
        // }
        await PostTest.createPost(
            "REALIZATION",
            "realisation " + i, // slug "evenement-1
            [],
            [
                {
                    language: "fr",
                    title: "realization " + i,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",
                },
                {
                    language: "en",
                    title: "realization " + i,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",
                },
            ],
            {
                thumbnail: `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                image: `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                video: "https://player.vimeo.com/video/452349633",
                
            },
            [
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
                `https://picsum.photos/${Math.floor(Math.random() * 1000) + 500}/${Math.floor(Math.random() * 1000) + 500}/?random=${i}`,
            ]
        );
    }

    // for (let i = 0; i < 20; i++) {
    //     let width = Math.floor(Math.random() * 1000) + 500;
    //     let height = Math.floor(Math.random() * 1000) + 500;
    //     let tags = [];
    //     if (i % 2 === 0) {
    //         tags = [7,9]
    //      } else {
    //         tags = [5,10]
    //     }
    //     await PostTest.createPost(
    //         "PHOTOGRAPHY",
    //         "SeriePhoto " + i, // slug "evenement-1
    //         tags,
    //         [
    //             {
    //                 language: "fr",
    //                 title: "seriephoto " + i,
    //                 content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",

    //             },
    //             {
    //                 language: "en",
    //                 title: "seriephoto " + i,
    //                 content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus vel ligula nec ultricies. Phasellus venenatis erat nulla, ac mattis libero ornare sed. Nulla eget est auctor, ornare lacus quis, gravida nunc. Fusce luctus metus in tellus mattis, non tincidunt mi ullamcorper. Pellentesque non maximus neque. Quisque eget dui non tellus facilisis dignissim. Nam imperdiet porta sem, vel efficitur metus porttitor sed. Sed euismod dolor et neque rutrum convallis. Fusce eu diam iaculis mi volutpat egestas.Duis non sem efficitur, semper mauris et, laoreet justo. Nunc orci odio, sagittis et nisl ut, maximus faucibus lorem. Donec aliquam sollicitudin augue, aliquam fermentum magna condimentum a. Fusce nisi quam, aliquam porta lacus a, luctus congue nisl. Etiam sed dolor in orci pellentesque aliquet vitae at est. Vestibulum at erat sapien. Donec in dolor lorem. Nulla molestie laoreet sapien, non hendrerit velit faucibus quis. Pellentesque laoreet malesuada tortor eget placerat. Cras fermentum dui quis ipsum semper vehicula.Suspendisse potenti. Aenean libero magna, semper eget diam et, finibus tincidunt nunc. Vestibulum vestibulum fermentum congue. Nulla augue est, cursus ac orci quis, rutrum accumsan tellus. Aenean porttitor massa placerat felis pretium hendrerit. Sed et turpis faucibus, efficitur massa nec, bibendum turpis. Nulla molestie urna elementum maximus pellentesque. Aenean congue augue tellus, at vulputate orci ultrices id. Praesent ut tortor vitae nisl vestibulum blandit porttitor at sapien. Curabitur quis feugiat turpis, in mattis risus. Donec imperdiet urna vel ultrices commodo. Proin blandit pretium mattis. Donec molestie ipsum sed ultricies porta. Nam vel ipsum feugiat, mattis lacus quis, vulputate tellus. Suspendisse feugiat, turpis id posuere accumsan, mauris mauris faucibus mi, nec malesuada velit enim",

    //             },
    //         ],
    //         {
    //             thumbnail: `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             image: `https://picsum.photos/${width}/${height}/?random=${i}/toto`,
    //         },
    //         [
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //             `https://picsum.photos/${width}/${height}/?random=${i}`,
    //         ]
    //     );
    // }
    // await PostTest.createPost(
    //     "TEXT",
    //     "home", // slug "evenement-1
    //     [],
    //     [
    //         {
    //             language: "fr",
    //             title: "Text acceuil ",
    //             content: "<p>Je suis un text opur la page d'acceuil</p>",
    //         },
    //         {
    //             language: "en",
    //             title: "Text home",
    //             content: "<p>Im a text for the home page</p>",
    //         },
    //     ],
    //     {
            
    //     }
    // );
}

main();
export default main;
