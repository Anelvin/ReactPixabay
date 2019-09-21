import React, {Component} from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado'


class App extends Component {


state={
  termino:"",
  imagenes:[],
  pagina:''
}

scroll=()=>{
  const elemento=document.querySelector('.jumbotron');
  elemento.scrollIntoView('smooth','start');
}

paginaAnterior=()=>{
  //Leer el state de la pagina actual 
  let pagina=this.state.pagina;
  //leer si la pagina es 1 no quiero leer mas
  if(pagina===1) return null;

  //sumar uno a la pagina actual
  pagina--;
  //agregar el cambio al state
  this.setState({
    pagina:pagina
  },()=>{
    this.consultarApi();
    this.scroll()})
}
paginaSiguiente=()=>{
  //Leer el state de la pagina actual 
  let pagina=this.state.pagina;
  //sumar uno a la pagina actual
  pagina++;
  //agregar el cambio al state
  this.setState({
    pagina:pagina
  },()=>{
    this.consultarApi();
    this.scroll()})
  
}

consultarApi=()=>{
  const termino=this.state.termino;
  const pagina=this.state.pagina
  const url=`https://pixabay.com/api/?key=13699504-c43b16177a4c11d057e920d74&q=${termino}&per_page=30&page=${pagina}`;
  //console.log(url);
  fetch(url)
  .then(respuesta=>respuesta.json())
  .then(resultado=>this.setState({imagenes:resultado.hits}))
}

datosBusqueda=(termino)=>{
  this.setState({
    termino:termino,
    pagina:1
  },()=>{
    this.consultarApi();
  })
}

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>
          <Buscador 
          datosBusqueda={this.datosBusqueda}/>
        </div>
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
            />
        </div>
      </div>
    );
  }
}

export default App;
