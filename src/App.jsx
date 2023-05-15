import { AssuntosDeInteresse } from "./components/AssuntosDeInteresse";
import { Table } from "./components/Table";
import assuntos from "./mocks/assuntos.json"

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <AssuntosDeInteresse assuntos={assuntos}/>
    </div>
  );
}

const rows = [
  {
    nome: "Abraam Licon",
    cargo: "Advogado JR",
    unidade: "SENAC - IBIRIAPUERA",
    id: 1
  },
  {
    nome: "João Licon",
    id: 2,
    cargo: "Programador",
    unidade: "SENAC - IBIRIAPUERA",
  },
  {
    nome: "Mark Licon",
    id: 3,
    cargo: "Programador",
    unidade: "SENAC - IBIRIAPUERA",
  },
  {
    nome: "Kripiatch Licon",
    id: 4,
    cargo: "Programador",
    unidade: "SENAC - IBIRIAPUERA",
  },
  {
    nome: "Abraam Licon",
    id: 5
  },
]