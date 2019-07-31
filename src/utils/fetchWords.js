export async function fetchWords(word) {
    let synonyms = []
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.VUE_APP_KEY}`)
    const result = await response.json()
    if (result[0].meta) {
      synonyms = result[0].meta.syns[0].map((synonym) => {
        return synonym
    })
  }
    return synonyms
  }