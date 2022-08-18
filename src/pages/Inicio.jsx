import {useEffect, useState} from "react";
import Cliente from "../components/Cliente";

function Inicio() {
	const [clientes, setClientes] = useState([]);

	// Realizar esta peticiones GET con react-query
	const obtenerClientesAPI = async () => {
		try {
			const url = "http://localhost:4000/clientes";
			const respuesta = await fetch(url);
			const resultado = await respuesta.json();
			setClientes(resultado);
		} catch (error) {}
	};

	useEffect(() => {
		obtenerClientesAPI();
	}, []);

	// Realizar esta peticione DELETE con react-query
	const handleEliminar = async (id) => {
		// console.log("Eliminar", id);
		const confirmar = confirm("¿Deseas eliminar este cliente")

		// console.log(confirmar)

		// Realizar el llamado a la API
		if (confirmar) {
			try {
				const url = `http://localhost:4000/clientes/${id}`
				const respuesta = await fetch(url, {
					method:'DELETE'
				})

				await respuesta.json()

				// Actualizar el estado
				const arrayClientesActualizado = clientes.filter(cliente => cliente.id !== id)
				setClientes(arrayClientesActualizado)
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
			<p className=" mt-3">Administra tus clientes</p>

			<table className="w-full mt-5 table-auto shadow bg-white">
				<thead className=" bg-blue-800 text-white">
					<tr>
						<th className="p-2">Nombre</th>
						<th className="p-2">Contacto</th>
						<th className="p-2">Empresa</th>
						<th className="p-2">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{clientes.map((cliente) => (
						<Cliente 
              key={cliente.id}
							cliente={cliente}
							handleEliminar={handleEliminar}
            />
					))}
				</tbody>
			</table>
		</>
	);
}

export default Inicio;
