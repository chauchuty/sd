type ButtonProps = {
    type?: "submit" | "button" | "reset"
    label: string
    isLoading?: boolean
}

function ButtonComponent(props: ButtonProps) {
    return (
        <button type={props.type} className="btn btn-block btn-dark">
            {
                !props.isLoading 
                    ? props.label
                    : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            }
        </button>
    )
}

export default ButtonComponent