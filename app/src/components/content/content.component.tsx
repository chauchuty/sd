function ContentComponent(props: any) {
    return (
        <div className="container-fluid">
            { props.children }
        </div>
    )
}

export default ContentComponent