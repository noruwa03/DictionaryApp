const inputWordRef = document.querySelector("#inputWord");
const detailWrapperRef = document.querySelector("#detail-wrapper");
const playerRef = document.querySelector("#player");
const loaderRef = document.querySelector("#loader");
const audioRef = document.querySelector("#audioRef");
const errorRef = document.querySelector("#error");

inputWordRef.addEventListener(
  "keydown",
  (evt) => evt.key === "Enter" && initializeSearch()
);

function initializeSearch() {
  if (inputWordRef.value === "") {
    alert("Please enter a text");
  } else {
    loaderRef.innerHTML = ` <div class="loading">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>`;

    inputWordRef.focus();

    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWordRef.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);

        document.querySelector(".loading").remove();
        inputWordRef.value = "";

        playerRef.innerHTML = `<div class="word-audio-player">
            <h1>${data[0].word}</h1>

             ${
               data[0].phonetics.length > 1
                 ? ` <div class="player" >
              <div class="flex-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-play-circle icon"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
                  />
                </svg>
                <p>${
                  data[0].phonetic ? data[0].phonetic : `/${data[0].word}/`
                }</p>
              </div>
            </div>
          </div>
`
                 : ""
             }
`;

        detailWrapperRef.innerHTML = `
          
            
           <div class="margin">
      ${data[0].meanings
        .map((res) => {
          return `
      <div class="grid-col">
        <div class="col-span-2"><h4>${res.partOfSpeech}</h4></div>
        <div class="col-span-8">
          <ul>
            ${res.definitions
              .map((res) => {
                return `
            <div class="mb">
              <li>${res.definition}</li>
              <p >
                ${res.example ? `'Example: ${res.example}'` : ""}
              </p>
            </div>
            `;
              })
              .join("")}
          </ul>

           ${
             res.antonyms.length === 0
               ? ""
               : `<div class="flex-item">
           
            <div class="antonyms">
             <p>Antonyms: </p>
              ${res.antonyms
                .map((res) => {
                  return `<span>${res} </span>`;
                })
                .join("")}
            </div>
          </div>`
           }

          ${
            res.synonyms.length === 0
              ? ""
              : `<div class="flex-item">
           
            <div class="synomyms">
             <p>Synomyms: </p>
              ${res.synonyms
                .map((res) => {
                  return `<span>${res} </span>`;
                })
                .join("")}
            </div>
          </div>`
          }
          
        </div>
      </div> `;
        })
        .join("")}
    </div>

 
            

          <div class="source-url">
            <h3>Source</h3>
            ${
              data[0].sourceUrls.length > 1
                ? `<a href="${data[0].sourceUrls[1]}"
              >${data[0].sourceUrls[1]}</a
            >`
                : `<a href="${data[0].sourceUrls[0]}"
              >${data[0].sourceUrls[0]}</a
            >`
            }
        
          </div>
          `;
        data[0].phonetics.length > 1
          ? audioRef.setAttribute("src", data[0].phonetics[1].audio)
          : "";
      })
      .catch((err) => {
        errorRef.innerHTML = `<div class="error-modal">
          <h1>Word definition cannot be found</h1>
          <p>we could not find the word you where looking for.</p>
          <a href="/">Try again</a>
        </div>`;
      });
  }
}

playerRef.addEventListener("click", () => {
  audioRef.play();
});
