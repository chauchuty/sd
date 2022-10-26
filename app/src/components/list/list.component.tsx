import { useEffect } from "react";
import Usuario from "../../model/acesso.model";
import ListItemComponent from "./list.item.component";

type ListProps = {
	fields: any[];
	data: any[];
}

function ListComponent(props: ListProps) {

	useEffect(() => {

	}, [])

	return (
		<table>
			<tbody>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card mt-2">
								<div className="card-body">
									{
										props.data.map((data, index) => {
											return (
												<tr key={index}>
													{
														props.fields.map((field, index) => {
															return (
																<ListItemComponent key={index} />
															)
														})
													}
												</tr>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</tbody>
		</table>
	);
}

export default ListComponent;
