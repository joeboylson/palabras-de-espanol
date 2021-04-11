const Loading = ({loading=false, children}) => {
    if (loading) return <h2>Loading . . .</h2>;
    return children;
}

export default Loading;