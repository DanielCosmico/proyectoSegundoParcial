<template>
  <div>
    <h1>Libros así bien padres</h1>
    <h3>Registre su libro</h3>
    <br>
        <form @submit.prevent="estatusEditar ? editarLibro() : agregarLibro()">
            <p>
              <label for="">Nombre  </label>
              <input type="text" v-model="name">
              
            </p>  
            <p>
              <br>
              <label for="">ID  </label>
              <input type="number" v-model="num">
              
            </p>
              <br>
              <p>
              <label for="">Autor  </label>
              <input type="text" v-model="author">
              
            </p>
            <p>
              <br>
              <button v-if="estatusEditar" @click="estatusEditar= false, name='', num='',author='' ">Cancelar</button>
              <button type="submit">{{ estatusEditar ? "Editar": "Agregar" }}</button>
            </p>
        </form>
        <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif" v-if="cargando">
        <!--{{estatusEditar}}-->
        <ul>
          <li v-for="book in books" :key="book.id">
            <p>Nombre del libro: {{book.name}}.</p> 
            <p>Autor: {{book.author}}.</p>
            <p>ID: {{book.num}}.</p>
            <button @click="borrarLibro(book)">Eliminar</button>
            <button @click="seleccionarLibro(book)">Editar</button>
          </li>
        </ul>
    </div>
</template>

<script>

import {db} from './firebase'
export default {
    name: 'App',
    data(){
      return {
        books: [],
        num: "",
        name: "",
        author: "",
        cargando: false,
        estatusEditar: false
      }
    },
    created() {
      this.listarLibros();
    },
    methods: {
      async listarLibros(){
            this.cargando = true;
            const data = await db.collection("books").get();
            this.books = data.docs.map(doc => ({
              id: doc.id, ...doc.data()
            }))
            this.cargando = false;
            console.log(this.books);
      },
      async agregarLibro() {
          await db.collection('books').add(
            {
              name:  this.name,
              num: this.num,
              author: this.author
            }
          )
          this.name = "";
          this.num = "";
          this.author ="";
          this.listarLibros();
      },
      async borrarLibro(book){
        if(confirm(`Estas seguro que deseas eliminar ${book.name} de ${book.author}`)){
          await db.collection('books').doc(book.id).delete();
          this.name = "";
          this.num = "";
          this.author ="";
          this.listarLibros();
        }
      },
      seleccionarLibro(book){
        this.estatusEditar = true;
        this.id = book.id;
        this.num = book.num;
        this.name = book.name;
        this.author = book.author;
      },
      async editarLibro(){
        await db.collection('books').doc(this.id).set(
          {
            name: this.name,
            num: this.num,
            author: this.author
          }
        )
        this.estatusEditar = false;
        this.num = "";
        this.name = "";
        this.author = ""; 
        this.listarLibros();
        
      }
    },  
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
