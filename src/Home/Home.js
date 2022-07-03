import { useEffect,useState } from "react";
import "./Home.css";
// import Form from "../components/Form/Form";
const Home = () => {
  let [lista, setLista] = useState([]);
  let [novoItem, setNovoItem] = useState("");

  useEffect(() =>{  
    setLista(["Tarefa1","Tarefa2","Tarefa3","Tarefa4"])
  },[])

  return (
    <div className="Form">
     
        <input 
          placeholder="Digite sua Tarefa"
          value={novoItem}
          onChange={value => setNovoItem(value.target.value)}
          type="text"
        />
        <button onClick={()=> AddNewItem()}>botao co caralho</button>
        <ul className="List-Item">
        {lista.map((item,index) =>  (
          <li className="Item" key={index}>
            {item}
            <button onClick={()=>deletarItem(index)}>
              Deletar 
            </button>
            </li>
        ) )}
      </ul>
    </div>
  );

  //Aki adiciona um novo item no campo de tarefaz e retorna a mensagem ao nao digitar nada no input, o return sem parenteses faz com que retorne ao aparecer a mensagem pra digitar no campo de tarefas
  function AddNewItem(){
    if(novoItem.length <=0){
      alert("Por favor, digite algo no campo de Tarefas!")
      return;
    }
  //Aki ele não deixa repetir tarefas que ja existem na tabela
    let ItemIndex=  lista.indexOf(novoItem);

    if(ItemIndex >= 0){
      alert("Você já adicionou esta tarefa!")
      return
    }

    setLista([...lista,novoItem])
    setNovoItem("")
  }
    function deletarItem(index){
      let tempArray=[...lista]
      tempArray.splice(index,1);

      setLista(tempArray);
    }
};

export default Home;
