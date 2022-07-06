import { useEffect, useState } from "react";
import "./Home.css";
// import ReactModal from "react-modal";
const Home = () => {
  const [lista, setLista] = useState([]);
  const [novoItem, setNovoItem] = useState("");
  const [tarefa, setTarefa]= useState()
  const baseURL = "http://localhost:8000/Tarefas"; //url db.json

  //ACHAR TODAS AS TAREFAS
  async function findAllTarefas() {
    const response = await fetch(baseURL);
    const tarefas = await response.json();
    setLista(tarefas);
  }

  useEffect(() => {
    findAllTarefas();
  }, []);

  async function FindTarefasById(id) {
    const tarefa = await fetch(`${baseURL}/${id}`);
    const resp = await tarefa.json();
    setTarefa(resp)
  }

  async function create() {
    const response = await fetch(baseURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ title: novoItem }),
    });
    const novaTarefa = await response.json();
    setLista([...lista, novaTarefa]);
  }

  return (
    <div className="Form">
      <input
        placeholder="Digite sua Tarefa e clique no Botão abaixo para adiciona-la a Lista  "
        value={novoItem}
        onChange={(value) => setNovoItem(value.target.value)}
        type="text"
      />
      <button className="btn-add" onClick={() => AddNewItem()}>
        Adicionar nova Tarefa
      </button>
      <ul className="List-Item">
        {tarefa? <div className="Item">{tarefa.title}
        <button onClick={()=>{setTarefa(undefined)}}>VOLTAR</button>
        </div>:lista.map((item, index) => (
          <li className="Item" key={index}>
            <button
              onClick={() => {
                FindTarefasById(item.id);
              }}
            >
              {item.title}
            </button>

            <div className="divbotoes">
              {" "}
              <button onClick={() => deletarItem(index)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  //Aki adiciona um novo item no campo de tarefaz e retorna a mensagem ao nao digitar nada no input, o return sem parenteses faz com que retorne ao aparecer a mensagem pra digitar no campo de tarefas
  function AddNewItem() {
    create();
    if (novoItem.length <= 0) {
      alert("Por favor, digite algo no campo de Tarefas!");
      return;
    }

    setLista([...lista, novoItem]);
    setNovoItem("");
  }
  function deletarItem(index) {
    let tempArray = [...lista];
    tempArray.splice(index, 1);

    setLista(tempArray);
  }
};

export default Home;
