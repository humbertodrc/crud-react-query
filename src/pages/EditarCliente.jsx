import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Formulario from "../components/Formulario";
import { obtenerClienteAPI } from '../service/serviceClientes';

function EditarCliente() {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);

	const { id } = useParams();
	

	useEffect(() => {
		obtenerClienteAPI(id).then(cliente => {
			setCliente(cliente);
			setCargando(!cargando);
		}).catch(() => {
			alert("Hubo un error");
			setCargando(!cargando);
		});
		
	}, []);


	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
			<p className=" mt-3">
				Utiliza este formulario para editar datos de un cliente
			</p>

			{cliente.nombre ? (
				<Formulario cliente={cliente} cargando={cargando}  /> 
			) : (
				<p>Cliente ID no valido</p>
			)}
		</>
	);
}

export default EditarCliente;
