type ListItemProps = {
    title?: string;
    body?: string
    status?: number
}

function ListItemComponent(props: ListItemProps) {
    return (
        <>
            <div className="row">
                <div className="col-9">
                    <div className="d-flex flex-row bd-highlight mb-1 justify-content-start align-items-baseline align-self-center ">
                        <h5 className="card-title">{props.title}</h5>
                        <span className="badge badge-success ml-2">Disponível</span>
                    </div>
                    <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio maxime
                        quisquam similique a natus officiis ratione repudiandae quo, esse
                        quod eveniet, autem est enim provident. Sunt ipsum praesentium nam
                        rem!
                    </p>

                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-primary justify-content-center">Abrir Chat</button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default ListItemComponent