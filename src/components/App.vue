<template>
  <section id="app">
    <h1>Welcome to Final Countdown: Thesaurus</h1>
    <input
      type="text"
      placeholder="Submit a word"
      id="input"
      @keyup="word = $event.target.value"
      v-on:keyup.delete="reset"
    />
    <article id="submit-btn">
      <button v-on:click="fetch">Search</button>
      <button v-on:click="reset">Reset</button>
    </article>
    <p v-if="error" class="error">This word apparently doesn't exist. Please submit a different word</p>
    <article class="container" v-if="synonyms.length > 1">
      <p>
        Synonyms for {{ word }} are:
      </p>
      <ul id="synonyms-list">
        <li
          v-for="(item, index) in synonyms"
          v-bind:key="`item-${index}`"
          v-on:click="updateWord"
        >{{ item }}</li>
      </ul>
    </article>
  </section>
</template>

<script>
import { fetchSynonyms } from "../utils/fetchWords";
export default {
  name: "app",
  components: {},
  data() {
    return {
      word: "",
      error: "",
      synonyms: []
    };
  },
  methods: {
    fetch: async function() {
      this.error = "";
      const synonyms = await fetchSynonyms(this.$data.word);
      this.$data.synonyms = synonyms;
      let input = document.getElementById("input");
      input.value = "";
      if (!synonyms.length) {
        this.error = "Apparently this word doesn't exist. Try again";
      }
    },
    reset: function() {
      this.$data.synonyms = [];
      this.$data.word = "";
    },
    updateWord: async function(e) {
      this.$data.word = e.target.innerText;
      const synonyms = await fetchSynonyms(this.$data.word);
      this.$data.synonyms = synonyms;
    }
  }
};
</script>

<style>
body {
  background-image: url("../assets/background.jpeg");
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 160px 160px;
}
h1 {
  color: #e99787;
  padding: 10px;
  margin: 25px;
  border: 5px solid #eed8c9;
  background-color: #727077;
}
#input {
  width: 400px;
  height: 50px;
  margin: 25px;
  text-align: center;
  border: 5px solid #727077;
  background-color: #eed8c9;
}
input::placeholder {
  font-size: 25px;
}
input[type="text"] {
  font-size: 25px;
  padding-left: 45px;
}
button {
  height: 35px;
  width: 145px;
  font-weight: 700;
  margin: 10px 10px 20px 10px;
  border: 5px solid #cecccc;
  font-size: 15px;
  color: #e4535e;
}
button:hover {
  cursor: pointer;
  background-color: blue;
}
.error {
  border: 5px solid #eed8c9;
  background-color: #727077;
  color: #e99787;
}
p {
  color: #cecccc;
  font-weight: 700;
  font-size: 20px;
}
.container {
  border: 5px solid #eed8c9;
  background-color: #727077;
}
ul {
  list-style-type: none;
}
li {
  color: #cecccc;
  margin-bottom: 10px;
  font-weight: 700;
}
li:hover {
  cursor: pointer;
  color: #e4535e;
}
</style>