import tagTest from "../test/tagTest";

async function main() {
    const tags = [[{name: "musique", language: "fr"}, {name: "music", language: "en"}],
     [{name: "livre", language: "fr"}, {name: "book", language: "en"}],
      [{name: "film", language: "fr"}, {name: "movie", language: "en"}],
       [{name: "jeux", language: "fr"}, {name: "games", language: "en"}],
        [{name: "sport", language: "fr"}, {name: "sport", language: "en"}],
         [{name: "art", language: "fr"}, {name: "art", language: "en"}],
          [{name: "science", language: "fr"}, {name: "science", language: "en"}],
           [{name: "histoire", language: "fr"}, {name: "history", language: "en"}],
            [{name: "politique", language: "fr"}, {name: "politic", language: "en"}],
             [{name: "informatique", language: "fr"}, {name: "computer science", language: "en"}]
            ];
    for (let i = 0; i < 10; i++) {
        await tagTest.createTag([
            { name: tags[i][0].name, language: "fr" },
            { name: tags[i][1].name, language: "en" },
        ]);
    }
}
export default main;